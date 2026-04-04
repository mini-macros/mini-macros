import { useEffect, useState, useMemo } from "react";
import CreateMacroModal from "./components/CreateMacroModal";
import MacroCard from "./components/MacroCard";
import Toast from "./components/Toast";
import SearchBar from "./components/SearchBar";
import { ToastState } from "./types/props";
import type { Macro } from "./types/types";
import { getMacros } from "./utils/macro-crud";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import * as styles from "./styles/app-styles";

function App() {
  const [createMacroModalVisiblity, setCreateMacroModalVisibility] =
    useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [macros, setMacros] = useState<Macro[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: ToastState } | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const onCreateMacroBtnClick = () => setCreateMacroModalVisibility(true);
  const onCreateMacroClose = () => {
    setCreateMacroModalVisibility(false);
  };

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

  useEffect(() => {
    async function fetchMacros() {
      try {
        const macroList = await getMacros();
        setMacros(macroList);
      } catch (err) {
        showToast(
          "Macros could not be retreived. Please refresh the page.",
          ToastState.ERROR,
        );
        console.log(err);
      }
    }
    void fetchMacros();
  }, [setMacros]);

  const filteredMacros = useMemo(() => {
    return macros.filter((macro) =>
      macro.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [macros, search]);

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  // TODO: add search bar
  // TODO: add menu button/dropdown
  return (
    <div className={styles.baseStyles}>
      <nav className={styles.navStyles}>
        <CreateMacroButton onClick={onCreateMacroBtnClick} />
        <SearchBar text={search} onChange={searchOnChange} />
        <DarkModeToggleButton isDark={isDark} onClick={toggleTheme} />
      </nav>
      <CreateMacroModal
        onClose={onCreateMacroClose}
        isOpen={createMacroModalVisiblity}
        showToast={showToastCallback}
        onMacroCreated={(macro: Macro) => setMacros((prev) => [...prev, macro])}
      />
      <section className={styles.macroSectionStyles}>
        {filteredMacros.map((macro) => (
          <MacroCard
            key={macro.id}
            title={macro.title}
            content={macro.content}
            showToast={showToastCallback}
          />
        ))}
      </section>
      {toast && <Toast type={toast.type} msg={toast.msg} />}
    </div>
  );
}

function CreateMacroButton({ onClick }: { onClick: () => void }) {
  const createMacroBtnTooltip = "Create Macro";

  return (
    <IconButton
      styles={styles.createMacroBtnStyles}
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
      styles={styles.darkModeToggleBtnStyles}
      Icon={isDark ? IoSunnyOutline : IoMoonOutline}
      tooltip={darkModeToggleTooltip}
      onClick={onClick}
    />
  );
}

export default App;
