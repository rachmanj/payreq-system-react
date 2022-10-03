import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const approvedsAdapter = createEntityAdapter();

const initialState = approvedsAdapter.getInitialState();

const approvedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApproveds: builder.query({
      query: () => "/payreqs",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedApproveds = responseData.map((approved) => {
          approved.id = approved._id;
          return approved;
        });
        return approvedsAdapter.setAll(initialState, loadedApproveds);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Approved", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Approved", id })),
          ];
        } else return [{ type: "Approved", id: "LIST" }];
      },
    }),
    addNewApproved: builder.mutation({
      query: (initialApproved) => ({
        url: "payreqs",
        method: "POST",
        body: {
          ...initialApproved,
        },
      }),
      invalidatesTags: [
        {
          type: "Approved",
          id: "LIST",
        },
      ],
    }),
    updateApproved: builder.mutation({
      query: (initialApproved) => ({
        url: "/payreqs",
        method: "PATCH",
        body: {
          ...initialApproved,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Approved", id: arg.id },
      ],
    }),
    deleteApproved: builder.mutation({
      query: ({ id }) => ({
        url: "/payreqs",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Approved", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetApprovedsQuery,
  useAddNewApprovedMutation,
  useUpdateApprovedMutation,
  useDeleteApprovedMutation,
} = approvedsApiSlice;

// returns the query result object
export const selectApprovedsResult =
  approvedsApiSlice.endpoints.getApproveds.select();

// creates memoized selector
const selectApprovedsData = createSelector(
  selectApprovedsResult,
  (approvedsResult) => approvedsResult.data
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllApproveds,
  selectById: selectApprovedById,
  selectIds: selectApprovedIds,
} = approvedsAdapter.getSelectors(
  (state) => selectApprovedsData(state) ?? initialState
);
