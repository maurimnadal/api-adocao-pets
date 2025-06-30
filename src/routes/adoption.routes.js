const express = require('express');
const router = express.Router();
const AdoptionController = require('../controllers/adoption.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

router.use(authenticateToken);

router.get('/', isAdmin, AdoptionController.getAllAdoptions);
router.post('/:id', AdoptionController.adoptPet);

module.exports = router;
