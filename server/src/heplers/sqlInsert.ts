export default function sqlInsert(table: string, json: Object) {
  let keys = Object.keys(json).sort();
  let values = keys.map((key: string) => {
    let item = (json as any)[key];

    if (typeof item === "string") {
      return `'${item}'`;
    }
    return item;
  });

  return `INSERT INTO ${table}
    (${keys.join(",")})
    VALUES(${values.join(",")});
    `;
}
