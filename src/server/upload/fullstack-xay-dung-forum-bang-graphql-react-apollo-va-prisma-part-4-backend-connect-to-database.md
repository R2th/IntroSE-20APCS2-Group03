Hi mọi người!. Tiếp tục với series xây dựng forum bằng GraphQL, React, Apollo, Nodejs và Prisma.

Link toàn bộ series các bạn có thể xem ở [đây](https://viblo.asia/u/nguyenphuongthuan95)

Ở phần trước chúng ta đã tìm hiểu qua về Mutation và Query cơ bản. Cách đọc dữ liệu với `Query` và cách update dữ liệu với `Mutation` sử dụng `resolvers`.
Phần này, chúng ta sẽ cùng nhau đi kết nối với Database và thao tác với Database thông qua Prisma Client (mình sẽ đề cập chi tiết bên dưới)

# Prisma là gì và vì sao sử dụng Prisma?
![](https://images.viblo.asia/085a29df-ca49-406a-bed5-8628f4c66bb6.png)

Prisma là một [Object Relational Mapping](https://en.wikipedia.org/wiki/Object-relational_mapping) (ORMs) được dùng để xây dựng các máy chủ như GraphQL Server, RESTful APIs, microservice, ...etc.


Như mình đã giới thiệu ở bài viết đầu tiên của series này. Prisma đơn giản là 1 layer nằm giữa Webserver và Database.
Prisma giúp chúng ta giao tiếp với db một cách dễ dàng hơn. 

Cách truyền thống mà Webserver giao tiếp với Database là thông qua các câu lệnh SQL Query như `SELECT`, `UPDATE` hay `DELETE`
Giờ đây, giờ vào các công cụ ORMs nói chung và Prisma nói riêng. Chúng tạo ra một tầng abstraction giữa Webserver và Database. 
Điều này giúp cho lập trình viên dễ dàng trong việc thao tác với Database. Thay vì viết những câu lệnh SQL khô khan, có thể sai bất cứ lúc nào thì chúng ta có thể viết các hàm tương ứng. 

Traditional solution: 
```
Select * from Posts where title = "GraphQL API";
INSERT INTO Posts VALUES ("Graphql API", "Learning how to Writting GraphQL API", "thuan");
```

ORMs solution (JavaScript implementation)
```
const posts = prisma.posts({ title: "GraphQL API" });
const newPost = prisma.createPost({ 
    title: "Graphql API", 
    description: "Learning how to Writting GraphQL API", 
    author: "thuan" 
});
```

Việc sử dụng ORMs cũng cho chúng ta khả năng tuỳ biến rất cao. Trong hầu hết case phức tạp thì ORMs đều có thể handle được. Chúng ta hãy cùng tìm hiểu nhé. 


# Cài đặt Prisma và thao tác với Database

Prisma cho chúng ta 2 lựa chọn để setup Database:

+ Tạo mới Database: Sử dụng Local Database (sử dụng Docker để building và running) hoặc Demo Database (Sử dụng dịch vụ của Prisma: [Prisma Cloud](https://www.prisma.io/docs/get-started/01-setting-up-prisma-demo-server-JAVASCRIPT-a001/))
+ Từ Design Database có sẵn: Các bạn có thể xem thêm ở [đây](https://www.prisma.io/docs/1.28/get-started/01-setting-up-prisma-existing-database-JAVASCRIPT-a003/).

Điều hay ho ở đây là chúng ta không cần quan tâm đến việc sử dùng Database nào (Mysql, PostgresQL, MongoDB, ...) Với mỗi loại, Prisma sẽ có cách handle mà vẫn đảm bảo tính chặt chẽ. 

Ở đây mình sẽ sử dụng Local Database để tạo Database. Các bạn cũng có thể sử dụng demo server. Xem hướng dẫn tại [đây](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/).

Sử dụng demo Server sẽ dễ dàng hơn cho việc cài đặt và cấu hình. Nhưng mình vẫn ưu tiên sự ổn định và tốc độ nên mình sẽ quyết định sử dụng local :)

Về cơ bản thì việc sử dụng Local Database hay Demo Database đều sẽ trả về một PRISMA_ENDPOINT để chúng ta có thể kết nối với GraphQL Server.

Open Terminal, đầu tiên là install Prisma:
```
npm install -g prisma
```

Install Docker: Để sử dụng Prisma locally, chúng ta ***bắt buộc*** phải install Docker. Các bạn có thể download Docker Community Edition ở [đây](https://docs.docker.com/ee/).

Tạo Docker Image, tại root folder:
```
touch docker-compose.yml
```

Mình sử dụng MySQL, docker image của MySQL, paste đoạn code này vào file `docker-compose.yml`.
```
version: '3'
services:
  prisma:
    image: prismagraphql/prisma:1.28
    restart: always
    ports:
    - "4466:4466"
    environment:
      PRISMA_CONFIG: |
        port: 4466
        databases:
          default:
            connector: mysql
            host: mysql
            port: 3306
            user: root
            password: prisma
            migrations: true
  mysql:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: prisma
    volumes:
      - mysql:/var/lib/mysql
volumes:
  mysql:
  ```
  
Build image:
```
docker-compose up -d
```

Init Prisma:
```
prisma init --endpoint http://localhost:4466
```
![](https://images.viblo.asia/7bf36747-76ef-4efc-8987-3478238cec11.png)

Prisma init sẽ khởi tạo ra 2 file:
+ `datamodal.prisma`: File này sẽ chứa toàn bộ Schema. Ở đây Prisma cho chúng ta một Schema `User` có sẵn. Chẳng hạn mình sẽ add thêm 1 Schema nữa đặt tên là `Post`. 
```
type Post {
    id: ID! @unique
    title: String!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
}

type User {
   id: ID! @unique
   name: String!
   email: String!
   posts: [Post!]!
}
```

+ `prisma.yml`: File này sẽ chứa các configuration cần thiết để deploy lên Prisma Server bao gồm endpoint, datamodal, hooks, generate, etc.. (chúng ta sẽ cùng nhau đi tìm hiểu chi tiết ở những phần sau).

OK giờ có thể deploy đc rồi :v: 
```
prisma deploy
```

![](https://images.viblo.asia/728b9062-2044-472b-a37f-56134f7fc36b.png)

Truy cập  `http://localhost:4466` và thao tác một số câu `Query` và `Mutation`:


![](https://images.viblo.asia/f50a91a7-2856-4fa6-8a9e-87b2ed09be86.png)

KHởi tạo `Mutation` có tên là `createUser`.
Ở bên phải `Prisma` đã generate cho chúng ta toàn bộ Documentation và Schema mà chúng ta vừa tạo. Cùng với đó là những operation cơ bản READ, CREATE, UPDATE, DELETE.

Xem toàn bộ list các users:
```
query getUsersList {
	users {
    id
    name
    email
  }
}
```

Tiếp theo là Tạo 1 `Post` với và connect với `User` vừa tạo thông qua `id`. Execute mutation `createPost` 
```
mutation createPost {
  createPost(
    data: {
      title:"Learn GraphQL"
      content:"Create GraphQL using Prisma"
      author: {
        connect: {id:"cjti9k0lj001z0803x8fkumge"}
      }
    }
  ) {
    id
    title
    content
    author{
      name
    }
    createdAt
    updatedAt
  }
}
```
![](https://images.viblo.asia/9e59cf8d-3e60-4678-905b-4ab38bcd9df9.png)

Nếu chúng ta muốn view và edit những dữ liệu trong Database thì có thể vào Prisma Admin thông qua URL: `http://localhost:4466/_admin`


Oke. Done. Giờ nếu chúng ta muốn thao tác với Prisma thông qua code thì sao nhỉ :?

Generate Prisma Client: 
Paste đoạn code này vào `prisma.yml`,  dưới `endpoint` và `datamodel`
```
endpoint: http://localhost:4466
datamodel: datamodel.prisma

generate:
  - generator: javascript-client
    output: ./generated/prisma-client/
```
    
Run
```
prisma generate
```

Khi này Prisma sẽ generate cho chúng ta 1 folder `./generated/prisma-client/` chứa tất cả những operation dựa trên file `datamodel.prisma`.

Building simple Node application
```
touch index.js
```

Init `package.json` file và install `prisma-client-lib`  (thư viện này sẽ giúp chúng ta sử dụng với Prisma Client vừa mới được generate bên trên)
```
npm init -y
npm install --save prisma-client-lib
```

Oke, let's write some code :D

`index.js`
```
const { prisma } = require('./generated/prisma-client')

async function main() {

  // Create a new user
  const newUser = await prisma.createUser({ name: 'Thuan', email: 'thuan@gmail.com' })
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id}), (Email: ${newUser.email})`)

  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log(`Users List`, JSON.stringify(allUsers, null, 2))

  // Create a new Post and connect to user.
  const newPost = await prisma.createPost({
    title: 'GraphQL post',
    content: 'GraphQL is awesome',
    author: {
      connect: { id: newUser.id }
    }
   })

  console.log(`Created new post: `, JSON.stringify(newPost, null, 2))
   
}

main().catch(e => console.error(e))
```

Run Node app, 
```
node index.js
```

Và đây là kết quả, chúng ta cũng có thể kiểm tra trong Prisma Admin (`http://localhost:4466/_admin`)

![](https://images.viblo.asia/7bc1d659-5ef4-4559-84a5-4a3d0b40f964.png)


# Kết luận
Vậy là ở phần này chúng ta đã khởi tạo Database thành công. Phần tiếp theo chúng ta sẽ cùng đi xây dựng những function cơ bản cho Forum.

Các bạn có thể download source code ở đây [Github](https://github.com/phuongthuan/forum-graphql)


Happy Coding!

Source: 
https://www.prisma.io/
https://graphql.org/learn/