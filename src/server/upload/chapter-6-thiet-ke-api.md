Chương này đánh dấu một bước ngoặt quan trọng trong cuộc phiêu lưu của chúng ta với API. Chúng ta đã hoàn thành việc tìm hiểu các nguyên tắc cơ bản và bây giờ đã sẵn sàng để xem các khái niệm trước đó kết hợp với nhau như thế nào để tạo thành một API. Trong chương này, chúng ta sẽ thảo luận về các thành phần của API bằng cách thiết kế một API.

## Sắp xếp dữ liệu

National Geographic ước tính rằng vào năm 2011, người Mỹ đã chụp 80 tỷ bức ảnh. Với rất nhiều bức ảnh, bạn có thể tưởng tượng ra những cách tiếp cận khác nhau mà mọi người phải tổ chức chúng trên máy tính của họ. Một số người thích đổ mọi thứ vào một thư mục. Những người khác tỉ mỉ sắp xếp hình ảnh của họ thành một hệ thống phân cấp các thư mục theo năm, tháng và sự kiện.

Các công ty cũng có những suy nghĩ tương tự với tổ chức khi xây dựng API của họ. Như chúng tôi đã đề cập trong [Chương 1](https://viblo.asia/p/chapter-1-gioi-thieu-ve-apis-m68Z0RmA5kG), mục đích của API là giúp máy tính dễ dàng làm việc với dữ liệu của công ty. Để dễ sử dụng, một công ty có thể quyết định có một URL duy nhất cho tất cả dữ liệu và làm cho nó có thể tìm kiếm được (giống như có một thư mục cho tất cả ảnh của bạn). Một người khác có thể quyết định cung cấp cho mỗi phần dữ liệu URL của riêng mình, được sắp xếp theo thứ bậc (như có thư mục và thư mục con cho ảnh). Mỗi công ty chọn cách tốt nhất để cấu trúc API cho tình huống cụ thể của mình, tùy vào tình huống cũng như nghành nghề của mình.

## Bắt đầu với Architectural Style

Khi thảo luận về API, bạn có thể nghe nói về "soap"(xà phòng tắm) và "rest"(nghỉ ngơi) và tự hỏi liệu các nhà phát triển phần mềm đang làm việc hay lên kế hoạch cho một kỳ nghỉ. Sự thật là đây là tên của hai kiểu kiến trúc phổ biến nhất cho các API trên nền tảng web. SOAP là một thiết kế dựa trên XML có các cấu trúc được tiêu chuẩn hóa cho các yêu cầu và phản hồi. REST, viết tắt của Representational State Transfer, là một cách tiếp cận cởi mở hơn, cung cấp nhiều quy ước, nhưng để lại nhiều quyết định cho người thiết kế API.

Trong suốt khóa học này, bạn có thể nhận thấy chúng ta có thiên hướng tập trung nói về API REST do tỷ lệ sử dụng đáng kinh ngạc của REST. Điều này không có nghĩa là SOAP là tệ hại; nó cũng có những điểm mạnh riêng. Tuy nhiên, trọng tâm của cuộc thảo luận của chúng ta sẽ là về REST vì đây có thể sẽ là loại API bạn gặp phải thường xuyên ngày nay. Trong các phần còn lại, chúng ta sẽ cùng tìm hiểu qua các thành phần tạo nên API REST.

## Trước tiên hãy nói về resource

Quay lại [Chương 2](https://viblo.asia/p/chapter-2-protocols-XL6lAkvBKek), chúng ta đã nói một chút về resources. Hãy nhớ lại rằng resources là danh từ của API (khách hàng và pizza). Đây là những điều chúng ta muốn thế giới có thể tương tác thông qua API của chúng ta.

Để cảm nhận về cách một công ty sẽ thiết kế API, hãy thử dùng nó với tiệm bánh pizza của chúng ta. Chúng ta sẽ bắt đầu bằng cách thêm khả năng đặt một chiếc bánh pizza.

Để khách hàng có thể nói chuyện với chúng ta, chúng ta cần thực hiện một số điều:

1. Quyết định những resources (tài nguyên) nào cần có sẵn.
2. Chỉ định URL cho các tài nguyên đó.
3. Quyết định những hành động nào khách hàng sẽ được phép thực hiện trên các tài nguyên đó
4. Chỉ ra những phần dữ liệu được yêu cầu cho mỗi hành động và chúng nên ở định dạng nào.

Nhiệm vụ khó khăn đầu tiên là chọn tài nguyên phù hợp. Một cách để tiếp cận vấn đề là bước qua những gì một tương tác điển hình liên quan. Đối với tiệm bánh pizza của chúng ta, chúng ta có thể có một thực đơn. Trên thực đơn đó là pizza. Khi một khách hàng muốn chúng ta làm một trong những chiếc pizza cho họ, họ đặt hàng. Trong bối cảnh này, thực đơn, pizza, khách hàng và đặt hàng tất cả là ứng cử viên tốt cho resource. Hãy bắt đầu với việc đặt hàng.

Bước tiếp theo là gán URL cho tài nguyên. Có rất nhiều khả năng, nhưng may mắn là các quy ước REST đưa ra một số hướng dẫn cụ thể. Trong REST API điển hình, tài nguyên sẽ có hai mẫu URL được gán cho nó. Đầu tiên là số nhiều của tên tài nguyên, ví dụ /orders. Thứ hai là số nhiều của tên tài nguyên cộng với một mã định danh duy nhất để chỉ định một tài nguyên ví dụ như /orders/<order_id>, trong đó <order_id> là định danh duy nhất cho một đơn hàng. Hai mẫu URL này tạo thành các điểm cuối mà API của chúng ta sẽ hỗ trợ. Chúng được gọi là điểm cuối đơn giản vì chúng ở cuối URL, như trong http://example.com/ <endpoint_goes_here>.

Chúng ta đã chọn resources của mình và gán URL cho nó, chúng ta cần quyết định những hành động nào khách hàng có thể thực hiện. Theo các quy ước REST, chúng ta nói rằng điểm cuối số nhiều (/orders) là để liệt kê các đơn hàng hiện có và tạo các đơn hàng mới. Số nhiều với định danh duy nhất (/orders/<order_id>) là để truy xuất, cập nhật hoặc hủy đơn hàng cụ thể. Máy khách báo cho máy chủ biết hành động nào cần thực hiện bằng cách gửi các hành động HTTP thích hợp (GET, POST, PUT hoặc DELETE) trong yêu cầu.

Nhìn chung, API của chúng ta bây giờ trông như thế này:

| HTTP verb| Endpoint | Action |
| -------- | -------- | -------- |
|GET     | 	/orders	     | List existing orders    | 
|POST     | 	/orders	     | 	Place a new order   | 
|GET     | 	/orders/1	  | Get details for order #1 | 
|GET     | 	/orders/2	  | Get details for order #2 | 
|PUT     | 	/orders/1	  | Update order #1 | 
|DELETE     | 	/orders/1	  |  Cancel order #1 | 

Với việc bổ sung hành động cho các điểm cuối, đơn hàng của chúng ta đã khá đầy đủ, bước cuối cùng là quyết định dữ liệu nào cần được trao đổi giữa máy khách và máy chủ. Mượn từ ví dụ tiệm bánh pizza của chúng tôi trong [Chương 3](https://viblo.asia/p/chapter-3-dinh-dang-du-lieu-RQqKLE8MZ7z), chúng ta có thể nói rằng một đơn đặt hàng cần một lớp vỏ và lớp phủ bên trên. Chúng ta cũng cần chọn một định dạng dữ liệu mà máy khách và máy chủ có thể sử dụng để truyền thông tin này qua lại. XML và JSON đều là những lựa chọn tốt, nhưng để dễ đọc, chúng ta sẽ sử dụng JSON.

Tại thời điểm này, bạn nên vỗ nhẹ vào lưng; chúng ta đã thiết kế một API chức năng! Đây là sự tương tác giữa máy khách và máy chủ khi sử dụng API này:
![](https://images.zapier.com/storage/photos/a750f59281516eca160a4cd260b4855b.png?format=jpg)
![](https://images.zapier.com/storage/photos/d9897460bbcf183fb4b030d19cfd9f00.png?format=jpg)
![](https://images.zapier.com/storage/photos/c2f02983d51e59caf79e89927b5004fb.png?format=jpg)
![](https://images.zapier.com/storage/photos/18e5277a3d4544d487264b1da1576986.png?format=jpg)

## Liên kết các tài nguyên với nhau

API tiệm bánh pizza của chúng ta trông thật sắc nét. Đơn đặt hàng đang đến nhiều hơn trước đây. Thực tế kinh doanh rất tốt, chúng ta quyết định chúng ta muốn bắt đầu theo dõi đơn đặt hàng của khách hàng để đánh giá lòng trung thành. Một cách dễ dàng để làm điều này là thêm một tài nguyên khách hàng mới.

Cũng giống như với các đơn đặt hàng, tài nguyên khách hàng của chúng tôi cần một số điểm cuối. Theo quy ước, /customers và /customers/<customer_id> vừa vặn. Chúng ta sẽ bỏ qua các chi tiết, nhưng hãy nói rằng chúng ta quyết định hành động nào có ý nghĩa đối với từng điểm cuối và dữ liệu nào đại diện cho khách hàng. Giả sử chúng ta làm tất cả những điều đó, chúng ta đi đến một câu hỏi thú vị: làm thế nào để chúng ta liên kết các đơn đặt hàng với khách hàng?

Những người sử dụng REST có nhiều ý kiến về cách giải quyết vấn đề liên kết các tài nguyên. Một số người nói rằng hệ thống phân cấp nên tiếp tục phát triển, đưa ra các điểm cuối như /customers/5/orders cho tất cả các đơn đặt hàng của khách hàng số 5 và /customers/5/orders/3 cho đơn hàng thứ ba của khách hàng số 5. Những người khác tranh luận để giữ mọi thứ bằng cách bao gồm các chi tiết liên quan trong dữ liệu cho một tài nguyên. Theo mô hình này, việc tạo đơn hàng yêu cầu trường khách hàng phải được gửi cùng với các chi tiết đơn hàng. Cả hai giải pháp đều được sử dụng bởi các API REST trong tự nhiên, vì vậy cần biết về từng giải pháp.

![](https://images.zapier.com/storage/photos/4a57592d2e26dda5ff56e865b9ce56b1.png?format=jpg)

## Searching Data

Khi dữ liệu trong một hệ thống phát triển, các điểm cuối liệt kê tất cả các bản ghi trở nên không thực tế. Hãy tưởng tượng nếu cửa hàng pizza của chúng tôi có ba triệu đơn đặt hàng đã hoàn thành và bạn muốn tìm hiểu có bao nhiêu pepperoni như topping. Gửi một yêu cầu GET đến / đơn đặt hàng và nhận tất cả ba triệu đơn đặt hàng sẽ không hữu ích lắm. Rất may, REST có một cách tiện lợi để tìm kiếm thông qua dữ liệu.

URL có một thành phần khác mà chúng tôi chưa đề cập, chuỗi truy vấn. Truy vấn có nghĩa là tìm kiếm và chuỗi có nghĩa là văn bản. Chuỗi truy vấn là một chút văn bản đi vào cuối URL để chuyển mọi thứ cho API. Ví dụ: mọi thứ sau dấu chấm hỏi là chuỗi truy vấn trong http://example.com/nings?key=value.

REST API sử dụng chuỗi truy vấn để xác định chi tiết tìm kiếm. Những chi tiết này được gọi là tham số truy vấn. API chỉ ra những tham số nào sẽ chấp nhận và tên chính xác của các tham số đó cần được sử dụng cho chúng để thực hiện tìm kiếm. API tiệm bánh pizza của chúng tôi có thể cho phép khách hàng tìm kiếm đơn hàng bằng cách đứng đầu bằng cách sử dụng URL này: http://example.com/nings?topping=pepperoni. Máy khách có thể bao gồm nhiều tham số truy vấn bằng cách liệt kê lần lượt từng tham số, phân tách chúng bằng dấu và ("&"). Ví dụ: http://example.com/nings?topping=pepperoni&crust=thin.

Một cách sử dụng khác của chuỗi truy vấn là giới hạn số lượng dữ liệu được trả về trong mỗi yêu cầu. Thông thường, các API sẽ chia kết quả thành các bộ (ví dụ 100 hoặc 500 bản ghi) và trả về một bộ tại một thời điểm. Quá trình phân tách dữ liệu này được gọi là phân trang (tương tự như chia nhỏ các từ thành các trang cho sách). Để cho phép khách hàng chuyển trang qua tất cả dữ liệu, API sẽ hỗ trợ các tham số truy vấn cho phép khách hàng chỉ định trang dữ liệu nào họ muốn. Trong API tiệm bánh pizza của chúng ta, chúng ta có thể hỗ trợ phân trang bằng cách cho phép khách hàng chỉ định hai tham số: trang và kích thước. Nếu khách hàng thực hiện một yêu cầu như GET / đơn hàng? Page = 2 & size = 200, chúng ta biết họ muốn trang kết quả thứ hai, với 200 kết quả trên mỗi trang, vì vậy đơn hàng 201-400.

## Chapter 6 Recap

Trong chương này, chúng ta đã học cách thiết kế API REST. Chúng tôi đã chỉ ra các chức năng cơ bản mà API hỗ trợ và cách tổ chức dữ liệu để máy tính có thể dễ dàng sử dụng.

Các thuật ngữ chính chúng ta đã học là:

* SOAP: Kiến trúc API được biết đến với các định dạng thông báo được tiêu chuẩn hóa
* REST: Kiến trúc API xoay quanh việc thao túng tài nguyên
* Tài nguyên: Thuật ngữ API cho danh từ như khách hàng hoặc đơn hàng
* Điểm cuối: Một URL tạo nên một phần của API. Trong REST, mỗi tài nguyên có các điểm cuối riêng
* Chuỗi truy vấn: Một phần của URL được sử dụng để truyền dữ liệu đến máy chủ
* Tham số truy vấn: Một cặp khóa-giá trị được tìm thấy trong chuỗi truy vấn (topping = cheese)
* Phân trang: Quá trình phân chia kết quả thành các phần có thể quản lý

## Next

Trong chương tiếp theo, chúng ta sẽ khám phá các cách để làm cho máy khách phản ứng với các thay đổi trên máy chủ theo thời gian thực.

Go to Chapter 7!

## TÀI LIỆU THAM KHẢO

https://zapier.com/learn/apis/chapter-6-api-design/