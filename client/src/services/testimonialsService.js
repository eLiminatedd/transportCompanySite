import * as request from '../lib/request';


export const getTestimonials = async () => request.get('testimonials');

export const getOwnTestimonials = async () => request.get('testimonials/own');

export const getOneTestimonial = async (id) => request.get(`testimonials${id}`);

export const createTestimonial = async (data) => request.post('testimonials', {...data});

export const editTestimonial = async (id, data) => request.patch(`testimonials${id}`, {...data});

export const delTestimonial = async (id) => request.remove(`testimonials${id}`);