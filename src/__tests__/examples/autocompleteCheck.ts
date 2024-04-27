import {
  type CreateIssueWebhook,
  type CreateProjectWebhook,
  type UpdateIssueLabelWebhook,
  WebhookHandler,
} from "../../index";
import { createIssue } from "../data/createIssue";

const handler = new WebhookHandler();
handler.addCallback<CreateIssueWebhook>("CreateIssueWebhook", (webhook) => {
  console.log("This event is CreateIssueWebhook.");
  console.log(`Action: ${webhook.action}, Type: ${webhook.type}`);
});
handler.addCallback<UpdateIssueLabelWebhook>(
  "UpdateIssueWebhook",
  (webhook) => {
    const action = `action: ${webhook.action}`;
  },
);
handler.addCallback<CreateProjectWebhook>("CreateProjectWebhook", (webhook) => {
  console.log(webhook.data.icon);
});

(async () => {
  await handler.execCallback(createIssue);
})();
