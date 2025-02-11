import React, { useEffect, useState } from "react";
import { getCodeSandboxHost } from "@codesandbox/utils";
import useDebounce from "../hooks/useDebounce";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

interface FormProps {
  setDataAction: (data: any) => void;
  resetDataAction: () => void;
  setErrorAction: (error: string) => void;
}

const validateInput = (value: string) => {
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/g;

  if (hasSpecialChars.test(value)) {
    return false;
  }
  return true;
};

const FormComponent: React.FC<FormProps> = ({
  setDataAction,
  resetDataAction,
  setErrorAction,
}) => {
  const [formInput, setFormInput] = useState<string>("");
  const debouncedInput = useDebounce(formInput, 600);

  const fetchAndFilterHotels = async (value: string) => {
    try {
      const hotelsData = await fetch(`${API_URL}/hotels?query=${value}`);
      const result = await hotelsData.json();
      if (result?.error) {
        setErrorAction(`Server error: ${result.error}`);
      }

      return {
        hotels: result?.hotels || [],
        countries: result?.countries || [],
        cities: result?.cities || [],
      };
    } catch (error) {
      setErrorAction(`Server error: ${(error as Error).message}`);
      return {
        hotels: [],
        countries: [],
        cities: [],
      };
    }
  };

  const fetchData = async () => {
    const { hotels, countries, cities } = await fetchAndFilterHotels(
      debouncedInput
    );
    setDataAction({ hotels, countries, cities });
  };

  useEffect(() => {
    const validDebounce = validateInput(debouncedInput);
    if (!validDebounce) {
      setErrorAction(
        "Whitespace and special characters are not allowed, please refresh the page"
      );
      return;
    }

    if (debouncedInput) {
      fetchData();
    }
    if (!debouncedInput) {
      resetDataAction();
    }
  }, [debouncedInput]);

  return (
    <form className="form">
      <i className="fa fa-search"></i>
      <input
        type="text"
        className="form-control form-input"
        placeholder="Search accommodation..."
        value={formInput}
        onChange={(e) => {
          setFormInput(e.target.value);
        }}
      />
      {!!debouncedInput && (
        <span
          onClick={() => {
            resetDataAction();
            setFormInput("");
          }}
          className="left-pan"
        >
          <i className="fa fa-close"></i>
        </span>
      )}
    </form>
  );
};

export default FormComponent;
