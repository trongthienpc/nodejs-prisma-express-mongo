import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

// Routes
app.use("/api/auth", authRouter);

// Set up routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

export default app;
