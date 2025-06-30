const express = require('express');
const router = express.Router();
const PetController = require('../controllers/pet.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

// Rota pública
router.get('/available', PetController.getAvailablePets);

// Rotas protegidas
router.use(authenticateToken);

router.get('/', isAdmin, PetController.getAllPets);
router.get('/:id', isAdmin, PetController.getPetById);
router.post('/', isAdmin, PetController.createPet);
router.put('/:id', isAdmin, PetController.updatePet);
router.delete('/:id', isAdmin, PetController.deletePet);

module.exports = router;
