import type { TextButtonProps } from "../types/types";

function TextButton({
  text = "",
  styles = "",
  tooltip = "",
  onClick: onClick,
}: TextButtonProps) {
  return (
    <button className={styles} title={tooltip} onClick={onClick}>
      {text}
    </button>
  );
}

export default TextButton;
