# I. Giới thiệu

GraphQL là gì? Có lẽ không nhiều người biết đến nó bởi đây là một công nghệ khá mới mẻ. Bản thân mình cũng mới đọc được gần đây do tình cờ một lần tìm hiểu về prisma.
## 1. GraphQL là gì?
GraphQL là một cú pháp mô tả cách yêu cầu lấy dữ liệu, và thường được dùng để load data từ một server cho client.  GraphQL bao gồm có 3 đặc điểm chính là:
- Cho phép các client có thể xác định được một cách chính xác nhất về toàn bộ những dữ liệu cần thiết.
- GraphQL giúp cho việc tổng hợp được những dữ liệu quan trọng từ nhiều nguồn cung cấp khác nhau một cách dễ dàng, nhanh chóng.
- GraphQL sử dụng một type system để có thể mô tả cụ thể về các dữ liệu, thông tin.

## 2. Vấn đề
GraphQL bắt đầu từ ông lớn Facebook, thế nhưng ngay cả những app đơn giản đôi khi vẫn gặp phải trường hợp “nghẽn cổ chai” do sự hạn chế của REST APIs.

Thí dụ bạn muốn hiển thị một list posts, và ở dưới mỗi post là một list like, bao gồm cả tên người dùng và avatar. Cách giải quyết đơn giản là thay đổi API của ‘posts’ để nó bao gồm  ‘a like array' chứa thông tin về người dùng.

