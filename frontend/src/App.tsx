import { useState } from "react";
import CreateMacroModal from "./components/CreateMacroModal";
//import Macro from "./components/Macro";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa";
import {
  baseStyles,
  navStyles,
  createMacroBtnStyles,
} from "./helpers/app-styles";

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
        <IconButton
          styles={createMacroBtnStyles}
          Icon={FaPlus}
          tooltip={createMacroBtnTooltip}
          onClick={onCreateMacroBtnClick}
        />
      </nav>
      <CreateMacroModal
        onClose={onCreateMacroClose}
        isOpen={createMacroModalVisiblity}
      />
      <section></section>
    </div>
  );
}

export default App;
