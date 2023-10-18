import React, { useEffect, useLayoutEffect } from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  currentPosts,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination myPagination">
      <div className="paginationNumber">
        {currentPosts?.[0] + 1}-{currentPosts?.[1]} of {totalPosts}
      </div>
      <div className="paginationButtons">
        <p
          onClick={() => {
            currentPosts?.[0] !== 0 && setCurrentPage(currentPage - 1);
          }}
        >
          {"<"}
        </p>
        <p
          onClick={() => {
            console.log(currentPosts?.[1], totalPosts);
            currentPosts?.[1] <= totalPosts && setCurrentPage(currentPage + 1);
          }}
        >
          {">"}
        </p>
      </div>
    </div>
  );
};

export default Pagination;

export const MyPagination = ({ page, limit = 15, totalPosts, setPage }) => {
  const lastPage = Math.ceil(totalPosts / limit);

  let firstPost = (page - 1) * limit + 1;
  firstPost = firstPost > totalPosts ? (lastPage - 1) * limit + 1 : firstPost;
  const lastPost =
    firstPost + limit - 1 < totalPosts ? firstPost + limit - 1 : totalPosts;

  useEffect(() => {
    if (page > lastPage) {
      setPage(lastPage);
    }
  }, []);

  console.log("firstPost", firstPost);
  console.log("lastPost", lastPost);
  console.log("page", page);

  return (
    <div className="pagination myPagination">
      <div className="paginationNumber">
        {firstPost}-{lastPost} of {totalPosts}
      </div>
      <div className="paginationButtons">
        <p
          onClick={() => {
            page > 1 && setPage((prev) => prev - 1);
          }}
        >
          {"<"}
        </p>
        <p
          onClick={() => {
            lastPost < totalPosts && setPage((prev) => prev + 1);
          }}
        >
          {">"}
        </p>
      </div>
    </div>
  );
};
