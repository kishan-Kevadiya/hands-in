export * from "./auth";

export const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE) || 20;

// Format number to Indian Rupee
export const formatRupee = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format number to Indian Rupee without currency symbol
export const formatRupeeWithoutSymbol = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Generate date time formatter
export type DateTimeFormatType = "local" | "utc" | "ist";

const typeOptions: Record<
  DateTimeFormatType,
  { locale: string; timeZone?: string }
> = {
  local: { locale: "en-US" },
  utc: { locale: "en-US", timeZone: "UTC" },
  ist: { locale: "en-US", timeZone: "Asia/Kolkata" },
};

export const getDateTime = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
  type: DateTimeFormatType = "local",
) => {
  const d = typeof date === "string" ? new Date(date) : date;

  if (!d) {
    return;
  }
  const { locale, timeZone } = typeOptions[type];
  return d.toLocaleString(locale, {
    ...options,
    ...(timeZone ? { timeZone } : {}),
  });
};

export function timeAgo(dateString: string): string | null {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  const now = Date.now();
  const seconds = Math.floor((now - date.getTime()) / 1000);

  const intervals: [unit: string, value: number][] = [
    ["Y", 31536000],
    ["mon", 2592000],
    ["w", 604800],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
    ["s", 1],
  ];

  for (let i = 0; i < intervals.length; i++) {
    const [unit, value] = intervals[i];
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count}${unit} ago`;
    }
  }
  return "now";
}
