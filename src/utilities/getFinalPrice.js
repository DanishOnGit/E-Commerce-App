export function getFinalPrice(mrp,discount){
  return Math.floor((Number(mrp)-(Number(mrp)*Number(discount)/100)))
}