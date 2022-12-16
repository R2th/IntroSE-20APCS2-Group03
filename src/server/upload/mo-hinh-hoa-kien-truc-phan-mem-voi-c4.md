> Mô hình C4 để trực quan hóa kiến trúc phần mềm
> 
> C4 = Context + Container + Component + Code.
> 
> Website: https://c4model.com


Nội dung bài viết: Tìm hiểu cách mô tả kiến trúc phần mềm một cách sinh động nhất và hữu dụng.


![](https://images.viblo.asia/d67454b3-8aeb-46df-a948-ec2206239fcc.png)


Các khái niệm mới dễ hiểu hơn khi được sử dụng trong các ví dụ thực tế. Bài này chúng tôi sẽ ví dụ trên một ứng dụng bảng công việc hoàn toàn mới, đồng thời, xem cách C4 có thể giúp mô tả và xác định kiến trúc.


Ứng dụng của chúng tôi được gọi là Instant vì nó cho phép người dùng nộp đơn xin việc với một ứng dụng di động đơn giản trong vài giây. Chúng tôi có một số nhóm các nhà phát triển làm việc trong dự án và muốn làm cho kiến trúc của nó trở nên biểu cảm và dễ hiểu đối với tất cả các thành viên công ty nhất có thể.


Instant sẽ được đưa ra thị trường và chúng tôi mong muốn mọi người hiểu cách thức hoạt động để họ có thể giải thích cho khách hàng của chúng tôi. Ứng dụng của chúng tôi đang phát triển nhanh chóng vì vậy chúng tôi cần một thứ gì đó dễ bảo trì và có rào cản thấp để gia nhập.


Thật sự rất khó để mô tả kiến trúc theo cách có thể hiểu được cho tất cả mọi người. Có một số tiêu chuẩn, như UML hoặc ArchiMate, nhưng chúng có những hạn chế, đặc biệt là khi chúng tôi muốn xem xét ứng dụng của chúng tôi từ các quan điểm khác nhau.


Những người không có nền tảng kỹ thuật, hoặc thậm chí lập trình viên mà không được đào tạo trước đó, sẽ không cảm thấy thoải mái khi nhìn vào các sơ đồ đó và giành được các ký hiệu hiểu được.


Ngay cả khi tất cả các sơ đồ được cập nhật và được tạo ra bởi một chuyên gia xuất sắc, trong cuộc sống thực là một trường hợp hiếm.


![](https://images.viblo.asia/47df2c7a-2a03-4574-af72-bb3adf830339.png)



Chúng tôi tìm thấy một sự thay thế đầy hứa hẹn. C4 là một mô hình giúp chúng ta xem xét các ứng dụng từ các quan điểm khác nhau. Chúng ta có thể phóng to và thu nhỏ những phần mà chúng ta quan tâm.


Giống như trên Google Map. Thu phóng càng lớn, càng nhiều chi tiết chúng ta có thể nhìn thấy. Có bốn quan điểm cốt lõi được sử dụng trong C4 (Tôi đoán rằng, nơi mà tên đến từ đó). Mỗi cái đại diện cho một mức thu phóng khác nhau trong phần mềm.


![](https://images.viblo.asia/b62bcc73-1b6b-4ffb-90d6-c665090ee6cf.png)


# Level 1. System Context Diagram

Chúng tôi bắt đầu từ một mức độ trừu tượng rất cao. Ở đây, chi tiết kỹ thuật không quan trọng và chúng tôi tập trung vào các hệ thống và người dùng phần mềm của chúng tôi.
Hệ thống này là một yếu tố của ứng dụng của chúng tôi mang lại giá trị cho người tiêu dùng. Hệ thống này là một giải pháp hoàn chỉnh có thể được sử dụng độc lập.
Những người đang sử dụng phần mềm cũng được bao gồm trong sơ đồ.


Có nhiều cách để tạo sơ đồ C4. Chúng ta có thể sử dụng một công cụ có tên Structurizr, được tạo bởi tác giả của phương pháp luận, cho phép vẽ sơ đồ bằng tay hoặc mã hóa chúng bằng Java, C # hoặc TypeScript.


Đây có thể là một cách tuyệt vời để duy trì và phiên bản sơ đồ kiến trúc trong các kho riêng biệt. Chúng tôi sẽ sử dụng Draw.io và một plugin tùy chỉnh cho phép ký hiệu C4.
Có nhiều cách tiếp cận khác nhau để mô hình hóa một ứng dụng như vậy nhưng chúng tôi muốn tập trung vào việc sử dụng C4, không phải chi tiết công nghệ nên sẽ được đơn giản hóa.


Ứng dụng của chúng tôi được sử dụng bởi các ứng viên đang tìm kiếm một công việc và nhà tuyển dụng. Chúng tôi cần tiến hành thanh toán được thực hiện bởi các nhà tuyển dụng và phát hành hóa đơn với việc sử dụng hệ thống ERP của chúng tôi. Ứng dụng của chúng tôi cũng đang sử dụng một hệ thống gửi thư bên ngoài để thông báo cho người dùng.


![](https://images.viblo.asia/5e31f9e7-d624-453d-9a1e-0ccd402d18cf.png)



Bây giờ chúng tôi có thể dễ dàng xem hệ thống nào chúng tôi đang làm việc và ai là người dùng chính của chúng tôi. Bây giờ hãy tập trung vào các yếu tố chi tiết hơn của hệ thống cốt lõi của chúng tôi.

# Level 2. Container Diagram

Các container là phần của ứng dụng có khả năng được triển khai 1 cách độc lập. Nó có thể là: cơ sở dữ liệu, dịch vụ vi mô, ứng dụng di động, Docker container.
Chúng giao tiếp với nhau bằng các API (ví dụ: SOAP, gRPC, REST) và không phụ thuộc trực tiếp. Ở cấp độ này, chúng tôi cũng quan tâm đến các giao thức mà mỗi container sử dụng để giao tiếp và công nghệ mà nó sử dụng.


![](https://images.viblo.asia/a2c35f02-096e-44b7-95dd-d6b96413dbf5.png)


# Level 3. Component Diagram

Một thành phần là một tập hợp các lớp hoặc các hàm làm việc cùng nhau. Chúng tôi có thể quan sát mối quan hệ của họ và phân tách chức năng.


Sự trừu tượng hóa ở mức độ thấp như vậy chủ yếu là quan trọng đối với các lập trình viên và kiến trúc sư để hiểu các sắc thái và sự phụ thuộc lẫn nhau của các thành phần. Ở cấp độ này, chúng tôi đang nhận được nhiều kỹ thuật hơn về các giải pháp được sử dụng và phương tiện liên lạc giữa mỗi thành phần.


Dịch vụ API của chúng tôi là một khối nguyên khối module PHP, được triển khai với khung MVC. Trong một kịch bản như vậy, một thành phần có thể là một module đơn hoặc một tập hợp các lớp gắn kết.


![](https://images.viblo.asia/2fe3920b-150a-4f73-9f52-0290f325d79f.png)


# Level 4. Code

Code là quan điểm cấp thấp nhất. Code có thể là một lớp hoặc một hàm trong code. Một viễn cảnh như vậy có thể chỉ thú vị cho phần kỹ thuật của một công ty.


Không cần thiết phải đưa nó vào một mô hình nhưng, đôi khi, có thể hữu ích. Cấu trúc như vậy rất mong manh và thay đổi rất nhiều theo thời gian. UML là công cụ phổ biến nhất để mô tả các mối quan hệ ở cấp độ này và sẽ rất phù hợp nếu chúng ta muốn làm điều đó.


Vì chúng tôi đang chạy một startup và liên tục sửa đổi cơ sở mã của chúng tôi, chúng tôi sẽ không mô hình hóa ứng dụng của chúng tôi ở cấp độ này. Nếu cần, các sơ đồ cấp thấp như vậy cũng có thể được tạo tự động với việc sử dụng một số công cụ bên ngoài hoặc IDE.

# Phần kết luận

C4 là một khung khá linh hoạt có thể được sử dụng khác nhau tùy theo nhu cầu của chúng tôi. Nó có rất nhiều lợi thế nhưng cũng có một số nhược điểm.

# Ưu điểm của C4

* Không khó để duy trì (dễ dàng hơn hầu hết các giải pháp).
* Trình bày quan điểm từ các quan điểm khác nhau.
* Có thể hữu ích ở cấp độ tổ chức (không chỉ cho nhân viên kỹ thuật).
* Loại bỏ các ký hiệu mơ hồ.
* Một số phần có thể được tạo tự động.

# Hạn chế của C4

* Trực quan tĩnh. Chúng tôi không biết khi nào và tần suất mỗi mối quan hệ xảy ra.
* Trừu tượng cấp thấp rất mong manh và cần được cập nhật thường xuyên.



Tham khảo:
* [medium.com](https://medium.com/better-programming/modeling-software-architecture-with-c4-243eb1f240c7)
* https://c4model.com