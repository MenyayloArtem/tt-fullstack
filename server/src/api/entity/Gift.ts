import db from "../../database/db";
import sqlInsert from "../../heplers/sqlInsert";
import sqlUpdate from "../../heplers/sqlUpdate";

export interface IGift {
  id: number;
  name: string;
  availableCount: number;
  fireDate: string;
}

export type RawGift = Omit<IGift, "id">

export default class Gift implements IGift {
  id: number;
  name: string;
  availableCount: number;
  fireDate: string;

  constructor(
    id: number,
    name: string,
    availableCount: number,
    fireDate: string
  ) {
    this.id = id;
    this.name = name;
    this.availableCount = availableCount;
    this.fireDate = fireDate;
  }

  static tableName = "gifts"

  static async getAll () {
    return db.query<IGift[]>("SELECT * FROM gifts")
  }

  static async getById (id : number) {
    let res = await db.query<IGift>(`SELECT * FROM ${this.tableName} WHERE gifts.id = ${id}`)
    return res[0]
  }

  static async create(body: RawGift) {
    let sql = sqlInsert(this.tableName, body)
    return db.query(sql);
  } 

  static async update (body : IGift) {
    let sql = sqlUpdate(this.tableName,body, body.id)
    return db.query(sql)
  }

  static async delete (id : number) {
    return db.query(`DELETE from ${this.tableName} WHERE id = ${id}`)
  }
}
