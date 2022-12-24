import React from "react"
import usePagination from "../../../hooks/usePagination"

export default function Pagination({ totalPages, page, changePage }) {
  const pagesArray = usePagination(totalPages)

  return (
    <div className="page__wrapper">
      {pagesArray.map((p, index) => (
        <span
          onClick={changePage.bind(null, p)}
          className={p === page ? "page page__current" : "page"}
          key={index}
        >
          {p}
        </span>
      ))}
    </div>
  )
}
