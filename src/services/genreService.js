import http from "./http";

export function getGenres() {
    return http.get('http://localhost:3000/api/genres');
  };
    