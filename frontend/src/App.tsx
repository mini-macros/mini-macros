import Button from "./components/Button";
import { FaPlus } from "react-icons/fa";

const createMacroBtnStyles =
  "rounded-full p-2 m-1 ml-2 border-2 border-border text-text bg-bg-light shadow-md hover:outline-3 hover:outline-offset-1 hover:outline-accent hover:bg-bg";
const createMacroBtnTooltip = "Create Macro";
// TODO: open create macro modal on click
const onCreateMacroBtnClick = () => console.log("Clicked!");

function App() {
  // TODO: add search bar
  // TODO: add menu button/dropdown
  return (
    <div>
      <nav className="border-border bg-bg p-2 rounded-full m-5">
        <Button
          styles={createMacroBtnStyles}
          Icon={FaPlus}
          tooltip={createMacroBtnTooltip}
          handleClick={onCreateMacroBtnClick}
        />
      </nav>
    </div>
  );
}

export default App;
