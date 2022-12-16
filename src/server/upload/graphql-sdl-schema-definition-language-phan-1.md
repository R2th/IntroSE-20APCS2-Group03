## 1. GraphQL Schema Difinition Language là gì?
![](https://images.viblo.asia/1a048a30-4b12-47e5-a384-bcd7e016d321.png)


* Qua các bài viết trước trong series về **GraphQL**, chúng ta đã hiểu được các khái niệm GraphQL, Schema. GraphQL có một ngôn ngữ riêng để định nghĩa Schema đó là **GraphQL Schema Definition Language** (**SDL**)
* **SDL** là một ngôn ngữ có cú pháp rất đơn giản, dễ hiểu đồng thời cũng rất mạnh mẽ và trực quan giúp định nghĩa schema một các cô đọng nhất.
* Ví dụ sử dụng SDL để định nghĩa Schema cho một ứng dụng blogging đơn giản 
    ```graphQL
    type Post {
      id: String!
      title: String!
      publishedAt: DateTime!
      likes: Int! @default(value: 0)
      blog: Blog @relation(name: "Posts")
    }
    type Blog {
      id: String!
      name: String!
      description: String
      posts: [Post!]! @relation(name: "Posts")
    }
    ```
* Các thành phần chính của bản định nghĩa schema gồm có **types** và **fields**. Ngoài ra các thông tin bổ sung khác có thể được cung cấp là các **custom directives** như **@default** value được chỉ định cho trường `likes` hay **@relation** chỉ định mối quan hệ ... Có rất nhiều thứ để nói ở đây, chúng ta hãy đi vào tìm hiểu chi tiết nhé.
## 2. Object types và fields
* Phần tử cơ bản nhất của GrapQL Schema là **object types**, đại diện cho một loại đối tượng mà bạn có thể lấy được từ server.
* Ví dụ 
    ```graphQL
    type Character {
      name: String!
      appearsIn: [Episode!]!
    }
    ```
* `Character` là một **GraphQL Object  Type**, là một kiểu đối tượng với các trường (**field**). Hầu hết các **type** trong schema của bạn đều là các object types
* `name` và `appearsIn` là các **field** của `Character`. Điều này có nghĩa là `name` và `appearsIn` là các trường duy nhất được chỉ định khi truy vấn `Character`
* Một **field** thì gồm có name và type.
* **String** ở đây là type của field `name`, là một **scalar type** được xây dựng sẵn. Chúng ta sẽ đi vào tìm hiểu về **scalar type** ở bên dưới nhé.
* Một **field** ngoài có kiểu **scalar type** thì có thể thuộc về bất kì kiểu nào tự định nghĩa trong schema.
* Một **field** không thể null được biểu thị bằng dấu **!** , server bắt buộc phải trả về dữ liệu cho trường này khi bạn query.
* Một **field** có kiểu là mảng được chỉ định bằng **[]**, ở đây `appearsIn` là một mảng các `Episode`.
## 3. Arguments
* Mỗi một trường của một **object type** có thể không có hoặc có nhiều các đối số. VÍ dụ như trường `lenght` bên dưới:
    ```graphQL
    type Starship {
      id: ID!
      name: String!
      length(unit: LengthUnit = METER): Float
    }
    ```
* Không giống các ngôn ngữ lập trình khác như JavaScript hay Python, các function sẽ nhận các tham số theo thứ tự khi định nghĩa functon, trong GraphQL, các **field** sẽ nhận các tham số theo tên được truyền vào, thứ tự các tham số không ảnh hưởng. Trong ví dụ trên trường `length` có một tham số được định nghĩa là `unit`
* Một **argument** có thể required hoặc không. Khi một tham số là không required, chúng ta có thể định nghĩa default value cho nó, nếu tham số `unit` không được truyền vào, nó sẽ có giá trị default là `METER`
## 4. Scalar types
* **Scalar type** là kiểu cho một đối tượng vô hướng, có nghĩa là đối tượng này không có sub-selections (các trường con), chúng được coi là các lá của query.
* Có 5 loại **Scalar type** được định nghĩa trong SDL
    * **Int**: Một số nguyên 32-bit không dấu
    * **Float**: Một số thực dấu phẩy động
    * **String**: Một chỗi UTF-8
    * **Boolean**: true hoặc false
    * **ID**: là một chuỗi định danh duy nhất, thường được sử dụng để lấy một object từ server
* Ngoài các kiểu **scalar type** được định sẵn, chúng ta có thể tự định nghĩa các **custom scalar type**. Ví dụ ta có thể định nghĩa một kiểu `Date`
    ```graphQL
    scalar Date
    ```
     Đối với type Date chúng ta có thể validate hay format theo dạng Y/mm/dd, như vậy bất kì trường Date nào mà server trả về đều sẽ có dạng Y/mm/dd
## 5. Enumeration types
* **Enums** cũng là một kiểu đặc biệt của scalar type, được giới hạn trong một giá trị cho phép cụ thể, chúng ta có thể validate bất kì **argument** nào thuộc loại này chỉ có gía trị trong những giá trị cho phép.
* Ví dụ 
    ```GraphQL
    enum Episode {
      NEWHOPE
      EMPIRE
      JEDI
    }
    ```
    Với bất kì field nào có kiểu `Episode` thì chỉ có thể là `NEWHOPE`, `EMPIRE`, hay `JEDI`
## 6. Kết phần 1
* Trong bài viết này mình đã trình bày một số khái niệmcơ bản và hay sử dụng nhất khi định nghĩa một GraphQL Schema. Sang phần 2 mình sẽ trình bày các khái niệm phức tạp hơn nhưng cũng rất quan trọng và hữu ích
* Nguồn tham khảo
    * https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51
    * https://graphql.org/learn/schema/