## 1. Ngôn ngữ định nghĩa Schema - The Schema Definition Language (SDL)
* Như đã nói ở những bài viết trước về GraphQL, GraphQL sử dụng  **Schema** như là một bản hợp đồng giữa Client và Server, một bản "quy chuẩn ngôn ngữ" giữa Client và Server, Client có thể dùng những cái định nghĩa trong Schema để gửi lên server lấy dữ liệu từ server và server cũng dựa vào đó để có thể biết mình làm gì và trả về kết quả gì cho Client.
* GraphQL có một ngôn ngữ riêng để định nghĩa Schema. Đó  là **Schema Definition Language** (**SDL**)
* Ví dụ chúng ta có thể sử dụng **SDL** để định nghĩa một simple type `Person`:
    ```php
    type Person {
      name: String!
      age: Int!
    }
    ```
type này có 2 trường, `name` và `age` tương ứng thuộc loại **String** và **Int**. Dấu **!** theo sau kiểu dữ liệu có nghĩa là trường này là **required**
* Chúng ta cũng có thể mô tả mối quan hệ (relationship) giữa 2 trường. Ví dụ về một ứng dụng blog, một **Person** có thể có nhiều bài **Post**
    ```php
    type Post {
      title: String!
      author: Person!
    }
    ```
* Ngược lại, ta khai báo type **Person** và đặt vào một chiều của mối quan hệ:
    ```php
    type Person {
      name: String!
      age: Int!
      posts: [Post!]!
    }
    ```
Như bên trên, ta đã tạo một mối quan hệ *one-to-many* giữa `Person` và `Post` bởi trường `posts` trong type `Person` là một mảng các `Post`.
* Khai báo mối quan hệ như này giúp cho Client có thể chỉ định các cấu trúc query lồng nhau, như vậy có thể lấy được toàn bộ dữ liệu mình cần chỉ trong một endpoint và không phải dùng nhiều endpoint như REST.
* Để biết thêm về các cú pháp khác của SDL, tham khảo: https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51
## 2. Fetching Data với Queries.
* Khi làm việc với REST APIs, dữ liệu được load từ những endpoint được chỉ định. Mỗi endpoint có một cấu trúc được định nghĩa rõ ràng về những thông tin mà nó trả về.
* Đối với cách tiếp cận của GraphQL, thay vì có nhiều endpoints trả về dữ liệu cố định, GraphQL APIs chỉ dùng 1 endpoint và để cho người dùng có thể quyết định data thực sự cần để trả về. Do đó Client cần phải gửi nhiều thông tin hơn tới server để diễn tả yêu cầu về data, thông tin đó được gọi là **query**
* Ví dụ về một query mà client có thể gửi tới server
    ```js
    {
      allPersons {
        name
      }
    }
    ```
    `allPersons` được gọi là **root field** của query. Mọi thứ theo sau root field được gọi là **payload** của query. Ở đây chỉ có 1 field được chỉ định trong query payload là field `name`
* Câu query trên sẽ trả về danh sách tất cả các Person với tên của nó:
    ```js
    {
      "allPersons": [
        { "name": "Johnny" },
        { "name": "Sarah" },
        { "name": "Alice" }
      ]
    }
    ```
    Mỗi một person chỉ có trường name trong response trả về, trường `age` không trả về vì nó không cần thiết đối với Client. 

    Nếu Client cũng cần trường `age`, tất cả những gì Client phải làm là điều chỉnh câu query và thêm trường vào payload.
    ```js
    {
      allPersons {
        name
        age
      }
    }
    ```
*  Một trong những lợi thế lớn của GraphQL là nó cho phép truy vấn lồng nhau một cách tự nhiên. Ví dụ, bạn muốn load tất cả các bài `posts` của một `Person`, bạn có thể viết query như sau:
    ```js
    {
      allPersons {
        name
        age
        posts {
          title
        }
      }
    }
    ```
    Server sẽ trả về response như sau:
    ```js
     {
       "allPersons": [
           { 
            "name": "Binz",
            "posts": [
               { "title": "GraphQL is awesome" },
               { "title": "Relay is a powerful GraphQL Client"}
             ]
           },
           { 
            "name": "Karik",
            "posts": [
                { "title": "Let's get started with React & GraphQL" },
             ]
           },
           { 
            "name": "Suboy",
            "posts": []
           }                 
       ]
    }
    ```

* **Queries với Arguments**:
Trong GraphQL, mỗi field có thể có không hoặc nhiều tham số. Ví dụ, field `allPersons`
có thể có tham số `last` để chỉ trả về một số lượng nhất định person.
    ```
    {
      allPersons(last: 2) {
        name
      }
    }
    ```
