# 1. Tổng quan về TestNG
TestNG là 1 công cụ kiểm thử tự động được viết bằng Java, có chức năng quản lý việc tạo test case, thứ tự chạy test case và report sau khi test.

TestNG được xây dựng từ cảm hứng của 2 Framework là JUnit (Java) và NUnit (C#). NG là viết tắt của từ Next Generation.

Xem mindmap để có cái nhìn tổng quan hơn về testNG
![](https://images.viblo.asia/2ecb2d6f-2849-4fbd-ac79-10c81c7b5bb0.png)

# 2. Cài đặt TestNG trong Eclipse:
Eclipse là một trong những IDE rất phổ biến để phát triển test trong Java. 

Và để sử dụng testNG, không phải là sẽ tải về và cài đặt như một tool, mà sẽ giống như một cái phần mềm nho nhỏ được cài đặt tích hợp trong Eclipse.

Để cài đặt thành công TestNG thì chúng ta cần chuẩn bị:
- Cài đặt môi trường Java
- Cấu hình Java
- Cài đặt Eclipse
- Cài đặt TestNG
## 2.1. Cài đặt môi trường Java
Bây giờ ta sẽ tải JDK (Java Development Kit) để cài đặt môi trường Java. 
Khuyến khích dùng JDK 8 bởi vì đây là phiên bản ổn định nhất ở thời điểm hiện tại.

Truy cập link sau:
https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html

Chọn phiên bản phù hợp với window đang sử dụng và tải về
![](https://images.viblo.asia/184951ff-6c52-4dc2-a821-d1ad6e5f9d28.png)

Chạy file JDK vừa tải về
![](https://images.viblo.asia/cd667927-fae6-492e-9e08-382aa2eb3c59.png)

Bấm Next
![](https://images.viblo.asia/00e7f55f-6ec0-4878-a312-13a6d7887332.png)

Trước khi nhấn Next hãy nhớ đường dẫn cài đặt JDK (như trong hình dưới là ở C:\Program Files\Java\jdk1.8.0_191\) để cấu hình Java.
![](https://images.viblo.asia/5169a5b7-919a-4703-b490-fc3c86a00e52.png)

Nếu muốn thay đổi đường dẫn thì có thể click vào "Change..." và chọn folder muốn lưu
![](https://images.viblo.asia/d4e334cd-ef4d-45e1-999f-e3197003f251.png)

Ta đợi chương trình cài đặt
![](https://images.viblo.asia/c11a9e37-9b0e-4d1c-9c2d-5712cd0aee57.png)

Nhấn Close để kết thúc
![](https://images.viblo.asia/d95bd3a5-0412-403a-abc5-3e02cc7b2b29.png)

## 2.2. Cấu hình Java
Đầu tiên, tại My computer, Click chuột phải chọn "Properties"
![](https://images.viblo.asia/b9aeb185-c78e-48e6-acdd-8aad3e8be1b6.png)

Tại màn hình "System" chọn "Advanced system settings", tiếp đến chọn thẻ Advanced => Environment Variables
![](https://images.viblo.asia/f770455f-5a24-4629-acd9-ddd0789e6bda.png)

Ở đây chúng ta thấy 2 lựa chọn đó là User variables for (UserName) và System variables. Vì là biến system vaiable nên chúng ta sẽ setup vào System Variables
![](https://images.viblo.asia/a0eeeb1b-6cb1-4dbe-9c0c-190fb7f4d2e5.png)

Tiếp theo nhấn vào New cửa sổ new system variable hiện ra, điền Variable name vào.
Vd: JAVA_HOME
![](https://images.viblo.asia/6d1b35d9-0886-4e79-82d6-3ca819d53dae.png)

Trong ô Variable value chúng ta sẽ dẫn đến folder bin trong thư mục cài đặt java:  C:\Program Files\Java\jdk1.8.0_191\bin
![](https://images.viblo.asia/dc792fcf-233b-4d3b-8c80-26a8d502b8b5.png)

Cuối cùng, thêm biến JAVA_HOME vào Path Để hoàn thành quá trình Setup environment cho Java chúng ta cần add biến vừa tạo ra vào path.
![](https://images.viblo.asia/312ddc68-132e-47c7-b267-b5fd10611303.png)

Các bạn tìm biến path trong System variables và nhấn vào edit, cửa sổ Edit environment variable hiện ra, tiếp theo chọn New nhập tên biến %JAVA_HOME% và nhấn OK
![](https://images.viblo.asia/0ef47662-2204-43f7-ab5b-90d6acfea36f.png)

Bây giờ chúng ta kiểm tra xem biến JAVA_HOME đã cài đặt thành công chưa:

Đầu tiên mở CMD, sau đó nhập lệnh ECHO %JAVA_HOME% 

Tiếp theo là kiểm tra version bằng lệnh java -version của java như hình, phiên bản java sẽ được hiện ra
![](https://images.viblo.asia/482ffba3-8b5c-430d-9958-96a842682c17.png)

Như vậy ta đã cấu hình xong Java
## 2.3. Cài đặt Eclipse
Đầu tiên chúng ta vào trang web và download
https://www.eclipse.org/downloads/packages/release/2020-03/r/eclipse-ide-java-developers

Chọn phiên bản 32 bit hay 64 bit tùy thuộc vào phiên bản hệ điều hành mà bạn đang dùng.
(Có thể click vào link hoặc button download đều được)
![](https://images.viblo.asia/541b7770-2460-483b-875e-f98663230e44.png)

Click chuột vào eclipse vừa download và chọn Eclipse IDE for Java
![](https://images.viblo.asia/8d9a81f1-3744-47a6-b8db-45bbbcaf4dee.png)

Cửa sổ cài đặt sẽ hiện ra. Eclipse sẽ tự động chọn JRE (có sẵn khi cài đặt JDK) và folder, bạn cũng có thể tự tùy chỉnh theo ý muốn. Sau đó click Install và chờ
![](https://images.viblo.asia/c9dc8900-31a6-4895-bfe6-5445a3cf6a13.png)

Bạn phải chọn workspace (nơi lưu các project mà bạn tạo ra bằng Eclipse) cho eclipse. 

Tích vào "Use this as the default and do not ask again" để chọn workspace đó là mặc định và không hiển thị hộp thoại cho lần mở Eclipse tiếp theo.

![](https://images.viblo.asia/ebdad32b-47e8-4bae-bce9-a7df5641f1a9.png)

Click button Launch, chúng ta thấy giao diện Welcome như sau
![](https://images.viblo.asia/20249d67-55b1-4323-bbbc-162ce7b03f44.png)

Đóng tab "Welcome", chúng ta thấy giao diện như sau
![](https://images.viblo.asia/482e0f74-c0b7-4cee-8072-b86b33c89408.png)

Đến đây là bạn đã thành công trong việc download và cài đặt Eclipse IDE cho lập trình Java

## 2.4. Cài đặt TestNG
Mở Eclipse IDE. Chọn Help > Install new software => Trên màn hình sẽ hiển thị một cửa sổ có tên Install
![](https://images.viblo.asia/ec379a42-243e-4949-bb1f-28ba1b8870a4.png)

Tại trường Work with, có thể nhập "TestNG", hệ thống sẽ xuất hiện gợi ý cho bạn chọn. Lúc này hãy chọn "TestNG P2" (Đây là bản được cập nhật gần đây nhất, tương thích với Eclipse 2020)
![](https://images.viblo.asia/58ede00d-5cc6-438f-bacc-27dd430ea452.png)

Nếu không có dữ liệu gợi ý tại trường Work with, có thể nhập thủ công bằng cách:

Nhấn nút Add, màn hình lúc này sẽ hiển thị một popup nho nhỏ, bạn sẽ điền thông tin này vào từng trường tương ứng:

- Name: TestNG (Có thể đặt tên tùy ý)
- Location: https://dl.bintray.com/testng-team/testng-p2-release (Link này thì phải lấy chính xác nhé)
- Nhấn Add

![](https://images.viblo.asia/a6882a05-6e53-45b5-aae2-3fa67b82a0f2.png)

Check vào checkbox TestNG vừa hiển thị, sau đó nhấn Next
![](https://images.viblo.asia/99664fe2-44c9-4139-aca5-ed307d895518.png)

Check đồng ý vào điều khoản liên quan đến bản quyền
![](https://images.viblo.asia/73a03063-afc1-48b6-a90b-d86b2bb48848.png)

Lúc này quá trình download diễn ra, và TestNG sẽ được cài đặt sau đó
![](https://images.viblo.asia/776fbd8e-3b6d-44a1-9d6d-8888efdaf1f6.png)

Sau khi quá trình cài đặt ở bước trên đã xong, sẽ có một cửa sổ hiển thị yêu cầu bạn sẽ khởi động lại Eclipse để cập nhật những cài đặt vừa rồi. 

Chọn Yes để hoàn tất việc cài đặt TestNG
![](https://images.viblo.asia/617cee28-648b-4eed-89ac-b243d647334f.png)

Hi vọng là với các bước phía trên bạn có thể cài đặt TestNG một cách dễ dàng và nhanh chóng hơn