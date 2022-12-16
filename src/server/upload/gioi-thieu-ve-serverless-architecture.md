> Bài viết được tham khảo từ trang [https://hackernoon.com](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9). Trong nội dung bài viết có một số thuật ngữ nếu dịch sang Tiếng Việt sẽ làm sai nghĩa hoặc không sát nghĩa nên mình xin phép để nguyên gốc thuật ngữ tiếng Anh.

Serverless, một từ thông dụng mới xuất hiện gần đây đã thu hút được rất nhiều sự chú ý từ các chuyên gia và các tân binh trong ngành công nghệ. Một phần do cách mà các nhà cung cấp clould như AWS đã thổi phồng kiến trúc, từ các hội nghị đến tận các cuộc họp đến các bài đăng trên blog đến hầu hết mọi nơi. Nhưng serverless thật sự không phải bị cường điệu hóa quá nhiều, nó hứa hẹn khả năng triển khai kinh doanh lý tưởng - nghe có vẻ khá dễ chịu và có lẽ cũng nhẹ về ngân sách, tất nhiên nó phải mang trong mình những ưu thế vượt trội.

> “Focus on your application, not the infrastructure”

Có vẻ như dễ nghe phết đấy, khi biết thực tế trong quá khư bạn đã phải tốn quá nhiều thời gian cho việc thực hiện cải tiến, bảo trì, gỡ lỗi, và giám sát vận hành infrastructure. Thực sực chúng ta có thể giảm thiếu khối thời gian năng nề cho việc tập trung vào các mục tiêu kinh doanh/nghiệp vụ mà các ứng dụng của chúng ta phục vụ, dành nhiều thời gian hơn để cải thiện dịch vụ, thực hiện những ý tưởng mới mẻ chẳng hạn. Có thể nghe khá là tốt, thậm chí đối với nhiều người điều này quá là lí lưởng, nhưng thực sự đây là điều cần phải có, ít nhất là đối với những người không có khả năng đanh nhiều thời gian để có thể giải quyết những rắc rối trong một hệ thống infrastructure phức tạp và hiện đại.

Thực sự ngoài mong đợi, serverless là một sự lựa chọn hết sức đột phá. Serverless đã được sử dụng trong sản xuất bởi các công ty như Netflix, Reuters, AOL và Telenor và vẫn không ngừng tăng lên. 

### Vậy, Serverless là gì?
Serverless là mô hình thực thi điện toán đám mây trong đó nhà cung cấp đám mây tự động quản lý việc phân bổ và cung cấp máy chủ. Một ứng dụng không có máy chủ chạy trong các compute containers không trạng thái được kích hoạt sự kiện, không lâu (có thể tồn tại trong một lần gọi) và được nhà cung cấp đám mây quản lý hoàn toàn. Giá cả được dựa trên số lượng thực thi thay vì được cố định trước đó, đó có phải là framework lý tưởng cho dự án mà bạn đã lên kế hoạch từ lâu không? Nếu có, tiếp tục tìm hiểu nhé.
Các ứng dụng không có máy chủ là các hệ thống dựa trên đám mây theo sự kiện, trong đó việc phát triển ứng dụng chỉ dựa vào sự kết hợp của các dịch vụ bên thứ ba, logic phía máy khách và các cuộc gọi thủ tục từ xa được lưu trữ trên đám mây (Chức năng như một Dịch vụ).
Hầu hết các nhà cung cấp đám mây đã đầu tư rất nhiều vào serverless và đó là rất nhiều tiền; với chương trình khuyến mãi lớn và cung cấp thực tế, bạn có thể cho rằng serverless là một trong những dịch vụ đám mây được sử dụng nhiều nhất trong những năm tới. Dưới đây là một số dịch vụ đám mây hiện có:

* AWS Lambda
* Google Cloud Functions
* Azure Functions
* IBM OpenWhisk
* Alibaba Function Compute
* Iron Functions
* Auth0 Webtask
* Oracle Fn Project
* Kubeless

### Traditional vs. Serverless Architecture

![Traditional vs. Serverless Architecture](https://images.viblo.asia/9a0fb8a5-8c9f-4d03-9114-ed7658f2e4f9.jpeg)

Trong nhiều năm, các ứng dụng của bạn đã chạy trên các máy chủ mà bạn phải liên tục cài đặt bản vá, cập nhật và liên tục "để mắt" thậm chí cả vào những đêm muộn và sáng sớm do tất cả các lỗi không thể tưởng tượng đã phá vỡ production của bạn. Serverless có xu hướng không giống như đã nói ở trên, bạn không còn phải lo lắng về các máy chủ. Lý do là chúng không còn được bạn quản lý nữa và với sự quản lý ra khỏi image, trách nhiệm thuộc về các nhà cung cấp dịch Đám mây. Nhưng bất kể là các tính năng thú vị của Serverless vượt trội hơn  trong một số trường hợp, kiến trúc truyền thống vẫn đang có phần vượt trội Serverless

Chúng ta cùng lướt qua một số so sánh nhanh dưới đây:

### Giá cả(price):

Một trong những lợi thế chính của việc sử dụng Serverless là giảm thiểu chi phí. Mô hình chi phí của Serverless tính toán dựa trên những gì thực thi, nghĩa là tính phí cho số lần thực hiện. Bạn đã phân bổ một số giây sử dụng nhất định thay đổi theo dung lượng bộ nhớ bạn yêu cầu. Tương tự, giá mỗi MS (mili giây) thay đổi theo dung lượng bộ nhớ bạn yêu cầu. Rõ ràng, các chức năng chạy ngắn hơn có thể thích ứng hơn với mô hình này với thời gian thực hiện cao nhất là 300 giây đối với hầu hết các nhà cung cấp Đám mây.
OK. trong tiêu chí này chiến thắng thuộc về Serverless Architecture.

### Mạng(network)
Nhược điểm là các chức năng Serverless chỉ được truy cập dưới dạng API riêng. Để truy cập chúng, bạn phải thiết lập API Gateway. Điều này không có tác động đến giá cả hoặc quy trình của bạn, nhưng điều đó có nghĩa là bạn không thể truy cập trực tiếp vào chúng thông qua IP thông thường!
OK, chiến thắng ở đây thuộc về Kiến trúc truyền thống.

### Phụ thuộc bên thứ 3 (3rd Party Dependencies)
Hầu hết, nếu không muốn nói là tất cả các dự án của bạn đều có sự phụ thuộc bên ngoài, chúng dựa vào các thư viện không được tích hợp vào ngôn ngữ hoặc khung bạn sử dụng. Bạn thường sử dụng các thư viện có chức năng bao gồm mật mã, xử lý hình ảnh, v.v., những thư viện này có thể khá nặng. Không có quyền truy cập cấp hệ thống, bạn phải đóng gói các phụ thuộc này vào chính ứng dụng.

Phát minh lại bánh xe không phải là một ý tưởng tốt.
Chiến thắng ở đây cũng dựa trên bối cảnh. Đối với các ứng dụng đơn giản có ít phụ thuộc, Serverless là người chiến thắng; Đối với bất cứ điều gì phức tạp hơn, Kiến trúc truyền thống là người chiến thắng. xem như ở tiêu chí này cả hai hòa nhau.

### Môi trường
Thiết lập các môi trường khác nhau cho Serverless cũng dễ như thiết lập một môi trường duy nhất.Cho nó trả tiền cho mỗi lần thực hiện, đây là một cải tiến lớn so với các máy chủ truyền thống, bạn không còn cần phải thiết lập các môi trường dev, staging, and production. Cuối cùng, bạn sẽ mất số lượng tất cả các môi trường tại một số điểm.

Người chiến thắng ở đây là Serverless Architecture.

### Timeout
Với tính toán Serverless, có giới hạn thời gian chờ 300 giây. Các chức năng quá phức tạp hoặc hoạt động lâu không tốt cho Serverless, nhưng thời gian chờ quá khiến bạn không thể thực hiện một số tác vụ nhất định. Giới hạn cứng vào thời điểm này làm cho Serverless không thể sử dụng được cho các ứng dụng có thời gian thực hiện thay đổi và đối với một số dịch vụ yêu cầu thông tin từ nguồn bên ngoài.

Dành chiến thắng ở tiêu chí nàyrõ ràng ở đây là Kiến trúc truyền thống.

### Scale
Quá trình mở rộng cho Serverless là tự động và liền mạch, nhưng thiếu kiểm soát hoặc thiếu hoàn toàn kiểm soát. Mặc dù tự động mở rộng rất tuyệt vời, nhưng khó có thể giải quyết và giảm thiểu các lỗi liên quan đến các trường hợp Serverless mới.

Nó liên kết giữa Serverless và Kiến trúc truyền thống.


Trong nội dung bìa viết này, mình đã giới thiệu sơ qua về một thuật ngữ có phần đang khá mới là Serverless Architecture, trong bài viết sau mình sẽ giới thiệu kĩ hơn về ưu, nhược điểm của nó qua các case-study cụ thể. Cảm ơn các bạn đã quan tâm ^^