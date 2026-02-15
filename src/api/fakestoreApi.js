import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakestoreApi = createApi({
  reducerPath: "fakestoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // GET ALL PRODUCTS
    getProducts: builder.query({
      query: () => "products",
    }),

    // GET SINGLE
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),

    // GET CATEGORY
    getProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),

    // CREATE
    addProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            fakestoreApi.util.updateQueryData(
              "getProducts",
              undefined,
              (draft) => {
                draft.unshift({
                  ...product,
                  id: data?.id || Date.now(),
                });
              }
            )
          );
        } catch {}
      },
    }),

    // PUT (FULL UPDATE)
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          fakestoreApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => {
              const index = draft.findIndex((p) => p.id === id);
              if (index !== -1) {
                draft[index] = { ...draft[index], ...data };
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // PATCH (PARTIAL)
    patchProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          fakestoreApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => {
              const product = draft.find((p) => p.id === id);
              if (product) Object.assign(product, data);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // DELETE
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          fakestoreApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => draft.filter((p) => p.id !== id)
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} = fakestoreApi;
