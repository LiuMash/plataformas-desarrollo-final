const express = require('express');
const app = express();
app.use(express.json());
const productRoutes = require('./src/routes/productRoutes');
app.use('/products', productRoutes);
const userRoutes = require('./src/routes/userRoutes');
app.use('/users', userRoutes);
const { initDB } = require('./src/db');
initDB();








const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
