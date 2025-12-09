// Middleware para verificar si el usuario es admin
// Persona 3 implementará la lógica real

module.exports = (req, res, next) => {
    // TODO: verificar rol admin
    next();
};
