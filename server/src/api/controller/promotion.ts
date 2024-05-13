import { Router } from "express";
import Promotion from "../entity/Promotion";

const router = Router();

router.get("/", async (req, res) => {
  res.send(await Promotion.getById(req.query?.id as never));
});

router.get("/all", async (req, res) => {
  Promotion.getAll(req.query)
  .then(async ({data, count}) => {
    res.status(200).setHeader("X-Total-Count", count).send(data)
  })
  .catch(err => {
    res.status(400).send(err)
  })
});

router.post("/", async (req, res) => {
  Promotion.create(req.body)
  .then(async (result) => {
    let newItem = await Promotion.getById(result[0].insertId)
    res.status(200).send(newItem)
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
  console.log(req.body)
  Promotion.delete(req.body.id)
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })
});

export default router;
