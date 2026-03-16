import TextButton from "./TextButton";

// TODO: fix styles
const macroStyles = "p-20 m-10 border-black";

// TODO: add props for server side
interface MacroProps {
  title: string;
  content: string;
}

function Macro({ title, content }: MacroProps) {
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
    <div className={macroStyles}>
      <TextButton onClick={handleClick} text={title} />
    </div>
  );
}

export default Macro;
