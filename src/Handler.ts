import {
  CallbackNotFoundError,
  UnknownWebhookEventError,
} from "./HandlerError";
import type { Webhook, WebhookEventsUnion } from "./Interfaces";

export class Handler {
  public readonly listeners = new Map<
    WebhookEventsUnion,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (webhook: any, param?: any) => any
  >();

  public clearCallbacks() {
    this.listeners.clear();
  }

  public addCallback<T extends Webhook>(
    webhookEvent: WebhookEventsUnion,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    callback: (webhook: T, param?: any) => any,
  ) {
    this.listeners.set(webhookEvent, callback);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public async execCallback(webhook: Webhook, param?: any) {
    const webhookEvent = this.getWebhookEvent(webhook);
    if (webhookEvent === "UnknownWebhook") {
      throw new UnknownWebhookEventError(webhook);
    }
    const callbackFunction = this.listeners.get(webhookEvent);
    if (callbackFunction === undefined) {
      throw new CallbackNotFoundError(webhookEvent);
    }

    return callbackFunction(webhook, param);
  }

  public getWebhookEvent(webhook: Webhook): WebhookEventsUnion {
    switch (webhook.action) {
      case "create":
        switch (webhook.type) {
          case "Issue":
            return "CreateIssueWebhook";
          case "Comment":
            return "CreateCommentWebhook";
          case "IssueLabel":
            return "CreateIssueLabelWebhook";
          case "Reaction":
            return "CreateReactionWebhook";
          case "Project":
            return "CreateProjectWebhook";
        }
        break;
      case "update":
        switch (webhook.type) {
          case "Issue":
            return "UpdateIssueWebhook";
          case "Comment":
            return "UpdateCommentWebhook";
          case "IssueLabel":
            return "UpdateIssueLabelWebhook";
          case "Cycle":
            return "UpdateCycleWebhook";
          case "Project":
            return "UpdateProjectWebhook";
        }
        break;
      case "remove":
        switch (webhook.type) {
          case "Issue":
            return "RemoveIssueWebhook";
          case "Comment":
            return "RemoveCommentWebhook";
          case "IssueLabel":
            return "RemoveIssueLabelWebhook";
          case "Project":
            return "RemoveProjectWebhook";
        }
        break;
      default:
        break;
    }
    return "UnknownWebhook";
  }
}
