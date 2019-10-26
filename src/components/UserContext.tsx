import React, { createContext, useState } from "react";
import { IUser, login, logout } from "sdk/user";
import { Route, RouteComponentProps } from "react-router";

export const UserContext = createContext({
  user: null,
  login: ({ email, password }): Promise<void> => null,
  logout: () => {}
});

interface IUserContextProps {
  children: any;
}
export default function UserContextWrapper(props: IUserContextProps) {
  const [user] = useState<IUser>(null);
  const _login = (props: RouteComponentProps) => async ({
    email,
    password
  }) => {
    await login({ email, password });
    props.history.push("/admin/dashboard");
  };
  return (
    <Route
      render={innerProps => {
        return (
          <UserContext.Provider
            value={{ user, login: _login(innerProps), logout }}
          >
            {props.children}
          </UserContext.Provider>
        );
      }}
    >
      {props.children}
    </Route>
  );
}
