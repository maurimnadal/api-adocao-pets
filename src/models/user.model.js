const db = require('../config/database');

class UserModel {
  static async getAllUsers() {
    const [rows] = await db.query('SELECT id, name, email, phone, role FROM users');
    return rows;
  }

  static async getUserById(id) {
    const [rows] = await db.query('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async getUserByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async addUser({ name, email, password, phone, role }) {
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, phone, role]
    );
    return { id: result.insertId, name, email, phone, role };
  }

  static async updateUser(id, { name, email, password, phone, role }) {
    const [result] = await db.query(
      `UPDATE users SET name = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?`,
      [name, email, password, phone, role, id]
    );
    return result.affectedRows;
  }

  static async deleteUser(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = UserModel;