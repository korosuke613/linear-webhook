import type { RemoveCommentWebhook } from "../../Interfaces";

export const removeComment: RemoveCommentWebhook = {
  action: "remove",
  createdAt: "2021-01-30T12:32:54.754Z",
  data: {
    id: "2f9e16c8-xxxx-xxxx-xxxx-932793a0f189",
    createdAt: "2021-01-30T12:32:49.944Z",
    updatedAt: "2021-01-30T12:32:49.944Z",
    body: "delete!",
    userId: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
    issueId: "236e0fe8-xxxx-xxxx-xxxx-b2df06e33810",
    // Emoji reaction used to be included here, but it became independent as `type: Reaction` on Feb 4, 2021.
    // reactions: [],
  },
  type: "Comment",
};
