import { UpdateCommentWebhook } from "../../Interfaces";

export const updateComment: UpdateCommentWebhook = {
  action: "update",
  createdAt: "2021-01-31T13:13:07.588Z",
  data: {
    id: "00c2b179-xxxx-xxxx-xxxx-35c186e550c9",
    createdAt: "2021-01-31T13:13:00.988Z",
    updatedAt: "2021-01-31T13:13:07.588Z",
    body: "editt!!!!",
    editedAt: "2021-01-31T13:13:07.591Z",
    userId: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
    issueId: "14ddd1f7-xxxx-xxxx-xxxx-cad3439579f8",
    issue: {
      id: "14ddd1f7-xxxx-xxxx-xxxx-cad3439579f8",
      title: "subissue",
    },
    user: {
      id: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
      name: "user@example.com",
    },
    reactions: [],
  },
  updatedFrom: {
    updatedAt: "2021-01-31T13:13:00.988Z",
    archivedAt: null,
    body: "aaaaa",
    editedAt: null,
  },
  url: "https://linear.app/korosuke613/issue/KOR-15/subissue#comment-00c2b179",
  type: "Comment",
};
