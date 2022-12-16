Chào các bạn!
Tiếp tục với series xây dựng forum bằng GraphQL, React, Apollo và Prisma.

Các bạn có thể xem phần trước ở [đây](https://viblo.asia/p/fullstack-xay-dung-forum-bang-graphql-react-apollo-va-prisma-part-1-application-introduction-and-technologies-overview-vyDZODARlwj). Ở phần này, mình sẽ setup project ở tầng backend (Graphql) dựa trên một template có sẵn của [graphql-boilerplates](https://github.com/graphql-boilerplates/node-graphql-server) (Một template được build dựa trên graphql-yoga, prisma, prisma-binding. Đúng với stack mà chúng ta đang theo đuổi)

Lưu ý là mình chỉ xây dựng dựa trên cấu trúc của template trên. Do đó, toàn bộ quá trình xây dựng sẽ được build from scratch :D 

## Tạo mới project

```
mkdir forum-graphql
cd forum-graphql

yarn init -y
```

Nếu không muốn sử dụng yarn thì các bạn cũng có thể sử dụng `npm` như bình thường.

Sau khi chạy `yarn init -y` thì một file có tên là `package.json` sẽ được sinh ra trong folder `forum-graphql`, file này là file cấu hình của toàn bộ nodejs app. Nó chứa tất cả các dependencies, scripts và một số options khác cần thiết cho app.

## Tạo Graphql Server

Tiếp theo là khởi tạo file index.js. 

Tại `forum-graphql/`
```
mkdir src
touch src/index.js
```

Install `graphql-yoga`
```
yarn add graphql-yoga
```

Chúng ta setup server như sau:

Tại `forum-graphql/src/index.js`
```
const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
}
`

const resolvers = {
  Query: {
    info: () => `This is the API of a Forum GraphQL`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
```


1. `typeDefs` để khởi tạo GraphQL Schema. Ở đây mình khởi tạo 1 schema có type là `Query` và field là `info` có kiểu dữ liệu là `String!`. Dấu chấm than ở cuối có nghĩa là field này không chấp nhận giá trị  `null`.


3. `resolvers` Object này để implementation cho thằng Schema được định nghĩa ở trên. Hình dung là mọi hoạt động, logic sẽ được viết trong object này. 


5. `server` Object server chính của app.

## Testing Server

Khởi động server bằng cách run command:

Tại `forum-graphql/`
```
node src/index.js
```

Trên màn hình console sẽ hiển thị `http://localhost:4000`.  Để test API, mở browser và truy cập vào đường URL trên.
Sau khi truy cập vào URL `http://localhost:4000`, hiển thị trước mắt các bạn là giao diện của [GraphQL Playground](https://github.com/prisma/graphql-playground)  (IDE này chuyên để test GraphQL API, về mục đích sử dụng thì nó giống như postman của RESTful API) 

![](https://images.viblo.asia/6a90ef9f-bc70-46b2-9695-d5422c09d5a6.png)

Click vào Button Schema bên góc bên phải, lúc này mọi thông tin của GraphQL Schema sẽ được hiển thị. Mình rất thích IDE này, bởi vì không chỉ đơn thuần để test API, IDE này giống như 1 documentation thực sự, giúp cho lập trình viên dễ dàng hơn trong việc viết Query.

![](https://images.viblo.asia/f0efb7ee-e71a-4027-bc1a-82d4673bf33e.png)

OK, giờ hãy thử viết câu query đầu tiên:
```
query {
  info
}
```
Execute bằng cách click **Play** button ở giữa hoặc **CMD+ENTER**

![](https://images.viblo.asia/0ddbd84e-38f5-4799-b123-04e6e0eab7f0.png)

Done, chúc mừng bạn đã thực hiện thành công câu GraphQL Query đầu tiên. 

Như mình đã giải thích ở phần trên. Sau khi định nghĩa Schema ở `typeDefs`, chúng ta implement nó bằng cách viết các hàm trong `resolvers`.  Đối với `resolvers`, chúng ta có thể control hoặc tuỳ biến giá trị mà chúng ta muốn trả về, miễn sao phù hợp với kiểu dữ liệu của field mà chúng ta return. Ví dụ Schema trên, field `info` chỉ chấp nhận dữ liệu trả về là `String!`, dấu `!` có nghĩa là giá trị đó không thể `null`.

Vậy thì điều gì sẽ xảy ra nếu chúng ta return về `null` ?
Tại `forum-graphql/src/index.js`, edit lại như sau:

```
const resolvers = {
  Query: {
    info: () => null,
  }
}
```

Sau đó run lại câu query trên (Lưu ý là chúng ta phải khởi động lại server trước khi send Query nhé, **CTRL+C** => `node src/index.js`)

![](https://images.viblo.asia/c8cee167-193f-4a7d-93a3-28ca46ba3e03.png)

Như các bạn có thể thấy, mọi giá trị trả đều phải tuân thủ và xoay quanh Schema. Điều này giảm thiểu tối đa những sai lầm từ lập trình viên.

## Bản chất của GraphQL Schema 

> Cốt lõi của GraphQL API là GraphQL Schema


Thật vậy, mọi logic và luồng hoạt động của GraphQL API đều dựa trên những định nghĩa của GraphQL Schema.
Mình sẽ nói chi tiết về GraphQL Schema ở phần này để mọi người hiểu rõ hơn, phục vụ cho những phần tiếp theo của series.

Mỗi GraphQL Schema bao gồm 3 root types: ***Query***, ***Mutation*** và ***Subscription***. 
3 loại root types này tương ứng với 3 toán tử trong GraphQL: ***queries***, ***mutations*** and ***subscriptions***.


Để dễ hình dung thì mình xin đưa ra một ví dụ như sau:

```
type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!): User!
}

type User {
  id: ID!
  name: String!
}
```

Trong trường hợp này, chúng ta có 3 root fields: `users`, `user` và `createUser`. Tất cả các field trong `Query`, `Mutation` và `Subscription` đều là root field.  Type  `User` ở dưới cùng chỉ để định nghĩa cho `[User!]!` trong type `Query` mà thôi.

* `users: [User!]!` field này trả về danh sách bao gồm các object `User`. Kiểu dữ liệu `[User!]!` (cách viết này của scalar type) có nghĩa là array bao gồm các object `User` và không được phép null.  
Ví dụ, dữ liệu trả về có dạng `[null, { name: 'Alex' }, null]`, `[null]` sẽ vi phạm điều kiện của schema.
Điều này ngăn chặn việc return về những array null hoặc array bao gồm những object null.


* `user(id: ID!): User` field này trả về single object `User` hoặc `null` và nhận vào 1 parameter `id` với type `ID!` (required). Trả về một user với `id` là parameter vừa truyền vào. Dữ kiểu trả về là `User` object.

* `createUser(name: String!): User!` field này là function operation dùng để tạo mới user. Nhận vào 1 parameter là `name` và luôn luôn trả về `User` object vừa tạo. 


Dưới đây là `Query` và `Mutation` cho Schema vừa khởi tạo ở trên:

```
# Query for all users
query {
  users {
    id
    name
  }
}

# Query a single user by their id
query {
  user(id: "user-1") {
    id
    name
  }
}

# Create a new user
mutation {
  createUser(name: "Thuan") {
    id
    name
  }
}
```

Mỗi 1 câu GraphQL Query truy vấn ở trên đều return về `id` và các field được định nghĩa trong Schema. Chúng ta cũng có thể bỏ return `id` hoặc các field khác nhưng phải đảm bảo rằng có ít nhất 1 field được trả về.

## Lời kết
Ở phần sau, mình sẽ đi vào Query và Mutation một cách chi tiết hơn.

Cảm ơn mọi người đã đọc bài!