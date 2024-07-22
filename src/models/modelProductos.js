const mongoose = require("mongoose");
const ProductoSchema = mongoose.Schema({
  producto: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});
                    // nombre de la coleccion en la db
module.exports = mongoose.model("productos", ProductoSchema);
