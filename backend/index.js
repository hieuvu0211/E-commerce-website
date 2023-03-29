const express = require("express");
const cors = require("cors");
const {connect} = require("mongoose");
const product = require("./src/product");
const register = require("./routes/register");
const login = require("./routes/login");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);

app.get("/", (req, res) => {
  res.send("welcome online shop api...");
});

app.get("/products", (req, res) => {
  res.send(product);
});
const port = process.env.PORT || 5000;
const uri = process.env.DB_URL;

app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}}`)
);

connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("mongoose connected"))
    .catch((err) => console.log("mongoose error", err.messages));