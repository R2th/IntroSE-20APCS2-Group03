# Mô tả
Ở bài này mình sẽ xây dựng GraphQL server với Node.js
Sử dụng các công nghệ chính: 
* Express, apollo server express. 
*  Database: Postgresql với  Knex query.
*  Mội vài thư viên Javascript khác : dataloader để giải quyết N+1, babel-node để sử dụng ES6 và nodemon để cập nhật server khi thay đổi code. 
* Docker for setup development.

 ## Cấu trúc thư mục
Bao gồm các thư mục chính: 
* bussiness: thực ra bạn có thể sử dụng Bookself ORM. Định nghĩa các đối tượng và các hàm để giao tiếp với database 
* knex.file.js, db (index.js, /migrations, /queryBuilders, /seeds): Dùng cho Knex.js để tương tác với database Postgresql 
* Dockerfile, docker-images/db/Dockerfile và docker-compose.yml: Các Dockerfile để xây dựng các images(các image tạo ra container để chạy service) và docker-compose để kết hợp các container với nhau thành 1 hệ thống. 
*  config.env: Cài đặt các giá trị để cấu hình hệ thống. Rất quan trọng khi sử dụng trong các môi trường khác nhau (development, production)
*  presentation/schema: Định nghĩa schema (Type, Query, Mutation, resolvers) cho GraphQL 

```
 .
├── bussiness
│   └── hero.js
├── config.env
├── db
│   ├── index.js
│   ├── migrations
│   ├── queryBuilders
│   └── seeds
├── docker-compose.yml
├── Dockerfile
├── docker_images
│   └── db
├── index.js
├── knexfile.js
├── node_modules
├── package.json
├── presentation
│   └── schema.js
```


## Cài đặt môi trường phát triển với Docker 
Mình sẽ cần Docker image cho Node.js
```
FROM node:9.8-alpine

WORKDIR /usr/src/graph

EXPOSE 3000
CMD ["yarn", "run", "serve"]
```


Và 1 image nữa cho database Postgresql 
```
FROM postgres:9.6.3
```



Sau đó kết hợp với docker-compose.yml: 
* Server Node với tên là graph sẽ chạy ở cổng 3000
* Database Postgresql sẽ dùng cổng 5432
* Dùng file config.env để config các giá trị cần thiết cho Postgresql: 
```
POSTGRES_USER=heroesuser
POSTGRES_PASSWORD=heroespassword
POSTGRES_DB=heroesdb
PGDATA=/data
DB_HOST=db
```

Và đây là file docker-compose.yml 
```
# docker-compose.yml
version: '3'
services:
  graph:
    build:
      context: .
    image: heroes-graph
    env_file: config.env
    volumes:
      - .:/usr/src/graph
    ports:
      - 3000:3000
    links:
      - db:db
  db:
    build:
      context: ./docker_images/db
    env_file: config.env
    image: heroes-db
    ports:
      - 5432:5432

```


## Server Node với Express
Chúng ta đã cài đặt xong môi trường phát triển với Docker. 

Để hệ thống này bạn chỉ cần chạy 
`docker-compose build` và `docker-compose up` là xong. :D 


Như đã nói ở trên mình dùng 1 vài thư viện js: express, apollo-server-express, graphql, graphql-tools, knex, pg body-parser, dataloader

và babel  để build ES6 và nodemon để cập nhật  code mỗi khi thay đổi. 

```
yarn add express graphql, graphql-tools, apollo-server-express, dataloader, knex, pg
yarn add -D nodemon babel-cli babel-plugin-transform-class-properties  babel-preset-es2015  babel-preset-flow
```

Sau khi cài đặt thì chúng ta sẽ được file package.json như này: 
```
{
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-flow": "^6.23.0",
    "nodemon": "^1.17.2"
  },
  "scripts": {
    "serve": "nodemon index.js --exec babel-node"
  },
  "dependencies": {
    "apollo-server-express": "^1.3.2",
    "body-parser": "^1.18.2",
    "dataloader": "^1.4.0",
    "express": "^4.16.3",
    "graphql": "^0.13.1",
    "graphql-tools": "^2.23.0",
    "knex": "^0.14.4",
    "pg": "^7.4.1"
  }
```



Server Express của chúng ta sẽ như này :D 

Mình dùng Express  chạy server runtime và thêm vào đó là cài đặt graphqlExpress và graphiqlExpress.
```
// index.js
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './presentation/schema'
import Hero from './bussiness/hero'

const PORT = 3000

const app = express()

app.use('/graphql', bodyParser.json(),graphqlExpress({
  schema,
  context: {
    dataLoaders: {
      hero: Hero.getLoaders(),
    }
  },
  debug: true
}))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)

```

## Định nghĩa schema cho GraphQL
Mình định nghĩa
* Type: Hero
* Query: heroes (lấy danh sách các hero), hero(lấy về hero với id)

Các bạn có thể tham khảo về GrapQl 
```
import { makeExecutableSchema } from 'graphql-tools'
import Hero from '../bussiness/hero'

const typeDefs = [`
  type Hero {
    id: Int!
    firstName: String
    lastName: String
    heroName: String
    enemy: Hero
  }

  type Query {
    heroes: [Hero]
    hero(id: Int!): Hero
  }

  schema {
    query: Query
  }
`]

const resolvers = {
  Query: {
    heroes: async (_, args, ctx) => Hero.loadAll(ctx, args),
    hero: async (_, args, ctx) => Hero.load(ctx, args),
  },
  Hero: {
    enemy: async (hero, args, ctx) => Hero.load(ctx, { id: hero.enemyId })
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })
export default schema

```
## Cấu hình database với Knex.js
```
// knexfile.js
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'heroesuser',
      password: 'heroespassword',
      database: 'heroesdb',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
```


## Tạo các bảng dữ liệu với Knex migrations 
*  Table Hero 

```
// migrations
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('Heroes', function(table) {
    table.increments('id')
    table.string('firstName')
    table.string('lastName')
    table.string('heroName')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Heroes')
};

```

* Thêm column enemyId như là foreign key 
```
// migrations
exports.up = function(knex, Promise) {
  return knex.schema.table('Heroes', function(table) {
    table.integer('enemyId').references('id').inTable('Heroes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Heroes', function() {
    table.dropColumn('enemyId')
  })
};
```

## Các queries  đến database với Knex  
```
// queryBuilders
import db from '..'

class Hero {
  static async getById(id: number) {
    return db
      .first()
      .table('Heroes')
      .where('id', id)
  }

  static async getByIds(ids: Array<number>) {
    return db
      .select()
      .table('Heroes')
      .whereIn('id', ids)
  }

  static async getAll() {
    return db
      .select()
      .table('Heroes')
  }
}

export default Hero

```


# Tóm lược 
Vậy là mình đã xây dựng xong GraphQl server với Nodejs :D 

Tham khảo từ: 

https://bamtech.gitbook.io/dev-standards/backend/graphql-js/mo-kick-start-a-js-graphql-3-layers-api-with-apollo-server-dataloader-and-knex

Các bạn có thể xem code của mình tại: https://gitlab.com/thinhnv.58/graphql_formation

Chúc bạn thành công !