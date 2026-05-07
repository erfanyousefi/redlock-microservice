import {publisher} from "../../../../shared/redis/pub_sub.js";

export default {
  async publish(eventType, data) {
    return await publisher.publish(eventType, JSON.stringify(data));
  },
};
