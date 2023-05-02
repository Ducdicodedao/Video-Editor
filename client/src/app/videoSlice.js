import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as videoApi from '../api/videoApi';
export const trimVideo = createAsyncThunk('video/trim', async (params, thunkAPI) => {
    const res = await videoApi.trimVideo(params);
    return res;
});
export const uploadFile = createAsyncThunk('video/upload', async (params, thunkAPI) => {
    const res = await videoApi.upload(params);
    return res;
});
export const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        video: null,
        loading: false,
        error: '',
        isError: false,
        duration: 0,
    },
    reducers: {
        resetStoreVideo: (state, action) => {
            state.video = null;
            state.loading = false;
            state.error = '';
            state.typeLogin = '';
            console.log('ok');
            // window.storage.removeItem('persist:root');
        },
        setDuration: (state, action) => {
            console.log(action);
            state.duration = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(trimVideo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(trimVideo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            state.isError = true;
        });
        builder.addCase(trimVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload.data[0];
        });

        builder.addCase(uploadFile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(uploadFile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            state.isError = true;
        });
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        });
    },
});
export const { resetStoreVideo, setDuration } = videoSlice.actions;
export default videoSlice.reducer;
