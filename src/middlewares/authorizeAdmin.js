const User = require('../models/userModel');

const authorizeAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Admins only' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = authorizeAdmin;
