const express = require("express");
const router = express.Router();
const productoSchema = require("../models/modelProductos");

// crear Productos
router.post("/agregarProducto", (req, res) => {
  const producto = productoSchema(req.body);
  producto
    .save()
    .then((dato) => res.json(dato))
    .catch((error) => res.json({ message: error }));
});

// obtener Productos

router.get("/c", (req, res) => {
  productoSchema
    .find()
    .then((dato) => res.json(dato))
    .catch((error) => res.json({ message: error }));
});

// obtener Productos por id

router.get("/obtenerProductoId/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .findById(id)
    .then((dato) => res.json(dato))
    .catch((error) => res.json({ message: error }));
});

// actualizar Productos

router.put("/actualizarProducto/:id", (req, res) => {
  const { id } = req.params;
  const { producto, categoria, precio } = req.body;
  productoSchema
    .updateOne({ _id: id }, { $set: { producto, categoria, precio } })
    .then((dato) => res.json(dato))
    .catch((error) => res.json({ message: error }));
});

// eliminar Productos

router.delete("/eliminarProducto/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount === 1) {
        res.json({ message: "Producto eliminado correctamente" });
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    })
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
