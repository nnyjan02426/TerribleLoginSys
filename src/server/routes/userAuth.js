import { Router } from "express";
import { User } from "../models/User.js";

const router = Router();
// const isProduction = process.env.NODE_ENV === "production";

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: "username and password is required" });
    }

    const usernameExists = await User.findOne({ username });
    const passwordExists = await User.findOne({ password });
    if (usernameExists) return res.status(409).json({ error: "Username is already being used" });
    if (passwordExists) return res.status(409).json({ error: "Password is already being used" });

    const user = await User.create({ username, password })
    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({ user: safeUser });
  } catch (err) {
    console.error("Register error: ", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: "username and password is required" });
    }

    const user = await User.findOne({
      $or: [
        { username: username },
        { password: password }
      ]
    })
    if (!user) {
      return res.status(401).json({ error: "This user doesn't exist" });
    }
    else if (user.username != username) {
      return res.status(401).json({ error: `You've entered ${user.username}'s password, are you perhaps ${user.username}?` })
    }

    const { password: _, ...safeUser } = user.toObject();
    return res.status(201).json({ user: safeUser });
  } catch (err) {
    console.error("Register error: ", err);
    return res.status(500).json({ error: "Server error" });
  }
})

export default router;
