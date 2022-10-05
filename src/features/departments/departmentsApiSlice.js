import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const departmentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = departmentsAdapter.getInitialState();

const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/departments",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedDepartments = responseData.map((department) => {
          department.id = department._id;
          return department;
        });
        return departmentsAdapter.setAll(initialState, loadedDepartments);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Department", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Department", id })),
          ];
        } else return [{ type: "Department", id: "LIST" }];
      },
    }),
    addNewDepartment: builder.mutation({
      query: (initialDepartment) => ({
        url: "/departments",
        method: "POST",
        body: {
          ...initialDepartment,
        },
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
    updateDepartment: builder.mutation({
      query: (initialDepartment) => ({
        url: "/departments",
        method: "PATCH",
        body: {
          ...initialDepartment,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Department", id: arg.id },
      ],
    }),
    deleteDepartment: builder.mutation({
      query: ({ id }) => ({
        url: `/departments`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Department", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useAddNewDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApiSlice;

// returns the query result object
export const selectDepartmentsResult =
  departmentsApiSlice.endpoints.getDepartments.select();

// creates memoized selector
const selectDepartmentsData = createSelector(
  selectDepartmentsResult,
  (departmentsResult) => departmentsResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring

export const {
  selectAll: selectAllDepartments,
  selectById: selectDepartmentById,
  selectIds: selectDepartmentIds,
} = departmentsAdapter.getSelectors(
  (state) => selectDepartmentsData(state) ?? initialState
);
