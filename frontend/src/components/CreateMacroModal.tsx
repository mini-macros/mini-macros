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

interface CreateMacroModalProps {
  onClose: () => void;
  isOpen: boolean;
}

function CreateMacroModal({ onClose, isOpen }: CreateMacroModalProps) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
  });

  if (!isOpen) return null;

  function onSave() {
    const content = editor.getJSON();
    console.log(`save: ${JSON.stringify(content)}`);
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
