const PetService = require('../services/pet.service');

class PetController {
  static async getAllPets(req, res) {
    try {
      const pets = await PetService.getAllPets();
      if (pets.length === 0) {
        return res.status(404).json({ message: 'Nenhum pet encontrado.' });
      }
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAvailablePets(req, res) {
    try {
      const availablePets = await PetService.getAvailablePets();
      if (availablePets.length === 0) {
        return res
          .status(404)
          .json({ message: 'Nenhum pet disponível para adoção.' });
      }
      res.status(200).json(availablePets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPetById(req, res) {
    const { id } = req.params;
    try {
      const pet = await PetService.getPetById(id);
      res.status(200).json(pet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createPet(req, res) {
    const { name, age, species, size, description } = req.body;
    const userId = req.user.id; // capturado do middleware JWT

    try {
      const newPet = await PetService.addPet(userId, {
        name,
        age,
        species,
        size,
        description,
      });
      res.status(201).json(newPet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updatePet(req, res) {
    const { petId } = req.params;
    const userId = req.user.id;
    const { name, age, species, size, description } = req.body;

    try {
      const updated = await PetService.updatePet(userId, petId, {
        name,
        age,
        species,
        size,
        description,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deletePet(req, res) {
    const { petId } = req.params;
    const userId = req.user.id;

    try {
      const deleted = await PetService.deletePet(userId, petId);
      res.status(200).json(deleted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PetController;
