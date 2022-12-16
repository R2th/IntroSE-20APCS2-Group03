### I. Giới thiệu
Thời gian vừa qua mình có đọc 1 bài viết GraphQL thì mình thấy nó khá hay nên mình có tìm hiểu. Hôm nay mình sẽ viết 1 bài viết để sharing cho mọi người cách để xây dựng API sử dụng NodeJS, Express, Mongodb và Applo server
#### 1. GraphQL là gì? 
GraphQL là ngôn ngữ thao tác và truy vấn dữ liệu nguồn mở cho API, cung cấp cho client 1 cách thức dễ dàng để request chính xác những gì họ cần, giúp việc phát triển API dễ dàng hơn theo thời gian. GraphQL được Facebook phát triển nội bộ vào năm 2012 trước khi phát hành công khai vào năm 2015.

GraphQL bao gồm 3 điểm đặc trưng bao gồm:

*   Cho phép client xác định chính xác những dữ liệu gì họ cần
*   GraphQL làm cho việc tổng hợp dữ liệu từ nhiều nguồn dễ dàng hơn
*   Sử dụng một type system để khai báo dữ liệu.

![](https://images.viblo.asia/b16af379-1503-4b79-b2b0-c98b19312681.jpg)

GraphQL trả về chính xác những gì trong request mà ta gửi lên

*   Khi bạn gửi 1 request GraphQL đến API của bạn, bạn sẽ nhận được chính xác những gì bạn yêu cầu trong request, không hơn không kém.
*   Các truy vấn GraphQL luôn trả về kết quả có thể dự đoán được.
*   Các ứng dụng sử dụng GraphQL rất nhanh và ổn định vì GraphQL kiểm soát dữ liệu mà nó nhận được chứ không phải máy chủ.

GraphQL nhận nhiều dữ liệu trong một request duy nhất

* Các câu query GraphQL không chỉ có thể truy xuất các thuộc tính của một dữ liệu mà còn làm việc trơn tru với các đối tượng khác.
* Trong khi các API REST chúng ta hay dùng phải yêu cầu request từ nhiều URL thì API GraphQL lại có thể lấy tất cả dữ liệu mà ứng dụng của bạn cần trong một request duy nhất.
* Các ứng dụng sử dụng GraphQL có tốc độ xử lý rất nhanh ngay cả trên các kết nối chậm. 

![image.png](https://images.viblo.asia/43635465-c03f-46ae-9804-be2a8048cc12.png)

#### 2. Bắt đầu với GraphQL:
##### Khởi tạo project 

Cách đơn giản nhất để chạy máy chủ API GraphQL là sử dụng module express (một khung ứng dụng web phổ biến cho Node.js). Bạn sẽ cần cài đặt thêm 3 package apollo-server-express, graphql, mongoose.

*   express: Chạy máy chủ web và thực hiện truy vấn trực tiếp với hàm graphql
*   apollo-server-express: Gắn máy chủ API GraphQL trên endpoint HTTP /graphql
*   graphql: Package để sử dụng API GraphQL
*   mongoose: dùng để thao tác mới csdl Mongodb

Chạy command line:

```
npm init
npm install express apollo-server-express graphql mongoose
```

Hoặc tạo file package.json với nội dung:

```
{
  "name": "graphql",
  "version": "1.0.0",
  "description": "",
  "main": "dist/server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon -x ts-node server.ts",
    "start": "ts-node server.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@graphql-tools/schema": "^8.2.0",
    "apollo-server-express": "^3.3.0",
    "dotenv": "^10.0.0",
    "eslint": "^7.32.0",
    "express": "^4.17.1",
    "graphql": "^15.5.3",
    "lodash": "^4.17.21",
    "mongoose": "^6.0.5",
    "nodemon": "^2.0.12",
    "prettier": "^2.4.0",
    "puppeteer": "^10.2.0",
    "tslint": "^6.1.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@types/node": "^16.9.1",
    "ts-node": "^10.2.1",
    "typescript": "^4.4.3"
  }
}
```

##### Tạo file schema
Tiếp đến tạo file bookSchema.ts để tạo schema cho thèn book nhé:
* Schema là một trong những khái niệm quan trọng nhất khi làm việc với một API GraphQL.
* Nó chỉ định các khả năng của API và xác định cách client có thể yêu cầu dữ liệu. Nó thường được xem như là một hợp đồng giữa server và client.
* Nói chung, một schema chỉ đơn giản là một tập hợp các types của GraphQL. 
Trong file schema sẽ chứa 2 thành phần quan trọng: 
* query: đại diện cho những câu truy vấn để get data từ CSDL
* mutation: đại diện cho những thao tác ghi vào CSDL (Create, Update, Delete, Read)

```
import { gql } from "apollo-server-express";

const authorTypeDefs = gql`
    type Author {
        id: ID
        name: String
        age: Int
        books: [Book]
    }
    
    # ROOT TYPE
    type Query {
        authors: [Author]
        author (id: ID!): Author
    }

    # ROOT MUTATION
    type Mutation {
        createAuthor(name: String, age: Int): Author
    }
`

export { authorTypeDefs };
```

##### Tạo file resolver
Tiếp đến tạo file bookResolver.ts để tạo resolver cho thèn book nhé:
Không giống như schema là dùng để xác định xem client có yêu cầu những thông tin gì từ API. Thì resolver là 1 file dùng để thực thi các khả năng của schema file
```
import { getAllBooks, getBookById, createBook } from "../../service/bookService."
import { getAuthorById } from "../../service/authorSevice"

const bookResolvers = {
    //QUERY
    Query: {
        books: async () => await getAllBooks(),
        book: async (parent: any, args: any) => await getBookById(args.id),
    },

    Book: {
        author: async ({authorId}: any, args: any) => await getAuthorById(authorId),
    },

    // MUTATION
    Mutation: {
        createBook: async (parent: any, args: any) => createBook(args),
    }
}
export { bookResolvers }
```

##### Tạo server
Tiếp đến tạo file server.ts để chạy server:

```
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./src/graphql/schema";
import { resolvers } from "./src/graphql/resolver";
import dotenv from "dotenv";
dotenv.config({ path: '/home/phan.hoang.hieu/Desktop/LEARN_NODEJS/GRAPHQL/.env' });
import { connectDB } from "./src/util/mongoose";

const app =  express();
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

connectDB()
startServer();

app.listen({port: 4000}, () => {
    console.log(`Server ready at: http://localhost:4000${apolloServer.graphqlPath}`);
})
```

Sau các bước cơ bản thì start code thử để xem hình thù API này như thế nào nhé

#### 3. Test
Nếu bạn truy cập trong trình duyệt web http://localhost:4000/graphql, bạn sẽ thấy một giao diện cho phép bạn nhập các truy vấn.

![image.png](https://images.viblo.asia/cd45c406-0a8c-434d-9c81-460089f5d708.png)

Nếu mình muốn get thông tin bao name, gerne của book với id = 613d145b8a0490baa08e4ced thì chỉ cần thực hiện đơn giản như sau:

![image.png](https://images.viblo.asia/72d58a64-9474-4b1d-9dcf-d051d4fc1320.png)

Cũng câu truy vấn trên nếu bạn muốn lấy thêm name và age của author đã viết tác phẫm thì thực hiện thế này là ok nhé

![image.png](https://images.viblo.asia/dc0ed2d3-14c5-43eb-bd48-96831d839a51.png)

### II. Tổng kết

Ok, Như vậy dựa trên kiến thức của mình và các tài liệu tham khảo, mình đã giới thiệu tới các bạn về ngôn ngữ truy vấn GraphQL, có thể nói đây là 1 ngôn ngữ của tương lai 😄 theo mình với thời điểm hiện tại thì là như vậy!
Mong rằng sau bài viết này các bạn có thể tiếp cận được GraphQL 1 cách nhanh chóng và dễ dàng hơn...
Cảm ơn các bạn đã đọc bài viết của mình!

### Tham khảo
Tài liệu: -  https://graphql.org/<br>
Full source code:  https://github.com/hieuph-0968/graphql