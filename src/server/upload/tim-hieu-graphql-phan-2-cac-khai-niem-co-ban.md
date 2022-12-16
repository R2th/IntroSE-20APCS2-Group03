Chào các bạn,

Ở [bài viết trước](https://viblo.asia/p/tim-hieu-graphql-phan-1-graphql-vs-rest-api-924lJYG6ZPM) mình đã giới thiệu sơ lược về GraphQL và có một số so sánh nhỏ giữa GraphQL vs Rest Api để có thể thấy được vì sao và có nên sử dụng GraphQL ko.

Ở bài viết này mình sẽ trình bày một số khái niệm cơ bản của nó

Xuyên suốt loạt bài viết của mình là một ví dụ rất cơ bản đó là Đăng ki, Đăng nhập và Đăng xuất người dùng

Do GraphQL chỉ là một đặc tả, bạn có thể dùng nó với bất cứ thư viện hay nền tảng nào, và tùy mỗi nền tảng thì cú pháp sẽ có một số thay đối, tuy nhiên điều quan trọng là mình nắm được ý tưởng chủ đạo và những khái niệm cơ bản của GraphQL thì việc áp dụng nó sẽ rất dễ dàng 

## Ngôn ngữ định nghĩa lược đồ (Schema Definition Language - SDL)
(google dịch không biết đúng không (hehe))

GraphQL có hệ thống kiểu (type) riêng của nó và được sử dụng để xác định lược đồ (schema) của một API. Cú pháp để viết lược đồ được gọi là Ngôn ngữ định nghĩa lược đồ (SDL).
Ví dụ:
```
type User {
  id: Int!
  name: String!
  email: String!
}
```

Hiểu đơn giản là type User có 3 fields với các kiểu tương ứng của nó là String hay Int. Dấu "!" để xác định trường đó là bắt buộc.
Chúng ta cũng có thể thể hiện mối quan hệ giữa các types.

Ví dụ thể hiện mối quan hệ belongs_to
```
type Shop {
  id: Int!
  name: String!
  owner: User!
}
```
và has_many
```
type User {
  id: Int!
  name: String!
  email: String!
  shops: [Shop]
}
```
Dấu "[]" để thể hiện là một mảng.

## Fetching Data with Queries
Nhắc lại bài cũ tí (hehe)

Khi làm việc với các API REST, dữ liệu được lấy về từ các endpoints cụ thể. Mỗi endpoints có một cấu trúc rõ ràng về thông tin mà nó trả về.
Cách tiếp cận được thực hiện trong GraphQL hoàn toàn khác. Thay vì có nhiều endpoints trả về cấu trúc dữ liệu cố định, API GraphQL thường chỉ có một endpoint duy nhất. Cấu trúc của dữ liệu được trả về không cố định. Thay vào đó, nó hoàn toàn linh hoạt và cho phép client quyết định dữ liệu nào thực sự cần thiết.
Điều đó có nghĩa là client cần gửi thêm thông tin đến server để thể hiện nhu cầu dữ liệu của mình - thông tin này được gọi là query.

### Basic Queries

Một query đơn giản để lấy thông tin tất cả users

![](https://images.viblo.asia/8c3ebf30-a976-4a18-b9e8-83bf7c959a17.png)

Hoặc bạn chỉ muốn lấy name

![](https://images.viblo.asia/2e6dd7cc-796b-49bc-b9e7-3beeac6f4756.png)

Trường users trong truy vấn này được gọi là root field của truy vấn. Mọi thứ theo sau root field, được gọi là payload của truy vấn.

Một trong những ưu điểm chính của GraphQL là nó cho phép truy vấn thông tin lồng nhau một cách tự nhiên.
Ví dụ: nếu bạn muốn lấy tất cả thông tin user kèm với tên của shops mà user đó sở hữu:

![](https://images.viblo.asia/6a415352-0cda-4c9e-92c6-ad0cf778c6c7.png)

Thậm chí là muốn xem luôn trong shop đó có những products gì:

![](https://images.viblo.asia/ae70f6c4-7e5e-415c-88c4-52de1f449390.png)

Muốn lấy cài gì thì cứ thêm vô (hehe), cứ y như đi siêu thị thích cái gì cứ hốt cho đầy giỏ rồi ra quầy tính tiền 1 lần luôn á (yaoming)

### Queries with Arguments

Có cái ví dụ ở trên rồi kìa (yaoming)
Đơn giản chỉ là mỗi field có thể có 0 hoặc nhiều đối số nếu nó được chỉ định trong schema
## Writing Data with Mutations

Với mỗi ứng dụng thì điều cơ bản phải có là C_R_U_D, ở trên chúng ta đã sử dụng Query để R rồi, vậy C_U_D sẽ dùng gì?
Với GraphQL, những điều này được thực hiện bằng cách sử dụng Mutations.

Các Mutations có cấu trúc cú pháp như giống với Queries, nhưng chúng luôn bắt đầu bằng từ khóa mutation. (à quên nói chổ ni, với các queries thì mình có thể thêm từ khóa query hoặc không, vì mặc định là query)
Dưới đây là ví dụ về cách để tạo một user:

![](https://images.viblo.asia/11e1935c-d84b-481a-8d0d-af2a1f5746dd.png)

Kiểm tra xem đã tạo chưa:

![](https://images.viblo.asia/338f6f48-138c-4552-8214-b4a08abbece0.png)

Có rồi (yaoming)

Tất nhiên ở đây code chỉ mang tình chất minh họa thôi nên sẽ không có validate hay là code phải đẹp các thứ, cái đó các bạn có thể tìm hiểu thêm (hehe)

Lưu ý rằng tương tự như query mà chúng ta đã viết trước đó, mutation cũng có root field - trong trường hợp này, nó được gọi là createUser.

Chúng ta cũng đã tìm hiểu về các khái niệm về các đối số cho các trường. Trong trường hợp này, trường createUser nhận các đối số chỉ định name, email và password của người dùng mới.

Và tất nhiên là chúng ta cũng chỉ định luôn dữ liệu sẽ trả về sau khi tạo thành công.

À mà chắc các bạn đang thắc mắc mấy cái  root field ở đâu ra đúng không? Tất nhiên là mình tạo ra rồi, và mình sẽ trình bày ở bài viết sau (hehe)

## Realtime Updates with Subscriptions

Một yêu cầu quan trọng khác đối với nhiều ứng dụng ngày nay là có một kết nối thời gian thực với máy chủ để nhận thông báo ngay lập tức về các sự kiện quan trọng.

Đối với trường hợp sử dụng này, GraphQL cung cấp khái niệm Subscriptions.

Khi một client subscribes một sự kiện, nó sẽ khởi tạo và giữ kết nối ổn định với máy chủ.

Bất cứ khi nào sự kiện cụ thể đó thực sự xảy ra, máy chủ sẽ đẩy dữ liệu tương ứng đến máy khách.

subscriptions được viết bằng cú pháp giống như queries và mutations.

(cái này để tìm hiểu sau nhé :v :v)

## Defining a Schema

Đến đây bạn đã hiểu cơ bản về các queries, mutations và subscriptions trông như thế nào, hãy tập hợp tất cả lại với nhau và tìm hiểu cách bạn có thể viết schema cho phép bạn thực hiện các ví dụ bạn đã thấy cho đến thời điểm này.

Schema là một trong những khái niệm quan trọng nhất khi làm việc với một API GraphQL. 

Nó chỉ định các khả năng của API và xác định cách client có thể yêu cầu dữ liệu. Nó thường được xem như là một hợp đồng giữa server và client.

Nói chung, một schema chỉ đơn giản là một tập hợp các types của GraphQL. Tuy nhiên, khi viết schema cho một API, có một số loại gốc đặc biệt:

* type Query { ... }
* type Mutation { ... }
* type Subscription { ... }

Các loại Query, Mutation và Subscription là các entry points cho các request được gửi bởi client.

Để kích hoạt truy vấn "users" mà chúng ta đã thấy trước đây, kiểu query sẽ phải được viết như sau:
```
type Query {
  users: [User]
}
```

Tương tự, đối với mutation createUser, chúng ta sẽ phải thêm root field createUser vào loại Mutation:

```
type Mutation {
  createUser (name: String!, email: String!, password: String!): Person!
}
```

Subscription type cũng tương tự.

Đặt tất cả lại với nhau, chúng ta sẽ có schema đầy đủ tất cả các truy vấn và đột biến sẽ sử dụng.

Và tất nhiên, những root fields như createUser, users, user,.... nó xử lí như thế nào thì mình sẽ trong bày ở bài viết sau

Hẹn gặp lại các bạn....


-----

Bài viết được dịch (và có chế một ít :v) từ: https://www.howtographql.com

-----
## Mr.Nara