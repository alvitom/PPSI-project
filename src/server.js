const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index.routes");
const ErrorMiddleware = require("./middlewares/error");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1", router);

app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