###  3. Writing Data with Mutations.
* Bên cạnh việc request data từ server, phía Client cũng cần phải making some changes tới data được lưu ở phía backend. Với GraphQL, ta có thể sử dụng **mutations** để làm điều đó. Nói chung, có 3 loại **mutations**:
    * tạo mới data
    * cập nhật data đã tồn tại
    * Xóa data đã tồn tại.
* **Mutations** tuân theo cấu trúc cú pháp giống như **queries**, tuy nhiên nó *luôn luôn phải bắt đầu với keyword* **mutation**. Ví dụ chúng ta tạo mới một `Person`:
    ```js
    mutation {
      createPerson(name: "Sam", age: 23) {
        name
        age
      }
    }
    ```
* Tương tự với query, mutation cũng có một **root field**, ở đây là **createPerson**. Ở đây field `createPerson` nhận vào 2 tham số là `name` và `age`.
* Theo sau root field `createPerson` là **payload** cho mutation, ở đây là 2 trương `name` và `age`, là chỉ định dữ liệu trả về phía server. Với mutation trên, Server sẽ trả về response như sau:
    ```js
    "createPerson": {
      "name": "Sam",
      "age": 23,
    }
    ```
## 4. Realtime Với Subscriptions
* Một yêu cầu đối với nhiều ứng dụng hiện nay là tính realtime với server, cho phép nhận được thông báo ngay lập tức về các sự kiện quan trọng. Đối với trường hợp này GraphQL cung cấp khái niệm **subscriptions**.
* Khi một Client subscribes một event, một kết nối tới máy chủ sẽ được khởi tạo và giữ ổn định. Khi có một event cụ thể nào diễn ra, server sẽ đẩy dữ liệu tương ứng về cho client.
* Nếu **Queries** và **Mutations** tuân theo "**request-response-cycle**", **subscriptions** sẽ đại điện cho **stream of data** (dòng chảy dữ liệu) gửi tới client.
* Ví dụ chúng ta subcribe một event:
    ```js
    subscription {
      newPerson {
        name
        age
      }
    }
    ```
    Sau khi client gửi subscription tới server, một kết nối đã được mở giữa client và server. Sau đó bất cứ khi nào **mutation** tạo mới Person được thực thi, server sẽ gửi thông tin về person này tới client:
    ```js
    {
      "newPerson": {
        "name": "Sam",
        "age": 23
      }
    }
    ```
## 5. Định nghĩa Schema cho Queries, Mutations và Subscriptions.
* Để Client có thể sử dụng **Queries**, **Mutations** và **Subscriptions** như trên, chúng ta phải định nghĩa chúng ở **Schema**.
* Nói tóm lại, một schema đơn giản là một tập hợp của các GraphQL type. Ngoài các type như Post, Person mà chúng ta ví dụ ở phần 1, chúng ta còn có các type đặc biệt như:
    ```js
    type Query { ... }
    type Mutation { ... }
    type Subscription { ... }
    ```
* Để Client có thể gọi được query `allPersons` như ở ví dụ bên trên, chúng ta phải định nghĩa chúng trong type Query:
    ```js
    type Query {
      allPersons: [Person!]!
    }
    ```
* Tương tự với mutation `createPerson` và subscription `newPerson`, chúng ta sẽ có một tổng thể schema như sau:
    ```js
    type Query {
      allPersons(last: Int): [Person!]!
    }

    type Mutation {
      createPerson(name: String!, age: Int!): Person!
      updatePerson(id: ID!, name: String!, age: Int): Person!
    }

    type Subscription {
      newPerson: Person!
    }

    type Person {
      id: ID!
      name: String!
      age: Int!
      posts: [Post!]!
    }

    type Post {
      id: ID!
      title: String!
      author: Person!
    }
    ```
## 6. Một chút về Resolver.
* Chúng ta đã có schema (như chúng ta đã biết, schema như một hợp đồng làm việc giữa client và server), chúng ta biết cách gọi các truy vấn (được định nghĩa ở schema) từ phía client. Vậy còn phía server, làm sao để từ file schema, server biết được mình sẽ xử lý như thế nào để trả về cho client.
* Chúng ta sẽ có các hàm resolver. Ứng với mỗi **field** trong các type, sẽ có một resolver được định nghĩa để giải quyết yêu cầu phía client và trả về dữ liệu cho client. Các argument truyền vào các **field** cũng chính là những tham số được truyền vào resolvers.
* Trên đây là khái quát về resolver, mình  trình bày chi tiết về resolver trong bài viết lần sau.

Nguồn tham khảo: https://www.howtographql.com/basics/2-core-concepts/