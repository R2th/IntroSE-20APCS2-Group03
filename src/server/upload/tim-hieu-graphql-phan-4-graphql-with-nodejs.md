Trở lại với GraphQL nào :v: 

Trong bài viết này, mình sẽ trình bày cách xây dựng một máy chủ GraphQL với `graphql-yoga`

### graphql-yoga

Máy chủ GraphQL đầy đủ tính năng với trọng tâm là thiết lập dễ dàng, hiệu suất và nâng cao trải nghiệm. 

Graphql-yoga được xây dựng trên một loạt các gói khác, chẳng hạn như graphql.js, express và apollo-server.

Mỗi một trong số này cung cấp một phần chức năng nhất định cần thiết để xây dựng một máy chủ GraphQL.


##  Bắt đầu nào

### Creating the project

```
mkdir demo_graph_node
cd demo_graph_node
npm init -y
```

```
mkdir src
touch src/index.js
```

```
npm install graphql-yoga
```

Một số tính năng của graphql-yoga
- Tuân thủ đặc tả GraphQL
- Hổ trợ upload file
- Realtime với GraphQL subscriptions
- .....

### Hello world

> src/index.js

```
const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
}
`
const resolvers = {
  Query: {
    info: () => `Hello world`
  }
}
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
```

 Hằng số `typeDefs` định nghĩa lược đồ GraphQL của bạn. Ở đây, nó định nghĩa một Query type đơn giản với một field được gọi là `info`, field này có kiểu String !.
 
 Đối tượng `resolvers` là việc triển khai thực tế lược đồ GraphQL. Như đã nói ở trước, thì mỗi field cần một resolver cho nó.
 
 Cuối cùng, `GraphQL schema` và các `resolvers` được đóng gói và chuyển tới `GraphQLServer` được import từ `graphql-yoga`. Điều này cho máy chủ biết các hoạt động API được chấp nhận và cách chúng được giải quyết.
 
 Kiểm tra xem chạy được chưa nào :)
 
```
node src/index.js
```

`http://localhost:4000` nhé. Những gì bạn sẽ thấy là một GraphQL Playground, một `GraphQL IDE` mạnh mẽ cho phép bạn khám phá các khả năng của API của bạn một cách trực quan.

Thử truy vấn xem

```
query {
  info
}
```

![](https://images.viblo.asia/93f6e2c7-8e8f-4b73-998e-25f642aacb8b.png)

Xong, chạy được rồi :)

### A Simple Query 

Trong index.js, cập nhật hằng số `typeDefs` như sau:

> index.js

```
const typeDefs = `
type Query {
  info: String!
  users: [User!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
}
`
```

Ở đây mình định nghĩa một type mới là `User` với các field: id, name, email, password. Đồng thời cũng định nghĩa một field  `users` trong type Query để trả về danh sách tất cả users

 Bước tiếp theo là triển khai `resolver` cho query `users`.

Trong index.js, thêm một danh sách mới với dữ liệu giả và cập nhật `resolvers` như sau:

> index.js

```
let users = [{
  id: '1',
  name: 'Nara-1',
  email: 'nara-1@jang',
  password: '123456'
}]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    users: () => users,
  },

  User: {
    id: (root) => root.id,
    name: (root) => root.name,
    email: (root) => root.email,
    password: (root) => root.password,
  }
}
```

Biến `users` được sử dụng để lưu trữ các user trong thời gian chạy. Hiện tại, mọi thứ chỉ được lưu trữ trong bộ nhớ thay vì được lưu giữ trong cơ sở dữ liệu. (Phần kết nối CSDL mình sẽ trình bày trong bài viết sau hehe)

Chạy lại server nào :v: 

![](https://images.viblo.asia/4f0a97c8-5c06-4172-9ebc-9e7defd9c6ea.png)

Ok rồi :)

 Bây giờ, mình sẽ nói về cách mà máy chủ GraphQL thực sự giải quyết các truy vấn đến.
 
 Như các bạn đã thấy, một truy vấn GraphQL bao gồm một số `fields` nằm trong các `type definitions` của  `GraphQL schema`.
 
 Ví dụ như truy vấn ở trên:
 
```
 query {
    users {
      id
      name
      email
    }
}
```

Tất cả cá trường được chỉ định trong truy vấn: `id`, `name` và `email` cũng có thể được tìm thấy bên trong định nghĩa lược đồ.

Mọi trường bên trong định nghĩa `schema` được hỗ trợ bởi một hàm `reslover` có trách nhiệm trả về dữ liệu cho chính xác trường đó.

Việc mà máy chủ GraphQL phải làm là gọi tất cả các `resolvers` cho các `field` được chứa trong truy vấn và sau đó đóng gói phản hồi theo hình dạng của truy vấn.


### A Simple Mutation

Giống như trước đây, bạn cần phải bắt đầu bằng cách thêm type mới vào định nghĩa lược đồ GraphQL của bạn.

> index.js

```
const typeDefs = `
 type Query {
    ....
 }

type Mutation {
  sign_up(name: String!, email: String!, password: String!): User!
}

type User {
  ...
}
`
```

Bạn có thể thấy định nghĩa GraphQL schema có vẻ đã quá lớn, đã đến lúc tách nó ra 1 file riêng

```
touch src/schema.graphql
```

> src/schema.graphql

```
type Query {
  info: String!
  users: [User!]!
}

type Mutation {
  sign_up(name: String!, email: String!, password: String!): User!
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
}
```

Sửa lại index.js một tí:

> index.js

```
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
```

 Một điều thuận tiện về constructor của GraphQLServer là typeDefs có thể được cung cấp trực tiếp dưới dạng một chuỗi (như bạn đã làm) hoặc bằng cách tham chiếu một tệp có chứa định nghĩa lược đồ của bạn (đây là những gì bạn đang làm bây giờ).
 
 Bước tiếp là triển khai `resolver` cho Mutation `sign_up` mới tạo:
 
 > index.js
 
```
 const resolvers = {
  Query: {
    ....
  },

  User: {
    ...
  },

  Mutation: {
    sign_up: (root, args) => {
       const user = {
          id: `${idCount++}`,
          name: args.email,
          email: args.email,
          password: args.password
      }
      users.push(user)
      return user
    }
  }
}
```

Chỉ là minh họa thôi nhé :v: 

Chạy lại server tí:

![](https://images.viblo.asia/7d41b7fe-9815-4349-8f53-e55312ae1477.png)

Lên sóng rồi, test thôi!

![](https://images.viblo.asia/f166d6f3-57db-47ef-a7e2-12164ca52fc4.png)

Như vậy đã xong, ở bài viết này mình đã trình bày cách tạo một GraphQL server đơn giản với graphql-yoga.

Hẹn gặp lại các bạn ở bài viết sau!



-----
## Mr.Nara