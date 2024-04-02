import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

import React, { useEffect, useRef } from "react"

import { Menu } from "@headlessui/react"
import { ArchiveRestore, Clock, MessageSquare, MoreVertical, User2 } from "lucide-react"
import toast from "react-hot-toast"

import { useEventTracker } from "@hooks/store"

import { ISSUE_OPENED, NOTIFICATION_ARCHIVED, NOTIFICATION_SNOOZED, NOTIFICATIONS_READ } from "@constants/event-tracker"
import { snoozeOptions } from "@constants/notification"

import { calculateTimeAgo, renderFormattedDate, renderFormattedTime } from "@helpers/date-time.helper"
// helper
import { replaceUnderscoreIfSnakeCase, stripAndTruncateHTML, truncateText } from "@helpers/string.helper"

// type
import type { IUserNotification, NotificationType } from "@servcy/types"
import { ArchiveIcon, CustomMenu, Tooltip } from "@servcy/ui"

type NotificationCardProps = {
    selectedTab: NotificationType
    notification: IUserNotification
    isSnoozedTabOpen: boolean
    closePopover: () => void
    markNotificationReadStatus: (notificationId: string) => Promise<void>
    markNotificationReadStatusToggle: (notificationId: string) => Promise<void>
    markNotificationArchivedStatus: (notificationId: string) => Promise<void>
    setSelectedNotificationForSnooze: (notificationId: string) => void
    markSnoozeNotification: (notificationId: string, dateTime?: Date | undefined) => Promise<void>
}

