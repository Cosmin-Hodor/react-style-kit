// Function to check if a given value is empty (null, undefined, empty string, empty array, or empty object)
export const isEmpty = (value: object | string | Array<any> | null | undefined): boolean => {
  // Various checks for different types of "empty" values
  return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.length === 0) ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
  );
};