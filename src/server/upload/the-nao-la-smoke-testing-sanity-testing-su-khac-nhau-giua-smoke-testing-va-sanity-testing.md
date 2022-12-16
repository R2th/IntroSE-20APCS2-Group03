## I. Smoke Testing

### 1. Thế nào là Smoke testing

Smoke testing là một loại kiểm thử phần mềm giúp đảm bảo rằng các chức năng chính của ứng dụng hoạt động tốt. Loại thử nghiệm này còn được gọi là "Build Verification testing". Nó là một kiểu thử nghiệm không đầy đủ với các trường hợp kiểm tra rất hạn chế nhằm đảm bảo những tính năng quan trọng hoạt động đúng và sẵn sàng để test chi tiết.

Smoke testing luôn nên được thực hiện đầu tiên với bất kỳ bản build nào.

### 2. Ví dụ về Smoke testing

Smoke testing thường được sử dụng trong Integration testing, System testing và Acceptance testing.

Là 1 QA, tôi luôn luôn chỉ chấp nhận bản build sau khi tôi đã thực hiện smoke test. Vì vậy, hãy hiểu smoke test qua một số ví dụ sau:

**2.1. Acceptance testing:**

Mỗi khi một bản build được release cho QA, smoke test trong acceptance testing cần được thực hiện.

Trong loại test này, việc đầu tiên và quan trọng của smoke test là verify các tính năng dự kiến cơ bản của bản build.

Chúng ta hãy cùng xem xét các ví dụ dưới đây để hiểu hơn về smoke  testing:

- Thực hiện chức năng Login cho phép các tài xế đã đăng ký login thành công
- Thực hiện chức năng dashboard để hiển thị các tuyến đường một tài xế cần thực hiện ngày hôm nay
- Thực hiện tính năng hiển thị các thông báo thích hợp nếu không có tuyến đường nào tồn tại trong một ngày nhất định.

Trong phần xây dựng ở trên, ở mức test acceptance, smoke test nghĩa là xác định ba triển khai cơ bản hoạt động đúng. Nếu một trong số chúng bị lỗi, QA sẽ reject bản build.

**2.2. Integration testing:**

Loại test này thường được thực hiện khi các module riêng biệt đã được thực hiện và test.  Trong mức test tích hợp, loại test này được thực hiện để đảm bảo rằng các chức năng tích hợp cơ bản và cuối cùng đều hoạt động đúng như mong đợi.

Có thể tích hợp 2 module hoặc nhiều module với nhau, do đó sự phức tạp của smoke test là khác nhau tùy thuộc vào từng mức độ tích hợp.

Hãy xem ví dụ để hiểu hơn nhé:

- Thực hiện tích hợp module route và stop
- Thực hiện tích hợp màn hình arrive status update và phản ánh tương tự trên màn hình stop
- Thực hiện tích hợp complete pick up cho đến module tính năng delivery.

Trong bản build này, smoke test không chỉ verify 3 triển khai cơ bản mà còn phải thực hiện cho triển khai thứ ba, cũng như một vài test case cho sự tích hợp hoàn chỉnh. Nó giúp rất nhiều để tìm ra các vấn đề phát sinh trong việc tích hợp và các vấn đề mà  đội phát triển không hề chú ý tới.

**2.3. System testing:**

Trong system level, smoke testing là test các luồng rất quan trọng và sử dụng thường xuyên của hệ thống. Nó chỉ được thực hiện sau khi hệ thống hoàn chỉnh đã sẵn sàng và được test. Và trong sysem testing, smoke test sẽ được thực hiện trước regression testing.

Trước khi thực hiện regression testing, các tính năng end-to-end được test như là một phần của smoke test. Bộ smoke test cho hệ thống hoàn chỉnh bao gồm test case end to end mà người dùng cuối sẽ sử dụng rất thường xuyên.

Nó thường được thực hiện với sự giúp đỡ của công cụ kiểm thử tự  động.

### 3. Vòng đời của Smoke test

Sơ đồ dưới đây giải thích vòng đời của Smoke test. Mỗi khi một bản build được deploy cho QA, vòng đời cơ bản là: Nếu smoke test pass, bản build sẽ được chấp nhận bởi đội QA để test sâu hơn, Nếu smoke test fail, bản build sẽ bị reject cho đến khi các vấn đề report được fix.

