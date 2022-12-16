## Bạn sẽ học gì trong bài viết này:
* Giới thiệu, định nghĩ về Unit Test
* Lợi ích của việc viết Unit Test
* Tìm hiểu về Test case
* Các thuật ngữ thường dùng trong Unit Test

## Giới thiệu, định nghĩ về Unit Test
Unit Test (Kiểm thử đơn vị) là kỹ thuật kiểm thử những thành phần hoặc đơn vị nhỏ nhất trong code (thường là các hàm hoặc phương thức). Đây là một trong những cấp độ kiểm thử đơn giản và có thể bắt đầu sớm trong vòng đời phát triển phần mềm. Thậm chí, trên thế giới một số công ty hiện đang áp dụng những mô hình phát triển phần mềm cho phép viết Unit Test trước cả khi viết Code.

Với nhiều lập trình viên, bất kể ngôn ngữ lập trình nào, dù mới vào nghề hay đã gạo cội, thì unit test là một trong những kỹ năng không thể thiếu khi làm việc. Nếu bạn chưa từng nghe qua hoặc chưa có điều kiện thực hành thì cùng bước những bước chân đầu tiên qua bài viết này nhé!

## Lợi ích của việc viết Unit Test
* Tăng tính linh hoạt trong quy trình phát triển
* Nâng cao chất lượng code và kiến trúc code
* Phát hiện lỗi sớm trong quy trình phát triển, giảm thiểu chi phí
* Giảm thiểu rủi ro khi có sự thay đổi, thêm mới hoặc tích hợp tính năng

## Tìm hiểu về Test case
**Test case**

là các trường hợp cần kiểm thử với đầu vào và đầu ra được xác định cụ thể. Một test case thường có hai thành phần dưới đây:
* Expected value: Giá trị mà chúng ta mong đợi khối lệnh trả về
* Actual value: Giá trị thực tế mà khối lệnh trả về
Sau khi thực hiện khối lệnh cần kiểm thử, chúng ta sẽ nhận được actual value. Lấy giá trị đó so sánh với expected value. Nếu hai giá trị này trùng khớp nhau thì kết quả của test case là PASS. Ngược lại, kết quả là FAIL.

**Phân loại test case**

* Positive test case: Là những trường hợp kiểm thử đảm bảo người dùng có thể thực hiện được thao tác với dữ liệu hợp lệ.
* Negative test case: Là những trường hợp kiểm thử tìm cách gây lỗi cho ứng dụng bằng cách sử dụng các dữ liệu không hợp lệ.

Hãy làm rõ các loại test case trên qua một ví dụ đơn giản như sau. Giả sử, chúng ta đang thiết kế ứng dụng đặt phòng khách sạn và có một yêu cầu là:
Hệ thống cho phép khách hàng có thể đặt phòng mới với thời gian xác định.Với yêu cầu trên, chúng ta có một số trường hợp cần kiểm thử như sau:

Trường hợp positive là đảm bảo có thể thêm phòng với các dữ liệu hợp lệ như mã phòng cần đặt, thời gian hợp lệ, mã khách hàng hợp lệ, giá tiền được tính với số ngày đặt,…

Còn các trường hợp negative sẽ cố gắng thực hiện thao tác đặt phòng với những dữ liệu không hợp lệ như:
* Đặt phòng mới mà không có mã phòng
* Đặt phòng mới với thời gian không hợp lệ (thời gian ở quá khứ)
* Đặt phòng mới với mã khách hàng không tồn tại trong cơ sở dữ liệu
* Đặt phòng mới với giá tiền âm (nhỏ hơn 0).
* … và nhiều trường hợp khác
Hy vọng qua ví dụ trên, bạn có thể phân loại được các test case và tự xác định được các test case cho yêu cầu phần mềm mà bạn đang thực hiện.

**Cấu trúc một test case**

Các trúc mã mà chúng ta nên tuân thủ trong một test case là cấu trúc AAA. Cấu trúc này gồm 3 thành phần:

* Arrange – Chuẩn bị dữ liệu đầu vào và các điều kiện khác để thực thi test case.
* Act – Thực hiện việc gọi phương thức/hàm với đầu vào đã được chuẩn bị ở Arrange và nhận về kết quả thực tế.
* Assert – So sánh giá trị mong đợi và giá trị thực tế nhận được ở bước Act. 

Kết quả của test case sẽ là một trong hai trạng thái sau:
* PASS: nếu kết quả mong đợi và kết quả thực tế khớp nhau
* FAIL: nếu kết quả mong đợi khác với kết quả thực tế

Đôi khi bạn sẽ bắt gặp một số bài viết dùng từ cấu trúc Given-When-Then. Về bản chất, cũng chính là cấu trúc AAA như trên.

Trong bài tiếp theo, chúng ta sẽ tiếp tục đi tìm hiểu về các framework thường dùng trong Unit Test và đặc biệt là framework XUnit. Ở bài viết này chúng ta đã nắm được tổng quan về Unit Test và các kiến thức về Testcase.