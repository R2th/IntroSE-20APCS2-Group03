# GraphQL là gì?
**GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.**

QL viết tắt của từ query language nghĩa là ngôn ngữ truy vấn. Có thể hiểu nó giống như một câu truy vấn SQL nhưng không phải trên Table mà là trên các API( query language for APIs - các bạn có thể hiểu hơn qua ví dụ ở ⬇️).
Nó không phải là một công nghệ thay thế REST API mà giống như một thư viện giúp khắc phục các vấn đề của REST. 

## 1. Lịch sử ra đời GraphQL 
- REST API ra đời vào năm 2000, là 1 tiêu chuẩn chung của việc phát triển phần mềm, lập trình web. Kết hợp với HTTP method GET, POST, PUT, DELETE.
![](https://images.viblo.asia/5ccbfd26-221c-4cdc-a1cd-27b009b2e82f.png)
- GraphQL ra đời năm 2015 được phát triển bởi Facebook và được open-source vào năm 2017 và đang phát triển nhanh chóng. GraphQL ra đời không phải để thay thế REST, nó như 1 thư viện bổ trợ cho REST. Bạn có thể dùng kết hợp giữa GraphQL và REST.
## 2. Ưu điểm của GraphQL
- Có thể lấy chính xác dữ liệu mà Client cần thông qua câu truy vấn giúp nâng cao, cải thiện tốc độ truy vấn, tránh dư thừa dữ liệu không cần thiết: Ví dụ trong REST API thông thường, sẽ trả về kết quả có thể dư thừa hoặc thiếu. Ví dụ ca sĩ **Mono** muốn lấy thêm tên bài hát **Waiting for you** thì thông thường chúng ta phải chính sửa lại API để lấy thêm thông tin về bài hát
![](https://images.viblo.asia/3e7bb805-90d0-42c8-bea1-d1528e2ed110.png)

![](https://images.viblo.asia/c50ea7be-dfa5-431c-9613-80a393f1c26d.png)
- Đối với GraphQL chúng ta chỉ cần thêm thông tin cần lấy như sau:
![](https://images.viblo.asia/5529a54a-2a2f-44e5-bc8e-97254dcc3a9d.png)
- Việc này giúp tiết kiệm và tái sử dụng các API của chúng ta giúp tiết kiệm quá trình phát triển xây dựng Backend.
## 3. Ví dụ
Môi trường Nodejs, JavaScript.
- Cài đặt 
```
npm init
npm install graphql --save
```

- Tạo file index.js như sau
```
//Import các thư viện cần dùng
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Xây dựng một Schema, sử dụng ngôn ngữ Schema GraphQL
var schema = buildSchema(`
  type Query {
    author: String,
    song:String
  }
`);

// Root cung cấp chức năng phân giải cho mỗi endpoint API
var root = {
  author: () => {
    return 'Mono';
  },
  song: () => {
    return 'Waiting for you!';
  },
};

//Tạo server với express
var app = express();

//Khai báo API graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, //sử dụng công cụ GraphiQL để đưa ra các query GraphQL theo cách thủ công
}));

// Khởi tạo server tại port 4000
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

```
- Run :
```
node index.js
```
Truy vấn postman hoặc trên http://localhost:4000/graphql(công cụ tích hợp, có thể truy vấn trực tiếp tại đây).
![](https://images.viblo.asia/c52c7c23-5702-4fdc-be87-e9bec6419b3a.png)
## 4. Kết luận
- Đây là một công nghệ rất hữu ích. Các bạn nên thử áp dụng vào project của mình.
🔗link for detail: https://graphql.org/graphql-js/