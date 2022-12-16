Sau đây là những câu hỏi và câu trả lời phỏng vấn về kiểm thử ứng dụng di động thường được hỏi cho người mới và người kiểm thử có kinh nghiệm. 

**1.Giải thích sự khác biệt giữa kiểm thử WEB và kiểm thử WAP?**
* Kiếm thử WAP: Kiểm thử WAP (Wireless Application Protocol) được sử dụng trong các ứng dụng mạng
* Kiểm thử WEB: Nó liên quan chủ yếu đến việc kiểm tra các ứng dụng web như trang web và cổng thông tin 

**2.Liệt kê một số công cụ kiểm thử di động tự động?**

Đối với kiểm thử di động, có hai loại công cụ tự động để kiểm tra ứng dụng di động.
* Các công cụ kiểm thử di động dựa trên đối tượng: Jama solution, Ranorex,...
* Các công cụ kiểm thử di động dựa trên hình ảnh: RoutinBot, Egg Plant, Sikuli

**3.Giải thích sự khác biệt giữa giả lập và giả lập?**

* Simulator: Đây là một thiết bị mô phỏng mạng điện tử hoặc thiết bị trạm gốc cho điện thoại di động CDMA / CMA. Nó giúp chốt các mạng gia đình mà không cần dịch vụ chuyển vùng và có thể tạo thoại; Cuộc gọi dữ liệu, SMS,...
* Emulator: Đây là phần mềm để kiểm tra ứng dụng di động mà không cần thiết bị cầm tay trực tiếp

**4.Liệt kê các loại kiểm thử trên ứng dụng di động?**

Các loại kiểm thử trên ứng dụng di động bao gồm: 
* Kiểm tra khả năng sử dụng (Usability Testing)
* Kiểm tra tương thích (Compatibility Testing)
* Kiểm tra giao diện (Interface testing)
* Kiểm tra dịch vụ (Services testing)
* Kiểm tra tài nguyên cấp thấp (Low-level resource testing)
* Kiểm tra năng suất (Performance Testing)
* Kiểm tra hoạt động (Operational testing)
* Kiểm tra cài đặt (Installation tests)
* Kiểm tra bảo mật (Security Testing)

**5.Đề cập đến chiến lược thử nghiệm Android là gì?**

Chiến lược thử nghiệm Android tiêu chuẩn bao gồm thử nghiệm sau:

* Kiểm thử đơn vị
* Kiểm thử tích hợp
* Kiểm thử hoạt động
* Kiểm thử hệ thống

**6.Giải thích khung thử nghiệm Android?**

Khung thử nghiệm Android bao gồm ba giai đoạn:

* Gói ứng dụng: Đây là ứng dụng mục tiêu cần phải được kiểm tra
* Thiết bị đo đạc TestRunner: Đó là một test case chạy trường hợp thử nghiệm trên ứng dụng đích. Nó bao gồm một công cụ SDK để xây dựng thử nghiệm và một công cụ cung cấp API để viết chương trình điều khiển thiết bị Android, ví dụ: MonkeyRunner
* Gói kiểm tra: Nó bao gồm hai lớp, lớp trường hợp thử nghiệm và các đối tượng Mock . Các lớp trường hợp thử nghiệm bao gồm các phương thức thử nghiệm để thực hiện trên ứng dụng đích, trong khi đối tượng giả bao gồm dữ liệu giả sẽ được sử dụng làm đầu vào mẫu cho các trường hợp thử nghiệm.

**7.Liệt kê các thực tiễn tốt nhất để kiểm tra Android?**

* Nhà phát triển nên chuẩn bị các trường hợp thử nghiệm cùng một lúc khi họ đang viết mã
* Cùng với mã nguồn, tất cả các trường hợp kiểm tra nên được lưu trữ
* Sử dụng tích hợp liên tục và thực hiện kiểm tra mỗi khi thay đổi mã
* Tránh sử dụng các thiết bị và trình giả lập đã root

**8.Đề cập đến các lỗi phổ biến được tìm thấy trong khi thử nghiệm di động là gì?**

* Quan trọng: Hệ thống điện thoại của bạn gặp sự cố khi kiểm tra tính năng cụ thể trong thiết bị của bạn
* Chặn: Không thể làm bất cứ điều gì mặc dù điện thoại đang bật trừ khi bạn khởi động lại thiết bị của mình
* Major: Không thể thực hiện chức năng của một tính năng cụ thể
* Lỗi nhỏ: Theo các lỗi nhỏ thường là lỗi GUI.

**9.Giải thích khung thử nghiệm Robo-điện là gì?**

Thử nghiệm được thực hiện trên Khung thử nghiệm Android cho trình giả lập hoặc thiết bị là khó khăn. Chạy và xây dựng trường hợp thử nghiệm đôi khi mất rất nhiều nỗ lực phát triển. Khung Robo-điện cho phép bạn chạy thử nghiệm Android trực tiếp trên JVM mà không cần thiết bị hoặc trình giả lập.

**10. Giải thích cách thử nghiệm A / B cho ứng dụng ios?**

Thử nghiệm A / B cho ios bao gồm ba bước:

* Định cấu hình kiểm tra: Nó chuẩn bị hai phiên bản cho ứng dụng iOS (A & B) của bạn và số liệu kiểm tra
* Kiểm tra: Kiểm tra đồng thời hai phiên bản iOS trên thiết bị
* Phân tích: Nó chọn và đo phiên bản tốt hơn để phát hành

