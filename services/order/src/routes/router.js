import {Router} from "express";
import {EventTypes} from "../../../../shared/events/events.js";
import store from "../store/store.js";
import publisher from "../utils/publisher.js";

const router = Router();

router.post("/", async (req, res) => {
  const {items} = req.body;
  const order = {id: Date.now(), items, status: "CREATED"};
  store.create(order);
  console.log("Created order: ", order);
  const result = await publisher.publish(EventTypes.ORDER_CREATE, order);
  console.log(result);

  return res.json({
    status: "OK",
    order,
  });
});

router.get("/", (req, res) => {
  return res.json({
    orders: store.getAll(),
  });
});
router.get("/:id", (req, res) => {
  const order = store.get(req.params.id);
  return res.json({order});
});
router.put("/:id/status", (req, res) => {
  const order = store.update(req.params.id, "PREPARE");
  return res.json({status: "OK", order});
});

export default router;
