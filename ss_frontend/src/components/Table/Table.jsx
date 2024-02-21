import React from "react";
import { COLUMNS } from "../../constants/headers";
import styles from "./Table.module.css";

const TableComponent = ({ data }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            {COLUMNS.map((column, index) => (
              <th key={index} className={styles.tableHeadCell}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 ? styles.greyBackground : ""} ${
                styles.row
              }`}
            >
              {[
                item.id,
                item.name,
                item.category,
                item.latitude,
                item.longitude,
              ].map((column, index) => (
                <td key={index} className={styles.tableCell}>
                  {column}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
