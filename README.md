# linear-webhook

Webhook handler for Linear.

[![npm version](https://badge.fury.io/js/linear-webhook.svg)](https://badge.fury.io/js/linear-webhook) ![CI](https://github.com/korosuke613/linear-webhook/workflows/CI/badge.svg) [![codecov](https://codecov.io/gh/korosuke613/linear-webhook/branch/main/graph/badge.svg?token=DCE4MXG035)](https://codecov.io/gh/korosuke613/linear-webhook) 

## Getting started

Use the package manager [npm](https://docs.npmjs.com/about-npm/) to install linear-webhook.

### Install linear-webhook

```bash
npm i linear-webhook
```

### Example code

[handlerExample.ts](./src/__tests__/examples/handlerExample.ts)

```ts
import { WebhookHandler } from "./index";
import { CreateIssueWebhook } from "./Interfaces";

const handler = new WebhookHandler();
handler.addCallback<CreateIssueWebhook>("CreateIssueWebhook", (webhook) => {
  console.log("This event is CreateIssueWebhook.");
  console.log(`Action: ${webhook.action}, Type: ${webhook.type}`);
});

(async () => {
  const unknownWebhook: Webhook = webhook;
  await handler.execCallback(unknownWebhook);
})();
```

output

```planetext
This event is CreateIssueWebhook.
Action: create, Type: Issue
```
