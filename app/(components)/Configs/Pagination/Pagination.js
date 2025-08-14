import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPage, currentPage, setCurrentPage }) => {

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage + 1);
  };

  return (
    <>
      <ReactPaginate
        previousLabel={<i className="fa-solid fa-less-than"></i>}
        nextLabel={<i className="fa-solid fa-greater-than"></i>}
        pageCount={Math.ceil(totalPage)}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName='botSailorPagination'
        previousLinkClassName='paginationLink'
        nextLinkClassName='paginationLink'
        disabledClassName='paginationDisabled'
        activeClassName='paginationActive'
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
      />

      {/* <div className='d-flex justify-content-center'>
        {totalPage > 1 &&
          <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
      </div> */}
    </>
  );
};

export default Pagination;