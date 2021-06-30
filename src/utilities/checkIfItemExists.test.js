import { checkIfAlreadyPresent } from "./checkIfItemExists";

describe("checking item already util", () => {
  test("should check if item already exists in an array", () => {
    let array = [
      {
        cartQuantity: 1,
        existsInCart: true,
        productId: {
          brand: "Lining",
          description: "Caliber 200",
          discount: 15,
          fastDelivery: true,
          image:
            "https://sw3295.smartweb-static.com/upload_dir/shop/2020/AYPM394-1-(3).jpg",
          inStock: true,
          level: "advanced",
          price: 3799,
          weight: 79,
          __v: 0,
          _id: "60845b9ae46a6800aa9bb227",
        },
        _id: "60845b9ae46a6800aa9bb227"
      },
    ];
    let id = "60845b9ae46a6800aa9bb227";
    const result = checkIfAlreadyPresent(array, id);
    expect(result).toEqual({
        cartQuantity: 1,
        existsInCart: true,
        productId: {
          brand: "Lining",
          description: "Caliber 200",
          discount: 15,
          fastDelivery: true,
          image:
            "https://sw3295.smartweb-static.com/upload_dir/shop/2020/AYPM394-1-(3).jpg",
          inStock: true,
          level: "advanced",
          price: 3799,
          weight: 79,
          __v: 0,
          _id: "60845b9ae46a6800aa9bb227",
        },
        _id: "60845b9ae46a6800aa9bb227"
      });
  });
});
