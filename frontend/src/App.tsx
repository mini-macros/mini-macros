import { useState } from "react";
import CreateMacroModal from "./components/CreateMacroModal";
import MacroCard from "./components/MacroCard";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import {
  baseStyles,
  navStyles,
  createMacroBtnStyles,
  darkModeToggleBtnStyles,
} from "./helpers/app-styles";

const testString =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

function App() {
  const [createMacroModalVisiblity, setCreateMacroModalVisibility] =
    useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  const onCreateMacroBtnClick = () => setCreateMacroModalVisibility(true);
  const onCreateMacroClose = () => setCreateMacroModalVisibility(false);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  };

  // TODO: add search bar
  // TODO: add menu button/dropdown
  return (
    <div className={baseStyles}>
      <nav className={navStyles}>
        <CreateMacroButton onClick={onCreateMacroBtnClick} />
        <DarkModeToggleButton isDark={isDark} onClick={toggleTheme} />
      </nav>
      <CreateMacroModal
        onClose={onCreateMacroClose}
        isOpen={createMacroModalVisiblity}
      />
      <section>
        <MacroCard
          id={crypto.randomUUID()}
          title={testString}
          content="content"
        />
      </section>
    </div>
  );
}

function CreateMacroButton({ onClick }: { onClick: () => void }) {
  const createMacroBtnTooltip = "Create Macro";

  return (
    <IconButton
      styles={createMacroBtnStyles}
      Icon={FaPlus}
      tooltip={createMacroBtnTooltip}
      onClick={onClick}
    />
  );
}

function DarkModeToggleButton({
  isDark,
  onClick,
}: {
  isDark: boolean;
  onClick: () => void;
}) {
  const darkModeToggleTooltip = "Toggle Theme";

  return (
    <IconButton
      styles={darkModeToggleBtnStyles}
      Icon={isDark ? IoSunnyOutline : IoMoonOutline}
      tooltip={darkModeToggleTooltip}
      onClick={onClick}
    />
  );
}

export default App;
