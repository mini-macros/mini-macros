import { ToastState } from "../types/props";
import { deleteMacroById } from "../utils/macro-crud";

export function handleCopy(
  content: string,
  showToast: (msg: string, type: ToastState) => void,
) {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      showToast("Macro content copied!", ToastState.SUCCESS);
    })
    .catch((error) => {
      showToast("Something went wrong. Please try again.", ToastState.ERROR);
      console.log(error);
    });
}

export function handleDelete(
  macroId: string,
  showToast: (msg: string, type: ToastState) => void,
) {
  const err = deleteMacroById(macroId);
  if (err) {
    showToast(err.message, ToastState.ERROR);
    return;
  }
}
