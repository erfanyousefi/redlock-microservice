import {EventTypes} from "../../../../shared/events/events.js";
import {subscriber} from "../../../../shared/redis/pub_sub.js";

export default {
  async handleInventoryActions() {
    await subscriber.subscribe([EventTypes.INVENTORY_FAILED, EventTypes.INVENTORY_RESERVED]);
    subscriber.on("message", (channel, message) => {
      const order = JSON.parse(message);
      if (channel === EventTypes.INVENTORY_FAILED) {
        console.log("FAILED: Inventory failed", order);
        console.log("notify to user...");
      } else if (channel === EventTypes.INVENTORY_RESERVED) {
        console.log("SUCCESS: Inventory reserved", order);
        console.log("notify to user...");
      }
    });
  },
};
