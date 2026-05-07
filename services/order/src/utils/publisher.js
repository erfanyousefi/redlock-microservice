import {publisher} from "../../../../shared/redis/pub_sub.js";

export default {
  publish: async (eventType, data) => {
    return await publisher.publish(eventType, JSON.stringify(data));
  },
};
