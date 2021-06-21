export function isInTime(start_date, end_date) {
  let D1 = new Date(start_date);
  let D2 = new Date(end_date);
  let D3 = new Date();

  return D3.getTime() <= D2.getTime() && D3.getTime() >= D1.getTime();
}

export function yearOptions(beforeThisYear = 5) {
  let date = new Date();
  let year = date.getFullYear();
  let options = [];
  for (let i = year - beforeThisYear; i <= year + 1; i++) {
    let temp = {
      label: i,
      value: i,
    };
    options.push(temp);
  }

  return options;
}
