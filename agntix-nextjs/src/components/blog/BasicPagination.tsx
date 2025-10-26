import React from 'react';

interface BasicPaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

const BasicPagination: React.FC<BasicPaginationProps> = ({
    currentPage = 0,
    totalPages = 1,
    onPageChange
}) => {
    // Don't show pagination if there's only one page or no pages
    if (totalPages <= 1) {
        return null;
    }

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <li key={i}>
                    {currentPage === i ? (
                        <span className="current">{i + 1}</span>
                    ) : (
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                        >
                            {i + 1}
                        </a>
                    )}
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="basic-pagination mb-0">
            <nav>
                <ul>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 0) {
                                    handlePageChange(currentPage - 1);
                                }
                            }}
                            style={{ opacity: currentPage === 0 ? 0.5 : 1, cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
                        >
                            <i className="fa-regular fa-angle-left"></i>
                        </a>
                    </li>
                    {renderPageNumbers()}
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages - 1) {
                                    handlePageChange(currentPage + 1);
                                }
                            }}
                            style={{ opacity: currentPage >= totalPages - 1 ? 0.5 : 1, cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
                        >
                            <i className="fa-regular fa-angle-right"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default BasicPagination;