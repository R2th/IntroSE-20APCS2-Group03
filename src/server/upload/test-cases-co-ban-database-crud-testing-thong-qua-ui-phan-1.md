*Phần 1: Tìm hiểu về CRUB*

**Hoạt động CRUD là gì và cách thực hiện kiểm thử CRUD thông qua giao diện người dùng**

Con người bắt đầu lưu trữ thông tin từ nhiều thập kỷ trước đây! 

Và trong những ngày đó, cơ sở dữ liệu tệp phẳng *(Flat file databases)* được sử dụng trong lịch sử máy tính, nơi tất cả dữ liệu được lưu trữ trong một tệp

Sau đó, vào đầu những năm 1970, IBM đã phát triển mô hình cơ sở dữ liệu quan hệ *(Relational Database Model)* đầu tiên, giới thiệu “các chỉ mục” để dễ dàng lấy dữ liệu

## Tổng quan về hoạt động CRUD

Hiện tại, hệ thống lưu trữ dữ liệu phổ biến nhất là cơ sở dữ liệu nơi **C**reate (tạo), **R**ead (đọc), **U**pdate (cập nhật) và **D**elete (xóa) dữ liệu phần mềm thông qua truy vấn

Phần mềm máy tính có thể đáp ứng các yêu cầu của người dùng một cách nhanh hơn và hiệu quả thông qua cơ sở dữ liệu và truy vấn được thiết kế phù hợp

Điều này ngụ ý rằng việc kiểm tra và xác minh cơ sở dữ liệu là một yếu tố quan trọng

![](https://images.viblo.asia/949795c0-daec-4eb2-adf9-eb5c56e05e9a.jpg)

Các phản ứng giao diện người dùng đồ họa (GUI) như thông báo lỗi, thông điệp thành công, vv... được coi là rất quan trọng bởi hầu hết các nhà quản lý kiểm thử *(test manager)*

Điều này là do, GUI là phần hiển thị của ứng dụng mà người dùng có thể thấy dễ dàng
 
Tuy nhiên, kiểm tra cơ sở dữ liệu cũng quan trọng không kém

*Theo kinh nghiệm của tác giả, đã thấy nhiều người kiểm thử thủ công (manual testers) coi đây là một công việc tẻ nhạt, nhưng điều đó thực ra không phải như vậy*

*Trong hướng dẫn này, chúng ta sẽ thảo luận về kiểm thử chức năng cơ sở dữ liệu hộp đen thông qua giao diện người dùng và các truy vấn MySQL một cách đơn giản với các ví dụ dễ dàng*

## Tại sao kiểm thử cơ sở dữ liệu quan trọng?

Các điểm được đưa ra dưới đây sẽ giải thích tầm quan trọng của việc kiểm thử cơ sở dữ liệu theo một cách ngắn gọn:

* Dữ liệu là một tài sản quan trọng và nó cần được lưu và bảo vệ

* Cơ sở dữ liệu đang trở nên phức tạp với các nền tảng và công nghệ mới. Vì vậy, cơ hội của các lỗi tăng lên

* Có thể có các chức năng quan trọng liên quan đến các giá trị được lưu trữ trong cơ sở dữ liệu

* Các sự cố trong cơ sở dữ liệu hoặc truy vấn có thể dẫn đến các vấn đề về chức năng chính

* Để đảm bảo dữ liệu được ánh xạ chính xác hay không

* Kiểm tra cơ sở dữ liệu có thể được thực hiện như một bài kiểm tra đơn vị, kiểm tra hộp đen , kiểm tra hộp trắng và văn bản hộp xám

## 4 chức năng cơ sở dữ liệu cơ bản

Phần mềm dựa trên cơ sở dữ liệu thường có bốn chức năng chính sẽ thể hiện rõ ràng từ các ví dụ bên dưới:

**Ví dụ 1:**

Facebook, trang web mạng xã hội nổi tiếng nhất hiện nay
![](https://images.viblo.asia/940b03b2-fcf6-4c92-b932-f6ef24c6dce3.png)

* Bạn có thể tạo tài khoản mới

* Xem chi tiết tài khoản của bạn

* Chỉnh sửa chi tiết tài khoản

* Xóa tài khoản

* Bạn có thể tạo bình luận

* Xem chúng

* Chỉnh sửa chúng

* Xóa chúng

**Ví dụ 2:** 

LinkedIn, trang web tìm kiếm việc làm nổi tiếng:
![](https://images.viblo.asia/f5d2a75d-0294-4a59-ab93-a153d2faae27.jpg)

* Bạn có thể tạo hồ sơ của mình

* Xem nó

* Chỉnh sửa nó

* Xóa đi

* Bạn có thể thêm bài đăng

* Xem chúng

* Chỉnh sửa chúng

* Xóa chúng

***Bạn có nhận thấy một tập hợp các hoạt động phổ biến ở đây không?***

Hầu hết các phần mềm hỗ trợ các chức năng của việc tạo *(creating)*, xem *(viewing)*, chỉnh sửa *(editing)* và xóa *(deleting)* đều gói gọn trong CRUD

## Định nghĩa của CRUD

Trong lập trình máy tính, CRUD là viết tắt của Tạo *(**C**reate)*, Đọc *(**R**ead)*, Cập nhật *(**U**pdate)* và Xóa *(**D**elete)*

Đây là bốn chức năng chính và cơ bản của lưu trữ liên tục, chúng thường được thực hiện trong các ứng dụng phần mềm thông qua các biểu mẫu *(form)*

* Tạo *(**C**reate)* - INSERT một mục trong cơ sở dữ liệu

* Đọc *(**R**ead)* hoặc Truy xuất *(Retrieve)* - CHỌN mục nhập từ cơ sở dữ liệu và xem nó

* Cập nhật *(**U**pdate)* - CẬP NHẬT mục nhập hoàn toàn hoặc một phần

* Xóa *(**D**elete)* hoặc hủy *(Destroy)* - DROP / DELETE mục nhập

Dựa trên yêu cầu phần mềm, chu kỳ CRUD có thể thay đổi

*Ví dụ:* 

*Đôi khi, nhân viên bán hàng tạo tài khoản và người dùng xem tài khoản. Người dùng có thể không có đặc quyền để chỉnh sửa hoặc xóa nó*

*Mặt khác, yêu cầu có thể là: người dùng tạo tài khoản của mình và nhân viên bán hàng xác minh và phê duyệt nó*

*Những chu kỳ này rất quan trọng từ quan điểm của người kiểm thử*

Đối với các chức năng được thảo luận ở trên, có một truy vấn tương ứng đang chạy trong cơ sở dữ liệu

Ví dụ về truy vấn MYSQL cho mỗi hành động:

| Hoạt động | Truy vấn mẫu |
| -------- | -------- |
| CREATE     | INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);     |
| READ     | SELECT * from table;     |
| UPDATE     | UPDATE table_name SET column1 = value11, column2 = value22 WHERE condition;     |
| DELETE     | DELETE FROM TABLE table_name where column1 = ‘value11’;    |

Ba biến thể của CRUD là BREAD (Browse, Read, Edit, Add, Delete), DAVE (Delete, Add, View, Edit) và CRAP (Create, Replicate, Append, Process)

*Phần 2: còn tiếp ...*

*CRUD Testing*

*Làm thế nào để kiểm thử chức năng CRUD của một phần mềm?*

*Nguồn tham khảo: https://www.softwaretestinghelp.com/crud-testing/*