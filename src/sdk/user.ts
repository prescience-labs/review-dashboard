import config from "config/config";
import axios from "axios";
import qs from "qs";
import { TOKENT_STORAGE_KEY as TOKEN_STORAGE_KEY } from "config/constants";
import User from "models/user";
export interface IUser {
  id: string;
  email: string;
  isActive: boolean;
  teams: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}
interface IUserApiResponse {
  id: string;
  email: string;
  is_active: boolean;
  teams: Array<string>;
  created_at: string;
  updated_at: string;
}
const userConfig = {
  baseUrl: config.api.authBaseUrl + "/v1"
};
const instance = axios.create({
  baseURL: userConfig.baseUrl
});
interface ILoginParameters {
  email: string;
  password: string;
}
export const login = async ({ email, password }: ILoginParameters) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  const { data } = await instance.post(
    "/token",
    qs.stringify({ email, password }),
    config
  );
  if (!data.token) {
    throw Error("Error logging in");
  }
  setToken(data.token);
  return data;
};

export const setToken = token => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const logout = async () => {
  setToken(null);
  return true;
};

const refreshToken = async (token: string): Promise<string | null> => {
  const { data } = await instance.post("/token/refresh", { token });
  return data.token || null;
};

const isTokenValid = async (token: string): Promise<boolean> => {
  const { data } = await instance.post("/token/verify", { token });
  return data.user_id ? true : false;
};

export const isLoggedIn = async (): Promise<boolean> => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    return null;
  } else {
    if (await isTokenValid(token)) {
      return true;
    } else {
      const refreshedToken = await refreshToken(token);
      if (refreshedToken) {
        setToken(refreshedToken);
        return true;
      }
    }
  }
  return false;
};

export const createUser = async ({ email, password }) => {
  const { data } = await instance.post("/users", { email, password });
  const user = User.fromAuthApiResponse(data);
};
