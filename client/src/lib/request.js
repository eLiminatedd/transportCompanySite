const buildOptions = (data, url) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    console.log(options.body);
    const tokens = localStorage.getItem('accessToken'); // prolly some other name when setting
    if (tokens) {
        // if (url.endsWith('/refresh')) set refresh token esle do bellow
        if (url.endsWith('/refresh')) {
            options.headers = {
                ...options.headers,
                'Authorization': 'Bearer ' + tokens.refresh_token
            };
        } else {
            options.headers = {
                ...options.headers,
                'Authorization': 'Bearer ' + tokens.access_token
            };
        }
    }

    return options;
};

const request = async (method, url, data) => {
    const response = await fetch(url, {
        ...buildOptions(data, url),
        method,
    });

    if (response.status === 204) {
        return {};
    }
    /*
    if response status 401 error
        refresh access token with reset token
    if response status 422 
        clean tokens 
        logout user 
        redirect to login 
    */

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');


