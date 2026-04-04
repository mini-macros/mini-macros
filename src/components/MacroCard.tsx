import TextButton from "./TextButton";
import { type MacroCardProps, ToastState } from "../types/props";
import { macroStyles } from "../styles/macro-styles";

function MacroCard({ title, content, showToast }: MacroCardProps) {
  const macroCardTooltip = "Copy Macro Content";

  function handleClick() {
    console.log("Macro clicked!");
    console.log("Macro Content: ", content);
    navigator.clipboard
      .writeText(content)
      .then(() => {
        showToast("Macro content copied!", ToastState.SUCCESS);
      })
      .catch((err) => {
        showToast("Something went wrong. Please try again.", ToastState.ERROR);
        console.log(err);
      });
  }

  return (
    <TextButton
      styles={macroStyles}
      tooltip={macroCardTooltip}
      onClick={handleClick}
      text={title}
    />
  );
}

export default MacroCard;
