Để các bạn đọc hiểu rõ được Ocelot là gì, mình xin giới thiệu qua các khái niệm lớn trước khi bước vào giới thiệu Ocelot

### I. Microservice là gì
Trong lĩnh vực phát triển phần mềm hiện nay, hầu hết các doanh nghiệp, tập đoàn lớn đều sử dụng kiến trúc microservice. Trong kiến trúc microservice, các module sẽ được chia thành các service rất nhỏ (microservice). Mỗi service sẽ được đặt trên một server riêng -> dễ dàng để nâng cấp và scale ứng dụng.

#### Lợi ích
* **Đơn giản hóa hệ thống:** Microservices chia nhỏ hệ thống ra làm nhiều dịch vụ nhỏ lẽ dể dàng quản lý và triển khai từng phần so với kiến trúc nguyên khối. Chúng ta sẽ có thời gian phát triển nhanh hơn, dễ nắm bắt cũng như bảo trì hơn.
* Cho phép việc mỗi dịch vụ được phát triển độc lập bởi những team khác nhau.
* Cho phép mỗi dịch vụ có thể được triển khai một cách độc lập. Cùng với đó thì việc triển khai hệ thống theo kiểu continuous deployment là hoàn toàn có thể.
* Cho phép mỗi dịch vụ có thể thực hiện việc scale một cách độc lập. Bạn có thể scale dễ dàng bằng cách tăng số instance phục vụ cho mỗi dịch vụ lên và phân tải bằng load balancer

#### Một số nhược điểm
* Nếu service nhỏ và khi chia quá nhiều sẽ dẫn đến phân mảnh, khó kiểm soát.
* Dev cần lựa chọn phát triển mỗi service nhỏ giao tiếp với các service khác bằng messaging hay là RPC, sử lý sự cố khi kết nối chậm, lỗi khi thông điệp không gửi được hoặc thông điệp gửi đến nhiều đích đến vào các thời điểm khác nhau.
* Phải đảm bảo giao dịch phân tán (distributed transaction) cập nhật dữ liệu đúng đắn (all or none) vào nhiều dịch vụ nhỏ khác nhau
* Testing một service trong kiến trúc microservices đôi khi yêu cầu phải chạy cả các service khác mà nó phụ thuộc. Do đó khi phân rã ứng dụng một khối thành microservices cần luôn kiểm tra mức độ ràng buộc giữa các service.

Một hệ thống microservices trung bình sẽ có một vài cho tới hàng trăm services khác nhau, nếu như client giao tiếp trực tiếp với các services này thì sơ đồ giao tiếp giữa client và hệ thống của chúng ta sẽ trông như một nồi cám lợn như này:

![](https://images.viblo.asia/39a7a119-68ad-4565-a594-f85fc324fac4.png)

Từ đó mà ta ra đời **API Gateway** (tạm dịch là cổng kết nối API) đóng vai trò là một cổng trung gian giữa client và hệ thống microservices đằng sau.

### II. API Gateway là gì
API Gateway có thể coi là một cổng trung gian - cổng vào duy nhất tới hệ thống microservice. Api Gateway sẽ nhận các requests từ phía client, chỉnh sửa, xác thực và điều hướng chúng đến các API cụ thể trên các services phía sau. Khi này sơ đồ hệ thống của chúng ta sẽ trông như này.

![](https://images.viblo.asia/af0b210b-589e-4699-9380-cb0136d96ca8.png)

Một API Gateway thường có các tính năng cơ bản như sau:
* Routing : Quản lý các dịch vụ và phân phối request từ client đến dịch vụ tương ứng.
* Offloading : Cung cấp khả năng giảm tải thông qua các cross-cutting function sử dung chung bởi các microservices.
* Authentication và Authorization (Xác thực và phân quyền)
* Tích hợp các service
* Caching
* Rate limiting (Hạn chế số lượng request)
* Load Balancer (Cân bằng tải )
* Ghi Logging, tracing, correlation
* IP whitelisting (ngược lại với blacklist)
* ….

#### Lợi ích
* Đóng gói cấu trúc bên trong của ứng dụng, **giảm sự phụ thuộc** giữa client và ứng dụng
* Client **chỉ cần nói chuyện với gateway** thay vì các services
* Giảm thiểu trao đổi qua lại giữa client và ứng dụng từ đó **đơn giản hoá client code**
* Các cross-cutting function được cung cấp để **giảm tải cho services.**
* **Security**: nếu không có API Gateway thì toàn bộ services sẽ cần được exposed ra bên ngoài và tạo ra nguy cơ tiềm ẩn về an ninh

#### Một số nhược điểm
* API Gateway là **single point of failure** (nếu điểm này bị lỗi, toàn bộ hệ thống sẽ ngừng hoạt động)
* Có thể làm **tăng response time** vì phải đi qua server trung gian
* Nếu không scale tốt thì API Gateway **có thể gây nghẽn cổ chai**
* **Tốn thêm tiền** (tiền server, tiền điện, tiền quản lý hệ thống api gateway,...)

### III. Ocelot
Ocelot là bộ mã nguồn mở - một giải pháp để xây dựng API Gateway trên .NET, .NET Core.
Ocelot có gần như mọi tính năng của một API Gateway đã liệt kê ở trên như load balancer, routing, cachiung, authen và author,...

Ở bài viết sau mình sẽ hướng dẫn cách config Ocelot vào dự án .NET Core

### Tài liệu tham khảo
[1] https://viblo.asia/p/microservices-la-gi-gAm5yjD8Kdb

[2] https://viblo.asia/p/api-gateway-la-gi-tai-sao-mot-he-thong-microservices-lai-can-api-gateway-Do754pDX5M6

[3] https://ocelot.readthedocs.io/en/latest/introduction/bigpicture.html

[4] https://www.c-sharpcorner.com/article/building-api-gateway-using-ocelot-in-asp-net-core/