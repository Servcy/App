import { useParams } from "next/navigation"

import { Command } from "cmdk"
import { Check } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useIssues, useProjectState } from "@hooks/store"

import { EIssuesStoreType } from "@constants/issue"

import { TIssue } from "@servcy/types"
import { Spinner, StateGroupIcon } from "@servcy/ui"

type Props = {
    closePalette: () => void
    issue: TIssue
}

export const ChangeIssueState: React.FC<Props> = observer((props) => {
    const { closePalette, issue } = props
    const { workspaceSlug, projectId } = useParams()
    // store hooks
    const {
        issues: { updateIssue },
    } = useIssues(EIssuesStoreType.PROJECT)
    const { projectStates } = useProjectState()

    const submitChanges = async (formData: Partial<TIssue>) => {
        if (!workspaceSlug || !projectId || !issue) return

        const payload = { ...formData }
        await updateIssue(workspaceSlug.toString(), projectId.toString(), issue.id, payload)
    }

    const handleIssueState = (stateId: string) => {
        submitChanges({ state_id: stateId })
        closePalette()
    }

    return (
        <>
            {projectStates ? (
                projectStates.length > 0 ? (
                    projectStates.map((state) => (
                        <Command.Item
                            key={state.id}
                            onSelect={() => handleIssueState(state.id)}
                            className="focus:outline-none"
                        >
                            <div className="flex items-center space-x-3">
                                <StateGroupIcon
                                    stateGroup={state.group}
                                    color={state.color}
                                    height="16px"
                                    width="16px"
                                />
                                <p>{state.name}</p>
                            </div>
                            <div>{state.id === issue.state_id && <Check className="h-3 w-3" />}</div>
                        </Command.Item>
                    ))
                ) : (
                    <div className="text-center">No states found</div>
                )
            ) : (
                <Spinner />
            )}
        </>
    )
})
