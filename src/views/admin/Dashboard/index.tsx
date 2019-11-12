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
import { IReview, getReviews } from "sdk/reviews";
import reviewTableColumns from "variables/tables/reviews";
import {
  IReviewByStoreColumnShape as IReviewByStoreDataShape,
  reviewsByStoreColumns
} from "variables/tables/reviewsByStore";
import { ReviewContext, ReviewConsumer } from "state/reviews";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    Chart: any;
  }
}
export interface IState {
  reviews: IReview[];
  last30: number | null;
  last60: number | null;
  sentiment: number | null;
}
export default class Dashboard extends React.Component<{}, IState> {
  state = {
    reviews: [] as IReview[],
    last30: null,
    last60: null,
    sentiment: null
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
  get reviewsByMonth() {
    const dataByMonth = {};
    ((this.context && this.context.reviews) || []).forEach(review => {
      const { sentiment_analysis } = review;
      if (!sentiment_analysis) {
        return;
      }
      const month = moment(review.created_at)
        .format("MMM 'YY");
      const [positive, negative] = dataByMonth[month] || [0, 0];
      if (!sentiment_analysis || !sentiment_analysis.score) {
        dataByMonth[month] = [positive, negative];
      }
      const { score } = sentiment_analysis;
      dataByMonth[month] =
        score > 0 ? [positive + 1, negative] : [positive, negative + 1];
    });
    return dataByMonth;
  }
  get chartData() {
    const reviewsByMonth = this.reviewsByMonth;
    const serializedData = Object.keys(this.reviewsByMonth)
      .sort((_a, _b) => {
        const a = moment(_a, "MMM 'YY").valueOf();
        const b = moment(_b, "MMM 'YY").valueOf();
        return a - b;
      })
      .map(key => {
        const total = reviewsByMonth[key][0] + reviewsByMonth[key][1];
        debugger;
        const pct =
          total === 0 ? 0 : Math.round((reviewsByMonth[key][0] / total) * 100);

        return { month: key, percentPositive: pct, total };
      });
    return serializedData;
  }
  componentDidMount() {
    if (this.context && !this.context.reviews && this.context.setReviews) {
      this.context.getReviews &&
        this.context
          .getReviews()
          .then(reviews => this.context.setReviews(reviews.results));
    }
    getReviews({
      after: moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD")
    }).then(data => this.setState({ last30: data.count }));
    getReviews({
      after: moment()
        .subtract(60, "days")
        .format("YYYY-MM-DD")
    }).then(data => this.setState({ last60: data.count }));
  }

  formatNumber(number: number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  getSentimentHumanScore(polarity: number) {
    if (polarity > 0.8) {
      return "Very Positive";
    } else if (polarity > 0.6) {
      return "Mostly Positive";
    } else if (polarity > 0.2) {
      return "Somewhat Positive";
    } else if (polarity > 0) {
      return "Neutral";
    } else if (polarity > -0.4) {
      return "Somewhat Negative";
    } else {
      return "Mostly Negative";
    }
  }
  render() {
    const { last30, last60 } = this.state;
    const avgSentiment =
      this.context.reviews &&
      this.context.reviews
        .map(r => (r.sentiment_analysis ? r.sentiment_analysis.score : 0))
        .reduce((prev, value) => prev + value, 0) / this.context.reviews.length;

    console.log(last30, last60);
    return (
      <>
        <ReviewConsumer>
          {value => (
            <>
              <Header></Header>
              {/* Page content */}
              <Container className="mt--7" fluid>
                <Row className="mb-5">
                  <Col lg="6" xl="3" className="mt-xl--5">
                    <StatCard
                      title="Reviews in last 30 days"
                      statistic={last30 ? this.formatNumber(last30) : ""}
                      delta={this.formatNumber(last30 - (last60 - last30))}
                      loading={last60 === null || last30 === null}
                      caption="Since last month"
                      isPositive={last30 - last60 >= 0}
                    >
                      <i className="fas fa-star" />
                    </StatCard>
                  </Col>
                  <Col lg="6" xl="3" className="mt-xl--5">
                    <StatCard
                      title="Overall sentiment"
                      statistic={`${(((avgSentiment + 1) / 2) * 100).toFixed(
                        0
                      )}%`}
                      isPositive={avgSentiment >= 0}
                      color="danger"
                      caption={this.getSentimentHumanScore(avgSentiment)}
                    >
                      <i className="fas fa-check" />
                    </StatCard>
                  </Col>
                  <Col lg="6" xl="3" className="mt-xl--5">
                    <StatCard
                      title="Total Orders"
                      statistic="2,191"
                      delta={129}
                      color="info"
                      isPositive={true}
                      caption="Since last month"
                    >
                      <i className="fas fa-box" />
                    </StatCard>
                  </Col>
                  <Col lg="6" xl="3" className="mt-xl--5">
                    <StatCard
                      title="Response Rate"
                      statistic="2%"
                      delta={1.1}
                      color="yellow"
                      isPositive={true}
                      caption="Since last month"
                    >
                      <i className="fas fa-comments" />
                    </StatCard>
                  </Col>
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
                            <Link to="/admin/reviews">
                              <Button color="primary" size="sm">
                                See all
                              </Button>
                            </Link>
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
