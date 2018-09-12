/**
 * 
 */
const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

// ============================
// Obtener Productos
// ============================
app.get('/producto', verificaToken, (req, res) => {

    // declaración de paginación
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let hasta = req.query.hasta || 5;
    hasta = Number(hasta);

    Producto.find({ disponible: true })
        .skip(desde) // paginado
        .limit(hasta)
        .populate('usuario', 'nombre, email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

});

// ============================
// Obtener Productos por ID
// ============================
app.get('/producto/:id', verificaToken, (req, res) => {
    // prpulate: usuario y categoria

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, porductoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!porductoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: porductoDB
            });

        });

});


// ============================
//   Buscar Productos
// ============================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    //expresion regular para que busque todo lo que tenga la palabra "ensalada" por ejemplo
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex, disponible: true })
        .populate('categoria', 'nombre')
        .exec((err, producto) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            });

        });

});




// ============================
// Crear un nuevo Productos
// ============================
app.post('/producto', verificaToken, (req, res) => {
    // grabar rel usuario
    // grabaar una categoria
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

// ============================
// Actualizar un Producto
// ============================
app.put('/producto/:id', verificaToken, (req, res) => {
    // grabar rel usuario
    // grabaar una categoria
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Producto no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            });

        });

    });

});

// ============================
// Borrar un Producto
// ============================
app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Producto no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoDeleted) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDeleted,
                message: 'Producto Borrado'
            });

        });

    });

});

module.exports = app;