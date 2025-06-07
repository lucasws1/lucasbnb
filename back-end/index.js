import express from "express";
import "dotenv/config";
import UsersRoutes from "./domains/users/routes.js";
import PlaceRoutes from "./domains/places/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const { PORT } = process.env;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/users", UsersRoutes);
app.use("/places", PlaceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
