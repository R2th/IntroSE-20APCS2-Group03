# Lời mở đầu

Vậy là cũng đã tròn 3 tháng mình tìm hiểu và làm việc với GraphQL. Cuộc sống trước đó của mình là RESTful :v: 

Quá trình học và tìm hiểu về GraphQL cũng không phải dễ dàng, lý do bởi vì GraphQL vẫn là một hướng tiếp cận mới (release over 3 years ago). Hơn nữa, cộng đồng GraphQL cũng chưa thực sự lớn và đang trong quá trình phát triển. Do đó, khi gặp vấn đề hoặc bug thì có rất ít những câu hỏi, tutorials và tài liệu liên quan để tìm hiểu.


Tất nhiên là khi bắt đầu học một cái mới thì bước đầu tiên bao giờ cũng rất quan trọng và khó khăn nhất. Mặc dù chưa có nhiều kinh nghiệm về xây dựng ứng dụng thực tế với GraphQL nhưng sau một vài project cá nhân, articles mình collect được trong khắp các forum công nghệ trên Internet thì mình nghĩ mình đã có cái nhìn tổng quan về GraphQL. 


Để tổng hợp lại những kiến thức đã học và làm được trong 3 tháng vừa qua thì mình có ý tưởng là làm ra một series **Xây dựng một forum đơn giản Fullstack Javascript bằng GraphQL** thay vì RESTful API như trước đây.


Series này có tính chất vô cùng quan trọng đối với cá nhân mình. Những fundamental concept sẽ được mình giải thích theo cách hiểu của bản thân thay vì những khái niệm lý thuyết khô khan. Hy vọng series này sẽ giúp ích được nhiều cho các bạn mới tìm hiểu về GraphQL.

# What we build?

Ứng dụng mà chúng ta sẽ xây dựng là một Forum bao gồm một số chức năng chính:

- Cho phép người dùng đăng ký, đăng nhập (Authentication)
- Cho phép người dùng tạo, sửa, xóa bài viết của họ (CRUD)
- Cho phép người dùng vote bài viết của người khác (Real-time)
- ....

Ngoài ra có rất nhiều tính năng mà chúng ta có thể phát triển thêm nhưng mình chỉ xin phép xây dựng những tính năng mà mình đã liệt kê ở trên.

# How we build?
Những công nghệ, thư viện, framework chính mà chúng ta sẽ sử dụng trong ứng dụng.

## Backend

### 1. [GraphQL](https://graphql.org/learn/)
Chắc chắn rồi, ứng dụng mà chúng ta sẽ xây dựng dựa trên GraphQL. Do đó, mình muốn overview lại về GraphQL để chúng ta có cái nhìn tổng quan nhất về GraphQL.

Vậy GraphQL là cái quái gì?

Theo nhiều nguồn tài liệu thì GraphQL được miêu tả bằng nhiều định nghĩa, khái niệm khác nhau. Nhưng nhìn chung vẫn rất khó hiểu vì phần lớn chúng mang tính chất lý thuyết và học thuật rất cao. Để hiểu được GraphQL thì cách tốt nhất là khái quát tất cả những định nghĩa khô khan kia bằng một object và  thực hiện thông qua những ví dụ cụ thể (nghe có vẻ khó hiểu nhỉ :v)

Theo cách hiểu của bản thân mình thì GraphQL nó là một query language cho APIs.
Done!!!!
Chỉ cần hiểu đơn giản như vậy thôi, đừng nên phức tạp hoá vấn đề quá. 

Rất nhiều người nghĩ rằng GraphQL nó là một framework, library hay thậm chí là database. Nhưng thực sự nó chỉ là một query language cho APIs. GraphQL được áp dụng cho hầu hết các ngôn ngữ phổ biến hiện nay như: Java, PHP, Ruby, JavaScript, etc. 


Vậy GraphQL có cấu trúc như thế nào và nó hoạt động trong ứng dụng ra sao, mời các bạn xem hình bên dưới:

