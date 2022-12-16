# Performance Test of Web Application using Apache JMeter
***Apache JMeter*** là một trong những công cụ mã nguồn mở tốt nhất để Test Load và Performance. Nó có thể được sử dụng rộng rãi cho nhiều ứng dụng. Trong bài viết này, mình chia sẻ cách thực hiện Test Load và Performance của ứng dụng web bằng cách sử dụng  JMeter Recording Tests (chế độ GUI) trên Hệ điều hành Windows. Trước tiên, mình sẽ chia sẻ về các tính năng và quy trình cài đặt của Apache JMeter.

## **Các tính năng của Apache JMeter:**
Jmeter có khả năng tải và kiểm tra hiệu năng của nhiều ứng dụng, máy chủ và loại giao thức khác nhau như HTTP, HTTPS, FTP, TCP, Web Services, v.v.
Cho phép ghi lại các kịch bản, xây dựng và debugging.
Có khả năng tương thích với Windows, Linux, Mac OS, v.v.
Rất linh động và 100% Java.

**Tải xuống và chạy Apache JMeter:**

Yêu cầu:

JMeter là một ứng dụng java thuần túy. Nó đòi hỏi hệ thống tương thích với java và phiên bản JVM 7 hoặc cao hơn. Tải xuống và cài đặt Bộ công cụ phát triển Java (JDK 7 trở lên) từ đây.
http://jmeter.apache.org/download_jmeter.cgi

Tải xuống JMeter:

1. Tải xuống phiên bản mới nhất của Apache JMeter x.x từ đây. http://jmeter.apache.org/download_jmeter.cgi
2. Chọn tệp Binaries và tệp zip hoặc tệp tag để tải xuống JMeter

