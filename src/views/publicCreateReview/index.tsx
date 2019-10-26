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
import ReactRater from "react-rater";
import Star from "./Star";
import "react-rater/lib/react-rater.css";
import config from "config/config";

export default function ReviewCreation({ match, history }) {
  const ratingMax = 5;
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState(null);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      const { data: transaction } = await Axios.get(
        `${config.integrationsUrl}/proxy/transactions/${match.params.id}`
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
    await Axios.post(`${config.integrationsUrl}/proxy/reviews/`, {
      vendor: transaction.vendor,
      transaction: transaction.id,
      product: transaction.products[0],
      text: reviewText,
      rating_max: ratingMax,
      rating
    }).then(() => {
      history.push("/thankyou");
    });
  };
  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <Col>
            <Card className="bg-secondary shadow" fluid="true">
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
                          <div style={{ marginBottom: 20 }}>
                            <ReactRater
                              total={5}
                              rating={rating}
                              onRate={({ rating: r }) => setRating(r)}
                            >
                              <Star />
                            </ReactRater>
                          </div>
                          <label
                            className="form-control-label"
                            htmlFor="input-review"
                          >
                            What do you think about the product?
                          </label>
                          <Input
                            style={{ minHeight: "15rem" }}
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
