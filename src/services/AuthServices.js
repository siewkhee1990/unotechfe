import { BACKEND_URL_USERS } from '../constants';

export default {
    login: user => {
        return fetch(`${BACKEND_URL_USERS}/login`, {
            credentials: 'include',
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.status === 400) {
                return res.json().then(data => {
                    return data;
                })
            } else if (res.status !== 401) {
                return res.json().then(data => {
                    localStorage.setItem("access_token", data.user.token);
                    return data
                });
            }
            else {
                return { isAuthenticated: false, user: { username: "" } };
            }
        })
    },
    register: user => {
        return fetch(`${BACKEND_URL_USERS}/create`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        return fetch(`${BACKEND_URL_USERS}/logout`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => data)
            .catch(err => {
                return { user: { username: "" }, success: true };
            });
    },
    isAuthenticated: () => {
        return fetch(`${BACKEND_URL_USERS}/authenticated`, {
            credentials: 'include',
            headers: {
                'access_token': localStorage.getItem('access_token')
            }
        })
            .then(res => {
                if (res.status !== 401) {
                    return res.json().then(data => data);
                }
                else {
                    return { isAuthenticated: false, user: { username: "" } };
                }
            })
    }
}