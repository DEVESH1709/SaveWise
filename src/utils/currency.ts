export const formatMoney = (amount: number, currency: "USD" | "INR") =>
  new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-IN", {
    style: "currency",
    currency,
  }).format(amount);
