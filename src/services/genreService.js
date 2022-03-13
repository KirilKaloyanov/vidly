import http from "./http";

export function getGenres() {
  return http.get("/genres");
}
