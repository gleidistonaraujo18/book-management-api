# API de Gerenciamento de Livros

Uma API RESTful desenvolvida com Node.js, TypeScript e Express para gerenciar uma coleção de livros, utilizando MySQL como banco de dados.

## Funcionalidades

- Adicionar um novo livro
- Listar todos os livros
- Obter detalhes de um livro específico
- Atualizar um livro existente
- Deletar um livro

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MySQL**
- **Sequelize**
- **Nodemon**

## Como Executar

1. **Pré-requisitos**

   - Node.js e npm instalados
   - MySQL instalado

2. **Configuração**

   - Clone o repositório:

     ```bash
     git clone https://github.com/seu-usuario/book-management-api.git
     cd book-management-api
     ```

   - Instale as dependências:

     ```bash
     npm install
     ```

   - Configure o banco de dados MySQL e crie um banco de dados chamado `book_management_db`.

   - No arquivo `.env`, adicione as variáveis de ambiente para conexão com o MySQL:

     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=sua-senha
     DB_NAME=book_management_db
     DB_PORT=3306
     ```

   - Execute as migrações:

     ```bash
     npx sequelize-cli db:migrate
     ```

3. **Executando a Aplicação**

   - Para iniciar o servidor em modo de desenvolvimento:

     ```bash
     npm run dev
     ```

   - Para rodar a aplicação em modo de produção, compile o TypeScript e inicie o servidor:

     ```bash
     npm run build
     npm start
     ```

## Endpoints

- **Listar todos os livros:** `GET /api/books`
- **Obter livro por ID:** `GET /api/books/:id`
- **Adicionar um novo livro:** `POST /api/books`
- **Atualizar um livro:** `PUT /api/books/:id`
- **Deletar um livro:** `DELETE /api/books/:id`
