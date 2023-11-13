import { PRODUCT_URL, UPLOAD_URL } from "../constant.js";
import { apiSlice } from "./apiSlice.js";

export const productApilice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword, pageNumber}) => ({
                url: PRODUCT_URL,
                params:{
                    keyword,
                    pageNumber,
                }
            }),
            providesTags:['Product'],
            keepUnusedDataFor: 20
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 20,
        }),
        createProduct: builder.mutation({
            query:()=>({
                url: PRODUCT_URL,
                method:'POST',
            }),
            invalidatesTags:['Product']
        }),
        updateProduct: builder.mutation({
            query:(data)=>({
                url:`${PRODUCT_URL}/${data._id}`,
                method:'PUT',
                body: data,
            }),
            invalidatesTags:['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOAD_URL}`,
              method: 'POST',
              body: data,
            }),
          }),
          deleteProduct: builder.mutation({
            query: (productId) => ({
              url: `${PRODUCT_URL}/${productId}`,
              method: 'DELETE',
            }),
            providesTags: ['Product'],
          }),
          createReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCT_URL}/${data.productId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Product'],
          }),
    }),
    
});

export const
    { useGetProductsQuery,
        useGetProductDetailsQuery,
    useCreateProductMutation,
useUpdateProductMutation,
useUploadProductImageMutation ,
useDeleteProductMutation,
useCreateReviewMutation} = productApilice; 