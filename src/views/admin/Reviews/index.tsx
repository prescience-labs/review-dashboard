import React, { useEffect, useState, useContext } from "react";
import Header from "components/Headers/Header";
import DITable from "components/Table/Table";
import reviewTableColumns from "variables/tables/reviews";
import { Card, CardHeader, CardFooter, Container, Col, Row } from "reactstrap";
import { ReviewSdk } from "sdk";
import { ReviewContext, ReviewProvider, ReviewConsumer } from "state/reviews";

const REVIEWS_TO_FETCH = 1000;

export default function Reviews() {
  const [isLoading, setIsLoading] = useState(false);
  const reviewContext = useContext(ReviewContext);
  useEffect(() => {
    if (!reviewContext.reviews) {
      setIsLoading(true);
      ReviewSdk.getReviews(REVIEWS_TO_FETCH).then(reviews => {
        reviewContext.setReviews(reviews);
        setIsLoading(false);
      });
    }
  }, []);
  return (
    <ReviewConsumer>
      {value => (
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
                    data={(value && value.reviews) || []}
                  />
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </ReviewConsumer>
  );
}
