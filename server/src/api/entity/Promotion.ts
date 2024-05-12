import db from "../../database/db";
import copy from "../../heplers/copy";
import sqlInsert from "../../heplers/sqlInsert";
import sqlUpdate from "../../heplers/sqlUpdate";
import Gift from "./Gift";

export type IPromotion = {
  id: number;
  name: string;
  date: string;
  description: string;
  giftsSent: number;
  gift: Gift;
  daysForGet: number;
  daysForReceive: number;
  nums: string;
};

export type RawPromotion = Omit<Promotion, "id" | "gift" | "date"> & {
  gift: number;
};

export default class Promotion {
  id: number;
  name: string;
  date: string;
  description: string;
  giftsSent: number;
  gift: number;
  daysForGet: number;
  daysForReceive: number;
  nums: string;

  constructor(
    id: number,
    name: string,
    date: string,
    description: string,
    giftsSent: number,
    gift: Gift,
    daysForGet: number,
    daysForReceive: number,
    nums: string
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.description = description;
    this.giftsSent = giftsSent;
    this.gift = gift.id;
    this.daysForGet = daysForGet;
    this.daysForReceive = daysForReceive;
    this.nums = nums;
  }

  static tableName = "promotions";

  static async getAll() {
    let res = await db.query<IPromotion>("SELECT * FROM promotions");

    return Promise.all(
      res.map(async (item) => {
        item.gift = await Gift.getById(item.gift as unknown as number);
        return item;
      })
    );
  }

  static async getById(id: number) {
    let res = await db.query<IPromotion>(
      `SELECT * FROM ${this.tableName} WHERE promotions.id = ${id}`
    );
    return res[0];
  }

  static async create(body: RawPromotion) {
    let sql = sqlInsert(this.tableName, body);
    return db.query(sql);
  }

  static async update(body: RawPromotion & { id: number }) {
    try {
      let sql = sqlUpdate(this.tableName, body, body.id);
    return db.query(sql);
    } catch (error) {
      throw error
    }
    
  }

  static async delete(id: number) {
    return db.query(`DELETE from ${this.tableName} WHERE id = ${id}`);
  }
}
