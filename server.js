require('dotenv').config(); // Carrega variáveis de ambiente
const app = require('./src/app'); 
const PORT = process.env.PORT || 3000;
// Inicia o servidor Express para escutar na porta definida
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});
