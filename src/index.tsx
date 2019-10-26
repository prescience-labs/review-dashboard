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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "react-table/react-table.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/scss/data-intel.scss";
import "@fortawesome/fontawesome-free/css/all.css";

import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import ReviewCreation from "./views/publicCreateReview";
import ThankYou from "./views/ThankYou";
import UserContextWrapper from "components/UserContext";
import AuthCallback from "views/auth/Callback";

ReactDOM.render(
  <BrowserRouter>
    <UserContextWrapper>
      <Switch>
        <Route path="/auth/callback" component={AuthCallback} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route
          path="/review/:id"
          render={props => <ReviewCreation {...props} />}
        />
        <Route path="/thankyou" render={props => <ThankYou {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </UserContextWrapper>
  </BrowserRouter>,
  document.getElementById("root")
);
