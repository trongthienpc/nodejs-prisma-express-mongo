import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import authRouter from "./routes/auth.routes.js";
import branchRouter from "./routes/branch/branch.routes.js";
import groupRouter from "./routes/group/group.routes.js";
import warehouseRouter from "./routes/warehouse/warehouse.routes.js";
import customerRouter from "./routes/customer/customer.routes.js";
import itemTypeRouter from "./routes/itemType/itemType.routes.js";
import configurationRouter from "./routes/configuration/configuration.routes.js";
import itemRouter from "./routes/item/item.routes.js";
import itemCategoryRoute from "./routes/itemCategory/itemCategory.routes.js";

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
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.routes.js", "./src/routes/*/*.routes.js"],
};

// Routes
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", authRouter);
app.use("/api/branch", branchRouter);
app.use("/api/group", groupRouter);
app.use("/api/warehouses", warehouseRouter);
app.use("/api/customers", customerRouter);
app.use("/api/items", itemRouter);
app.use("/api/itemTypes", itemTypeRouter);
app.use("/api/itemCategory", itemCategoryRoute);
app.use("/api/configurations", configurationRouter);

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
