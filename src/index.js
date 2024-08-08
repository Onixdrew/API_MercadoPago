const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const RutasProductos = require("./routes/Productos");
const RutasUser = require("./routes/Usuarios");

const app = express();
const port = process.env.PORT || 9000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use("/api", RutasProductos);
app.use("/api", RutasUser);

app.get("/", (req, res) => {
  res.send("Bienvenido al API de MercadoPago");
});

//mongoose
mongoose
  .connect(process.env.mongodb_url2)
  .then(() => console.log("conectado a mongo atlas"))
  .catch(() => console.error("error al conectar con mongo atlas"));

app.listen(port, () => console.log("servidor activado en el puerto", port));




// CORS

// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const cors = require("cors"); // Importar el paquete cors
// const RutasProductos = require("./routes/Productos");
// const RutasUser = require("./routes/Usuarios");

// const app = express();
// const port = process.env.PORT || 9000;

// // Configurar CORS
// app.use(cors());

// // Configurar middleware para analizar JSON
// app.use(express.json());
// app.use("/api", RutasProductos);
// app.use("/api", RutasUser);

// app.get("/", (req, res) => {
//   res.send("Bienvenido al API de MercadoPago");
// });

// // Conexión a MongoDB
// mongoose
//   .connect(process.env.mongodb_url2)
//   .then(() => console.log("conectado a mongo atlas"))
//   .catch(() => console.error("error al conectar con mongo atlas"));

// app.listen(port, () => console.log("servidor activado en el puerto", port));
