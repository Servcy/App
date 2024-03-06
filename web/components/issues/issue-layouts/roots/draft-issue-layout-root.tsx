import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import useSWR from "swr";

import { useIssues } from "@hooks/store";

import { DraftIssueAppliedFiltersRoot } from "../filters/applied-filters/roots/draft-issue";
import { DraftIssueListLayout } from "../list/roots/draft-issue-root";
import { ProjectDraftEmptyState } from "../empty-states";
import { IssuePeekOverview } from "@components/issues/peek-overview";
import { ActiveLoader } from "@components/ui";

import { DraftKanBanLayout } from "../kanban/roots/draft-issue-root";

import { EIssuesStoreType } from "@constants/issue";

export const DraftIssueLayoutRoot: React.FC = observer(() => {
  // router
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  const { issues, issuesFilter } = useIssues(EIssuesStoreType.DRAFT);

  useSWR(
    workspaceSlug && projectId ? `DRAFT_ISSUES_${workspaceSlug.toString()}_${projectId.toString()}` : null,
    async () => {
      if (workspaceSlug && projectId) {
        await issuesFilter?.fetchFilters(workspaceSlug.toString(), projectId.toString());
        await issues?.fetchIssues(
          workspaceSlug.toString(),
          projectId.toString(),
          issues?.groupedIssueIds ? "mutation" : "init-loader"
        );
      }
    },
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const activeLayout = issuesFilter?.issueFilters?.displayFilters?.layout || undefined;

  if (!workspaceSlug || !projectId) return <></>;

  if (issues?.loader === "init-loader" || !issues?.groupedIssueIds) {
    return <>{activeLayout && <ActiveLoader layout={activeLayout} />}</>;
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <DraftIssueAppliedFiltersRoot />

      {issues?.groupedIssueIds?.length === 0 ? (
        <div className="relative h-full w-full overflow-y-auto">
          <ProjectDraftEmptyState />
        </div>
      ) : (
        <div className="relative h-full w-full overflow-auto">
          {activeLayout === "list" ? (
            <DraftIssueListLayout />
          ) : activeLayout === "kanban" ? (
            <DraftKanBanLayout />
          ) : null}
          {/* issue peek overview */}
          <IssuePeekOverview is_draft />
        </div>
      )}
    </div>
  );
});