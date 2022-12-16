Khi mới bắt đầu với GraphQL - một trong những câu hỏi đầu tiên là *làm thế nào để build một server GraphQL ?*  : Do GraphQL ban đầu được phát hành chỉ dưới dạng `đặc tả` (specification), do đó bạn có thể implement GraphQL Server của mình bằng bất cứ ngôn ngữ code nào.

Trước khi bắt đầu xây dựng một server, GraphQL yêu cầu bạn phải có trước hết là một `schema` - thứ cũng được dùng để định nghĩa API cho server. Trong bài viết này, chúng ta sẽ tìm hiểu những thành phần cơ bản nhất của một schema, cũng như cơ chế hoạt động khi implement các khái niệm này, từ đó hiểu được cách các thư viện hỗ trợ sẵn việc implement GraphQL như `GraphQL.js`, `graphql-tools` hay `graphene-js` hoạt động.

## `GraphQL schema` định nghĩa nên API cho server

### `Schema Definition Language` - SDL:

Như đã nói ở trên, GraphQL thực chất chỉ được phát hành dưới dạng `specification`, và có thể được implement bằng bất cứ ngôn ngữ lập trình nào, điều đó dẫn tới việc cần có một ngôn ngữ thống nhất chung mà mọi implementation của GraphQL đều phải tuân theo. Đối với GraphQL, ngôn ngữ chung này được sử dụng để viết schema - do đó nó được gọi là `Schema Definition Langulage` (SDL).

Ở dạng đơn giản nhất, GraphQL SDL có thể được dùng để định nghĩa các `type` như nhau:

```
type User {
  id: ID!
  name: String
}
```

