Trong quá trình phát triển hệ thống hoặc quá trình testing, một trong những vấn đề khó khăn là khi hệ thống của bạn cần tích hợp với một bên thứ ba (3rd party). Do sử dụng API của bên thứ ba nên chúng ta có thể gặp một số vấn đề sau:

+ Bên thứ ba không có hoặc không cung cấp hệ thống test cho chúng ta.
+ Bên thứ 3 đang phát triển API song song với chúng ta hoặc chưa hoàn thành API cho chúng ta sử dụng.
+ Không thể gọi API thật để test: gặp vấn đề về chi phí và bảo mật.
+ Gọi service của bên thứ ba để viết Unit Test rất chậm và đôi khi service của họ die dẫn đến Unit Test của chúng ta failed không mong muốn.

Để giải quyết vấn đề này, mình cần thu thập API document của họ, và dựng nên con mock service, trả về đúng những trường hợp cần sử dụng trong requirement API document và để team tích hợp.

Trong bài viết này mình sẽ giới thiệu về 1 Mock service rất dễ sử dụng là Castle Mock.

![](https://images.viblo.asia/69ff0ec2-5685-4d05-9a18-664780847133.png)

# Giới thiệu Castle Mock

Castle Mock là một ứng dụng web cung cấp chức năng để giả lập API RESTful và SOAP web service. Chức năng này cho phép các developer phía client có thể giả lập các behavior và response ở phía server.

Một số tính năng nỗi bật của Castle Mock:

* SOAP & REST: Có thể Mock cho cả SOAP and REST. Có thể được cấu hình bằng cách import các file định nghĩa service như: WSDL, WADL, Swagger và RAML. Các web service được xác định trong các file cấu hình sẽ được Castle Mock giả lập một cách tự động.
* Proxy và record responses: Castle Mock có thể được sử dụng như một proxy giữa Client và Server. SOAP và REST có thể được mock hoặc chuyển tiếp đến service thật. Phản hồi (response) từ các yêu cầu được chuyển tiếp có thể được ghi lại tự động và được sử dụng để tạo các phản hồi giả (mocked response).
* Logging: Tất cả các request gửi đến và response gửi đi sẽ được ghi lại, giúp chúng ta dễ dàng theo dõi cũng như debug khi cân thiết.
* Easy installation: Castle Mock được xây dựng bằng Java và bản thân ứng dụng được dễ dàng triển khai trên máy chủ Apache Tomcat thông qua WAR file. Ngoài ra, Castle mock cũng dễ dàng được setup và deploy trên Docker.
* Open source: Castle Mock hoàn toàn miễn phí và là nguồn mở (Giấy phép Apache 2.0). Source code của nó có thể được tìm thấy trên Github.

# Hướng dẫn cài đặt và sử dụng Castle Mock
Một số hình ảnh Castle Mock sau khi cài đặt:

![](https://images.viblo.asia/deb07b0b-cf46-4f37-bd51-d1aa349fa680.png)

![](https://images.viblo.asia/82712f19-38a4-4a24-b676-518a1567eeb1.png)

![](https://images.viblo.asia/0347b60f-607c-4747-a2c6-296a29e865de.png)

![](https://images.viblo.asia/3a525986-9e3d-4341-9d02-bdb57e5951b9.png)

![](https://images.viblo.asia/2d2861c0-64d4-4e42-9271-bdb27b47cf8f.png)

Các bạn xem thêm ở bài viết gốc: [https://gpcoder.com/6070-gioi-thieu-castle-mock-mock-rest-apis-va-soap-web-services/](https://gpcoder.com/6070-gioi-thieu-castle-mock-mock-rest-apis-va-soap-web-services/)