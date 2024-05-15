// Pagination.js
import React from 'react';

function Pagination({ currentPage, totalPages, paginate }) {
  return (
    <nav>
      <ul className='pagination'>
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <button onClick={() => paginate('prev')} className='page-link'>
            Previous
          </button>
        </li>
        <li className={currentPage === totalPages ? 'page-item disabled' : 'page-item'}>
          <button onClick={() => paginate('next')} className='page-link'>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
