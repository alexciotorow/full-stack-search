const getQuery = (search: string) => {
  if (!search) return "";
  const data = search.split("=");
  return data?.at(1);
};

export { getQuery };
