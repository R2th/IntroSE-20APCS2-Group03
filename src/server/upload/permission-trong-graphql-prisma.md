Với bất kì hệ thống backend nào, permission và authentication luôn là những vấn đề quan trọng cần quan tâm. 

Với ai đã từng tiếp xúc qua với GraphQL thì đều có thể nhận ra điều này - GraphQL là một hệ thống mở. Nhìn vào một hệ thống GraphQL thì phía client hoàn toàn có thể thấy được toàn bộ các API cũng như cấu trúc data của hệ thống. Điều này [có thể thay đổi sau này](https://github.com/graphql/graphql-js/issues/113) - nhưng hiện giờ thì toàn bộ các hoạt động cũng như dữ liệu của hệ thống đều bị phơi bày ra hết.

Trong bài viết này, mình sẽ đề cập đến 1 vài cách cơ bản xử lý với permission khi sử dụng GraphqlQL thông qua Prisma. 


### Schema hệ thống

Với toàn bộ bài viết này, mình sẽ chỉ sử dụng 1 cấu trúc dữ liệu để có thể dễ dàng so sánh được các cách tiếp cận với nhau. 

Schema trong bài sẽ bao gồm 3 bảng: User, AuthProvider (phương thức đăng nhập của 1 user - có thể là bằng user - password hay 3rd party login ...) và bảng App. Các app sẽ có owner là 1 User.

```
type User {
  id: ID! @unique
  name: String
  role: Role! @default(value: "USER")
  providers: [AuthProvider!]!
}

type AuthProvider {
  id: ID! @unique
  user: User!
  type: ProviderType!
  uuid: String @unique
  token: String
  email: String!
  password: String
}

type App {
  id: ID! @unique
  type: AppType!
  owner: User!
  members: [Member!]!
  info: String!
}
```
Nhìn vào 3 schema phía trên, ta sẽ thấy ngay được hàng loạt vấn đề - đó là bất cứ người nào có quyền truy cập vào GraphQL Server thì cũng sẽ có mọi người để xem, chỉnh sửa ... tóm lại là làm MỌI THỨ với dữ liệu của bạn.

Để tằng tính an toàn cho API, ít nhất ta có thể thêm vào một vài luật như sau:

- `UpdateAppInfo` sẽ chỉ có `owner` có quyền.
- xem thông tin của một app sẽ chỉ có `owner` và `member` có quyền.
- KHÔNG trả về password khi phía client lấy thông tin user.

## Cách số 1: Trâu bò

### Nhắc lại một chút về cấu trúc hệ thống

Trong hệ thống của mình, [Prisma](https://www.prisma.io/) chỉ là một lớp (layer) ORM ở giữa, ta vẫn cần có một GraphQL Server chính và ở đây thì mình sử dụng [GraphQL-Yoga](https://github.com/prismagraphql/graphql-yoga).

Thêm vào đó, ta sử dụng thêm [GraphQL-binding](https://github.com/graphql-binding/graphql-binding) để tự động sinh ra các hàm CRUD cơ bản cho API của mình.

### Xử lý permission trong resolver

Cách đơn giản nhất đó là ta có thể implement logic kiểm tra permission khi viết resolver:

```
const Mutation = {
  updateAppInfo: async (parent, { id, info }, context, info) => {
    const userId = getUserId(context);
    const app = await context.db.query.app({
      where: {
        id: id
      }
    });

    if(userId == app.owner.id) {
      // update logic
    } else throw new Error(
      // ... not found error
    )
  }
}
```

Ta tìm bản ghi `app` và so sánh `app.owner.id` với id của current user rồi sau đó mới cho phép thực hiện logic update.

Với cách tiếp cận này, về lâu dài, resolver của ta sẽ trở nên lộn xộn và trùng lặp với hàng loạt logic kiểm tra permission. 

## Cách số 2: Sử dụng GraphQL Directive

Với cách thứ 2 này, ta sẽ sử dụng một tính năng khác của GraphQL - Directive - để nhúng trực tiếp việc khai báo permission vào thẳng schema

```
directive @isOwner on FIELD | FIELD_DEFINITION
directive @privateField on FIELD | FIELD_DEFINITION

// ta sử dụng các directive kể trên để nhúng thẳng vào mutation
type Mutation {
  updateAppInfo(id: ID!, info: String!): App! @isOwner
}

// cũng như nhúng thẳng vào type definition trong schema
type AuthProvider {
  id: ID! @unique
  user: User!
  type: ProviderType!
  uuid: String @unique
  token: String
  email: String!
  password: String @privateField
}
```

So với cách đầu tiên, ta có thể thấy ưu điểm lớn nhất của cách này: đó là từ phía client nhìn vào thì hoàn toàn có thể thấy được các permission này mà không phải đọc vào code bên trong resolver. Cùng với đó, việc sử dụng lại 1 logic permission chỉ đơn giản là copy lại directive đó đến nơi mình muốn :)

Với cách thứ 2 này, ta sẽ thử viết resolver cho directive privateField. Như tên gọi của nó - `privateField` sẽ ẩn đi giá trị của trường mình muốn ẩn giấu, và nếu client vẫn cố tình query tới thì sẽ trả về 1 error cho phía client.

Bắt đầu với file `index.ts` - thường là nơi khởi tạo GraphQL Server của ta. 

```
import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import { resolvers, fragmentReplacements } from './resolvers'

const db = new Prisma({
  fragmentReplacements,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true,
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({ ...req, db })  
})

server.start({}, ({ port }) => console.log(`Server is running on http://localhost:${port}`))

```
Đoạn code ở trên mới chỉ khỏi tạo một Prisma Server, sau đó khởi tạo tiếp một GraphQL Server và kết nối 2 server này lại với nhau, các resolver logic chính được import từ bên ngoài.

Bây giờ ta sẽ tạo một directiveResolvers, sau đó import nó vào chỗ khai báo khởi tạo GraphQLServer phía trên.

```
// directive.resolvers.ts
export const directiveResolvers = {
  isPrivate: (next, source, {}, ctx) => {
    throw new Error(`Private field !`);
  },
  // ... các resolver khác ...
}

.............
// index.ts
import { directiveResolvers } from './directive.resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  directiveResolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({ ...req, db })  
})
```

resolver này rất đơn giản: khi gặp trường đi kèm với resolver này thì bắn thẳng ra error message. 

Đến giờ chạy thử :)

Trước khi ta đính kèm directive vào, việc truy cập để lấy ra password như là kết quả của 1 query hay mutation hoàn toàn không gặp cản trở gì.

![](https://images.viblo.asia/d6c6fd5d-58e3-463a-8b11-f2196159a741.png)

Sau khi ta đính kèm directive vào, việc lấy ra password sẽ trả về giá trị null đi kèm với 1 message thông báo lỗi.

![](https://images.viblo.asia/285d4c24-dc25-4f74-8be6-83546ad68a55.png)

## Cách số 3: Sử dụng GraphQL Middlewares

Nếu như sử dụng cách số 2 thì ta sẽ phải chọc thẳng vào schema của prisma. 
Còn ở cách thứ 3 này, ta sẽ sử dụng 1 tính năng khác nữa của GraphQL, đó là `middleware`.

Ta sẽ sử dụng package [`graphql-middleware`](https://github.com/prismagraphql/graphql-middleware) để implement. Việc cài đặt chỉ đơn giản với một câu lệnh

```
yarn add graphql-middleware
```

(thậm chí nếu ta sử dụng `graphql-yoga` thì package sẽ tự động được cài như là 1 dependency)

Việc sử dụng middleware cũng gần tương tự với directive. 

Đầu tiên ta khai báo middleware:

```
const isPrivated = async (resolve, parent, args, ctx, info) => {
  throw new Error(`access privated field`)
}

