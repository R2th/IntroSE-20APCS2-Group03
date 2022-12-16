![](https://images.viblo.asia/d1a428bc-e236-4d4e-b324-81cc7ae2b1c3.png)
Trước đây mình cũng thường nghe nói về các kỹ thuật test như Black Box Test và White Box Test. Nhưng chưa bao giờ tìm hiểu sâu về 2 kỹ thuật này. Hôm nay mình thử tìm hiểu xem những ưu điểm, nhược điểm, đối tượng apply, cách ứng dụng để tạo TCs không bị sót của 2 loại kỹ thuật test trên (Black Box Test và White Box Test) nhé!

# I. Black Box Test là gì 
![](https://images.viblo.asia/b818a81c-4edc-4d6d-b892-eb89bcbd4362.jpg)
* Black Box Test còn được gọi là kiểm tra hành vi, kiểm tra hộp kín, kiểm tra dựa trên thông số kỹ thuật hoặc kiểm tra bằng mắt, là phương pháp Kiểm tra phần mềm phân tích chức năng của phần mềm / ứng dụng mà không biết nhiều về nội bộ cấu trúc / thiết kế của function đang được test và so sánh giá trị đầu vào với giá trị đầu ra.

* Trọng tâm chính Black Box Test  là toàn bộ chức năng của hệ thống. Mỗi phương pháp thử nghiệm đều có những ưu điểm và nhược điểm riêng. Có một số lỗi không thể tìm thấy bằng cách sử dụng Black Box Test. Nên phải kết hợp với White Box Test

* Black Box Test được thực hiện trong suốt quá trình phát triển phần mềm tức là trong các giai đoạn:
    + Unit test
    +  Integration test
    +  System test 
    +  Acceptance test
    +  Regression testing. 
# II. Các loại Black Box Test
## 1. Functional Testing
Loại này liên quan đến các yêu cầu chức năng hoặc thông số kỹ thuật của một application.Các behivaor hoặc function khác nhau của hệ thống sẽ được kiểm tra bằng cách cung cấp input và so sánh với output

### Ví dụ: 
Khi click vào dropdown -> cần verify list dropdown sẽ được sổ xuống, và các giá trị trong list sẽ được hiển thị đầy đủ

Functional Testing bao gồm:
 + Smoke Testing
 + Integration Testing
 + System Testing
 + Regression Testing
 + User Acceptance Testing
## 2. Non-Functional Testing
Ngoài các yêu cầu về chức năng , còn có nhiều phần non-function cũng được yêu cầu test để cải thiện chất lượng và hiệu suất của ứng dụng.

Non- Functional Testing bao gồm:
 + Load Testing
 + Performance Testing
 + Compatibility Testing
 + Stress Testing
# III. Kỹ thuật Black Box Testing:

Để kiểm tra một cách có hệ thống một tập hợp các chức năng, cần thiết kế các trường hợp test. Tester có thể tạo các trường hợp kiểm thử từ tài liệu đặc tả yêu cầu bằng cách sử dụng các kỹ thuật kiểm tra hộp đen sau đây: 

 ## 1.  Equivalence Partitioning:
* Kỹ thuật này còn được gọi là phân vùng lớp tương đương (ECP). Trong kỹ thuật này, các giá trị input được chia thành các nhóm khác nhau dựa trên output.
* Do đó, thay vì sử dụng từng giá trị đầu vào, giờ đây chúng ta có thể sử dụng bất kỳ một giá trị nào từ nhóm / lớp để kiểm tra kết quả.
Bằng cách này, Tester có thể duy trì phạm vi kiểm tra, phát hiện các bug degration và quan trọng nhất là tiết kiệm được thời gian thực hiện test.

### Ví dụ:
![](https://images.viblo.asia/25cbf1ae-cbaf-4260-8a4d-f7984af2d79c.jpg)

Một item của AGE chỉ cho phép các số từ 18 đến 60. -> Tester sẽ phân chia ra làm 3 nhóm như dưới:
Invalid:
+ Nhỏ hơn hoặc bằng 17.
+ Lớn hơn hoặc bằng 61.

Valid: 
Bất cứ giá trị nào nằm trong khoảng 18 đến 60.

Tester đã giảm xuống còn 3 trường hợp cần test dựa trên các lớp được hình thành nhưng vẫn bao gồm tất cả các khả năng. 
## 2. Boundary Value Analysis:
* Kỹ thuật này tập trung vào các giá trị tại các ranh giới 

### Ví dụ: 
![](https://images.viblo.asia/25e149d9-f79a-4920-9942-87773e62c4e0.jpg)

Tester uốn kiểm tra function có giá trị từ 1 đến 100  thì thực hiện confirm các giá trị biên như dưới:
+ Min -1, Min, Min+1, Max-1, Max, Max+1
+ Thay vì test tất cả các giá trị từ 1 đến 100, tester chỉ test các case như trên là 0, 1, 2, 99, 100 và 101.

## 3. Decision Table Testing:
Chúng ta có quan hệ logic như dưới
```
If
{
(Condition = True)
then action1 ;
}
else action2; /*(condition = False)*/
```
Đầu tiên tester cần xác định 2 output là action1 và action2 cho hai điều kiện Đúng và Sai.
Vì vậy, dựa trên các kịch bản có thể xảy ra, các TCs được chuẩn bị để đối ứng với các case cụ thể.

### Ví dụ:
![](https://images.viblo.asia/4754e5c2-7324-49da-876f-5f006a895a9a.jpg)

* Ngân hàng XYZ cung cấp lãi suất cho công dân (là Male và Senior Citizen) là 10% và cho những người còn lại là 9%.
* Trong điều kiện ví dụ này, điều kiện C1, C2 có hai giá trị là đúng và sai.  
*  Bằng cách này, chúng ta có thể rút ra các trường hợp thử nghiệm bằng cách sử dụng Decision Table Testing để đảm bảo TCs không bị bỏ sót.

## 4. State Transition Testing:
* State Transition Testing là một kỹ thuật được sử dụng để kiểm tra các trạng thái khác nhau của hệ thống. Trạng thái của hệ thống thay đổi tùy theo điều kiện hoặc sự kiện. Các sự kiện kích hoạt các trạng thái trở thành script test và tester cần phải verify chúng.
* Một sơ đồ chuyển trạng thái của hệ thống cung cấp một cái nhìn rõ ràng về các thay đổi trạng thái 

### Ví dụ:
![](https://images.viblo.asia/dafd5a32-3ad3-43c6-abb7-c33ba1956cdb.jpg)


## 5) Error Guessing/ Lỗi đoán:

* Đây là một ví dụ cổ điển về thử nghiệm dựa trên kinh nghiệm.Trong kỹ thuật này, tester có thể sử dụng kinh nghiệm của mình về hành vi và chức năng của ứng dụng để đoán các khu vực dễ bị lỗi. Nhiều lỗi có thể được tìm thấy bằng cách đoán lỗi trong đó hầu hết các developer thường mắc lỗi.

* Một số lỗi phổ biến mà các developer thường quên xử lý đó là:
   + Chia cho 0.
   + Xử lý các giá trị null trong các textbox.
   + Chấp nhận nút Gửi mà không có bất kỳ giá trị.
   + Tải lên tập tin mà không cần đính kèm.
   + Tải lên tệp với ít hơn hoặc nhiều hơn kích thước giới hạn.

## 6) Graph-Based Testing Methods/ Phương pháp kiểm tra dựa trên đồ thị
* Mỗi và mọi ứng dụng được xây dựng lên từ một số đối tượng. Tất cả các đối tượng như vậy được xác định và đồ thị được chuẩn bị. 
* Từ biểu đồ đối tượng này, mỗi mối quan hệ đối tượng được xác định và các test case được viết tương ứng để tìm các lỗi.

## 7) Comparison Testing/ Test so sánh
Các phiên bản độc lập khác nhau của cùng một phần mềm được sử dụng để so sánh với nhau để kiểm tra trong phương pháp này.

# IV. Làm thế nào để thực hiện Step-wise?
* Nói chung, khi một quy trình có hệ thống được tuân theo để kiểm tra dự án, ứng dụng thì chất lượng sẽ được duy trì và có ích trong thời gian dài cho các vòng thử nghiệm tiếp theo.
* Bước đầu tiên là tìm hiểu đặc tả Yêu cầu của một ứng dụng. Cần có một tài liệu SRS thích hợp (Đặc tả yêu cầu phần mềm).
* Sử dụng các kỹ thuật kiểm tra hộp đen đã đề cập ở trên như phân tích giá trị Ranh giới, phân vùng tương đương, vv các bộ đầu vào hợp lệ và không hợp lệ được xác định với đầu ra mong muốn và các trường hợp thử nghiệm được thiết kế dựa trên đó.
* Các test case được thiết kế, thực thi để kiểm tra xem chúng pass hay fail bằng cách xác minh kết quả thực tế với kết quả dự kiến.
* Các test case  fail được nêu ra là bug và được gửi đến developer để sửa lỗi.Hơn nữa dựa trên các lỗi được sửa, tester test lại các lỗi để xác minh xem nó có tái phát hay không.

# V. Ưu điểm và nhược điểm
## Ưu điểm:
* Tester không cần phải có một nền tảng kỹ thuật. Điều quan trọng là kiểm tra bằng các hành vi của user và suy nghĩ theo quan điểm của user.
* Kiểm tra có thể được bắt đầu khi quá trình phát triển dự án / ứng dụng được thực hiện. Tester và developer đều làm việc độc lập mà không ảnh hưởng đến tiến độ của nhau.
* Nó hiệu quả hơn cho các ứng dụng lớn và phức tạp.
* Khiếm khuyết và không nhất quán có thể được xác định ở giai đoạn đầu của quá trình test.

## Nhược điểm:
* Không có bất kỳ kiến thức kỹ thuật hoặc lập trình, có thể bỏ qua các điều kiện có thể của kịch bản sẽ được test.
* Trong một thời gian quy định, có khả năng kiểm tra ít hơn và bỏ qua tất cả các input và output đầu ra có thể test.
* Cover hoàn toàn testing là không thể đối với các dự án lớn và phức tạp.

# VI. Sự khác nhau giữa White Box Testing và Black Box Testing
| Black Box Testing | White Box Testing |
| -------- | -------- |
| Đây là kỷ thuật test mà không cần biết về cấu trúc, lập trình bên trong của ứng dụng/hệ thống     | Đây là kỷ thuật test mà cần có kiến thức về cấu trúc, lập trình bên trong của ứng dụng/hệ thống     |
| Đây là kỹ thuật test ở mức cao như test chức năng     | Đây là kiểu test ở mức kỹ thuật thấp như unit test, test tích hợp    |
| Nó tập trung vào chức năng của hệ thống     | Nó tập trung vào lập trình, đoạn code, cú pháp bên trong của chương trình    |
| Black box testing yêu cầu các đầu vào rõ ràng để test     | White Box testing requires yêu cầu thiết kế tài liệu, biểu đồ luồng dữ liều    |
| Black box testing được thực hiện bởi tester     | White box testing is được thiện hiện bởi Developers or testers có kiến thức về lập trình    |
# VII. Kết luận

* Đây là một số điểm cơ bản liên quan đến Black Box Testing và tổng quan về các kỹ thuật và phương pháp của nó.
* Vì không thể kiểm tra mọi thứ với sự tham gia của con người với độ chính xác 100%, nếu các kỹ thuật và phương pháp nêu trên được sử dụng hiệu quả, nó chắc chắn sẽ cải thiện chất lượng của hệ thống.
* Để kết luận, đây là một phương pháp rất hữu ích để xác minh chức năng của hệ thống và xác định hầu hết các lỗi.

# VIII. Reference: 
https://www.softwaretestinghelp.com/black-box-testing/
https://www.softwaretestinghelp.com/guide-to-functional-testing/
https://www.softwaretestinghelp.com/use-case-testing/
https://www.softwaretestinghelp.com/combinational-test-technique/