import { Link } from "react-router-dom";
import { Country } from "../types";

const SingleCountry = ({ state }: { state: Country }) => {
  const { country, countryisocode } = state;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <article className="card">
        <div className="card-body">
          <h2 className="card-title">{country}</h2>
          <h4 className="card-subtitle mb-2 text-muted">{countryisocode}</h4>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      </article>
    </div>
  );
};

export default SingleCountry;
