import type { UpdateIssueLabelWebhook } from "../../Interfaces";

export const updateIssueLabel: UpdateIssueLabelWebhook = {
  action: "update",
  createdAt: "2021-02-07T09:33:32.156Z",
  data: {
    id: "13aa50db-xxxx-xxxx-xxxx-1cdd26695e65",
    createdAt: "2021-02-07T09:17:51.393Z",
    updatedAt: "2021-02-07T09:33:32.156Z",
    name: "update new label",
    color: "#5a450d",
    teamId: "eeaa0cbd-xxxx-xxxx-xxxx-1c701c3485f1",
    creatorId: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
  },
  updatedFrom: {
    updatedAt: "2021-02-07T09:17:51.393Z",
    archivedAt: null,
    name: "new label",
    description: null,
  },
  type: "IssueLabel",
};
