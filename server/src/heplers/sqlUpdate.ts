function wrapString(item: any) {
  if (typeof item === "string") {
    return `'${item}'`;
  }
  return item;
}

export default function (table: string, body: Object, id: number) {
  let values = Object.keys(body)
    .filter((key) => key !== "id")
    .map((key) => `${key}=${wrapString((body as any)[key])}`);
  let sql = `
        UPDATE ${table}
        SET ${values.join(", ")}
        WHERE id = ${id}
    `;

  console.log(sql)
  return sql;
}
