Xu hướng của auto test hiện nay đang phát triển mạnh mẽ, với mục đích giảm thiểu thời gian thực hiện test hồi quy để đảm chất lượng tốt hơn. Có rất nhiều tool test tự động: Selenium, Appium, Quick Test Professional....Ở bài viết này mình giới thiệu cho các bạn về tool test tự động là: Katalon Studio. Ưu điểm của  Katalon Studio là base trên Selenium và Appium cho phép người dùng có thể kiểm thử cả web và mobile. Bài viết dưới đây mình sẽ hướng dẫn cách cài đặt Katalon Studio trên môi trường Windows và viết một kịch bản test cho chức năng Login
# 1. Cài đặt và cấu hình
## 1.1. Cách cài đặt
Chúng ta có thể download Katalon Studio tại đây: https://www.katalon.com/.

Có 4 phiên bản có thể download: Windows 64, Windows 32, macOS, Linux 64. Tùy vào hệ điều hành của máy bạn cài mà có thể tải đúng phiên bản cho hệ điều hành.
## 1.2. Cấu hình
### * Các yêu cầu hệ thống


|  | Yêu cầu | 
| -------- | -------- | -------- |
|Hệ điều hành    | Windows 7,  Windows 8, Windows 10, macOS 10.11+, Linux (Ubuntu based)    | 
|CPU| Bộ xử lí 1 Ghz hoặc nhanh hơn 32 bit (x86) hoặc 64 bit (x64)
|Bộ nhớ| Tối thiểu 1 GB RAM (32 bit)  hoặc 4 GB RAM (64 bit). Khuyến nghị là 4 GB RAM (32 bit) và 8 GB RAM (64 bit)|
|Ổ cứng| Ít nhất 1 GB dung lượng ổ cứng khả dụng. Cần thêm dung lượng đĩa phụ thuộc vào mã nguồn dự án và các báo cáo thực hiện được tạo.

### * Môi trường được hỗ trợ
**Trình duyệt**


| Trình duyệt Desktop  | Version on Windows | Version on MacOS |Chú ý|
| -------- | -------- | -------- |-------- |
| Internet Explorer   | 9, 10, 11   | N/A    |Cấu hình IE bắt buộc: cấu hình Internet Explorer|
|Microsoft Edge|Hiện hành|N/A |Tham khảo trang này để biết trạng thái hiện tại của Edge WebDriver: https://docs.microsoft.com/en-us/microsoft-edge/webdriver|
|Firefox| 56+|Để sử dụng Firefox 57 với Katalon Studio, vui lòng sử dụng Katalon Studio v5.1 +||
|Google Chrome|58+|||
|Opera| Không hỗ trợ|||
|Safari|5.1+|	9,10,11||

**Mobile**

| Installation | Version on Windows | Version on macOS |Appium|Native App support?|Hybrid App support?(*)|Mobile Browser support?|
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| Android  | 6.x, 7.x     | 6.x, 7.x    |1.6, 1.7, 1.8|YES|NO|YES|
|iOS| Không có sẵn|9, 10, 11|	1.6, 1.7, 1.8|YES|NO|YES|

**Cấu hình Katalon Studio trên trình duyệt Chrome**

Trong bài viết này, mình chỉ hướng dẫn cách cấu hình của Katalon Studio với trình duyệt Chrome (vì Chrome được sử dụng phổ biến hơn các trình duyệt còn lại).

Cần cài đặt tiện ích mở rộng trình ghi tự động Katalon cho Chrome để có chụp các đối tượng trên trình duyệt web (Web Object Spy) và ghi- phát lại (Record & Playback ) là: Katalon Automation Recorder.

Có thể cài Katalon Recorder tại đây: https://chrome.google.com/webstore/detail/katalon-recorder/ljdobmomdgdljniojadhoplhkpialdid. Chỉ cần nhấn thêm vào Chrome là hoàn tất.

#  2 . Viết một kịch bản test với Katalon Studio
## 2.1. Cách chụp đối tượng trên màn hình hay còn gọi là lấy ID của đối tượng.
Mở Katalon Studio: 
![](https://images.viblo.asia/a229c8ca-4d2b-458f-a904-f9723281609d.PNG)

Click vào biểu tượng Spy Web: 
![](https://images.viblo.asia/4c03cc6e-c8fc-46ea-b6bc-398b0098f890.PNG)

Bạn thực hiện thử nghiệm với trang web nào thì nhấp liên kết của trang web đó vào ô URL, như trong hình mình để là web thực hiện build trên local. Sau đó click Start trên trình duyệt Chrome.
Katalon sẽ điều hướng đến trang web mà bạn điền link. Lúc này bạn có thể thực hiện chụp các đối tượng trên màn hình.

Ở bài viết này mình sẽ hướng dẫn cách chụp đối tượng đối với chức năng Login. Chụp các đối tượng bằng cách chỉ con trỏ chuột vào đối tượng đó rồi nhấn tổ hợp phím alt+~.
Hình minh họa như sau: 
![](https://images.viblo.asia/4a4478f4-f554-4815-ab46-75b622fdddae.png)

![](https://images.viblo.asia/91a7c4f9-be50-4c80-8150-a1150432f5cb.PNG)

Sau khi chụp các đối tượng, ID của các đối tượng này sẽ được lưu trong Object Repository, ấn Lưu bằng cách chọn nút Save.

Bây giờ thì có thể viết kịch bản test với chức năng Login rồi.
## 2.2. Viết kịch bản test với Katalon Studio

Katalon Studio hỗ trợ người dùng 2 chế độ để thiết lập kịch bản test: Manual view và Script view 

Sau đây mình sẽ hướng dẫn các bạn tạo kịch bản test ở cả 2 chế độ.

### Manual view 
![](https://images.viblo.asia/d7b8f576-4ea7-4ac1-88ea-535216095ea9.PNG)

Ở chế độ manual view này, các bạn chỉ cần click vào các đối tượng trong mục Object Repository để thực hiện kéo thả các ID vào mục Object
![](https://images.viblo.asia/e633934a-67e1-4394-86f3-db3812e9dbaa.PNG)
Các điều kiện Input, Output tự đặt theo tài khoản đăng nhập, như của mình là đang thực hiện đăng nhập với tài khoản admin.


### Script view 
Ở chế độ này, Katalon Studio cho phép nhập các câu lệnh để thực hiện chạy kịch bản test.

Bước 1:  bạn cần bật trình duyệt với câu lệnh là: openBrowser

Bước 2: thực hiện câu lệnh điều hướng đến trang web nào: navigateToUrl

Bước 3: sau khi điều hướng đến trình duyệt bạn cần đăng nhập, click vào button "Đăng nhập" bằng câu lệnh: click('tên đối tượng')

Màn hình sẽ hiển thị ra các textbox cho phép nhập email và password: ở đây chúng ta sẽ sử dụng câu lệnh setText để gán text cho các đối tượng.

Bước 4: click vào button "Đăng nhập" để thực hiện đăng nhập vào hệ thống. Ở bước này, mình đã dùng câu lệnh: verifyMatch để xem trang sau khi đăng nhập hệ thống có đúng hay không.

Và bây giờ chúng ta chỉ cần click vào RUN để xem kết quả.
![](https://images.viblo.asia/49fdc24b-6aa1-4e97-af04-f6e613218533.PNG)

Với các case Login Không thành công các bạn làm tương tự.

Chúc các bạn thành công!

# 3. Tài liệu tham khảo
https://docs.katalon.com/