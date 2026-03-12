interface TextButtonProps {
  text?: string;
  styles?: string;
  tooltip?: string;
  handleClick: () => void;
}

function TextButton({
  text = "",
  styles = "",
  tooltip = "",
  handleClick,
}: TextButtonProps) {
  return (
    <button className={styles} title={tooltip} onClick={handleClick}>
      {text}
    </button>
  );
}

export default TextButton;
