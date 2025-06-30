const PetModel = require('../models/pet.model');
const UserModel = require('../models/user.model');

class PetService {
  static async getAllPets() {
    return await PetModel.getAllPets();
  }

  static async getAvailablePets() {
    return await PetModel.getAvailablePets();
  }

  static async getPetById(id) {
    const pet = await PetModel.getPetById(id);
    if (!pet) throw new Error('Pet não encontrado.');
    return pet;
  }

  static async addPet(userId, { name, age, species, size, description }) {
    const user = await UserModel.getUserById(userId);
    if (!user || user.role !== 'admin') {
      throw new Error('Apenas administradores podem cadastrar pets.');
    }

    const status = 'available'; // padrão
    return await PetModel.addPet({
      name,
      age,
      species,
      size,
      status,
      description,
    });
  }

  static async updatePet(userId, petId, updateData) {
    const user = await UserModel.getUserById(userId);
    if (!user || user.role !== 'admin') {
      throw new Error('Apenas administradores podem editar pets.');
    }

    const pet = await PetModel.getPetById(petId);
    if (!pet) throw new Error('Pet não encontrado.');
    if (pet.status === 'adopted') {
      throw new Error('Pets adotados não podem ser editados.');
    }

    const affectedRows = await PetModel.updatePet(petId, updateData);

    if (affectedRows === 0) {
      throw new Error('Pet não foi atualizado. Verifique os dados enviados.');
    }

    const updatedPet = await PetModel.getPetById(petId);
    return {
      message: 'Pet atualizado com sucesso',
      affectedRows,
    };
  }

  static async deletePet(userId, petId) {
    const user = await UserModel.getUserById(userId);
    if (!user || user.role !== 'admin') {
      throw new Error('Apenas administradores podem remover pets.');
    }

    const pet = await PetModel.getPetById(petId);
    if (!pet) throw new Error('Pet não encontrado.');
    if (pet.status === 'adopted') {
      throw new Error('Pets adotados não podem ser removidos.');
    }

    const affectedRows = await PetModel.deletePet(petId);
    if (affectedRows === 0) {
      throw new Error(
        'Falha ao remover pet. Verifique se ele está disponível.'
      );
    }

    return { message: 'Pet removido com sucesso.', affectedRows: affectedRows };
  }
}

module.exports = PetService;
