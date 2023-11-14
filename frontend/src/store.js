import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.middleware),
    devTools: true,
});

export default store;