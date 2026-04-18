import { useState, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import {
  type MacroModalProps,
  type MacroSaveProps,
  ToastState,
} from "../types/props";
import type { Macro } from "../types/types";
import { MacroErrorCode } from "../types/errors";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import MacroContentEditor from "./MacroContentEditor";
import { IoClose } from "react-icons/io5";
import * as styles from "../styles/create-macro-styles";
import {
  createMacro,
  getMacroById,
  updateMacroById,
} from "../utils/macro-crud";

function MacroModal({
  modalTitle,
  onClose,
  showToast,
  macro,
  isCreate,
  onMacroChange,
}: MacroModalProps) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
  });
  const [title, setTitle] = useState(macro?.title ?? "");
  // TODO: set up reducer for ensuring all fields have been filled

  useEffect(() => {
    if (macro && editor) {
      editor.commands.clearContent();
      editor.commands.insertContent(`<p>${macro.content}</p>`);
    }
  }, [macro, editor]);

  let saveFunc: () => void = () => {
    showToast("Unable to save macro.", ToastState.ERROR);
  };
  if (isCreate) {
    saveFunc = () => {
      void onCreateSave({ editor, title, showToast })
        .then((resultMacro) => {
          if (resultMacro) {
            onMacroChange(resultMacro);
            showToast("Macro created successfully", ToastState.SUCCESS);
          }
        })
        .catch((error) => {
          showToast("Unable to save macro.", ToastState.ERROR);
          console.error(error);
        });
      onClose();
    };
  } else {
    saveFunc = () => {
      void onEditSave({ editor, macro, title, showToast })
        .then((updatedMacro) => {
          if (updatedMacro) {
            showToast("Macro updated successfully!", ToastState.SUCCESS);
            onMacroChange(updatedMacro);
          }
          onClose();
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }

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
        placeholder={title === "" ? "My Macro" : ""}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className={styles.contentLabelStyles}>
        Macro Content <sup>*</sup>
      </label>
      <MacroContentEditor
        styles={styles.macroContentEditorStyles}
        editor={editor}
      />
      <SaveButton onClick={saveFunc} />
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

async function onCreateSave({
  editor,
  title,
  showToast,
}: MacroSaveProps): Promise<Macro | null> {
  if (!editor) {
    return null;
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
    return null;
  }
  const resultMacro: Macro | null = await getMacroById(newMacro.id);
  if (!resultMacro) {
    showToast("Macro could not be saved", ToastState.ERROR);
    return null;
  }
  return resultMacro;
}

async function onEditSave({
  editor,
  macro,
  title,
  showToast,
}: MacroSaveProps): Promise<Macro | null> {
  if (!editor) {
    showToast(
      "Something went wrong with the macro editor.",
      ToastState.WARNING,
    );
    return null;
  }

  const currMacro = await getMacroById(macro!.id);
  const macroUpdates: Pick<Macro, "title" | "content"> = {
    title: title,
    content: editor.getText(),
  };

  const err = await updateMacroById(currMacro!.id, macroUpdates);
  if (err) {
    switch (err.code) {
      case MacroErrorCode.CONTENT_TOO_LARGE:
      case MacroErrorCode.MACRO_LIMIT_REACHED:
        showToast(err.message, ToastState.WARNING);
        return null;
      case MacroErrorCode.UNHANDLED_EXCEPTION:
        showToast(err.message, ToastState.ERROR);
        return null;
      default:
        showToast("Something went terribly wrong here.", ToastState.ERROR);
        return null;
    }
  }

  const resultMacro: Macro | null = await getMacroById(currMacro!.id);
  if (!resultMacro) {
    showToast("Macro could not be saved", ToastState.ERROR);
    return null;
  }
  return resultMacro;
}

export default MacroModal;
