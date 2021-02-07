import { createIssue } from "./createIssue";
import { createComment } from "./createComment";
import { updateIssueForLabel } from "./updateIssueForLabel";
import { updateComment } from "./updateComment";
import { removeComment } from "./removeComment";
import { removeIssue } from "./removeIssue";
import { unknownAction } from "./unknownAction";
import { unknownType } from "./unknownType";
import { createIssueLabel } from "./createIssueLabel";
import { updateIssueLabel } from "./updateIssueLabel";
import { removeIssueLabel } from "./removeIssueLabel";
import { createReaction } from "./createReaction";
import { updateCycleForChangeStartTime } from "./updateCycleForChangeStartTime";

export default {
  createIssue,
  createComment,
  updateIssueForLabel,
  updateComment,
  removeIssue,
  removeComment,
  createIssueLabel,
  updateIssueLabel,
  removeIssueLabel,
  createReaction,
  unknownType,
  unknownAction,
  updateCycleForChangeStartTime,
};
