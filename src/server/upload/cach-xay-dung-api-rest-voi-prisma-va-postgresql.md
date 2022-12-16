# I. Giới thiệu
Prisma là một Object Relational Mapping (ORMs) được dùng để xây dựng các máy chủ như GraphQL Server, RESTful APIs, microservice, ... Prisma đơn giản là 1 layer nằm giữa Webserver và Database. Prisma giúp chúng ta giao tiếp với db một cách dễ dàng hơn.

Prisma bao gồm ba phần chính:

**Prisma Client :** Trình tạo truy vấn an toàn và được tạo tự động cho Node.js và TypeScript.

**Prisma Migrate :** Một hệ thống di chuyển và mô hình hóa dữ liệu khai báo.

**Prisma Studio :** Một GUI để xem và chỉnh sửa dữ liệu trong cơ sở dữ liệu của bạn.

Cách truyền thống mà Webserver giao tiếp với Database là thông qua các câu lệnh SQL Query như SELECT, UPDATE hay DELETE. Giờ đây, nhờ vào các công cụ ORMs nói chung và Prisma nói riêng. Chúng tạo ra một tầng abstraction giữa Webserver và Database. Điều này giúp cho lập trình viên dễ dàng trong việc thao tác với Database. Thay vì viết những câu lệnh SQL khô khan, có thể sai bất cứ lúc nào thì chúng ta có thể viết các hàm tương ứng.

Trong hướng dẫn này, mình sẽ xây dựng API REST cho một ứng dụng viết blog nhỏ trong TypeScript bằng cách sử dụng Prisma và cơ sở dữ liệu PostgreSQL . Mình sẽ thiết lập cục bộ cơ sở dữ liệu PostgreSQL của mình bằng Docker và triển khai các tuyến API REST bằng Express . Ở phần cuối của hướng dẫn, mình sẽ có một máy chủ web chạy cục bộ trên máy của mình, nó có thể phản hồi các yêu cầu HTTP khác nhau như đọc, ghi dữ liệu trong cơ sở dữ liệu.

# II. Điều kiện tiên quyết
Để làm được những yêu cầu trên mọi người cần cài đặt những công cụ sau:
- Node.js v10 trở lên được cài đặt trên máy của bạn. Bạn có thể xem các hướng dẫn cách Cài đặt Node.js và tạo môi trường phát triển ở trên mạng.
- Docker (để chạy cơ sở dữ liệu PostgreSQL). 
-  Ngoài ra nếu bạn có biết cơ bản về API TypeScript và REST thì càng tốt tuy nhiên không bắt buộc đối với hướng dẫn của mình.

## Bước 1 - Tạo Dự án TypeScript.
Trong bước này, mình sẽ thiết lập một dự án TypeScript bằng cách sử dụng npm. Dự án này sẽ là nền tảng cho API REST mà mình sẽ xây dựng trong ví dụ này.

Đầu tiên, hãy tạo một thư mục mới cho dự án (mình đang dùng terminal trên unbutu 18.05):
```php
mkdir my-blog
```
Tiếp theo, điều hướng vào thư mục và khởi tạo một dự án trống . Lưu ý rằng -y là tùy chọn bỏ qua các lời nhắc tương tác của lệnh. Để bỏ qua các lời nhắc, hãy thêm  -y vào lệnh init:
```php
cd my-blog
npm init -y
```
Để biết thêm chi tiết về những lời nhắc này, mọi người có thể tìm hiểu thêm trên mạng .

