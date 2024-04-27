import type { UpdateCycleWebhook } from "../../Interfaces";

export const updateCycleForRename: UpdateCycleWebhook = {
  action: "update",
  createdAt: "2021-02-07T11:54:03.602Z",
  data: {
    id: "8becebd5-xxxx-xxxx-xxxx-5a4c46206590",
    createdAt: "2021-01-30T11:21:04.585Z",
    updatedAt: "2021-02-07T11:54:03.602Z",
    number: 1,
    name: "rename cycle",
    startsAt: "2021-01-24T15:00:00.000Z",
    endsAt: "2021-02-07T15:00:00.000Z",
    issueCountHistory: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    completedIssueCountHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    scopeHistory: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    completedScopeHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    teamId: "eeaa0cbd-xxxx-xxxx-xxxx-1c701c3485f1",
    uncompletedIssuesUponCloseIds: [],
  },
  updatedFrom: {
    updatedAt: "2021-02-06T15:00:01.678Z",
    archivedAt: null,
    name: null,
    completedAt: null,
  },
  type: "Cycle",
};
