const express = require('express');
const todos = require('./todos');

const app = express();
app.use(express.json());

// forma simples de fazer a liberação de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/todos', async (req, res) => {
  const page = Number(req.query.page) || 1; //pega o valor da query page, se não existir, assume 1
  const limit = Number(req.query.limit) || 5; //pega o valor da query limit, se não existir, assume 5

  const startIndex = (page - 1) * limit; //calcula o índice inicial
  const endIndex = page * limit; //calcula o índice final

  const todosPage = todos.slice(startIndex, endIndex); //pega os itens da página atual
  const totalPages = Math.ceil(todos.length / limit); //calcula o total de páginas
  const currentPage = page; //define a página atual

  return res.json({ todos: todosPage, totalPages, currentPage });
});

app.listen(3000, () => {
  console.log('Aplicação ouvindo na porta 3000');
});