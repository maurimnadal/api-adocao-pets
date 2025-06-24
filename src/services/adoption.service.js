const AdoptionModel = require('../models/adoptionModel');
const PetModel = require('../models/petModel');
const UserModel = require('../models/userModel');

class AdoptionService {
  static async getAllAdoptions() {
    return await AdoptionModel.getAllAdoptions();
  }

  static async adoptPet(userId, petId) {
    const user = await UserModel.getUserById(userId);
    if (!user) throw new Error('Usuário não encontrado.');
    if (user.role !== 'adopter')
      throw new Error('Apenas adotantes podem adotar pets.');

    const pet = await PetModel.getPetById(petId);
    if (!pet) throw new Error('Pet não encontrado.');
    if (pet.status !== 'available')
      throw new Error('Pet não está disponível para adoção.');

    const adoptions = await AdoptionModel.getAllAdoptions();
    const alreadyAdopted = adoptions.some(
      (adoption) => adoption.user_id === userId && adoption.pet_id === petId
    );
    if (alreadyAdopted) throw new Error('Você já adotou este pet.');

    const adoption = await AdoptionModel.addAdoption({
      user_id: userId,
      pet_id: petId,
    });
    await PetModel.updatePet(petId, { ...pet, status: 'adopted' });

    return adoption;
  }
}

module.exports = AdoptionService;
