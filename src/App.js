import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import ApprovedList from "./features/approved/ApprovedList";
import OutgoingList from "./features/outgoing/OutgoingList";
import RealizationList from "./features/realization/RealizationList";
import NewApproved from "./features/approved/NewApproved";
import UsersList from "./features/users/UsersList";
import NewUser from "./features/users/NewUser";
import DepartmentsList from "./features/departments/DepartmentsList";
import NewDepartmentForm from "./features/departments/NewDepartmentForm";
import EditDepartment from "./features/departments/EditDepartment";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="approved">
            <Route index element={<ApprovedList />} />
            <Route path="new" element={<NewApproved />} />
          </Route>
          <Route path="outgoings">
            <Route index element={<OutgoingList />} />
          </Route>
          <Route path="realizations">
            <Route index element={<RealizationList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="new" element={<NewUser />} />
          </Route>

          <Route path="departments">
            <Route index element={<DepartmentsList />} />
            <Route path="new" element={<NewDepartmentForm />} />
            <Route path=":id" element={<EditDepartment />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
