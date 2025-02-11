import { FC } from "react";
import { Country, City, Hotel } from "../types";
import { Cities, Countries, Hotels } from "../components";

type DropdownProps = {
  showDropdown: boolean;
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
};

const Dropdown: FC<DropdownProps> = ({
  showDropdown,
  hotels,
  cities,
  countries,
}) => {
  return (
    <div className="dropdown">
      {showDropdown ? (
        <div className="search-dropdown-menu dropdown-menu w-100 show p-2 pb-2">
          <Hotels hotels={hotels} />
          <Cities cities={cities} />
          <Countries countries={countries} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dropdown;
