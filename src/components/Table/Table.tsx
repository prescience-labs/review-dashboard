import React from "react";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

import RTable, { Column, ComponentProps, TableProps } from "react-table";
export interface IHeader {
  title?: string;
  cell?: string;
}

interface IProps<T> {
  columns?: Column[];
  data: T[];
  loading?: boolean;
  paginationSize?: number;
}

const CustomHeader = ({ children }) => <th scope="col">{children}</th>;

export default function DITable<T>({
  columns = [],
  data,
  paginationSize = 5
}: IProps<T>) {
  return (
    <RTable
      resizable={false}
      data={data}
      columns={columns}
      minRows={2}
      TableComponent={({ children, ...rest }) => (
        <Table {...rest} className="align-items-center" responsive={true}>
          {children}
        </Table>
      )}
      pageSize={5}
      TheadComponent={"thead"}
      getTheadProps={() => ({ className: "thead-light" })}
      ThComponent={CustomHeader}
      TrComponent="tr"
      TrGroupComponent={({ children }) => <>{children}</>}
      TbodyComponent="tbody"
      TdComponent="td"
      PaginationComponent={PaginationComponent}
    />
  );

  function PaginationComponent(props: TableProps) {
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
              Math.max(0, Math.min(paginationSize, Math.max(props.pages - 1)))
            )
          )
            .reduce((prev, _, i) => [...prev, prev[i] + 1], [
              Math.min(
                Math.max(props.page - 2, 0),
                Math.max(props.pages - 1 - paginationSize, 0)
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

  // return (
  //   <Table className="align-items-center table-flush" responsive>
  //     <thead className="thead-light">
  //       <tr>
  //         <th scope="col">Store</th>
  //         <th scope="col">Purchase Price</th>
  //         <th scope="col">Review</th>
  //         <th scope="col">Purchaser</th>
  //         <th scope="col" />
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>$2,500 USD</td>
  //         <td>
  //           <Badge color="" className="badge-dot mr-4">
  //             <i className="bg-warning" />
  //             pending
  //           </Badge>
  //         </td>
  //         <td>
  //           <div className="avatar-group">
  //             <a
  //               className="avatar avatar-sm"
  //
  //               id="tooltip996637554"
  //               onClick={e => e.preventDefault()}
  //             >
  //               <img
  //                 alt="..."
  //                 className="rounded-circle"
  //                 src={require("assets/img/theme/team-4-800x800.jpg")}
  //               />
  //             </a>
  //             <UncontrolledTooltip delay={0} target="tooltip996637554">
  //               Jessica Doe
  //             </UncontrolledTooltip>
  //           </div>
  //         </td>
  //         <td className="text-right">
  //           <UncontrolledDropdown>
  //             <DropdownToggle
  //               className="btn-icon-only text-light"
  //
  //               role="button"
  //               size="sm"
  //               color=""
  //               onClick={e => e.preventDefault()}
  //             >
  //               <i className="fas fa-ellipsis-v" />
  //             </DropdownToggle>
  //             <DropdownMenu className="dropdown-menu-arrow" right>
  //               <DropdownItem onClick={e => e.preventDefault()}>
  //                 Action
  //               </DropdownItem>
  //               <DropdownItem onClick={e => e.preventDefault()}>
  //                 Another action
  //               </DropdownItem>
  //               <DropdownItem onClick={e => e.preventDefault()}>
  //                 Something else here
  //               </DropdownItem>
  //             </DropdownMenu>
  //           </UncontrolledDropdown>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </Table>
  // );
}
