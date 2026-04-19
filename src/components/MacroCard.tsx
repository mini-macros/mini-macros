import TextButton from "./TextButton";
import type { MacroCardProps } from "../types/props";
import { macroStyles } from "../styles/macro-styles";
import { handleCopy } from "../utils/macro-handlers";

function MacroCard({ title, content, showToast, children }: MacroCardProps) {
  const macroCardTooltip = "Copy Macro Content";

  return (
    <div className="relative">
      <TextButton
        styles={macroStyles}
        tooltip={macroCardTooltip}
        onClick={() => handleCopy(content, showToast)}
        text={title}
      />
      {children}
    </div>
  );
}

export default MacroCard;
