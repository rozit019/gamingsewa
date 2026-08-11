import mongoose from "mongoose";

const efootballSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    ptw: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    highestRank: { type: String, required: true },
    rarity: {
      type: String,
      enum: ["Common", "Rare", "Epic", "Legendary"],
      default: "Rare",
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: {
      type: Number,
      default: null,
    },
    badge: { type: String, default: null },
    features: [{ type: String }],
    game: { type: String, default: "efootball" },
  },
  { timestamps: true },
);

const EfootballAccount = mongoose.model("EfootballAccount", efootballSchema);
export default EfootballAccount;
