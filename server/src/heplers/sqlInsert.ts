export default function sqlInsert(table: string, json: Object) {
  let keys = Object.keys(json).sort().filter(key => key !== "id");
  let values = keys.map((key: string) => {
    let item = (json as any)[key];

    if (typeof item === "string") {
      return `'${item}'`;
    }
    return item;
  });

  let sql = `INSERT INTO ${table}
  (${keys.join(",")})
  VALUES(${values.join(",")});
  `;

  return sql
}
