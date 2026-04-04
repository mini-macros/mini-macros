import { useState } from "react";
import { useEditor } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { type CreateMacroModalProps, ToastState } from "../types/props";
import type { Macro } from "../types/types";
import { MacroErrorCode } from "../types/errors";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import MacroContentEditor from "./MacroContentEditor";
import { IoClose } from "react-icons/io5";
import * as styles from "../styles/create-macro-styles";
import { createMacro } from "../utils/macro-crud";

function CreateMacroModal({
  onClose,
  isOpen,
  showToast,
}: CreateMacroModalProps) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
  });
  const [title, setTitle] = useState("");
  // TODO: set up reducer for ensuring all fields have been filled

  if (!isOpen) return null;

  const onSave = async () => {
    console.log("save clicked");
    if (!editor) {
      console.log("editor is null");
      return;
    }
    const newMacro: Pick<Macro, "id" | "title" | "content"> = {
      id: crypto.randomUUID(),
      title: title,
      content: editor.getText(),
    };
    const err = await createMacro(newMacro);
    if (err) {
      switch (err.code) {
        case MacroErrorCode.CONTENT_TOO_LARGE:
        case MacroErrorCode.MACRO_LIMIT_REACHED:
          showToast(err.message, ToastState.WARNING);
          break;
        case MacroErrorCode.UNHANDLED_EXCEPTION:
          showToast(err.message, ToastState.ERROR);
          break;
        default:
          showToast("Something went terribly wrong here.", ToastState.ERROR);
          break;
      }
      return;
    }

    showToast("Macro Saved Successfully!", ToastState.SUCCESS);
    // console.log(`${JSON.stringify(editor.getJSON())}`);
    onClose();
  };

  // TODO: make the sups red when required not input on save
  // TODO: make borders red when required not input on save
  return (
    <div className={styles.modalStyles}>
      <h2 className={styles.headingStyles}>Create New Macro</h2>
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
        placeholder="My Macro"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className={styles.contentLabelStyles}>
        Macro Content <sup>*</sup>
      </label>
      <MacroContentEditor
        styles={styles.macroContentEditorStyles}
        editor={editor}
      />
      <SaveButton onClick={() => void onSave()} />
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

export default CreateMacroModal;
