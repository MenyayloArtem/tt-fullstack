import { Router } from "express";
import Gift from "../entity/Gift";

const router = Router();

router.get("/", async (req, res) => {
  res.send(await Gift.getById(req.query?.id as never).catch((err) => err));
});

router.get("/all", async (req, res) => {
  res.json(await Gift.getAll().catch((err) => err));
});

router.post("/", async (req, res) => {
  res.send(await Gift.create(req.body).catch((err) => err));
});

router.put("/", async (req, res) => {
  res.send(await Gift.create(req.body).catch((err) => err));
});

router.delete("/", async (req, res) => {
  res.send(await Gift.create(req.body).catch((err) => err));
});

export default router;
