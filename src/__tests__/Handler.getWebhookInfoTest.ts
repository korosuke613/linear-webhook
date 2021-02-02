/* eslint-disable no-loop-func */

import { Handler } from "../Handler";
import { WebhookEvents } from "../Interfaces";
import { default as Data } from "./data";

describe("Test getWebhookType", () => {
  const testcases = [
    {
      name: `createIssue is ${WebhookEvents.CreateIssueWebhook}`,
      input: {
        webhook: Data.createIssue,
      },
      expected: { webhookType: WebhookEvents.CreateIssueWebhook },
    },
    {
      name: `createComment is ${WebhookEvents.CreateCommentWebhook}`,
      input: {
        webhook: Data.createComment,
      },
      expected: { webhookType: WebhookEvents.CreateCommentWebhook },
    },
    {
      name: `updateIssueLabel is ${WebhookEvents.UpdateIssueWebhook}`,
      input: {
        webhook: Data.updateIssueLabel,
      },
      expected: { webhookType: WebhookEvents.UpdateIssueWebhook },
    },
    {
      name: `updateComment is ${WebhookEvents.UpdateCommentWebhook}`,
      input: {
        webhook: Data.updateComment,
      },
      expected: { webhookType: WebhookEvents.UpdateCommentWebhook },
    },
    {
      name: `removeIssue is ${WebhookEvents.RemoveIssueWebhook}`,
      input: {
        webhook: Data.removeIssue,
      },
      expected: { webhookType: WebhookEvents.RemoveIssueWebhook },
    },
    {
      name: `removeComment is ${WebhookEvents.RemoveCommentWebhook}`,
      input: {
        webhook: Data.removeComment,
      },
      expected: { webhookType: WebhookEvents.RemoveCommentWebhook },
    },
  ];

  for (const { name, input, expected } of testcases) {
    test.concurrent(name, async () => {
      const handler = new Handler();

      const actual = handler.getWebhookEvent(input.webhook);
      expect(actual).toEqual(expected.webhookType);
    });
  }
});
