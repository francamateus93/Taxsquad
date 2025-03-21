import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;

// import express, { Router } from "express";
// import { db } from "../server.js";
// import authController from "../controllers/authController.js";

// const router = Router();
// router.use(express.json());

// router.post("/", async (req, res) => {
//   const {
//     first_name,
//     last_name,
//     date_of_birth,
//     identification_number,
//     phone,
//     address,
//     city,
//     email,
//     password,
//     uid,
//   } = req.body;

//   const [result] = await db.query(
//     `INSERT INTO users (first_name, last_name, date_of_birth, identification_number, phone, address, city, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       first_name,
//       last_name,
//       date_of_birth,
//       identification_number,
//       phone,
//       address,
//       city,
//       email,
//       password,
//       uid,
//     ]
//   );
//   res.json({ user_id: result.insertId });
// });

// router.get("/:id", async (req, res) => {
//   const [rows] = await db.query(`SELECT * FROM users WHERE user_id = ?`, [
//     req.params.id,
//   ]);
//   res.json(rows[0]);
// });

// router.put("/:id", async (req, res) => {
//   const {
//     first_name,
//     last_name,
//     date_of_birth,
//     phone,
//     address,
//     city,
//     email,
//     password,
//   } = req.body;
//   await db.query(
//     `UPDATE users SET first_name=?, last_name=?, date_of_birth=?, phone=?, address=?, city=?, email=?, password=? WHERE user_id=?`,
//     [
//       first_name,
//       last_name,
//       date_of_birth,
//       phone,
//       address,
//       city,
//       email,
//       password,
//       req.params.id,
//     ]
//   );
//   res.json({ message: "User updated" });
// });

// router.delete("/:id", async (req, res) => {
//   await db.query(`DELETE FROM users WHERE user_id=?`, [req.params.id]);
//   res.json({ message: "User deleted" });
// });

// // UID
// router.get("/:uid", async (req, res) => {
//   try {
//     const [rows] = await db.query(`SELECT * FROM users WHERE uid=?`, [
//       req.params.uid,
//     ]);
//     if (rows.length === 0)
//       return res.status(404).json({ message: "User not found" });
//     res.json(rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put("/:uid", async (req, res) => {
//   const {
//     first_name,
//     last_name,
//     date_of_birth,
//     phone,
//     address,
//     city,
//     email,
//     password,
//   } = req.body;
//   await db.query(
//     `UPDATE users SET first_name=?, last_name=?, date_of_birth=?, phone=?, address=?, city=?, email=?, password=? WHERE user_id=?`,
//     [
//       first_name,
//       last_name,
//       date_of_birth,
//       phone,
//       address,
//       city,
//       email,
//       password,
//       req.params.id,
//     ]
//   );
//   res.json({ message: "User updated" });
// });

// router.delete("/:uid", async (req, res) => {
//   try {
//     await db.query(`DELETE FROM users WHERE uid=?`, [req.params.uid]);
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