Sau khi chạy lệnh trên mọi người sẽ nhận được đầu ra tương tự như sau:
```php
Output
Wrote to /.../my-blog/package.json:

{
  "name": "my-blog",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
Lệnh này tạo một file package.json file này được sử dụng làm file cấu hình cho dự án của mình . Bây giờ mọi người đã sẵn sàng để cấu hình TypeScript trong dự án của mình chưa.

Thực thi lệnh sau để thiết lập TypeScript đơn giản:
```php
npm install typescript ts-node @types/node --save-dev
```
Điều này cài đặt ba gói cần thiết vào dự án của mình:

typescript: Chuỗi công cụ TypeScript.
ts-node: Một gói để chạy các ứng dụng TypeScript mà không cần biên dịch trước sang JavaScript.
@types/node: Định nghĩa kiểu TypeScript cho Node.js.
Điều cuối cùng cần làm là thêm một file tsconfig.json để đảm bảo TypeScript được định cấu hình đúng cho ứng dụng chúng ta sẽ xây dựng.

Đầu tiên, hãy chạy lệnh sau để tạo tệp:
```php
nano tsconfig.json
```
Thêm mã JSON sau vào tệp:
```php
my-blog / tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```
Lưu và thoát khỏi tệp.

Đây là cấu hình tiêu chuẩn và tối thiểu cho một dự án TypeScript. Nếu mọi người muốn tìm hiểu về các thuộc tính riêng lẻ của tệp cấu hình có thể tra cứu chúng trong tài liệu TypeScript .

Như vậy mình đã hướng dẫn mọi người cách thiết lập dự án TypeScript bằng cách sử dụng npm. Tiếp theo, mình sẽ thiết lập cơ sở dữ liệu PostgreSQL của mình với Docker và kết nối Prisma với nó.

## Bước 2 - Thiết lập Prisma với PostgreSQL
Trong bước này, mình sẽ cài đặt Prisma CLI , tạo tệp giản đồ Prisma ban đầu và thiết lập PostgreSQL với Docker và kết nối Prisma với nó. Lược đồ Prisma là tệp cấu hình chính cho thiết lập Prisma của mình và chứa lược đồ cơ sở dữ liệu.

Bắt đầu bằng cách cài đặt Prisma CLI bằng lệnh sau:
```php
npm install @prisma/cli --save-dev
```
Cách tốt nhất, mọi người nên cài đặt Prisma CLI cục bộ trong dự án của mình (trái ngược với cài đặt toàn cầu). Điều này giúp tránh xung đột phiên bản trong trường hợp bạn có nhiều hơn một dự án Prisma trên máy của mình.

Tiếp theo, mình sẽ thiết lập cơ sở dữ liệu PostgreSQL của mình bằng Docker. Tạo tệp Docker Compose mới bằng lệnh sau:
```php
nano docker-compose.yml
```
Bây giờ thêm mã sau vào tệp mới tạo:
```php
my-blog / docker-compost.yml
version: '3.8'
services:
  postgres:
    image: postgres:10.3
    restart: always
    environment:
      - POSTGRES_USER=sammy
      - POSTGRES_PASSWORD=your_password
    volumes:
      - postgres:/var/lib/postgresql/data
    ports:
      - '5432:5432'
volumes:
  postgres:
  ```
Tệp Docker Compose này định cấu hình cơ sở dữ liệu PostgreSQL có thể được truy cập thông qua cổng 5432. Cũng lưu ý rằng thông tin xác thực cơ sở dữ liệu hiện được đặt là sammy(người dùng) và your_password(mật khẩu).Mọi người nhớ điều chỉnh các thông tin đăng nhập này cho phù hợp với máy của mình. Lưu và thoát khỏi tệp.

Với thiết lập trên, hãy tiếp tục và khởi chạy máy chủ cơ sở dữ liệu PostgreSQL bằng lệnh sau:
```php
docker-compose up -d
```
Đầu ra của lệnh này sẽ tương tự như sau:
```php
Output
Pulling postgres (postgres:10.3)...
10.3: Pulling from library/postgres
f2aa67a397c4: Pull complete
6de83ca23e55: Pull complete
. . .
Status: Downloaded newer image for postgres:10.3
Creating my-blog_postgres_1 ... done
```
Mọi người có thể xác minh rằng máy chủ cơ sở dữ liệu đang chạy bằng lệnh sau:

docker ps
Điều này sẽ xuất ra một cái gì đó tương tự bên dưới:
```php
Output
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
8547f8e007ba        postgres:10.3       "docker-entrypoint.s…"   3 seconds ago       Up 2 seconds        0.0.0.0:5432->5432/tcp   my-blog_postgres_1
```
Với máy chủ cơ sở dữ liệu đang chạy, bây giờ bạn có thể tạo thiết lập Prisma của mình. Chạy lệnh sau từ Prisma CLI:
```php
npx prisma init
```
Thao tác này sẽ in ra kết quả sau:
```php
Output
✔ Your Prisma schema was created at prisma/schema.prisma.
  You can now open it in your favorite editor.
