import * as request from '../lib/request';



// const baseUrl = 'http://localhost:3500/users';

export const login = async (email, password) => request.post('users/login', {
    email,
    password,
});

export const register = (email, username, password, phone, companyName, firstName, lastName) => request.post('users/register', {
    email,
    username,
    password,
    phone,
    companyName,
    firstName,
    lastName
});

export const logout = async () => request.post('users/logout', {});

export const refresh = async () => request.post('users/refresh', {});

