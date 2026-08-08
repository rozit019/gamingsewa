import EfootballAccount from "../models/EfootballAccount.js";
import cloudinary from "../config/cloudinary.js";

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = async (fileBuffer, mimetype) => {
  const b64 = Buffer.from(fileBuffer).toString("base64");
  const dataURI = `data:${mimetype};base64,${b64}`;
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "gamingsewa/efootball",
  });
  return result.secure_url;
};

// GET all
export const getAccounts = async (req, res) => {
  try {
    const accounts = await EfootballAccount.find().sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single
export const getAccountById = async (req, res) => {
  try {
    const account = await EfootballAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST
export const createAccount = async (req, res) => {
  try {
    let imageUrl = req.body.image || "";

    // If file uploaded, send to Cloudinary
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const account = new EfootballAccount({
      ...req.body,
      image: imageUrl,
      ptw: Number(req.body.ptw || 0),
      coins: Number(req.body.coins || 0),
      price: Number(req.body.price || 0),
      level: Number(req.body.level || 0),
      features: req.body.features
        ? req.body.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        : [],
    });

    const saved = await account.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT
export const updateAccount = async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const updateData = {
      ...req.body,
      ptw: Number(req.body.ptw || 0),
      coins: Number(req.body.coins || 0),
      price: Number(req.body.price || 0),
      level: Number(req.body.level || 0),
      features: req.body.features
        ? req.body.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        : [],
    };

    if (imageUrl) updateData.image = imageUrl;

    const account = await EfootballAccount.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteAccount = async (req, res) => {
  try {
    const account = await EfootballAccount.findByIdAndDelete(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
