import { useState } from "react"

import { Pencil, Trash2 } from "lucide-react"
import { observer } from "mobx-react"

import { DeleteTimeLogModal } from "@components/time-tracker"

import { useUser } from "@hooks/store"

import { ITrackedTime } from "@servcy/types"
import { CustomMenu } from "@servcy/ui"

export interface IQuickActionProps {
    timeLog: ITrackedTime
    handleDelete: () => Promise<void>
    customActionButton?: React.ReactElement
    portalElement?: HTMLDivElement | null
}

export const TimeLogQuickActions: React.FC<IQuickActionProps> = observer((props) => {
    const { timeLog, handleDelete, customActionButton, portalElement } = props
    const [deleteModal, setDeleteModal] = useState(false)
    const { currentUser } = useUser()

    return (
        <>
            <DeleteTimeLogModal
                timeLog={timeLog}
                isOpen={deleteModal}
                handleClose={() => setDeleteModal(false)}
                onSubmit={handleDelete}
            />
            <CustomMenu
                menuItemsClassName="z-[14]"
                placement="bottom-start"
                customButton={customActionButton}
                portalElement={portalElement}
                maxHeight="lg"
                closeOnSelect
                ellipsis
            >
                {!timeLog.is_approved && currentUser?.id.toString() === timeLog.created_by.toString() && (
                    <CustomMenu.MenuItem
                        onClick={() => {
                            setDeleteModal(true)
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Trash2 className="h-3 w-3" />
                            Delete
                        </div>
                    </CustomMenu.MenuItem>
                )}
            </CustomMenu>
        </>
    )
})
