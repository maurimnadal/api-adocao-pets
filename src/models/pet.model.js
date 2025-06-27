const db = require('../config/database');

class PetModel {
  static async getAllPets() {
    const [rows] = await db.query('SELECT * FROM pets');
    return rows;
  }

  static async getAvailablePets() {
    const [rows] = await db.query(
      'SELECT * FROM pets WHERE status = "available"'
    );
    return rows;
  }

  static async getPetById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  }

  static async addPet({ name, age, species, size, status, description }) {
    const [result] = await db.query(
      `INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, age, species, size, status, description]
    );
    return {
      id: result.insertId,
      name,
      age,
      species,
      size,
      status,
      description,
    };
  }

  static async updatePet(id, { name, age, species, size, description }) {
    const [result] = await db.query(
      `UPDATE pets SET name = ?, age = ?, species = ?, size = ?, description = ? WHERE id = ?`,
      [name, age, species, size, description, id]
    );
    return result.affectedRows;
  }
  
  static async updatePetStatus(id, status) {
    const [result] = await db.query(`UPDATE pets SET status = ? WHERE id = ?`, [
      status,
      id,
    ]);
    return result.affectedRows;
  }

  static async deletePet(id) {
    const [result] = await db.query(
      'DELETE FROM pets WHERE id = ? AND status = "available"',
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = PetModel;