**11.Trong khi thực hiện kiểm tra từ đầu đến cuối di động, các tiêu chí chính là gì, bạn phải xem xét?**

* Cài đặt
* Khởi chạy ứng dụng mà không cần có mạng
* Gỡ cài đặt ứng dụng
* Định hướng của ứng dụng nếu nó hỗ trợ
* Kiểm tra hiệu năng ứng dụng trên một loại thiết bị và kịch bản mạng khác nhau
* Kiểm tra phản ứng của ứng dụng như thế nào

**12.Liệt kê các tính năng mà công cụ khỉ cung cấp?**

Công cụ khỉ cung cấp các tính năng như:
* Tùy chọn cấu hình cơ bản
* Hạn chế hoạt động
* Các loại sự kiện và tần suất
* Tùy chọn gỡ lỗi

**13.Đề cập đến các tiêu chí lựa chọn cho Công cụ tự động hóa thử nghiệm để kiểm tra di động là gì?**

Đối với thử nghiệm di động, công cụ tự động hóa thử nghiệm phải có các tiêu chí sau

* Hỗ trợ đa nền tảng: Đảm bảo rằng công cụ hỗ trợ nền tảng mục tiêu hiện tại và tương lai của bạn
* Khả năng sử dụng tập lệnh: Các công cụ dựa trên đối tượng cung cấp mức độ cao về khả năng sử dụng tập lệnh
* Yêu cầu bẻ khóa: Nếu công cụ sử dụng các thiết bị đã root, nó có thể không hỗ trợ phiên bản HĐH mới nhất và có thể không tương thích với các chính sách MDM
* Thay đổi mã nguồn : Không thể luôn luôn chia sẻ mã nguồn
Thời gian chờ cho phiên bản HĐH mới: Công cụ có thể hỗ trợ phiên bản HĐH iOS / android / khác mới trong bao lâu

**14.Khi nào nên chọn thử nghiệm tự động hóa và khi nào thử nghiệm thủ công?**

*Kiểm tra bằng tay*

* Nếu ứng dụng có chức năng mới
* Nếu ứng dụng yêu cầu thử nghiệm một hoặc hai lần

*Kiểm tra tự động*

* Nếu các bài kiểm tra hồi quy được lặp lại
* Ứng dụng thử nghiệm cho các kịch bản phức tạp

**15.Liệt kê các vấn đề phổ biến nhất mà người kiểm tra gặp phải khi thực hiện kiểm tra di động trong điện toán đám mây?**

Những thách thức mà người kiểm tra phải đối mặt trong khi thực hiện kiểm tra di động là

* Mô hình đăng ký
* Chi phí cao
* Khóa lại
* Sự cố kết nối Internet
* Tự động hóa dựa trên hình ảnh và tốn thời gian
* Tự động hóa không thể được sử dụng bên ngoài khuôn khổ

**16.Giải thích kiểm tra bảo mật di động bao gồm những gì?**

Kiểm tra bảo mật di động bao gồm

* Kiểm tra hỗ trợ nhiều người dùng mà không can thiệp vào dữ liệu giữa họ
* Kiểm tra quyền truy cập vào các tệp được lưu trữ trong ứng dụng bởi bất kỳ người dùng ngoài ý muốn
* Phương pháp giải mã hoặc mã hóa được sử dụng để liên lạc dữ liệu nhạy cảm
* Phát hiện các khu vực nhạy cảm trong ứng dụng được thử nghiệm để chúng không nhận được bất kỳ nội dung độc hại nào

**17.Liệt kê thử nghiệm ứng dụng di động?**

* Kiểm tra trong tất cả các trình duyệt web
* Trình duyệt rất đáng kể trên các thiết bị
* Có thể hỗ trợ xHTML, HTML, WML, AJAX
* Khó khăn trong việc điểm chuẩn hiệu suất do thị trường bị phân mảnh cao
* Trình giả lập không nắm bắt được tất cả các thuộc tính hoặc đặc tính của thiết bị
* Việc thực hiện các đặc điểm kỹ thuật có thể không nhất quán giữa các nhà cung cấp và thiết bị
* Trong một số trường hợp, bộ chuyển mã có thể không tôn trọng các yếu tố trải nghiệm người dùng

**18.Giải thích kiểm tra cổng là gì?**

Thử nghiệm này được thực hiện để kiểm tra cùng chức năng trên các thiết bị khác nhau với các nền tảng khác nhau. Nó được phân thành hai loại

* Kiểm tra thiết bị
* Kiểm tra nền tảng

**19.Liệt kê một số công cụ kiểm tra iPhone và iPad?**

* Trình kiểm tra iPhone: Kiểm tra giao diện web của bạn trong khung có kích thước i-phone
* Appium: Đây là một công cụ tự động hóa thử nghiệm được sử dụng với ứng dụng ios gốc và lai
* iPad Peek: Kiểm tra ứng dụng web của bạn bằng giao diện iPad
* Test Studio: Nó cho phép bạn ghi lại, xây dựng và chạy các bài kiểm tra tự động cho các ứng dụng iPad và iPhone của bạn.

**20.Giải thích cách bạn có thể cài đặt thẻ SD trong trình giả lập?**

Để cài đặt thẻ SD trong trình giả lập, bạn phải sử dụng lệnh

**MKsdcrdTHERI mySDCard 1024M mySdCardFile.img**

### Nguồn tham khảo:
Dịch từ: https://www.guru99.com/mobile-testing-interview-questions.html