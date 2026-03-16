import { useState } from "react";
import CreateMacroModal from "./components/CreateMacroModal";
import MacroCard from "./components/MacroCard";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa";
import {
  baseStyles,
  navStyles,
  createMacroBtnStyles,
} from "./helpers/app-styles";

const testString =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const createMacroBtnTooltip = "Create Macro";

function App() {
  const [createMacroModalVisiblity, setCreateMacroModalVisibility] =
    useState(false);
  const onCreateMacroBtnClick = () => setCreateMacroModalVisibility(true);
  const onCreateMacroClose = () => setCreateMacroModalVisibility(false);

  // TODO: add search bar
  // TODO: add menu button/dropdown
  return (
    <div className={baseStyles}>
      <nav className={navStyles}>
        <CreateMacroButton onClick={onCreateMacroBtnClick} />
      </nav>
      <CreateMacroModal
        onClose={onCreateMacroClose}
        isOpen={createMacroModalVisiblity}
      />
      <section>
        <MacroCard title={testString} content="content" />
      </section>
    </div>
  );
}

function CreateMacroButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      styles={createMacroBtnStyles}
      Icon={FaPlus}
      tooltip={createMacroBtnTooltip}
      onClick={onClick}
    />
  );
}

export default App;
