import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(response => {
  return response;
}, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

function setAuthToken(auth_token) {
  // axios.interceptors.request.use((config) => {
  //   config.params = config.params || {};
  //   config.params['auth_token'] = auth_token;
  //   return config;
  // });
  axios.defaults.params = { auth_token: auth_token };
  // axios.defaults.headers.common["x-auth-token"] = auth_token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAuthToken
};
