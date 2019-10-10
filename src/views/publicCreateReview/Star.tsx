import React, { CSSProperties } from "react";
interface Props {
  isActive?: boolean;
  willBeActive?: boolean;
}
export default function Star({ isActive, willBeActive }: Props) {
  if (isActive || willBeActive) {
    return <i style={starStyle} className="fas fa-star"></i>;
  } else {
    return <i style={starStyle} className="far fa-star"></i>;
  }
}

const starStyle: CSSProperties = {
  color: "#22F9C7",
  fontSize: "2.5rem",
  cursor: "pointer"
};
