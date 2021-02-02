import { createIssue } from "./createIssue";
import { createComment } from "./createComment";
import { updateIssueLabel } from "./updateIssueLabel";
import { updateComment } from "./updateComment";
import { removeComment } from "./removeComment";
import { removeIssue } from "./removeIssue";
import { unknownAction } from "./unknownAction";
import { unknownType } from "./unknownType";

export default {
  createIssue,
  createComment,
  updateIssueLabel,
  updateComment,
  removeIssue,
  removeComment,
  unknownType,
  unknownAction,
};
