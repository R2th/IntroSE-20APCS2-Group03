# 1. Giới thiệu:

GraphQL là một khái niệm tương đối mới của Facebook được dự tính sẽ là giải pháp thay thế REST cho các API Web.

Bài viết này sẽ giới thiệu về cách thiết lập máy chủ GraphQL bằng Spring Boot để có thể thêm nó vào các project hiện có hoặc sử dụng trong các project mới. 

# 2. GraphQL là gì?

Các API REST truyền thống hoạt động với các khái niệm về Resources được máy chủ quản lý. Các Resources này có thể được điều chỉnh theo một số cách tiêu chuẩn, dựa theo các phương thức HTTP khác nhau (get, post,...). Điều này vẫn hoạt động rất hiệu quả miễn là API của chúng ta vẫn phù hợp với các khái niệm resources, nhưng sẽ nhanh chóng bị phá vỡ khi chúng ta đi chệch hướng khỏi nó.

Chúng ta cũng sẽ gặp phải điều tuơng tự khi khách hàng cần dữ liệu từ nhiều resources cùng một lúc. Ví dụ: yêu cầu một bài đăng trên blog và các nhận xét. Thông thường, điều này được giải quyết bằng cách yêu cầu client thực hiện nhiều yêu cầu hoặc bằng cách máy chủ cung cấp thêm dữ liệu mà có thể không phải lúc nào cũng được yêu cầu, dẫn đến kích thước lớn của response. 

**GraphQL cung cấp cho bạn giải pháp cho toàn bộ vấn đề nêu trên.** Nó cho phép client chỉ đinh chính xác dữ liệu mong muốn. Bao gồm cả việc điều hướng các resources con trong một request duy nhất và cũng cho phép thực hiện nhiều truy vấn trong một request. 

Nó hoạt động theo kiểu RPC nhiều hơn, sử dụng các truy vấn được đặt tên và các mutation thay vì tập hợp các hành động tiêu chuẩn. Điều này hoạt động để đặt control về nơi nó thuộc về, với lập trình viên API thì chỉ định những gì có thể thực hiện còn với người dùng API thì là những gì mà họ mong muốn.

Ví dụ, blog sẽ cho phép những truy vấn sau:

```
query {
    recentPosts(count: 10, offset: 0) {
        id
        title
        category
        author {
            id
            name
            thumbnail
        }
    }
}
```

Những truy vấn này sẽ:
* Yêu cầu 10 bài post gần đây nhất
* Với mỗi bài post, yêu cầu ID, title và category
* Với mỗi post, yêu cầu tác giả, trả về ID, tên và ảnh thumbnail

Với REST API truyền thống, nó sẽ cần 11 request, 1 cho bài post và 10 cho tác giả hoặc là cần nhúng data của tác giả vào data của post.

## 2.1 GraphQL Schemas:

Máy chủ GraphQL hiển thị một schema mô tả API. Schema này được tạo thành từ các kiểu định nghĩa. Mỗi kiểu có một hoặc nhiều trường, mỗi trường nhận không hoặc nhiều đối số và trả về một kiểu cụ thể.

Schema được tạo thành từ cách các trường này được lồng vào nhau. Lưu ý rằng đồ thị không cần phải xoay vòng - các chu kỳ hoàn toàn có thể chấp nhận được - nhưng nó có tính định hướng. Có nghĩa là, client có thể từ một trường để đi đến đến trường con của nó, nhưng nó không thể tự động quay lại trường chính trừ khi lược đồ xác định điều này một cách rõ ràng.

GraphQL Schema sau là ví dụ cho blog có thể chứa các định nghĩa, mô tả cho một bài đăng, tác giả của bài đăng và truy vấn gốc để nhận các bài đăng gần đây nhất trên blog. 

```
type Post {
    id: ID!
    title: String!
    text: String!
    category: String
    author: Author!
}

type Author {
    id: ID!
    name: String!
    thumbnail: String
    posts: [Post]!
}

# The Root Query for the application
type Query {
    recentPosts(count: Int, offset: Int): [Post]!
}

# The Root Mutation for the application
type Mutation {
    writePost(title: String!, text: String!, category: String) : Post!
}
```

Ký tự "!" ở cuối "name" chỉ ra rằng đây là kiểu không thể "nullable". Bất kỳ loại nào không có điều này đều có thể để trống trong response từ máy chủ. GraphQL xử lý những điều này một cách chính xác, cho phép chúng ta yêu cầu các trường con của các kiểu nullable một cách an toàn.

GraphQL cũng hiển thị bản thân schema bằng cách sử dụng một bộ trường tiêu chuẩn, cho phép bất kỳ client nào truy vấn định nghĩa Schematrước thời hạn.

Điều này có thể cho phép client tự động phát hiện khi Schema thay đổi và cho phép client thích ứng tự động với cách thức hoạt động của Schema. Một ví dụ cực kỳ hữu ích về điều này là GraphiQL tool - cho phép chúng ta tương tác với bất kỳ API GraphQL nào. 

# 3. Giới thiệu GraphQL Spring Boot

