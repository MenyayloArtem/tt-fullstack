import mysql from "mysql";
import copy from "../heplers/copy";

class Database {
  connection: mysql.Connection;
  pool: mysql.Pool;

  constructor() {
    const config = {
      host: "localhost",
      user: "root",
      password: "password",
      database: "testTask",
    };
    this.connection = mysql.createConnection(config);
    this.pool = mysql.createPool(config);
  }

  async query<T = any>(sql: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (errors, data: any) => {
        if (errors) {
          reject({
            message: errors,
            code: 400,
          });
        }

        if (Array.isArray(data)) {
          resolve(data.map(copy));
        }

        resolve([data]);
      });
    });
  }

}

const db = new Database();

db.connection.connect();

export default db;
