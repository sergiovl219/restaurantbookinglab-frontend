import api from './api';

export function login(username: string, password: string) {
    return api.post('token-auth', { username, password });
}
