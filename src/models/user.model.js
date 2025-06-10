const db = require('../config/database');

class UserModel {
  static async getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  static async getUSerById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async addUser({ name, email, password, phone, role }) {
    const [result] = await db.query(
      `
        INSERT INTO 
            users (name, email, password, phone, role)
        VALUES (?, ?, ?, ?, ?)
        `,
      [name, email, password, phone, role]
    );
    return { id: result.insertId, name, email, password, phone, role };
  }

  static async updateUser(id, { name, email, password, phone, role }) {
    await db.query(
      `
        UPDATE users SET 
                name = ?, 
                email = ?, 
                password = ?, 
                phone = ?, 
                role = ?
            WHERE id = ?
        `,
      [name, email, password, phone, role, id]
    );
  }

  static async deleteUser(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = UserModel;
