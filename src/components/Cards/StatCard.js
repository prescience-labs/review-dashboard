import React from "react";
import propTypes from "prop-types";
import { Card, CardBody, Row, CardTitle, Col } from "reactstrap";

export default function StatCard(props) {
  return (
    <Card className="card-stats mb-4 mb-xl-0" style={{ height: 140 }}>
      <CardBody>
        {props.loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  {props.title}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">
                  {props.statistic}
                </span>
              </div>
              <Col className="col-auto">
                <div
                  className={`icon icon-shape bg-${props.color} text-white rounded-circle shadow`}
                >
                  {props.children}
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span
                className={`text-${
                  props.isPositive ? "success" : "warning"
                } mr-2`}
              >
                {props.isPositive !== undefined ? (
                  <i
                    className={`fa fa-arrow-${
                      props.isPositive ? "up" : "down"
                    }`}
                  />
                ) : null}{" "}
                {props.delta}
              </span>{" "}
              <span className="text-nowrap">{props.caption}</span>
            </p>
          </>
        )}
      </CardBody>
    </Card>
  );
}

StatCard.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
  delta: propTypes.oneOfType([propTypes.number, propTypes.string]),
  caption: propTypes.string.isRequired,
  isPositive: propTypes.bool,
  statistic: propTypes.string.isRequired,
  loading: propTypes.bool,
  color: propTypes.oneOf(["warning", "danger", "yellow", "info"])
};

StatCard.defaultProps = {
  title: "",
  children: <span />,
  deltaTimeUnit: "Since last month",
  statistic: "Please provide a statistic",
  color: "warning",
  isPositive: undefined
};
