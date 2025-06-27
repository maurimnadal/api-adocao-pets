const AdoptionService = require('../services/adoption.service');

class AdoptionController {

  static async getAllAdoptions(req, res) {
    try {
      const adoptions = await AdoptionService.getAllAdoptions();
      res.status(200).json(adoptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async adoptPet(req, res) {
    const { petId } = req.params;
    const userId = req.user.id; // ID do usuário autenticado

    try {
      const adoption = await AdoptionService.adoptPet(userId, petId);
      res.status(201).json(adoption);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AdoptionController;
