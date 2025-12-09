const userModel = require('../models/userModel');

module.exports = {
    // POST /users/register
    register: async (req, res) => {
        try {
            const user = await userModel.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    },

    // POST /users/login
    login: async (req, res) => {
        try {
            const { email } = req.body;

            // Сейчас просто вызываем модель.
            // Позже Persona 3 добавит bcrypt + JWT.
            const user = await userModel.login(email);

            res.json(user);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }
};
