const UserService = require('../services/user.service');

class UserController {
  static async registerUser(req, res) {
    const { name, email, password, phone, role } = req.body;

    try {
      const result = await UserService.registerUser({
        name,
        email,
        password,
        phone,
        role,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const result = await UserService.loginUser({ email, password });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getAllUsers(req, res) {
    const requestingUser = req.user; 

    try {
      const users = await UserService.getAllUsers(requestingUser);
      res.status(200).json(users);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }
  static async getUserById(req, res) {
    const { id } = req.params;
    const requestingUser = req.user;

    try {
      const user = await UserService.getUserById(requestingUser, parseInt(id));
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }
  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, phone, role } = req.body;
    const requestingUser = req.user; 

    try {
      const updatedUser = await UserService.updateUser(requestingUser, id, {
        name,
        email,
        password,
        phone,
        role,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async deleteUser(req, res) {
    const { id } = req.params;
    const requestingUser = req.user; 

    try {
      const result = await UserService.deleteUser(requestingUser, id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
module.exports = UserController;
