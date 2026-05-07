const store = {};
export default {
  create(order) {
    store[order.id] = order;
    return order;
  },
  get(id) {
    return store[id];
  },
  update(id, status) {
    if (store[id]) store[id].status = status;
    else return null;
    return store[id];
  },
  getAll() {
    return Object.values(store);
  },
};