```
Lưu ý rằng bạn nên đặt trước tất cả các lệnh gọi của Prisma CLI bằng npx. Điều này dùng để đảm bảo cài đặt cục bộ của bạn đang được sử dụng.

Sau khi bạn chạy lệnh, Prisma CLI đã tạo một thư mục mới được gọi prisma trong dự án của bạn. Nó chứa hai tệp sau:

- schema.prisma: file cấu hình chính cho dự án Prisma (sẽ bao gồm mô hình dữ liệu).
- .env: file dotenv để xác định URL kết nối cơ sở dữ liệu.
Để đảm bảo Prisma biết về vị trí cơ sở dữ liệu của bạn, hãy mở file .env và điều chỉnh DATABASE_URL biến môi trường.

Đầu tiên hãy mở file .env:
```php
nano prisma/.env
```
Bây giờ bạn có thể đặt biến môi trường như sau:
```php
my-blog / prima / .env
DATABASE_URL="postgresql://sammy:your_password@localhost:5432/my-blog?schema=public"
```
Đảm bảo thay đổi thông tin đăng nhập cơ sở dữ liệu thành thông tin bạn đã chỉ định trong tệp Docker Compose. Để tìm hiểu thêm về định dạng của URL kết nối, hãy truy cập tài liệu Prisma .

Sau khi hoàn tất, hãy lưu và thoát khỏi tệp.

Trong bước này, mình đã thiết lập cơ sở dữ liệu PostgreSQL của mình với Docker, cài đặt Prisma CLI và kết nối Prisma với cơ sở dữ liệu thông qua một biến môi trường. Trong phần tiếp theo, mình sẽ xác định mô hình dữ liệu của mình và tạo các bảng cơ sở dữ liệu.

## Bước 3 - Xác định Mô hình Dữ liệu và Tạo Bảng Cơ sở dữ liệu
Trong bước này, mình sẽ xác định mô hình dữ liệu của mình trong tệp lược đồ Prisma. Mô hình dữ liệu này sau đó sẽ được ánh xạ tới cơ sở dữ liệu với Prisma Migrate , sẽ tạo và gửi các câu lệnh SQL để tạo các bảng tương ứng với mô hình dữ liệu của mình. Vì mình đang xây dựng một ứng dụng viết blog, các bảng chính sẽ gồm người dùng và bài đăng.

Prisma sử dụng ngôn ngữ mô hình hóa dữ liệu của riêng mình để xác định hình dạng dữ liệu ứng dụng.

Trước tiên, hãy mở file schema.prisma bằng lệnh sau:
```php
nano prisma/schema.prisma
```
Bây giờ, hãy thêm các định nghĩa mô hình sau vào nó. Bạn có thể đặt các mô hình ở cuối tệp, ngay sau generator client:
```php
my-blog / prima / schema.prisma
. . .
model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```
Lưu và thoát khỏi tệp.

Bạn đang xác định hai model chính là User và Post. Mỗi model có một số trường đại diện cho các thuộc tính của nó. Các model sẽ được ánh xạ tới các bảng cơ sở dữ liệu; các trường đại diện cho các cột riêng lẻ.

Cũng lưu ý rằng có một mối quan hệ one-to-many giữa hai model. Điều này có nghĩa là một người dùng có thể được liên kết với nhiều bài đăng.

Sau khi có 2 model, bây giờ bạn có thể tạo các bảng tương ứng trong cơ sở dữ liệu bằng cách sử dụng Prisma Migrate. Hãy chạy lệnh sau:
```php
npx prisma migrate save --experimental --create-db --name "init"
```
Lệnh này tạo một sự di chuyển mới trên hệ thống tệp của bạn. Dưới đây là tổng quan nhanh về ba tùy chọn được cung cấp cho lệnh:

* --experimental: Bắt buộc vì Prisma Migrate hiện đang ở trạng thái thử nghiệm .
* --create-db: Cho phép Prisma Migrate tạo cơ sở dữ liệu có tên my-blog được chỉ định trong URL kết nối.
* --name "init": Chỉ định tên của quá trình di chuyển (sẽ được sử dụng để đặt tên cho thư mục di chuyển được tạo trên hệ thống tệp).
Đầu ra của lệnh này sẽ tương tự như sau:
```php
Output
New datamodel:

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}


Prisma Migrate just created your migration 20200811140708-init in

