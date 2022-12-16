Trong quá trình  làm việc rất nhiều lần mình phải test đi test lại một kịch bản nhiều lần, vì vậy mình luôn muốn tìm hiểu về một tool testing có thể giúp mình thực hiện điều đó. Trong bài viết này mình sẽ bắt đầu tìm hiều và cài đặt Appium.

## 1. Appium là gì ? 
Appium là một công cụ tự động hóa kiểm thử mã nguồn mở được phát triển và hỗ trợ bởi Sauce Labs để tự động hóa các ứng dụng di động native và hybrid. Nó cơ bản được biết đến như một công cụ tự động hóa đa nền tảng di động. Nó sử dụng giao thức dây JSON nội bộ để tương tác với các ứng dụng  iOS và Android native bằng cách sử dụng Selenium WebDriver.

Có rất nhiều công cụ tự động hóa khác có sẵn trên thị trường để tự động hóa các ứng dụng di động native như MonkeyTalk, KIF, Calabash và Frank nhưng hầu hết các công cụ này yêu cầu một thư viện bổ sung cần được biên dịch bằng mã ứng dụng để công cụ có thể tương tác với ứng dụng di động. Vì vậy, ở đây vấn đề là ứng dụng mà bạn sẽ được kiểm thử  không phải là ứng dụng tương tự mà bạn sẽ được gửi trong App Store vì bạn sẽ cần phải loại bỏ các thư viện tự động hóa trước khi gửi ứng dụng.

Tự động hóa các ứng dụng di động native và hybrid cho Android và iOS là một chức năng chính được quản lý bởi Appium, một máy chủ node.js. Một trong những nguyên lý cốt lõi của Appium là mã kiểm thử có thể được viết bằng bất kỳ  framework hoặc ngôn ngữ nào như Ruby on Rails, C # và Java mà không phải sửa đổi các ứng dụng cho mục đích tự động hóa. Sự tương tác giữa máy chủ node.js và thư viện máy khách Selenium là những gì  làm việc cuối cùng với ứng dụng di động. Appium là mã nguồn mở và có thể chạy liên tục trên nhiều thiết bị và trình giả lập khác nhau nó trở thành một lựa chọn thích hợp cho tự động hóa kiểm thử trên thiết bị di động.

Hiện tại, Appium chỉ hỗ trợ các ứng dụng dựa trên Android và iOS nhưng hỗ trợ cho hệ điều hành di động Firefox đang trong quá trình thực hiện.

## 2. Cấu trúc của Appium

Appium là một máy chủ HTTP được viết bằng node.js, tạo và xử lý nhiều phiên WebDriver cho các nền tảng khác nhau như iOS và Android.

Appium bắt đầu một  “test case” trên thiết bị sinh ra một máy chủ và lắng nghe các lệnh proxy từ máy chủ Appium chính. Nó gần như giống như máy chủ Selenium nhận thức được yêu cầu HTTP từ thư viện máy khách selenium và nó xử lý các yêu cầu đó theo những cách khác nhau tùy thuộc vào nền tảng. Mỗi nhà cung cấp như iOS và Android có một cách khác nhau và cơ chế để chạy một trường hợp kiểm thử trên thiết bị để Appium chạy test case này sau khi nghe lệnh từ máy chủ Appium.

## 3. Hạn chế của Appium

Appium có một vài hạn chế như sau:

* Không hỗ trợ cho Android API level < 17, tức là Android < 4.2
* Chạy script rất chậm trên platform iOS
* Hỗ trợ hành động cử chỉ có giới hạn
* Không hỗ trợ Toast message

## 4. Cách cài đặt Appium với Eclipse trên Window

Để cài Appium với Eclipse trên Window bao gồm 13 bước :

Bước 1: Cài đặt Bộ phát triển Java (JDK)

Bước 2: Thiết lập đường dẫn biến môi trường Java

Bước 3: Cài đặt Android SDK / ADB trên Windows

Bước 4: Cài đặt gói Android SDK

Bước 5: Thiết lập biến môi trường Android

Bước 6: Tải xuống và cài đặt NodeJ

