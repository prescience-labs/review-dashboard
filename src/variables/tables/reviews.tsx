import React from "react";
import { Column } from "react-table";
import { ReviewText } from "components/ReviewText";
import { Media } from "reactstrap";

const reviewTableColumns = [
  {
    Header: "Store",
    id: "store",
    Cell: () => (
      <Media className="align-items-center">
        <span className="avatar rounded-circle mr-3">
          <img
            alt="..."
            src={
              "https://www.floydconsultancy.com/wp-content/uploads/2019/04/shopify-logo-600x600.jpg"
            }
          />
        </span>
        <span className="mb-0 text-sm">Shopify</span>
      </Media>
    )
  },
  {
    Header: "Review",
    accessor: "text",
    width: 800,
    getProps: () => ({ style: { whiteSpace: "normal" } }),
    Cell: ({ value, columnProps, original }) => (
      <ReviewText review={original}></ReviewText>
    )
  }
] as Column[];

export default reviewTableColumns;
