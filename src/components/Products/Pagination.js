import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ textAlign: "center" }}>
      <ul className='pagination' >
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <span onClick={() => paginate(number)} style={{ marginRight: 5 }} className='page-link'>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;