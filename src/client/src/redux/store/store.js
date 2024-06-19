import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import AuthReducer from "../reducer/AuthReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

export let Store = configureStore({
  reducer: { auth: persistedReducer },
});

export let persistor = persistStore(Store);
