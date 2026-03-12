import type { IconType } from "react-icons";

interface IconButtonProps {
  Icon: IconType;
  styles?: string;
  tooltip?: string;
  handleClick: () => void;
}

function IconButton({
  Icon,
  styles = "",
  tooltip = "",
  handleClick,
}: IconButtonProps) {
  return (
    <button className={styles} title={tooltip} onClick={handleClick}>
      <div className="inset-0 flex items-center justify-center">
        <Icon size={18} />
      </div>
    </button>
  );
}

export default IconButton;
