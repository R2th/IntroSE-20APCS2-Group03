## 1. Kỹ Thuật Kiểm Thử Chuyển đổi Trạng Thái Là Gì?
Kỹ thuật chuyển đổi trạng thái là một kỹ thuật kiểm tra Hộp đen, được sử dụng khi hệ thống được xác định dưới dạng một số trạng thái hữu hạn và quá trình chuyển đổi giữa các trạng thái được điều chỉnh bởi các quy tắc của hệ thống.

Hay nói cách khác, kỹ thuật này được sử dụng khi các tính năng của một hệ thống được biểu diễn dưới dạng các trạng thái chuyển đổi thành một hệ thống khác. Các phép biến đổi được xác định bởi các quy tắc của phần mềm. Hình ảnh đại diện có thể được hiển thị như sau:

![](https://images.viblo.asia/0ec3a70f-4fde-48c9-80d7-f478094dfa19.jpg)
Vì vậy, ở đây chúng ta thấy rằng một thực thể chuyển đổi từ Trạng thái 1 sang Trạng thái 2 do một số điều kiện đầu vào, dẫn đến một sự kiện và kết quả là hành động  và cuối cùng đưa ra đầu ra.

###  Khi nào sử dụng Kiểm thử chuyển đổi trạng thái?
* Khi tester kiểm thử cách xử lý ứng dụng cho một tuần tự các giá trị đầu vào.
* Khi hệ thống được kiểm thử phụ thuộc vào các trạng thái / giá trị đã triển khai trước đó.
* Khi ứng dụng cần được kiểm tra dựa trên một tập giá trị đầu vào hữu hạn.

###  Khi nào không sử dụng Kiểm thử chuyển đổi trạng thái?
* khi kiểm thử không thực hiện cho các kết hợp đầu vào tuần tự
* Nếu thử nghiệm cho các chức năng khác nhau như kiểm thử thăm dò (Exploratory testing)

## 2. Ví dụ
Một ví dụ về nhập mã PIN ở cây ATM. Nếu người dùng nhập mật khẩu không hợp lệ trong lần thử đầu tiên hoặc lần thứ hai, người dùng sẽ được yêu cầu nhập lại mật khẩu, nếu người dùng nhập mật khẩu không đúng lần thứ 3, tài khoản sẽ bị chặn.

![](https://images.viblo.asia/11f35d4e-5c7a-41fb-b7f2-25a7dc140626.png)

Bảng chuyển trạng thái

|  | Insert cart | Vali PIN |Invalid PIN |
| -------- | -------- | -------- |-------- |
| S1 Start state     | S2     |    -  |  -    |
| S2 Wait for PIN    | -     |  S6    |  S3    |
| S3 1st try invalid     |  -    |   S6   |   S4   |
| S4 2nd try invalid    |   -   |   S6   |    S5  |
| S5 3rd try invalid    |   -   |    -  |    S7  |
| S6 Access account   |  -    |  -    |   -   |
| S7 Eat cart    |    S1 (for new card)  | -     |   -   |

khi người dùng nhập mã PIN chính xác, trạng thái được chuyển sang S5: được cấp quyền truy cập. Nếu người dùng nhập sai mã PIN sẽ được chuyển sang trạng thái tiếp theo. Nếu nhập sai mã PIN lần thứ 3 sẽ đạt đến trạng thái bị chặn tài khoản.

## 3. Ưu nhược điểm của Kỹ thuật kiểm thử chuyển đổi trạng thái
### Ưu điểm
* Kỹ thuật kiểm thử này sẽ cung cấp sự diễn tả bằng hình ảnh hoặc dạng bảng cách xử lý của hệ thống, điều này sẽ khiến tester bao quát và hiểu cách xử lý của hệ thống một cách hiệu quả.
* Các trạng thái không hợp lệ của hệ thống dễ dàng được cover
* Bằng cách sử dụng kiểm thử này, tester có thể xác minh rằng tất cả các điều kiện được bao phủ và kết quả được ghi lại

### Nhược điểm
* Nhược điểm chính của kỹ thuật kiểm thử này là chúng ta không thể sử dụng kỹ thuật này trong  hệ thống không theo thứ tự tuần tự, kỹ thuật này không thể được sử dụng.

* Chỉ phù hợp với hệ thống nhỏ, Không phù hợp với hệ thống lớn phức tạp






Nguồn tài liệu : https://www.softwaretestinghelp.com/state-transition-testing-technique-for-testing-complex-applications/
https://blog.haposoft.com/kiem-thu-phan-mem-cac-ky-thuat-thiet-ke-kiem-thu-phan-2/
https://freetuts.net/ky-thuat-kiem-thu-chuyen-doi-trang-thai-1593.html