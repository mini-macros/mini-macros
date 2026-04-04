import type { IconButtonProps } from "../types/props";

function IconButton({
  Icon,
  styles = "",
  tooltip = "",
  onClick: onClick,
}: IconButtonProps) {
  return (
    <button className={styles} title={tooltip} onClick={onClick}>
      <div className="inset-0 flex items-center justify-center">
        <Icon size={24} />
      </div>
    </button>
  );
}

export default IconButton;
