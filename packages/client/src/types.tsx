type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
  zipcode: string;
  addressline1: string;
  countryisocode?: string;
};

type Country = {
  _id: string;
  country: string;
  countryisocode?: string;
};

type City = {
  _id: string;
  name: string;
};

export type { Hotel, Country, City };
