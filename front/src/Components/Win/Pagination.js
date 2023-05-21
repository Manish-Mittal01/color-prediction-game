import React from "react";


const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
    currentPosts
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination myPagination'>
            <div className="paginationNumber">
                {currentPosts?.[0] + 1}-{currentPosts?.[1]} of {totalPosts}
            </div>
            <div className="paginationButtons">
                <p onClick={() => {
                    currentPosts?.[0] !== 0 &&
                        setCurrentPage(currentPage - 1)
                }} >{"<"}</p>
                <p onClick={() => {
                    console.log(currentPosts?.[1], totalPosts)
                    currentPosts?.[1] <= totalPosts &&
                        setCurrentPage(currentPage + 1)
                }}>{">"}</p>
            </div>
        </div>
    );
};

export default Pagination;
