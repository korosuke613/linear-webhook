import { Webhook, WebhookEventsUnion } from "./Interfaces";

export class CallbackNotFoundError extends Error {
  constructor(webhookType: WebhookEventsUnion) {
    super(`Callback function doesn't exists for ${webhookType}`);
    this.name = "CallbackNotFoundError";
  }
}

export class UnknownWebhookEventError extends Error {
  constructor(webhook: Webhook) {
    super(
      `Unknown webhook event. Action:${webhook.action}, Type:${webhook.type}`
    );
    this.name = "UnknownWebhookEventError";
  }
}
