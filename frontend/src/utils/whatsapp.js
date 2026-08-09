export const openWhatsApp = (phoneNumber, account) => {
  // Clean number: keep only digits (Nepal format: 97798XXXXXXXX)
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  const message = encodeURIComponent(
    `Hi Khelio! ` +
      `I'm interested in buying this account:\n` +
      `${account.id ? `• Account ID: ${account.id}\n` : ""}` +
      `${account.game ? `• Game: ${account.game}\n` : ""}` +
      `• Title: ${account.title}\n` +
      `• Price: Rs. ${account.price}\n` +
      `${account.highestRank ? `• Rank: ${account.highestRank}\n` : ""}` +
      `${account.rarity ? `• Rarity: ${account.rarity}\n` : ""}` +
      `\nPlease share the payment details.`,
  );

  window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
};
