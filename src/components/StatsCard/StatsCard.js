import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

export default function CardStats(props) {
  const { title, body, icon, stats } = props;

  return (
    <Col lg="6" xl="3">
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                {title}
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">{body}</span>
            </div>
            <Col className="col-auto">
              <div className={`icon icon-shape text-white rounded-circle shadow ${icon.bgColor}`}>
                <i className={`fas ${icon.name}`} />
              </div>
            </Col>
          </Row>
          <p className="mt-3 mb-0 text-muted text-sm">
            <span className={`mr-2 ${stats.positive ? 'text-success' : 'text-danger'}`}>
              <i className={`fa ${stats.positive ? 'fa-arrow-up' : 'fa-arrow-down' }`} />{stats.value}
            </span>{" "}
            <span className="text-nowrap">{stats.occurrence}</span>
          </p>
        </CardBody>
      </Card>
    </Col>
  );
}
