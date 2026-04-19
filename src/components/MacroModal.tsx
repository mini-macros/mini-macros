import { type MacroModalProps } from "../types/props";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import MacroContentEditor from "./MacroContentEditor";
import { IoClose } from "react-icons/io5";
import * as styles from "../styles/macro-modal-styles";

function MacroModal({
  modalTitle,
  macroTitle,
  editor,
  onClose,
  onChange,
  onClick,
}: MacroModalProps) {
  // TODO: set up reducer for ensuring all fields have been filled

  // TODO: make the sups red when required not input on save
  // TODO: make borders red when required not input on save
  return (
    <div className={styles.modalStyles}>
      <h2 className={styles.headingStyles}>{modalTitle}</h2>
      <CloseButton onClick={onClose} />
      <br />
      <label htmlFor="macro-title" className={styles.titleLabelStyles}>
        Macro Title <sup>*</sup>
      </label>
      <input
        className={styles.inputStyles}
        name="macro-title"
        type="text"
        maxLength={64}
        placeholder={macroTitle === "" ? "My Macro" : ""}
        value={macroTitle}
        onChange={onChange}
      />
      <label className={styles.contentLabelStyles}>
        Macro Content <sup>*</sup>
      </label>
      <MacroContentEditor
        styles={styles.macroContentEditorStyles}
        editor={editor}
      />
      <SaveButton onClick={onClick} />
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  const closeBtnTooltip = "Close";

  return (
    <IconButton
      styles={styles.closeBtnStyles}
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
      styles={styles.saveBtnStyles}
      text={saveBtnText}
      tooltip={saveBtnTooltip}
      onClick={onClick}
    />
  );
}

export default MacroModal;
