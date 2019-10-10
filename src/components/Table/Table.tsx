import React from "react";
import { Table } from "reactstrap";
import PaginationComponent from "./components/Pagination";

import RTable, { Column, TableProps } from "react-table";
export interface IHeader {
  title?: string;
  cell?: string;
}

interface IProps<T> extends Partial<TableProps<T>> {
  columns?: Column[];
  data: T[];
  paginationSize?: number;
}

const CustomHeader = ({ children }) => <th scope="col">{children}</th>;

export default function DITable<T>({
  columns = [],
  data,
  paginationSize = 5,
  loading,
  ...rest
}: IProps<T>) {
  return (
    <RTable
      resizable={false}
      data={data}
      columns={columns}
      minRows={2}
      loading={loading}
      TableComponent={({ children, ...rest }) => (
        <Table {...rest} className="align-items-center" responsive={true}>
          {children}
        </Table>
      )}
      noDataText=""
      pageSize={5}
      TheadComponent={"thead"}
      getTheadProps={() => ({ className: "thead-light" })}
      ThComponent={CustomHeader}
      TrComponent="tr"
      TrGroupComponent={({ children }) => <>{children}</>}
      TbodyComponent="tbody"
      TdComponent="td"
      PaginationComponent={PaginationComponent}
      {...rest}
    />
  );
}
