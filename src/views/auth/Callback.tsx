import React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import qs from "query-string";
import { setToken } from "sdk/user";

export default function AuthCallback(props: RouteComponentProps) {
  setToken(qs.parse(props.location.search)["token"]);
  return <Redirect to="/admin/dashboard" />;
}
