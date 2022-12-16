GraphQL là gì? 
Khi phát triển những dự án đa nền tảng (web,android,ios) , để client kết nối đến server chúng ta đã quá quen thuộc với khái niệm REST API.
Nhưng từ năm 2012, gã khổng lồ Facebook đã đưa ra 1 khái niệm hoàn toàn mới, và đã được áp dụng và sản phẩm của họ, chính là app Facebook mà chúng ta đang sử dụng. Vậy thì tại sao với REST đã tồn tại rất lâu và được coi là tiêu chuẩn thiết kế phần mềm lại là 1 vấn đề của FB ?
Đã có rất nhiều những bài nó về việc tại sao lại là GraphQL, các bạn có thể tham khảo tại sao ở tại đây: https://www.howtographql.com/basics/1-graphql-is-the-better-rest/
Trong bài này, mình sẽ tập trung vào xây dựng 1 server bằng NodeJS
OK, bắt đầu nhé:
## Tạo project
```
mkdir hackernews-node
cd hackernews-node
yarn init -y
```
## Tạo  raw GraphQL server
> Mở terminal, tạo folder src và file index.js trong đó, cú pháp sẽ như sau: 
```
mkdir src
touch src/index.js
```
## Add dependency  cho project
Trong thư mục gốc của project (hackernews-node)  chạy lệnh:

`yarn add graphql-yoga`

graphql-yogalà một server  GraphQL đầy đủ tính năng. Nó dựa trên Express.js và một vài thư viện khác để giúp bạn xây dựng các máy server GraphQL 

## Tạo 1 server GraphQL
> Trong index.js 
```
const { GraphQLServer } = require('graphql-yoga')

// 1
const typeDefs = `
type Query {
  sum(a:Int!,b:Int!): Int!
}
`

// 2
const resolvers = {
  Query: {
   sum: (root, args) => { return (args.a + args.b) },
  }
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
```
Trong ví dụ bên trên ta thấy: 
Đầu tiên, cần phải khai báo thư viện, ở đây chính là GRAPHQL-YOGA
```
const { GraphQLServer } = require('graphql-yoga')
```
> Các typeDefs ằng số định nghĩa của bạn schema GraphQL .Ở đây, nó định nghĩa một Queryloại đơn giản với một trường được gọi info. Lĩnh vực này có loại String!. Dấu chấm than trong định nghĩa loại có nghĩa là trường này không bao giờ có thể null.
> Graphql có một 3 loại sau: 
1. > Query :Tương ứng với GET trong REST
2. Mutation: Tương ứng với PUT,POST,DELETE trong REST
3. Subcription: Tương ứng với socket trong REST, để xử lý vấn đề realtime 

> resolvers: Là nơi chúng ta sẽ xử lý logic và trả ra kết quả, nhìn vào ví dụ trên ta thấy, khi gọi đến hàm tính tổng, sẽ trả ra kết quả là a + b
> Cuối cùng, chúng ta sẽ đăng ký 2 fun trên với server của GraphQL, và start server

Trong root folder, bạn gọi lệnh: 

```
node src/index.js
```

nếu như hiển thị như bên dưới là bạ đã thành công khi tạo ra 1 graphql sever bằng NodeJS và bắt đầu chiến đấu với những bài đầu tiên

![](https://images.viblo.asia/5f8540c5-3c4d-4243-aa10-2048434d309c.png)

Bài viết được tham khảo từ: https://www.howtographql.com/graphql-js/1-getting-started/