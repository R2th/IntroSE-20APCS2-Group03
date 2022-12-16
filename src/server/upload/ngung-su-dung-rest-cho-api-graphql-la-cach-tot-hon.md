# Mở đầu 
`REST` đã được nhiều developers sử dụng để gửi dữ liệu qua HTTP trong khi `GraphQL` thường được trình bày như một công nghệ thay thế các `API REST`. Trong bài viết này, tôi sẽ giải thích những **lợi ích**, **hạn chế** và **sự khác biệt** giữa 2 `API design architecture`. Nó có thể sẽ giúp bạn quyết định nên chọn gì cho dự án tiếp theo của mình.
# REST là gì?
**REST (Representational State Transfer)** là một **design architecture API** mà được sử dụng để thực hiện các `web services` bằng cách sử dụng một tập hợp các hoạt động không trạng thái được xác định trước (bao gồm `GET, POST, PUT, DELETE`).

**Lợi ích của REST**

* **Flexibility** :  là một lợi thế khác của việc sử dụng `REST`, vì nó có thể được thiết kế để xử lý các loại `cuộc gọi` khác nhau và trả về các định dạng dữ liệu khác nhau.

**Hạn chế của REST**
* **Over-fetching** — Đây là khi `API endpoint` cung cấp nhiều thông tin hơn so với yêu cầu của `client`.
* **Under-fetching** — Đây là khi `API endpoint` không cung cấp đầy đủ tất cả thông tin mà `Client` cần. Vì vậy, `client` phải thực hiện nhiều request để có được đầy đủ thông tin mà ứng dụng cần.

### GraphQL là gì?
**GraphQL** là một **design architecture API** có một cách tiếp cận khác, trong đó mọi thứ được coi như một **biểu đồ**, ngụ ý rằng nó được **kết nối** với nhau. Điều này cũng có nghĩa là bạn có thể điều chỉnh request của mình một cách linh động, chỉ lấy ra những thứ mà bạn cần từ `endpoint`. Ngoài ra, nó cho phép bạn kết hợp các `entities` khác nhau thành một truy vấn duy nhất.
### Lợi ích của GraphQL
* **Truy xuất dữ liệu chính xác** và không có gì thêm. Trong `GraphQL`, bạn nhận chỉ được những gì bạn yêu cầu, đây là một điểm cộng tuyệt vời.
* **Phát triển nhanh hơn** bên phía `Client`. Thông thường, khi có những thay đổi trong yêu cầu dữ liệu, bạn chỉ cần sửa đổi truy vấn và không cần thay đổi nhiều. Cả team `client` và `server` đều có thể làm việc độc lập, với điều kiện cả hai team đều biết cấu trúc của dữ liệu.

# Ví dụ đơn giản so sánh cả hai
Ví dụ: Giả sử tôi cần hiển thị dữ liệu của người dùng (**user**) với danh sách bài đăng(**posts**) của người dùng và những người theo dõi họ(**flowers**). Trong trường hợp này, tôi phải hiển thị `tên` tác giả của bài đăng, các bài đăng cũng như `tên` của những người theo dõi cho người dùng đó.

Nếu sử dụng REST, tôi sẽ thực hiện ít nhất **2** hoặc **3** yêu cầu, tương tự như sau:

* `/user/<id>` để có được thông tin chi tiết về **user** (Tác giả).
* `/user/<id>/posts` để lấy danh sách các **posts** được đăng bởi người dùng đó.
* `/user/<id>/followers` để lấy danh sách **flowers**.

Trong tất cả những trường hợp trên, ta thấy xảy ra hiện tượng **Over-fetching** . Ví dụ: Trong `request` đầu tiên, tôi chỉ cần lấy ra thông tin của `name`, nhưng tôi nhận được tất cả các chi tiết về `user`.

Đây là lúc `GraphQL` cho thấy sức mạnh của nó. Đầu tiên, tôi cần xác định xem các thông tin và `Client` cần. Định nghĩa truy vấn và tôi có thể nhận được kết quả mong muốn. Nểu sử dụng `GraphQL`, chúng ta có thể sử dụng một truy vấn tương tự như sau:

```
query {
  User(id: '123') {
    name
    posts {
      title
    }
    followers {
      name
    }
  }
}
```

Bằng cách sử dụng truy vấn như vậy, tôi sẽ có thể nhận được phản hồi `JSON` với các `properties` sau. Gọn gàng và đơn giản, phải không?
  
# GraphQL so với REST
Tóm lại, đây là một vài điểm khác biệt nổi bật:
### 1. Tìm nạp dữ liệu
`REST` gây ra **Over-fetching**  hoặc **Under-fetching**, trong khi đây không phải là vấn đề trong `GraphQL`. Trong `GraphQL`, Những gì bạn yêu cầu là những gì bạn nhận được.
### 2. Định nghĩa đối tượng ( JSON response)
Trong `REST`, bạn xác định đối tượng trên `Backend` và trong `GraphQL`, bạn xác định đối tượng này trên `Frontend`.
### 3. Bộ nhớ đệm tự động (Automatic caching)
Đối với `REST`  bộ nhớ đệm là tự động có hiệu lực trong khi `GraphQL` không có hệ thống  bộ nhớ đệm tự động, nhưng việc sử dụng các ứng dụng khách như `Apollo Client, Relay,...` sẽ làm cho bộ nhớ đệm khả thi.
### 4. Xử lý lỗi
Xử lý lỗi trong `REST` đơn giản hơn nhiều so với `GraphQL`, thường cung cấp cho bạn mã trạng thái **200 OK** , ngay cả khi có lỗi. Tuy nhiên, khi sử dụng các ứng dụng `clients` như `Apollo Client, Relay,..`. rất có thể dễ dàng xử lý các lỗi.

# Phần kết luận

`GraphQL` chắc chắn có nhiều lợi thế hơn `REST`, nhưng nó có thể không phải lúc nào cũng là cách triển khai tốt nhất . Như tôi đã nói trước đó, sự lựa chọn phụ thuộc vào ứng dụng của bạn. Cảm ơn bạn đã đọc!

**Nguồn tham khảo**: [https://medium.com/javascript-in-plain-english/stop-using-rest-for-apis-d697727ae6dd](https://medium.com/javascript-in-plain-english/stop-using-rest-for-apis-d697727ae6dd)