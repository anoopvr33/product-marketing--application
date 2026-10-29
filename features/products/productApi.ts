import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type CreateProductResponse = {
  message: string;
  product?: {
    _id: string;
    title: string;
  };
};

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    createProduct: builder.mutation<CreateProductResponse, FormData>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
