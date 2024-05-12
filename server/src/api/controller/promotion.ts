import { Router } from "express";
import Promotion from "../entity/Promotion";

const router = Router();

router.get("/", async (req, res) => {
  console.log(req.query);
  res.send(await Promotion.getById(req.query?.id as never));
});

router.get("/all", async (req, res) => {
  Promotion.getAll()
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })
});

router.post("/", async (req, res) => {
  Promotion.create(req.body)
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })
});

router.patch("/", async (req, res) => {
  Promotion.update(req.body)
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })
});

router.delete("/", async (req, res) => {
  Promotion.delete(req.body.id)
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })
});

export default router;
