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
export const concatenateVideo = createAsyncThunk('video/concat', async (params, thunkAPI) => {
    const res = await videoApi.concatVideo(params);
    return res;
});
// export const splitVideo = createAsyncThunk('video/split', async (params, thunkAPI) => {
//     const res = await videoApi.splitVideo(params);
//     return res;
// });
export const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        video: [],
        currentVideo: null,
        loading: false,
        error: '',
        isError: false,
        totalDuration: 0,
    },
    reducers: {
        resetStoreVideo: (state, action) => {
            state.video = [];
            state.loading = false;
            state.error = '';
            state.typeLogin = '';
            console.log('ok');
            // window.storage.removeItem('persist:root');
        },
        setCurrentVideo: (state, action) => {
            state.currentVideo = action.payload;
        },
        splitVideo: (state, action) => {
            state.video.push(action.payload);
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
            state.currentVideo = action.payload.data[0];
        });

        builder.addCase(concatenateVideo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(concatenateVideo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            state.isError = true;
        });
        builder.addCase(concatenateVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload.data[0];
        });

        // builder.addCase(splitVideo.pending, (state, action) => {
        //     state.loading = true;
        // });
        // builder.addCase(splitVideo.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.msg;
        //     state.isError = true;
        // });
        // builder.addCase(splitVideo.fulfilled, (state, action) => {
        //     state.loading = false;
        //     let index = state.video.findIndex((data) => data.name === action.payload.originalName);

        //     // Check if the index is valid
        //     if (index > -1) {
        //         // Remove the object using splice()
        //         let removed = state.video.splice(index, 1);
        //     }
        //     console.log(state.video);
        //     state.video.push(action.payload.video1.data[0]);
        //     state.video.push(action.payload.video2.data[0]);

        //     state.currentVideo = action.payload.data;
        // });

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
            state.video.push(action.payload);
            if (state.video.length === 1) {
                state.currentVideo = state.video[0];
            }
            state.totalDuration += action.payload.duration;
        });
    },
});
export const { resetStoreVideo, setDuration, setCurrentVideo, splitVideo } = videoSlice.actions;
export default videoSlice.reducer;
