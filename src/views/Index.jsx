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
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardFooter,
  Badge,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";
import CardStats from "../components/Cards/CardStats";

class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <Header>
          <CardStats />
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
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
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
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
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
                      data={chartExample2.data}
                      options={chartExample2.options}
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
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Store</th>
                      <th scope="col">Purchase Price</th>
                      <th scope="col">Review</th>
                      <th scope="col">Purchaser</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={
                                "https://www.vectorlogo.zone/logos/amazon/amazon-tile.svg"
                              }
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">Amazon</span>
                          </Media>
                        </Media>
                      </th>
                      <td>$2,500 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          pending
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={
                                "https://wordpress.2bearstudio.com/wp-content/uploads/2013/09/logo-woocommerce.jpg"
                              }
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">WooCommerce</span>
                          </Media>
                        </Media>
                      </th>
                      <td>$1,800 USD</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip746418347"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip746418347"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={
                                "https://www.floydconsultancy.com/wp-content/uploads/2019/04/shopify-logo-600x600.jpg"
                              }
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">Shopify</span>
                          </Media>
                        </Media>
                      </th>
                      <td>$3,150 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-danger" />
                          delayed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip441753266"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip441753266"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={
                                "data:image/png;base64,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"
                              }
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">eBay</span>
                          </Media>
                        </Media>
                      </th>
                      <td>$4,400 USD</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-info" />
                          on schedule
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip372449339"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip372449339"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={
                                "https://www.floydconsultancy.com/wp-content/uploads/2019/04/shopify-logo-600x600.jpg"
                              }
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">Shopify</span>
                          </Media>
                        </Media>
                      </th>
                      <td>$2,200 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip664029969"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip664029969"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
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

export default Index;
