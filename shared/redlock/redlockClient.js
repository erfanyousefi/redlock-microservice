import Redis from "ioredis";
import Redlock from "redlock";
const redisA = new Redis({host: "localhost", port: 7001});
const redisB = new Redis({host: "localhost", port: 7002});
const redisC = new Redis({host: "localhost", port: 7003});
const redisClients = [redisA, redisB, redisC];
const redlock = new Redlock(redisClients, {
  retryCount: 10,
  retryDelay: 200,
  retryJitter: 200,
});
redlock.on("clientError", (err) => {
  console.error("EVENT clientError:", err.message);
});

redlock.on("error", (err) => {
  console.error("EVENT error:", err.message);
});

export {redisClients, redlock};
