import { useEffect, useState, useMemo } from "react";
import MacroModal from "./components/MacroModal";
import MacroCard from "./components/MacroCard";
import Toast from "./components/Toast";
import SearchBar from "./components/SearchBar";
import DropdownButton from "./components/DropdownButton";
import TextButton from "./components/TextButton";
import { ToastState } from "./types/props";
import type { Macro } from "./types/types";
import { getMacros } from "./utils/macro-crud";
import { handleCopy, handleDelete } from "./utils/macro-handlers";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import * as styles from "./styles/app-styles";

function App() {
  const [createMacroModalShow, setCreateMacroModalShow] = useState(false);
  const [editMacroModalShow, setEditMacroModalShow] = useState(false);
  const [selectedMacro, setSelectedMacro] = useState<Macro | null>(null);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [macros, setMacros] = useState<Macro[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: ToastState } | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const onCreateMacroBtnClick = () => setCreateMacroModalShow(true);
  const onCreateMacroClose = () => {
    setCreateMacroModalShow(false);
  };

  const onEditMacroBtnClick = (macro: Macro) => {
    setSelectedMacro(macro);
    setEditMacroModalShow(true);
  };
  const onEditMacroClose = () => {
    setSelectedMacro(null);
    setEditMacroModalShow(false);
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
  }, []);

  const filteredMacros = useMemo(() => {
    return macros.filter((macro) =>
      macro.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [macros, search]);

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  // TODO: add menu button/dropdown
  return (
    <div className={styles.baseStyles}>
      <nav className={styles.navStyles}>
        <CreateMacroButton onClick={onCreateMacroBtnClick} />
        <SearchBar text={search} onChange={searchOnChange} />
        <DarkModeToggleButton isDark={isDark} onClick={toggleTheme} />
      </nav>
      {createMacroModalShow && (
        <MacroModal
          modalTitle="Create New Macro"
          onClose={onCreateMacroClose}
          isCreate={true}
          showToast={showToastCallback}
          onMacroChange={(macro: Macro) =>
            setMacros((prev) => [...prev, macro])
          }
        />
      )}
      {editMacroModalShow && selectedMacro && (
        <MacroModal
          modalTitle="Edit Macro"
          onClose={onEditMacroClose}
          isCreate={false}
          showToast={showToastCallback}
          macro={selectedMacro}
          onMacroChange={(macro: Macro) =>
            setMacros((prev) =>
              prev.map((m) => (m.id === macro.id ? macro : m)),
            )
          }
        />
      )}
      <section className={styles.macroSectionStyles}>
        {filteredMacros.map((macro) => (
          <div key={macro.id}>
            <DropdownButton Icon={FaEllipsis}>
              <TextButton
                text="Edit"
                styles=""
                tooltip="Edit Macro"
                onClick={() => onEditMacroBtnClick(macro)}
              />
              <TextButton
                text="Delete"
                styles=""
                tooltip="Delete Macro"
                onClick={() => {
                  handleDelete(macro.id, showToastCallback);
                  setMacros((prev) => prev.filter((m) => m.id != macro.id));
                }}
              />
              <TextButton
                text="Copy"
                styles=""
                tooltip="Copy Macro Content"
                onClick={() => handleCopy(macro.content, showToastCallback)}
              />
            </DropdownButton>
            <MacroCard
              title={macro.title}
              content={macro.content}
              showToast={showToastCallback}
            />
          </div>
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
