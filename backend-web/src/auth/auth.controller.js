import jwt from "jsonwebtoken";
import { loginService, registerService } from "./auth.services.js";
import dotenv from "dotenv";
dotenv.config();

function generateToken(user) {
  return jwt.sign(
    { userId: user.userId, email: user.email, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
}

const loginController = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await loginService(emailOrUsername, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
     req.session.user = {
      userId: user.user_id,
      username: user.username,
      email: user.email,
    };

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const registerController = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const userId = await registerService(email, username, password);

    req.session.user = {
      userId,
      username,
      email,
    };
    req.session.userId = userId;

    res.status(201).json({ userId });
  } catch (error) {
    next(error);
  }
};

const checkSessionController = (req, res, next) => {
  if (req.session?.user?.userId) {
    res.json({ valid: true });
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
