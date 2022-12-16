GraphQL là một tiêu chuẩn API mới cung cấp một giải pháp hiệu quả, mạnh mẽ và linh hoạt hơn thay thế cho REST.

Nó đã được phát triển bởi Facebook và hiện nay được duy trì bởi một cộng đồng lớn của các công ty và cá nhân từ khắp nơi trên thế giới.

Cốt lõi của GraphQL là cho phép client có thể xác định chính xác dữ liệu cần lấy về từ server.

Thay vì nhiều endpoints trả về cấu trúc dữ liệu cố định, một máy chủ GraphQL chỉ đưa ra một endpoint duy nhất và đáp ứng chính xác dữ liệu mà khách hàng yêu cầu.

## Vì sao sử dụng GraphQL?

REST là một cách phổ biến để lấy dữ liệu từ máy chủ. Khi khái niệm REST được phát triển, client applications tương đối đơn giản và tốc độ phát triển không giống như ngày nay.

REST do đó phù hợp với nhiều ứng dụng.

Tuy nhiên, cách sữ dụng API đã thay đổi nhiều trong vài năm gần đây. Đặc biệt, có ba yếu tố thử thách cách thiết kế API:

**1. Tăng sử dụng mobile apps tạo ra nhu cầu tải dữ liệu hiệu quả**

Việc gia tăng sử dụng mobile apps, các thiết bị có điện năng thấp và vấn đề về kết nối là những lý do khiến Facebook phát triển GraphQL.

GraphQL giảm thiểu số lượng dữ liệu cần được chuyển qua mạng và do đó cải thiện đáng kể các ứng dụng hoạt động trong những điều kiện này.

**2. Nhiều platforms và frontend frameworks khác nhau**

Sự không đồng nhất của các frontend frameworks và platforms chạy các ứng dụng của client làm cho việc xây dựng và duy trì một API  phù hợp với yêu cầu của tất cả mọi người trở nên khó khăn.

Với GraphQL, mỗi khách hàng có thể truy cập chính xác dữ liệu cần thiết.

**3. Phát triển nhanh**

Yêu cầu phát triển nhanh và cập nhật sản phẩm thường xuyên đã trở thành một tiêu chuẩn của nhiều công ty.

Với các API REST, cách xử lí dữ liệu của server  thường cần phải được sửa đổi để đáp ứng  các yêu cầu cụ thể và thay đổi thiết kế ở phía client.

Điều này cản trở việc phát triển nhanh và cập nhật sản phẩm.

## GraphQL tốt hơn REST?

Trong thập kỷ qua, REST đã trở thành tiêu chuẩn để thiết kế API.

Nó cung cấp một số ý tưởng tuyệt vời, chẳng hạn như các máy chủ phi trạng thái và truy cập có cấu trúc đến tài nguyên.

Tuy nhiên, API REST đã cho thấy sự không linh hoạt để theo kịp các yêu cầu thay đổi nhanh chóng của clients truy cập chúng.

GraphQL được phát triển để đáp ứng nhu cầu linh hoạt và hiệu quả hơn!

Nó giải quyết nhiều thiếu sót và sự kém hiệu quả mà các developers gặp phải khi tương tác với các API REST.

Để minh họa những khác biệt chính giữa REST và GraphQL khi lấy dữ liệu từ một API, hãy xem xét một ví dụ điển hình:
Trong một ứng dụng viết blog, một ứng dụng cần hiển thị các tiêu đề của các bài đăng của một người dùng cụ thể.
Màn hình tương tự cũng hiển thị tên của 3 người theo dõi cuối cùng của người dùng đó.
Yêu cầu sẽ được giải quyết với REST và GraphQL nhưu thế nào?

-----

Với REST API, bạn thường sẽ thu thập dữ liệu bằng cách truy cập vào nhiều endpoints.

Trong ví dụ, những điểm cuối này có thể là `/users/<id>` để tìm nạp dữ liệu người dùng ban đầu.

Thứ hai, có thể là `/users/<id>/posts ` trả về tất cả các bài viết cho người dùng.

endpoints sẽ là `/users/<id>/followers` trả về một danh sách những người theo dõi của mỗi người dùng.


![](https://images.viblo.asia/b590964d-5777-4125-ba04-ce0ed400387e.png)


Với REST, bạn phải thực hiện ba yêu cầu tới các endpoints khác nhau để tìm nạp dữ liệu cần thiết.

Bạn cũng đang tải quá nhiều vì các điểm cuối trả lại thông tin bổ sung không cần thiết.

Một trong những vấn đề phổ biến nhất với REST là truy vấn nhiều lần và quá tải.

Điều này xảy ra bởi vì cách duy nhất để client lấy dữ liệu là truy cập các endpoint trả về cấu trúc dữ liệu cố định.

Rất khó để thiết kế API theo cách mà nó có thể cung cấp cho client nhu cầu dữ liệu chính xác của họ.

Quá tải có nghĩa là client tải xuống nhiều thông tin hơn là thực sự cần thiết trong ứng dụng.

Hãy tưởng tượng ví dụ như một màn hình cần hiển thị danh sách người dùng chỉ với tên của họ.

Trong API REST, ứng dụng này thường get `/users` endpoint và nhận được mảng JSON với dữ liệu người dùng.

Tuy nhiên, phản hồi này có thể chứa nhiều thông tin hơn về người dùng được trả lại, ví dụ: sinh nhật hoặc địa chỉ của họ - thông tin vô ích đối với client vì nó chỉ cần hiển thị tên của người dùng.


-----


Với GraphQL, bạn chỉ cần gửi một truy vấn tới máy chủ GraphQL bao gồm các yêu cầu dữ liệu cụ thể.

Sau đó, máy chủ đáp ứng đối tượng JSON khi các yêu cầu này được đáp ứng.

![](https://images.viblo.asia/0333a8ad-0570-4c88-bf74-0ed17034b205.png)

Sử dụng GraphQL, client có thể xác định chính xác dữ liệu cần thiết trong một truy vấn.

Lưu ý rằng cấu trúc phản hồi của máy chủ chính xác theo cấu trúc lồng nhau được xác định trong truy vấn.



-----
Tham khảo: https://www.howtographql.com


-----
## Mr.Nara