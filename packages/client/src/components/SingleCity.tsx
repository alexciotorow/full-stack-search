import { Link } from "react-router-dom";
import { City } from "../types";

const SingleCity = ({ state }: { state: City }) => {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <article className="card">
        <div className="card-body">
          <h2 className="card-title">{state.name}</h2>

          <Link to="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      </article>
    </div>
  );
};

export default SingleCity;
