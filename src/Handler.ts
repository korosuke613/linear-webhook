import { Webhook, WebhookEventsUnion } from "./Interfaces";
import {
  CallbackNotFoundError,
  UnknownWebhookEventError,
} from "./HandlerError";

export class Handler {
  public readonly listeners = new Map<
    WebhookEventsUnion,
    (webhook: any) => any
  >();

  public clearCallbacks() {
    this.listeners.clear();
  }

  public addCallback<T extends Webhook>(
    webhookEvent: WebhookEventsUnion,
    callback: (webhook: T) => any
  ) {
    this.listeners.set(webhookEvent, callback);
  }

  public async execCallback(webhook: Webhook) {
    const webhookEvent = this.getWebhookEvent(webhook);
    if (webhookEvent === "UnknownWebhook") {
      throw new UnknownWebhookEventError(webhook);
    }
    const callbackFunction = this.listeners.get(webhookEvent);
    if (callbackFunction === undefined) {
      throw new CallbackNotFoundError(webhookEvent);
    }

    return callbackFunction(webhook);
  }

  public getWebhookEvent(webhook: Webhook): WebhookEventsUnion {
    switch (webhook.action) {
      case "create":
        switch (webhook.type) {
          case "Issue":
            return "CreateIssueWebhook";
          case "Comment":
            return "CreateCommentWebhook";
        }
        break;
      case "update":
        switch (webhook.type) {
          case "Issue":
            return "UpdateIssueWebhook";
          case "Comment":
            return "UpdateCommentWebhook";
        }
        break;
      case "remove":
        switch (webhook.type) {
          case "Issue":
            return "RemoveIssueWebhook";
          case "Comment":
            return "RemoveCommentWebhook";
        }
        break;
      default:
        break;
    }
    return "UnknownWebhook";
  }
}
