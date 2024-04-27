import type { CreateReactionWebhook } from "../../Interfaces";

export const createReaction: CreateReactionWebhook = {
  action: "create",
  createdAt: "2021-02-07T10:10:55.083Z",
  data: {
    id: "c6d50a94-xxxx-xxxx-xxxx-8a552952a50e",
    createdAt: "2021-02-07T10:10:55.083Z",
    updatedAt: "2021-02-07T10:10:55.083Z",
    emoji: "white_check_mark",
    userId: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
    commentId: "fd58dfb7-xxxx-xxxx-xxxx-759c3c2437d5",
    comment: {
      id: "fd58dfb7-xxxx-xxxx-xxxx-759c3c2437d5",
      body: "new comment",
      userId: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
    },
    user: {
      id: "80e102b0-xxxx-xxxx-xxxx-044bcfb4cd39",
      name: "hoge@example.com",
    },
  },
  type: "Reaction",
};