![](https://images.viblo.asia/eb0b400a-8223-4d8d-8ed0-e8357abc3189.png)


**Chạy JMeter:**

***Có ba chế độ để bắt đầu JMeter***

1. **GUI Mode**: Nó có thể được sử dụng để ghi scripts kiểm thử và chạy scripts của chúng tới chính JMeter. Chạy tệp Jmeter.bat cho hệ thống Windows và tệp JMeter cho Linux. Những tệp này có sẵn trong thư mục bin. Sau đó, GUI JMeter sẽ hiện lên.

2. **Command Line Mode (Non-GUI)**: Để kiểm tra tải, hãy sử dụng chế độ này để có kết quả tối ưu.

3. **Server Mode**: Để điều phối kiểm thử, sử dụng chế độ này để chạy JMeter trong Sever trên nút từ xa và điều khiển các máy chủ từ GUI.

## Test Script Recording of Web Applications

***Configure Jmeter:***

**Bước 1**: Sau khi download thành công, bạn không cần chạy tệp nào cả, chỉ cần attach file tải về, mở thư mục bin => Chạy Apache Jmeter

![](https://images.viblo.asia/8590f679-634d-4cd6-bb03-a17541301011.png)

Cửa sổ Apache Jmeter được mở.
**Bước 2**: Chọn Test Plan, right click chọn Thread Group như hình:

![](https://images.viblo.asia/86b1876c-7837-469f-a4a2-20f47c7feb38.png)

Cấu hình mặc định đang hiển thị JMeter cho 1 user, 1 giây, 1 vòng lặp

Number of Threads: Số users truy cập server

Ramp-Up Period: Thời gian Ramp tăng lên
Ví dụ:
100 users, 50 seconds ramp-up - start with 1 user, mỗi giây sẽ thêm 2 user
or
100 users, 100 seconds ramp-up - start with 1 user, mỗi giây sẽ thêm 1 user

Loop count: Thực hiện quy trình "N" lần liên tục và tăng giá trị đếm vòng lặp

**Bước 3:** Click chuột phải  Thread Group: Add => Config Element => HTTP Request Defaults

![](https://images.viblo.asia/057f7ae8-fa18-4223-99de-676d51cac332.png)

Điền tiếp vào 3 options:
Server Name or IP: Là URL của trang web mà bạn phải test
Port Number: Có port 8080 mặc định tại trường này. Hoặc để thay đổi port có thể điền lại.
Protocol: Tại trường này nhập giao thức Http hoặc Https

**Bước 4:** Chuột phải Thread Group và chọn Add => Logic Controller => Recording Controller

![](https://images.viblo.asia/7e1eff54-6d64-4595-b00e-ae355929e023.png)

Chúng ta có thể xem lại các nành động mẫu đã lưu trong khi đang truy cập ứng dụng web.  Mỗi request https đều sẽ được ghi lại.

**Bước 5:** Chuột phải Thread Group và chọn Add => Config Element => HTTP Cookie Manager

Để sử dụng cookies trên ứng dụng web, thêm HTTP Cookie Manager

![](https://images.viblo.asia/db960f19-6890-4225-81f7-844c9b8151d2.png)

**Bước 6**: Tiếp theo, Click chuột phải Test Plan và chọn Add => HTTP Request

![](https://images.viblo.asia/bdc8176d-3182-4e2c-9a41-b175d24f6940.png)

**Bước 7:** Chuột phải “HTTP(S) Test Script Recorder” : Add => Listener => View Results in Tree.

![](https://images.viblo.asia/7a616469-a7fa-4124-a572-703961ce4acf.png)

Chúng ta cần ít nhất 1 Listener để có thể thấy kết quả của JMeter trong khi ghi. Có nhiều Listener trong JMeter. Chúng ta có thể báo cáo chung trong Biểu đồ hoặc bảng.
Thêm Listener bằng cách: Chuột phải Recording Controller => Add => Listener => Graph Results

**Bước 8:** Cuối cùng, click Start. JMeter Proxy Server sẽ bắt đầu thực hiện trên hệ thống của bạn . Khi JMeter thực hiện, Apache JMeter Temporary Root CA. crt sẽ tạo trong thư mục bin. Click OK và tiếp tục.

![](https://images.viblo.asia/935bce25-4f0e-4502-9af2-5cf6a5c95946.png)

![](https://images.viblo.asia/449322c5-6d13-4650-a7d2-6516fbff338a.png)

Chú ý: Bạn cần kiểm tra lại Firewall, bạn có thể cần chạy tệp jmeter.bat từ dòng lệnh để sử dụng các tham số sau (Nếu bạn đang làm việc trong mạng proxy trong văn phòng, hãy sử dụng phương pháp này.)

Chuyển đến thư mục jmeter / bin và nhập vào đây:

jmeter.bat -H <Tên máy chủ hoặc địa chỉ IP> -P <Cổng máy chủ> -N <Máy chủ không phải proxy> -u <Tên người dùng cho proxy - Nếu được yêu cầu> -a <Mật khẩu cho proxy - nếu được yêu cầu>

Ví dụ: jmeter.bat -H my.proxy.server -P 9090 -u tên người dùng -a mật khẩu -N localhost

## Thiết lập lại cấu hình Browser để sử dụng Proxy JMeter

Nếu sử dụng Firefox chúng ta cần thực hiện thiết lập proxy sau trong trình duyệt.

Các bước để cấu hình Mozilla Firefox với JMeter Proxy:

Mở trình duyệt. 
1. Nhấp vào nút Menu Tùy Chọn từ Taskbar của trình duyệt
2. Chọn Other 
3. Nhấp vào tab Advanced 
4. Nhấp vào Setting =>  Connection
5. Chọn Cấu hình Proxy bằng tay.
6. Nhập HTTP Proxy làm localhost hoặc nhập Địa chỉ IP của hệ thống của bạn và sau đó đặt cổng là 8080 (Kiểm tra xem cổng này có miễn phí không. Nếu không thay đổi cổng)
7. Kiểm tra sử dụng máy chủ proxy này cho tất cả các giao thức tùy chọn.
8. Nhấp vào OK
9. Nhấp vào nút OK một lần nữa.

Bây giờ vào lại JMeter bắt đầu test.

***Record the Script:***

Trước khi bắt đầu record, hãy đảm bảo rằng JMeter đã được khởi động trong hệ thống của bạn.

Mở trình duyệt Firefox và nhập URL của ứng dụng của bạn, sau đó nhấn enter.
Làm các hành động bất cứ điều gì bạn muốn kiểm tra trong ứng dụng.
Bây giờ, hãy truy cập JMeter và nhấp vào Record Controller trong Thread Group. Tại đây bạn có thể thấy tập lệnh cho bất kỳ hành động nào bạn đã làm trong trình duyệt.

![](https://images.viblo.asia/665f6588-2143-43f0-bf61-a71b52b44b4f.png)

Khi bạn đã thực hiện xong các hành động trong trình duyệt, hãy nhấp vào nút Stop .

***Run Test:***

Nhấn Ctrl + R (hoặc) Nhấp vào nút Start.

Trong khi chạy tập lệnh, ở góc trên cùng bên phải, một ô vuông màu xanh lá cây sẽ hiển thị. Sau khi hoàn thành, icon sẽ đổi thành Xám.

![](https://images.viblo.asia/33821c9e-ae72-4b8c-82ff-246df3b599ab.png)
![](https://images.viblo.asia/b5c53485-d84c-404e-90c1-51b508fbe2d8.png)

***View Result:***
Click vào từng kết quả

![](https://images.viblo.asia/eb26a0b3-3eb6-4805-9ed1-cd9ef4b44069.png)

Clicks on Add => Listener = > Aggregate Report

![](https://images.viblo.asia/9cb369d4-637b-4373-9a6f-f06b2e9662a1.png)
 
Clicks on Add => Listener = > Summary Report

![](https://images.viblo.asia/b07e00b4-49bd-412f-b6ad-24c26232685c.png)

Trong JMeter, phải lưu các tập lệnh được ghi ở các định dạng khác nhau như JMX, CSV, v.v. Có thể tải các tệp tập lệnh đã ghi lên các công cụ kiểm tra tải trực tuyến của bên thứ ba và nhận được kết quả chi tiết và tối ưu từ đó.

Các tool online để kiểm tra loading:

Blaze meter  -> https://www.blazemeter.com
Redline13  -> https://www.redline13.com


Tài liệu tham khảo : 
https://www.guru99.com/jmeter-performance-testing.html
https://vmokshagroup.com/blog/performance-test-of-web-application-using-apache-jmeter/