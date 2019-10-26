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
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import Sidebar from "../components/Sidebar/Sidebar";
import Index from "../views/admin/Dashboard";
import Profile from "../views/examples/Profile";
import Maps from "../views/examples/Maps";
import Tables from "../views/examples/Tables";
import Icons from "../views/examples/Icons";
import routes from "../routes";
import Reviews from "views/admin/Reviews";
import Campaigns from "views/admin/Campaigns";
import Insights from "views/admin/Insights";
import { ReviewProvider } from "state/reviews";
import { ReviewSdk } from "sdk";

const REVIEWS_TO_FETCH = 500;

class Admin extends React.Component {
  state = {
    reviews: undefined
  };
  componentDidUpdate(e) {
    if (!document) return;
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/dashboard",
            imgSrc: require("assets/img/brand/data-intel.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar {...this.props} />
          <ReviewProvider
            value={{
              reviews: this.state.reviews,
              setReviews: reviews => this.setState({ reviews }),
              getReviews: () =>
                ReviewSdk.getReviews({ limit: REVIEWS_TO_FETCH })
            }}
          >
            <Switch>
              <Route path="/admin/dashboard" component={Index} />
              <Route path="/admin/icons" component={Icons} />
              <Route path="/admin/maps" component={Maps} />
              <Route path="/admin/user-profile" component={Profile} />
              <Route path="/admin/insights" component={Insights} />
              <Route path="/admin/reviews" component={Reviews} />
              <Route path="/admin/tables" component={Tables} />
              <Route path="/admin/campaigns" component={Campaigns} />
              <Route
                path=""
                component={() => <Redirect to="/admin/dashboard" />}
              />
            </Switch>
          </ReviewProvider>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
