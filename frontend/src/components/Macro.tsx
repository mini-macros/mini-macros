import { useState } from "react";

// TODO: fix styles
const styles = "p-20 m-10 border-black";

// TODO: add props for server side
interface MacroProps {
  title: string;
  content: string;
}

function Macro({ title, content }: MacroProps) {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
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
    <div className={styles}>
      <button onClick={handleClick}>{title}</button>
    </div>
  );
}

export default Macro;
