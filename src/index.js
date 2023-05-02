import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
// import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

// Set up routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

export default app;
