const apiHandler =  ({ url, method = 'GET', body = null, headers = {} }) => {

    // create base url
    const baseUrl = 'http://localhost:8000/api';

    const options = {
        method,
        headers,
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    return fetch(baseUrl + url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        }
    );
};

export default apiHandler;
