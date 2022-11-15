import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import oauthReducer from "./slices/oauthSlice";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import checkoutReducer from "./slices/checkoutSlice";

const rootReducer = combineReducers({
    oauth: oauthReducer,
    products: productsReducer,
    categories: categoriesReducer,
    shoppingCart: shoppingCartReducer,
    checkout: checkoutReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["oauth", "shoppingCart", "checkout"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export default store;

export const persistor = persistStore(store);