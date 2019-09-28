import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { TableProps } from "react-table";

const PAGINATION_VISIBLE_PAGES = 5;

export default function PaginationComponent(props: TableProps) {
  const changePage = page => () => {
    props.onPageChange(page);
  };
  return (
    <nav aria-label="..." style={{ marginBottom: "1rem" }}>
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        <PaginationItem className={`${props.page <= 0 ? "disabled" : ""}`}>
          <PaginationLink onClick={changePage(props.page - 1)} tabIndex={-1}>
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {Array.apply(
          null,
          new Array(
            Math.max(
              0,
              Math.min(PAGINATION_VISIBLE_PAGES, Math.max(props.pages - 1))
            )
          )
        )
          .reduce((prev, _, i) => [...prev, prev[i] + 1], [
            Math.min(
              Math.max(props.page - 2, 0),
              Math.max(props.pages - 1 - PAGINATION_VISIBLE_PAGES, 0)
            )
          ])
          .map(page => {
            return (
              <PaginationItem
                className={`${props.page === page ? "active" : ""}`}
                onClick={changePage(page)}
              >
                <PaginationLink onClick={e => e.preventDefault()}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        <PaginationItem
          className={`${props.page >= props.pages - 1 ? "disabled" : ""}`}
        >
          <PaginationLink onClick={changePage(props.page + 1)}>
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
}
