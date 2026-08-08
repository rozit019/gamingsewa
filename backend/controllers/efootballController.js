import EfootballAccount from "../models/EfootballAccount.js";

// GET all /api/efootball
export const getAccounts = async (req, res) => {
  try {
    const accounts = await EfootballAccount.find().sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single /api/efootball/:id
export const getAccountById = async (req, res) => {
  try {
    const account = await EfootballAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/efootball (admin only)
export const createAccount = async (req, res) => {
  try {
    const account = new EfootballAccount(req.body);
    const saved = await account.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/efootball/:id (admin only)
export const updateAccount = async (req, res) => {
  try {
    const account = await EfootballAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/efootball/:id (admin only)
export const deleteAccount = async (req, res) => {
  try {
    const account = await EfootballAccount.findByIdAndDelete(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
