import express from "express";
import routes from "./routes/router.js";
import subscriber from "./utils/subscriber.js";
async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded());
  app.use("/orders", routes);
  subscriber.handleInventoryActions();
  app.listen("3001", () => {
    console.log("Order Server run on port 3001");
  });
}

main();
