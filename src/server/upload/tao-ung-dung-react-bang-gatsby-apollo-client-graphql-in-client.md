![](https://images.viblo.asia/e26cd74d-2f73-4812-b1cc-13dfc4ab8f7c.png)

Chào mọi người,

Bài viết này sẽ hướng dẫn cách tạo một ứng dụng React, kết hợp sử dụng React Apollo để tương tác với GraphQL server

# 1. Giới thiệu
- [Reactjs](https://reactjs.org/) là một thư việc Javascript. Nó cung cấp các giải pháp hữu ích cho lập trình front-end, cho phép bạn tạo các ứng dụng web động và tương tác một cách dễ dàng.
- [Gatsbyjs](https://www.gatsbyjs.com/) gộp chung React, GraphQL and Webpack để build một ứng dụng nhanh chóng
- [GraphQL](https://graphql.org/) là ngôn ngữ truy vấn các API. Nó cho phép phía client-side chỉ lấy các field cần thiết để xử lý trên Front-end và nhiều tính năng hữu ích khác
- [React-Apollo](https://www.apollographql.com/docs/) là một thư viện hỗ trợ sử dụng GraphQL trong ứng dụng React

**Lưu ý**: Bài viết này chỉ tập trung vào phần **Front-end**, nếu bạn nào đã có sẵn **GraphQL Server** rồi thì có thể đọc tiếp phần sau. Còn không thì bạn nên tham khảo viết này ([TypeORM + GraphQL(Type-graphQL) bằng Typescript cho ứng dụng Nodejs](https://viblo.asia/p/typeorm-graphqltype-graphql-bang-typescript-cho-ung-dung-nodejs-gGJ596mJKX2#_4-source-code-21)) hoặc ít nhất bạn tải source code trong đó về để start phần server, vì không có server chúng ta không thể gọi các API để test được ^^
# 2. Yêu cầu hệ thống
* [Node.js](https://nodejs.org/en/) 12.0 trở lên
* MacOS, Windows (bao gồm WSL), và Linux cũng được hỗ trợ
# 3. Bắt đầu
## 3.1 Khởi tạo project

Đầu tiên, bạn gõ lệnh sau để cài **gatsby-cli**

```
npm install -g gatsby-cli
```

Đẻ tạo project mới, bạn gõ lệnh sau

```
gatsby new my-app
``` 

Một folder được sinh ra với tên là **my-app** . Giờ bạn start project lên để xem nó sẽ có gì nào ^^!

```
cd my-app
npm run develop
```

Nếu lúc run mà bạn gặp lỗi này
```ts
Error: Cannot find module 'gatsby-core-utils'
```

Nghìa là đang thiếu thư viện **gatsby-core-utils** bạn chỉ cần gõ lệnh sau để cài đặt nó ```npm i gatsby-core-utils```

Mở http://localhost:8000/ sẽ được như hình bên dưới

![](https://images.viblo.asia/e26cd74d-2f73-4812-b1cc-13dfc4ab8f7c.png)

## 3.2 Cấu trúc project

<img src="https://images.viblo.asia/8fcf0a29-3a63-4834-afac-1112654404c9.png" width="420" />

-  `src/pages` folder. Mỗi React Component được đặt trong folder này sẽ sinh ra một route theo tên file đã tạo. VD:
     * **src/pages/index.tsx** sẽ render trang trang **home** với route là `/`
     * Nếu bạn tạo **src/pages/about.tsx** thì người dùng có thể truy cập vào page `/about`

     Đoạn này nếu bạn nào đã đọc bài [Dùng Nextjs(Reactjs) + Sequelize + Typescript để tạo ứng dụng blog](https://viblo.asia/p/dung-nextjsreactjs-sequelize-typescript-de-tao-ung-dung-blog-Ljy5VDYVZra) thì thấy cơ chế nó giống với **Nextjs** ^^!

- `src/components` folder để chứa các React Component

- `gatsby-config.js` file định nghĩa metadata, plugin và cấu hình chung khác của trang web của bạn
- `gatsby-node.js` Cho phép bạn tạo thêm các xử lý trước khi render 1 trang html. Như việc mình hay sử dụng `componentWillMount` trong React để xử lý trước khi React Component được tạo vậy
- `gatsby-browser.js` dùng để wrap các component sử dụng chung trong ứng dụng, bạn có thể cấu hình Layout ở đây là thuận tiện nhất
- `gatsby-ssr.js` cũng như **gatsby-browser.js** nhưng sẽ run ở phía server

## 3.3 Áp dụng Typescript
 Mặc định thì gatsby đã hỗ trợ sẵn, nên bạn không cần cài đặt gi thêm ^^!. Còn nếu bạn muốn tuỳ chỉnh các thông số của Typescript thì bạn chỉ cần tạo file `tsconfig.json` ở root folder là được
 
 ## 3.4 Set up Apollo Client (GraphQL Client)
 
 ### 3.4.1 Cài đặt
 
 Bạn gõ lệnh sau để cài đặt các thư viện của **React Apollo**
 
 ```
 npm i @apollo/react-hooks@^3.1.3 apollo-cache-inmemory apollo-client apollo-link-http graphql-tag isomorphic-fetch
 ```
 
 ### 3.4.2 Set up Apollo Client
 
 Đầu tiên,  bạn cần start GraphQL server của bạn lên trước, nếu chưa có thì bạn tham khảo bài viết này sẽ hướng dẫn bạn tạo [GraphQL Server](https://viblo.asia/p/typeorm-graphqltype-graphql-bang-typescript-cho-ung-dung-nodejs-gGJ596mJKX2#_351-tao-graphql-server-17) trong 5 phút.
 
 Sau đó, bạn tạo ApolloProvider component `src/apolloClient/ApolloProvider.tsx` như sau
 
 ```ts
 import React, { ReactElement } from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import fetch from "isomorphic-fetch"

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  fetch,
  fetchOptions: {
    credentials: "include",
  },
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: httpLink,
  cache: cache,
})

interface IProps {
  children: ReactElement
}

const ApolloProviderWrapper = ({ children }: IProps) => {
  return (
    <ApolloProvider client={client}>
      {React.cloneElement(children)}
    </ApolloProvider>
  )
}

export default ApolloProviderWrapper
 ```
 
 - `createHttpLink` để cấu hình request gửi lên server.
 -  `uri: "http://localhost:3000/graphql"` đây là endpoint Server GraphQL của bạn. Ở bài viết này, mình sẽ sử dụng [Server TypeORM](https://viblo.asia/p/typeorm-graphqltype-graphql-bang-typescript-cho-ung-dung-nodejs-gGJ596mJKX2#_351-tao-graphql-server-17) mà mình đã đề cập ở trên. Bạn có thể update lại để xài Server riêng của bạn
 - `client` đối tượng này đóng vai trò quan trọng trong ứng dụng có sử dụng Apollo, chúng ta sẽ dùng nó để tương tác hoặc lưu data ở client dưới dạng bộ nhớ cache. Mình sẽ đi sâu hơn ở các phần tiếp theo
 - *Xem thêm tại https://www.apollographql.com/docs/react/api/core/ApolloClient/*
 
 Sau đó, update lại 2 files `gatsby-browser.js` và `gatsby-ssr.js` với nội dung như bên dưới. Mục đích là wrap tất cả component bên trong Apollo Provider vừa tạo ở trên, để có thể sử dụng các dữ liệu **global** và các method của **Apollo**
 
 ```ts
import React from "react"
import ApolloProvider from "./src/apolloClient/ApolloProvider"

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider>{element}</ApolloProvider>
} 
 ```
 
 ### 3.4.3 Lấy danh sách Categories
 
Bạn tạo file `src/apolloClient/useCategory.ts` với nội dung như bên dưới để set up câu query. Trong ví dụ này thì mình sẽ gọi `getCategories` query để lấy danh sách các Category như trong bài hướng dẫn [TypeORM + GraphQL(Type-graphQL) bằng Typescript cho ứng dụng Nodejs](https://viblo.asia/p/typeorm-graphqltype-graphql-bang-typescript-cho-ung-dung-nodejs-gGJ596mJKX2#_4-source-code-21)
 
 ```ts
 import gql from "graphql-tag"

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      code
      name
    }
  }
`
```
 
Sao đó, tạo Home component `src/components/Home.tsx` với nội dung như sau
 
 ```ts
 import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_CATEGORIES } from "../apolloClient/useCategory"

const Home: React.FC = () => {
  const { data, loading, called, error } = useQuery(GET_CATEGORIES)

  if (loading || !called) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const categories = data.getCategories

  return (
    <div>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <b>Name: </b>
            {category.name} - <b>Code: </b>
            {category.code}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
```

- `useQuery` hook nhận param là một DocumentNode của GraphQL, cái này thì bạn đã tạo ra bằng hàm `gql` ở trên. Nó return về cho mình một object, trên ví dụ mình chỉ sử dụng 4 thuộc tính
- *Xem thêm tại cách sử dung useQuery ở [đây](https://www.apollographql.com/docs/react/api/react/hooks/#usequery)*

Sau đó bạn update lại file `src/pages/index.tsx` (Nhớ rename file index.jsx mặc định của **gatsby** sang **tsx**)

```ts
import React from "react"
import Home from "../components/Home"

const IndexPage = () => <Home />

export default IndexPage
```

Bây giờ thử mở home page lên sẽ hiển thị như hình bên dưới (Bạn nào mới chạy code **Backend** lần đầu sẽ không có data nhé, nhưng đừng lo giờ mình sẽ tới bước tạo **Category**)

<img src="https://images.viblo.asia/2cf2e945-20cb-40fd-8c70-02be427c9add.png" width="290"/>

### 3.4.4 Tạo Category

Bạn thêm vào file `src/apolloClient/useCategory.ts` đoạn query sau. Lần này chúng ta sẽ sử dụng `mutation` nhé. 

```ts
export const CREATE_CATEGORY = gql`
  mutation CreateCate($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      name
      code
    }
  }
`
```

Sau đó bạn tạo file component `src/components/CreateCategory.tsx` như bên dưới

```ts
import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { CREATE_CATEGORY } from "../apolloClient/useCategory"

const CreateCategory: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  })

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY)

  async function createCategoryHandler() {
    try {
      await createCategory({
        variables: {
          data: {
            ...formData,
          },
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  function onChangeName(e) {
    formData.name = e.target.value
    setFormData({ ...formData })
  }

  function onChangeCode(e) {
    formData.code = e.target.value
    setFormData({ ...formData })
  }

  return (
    <div>
      <div>
        <label>Name</label>
        <input value={formData.name} onChange={onChangeName} />
      </div>
      <div>
        <label>Code</label>
        <input value={formData.code} onChange={onChangeCode} />
      </div>
      {loading ? (
        <span>Creating......</span>
      ) : (
        <button onClick={createCategoryHandler}>Create Category </button>
      )}
    </div>
  )
}

export default CreateCategory
```

- `useMutation` hook return về một array với phần tử đầu tiên là một **mutate function**. Ở đây mình đặt tên là `createCategory`, để gọi khi nào bạn muốn. Phần tử thứ 2 là một object với nhiều properties, ở đây mình chỉ xài `loading` 
- **mute function** nhận param là một object với nhiều tuỳ chọn tuỳ mục đích sử dụng, trong đó tuỳ chọn `variables` sẽ luôn là một object để truyền data từ Client lên Server. Ở đây mình truyền vào object có thuộc tính `data` là bởi vì ở phần Server mình config nhận request gửi lên luôn là một object có key là data, bạn có thể config lại theo ý bạn (ví dụ như `variables: {id: 1}` chẳng hạn). Dưới đây là hình chụp code mẫu ở Server
  
  ![image.png](https://images.viblo.asia/20e6c779-3d53-4e98-a9a6-046c352599ed.png)

Tiếp theo bạn import **CreateCategory** Component mới tạo vào **Home** Component sẽ được như hình bên dưới:

![](https://images.viblo.asia/08ee75bf-690c-467a-9a7d-18686e231450.png)

Sau khi thử tạo một vài **Category** thì bạn reload lại page để thấy data mới. Chắc bạn sẽ thắc mắc làm sao để auto refetch lại list ? Mình sẽ đi tới phần tiếp theo ^^!

### 3.4.5 Auto refetch data

Chúng ta sẽ update lại  `src/components/CreateCategory.tsx` component như sau:

- Import `GET_CATEGORIES`

    ```ts
    import { GET_CATEGORIES } from "../apolloClient/useCategory"
    ```

- Thêm tuỳ chọn `refetchQueries` vào **mute function**  `createCategory`

  ```ts
  await createCategory({
    variables: {
      data: {
        ...formData,
      },
     },
     refetchQueries: [{ query: GET_CATEGORIES }],
   })
   ```

- `refetchQueries` nhận ra giá trị là một đối tượng query hoặc một mảng chứa các đối tượng query để báo cho Apollo biết những **query** cần load lại sau khi thực hiện xong một mutation. Mỗi đối tượng query chứa câu truy vấn để thực thi (như cách sử dụng `useQuery` vậy đó ^^!)
- *Xem thêm cách sử dụng useMutation tại [đây](https://www.apollographql.com/docs/react/data/mutations/#usemutation)*

Bây giờ bạn thử tạo thêm vài **Category** sẽ thấy dữ liệu được update real time

# 4. Source code
Đây là full [source code](https://github.com/ltienphat1307/gatsby-react-graphql) sau khi làm xong các bước trên (dành cho những bạn nào muốn run trước learn sau 😄). Sau khi tải về bạn chỉ cần run 2 lệnh sau để cài đặt và chạy ứng dụng

```
npm i
npm run develop
```

# Enjoy!!