/*
 *  Primitive types
 */
type Action = "create" | "update" | "remove";
type Type = "Issue" | "Comment" | "IssueLabel" | "Reaction" | "Cycle";

// ex) e788ada6-xxxx-yyyy-zzzz-5717c26104ad
type Id = `${string}-${string}-${string}-${string}-${string}`;
type IssueId = Id;
type UserId = Id;
type StateId = Id;
type LabelId = Id;
type ProjectId = Id;
type TeamId = Id;
type CycleId = Id;
type CommentId = Id;
type ReactionId = Id;

// ex) 2021-01-30T14:56:43.247Z
type ISOString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

/*
 * Primitive interfaces
 */
interface State {
  id: StateId;
  name: string;
  color: string;
  type: "backlog" | "unstarted" | "started" | "completed" | "canceled";
}
interface Team {
  id: TeamId;
  name: string;
  key: "KOR";
}

interface User {
  id: UserId;
  name: string;
}
interface Project {
  id: ProjectId;
  name: string;
}
interface Label {
  id: LabelId;
  name: string;
  color: string;
}

/*
 *  Data interfaces
 */
interface BaseData {
  id: IssueId | CommentId;
  createdAt: ISOString;
  updatedAt: ISOString;
}
interface IssueData extends BaseData {
  archivedAt?: ISOString;
  number: number;
  title: string;
  description?: string;
  priority: number;
  boardOrder: number;
  subIssueSortOrder?: number;
  previousIdentifiers: [];
  priorityLabel: string;
  teamId: TeamId;
  cycleId?: CycleId;
  stateId: StateId;
  assigneeId?: UserId;
  parentId?: IssueId;
  projectId?: ProjectId;
  subscriberIds: UserId[];
  creatorId: UserId;
  labelIds: LabelId[];
  assignee?: User;
  project?: Project;
  state: State;
  team: Team;
  labels?: Label[];
}
interface CommentData extends BaseData {
  body: string;
  editedAt?: ISOString;
  userId: UserId;
  issueId: IssueId;
  issue?: {
    id: IssueId;
    title: string;
  };
  user?: User;
}
interface IssueLabelDate extends BaseData {
  name: string;
  color: string;
  teamId: TeamId;
  creatorId: UserId;
}
interface ReactionData extends BaseData {
  emoji: string;
  userId: UserId;
  commentId: CommentId;
  comment: {
    id: CommentId;
    body: string;
    userId: UserId;
  };
  user: User;
}
interface CycleData extends BaseData {
  number: number;
  name?: string;
  startsAt: ISOString;
  endsAt: ISOString;
  issueCountHistory: number[];
  completedIssueCountHistory: number[];
  scopeHistory: number[];
  completedScopeHistory: number[];
  teamId: TeamId;
  uncompletedIssuesUponCloseIds: [];
}

/*
 *  Type interfaces
 */
export interface Base {
  action: Action;
  createdAt: ISOString;
  data: BaseData;
  type: Type;
}
export class BaseClass implements Partial<Base> {}
interface Issue extends Base {
  data: IssueData;
  type: Extract<Base["type"], "Issue">;
}
interface Comment extends Base {
  data: CommentData;
  type: Extract<Base["type"], "Comment">;
}
interface IssueLabel extends Base {
  data: IssueLabelDate;
  type: Extract<Base["type"], "IssueLabel">;
}
interface Reaction extends Base {
  data: ReactionData;
  type: Extract<Base["type"], "Reaction">;
}
interface Cycle extends Base {
  data: CycleData;
  type: Extract<Base["type"], "Cycle">;
}

/*
 *  Action interfaces
 */
interface Create {
  url?: string;
}
interface Update {
  updatedFrom: {
    updatedAt: null | ISOString;
    archivedAt: null | ISOString;
    description?: null | string;
    estimate?: null | number;
    startedAt?: null | ISOString;
    completedAt?: null | ISOString;
    canceledAt?: null | ISOString;
    autoClosedAt?: null | ISOString;
    autoArchivedAt?: null | ISOString;
    dueDate?: null | ISOString;
    cycleId?: null | CycleId;
    projectId?: null | ProjectId;
    stateId?: null | StateId;
    assigneeId?: null | UserId;
    parentId?: null | IssueId;
    subIssueSortOrder?: null | number;
    body?: string;
    editedAt?: null | ISOString;
    name?: null | string;
    startsAt?: null | ISOString;
    endsAt?: null | ISOString;
  };
  url?: string;
}
interface Remove {}

/*
 *  Webhook interfaces
 */
export interface CreateIssueWebhook extends Create, Issue {}
export interface UpdateIssueWebhook extends Update, Issue {
  updatedFrom: Omit<Update["updatedFrom"], "body" | "editedAt">;
}
export interface RemoveIssueWebhook extends Remove, Issue {}

export interface CreateCommentWebhook extends Create, Comment {
  data: Omit<CommentData, "editedAt">;
}
export interface UpdateCommentWebhook extends Update, Comment {
  updatedFrom: Pick<
    Update["updatedFrom"],
    "updatedAt" | "archivedAt" | "body" | "editedAt"
  >;
}
export interface RemoveCommentWebhook extends Remove, Comment {
  data: Omit<CommentData, "issue" | "user" | "editedAt">;
}

export interface CreateIssueLabelWebhook extends Create, IssueLabel {}
export interface UpdateIssueLabelWebhook extends Update, IssueLabel {}
export interface RemoveIssueLabelWebhook extends Remove, IssueLabel {
  data: IssueLabelDate & {
    archivedAt: ISOString;
  };
}

export interface CreateReactionWebhook extends Create, Reaction {}

export interface UpdateCycleWebhook extends Update, Cycle {}

export type Webhook =
  | Base
  | CreateIssueWebhook
  | UpdateIssueWebhook
  | RemoveIssueWebhook
  | CreateCommentWebhook
  | UpdateCommentWebhook
  | RemoveCommentWebhook
  | CreateIssueLabelWebhook
  | UpdateIssueLabelWebhook
  | RemoveIssueLabelWebhook
  | CreateReactionWebhook
  | UpdateCycleWebhook;

export const WebhookEvents = {
  CreateIssueWebhook: "CreateIssueWebhook",
  UpdateIssueWebhook: "UpdateIssueWebhook",
  RemoveIssueWebhook: "RemoveIssueWebhook",
  CreateCommentWebhook: "CreateCommentWebhook",
  UpdateCommentWebhook: "UpdateCommentWebhook",
  RemoveCommentWebhook: "RemoveCommentWebhook",
  CreateIssueLabelWebhook: "CreateIssueLabelWebhook",
  UpdateIssueLabelWebhook: "UpdateIssueLabelWebhook",
  RemoveIssueLabelWebhook: "RemoveIssueLabelWebhook",
  CreateReactionWebhook: "CreateReactionWebhook",
  UpdateCycleWebhook: "UpdateCycleWebhook",
  UnknownWebhook: "UnknownWebhook",
};

export type WebhookEventsUnion = keyof typeof WebhookEvents;
