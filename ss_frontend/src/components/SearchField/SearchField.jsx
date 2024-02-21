import React, { useState } from "react";

import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as FilterIcon } from "../../assets/Filter.svg";

import styles from "./SearchField.module.css";

const SearchFieldComponent = ({
  options,
  search,
  setSearch,
  getSearchData,
  handleOptionClick,
  filters,
}) => {
  const [toggleFilter, setToggleFilter] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.searchFieldContainer}>
        <input
          id="searchInput"
          placeholder="Type to Search..."
          onChange={(event) => {
            setSearch(event.target.value);
            getSearchData();
          }}
          value={search}
          className={styles.searchBar}
        />
        <SearchIcon />
      </div>
      <div
        className={styles.filterContainer}
        onClick={() => {
          setToggleFilter((prev) => !prev);
          console.log("toggled", toggleFilter);
        }}
      >
        <FilterIcon />
        <div
          className={`${styles.filterCard} ${
            toggleFilter ? styles.display : styles.hide
          }`}
        >
          {options?.map((option, index) => (
            <div
              className={`${styles.filterItem} ${
                filters?.includes(option.name) ? styles.highlight : ""
              }`}
              onClick={() => handleOptionClick(option.name)}
              key={index}
            >
              {option.name
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFieldComponent;
