import React, { useEffect, useState, useContext } from "react";
import Header from "components/Headers/Header";
import DITable from "components/Table/Table";
import reviewTableColumns from "variables/tables/reviews";
import { Card, CardHeader, Container, Col, Row } from "reactstrap";
import { ReviewContext, ReviewConsumer } from "state/reviews";

export default function Reviews() {
  const [isLoading, setIsLoading] = useState(false);
  const reviewContext = useContext(ReviewContext);
  useEffect(() => {
    if (!reviewContext.reviews) {
      setIsLoading(true);
      reviewContext.getReviews().then(reviews => {
        reviewContext.setReviews(reviews);
        setIsLoading(false);
      });
    }
  }, [reviewContext]);
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
