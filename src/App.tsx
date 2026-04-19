import { useEffect, useState, useMemo } from "react";
import EditMacroModal from "./components/EditMacroModal";
import CreateMacroModal from "./components/CreateMacroModal";
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
import { dropdownChildStyles } from "./styles/macro-styles";

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

  return (
    <div className={styles.baseStyles}>
      <nav className={styles.navStyles}>
        <CreateMacroButton onClick={() => setCreateMacroModalShow(true)} />
        <SearchBar text={search} onChange={(e) => setSearch(e.target.value)} />
        <DarkModeToggleButton isDark={isDark} onClick={toggleTheme} />
      </nav>
      {createMacroModalShow && (
        <CreateMacroModal
          onClose={() => setCreateMacroModalShow(false)}
          showToast={showToast}
          onMacroChange={(macro: Macro) =>
            setMacros((prev) => [...prev, macro])
          }
        />
      )}
      {editMacroModalShow && selectedMacro && (
        <EditMacroModal
          onClose={onEditMacroClose}
          macro={selectedMacro}
          showToast={showToast}
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
            <MacroCard
              title={macro.title}
              content={macro.content}
              showToast={showToast}
            >
              <DropdownButton
                Icon={FaEllipsis}
                position="absolute top-2 right-2"
              >
                <TextButton
                  text="Edit"
                  styles={dropdownChildStyles}
                  tooltip="Edit Macro"
                  onClick={() => onEditMacroBtnClick(macro)}
                />
                <TextButton
                  text="Delete"
                  styles={dropdownChildStyles}
                  tooltip="Delete Macro"
                  onClick={() => {
                    handleDelete(macro.id, showToast);
                    setMacros((prev) => prev.filter((m) => m.id != macro.id));
                  }}
                />
                <TextButton
                  text="Copy"
                  styles={dropdownChildStyles}
                  tooltip="Copy Macro Content"
                  onClick={() => handleCopy(macro.content, showToast)}
                />
              </DropdownButton>
            </MacroCard>
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
