1. Mô hình thác nước SDLC là gì?

Mô hình thác nước là một ví dụ của mô hình Sequential (Tuần tự). Trong mô hình này, hoạt động phát triển phần mềm được chia thành các giai đoạn khác nhau và từng giai đoạn bao gồm hàng loạt các nhiệm vụ và có các mục tiêu khác nhau.

Mô hình Thác nước là giai đoạn đầu trong quá trình SDLC. Trên thực tế, nó là mô hình đầu tiên được sử dụng rộng rãi trong ngành công nghiệp phần mềm. Nó được chia thành các pha, đầu ra của một pha trở thành đầu vào của pha tiếp theo. Nó là giai đoạn bắt buộc được hoàn thành trước khi bắt đầu giai đoạn tiếp theo. Nói tóm lại, không có sự chồng chéo nào trong mô hình thác nước.

Trong thác nước, sự phát triển của một pha chỉ bắt đầu khi giai đoạn trước hoàn thành. Do tính chất này, mỗi giai đoạn của mô hình thác nước phải được xác định khá chính xác. Các giai đoạn chuyển từ mức cao xuống mức thấp hơn, giống như một thác nước nên mô hình này được đặt tên là mô hình thác nước.

![](https://images.viblo.asia/9d2f35a8-3ccb-441e-aa83-10a7e73fd282.png)

Các hoạt động liên quan đến các giai đoạn khác nhau như sau:

| STT | Giai đoạn | Các hoạt động đã thực hiện | Các tài liệu có thể chuyển |
| -------- | -------- | -------- | -------- |
| 1     | Phân tích yêu cầu  | 1. Nắm được tất cả các yêu cầu. 2. Thảo luận và hướng dẫn để hiểu các yêu cầu. 3. Thực hiện thử nghiệm các yêu cầu để đảm bảo rằng các yêu cầu có thể kiểm chứng được hay không.  | RUD (Yêu cầu hiểu tài liệu)  |
|2 |Thiết kế hệ thống | 1. Theo yêu cầu, tạo ra thiết kế 2. Thảo luận về yêu cầu phần cứng /phần mềm. 3. Tài liệu thiết kế | HLD (Tài liệu thiết kế mức độ cao), LLD (Tài liệu thiết kế mức độ thấp) |
| 3 | Thực hiện | 1. Theo thiết kế tạo ra các chương trình / code 2. Tích hợp code cho giai đoạn tiếp theo. 3. Unit testing | Các chương trình, Unit TCs và kết quả |
|4|Thử nghiệm hệ thống|1. Tích hợp unit tested code và kiểm tra nó để đảm bảo nó hoạt động như mong đợi. 2. Thực hiện tất cả các hoạt động thử nghiệm (Functional and non functional) để đảm bảo hệ thống đáp ứng các yêu cầu. 3. Trong trường hợp bất thường, báo cáo. 4. Theo dõi tiến độ về kiểm tra thông qua các công cụ như số liệu truy xuất nguồn gốc, ALM 5. Báo cáo hoạt động thử nghiệm|Test case, Test report, Report lỗi, Updates|
|5|Triển khai Hệ thống|1. Hãy chắc chắn rằng môi trường đang hoạt động 2. Hãy chắc chắn rằng không có lỗi mở server. 3. Đảm bảo rằng các tiêu chí test được đáp ứng. 4. Triển khai ứng dụng trong môi trường tương ứng. 5. Thực hiện kiểm tra về môi trường sau khi ứng dụng được triển khai để đảm bảo ứng dụng không gặp vấn đề|Hướng dẫn sử dụng Định nghĩa / đặc tả môi trường|
|6|Bảo trì hệ thống|1. Hãy chắc chắn rằng ứng dụng đang chạy và chạy trong môi trường tương ứng. 2. Trong trường hợp người dùng gặp lỗi, chắc chắn giải quyết và khắc phục các vấn đề. 3. Trong trường hợp bất kỳ vấn đề fixed; code cập nhật được triển khai trong môi trường. 4. Ứng dụng luôn được tăng cường để kết hợp nhiều tính năng, cập nhật môi trường với các tính năng mới nhất|Hướng dẫn sử dụng, Danh sách ticket, Danh sách các tính năng mới được triển khai.|

2. Khi nào sử dụng mô hình Thác nước SDLC?

Mô hình Thác nước SDLC được sử dụng khi:

* Yêu cầu ổn định và không thay đổi thường xuyên.
* Một ứng dụng nhỏ.
* Không có yêu cầu mà không hiểu hoặc không rõ ràng.
* Môi trường ổn định
* Các công cụ và công nghệ được sử dụng là ổn định
* Nguồn lực được đào tạo và sẵn sàng.

3. Ưu, nhược điểm của mô hình thác nước?

3.1. Ưu điểm của việc sử dụng mô hình thác nước như sau:

* Đơn giản, dễ hiểu và sử dụng.
* Đối với các dự án nhỏ hơn, mô hình thác nước hoạt động tốt và mang lại kết quả phù hợp.
* Vì các giai đoạn của mô hình thác nước cứng nhắc và chính xác, một pha được thực hiện một lần, nó rất dễ dàng để maintain.
* Các tiêu chí đầu vào và đầu ra được xác định rõ ràng, do đó nó dễ dàng và có hệ thống để tiến hành chất lượng.
* Kết quả được ghi chép tốt.

3.2. Nhược điểm của việc sử dụng mô hình thác nước:

* Không thể chấp nhận thay đổi yêu cầu
* Nó trở nên rất khó khăn để di chuyển trở lại giai đoạn. Ví dụ, nếu ứng dụng đã chuyển sang giai đoạn thử nghiệm và có thay đổi về yêu cầu, gặp khó khăn để quay lại và thay đổi nó.
* Việc giao hàng của sản phẩm cuối cùng là muộn vì không có mẫu thử nghiệm được chứng minh trung gian.
* Đối với các dự án lớn và phức tạp, mô hình này không tốt vì yếu tố rủi ro cao hơn.
* Không thích hợp cho các dự án mà yêu cầu được thay đổi thường xuyên.
* Không làm việc cho các dự án dài và đang diễn ra.
* Kể từ khi thử nghiệm được thực hiện ở giai đoạn sau, nó không cho phép xác định những thách thức và rủi ro trong giai đoạn trước đó nên chiến lược giảm thiểu rủi ro rất khó để chuẩn bị.

4. Kết luận

Trong mô hình thác nước, điều rất quan trọng là đi theo dấu hiệu của các sản phẩm của từng giai đoạn. Tính đến ngày hôm nay hầu hết các dự án đang di chuyển với các mô hình Agile và Prototype, mô hình thác nước vẫn giữ tốt cho các dự án nhỏ hơn. Nếu yêu cầu là đơn giản và testable, mô hình thác nước sẽ mang lại kết quả tốt nhất.

*Nguồn tham khảo:* http://www.softwaretestinghelp.com/what-is-sdlc-waterfall-model/