import * as request from '../lib/request';

const baseUrl = 'http://localhost:3500/users';

export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
    });

    return result;
};

export const register = (email, username, password, phone, companyName, firstName, lastName) => request.post(`${baseUrl}/register`, {
    email, 
    username, 
    password, 
    phone, 
    companyName, 
    firstName, 
    lastName
});

export const logout = () => request.post(`${baseUrl}/logout`, {});

export const refresh = () => request.post(`${baseUrl}/refresh`, {});

