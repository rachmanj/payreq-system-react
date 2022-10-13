import Spinner from "react-bootstrap/Spinner";
import { useGetProjectsQuery } from "../projects/projectsApiSlice";
import { useGetDepartmentsQuery } from "../departments/departmentsApiSlice";
import NewUserForm from "./NewUserForm";

const NewUser = () => {
  const { projects } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({
      projects: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  const { departments } = useGetDepartmentsQuery("departmentsList", {
    selectFromResult: ({ data }) => ({
      departments: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!projects?.length || !departments?.length)
    return <Spinner animation="border" />;

  const content = <NewUserForm projects={projects} departments={departments} />;

  return content;
};

export default NewUser;