![](https://images.viblo.asia/af88cc01-5a85-4b9a-b155-ab038dc9eb53.png)

Nhiệm vụ của GraphQL trong ứng dụng là query dữ liệu trong database sau đó trả về cho người dùng. 

Để hiểu rõ cách GraphQL giao tiếp với DB ra sao thì chúng ta sẽ so sánh với REST

Ví dụ trong database chúng ta có 2 table:

```
User(id, name, address, email)

Post(id, title, content, description)
```

Giả sử chúng ta cần lấy tất cả các Posts và tất cả các Users trong database.


REST:

```
/api/example.com/posts
/api/example.com/users
```

GraphQL:

```
/api/example.com
```

```
query {
    posts {
        id
        title
        content
        description
    }
}


query {
    users {
        id
        name
        address
        email
     }
}
```

Đối với REST, mỗi tính năng đều được thể hiện hiện qua một endpoint khác nhau. Ngược lại đối với GraphQL, chỉ tồn tại 1 endpoint duy nhất là domain (`/api/example.com`) 
Mọi tính năng còn lại fetch data, update và delete data sẽ lần lượt được thay thế bằng `Query` và `Mutation` (mình sẽ giải thích hơn trong quá trình code)


### 2. [graphql-yoga](https://github.com/prisma/graphql-yoga)
Như mình đã nói ở phần trên, GraphQL có thể thực hiện được bằng rất nhiều ngôn ngữ lập trình khác nhau và `graphql-yoga` là một thư viện với đầy đủ mọi tính năng của GraphQL server. Được xây dựng dựa trên một framework rất nổi tiếng của nodejs đó là `Expressjs`.



### 3. [Prisma](https://www.prisma.io/)
Tại sao lại là Prisma?

Thông thường cách thức làm việc sữa Webserver và Database là sử dụng những câu lệnh SQL để query trực tiếp vào Database. Với những hệ thống có các tác vụ cơ bản như CREATE, UPDATE, hoặc DELETE thì hướng tiếp cận này khá ổn :D. Nhưng chúng ta thử tưởng thượng nếu hệ thống có độ phức tạo cao hơn, khi đó sẽ kéo theo độ phức tạp của các câu lệnh SQL. Đồng nghĩa với việc chúng ta phải viết những câu SQL dài ngoằng, khó hiểu và khó hình dung @@. Điều này thực sự là rất cực cho lập trình viên chúng ta :(

Một cách tiếp cận khác theo mình là dễ dàng  hơn cho developer đó là sử dụng Object Relational Mapping (ORM). Và Prisma mình sẽ sử dụng ở đây chính là một hướng tiếp cận đó. 

Prisma sẽ tạo ra các function có sẵn để thực hiện những câu lệnh SQL truyền thống (SELECT, UPDATE, DELETE, INSERT, etc). 
Giờ đây chúng ta có thể query trực tiếp vào Database thông qua ngôn ngữ lập trình :D

![](https://images.viblo.asia/e2634645-9cfd-446c-b660-3a20b11a6bef.png)

`Prisma` là một tầng nằm giữa Webserver và Database. Nó cung cấp rất nhiều những function có độ phức tạo cao như filter, sort, pagination, etc.. làm cho việc lâp trình trở nên đơn giản và giảm effort của lập trình viên.


## Frontend

### 1. [Reactjs](https://reactjs.org/)

Thư viện chính để xây dựng giao diện người dùng.

### 2. [Apollo Client](https://www.apollographql.com/)

Thư viện để giao tiếp trực tiếp với GraphQL server. Ngoài ra, Apollo Client cũng cung cấp một số tính năng về Data Management, làm việc với cache.

![](https://images.viblo.asia/99c7be3a-76a4-4032-8f62-ae6b6a370fdb.png)

Nhiệm vụ của `Apollo Client` là gửi request tới GraphQL server thông qua các `Query` và `Mutation`, lấy dữ liệu từ server trả về lưu vào store (cấu trúc tương tự Redux nhưng có phần abstraction hơn). 

Sau đó Apollo Client sẽ truyền dữ liệu từ trong store vào tầng view trong ứng dụng và hiển thị cho người dùng.


# Lời kết

Ở phần sau, mình sẽ tập trung vào Init project cho Backend và Frontend.

Cảm ơn các bạn đã đọc bài!

Link bài gốc: https://thuannp.com/fullstack-building-forum-with-graphql-and-react-p1/