import { Editor, type JSONContent } from "@tiptap/core";
import type { IconType } from "react-icons";

export interface Macro {
  id: string;
  title: string;
  content: JSONContent;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MacroCardProps {
  id: string;
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
