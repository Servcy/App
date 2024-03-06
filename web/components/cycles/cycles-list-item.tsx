import Link from "next/link"
import { useRouter } from "next/router"
import { FC, MouseEvent, useState } from "react"
import { CycleCreateUpdateModal, CycleDeleteModal } from "@components/cycles"
import { CYCLE_STATUS } from "@constants/cycle"
import { CYCLE_FAVORITED, CYCLE_UNFAVORITED } from "@constants/event-tracker"
import { EUserWorkspaceRoles } from "@constants/workspace"
import { findHowManyDaysLeft, renderFormattedDate } from "@helpers/date-time.helper"
import { copyTextToClipboard } from "@helpers/string.helper"
import { useCycle, useEventTracker, useMember, useUser } from "@hooks/store"
import { Check, Info, LinkIcon, Pencil, Star, Trash2, User2 } from "lucide-react"
import { observer } from "mobx-react"
import toast from "react-hot-toast"
import { TCycleGroups } from "@servcy/types"
import { Avatar, AvatarGroup, CircularProgressIndicator, CustomMenu, CycleGroupIcon, Tooltip } from "@servcy/ui"

type TCyclesListItem = {
    cycleId: string
    handleEditCycle?: () => void
    handleDeleteCycle?: () => void
    handleAddToFavorites?: () => void
    handleRemoveFromFavorites?: () => void
    workspaceSlug: string
    projectId: string
}

