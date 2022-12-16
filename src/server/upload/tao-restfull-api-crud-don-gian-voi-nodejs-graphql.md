Chào mọi người,

Nối tiếp quá trình giới thiệu và nghiên cứu về GraphQL, hôm nay mình muốn làm 1 project nhỏ để học tập cũng như hướng dẫn cho mọi người về cách xây dựng ứng dụng sử dụng GraphQL và truy vấn như thế nào.

Nào cùng bắt đầu nhé! 
## I. GraphQL là gì?
GraphQL là một Graph Query Language được dành cho API. Nó được phát triển bởi Facebook và hiện tại nó được duy trì bởi rất nhiều công ty lớn, và mọi cá nhân trên khắp thế giới. 

GraphQL hiện tại thường được dùng cho những dự án lớn thay thế cho REST bởi sự hiệu quả, mạnh mẽ và linh hoạt hơn rất nhiều.

Mọi người có thể tham khảo tại trang chủ của GraphQL: [https://graphql.org/](https://graphql.org/)
## II. Chuẩn bị
Với project mình sẽ demo ở đây, mình sẽ code trên NodeJS 12.

**Giả định: Máy bạn đã cài đặt NodeJS và MySQL**

### 2.1. Tạo file `package.json` 
`package.json` là 1 file cung cấp thông tin cần thiết cho npm, cho phép nó xác định các thự viện dùng cho dự án cũng như xử lý các phụ thuộc của dự án. 
File `package.json`:
```js
{
  "name": "grapql-crud",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apollo-server-express": "^2.17.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mysql2": "^2.2.5",
    "sequelize": "^6.3.5"
  }
}
```

Trên đây mình đã thêm các thư viện:
1. `apollo-server-express`:  Trình khởi tạo server side
3. `dotenv`: Quản lý các biến môi trường (ENV)
4. `express`: Là một khung ứng dụng web cho Node.js
5. `mysql2`: Thư viện MySQL2
6. `sequelize`: Đây là 1 trình điều khiển dùng để truy vấn cơ sở dữ liệu

Sau đó, chạy lệnh sau để tiến hành cài đặt các thư viện:
```
npm i
```
Bạn sẽ thấy 1 thư mục node_modules được sinh ra, như vậy đã cài đặt xong thư viện.

### 2.2 Tạo cơ sở dữ liệu sử dụng Mysql
```sql
CREATE DATABASE nodejs_api;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `products` VALUES ('1', 'Iphone X', 'Black', '30000000');
INSERT INTO `products` VALUES ('2', 'Samsung S9', 'White', '24000000');
INSERT INTO `products` VALUES ('3', 'Oppo F5', 'Red', '7000000');
```
Và đây là bảng sau khi chạy sql:

![Database](https://images.viblo.asia/0d8d3006-0bd7-44e8-992c-17c6f7d44c7d.png)

### 2.3 Tạo file kết nối Database
Trước tiên mình cần đưa các config cho database ra file .env
Đây là file `.env` với nội dung:
```
DB_HOST="localhost"
DB_USER="root"
DB_PASS="root"
DB_NAME="nodejs_api
```
** Lưu ý: ** Các bạn có thể tạo file .env.example để đưa lên git và đưa file `.env` vào `.gitignore`

Tiếp đến mình sẽ tạo file `database.js`:
```js
'use strict';
const Sequelize = require('sequelize')

var db = {}

const sequelize = new Sequelize( 
  process.env.DB_NAME,  
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port:  process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorsAliases: false,
})

let models = [
    require('./models/products.js')
]

// Khởi tạo models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize

module.exports = db
```
Trong file database.js này mình sử dụng `sequelize` để tạo và quản lý database. Để tìm hiểu rõ hơn, các bạn có thể vào trang chủ của `sequelize` tại: [https://sequelize.org/master/manual/getting-started.html](https://sequelize.org/master/manual/getting-started.html)
Như vậy là xong phần config database, khi sử dụng bạn chỉ cần require file `database.js` vào là có 1 đối tượng db để truy vấn database rồi. 


## III. Xây dựng ứng dụng
### 3.1 Tạo models
Thư mục models này sẽ chứa các models để query DB
Models products:
File `models/products.js`:
```js
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('products', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		color: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		price: {
			type: DataTypes.STRING(256),
			allowNull: false
		}
	}, {
		tableName: 'products',
		timestamps: false
	});
};
```
### 3.2 Tạo GraphQL
Với GraphQL, để tạo được ứng dụng CRUD, chúng ta cần phải tạo 2 mục: Query (dùng để get data) và Mutation (dùng để update, create, delete data).

Tại thư mục root của dự án, tạo file `GraphQL/products.js`:
```js
const { gql } = require('apollo-server-express');
const db = require('./../database');

const typeDefs = gql`
  type Query {
    products: [Product]
    product(id: ID!): Product
  }
  type Product {
    id: ID!
    name: String!
    color: String!
    price: String!
  }

  type Mutation {
    updateProduct(
      id: Int, 
      name: String, 
      color: String, 
      price: String
    ): String
    createProduct(
      name: String, 
      color: String, 
      price: String
    ): String
    deletProduct(id: Int): Boolean
  }
`

const resolvers = {
  Query: {
    products: async () => db.products.findAll(),
    product: async (obj, args, context, info) =>
      db.products.findByPk(args.id),
  },
  Mutation: {
    createProduct: async (root,args,context,info) => {
      product = await db.products.create({
        name: args.name,
        color: args.color,
        price: args.price,
      });
      return product.id;
    },
    updateProduct: async (root,args,context,info) => {
      if (!args.id) return;
      product = await db.products.update({
        name: args.name,
        color: args.color,
        price: args.price,
      }, {
        where: { id: args.id}
      });
      return 'Update Success!';
    },
    deleteProduct: async (root,args,context,info) => {
      if (!args.id) return;
      product = await db.products.destroy({where: {
        id: args.id
      }})
      return 'Delete success!';
    }
  }
}

module.exports = { typeDefs, resolvers }
```
Trong file products.js ở trên, có 2 mục mình cần quan tâm đó là:
1. `typeDefs`: Dùng để khai báo các thuộc tính dùng để query
2. `resolvers`: Dùng để khai báo Query, Mutation thao tác với cơ sở dữ liệu.

Sau đó export 2 biến `typeDefs`, `resolvers` bằng dòng để file khác sử dụng:
```js
module.exports = { typeDefs, resolvers }
```

Code của GraphQL cũng khá dễ hiểu, các bạn có thể đọc và hiểu luôn. Ngoài ra nên tham khảo cách query DB với `sequelize` tại [https://sequelize.org/master/manual/getting-started.html](https://sequelize.org/master/manual/getting-started.html)

### 3.3  Tạo server run APP
Tiếp đến, mình sẽ tạo 1 file app.js để run tạo server với nội dung:
```js
//app.js
const express = require('express');
require('dotenv').config({path:'.env'});
const { ApolloServer } = require('apollo-server-express');

//Create server with ApolloServer
const server = new ApolloServer({
      modules: [
            require('./GraphQL/products'),
      ]
});

const app = express();
server.applyMiddleware({ app });

//Handle URL not found
app.use(function(req, res) {
      res.status(404).send({url: req.originalUrl + ' not found'})
})

//Start APP on Port 4000
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`));
```

Trong file này, chỉ đơn giản mình dùng các thư viện `express`, `dotenv`, `apollo-server-express` để xử lý tạo và quản lý server. 

### 3.4 Review cấu trúc thư mục
Sau 1 hồi thì mình đã có được 1 thư mục như này:
![](https://images.viblo.asia/56342c63-c127-4c1a-a2ca-7beae62163d7.png)

Okey, Giờ đến phần testing.
## IV. Testing API
### 4.1. Get All Products
Request:
```js
{
  products {
    id,
    name,
    color,
    price
  }
}
```

Response: 
![](https://images.viblo.asia/f6fb432b-f0f8-447e-8a75-e135a7d1b561.png)

### 4.2. Get Product Detail
Request:
```js
{
  product(id: 2){
    name,
    color,
    price
  }
}
```

Response:
![](https://images.viblo.asia/47f448a5-9df7-4eeb-ac2c-1f8c39e5bfc7.png)
 
###  4.3. Create Product
Request
 ```js
mutation {
  createProduct(
    name: "iPhone 11",
    color: "Black",
    price: "14000000",
  )
}
 ```
 Response:
 ![](https://images.viblo.asia/112ab9d3-642e-4965-a763-ecc72e605d02.png)

###  4.4. Update Product
Request
 ```js
 mutation {
  updateProduct(
    id: 1,
    name: "iPhone X",
    color: "White",
    price: "20000000",
  )
}
 ```
 Response:  
 ![](https://images.viblo.asia/4526f9ca-d455-421e-abd1-93834c7fe85b.png)
 
 ### 4.5. Delete Product
 ```js
  mutation {
  deleteProduct(
    id: 1
  )
}
 ```
 
 Response:
 ![](https://images.viblo.asia/a2a7dcb9-8443-441e-af6a-94208d6fe3e8.png)

 
##  V. Tài liệu tham khảo
1. https://graphql.org/
2. https://sequelize.org/master/manual/getters-setters-virtuals.html#combining-getters-and-setters
3. https://graphql.org/graphql-js/mutations-and-input-types/
4. https://blog.logrocket.com/from-rest-to-graphql/
5. https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize

## VI. Kết luận
Như vậy mình đã hướng dẫn và demo cho các bạn cách tạo Restfull API - CRUD với `GraphQL`, hy vọng sau bài này các bạn cũng có thể tự tạo được project cho riêng mình sử dụng `GraphQL`.

Hẹn gặp mọi người tại bài viết sau :D