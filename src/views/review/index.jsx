import React, { useState } from "react";
import Header from "../../components/Headers/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
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
import "./review.css";

export default function ReviewCreation({ match }) {
  const [selectedIcon, setSelectedIcon] = useState();
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
                          <label className="form-control-label">
                            Would you recommend this to a friend?
                          </label>
                          <Row style={{ padding: "0.5rem 0 1.5rem 0" }}>
                            <Col>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedIcon("down")}
                                href="#"
                              >
                                <FontAwesomeIcon
                                  icon={faThumbsDown}
                                  className={`emoticon down ${selectedIcon ===
                                    "down" && "selected"}`}
                                  transform="flip-h down-2"
                                  size="3x"
                                  style={{ marginRight: "1rem" }}
                                />
                              </span>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedIcon("up")}
                                href="#"
                              >
                                <FontAwesomeIcon
                                  size="3x"
                                  className={`emoticon up ${selectedIcon ===
                                    "up" && "selected"}`}
                                  transform="up-2"
                                  icon={faThumbsUp}
                                />
                              </span>
                            </Col>
                          </Row>
                          <label
                            className="form-control-label"
                            htmlFor="input-review"
                          >
                            What did you think about the product?
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-review"
                            placeholder="Leave your thoughts..."
                            type="textarea"
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
                          onClick={e => e.preventDefault()}
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
