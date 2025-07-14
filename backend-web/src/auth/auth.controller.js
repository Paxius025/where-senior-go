import { loginService, registerService } from "./auth.services.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const loginController = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: "Email/Username and password are required" });
    }

    const user = await loginService(emailOrUsername, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
     req.session.user = {
      userId: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
    };


    res.status(200).json({ userId: user.user_id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
};

const registerController = async (req, res, next) => {
  try {
    const { email, username, password, role } = req.body;

    if (!email || !username || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await registerService(email, username, password, role);

    req.session.user = {
      userId: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    req.session.userId = user.userId;

    res.status(201).json({ userId: user.user_id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
};

const checkSessionController = (req, res, next) => {
  if (req.session?.user?.userId) {
    res.json({
      valid: true,
      userId: req.session.user.userId,
      username: req.session.user.username,
      email: req.session.user.email,
      role: req.session.user.role,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export { loginController, registerController, checkSessionController, logoutController };
