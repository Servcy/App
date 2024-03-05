import Placeholder from "@tiptap/extension-placeholder";
import { IssueWidgetPlaceholder } from "src/ui/extensions/widgets/issue-embed-widget";

import { SlashCommand, DragAndDrop } from "@servcy/editor-extensions";
import { UploadImage } from "@servcy/editor-core";

export const DocumentEditorExtensions = (
  uploadFile: UploadImage,
  setHideDragHandle?: (hideDragHandlerFromDragDrop: () => void) => void,
  setIsSubmitting?: (isSubmitting: "submitting" | "submitted" | "saved") => void
) => [
  SlashCommand(uploadFile, setIsSubmitting),
  DragAndDrop(setHideDragHandle),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      if (node.type.name === "image" || node.type.name === "table") {
        return "";
      }

      return "Press '/' for commands...";
    },
    includeChildren: true,
  }),
  IssueWidgetPlaceholder(),
];
