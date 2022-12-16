# Giới thiệu
Ở [phần trước](https://viblo.asia/p/nodejs-api-voi-faas-tren-firebase-cloud-functions-authentication-bJzKmR0OZ9N), chúng ta đã xây dựng xong phần Authentication cho API hoạt động trên Firebase Cloud Functions, trong phần này, chúng ta sẽ tiếp tục xây dựng API theo GraphQL và Firebase Realtime DB

Stack sử dụng lần này:
1. Authentication Module có được từ phần trước
2. Firebase Cloud Functions: Serverless (FaaS) Platform
3. Firebase Realtime Database
4. Express: Nodejs framework (router, middleware)
5. Apollo Server: GraphQL server tools

# Tìm hiểu và cài đặt
## GraphQL
Để bắt đầu, chúng ta sẽ tìm hiểu xem GraphQL là cái quần què gì trước đã phải không các bạn?
Ở trên viblo đã có nhiều bài giải thích rất cụ thể và dễ hiểu rồi, nên mình sẽ giải thích một cách ngắn gọn trong phạm vi bài viết này thôi.
Các bạn có thể đọc [bài viết này](https://viblo.asia/p/cung-tim-hieu-ve-graphql-07LKX4zeKV4) để hiểu rõ hơn về GraphQL nhé :D
Mình sẽ tóm tắt lại bằng cách trích dẫn những ý chính của bài viết **[Cùng tìm hiểu về GraphQL](https://viblo.asia/p/cung-tim-hieu-ve-graphql-07LKX4zeKV4)**

### Vậy GraphQL là gì? ### 
GraphQL là một Graph Query Language được dành cho API. Nó được phát triển bởi Facebook. GraphQL từ khi ra đời đã gần như thay thế hoàn toàn REST bởi sự hiệu quả, mạnh mẽ và linh hoạt hơn rất nhiều.

### GraphQL khác REST ở chỗ nào?
### 
Vấn đề mà REST đang gặp phải là nó việc phản hồi dữ liệu của REST trả về quá nhiều hoặc là quá ít. Trong cả 2 trường hợp thì hiệu suất của ứng dụng đều bị ảnh hưởng khá nhiều. Giải pháp mà GraphQL đưa ra là cho phép khai báo dữ liệu nơi mà một client có thể xác định chính xác dữ liệu mà mình cần từ một API.

Hơn nữa, thay vì có nhiều endpoint như REST, GraphQL chỉ có duy nhất một endpoint. Hai phía Client và Server tương tác với nhau thông qua giao thức POST

### GraphQL Schema Definition Language (SDL) ### 
Để Client và Server có chung sự thống nhất và hiểu nhau, chúng ta cần phải định nghĩa Schema để xem Client có thể truy cập được những dữ liệu gì tương tự Server trả về cho client những dữ liệu như thế nào.
Ví dụ Schema của User
```
type Clothes {
    name: String!
    style: String!
  }
```
(Dấu ! nghĩa là field của schema sẽ required)
### Fetching Data (Query) và Mutation
Client sẽ phải chỉ ra những field nào cần thiết để gửi cho Server

Ví dụ
```graphql
{
    clothes {
        name
        style
    }
}
```

Mutations là cách client truyền dữ liệu lên cho Server để thực hiện thao tác: Create, Update, Delete

Ví dụ:
```
mutation {
     addClothes(name:"adidas_ultraboost", style:"sport") {
         name
     }
}
```

Trên đây là một số khái niệm cần sử dụng trong bài viết này, bây giờ đi vào code các bạn nhé :D
## Dependencies
Ngoài init firebase như các bài viết ở phần trước, lần này chúng ta cần cài thêm một số thư viện nữa
```
npm install express
npm install graphql
npm install apollo-server-express
```

Thêm các thư viện cần thiết vào file `index.js`
```javascript
const functions = require("firebase-functions")
const express = require('express')
const firebaseAdmin = require('firebase-admin')
const productValidate = require('./validate/product.store')
const { ApolloServer, gql } = require("apollo-server-express");
/* Express */
const app = express()
// for cloud
firebaseAdmin.initializeApp(functions.config().firebase)
.
.
.
const api = functions.https.onRequest(app)
module.exports = {
  api,
}
```
## Định nghĩa Schema cho Apollo Server
```javascript
const typeDefs = gql`
  type Clothes {
    name: String
    style: String
  }
  type Query {
    clothes: [Clothes]
  }
  type Mutation {
    addClothes(name: String!, style: String!): Clothes
  }
`;
```
Mình sẽ định nghĩa một schema là Clothes. Trong Query sẽ có `clothes` trả về mảng Clothes, tương tự Mutation sẽ có method `addClothes`
## Định nghĩa resolver cho Apollo Server
```javascript
const resolvers = {
  Query: {
    clothes: () =>
      firebaseAdmin.database()
      .ref("clothes")
      .once("value")
      .then(snap => snap.val())
      .then(val => Object.keys(val).map(key => val[key]))
  },
  Mutation: {
    addClothes: async (root, args) => {
      const clothes = {name: args.name, style: args.style}
      await firebaseAdmin.database().ref("clothes").push(clothes)
      return clothes
    }
  }
};
```

Tương tự typeDef, Resolver sẽ cho Apollo Server biết nơi lấy dữ liệu.
1. **clothes**: Để fetch toàn bộ data từ Firebase về, vì GraphQL cần dữ liệu kiểu mảng trong khi Firebase trả về Object vì vậy chúng ta cần biến đổi một chút
2. **addClothes**: Thêm một bản ghi vào Firebase

Sau cùng chúng ta sẽ tạo một 1 instance của ApolloServer, sau đó apply vào express app
```javascript
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/products", cors: true });
```

File index.js hoàn chỉnh lúc này:
```javascript
const functions = require("firebase-functions")
const express = require('express')
const firebaseAdmin = require('firebase-admin')
const productValidate = require('./validate/product.store')
/* Express */
const app = express()

// for cloud
firebaseAdmin.initializeApp(functions.config().firebase)

const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Clothes {
    name: String
    style: String
  }
  type Query {
    clothes: [Clothes]
  }
  type Mutation {
    addClothes(name: String!, style: String!): Clothes
  }
`;

const resolvers = {
  Query: {
    clothes: () =>
      firebaseAdmin.database()
      .ref("clothes")
      .once("value")
      .then(snap => snap.val())
      .then(val => Object.keys(val).map(key => val[key]))
  },
  Mutation: {
    addClothes: async (root, args) => {
      const clothes = {name: args.name, style: args.style}
      await firebaseAdmin.database().ref("clothes").push(clothes)
      return clothes
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/products", cors: true });

const api = functions.https.onRequest(app)

module.exports = {
  api,
}
```

Chúng ta bắt đầu deploy bằng cách sử dụng command `firebase deploy --only functions`
# Thử nghiệm
Sau khi deploy thành công chúng ta có thể sử dụng một số tool GraphQL client như GraphiQL, Postman
Mình sẽ sử dụng Postman để test thử các bạn nhé :D
Như mình đã trình bày ở trên thì Client và phía Server giao tiếp với nhau qua phương thức POST, vì vậy chúng sẽ setting cho Postman tương tự hình dưới đây:
![](https://images.viblo.asia/be1fb901-9060-4554-8408-406146c187ca.png)
## Mutation
Mình sẽ thêm một bản ghi vào DB và get lại tên bằng GraphQL query như hình dưới đây
![](https://images.viblo.asia/29d82a37-236b-4583-b7f4-46c3bafe4154.png)

## Query
Lấy toàn bộ thuộc tính `name` của tất cả bản ghi
![](https://images.viblo.asia/9f09eb7d-ab22-41e0-84b1-46b724b04bc4.png)

Lấy thêm cả thuộc tính style nữa
![](https://images.viblo.asia/363e7103-7aec-4549-a6e6-6db3af5a3197.png)

# Kết
Trên đây là bài tìm hiểu của mình về các dịch vụ của Google Firebase với Nodejs và kết hợp thêm một số thành phần khác mà mình tìm hiểu được. Ngoài những dịch vụ mình sử dụng 3 bài vừa rồi còn rất nhiều dịch vụ khác để tìm hiểu và áp dụng, hẹn gặp các bạn ở các bài viết sau :laughing: