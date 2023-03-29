import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
    id:number,
    name:string,
    desc:string,
    image:string
}

interface UserState {
  items: Product[];
  status: string;
  error:any;
}
const initialState: UserState = {
  items: [],
  status: "state is empty",
  error: null
};

export const productFetch: any = createAsyncThunk(
  "products/productFetch",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      return response?.data;
    } catch (error) {
        return console.log(error);
    }
  }
);

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builler) => {
    builler
      .addCase(productFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.items = action.payload;
      });
  },
});

export default ProductSlice.reducer;
