function parseDate(str) {
  const parts = str.split('-'); // ['2026', '04', '22']
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // meses começam em 0
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

export {
    parseDate
};