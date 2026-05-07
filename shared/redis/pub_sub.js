import Redis from "ioredis";

export const subscriber = new Redis({host: "localhost", port: 7004});
export const publisher = new Redis({host: "localhost", port: 7004, });
