import { useRouter } from "next/router"
import React, { useState } from "react"
// component
import { ApiTokenListItem, CreateApiTokenModal } from "@components/api-token"
import { PageHead } from "@components/core"
import { EmptyState, getEmptyStateImagePath } from "@components/empty-state"
import { WorkspaceSettingHeader } from "@components/headers"
import { APITokenSettingsLoader } from "@components/ui"
import { WORKSPACE_SETTINGS_EMPTY_STATE_DETAILS } from "@constants/empty-state"
import { API_TOKENS_LIST } from "@constants/fetch-keys"
import { EUserWorkspaceRoles } from "@constants/workspace"
// store hooks
import { useUser, useWorkspace } from "@hooks/store"
import { AppLayout } from "@layouts/app-layout"
import { WorkspaceSettingLayout } from "@layouts/settings-layout"
import { APITokenService } from "@services/api_token.service"
import { observer } from "mobx-react-lite"
import { useTheme } from "next-themes"
import useSWR from "swr"
import { Button } from "@servcy/ui"
import { NextPageWithLayout } from "@/types/types"

const apiTokenService = new APITokenService()

const ApiTokensPage: NextPageWithLayout = observer(() => {
    // states
    const [isCreateTokenModalOpen, setIsCreateTokenModalOpen] = useState(false)
    // router
    const router = useRouter()
    const { workspaceSlug } = router.query
    // theme
    const { resolvedTheme } = useTheme()
    // store hooks
    const {
        membership: { currentWorkspaceRole },
        currentUser,
    } = useUser()
    const { currentWorkspace } = useWorkspace()

    const isAdmin = currentWorkspaceRole === EUserWorkspaceRoles.ADMIN

    const { data: tokens } = useSWR(workspaceSlug && isAdmin ? API_TOKENS_LIST(workspaceSlug.toString()) : null, () =>
        workspaceSlug && isAdmin ? apiTokenService.getApiTokens(workspaceSlug.toString()) : null
    )

    const emptyStateDetail = WORKSPACE_SETTINGS_EMPTY_STATE_DETAILS["api-tokens"]
    const isLightMode = resolvedTheme ? resolvedTheme === "light" : currentUser?.theme.theme === "light"
    const emptyStateImage = getEmptyStateImagePath("workspace-settings", "api-tokens", isLightMode)
    const pageTitle = currentWorkspace?.name ? `${currentWorkspace.name} - API Tokens` : undefined

    if (!isAdmin)
        return (
            <>
                <PageHead title={pageTitle} />
                <div className="mt-10 flex h-full w-full justify-center p-4">
                    <p className="text-sm text-custom-text-300">You are not authorized to access this page.</p>
                </div>
            </>
        )

    if (!tokens) {
        return <APITokenSettingsLoader />
    }

    return (
        <>
            <PageHead title={pageTitle} />
            <CreateApiTokenModal isOpen={isCreateTokenModalOpen} onClose={() => setIsCreateTokenModalOpen(false)} />
            <section className="h-full w-full overflow-y-auto py-8 pr-9">
                {tokens.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between border-b border-custom-border-200 py-3.5">
                            <h3 className="text-xl font-medium">API tokens</h3>
                            <Button variant="primary" onClick={() => setIsCreateTokenModalOpen(true)}>
                                Add API token
                            </Button>
                        </div>
                        <div>
                            {tokens.map((token) => (
                                <ApiTokenListItem key={token.id} token={token} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex h-full w-full flex-col">
                        <div className="flex items-center justify-between gap-4 border-b border-custom-border-200 pb-3.5">
                            <h3 className="text-xl font-medium">API tokens</h3>
                            <Button variant="primary" onClick={() => setIsCreateTokenModalOpen(true)}>
                                Add API token
                            </Button>
                        </div>
                        <div className="h-full w-full flex items-center justify-center">
                            <EmptyState
                                title={emptyStateDetail.title}
                                description={emptyStateDetail.description}
                                image={emptyStateImage}
                                size="lg"
                            />
                        </div>
                    </div>
                )}
            </section>
        </>
    )
})

ApiTokensPage.getWrapper = function getWrapper(page: React.ReactElement) {
    return (
        <AppLayout header={<WorkspaceSettingHeader title="API Tokens" />}>
            <WorkspaceSettingLayout>{page}</WorkspaceSettingLayout>
        </AppLayout>
    )
}

export default ApiTokensPage