Bước 7: Cài đặt Microsoft .net Framework

Bước 8: Tải xuống và cài đặt ứng dụng khách máy tính để bàn Appium

Bước 9: Bật tùy chọn chế độ nhà phát triển trên điện thoại Android hoặc máy tính bảng

Bước 10: Cài đặt PdaNet để kết nối với thiết bị Android

Bước 11: Cài đặt Eclipse IDE và thiết lập một dự án

Bước 12: Thiết lập dự án Appium trong Eclipse

Bước 13: Kiểm thử Appium đầu tiên để chạy ứng dụng Amazon

### 4.1: Bước 1 - Cài đặt Bộ phát triển Java (JDK)

Trước hết bạn cần phải cài đặt JDK (bộ phát triển Java) trong hệ thống của bạn. Bộ phát triển phần mềm Java (Java SDK hoặc JDK) là một ứng dụng được tạo ra bởi Sun Microsystems để tạo và sửa đổi các chương trình Java. [Nhấp vào đây](http://www.oracle.com/technetwork/java/javase/downloads/index.html) để tải xuống Java và cài đặt Java Development Kit (JDK) trong hệ thống của bạn theo hướng dẫn cài đặt đã cho ở trên hoặc làm theo các bước được đề cập dưới đây

1. Truy cập [ trang tải xuống Java trên trang web của Oracle](http://www.oracle.com/technetwork/java/javase/downloads/index.html) để tìm tải xuống môi trường JDK. Cuộn xuống cho đến khi bạn tìm thấy Java SE Phiên bản mới nhất và tải xuống JDK.


![](https://images.viblo.asia/ae771161-f2fb-4fe0-a1d0-30f76c980c7c.png)

2. Chọn nút radio "**Accept License Agreeme**" và chọn JDK tương ứng với hệ điều hành của bạn (Hệ điều hành -Windows, Mac, Linux, v.v.)

![](https://images.viblo.asia/fb73c0d1-d2ac-41f5-8359-494793c7c99a.png)

3. Hộp thoại tệp tải xuống xuất hiện nhắc bạn **Mở** tệp tải xuống.

![](https://images.viblo.asia/c873d9cf-6c1c-4935-bab2-79eecbe8a897.png)

4. Quá trình cài đặt bắt đầu. Nhấp vào nút **Next** để tiếp tục cài đặt.

![](https://images.viblo.asia/0eebed6d-090e-4efb-b929-6c5e5dd5838f.png)

5. Trên màn hình tiếp theo, bạn sẽ gặp phải một số tùy chọn. Chỉ cần để những thứ này một mình và nhấp vào nút **Next**.

![](https://images.viblo.asia/69f0d2a5-c28b-422c-9ae8-55c45706ff06.png)

6. Sau khi cài đặt ban đầu được thực hiện, một cửa sổ popup hỏi bạn nơi nguồn của bạn tập tin java sẽ được lưu. Bạn có thể chọn thay đổi nơi bạn muốn giữ thư mục của mình nhưng tốt nhất là nên gắn bó với những gì bạn đã cung cấp lúc đầu. Nhấn **Next** để tiếp tục.

![](https://images.viblo.asia/83736c85-a1b3-4406-8663-0029d9b7b8cd.png)

7. Hãy để quá trình cài đặt kết thúc.

![](https://images.viblo.asia/0b7d091d-471f-44cc-bbdb-1172785738fb.png)

8. Một vài hộp thoại ngắn gọn xác nhận các bước cuối cùng của quá trình cài đặt, nhấp vào **Close** trên hộp thoại cuối cùng. Điều này sẽ hoàn tất quá trình cài đặt Java.

![](https://images.viblo.asia/775a84dc-790f-49d7-a245-26ed89129c02.png)

### 4.2. Bước 2 - Thiết lập đường dẫn biến môi trường Java

Các biến môi trường được hệ điều hành sử dụng để lưu cài đặt (giá trị mặc định, vị trí tài nguyên) sẽ được Windows sử dụng hoặc theo quy trình do người dùng khởi chạy.

Có hai loại biến môi trường:

* Biến người dùng: Cụ thể cho tài khoản người dùng Windows cụ thể
* Biến hệ thống: Dành cho tất cả người dùng máy

Hầu hết các biến này thường được xác định và khởi tạo tự động khi  cài đặt hệ thống hoặc các ứng dụng khác như JDK nhưng có những tình huống mà trong đó người dùng phải xác định chúng theo cách thủ công. Bạn cũng có thể kiểm tra  rằng các biến hệ thống cho Java được tự động đặt hay không.

Kiểm tra được thực hiện bằng cách mở command Prompt. Vào Start và gõ cmd trong Run và nhấn Enter. Nó sẽ khởi chạy Command Prompt. Bây giờ hãy nhập ‘javac’:

![](https://images.viblo.asia/c60b92ce-5ca7-45c3-91e0-473c60597b1a.png)

Nếu không có biến hệ thống để chỉ ra nơi để tìm kiếm thực thi này, hệ thống sẽ đưa ra một lỗi như:

```
C:\Users\nguyen.van.tuan>javac
'javac' is not recognized as an internal or external command,
operable program or batch file.
```

Giải pháp cho vấn đề này là Thiết lập đường dẫn biến môi trường Java được đưa ra bằng cách thiết lập các biến hệ thống: JAVA_HOME, PATH và CLASSPATH.

Bây giờ chúng ta sẽ bắt đầu thiết lập biến môi trường Java / đường dẫn trên Windows

Bước 1. Đặt biến JAVA_HOME
1. Mở Control Panel -> System hoặc Security -> System, tương tự có thể được thực hiện bằng cách nhấp chuột phải vào ‘MyComputer’ và chọn Properties.

2. Chọn **Advanced system settings**

![](https://images.viblo.asia/34c39ace-724a-40e1-ba50-31deaacd9d79.png)

3. Trong tab **Advanced** chọn **Environment Variable…**

![](https://images.viblo.asia/4cdd2de9-ec49-4d35-8b35-96fed7288143.png)

4. Chọn **New** trong **System variables**

![](https://images.viblo.asia/fb32e220-dc90-43a5-acc8-3bbdd1c71b74.png)

5. Xác định tên biến là **JAVA_HOME** và giá trị biến là 'C: \ Program Files \ Java \ jdk1-10.0.1' 

![](https://images.viblo.asia/0b54a32d-b9ea-4bd4-8068-64687308db82.png)

Bước 2. Cài đặt biến PATH 

6. Bây giờ chúng ta cần phải xác định vị trí trong biến **PATH**. Đối với PATH, hầu hết có thể nó đã tồn tại trong máy của bạn. Vì vậy, chỉ cần chọn nó và chọn tùy chọn **Edit**.

![](https://images.viblo.asia/364a0e53-db94-4b52-8632-81ed620fac4c.png)

7. Tiếp theo chọn **Edit text**

![](https://images.viblo.asia/fa725695-e2c5-43db-a757-cd857fd31e65.png)

8. Trong trình chỉnh sửa, hãy thêm giá trị C: \ Program Files \ Java \ jdk1-10.0.1\bin

![](https://images.viblo.asia/95c120e1-fe86-41a3-986c-541079836425.png)

9. Bây giờ hãy vào Start và gõ cmd trong Run và nhấn Enter. Nó sẽ khởi chạy Command Prompt. Nhập** 'java -version'**, nó sẽ hiển thị thông tin sau.

![](https://images.viblo.asia/34d8c136-354a-4cb3-8339-9e4b98a74b68.png)

Hoặc nhập **‘javac’**, nó sẽ trả về thông tin Java sau:

![](https://images.viblo.asia/72ba9086-64d5-4289-91d9-3a8bace0d642.png)

Bài tìm hiểu của mình hôm nay dừng lại ở bước 2, bài viết sau mình sẽ cập nhật tiếp.
Nguồn tham khảo :
http://toolsqa.com/mobile-automation/appium/appium-a-cross-platform-mobile-automation-tool/

http://toolsqa.com/mobile-automation/appium/install-the-java-development-kit-jdk/

http://toolsqa.com/mobile-automation/appium/set-up-java-environment-variable-path/