![](https://images.viblo.asia/aa67cabe-2d12-408d-bfac-4d4bf2aafbe3.jpg)

### 4.  Ai là người thực hiện Smoke test

![](https://images.viblo.asia/1c179d5c-79b7-47e5-a642-8b9b997bae14.jpg)

Không phải cả team cùng tham gia vào loại thử nghiệm này để tránh lãng phí thời gian của tất cả các QA.

Smoke test được thực  hiện lý tưởng bởi QA lead - người quyết định bản build pass để có thể test sâu hơn hay sẽ reject nó. Hoặc trong trường hợp QA lead vắng mặt, bản thân các QA có thể thực hiện smoke testing.

Đôi lúc, khi một dự án có quy mô lớn, một group QA có thể thực hiện loại test này.  Nhưng điều này không đúng với SCRUM vì SCRUM  là một cấu trúc không có LEAD hoặc Manager và mỗi tester có trách nhiệm riêng với stories của họ. Do dó, cá nhân QA sẽ thực  hiện việc test này cho stories của họ.

### 5. Khi nào sử dụng Smoke test

Smoke test được sử dụng trong các kịch bản dưới đây:

- Nó được thực hiện bởi developers trước khi đưa bản build cho team tester
- Nó được thực hiện bởi tester trước khi họ thực hiện test chi tiết hơn
- Smoke testing được thực hiện để đảm bảo rằng những tính năng cơ bản của ứng dụng hoạt động đúng như mong đợi

### 6. Ưu điểm và nhược điểm của Smoke test

**6.1. Ưu điểm:**

- Dễ dàng thực hiện
- Giảm thiểu rủi ro
- Khuyết tật được phát hiện ở giai đoạn rất sớm
- Tiết kiệm effort, thời gian và tiền bạc
- Chạy nhanh nếu tự động
- Rủi ro và vấn đề tích hợp ít nhất
- Cải thiện chất lượng toàn bộ hệ thống

**6.2. Nhược điểm:**

- Smoke test không thể thay thế cho kiểm thử chi tiết
- Ngay cả sau khi smoke test pass, bạn vẫn có thể tìm thấy showstopper bug
- Loại kiểm thử này phù hợp nhất nếu bạn có thể tự động hóa thời gian dành cho việc test thủ công các test case, đặc biệt là các project lớn có đến 700-800 test case.

## II. Sanity testing

### 1. Định nghĩa:

Sanity testing thường được thực hiện khi bất kỳ minor bug được fix, hoặc khi có một thay đổi nhỏ trong chức năng. Nó là một loại kiểm thử phần mềm được thực hiện bởi tester để đẩm bảo rằng chức năng hoạt động đúng như mong đợi.

Sanity testing hẹp và sâu. Không giống Smoke testing, Sanity testing tập trung vào một hoặc hai chức năng trong khi đó smoke testing được thực hiện để đảm bảo rằng tất cả các chức năng chính của project đều hoạt động đúng.

Sau thay đổi hoặc fix bug được thực hiện trong code, bản build là sẵn sàng cho tester. Tester sẽ thực hiện Sanity testing trên những chức năng tay đổi thay vì thực hiện regression testing để tiết kiệm thời gian.

Nếu bug và chức năng thay đổi không hoạt động đúng như mong đợi, tester sẽ reject bản build. Thất bại này được phát hiện sớm trong Sanity  testing.

### 2.  Một vài điểm về Sanity testing:

- Sanity testing là một loại kiểm tra mức bề mặt theo phương pháp tiếp cận hẹp và sâu, tập trung chi tiết vào một số tính năng hạn chế
- Trong Sanity testing, tester verify các câu lệnh, chức năng, và tất cả menu của sản phẩm
- Nó là một tập hợp con của regression testing
- Nó được thực hiện khi không đủ thời gian để test chi tiết
- Sanity testing thường không có script
- Sanity  testing là tóm tắt hoặc quick test để đảm bảo rằng các thay đổi hoạt động đúng như mong đợi và đúng với tài liệu đặc tả
- Sanity testing check minor bug được fix và các chức năng thay đổi hoạt động đúng đồng thời cũng đảm bảo các chức năng liên quan còn nguyên vẹn.

### 3. Ưu điểm và nhược điểm của Sanity testing

**3.1. Ưu điểm:**

- Tiết kiệm nhiều thời gian và effort bởi vì Sanity testing tập trung vào một hoặc hai chức năng
- Không mất effort đưa nó vào tài liệu bởi vì nó thường không được ghi
- Nó giúp xác định các đối tượng thiếu phụ thuộc
- Nó được sử dụng để verify rằng một chức năng nhỏ của ứng dụng vẫn hoạt động đúng sau thay đổi nhỏ.

**3.2. Nhược điểm:**

- Sanity testing chỉ focus vào các câu lệnh và các function của phần mềm
- Nó không đi đến mức cấu trúc thiết kế vì vậy rát khó để developers hiểu cách fix những issue được tìm thấy trong sanity testing
- Trong Sanity testing, việc test chỉ được thực hiện cho một vài chức năng hạn chế, vì vậy nếu có vấn đề xảy ra với những chức năng khác thì sẽ khó để bắt chúng
- Sanity testing thường không được ghi lại vì vậy việc tham khảo cho tương lai là không có sẵn.

## III. Sự khác nhau giữa Smoke testing và Sanity testing

| Smoke testing | Sanity testing  |
| -------- | -------- | -------- |
| Mục đích chính của Smoke testing là verify  sự ổn định của toàn bộ hệ thống   | Mục đích chính của Sanity testing là verify tính hợp lý của hệ thống      |
| Smoke testing được thực thi để đảm bảo các chức năng cơ bản hoạt động đúng như mong đợi   | Sanity testing được thực hiện để verify chức năng mới hoặc bug fix hoạt động đúng như mong đợi      |
| Smoke testing là tiếp cận rộng và nông   | Sanity testing là tiếp cận hẹp và sâu      |
| Smoke testing thường được ghi lại hoặc tài liệu   | Sanity testing thường không được ghi lại      |
| Smoke testing được thực hiện bởi tester và nó có thể được thực hiện bởi developer   | Sanity testing thường được thực hiện bởi tester     |
| Smoke testing giống như kiểm tra sức khỏe của phần mềm   | Sanity testing giống như kiểm tra sức khỏe chuyên dụng của phần mềm      |
| Smoke testing được thực hiện sớm hơn   | Sanity testing được thực hiện sau Smoke testing      |

Tham khảo:

http://istqbexamcertification.com/what-is-smoke-testing-when-to-use-it-advantages-and-disadvantages-2/

https://www.softwaretestinghelp.com/smoke-testing-and-sanity-testing-difference/

http://istqbexamcertification.com/what-is-sanity-testing/