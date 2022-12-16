## Requirement Specification là gì?

![](https://images.viblo.asia/2d6d98a8-2822-461d-b26e-dd49735199ee.jpeg)

Tài liệu Requirement Specification (đặc tả yêu cầu) giúp cho mọi thành viên tham gia dự án có cái nhìn rõ ràng về những gì dự án đang hướng tới.

Nói cách khác, đây có thể coi là một cuốn sổ tay dự án tập trung vào mô tả nội dung, đồ họa, sơ đồ và wireframes.

Thông qua tài liệu đặc tả yêu cầu, chúng ta có thể thu thập mọi thứ liên quan đến dự án ở một nơi duy nhất và giải thích chi tiết ý nghĩa trong từng trường hợp cụ thể.

## Vai trò của Requirement Specification

![](https://images.viblo.asia/9413d659-1e23-438f-97fe-813465192afc.jpeg)

Tài liệu đặc tả yêu cầu giúp chúng ta có thể:
- Giảm thiểu re-work và tối đa hóa năng suất
- Đạt được các mục tiêu kinh doanh tương lai
- Giảm chi phí bảo trì, cải tiến và chi phí support

## Những nội dung cần có trong Requirement Specification

Ở giai đoạn làm Requirement Specification, cần xác định rõ các nội dung sau:
- Chức năng của hệ thống
- Phân vùng chức năng phần cứng / phần mềm (Hardware / Software Functional Partitioning)
- Độ ưu tiên
- Yêu cầu bảo mật (Nội dung cực kỳ quan trọng, tuân theo quy định bảo vệ dữ liệu chung (General Data Protection Regulation))
- Giao diện người dùng (User Interface)

## Các công cụ hữu ích khi tạo Requirement Specification

**Text (nội dung giải thích, mô tả)**

Công cụ khuyên dùng: [Google docs](https://www.google.com/docs/about/)

**Graphics & Diagrams (graphics, diagrams)**

Công cụ khuyên dùng: [Draw io](https://app.diagrams.net/)

**Wireframes (wireframes, prototypes...)**

Công cụ khuyên dùng: [UXPin](https://www.uxpin.com/)

## Cấu trúc Requirement Specification

Thông thường tài liệu đặc tả yêu cầu có cấu trúc cơ bản như sau:
### Mở đầu (Introduction)

**Mục đích (Purpose)**

Xác định rõ sản phẩm mà các thông số kỹ thuật được mô tả trong tài liệu hướng đến.

**Quy mô dự án (Project Scope)**

Trong phần này chúng ta sẽ tập trung trả lời các câu hỏi sau:
- Dự án làm về cái gì?
- Mục tiêu chính của dự án là gì?
- Nhiệm vụ của dự án là gì?

Câu trả lời nên bao gồm lợi ích, mục đích, mục tiêu của dự án. Ngoài ra, nếu có thể nên đối chiếu dự án với các mục tiêu hoặc chiến lược kinh doanh chung của công ty.

**Tham khảo (References)**

Liệt kê bất kỳ tài liệu hoặc địa chỉ Web nào khác mà tài liệu yêu cầu đặc tả này refer đến.

Ở đây có thể bao gồm hướng dẫn về mặt giao diện người dùng, các tiêu chuẩn hay đặc tả yêu cầu hệ thống, tài liệu use case hoặc tài liệu tầm nhìn, quy mô...

Lưu ý nên cung cấp đủ thông tin để người đọc có thể dễ dàng truy cập, bao gồm tiêu đề, tác giả, version, datetime, nguồn hoặc vị trí.

**Bảng chú giải thuật ngữ (Định nghĩa, từ viết tắt, chữ viết tắt)**

Đây là phần rất quan trọng nhưng thường bị đánh giá thấp.

Mỗi dự án sẽ có các thuật ngữ và từ viết tắt đặc trưng mà chỉ những người liên quan đến dự án mới có thể hiểu được.

Và, nếu một thành viên mới tham gia vào dự án cảm thấy khó hiểu, thay vì phải mất công suy luận hay tìm hiểu ý nghĩa, sẽ tốt hơn nhiều nếu có bảng chú giải thuật ngữ giải thích chi tiết ý nghĩa.

### Use Cases

Trong bước này, bạn cần tìm câu trả lời cho các câu hỏi sau:
- Ai sẽ sử dụng nền tảng này? Nhặt ra từng loại người dùng.
- Người dùng đó muốn làm gì trên trang web? Mỗi hành vi mà người dùng thực hiện trên trang web sẽ trở thành một use case.
- Đối với mỗi use case, luồng sự kiện thông thường khi user sử dụng trang web là gì? (Trong phần này cần mô tả chi tiết luồng sự kiện theo dạng: người dùng làm gì - hệ thống sẽ phản hồi lại như thế nào.)
- Khi mô tả luồng sự kiện, có thể xem xét các luồng khác để mở rộng use case.
- Tìm điểm chung giữa các use case, tổng hợp lại và ghi vào phần common.
- Lặp lại các bước trên đối với các loại user còn lại.

Ví dụ một use case thông thường khi người dùng đặt vé máy bay.

![](https://images.viblo.asia/f71d3431-f67e-48a1-aebb-ee17cbca8bce.png)

### Các chức năng của sản phẩm (Product Functions)

Phần này để mô tả các chức năng sẽ có trong hệ thống.

Đây là phần quan trọng nhất, nhưng cũng khó giải thích nhất.

Tất cả các chức năng, ngay cả những chức năng hiển nhiên cũng cần được giải thích trong tài liệu.

Ví dụ:
```
Giỏ hàng (sách)
• Bất kỳ ai cũng có thể thêm một hoặc nhiều sách vào giỏ hàng.
• Giỏ hàng không chứa bản sao của bất kỳ cuốn sách nào.

Thanh toán
• Thanh toán chỉ áp dụng đối với khách hàng đã đăng nhập. Người dùng chưa đăng nhập với tư cách khách hàng sẽ được yêu cầu đăng nhập .
• Khách hàng thành viên có thể nhập mã khuyến mãi.
• Mỗi lần mua hàng chỉ được sử dụng một mã khuyến mãi.
• Khuyến mại là phần trăm giảm giá cố định được áp dụng cho toàn bộ đơn hàng.
• Giảm giá được chỉ định bởi người quản lý tại thời điểm tạo chương trình khuyến mãi hoặc lần cập nhật/chỉnh sửa gần nhất.
```
![](https://images.viblo.asia/4db8ee1a-6505-4817-8a6e-e541d98f4260.jpeg)

---------------------------------------------

**Tài liệu tham khảo**

*https://medium.com/@77tokmakova/what-should-be-included-in-the-requirement-specification-dc94ad38bd96*

*https://www.usability.gov/how-to-and-tools/methods/use-cases.html*