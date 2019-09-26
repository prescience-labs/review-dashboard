import React from "react";
import {
  Table,
  Media,
  DropdownItem,
  DropdownMenu,
  Badge,
  UncontrolledDropdown,
  UncontrolledTooltip,
  DropdownToggle
} from "reactstrap";

import RTable, { Column } from "react-table";
export interface IHeader {
  title?: string;
  cell?: string;
}

interface IProps {
  headers?: Column[];
}

const defaultHeaders: Column[] = [
  {
    Header: "Store",
    accessor: "store"
  },
  {
    Header: "Purchase Price",
    accessor: "price"
  },
  {
    Header: "Review",
    accessor: "review"
  },
  {
    Header: "Purchaser",
    accessor: "purchaser"
  }
];

const data = [
  {
    purchaser: "Doug",
    review: "This was great",
    price: 21,
    store: "shopify"
  }
];

const CustomHeader = ({ children }) => <th scope="col">{children}</th>;

export default function DITable({ headers = defaultHeaders }: IProps) {
  return (
    <RTable
      data={data}
      TableComponent={Table}
      TheadComponent={"thead"}
      getTheadProps={() => ({ className: "thead-light" })}
      ThComponent={CustomHeader}
      TrComponent="tr"
      PadRowComponent={null}
      TrGroupComponent={({ children }) => <>{children}</>}
      TbodyComponent="tbody"
      TdComponent="td"
      columns={headers}
      minRows={0}
      showPagination={false}
      getTableProps={() => {
        return {
          className: "align-items-center table-flush",
          responsive: true
        };
      }}
      getTheadThProps={() => <th scope="col" />}
    />
  );

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Store</th>
          <th scope="col">Purchase Price</th>
          <th scope="col">Review</th>
          <th scope="col">Purchaser</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>$2,500 USD</td>
          <td>
            <Badge color="" className="badge-dot mr-4">
              <i className="bg-warning" />
              pending
            </Badge>
          </td>
          <td>
            <div className="avatar-group">
              <a
                className="avatar avatar-sm"
                href="#pablo"
                id="tooltip996637554"
                onClick={e => e.preventDefault()}
              >
                <img
                  alt="..."
                  className="rounded-circle"
                  src={require("assets/img/theme/team-4-800x800.jpg")}
                />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip996637554">
                Jessica Doe
              </UncontrolledTooltip>
            </div>
          </td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  Action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  Another action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  Something else here
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
