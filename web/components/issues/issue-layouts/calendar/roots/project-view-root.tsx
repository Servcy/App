import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import { useIssues } from "@hooks/store";

import { ProjectIssueQuickActions } from "@components/issues";
import { BaseCalendarRoot } from "../base-calendar-root";

import { TIssue } from "@servcy/types";
import { EIssueActions } from "../../types";

import { EIssuesStoreType } from "@constants/issue";

export interface IViewCalendarLayout {
  issueActions: {
    [EIssueActions.DELETE]: (issue: TIssue) => Promise<void>;
    [EIssueActions.UPDATE]?: (issue: TIssue) => Promise<void>;
    [EIssueActions.REMOVE]?: (issue: TIssue) => Promise<void>;
    [EIssueActions.ARCHIVE]?: (issue: TIssue) => Promise<void>;
  };
}

export const ProjectViewCalendarLayout: React.FC<IViewCalendarLayout> = observer((props) => {
  const { issueActions } = props;
  // store
  const { issues, issuesFilter } = useIssues(EIssuesStoreType.PROJECT_VIEW);
  // router
  const router = useRouter();
  const { viewId } = router.query;

  return (
    <BaseCalendarRoot
      issueStore={issues}
      issuesFilterStore={issuesFilter}
      QuickActions={ProjectIssueQuickActions}
      issueActions={issueActions}
      viewId={viewId?.toString()}
    />
  );
});