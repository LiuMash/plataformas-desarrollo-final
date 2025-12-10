const express = require('express');
const cors = require('cors'); 
require('dotenv').config();

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(cors());

// --- Base de Datos ---
const { initDB } = require('./src/db');
initDB();

// --- Importar Rutas ---
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

// --- Conectar Rutas ---
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡API de Deportes AR funcionando correctamente!');
});

// --- Iniciar Servidor ---
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});