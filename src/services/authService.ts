import api from './api';

export function login(username: string, password: string) {
    return api.post('token-auth', { username, password });
}

export function userinfo(token: string) {
    const headers = {
        Authorization: `Token ${token}`,
    };
    return api.get('userinfo', { headers });
}
