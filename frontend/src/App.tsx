import { useState } from "react";
import CreateMacroModal from "./components/CreateMacroModal";
import MacroCard from "./components/MacroCard";
import Toast from "./components/Toast";
import { ToastState } from "./helpers/types";
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
  const [toast, setToast] = useState<{ msg: string; type: ToastState } | null>(
    null,
  );

  const onCreateMacroBtnClick = () => setCreateMacroModalVisibility(true);
  const onCreateMacroClose = () => setCreateMacroModalVisibility(false);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  };

  const showToast = (msg: string, type: ToastState) => {
    const COUNTDOWN_TIME_MS = 4 * 1000;
    setToast({ msg, type });
    setTimeout(() => setToast(null), COUNTDOWN_TIME_MS);
  };

  const showToastCallback = (msg: string, type: ToastState) =>
    showToast(msg, type);

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
        showToast={showToastCallback}
      />
      <section>
        <MacroCard
          id={crypto.randomUUID()}
          title={testString}
          content="content"
          showToast={showToastCallback}
        />
      </section>
      {toast && <Toast type={toast.type} msg={toast.msg} />}
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
