import http from "./http";

const apiEndpoint = 'http://localhost:3000/api/users';

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}
