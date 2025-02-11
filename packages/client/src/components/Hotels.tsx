import { FC } from "react";
import { Hotel } from "../types";

import { useNavigate } from "react-router-dom";

type HotelsProps = {
  hotels: Hotel[];
};

const Hotels: FC<HotelsProps> = ({ hotels }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2>Hotels</h2>
      {hotels.length ? (
        hotels.map((hotel) => (
          <article key={hotel._id}>
            <button
              onClick={() => {
                navigate(`/singlepage/?query=hotel`, { state: hotel });
              }}
              className="dropdown-item"
            >
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name}
            </button>
            <hr className="divider" />
          </article>
        ))
      ) : (
        <p>No hotels matched</p>
      )}
    </>
  );
};

export default Hotels;
