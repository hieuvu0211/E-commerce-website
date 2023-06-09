import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints : (builler) =>({
        getAllProducts: builler.query({
            query: () => "products"
        })
    })
});

export const {useGetAllProductsQuery} = productApi;