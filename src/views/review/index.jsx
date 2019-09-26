import React, { useState, useEffect } from "react";
import Header from "../../components/Headers/Header";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { ClipLoader as Spinner } from "react-spinners";
import "./review.css";
import Axios from "axios";

export default function ReviewCreation({ match, history }) {
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState(null);
  useEffect(() => {
    console.log(match.params.id);
    new Promise(async (resolve, reject) => {
      const { data: transaction } = await Axios.get(
        `https://data-intel-reviews-dev.herokuapp.com/v1/transactions/${match.params.id}`
      );
      setTransaction(transaction);
      setIsLoading(false);
    });
  }, [match.params.id]);
  if (isLoading) {
    return (
      <Row style={{ height: "80vh", verticalAlign: "center" }}>
        <Col
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <div>
            <Spinner />
          </div>
        </Col>
      </Row>
    );
  }

  const handleSubmit = async () => {
    await Axios.post(
      `https://data-intel-reviews-dev.herokuapp.com/v1/reviews`,
      {
        vendor: transaction.vendor,
        text: reviewText
      }
    ).then(() => {
      history.push("/thankyou");
    });
  };
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
                    <h3 className="mb-0">Leave a Review</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          {/* <label className="form-control-label">
                            Would you recommend this to a friend?
                          </label>
                          <Row style={{ padding: "0.5rem 0 1.5rem 0" }}>
                            <Col>

                            </Col>
                          </Row> */}
                          <label
                            className="form-control-label"
                            htmlFor="input-review"
                          >
                            What did you think about the product?
                          </label>
                          <Input
                            value={reviewText}
                            className="form-control-alternative"
                            id="input-review"
                            placeholder="Leave your thoughts..."
                            type="textarea"
                            onChange={e => setReviewText(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="#pablo"
                          onClick={handleSubmit}
                        >
                          <span className="btn-inner--text">Send Review</span>
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
