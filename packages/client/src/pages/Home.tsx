import { useState } from "react";
import { Dropdown, FormComponent } from "../components";
import { Hotel, Country, City } from "../types";

const Home = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const setErrorAction = (error: string) => {
    setError(error);
  };

  const resetDataAction = () => {
    setHotels([]);
    setCountries([]);
    setCities([]);
    setShowDropdown(false);
  };

  const setDataAction = (data: any) => {
    setShowDropdown(true);
    setHotels(data.hotels);
    setCountries(data.countries);
    setCities(data.cities);
  };
  return (
    <main className="App">
      {error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <section className="container pb-5">
          <div className="row height d-flex justify-content-center align-items-center mt-1 pb-5">
            <div className="col-md-6">
              <FormComponent
                setDataAction={setDataAction}
                resetDataAction={resetDataAction}
                setErrorAction={setErrorAction}
              />
              <Dropdown
                showDropdown={showDropdown}
                hotels={hotels}
                cities={cities}
                countries={countries}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
