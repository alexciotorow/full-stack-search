import { FC } from "react";
import { City } from "../types";
import { useNavigate } from "react-router-dom";

type CitysProps = {
  cities: City[];
};

const Cities: FC<CitysProps> = ({ cities }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Cities</h2>
      {cities.length ? (
        cities.map((city) => (
          <article key={city._id}>
            <button
              onClick={() => {
                navigate(`/singlepage/?query=city`, { state: city });
              }}
              className="dropdown-item"
            >
              <i className="fa fa-building mr-2"></i>
              {city.name}
            </button>
            <hr className="divider" />
          </article>
        ))
      ) : (
        <p>No cities matched</p>
      )}
    </>
  );
};

export default Cities;
