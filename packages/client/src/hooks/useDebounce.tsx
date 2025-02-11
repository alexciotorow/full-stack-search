import { useEffect, useState } from "react";

function useDebounce(inputVal: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(inputVal);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(inputVal);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputVal, delay]);
  return debounceValue;
}

export default useDebounce;
