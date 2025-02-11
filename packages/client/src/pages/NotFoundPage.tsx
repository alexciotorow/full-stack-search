import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Page Not Found</p>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
