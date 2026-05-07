import {EventTypes} from "../../../shared/events/events.js";
import {subscriber} from "../../../shared/redis/pub_sub.js";
import reserveInventory from "./workers/reserveInventory.js";

async function main() {
  console.log("Inventory Service running...");
  await subscriber.subscribe(EventTypes.ORDER_CREATE);
  subscriber.on("message", async (channel, message) => {
    const order = JSON.parse(message);
    console.log("Subscribe on channel: ", channel);
    console.log("Inventory Received Order: ", order);
    await reserveInventory(order);
  });
}
main();
