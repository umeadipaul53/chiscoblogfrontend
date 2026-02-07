import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import postReducer from "../reducers/postReducer";
import { setupInterceptors } from "../api/setupInterceptors";
import API from "../api/axios";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // persist login state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupInterceptors(API, store);

export const persistor = persistStore(store);
