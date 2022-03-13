import http from "./http";

const apiEndpoint = "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, body);
  }
  return http.post(apiEndpoint, movie);
}

export function likeMovie(movie) {
  const body = { ...movie };
  delete body._id;
  return http.put(apiEndpoint + "/" + movie._id, body);
}

export function deleteMovies(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}
