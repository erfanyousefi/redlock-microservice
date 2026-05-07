import {EventTypes} from "../../../../shared/events/events.js";
import {redlock} from "../../../../shared/redlock/redlockClient.js";
import publisher from "../utils/publisher.js";

async function reserveInventory(order) {
  const resource = `lock:inventory:${order.id}`;
  const ttl = 5000;
  try {
    const lock = await redlock.acquire([resource], ttl);
    if (!lock) {
      console.log("FAILED: lock not acquired");
      return false;
    }
    if (Math.random() < 0.2) {
      console.log("Worker crashed during process inventory!");
      await lock.release();
      await publisher.publish(EventTypes.INVENTORY_FAILED, order);
      return false;
    }
    const availableStock = 20;
    const neededStock = order.items.length;
    if (neededStock > availableStock) {
      console.log("Inventory stock not enough");
      await lock.release();
      await publisher.publish(EventTypes.INVENTORY_FAILED, order);
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await publisher.publish(EventTypes.INVENTORY_RESERVED, order);
    await lock.release();
    console.log("SUCCESS: Inventory reserved");

    return true;
  } catch (error) {
    console.log("Failed to lock inventory: ", error);
    await publisher.publish(EventTypes.INVENTORY_FAILED, order);
    return false;
  }
}

export default reserveInventory;
