import React from "react";
import Header from "../../components/Headers/Header";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col
} from "reactstrap";

export default function ReviewCreation({ history }) {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="bg-secondary shadow" fluid>
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Thank you for your review!</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6"></Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          onClick={() =>
                            (window.location.href =
                              "https://data-intel-store.myshopify.com")
                          }
                        >
                          <span className="btn-inner--text">
                            Go to Data Intel
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
