Bài viết tham khảo từ nguồn:
https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#demonstrations
# 1. Giới thiệu về Robot Framework
## 1.1. Robot Framework là gì?

Robot Framework là test framework có thể mở rộng để dùng cho giai đoạn acceptance testing (AT) và giai đoạn acceptance test driven development (ATDD) và có thể dùng để kiểm thử tự động.
Robot Framework có thể được sử dụng trong các môi trường phân tán, không đồng nhất, nơi yêu cầu sử dụng các công nghệ và giao diện khác nhau. Robot Framework là phần mềm mã nguồn mở . Điểm mạnh của RobotFramework chính là được viết trên nền tảng Python và được hỗ trợ bởi số lượng thư viện dành cho tester, Robot Framework rất dễ sử dụng cũng như viết test script và có thể chạy được trên mọi nền tảng khác nhau mà không cần chỉnh sửa test script. Sử dụng RebotFramework bạn cũng cần phải biết một chút về code.

## 1.2. Tại sao chúng ta lại chọn Robot Framework?

- Cho phép cú pháp dạng bảng dễ sử dụng để tạo các trường hợp thử nghiệm một cách thống nhất.
- Cung cấp khả năng tạo các từ khóa cấp cao hơn có thể sử dụng lại từ các từ khóa hiện tại.
- Cung cấp nhật ký và báo cáo kết quả dễ đọc ở định dạng HTML.
- Nền tảng và ứng dụng độc lập.
- Cung cấp một API thư viện đơn giản để tạo các thư viện thử nghiệm tùy chỉnh có thể được triển khai nguyên bản bằng Python hoặc Java.
- Cung cấp giao diện dòng lệnh và các tệp đầu ra dựa trên XML để tích hợp vào cơ sở hạ tầng xây dựng hiện có (hệ thống tích hợp liên tục).
- Cung cấp hỗ trợ cho Selenium để kiểm tra web, kiểm tra Java GUI, các quy trình đang chạy, Telnet, SSH, v.v.
- Hỗ trợ tạo các trường hợp thử nghiệm theo hướng dữ liệu.
- Có hỗ trợ tích hợp cho các biến, thực tế đặc biệt để thử nghiệm trong các môi trường khác nhau.
- Cung cấp tính năng gắn thẻ để phân loại và chọn các trường hợp thử nghiệm sẽ được thực thi.
- Cho phép tích hợp dễ dàng với kiểm soát nguồn: bộ thử nghiệm chỉ là các tệp và thư mục có thể được tạo phiên bản với mã sản xuất.
- Cung cấp thiết lập và chia nhỏ cấp độ test-case và test-suite.
- Kiến trúc mô-đun hỗ trợ tạo các bài test ngay cả đối với các ứng dụng có nhiều giao diện đa dạng.

## 1.3. Kiến trúc cao cấp 

