import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { SingleCity, SingleHotel, SingleCountry } from "../components";
import { getQuery } from "../helpers";

const SinglePage = () => {
  const { state, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderComponent = () => {
    if (!state) {
      return <NotFoundPage />;
    }
    const dataType = getQuery(search);
    switch (dataType) {
      case "hotel":
        return <SingleHotel state={state} />;
      case "country":
        return <SingleCountry state={state} />;
      case "city":
        return <SingleCity state={state} />;
      default:
        return <NotFoundPage />;
    }
  };

  return renderComponent();
};

export default SinglePage;
