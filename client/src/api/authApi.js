import * as httpRequest from '../util/HttpRequest';

export const signIn = async (params) => {
    try {
        console.log(params);
        const res = await httpRequest.post('/auth/signIn', {
            email: params.email,
            password: params.password,
        });
        return res;
    } catch (error) {
        return error.response.data;
    }
};
export const signUp = async (params) => {
    try {
        const res = await httpRequest.post('/auth/signup', {
            email: params.email,
            password: params.password,
            name: params.name,
        });
        return res;
    } catch (error) {
        return error.response.data;
    }
};
