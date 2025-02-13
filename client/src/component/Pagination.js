import React from 'react';

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="row mt-3">
            <div className="col-md-12 d-flex justify-content-center align-items-center gap-2">
                <button
                    className="btn btn-primary"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        className={`btn ${currentPage === page ? 'btn-dark' : 'btn-outline-primary'}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="btn btn-primary"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
