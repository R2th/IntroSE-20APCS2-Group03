## API là gì? 
API là từ viết tắt của Application Programming Interface.
API cho phép kết nối và trao đổi dữ liệu giữa hai hệ thống phần mềm riêng biệt. Một hệ thống phần mềm có thể nhúng các API bao gồm các hàm/functions/sub-routines được thực thi bằng một phần mềm khác. 
![](https://images.viblo.asia/21e4184c-9eda-43a6-b2c3-3f62b35bb7c5.png)
## Kiểm thử API là gì?
Kiểm thử API không giống với kiểm thử GUI và sự khác biệt nằm trong tầng business logic của kiến trúc phần mềm. 
Thay vì sử dụng đầu vào là bàn phím , trong kiểm thử API, bạn sử dụng phần mềm để gọi đến API, nhận đầu ra và xem xét phản hồi của hệ thống. Và để thực hiện kiểm thử APi, những điều mà bạn cần là :
- Tool kiểm thử để điều khiển API
- Viết  câu lệnh để kiểm thử API

Những điều bạn sẽ học được trong bài viết này:

- Thiết lập môi trường kiểm thử API
- Các loại đầu ra của API
- Các trường hợp sử dụng kiểm thử API
- Phương pháp kiểm thử API
- Sự khác biệt giữa  API testing và unit testing
- Kiểm tra những gì trong thử nghiệm API
- Thực tiễn tốt nhất về kiểm tra API

## Thiết lập môi trường kiểm thử API

*  Để kiểm thử API, bạn buộc phải thiết lập môi trường khởi tạo mà gọi API với các tham số yêu cầu và sau đó kiểm tra kết quả trả về.
*  Cơ sở dữ liệu và server nên được cấu hình như yêu cầu của ứng dụng.
*  Sau khi tất cả các thiết lập đã hoàn tất, Các API Function nên được gọi để kiểm tra xem API có hoạt động hay không.

![](https://images.viblo.asia/9436b253-1f1d-463f-8631-da4c9ee15faa.png)

## Các loại đầu ra của API
### 1. Bất kỳ kiểu dữ liệu nào
Ví dụ: Đây là một hàm API cần phải nhập hai số nguyên

```
Long add(int a, int b)
```

Các số được nhập vào như là tham số đầu vào. Đầu ra nên là tổng của hai số nguyên. Đây là đầu ra cần phải kiểm tra với kết quả dự kiến.

Cách gọi cần phải thực hiện là:

```
add (1234, 5656)
```

Ngoại lệ cần phải xử lý nếu số nhập vào vượt quá giới hạn của sô nguyên (integer)

### 2. Trạng thái(Pass hoặc Fail)

Xem xét các hàm API dưới đây:
```
Lock()
Unlock()
Delete()
```
Chúng trả về vất kỳ giá trị như True (trong trường hợp thành công) hoặc False (trong trường hợp lỗi) như là đầu ra.

### 3. Gọi tới một hàm API/Event khác

Trong trường hợp này, chúng ta gọi một hàm API mà sẽ chuyển đến gọi một hàm khác.
Ví dụ - Hàm API đầu tiên có thể sử dụng để xóa một bản ghi chỉ định trong một bảng và hàm này sẽ gọi một hàm khác để REFRESH cơ sở dữ liệu.

### 4. Các test case cho kiểm thử API
Các test case cho kiểm thử API được dựa trên:

* Dữ liệu trả về dựa trên điều kiện đầu vào
* Không trả về gì cả: Khi không có giá trị trả về, hành vi của API trên hệ thống có thể được kiểm tra
* Kích hoạt một vài API/event/interrupt: Nếu đầu ra của một API kích hoạt các event hoặc interrupt, kiểm tra: listeners của event và interrupt 
* Cập nhật cấu trúc dữ liệu
* Chỉnh sửa các tài nguyên(resources) nhất định

### 5. Sự khác nhau giữa API testing và Unit testing

- Unit testing: 
+ Được thực hiện bởi lập trình viên
+ Kiểm thử từng chức năng một 
+ Có thể truy cập vào source code
+ Kiểm tra UI
+ Chỉ kiểm tra các chức năng đơn giản
+ Kiểm thử được thực hiện trước khi build

- API testing:
+ Được thực hiện bởi tester
+ Các chức năng có liên quan tới nhau có thể thực hiện kiểm thử
+ Không cần truy cập vào source code 
+ Không kiểm tra UI
+ Tất cả các chức năng được kiểm thử
+ Thường được chạy sau khi build

![](https://images.viblo.asia/05137fc4-dde8-4da2-a13d-fac4f1d4246c.jpg)

### 6. Những điều cần kiểm tra trong kiểm thử API

Kiểm thử API nên được thực theo các phương pháp kiểm thử như sau:
* Discovery testing: Kiểm tra các API khi truy cập các tài nguyên và xem các API truy cập các tài nguyên, có được các quyền xem, xóa và sửa hợp lệ hay không
* Usability testing: Loại kiểm thử này kiểm tra xem API có nàm đúng chức năng và thân thiện hay không. và API được tích hợp tốt trên các nền tảng khác hay không
* Security testing: Loại kiểm thử này bao gồm các loại xác thực được yêu cầu và xem các dữ liệu nhạy cảm có được mã hóa thông qua HTTP hoặc cả hai hay không
* Automated testing: Kiểm thử API được nâng cao trong việc tạo ra các đoạn mã hoặc công cụ mà có thể chạy API thường xuyên
* Documentation: Đội kiểm thử phải đảm bảo rằng các tài liệu thích hợp và cung cấp đầy đủ các thông tin để tương tác với API. Tài liệu nên là một phần khi bàn giao

![](https://images.viblo.asia/9033b50c-d67e-4270-83f9-6500e66ba0d4.png)

### 7. Các thực tiễn  cho kiểm thử API

* Test case nên được nhóm theo loại kiểm thử
* Trên mỗi test case, nên bao gồm cả phần khai báo các API được gọi
* Các tham số lựa chọn nên được liệt kê dầy đủ trong các test case
* Nên đặt độ ưu tiên cho các API được gọi để dễ dàng test hơn
* Mỗi test các nên được khép kín, độc lập và tránh ít phục thuộc
* Nên tránh kiểm tra xâu chuỗi (test chaining) trong quá trình phát triển
* Đặc biệt chú ý khi thực hiện xử lý các chức năng gọi một lần như xóa, đóng cửa sổ....
* Gọi trình tự nên được thực hiện và lập kế hoạch tốt
* Để đảm bảo hoàn thành các kiểm thử, tạo test case cho tất cả các tổ hợp đàu vào có thể có của API

Bài viết được dịch từ trang: 
https://www.guru99.com/api-testing.html