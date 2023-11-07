import { PRODUCT_URL } from "../constant.js";
import { apiSlice } from "./apiSlice.js";

export const productApilice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            keepUnusedDataFor: 20
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 20,
        })
    }),
});

export const
    { useGetProductsQuery,
        useGetProductDetailsQuery } = productApilice; 