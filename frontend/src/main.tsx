import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import ProductReducer, { productFetch } from "./Slices/ProductSlice";
import { productApi } from "./Slices/productApi";
import cartReducer, { getTotal } from "./Slices/cartSilce";
import authReducer, {loadUser} from "./Slices/authSlice";
const store: any = configureStore({
  reducer: {
    products: ProductReducer,
    cart: cartReducer,
      auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

store.dispatch(productFetch());
store.dispatch(getTotal());
store.dispatch(loadUser(null));
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
