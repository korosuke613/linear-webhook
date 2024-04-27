import { type CreateIssueWebhook, Webhook, WebhookHandler } from "../../index";
import { createIssue } from "../data/createIssue";

const handler = new WebhookHandler();
handler.addCallback<CreateIssueWebhook>("CreateIssueWebhook", (webhook) => {
  console.log("This event is CreateIssueWebhook.");
  console.log(`Action: ${webhook.action}, Type: ${webhook.type}`);
});

(async () => {
  await handler.execCallback(createIssue);
})();
