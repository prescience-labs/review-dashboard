import React from "react";
import { Column } from "react-table";
import { Progress } from "reactstrap";

export interface IReviewByStoreColumnShape {
  vendor: string;
  count: number;
  percent: number;
}

const colors = ["red", "blue", "yellow", "green", "purple", "orange"].reverse();

export const reviewsByStoreColumns: Column[] = [
  {
    Header: "Store",
    // accessor: "vendor"
    // TODO: MAKE LIVE DATA
    Cell: () => <span>Shopify</span>
  },
  {
    Header: "Count",
    accessor: "count"
  },
  {
    Cell: ({ original, index, ...rest }) => {
      console.log(rest, "rest");
      return (
        <div className="d-flex align-items-center">
          <span className="mr-2">{`${original.percent}%`}</span>
          <div>
            <Progress
              max="100"
              value={`${original.percent}`}
              color={colors[colors.length % (index + 1)]}
            />
          </div>
        </div>
      );
    }
  }
];
