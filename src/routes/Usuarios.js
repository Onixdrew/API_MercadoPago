const express=require("express");
const router=express.Router();
const bcrypt = require('bcrypt');
const userSchema=require("../models/modelUser")


// crear usuario
router.post("/agregarUser", async (req,res)=>{
    try{
        const encodePassword= await bcrypt.hash(req.body.contraseña, 10)
        const nuevoUser = new userSchema({
            nombre: req.body.nombre,
            correo: req.body.correo,
            contraseña: encodePassword,
         
        });

        const user= await nuevoUser.save()
        res.status(201).json({ message: 'Usuario creado exitosamente' });
        res.json(user)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al intentar agregar el usuario' });
    }

})


// obtener usuarios

router.get("/obtenerUser", (req,res)=>{
    userSchema
        .find()
        .then((dato)=> res.json(dato))
        .catch((error)=>res.json({message:error}))
})


// obtener usuario por id

router.get("/obtenerUserId/:id", (req,res)=>{
    const {id}=req.params;
    userSchema
        .findById(id)
        .then((dato)=> res.json(dato))
        .catch((error)=>res.json({message:error}))
})

// actualizar usuario

router.put("/actualizarUser/:id", (req,res)=>{
    const {id}=req.params;
    const {nombre,correo,contraseña}=req.body;
    userSchema
        .updateOne({_id:id},{$set:{nombre,correo,contraseña}})
        .then((dato)=> res.json(dato))
        .catch((error)=>res.json({message:error}))
})

// eliminar usuario

router.delete("/eliminarUser/:id", (req,res)=>{
    const {id}=req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((result) => {
            if (result.deletedCount === 1) {
                res.json({ message: "Usuario eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        })
        .catch((error)=>res.json({message:error}))
})

module.exports= router;
