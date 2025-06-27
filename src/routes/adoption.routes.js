const express = require('express');
const router = express.Router();
const AdoptionController = require('../controllers/adoption.controller');
const authenticateToken = require('../middlewares/authenticateToken');
const isAdmin = require('../middlewares/isAdmin');


router.use(authenticateToken);

router.get('/', isAdmin, AdoptionController.getAllAdoptions);
router.post('/:petId', AdoptionController.adoptPet);

module.exports = router;