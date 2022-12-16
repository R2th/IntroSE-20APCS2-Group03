Các bài viết trước:

1. [Ứng dụng AWS trong thực tế](https://viblo.asia/p/aws-amazon-web-services-la-gi-ung-dung-trong-thuc-te-4dbZNN98ZYM)
2. [Bạn có thể làm gì với AWS](https://viblo.asia/p/ban-co-the-lam-gi-voi-aws-aWj53bjpl6m)
3. [Lợi ích khi sử dụng AWS](https://viblo.asia/p/loi-ich-khi-su-dung-aws-LzD5dLWz5jY)
4. [Cách tính cho phí dịch vụ AWS](https://viblo.asia/p/cach-tinh-chi-phi-dich-vu-aws-maGK70BBZj2)
5. [Khám phá những dịch vụ AWS](https://viblo.asia/p/kham-pha-nhung-dich-vu-cua-aws-V3m5WWNb5O7)

Khi bạn tương tác với AWS để cấu hình hoặc sử dụng dịch vụ, bạn cần phải gọi đến API để kết nối các dịch vụ. API là đầu vào của AWS. Được minh họa như sau:

![Những cách truy cập vào AWS API](https://images.viblo.asia/102646e1-9cf5-4e41-b8e5-85ba70016d24.png)

Bạn sẽ được giới thiệu tổng quan về những công cụ có sẵn để tương tác với API: Management Console, giao diện command-line, và infrastructure blueprints (bản thiết kế cơ sở hạ tầng). Chúng ta sẽ so sánh những công cụ khác nhau, và bạn sẽ học cách sử dụng tất cả chúng trong khi làm việc theo cách của bạn.

### Management Console

AWS Management Console cho phép bạn quản lý và truy cập dịch vụ AWS thông qua giao diện đồ họa người dùng (GUI), có thể chạy trên mọi trình duyệt web phiên bản mới nhất.

Khi bạn bắt đầu trải nghiệm với AWS, Management Console là nơi tốt nhất để bắt đầu. Giúp bạn có cái nhìn tổng quan về các dịch vụ khác nhau một cách nhanh chóng. Management Console cũng là cách tốt để cài đặt cơ sở hạ tầng đám mây cho môi trường phát triển và thử nghiệm.

![Quản lý AWS bằng Management Console](https://images.viblo.asia/99421b83-8eb4-422d-befe-0d7e8bfc123a.png)

### Giao diện command-line

Giao diện command-line cho phép bạn quản lý và truy cập dịch vụ AWS thông qua terminal. Bạn có thể sử dụng terminal để tự động hóa hoặc bán tự động các tác vụ lặp lại, đây là một công cụ có giá trị. Bạn có thể sử dụng terminal để tạo ra cơ sở hạ tầng đám mây dựa trên bản thiết kế. lưu trữ trên object store, hoặc nhận thông tin cấu hình chi tiết về cấu hình mạng.

Nếu bạn muốn tự động hóa các bộ phận cơ ở hạ tầng của mình với sự trợ giúp của máy chủ continuous integration, như là Jenkin, giao diện command-line là trợ thủ đắc lực cho công việc này. Nó cho phép bạn truy cập API một cách thuận tiện và kết hợp nhiều câu lệnh trong một script.

Bạn thậm chí có thể tự động hóa cơ sở hạ tầng với nhiều scripts  bằng cách kết hợp nhiều câu lệnh command-line với nhau. Command-line có sẵn cho Windows, Mac, Linux, và cũng có phiên bản cho PowerShell.

![Giao diện command-line](https://images.viblo.asia/84b9080e-def2-4064-a390-d5b8c376fb12.png)

### SDKs

Sử dụng ngôn ngữ lập trình mà bạn thích để tương tác với AWS API. AWS cung cấp SDKs cho những nền tảng và ngôn ngữ sau:

* Android
* NET
* Ruby
* Browsers (JavaScript
* Node.js (JavaScript)
* Go
* iOS
* PHP
* C++
* Java
* Python

SDKs thường được sử dụng để tích hợp dịch vụ AWS vào ứng dụng. Nếu bạn đang phát triển phần mềm và muốn tích hợp dịch vụ AWS như là: cơ sở dữ liệu NoSQL hoặc dịch vụ gửi thông báo, SDK là lựa chọn phù hợp cho công việc của bạn. Những dịch vụ như là queues và topics, bắt buộc phải sử dụng với SDK.

### Bản thiết kế (blueprints)

Bản thiết kế là sự mô tả hệ thống của bạn chứa tất cả nguồn tài nguyên và phụ thuộc của chúng. Công cụ Infrastructure as Code so sánh bản thiết kế với hệ thống hiện tại, và tính toán các bước để tạo, cập nhập, hoặc xóa cơ sở hạ tầng đám mây của bạn.

Bản thiết kế được chuyển đổi sang hệ thống thực được mô tả như sau:

![Bản thiết kế](https://images.viblo.asia/9de8dab7-b2da-4885-bbb8-ea5e14c89f7a.png)

Cân nhắc nên sử dụng bản thiết kế nếu bạn phải kiểm soát nhiều môi tường phức tạp. Bản thiết kế sữ giúp bạn tự động hóa cấu hình cơ sở hạ tầng trên cloud. Bạn có thể sử dụng chúng để thiết lập mạng và chạy máy ảo.

Tự động hóa co sở hạ tầng có thể viết bằng source code với sự trợ giúp của command-line hoặc SDKs. Nhưng làm như vậy đòi hỏi bạn phải giải quyết các phần phụ thuộc, đảm bảo rằng bạn có thể cập nhập những phiên bản khác nhau của cơ sở hạ tầng, và tự xử lý lỗi. Nhưng với bản thiết kế thì những vấn đề này được giải quyết gọn gàn.

**Bài tiếp theo:**

[Tạo tài khoản AWS](https://viblo.asia/p/tao-tai-khoan-aws-XL6lAdprZek)

Cảm ơn các bạn đã quan tâm. Nếu các bạn có gì thắc mắc hãy mạnh dạn để lại bình luận bên dưới. Mình sẽ trả lời các bạn trong thời gian sớm nhất.

Nguồn tham khảo: **Amazon Web Services in Action, 2nd Edition (Michael Wittig và Andreas Wittig).**