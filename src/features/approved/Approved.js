import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { selectApprovedById } from "./approvedsApiSlice";

const Approved = ({ approvedId, count }) => {
  const navigate = useNavigate();
  const approved = useSelector((state) =>
    selectApprovedById(state, approvedId)
  );

  if (approved) {
    return (
      <tr
        onClick={() => {
          navigate(`/approved/${approvedId}`);
        }}
      >
        <td>{count + 1}</td>
        <td>{approved.payreqNo}</td>
        <td>
          <Moment format="DD-MM-YYYY">{approved.approveDate}</Moment>
        </td>
        <td>{approved.payee}</td>
        <td>{approved.type}</td>
        <td align="right">{approved.amount.toLocaleString()}</td>
      </tr>
    );
  } else return null;
};

export default Approved;
