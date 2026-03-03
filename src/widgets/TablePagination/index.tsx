import './style/index.css';
import type React from 'react';

interface ITablePaginationProps {
    totalItems: number;
    normalizedCurrentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TablePagination: React.FC<ITablePaginationProps> = ({ totalItems, normalizedCurrentPage, totalPages, startIndex, endIndex, setCurrentPage}) => {
    const paginationWindow = 5;
    const startPage = Math.max(1, normalizedCurrentPage - Math.floor(paginationWindow / 2));
    const endPage = Math.min(totalPages, startPage + paginationWindow - 1);

    const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    
    const startDiff = normalizedCurrentPage - 1;
    const endDiff = totalPages - normalizedCurrentPage;

    const goToPage = (page: number): void => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    return (
        <div className='paginationWrap'>
            <span>
                {totalItems === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
            </span>

            <div className='paginationButtons'>
                <button type='button' onClick={() => goToPage(normalizedCurrentPage - 1)} disabled={normalizedCurrentPage === 1}>
                    Prev
                </button>

                {
                    pageButtons.slice(0, 3).map((pageNumber, index: number) => {
                        const isFarFromStart = (pageNumber !== normalizedCurrentPage && totalPages > 5 && startDiff > 2);
                        const page = isFarFromStart && index === 0 ? 1 : pageNumber;
                        const isEllipsis = isFarFromStart && index === 1;
                        return (
                            <button
                            key={pageNumber}
                            type='button'
                            className={
                                pageNumber === normalizedCurrentPage ? 'activePage' : ''
                            }
                            onClick={() => goToPage(page)}>
                                {isEllipsis ? '...' : page}
                            </button>
                        )
                    })
                }

                {
                    pageButtons.slice(3, 5).map((pageNumber, index: number) => {
                        const isFarFromEnd = (pageNumber !== normalizedCurrentPage && totalPages > 5 && endDiff > 2);
                        const page = isFarFromEnd && index === 1 ? totalPages : pageNumber;
                        const isEllipsis = isFarFromEnd && index === 0;
                        return (
                            <button
                            key={pageNumber}
                            type='button'
                            className={
                                pageNumber === normalizedCurrentPage ? 'activePage' : ''
                            }
                            onClick={() => goToPage(page)}>
                                {isEllipsis ? '...' : page}
                            </button>
                        )
                    })
                }

                <button
                    type='button'
                    onClick={() => goToPage(normalizedCurrentPage + 1)}
                    disabled={normalizedCurrentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
