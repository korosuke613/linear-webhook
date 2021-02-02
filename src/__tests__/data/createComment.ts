import { CreateCommentWebhook } from "../../Interfaces";

export const createComment: CreateCommentWebhook = {
  action: "create",
  createdAt: "2021-01-30T11:47:17.226Z",
  data: {
    id: "5081a82b-xxxx-xxxx-xxxx-37d7be02a506",
    createdAt: "2021-01-30T11:47:17.226Z",
    updatedAt: "2021-01-30T11:47:17.226Z",
    body: "コメントだーい",
    userId: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
    issueId: "ac36bcc2-xxxx-xxxx-xxxx-3e13107f89be",
    issue: {
      id: "ac36bcc2-xxxx-xxxx-xxxx-3e13107f89be",
      title: "webhook test 2",
    },
    user: {
      id: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
      name: "user@example.com",
    },
    reactions: [],
  },
  url:
    "https://linear.app/korosuke613/issue/KOR-12/webhook-test-2#comment-5081a82b",
  type: "Comment",
};
