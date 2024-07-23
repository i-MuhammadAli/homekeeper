import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setPageSize } from "../../store";

function Pagination1({ totalItems }) {
  const dispatch = useDispatch();
  const { pageSize, currentPage } = useSelector((state) => {
    return state.pagination;
  });
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    dispatch(setPageSize(newSize));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-12 mb-12 text-xs font-semibold text-gray-500">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded shadow border ${
          currentPage === 1
            ? "bg-gray-100"
            : "bg-gray-700 hover:bg-gray-800 cursor-pointer text-white font-semibold"
        }`}
      >
        Prev
      </button>

      <div className="flex items-center space-x-2">
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-2 py-1 rounded shadow border ${
              pageNumber === currentPage
                ? "bg-gray-700 text-white font-bold"
                : "bg-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded shadow border ${
          currentPage === totalPages
            ? "bg-gray-100"
            : "bg-gray-700 hover:bg-gray-800 cursor-pointer text-white font-semibold"
        }`}
      >
        Next
      </button>

      <label>Items per page</label>
      <select
        value={pageSize}
        onChange={handlePageSizeChange}
        className="px-2 py-1 shadow appearance-none border rounded bg-white text-xs w-16 focus:border-blue-300 focus:ring-0 cursor-pointer"
      >
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default Pagination1;
