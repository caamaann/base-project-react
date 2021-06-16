export function isInTime(start_date, end_date) {
  let D1 = new Date(start_date);
  let D2 = new Date(end_date);
  let D3 = new Date();

  return D3.getTime() <= D2.getTime() && D3.getTime() >= D1.getTime();
}
