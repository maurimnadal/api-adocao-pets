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
          adoptions (user_id, pet_id)
      VALUES (?, ?)
      `,
      [user_id, pet_id]
    );
    return { id: result.insertId, user_id, pet_id };
  }

  static async getAllAdoptionsWithDetails() {
    const [rows] = await db.query(`
      SELECT a.id, u.name AS user_name, p.name AS pet_name, a.adoption_date
      FROM adoptions a
      JOIN users u ON a.user_id = u.id
      JOIN pets p ON a.pet_id = p.id
    `);
    return rows;
  }
}

module.exports = AdoptionModel;
