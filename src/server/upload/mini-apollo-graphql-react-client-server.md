#### Chào anh em, lại là mình đây :D. Hôm nay mình lại tiếp tục đi đến một chủ đề khá thú vị, cực kì phù hợp cho các anh em thích nghịch ngợm và cũng đơn giản để có thiển triển khai các `pet project` trong tương lai. Cụ thể là vọc vạch về một ngôn ngữ truy vấn gọi là `GraphQL` và nó cũng đã hỗ trợ rất nhiều thư viện chính chủ cho cả 2 phía `client-server` nên rất tiện, trong phần này mình sẽ sử dụng nó và kết hợp với `React` nhé. Nào cũng chơi thôi :laughing:.

# 1. Chuẩn bị
### Yêu cầu:
- Đã có một chút kiến thức về `GraphQL` cũng như `React`.
- Môi trường mình sẽ sử dụng:
  - window 10
  - node v12.14.0
  - yarn v1.22.4
  - editor: VSCode
 
### Mục đích:
- Tìm hiểu xem cách sử dụng.
- Hỗ trợ cho việc xây dựng các `pet project` trong tương lai.

### Những phần bỏ qua:
- Phần cấu hình mình sẽ không mô tả chi tiết trong bài viết, các bạn có thể theo dõi thông qua repo.
- Không giải thích các thuật ngữ, khái niệm cơ bản mà các bạn hoàn toàn có thể đọc thông qua trang chính thức của thư viện đó.

# 2. Nội dung
## GraphQL là gì ?
Về cơ bản thì graphql là một ngôn ngữ truy vấn và các bạn có thể mường tượng nó một cách tương đương `RESTful` khi viết phần `api` cho project.

Ở bài viết này mình sẽ không đi giải thích cụ thể, các bạn có thể tìm hiểu đầy đủ thông qua tài liệu chính thức [tại đây](https://graphql.org/).

## React là gì ?
Các bạn đã đọc bài này thì chắc chắn đã hiểu biết về `React` vì vậy hãy đến phần tiếp theo nhé :laughing:

## Xây dựng `GraphQL` phía server

Mình sẽ dùng `Apollo GraphQL` các bạn có thể xem qua [tại đây](https://www.apollographql.com/)

1. Cài đặt thư viện

```
yarn add apollo-server graphql
```

`apollo-server` server cho `express`.
`graphql` dành cho `js`.

2. Tạo một database đơn giản

```js
const data = [
  {
    id: 1,
    title: 'Sach 1',
    author: 'Dai 1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Sach 2',
    author: 'Dai 2',
    createdAt: new Date().toISOString(),
  },
]
```

3. Tạo một `GraphQL schema`

```js
const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: String!
  }

  type Query {
    books: [Book]
  }
`
```

`Book` sẽ được dùng như một shape, một kiểu dữ liệu và mô tả về cấu trúc của đối tượng đó khi nó được truy suất đến.
`books: [Book]` mô tả khi ta truy vấn đến `books` và sẽ response cho ta 1 mảng `Book`, nó tương đương như khi ta gọi `GET /books` bên `RESTful`

4. Tạo một `resolver`

```js
const resolvers = {
  Query: {
    books: () => data,
  },
}
```

Một bản đồ các hàm trả về dữ liệu khi ta query tương ứng với `schema` mô tả ở trên

5. Tạo `GraphQL` server

```js
const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
```

6. Run server

![](https://images.viblo.asia/c08ab2a1-234d-4026-ab73-47667044545d.PNG)

Mặc định `GraphQL` server sẽ dùng port 4000

7. Test

![](https://images.viblo.asia/a883a5db-8e4c-4e00-a4ad-fe878f19931a.PNG)

Mọi thứ chỉ đơn giản như vậy :D

## Xây dựng phía client và request đến `GraphQL` server

1. Cài đặt thư viện

```
yarn add @apollo/client graphql
```

`React` và các thư viện build, compiler các bạn có thể xem qua repo nhé.

2. Tạo kết nối với phía server

```js
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})
```

`uri` của server khi nãy chúng ta dựng.
`cache` cơ chế cache ta muốn cho các truy vấn `GraphQL` phía client.

3. Tạo một lệnh truy vấn

```js
import { gql } from '@apollo/client'

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      createdAt
    }
  }
`;
```

Chúng ta sẽ dùng đến kiểu cú pháp `template string` trong es6 và bên trong mô tả những gì ta muốn truy vấn, bạn sẽ thấy nó giống khi nãy chúng ta demo trên `http://localhost:4000/`

4. Tạo một component để request cũng như hiển thị data sau khi truy vấn

```js
import React from 'react'
import { useQuery } from '@apollo/client'

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error {error.message}</p>

  return (
    <div>
      {data.books.map((book) => (
        <div key={book.id} style={{ borderBottom: '1px solid gray' }}>
          <h3>Title: {book.title}</h3>
          <p>Author {book.author}</p>
          <span>{book.createdAt}</span>
        </div>
      ))}
    </div>
  )
}
```

5. Kết nối App và apollo thông qua context

```js
import { ApolloProvider } from '@apollo/client'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app'),
)
```

6. Run app

```bash
yarn webpack serve
```

7. Kết quả

