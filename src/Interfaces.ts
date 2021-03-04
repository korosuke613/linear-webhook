/*
 *  Primitive types
 */
export type Action = "create" | "update" | "remove";
export type Type =
  | "Issue"
  | "Comment"
  | "IssueLabel"
  | "Reaction"
  | "Cycle"
  | "Project";

// ex) e788ada6-xxxx-yyyy-zzzz-5717c26104ad
export type Id = `${string}-${string}-${string}-${string}-${string}`;
export type IssueId = Id;
export type UserId = Id;
export type StateId = Id;
export type LabelId = Id;
export type ProjectId = Id;
export type TeamId = Id;
export type CycleId = Id;
export type CommentId = Id;
export type ReactionId = Id;
export type MilestoneId = Id;

// ex) 2021-01-30T14:56:43.247Z
export type ISOString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
// ex) 2021-01-30
export type SimpleDate = `${number}-${number}-${number}`;

export type IssueStateType =
  | "backlog"
  | "unstarted"
  | "started"
  | "completed"
  | "canceled";
export type ProjectStateType =
  | "planned"
  | "started"
  | "paused"
  | "completed"
  | "canceled";

/*
 * Primitive interfaces
 */
export interface State {
  id: StateId;
  name: string;
  color: string;
  type: IssueStateType;
}
export interface Team {
  id: TeamId;
  name: string;
  key: "KOR";
}

export interface User {
  id: UserId;
  name: string;
}
export interface Label {
  id: LabelId;
  name: string;
  color: string;
}

/*
 *  Data interfaces
 */
export interface BaseData {
  [key: string]: unknown;
  id: IssueId | CommentId;
  createdAt: ISOString;
  updatedAt: ISOString;
}
export interface IssueData extends BaseData {
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
  project?: {
    id: ProjectId;
    name: string;
  };
  state: State;
  team: Team;
  labels?: Label[];
}
export interface CommentData extends BaseData {
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
export interface IssueLabelDate extends BaseData {
  name: string;
  color: string;
  teamId: TeamId;
  creatorId: UserId;
}
export interface ReactionData extends BaseData {
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
export interface CycleData extends BaseData {
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
export interface ProjectData extends BaseData {
  name: string;
  description: string;
  slugId: string;
  icon?: string;
  color: string;
  state: ProjectStateType;
  creatorId: UserId;
  leadId?: UserId;
  milestoneId: MilestoneId;
  targetDate?: SimpleDate;
  startedAt?: ISOString;
  sortOrder: number;
  issueCountHistory: number[];
  completedIssueCountHistory: number[];
  scopeHistory: number[];
  completedScopeHistory: number[];
  slackNewIssue: boolean;
  slackIssueComments: boolean;
  slackIssueStatuses: boolean;
  teamIds: TeamId[];
  memberIds: UserId[];
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
export interface Issue extends Base {
  data: IssueData;
  type: Extract<Base["type"], "Issue">;
}
export interface Comment extends Base {
  data: CommentData;
  type: Extract<Base["type"], "Comment">;
}
export interface IssueLabel extends Base {
  data: IssueLabelDate;
  type: Extract<Base["type"], "IssueLabel">;
}
export interface Reaction extends Base {
  data: ReactionData;
  type: Extract<Base["type"], "Reaction">;
}
export interface Cycle extends Base {
  data: CycleData;
  type: Extract<Base["type"], "Cycle">;
}
export interface Project extends Base {
  data: ProjectData;
  type: Extract<Base["type"], "Project">;
}

/*
 *  Action interfaces
 */
export type Create<T = Base> = T & {
  url: string;
};
export type Update<T = Base> = T & {
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
};
export type Remove<T = Base> = T & {
  data: { archivedAt?: ISOString };
};

/*
 *  Webhook interfaces
 */
export interface CreateIssueWebhook extends Create<Issue> {}
export interface UpdateIssueWebhook extends Update<Issue> {
  updatedFrom: Omit<Update["updatedFrom"], "body" | "editedAt">;
}
export interface RemoveIssueWebhook extends Remove<Issue> {}

export interface CreateCommentWebhook extends Create<Comment> {}
export interface UpdateCommentWebhook extends Update<Comment> {
  updatedFrom: Pick<
    Update["updatedFrom"],
    "updatedAt" | "archivedAt" | "body" | "editedAt"
  >;
}
export interface RemoveCommentWebhook extends Remove<Comment> {}

export interface CreateIssueLabelWebhook
  extends Omit<Create<IssueLabel>, "url"> {}
export interface UpdateIssueLabelWebhook extends Update<IssueLabel> {}
export interface RemoveIssueLabelWebhook extends Remove<IssueLabel> {}

export interface CreateReactionWebhook extends Omit<Create<Reaction>, "url"> {}

export interface UpdateCycleWebhook extends Update<Cycle> {}

export interface CreateProjectWebhook extends Create<Project> {}
export interface UpdateProjectWebhook extends Update<Project> {}
export interface RemoveProjectWebhook extends Remove<Project> {
  data: Remove<Project>["data"] & {
    canceledAt: ISOString;
  };
  url: string;
}

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
  | UpdateCycleWebhook
  | CreateProjectWebhook
  | UpdateProjectWebhook
  | RemoveProjectWebhook;

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
  CreateProjectWebhook: "CreateProjectWebhook",
  UpdateProjectWebhook: "UpdateProjectWebhook",
  RemoveProjectWebhook: "RemoveProjectWebhook",
  UnknownWebhook: "UnknownWebhook",
};

export type WebhookEventsUnion = keyof typeof WebhookEvents;
