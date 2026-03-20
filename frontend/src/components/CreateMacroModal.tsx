import { type CreateMacroModalProps, ToastState } from "../helpers/types";
import { useEditor } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import MacroContentEditor from "./MacroContentEditor";
import { IoClose } from "react-icons/io5";
import {
  modalStyles,
  headingStyles,
  closeBtnStyles,
  titleLabelStyles,
  inputStyles,
  contentLabelStyles,
  macroContentEditorStyles,
  saveBtnStyles,
} from "../helpers/create-macro-styles";

function CreateMacroModal({
  onClose,
  isOpen,
  showToast,
}: CreateMacroModalProps) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
  });
  // TODO: set up reducer for ensuring all fields have been filled

  if (!isOpen) return null;

  function onSave() {
    // TODO: add save behavior here
    showToast("Macro Saved Successfully!", ToastState.SUCCESS);
    // NOTE: uncomment for debugging only
    // console.log(`${JSON.stringify(editor.getJSON())}`);
    onClose();
  }

  // TODO: make the sups red when required not input on save
  // TODO: make borders red when required not input on save
  return (
    <div className={modalStyles}>
      <h2 className={headingStyles}>Create New Macro</h2>
      <CloseButton onClick={onClose} />
      <br />
      <label htmlFor="macro-title" className={titleLabelStyles}>
        Macro Title <sup>*</sup>
      </label>
      <input
        className={inputStyles}
        name="macro-title"
        type="text"
        maxLength={64}
        placeholder="My Macro"
      />
      <label className={contentLabelStyles}>
        Macro Content <sup>*</sup>
      </label>
      <MacroContentEditor styles={macroContentEditorStyles} editor={editor} />
      <SaveButton onClick={onSave} />
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  const closeBtnTooltip = "Close";

  return (
    <IconButton
      styles={closeBtnStyles}
      Icon={IoClose}
      tooltip={closeBtnTooltip}
      onClick={onClick}
    />
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  const saveBtnText = "Save";
  const saveBtnTooltip = "Save Macro";

  return (
    <TextButton
      styles={saveBtnStyles}
      text={saveBtnText}
      tooltip={saveBtnTooltip}
      onClick={onClick}
    />
  );
}

export default CreateMacroModal;