Robot Framework là theo một khuân mẫu chung, ứng dụng và công nghệ độc lập. Nó có một kiến trúc mô-đun cao cấp được minh họa trong sơ đồ bên dưới:
![](https://images.viblo.asia/fae10b0e-6ece-478d-ac16-440329925f25.png)

Data test ở dạng bảng đơn giản, dễ chỉnh sửa. Khi Robot Framework được khởi động, nó sẽ xử lý dữ liệu, thực thi các trường hợp thử nghiệm và tạo nhật ký và báo cáo. Khung cốt lõi không biết bất cứ điều gì về mục tiêu đang được test và việc tương tác với nó được xử lý bởi các thư viện. Các thư viện có thể sử dụng trực tiếp giao diện ứng dụng hoặc sử dụng các công cụ kiểm tra cấp thấp hơn làm trình điều khiển.

# 1.2. Hướng dẫn cài đặt

## 1.2.1. Điều kiện phần mềm cài đặt tiên quyết

- Cài đặt Python
- Cài đặt PIP
- Cấu hình PATH (Add Python và PIP đến PATH)
- Sử dụng PIP để cài đặt Robot Framework
- Sử dụng PIP để cài đặt SeleniumLibrary
- Cài đặt Pycharm IDE và Intellbot plugin
- Download Selenium Browserdeivers cho trình duyệt

## 1.2.2. Cài đặt Python

Bên dưới đây tôi sẽ hướng dẫn cài đặt Python trên Win.

### Bước 1:
Kiểm tra xem trong máy tính của bạn đã cài đặt Python hay chưa?
- Bạn hãy nhấp vào biểu tượng kính lúp/vòng tròn cạnh biểu tượng Windown, hoặc nhấn ⊞ Win+S. Nếu tìm thấy kết quả Python thì chứng tỏ là máy của bạn đã sẵn sàng cài đặt Python rồi đó.

![](https://images.viblo.asia/c41f583c-10f1-4fac-b817-d271642c6960.png)

### Bước 2: Gỡ cài đặt và cài lại

![](https://images.viblo.asia/99a20947-ac37-4f22-8fb7-cc76b8863616.png)
![](https://images.viblo.asia/524edff8-b6fc-4c1f-bc96-da5db73f49a4.png)

### Bước 3: Cài đặt lại


Để bắt đầu chúng ta hãy vào đây để download về và cài đặt nhé:

https://www.python.org/
Download
![](https://images.viblo.asia/06f3b42c-2b20-462a-a181-67dda8a43304.png)

Bắt đầu cài đặt
![](https://images.viblo.asia/5b49ca99-ebb0-46d2-919d-ff527e1c9b53.png)


![](https://images.viblo.asia/73a23c28-d3ac-41c9-9c31-723b9a6e63ed.png)

![](https://images.viblo.asia/c2746c38-426e-489f-a4a3-6af6c9511ba0.png)

![](https://images.viblo.asia/dd4202fc-cd29-4a03-a884-236fd0a7f048.png)

![](https://images.viblo.asia/e95e8e0b-cfb8-4d3a-bd76-b4ea9967cd82.png)

Setup đường dẫn

![](https://images.viblo.asia/8716a4ee-408e-4b95-9ec2-c2e9705410ec.png)

![](https://images.viblo.asia/64d03848-9707-4a9f-a8c2-92570607fe5c.png)

![](https://images.viblo.asia/35bace11-3ff9-4c00-b3b3-88b56f62aec1.png)

![](https://images.viblo.asia/e6e8d35e-bb70-4f65-a358-419a83c421a0.png)

![](https://images.viblo.asia/34e05184-5281-4802-ac3c-3b257f6c388b.png)

![](https://images.viblo.asia/abf06f5b-2642-4ed9-ab14-61d6b509a34f.png)


### Bước 4: Kiểm tra xem Python cài đặt xong chưa

![](https://images.viblo.asia/ad960e8c-a9da-4865-98b2-2f9dc0792343.png)

### Bước 5: Kiểm tra xem Python thuộc thư mục nào

Bằng cách gõ một vài câu lệnh dưới đây trên Command:

![](https://images.viblo.asia/6a2e7969-73ae-468a-82eb-e799f181206e.png)


## 1.2.3. Cài đặt PIP

PIP là một trình quản lý thư viện cho Python, viết tắt của từ Preferred Installer Program. Đây là một tiện ích dòng lệnh cho phép bạn cài đặt, cài đặt lại hoặc gỡ cài đặt các gói PyPI bằng một dòng lệnh đơn giản và dễ hiểu: pip.


*a. Kiểm tra Python đã cài đúng chưa*

Để sử dụng PIP, bạn phải chắc chắn rằng Python của mình đã được cài đặt chính xác trên thiết bị của mình. 

Trên Win mở Command Prompt  -> và chọn Command Prompt  -> Sau đó gõ:

`python --version`

![](https://images.viblo.asia/fc41003a-1e16-4442-870a-c3a962bcf1a8.png)

*b. Cài đặt PIP*

Bằng cách download từ: https://www.python.org/ 

Và nâng cấp PIP bằng cách gõ câu lệnh sau:

`python -m pip install -U pip`

*c. Kiểm tra PIP đã được cài đặt chưa*

Bằng cách gõ câu lệnh trên Command như hình sau:

![](https://images.viblo.asia/aa1a6d99-a1b8-4fc4-9ea3-0d659e5c1472.png)


### 1.2.4.   Sử dụng PIP để cài đặt Robot Framework

Sử dụng câu lệnh sau:

`pip install robotframework`

![](https://images.viblo.asia/2f459e24-1036-4852-84c8-cdcddc687ba2.png)


Kiểm tra xem robotframework đã được cài đặt đúng chưa bằng câu lệnh:
`pip list`
![](https://images.viblo.asia/db61ba34-5c7c-40e7-8b6b-c6d375643c16.png)

### 1.2.5. Sử dụng PIP để cài đặt SeleniumLibrary

Tại cửa sổ Command promt, dùng lệnh: 

`pip install robotframework-selenium2library`

Sau khi cài đặt thành công sẽ có thông báo như sau:

![](https://images.viblo.asia/214bd03f-ad47-4ec3-b8c5-79d66f3710d8.png)


### 1.2.6. Cài đặt Pycharm IDE và Intellbot plugin

Pycharm IDE là một môi trường phát triển tích hợp để phát triển các ứng dụng một cách hiệu quả nhất, tiết kiệm thời gian và công sức để viết code, mặc dù để viết mã nguồn mở Python chúng ta có thể sử dụng trình soạn thảo đơn giản nhất như NotePad, nhưng chúng ta hãy dùng Pycharm IDE để có được hiệu quả tối ưu cho autotest cho mình nhé.

Bây giờ chúng ta cùng bắt đầu cài đặt nhé:

Tải Pycharm IDE từ đây:

https://www.jetbrains.com/pycharm/download/#section=windows

![](https://images.viblo.asia/bd446e2d-85ed-41a7-ae14-ecddf3f8612d.png)


Có 2 phiên bản PyCharm:

Bản Professional: Có đầy đủ tất cả các tính năng từ cơ bản đến nâng cao để phát triển Python, nhưng ta phải mua bản quyền. Ta có thể download bản dùng thử.
Bản Community: Là bản chứa các tính năng cơ bản, để có thể phát triển Python. Bản này được tải miễn phí.


Dưới đây mình hướng dẫn cài đặt bản miễn phí:


![](https://images.viblo.asia/83eeb662-8ee3-4b76-8728-cdf57f07c5db.png)

Nếu máy chưa cài đặt Java thì ta tích vào tất cả các tùy chọn trên màn hình này.

![](https://images.viblo.asia/344d477b-c7a0-4879-90f9-20af7b8dc8a8.png)

![](https://images.viblo.asia/b300962c-48a5-4733-b75e-5df3648aac85.png)

Hoàn tất quá trình cài đặt và khởi động lại máy.
![](https://images.viblo.asia/1e7db85a-73e7-4f50-88ea-056c4dcbff17.png)

Kiểm tra bạn đã cài đúng chưa thì ta cần phải thử xem chương trình python của bạn có chạy được với Pycharm vừa cài không?

Trong phần chính sách bảo mật, ta nhấn xác nhận và nhấn Continue để tiếp tục:

![](https://images.viblo.asia/be3211a6-35af-4753-b3d3-f447714cf095.png)

Trong màn hình Tùy biến PyCharm, ta chọn Skip Remaining and Set Defaults để lựa chọn các thiết lập mặc định.

![](https://images.viblo.asia/d3147517-46c7-4510-a87f-152f1dcc1611.png)

Vậy là ta đã cài đặt thành công PyCharm rồi, ta có thể chọn mục Create New Project để tạo một Project mới -> chọn thư mục chứa Project mới được tạo. Sau đó nhấn Create. Sau khi quá trình trên được hoàn tất, Project mới sẽ được tạo ra tại PyCharm

![](https://images.viblo.asia/815eba46-19a7-4ba3-b88e-ac51f93d1047.png)

![](https://images.viblo.asia/22d33a30-f25e-45c6-9465-5926e259c41a.png)

Cài đặt webdrivermanager  bằng lệnh:

`pip install webdrivermanager`

![](https://images.viblo.asia/9ff73541-e0db-450a-86a6-307cd1cfd00d.png)

Và lệnh:

`webdrivermanager firefox chrome --linkpath /usr/local/bin`

![](https://images.viblo.asia/444406da-931a-4671-9afe-855b58178a9b.png)


# KẾT LUẬN:

Vậy là mình đã giới thiệu và hướng dẫn cài đặt các phần mềm cần thiết để có thể bắt đầu những bài học đầu tiên demo trên Robot Framework rồi đấy. Cám ơn các bạn đã đọc!