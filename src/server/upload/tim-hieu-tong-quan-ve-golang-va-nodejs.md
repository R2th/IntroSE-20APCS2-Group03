# 1. Golang
![image.png](https://images.viblo.asia/944895ed-6480-405e-886c-6c6a141c2b89.png)

Golang, còn được gọi là Go, là một ngôn ngữ lập trình **mã nguồn mở**, là một **cross-platform** và **compiled multithreaded programming language** được Google giới thiệu vào năm 2009.

Nó kết hợp các tính năng tốt nhất của các ngôn ngữ lập trình khác. Ví dụ, nó tương tự như C, C ++ về hiệu suất và bảo mật, và nó kết hợp tốc độ của Python. Do đó, Golang có thể được sử dụng để lập trình đồng thời cung cấp các **dynamic interfaces** và **memory safety**.

Hơn nữa, Golang hoạt động với các hệ điều hành phổ biến nhất như Microsoft, Linux, Mac OS , v.v. Ngoài ra, nó là công nghệ tốt nhất cho **cloud interfaces, networking applications và microservices**

## Các điểm nổi bật của Golang
* **Standard library**: Hiệu suất của Golang có thể được chứng minh thông qua **sound library** và các chức năng cài sẵn của các **primitive type**.
* **Speed**: Golang nhanh vì code được biên dịch
* **Garbage collection**: Quản lý bộ nhớ trong Golang trông khá đơn giản. Các **garbage collected object** được phân bổ động khi sử dụng con trỏ.
* **Analysis tools**

![image.png](https://images.viblo.asia/ca372038-f358-4c4d-87a7-530807cf926f.png)

## Các trường hợp sử dụng phổ biến của Golang
* Ứng dụng Cloud-Native
* Triển khai Scalable Database
* Phát triển web
* Stand-alone Tools
* CLI nhanh chóng
* Hỗ trợ DevOps và SRE
* Distributed Networked Services


# 2. Node.js
![image.png](https://images.viblo.asia/8d2f7012-8840-4cdc-b273-b2cd697359d0.png)

Node,js là một **open-source runtime environment** dựa trên công cụ JavaScript V8 của Google Chrome. Nó đã trở thành môi trường phổ biến nhất để xây dựng các ứng dụng đa nền tảng. Hơn nữa, nó hoạt động như một vòng lặp dựa trên **sngle-threaded event-based** để làm cho tất cả các lần thực thi không bị chặn.

Vì Node.js được viết bằng JavaScript nên sẽ dễ dàng hơn trong việc viết script cho cả client-side và server-side bằng cách sử dụng cùng một ngôn ngữ. Node.js được hỗ trợ bởi Windows, Mac, Linux và Unix và có rất nhiều thư viện JavaScript open-source giúp đơn giản hóa quá trình phát triển ứng dụng web.

![image.png](https://images.viblo.asia/169ebccb-185d-40be-ab48-90626da3012e.png)

## Các trường hợp sử dụng phổ biến của Node.js
Node.js được sử dụng rộng rãi cho các dự án sử dụng JavaScript trên frontend và backend của dự án. Dưới đây là một số lĩnh vực mà Node.js được sử dụng:

* Micro-services
* Static file serve
* SPA phức tạp
* Scripting & Automation
* Web Application framework
* Command-line apps
* Ứng dụng Chat thời gian thực
* Những hệ thống nhúng
* Browser games Hardware programming
* Ứng dụng Data Streaming

# 3. So sánh tương quan giữa Golang và NodeJS
## Về hiệu suất
Hiệu suất ảnh hưởng đáng kể đến thời gian load và response của ứng dụng. Do đó, nó ảnh hưởng trực tiếp đến sự hài lòng của khách hàng đối với ứng dụng.

Mục tiêu cốt lõi của Golang là đạt được hiệu suất tốt hơn. So với Node.js, Golang là lựa chọn tốt hơn cho **raw performance và computation** . Nói chung, Golang là một nền tảng nhanh, nhẹ vì nó dựa trên các tính năng của C và C ++.

Trong khi Node.js được cấu tạo mạnh mẽ là một derivative của JavaScript, nó thường chậm hơn các ngôn ngữ lập trình khác. Không giống như Golang, Node.js không thể cung cấp raw performance của các tác vụ liên quan đến CPU hoặc bộ nhớ.

Tóm lại, Node.js có thể hoạt động mạnh mẽ nhưng phụ thuộc bản chất ứng dụng. Golang vượt qua Node.js khi sử dụng mà mục đích để đạt được hiệu suất tối ưu.

## Khả năng mở rộng
Node.js sử dụng cơ chế đơn luồng trong đó các lệnh được thực thi theo một thứ tự cụ thể. Mặc dù điều này nghe có vẻ là một phương pháp hay, nhưng nó lại tạo ra nhiều thách thức hơn khi các ứng dụng lớn được xem xét và yêu cầu thực hiện song song các quy trình khác nhau.

Ngược lại, Golang sử dụng một luồng nhẹ được quản lý bởi Go runtime. Hơn nữa, Golang sử dụng go-routines , có thể chạy nhiều chương trình cùng một lúc. Ngôn ngữ này cung cấp các tùy chọn đồng thời tốt hơn JavaScript và cho phép làm việc với nhiều luồng cùng một lúc mà không cần sử dụng nhiều RAM. Nó có nghĩa là Golang cung cấp kết quả tốt hơn khi so sánh đồng thời trong Nodejs .

## Tính sẵn có
Các giải pháp ready-made tạo điều kiện phát triển và loại bỏ chi phí cho việc phát triển ứng dụng. Golang là một ngôn ngữ tương đối mới và chưa trở nên phổ biến. Nó có các thư viện và các package tốt, nhưng công cụ có sẵn ít hơn hơn Node.js . Ngoài ra, Golang thiếu hỗ trợ giao diện người dùng, trong khi Node.js giúp bạn xây dựng giao diện người dùng hấp dẫn.

Node.js có sẵn một loạt các công cụ, frameworks và libraries cho các lập trình viên để phát triển tất cả các loại ứng dụng.

Một lý do khác để chọn Node.js là sự đa dạng của các công cụ và frameworks. Ngoài ra, nó là một frameworks dựa trên kiến trúc microservices.

Kiến trúc microservices có nghĩa là một ứng dụng được chia thành các mô-đun nhỏ hơn với các giao diện hoạt động được xác định rõ ràng để có thể thêm các thành phần mới vào ứng dụng của mình một cách dễ dàng.

Node.js bao gồm khoảng 800.000 block ready-mades sẵn, có thể được cài đặt và vận hành dễ dàng. Mặc dù các công cụ Node.js vượt xa các công cụ Golang nhưng Golang vẫn có các công cụ mạnh mẽ như Gofmit, Godoc, GoMetaLiner và Go Run.

## Error Handling
Xử lý lỗi trong Golang yêu cầu thực hiện kiểm tra lỗi rõ ràng . Nó xử lý các lỗi compile-time và run-time khác nhau, điều này gây ra nhiều vấn đề khi code. Tuy nhiên, nhà phát triển Golang đã bắt đầu nghiên cứu các chức năng xử lý lỗi khác có thể giúp giảm thời gian phát triển .

Trong khi đó, Node.js thực hiện cơ chế xử lý lỗi là throw-catch đã khá phổ biến. Với cách tiếp cận thông thường này, các lỗi sẽ được show và fix trước khi thực hiện bất kỳ thao tác nào khác.

## Hỗ trợ cộng đồng
JavaScript là một ngôn ngữ lập trình mã nguồn mở có một cộng đồng rộng lớn trên khắp thế giới. Node.js có các tổ chức lớn như Joyent, Microsoft, Paypal, Groupon, npm, SAP đứng sau hỗ trợ và phát triển.

Golang thì là một ngôn ngữ còn tương đối mới nhưng cũng có một cộng đồng đông đảo và đam mê hứa hẹn một sự bùng nổ trong tương lai


**Cảm ơn các bạn đã theo dõi đến đây ^^! Xin chào và hẹn gặp lại**

Link tham khảo: https://javascript.plainenglish.io/golang-vs-node-js-who-trumps-the-battle-of-backend-frameworks-e5fc31faa3b5