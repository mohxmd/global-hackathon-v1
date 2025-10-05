export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const times = [
    { s: 60, unit: "second" },
    { s: 3600, unit: "minute" },
    { s: 86400, unit: "hour" },
    { s: 604800, unit: "day" },
    { s: 2592000, unit: "week" },
    { s: 31536000, unit: "month" },
  ] as const;

  for (const { s, unit } of times) {
    if (Math.abs(diff) < s)
      return rtf.format(
        -Math.round(diff / (s / 60)),
        unit as Intl.RelativeTimeFormatUnit
      );
  }
  return rtf.format(-Math.round(diff / 31536000), "year");
}
