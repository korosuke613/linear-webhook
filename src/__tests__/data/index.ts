import { createComment } from "./createComment";
import { createIssue } from "./createIssue";
import { createIssueLabel } from "./createIssueLabel";
import { createProjectForAllSetting } from "./createProjectForAllSetting";
import { createReaction } from "./createReaction";
import { removeComment } from "./removeComment";
import { removeIssue } from "./removeIssue";
import { removeIssueLabel } from "./removeIssueLabel";
import { removeProject } from "./removeProject";
import { unknownAction } from "./unknownAction";
import { unknownType } from "./unknownType";
import { updateComment } from "./updateComment";
import { updateCycleForChangeStartTime } from "./updateCycleForChangeStartTime";
import { updateIssueForLabel } from "./updateIssueForLabel";
import { updateIssueLabel } from "./updateIssueLabel";
import { updateProjectForRename } from "./updateProjectForRename";

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
  createProjectForAllSetting,
  updateProjectForRename,
  removeProject,
};
