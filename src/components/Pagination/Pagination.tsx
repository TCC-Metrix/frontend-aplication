import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './Pagination.css'

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPages: number;
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, maxPages }) => {
  return (
    <ul className="pagination">
    {maxPages !== 2 ? (
        <>
        <li className={currentPage !== 1 ? "" : "pagination-row-none"} onClick={() => setCurrentPage(currentPage - 1)}> <IoIosArrowBack/> </li>
          {((currentPage + 2 > maxPages) && currentPage + 2 !== maxPages + 1) && <li onClick={() => setCurrentPage(currentPage - 2)}>{!(maxPages < currentPage - 2) && currentPage - 2}</li>}
          {((currentPage + 1 > maxPages) || currentPage === maxPages - 1 ) && <li  onClick={() => setCurrentPage(currentPage - 1)}>{!(maxPages < currentPage - 1) && currentPage - 1}</li>}
          <li onClick={() => setCurrentPage(currentPage)} className="active-page">{currentPage}</li>
          {!((currentPage + 2 > maxPages) && currentPage + 2 !== maxPages + 1) && <li onClick={() => setCurrentPage(currentPage + 1)}>{!(maxPages < currentPage + 1) && currentPage + 1}</li>}
          {!((currentPage + 1 > maxPages) || currentPage === maxPages - 1 ) && <li onClick={() => setCurrentPage(currentPage + 2)}>{!(maxPages < currentPage + 2) && currentPage + 2}</li>}
          <li className={currentPage !== maxPages ? "" : "pagination-row-none"} onClick={() => setCurrentPage(currentPage + 1)}> <IoIosArrowForward/> </li>    
        </>
          
          ) : (
              <>
              <li className={currentPage !== 1 ? "" : "pagination-row-none"} onClick={() => setCurrentPage(currentPage - 1)}> <IoIosArrowBack/> </li>
              <li className={currentPage == 1 ? 'active-page' : ''}onClick={() => setCurrentPage(1)}>1</li>
              <li className={currentPage == 2 ? 'active-page' : ''} onClick={() => setCurrentPage(currentPage + 1)}>2</li>
              <li className={currentPage !== maxPages ? "" : "pagination-row-none"} onClick={() => setCurrentPage(currentPage + 1)}> <IoIosArrowForward/> </li>    
              </>
              )}
              </ul>
  );
}

export default Pagination;
