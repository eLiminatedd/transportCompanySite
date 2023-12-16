const baseUrl = 'http://localhost:3500/';


const buildOptions = (data, url) => {


    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    console.log(options.body);
    const tokens = JSON.parse(localStorage.getItem('auth')); // prolly some other name when setting
    console.log(tokens);
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

const request = async (method, urlExtension, data) => {

    try {
        const response = await fetch(`${baseUrl}${urlExtension}`, {
            ...buildOptions(data, `${baseUrl}${urlExtension}`),
            method,
        });

        console.log(response);

        if (response.status === 204) {
            return {};
        }

        if (response.status === 401) {
            console.log('401 response from client       ', response);
            const refreshTokens = await fetch(`${baseUrl}users/refresh`, { ...buildOptions({}, `${baseUrl}users/refresh`), method: 'POST' });
            if (refreshTokens.status === 401) {
                localStorage.removeItem('auth');
                throw new Error('Both tokens are invalid please relog');
                // check again if its working after other services are added
            }
            const newTokens = await refreshTokens.json();
            localStorage.removeItem('auth');
            localStorage.setItem('auth', JSON.stringify(newTokens));
            request(method, urlExtension, data);
        }


        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    } catch (error) {
        console.log(error);
    }

};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');


