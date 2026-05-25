const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mi_base_datos';

app.use(express.json());

// Ruta principal requerida para verificar que la app funciona
app.get('/', (req, res) => {
    res.json({ 
        status: "OK", 
        message: "Microservicio DevOps funcionando correctamente",
        integrante: "Tu Nombre Completo" 
    });
});

// Intentar conectar a MongoDB de manera segura
mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app; // Lo exportamos para los tests de más adelante