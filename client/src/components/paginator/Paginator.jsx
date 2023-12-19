/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from './Paginator.module.css'; // Import the CSS file for styling

const Paginator = ({ totalItems, itemsPerPage, callback, children }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handlePageChange = (currentPage) => {
      const itemOffset = (currentPage - 1) * itemsPerPage;
      const endOffset = itemOffset + itemsPerPage;
      callback(itemOffset, endOffset);
    };
    handlePageChange(currentPage);
  }, [currentPage, itemsPerPage, callback]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    // get new stuff
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            className={currentPage === i ? styles.active : styles.btns}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    // render props children and get cards inside from parrent
    <>
      {children}
      <div className={styles.paginationContainer}>
        <ul className={styles.pagination}>{renderPageNumbers()}</ul>
      </div>
    </>
  );
};

export default Paginator;
