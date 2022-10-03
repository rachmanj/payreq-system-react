import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = date.toLocaleDateString();

  const content = (
    <div className="row">
      <p>{today}</p>
      <div className="col-md-12">
        <div className="jumbotron">
          <h1 className="display-5">Welcome to Payment Request System</h1>
          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <Link className="btn btn-primary btn-sm" to="/dash" role="button">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );

  return content;
};

export default Welcome;
