import { useState, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import MacroModal from "./MacroModal";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import {
  type CreateMacroModalProps,
  type MacroSaveProps,
  ToastState,
} from "../types/props";
import type { Macro } from "../types/types";
import { MacroErrorCode } from "../types/errors";
import { createMacro, getMacroById } from "../utils/macro-crud";

function CreateMacroModal({
  onClose,
  showToast,
  onMacroChange,
}: CreateMacroModalProps) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
  });
  const [title, setTitle] = useState("");

  const saveFunc = () => {
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

  return (
    <MacroModal
      modalTitle="Create New Macro"
      macroTitle={title}
      editor={editor}
      onClose={onClose}
      onChange={(e) => setTitle(e.target.value)}
      onClick={saveFunc}
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

export default CreateMacroModal;
