import React, { useEffect, useState } from "react";
import Header from "components/Headers/Header";
import DITable from "components/Table/Table";
import reviewTableColumns from "variables/tables/reviews";
import { Card, CardHeader, CardFooter, Container, Col, Row } from "reactstrap";
import { ReviewSdk } from "sdk";

const REVIEWS_TO_FETCH = 1000;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    ReviewSdk.getReviews(REVIEWS_TO_FETCH).then(reviews => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <Header />
      <Container fluid className="mt--7">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h3>All Reviews</h3>
                  </Col>
                </Row>
              </CardHeader>
              <DITable
                loading={isLoading}
                columns={reviewTableColumns}
                data={reviews}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
