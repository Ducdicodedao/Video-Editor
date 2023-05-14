import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import videoReducer from './editorSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        video: videoReducer,
    },
});
