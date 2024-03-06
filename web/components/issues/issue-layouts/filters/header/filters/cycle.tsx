import React, { useState } from "react"
import { FilterHeader, FilterOption } from "@components/issues"
import { useApplication, useCycle } from "@hooks/store"
import sortBy from "lodash/sortBy"
import { observer } from "mobx-react"
import { TCycleGroups } from "@servcy/types"
import { CycleGroupIcon, Loader } from "@servcy/ui"

type Props = {
    appliedFilters: string[] | null
    handleUpdate: (val: string) => void
    searchQuery: string
}

export const FilterCycle: React.FC<Props> = observer((props) => {
    const { appliedFilters, handleUpdate, searchQuery } = props

    const {
        router: { projectId },
    } = useApplication()
    const { getCycleById, getProjectCycleIds } = useCycle()

    // states
    const [itemsToRender, setItemsToRender] = useState(5)
    const [previewEnabled, setPreviewEnabled] = useState(true)

    const cycleIds = projectId ? getProjectCycleIds(projectId) : undefined
    const cycles = cycleIds?.map((projectId) => getCycleById(projectId)!) ?? null
    const appliedFiltersCount = appliedFilters?.length ?? 0
    const filteredOptions = sortBy(
        cycles?.filter((cycle) => cycle.name.toLowerCase().includes(searchQuery.toLowerCase())),
        (cycle) => cycle.name.toLowerCase()
    )

    const handleViewToggle = () => {
        if (!filteredOptions) return

        if (itemsToRender === filteredOptions.length) setItemsToRender(5)
        else setItemsToRender(filteredOptions.length)
    }

    const cycleStatus = (status: TCycleGroups) => (status ? status.toLocaleLowerCase() : "draft") as TCycleGroups

    return (
        <>
            <FilterHeader
                title={`Cycle ${appliedFiltersCount > 0 ? ` (${appliedFiltersCount})` : ""}`}
                isPreviewEnabled={previewEnabled}
                handleIsPreviewEnabled={() => setPreviewEnabled(!previewEnabled)}
            />
            {previewEnabled && (
                <div>
                    {filteredOptions ? (
                        filteredOptions.length > 0 ? (
                            <>
                                {filteredOptions.slice(0, itemsToRender).map((cycle) => (
                                    <FilterOption
                                        key={cycle.id}
                                        isChecked={appliedFilters?.includes(cycle.id) ? true : false}
                                        onClick={() => handleUpdate(cycle.id)}
                                        icon={
                                            <CycleGroupIcon
                                                cycleGroup={cycleStatus(cycle?.status)}
                                                className="h-3.5 w-3.5 flex-shrink-0"
                                            />
                                        }
                                        title={cycle.name}
                                        activePulse={cycleStatus(cycle?.status) === "current" ? true : false}
                                    />
                                ))}
                                {filteredOptions.length > 5 && (
                                    <button
                                        type="button"
                                        className="ml-8 text-xs font-medium text-custom-primary-100"
                                        onClick={handleViewToggle}
                                    >
                                        {itemsToRender === filteredOptions.length ? "View less" : "View all"}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-xs italic text-custom-text-400">No matches found</p>
                        )
                    ) : (
                        <Loader className="space-y-2">
                            <Loader.Item height="20px" />
                            <Loader.Item height="20px" />
                            <Loader.Item height="20px" />
                        </Loader>
                    )}
                </div>
            )}
        </>
    )
})
