type PriceCurrency = string;

type OrderWhenOptions = {
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
};

export function formatPrice(
  cents: number,
  currency?: PriceCurrency | null,
): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(cents / 100);
}

export function formatOrderWhen(
  iso: string | null | undefined,
  opts: OrderWhenOptions = {},
): string {
  const { dateStyle = "medium" } = opts;

  if (!iso) return "";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle,
    timeStyle: "short",
  }).format(date);
}