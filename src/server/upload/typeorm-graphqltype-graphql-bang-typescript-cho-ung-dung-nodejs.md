![](https://images.viblo.asia/058bdd99-4cb9-4d2e-86da-cdc5f9794cb8.png)

Chào mọi người

Bài viết này sẽ hướng dẫn các bạn tạo một dứng dụng **Nodejs** với **TypeORM** và  **GraphQL** bằng **Typescript**

# 1. Giới thiệu
- [Nodejs](https://nodejs.dev/) thì hiện khá phổ biến hiện nay, nó được xây dựng dựa trên JavaScript runtime. Trước khi bắt đầu mọi thứ thì bạn hãy [download](https://nodejs.dev/download) về và cài đặt vào máy nhé
- [TypeORM](https://typeorm.io/#/) là một ORM library, dùng để xây dựng các model trong cở sở dữ liệu cũng như việc tương tác với chúng
- [Expressjs](https://expressjs.com/) là một framework dùng để xây dựng ứng dụng Nodejs.
- [Typescript](https://www.typescriptlang.org/) là một phiên bản nâng cao của Javascript, nó bổ sung kiểu, lớp và hướng đối tượng giúp cho bạn code dễ hơn và tránh sai sót các lỗi về kiểu
- [GraphQL](https://graphql.org/) là ngôn ngữ truy vấn các API. Nó cho phép phía client-side chỉ lấy các field cần thiết để xử lý trên Front-end
- [TypeGraphQL](https://typegraphql.com/) Khi bạn sử dụng lib này, bạn không cần định nghĩa các schema theo cách thông thường như ở [đây](https://graphql.org/learn/schema/#interfaces), chúng ta sẽ dùng các decorator trực tiếp trên model để GraphQL hiểu các schema của chúng ta 

# 2. Yêu cầu hệ thống
* [Node.js](https://nodejs.org/en/) 12.0 trở lên
* MacOS, Windows (bao gồm WSL), và Linux cũng được hỗ trợ
# 3. Bắt đầu
## 3.1 Khởi tạo project

Sau khi cài đặt **Nodejs**, bạn tạo 1 folder rỗng và dùng command line gõ lệnh `npm init` để tạo file tạo file `package.json`

## 3.2 Cấu hình Typescript
Đâu tiền bạn gõ các lệnh sau để cài đặt các package dùng để build **Typescript**

```
npm i --save-dev npm-run-all tsc tsc-watch rimraf
npm install typescript
```

Sau đó, bạn tạo file `tsconfig.json` trong root folder với nội dung cấu hình như bên dưới

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": [
      "dom",
      "es6",
    ] /* Specify library files to be included in the compilation. */,
    "sourceMap": true /* Generates corresponding '.map' file. */,
    "outDir": "dist" /* Redirect output structure to the directory. */,
    "rootDir": "src" /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
    /* Module Resolution Options */
    "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
    "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
    "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "compileOnSave": true,
  "exclude": ["node_modules"],
  "include": ["src/**/*.ts"]
}
```

- Property `include` chỉ đường dẫn các file **ts** sẽ được compile, `outDir` là chỉ đường các file **js** được compile ra, bạn có thể sửa chổ này theo cách của bạn, còn không thì xài mặc định như mình.
- `rootDir` chỉ ra root folder của tất cả files **ts**. Ở đây là thư mục **src**, vì thế bạn hãy tạo folder này trong thư mục root của bạn
- `compileOnSave: true` sẽ tự động build lại các file **ts** của bạn sau khi save

*Xem thêm tại https://www.typescriptlang.org/tsconfig*

Bạn mở file `package.json`, và update lại thuộc tính **scripts** như sau, Lưu ý là chỉ update chổ thuộc tính **scripts** thôi nha

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "clean": "rimraf dist/*",
    "tsc": "tsc",
    "dev": "npm-run-all build watch",
    "build": "npm-run-all clean tsc",
    "watch": "tsc-watch --onSuccess \"node dist/index\" --onFailure \"echo Beep! Compilation Failed\" --compiler typescript/bin/tsc"
 }
 ```
 
## 3.3 Tạo Models bằng TypeORM

### 3.3.1 Cài đặt
Bạn gõ các lệnh sau để cài đặt các package liên quan
```
npm i mysql reflect-metadata typedi@^0.8.0 typeorm@^0.2.37 typeorm-typedi-extensions@^0.2.3
npm i --save-dev @types/mysql
```

### 3.3.2 Tạo models

**Product**: Bạn tạo file `src/models/Product.ts` với nội dung như sau

```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Category } from "./Category";

@Entity()
@Unique(["code"])
export class Product {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Column({ type: "varchar" })
  public code!: string;

  @Column({ type: "varchar" })
  public name!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @ManyToOne((_type) => Category, (category: Category) => category.id)
  @JoinColumn({ name: "categoryId" })
  public category!: Category;
}
```

- `@Entity` báo cho TypeORM biết đây là 1 bảng trong db, có nhiều options trong decorator này nhưng mình chỉ sử dụng mặc định
- `@PrimaryGeneratedColumn` khoá chính tự động tăng dần
- `@Column` định nghĩa các thuộc tính của cột trong bảng
- `@Unique` xác định cột ***code*** sẽ là có giá trị duy nhất trong toàn bộ db
- `@ManyToOne` thể hiện mối quan hệ N-1 (nhiều Product thuộc một Category) với khoá ngoại là `categoryId` được định nghĩa bằng `@JoinColumn`

**Category**: Bạn tạo file `src/models/Category.ts` với nội dung như sau

```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Product } from "./Product";

@Entity()
@Unique(["code"])
export class Category {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Column({ type: "varchar" })
  public code!: string;

  @Column({ type: "varchar" })
  public name!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @OneToMany((_type) => Product, (product: Product) => product.category)
  public products?: Product[];
}
```

- Các  cú pháp tương tự **Product** nhé
- `@OneToMany` thể hiện mối quan hệ 1-N, nên property này có kiểu `array`

*Xem thêm tại https://typeorm.io/#/entities*

### 3.3.3 Kết nối database

Bạn tạo file `ormconfig.ts` ở root folder với nội dung như sau

```ts
module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "typeorm-graphql-typescript",
  synchronize: true,
  logger: "advanced-console",
  logging: process.env.NODE_ENV === "production" ? ["error", "warn"] : "all",
  cache: true,
  dropSchema: false,
  entities: ["dist/models/*.js"],
};
```

- Thuộc tính **entities** chỉ đường dẫn tới các file models đã được chuyển đổi sang **js** nên ở đây bạn thấy đường dẫn bắt đầu từ thư mục `dist`. Để thay đổi đường dẫn các file build js, thì bạn update lại thuộc tính `outDir` trong file `tsconfig.json`, còn không cứ xài mặc định như mình
- `synchronize: true` khi bạn thêm/xoá thuộc tính trong class Product/Category, TypeORM sẽ modify các table trong db của bạn. Nên set `false` khi deploy to production để tránh ảnh hưởng db

*Xem thêm tại https://typeorm.io/#/using-ormconfig*

### 3.3.4 Test db connection

Bạn tạo file `src/index.ts` với nội dung như sau

```ts
import "reflect-metadata";
import { Container } from "typedi";
import * as TypeORM from "typeorm";

// register 3rd party IOC container
TypeORM.useContainer(Container);

const bootstrap = async () => {
  try {
    // create TypeORM connection
    await TypeORM.createConnection();

  } catch (err) {
    console.error(err);
  }
};

bootstrap();
```

Sau đó run ```npm run dev``` để chạy ứng dụng. Mở db lên bạn sẽ thấy 2 bảng Product & Category xuất hiện

![](https://images.viblo.asia/e16158f6-277b-4126-af28-1f69caee293f.png)

## 3.4 Cấu hình GraphQL

### 3.4.1 Cài đặt

Bạn gõ các lệnh sau để cài đặt các package liên quan

```
npm i express graphql type-graphql apollo-server-express@^2.9.16 class-validator
npm i --save-dev @types/express @types/graphql
```

### 3.4.2 Tạo lược đồ

Bạn update lại model **Category** như sau

```ts
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Product } from "./Product";

@ObjectType()
@Entity()
@Unique(["code"])
export class Category {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "varchar" })
  public code!: string;

  @Field()
  @Column({ type: "varchar" })
  public name!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) =>[Product])
  @OneToMany((_type) => Product, (product: Product) => product.category)
  public products?: Product[];
}
```

- `@ObjectType` xác định lược đồ **GraphQL** là class Product
- `@Field` để khai báo các thuộc tính của class sẽ ánh xạ tới **GraphQL**. Ở thuộc tính **products**, mình định nghĩa kiểu là array `[Product]`

Các bạn làm tương tự cho model `Product`. Ở thuộc tính **category**, mình sẽ định nghĩa là kiểy Object như sau ```@Field((_type) => Category)``` 

*Rất gọn so với cách thông thường đúng không ^^! *

*Xem thêm tại https://typegraphql.com/docs/types-and-fields.html*

### 3.4.3 Tạo Repository

Mục đích của việc tạo Repository là để ta có thể sử dụng được các method của **TypeORM** và định nghĩa thêm nhiều method khác tuỳ vào mục đích sử dụng.
Bạn tạo một repository `src/repositories/CategoryRepository.ts` với nội dung như sau

```ts
import { EntityRepository, Repository } from "typeorm";
import { Category } from "../models/Category";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
```

Cũng làm tương tự cho `src/repositories/ProductRepository.ts` nhé

### 3.4.4 Tạo GraphQL modules

**CreateCategory module**

Đẻ tạo một module cho việc create 1 `Category` , bạn cần tạo 1 file `src/modules/category/CreateCategoryInput.ts` để định nghĩa dữ liệu đầu vào của **GraphQL**

```ts
import { Field, InputType } from "type-graphql";
import { Category } from "../../models/Category";

@InputType()
export class CreateCategoryInput implements Partial<Category> {
  @Field()
  public name!: string;

  @Field()
  public code!: string;
}
```

- `@InputType` sẽ sinh ra kiểu `GraphQLInputType`

Sau đó, bạn tạo một module `src/modules/category/CreateCategory.ts` với nội dung như sau

```ts
import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import { Category } from "../../models/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CreateCategoryInput } from "./CreateCategoryInput";

@Resolver((_type) => Category)
export class CreateCategory {
  @Mutation((_type) => Category)
  public async createCategory(
    @Arg("data") inputData: CreateCategoryInput
  ): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = categoryRepository.create({
      name: inputData.name,
      code: inputData.code,
    });

    await categoryRepository.save(category);
    return category;
  }
}
```

- `@Resolver` sẽ biến class `CreateGroup` thành một REST API
- `@Mutation` định nghĩa method `createCategory` là một **GraphQL** mutation
- `@Arg` sẽ đưa giá trị phía **client-side** gửi lên vào param `inputData`
- `getCustomRepository` Chúng ta sử dụng hàm này tạo 1 một thực thể `categoryRepository` và sử dụng các method của **TypeORM**. Đây là một cách đơn giản, mình sẽ hướng dẫn bạn một cách khác ở **GetCategories** module.

**GetCategories module**

Bạn tạo một module `src/modules/category/GetCategories.ts` với nội dung như sau

```ts
import { Resolver, Query } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Category } from "../../models/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";

@Resolver((_type) => Category)
export class GetCategories {
  constructor(
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository
  ) {}

  @Query((_type) => [Category])
  public async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    return categories;
  }
}
```

- `InjectRepository` sẽ tự động tạo thực thể `categoryRepository` qua hàm xây dựng. Tuỳ mục đính chúng ta sẽ chọn cách nào phù hợp
- `@Query` định nghĩa method `getCategories` như là một GraphQL query

### 3.4.5 Tạo schema

Bạn tạo 1 file `src/schema.ts` với nội dung như sau. Đây là cú pháp để build các modules của GraphQL, mỗi lần thêm một module mới bạn cần update lại file này và thêm nó vào thuộc tính `resolvers` như `[CreateCategory, GetCategories]`

```ts
import { buildSchema } from "type-graphql";

import { CreateCategory } from "./modules/category/CreateCategory";
import { GetCategories } from "./modules/category/GetCategories";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [CreateCategory, GetCategories],
  });
};
```

## 3.5 Calling GraphQL API

### 3.5.1 Tạo GraphQL server

Bạn update lại file `src/index.ts` như sau

```ts
import "reflect-metadata";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";

import createSchema from "./schema";

// register 3rd party IOC container
TypeORM.useContainer(Container);

const bootstrap = async () => {
  try {
    // create TypeORM connection
    await TypeORM.createConnection();

    // build TypeGraphQL executable schema
    const schema = await createSchema(Container);

    const app = express();
    const corsConfig = {
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      origin: [/localhost*/],
    };
    app.use(cors(corsConfig));

    const port = 3000;

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
    });
    server.applyMiddleware({ app, cors: corsConfig });

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
```

- `ApolloServer` tạo GraphQL Server, `playground: true` để có thể test các schema trực tiếp tại localhost. Xem thêm options tại [đây](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#example)
- `corsConfig` Ở đây mình set `origin: [/localhost*/]` là để tất cả các app Frontend khác ở localhost có thể gọi được các API của app này, nếu không sẽ bị lỗi **Cross-domain**. Bạn thể set `origin: [*]`  để bất kỳ một site nào cũng có thể gọi API từ app của bạn, xem thêm options tại [cors-options](https://www.npmjs.com/package/cors#configuration-options)

Sau đó, chạy lại ứng dụng bằng lệnh ```npm run dev```. Khi mà hình xuất hiện như bên dưới, nghĩa là bạn đã start GraphQL thành công

![](https://images.viblo.asia/26b50835-95f2-4b25-9a17-d80a52e7d338.png)

Sau đó các bạn truy cập vào http://localhost:3000/graphql sẽ được giao diện như bên dưới

![](https://images.viblo.asia/11ad1507-35e9-4b58-bf12-e80e1ada29f2.png)

Bạn click vào tab Schema hoặc Docs ở bên phải, sẽ hiển thị các Query, Mutation và kiểu dữ liệu của **GraphQL**. Chúng ta sẽ dùng nó để call các API mà không cần đọc lại code ^^!

![](https://images.viblo.asia/821c8d07-4446-4153-8c1a-cc48935f5ace.png)

### 3.5.2 Tạo Category

Bạn call createCategory module với câu truy vấn và data như sau, nhớ click qua tab **Query Variables** nhé

![](https://images.viblo.asia/1576f429-a9fa-49cb-9dc7-8ad06cba7789.png)

**Lưu ý:** Nếu bạn tạo trùng category `code` thì TypeORM sẽ báo lỗi nhé, do trong model minh đã ràng buộc bằng `@Unique`

### 3.5.3 Lấy danh sách các categories

Giờ test thử xem data có lưu hay không bằng cách call `GetCategories` query như bên dưới

![](https://images.viblo.asia/8d8bcd7e-2336-4927-8f34-a102328a73bb.png)

*Xem thêm cách call GraphQL API tại đây https://graphql.org/learn/queries/#gatsby-focus-wrapper*

### 3.5.4 Lấy danh sách các categories với Product list

Bạn tự viết một module để tạo Product xem như luyện tập. Nhớ là phải set khoá ngoại `categoryId` cho Product nhé

Sau khi tạo được một vài Product rồi, thi bạn update lại `getCategories` method bằng cách thêm tuỳ chọn `relations`. Nó được dùng dể query các Model có quan hệ với Model chính, ở đây là **Category**

```ts
@Query((_type) => [Category])
public async getCategories(): Promise<Category[]> {
  const categories = await this.categoryRepository.find({
    relations: ["products"],
  });

  return categories;
}
 ```
 
Sau đó, bạn update lại  câu truy vấn như bên dưới để lấy được các Categories và Product của nó

![](https://images.viblo.asia/81678bd9-34be-433b-9456-ce38b27bcf86.png)

*Xem thêm tại https://typeorm.io/#/find-options*
# 4. Source code
Đây là full [source code](https://github.com/ltienphat1307/typeorm-graphql-typescript) sau khi làm xong các bước trên (dành cho những bạn nào muốn run trước learn sau 😄). Sau khi tải về bạn chỉ cần run 2 lệnh sau để cài đặt và chạy ứng dụng

```
npm i
npm run dev
```

# 5. Frontend App
Đây là bài viết hướng dẫn [Tạo ứng dụng React bằng Gatsby + Apollo Client (GraphQL in Client)](https://viblo.asia/p/tao-ung-dung-react-bang-gatsby-apollo-client-graphql-in-client-vyDZO6qkKwj), bạn có thể tham khảo và run ở local để call thử các API vừa tạo nhé ^^!
# Enjoy!!