import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageLimit = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  let endPage = Math.min(totalPages, startPage + pageLimit - 1);

  startPage = Math.max(1, endPage - pageLimit + 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`${styles.button} ${styles.subtractButton}`}
      >
        -
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          className={`${styles.button} ${
            page === currentPage ? styles.activeButton : ""
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`${styles.button} ${styles.addButton}`}
      >
        +
      </button>
    </div>
  );
};

export default Pagination;
