const UserService = require('../services/user.service');

class AuthController {
  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const result = await UserService.loginUser({ email, password });
      res.status(200).json(result); 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
