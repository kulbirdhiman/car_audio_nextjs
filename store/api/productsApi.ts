import { apiSlice } from "./apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        departmentId,
        companyId,
        modelId,
        subModelId,
        year,
        isActive,
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => ({
        url: "/products",
        method: "GET",
        params: {
          page,
          limit,
          search,
          departmentId,
          companyId,
          modelId,
          subModelId,
          year,
          isActive,
          sortBy,
          sortOrder,
        },
      }),
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Products",
        { type: "Products", id: arg.id },
      ],
    }),
    bulkUpdateProducts: builder.mutation({
      query: ({ ids, updateData }) => ({
        url: "/products/bulk-update",
        method: "PUT",
        body: { ids, updateData },
      }),

      // 🔥 important for UI refresh
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBulkUpdateProductsMutation
} = productsApi;