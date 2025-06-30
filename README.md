# Sistema de Adoção de Pets API

## Descrição

Uma API RESTful para gerenciamento de adoção de pets, desenvolvida com Node.js e Express. O sistema permite o cadastro de usuários, pets e gerenciamento de adoções, com diferentes níveis de acesso para administradores e adotantes.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MySQL
- JWT para autenticação
- bcrypt para criptografia
- dotenv para variáveis de ambiente

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositório]
cd [nome-do-diretório]
```

2. Instale as dependências:
```bash
npm install
```

3. Edite o arquivo `.env` com suas configurações:
```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

4. Execute o script de criação do banco de dados MySQL no seu SGBD favorito:
```sql
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS pets_db;
USE pets_db;

-- Tabela: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- senha criptografada com bcrypt
    phone VARCHAR(20),
    role ENUM('admin', 'adopter') NOT NULL
);

-- Tabela: pets
CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    species VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    status ENUM('available', 'adopted') NOT NULL DEFAULT 'available',
    description TEXT
);

-- Tabela: adoptions
CREATE TABLE IF NOT EXISTS adoptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    adoption_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);
```

5. Inicie o servidor:
```bash
npm run dev
```

## Estrutura do Projeto

```
.
├── database/
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
├── server.js
└── package.json
```

## Rotas da API

### 🟢 Rotas Públicas (não requerem autenticação JWT)

**🔹 Registrar usuário**
- `POST /users` - Cria um novo usuário (por padrão como adopter, mas pode ser admin se fornecido)

**🔹 Login**
- `POST /login` - Autentica usuário por email e password, retorna um JWT

**🔹 Listar pets disponíveis**
- `GET /pets/available` - Retorna todos os pets com status: "available"

### 🔐 Rotas Protegidas (requerem JWT no header)
*Todas as rotas abaixo precisam de um token JWT com `Authorization: Bearer <token>` no cabeçalho.*

#### 👤 Usuários

**🔸 Listar todos os usuários (admin)**
- `GET /users` - Apenas usuários com role: admin

**🔸 Buscar usuário por ID (admin ou o próprio usuário)**
- `GET /users/:id` - Permite admin ou o próprio usuário acessar seus dados

**🔸 Atualizar usuário (admin ou o próprio)**
- `PUT /users/:id` - Permite alterar nome, email, telefone, senha e role

**🔸 Remover usuário (admin)**
- `DELETE /users/:id` - Apenas administradores

#### 🐾 Pets

**🔸 Listar todos os pets (admin)**
- `GET /pets` - Lista todos os pets cadastrados (disponíveis ou adotados)

**🔸 Buscar pet por ID (admin)**
- `GET /pets/:id` - Apenas administradores

**🔸 Criar novo pet (admin)**
- `POST /pets` - Cria pet com status "available"

**🔸 Atualizar pet (admin)**
- `PUT /pets/:id` - Edita os dados do pet. Pets com status: "adopted" não podem ser atualizados

**🔸 Remover pet (admin)**
- `DELETE /pets/:id` - Apenas se o pet estiver disponível (status = "available")

#### ❤️ Adoções

**🔸 Adotar pet (adopter)**
- `POST /adoptions/:id` - Apenas usuários com role: adopter. Pet precisa estar available. Não pode adotar o mesmo pet duas vezes

**🔸 Listar todas as adoções (admin)**
- `GET /adoptions` - Apenas administradores

## Desenvolvimento

### Linting

O projeto utiliza ESLint com Prettier para manter a qualidade do código:

```bash
# Verificar código
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix
```