export const privateFields = {
  AuthProvider: {
    password: isPrivated,
  }
}
```

Nhìn vào hàm isPrivated ở ví dụ này, ta thấy số lượng params của hàm tăng lên 1, đó hàm `resolve` ở đầu: đối với 1 middleware, sau khi đi qua logic xử lý, middleware sẽ gọi tới hàm `resolve` này để xử lý tiếp giá trị của ta - thường là các middleware kế sau; nhưng với ví dụ ở đây thì ta chỉ đơn giản là trả luôn về error mà thôi.

Tiếp đó, `const privateFields` sẽ có nhiệm vụ export ra 1 object, object này sẽ được `graphql-middleware` ghép nối tiếp vào các query và mutation sẵn có của server. (Như thấy ở đoạn code trên thì ta thêm vào `isPrivated` cho trường password của bảng `AuthProvider`)

Lúc này, bên phía `index.ts` ta cũng tiến hành import tương tự như khi sử dụng directive.

```
import { privateFields } from './middlewares/privateFields';

...

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({ ...req, db }),
  middlewares: [privateFields],
})
```

Áp dụng middleware này, kết quả trả về cũng tương tự như với directive.

![](https://images.viblo.asia/9ef3366e-77bd-4b84-bd00-01ab426bf9a9.png)


## So sánh & kết luận:

Qua 3 cách trên, ta có thể thấy rằng việc áp dụng cách thứ 1 là không hề tối ưu một chút nào. Nếu nghiệp vụ có nhiều phần lặp đi lặp lại, cách 2 hoặc cách 3 sẽ được khuyến khích hơn.

So với cách 3 (và cách 1) thì cách 2 sẽ có 1 ưu điểm là phía client sẽ có thể nhìn thấy luôn cấu trúc dữ liệu cũng như các permission được implement ở đâu trong hệ thống của ta. Tuy nhiên khi sử dụng cách này với `graphql-yoga` và `prisma` thì lại đòi hỏi ta phải chỉnh sửa vào thẳng `schema`.  Cũng còn 1 cách nữa đó là có thể sử dụng keyword `extend` để mở rộng các bảng bên phía `graphql-yoga server`

```
extend type AuthProvider {  
  password: String @privateField
}
```

Tuy nhiên có vẻ như [keyword này chưa được implement trong `graphql-yoga` ](https://github.com/graphql/graphql-js/issues/483)

Vì vậy ta cũng có thể lựa chọn cách thứ 3 - tách hoàn toàn logic xử lý permission ra khỏi `schema` cũng như ra khỏi logic nghiệp vụ chính của hệ thống.



### Tham khảo

- https://www.prisma.io/blog/graphql-directive-permissions-authorization-made-easy-54c076b5368e/