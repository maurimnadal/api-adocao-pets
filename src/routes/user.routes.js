const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticateToken');
const isAdmin = require('../middlewares/isAdmin');

// Rota pública
router.post('/', UserController.registerUser);

// Rotas protegidas
router.use(authenticateToken);

router.get('/', isAdmin, UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', isAdmin, UserController.deleteUser);

module.exports = router;