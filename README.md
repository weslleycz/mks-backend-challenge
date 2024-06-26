
## Tecnologias
- **NestJS**: Framework de Node.js para construir aplicações server-side eficientes e escaláveis.
- **TypeORM**: ORM (Object-Relational Mapper) para TypeScript e JavaScript.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações dentro de contêineres.
- **Docker Compose**: Ferramenta para definir e gerenciar aplicações multi-contêiner Docker.
- **Swagger**: Ferramenta para documentação de APIs.
- **class-validator**: Biblioteca para validação de objetos no TypeScript.
- **Redis**: Redis é um armazenamento de estrutura de dados em memória, usado como um banco de dados em memória.

## Rodando a Aplicação em Ambiente de Desenvolvimento

1. Pré-requisitos:
- Instale o Node.js
- Instale o Docker
- Instale o Docker Compose

2. Crie um aquivo .env na raiz do projeto com a seguinte estrutura
```
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
SECURITY_JWT="dfgdfgdfgfdg3434233435543fghd45@fgyhfgyhfghghf"
REDIS_HOST="localhost"
REDIS_PORT=6379
```
3. Instale as dependências
```
npm install
```
4. Subindo o banco de dados
```
docker-compose -f docker-compose.dev.yml up
ou 
docker-compose -f docker-compose.dev.yml up -d
```
4. Executando a aplicação
```
npm run start:dev
```
5. Acesse http://localhost:3000/docs para visualizar a documentação

## Rodando a Aplicação em Ambiente de Produção

## Tecnologias
1. Crie um aquivo .env na raiz do projeto com a seguinte estrutura

```
PORT=3000
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
SECURITY_JWT="dfgdfgdfgfdg3434233435543fghd45@fgyhfgyhfghghf"
REDIS_HOST="redis"
REDIS_PORT=6379
```

2. Executando a aplicação
```
docker-compose -f docker-compose.prod.yml up
ou
docker-compose -f docker-compose.prod.yml up -d
```

3. Acesse http://localhost:3000/docs para visualizar a documentação