type `User` ở trên - một mình nó không tự định nghĩa một chức năng nào cho phía client - chỉ đơn giản là định nghĩa cấu trúc cho model `user` trong app của mình. Để định nghĩa các chứng năng của app thông qua API, ta cần phải thêm một vài thứ nữa vào [root types](https://graphql.org/learn/schema/#the-query-and-mutation-types) của GraphQL Schema : `Query`, `Mutation` và `Subscription`. 3 loại type đặc biệt này định nghĩa *đầu vào* cho một GraphQL API.

Ví dụ với query dưới đây:

```
query {
  user(id: 1) {
    id
    name
  }
}
```

Query trên - được gửi từ client - chỉ được coi là valid nếu như bên phía server có định nghĩa tương ứng trong GraphQL schema: 

```
type Query {
  user(id: ID!): User
}
```

Ba loại root types trên - `Query`, `Mutation` và `Subscription` - chính là những thứ định nghĩa đầu vào cho 1 server - chúng liệt kê những loại query hay mutation nào sẽ được server chấp nhận.

Bất cứ một GraphQL server nào - dù được implement bằng ngôn ngữ gì - cũng đều phải tuân theo Schema nói trên, và client khi giao tiếp với server cũng sẽ chỉ cần hiểu được Schema là đủ - không cần quan tâm thực chất server được implement như thế nào.

> GraphQL Schema cung cấp một ràng buộc rõ ràng mà sẽ được cả hai phía client và server cùng dùng như một chuẩn giao tiếp.
 
### GraphQLSchema object là trung tâm của một GraphQL Server

`GraphQL.js` là hàng chính chủ của Facebook - nó là implementation của GraphQL bằng ngôn ngữ Javascript, và là nền cho một vài thư viện khác như `graphql-tools` hay `graphene-js`. Khi sử dụng bất cứ một thư viện nào kể trên, quá trình code cũng sẽ tập trung xoay quanh một object `GraphQLSchema`, bao gồm 2 thành phần chính:

- `definition` dưới dạng schema kể trên.
- `implementation` dưới dạng một loạt các hàm resolver.

Dưới đây là một `GraphQLSchema` cho ví dụ phía trên:

```
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query,
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLID }
        }
      }
    }
  })
})
```

Bạn có thể thấy, phiên bản SQL của schema có thể được dịch trực tiếp sang ngôn ngữ Javascript. Để ý rằng schema này vẫn chưa có bất cứ một resolver nào - do đó bạn sẽ chưa thể giao tiếp với server được, và sẽ được nói tới ở ngay section sau đây.

## Resolver implement logic cho API

### Structure (cấu trúc) vs Behaviour (hành vi) trong một server GraphQL

GraphQL có sự phân biệt rõ ràng giữa *structure* với *behaviour*. *structure* - như ta đã đề cập ở phần trên - chính là schema. Schema như một bản mô tả về những thứ mà server có khả năng cung cấp. Structure này được hiện thực hóa bằng một implementation - thứ sẽ xác định `behaviour` của server. Thành phần chính của implementation này được gọi là các hàm `resolver`.

> Đứng sau mỗi một trường (field) trong GraphQL schema là một resolver.
 
Ở dạng đơn giản nhất, một GraphQL server sẽ có một hàm resolver cho mỗi một field trong schema của nó. Mỗi resolver biết cách lấy dữ liệu cho trường tương ứng của nó. Khi mà một query của GraphQL có bản chất chỉ là một tập hợp các trường, việc mà một GraphQL Server cần làm khi xử lý một request đó là gọi và thực hiện tất cả các resolver tương ứng với các trường trong query. *(Đây cũng là lý do mà GraphQL thường đươc so sánh với một hệ thống dạng [RPC](https://en.wikipedia.org/wiki/Remoteprocedurecall) - một dạng ngôn ngữ chuyên để gọi tới các hàm remote)*

### Nhìn kĩ hơn vào một hàm resolver

Tiếp theo ví dụ phía trên : với trường `user` trong type `Query`, ta có thể thêm một hàm `resolve` tương ứng như sau:

```
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLID }
        },
        resolve: (root, args, context, info) => {
          const { id } = args      // argument `id` được khai báo ở trên
          return fetchUserById(id) // thực hiện truy cập vào DB
        }
      }
    }
  })
})
```

Với việc coi rằng `fetchUserById` là một hàm thực hiện việc truy cập vào database và lấy ra một đối tượng user (một object Javascript với `id` và `name`), hàm `resolve` giờ sẽ đảm nhiệm phần [thực thi (execution)](http://facebook.github.io/graphql/October2016/#sec-Executing-Requests) của schema.

Trước khi nghiên cứu kĩ hơn, hãy cùng nhìn qua 1 lượt 4 arguments được truyền vào resolver:

- `root`: Nhớ lại rằng ở trên ta đã nói rằng một GraphQL Server thực hiện một query bằng cách gọi tới các resolver tương ứng với các trường. GraphQL thực hiện điều này theo thuật toán [BFS](https://en.wikipedia.org/wiki/Breadth-first_search), đồng thời argument `root` ở mỗi lần gọi resolver chính là kết quả của lời gọi ở nút phía cha (do đó với nút đầu tiên thì root có giá trị là `null`).
- `args`: argument này chứa các parameter dùng cho query, trong trường hợp này là `id` của `User` cần lấy về.
- `context`: một object được truyền xuyên suốt chuỗi resolver mà mỗi resolver đều có thể ghi vào và đọc thông tin ra (nói chung là 1 nơi để các resolver giao tiếp và chia sẻ thông tin)
- `info`: chứa `AST` của chính câu query hay mutation.

Ta đã nói ở trên *mỗi trường trong GraphQL schema đứng sau là một resolver*. Hiện giờ ta mới chỉ có 1 resolver, trong khi schema của ta có tận 3 trường: trường root `user` trong type `Query`, hai trường `id` và `name` trong type `User`. Hai trường phía sau vẫn cần có resolver :

```
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { 
      type: GraphQLID,
      resolve: (root, args, context, info) => {
        return root.id
      }
    },
    name: { 
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        return root.name
      }
    }
  }
})
```

Như đã nói ở trên, parameter `root`  chứa kết quả của resolver nút trên đó, trong trường hợp này chính là user lấy được về , và 2 resolver của `id` và `name` chỉ đơn giản rà lấy ra các trường `id` và `name` tương ứng từ user.

## Query execution

Cùng tìm hiểu cách mà query phía trên được thực thi và lấy dữ liệu về. 
Query bao gồm tổng cộng 3 trường: `user` (root), `id` và `name`. Điều này có nghĩa là khi server nhận được query, nó sẽ thực hiện việc gọi tới 3 hàm resolver. Cùng theo dõi luồng thực thi:

![](https://images.viblo.asia/046b7e5d-bafd-4e0f-b241-1068c145edf4.png)

1. query tới server
2. server gọi tới resolver cho root `user` - coi như hàm `fetchUserById` sẽ trả về object này `{ "id": "abc", "name": "Sarah" }`
3. server gọi tiếp tới resolver cho trường `id` của `User`. argument `root` cho resolver này chính là giá trị trả về từ lần gọi trên, và ở đây chỉ cần trả về `root.id`
4. Tương tự với bước 3, trả về `root.name` (chú ý rằng 3 và 4 có thể chạy song song)
5. Quá trình phân tách kết thúc - kết quả cuối cùng được gộp lại vào trường `data` và trả lại về cho client

```
{
  "data": {
    "user": {
      "id": "abc",
      "name": "Sarah"
    }
  }
}
```

Khi sử dụng các thư viện implement cho GraphQL (ví dụ như GraphQL.js), việc tự viết các resolver như kiểu `user.id` hay `user.name` là không còn cần thiết nữa - các thư viện sẽ làm thay thế cho ta đối với các resolver dạng đơn giản như thế này. 

## Tối lưu lại request: Dataloader pattern

Với cách tiếp cận như ở trên, việc client gửi một request yêu cầu một cấu trúc lồng sâu sẽ rất dễ dẫn tới vấn đề về performance. Lấy ví dụ với trường hợp API của ta có thể trả về một danh sách các `articles` với các `comments` lồng trong:

```
query {
  user(id: "abc") {
    name
    article(title: "GraphQL is great") {
      comments {
        text
        writtenBy {
          name
        }
      }
    }
  }
}
```

Ở trên, ta yêu cầu lấy một bài article cụ thể từ user, đi kèm với tất cả comment của nó cùng tên của người viết comment.

Cho rằng article này có 5 comment, và đều được viết bởi cùng 1 người. Điều đó có nghĩa là ta sẽ phải gọi resolver `writtenBy` 5 lần và nó sẽ đều trả về cùng 1 data 5 lần. Đây là lúc [Dattaloader](https://github.com/facebook/dataloader) xuất hiện và cho phép ta tối ưu lại  các phép query như ở trường hợp này, qua đó tránh được vấn đề N+1. Ý tưởng đứng sau giải pháp này đó là các lời gọi resolver được gọi theo đợt (batched) và database sẽ chỉ bị gọi một lần duy nhất.

## GraphQL.js vs graphql-tools 

Giờ hãy nói về một vài thư viện khác hỗ trợ việc implement GraphQL bằng javascript - chủ yếu là giới thiệu về `graphql-tools` và so sánh nó với GraphQL.js.

### GraphQL.js cung cấp nền tảng cho graphql-tools 

GraphQL.js thực hiện tất cả các công việc nặng nhọc: từ định nghĩa các type cần thiết, thực hiện việc xây dựng schema cho tới phân tách và xác thực (validate) query. Trong khi đó, `graphqlq-tools` đóng vai trò như một lớp trung gian nằm phía trên GraphQL.js. 

Cùng nhìn qua 1 lượt các tính năng mà GraphqlQL.js cung cấp:
- `parse` và `buildASTSchema`: với đầu vào là một GraphQL schema dưới dạng string trong GraphQL SDL, 2 hàm này sẽ thực hiện việc tạo ra một đối tượng `GraphQLSchema` : `const schema = buildASTSchema(parse(sdlString))`.
- `validate`: đầu vào là một đối tượng `GraphQLSchema` và một query, hàm này sẽ đảm bảo query kia phù hợp với API được định nghĩa bởi schema
- `execute`: đầu vào là một đối tượng `GraphQLSchema` và một query, hàm này gọi tới resolver và tạo response tương ứng với đặc tả GraphQL. Hàm này chỉ chạy khi mà các resolver là một phần của đối tượng `GraphQLSchema`
- `printSchema`: đầu vào là một đối tượng `GraphQLSchema` và đầu ra là mô tả của schema đó dưới dạng string.

Chú ý rằng hàm quan trọng nhất của GraphQL.js là `graphql` - nhận đầu vào là một đối tượng `GraphQLSchema` và một query, sau đó gọi `validate` và `execute`:

```
graphql(schema, query).then(result => console.log(result));
```

> Để hiểu hơn về các function này, bạn có thể nhìn qua [đoạn script đơn giản sau](https://github.com/nikolasburk/plain-graphql/blob/graphql-js/src/index.js) làm ví dụ.

Hàm `graphql` sẽ thực hiện câu query GraphQL bằng một schema mà bản thân schema đó đã chứa cả `structure` lẫn `behaviour`. Chức năng chính của `graphql` đó là phân tách, kết nối các lời gọi hàm resolver rồi sau đó gói các kết quả trả về và sắp xếp lại theo định dạng mong muốn của query. 

### Graphql-tools: kết nối giữa interface và implementation

Một trong những lợi ích khi sử dụng GraphQL đó là ta có thể tiến hành dev theo quy trình `schema-first` - tức là mọi tính năng mà ta đang và sẽ build có thể được đăng kí trước trong GraphQL schema, sau đó mới được implement sau bằng resolver tương ứng. Cách tiếp cận này có nhiều ưu điểm, ví dụ như nó cho phép developer phía client biết trước định dạng API dể tiến hành code với một mocked API , trước khi logic thật sự được dev phía backend bổ sung sau.

> Thiếu sót lớn nhất của GraphQL.js đó là nó không cho phép viết một schema trong SDL rồi sau đó dễ dàng tạo ra một phiên bản thực-thi-được (executable) của schema đó.
 
Như đã nói ở trên, ta có thể tạo một đối tượng `GraphQLSchema` bằng `parse` và `buildASTSchema`, nhưng cuối cùng thì vẫn thiếu các hàm `resolve` - nơi mà việc thực thi logic được thực hiện. Ta buộc phải tự thêm bằng tay các hàm `resolve` vào `fields` của schema.

Đây là lúc mà `graphql-tools` xuất hiện và lấp vào khoảng trống này, với việc thư viện này cung cấp một chức năng rất quan trọng: `addResolveFunctionsToSchema`. Hàm này cực kì hữu ích khi nó có thể được dùng để xây dựng một API SDL đẹp hơn cho schema. 
Hãy cùng xem cách mà `graphql-tools` thực hiện điều này với hàm `makeExecutableSchema`:

```
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
type Query {
  user(id: ID!): User
}
type User {
  id: ID!
  name: String
}`

const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return fetchUserById(args.id)
    }
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
```

Vậy, lợi ích lớn nhất của việc dùng `graphql-tools` đó nó cho phép việc kết nối schema với các hàm resolver nhanh chóng và trông đẹp hơn :)

### Khi nào thì không xài graphql-tools

Ta vừa học được là `graphql-tools` đóng vai một layer phía trên GraphQL.js, vì vậy có một số trường hợp việc sử dụng library này là không cân thiết. 
`graphql-tools` làm cho quy trình phát triển được dễ dàng hơn, đổi lại là ta phải chịu hi sinh về tính linh hoạt. Tool này giúp cho việc xây dựng lên một `GraphQLSchema` ban đầu được nhanh chóng hơn, tuy nhiên theo thời gian, khi mà backend của bạn tăng thêm yêu cầu đòi hỏi, ví như schema có thể được thay đổi (modify) hay cần có thể xây dựng một cách linh động hơn (dynamically constructing), lúc này có thể `graphql-tools` không phù hợp với các hệ thống nữa và ta cần quay trờ về sử dụng thuần GraphQL.js.

### Lướt qua về graphene-js 

[`graphene-js`](https://github.com/graphql-js/graphene) là một thư viện GraphQL còn khá mới, ý tưởng của nó xuất phát từ [phiên bản python của nó](https://github.com/graphql-python/graphene).

`graphene-js` tương thích với các syntax cũng như tính năng mới nhất của Javascript, cung cấp một bộ API trực quan với việc query và mutation có thể được implement dưới dạng Javascript class. Thực sự là rất thú vị khi ngày càng nhiều GrapleQL implementation xuất hiện, làm phong phú hơn cho hệ sinh thái chung :)

## Kết luận

Trong bàì viết này, ta đã tìm hiểu cơ chế hoạt động bên trong của một GraphQL. Bắt đầu với GraphQL schema - thứ định nghĩa cấu trúc API cho server,  xác định các query và mutation được chấp nhận, cũng như định dạng response trả về sẽ ra sao. Sau đó ta tìm hiểu sâu hơn về các hàm resolver và vẽ ra mô hình hoạt động được thực hiện bởi GraphQL engine khi giải quyết một query đầu vào. Cuối cùng ta kết thúc với việc giới thiệu một vài thư viện Javascript giúp cho việc implement một GraphQL Server.

Trong bài kế tiếp, ta sẽ tìm hiểu tiếp về tầng mạng - cách mà một server GraphQL giao tiếp với client, cùng với đó là một loạt các thư viện tiếp theo giúp việc implement một server GraphQL - `express-graphql`, `apollo-server`, `graphql-yoga`. 

### Nguồn dịch:

https://blog.graph.cool/graphql-server-basics-the-schema-ac5e2950214e