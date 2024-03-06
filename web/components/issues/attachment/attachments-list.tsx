import { FC } from "react";
import { observer } from "mobx-react-lite";

import { useIssueDetail } from "@hooks/store";

import { IssueAttachmentsDetail } from "./attachment-detail";

import { TAttachmentOperations } from "./root";

type TAttachmentOperationsRemoveModal = Exclude<TAttachmentOperations, "create">;

type TIssueAttachmentsList = {
  issueId: string;
  handleAttachmentOperations: TAttachmentOperationsRemoveModal;
  disabled?: boolean;
};

export const IssueAttachmentsList: FC<TIssueAttachmentsList> = observer((props) => {
  const { issueId, handleAttachmentOperations, disabled } = props;
  // store hooks
  const {
    attachment: { getAttachmentsByIssueId },
  } = useIssueDetail();

  const issueAttachments = getAttachmentsByIssueId(issueId);

  if (!issueAttachments) return <></>;

  return (
    <>
      {issueAttachments &&
        issueAttachments.length > 0 &&
        issueAttachments.map((attachmentId) => (
          <IssueAttachmentsDetail
            attachmentId={attachmentId}
            disabled={disabled}
            handleAttachmentOperations={handleAttachmentOperations}
          />
        ))}
    </>
  );
});