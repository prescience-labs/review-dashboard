import React, { useState } from "react";
import { Column } from "react-table";
import { ReviewText } from "components/ReviewText";
import { Media, Collapse } from "reactstrap";

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
    Cell: ({ value, columnProps, original }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <Collapse
            isOpen={isOpen}
            style={
              isOpen
                ? {}
                : { height: "2rem", display: "block", overflow: "hidden" }
            }
          >
            <div>
              <ReviewText review={original}></ReviewText>
            </div>
          </Collapse>
          <p
            dpta-toggle="collapse"
            role="button"
            style={{ color: "rgb(6, 213, 232)", cursor: "pointer" }}
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
            id={`toggler-${original.id}`}
          >
            Show {isOpen ? "Less" : "More"}
          </p>
        </>
      );
    }
  }
] as Column[];

export default reviewTableColumns;
