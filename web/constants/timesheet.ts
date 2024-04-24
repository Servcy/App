import { FC } from "react"

import {
    AudioLines,
    CalendarCheck2,
    CalendarClock,
    Camera,
    Check,
    CircleUser,
    DollarSign,
    PlusCircle,
    Text,
} from "lucide-react"

import {
    TimesheetApprovedColumn,
    TimesheetBillableColumn,
    TimesheetCreatorColumn,
    TimesheetDescriptionColumn,
    TimesheetDurationColumn,
    TimesheetEndedAtColumn,
    TimesheetManuallyAddedColumn,
    TimesheetSnapshotsColumn,
    TimesheetStartedAtColumn,
} from "@components/time-tracker"

import { ITimesheetDisplayProperties, ITrackedTime, TIssueOrderByOptions } from "@servcy/types"
import { ISvgIcons } from "@servcy/ui/src/icons/type"

export const TIMESHEET_PROPERTY_LIST: (keyof ITimesheetDisplayProperties)[] = [
    "description",
    "duration",
    "start_time",
    "end_time",
    "created_by",
    "is_billable",
    "is_approved",
    "snapshots_count",
    "is_manually_added",
]

export const TIMESHEET_PROPERTY_DETAILS: {
    [key: string]: {
        title: string
        ascendingOrderKey: TIssueOrderByOptions
        ascendingOrderTitle: string
        descendingOrderKey: TIssueOrderByOptions
        descendingOrderTitle: string
        icon: FC<ISvgIcons>
        Column: React.FC<{
            trackedTime: ITrackedTime
            onClose: () => void
            onChange: (trackedTime: ITrackedTime, data: Partial<ITrackedTime>, updates: any) => void // eslint-disable-line
            disabled: boolean
        }>
    }
} = {
    description: {
        title: "Description",
        ascendingOrderKey: "description",
        ascendingOrderTitle: "A",
        descendingOrderKey: "-description",
        descendingOrderTitle: "Z",
        icon: Text,
        Column: TimesheetDescriptionColumn,
    },
    duration: {
        title: "Duration",
        ascendingOrderKey: "duration",
        ascendingOrderTitle: "Short",
        descendingOrderKey: "-duration",
        descendingOrderTitle: "Long",
        icon: AudioLines,
        column: TimesheetDurationColumn,
    },
    start_time: {
        title: "Start Time",
        ascendingOrderKey: "-start_time",
        ascendingOrderTitle: "New",
        descendingOrderKey: "start_time",
        descendingOrderTitle: "Old",
        icon: CalendarClock,
        Column: TimesheetStartedAtColumn,
    },
    end_time: {
        title: "End Time",
        ascendingOrderKey: "-end_time",
        ascendingOrderTitle: "New",
        descendingOrderKey: "end_time",
        descendingOrderTitle: "Old",
        icon: CalendarCheck2,
        Column: TimesheetEndedAtColumn,
    },
    created_by: {
        title: "Creator",
        ascendingOrderKey: "created_by__first_name",
        ascendingOrderTitle: "A",
        descendingOrderKey: "-created_by__first_name",
        descendingOrderTitle: "Z",
        icon: CircleUser,
        Column: TimesheetCreatorColumn,
    },
    is_billable: {
        title: "Billable",
        ascendingOrderKey: "is_billable",
        ascendingOrderTitle: "Yes",
        descendingOrderKey: "-is_billable",
        descendingOrderTitle: "No",
        icon: DollarSign,
        Column: TimesheetBillableColumn,
    },
    is_approved: {
        title: "Approved",
        ascendingOrderKey: "is_approved",
        ascendingOrderTitle: "Yes",
        descendingOrderKey: "-is_approved",
        descendingOrderTitle: "No",
        icon: Check,
        Column: TimesheetApprovedColumn,
    },
    snapshots_count: {
        title: "Snapshots",
        ascendingOrderKey: "snapshots_count",
        ascendingOrderTitle: "Low",
        descendingOrderKey: "-snapshots_count",
        descendingOrderTitle: "High",
        icon: Camera,
        Column: TimesheetSnapshotsColumn,
    },
    is_manually_added: {
        title: "Manually Added",
        ascendingOrderKey: "is_manually_added",
        ascendingOrderTitle: "Yes",
        descendingOrderKey: "-is_manually_added",
        descendingOrderTitle: "No",
        icon: PlusCircle,
        Column: TimesheetManuallyAddedColumn,
    },
}
