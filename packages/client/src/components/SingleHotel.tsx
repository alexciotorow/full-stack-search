import { Link } from "react-router-dom";

interface SingleHotelProps {
  state: {
    hotel_name: string;
    chain_name: string;
    addressline1: string;
    zipcode: string;
    city: string;
    country: string;
    star_rating: number;
  };
}

const SingleHotel = ({ state }: SingleHotelProps) => {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <article className="card">
        <div className="card-body">
          <h2 className="card-title">{state.hotel_name}</h2>
          <h4 className="card-subtitle mb-2 text-muted">{state.chain_name}</h4>
          <p className="card-text">
            <strong>Address:</strong> {state.addressline1}, {state.zipcode},{" "}
            {state.city} {state.country}
          </p>

          <p className="card-text">
            <strong>Star Rating:</strong> {state.star_rating}
          </p>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      </article>
    </div>
  );
};

export default SingleHotel;
