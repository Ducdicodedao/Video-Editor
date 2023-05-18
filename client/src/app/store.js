import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import videoReducer from './editorSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['video'],
};
export default configureStore({
    reducer: { auth: authReducer, video: videoReducer },
});
const rootReducer = combineReducers({ auth: authReducer, video: videoReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export let persistor = persistStore(store);
