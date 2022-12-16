REST đã từng là một phong cách kiến trúc phổ biến để thiết kế API nhưng trong những năm gần đây, sự phổ biến của GraphQL đang đe dọa sự thống trị của REST.

Những tranh luận về GraphQL và REST đang diễn ra gay gắt và hầu hết các doanh nghiệp đều bị giằng xé giữa hai vấn đề này khi nói đến việc tạo hoặc sử dụng API. Trong khi REST được chấp nhận rộng rãi như là tiêu chuẩn công nghiệp để thiết kế API, GraphQL lại được ca ngợi là một công nghệ mới có khả năng khắc phục các sai sót trong REST.

REST và GraphQL là hai phương pháp truy xuất dữ liệu. Một là một phương pháp truyền thống hơn, trong khi một phương pháp khác chỉ mới ra mắt vào năm 2015 nhưng đã thực sự thành công với các nhà phát triển. Trong bài viết này, mình sẽ hướng dẫn bạn qua từng tùy chọn để bạn có thể quyết định tùy chọn nào phù hợp nhất với nhu cầu của mình.

# Kiến thức cơ bản về REST API

![](https://images.viblo.asia/ada2caf3-0fa0-460a-ac7a-2fdec5ea75b0.jpeg)

REST thiết kế mô hình tập trung vào một tập hợp thống nhất và được xác định trước các hoạt động không trạng thái cho phép người dùng truy cập và thao tác dữ liệu web. Các API tuân theo các nguyên tắc thiết kế REST thường được gọi là  RESTful API.

Trong kiến trúc REST, các API thể hiện chức năng của chúng dưới dạng tài nguyên, là bất kỳ loại dịch vụ, dữ liệu hoặc đối tượng nào mà client có thể truy cập. Mỗi tài nguyên đều đi kèm với URI duy nhất của riêng nó mà máy client có thể truy cập bằng cách gửi yêu cầu đến máy chủ.

Vì vậy, bất cứ khi nào client gọi một API RESTful, máy chủ sẽ phản hồi với một biểu diễn về trạng thái của tài nguyên được truy vấn. Nhiều triển khai REST phổ biến sử dụng các phương thức HTTP tiêu chuẩn (GET, POST, PUT, DELETE và PATCH) để gọi tới server.

# Kiến thức cơ bản về GraphQL API

![](https://images.viblo.asia/54c16570-a0ae-4362-8572-b82f9c0585e0.jpeg)

GraphQL là một ngôn ngữ truy vấn để làm việc với các API. Ngôn ngữ này cho phép client thực hiện các yêu cầu HTTP và nhận responses.

GraphQL cho phép người dùng yêu cầu dữ liệu từ một số tài nguyên bằng một yêu cầu duy nhất. Thay vì thực hiện nhiều yêu cầu để tìm nạp dữ liệu, bạn có thể sử dụng nó để thực hiện các truy vấn đặc biệt tới một điểm endpoint duy nhất và truy cập tất cả dữ liệu được yêu cầu.

Hơn nữa, GraphQL cung cấp cho client sự sang trọng để chỉ định loại dữ liệu chính xác sẽ nhận được từ máy chủ. Không hơn không kém. Cấu trúc dữ liệu có thể dự đoán này làm cho nó dễ đọc và hiệu quả.

# So sánh REST và GraphQL

GraphQL so với REST. Đó là một cuộc tranh luận gay gắt trong thế giới API trong một thời gian. Và thẳng thắn mà nói, chúng chỉ là hai phương pháp khác nhau để giải quyết cùng một vấn đề: truy cập dữ liệu từ các dịch vụ web.

Mặc dù hai công nghệ có một số điểm tương đồng, nhưng sự khác biệt nhỏ có thể khiến bạn lựa chọn công nghệ này hơn công nghệ khác.

REST và GraphQL là hai cách tiếp cận thiết kế API thực hiện cùng một chức năng: truyền dữ liệu qua các giao thức internet như HTTP. Tuy nhiên,GraphQL là một ngôn ngữ truy vấn, trong khi REST là một mẫu kiến trúc.

| GraphQL | REST |
| -------- | -------- |
| Một ngôn ngữ truy vấn cung cấp hiệu quả và tính linh hoạt để giải quyết các vấn đề thường gặp khi tích hợp các API  | Một phong cách kiến trúc phần lớn được xem như một tiêu chuẩn thông thường để thiết kế các API   |
| Được triển khai qua HTTP bằng cách sử dụng một endpoint duy nhất. | Được triển khai trên một tập hợp các URL trong đó mỗi URL cung cấp một tài nguyên duy nhất   |
| Sử dụng kiến trúc hướng đến client | Sử dụng kiến trúc hướng đến server  |
| Thiếu cơ chế lưu vào bộ nhớ đệm tự động | Tự động sử dụng bộ nhớ đệm |
| Không có phiên bản API | Hỗ trợ nhiều phiên bản API |
| Chỉ đại diện data kiểu JSON | Hỗ trợ nhiều định dạng dữ liệu |
| Chỉ một công cụ duy nhất được sử dụng chủ yếu cho tài liệu: GraphQL | Nhiều tùy chọn cho tài liệu tự động, chẳng hạn như OpenAPI và API Blueprint |
| Xử lý phức tạp các mã trạng thái HTTP để xác định lỗi | Sử dụng mã trạng thái HTTP để dễ dàng xác định lỗi |

# GraphQL so với REST, cái nào tốt hơn?

Câu trả lời cho câu hỏi trên là vô cùng chủ quan và phần lớn phụ thuộc vào yêu cầu dự án cụ thể của bạn.

Ví dụ: Nếu bạn không muốn lòng vòng để tìm nạp dữ liệu, và dữ liệu sử dụng không dư thừa cùng với API có thể sử dụng cho nhiều nền tảng (web, mobile, ...) thì GraphQL có thể là sự lựa chọn của bạn.

Mặt khác, nếu bạn có ý định sử dụng một kỹ thuật đã được thử và chứng minh đi kèm với khả năng xác thực hoặc bộ nhớ đệm gốc mạnh mẽ, thì REST có thể là lựa chọn tốt nhất của bạn.

Nếu bạn biết các ràng buộc và sự cân bằng đi kèm với mỗi phong cách thiết kế API, bạn có thể thoải mái chọn tùy chọn phù hợp nhất với trường hợp sử dụng của mình. Vẫn tốt hơn, bạn có thể sử dụng phương pháp kết hợp và kết hợp sử dụng cả hai.

Cuối cùng, bất kể lựa chọn của bạn là gì, bạn nên hướng tới việc thiết kế một sản phẩm API đáp ứng nhu cầu của tất cả những người tham gia trong chuỗi giá trị API: nhà cung cấp API, người tiêu dùng API (nhà phát triển) và người dùng cuối (khách hàng).

# Tài liệu tham khảo

https://blog.api.rakuten.net/graphql-vs-rest/