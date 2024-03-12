"use client"

import { useState } from "react"

import { Search } from "lucide-react"
import { observer } from "mobx-react"

import { PageHead } from "@components/core"
import { GlobalIssuesHeader } from "@components/headers"
import { GlobalDefaultViewListItem, GlobalViewsList } from "@components/workspace"

import { useWorkspace } from "@hooks/store"

import { DEFAULT_GLOBAL_VIEWS_LIST } from "@constants/workspace"

import { AppWrapper } from "@wrappers/app"


import { Input } from "@servcy/ui"

const WorkspaceViewsPage = observer(() => {
    const [query, setQuery] = useState("")
    // store
    const { currentWorkspace } = useWorkspace()
    // derived values
    const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - All Views` : undefined

    return (
        <AppWrapper header={<GlobalIssuesHeader activeLayout="list" />}>
            <PageHead title={pageTitle} />
            <div className="flex flex-col h-full w-full overflow-hidden">
                <div className="flex h-11 w-full items-center gap-2.5  px-5 py-3 overflow-hidden border-b border-custom-border-200">
                    <Search className="text-custom-text-200" size={14} strokeWidth={2} />
                    <Input
                        className="w-full bg-transparent !p-0 text-xs leading-5 text-custom-text-200 placeholder:text-custom-text-400 focus:outline-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        mode="true-transparent"
                    />
                </div>
                <div className="flex flex-col h-full w-full vertical-scrollbar scrollbar-lg">
                    {DEFAULT_GLOBAL_VIEWS_LIST.filter((v) => v.label.toLowerCase().includes(query.toLowerCase())).map(
                        (option) => (
                            <GlobalDefaultViewListItem key={option.key} view={option} />
                        )
                    )}
                    <GlobalViewsList searchQuery={query} />
                </div>
            </div>
        </AppWrapper>
    )
})

export default WorkspaceViewsPage
