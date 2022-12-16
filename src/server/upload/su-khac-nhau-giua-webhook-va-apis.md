Chúng ta có thể hiểu một cách đơn giản, **Webhook** và **APIs** là cách để các chương trình khác nhau có thể giao tiếp được với nhau một cách nhanh chóng và dễ dàng hơn.

![](https://images.viblo.asia/67725fad-0c23-4286-837d-c1caec5c9af6.png)

### 1. Webhook là gì?

**Webhook** (hay còn gọi là HTTP `callback`) cung cấp cơ chế cho phép một ứng dụng (server-side) tự động thông báo và gửi dữ liệu ***thời gian thực*** tới một ứng dụng khác (client-side) bất cứ khi nào có một sự kiện (dữ liệu) mới phát sinh trên ứng dụng này.

Thỉnh thoảng, Webhook cũng được gọi là ***Reverse APIs***. Trong các ứng dụng API thường, phía client sẽ gửi request (thông qua API) tới server. Ngược lại, với Webhook, server gọi Webhook (thường là POST HTTP request) tới endpoint URL được cấu hình trước đó cho Webhook bởi client cung cấp và client sẽ xử lý kết quả được trả về.

Webhook hoạt động dựa trên phản ứng event, nó thường được kích hoạt bởi một số events cụ thể, do đó client sẽ nhận được thông báo ngay khi server có event mới mà không cần phải thường xuyên "thăm dò" server.

**Thiết lập một webhook**

Để thiết lập một Webhook, bạn cần "đăng ký" một URL cho `Webhook provider` gửi request khi cần. Điều này cũng đồng nghĩa với việc ứng dụng của bạn có thể truy cập từ các web công cộng.

Thông thường Webhook sẽ POST data theo 2 cách: *JSON* hoặc *XML*. Provider sẽ cho bạn biết nội dung hoặc thậm chí custom lại nội dung của các API được cung cấp này.

Webhook sử dụng **HTTP**, nên nó có thể được tích hợp vào các dịch vụ web mà không cần thêm các cơ sở hạ tầng mới. Đồng thời, cũng dễ sử dụng nên ngày càng được ứng dụng rộng rãi hơn.

**Khi nào nên sử dụng Webhook**

Webhook thường được sử dụng để thực hiện các yêu cầu và nhiệm vụ nhỏ. Ví dụ, khi ứng dụng hoặc platform của bạn yêu cầu cần cập nhật theo thời gian thực, nhưng chúng ta lại không muốn lãng phí nhiều tài nguyên vào việc đó. Webhook được sử dụng trong trường hợp này.

Một trường hợp khác sử dụng webhook qua API là khi API rất "kém" hoặc không có API bắt đầu. Bạn có thể tạo một giải pháp cung cấp dữ liệu mà ứng dụng của bạn cần để hoạt động.

Tuy nhiên, cần chú ý. Vì Webhook không được sử dụng thường xuyên để gọi dữ liệu và chỉ hoạt động khi có dữ liệu mới, nên khả năng sẽ không thể lấy được các bản cập nhật mới nhất nếu hệ thống dừng hoạt động vì một vài lý do. 

Ngoài ra, phải chấp nhận tổng lưu lượng dữ liệu có sẵn với bản cập nhật đã cho vì bạn có ít quyền kiểm soát chúng.

**Bảo mật Webhook**

Vì Webhook cung cấp dữ liệu tới các URL được cung cấp sẵn và công khai nên có khả năng dễ bị tấn công và chỉnh sửa dữ liệu trước khi được trả về cho client. Để ngăn chặn điều này cần yêu cầu các kết nối đến đều là **https**:
* Thêm mã thông báo vào URL, hoạt động như một điểm nhận dạng duy nhất. Ví dụ: ?auth=token
* Tùy chọn triển khai Basic Auth.

Nhược điểm ở 2 kỹ thuật trên là ta sẽ phải gửi auth token cùng với request.
* Provider sẽ sign (mã hóa) các request gửi tới client và phía client sẽ xác minh các signature này.

![](https://images.viblo.asia/c1c18494-6b10-4ad9-b1d7-fc4117b2bee8.png)

### 2. APIs là gì?

**API** (Application Programming Interface) là cách để các ứng dụng và nền tảng khác nhau kết nối với nhau thông qua một phương thức giao tiếp chung. 

Và để API hoạt động được, cần tạo request với data, và response cho request đó. Data thường định dạng là JSON, XML hoặc một kiểu bất kỳ.

API giúp xây dựng các HTTP service một cách rất đơn giản và nhanh chóng. Mã nguồn mở, hỗ trợ đầy đủ mô hình MVC hay các thành phần HTTP như: URI, request/response headers, caching, versioning, content format. Phù hợp cho các thiết bị băng thông giới hạn như mobile, tablet.

Ngày nay, rất nhiều ứng dụng được xây dựng dựa trên mô hình này. Các ứng dụng lớn thường được tích hợp nhiều API, thuận tiện cho việc mở rộng quy mô các dịch vụ của chúng.

**Khi nào nên sử dụng API**

Nên sử dụng API khi thường xuyên có yêu cầu cập nhật dữ liệu liên tục. Mỗi khi gọi API sẽ có dữ liệu mới. Nếu dữ liệu không cần cập nhật liên tục, dùng API sẽ gây lãng phí nhiều tài nguyên.

Tuy nhiên, nếu được thiết lập phải sử dụng API, chúng ta có thể áp đặt giới hạn các request thực hiện trong một khoảng thời gian cụ thể. Một số ứng dụng thậm chí còn giới hạn số lượng request thực hiện từ ngay khi bắt đầu để giảm tiêu tốn tài nguyên về sau.

![](https://images.viblo.asia/a9f360d3-69af-4d7c-9ddb-f4d91c4dd3dc.png)

### 3. Webhook và APIs

- Chúng đều hỗ trợ đồng bộ hóa và chuyển tiếp dữ liệu, tuy nhiên lại thực hiện bằng những phương thức khác nhau, do đó sẽ phục vụ các mục đích khác nhau.

- Các API cần phải "thăm dò" server thường xuyên để biết được có events mới phát sinh hay không. Ngược lại, với Webhook bất cứ khi nào có event hay dữ liệu mới server đều sẽ tự động thông báo cho client. Nói một cách đơn giản, API sẽ thực hiện khi có yêu cầu (cần được chỉ dẫn, gửi yêu cầu - nhận phản hồi), trong khi Webhook sẽ tự động thực hiện yêu cầu khi các tiêu chí nhất định được đáp ứng.

- API thực hiện cuộc gọi mà không thể biết có nhận được bất kỳ cập nhật dữ liệu mới nào dưới dạng phản hồi hay không, còn Webhook chỉ nhận được các cuộc gọi qua HTTP POST từ các hệ thống bên ngoài khi chúng có một số cập nhật dữ liệu.

- Webhook gửi data và sẽ không quan tâm gì nữa sau khi tạo request. Do đó nếu có lỗi xảy ra thì dữ liệu sẽ bị mất. Nhiều Webhook vẫn quan tâm đến response phía client và nếu có lỗi sẽ thực hiện gửi lại dữ liệu. 

- Nếu request Webhook đã được xử lý nhưng vẫn báo error sẽ gây duplicate data. Do đó, cần hiểu rõ cơ chế của provider được sử dụng để xử lý các trường hợp có lỗi xảy ra.

- Webhook có thể thực hiện rất nhiều request tương ứng với các events. Nếu nhiều request liên tục được gửi đến client có thể dẫn đến DDoS (tấn công từ chối dịch vụ). Do vậ cần đảm bảo handle được cả trường hợp này khi Webhook ngày càng scale.

- Hầu hết các ứng dụng đều dùng cả API và Webhook để tạo ra một hệ thống có thể giao tiếp đúng loại dữ liệu vào đúng thời điểm khi cần.

***Tham khảo***

* [what is a webhook?](https://medium.com/wineofbits/what-is-a-webhook-3327b6e470e4)
* [What Is an API and Why Should I Use One?](https://medium.com/@TebbaVonMathenstien/what-is-an-api-and-why-should-i-use-one-863c3365726b)
* [Webhook là gì? Tìm hiểu tính năng cơ bản của Webhook](https://tungphat.com/webhook-la-gi.html)