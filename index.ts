require("dotenv").config();
import express, { Application } from "express";

const port = process.env.PORT;
const cors = require("cors");
const app: Application = express();

app.use(express.json());
app.use(cors());

import router from "./utils/routes";
app.use(router);

app.listen(port, (): void => {
  console.info("Listening on port", port);
});

module.exports = app;
