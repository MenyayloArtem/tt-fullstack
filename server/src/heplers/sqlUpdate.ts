function wrapString(item: any) {
  if (typeof item === "string") {
    return `'${item}'`;
  }
  return item;
}

export default function (table: string, body: Object, id: number) {
  const ignore = ["id", "date"]
  let values = Object.keys(body)
    .filter((key) => !ignore.includes(key))
    .map((key) => `${key}=${wrapString((body as any)[key])}`);
  let sql = `
        UPDATE ${table}
        SET ${values.join(", ")}
        WHERE id = ${id}
    `;

  return sql;
}
