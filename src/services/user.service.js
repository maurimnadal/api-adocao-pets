const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

class UserService {
  // Registro de novo usuário (com role = adopter por padrão)
  static async registerUser(user) {
    const { name, email, password, phone, role } = user;

    const existing = await UserModel.getUserByEmail(email);
    if (existing) {
      throw new Error('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.role = role || 'adopter'; // padrão para 'adopter'

    return {
      message: 'Usuário registrado com sucesso',
      user: await UserModel.addUser(user),
    };
  }

  // Login e geração de token JWT
  static async loginUser({ email, password }) {
    const user = await UserModel.getUserByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Senha inválida');

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  // Listar todos os usuários (admin apenas)
  static async getAllUsers(requestingUser) {
    if (requestingUser.role !== 'admin') {
      throw new Error(
        'Apenas administradores podem visualizar todos os usuários.'
      );
    }

    return await UserModel.getAllUsers();
  }

  // Buscar usuário por ID (admin ou o próprio)
  static async getUserById(requestingUser, targetUserId) {
    if (requestingUser.role !== 'admin' && requestingUser.id !== targetUserId) {
      throw new Error('Você não tem permissão para visualizar este usuário.');
    }

    const user = await UserModel.getUserById(targetUserId);
    if (!user) throw new Error('Usuário não encontrado.');

    delete user.password; // segurança
    return user;
  }

  // Atualizar usuário (admin ou o próprio)
static async updateUser(requestingUser, targetUserId, updateData) {
  const isAdmin = requestingUser.role === 'admin';
  const isSelf = requestingUser.id === Number(targetUserId); // assegura tipo numérico

  if (!isAdmin && !isSelf) {
    throw new Error('Você não tem permissão para atualizar este usuário.');
  }

  const existing = await UserModel.getUserById(targetUserId);
  if (!existing) throw new Error('Usuário não encontrado.');

  // Criptografa nova senha, se fornecida
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // Atualiza com os dados fornecidos, preservando os campos antigos
  const updatedUser = {
    id: existing.id,
    name: updateData.name || existing.name,
    email: updateData.email || existing.email,
    password: updateData.password || existing.password,
    phone: updateData.phone || existing.phone,
    role: updateData.role || existing.role,
  };

  const affectedRows = await UserModel.updateUser(targetUserId, updatedUser);

  if (affectedRows === 0) {
    throw new Error('Nenhuma alteração foi feita no usuário.');
  }

  return {
    message: 'Usuário atualizado com sucesso',
    affectedRows,
  };
}

  // Deletar usuário (admin apenas)
static async deleteUser(requestingUser, targetUserId) {
  if (requestingUser.role !== 'admin') {
    throw new Error('Apenas administradores podem excluir usuários.');
  }

  const user = await UserModel.getUserById(targetUserId);
  if (!user) throw new Error('Usuário não encontrado.');

  const affectedRows = await UserModel.deleteUser(targetUserId);
  if (affectedRows === 0) {
    throw new Error('Falha ao remover o usuário.');
  }

  return {
    message: 'Usuário removido com sucesso',
    affectedRows,
  };
}
}

module.exports = UserService;
