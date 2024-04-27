import type { RemoveIssueWebhook } from "../../Interfaces";

export const removeIssue: RemoveIssueWebhook = {
  action: "remove",
  createdAt: "2021-01-30T11:48:48.707Z",
  data: {
    id: "ac36bcc2-xxxx-xxxx-xxxx-3e13107f89be",
    createdAt: "2021-01-30T11:33:45.487Z",
    updatedAt: "2021-01-30T11:33:45.487Z",
    archivedAt: "2021-01-30T11:48:48.707Z",
    number: 12,
    title: "webhook test 2",
    priority: 0,
    boardOrder: -40.42,
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
  type: "Issue",
};