migrations/
  └─ 20200811140708-init/
    └─ steps.json
    └─ schema.prisma
    └─ README.md
 ```

Để chạy quá trình di chuyển đối với cơ sở dữ liệu và tạo bảng cho các model Prisma, mình sẽ chạy lệnh sau:
```php
npx prisma migrate up --experimental
```
Kết quả trả về như sau:
```php
Output
. . .
Checking the datasource for potential data loss...

Database Changes:

Migration            Database actions             Status

20200811140708-init  2 CreateTable statements.    Done 🚀

You can get the detailed db changes with prisma migrate up --experimental --verbose
Or read about them here:
      ./migrations/20200811140708-init/README.md


🚀    Done with 1 migration in 206ms.
```
Prisma Migrate hiện tạo các câu lệnh SQL cần thiết cho quá trình di chuyển và gửi chúng đến cơ sở dữ liệu. Sau đây là các câu lệnh tạo bảng SQL:
```php
CREATE TABLE "public"."User" (
  "id" SERIAL,
  "email" text  NOT NULL ,
  "name" text   ,
  PRIMARY KEY ("id")
)

CREATE TABLE "public"."Post" (
  "id" SERIAL,
  "title" text  NOT NULL ,
  "content" text   ,
  "published" boolean  NOT NULL DEFAULT false,
  "authorId" integer   ,
  PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```
Trong bước này, mình đã xác định mô hình dữ liệu của mình trong lược đồ Prisma và tạo các bảng cơ sở dữ liệu tương ứng với Prisma Migrate. Trong bước tiếp theo, mình sẽ cài đặt Prisma Client trong dự án của mình để có thể truy vấn cơ sở dữ liệu.

## Bước 4 - Các truy vấn của Prisma.
Prisma Client là một trình tạo truy vấn được tạo tự động và an toàn , mọi người có thể sử dụng để đọc và ghi dữ liệu theo chương trình trong cơ sở dữ liệu từ ứng dụng Node.js hoặc TypeScript. Mình sẽ sử dụng nó để truy cập cơ sở dữ liệu trong các tuyến API REST của mình, thay thế các ORM truyền thống hay các truy vấn SQL thuần túy.

Trong bước này, mình sẽ cài đặt Prisma Client và làm quen với các truy vấn mà nó có thể gửi đi. Trước khi triển khai các tuyến cho REST API, trước tiên mình sẽ kiểm tra một số truy vấn Prisma Client trong một tập lệnh đơn giản, có thể thực thi được.

Trước tiên, hãy cài đặt Prisma Client trong dự án bằng cách cài gói Prisma Client :
```php
npm install @prisma/client
```
Tiếp theo, tạo một thư mục mới có tên src sẽ chứa các tệp nguồn của bạn:
```php
mkdir src
```
Bây giờ hãy tạo một tệp TypeScript bên trong thư mục mới:
```php
nano src/index.ts
```
Tất cả các truy vấn Prisma Client bạn đều có thể thực hiện await trong mã của mình. Điều này yêu cầu bạn gửi các truy vấn bên trong một hàm async.

Thêm đoạn mã async sau để thực thi trong file index.ts:

my-blog / src / index.ts
```php
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... your Prisma Client queries will go here
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.disconnect())
```

- Nhập hàm PrismaClient tạo từ gói npm @prisma/client đã cài đặt trước đó .
- Khởi tạo PrismaClient bằng cách gọi hàm tạo và gán vào 1 biến prisma.
- Xác định một hàm sử dụng async (ai chưa biết có thể tìm hiểu thêm về async await trong node.js) được gọi là main nơi mình sẽ thêm các truy vấn Prisma Client của mình.
- Gọi hàm main, trong khi bắt bất kỳ ngoại lệ nào và đảm bảo Prisma Client đóng mọi kết nối cơ sở dữ liệu đang mở bằng cách gọi prisma.disconnect().
Với hàm main, bạn có thể bắt đầu thêm các truy vấn Prisma Client vào script. Điều chỉnh index.ts để trông như sau:

my-blog / src / index.ts
```php
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
        },
      },
    },
  })
  console.log('Created new user: ', newUser)

  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  })
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.disconnect())
 ```
Trong mã này, bạn đang sử dụng hai truy vấn Prisma Client:

- create: Tạo User . Lưu ý rằng mình đang sử dụng một bản ghi lồng nhau , nghĩa là mình đang tạo cả bản ghi User và  bản ghi Post trong cùng một truy vấn.
- findMany: Đọc tất cả các bản ghi có trong bảng User. 

Bây giờ hãy chạy script bằng lệnh sau:
```php
npx ts-node src/index.ts
```
Mọi người sẽ nhận được kết quả như sau:
```php
Output
Created new user:  { id: 1, email: 'alice@prisma.io', name: 'Alice' }
[
  {
    id: 1,
    email: 'alice@prisma.io',
    name: 'Alice',
    posts: [
      {
        id: 1,
        title: 'Hello World',
        content: null,
        published: false,
        authorId: 1
      }
    ]
  }
  ```
  
Lưu ý: Nếu mọi người đang sử dụng cơ sở dữ liệu GUI, mọi người có thể xác nhận rằng dữ liệu đã được tạo bằng cách xem các bảng User và Post. Ngoài ra, có thể xem dữ liệu trong Prisma Studio bằng cách chạy npx prisma studio --experimental.

Bây giờ mình đã sử dụng Prisma Client để đọc và ghi dữ liệu trong cơ sở dữ liệu của mình. Trong các bước còn lại, mình sẽ áp dụng kiến ​​thức mới đó để triển khai các tuyến cho một API REST mẫu.

## Bước 5 - Triển khai Lộ trình API REST đầu tiên.
Trong bước này, mình sẽ cài đặt Express trong ứng dụng của mình. Express là một khung web phổ biến cho Node.js mà bạn sẽ sử dụng để triển khai các tuyến API REST của mình trong dự án này. Tuyến đầu tiên bạn sẽ triển khai sẽ cho phép bạn tìm nạp tất cả người dùng từ API bằng cách sử dụng một yêu cầu GET. Dữ liệu người dùng sẽ được truy xuất từ ​​cơ sở dữ liệu bằng Prisma Client.

Cài đặt Express bằng lệnh sau:
```php
npm install express
```
Vì mình đang sử dụng TypeScript nên mình sẽ cài thêm một số phụ thuộc phát triển. Chạy lệnh sau để làm như vậy:
```php
npm install @types/express --save-dev
```
Với các phụ thuộc đã có, bạn có thể thiết lập ứng dụng Express của mình.

Bắt đầu bằng cách mở lại tệp nguồn chính của bạn:
```php
nano src/index.ts
```
Bây giờ hãy xóa tất cả mã trong file index.ts và thay thế bằng mã sau để bắt đầu với API REST:

my-blog / src / index.ts
```php
import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// ... your REST API routes will go here

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
```
Mình sẽ phân tích một chút
- Mình nhập PrismaClient và express từ các gói tương ứng thông qua npm.
- Khởi tạo PrismaClient bằng cách gọi hàm tạo và gán vào biên prisma.
- Tạo ứng dụng Express của mình bằng cách gọi hàm express().
- Thêm express.json(), phần mềm trung gian để đảm bảo dữ liệu JSON có thể được Express xử lý đúng cách.
Bạn khởi động máy chủ trên cổng 3000.

Bây giờ trên 2 hàm app.use và app.listen, hãy thêm mã sau:

my-blog / src / index.ts
```php
. . .
app.use(express.json())

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.listen(3000, () =>
console.log('REST API server ready at: http://localhost:3000'),
)
```
Sau khi được thêm, hãy lưu và thoát khỏi tệp của bạn. Sau đó khởi động máy chủ web cục bộ của bạn bằng lệnh sau:
```php
npx ts-node src/index.ts
```
Bạn sẽ nhận được kết quả sau:
```php
Output
REST API server ready at: http://localhost:3000
```
Để truy cập /users, bạn có thể trỏ trình duyệt của mình đến http://localhost:3000/users hoặc bất kỳ ứng dụng HTTP nào khác.

Trong hướng dẫn này, bạn sẽ kiểm tra tất cả các tuyến API REST sử dụng curl.

Lưu ý: Nếu bạn thích sử dụng ứng dụng HTTP dựa trên GUI, bạn có thể sử dụng các lựa chọn thay thế như Postwoman hoặc Ứng dụng khách REST nâng cao .

Để kiểm tra lộ trình của bạn, hãy mở tab hoặc cửa sổ mới trên terminal (để máy chủ web cục bộ của bạn có thể tiếp tục chạy) và thực hiện lệnh sau:
```php
curl http://localhost:3000/users
```
Bạn sẽ nhận được dữ liệu mà bạn đã tạo ở bước trước trong bảng User:
```php
Output
[{"id":1,"email":"alice@prisma.io","name":"Alice"}]
```

Mình đã triển khai tuyến API REST đầu tiên của mình tại /users. Trong bước tiếp theo, mình sẽ triển khai các tuyến API REST còn lại để thêm nhiều chức năng hơn cho API của mình.

## Bước 6 - Triển khai các tuyến API REST còn lại
Trong bước này, mình sẽ triển khai các tuyến API REST còn lại cho ứng dụng viết blog của mình. Cuối cùng, máy chủ web của mình sẽ đóng vai trò khác nhau GET, POST, PUT, và DELETE các yêu cầu.

Dưới đây là tổng quan về các lộ trình khác nhau mà bạn sẽ triển khai:

![](https://images.viblo.asia/cd5b2109-c252-42d3-a80c-f0c246131413.PNG)

Mình sẽ tiếp tục với các phương thức khác.

Mở index.ts bằng lệnh sau:
```php
nano src/index.ts
```
Tiếp theo, thêm đoạn mã sau vào quá trình triển khai đường dẫn /users:

my-blog / src / index.ts
```php
. . .

app.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })
  res.json(posts)
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findOne({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
```
Lưu và thoát khỏi tệp của bạn.

Mã này sử dụng phướng thức GET triển khai các tuyến API cho hai yêu cầu:

- /feed: Trả về danh sách các bài đăng đã xuất bản.
- /post/:id: Trả về một bài viết cụ thể theo ID của nó.
- 
Prisma Client được sử dụng trong cả hai cách triển khai. Trong quá trình /feedt riển khai, truy vấn bạn gửi bằng Prisma Client lọc tất cả các bản ghi trong bảng Post có cột published chứa giá trị true. Ngoài ra, truy vấn Prisma Client include cũng sử dụng để tìm nạp authort hông tin liên quan cho mỗi bài đăng được trả lại. Trong quá trình gọi /post/:id, bạn đang chuyền ID được truy xuất từ ​​đường dẫn của URL để đọc một Post bản ghi cụ thể từ cơ sở dữ liệu.

Bạn có thể dừng máy chủ nhấn CTRL+C vào bàn phím của mình. Sau đó, khởi động lại máy chủ bằng:
```php
npx ts-node src/index.ts
```
Để kiểm tra đường dẫn /feedt, bạn có thể sử dụng lệnh curl sau :
```php
curl http://localhost:3000/feed
```
Vì chưa có bài đăng nào được xuất bản nên phản hồi là một mảng trống:
```php
Output
[]
```
Để kiểm tra đường dẫn /post/:id, bạn có thể sử dụng lệnh curl sau :
```php
curl http://localhost:3000/post/1
```
Thao tác này sẽ trả về bài đăng bạn đã tạo ban đầu:
```php
Output
{"id":1,"title":"Hello World","content":null,"published":false,"authorId":1}
```
Tiếp theo, thực hiện hai request POST mới. Thêm mã sau vào index.ts sau các mã của phương thức GET:

my-blog / src / index.ts
```php
. . .

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  })
  res.json(result)
})

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
```

Sau khi hoàn tất, hãy lưu và thoát khỏi tệp của bạn.

Mã này sử dụng phương thức POST để tạo 2 yêu cầu:

- /user: Tạo người dùng mới trong cơ sở dữ liệu.
- /post: Tạo một bài đăng mới trong cơ sở dữ liệu.

Giống như trước đây, Prisma Client được sử dụng trong cả hai cách triển khai. Trong quá trình gửi request /user, bạn đang chuyền các giá trị từ body của yêu cầu HTTP đến hàm create của Prisma Client .

Các request /post sẽ truyền thêm dữ liệu lên server: Tại đây bạn không thể sử dụng trực tiếp các giá trị được gửi lên; thay vào đó, trước tiên bạn cần lấy chúng ra theo cách thủ công để chuyển chúng đến truy vấn Prisma Client. Lý do cho điều này là cấu trúc của JSON trong phần thân yêu cầu không khớp với cấu trúc mà Prisma Client mong đợi, vì vậy bạn cần tạo cấu trúc mong đợi theo cách thủ công.

Bạn có thể kiểm tra các tuyến mới bằng cách dừng máy chủ với CTRL+C. Sau đó, khởi động lại máy chủ bằng:
```php
npx ts-node src/index.ts
```
Để tạo người dùng mới thông qua request /user, bạn có thể gửi yêu cầu sau với curl:
```php
curl -X POST -H "Content-Type: application/json" -d '{"name":"Bob", "email":"bob@prisma.io"}' http://localhost:3000/user
```
Thao tác này sẽ tạo một người dùng mới trong cơ sở dữ liệu, kết quả in ra như sau:
```php
Output
{"id":2,"email":"bob@prisma.io","name":"Bob"}
```

Để tạo một bài viết mới thông qua request /post, bạn có thể gửi yêu cầu thông qua phương thức POST vơi curl:
```php
curl -X POST -H "Content-Type: application/json" -d '{"title":"I am Bob", "authorEmail":"bob@prisma.io"}' http://localhost:3000/post
```

Thao tác này sẽ tạo một bài đăng mới trong cơ sở dữ liệu và kết nối nó với người dùng bằng email bob@prisma.io. Nó in ra kết quả sau:
```php
Output
{"id":2,"title":"I am Bob","content":null,"published":false,"authorId":2}
```

Cuối cùng, bạn có thể thực hiện các phương thức  PUT và DELETE như sau.

Mở index.ts bằng lệnh sau:
```php
nano src/index.ts
```
Thêm mã PUT và DELETE sau các mã của post:

my-blog / src / index.ts
```php
. . .

