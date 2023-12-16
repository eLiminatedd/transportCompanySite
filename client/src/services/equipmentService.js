import * as request from '../lib/request';


export const getMachines = async () => request.get('machines');

export const getOneMachine = async (id) => request.get(`machines/${id}`);

export const createMachine = async (data) => request.post('machines', {...data});

export const editMachine = async (id, data) => request.patch(`machines/${id}`, {...data});

export const delMachine = async (id) => request.remove(`machines/${id}`);