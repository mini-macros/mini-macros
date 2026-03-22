import { type ToastProps, ToastState } from "../types/props";
import * as styles from "../styles/toast-styles";

function Toast({ type, msg }: ToastProps) {
  let toastStyles = styles.baseToastStyles;

  switch (type) {
    case ToastState.ERROR:
      toastStyles += " " + styles.errorToastStyles;
      break;
    case ToastState.SUCCESS:
      toastStyles += " " + styles.successToastStyles;
      break;
    default:
      toastStyles += " " + styles.neutralToastStyles;
  }

  return (
    <footer className={toastStyles}>
      <span>{msg}</span>
    </footer>
  );
}

export default Toast;
