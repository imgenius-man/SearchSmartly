import React, { useEffect, useState } from "react";
import SearchFieldComponent from "../components/SearchField/SearchField";
import Pagination from "../components/Pagination/Pagination";
import { getSearchData, getOptions } from "../helpers/poi";
import Loader from "../components/Loader/Loader";
import TableComponent from "../components/Table/Table";

import styles from "./App.module.css";

const App = () => {
  const [responseData, setResponseData] = useState(null);
  const [options, setOptions] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOptions(setOptions);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getSearchData({
      search,
      filters,
      currentPage,
      setResponseData: (data) => {
        setResponseData(data);
        setIsLoading(false);
      },
      setTotalPages,
    });
  }, [search, filters, currentPage]);

  const handleOptionClick = (option) => {
    let newFilters = [...filters];

    const optionIndex = newFilters.findIndex((f) => f === option);
    if (optionIndex >= 0) {
      newFilters.splice(optionIndex, 1);
    } else {
      newFilters.push(option);
    }

    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setIsLoading(true);
  };

  return (
    <>
      <div className={styles.searchBar}>
        <SearchFieldComponent
          search={search}
          setSearch={setSearch}
          getSearchData={() => {
            setIsLoading(true);
          }}
          options={options}
          setFilters={setFilters}
          handleOptionClick={handleOptionClick}
          filters={filters}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : responseData ? (
        <TableComponent data={responseData} />
      ) : (
        <p>Loading data...</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default App;
