export function formatMoney(value: string | number): string {
  const n = typeof value === "string" ? Number(value) : value;
  return n.toLocaleString("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 });
}
