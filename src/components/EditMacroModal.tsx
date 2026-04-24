import { useState, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import MacroModal from "./MacroModal";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import {
  type EditMacroModalProps,
  type MacroSaveProps,
  ToastState,
} from "../types/props";
import { type Macro } from "../types/types";
import { MacroErrorCode } from "../types/errors";
import { updateMacroById, getMacroById } from "../utils/macro-crud";

function EditMacroModal({
  onClose,
  macro,
  showToast,
  onMacroChange,
}: EditMacroModalProps) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
    editorProps: {
      attributes: {
        "data-testid": "editor",
      },
    },
  });
  const [title, setTitle] = useState(macro.title);

  useEffect(() => {
    if (macro && editor) {
      editor.commands.clearContent();
      editor.commands.insertContent(`<p>${macro.content}</p>`);
    }

    return () => editor.destroy();
  }, [macro, editor]);

  const saveFunc = () => {
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

  return (
    <MacroModal
      modalTitle="Edit Macro"
      macroTitle={title}
      editor={editor}
      onClose={onClose}
      onChange={(e) => setTitle(e.target.value)}
      onClick={saveFunc}
    />
  );
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

export default EditMacroModal;
