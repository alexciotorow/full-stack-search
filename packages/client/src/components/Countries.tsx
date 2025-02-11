import { FC } from "react";
import { Country } from "../types";
import { useNavigate } from "react-router-dom";
type CountriesProps = {
  countries: Country[];
};

const Countries: FC<CountriesProps> = ({ countries }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2>Countries</h2>
      {countries.length ? (
        countries.map((country) => (
          <article key={country._id}>
            <button
              onClick={() => {
                navigate(`/singlepage/?query=country`, { state: country });
              }}
              className="dropdown-item"
            >
              <i className="fa fa-building mr-2"></i>
              {country.country}
            </button>
            <hr className="divider" />
          </article>
        ))
      ) : (
        <p> No countries matched</p>
      )}
    </>
  );
};

export default Countries;
