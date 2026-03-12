import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa";
// NOTE: for testing
import CreateMacroModal from "./components/CreateMacroModal";

const baseStyles = "font-mono";
const navStyles = "border-border bg-bg p-2 rounded-full m-5 shadow-md";
const createMacroBtnStyles =
  "rounded-full size-12 p-2 m-1 ml-2 border-border text-text bg-bg-light shadow-md hover:bg-bg-dark";
const createMacroBtnTooltip = "Create Macro";
// TODO: open create macro modal on click
const onCreateMacroBtnClick = () => console.log("Clicked!");

function App() {
  // TODO: add search bar
  // TODO: add menu button/dropdown
  return (
    <div className={baseStyles}>
      <nav className={navStyles}>
        <IconButton
          styles={createMacroBtnStyles}
          Icon={FaPlus}
          tooltip={createMacroBtnTooltip}
          handleClick={onCreateMacroBtnClick}
        />
      </nav>
      <CreateMacroModal />
    </div>
  );
}

export default App;
