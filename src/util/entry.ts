import type { Entry } from "../api/entity";

export function getPage(entries: Entry[], page: number = 1) {
  let multiplier = page - 1;
  let start = 0;
  let end = 7;

  start = 7 * multiplier;
  end = 7 * multiplier + 7;

  return (entries as Array<Entry>).slice(start, end);
}

export function getFirst(entries: Array<Entry>) {
  return entries[0];
}

export function getLast(entries: Array<Entry>) {
  return entries[entries.length - 1];
}

export function calculatePages(entries: Array<Entry>) {
  const itemsPerPage = 7;
  const totalItems = entries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return pages;
}

export function convertTime(isoString: string) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formatted = `${day}/${month}/${year} às ${hours}:${minutes}`;
  return formatted;
}