[**GraphQL Spring Boot**](https://github.com/graphql-java-kickstart/graphql-spring-boot) cũng cấp một cách tuyệt vời để chạy server GraphQL một cách vô cùng nhanh chóng. Kết hợp cùng với thư viện [GraphQL Java Tool](https://github.com/graphql-java-kickstart/graphql-java-tools) chúng ta chỉ cần viết 1 số đoạn code cơ bản cho phần services.

## 3.1 Cài đặt service

Tất cả những gì chúng ta cần chỉ là setting đúng dependencies:

```
<dependency>
    <groupId>com.graphql-java</groupId>
    <artifactId>graphql-spring-boot-starter</artifactId>
    <version>5.0.2</version>
</dependency>
<dependency>
    <groupId>com.graphql-java</groupId>
    <artifactId>graphql-java-tools</artifactId>
    <version>5.2.4</version>
</dependency>
```

Spring Boot sẽ tự động chọn những mục trên và thiết lập các trình xử lý thích hợp để hoạt động tự động.

Theo mặc định, nó sẽ hiển thị services GraphQL trên / graphql endpoint của ứng dụng của chúng ta và sẽ chấp nhận các yêu cầu POST có chứa GraphQL Payload. Endpoint này có thể được tùy chỉnh trong tệp application.properties của chúng ta nếu cần. 

## 3.2 Viết Schema

Thư viện GraphQL tool hoạt động bằng cách xử lý các tệp GraphQL Schema để xây dựng cấu trúc chính xác và sau đó kết nối các beans đến cấu trúc này. Bộ khởi động Spring Boot GraphQL sẽ tự động tìm các file schema này.

Các file này cần được lưu với phần đuôi là “.graphqls” và có thể nằm ở bất kỳ đâu trên classpath. Chúng ta cũng có thể có nhiều file này với số lượng như mong muốn, vì vậy chúng ta có thể chia Schema thành các modules như mong muốn.

Một yêu cầu là phải có chính xác một truy vấn gốc và tối đa một mutation gốc. Nó không thể được chia thành các file, không giống như phần còn lại của Schema. Đây là một hạn chế của chính định nghĩa GraphQL Schema chứ không phải là vấn đề của việc triển khai Java. 


## 3.3 Root Query Resolver

Truy vấn gốc cần có các bean đặc biệt được xác định trong context của Spring để xử lý các trường khác nhau trong truy vấn gốc này. Không giống như định nghĩa Schema, không có hạn chế rằng chỉ có một Spring bean duy nhất cho trường truy vấn gốc.

Yêu cầu duy nhất là các bean thực hiện GraphQLQueryResolver và mọi trường trong truy vấn gốc từ Schema đều phải có một method nằm trong một class có cùng tên. 

```
public class Query implements GraphQLQueryResolver {
    private PostDao postDao;
    public List<Post> getRecentPosts(int count, int offset) {
        return postsDao.getRecentPosts(count, offset);
    }
}
```

Tên của method phải là một trong những tên sau và theo thứ tự sau:
* <field>
* is<field> - chỉ khi field là loại Boolean
* get<field>

Method phải có các tham số tương ứng với bất kỳ tham số nào trong GraphQL Schema và có thể tùy chọn nhận tham số cuối cùng theo kiểu DataFetchingEnosystem.

Method này cũng phải trả về kiểu chính xác cho kiểu trong GraphQL Schema, như chúng ta sắp thấy. Bất kỳ kiểu đơn giản nào - String, Int, Array v.v. - đều có thể được sử dụng với các kiểu Java tương đương và hệ thống sẽ map chúng lại một cách tự động.

Ở trên đã định nghĩa phương thức getRecentPosts sẽ được sử dụng để xử lý bất kỳ truy vấn GraphQL nào cho trường nearPosts trong Schema được xác định trước đó.


## 3.4 Sử dụng Beans để đại diện kiểu

Mọi kiểu complex trong máy chủ GraphQL được đại diện bởi một bean Java - cho dù được tải từ truy vấn gốc hay từ bất kỳ nơi nào khác trong cấu trúc. Cùng một class Java phải luôn đại diện cho cùng một kiểu GraphQL, nhưng tên của class là không cần thiết.

Các trường bên trong Java bean sẽ map trực tiếp lên các trường trong response GraphQL dựa trên tên của trường. 

```
public class Post {
    private String id;
    private String title;
    private String category;
    private String authorId;
}
```

Bất kỳ trường hoặc method nào trên Java bean không map vào GraphQL Schema sẽ bị bỏ qua, nhưng đồng thời sẽ không gây ra sự cố nào. Điều này rất quan trọng để các field resolvers hoạt động.

Ví dụ: trường authorId ở đây không tương ứng với bất kỳ thứ gì trong schema mà chúng ta đã định nghĩa trước đó, nhưng nó sẽ có sẵn để sử dụng cho bước tiếp theo. 

## 3.5 Trường Resolver cho giá trị Complex

Đôi khi, giá trị của một trường không bình thường để tải. Điều này có thể liên quan đến việc tra cứu cơ sở dữ liệu, tính toán phức tạp hoặc bất cứ thứ gì khác. GraphQL tool có một khái niệm về trường Resolver được sử dụng cho mục đích này. Đây là các Spring bean có thể cung cấp các giá trị thay cho data bean.

Trường Resolver là bất kỳ bean nào trong Spring Context có cùng tên với data bean, với hậu tố Resolver và triển khai giao diện GraphQLResolver. Các method trên trường Resolver bean tuân theo tất cả các quy tắc tương tự như trên data bean nhưng cũng cung cấp data bean như một tham số đầu tiên.

Nếu một trường Resolver và data bean đều có các method cho cùng một trường GraphQL thì trường Resolver sẽ được ưu tiên. 

```
public class PostResolver implements GraphQLResolver<Post> {
    private AuthorDao authorDao;

    public Author getAuthor(Post post) {
        return authorDao.getAuthorById(post.getAuthorId());
    }
}
```

Thực tế là các trường Resolver này được tải Spring context  là rất quan trọng. Điều này cho phép chúng hoạt động với bất kỳ bean nào khác được quản lý bởi Spring - ví dụ: DAOs.

Quan trọng là, nếu client yêu cầu một trường, thì server GraphQL sẽ không bao giờ thực hiện công việc truy xuất nó. Điều này có nghĩa là nếu client truy xuất Post và không yêu cầu Author, thì phương thức getAuthor () ở trên sẽ không bao giờ được thực thi và lệnh gọi DAOs sẽ không bao giờ được thực hiện. 


## 3.6 Giá trị nullable

GraphQL Schema có khái niệm rằng một số kiểu là nullable và những kiểu khác thì không.

Điều này có thể được xử lý trong mã Java bằng cách sử dụng trực tiếp các giá trị null, nhưng tương tự, kiểu Optional mới từ Java 8 có thể được sử dụng trực tiếp tại đây cho các kiểu nullable và hệ thống sẽ thực hiện đúng với các giá trị.

Điều này rất hữu ích vì nó có nghĩa là mã Java của chúng ta rõ ràng là giống với GraphQL Schema từ các method định nghĩa. 


## 3.7 Mutations

Cho đến nay, tất cả mọi thứ mà chúng ta đã làm đều xoay quanh việc lấy dữ liệu từ máy chủ. GraphQL cũng có khả năng cập nhật dữ liệu được lưu trữ trên máy chủ, bằng Mutations.

Theo góc nhìn trong code, không có lý do gì mà truy vấn không thể thay đổi dữ liệu trên máy chủ. Chúng ta có thể dễ dàng viết các truy vấn resolvers mà chấp nhận các đối số, lưu dữ liệu mới và trả lại những thay đổi đó. Làm điều này sẽ gây ra các tác dụng phụ đáng ngạc nhiên cho API client và được coi là một hành vi xấu.

Thay vào đó, Mutations nên được sử dụng để thông báo cho khách hàng rằng điều này sẽ gây ra thay đổi đối với dữ liệu đang được lưu trữ.

Các Mutations được xác định trong mã Java bằng cách sử dụng các class triển khai GraphQLMutationResolver thay vì GraphQLQueryResolver.

Nếu không, tất cả các rule tương tự áp dụng cho các truy vấn. Sau đó, giá trị trả về từ Mutations được xử lý giống hệt như từ Query field, cho phép các giá trị lồng nhau cũng được truy xuất. 

```
public class Mutation implements GraphQLMutationResolver {
    private PostDao postDao;

    public Post writePost(String title, String text, String category) {
        return postDao.savePost(title, text, category);
    }
}
```


# 4. Giới thiệu GraphiQL

GraphQL cũng có một công cụ được gọi là GraphiQL. Đây là một giao diện người dùng có thể giao tiếp với bất kỳ server GraphQL nào và thực thi các truy vấn và Mutations đối với nó. Phiên bản có thể tải xuống của nó tồn tại dưới dạng ứng dụng Electron và có thể được tải về từ [đây](https://github.com/skevy/graphiql-app).

Cũng có thể tự động đưa phiên bản web-based GraphiQL vào app của chúng ta bằng cách thêm dependency GraphiQL Spring Boot Starter: 

```
<dependency>
    <groupId>com.graphql-java</groupId>
    <artifactId>graphiql-spring-boot-starter</artifactId>
    <version>5.0.2</version>
</dependency>
```

Điều này sẽ chỉ hoạt động nếu chúng ta đang lưu trữ API GraphQL của mình trên endpoint mặc định của /graphql, vì vậy standalone application sẽ là cần thiết nếu nó không phải là một case. 


# 5. Tổng kết

GraphQL là một công nghệ mới rất thú vị có khả năng cách mạng hóa cách phát triển các API Web.

Sự kết hợp của Spring Boot GraphQL và các thư viện GraphQL Java Tools giúp bạn dễ dàng thêm công nghệ này vào bất kỳ ứng dụng Spring Boot mới hoặc đã có.

Các bạn có thể tham khảo [Code snippets](https://github.com/eugenp/tutorials/tree/master/spring-boot-modules/spring-boot-libraries) tại đây. 

Source: https://www.baeldung.com/spring-graphql