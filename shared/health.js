import Redlock from "redlock";
import {redisClients} from "./redlock/redlockClient.js";

async function main() {
  const redlock = new Redlock(redisClients, {
    retryCount: 3,
    retryDelay: 200,
  });

  redlock.on("clientError", (err) => {
    console.error("EVENT clientError:", err.message);
  });

  redlock.on("error", (err) => {
    console.error("EVENT error:", err.message);
  });

  try {
    const lock = await redlock.acquire(["test-resource"], 3000);

    if (!lock) {
      console.log("FAILED: lock not acquired");
      return;
    }

    console.log("SUCCESS: lock acquired");

    await lock.extend(3000);
    console.log("extends expiration");

    await lock.release();
    console.log("SUCCESS: lock released");
  } catch (err) {
    console.error("FAILED:", err);
  } finally {
    await Promise.all(redisClients.map((c) => c.quit()));
  }
}

main();
