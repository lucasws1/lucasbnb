import { Router } from "express";
import User from "./model.js";
import bcrypt from "bcryptjs";
import { connectDb } from "../../config/db.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { JWTSign, JWTVerify } from "../../utils/jwt.js";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

router.get("/", async (req, res) => {
  connectDb();

  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

router.get("/profile", async (req, res) => {
  const userInfo = await JWTVerify(req);

  res.json(userInfo);
});

router.post("/", async (req, res) => {
  connectDb();

  const { name, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);

  try {
    const newUserDoc = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const userObject = { name, email, _id: newUserDoc._id };

    try {
      const token = await JWTSign(userObject);
      res.cookie("token", token).json(userObject);
    } catch (error) {
      res.status(500).json("Erro ao tentar assinar com JWT", error);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

router.post("/login", async (req, res) => {
  connectDb();

  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
      const { _id, name } = userDoc;

      if (passwordCorrect) {
        const userObject = { _id, name, email };
        try {
          const token = await JWTSign(userObject);

          res.cookie("token", token).json(userObject);
        } catch (error) {
          res.status(500).json({ error: "Erro ao assinar com o JWT", error });
        }
      } else {
        res.status(400).json({ error: "Senha incorreta" });
      }
    } else {
      res.status(400).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json("Deslogado com sucesso");
});

export default router;
