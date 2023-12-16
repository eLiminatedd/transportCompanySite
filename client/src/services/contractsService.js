import * as request from '../lib/request';


export const getContracts = async () => request.get('contracts');

export const getOwnContracts = async () => request.get('contracts/own');

export const getCurrentContracts = async () => request.get('contracts/current');

export const getOneContract = async (id) => request.get(`contracts/${id}`);

export const createContract = async (data) => request.post('contracts', {...data});

export const editContract = async (id, data) => request.patch(`contracts/${id}`, {...data});

export const delContract = async (id) => request.remove(`contracts/${id}`);