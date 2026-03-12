import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

const formatEditor =
  "[&_.ProseMirror]:h-full [&_.ProseMirror]:w-full h-full w-full [&_.ProseMirror]:outline-none";

function MacroContentEditor({ styles }: { styles: string }) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
  });

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
