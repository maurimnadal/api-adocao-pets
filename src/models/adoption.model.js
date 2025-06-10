const db = require('../config/database');

class AdoptionModel {
  static async getAllAdoptions() {
    const [rows] = await db.query('SELECT * FROM adoptions');
    return rows;
  }

  static async addAdoption({ user_id, pet_id }) {
    const [result] = await db.query(
      `
              INSERT INTO 
                  users (user_id, pet_id)
              VALUES (?, ?)
              `,
      [user_id, pet_id]
    );
    return { id: result.insertId, user_id, pet_id };
  }
}

module.exports = AdoptionModel;
