export const checkIfAlreadyPresent = (array, itemId) => {
  const isPresent = array.find((product) => product.id === itemId);
  return isPresent;
};