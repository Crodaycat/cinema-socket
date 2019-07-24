export function dateToOracleCharDate(date: Date): string {
  if (date.getMonth() < 9) {
    return `${date.getDate()}/0${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .substring(2)}`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .substring(2)}`;
  }
}

export function dateToTimeString(date: Date): string {
  return date.getHours() + ':' + date.getMinutes();
}
