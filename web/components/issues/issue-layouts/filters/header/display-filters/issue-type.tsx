import React from "react"
import { FilterHeader, FilterOption } from "@components/issues"
import { ISSUE_FILTER_OPTIONS } from "@constants/issue"
import { observer } from "mobx-react-lite"
import { TIssueTypeFilters } from "@servcy/types"

type Props = {
    selectedIssueType: TIssueTypeFilters | undefined
    handleUpdate: (val: TIssueTypeFilters) => void
}

export const FilterIssueType: React.FC<Props> = observer((props) => {
    const { selectedIssueType, handleUpdate } = props

    const [previewEnabled, setPreviewEnabled] = React.useState(true)

    const activeIssueType = selectedIssueType ?? null

    return (
        <>
            <FilterHeader
                title="Issue Type"
                isPreviewEnabled={previewEnabled}
                handleIsPreviewEnabled={() => setPreviewEnabled(!previewEnabled)}
            />
            {previewEnabled && (
                <div>
                    {ISSUE_FILTER_OPTIONS.map((issueType) => (
                        <FilterOption
                            key={issueType?.key}
                            isChecked={activeIssueType === issueType?.key ? true : false}
                            onClick={() => handleUpdate(issueType?.key)}
                            title={issueType.title}
                            multiple={false}
                        />
                    ))}
                </div>
            )}
        </>
    )
})
