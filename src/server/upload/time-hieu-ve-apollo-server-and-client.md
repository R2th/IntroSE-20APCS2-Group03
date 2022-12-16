Trong bài viết này chúng ta sẽ tạo ra một ứng dụng nho nhỏ. Nhằm tìm hiểu thêm một số kiến thức về `GraphQL` và những điều hay ho khác

 # 1 ) GraphQL
 ### GraphQl là gì :
 - GraphQL là ngôn ngữ truy vấn cho các API  để thực hiện các truy vấn đó với dữ liệu hiện có của bạn
### Điểm mạnh :
 - Gửi một truy vấn GraphQL tới server và nhận chính xác những gì bạn cần, không hơn không kém. Các truy vấn GraphQL luôn trả về kết quả có thể dự đoán được. Các ứng dụng sử dụng GraphQL nhanh và ổn định vì chúng kiểm soát dữ liệu mà chúng nhận được chứ không phải server.

 - Các truy vấn GraphQL có thể lấy được dữ liệu từ nhiều nguồn . Trong khi các API REST thì lấy dữ liều từ nhiều URL khác nhay , các API GraphQL nhận tất cả dữ liệu mà ứng dụng của bạn cần trong một yêu cầu duy nhất. Các ứng dụng sử dụng GraphQL có thể nhanh chóng ngay cả trên các kết nối mạng di động chậm.

# 2 ) Xây dựng GraphQl Server với Apollo
### Step 1: Create a new project
```
mkdir graphql-server-example
cd graphql-server-example
npm init --yes
npm install apollo-server graphql
touch index.js
```
### Step 2: Define your GraphQL schema and mock data

 Mọi GraphQL Server (bao gồm cả  Apollo Server) đều sử dụng `schema` để xác định cấu trúc dữ liệu mà `client` có thể truy vấn. Trong ví dụ này, chúng ta sẽ tạo một `server` để truy vấn và lấy thông tin từ `User`.

 ```js
//index.js
const { ApolloServer, gql } = require('apollo-server');

const USERS = [
    {
      id: "5j2ii16cjjz2qky8s",
      name: "John Doe",
      company: "A Cool Company",
    },
    {
      id: "5j2ii16cjjz2ql8rr",
      name: "Lydia Hallie",
      company: "Another Cool Company",
    }
]

const typeDefs = gql`
input UserInput {
  name:String
  email: String
  website: String
}

input UserInput {
    name: String
    company: String
}

type User {
    id: ID!
    name: String!
    company: String!
  }

type Query {
    user(id: ID): User
    users: [User]
}

type Mutation {
    createUser(input:UserInput): User
}
`
 ```

### Step 3: Define a resolver
Chúng ta đã xác định tập dữ liệu của mình, nhưng Apollo Server không biết rằng nó nên sử dụng tập dữ liệu đó khi thực hiện truy vấn. Để server có thể hiểu được, chúng ta tạo ra một `resolvers` để giải quyết.
```js
//index.js
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    users: () => USERS,
  },
  Mutation: {
    createUser: (_, { input }) => {
      const newUser = {
        id: uuidv4(),
        ...input,
      };
      USERS.push(newUser);
      return newUser;
    },
  },
};
```

### Step 4: Create an instance of `ApolloServer`
 Chúng ta đã định nghĩa các `schema`, `mock data` và `resolvers` ở các step trước. Bât giờ chúng ta chỉ cần cung cấp các thông tin nay khi `Apollo Server` khởi chạy.
 ```js
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

Sau khi set up xong chung ta bắt đầu chạy nó
```
node index.js
```
# 3 ) Apollo client với React
### Setup
 Đầu tiên bạn cần tạo một project cơ bản bằng `create-react-app`. Sau đó

 ```
 npm install @apollo/client graphql
 ```

 Cấu hình index file

 ```js
 //index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
 ```
Tạo schema.js để chứa các `schema` của ban
```js
//schema.js
export const GET_USERS = gql`
  query GetUser {
    users {
      id
      name
      company
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: UserInput) {
    createUser(input: $data) {
      id
      name
      company
    }
  }
`;

```
- Ở đây bạn có thể thấy các schema sẽ giống với các trường mà chúng ta đã tạo ở trên server. Các bạn có thể tuỳ chỉnh nó và lấy bất cứ các trường nào mà bạn muốn

 ```js
 //App.js
 import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_USERS, CREATE_USER } from "./schema";

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    company: "",
  });

  const onHandleChange = (event) => {
    const { value, name } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  if (loading) return <h1> Loading..........</h1>;
  if (error) return <h1> {error} </h1>;
  return (
    <div>
      <p>
        <span>Name : </span>
        <input value={userInfo.name} name="name" onChange={onHandleChange} />
      </p>
      <p>
        <span>Company : </span>
        <input
          value={userInfo.company}
          name="company"
          onChange={onHandleChange}
        />
      </p>
      <div>
        <button
          onClick={() => {
            createUser({
              variables: {
                data: userInfo,
              },
            });
          }}
        >
          Create User
        </button>
      </div>

      {!!data.users &&
        data.users.map((user) => (
          <div key={user.id}>
            <h1>----------------</h1>
            <h3>name : {user.name}</h3>
            <h3> company : {user.company}</h3>
          </div>
        ))}
    </div>
  );
};
export default App;
 ```

- Ở đây có sử dụng `useQuery`, đây là một react hook dùng để thực thi các truy vấn trong Apollo. Để chạy một truy vấn trong một thành phần React, hãy gọi `useQuery` và chuyển cho nó `schema`. Khi compnent render, `useQuery` trả về một đối tượng từ  `Apollo Client` chứa các thuộc tính `loading`, `error` và `data` mà bạn có thể sử dụng để hiển thị giao diện người dùng của mình.Ngoài ra nó còn cung cấp hàm `refetch` để bạn có thể truy vấn lại khi muốn , ở trên tôi đã gọi lại để lấy danh sách user sau khi tạo mới.

- `useMutation`đây là một react hook dùng để thực thi các [`mutations`](https://graphql.org/learn/queries/#mutations) trong ứng dụng Apollo.Ở đây nó còn cung cấp nhiều options khác. Như ví dụ trên hàm `onCompleted` sẻ đươc gọi khi tạo user thành công,[Tìm hiểu thêm tại đây](https://www.apollographql.com/docs/react/data/queries/#options)

# 4 ) Tài liệu tham khảo
- https://www.apollographql.com/docs/react/
- https://www.apollographql.com/docs/apollo-server/