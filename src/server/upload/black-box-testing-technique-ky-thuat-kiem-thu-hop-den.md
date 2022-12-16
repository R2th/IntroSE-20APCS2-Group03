# Định nghĩa:
Kiểm thử hộp đen còn được gọi là kiểm thử hành vi, hộp mờ, hộp kín, kiểm thử dựa trên đặc điểm kỹ thuật hoặc bằng mắt.

Đây là phương pháp Kiểm thử phần mềm phân tích chức năng của phần mềm / ứng dụng mà không biết nhiều về cấu trúc / thiết kế bên trong của sản phẩm đang được kiểm tra và so sánh giá trị đầu vào với giá trị đầu ra.

Thử nghiệm này xảy ra trong suốt quá trình phát triển phần mềm và Vòng đời kiểm thử phầm mềm, tức là trong các giai đoạn  Unit test (Đơn vị), Integration test (Tích hợp), System test (Hệ thống), Acceptance test (Chấp nhận) và Regression Testing (Kiểm tra hồi quy). 
![](https://images.viblo.asia/d45071b1-ed97-4b3c-9381-b9f3da4bbb70.jpg)
# Các loại kiểm thử hộp đen
Trên thực tế, có một số loại kiểm thử Hộp đen có thể thực hiện được nhưng nếu chúng ta xem xét các biến thể chính của nó thì dưới đây là hai loại cơ bản:
## 1) Kiểm thử chức năng:
Kiểm thử chức năng đến các yêu cầu chức năng hoặc thông số kỹ thuật của một ứng dụng. Ở kiểm thử này, các hành động hoặc chức năng khác nhau của hệ thống đang được kiểm tra bằng cách cung cấp đầu vào và so sánh đầu ra thực tế với đầu ra dự kiến.
*Ví dụ:* 
*Khi kiểm tra 1 danh sách Dropdown, chúng ta click chuột vào nó và xác minh rằng nó sẽ mở rộng và tất cả các giá trị dự kiến sẽ hiển thị trong danh sách.*
Một số loại chính của Kiểm thử chức năng:
* Smoke Testing 
* Sanity Testing
* Integration Testing
* System Testing
* Regression Testing
* User Acceptance Testing
## 2) Kiểm thử phi chức năng:
Ngoài các yêu cầu về chức năng, còn có một số khía cạnh phi chức năng cũng được yêu cầu kiểm tra để cải thiện chất lượng và hiệu suất của sản phẩm.
Một số loại thử nghiệm phi chức năng chính bao gồm:
* Usability Testing
* Load Testing
* Performance Testing
* Compatibility Testing
* Stress Testing
* Scalability Testing
# Các kỹ thuật kiểm thử hộp đen
## Phân vùng tương đương (Equivalence Partition):
Kỹ thuật này còn được gọi là phân vùng  tương đương (ECP). Trong kỹ thuật này, các giá trị đầu vào cho hệ thống hoặc ứng dụng được chia thành các lớp hoặc nhóm khác nhau dựa trên sự giống nhau của kết quả đầu ra.
Do đó, thay vì sử dụng từng giá trị đầu vào, giờ đây chúng ta có thể sử dụng bất kỳ một giá trị nào từ nhóm / lớp tương đương để kiểm tra kết quả. Bằng cách này, chúng ta có thể duy trì phạm vi kiểm tra nhưng lại giảm thiểu khối lượng công việc và quan trọng nhất là thời gian làm việc.
Ví dụ:
![](https://images.viblo.asia/748fd930-e449-4d82-91aa-391f2b46033a.jpg)
Như trong hình trên, một trường văn bản "AGE"  chỉ chấp nhận các số từ 18 đến 60. Sẽ có ba lớp hoặc nhóm phân vùng tương đương.
Hai lớp không hợp lệ sẽ là:
a) Nhỏ hơn hoặc bằng 17.
b) Lớn hơn hoặc bằng 61.
Một lớp hợp lệ sẽ là bất cứ số nào từ 18 đến 60.
Do đó, chúng ta đã giảm các trường hợp thử nghiệm xuống chỉ còn 3 trường hợp dựa trên các lớp được hình thành mà vẫn bao gồm tất cả các khả năng. Vì vậy, thử nghiệm với bất kỳ giá trị nào từ mỗi bộ của lớp là đủ để kiểm tra kịch bản trên.
## Phân tích giá trị biên (Boundary Value Analysis):
Từ chính cái tên, chúng ta có thể hiểu rằng trong kỹ thuật này, chúng ta sẽ tập trung vào các giá trị tại các biên vì người ta thấy rằng nhiều ứng dụng có số lượng lớn các vấn đề xảy ra tại vùng biên. Biên có nghĩa là các giá trị gần giới hạn mà hành vi của hệ thống thay đổi. Trong phân tích giá trị biên cả đầu vào hợp lệ và đầu vào không hợp lệ đều được thử nghiệm để xác minh các vấn đề.
Ví dụ:
![](https://images.viblo.asia/ef8811d5-b4be-4afc-a1f0-b7c9da2b6005.jpg)
Nếu chúng ta muốn kiểm tra một trường trong đó các giá trị từ 1 đến 100 phải được chấp nhận thì chúng tachọn các giá trị biên: 1-1, 1, 1 + 1, 100-1, 100 và 100 + 1. Thay vì sử dụng tất cả các giá trị từ 1 đến 100, chúng ta chỉ sử dụng 0, 1, 2, 99, 100 và 101.
## Bảng quyết định (Decision Table Testing):
Như chính tên gọi cho thấy, bất cứ đâu có mối quan hệ logic như:

*Nếu
{
(Điều kiện = Đúng)
sau đó hành động1;
}
hành động khác2; /  (điều kiện = Sai)  /*

Sau đó, người kiểm tra sẽ xác định hai đầu ra (action1 và action2) cho hai điều kiện (Đúng và Sai). Vì vậy, dựa trên các kịch bản có thể xảy ra, một bảng Quyết định được tạo ra để chuẩn bị một bộ các trường hợp thử nghiệm.
Ví dụ:
Lấy một ví dụ về ngân hàng XYZ cung cấp lãi suất cho Nam công dân cao cấp là 10% và cho những người còn lại là 9%.
![](https://images.viblo.asia/dae4581a-24b7-44f5-8998-d51e76160bc8.jpg)
Trong điều kiện ví dụ này, C1 có hai giá trị là đúng và sai, điều kiện C2 cũng có hai giá trị là đúng và sai. Số lượng tổng số kết hợp có thể sau đó sẽ là bốn. Bằng cách này, chúng ta có thể rút ra các trường hợp thử nghiệm bằng cách sử dụng bảng quyết định.

## Sơ đồ chuyển đổi trạng thái (State Transition Testing)
Sơ đồ chuyển đổi trạng thái là một kỹ thuật được sử dụng để kiểm tra các trạng thái khác nhau của hệ thống. Trạng thái của hệ thống thay đổi tùy theo điều kiện hoặc sự kiện. Các sự kiện kích hoạt các trạng thái trở thành kịch bản và người kiểm tra cần kiểm tra chúng.

Một sơ đồ chuyển trạng thái cung cấp một cái nhìn rõ ràng về các thay đổi trạng thái nhưng chỉ có hiệu quả đối với các ứng dụng đơn giản. Các dự án phức tạp hơn có thể dẫn đến các sơ đồ chuyển đổi trạng thái phức tạp hơn do đó làm cho nó kém hiệu quả hơn.
Ví dụ:
![](https://images.viblo.asia/c1a0b2f3-70d5-4f75-ab26-bd459b056e50.jpg)

## Kỹ thuật đoán lỗi (Error Guessing)
Đây là một ví dụ cổ điển về kiểm thử dựa trên kinh nghiệm.

Trong kỹ thuật này, người kiểm tra có thể sử dụng kinh nghiệm của mình về hành vi và chức năng của ứng dụng để đoán các khu vực dễ bị lỗi. Nhiều lỗi có thể được tìm thấy bằng cách đoán lỗi trong đó hầu hết các nhà phát triển thường mắc lỗi.

Một số lỗi phổ biến mà các nhà phát triển thường quên xử lý:

Chia cho số không.
Xử lý các giá trị null trong các trường văn bản.
Chấp nhận nút Gửi mà không có nhập giá trị.
Tải lên tập tin mà không cần đính kèm.
Tải lên tệp với ít hơn hoặc nhiều hơn kích thước giới hạn.

# Ưu điểm và nhược điểm
## Ưu điểm:

Với kiểm thử hộp đen người kiểm thử không cần phải có nền tảng kỹ thuật. Điều quan trọng là phải coi mình như một người dùng và suy nghĩ theo quan điểm của người dùng.
Kiểm thử có thể được bắt đầu ngay khi quá trình phát triển dự án / ứng dụng được thực hiện. Cả người kiểm thử và nhà phát triển đều làm việc độc lập mà không can thiệp vào không gian của nhau.
Kiểm thử hộp đen có hiệu quả hơn đối với các ứng dụng lớn và phức tạp.
Khiếm khuyết và không nhất quán có thể được xác định ở giai đoạn đầu của thử nghiệm.

## Nhược điểm:

Vì người kiêm thử không có bất kỳ kiến thức kỹ thuật hoặc lập trình nào nên có thể bỏ qua các điều kiện có thể của kịch bản sẽ được kiểm tra.
Khó viết kịch bản kiểm thử do cần xác định tất cả các yếu tố đầu vào, và thiếu cả thời gian cho việc tập hợp này.
Đối với các dự án lớn và phức tạp thì không thể kiểm tra toàn bộ được

# Sự khác biệt giữa kiểm thử hộp trắng và kiểm thử hộp đen

| Kiểm thử hộp trắng | Kiểm thử hộp đen | 
| -------- | -------- | 
|  Người kiểm thử không cần có kiến thức về lập trình hoặc cấu trúc bên trong của ứng dụng    | Người kiểm thử cần có kiến thức về lập trình hoặc cấu trúc bên trong của ứng dụng       | 
| Được thực hiện ở giai đoạn sau của quá trình phát triển như thử nghiệm chức năng (functional testing)   | Được thực hiện ở giai đoạn đầu của quá trình phát triển như thử nghiệm chức năng (Unit Testing, Integration Testing)     | 
|  Tập trung vào chức năng của hệ thống được kiểm thử    | Tập trung vào code- chương trình và cú pháp của code    |
|  Cần có các tài liệu yêu cầu đặc tả  |  Cần có các tài liệu thiết kế với sơ đồ luồng dữ liệu, sơ đồ flowchart, v.v.    | 
|  Được thực hiện bởi tester |  Được thực hiện bởi lập trình viên hoặc tester có kiến thức lập trình   | 

# Kết luận
Trên đây là một số điểm cơ bản liên quan đến kiểm thử hộp đen và tổng quan về các kỹ thuật và phương pháp của nó.

Thực tế là chúng ta không thể kiểm tra mọi thứ thủ công với độ chính xác 100%, nếu các kỹ thuật và phương pháp nêu trên được sử dụng hiệu quả, nó chắc chắn sẽ cải thiện chất lượng của hệ thống. Nhìn chung đây là một phương pháp rất hữu ích để xác minh chức năng của hệ thống và xác định hầu hết các lỗi có trong sản phẩm.

Hy vọng bài viết giúp bạn có được kiến thức chuyên sâu về kỹ thuật Kiểm thử Hộp đen.

Tài liệu tham khảo:
https://www.softwaretestinghelp.com/black-box-testing/