![](https://images.viblo.asia/8b4f730f-9fea-4a39-ae13-9c2db5b899be.PNG)

Quá ngon, đó là tất cả những gì chúng ta cần :D.

## Truy vấn để thêm dự liệu

Tất nhiên ngoài về lấy dữ liêu chúng ta còn cần phải thêm, sửa, xóa. Chúng ta cùng xem qua phần `add book` sau.

1. Phía server

```diff
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: String!
  }

  type Query {
    books: [Book]
  }

+  input AddBookInput {
+   title: String!
+   author: String!
+  }

+  type Mutation {
+    addBook(input: AddBookInput!): Book
+  }
`
```

Khai báo tham số đầu vào khi request đến `addBook` và kết quả khi tạo thành công sẽ là record `book` vừa được tạo.

```diff
const resolvers = {
  Query: {
    books: () => data,
  },
+  Mutation: {
+    addBook(parent, args, context, info) {
+      const { title, author } = args.input
+      const newBook = {
+        id: Date.now(),
+        title,
+        author,
+        createdAt: new Date().toISOString(),
+      }

+      data.push(newBook)

+      return newBook
+    },
+  },
}
```

Chúng ta sẽ tạo mới với chính xác shape của Book và trả về chính nó cho client.

2. Phía client

Thêm một truy vấn cho phần thêm mới book

```js
import { gql } from '@apollo/client'

const ADD_BOOK = gql`
  mutation($input: AddBookInput!) {
    addBook(input: $input) {
      id
      title
      author
      createdAt
    }
  }
`
```

Tạo một form đơn giản 

```js
import React, { useRef } from 'react'
import { useMutation } from '@apollo/client'

function AddBookForm() {
  const titleRef = useRef('')
  const authorRef = useRef('')

  const [addBook] = useMutation(ADD_BOOK)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        addBook({
          variables: {
            input: {
              title: titleRef.current.value,
              author: authorRef.current.value,
            },
          },
        })
      }}
    >
      <h3>Add book form</h3>
      <div>
        <label htmlFor="title">title</label>
        <input id="title" type="text" ref={titleRef} />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input id="author" type="text" ref={authorRef} />
      </div>
      <button type="submit">Add book</button>
    </form>
  )
}
```

```diff
function App() {
  const { loading, error, data } = useQuery(GET_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error {error.message}</p>

  return (
+    <div>
+      <AddBookForm />
+      <br />
      <div>
        {data.books.map((book) => (
          <div key={book.id} style={{ borderBottom: '1px solid gray' }}>
            <h3>Title: {book.title}</h3>
            <p>Author {book.author}</p>
            <span>{book.createdAt}</span>
          </div>
        ))}
      </div>
+    </div>
  )
}
```

Test xem nhé

![](https://images.viblo.asia/01734039-c796-4b17-a840-92b09c819390.PNG)

Mọi thứ có vẻ đã làm việc đúng như mong đợi.

Ơ nhưng khoan, khi thêm mới thì ta cần hiển thị realtime dữ liệu vừa thêm đấy tại local ? Tất nhiên

Vì `Apollo GraphQL` sẽ lưu dữ liệu khi truy vấn xong vào cache để những khi component re-render sẽ không bị request lại. Vì vậy khi tạo mới thành công cũng ta cũng sẽ tiến hành sửa đổi trong cache để `Apollo` cập nhật data lại cho `query GET_BOOKS`, tất nhiên bạn có thể buộc request lại bằng 1 option khác nhưng ở đây mình sẽ cập nhật cache nhé.

```diff
function AddBookForm() {
  const titleRef = useRef('')
  const authorRef = useRef('')

+  const resetInput = () => {
+    titleRef.current.value = ''
+    authorRef.current.value = ''
+  }

  const [addBook] = useMutation(ADD_BOOK, {
+   update(cache, { data }) {
+     // Fetch the books from the cache
+     const existingBooks = cache.readQuery({ query: GET_BOOKS })

+     // Add the new book to the cache
+     const newBook = data.addBook
+
+      cache.writeQuery({
+        query: GET_BOOKS,
+        data: { books: [newBook, ...existingBooks.books] },
+      })
+    },
+    onCompleted: resetInput,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        addBook({
          variables: {
            input: {
              title: titleRef.current.value,
              author: authorRef.current.value,
            },
          },
        })
      }}
    >
      <h3>Add book form</h3>
      <div>
        <label htmlFor="title">title</label>
        <input id="title" type="text" ref={titleRef} />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input id="author" type="text" ref={authorRef} />
      </div>
      <button type="submit">Add book</button>
    </form>
  )
}
```

Ngoài ra mình sẽ clear toàn bộ input sau khi thêm mới thành công và dùng nó thông qua callback `onCompleted`

![](https://images.viblo.asia/5db0dd2c-1117-457d-aaf3-9e80b550e139.PNG)

Và như bạn thấy đấy mọi thứ là hoàn toàn ngon lành như mong đợi :D.

# 3. Kết luận
Mọi thứ trông thật đơn giản bạn nhỉ :laughing:.

Ngoài ra sẽ còn rất nhiều tính năng thú vị khác, nếu bạn cảm thấy thích thú hãy tìm hiểu nhiều hơn qua trang chính thức của `GraphQL` và `Apollo GraphQL` nhé.

Hi vọng bài viết này có ích và giúp bạn trong quá trình tiến tới hoàn thiện khả năng lập trình Web hơn nhé :100:.

Cảm ơn đã đọc bài viết này :clap:
[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/mini-apollo-graphql-react-client-server)