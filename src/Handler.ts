import {
  CreateCommentWebhook,
  CreateIssueWebhook,
  RemoveCommentWebhook,
  RemoveIssueWebhook,
  UpdateCommentWebhook,
  UpdateIssueWebhook,
  Webhook,
  WebhookTypes,
} from "./Interfaces";

export class Handler {
  private readonly listeners: {
    [key: string]: (webhook: Webhook) => void;
  } = {};
  public addCallback(
    webhookType: WebhookTypes,
    callback: (webhook: Webhook) => any
  ) {
    this.listeners[webhookType] = callback;
  }
  public async execCallback(webhook: Webhook) {
    const webhookInfo = this.getWebhookInfo(webhook);
    if (webhookInfo.name === "UnknownWebhook") {
      throw new Error("Unknown webhook event");
    }
    let result;
    try {
      result = this.listeners[webhookInfo.name](webhook);
    } catch (e) {
      console.error(e);
      throw new Error("Callback is doesn't exists");
    }
    return result;
  }

  public getWebhookInfo(
    webhook: Webhook
  ): {
    name: string;
    webhook: Webhook;
  } {
    const webhookType = this.getWebhookType(webhook);
    let castedWebhook;
    switch (webhookType) {
      case "CreateIssueWebhook":
        castedWebhook = webhook as CreateIssueWebhook;
        break;
      case "UpdateIssueWebhook":
        castedWebhook = webhook as UpdateIssueWebhook;
        break;
      case "RemoveIssueWebhook":
        castedWebhook = webhook as RemoveIssueWebhook;
        break;
      case "CreateCommentWebhook":
        castedWebhook = webhook as CreateCommentWebhook;
        break;
      case "UpdateCommentWebhook":
        castedWebhook = webhook as UpdateCommentWebhook;
        break;
      case "RemoveCommentWebhook":
        castedWebhook = webhook as RemoveCommentWebhook;
        break;
      default:
        castedWebhook = webhook;
        break;
    }
    return {
      name: webhookType,
      webhook: castedWebhook,
    };
  }

  public getWebhookType(webhook: Webhook): WebhookTypes {
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