export const CyclesListItem: FC<TCyclesListItem> = observer((props) => {
    const { cycleId, workspaceSlug, projectId } = props
    // states
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    // router
    const router = useRouter()
    // store hooks
    const { setTrackElement, captureEvent } = useEventTracker()
    const {
        membership: { currentProjectRole },
    } = useUser()
    const { getCycleById, addCycleToFavorites, removeCycleFromFavorites } = useCycle()
    const { getUserDetails } = useMember()

    const handleCopyText = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const originURL = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

        copyTextToClipboard(`${originURL}/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}`).then(() => {
            toast.error({
                type: "success",
                title: "Link Copied!",
                message: "Cycle link copied to clipboard.",
            })
        })
    }

    const handleAddToFavorites = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!workspaceSlug || !projectId) return

        addCycleToFavorites(workspaceSlug?.toString(), projectId.toString(), cycleId)
            .then(() => {
                captureEvent(CYCLE_FAVORITED, {
                    cycle_id: cycleId,
                    element: "List layout",
                    state: "SUCCESS",
                })
            })
            .catch(() => {
                toast.error({
                    type: "error",
                    title: "Error!",
                    message: "Couldn't add the cycle to favorites. Please try again.",
                })
            })
    }

    const handleRemoveFromFavorites = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!workspaceSlug || !projectId) return

        removeCycleFromFavorites(workspaceSlug?.toString(), projectId.toString(), cycleId)
            .then(() => {
                captureEvent(CYCLE_UNFAVORITED, {
                    cycle_id: cycleId,
                    element: "List layout",
                    state: "SUCCESS",
                })
            })
            .catch(() => {
                toast.error({
                    type: "error",
                    title: "Error!",
                    message: "Couldn't add the cycle to favorites. Please try again.",
                })
            })
    }

    const handleEditCycle = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setTrackElement("Cycles page list layout")
        setUpdateModal(true)
    }

    const handleDeleteCycle = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setTrackElement("Cycles page list layout")
        setDeleteModal(true)
    }

    const openCycleOverview = (e: MouseEvent<HTMLButtonElement>) => {
        const { query } = router
        e.preventDefault()
        e.stopPropagation()

        router.push({
            pathname: router.pathname,
            query: { ...query, peekCycle: cycleId },
        })
    }

    const cycleDetails = getCycleById(cycleId)

    if (!cycleDetails) return null

    // computed
    // TODO: change this logic once backend fix the response
    const cycleStatus = cycleDetails.status ? (cycleDetails.status.toLocaleLowerCase() as TCycleGroups) : "draft"
    const isCompleted = cycleStatus === "completed"
    const endDate = new Date(cycleDetails.end_date ?? "")
    const startDate = new Date(cycleDetails.start_date ?? "")

    const isEditingAllowed = !!currentProjectRole && currentProjectRole >= EUserWorkspaceRoles.MEMBER

    const cycleTotalIssues =
        cycleDetails.backlog_issues +
        cycleDetails.unstarted_issues +
        cycleDetails.started_issues +
        cycleDetails.completed_issues +
        cycleDetails.cancelled_issues

    const renderDate = cycleDetails.start_date || cycleDetails.end_date

    // const areYearsEqual = startDate.getFullYear() === endDate.getFullYear();

    const completionPercentage = (cycleDetails.completed_issues / cycleTotalIssues) * 100

    const progress = isNaN(completionPercentage) ? 0 : Math.floor(completionPercentage)

    const currentCycle = CYCLE_STATUS.find((status) => status.value === cycleStatus)

    const daysLeft = findHowManyDaysLeft(cycleDetails.end_date) ?? 0

    return (
        <>
            <CycleCreateUpdateModal
                data={cycleDetails}
                isOpen={updateModal}
                handleClose={() => setUpdateModal(false)}
                workspaceSlug={workspaceSlug}
                projectId={projectId}
            />
            <CycleDeleteModal
                cycle={cycleDetails}
                isOpen={deleteModal}
                handleClose={() => setDeleteModal(false)}
                workspaceSlug={workspaceSlug}
                projectId={projectId}
            />
            <Link href={`/${workspaceSlug}/projects/${projectId}/cycles/${cycleDetails.id}`}>
                <div className="group flex w-full flex-col items-center justify-between gap-5 border-b border-custom-border-100 bg-custom-background-100 px-5 py-6 text-sm hover:bg-custom-background-90 md:flex-row">
                    <div className="relative flex w-full items-center justify-between gap-3 overflow-hidden">
                        <div className="relative flex w-full items-center gap-3 overflow-hidden">
                            <div className="flex-shrink-0">
                                <CircularProgressIndicator size={38} percentage={progress}>
                                    {isCompleted ? (
                                        progress === 100 ? (
                                            <Check className="h-3 w-3 stroke-[2] text-custom-primary-100" />
                                        ) : (
                                            <span className="text-sm text-custom-primary-100">{`!`}</span>
                                        )
                                    ) : progress === 100 ? (
                                        <Check className="h-3 w-3 stroke-[2] text-custom-primary-100" />
                                    ) : (
                                        <span className="text-xs text-custom-text-300">{`${progress}%`}</span>
                                    )}
                                </CircularProgressIndicator>
                            </div>

                            <div className="relative flex items-center gap-2.5 overflow-hidden">
                                <CycleGroupIcon cycleGroup={cycleStatus} className="h-3.5 w-3.5 flex-shrink-0" />
                                <Tooltip tooltipContent={cycleDetails.name} position="top">
                                    <span className="line-clamp-1 inline-block overflow-hidden truncate text-base font-medium">
                                        {cycleDetails.name}
                                    </span>
                                </Tooltip>
                            </div>

                            <button
                                onClick={openCycleOverview}
                                className="flex-shrink-0 z-[5] invisible group-hover:visible"
                            >
                                <Info className="h-4 w-4 text-custom-text-400" />
                            </button>
                        </div>

                        {currentCycle && (
                            <div
                                className="relative flex h-6 w-20 flex-shrink-0 items-center justify-center rounded-sm text-center text-xs"
                                style={{
                                    color: currentCycle.color,
                                    backgroundColor: `${currentCycle.color}20`,
                                }}
                            >
                                {currentCycle.value === "current"
                                    ? `${daysLeft} ${daysLeft > 1 ? "days" : "day"} left`
                                    : `${currentCycle.label}`}
                            </div>
                        )}
                    </div>
                    <div className="relative flex w-full flex-shrink-0 items-center justify-between gap-2.5 overflow-hidden md:w-auto md:flex-shrink-0 md:justify-end ">
                        <div className="text-xs text-custom-text-300">
                            {renderDate &&
                                `${renderFormattedDate(startDate) ?? `_ _`} - ${renderFormattedDate(endDate) ?? `_ _`}`}
                        </div>

                        <div className="relative flex flex-shrink-0 items-center gap-3">
                            <Tooltip tooltipContent={`${cycleDetails.assignee_ids?.length} Members`}>
                                <div className="flex w-10 cursor-default items-center justify-center">
                                    {cycleDetails.assignee_ids?.length > 0 ? (
                                        <AvatarGroup showTooltip={false}>
                                            {cycleDetails.assignee_ids?.map((assigne_id) => {
                                                const member = getUserDetails(assigne_id)
                                                return (
                                                    <Avatar
                                                        key={member?.id}
                                                        name={member?.display_name}
                                                        src={member?.avatar}
                                                    />
                                                )
                                            })}
                                        </AvatarGroup>
                                    ) : (
                                        <span className="flex h-5 w-5 items-end justify-center rounded-full border border-dashed border-custom-text-400 bg-custom-background-80">
                                            <User2 className="h-4 w-4 text-custom-text-400" />
                                        </span>
                                    )}
                                </div>
                            </Tooltip>

                            {isEditingAllowed && (
                                <>
                                    {cycleDetails.is_favorite ? (
                                        <button type="button" onClick={handleRemoveFromFavorites}>
                                            <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                                        </button>
                                    ) : (
                                        <button type="button" onClick={handleAddToFavorites}>
                                            <Star className="h-3.5 w-3.5 text-custom-text-200" />
                                        </button>
                                    )}

                                    <CustomMenu ellipsis>
                                        {!isCompleted && isEditingAllowed && (
                                            <>
                                                <CustomMenu.MenuItem onClick={handleEditCycle}>
                                                    <span className="flex items-center justify-start gap-2">
                                                        <Pencil className="h-3 w-3" />
                                                        <span>Edit cycle</span>
                                                    </span>
                                                </CustomMenu.MenuItem>
                                                <CustomMenu.MenuItem onClick={handleDeleteCycle}>
                                                    <span className="flex items-center justify-start gap-2">
                                                        <Trash2 className="h-3 w-3" />
                                                        <span>Delete cycle</span>
                                                    </span>
                                                </CustomMenu.MenuItem>
                                            </>
                                        )}
                                        <CustomMenu.MenuItem onClick={handleCopyText}>
                                            <span className="flex items-center justify-start gap-2">
                                                <LinkIcon className="h-3 w-3" />
                                                <span>Copy cycle link</span>
                                            </span>
                                        </CustomMenu.MenuItem>
                                    </CustomMenu>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
})
