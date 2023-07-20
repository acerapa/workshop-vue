"use strict";


const baseUrl = "http://localhost:3000";

const apiHandler = (url, method = 'get', body = null, headers = null) => {
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    if (headers) {
        config.headers = headers;
    }

    return fetch(baseUrl + url, config).then(response => {
        if (response.ok) {
            return response.json();
        }

        return response.json().then(error => {
            const e = new Error('Something went wrong.');
            e.data = error;
            throw e;
        });
    });
}

export default apiHandler;
