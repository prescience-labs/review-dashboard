/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
  Row,
  Col,
  Media
} from "reactstrap";

// core components
// import { chartExample1, chartExample2 } from "variables/charts.jsx";
import { chartOptions, parseOptions } from "./charts";
import Header from "components/Headers/Header.jsx";
import StatCard from "../components/Cards/StatCard";
import { sentimentOptions, sentimentData } from "./charts/sentiment";
import { ReviewSdk } from "../sdk";
import moment from "moment";
import { totalReviewData, totalReviewOptions } from "./charts/totalReviews";
import DITable from "../components/Table/Table";
import { Column } from "react-table";
import { IReview } from "sdk/reviews";
import { ReviewText } from "components/ReviewText";

declare global {
  interface Window {
    Chart: any;
  }
}
const REVIEWS_TO_FETCH = 100;
export interface IState {
  reviews: IReview[];
}
export default class Dashboard extends React.Component<{}, IState> {
  state = {
    reviews: [] as IReview[]
  };
  constructor(props: any) {
    super(props);
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  get chartData() {
    const dataByMonth = {};
    this.state.reviews.forEach(({ sentiment_analysis }) => {
      const m = Math.floor(Math.random() * 12 + 1);
      const month = moment()
        .subtract(m, "months")
        .format("MMM 'YY");
      const [positive, negative] = dataByMonth[month] || [0, 0];
      if (!sentiment_analysis || !sentiment_analysis.score_tag) {
        dataByMonth[month] = [positive, negative];
      }
      const { score_tag } = sentiment_analysis;
      if (score_tag && score_tag.indexOf && score_tag.indexOf("P") > -1) {
        dataByMonth[month] = [positive + 1, negative];
      } else {
        dataByMonth[month] = [positive, negative + 1];
      }
    });
    const serializedData = Object.keys(dataByMonth)
      .sort((_a, _b) => {
        const a = moment(_a, "MMM 'YY").valueOf();
        const b = moment(_b, "MMM 'YY").valueOf();
        return a - b;
      })
      .map(key => {
        const total = dataByMonth[key][0] + dataByMonth[key][1];

        const pct =
          total === 0 ? 0 : Math.round((dataByMonth[key][0] / total) * 100);

        return { month: key, percentPositive: pct, total };
      });
    return serializedData;
  }
  componentDidMount() {
    ReviewSdk.getReviews(REVIEWS_TO_FETCH).then(reviews =>
      this.setState({ reviews })
    );
  }
  render() {
    const toggleNavs = (e, index) => {
      e.preventDefault();
    };

    const columns: Column[] = [
      {
        Header: "Store",
        id: "store",
        Cell: () => (
          <Media className="align-items-center">
            <span className="avatar rounded-circle mr-3">
              <img
                alt="..."
                src={
                  "https://www.floydconsultancy.com/wp-content/uploads/2019/04/shopify-logo-600x600.jpg"
                }
              />
            </span>
            <span className="mb-0 text-sm">Shopify</span>
          </Media>
        )
      },
      {
        Header: "Review",
        accessor: "text",
        width: 800,
        getProps: () => ({ style: { whiteSpace: "normal" } }),
        Cell: ({ value, columnProps, original }) => (
          <ReviewText review={original}></ReviewText>
        )
      }
    ];

    return (
      <>
        <Header>
          <Row>
            {new Array(4).fill(null).map(() => (
              <Col lg="6" xl="3">
                <StatCard
                  title="Overall sentiment"
                  statistic="85% positive"
                  delta={3.01}
                  deltaTimeUnit="Since last month"
                />
              </Col>
            ))}
          </Row>
        </Header>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">
                        Review Sentiment Trend
                      </h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            // className={classnames("py-2 px-3", {
                            //   active: this.state.activeNav === 1
                            // })}
                            onClick={e => toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            // className={classnames("py-2 px-3", {
                            //   active: this.state.activeNav === 2
                            // })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={sentimentData(this.chartData)}
                      options={sentimentOptions.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total reviews</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={totalReviewData(this.chartData)}
                      options={totalReviewOptions}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Latest Reviews</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <DITable columns={columns} data={this.state.reviews} />
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Reviews by Store</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
