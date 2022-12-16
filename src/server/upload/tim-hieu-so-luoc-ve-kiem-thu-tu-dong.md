# **1.Khái niệm kiểm thử tự động**

Kiểm thử tự động là việc sử dụng các công cụ để thực hiện các test case. Kiểm thử tự động cũng có thể nhập dữ liệu thử nghiệm vào hệ thống kiểm thử, so sánh kết quả mong đợi với kết quả thực tế và tạo ra các báo cáo kiểm thử chi tiết.

# **2.Sự khác nhau giữa kiểm thử tự động và kiểm thử thủ công**

Khi một chức năng thay đổi về giao diện hay tính năng, hoặc khi kiểm thử hồi quy thì Tester phải test lại những case đã từng làm để không để đảm bảo không phát sinh thêm bug mới, dẫn đến mất nhiều thời gian và công sức, và test lặp lại nhiều lần từ đó dễ gây nhàn chán, sót bug.

Khi khái niệm kiểm thử tự động ra đời, Tester chỉ cần viết một đoạn code hoặc sử dụng công cụ hỗ trợ để chạy tự động. Hiện nay có một số công cụ kiểm thử tự động phổ biến như:
-  Selenium
- Katalon sudio
- Quick Test Profressional(HP UFT)
- Rational Function Tester
- Visual Studio CodedUI Testing
- WATIR
- SilkTest

# **3.Ưu nhược điểm của kiểm thử tự động với kiểm thử thủ công**

### *Ưu điểm*

- Đáng tin cậy: do chạy theo quy trình đã định sẵn, nên có thể tránh được các trường hợp nhập dữ liệu sai.
- Có khả năng lặp lại: giúp Tester không phải lặp đi lặp lại các thao tác (nhập dữ liệu, kiểm tra kết quả,...)
- Có thể tái sử dụng: do đã có script để chạy các bước của testcase nên có thể chạy trên nhiều phiên bản khác nhau của ứng dụng, nhiều trình duyệt.
- Chất lượng và hiệu suất tốt hơn: có thể chạy được nhiểu testcase trong thời gian ngắn, chỉ cần 5 phút là có thể chạy xong testcase mà nếu thủ công có thể mất 30 phút.
- Có tính kinh tế cao: giảm thiểu được nguồn nhân lực làm kiểm tra hồi quy.

### *Nhược điểm*

- Nhiều công cụ kiểm thử có chi phí cao: Quick Test Profressional, Tricentis Tosca,....
- Chi phí phát triển và bảo trì cao: một testcae thủ công có thể viết mất một tiếng, nếu chuyển sang tự động thì thời gian có thể là 6 tiếng hoặc nhiều hơn vì vậy chí phí cho kiểm thử tự động cao hơn so với thủ công.
- Đòi hỏi Tester phải có kinh nghiệm technical và kĩ năng lập trình.
- Có nhiều dự án không cần thiết phải chạy tự động: kiểm thử một chức năng quá phức tạp nhưng giá trị mang lại không nhiều, hoặc kiểm tra về UI/UX.

# **4.Những kĩ năng năng cần thiết mà một người kiểm thử tự động cần có**

- Nắm được các loại kiểm thử:Unit/Intergration/System/Sanity/Regression test/... là gì?
- Các phương pháp kiểm thử:  Phân tích giá trị biên/Phân vùng tương đương/Biểu đồ kết quả/Đoán lỗi/... là gì?
- Hiểu được nguyên lý định dạng của page object: nếu làm ứng dụng Web thì cần nẵm rõ cách lấy Xpath hoặc CssSelector của từng phần tử. Bạn có thể tham khảo cách lấy 2 mảng này tại [W3Schools](https://www.w3schools.com/).
- Hiểu được nguyên lý lập trình, và ít nhất thông thạo 1 ngôn ngữ lập trình: java, javascript, python,....
- Sử dụng thành thạo ít nhất 1 framework testing:  Junit/TestNG/NUnit/... Từ đây sẽ giúp bạn rất nhiều trong việc build framework, hỗ trợ trong việc phân nhóm, quản lý testscript, report, prepare data/environment/browsers.
- Có kỹ năng liên quan đến coding: debug, source version control, codeding convention,....
- Ham học hỏi những cái mới trong chuyên môn.

# **5.Kết luận**

Trên đây là nhưng thông tin sơ lược về kiểm thử tự động, mong có thể giúp các bạn có cái nhìn khái quát về kiểm thử tự động cũng như kĩ năng cần thiết để có thể làm kiểm thử tự động.

Tài liệu tham khảo: https://www.guru99.com/automation-testing.html, https://itviec.com/blog/automation-test/