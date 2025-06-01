import { Router } from "express";
import User from "./model.js";
import bcrypt from "bcryptjs";
import { connectDb } from "../../config/db.js";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();

router.get("/", async (req, res) => {
  connectDb();

  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
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

    res.json(newUserDoc);
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

      passwordCorrect
        ? res.json({ _id, name, email })
        : res.status(400).json({ error: "Senha incorreta" });
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

export default router;