![](https://images.viblo.asia/d0542b72-9f70-4b7f-afd0-547105411c40.png)

Thế nhưng khi làm như vậy cho các app mobile thì bạn sẽ phát hiện ra tốc độ của chúng chạy quá chậm.

Giờ thì còn có thêm một vấn đề khác xuất hiện: trong khi posts được lưu trữ trong một MySQL database thì likes lại được lưu tại Redis store! Bạn biết mình phải làm gì trong trường hợp nào không?

Mở rộng vấn đề trên ra với việc Facebook phải quản lí vô số data source và API clients thì cũng là điều dễ hiểu khi REST APIs bị đánh giá là cũ kĩ bởi những hạn chế của nó.

## 3. Giải pháp

Giải pháp mà Facebook đưa ra đến từ một ý tưởng rất đơn giản: Thay vì có đến hàng tá “endpoint” ngu ngốc, sao lại không dùng chỉ một “endpoint” thông minh với khả năng tiếp thu những Query phức tạp rồi đưa ra output data với loại type tùy theo yêu cầu của client.

Thực tế mà nói, GraphQL như là một layer nằm giữa client và data source, sau khi nhận yêu cầu của client thì nó sẽ kiếm những thông tin cần từ các data source và đưa lại cho client theo format họ muốn. Vẫn chưa hiểu? Thế thì đến lúc dùng ví dụ rồi đây!

Như bạn thấy đấy, REST model cũ giống y như việc bạn đặt cái bánh Pizza, rồi gọi ship hàng online và kêu bên tiệm giặt ủi đem đồ đến cho bạn. Tất cả diễn ra với 3 cuộc gọi và 3 cửa hàng.

![](https://images.viblo.asia/dd24f23f-82ac-4c2b-aaa5-b8f5e90404cb.png)

Mặt khác GraphQL lại giống như là thư kí riêng của bạn vậy: Sau khi bạn đưa địa chỉ của 3 cửa hàng và nói yêu cầu của bạn thì GraphQL sẽ làm hết mọi chuyện còn lại trong khi bạn chỉ việc chờ chúng được chuyển đến cho mình.

![](https://images.viblo.asia/0d2a6f8e-bd9b-48a8-9730-a7866ac84d51.png)

Nói cách khác GraphQL tạo ra một ngôn ngữ chuẩn (standard language) để thực hiện những công việc này.

## 4. Các đặc điểm chính của GraphQL

### 4.1 Queries

![](https://images.viblo.asia/d00bccdf-78b0-44fc-91d9-9572154c9291.jpg)

Queries là những yêu cầu bạn đặt ra cho GraphQL, được gọi là query và nó giống như thế này:
```php
query {
  stuff
}
```

Bạn có thể hiểu đơn giản là một ‘query’ mới sử dụng keyword query , và đặt tên cho field đó là stuff. Điều thú vị của GraphQLquery là có support các nested fields. Thế nên chúng ta có thể đi sâu vào hơn:

```php
query {
  stuff {
    eggs
    shirt
    pizza
  }
}
```

Như bạn thấy đấy, client khi đưa ra những yêu cầu và tạo ra query sẽ không cần lo data đến từ source nào. Chỉ việc hỏi và GraphQLserver  sẽ lo hết mọi thứ khác.

Cũng đáng lưu ý là việc các query field còn có khả năng trỏ đến các array

```php
query {
  posts { # this is an array
    title
    body
    author { # we can go deeper!
      name
      avatarUrl
      profileUrl
    }
  }
}
```

Query field còn support cả argument. Nếu bạn muốn đưa ra một post riêng, thì chỉ cần thêm id argument cho post field.

```php
query {
  post(id: "123foo"){
    title
    body
    author{
      name
      avatarUrl
      profileUrl
    }
  }
}
```

Cuối cùng, nếu bạn còn muốn id argument đó đặc biệt hơn, bạn có thể tạo ra một variable và tái sử dụng chúng bên trong query (nhớ là ta phải đặt tên cái query đó luôn)

```php
query getMyPost($id: String) {
  post(id: $id){
    title
    body
    author{
      name
      avatarUrl
      profileUrl
    }
  }
}
```

Một cách thực hành khá tốt là sử dụng [GitHub’s GraphQLAPI Explorer](https://developer.github.com/v4/explorer/). Hãy thử query sau:

```php
query {
  repository(owner: "graphql", name: "graphql-js"){
    name
    description
  }
}
```

![](https://images.viblo.asia/3ee8ee63-bf01-4363-ba57-e38694352f34.gif)

Bạn sẽ thấy rằng việc bạn thử đặt tên cho một field ở bên dưới description, IDE sẽ tự động gợi ý cho bạn những tên field có sẵn hoặc tự tạo bởi chính GraphQLAPI ! Khá hay đúng không?

![](https://images.viblo.asia/4f82f639-d48e-4c2b-9858-6b4739098232.png)

### 4.2 Resolvers

Cho dù có là thư ký giỏi nhất quả đất cũng không thể đi lấy quần áo cho bạn nếu không có địa chỉ của tiệm giặt đồ.

Tương tự vậy, GraphQLserver sẽ không biết phải làm gì với query bạn đưa ra trừ khi nó biết được resolver.

Resolver nói cho GraphQL biết nơi và cách thức để lấy data cần thiết cho field của query mà bạn yêu cầu. Sau đây là một resolver cho field `post` ở trên (sử dụng Apollo’s GraphQL-Tools schema generator):

```php
Query: {
  post(root, args) {
    return Posts.find({ id: args.id });
  }
}
```

Ta đặt resolver ngay trong Query bởi vì ta muốn query cho post ngay lập tức. Tuy nhiên, bạn vẫn có thể dùng resolver trong sub-field, như author field của post

```php
Query: {
  post(root, args) {
    return Posts.find({ id: args.id });
  }
},
Post: {
  author(post) {
    return Users.find({ id: post.authorId})
  }
}
```

Nhớ lưu ý rằng resolver sẽ không bị giới hạn  thông tin được đưa về nên bạn sẽ muốn thêm commentsCount cho Post type:

```php
Post: {
  author(post) {
    return Users.find({ id: post.authorId})
  },
  commentsCount(post) {
    return Comments.find({ postId: post.id}).count() 
  }
}
```

Điều quan trong bạn cần hiểu ở đây là với GraphQL, API schema của bạn và database schema sẽ bị chia ra riêng biệt. Nói cách khác, có thể sẽ không có bất kì author và commentsCount nào trong database của mình nhưng ta vẫn có thể mô phỏng chúng nhờ vào resolver.

### 4.2 Schema

Schema là một trong ba đặc điểm quan trọng không thể thiếu đối với quá trình tạo ra GraphQL bởi toàn bộ những  gì cần thiết nhất đều phải nhờ vào hệ thống của GraphQL’s typed schema. GraphQL sẽ sử dụng một hệ thống nằm trong strong type để có thể định nghĩa được khả năng của API và tất cả những kiểu dữ liệu trong API cũng sẽ được định nghĩa bởi một schema thông qua SDL của GraphQL. Do đó, schema có vai trò quan trọng để quy ước những client và server để có thể xác định được chính xác cách mà một client có thể truy cập vào các thông tin, dữ liệu.
Tất cả mọi thứ hay ho trên đều nhờ vào hệ thống GraphQL’s typed schema vì thế bạn nên vào đọc [GraphQLdocumentation](https://graphql.org/learn/schema/) nếu như có thời gian.

III. Kết luận.

Nghe có vẻ phức tạp là thế vì GraphQL nó là một kĩ thuật dựa trên nhiều lĩnh vực khác nhau của công nghệ hiện đại. Tuy nhiên, nếu bạn hiểu rồi thì thấy không còn khó nữa. Một công nghệ mới rất tiềm năng vậy ngại gì mà không tìn hiểu khi có thời gian.

Tham khảo : 
- https://graphql.org/learn/schema/
- https://timviec365.vn/blog/graphql-la-gi-new7847.html