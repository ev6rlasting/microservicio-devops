const express = require('express');
const mongoose = require('mongoose');

//Documentacion con Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mi_base_datos';

app.use(express.json());

//Swagger nuevamente
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @openapi
 * /:
 *   get:
 *     summary: Verifica que el microservicio está funcionando
 *     description: Retorna el estado del servidor y un mensaje de confirmación.
 *     tags:
 *       - Estado
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente.
 *         content:
 *           application/json:
 *             example:
 *               status: OK
 *               message: Microservicio DevOps funcionando correctamente
 *               integrante: Tu Nombre Completo
 */

// Ruta principal requerida para verificar que la app funciona
app.get('/', (req, res) => {
    res.json({ 
        status: "OK", 
        message: "Microservicio DevOps funcionando correctamente",
        integrante: "Tu Nombre Completo" 
    });
});

// Intentar conectar a MongoDB de manera segura
if (process.env.NODE_ENV !== "test") {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("Conectado exitosamente a MongoDB"))
        .catch(err => console.error(err));
}

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}

module.exports = app; // Lo exportamos para los tests de más adelante