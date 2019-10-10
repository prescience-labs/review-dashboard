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
import React from "react";
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
  Container,
  Row,
  Col
} from "reactstrap";

// core components
// import { chartExample1, chartExample2 } from "variables/charts.jsx";
import { chartOptions, parseOptions } from "../../../variables/charts";
import Header from "components/Headers/Header.jsx";
import StatCard from "../../../components/Cards/StatCard";
import {
  sentimentOptions,
  sentimentData
} from "../../../variables/charts/sentiment";
import moment from "moment";
import {
  totalReviewData,
  totalReviewOptions
} from "../../../variables/charts/totalReviews";
import DITable from "../../../components/Table/Table";
import { IReview } from "sdk/reviews";
import reviewTableColumns from "variables/tables/reviews";
import {
  IReviewByStoreColumnShape as IReviewByStoreDataShape,
  reviewsByStoreColumns
} from "variables/tables/reviewsByStore";
import { ReviewContext, ReviewConsumer } from "state/reviews";

declare global {
  interface Window {
    Chart: any;
  }
}
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
  get reviewByStoreData(): IReviewByStoreDataShape[] {
    const dataKeyedByVendor = (
      (this.context && this.context.reviews) ||
      []
    ).reduce((prev, review) => {
      if (!prev[review.vendor]) {
        prev[review.vendor] = {
          count: 0,
          vendor: review.vendor,
          percent: 0
        };
      }
      prev[review.vendor].count += 1;
      return prev;
    }, {});
    const total = Object.keys(dataKeyedByVendor).reduce(
      (p, c) => p + dataKeyedByVendor[c].count,
      0
    );
    return Object.keys(dataKeyedByVendor).reduce((prev, curr) => {
      prev.push({
        ...dataKeyedByVendor[curr],
        percent: (dataKeyedByVendor[curr].count / total) * 100
      });
      return prev;
    }, []);
  }
  get chartData() {
    const dataByMonth = {};
    ((this.context && this.context.reviews) || []).forEach(review => {
      const { sentiment_analysis } = review;
      if (!sentiment_analysis) {
        return;
      }
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
    if (this.context && !this.context.reviews && this.context.setReviews) {
      this.context.getReviews &&
        this.context
          .getReviews()
          .then(reviews => this.context.setReviews(reviews));
    }
  }
  render() {
    return (
      <>
        <ReviewConsumer>
          {value => (
            <>
              <Header></Header>
              {/* Page content */}
              <Container className="mt--7" fluid>
                <Row className="mb-5">
                  {new Array(4).fill(null).map(() => (
                    <Col lg="6" xl="3" className="mt-xl--5">
                      <StatCard
                        title="Overall sentiment"
                        statistic="85% positive"
                        delta={3.01}
                        deltaTimeUnit="Since last month"
                      />
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col className="mb-5 mb-xl-0" xl="8">
                    <Card className="bg-gradient-dark shadow">
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
                          {/* <div className="col">
                            <Nav className="justify-content-end" pills>
                              <NavItem>
                                <NavLink
                                // className={classnames("py-2 px-3", {
                                //   active: this.state.activeNav === 1
                                // })}
                                >
                                  <span className="d-none d-md-block">
                                    Month
                                  </span>
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
                                >
                                  <span className="d-none d-md-block">
                                    Week
                                  </span>
                                  <span className="d-md-none">W</span>
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div> */}
                        </Row>
                      </CardHeader>
                      <CardBody>
                        {/* Chart */}
                        <div className="chart">
                          <Line
                            data={sentimentData(this.chartData)}
                            options={sentimentOptions}
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
                      <DITable
                        columns={reviewTableColumns}
                        data={(this.context && this.context.reviews) || []}
                      />
                    </Card>
                  </Col>
                  <Col xl="4">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <div className="col">
                            <h3 className="mb-0">Reviews by Store</h3>
                          </div>
                        </Row>
                      </CardHeader>
                      <DITable<IReviewByStoreDataShape>
                        data={this.reviewByStoreData}
                        columns={reviewsByStoreColumns}
                        showPagination={false}
                      />
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </ReviewConsumer>
      </>
    );
  }
}

Dashboard.contextType = ReviewContext;
