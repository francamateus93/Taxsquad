import bcrypt from "bcrypt";
import db from "../models/db.js";
import { createToken } from "../utils/jwtUtils.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    if (!rows.length) {
      return res.status(401).json({ error: "User not found" });
    }
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = createToken(user.id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    city,
    country,
    date_of_birth,
    identification_number,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      `INSERT INTO users (first_name, last_name, email, password, phone, address, city, country, date_of_birth, identification_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        address,
        city,
        country,
        date_of_birth,
        identification_number,
      ]
    );
    res.status(201).json({
      message: "User created successfully",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  const userId = req.userId;
  try {
    const [rows] = await db.execute(
      "SELECT id, first_name, last_name, email FROM users WHERE id=?",
      [userId]
    );
    if (!rows.length) return res.status(404).json({ error: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatedUser = async (req, res) => {
  const { userId } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    country,
    identification_number,
    date_of_birth,
  } = req.body;

  try {
    await db.execute(
      `UPDATE users SET first_name=?, last_name=?, email=?, phone=?, address=?, city=?, country=?, identification_number=?, date_of_birth=? WHERE id=?`,
      [
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        country,
        identification_number,
        date_of_birth,
        userId,
      ]
    );

    const [rows] = await db.execute(`SELECT * FROM users WHERE id=?`, [userId]);
    const updatedUser = rows[0];

    res.status(200).json(updatedUser);
    console.log(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletedUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await db.execute(`DELETE FROM users WHERE id=?`, [userId]);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { register, login, getCurrentUser, updatedUser, deletedUser };
