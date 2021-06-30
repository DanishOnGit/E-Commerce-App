import axios from "axios";
import { addToCartHandler } from ".";

jest.mock("axios");

// describe("checking add to cart handler", () => {
//   test("should add to cart when called", async () => {
//     axios.post.mockResolvedValue({
//       data: {
//         success: true,
//         cartItems: [
//           {
//             userId: "123",
//             productId: "344tgdv",
//             existsInCart: true,
//             cartQuantity: 1,
//           },
//         ],
//       },
//     });

//     const result = await addToCartHandler();

//     expect(result).toEqual({
//       success: true,
//       cartItems: [
//         {
//           userId: "123",
//           productId: "344tgdv",
//           existsInCart: true,
//           cartQuantity: 1,
//         },
//       ],
//     });
//   });

// });
