import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model,
      cartItem: Model,
      wishlistItem:Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 2000;
      this.resource("products");
      this.resource("cartItems");
      this.resource("wishlistItems");
    },

    seeds(server) {
      [...Array(10)].forEach((_) => {
        server.create("product",{
          id: faker.datatype.uuid(),
          image: faker.random.image(),
          brand: faker.lorem.word(),
          inStock: faker.datatype.boolean(),
          fastDelivery: faker.datatype.boolean(),
          productName: faker.commerce.productName(),
          color:faker.commerce.color(),
          price:faker.commerce.price(),
          availableQuantity:10,
          offer: faker.random.arrayElement(["20", "50", "70"]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional"
          ])
        });
      });
      [...Array(1)].forEach((_) => {
        server.create("cartItem",{
          id: faker.datatype.uuid(),
          image: faker.random.image(),
          brand: faker.lorem.word(),
          price:faker.commerce.price(),
          cartQuantity:1,
          existsInCart:true,
          offer: faker.random.arrayElement(["20", "50", "70"]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional"
          ])
        });
      });
      [...Array(1)].forEach((_) => {
        server.create("wishlistItem",{
          id: faker.datatype.uuid(),
          image: faker.random.image(),
          brand: faker.lorem.word(),
          price:faker.commerce.price(),
          existsInWishlist:true,
          offer: faker.random.arrayElement(["20", "50", "70"]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional"
          ])
        });
      });
    }
  });
}
