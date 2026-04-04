import type { SearchBarProps } from "../types/props";
import { IoSearch } from "react-icons/io5";
import {
  searchBarParentStyles,
  searchBarIconStyles,
  searchBarInputStyles,
} from "../styles/search-styles";

function SearchBar({ text, onChange }: SearchBarProps) {
  const iconSize = 18;
  const placeholderText = "Search macros...";

  return (
    <div className={searchBarParentStyles}>
      <IoSearch size={iconSize} className={searchBarIconStyles} />
      <input
        type="text"
        value={text}
        onChange={onChange}
        placeholder={placeholderText}
        className={searchBarInputStyles}
      />
    </div>
  );
}

export default SearchBar;
