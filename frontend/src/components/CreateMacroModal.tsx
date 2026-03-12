import IconButton from "./IconButton";
import TextButton from "./TextButton";
import MacroContentEditor from "./MacroContentEditor";
import { IoClose } from "react-icons/io5";

const modalStyles =
  "grid grid-cols-5 grid-rows-7 rounded-4xl p-10 absolute m-auto inset-0 bg-bg size-175 shadow-md";
const headingStyles = "inline col-span-2 row-start-1 text-text text-2xl mb-10";
const closeBtnStyles =
  "inline col-span-1 col-start-5 row-start-1 self-start place-self-end size-8 rounded-full bg-bg-light border-border shadow-md hover:bg-bg-dark";
const titleLabelStyles =
  "col-start-1 col-span-2 row-start-2 justify-self-start self-start text-text text-xl";
const inputStyles =
  "col-start-2 col-span-full row-start-2 self-start justify-self-end w-5/6 h-1/3 rounded-full bg-bg-light border-border shadow-md placeholder:text-text-muted text-center focus:outline-2 focus:outline-accent";
const contentLabelStyles =
  "col-start-1 col-span-2 row-start-2 self-end justify-self-start text-text text-xl";
const macroContentEditorStyles =
  "col-span-full row-start-3 row-span-4 mt-8 p-4 rounded-4xl bg-bg-light shadow-md focus-within:border-2 focus-within:border-accent";
const saveBtnStyles =
  "row-start-7 col-start-5 place-self-end w-24 h-8 rounded-full border-border bg-accent text-accent-text hover:bg-accent-hover shadow-md";

// TODO: add button callbacks
const closeBtnTooltip = "Close";
const onCloseBtnClick = () => console.log("x marks the spot");

const saveBtnText = "Save";
const saveBtnTooltip = "Save Macro";
const onSaveBtnClick = () => console.log("saved by the bell");

function CreateMacroModal() {
  return (
    <div className={modalStyles}>
      <h2 className={headingStyles}>Create New Macro</h2>
      <IconButton
        styles={closeBtnStyles}
        Icon={IoClose}
        tooltip={closeBtnTooltip}
        handleClick={onCloseBtnClick}
      />
      <br />
      <label htmlFor="macro-title" className={titleLabelStyles}>
        Macro Title:
      </label>
      <input
        className={inputStyles}
        name="macro-title"
        type="text"
        maxLength={64}
        placeholder="My Macro"
      />
      <label className={contentLabelStyles}>Macro Content:</label>
      <MacroContentEditor styles={macroContentEditorStyles} />
      <TextButton
        styles={saveBtnStyles}
        text={saveBtnText}
        tooltip={saveBtnTooltip}
        handleClick={onSaveBtnClick}
      />
    </div>
  );
}

export default CreateMacroModal;
