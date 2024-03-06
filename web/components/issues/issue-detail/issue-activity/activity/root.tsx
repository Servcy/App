import { FC } from "react";
import { observer } from "mobx-react-lite";

import { useIssueDetail } from "@hooks/store";

import { IssueActivityList } from "./activity-list";

type TIssueActivityRoot = {
  issueId: string;
};

export const IssueActivityRoot: FC<TIssueActivityRoot> = observer((props) => {
  const { issueId } = props;

  const {
    activity: { getActivitiesByIssueId },
  } = useIssueDetail();

  const activityIds = getActivitiesByIssueId(issueId);

  if (!activityIds) return <></>;
  return (
    <div>
      {activityIds.map((activityId, index) => (
        <IssueActivityList
          activityId={activityId}
          ends={index === 0 ? "top" : index === activityIds.length - 1 ? "bottom" : undefined}
        />
      ))}
    </div>
  );
});