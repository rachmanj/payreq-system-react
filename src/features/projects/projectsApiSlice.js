import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const projectsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.code.localeCompare(b.code),
});

const initialState = projectsAdapter.getInitialState();

const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedProjects = responseData.map((project) => {
          project.id = project._id;
          return project;
        });
        return projectsAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Project", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Project", id })),
          ];
        } else return [{ type: "Project", id: "LIST" }];
      },
    }),
    addNewProject: builder.mutation({
      query: (initialProject) => ({
        url: "/projects",
        method: "POST",
        body: {
          ...initialProject,
        },
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: (updatedProject) => ({
        url: "/projects",
        method: "PATCH",
        body: {
          ...updatedProject,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: "/projects",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;

// returns the query result object
export const selectProjectsResult =
  projectsApiSlice.endpoints.getProjects.select();

// creates memoized selector
const selectProjectsData = createSelector(
  selectProjectsResult,
  (projectsResult) => projectsResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(
  (state) => selectProjectsData(state) ?? initialState
);
