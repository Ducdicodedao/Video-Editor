import * as httpRequest from '../util/HttpRequest';

export const trimVideo = async (params) => {
    try {
        console.log(params);
        const res = await httpRequest.post('/video/trimVideo', {
            source: params.source,
            trimStart: params.trimStart,
            trimDuration: params.trimDuration,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const concatVideo = async (params) => {
    try {
        console.log(params);
        const res = await httpRequest.post('/video/concatenate', {
            source1: params[0],
            source2: params[1],
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const upload = async (params) => {
    try {
        const res = await httpRequest.post('/file/upload', params, {
            'Content-Type': 'multipart/form-data',
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
