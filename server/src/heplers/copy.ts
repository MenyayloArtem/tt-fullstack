export default function <T = any>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
