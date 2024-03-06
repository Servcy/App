import { useRouter } from "next/router"
import { FC, useMemo } from "react"
import { ProjectIssueQuickActions } from "@components/issues"
import { EIssuesStoreType } from "@constants/issue"
import { useIssues } from "@hooks/store"
import { observer } from "mobx-react-lite"
import { TIssue } from "@servcy/types"
import { EIssueActions } from "../../types"
import { BaseListRoot } from "../base-list-root"

export const ListLayout: FC = observer(() => {
    const router = useRouter()
    const { workspaceSlug, projectId } = router.query as { workspaceSlug: string; projectId: string }

    if (!workspaceSlug || !projectId) return null

    // store
    const { issuesFilter, issues } = useIssues(EIssuesStoreType.PROJECT)

    const issueActions = useMemo(
        () => ({
            [EIssueActions.UPDATE]: async (issue: TIssue) => {
                if (!workspaceSlug || !projectId) return

                await issues.updateIssue(workspaceSlug, projectId, issue.id, issue)
            },
            [EIssueActions.DELETE]: async (issue: TIssue) => {
                if (!workspaceSlug || !projectId) return

                await issues.removeIssue(workspaceSlug, projectId, issue.id)
            },
            [EIssueActions.ARCHIVE]: async (issue: TIssue) => {
                if (!workspaceSlug || !projectId) return

                await issues.archiveIssue(workspaceSlug, projectId, issue.id)
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [issues]
    )

    return (
        <BaseListRoot
            issuesFilter={issuesFilter}
            issues={issues}
            QuickActions={ProjectIssueQuickActions}
            issueActions={issueActions}
            storeType={EIssuesStoreType.PROJECT}
        />
    )
})
