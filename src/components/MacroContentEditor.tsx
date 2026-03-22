import { EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import type { MacroContentEditorProps } from "../types/types";

const formatEditor =
  "[&_.ProseMirror]:h-full [&_.ProseMirror]:w-full h-full w-full [&_.ProseMirror]:outline-none";

function MacroContentEditor({ styles, editor }: MacroContentEditorProps) {
  // TODO: add error handling for null editor
  if (!editor) return;

  return (
    <div className={styles}>
      <EditorContent className={formatEditor} editor={editor} />
      <FixedMenu editor={editor} />
    </div>
  );
}

// TODO: create fixed menu with buttons for editor functionality
function FixedMenu({ editor }: { editor: Editor }) {
  return (
    <div>
      <button
        className="invisible"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </button>
    </div>
  );
}

export default MacroContentEditor;
