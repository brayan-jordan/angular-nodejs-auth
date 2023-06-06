# Angular NodeJS Auth Server
Servidor back-end criado com NodeJS, usando o framework [Fastify](https://www.fastify.io/). Um servidor simples, com apenas 3 endpoints, um para cadastro de usuário, um para login de usuário e outro que é uma simulação de proteção de acesso a conteúdo com JWT, o servidor também realiza a criptografia de senhas.
## Instalação das dependências
```bash
$ npm install
```
## Executando as migrates a configuração do banco de dados
É necessário rodar as migrações para criação das tabelas, usando o seguinte comando:
```bash
$ npx prisma migrate deploy
```
## Inicializando a aplicação
```bash
# development
$ npm run dev
```

