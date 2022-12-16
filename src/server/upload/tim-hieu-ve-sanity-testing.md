## 1. Sanify Testing là gì?
![](https://images.viblo.asia/e97ef5ec-4231-4a43-a287-41509aa911ee.jpg)
Sanity Testing là một loại kiểm thử phần mềm được thực hiện khi bất kỳ minor bug được fix, hoặc khi có một thay đổi nhỏ trong chức năng. Nó được thực hiện bởi tester để đảm bảo rằng chức năng hoạt động đúng như mong đợi.

Sanity testing hẹp và sâu. Không giống Smoke Testing, Sanity Testing tập trung vào một hoặc hai chức năng trong khi đó Smoke Testing được thực hiện để đảm bảo rằng tất cả các chức năng chính của hệ thống đều hoạt động đúng.

Sau thay đổi hoặc fix bug được thực hiện trong code, bản build là sẵn sàng cho tester. Tester sẽ thực hiện Sanity Testing trên những chức năng thay đổi thay vì thực hiện regression testing để tiết kiệm thời gian.

Nếu bug và chức năng thay đổi không hoạt động đúng như mong đợi, tester sẽ reject bản build. Thất bại này được phát hiện sớm nhờ có thử nghiệm Sanity Testing.

## 2. Một vài điểm về Sanity Testing
* Sanity Testing là một loại kiểm thử mức bề mặt theo phương pháp tiếp cận hẹp và sâu, tập trung chi tiết vào một số tính năng hạn chế
* Trong Sanity Testing, tester verify các câu lệnh, chức năng, và tất cả menu của sản phẩm
* Nó là một tập hợp con của regression testing
* Nó được thực hiện khi không đủ thời gian để test chi tiết
* Sanity testing thường không có kịch bản test
* Sanity testing là kiểm thử tóm tắt hoặc nhanh chóng  để đảm bảo rằng các thay đổi hoạt động đúng như mong đợi và đúng với tài liệu đặc tả
* Sanity testing check minor bug được fix và các chức năng thay đổi hoạt động đúng đồng thời cũng đảm bảo các chức năng liên quan còn nguyên vẹn.

## 3. Ưu điểm và nhược điểm của Sanity testing
### 3.1. Ưu điểm
* Tiết kiệm nhiều thời gian và effort bởi vì Sanity testing tập trung vào một hoặc một vài vùng ảnh hưởng của chức năng
* Không mất effort để chuẩn bị tài liệu của Sanity Testing  vì nó thường không có kịch bản
* Nó giúp xác định các đối tượng thiếu phụ thuộc
* Nó được sử dụng để verify rằng một chức năng nhỏ của ứng dụng vẫn hoạt động đúng sau thay đổi nhỏ.

### 3.2. Nhược điểm
* Sanity testing chỉ focus vào các câu lệnh và các function của phần mềm
* Nó không đi đến mức cấu trúc thiết kế vì vậy rất khó để developers hiểu cách fix những issue được tìm thấy trong sanity testing
* Trong Sanity testing, việc test chỉ được thực hiện cho một vài chức năng hạn chế, vì vậy nếu có vấn đề xảy ra với những chức năng khác thì sẽ khó để phát hiện
* Sanity testing thường không có kịch bản vì vậy việc tham khảo cho tương lai là không có sẵn.

## 4. Sự khác nhau giữa Smoke testing và Sanity testing
![](https://images.viblo.asia/ea3bd666-5e69-44d6-8255-fd9feb4780ce.png)

| Smoke Testing | Sanity Testing |
| -------- | -------- |
| Mục đích chính của Smoke testing là verify sự ổn định của toàn bộ hệ thống     | Mục đích chính của Sanity testing là verify tính hợp lý của hệ thống     |
|Smoke testing được thực thi để đảm bảo các chức năng cơ bản hoạt động đúng như mong đợi     | Sanity testing được thực hiện để verify chức năng mới hoặc bug đã được fixed hoạt động đúng như mong đợi     |
| Smoke testing là tiếp cận rộng và nông     | Sanity testing là tiếp cận hẹp và sâu     |
| Smoke testing thường có kịch bản hoặc tài liệu     | Sanity testing thường không có kịch bản    |
| Smoke testing được thực hiện bởi tester và nó có thể được thực hiện bởi developer     | Sanity testing thường được thực hiện bởi tester     |
| Smoke Testing là một tập hợp con của kiểm thử chấp nhận (Acceptance testing)     | Sanity Testing là một tập hợp con của Kiểm thử hồi quy (Regression testing)     |
| Smoke Testing giống như kiểm tra tổng quát     | Sanity Testing giống như kiểm tra chuyên sâu     |
| Smoke testing được thực hiện sớm hơn     | Sanity testing được thực hiện sau Smoke testing    |

### Tài liệu tham khảo:
http://tryqa.com/what-is-sanity-testing/