![](https://images.viblo.asia/27c4d57b-fbbd-43ab-8ed5-5c721953e5d4.png)

Xin chào tất cả mọi người, ở bài viết trước chúng ta đã cùng nhau tìm hiểu xem GraphQL là cái gì, và để tiếp nối seri về GraphQL hôm nay chúng ta sẽ cùng đi tìm hiểu về các khái niệm cơ bản khi làm việc với GraphQL.

### Schema Definition Language 
GraphQL có hệ thống type riêng của nó được sử dụng để xác định schema (đồ hình) của một API. Cú pháp để viết schema được gọi là Schema Definition Language  (SDL).

Ví dụ để định nghĩa type User:
```
type User {
  name: String!
  age: Int!
}
```
Thoạt nhìn SDL có vẻ tương tự như Javascript, nhưng cú pháp này phải được lưu trữ dưới dạng String. 

Điều quan trọng cần lưu ý là các khai báo này thể hiện cấu trúc của dữ liệu để trả về và các relation giữa model với nhau, không phải nơi dữ liệu đến hoặc cách dữ liệu được lưu trữ - sẽ được cover bên ngoài SDL.

Chúng ta cũng có thể định nghĩa relation giữa các type với nhau, ví dụ User có liên kết với Post:
```
type Post {
  title: String!
  author: User!
}

type User {
  name: String!
  age: Int!
  posts: [Post!]!
}
```
Và chúng ta vừa định một quan hệ 1-nhiều giữa User và Post bời trường posts trong type User là 1 array.

### Queries
Với REST, data là những endpoint cụ thể. Mỗi endpoint có cấu trúc data xác định. Điều này có nghĩa rằng các request của một client được encode một cách hiệu quả trong URL mà nó kết nối tới.

Cách tiếp cận được thực hiện trong GraphQL thì hoàn toàn khác. Thay vì có nhiều endpoint trả về cấu trúc dữ liệu cố định, API GraphQL thường chỉ hiển thị một endpoint duy nhất. Điều này hoạt động vì cấu trúc của dữ liệu được trả về không cố định. Thay vào đó, nó hoàn toàn linh hoạt và cho phép client quyết định dữ liệu nào thực sự cần thiết.

Điều đó có nghĩa là client cần gửi thêm thông tin đến máy chủ để thể hiện nhu cầu dữ liệu của mình - thông tin này được gọi là Query.

Chúng ta cùng xem một truy vấn mẫu mà client có thể gửi đến server:
```
query {
  allUsers {
    name
  },
  allPosts {
     title
  }
}
```
Để xác định những truy vấn nào có thể trên server, `Query` type sẽ được định nghĩa bằng SDL trên server. `Query` type là một trong những root-level type xác định chức năng (nó không thực sự kích hoạt truy vấn) cho client và hoạt động như một entry-point cho các type cụ thể trong schema.

Để client có thể sử dụng query phía trên, thì ở server chúng ta phải định nghĩa type Query tương ứng:
```
type Query {
  allUsers: [User]
  allPosts: [Post]
}
```
Trong đó:
- allUsers: trả về list User objects.
- allPosts: trả về list Post objects.

Với những người đã quen với REST, sẽ thấy việc định nghĩa này tương tự như việc định nghĩa các endpoint (e.g. */api/users* và */api/posts*), nhưng GraphQL cho phép chúng được truy vấn và trả về cùng một lúc.

Như đã đề cập trong phần trên, cấu trúc của các type được xác định bởi SDL là quan trọng vì các relation mà nó tạo ra. Khi một client thực hiện một query đến server, server sẽ trả về kết quả trong một dạng khớp với query. Trong ví dụ, query là:
```
query {
  allUsers {
    name
  },
  allPosts {
     title
  }
}
```
chúng ta sẽ nhận được kết quả, tương ứng với nó có dạng
```
{
  "data": {
    "allUsers": [
      {
        "name": "..."
      },
      ...
    ],
    "allPosts": [
      {
        "title": "..."
      },
      ...
    ]
  }
}
```

Nhờ có relation giữa Post và User, được xác định trong SDL ở trên, chúng ta còn có thể tạo ra request để lấy post đồng thời có chứa User tạo ra nó:
```
query {
  getPosts {
    title
    user {
      name
    }
  }
}
```
Mà sẽ trả về dữ liệu cho client là:
```
{
  "data": {
    "getPosts": [
      {
        "title": "..."
        "user": {
          "name": "..."
        }
      },
      ...
    ]
  }
}
```
Trong GraphQL, mỗi field có thể có đối số nếu được chỉ định trong schema:
```
type Query {
  allUsers(search: String): [User]
}
```
và trong query chúng ta có thể gửi kèm đối số:
```
{
  allUsers(search: 'Bob') {
    name
  }
}
```
làm thế nào để server có thể xử lý được các đối số kia, chúng ta sẽ chờ đến các khái niệm tiếp theo.

### Mutations
Bên cạnh yêu cầu data từ server, phần lớn ứng dụng cũng cần một số cách để thực hiện thay đổi đối với dữ liệu hiện được lưu trữ trong ở backend. Với GraphQL, những thay đổi này được thực hiện bằng cách sử dụng `mutations`. Nói chung có ba loại mutations:
- Tạo dữ liệu mới
- Update dữ liệu
- Xóa dữ liệu

Giống như cách query định nghĩa các entry-point cho hành động tìm dữ liệu trên GraphQL server, Root-Mutation cũng cung cấp entry-point cho các thao tác thay đổi dữ liệu.
```
type Mutation {
  addUser(name: String!, age: Int!): User
  addPost(title: String!, user: String!): Post
}
```

Chúng ta sẽ không đi sâu vào đối số và `Types`, điều quan trọng ở đây là những mutation này sẽ trả về một object của type vừa mới tạo.
Và cũng tương tự như query mà client gửi cho server, trong cú pháp mutation chúng ta chỉ định các trường cần nhận về trong kết quả. Chỉ có khác cú pháp bắt đầu bằng `mutation`:
```
mutation {
  addPost(title: "Fox in Socks", user: "Dr. Seuss") {
    title
    user {
      name
    }
  }
}
```
và kết quả của mutation này sẽ là:
```
{
  "data": {
    "addPost": {
      {
        "title": "Fox in Socks",
        "user": {
          "name": "Dr. Seuss"
        }
      }
    }
  }
}
```
Nhiều mutation có thể được gửi trong cùng một yêu cầu, tuy nhiên chúng sẽ được thực hiện theo thứ tự chúng được cung cấp (theo chuỗi), để tránh các race-conditions.

### Resolves
Đọc từ đầu đến giờ chắc mọi người sẽ tự hỏi, làm thế nào mà GraphQL có thể hiểu và tìm đc data của những type đã định nghĩa ra. Graphql đưa ra một khái niệm gọi là `resolve`. Với mỗi field trong schema đều cần định nghĩa resolve của mình. 

Resovle là một function, dùng để định nghĩa cách lấy dữ liệu (fetch từ API, từ DB...) về field mà nó chịu trách nhiệm.
Một resovle thường được định nghĩa như sau:
```javascript
const resolvers = {
 // resovle for query
  Query: {
    users: (parent, args, context) => fetchFromSomeWhere(), // [{name: ..., age: ...}, ...]
  },
  // resolve for user type
  User: {
    name: (root) => root.name,
    age: (root) => root.age,
  }
}
```

Một resolve sẽ nhận được 3 param `(parent, args, context)` (trong một số thư viện GrapQL Server sẽ là 4) và có thể trả lại một Object hoặc Promise. 

Các tham số của resolve thường tuân thủ quy ước đặt tên này và có ý nghĩa như sau:
- `parent`: Là Object chứa kết quả được trả về từ resolve của trường cha hoặc trong trường hợp của top-level Query field , rootValue sẽ được truyền từ cấu hình máy chủ (thường không được sử dụng). Param này cho phép tính chất lồng nhau của truy vấn GraphQL.
- `args`: Object với các param được truyền vào trường trong Query. Ví dụ, nếu trường được gọi với `query{ user(id: 1) }` thì `args` object sẽ là `{id: 1}`
- `context`: Một giá trị được truyền cho mọi resolve và lưu giữ thông tin ngữ cảnh quan trọng như người dùng hiện đã đăng nhập hoặc truy cập vào cơ sở dữ liệu.

Thực tế, nhiều thư viện GraphQL sẽ cho phép chúng ta bỏ qua việc phải định nghĩa resovle cho type User như ở ví dụ trên, chỉ giả định rằng nếu một resovel không được cung cấp cho một trường, thì một thuộc tính có cùng tên sẽ được đọc và trả về.

### Kết
Chúng ta sẽ tạm kết thúc bài viết ở đây. Qua bài lần này hi vọng mọi người năm đc một chút thành phần cơ bản của 1 GrapQL server. GraphQL còn rất nhiều khái niệm liên quan khác nữa như hệ thống `Type`, `Directives` mọi người có thể tìm hiểu thêm tại https://graphql.org/learn.

Hẹn gặp lại các bạn trong bài viết tiếp theo, chúng ta sẽ cùng thử tạo một server GraphQL không đơn giản lắm :laughing: 

### Source
https://graphql.org/learn
https://www.howtographql.com/basics/2-core-concepts/