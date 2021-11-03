import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export async function register({ name, email, password }) {
  const { data } = await http.post(apiEndpoint, {
    user:{
      name: name,
      email: email,
      password: password
    }
  });
  localStorage.setItem("token", JSON.stringify({ auth_token: null, user: data }));
}

export async function update_user(id, name, email, password) {
  const { data } = await http.put(apiEndpoint + '/' + id, {
    user: {
      name: name,
      email: email,
      password: password
    }
  });
  localStorage.setItem("token", JSON.stringify({ auth_token: null, user: data }));
}

export async function users() {
  const { data: users } = await http.get(apiEndpoint);
  return users;
}

export async function get_user(id) {
  const { data: user } = await http.get(apiEndpoint + '/' + id );
  return user;
}

export function delete_user(id) {
  return http.delete(apiEndpoint + '/' + id);
}

export default {
  users,
  register,
  get_user,
  delete_user
}