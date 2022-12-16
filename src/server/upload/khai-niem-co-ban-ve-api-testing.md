Gần đây mình có tìm hiểu về API Testing và phải làm việc với các hệ thống API khá nhiều, nên mình sẽ chia sẻ về những điều mình đã học được về chúng.

# GIỚI THIỆU
API (Application Programming Interface) là viết tắt của Giao diện lập trình ứng dụng. API hoạt động như một giao diện giữa hai ứng dụng phần mềm và cho phép hai ứng dụng phần mềm giao tiếp với nhau. API là một tập hợp các chức năng phần mềm có thể được thực thi bởi một chương trình phần mềm khác.

API testing là một hình thức test dựa vào các API (Application Programming Interface) bao gồm kiểm tra trực tiếp các giao diện lập trình ứng dụng và là một phần của kiểm thử tích hợp để xác định xem chúng có đáp ứng mong đợi về chức năng, độ tin cậy, hiệu suất và bảo mật hay không.

# API TESTING KHÁC GÌ VỚI UI TESTING
![](https://images.viblo.asia/f268fec2-ad39-429f-ab37-4c96bbfc5c5c.png)

### UNIT TESTING:
* Tiến hành ở presentation layer
* Được thực hiện bởi team Dev
* Là hình thức của White box testing
* Cần có source code để tiến hành
* Phạm vi bị giới hạn, vậy nên chỉ test được các chức năng cơ bản

### API TESTING:
* Tiến hành ở business layer
* Được thực hiện bởi team QA
* Là một hình thức Black box testing
* Không liên quan hoặc cần rất ít source code
* Phạm vi test rộng, bao quát được nhiều vấn đề

# THẾ MẠNH CỦA API TESTING
* API testing có hiệu quả về thời gian khi so sánh với GUI testing, nó yêu cầu ít code hơn nhưng lại có thể cung cấp phạm vi kiểm tra nhanh hơn và tốt hơn.
* API testing giúp giảm thiểu thời gian, công số của quá trình test. Với nó, chúng ta có thể tìm thấy các bug nhỏ trước khi GUI testing diễn ra. Những lỗi nhỏ này sẽ trở nên lớn hơn trong quá trình GUI testin. Vì vậy, việc tìm ra các lỗi đó trong Kiểm tra API sẽ mang lại hiệu quả về mặt thời gian cho dự án.
* Rất hữu dụng khi test các chức năng mang tính nền tảng và quan trọng vì nó không cần giao diện người dùng (UI) để thực hiện, khác với GUI testing - khi mà chúng ta cần phải đợi khi ứng dụng đã cơ bản hoàn thành để thực hiện test, như vậy sẽ khiến quá trình test trở nên bị động
* Giúp giảm thiểu rủi ro vì quá trình được thực hiện từ business layer

# NHỮNG COMMON CASE TRONG API TESTING
* Để verify giá trị trả về dựa trên điều kiện đầu vào hay không. Phản hồi của các API phải được xác minh dựa trên request.
* Để verify xem hệ thống có xác thực kết quả hay không khi API cập nhật bất kỳ cấu trúc dữ liệu nào.
* Xác minh xem một API có kích hoạt một event hoặc một API nào khác hay không.
* Kiểm tra trạng thái của API khi không có dữ liệu trả về
## Các thành phần sẽ được verify khi thực hiện API TESTING
* Dữ liệu trả về có chính xác không
*  Mã HTTP status codes
* Thời gian phản hồi
* Mã lỗi trong trường hợp API trả về lỗi
* Những thành phần khác như hiệu suất, bảo mật,....

# CÔNG CỤ
### Một số công cụ phục vụ cho API Testing có thể kể đến như:
* Postman
* Katalon Studio
* SoapUI
* Assertible
* Tricentis Tosca
* Apigee
* JMeter
* Rest-Assured
* ......

Về công cụ, chủ yếu mình dùng Postman vì giao diện thân thiện và chức năng sinh Document cho API và publish nhanh, những cái kia mình chưa thử nên chưa có sự so sánh :grinning: Nếu bạn nào có gợi ý cho mình hãy để lại gợi ý bên dưới nhé để mình thử.
Cảm ơn các bạn đã đọc!