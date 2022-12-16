## Đặt vấn đề
 Hãy thử tưởng tượng bạn đang xây dựng 1 trang web bán hàng, sử dụng kiến trúc Microservice và bạn cần implement trang chi tiết cho sản phẩm. Bạn cần phát triển nhiều phiên bản giao diện:
 
 - UI cho cho desktop, mobile browser
 - Native mobile app

Hơn nữa, trang web cần xây dựng các API về sản phẩm, được sử dụng bởi các bên thứ 3. Giao diện chi tiết sản phẩm cần hiển thị rất nhiều thông tin về sản phẩm :

- Thông tin cơ bản như tiêu đề, xuất sứ, giá, ...
- Lịch sử bán sản phẩm
- Số lượng còn lại
- Các phương thức thanh toán
- Những sản phẩm liên quan
- Những đánh giá của người mua
- ....

Bởi vậy bạn chọn kiến trúc Microservice để chia nhỏ các thành phần của trang chi tiết sản phẩm thành nhiều services nhỏ:

- Service cung cấp thông tin sản phẩm
- Service xử lý giá
- Service xử lý đơn hàng
- Service xử lý kho
- Service xử lý đánh giá của người dùng
- ...

> Vậy làm sao để client của trang web của bạn có thể truy cập từng service riêng biệt ? 

## Solution

Giải pháp cho vấn đề này là phải implement một API Gateway, tạo ra một entrypoint cho toàn bộ các request tới. API Gateway sẽ xử lý toàn bộ các request tới, điều hướng chúng tới chính xác service mà user mong muốn. 

![](https://images.viblo.asia/d41e8d35-f94a-40f5-ba75-3510cfcff633.jpg)

Bằng cách sử dụng API Gateway, ứng dụng của bạn có thể cung cấp API ra ngoài cho các bên thứ 3 sử dụng. Hơn nữa, chúng ta có thể đảm bảo security cho ứng dụng bằng việc xác thực user đang thực hiện request tới.

### Chức năng chính của API Gateway

- Routing: Sử dụng API Gateway giống như việc bạn đóng gói ứng dụng vào một khối, phân tách client và ứng dụng, mọi request từ client sẽ đi qua 1 điểm duy nhất.
- Offloading: API Gateway có thể đảm nhiệm các chức năng như Authentication, authorization, rate limiting, load balancing, logging, tracing, IP Whitelisting,... tác chúng ra khỏi phần logic của ứng dụng.

## Các API Gateway nổi tiếng

### Netflix API Gateway: Zuul

Netflix là một dịch vụ streaming trên rất nhiều nền tảng khác nhau như tivi, điện thoại thông minh, thiết bị chơi game, máy tính bảng,... Số lượng request trong giờ cao điểm mà chúng phải xử lý mỗi giây lên tới 50000. Netflix đã nhận thấy những hạn chế trong việc sử dụng cơ chế OSFA (one-size-fits-all) nên đã chuyển qua sử dụng APT Gateway để điều chỉnh request cho từng thiết bị khác nhau.

[Zuul 2](https://github.com/Netflix/zuul) sẽ điều hướng tất cả các request tới cloud của Netflix, nó cải thiện đáng kể kiến trúc hạ tầng và chức năng, cho phép gateway xử lý request, điều hướng và bảo vệ hạ tầng cloud của Netflix, cung cấp trải nghiệm tốt nhất cho hơn 125 triệu người dùng.

![](https://images.viblo.asia/cac52c3d-e5cb-4384-b643-1fb431fd3dc0.png)


Zuul sử dụng rất nhiều loại filter giúp chúng ta có thể apply chúng vào ứng dụng của mình, các filter thực thi các chức năng như :

- Authentication and Security
- Insights and Monitoring
- Dynamic Routing
- Stress Testing
- Load Shedding
- Static Response handling 
- Multiregion Resiliency 

### Amazon API Gateway

AWS cung cấp dịch vụ quản lý để tạo, duy trì, monitoring và bảo mật cho các hệ thống REST API, HTTP, Websocket,.. các nhà phát triển có thể tạo ra các API tương tác với AWS, các web service hay dữ liệu được lưu trữ trên AWS cloud. Amazon API Gateway xử lý toàn bộ các tác vụ liên quan đến chấp nhận và xử lý hàng trăm ngàn request API đồng thời, bao gồm việc quản lý traffic, CORS, authorization,... Tuy nhiên, chi phí cho API Gateway không cố định , bắt buộc bạn cần thành toán theo từng lượt request API bạn nhận, lượng dữ liệu chuyển qua.

![](https://images.viblo.asia/81e81232-7dfd-47df-b791-b6e9bc3c0a2b.png)

Amazon API Gateway mạng lại rất nhiều lợi ích như :

- Nâng cao hiệu quả của API do có thể chạy đồng thời nhiều version của cùng 1 API
- Performance cao với độ trễ của request và response thấp
- Chi phí cho việc scale thấp
- Dễ dàng monitoring
- Bảo mật

### Kong API Gateway

[Kong Gateway](https://konghq.com/kong/) là một open source, là một API Gateway nhỏ nhẹ được tối ưu cho ứng dụng sử dụng kiến trúc Microservice, mang lại hiệu suất cả, khả năng mở rộng ứng dụng không gây downtime. API Gateway này phù hợp cho những ứng dụng cơ bản, nó có thể mở rộng theo chiều ngang một cách đơn giản bằng việc bổ sung thêm các node. Tuy đơn giản, nhưng nó đảm nhiệm việc xử lý được khối lượng công việc lớn và độ trễ thấp.

![](https://images.viblo.asia/84d5276c-4160-46e5-be36-a3951f10e202.png)

Kong Gateway lắng nghe traffic từ port 8000 và 8443, nó sẽ thực hiện đánh giá API request từ client và điều hướng chúng tới chính xác backend API cần thiết. Trong quá trình điều hướng request, response, Kong cung cấp các plugin để áp dụng các policy vào đó. Ví dụ, trước khi routing request, client phải đăng nhập, vậy plugin của Kong sẽ hỗ trợ nó nên :

- Service backend không cần implement logic authentication bởi Kong Gateway xử lý luôn
- Service chỉ phải xử lý các request đã được xác thực, không tốn chi phí để xử lý các request invalid.
- Tất cả các request đều được log lại

### Những API Gateway khác

Ngoài các API Gateway nổi tiếng kể trên, có rất nhiều các hệ thống API Gateway khác cho bạn lựa chọn như : 

- [Apigee API Gateway](https://apigee.com/api-management/)
- [MuleSoft](https://www.mulesoft.com/platform/api-management)
- [Tyk.io](https://github.com/TykTechnologies/tyk)
- [Akana](https://www.akana.com/products/api-platform/api-gateway)
- [SwaggerHub](https://swagger.io/tools/swaggerhub/)
- [Azure API Gateway](https://azure.microsoft.com/en-us/services/api-management/)
- [Express API Gateway](https://www.express-gateway.io/)
- [Karken D](https://www.krakend.io/)

Việc lựa chọn API Gateway phù hợp cho ứng dụng của bạn nên dựa trên các tiêu chí như tính đơn giản để sử dụng, nó là open-source hay close-source, khả năng mở rộng, tính linh hoạt, khả năng bảo mật, các tính năng nâng các khác,... ngoài ra cũng nên cân nhắc tới việc quản lý, monitoring, việc triển khai ứng dụng hay chi phí cho nhà cũng cấp dịch vụ.