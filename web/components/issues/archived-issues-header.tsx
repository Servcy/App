import { useParams } from "next/navigation"

import { FC } from "react"

import { observer } from "mobx-react-lite"

// components
import { ArchiveTabsList } from "@components/archives"
import { DisplayFiltersSelection, FiltersDropdown, FilterSelection } from "@components/issues"

// hooks
import { useIssues, useLabel, useMember, useProjectState } from "@hooks/store"

// constants
import { EIssueFilterType, EIssuesStoreType, ISSUE_DISPLAY_FILTERS_BY_LAYOUT } from "@constants/issue"

// types
import type { IIssueDisplayFilterOptions, IIssueDisplayProperties, IIssueFilterOptions } from "@servcy/types"

export const ArchivedIssuesHeader: FC = observer(() => {
    const { workspaceSlug, projectId } = useParams()
    // store hooks
    const {
        issuesFilter: { issueFilters, updateFilters },
    } = useIssues(EIssuesStoreType.ARCHIVED)
    const { projectStates } = useProjectState()
    const { projectLabels } = useLabel()
    const {
        project: { projectMemberIds },
    } = useMember()
    // for archived issues list layout is the only option
    const activeLayout = "list"
    // hooks
    const handleFiltersUpdate = (key: keyof IIssueFilterOptions, value: string | string[]) => {
        if (!workspaceSlug || !projectId) return

        const newValues = issueFilters?.filters?.[key] ?? []

        if (Array.isArray(value)) {
            value.forEach((val) => {
                if (!newValues.includes(val)) newValues.push(val)
            })
        } else {
            if (issueFilters?.filters?.[key]?.includes(value)) newValues.splice(newValues.indexOf(value), 1)
            else newValues.push(value)
        }

        updateFilters(workspaceSlug.toString(), projectId.toString(), EIssueFilterType.FILTERS, {
            [key]: newValues,
        })
    }

    const handleDisplayFiltersUpdate = (updatedDisplayFilter: Partial<IIssueDisplayFilterOptions>) => {
        if (!workspaceSlug || !projectId) return

        updateFilters(workspaceSlug.toString(), projectId.toString(), EIssueFilterType.DISPLAY_FILTERS, {
            ...issueFilters?.displayFilters,
            ...updatedDisplayFilter,
        })
    }

    const handleDisplayPropertiesUpdate = (property: Partial<IIssueDisplayProperties>) => {
        if (!workspaceSlug || !projectId) return

        updateFilters(workspaceSlug.toString(), projectId.toString(), EIssueFilterType.DISPLAY_PROPERTIES, property)
    }

    return (
        <div className="group relative flex border-b border-custom-border-200">
            <div className="flex w-full items-center overflow-x-auto px-4 gap-2 horizontal-scrollbar scrollbar-sm">
                <ArchiveTabsList />
            </div>
            {/* filter options */}
            <div className="flex items-center gap-2 px-8">
                <FiltersDropdown title="Filters" placement="bottom-end">
                    <FilterSelection
                        filters={issueFilters?.filters || {}}
                        handleFiltersUpdate={handleFiltersUpdate}
                        layoutDisplayFiltersOptions={
                            activeLayout ? ISSUE_DISPLAY_FILTERS_BY_LAYOUT.archived_issues[activeLayout] : undefined
                        }
                        labels={projectLabels}
                        memberIds={projectMemberIds ?? undefined}
                        states={projectStates}
                    />
                </FiltersDropdown>
                <FiltersDropdown title="Display" placement="bottom-end">
                    <DisplayFiltersSelection
                        displayFilters={issueFilters?.displayFilters || {}}
                        displayProperties={issueFilters?.displayProperties || {}}
                        handleDisplayFiltersUpdate={handleDisplayFiltersUpdate}
                        handleDisplayPropertiesUpdate={handleDisplayPropertiesUpdate}
                        layoutDisplayFiltersOptions={
                            activeLayout ? ISSUE_DISPLAY_FILTERS_BY_LAYOUT.issues[activeLayout] : undefined
                        }
                    />
                </FiltersDropdown>
            </div>
        </div>
    )
})
