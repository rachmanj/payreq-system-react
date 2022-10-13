import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { BsFillPencilFill } from "react-icons/bs";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId, count }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const onEditButtonClicked = () => navigate(`/dash/users/${userId}`);

    const usersRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "Active" : "Inactive";

    return (
      <tr>
        <td>{count + 1}</td>
        <td>{user.fullname}</td>
        <td>{user.nik}</td>
        <td>{user.department}</td>
        <td>{user.project}</td>
        <td>{usersRolesString}</td>
        <td>{cellStatus}</td>
        <td>
          <Button size="sm" variant="warning" onClick={onEditButtonClicked}>
            <BsFillPencilFill />
          </Button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
