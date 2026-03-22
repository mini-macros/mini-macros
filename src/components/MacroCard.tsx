import TextButton from "./TextButton";
import { type MacroCardProps, ToastState } from "../types/props";
import { macroStyles } from "../styles/macro-styles";

function MacroCard({ id, title, content, showToast }: MacroCardProps) {
  const macroCardTooltip = "Copy Macro Content";

  function handleClick() {
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
    <div className={macroStyles} id={id} title={macroCardTooltip}>
      <TextButton onClick={handleClick} text={title} />
    </div>
  );
}

export default MacroCard;
