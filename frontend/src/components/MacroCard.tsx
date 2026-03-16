import TextButton from "./TextButton";
import type { MacroCardProps } from "../helpers/types";
import { macroStyles } from "../helpers/macro-styles";

function MacroCard({ id, title, content }: MacroCardProps) {
  function handleClick() {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        // TODO: add success/fail component for UI
        console.log("Copied successfully!");
      })
      .catch((err) => {
        console.log("Failed to copy", err);
      });
  }

  return (
    <div className={macroStyles} id={id}>
      <TextButton onClick={handleClick} text={title} />
    </div>
  );
}

export default MacroCard;
