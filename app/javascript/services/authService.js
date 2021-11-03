import http from "./httpService";
import { apiUrl, apiRootUrl  } from "../config.json";

const apiEndPoint = apiRootUrl + "/users/sign_in";
const tokenKey = "token";

http.setAuthToken(getAuthToken());

export async function login(email, password) {
  const { data: auth_token } = await http.post(apiEndPoint, { session: { email, password } });
  localStorage.setItem(tokenKey, JSON.stringify(auth_token));
}

export function loginWithAuthToken(auth_token) {
  localStorage.setItem(tokenKey, auth_token.toString());
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    let { user } = JSON.parse(localStorage.getItem(tokenKey));
     return user;
  } catch (ex) {
    return null;
  }
}

export function getAuthToken() {
  try {
    let { auth_token } = JSON.parse(localStorage.getItem(tokenKey))
    return auth_token;
  } catch (ex) {
    return null;
  }

}

export default {
  login,
  logout,
  getAuthToken,
  getCurrentUser,
  loginWithAuthToken
};
