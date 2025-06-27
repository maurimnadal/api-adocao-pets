const express = require('express');
const router = express.Router();
const PetController = require('../controllers/pet.controller');
const authenticateToken = require('../middlewares/authenticateToken');
const isAdmin = require('../middlewares/isAdmin');

// Rota pública
router.get('/available', PetController.getAvailablePets);

// Rotas protegidas
router.use(authenticateToken);

router.get('/', isAdmin, PetController.getAllPets);
router.get('/:petId', isAdmin, PetController.getPetById);
router.post('/', isAdmin, PetController.createPet);
router.put('/:petId', isAdmin, PetController.updatePet);
router.delete('/:petId', isAdmin, PetController.deletePet);

module.exports = router;