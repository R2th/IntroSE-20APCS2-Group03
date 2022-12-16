### 1. Amazon API Gateway
### 
API Gateway là dịch vụ nhận và xử lý cái lời gọi API. 

API đóng vai trò là "cửa trước" cho các ứng dụng để truy cập dữ liệu, logic nghiệp vụ hoặc chức năng từ các dịch vụ backend của bạn

API Gateway của Amazone hỗ trợ 2 loại API:
- HTTP/REST : HTTP APIs cho phép bạn tạo các API RESTful với độ trễ thấp hơn và chi phí thấp hơn các API REST. Nếu API của bạn yêu cầu cả chức năng proxy API lẫn tính năng quản lý API trong cùng một giải pháp thì API Gateway cũng cung cấp cả API REST.
- WEBSOCKET: Thích hợp đối với các ứng dụng hai chiều theo thời gian thực, tiêu biểu là ứng dụng chat trực tuyến.

Một số đặc tính nổi bật mà dịch vụ này có thể đem lại là: 
- Luôn có sẵn để nhận requests
- Có Auto-scale để xử lý hàng trăm nghìn lời gọi API tại một thời điểm.

Nói đến đây thì các bạn có thể thấy nó sự tương đồng vs dịch vụ 'Cân Bằng Tải' Elastíc Load Blancing. Nhưng sau đây là những điểm khác biệt.

Đối với API Gateway, chúng ta có thể định nghĩa thông tin vào trong API. Những thông tin này gồm tên path và method.

Ngoài ra thì API Gateway cũng hỗ trợ trích xuất dữ liệu từ:
- Biến trên đường dẫn
- Query String trên URL
- Headers
- Body của request

Từ những thông tin này bạn có thể hình thành các lời gọi đến backend. Từ đây bạn có thể xử lý các dữ liệu này trước khi trả về cho client.

### 2. Throttle
### 

Để tránh việc API bị quá tải và lạm dụng do quá nhiều request(tốn nhiều tiền), Amazon API Gateway cho phép thắt cổ chai bằng [thuật toán token bucket](https://en.wikipedia.org/wiki/Token_bucket) . 

Ở đây bạn có thể cài đặt 2 thuộc tính:
- Rate: số request nhận tối đa trong một giây đồng hồ
- Burst: Số request tối đa được xử lý tại một thời điểm

Khi số lượng request vượt quá **Rate** hoặc **Burst** hệ thống sẽ trả về lỗi 429 - Too many Requests.

### 3. API Gateway hoạt động như thế nào
### 

Bạn có thể deploy API trên AWS region, VPC (Virtual Private Cloud), Amazon CloudFront Network. Điều này cho phép bạn sử dụng nó ở rất nhiều cách khác nhau cho cả API nội bộ lẫn truy cập từ bên ngoài.

Ngay khi API Gateway nhận được 1 request, và hệ thống đã thực hiện việc bóc tách dữ liệu từ request đó xong, bây giờ là lúc để gọi đến cách dịch vụ backend như :
- Gửi request này đến 1 function Lambda
- Một EC2 (VPC)
- Containers
- Cách dịch vụ AWS khác
- Một public hoặc private URL (endpoint).

![](https://images.viblo.asia/8e000614-0aff-4cb0-a35e-aa7c5eeaca81.png)
https://aws.amazon.com/vi/api-gateway/


### 4. Monitoring (Giám sát)
Cũng như bao dịch vụ AWS khác, API cũng cung cấp việc quản lý, theo dõi các số liệu hoạt động của dịch vụ này.

Bạn có thể giám sát các số liệu về hiệu năng và thông tin về các lệnh gọi API, độ trễ dữ liệu và tỷ lệ lỗi từ bảng điều khiển API Gateway, nhờ đó bạn có thể giám sát trực quan các lệnh gọi đến dịch vụ của bạn thông qua Amazon CloudWatch.

### 5. Xác thực và phân quyền (Authentication và Authorization)
API Gateway cung cấp một vài phương thức hỗ trợ cho việc này:
- Amazon Cognito: Cho phép sử dụng ứng dụng bên thứ 3 như Google, Facebook, Amazon. Người dùng có thể sử dụng các tài khoản của 3 nhà cung cấp này để xác thực và phân quyền đối với việc truy cập API.
- AWS Identity và Access Management (IAM):  Sử dụng Signature version 4 (Sigv4). Nếu bạn sử dụng một dịch vụ AWS khác để truy cập API Gateway, thì SDK của dịch vụ đó sẽ cung cấp Sigv4 để xác thực và phân quyền.
- AWS Lambda: OAuth, SAML, JWT token, sử dụng trong trường hợp muốn tùy chỉnh.

### 6. API Key

Bạn có thể tận dụng API Key để theo dõi một clients cụ thể. 

Sử dụng để hỗ trợ trong việc phân phối các method cụ thể (có API Key mới được sử dụng).

Đối với các Key được cấp phép, tương tự như cơ chế thắt cổ chai bằng token bucket ở trên, ta có thể cài đặt số lượng cụ thể về **Rate** và **Burst** để chỉ rõ số request cụ thể đến từ một API Key cụ thể

### 7. Phát triển API

Trong quá trình phát triển API, bạn có thể tận dụng **API Stages**, Bạn có thể sử dụng nó để chạy nhiều phiên bản (Dev, Test, Production) cùng lúc thông qua API Gateway

**Canary release** là một tính năng bạn có thể sử dụng cho một Stage cụ thể, khi một Stage mới được deploy với Canary Release, nó sẽ cho phép bạn cài đặt tỷ lệ luồng truy cập vào phiên bản mới được deploy.

 Ví dụ như bạn có thể chỉ rõ là chỉ 5% lượng truy cập sẽ sử dụng bản cập nhật mới, còn 95% còn lại vẫn sẽ sử dụng phiên bản cũ, rồi dần dần tăng lên 10%, 20% cho đến khi bạn chắc chắn rằng phiên bản mới này có thể được chạy đối với toàn bộ user. 
 
 Đây là một tính năng để tránh việc khi có lỗi ở bản cập nhật mới sẽ gây ra lỗi với tất cả user. 
 
 Có thể bạn sẽ để ý rằng các bản cập nhật mới của Facebook đôi khi chỉ xuất hiện với 1 số tài khoản, những tài khoản khác cần một khoảng thời gian sau mới được sử dụng.

Đối với mỗi bản Deploy, AWS cung câp SDK Generation, là nơi để bạn chọn một ngôn ngữ được hỗ trợ (Android, Javascript, Swift, Java, Ruby) và nó sẽ tự động sinh ra toàn bộ method trong API của bạn bằng ngôn ngữ đã chọn.

Để tạo documentation cho API của bạn, AWS cung cấp việc export và import Swagger.

Nguồn tham khảo:

https://app.pluralsight.com/library/courses/aws-network-design-getting-started

https://aws.amazon.com/vi/api-gateway/

https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html