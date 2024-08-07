const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body; // Añade 'role' en el cuerpo de la solicitud
  try {
    const user = new User({ username, email, password, role }); // Guarda el rol del usuario
    await user.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'El usuario o contraseña es incorrecto' });
        }
        const expiresIn = 3600; // 1 hora en segundos
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: expiresIn });
        res.json({ 
            token, 
            userId: user._id, 
            role: user.role,
            username: user.username,
            expiresIn: expiresIn // Enviamos la duración del token en segundos
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