export const NotificationCard: React.FC<NotificationCardProps> = (props) => {
    const {
        selectedTab,
        notification,
        isSnoozedTabOpen,
        closePopover,
        markNotificationReadStatus,
        markNotificationReadStatusToggle,
        markNotificationArchivedStatus,
        setSelectedNotificationForSnooze,
        markSnoozeNotification,
    } = props
    // store hooks
    const { captureEvent } = useEventTracker()
    const { workspaceSlug } = useParams()
    // states
    const [showSnoozeOptions, setShowSnoozeOptions] = React.useState(false)

    // refs
    const snoozeRef = useRef<HTMLDivElement | null>(null)

    const moreOptions = [
        {
            id: 1,
            name: notification.read_at ? "Mark as unread" : "Mark as read",
            icon: <MessageSquare className="h-3.5 w-3.5 text-custom-text-300" />,
            onClick: () => {
                markNotificationReadStatusToggle(notification.id).then(() => {
                    toast.success(
                        notification.read_at ? "Notification marked as read" : "Notification marked as unread"
                    )
                })
            },
        },
        {
            id: 2,
            name: notification.archived_at ? "Unarchive" : "Archive",
            icon: notification.archived_at ? (
                <ArchiveRestore className="h-3.5 w-3.5 text-custom-text-300" />
            ) : (
                <ArchiveIcon className="h-3.5 w-3.5 text-custom-text-300" />
            ),
            onClick: () => {
                markNotificationArchivedStatus(notification.id).then(() => {
                    toast.success(notification.archived_at ? "Notification un-archived" : "Notification archived")
                })
            },
        },
    ]

    const snoozeOptionOnClick = (date: Date | null) => {
        if (!date) {
            setSelectedNotificationForSnooze(notification.id)
            return
        }
        markSnoozeNotification(notification.id, date).then(() => {
            toast.success(`Notification snoozed till ${renderFormattedDate(date)}`)
        })
    }

    // close snooze options on outside click
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (snoozeRef.current && !snoozeRef.current?.contains(event.target)) {
                setShowSnoozeOptions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside, true)
        document.addEventListener("touchend", handleClickOutside, true)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true)
            document.removeEventListener("touchend", handleClickOutside, true)
        }
    }, [])

    const notificationField = notification.data.issue_activity.field
    const notificationTriggeredBy = notification.triggered_by_details

    if (isSnoozedTabOpen && new Date(notification.snoozed_till!) < new Date()) return null

    return (
        <Link
            onClick={() => {
                markNotificationReadStatus(notification.id)
                captureEvent(ISSUE_OPENED, {
                    issue_id: notification.data.issue.id,
                    element: "notification",
                })
                closePopover()
            }}
            href={`/${workspaceSlug}/projects/${notification.project}/${
                notificationField === "archived_at" ? "archived-issues" : "issues"
            }/${notification.data.issue.id}`}
            className={`group relative flex w-full cursor-pointer items-center gap-4 p-3 pl-6 ${
                notification.read_at === null ? "bg-custom-primary-70/5" : "hover:bg-custom-background-200"
            }`}
        >
            {notification.read_at === null && (
                <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-custom-primary-100" />
            )}
            <div className="relative h-12 w-12 rounded-full">
                {notificationTriggeredBy.avatar && notificationTriggeredBy.avatar !== "" ? (
                    <div className="h-12 w-12 rounded-full">
                        <Image
                            src={notificationTriggeredBy.avatar}
                            alt="Profile Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                            loader={({ src }) => src}
                        />
                    </div>
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-custom-background-80">
                        <span className="text-lg font-medium text-custom-text-100">
                            {notificationTriggeredBy.display_name?.[0] ? (
                                notificationTriggeredBy.display_name?.[0]?.toUpperCase()
                            ) : (
                                <User2 className="h-4 w-4" />
                            )}
                        </span>
                    </div>
                )}
            </div>
            <div className="w-full space-y-2.5 overflow-hidden">
                <div className="flex items-start">
                    {!notification.message ? (
                        <div className="w-full break-words text-sm">
                            <span className="font-semibold">{notificationTriggeredBy.display_name} </span>
                            {!["comment", "archived_at"].includes(notificationField) &&
                                notification.data.issue_activity.verb}{" "}
                            {notificationField === "comment"
                                ? "commented"
                                : notificationField === "archived_at"
                                  ? notification.data.issue_activity.new_value === "restore"
                                      ? "restored the issue"
                                      : "archived the issue"
                                  : notificationField === "None"
                                    ? null
                                    : replaceUnderscoreIfSnakeCase(notificationField)}{" "}
                            {!["comment", "archived_at", "None"].includes(notificationField) ? "to" : ""}
                            <span className="font-semibold">
                                {" "}
                                {notificationField !== "None" ? (
                                    notificationField !== "comment" ? (
                                        notificationField === "target_date" ? (
                                            renderFormattedDate(notification.data.issue_activity.new_value)
                                        ) : notificationField === "attachment" ? (
                                            "the issue"
                                        ) : notificationField === "description" ? (
                                            stripAndTruncateHTML(notification.data.issue_activity.new_value, 55)
                                        ) : notificationField === "archived_at" ? null : (
                                            notification.data.issue_activity.new_value
                                        )
                                    ) : (
                                        <span>
                                            {`"`}
                                            {notification.data.issue_activity.new_value.length > 55
                                                ? notification?.data?.issue_activity?.issue_comment?.slice(0, 50) +
                                                  "..."
                                                : notification.data.issue_activity.issue_comment}
                                            {`"`}
                                        </span>
                                    )
                                ) : (
                                    "the issue and assigned it to you."
                                )}
                            </span>
                        </div>
                    ) : (
                        <div className="w-full break-words text-sm">
                            <span className="semi-bold">{notification.message}</span>
                        </div>
                    )}
                    <div className="flex md:hidden items-start">
                        <Menu as="div" className={" w-min text-left"}>
                            {({ open }) => (
                                <>
                                    <Menu.Button as={React.Fragment}>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex w-full items-center gap-x-2 rounded p-0.5 text-sm"
                                        >
                                            <MoreVertical className="h-3.5 w-3.5 text-custom-text-300" />
                                        </button>
                                    </Menu.Button>
                                    {open && (
                                        <Menu.Items className={"absolute right-0 z-10"} static>
                                            <div
                                                className={
                                                    "my-1 overflow-y-scroll rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none min-w-[12rem] whitespace-nowrap"
                                                }
                                            >
                                                {moreOptions.map((item) => (
                                                    <Menu.Item as="div">
                                                        {({ close }) => (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    e.preventDefault()
                                                                    item.onClick()
                                                                    close()
                                                                }}
                                                                className="flex gap-x-2 items-center p-1.5"
                                                            >
                                                                {item.icon}
                                                                {item.name}
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                                <Menu.Item as="div">
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            setShowSnoozeOptions(true)
                                                        }}
                                                        className="flex gap-x-2 items-center p-1.5"
                                                    >
                                                        <Clock className="h-3.5 w-3.5 text-custom-text-300" />
                                                        Snooze
                                                    </div>
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    )}
                                </>
                            )}
                        </Menu>
                        {showSnoozeOptions && (
                            <div
                                ref={snoozeRef}
                                className="absolute right-36 z-20 my-1 top-24 overflow-y-scroll rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none min-w-[12rem] whitespace-nowrap"
                            >
                                {snoozeOptions.map((item) => (
                                    <p
                                        className="p-1.5"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            setShowSnoozeOptions(false)
                                            snoozeOptionOnClick(item.value)
                                        }}
                                    >
                                        {item.label}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between gap-2 text-xs">
                    <p className="text-custom-text-300 line-clamp-1">
                        {truncateText(
                            `${notification.data.issue.identifier}-${notification.data.issue.sequence_id} ${notification.data.issue.name}`,
                            50
                        )}
                    </p>
                    {notification.snoozed_till ? (
                        <p className="flex flex-shrink-0 items-center justify-end gap-x-1 text-custom-text-300">
                            <Clock className="h-4 w-4" />
                            <span>
                                Till {renderFormattedDate(notification.snoozed_till)},{" "}
                                {renderFormattedTime(notification.snoozed_till, "12-hour")}
                            </span>
                        </p>
                    ) : (
                        <p className="flex-shrink-0 text-custom-text-300 mt-auto">
                            {calculateTimeAgo(notification.created_at)}
                        </p>
                    )}
                </div>
            </div>
            <div className="absolute right-3 top-3 hidden gap-x-3 py-1 group-hover:flex">
                {[
                    {
                        id: 1,
                        name: notification.read_at ? "Mark as unread" : "Mark as read",
                        icon: <MessageSquare className="h-3.5 w-3.5 text-custom-text-300" />,
                        onClick: () => {
                            markNotificationReadStatusToggle(notification.id).then(() => {
                                captureEvent(NOTIFICATIONS_READ, {
                                    issue_id: notification.data.issue.id,
                                    tab: selectedTab,
                                    state: "SUCCESS",
                                })
                                toast.success(
                                    notification.read_at
                                        ? "Notification marked as read"
                                        : "Notification marked as unread"
                                )
                            })
                        },
                    },
                    {
                        id: 2,
                        name: notification.archived_at ? "Unarchive" : "Archive",
                        icon: notification.archived_at ? (
                            <ArchiveRestore className="h-3.5 w-3.5 text-custom-text-300" />
                        ) : (
                            <ArchiveIcon className="h-3.5 w-3.5 text-custom-text-300" />
                        ),
                        onClick: () => {
                            markNotificationArchivedStatus(notification.id).then(() => {
                                captureEvent(NOTIFICATION_ARCHIVED, {
                                    issue_id: notification.data.issue.id,
                                    tab: selectedTab,
                                    state: "SUCCESS",
                                })
                                toast.success(
                                    notification.archived_at ? "Notification un-archived" : "Notification archived"
                                )
                            })
                        },
                    },
                ].map((item) => (
                    <Tooltip tooltipContent={item.name}>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                item.onClick()
                            }}
                            key={item.id}
                            className="flex w-full items-center gap-x-2 rounded bg-custom-background-80 p-0.5 text-sm outline-none hover:bg-custom-background-100"
                        >
                            {item.icon}
                        </button>
                    </Tooltip>
                ))}
                <Tooltip tooltipContent="Snooze">
                    <CustomMenu
                        className="flex items-center"
                        customButton={
                            <div className="flex w-full items-center gap-x-2 rounded bg-custom-background-80 p-0.5 text-sm hover:bg-custom-background-100">
                                <Clock className="h-3.5 w-3.5 text-custom-text-300" />
                            </div>
                        }
                        optionsClassName="!z-20"
                    >
                        {snoozeOptions.map((item) => (
                            <CustomMenu.MenuItem
                                key={item.label}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()

                                    if (!item.value) {
                                        setSelectedNotificationForSnooze(notification.id)
                                        return
                                    }

                                    markSnoozeNotification(notification.id, item.value).then(() => {
                                        captureEvent(NOTIFICATION_SNOOZED, {
                                            issue_id: notification.data.issue.id,
                                            tab: selectedTab,
                                            state: "SUCCESS",
                                        })
                                        toast.success(`Notification snoozed till ${renderFormattedDate(item.value)}`)
                                    })
                                }}
                            >
                                {item.label}
                            </CustomMenu.MenuItem>
                        ))}
                    </CustomMenu>
                </Tooltip>
            </div>
        </Link>
    )
}
