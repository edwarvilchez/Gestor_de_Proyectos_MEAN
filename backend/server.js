require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projectApi');

// declaramos la aplicación con el módulo express
const app = express();

// configuramos el middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// configuramos la ruta de la aplicación 
app.use('api/projects', projectRoutes);

// conectamos a la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB');
        // puerto de la aplicación
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    })