app.put('/post/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  })
  res.json(post)
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
```

Lưu và thoát khỏi tệp của bạn.

Mã này triển khai các tuyến API cho một yêu cầu PUT và một yêu cầu DELETE:

- /post/publish/:id( PUT):Lấy ra một bài đăng theo ID của nó.
- /post/:id( DELETE): Xóa một bài đăng theo ID của nó.

Một lần nữa, Prisma Client được sử dụng trong cả hai cách triển khai. Trong quá trình gọi /post/publish/:id, ID của bài đăng sẽ được xuất bản được truy xuất từ ​​URL và chuyển đến truy vấn update của Prisma Client. Việc thực hiện /post/:id để xóa bài đăng trong cơ sở dữ liệu cũng lấy ID bài đăng từ URL và chuyển nó đến truy vấn delete của Prisma Client.

Một lần nữa, dừng máy chủ bằng CTRL+C bàn phím của bạn. Sau đó, khởi động lại máy chủ bằng:
```php
npx ts-node src/index.ts
```

Bạn có thể kiểm tra phương thức PUT bằng lệnh curl sau :
```php
curl -X PUT http://localhost:3000/post/publish/2
```

Điều này sẽ in ra bài đăng với giá trị ID là 2. Nếu bạn gửi lại yêu cầu /feed, bài đăng này sẽ được đưa vào phản hồi.

Cuối cùng, bạn có thể kiểm tra phương thức DELETE bằng lệnh curl :
```php
curl -X DELETE http://localhost:3000/post/1
```

Thao tác này sẽ xóa bài đăng có giá trị ID là 1. Để xác thực rằng bài đăng có ID này đã bị xóa, bạn có thể gửi lại yêu cầu GET /post/1.

Trong bước này, mình đã triển khai các tuyến API REST còn lại cho ứng dụng viết blog của mình. Các API yêu cầu GET, POST, PUT, và DELETE thực hiện chức năng đọc và ghi dữ liệu trong cơ sở dữ liệu.

# III. Phần kết luận
Trong bài viết này, mình đã tạo một máy chủ REST API với một số yêu cầu khác nhau để tạo, đọc, cập nhật và xóa dữ liệu người dùng và đăng cho một ứng dụng viết blog mẫu. Bên trong các tuyến API, mình đang sử dụng Prisma Client để gửi các truy vấn tương ứng đến cơ sở dữ liệu của mình.

Trong các bước tiếp theo, bạn có thể triển khai các tuyến API bổ sung hoặc mở rộng lược đồ cơ sở dữ liệu của mình bằng Prisma Migrate. Hãy chắc chắn bạn sẽ đọc liệu Prisma để tìm hiểu về các khía cạnh khác nhau của Prisma và khám phá một số dự án khac ví dụ như chạy  prisma-examples sử dụng các công cụ như GraphQL hoặc grPC API .

Link tham khảo:
- https://viblo.asia/p/fullstack-xay-dung-forum-bang-graphql-react-apollo-va-prisma-part-4-backend-connect-to-database-gDVK29dr5Lj
- https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql