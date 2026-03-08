import type { IconType } from "react-icons";

interface ButtonProps {
  Icon: IconType;
  styles?: string;
  tooltip?: string;
  handleClick: () => void;
}

function Button({ Icon, styles = "", tooltip = "", handleClick }: ButtonProps) {
  return (
    <button className={styles} title={tooltip} onClick={handleClick}>
      <div className="inline-block mt-1 mr-2 ml-2">
        <Icon size={18} />
      </div>
    </button>
  );
}

export default Button;
