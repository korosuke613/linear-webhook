# linear-webhook
Webhook handler for Linear.

## Getting started
Use the package manager [npm](https://docs.npmjs.com/about-npm/) to install linear-webhook.

### Install linear-webhook
```bash
npm i linear-webhook
```

### Example code
```ts
import {WebhookHandler} from "./index";
import {CreateIssueWebhook} from "./Interfaces";

const handler = new WebhookHandler();
handler.addCallback("CreateIssueWebhook", (webhook: CreateIssueWebhook)=> {
    console.log("This event is CreateIssueWebhook.")
    console.log(JSON.stringify(webhook, null, 2))
});

(async ()=>{
    const unknownWebhook: Webhook = createIssue;
    await handler.execCallback(unknownWebhook)
})()
```

output
```planetext
This event is CreateIssueWebhook.
exports.createIssue = {
  action: "create",
  createdAt: "2021-01-30T11:19:39.427Z",
  data: {
    id: "236e0fe8-xxxx-xxxx-xxxx-b2df06e33810",
    createdAt: "2021-01-30T11:19:39.427Z",
    updatedAt: "2021-01-30T11:19:39.427Z",
    number: 11,
    title: "webhook test",
    priority: 0,
    boardOrder: -86.81,
    previousIdentifiers: [],
    priorityLabel: "No priority",
    teamId: "eeaa0cbd-xxxx-xxxx-xxxx-1c701c3485f1",
    stateId: "c02edc3a-xxxx-xxxx-xxxx-85c349766a13",
    subscriberIds: ["80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39"],
    creatorId: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
    labelIds: [],
    state: {
      id: "c02edc3a-xxxx-xxxx-xxxx-85c349766a13",
      name: "Backlog",
      color: "#bec2c8",
      type: "backlog",
    },
    team: {
      id: "eeaa0cbd-xxxx-xxxx-xxxx-1c701c3485f1",
      name: "korosuke613",
      key: "KOR",
    },
  },
  url: "https://linear.app/korosuke613/issue/KOR-11/webhook-test",
  type: "Issue",
};
```