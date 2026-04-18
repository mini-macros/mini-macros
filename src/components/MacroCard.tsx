import TextButton from "./TextButton";
import type { MacroCardProps } from "../types/props";
import { macroStyles } from "../styles/macro-styles";
import { handleCopy } from "../utils/macro-handlers";

function MacroCard({ title, content, showToast }: MacroCardProps) {
  const macroCardTooltip = "Copy Macro Content";

  return (
    <div>
      <TextButton
        styles={macroStyles}
        tooltip={macroCardTooltip}
        onClick={() => handleCopy(content, showToast)}
        text={title}
      />
    </div>
  );
}

export default MacroCard;
