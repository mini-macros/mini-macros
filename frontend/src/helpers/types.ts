import { Editor } from "@tiptap/core";
import type { IconType } from "react-icons";

// TODO: add props for server side
export interface MacroProps {
  title: string;
  content: string;
}

export interface CreateMacroModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export interface MacroContentEditorProps {
  styles?: string;
  editor: Editor;
}

export interface IconButtonProps {
  Icon: IconType;
  styles?: string;
  tooltip?: string;
  onClick: () => void;
}

export interface TextButtonProps {
  text?: string;
  styles?: string;
  tooltip?: string;
  onClick: () => void;
}
