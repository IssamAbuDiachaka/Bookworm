import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

export const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// TODO: add your routes
// import routes from "./routes"; app.use("/api", routes);

// Healthcheck
app.get("/", (_req, res) => res.send("📚 Bookworm API is alive!"));