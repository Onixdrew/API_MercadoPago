const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Rutas = require("./routes/Usuarios");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use("/api", Rutas);

app.get("/", (req, res) => {
  res.send("Bienvenido al API de MercadoPago");
});

//mongoose
mongoose
  .connect(process.env.mongodb_url2)
  .then(() => console.log("conectado a mongo atlas"))
  .catch(() => console.error("error al conectar con mongo atlas"));

app.listen(port, () => console.log("servidor activado en el puerto", port));
