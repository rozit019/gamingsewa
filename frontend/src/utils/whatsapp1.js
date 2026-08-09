const DEFAULT_NUMBER = "9779841580244"; // ← REPLACE WITH YOUR WHATSAPP NUMBER

export const openWhatsApp = (type, data, phoneNumber = DEFAULT_NUMBER) => {
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  let message = "";

  if (type === "sell") {
    message =
      `Hi Kehlio!` +
      `I want to *SELL* my gaming account:\n` +
      `• Game: ${data.game}\n` +
      `• Title: ${data.title}\n` +
      `• Expected Price: Rs. ${data.expectedPrice}\n` +
      `${data.highestRank ? `• Rank: ${data.highestRank}\n` : ""}` +
      `${data.rarity ? `• Rarity: ${data.rarity}\n` : ""}` +
      `${data.description ? `• Details: ${data.description}\n` : ""}` +
      `\nPlease let me know the next steps.`;
  }

  window.open(
    `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
};
