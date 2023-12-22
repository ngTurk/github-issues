/**
 * Updates the URL with the specified query parameter
 */
const updateQueryParameter = (
  key: string,
  value: string,
  currentValues: string[],
  setValues: React.Dispatch<React.SetStateAction<string[]>>,
  pathname: string,
  searchParams: URLSearchParams,
  navigate: Function
) => {
  const updatedValues = currentValues.includes(value)
    ? currentValues.filter((v) => v !== value)
    : [...currentValues, value];

  setValues(updatedValues);

  const newQueryParams = new URLSearchParams(searchParams);

  if (updatedValues.length > 0) {
    newQueryParams.set(key, updatedValues.join(","));
  } else {
    newQueryParams.delete(key);
  }

  navigate(`${pathname}?${newQueryParams}`, { scroll: false });
};

export default updateQueryParameter;
