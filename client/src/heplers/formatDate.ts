export default function (dateStr : string|Date) {
  let date = new Date(dateStr);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return (`${year}-${month}-${day}`);
}
