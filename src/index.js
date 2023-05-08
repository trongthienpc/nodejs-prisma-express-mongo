import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Documentation",
      version: "1.0.0",
      description: "This is a sample API",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: ["./src/routes/*.routes.js"],
};

// Routes
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
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
