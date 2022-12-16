Đối với việc kiểm thử tự động mobile, chúng ta cần có một framework tốt. Các framework của kiểm thử tự động mobile có thể được tách biệt bởi hệ điều hành của thiết bị di động. Có 2 loại framework kiểm thử mobile là Android testing frameworks và iOS testing frameworks. Trên thị trường có khá nhiều framework dành cho 2 hệ điều hành này như là Calabash, Appium, UI Automation,...Và hôm nay chúng ta sẽ tìm hiểu về một trong các framework vừa được nhắc tới, đó là Appium. 
## **1. Giới thiệu về Appium**
![](https://images.viblo.asia/75bdb9e0-840c-4f20-9bf7-586f8d487d6f.png) <br>
Appium là một công cụ mã nguồn mở được sử dụng để kiểm thử tự động (test automation) các native app, mobile web app, và hybrid app trên nền tảng iOS và Android.
Đặc biệt là Appium hỗ trợ “đa nền tảng” (cross-platform) cho phép bạn sử dụng API giống nhau để viết test cho các nền tảng khác nhau (iOS và Android). Điều này khá là tiện lợi khi bạn muốn sử dụng lại các test suites của mình.
Bên cạnh đó, Appium hỗ trợ viết test cho rất nhiều ngôn ngữ, từ Java cho đến Ruby, Python, JavaScript…
## **2. So sánh Appium với một số Testing framework khác**
![](https://images.viblo.asia/86ba97f3-0d43-42f2-89be-2f88a9fe3faa.png)
## **3. Cấu trúc của Appium**
Appium là một máy chủ HTTP được viết bằng node.js tạo ra và xử lý nhiều phiên WebDriver cho các nền tảng khác nhau như iOS và Android.
Appium bắt đầu một "test case" trên thiết bị sinh ra máy chủ và lắng nghe lệnh proxy từ máy chủ Appium chính.
 Nó gần giống như Selenium server, nhận thức các yêu cầu HTTP từ thư viện selenium client và nó xử lý các yêu cầu theo những cách khác nhau tùy thuộc vào nền tảng. Mỗi nhà cung cấp (như IOS và Android) có một cách khác nhau và cơ chế để chạy một test case trên thiết bị để Appium loại hacks vào nó và chạy testcase này sau khi nghe lệnh từ máy chủ Appium.
## **4. Cách hoạt động của Appium trong hệ điều hành Android và iOS**
### 4.1. Trong Android
![](https://images.viblo.asia/88814ccc-9ba2-4b39-a033-05115a255c22.png) <br>
Tương tự trong trường hợp của Android nơi Appium proxies lệnh đến một trường hợp thử nghiệm UIAutomator đang chạy trên thiết bị. UIAutomator là framework tự động hóa giao diện người dùng của Android hỗ trợ chạy các trường hợp thử nghiệm junit trực tiếp vào thiết bị từ dòng lệnh. Nó sử dụng java làm ngôn ngữ lập trình nhưng Appium sẽ làm cho nó chạy từ bất kỳ ngôn ngữ nào do WebDriver hỗ trợ.
Trong sơ đồ trên chúng ta có thể thấy, Bootstrap.jar thay cho bootstrap.js đại diện cho trường hợp kiểm tra khi biên soạn trong java. Ngay sau khi nó được tung ra nó sinh ra một máy chủ TCP. Ở đây, máy chủ TCP nằm bên trong thiết bị và khách hàng đang trong quá trình Appium, điều này ngược lại với cách thức của nó trong iOS.
### 4.2. Trong iOS
![](https://images.viblo.asia/78c85dc9-ef46-408c-8e3c-62c7ce67f01a.png) <br>
Trên iOS, Appium proxies lệnh cho một tập lệnh UIAutomation đang chạy trong môi trường Mac Instruments. Apple cung cấp ứng dụng này được gọi là "dụng cụ" được sử dụng để thực hiện nhiều hoạt động như lập hồ sơ, kiểm soát và xây dựng ứng dụng iOS nhưng nó cũng có một thành phần tự động hóa, ở đó có thể viết một số lệnh trong javascript sử dụng API của UIAutomation để tương tác với giao diện ứng dụng. 
Appium sử dụng các thư viện tương tự để tự động hoá ứng dụng iOS.
Hình trên là kiến trúc của Appium trong ngữ cảnh cho iOS tự động. 
* Selenium webdriver chọn một mẫu lệnh như mã (Element.click) và gửi nó dưới dạng JSon qua yêu cầu http đến máy chủ Appium. 
* Máy chủ Appium biết bối cảnh tự động hóa như iOS và Android và gửi lệnh này đến máy chủ lệnh của thiết bị, chờ đợi ứng dụng trình điều khiển thiết bị (viết bằng node.js) để nhặt nó lên và thực hiện nó trong tệp bootstrap.js trong môi trường cụ iOS. 
* Khi lệnh đã được thực hiện, trình khách lệnh sẽ gửi lại thông báo tới máy chủ Appium, nó sẽ ghi lại mọi thứ liên quan đến lệnh trong bảng điều khiển của nó. 
* Chu kỳ này tiếp tục cho đến thời gian tất cả các lệnh được thực hiện.
## **5. Kết luận**
Đối với nhiều framework khác, có thể Appium không phải là lựa chọn tốt nhất nhưng nó cũng là một framework giúp cho việc kiểm thử tự động mobile nhanh, thuận tiện, đặc biệt nó còn hỗ trợ viết test cho rất nhiều ngôn ngữ. <br>
Hy vọng trong tương lai chúng ta có thể vận dụng nó một cách có hiệu quả nhất. <br>
Cảm ơn các bạn đã đọc! <br>
**Tài liệu tham khảo:** <br>
https://blog.siliconstraits.vn/kiem-thu-tu-dong-voi-appium/ <br>
http://toolsqa.com/mobile-automation/appium/appium-a-cross-platform-mobile-automation-tool/