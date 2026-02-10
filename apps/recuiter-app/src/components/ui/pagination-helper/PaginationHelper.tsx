import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  currentPage?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationHelper = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  console.log('  hasNextPage,hasPrevPage',   hasNextPage,
  hasPrevPage)

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [totalItems]);

  return (
    <div className="w-full mt-6 flex justify-center">
      <ul className="flex space-x-2 text-sm">
        {/* Previous Button */}
        <li>
          <motion.button
            whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`px-4 py-2 rounded-lg border border-[#6a448e] shadow-sm transition ${
              !hasPrevPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-purple-100 text-purple-700"
            }`}
            onClick={() => {
              if (hasPrevPage) handlePageClick(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            Prev
          </motion.button>
        </li>

        {/* Current Page with smooth behind animation */}
        <li>
          <AnimatePresence mode="wait">
            <motion.button
              key={currentPage} // important for re-animation
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: -20 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className={`px-4 py-2 rounded-lg border border-[#6a448e] transition ${
                currentPage
                  ? "bg-[#75518f] text-white"
                  : "bg-white hover:bg-purple-100 text-[#6a448e]"
              }`}
            >
              {currentPage}
            </motion.button>
          </AnimatePresence>
        </li>

        {/* Next Button */}
        <li>
          <motion.button
            whileHover={{ scale: currentPage < totalPages ? 1.05 : 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`px-4 py-2 rounded-lg border border-[#6a448e] shadow-sm transition ${
              !hasNextPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-purple-100 text-purple-700"
            }`}
            onClick={() => {
              if (hasNextPage) handlePageClick(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </motion.button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationHelper;
