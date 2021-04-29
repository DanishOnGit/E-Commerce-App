export const checkIfAlreadyPresent = (array, itemId) => {
  const isPresent = array.find((product) => product?.productId?._id === itemId);
  return isPresent;
};
