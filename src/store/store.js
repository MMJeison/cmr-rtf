import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import oauthReducer from "./slices/oauthSlice";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice";

const rootReducer = combineReducers({
    oauth: oauthReducer,
    products: productsReducer,
    categories: categoriesReducer,
    shoppingCart: shoppingCartReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["oauth", "shoppingCart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export default store;

export const persistor = persistStore(store);