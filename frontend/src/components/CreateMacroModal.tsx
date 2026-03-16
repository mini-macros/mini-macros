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

const closeBtnTooltip = "Close";
const saveBtnText = "Save";
const saveBtnTooltip = "Save Macro";

interface CreateMacroModalProps {
  onClose: () => void;
  onSave: () => void;
  isOpen: boolean;
}

function CreateMacroModal({ onClose, onSave, isOpen }: CreateMacroModalProps) {
  if (!isOpen) return null;

  // TODO: make the sups red when required not input on save
  // TODO: make borders red when required not input on save
  return (
    <div className={modalStyles}>
      <h2 className={headingStyles}>Create New Macro</h2>
      <IconButton
        styles={closeBtnStyles}
        Icon={IoClose}
        tooltip={closeBtnTooltip}
        onClick={onClose}
      />
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
      <MacroContentEditor styles={macroContentEditorStyles} />
      <TextButton
        styles={saveBtnStyles}
        text={saveBtnText}
        tooltip={saveBtnTooltip}
        onClick={onSave}
      />
    </div>
  );
}

export default CreateMacroModal;
