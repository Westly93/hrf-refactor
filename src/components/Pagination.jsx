import React from 'react'

function Pagination({ currentPage, onPageChange, isPreviousData }) {

    const handlePrevClick = () => onPageChange(currentPage - 1);

    const handleNextClick = () => onPageChange(currentPage + 1);



  return (
    <div>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
            <button className="btn page-link" disabled={currentPage === 1 || isPreviousData} onClick={handlePrevClick}  aria-label="Previous">
              
                <span aria-hidden="true">&laquo;</span>
                {/* <span class="sr-only">Previous</span> */}

                
            </button>
            </li>
            <li class="page-item"><a class="page-link" href="#">Page {currentPage}</a></li>
            <li class="page-item">
            <button className="btn page-link" onClick={handleNextClick} disabled={currentPage === isPreviousData}  aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                {/* <span class="sr-only">Next</span> */}
            </button>
            </li>
        </ul>
        </nav>
    </div>
  )
}

export default Pagination