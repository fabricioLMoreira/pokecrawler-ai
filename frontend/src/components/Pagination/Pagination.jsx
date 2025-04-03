import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage, itemsPerPage, setItemsPerPage }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageButtons = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(i);
      }
    } else {
      pageButtons.push(1);

      if (currentPage > 3) {
        pageButtons.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageButtons.push("...");
      }

      pageButtons.push(totalPages);
    }

    return pageButtons.map((page, index) =>
      page === "..." ? (
        <span key={`ellipsis-${index}`} className="ellipsis">...</span>
      ) : (
        <button
          key={`page-${page}`}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      )
    );    
  };

  return (
    <div className="pagination-container">
      <div className="page-controls">
        <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          «
        </button>

        {renderPageNumbers()}

        <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
          »
        </button>
      </div>

      <div className="items-per-page">
        <label htmlFor="itemsSelect">Pokémon por página:</label>
        <select
          id="itemsSelect"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
