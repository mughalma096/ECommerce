import http from "./httpService";
import { apiUrl } from "../config.json";

const timeZoneEndPoint = apiUrl + "/user_time_zone";

export async function user_time_zones(user_id) {
  let user_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const { data: user_time_zones } = await http.get(timeZoneEndPoint, {
    params: {
      user_id,
      user_time_zone
    }
  });
  return user_time_zones;
}

export async function add_user_time_zone(user_id, { name, city, utc_difference }) {
  const { data } = await http.post(timeZoneEndPoint, {
    user_time_zone: {
      name,
      city,
      user_id,
      utc_difference
    }
  });
}

export function delete_user_time_zone(id) {
  return http.delete(timeZoneEndPoint + '/' + id)
}

export default {
  user_time_zones,
  add_user_time_zone,
}