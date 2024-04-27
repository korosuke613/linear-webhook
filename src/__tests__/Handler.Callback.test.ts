/* eslint-disable no-loop-func */

import { Handler } from "../Handler";
import { CreateIssueWebhook, Webhook, WebhookEvents } from "../Interfaces";
import { default as Data } from "./data";
import {
  CallbackNotFoundError,
  UnknownWebhookEventError,
} from "../HandlerError";
import { describe, test, expect } from "vitest";

describe("Test addCallback & execCallback", () => {
  const callbackGetActionAndType = (webhook: Webhook) => {
    return { action: webhook.action, type: webhook.type };
  };
  const callbackCustom = (webhook: Webhook, param: { name: string }) => {
    const { name } = param;
    return { action: webhook.action, type: webhook.type, name };
  };

  const testcases = [
    {
      name: `WebhookType is ${WebhookEvents.CreateIssueWebhook}`,
      input: {
        webhook: Data.createIssue,
        addCallback: (handler: Handler) => {
          handler.addCallback<CreateIssueWebhook>(
            "CreateIssueWebhook",
            callbackGetActionAndType
          );
        },
      },
      expected: { action: "create", type: "Issue" },
    },
    {
      name: `Use custom param callback`,
      input: {
        webhook: Data.createIssue,
        addCallback: (handler: Handler) => {
          handler.addCallback("CreateIssueWebhook", callbackCustom);
        },
      },
      expected: { action: "create", type: "Issue", name: "main" },
    },
  ];

  for (const { name, input, expected } of testcases) {
    test.concurrent(name, async () => {
      const handler = new Handler();
      input.addCallback(handler);
      const actual = await handler.execCallback(input.webhook, {
        name: "main",
      });
      expect(actual).toEqual(expected);
    });
  }
});

describe("Throw an exception when an event is triggered without registering a callback", () => {
  const testcases = [
    {
      name: "Contains WebhookEvent in the error message",
      input: {
        webhook: Data.createIssue,
      },
      expected: "Callback function doesn't exists for CreateIssueWebhook",
    },
    {
      name: "Throw CallbackNotFoundError",
      input: {
        webhook: Data.createIssue,
      },
      expected: CallbackNotFoundError,
    },
  ];

  for (const { name, input, expected } of testcases) {
    test.concurrent(name, async () => {
      const handler = new Handler();
      await expect(async () => {
        await handler.execCallback(input.webhook);
      }).rejects.toThrow(expected);
    });
  }
});

describe("Throw an exception when an unknown event", () => {
  const testcases = [
    {
      name: "Contains webhook info in the error message for unknown action",
      input: {
        webhook: Data.unknownAction,
      },
      expected: "Unknown webhook event. Action:hogehoge, Type:Issue",
    },
    {
      name: "Contains webhook info in the error message for unknown type",
      input: {
        webhook: Data.unknownType,
      },
      expected: "Unknown webhook event. Action:create, Type:Hogehoge",
    },
    {
      name: "Throw UnknownWebhookEventError",
      input: {
        webhook: Data.unknownAction,
      },
      expected: UnknownWebhookEventError,
    },
  ];

  for (const { name, input, expected } of testcases) {
    test.concurrent(name, async () => {
      const handler = new Handler();
      await expect(async () => {
        await handler.execCallback(input.webhook as any);
      }).rejects.toThrow(expected);
    });
  }
});
