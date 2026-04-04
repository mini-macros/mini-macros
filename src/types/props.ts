import { Editor } from "@tiptap/core";
import type { IconType } from "react-icons";
import type { Macro } from "./types";

export interface MacroCardProps {
  title: string;
  content: string;
  showToast: (msg: string, type: ToastState) => void;
}

export interface CreateMacroModalProps {
  onClose: () => void;
  isOpen: boolean;
  showToast: (msg: string, type: ToastState) => void;
  onMacroCreated: (macro: Macro) => void;
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

export interface ToastProps {
  type?: ToastState;
  msg: string;
}

export enum ToastState {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
}

export interface SearchBarProps {
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}
