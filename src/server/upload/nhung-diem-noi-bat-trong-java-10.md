Tháng 3 - 2018, Oracle vừa ra mắt phiển bản Java 10 với những thay đổi đáng chú ý.
Trong bài viết này, chúng ta sẽ khám phá 10 tính năng nổi bật trong bản cập nhật mới này cho java.

Các tính năng cần quan tâm và được chú ý được đề cập trong Java 10:
* 286: Local-Variable Type Inference
* 296: Consolidate the JDK Forest into a Single Repository
* 304: Garbage-Collector Interface
* 307: Parallel Full GC for G1
* 310: Application Class-Data Sharing
* 312: Thread-Local Handshakes
* 313: Remove the Native-Header Generation Tool (javah)
* 314: Additional Unicode Language-Tag Extensions
* 316: Heap Allocation on Alternative Memory Devices
* 317: Experimental Java-Based JIT Compiler
* 319: Root Certificates
* 322: Time-Based Release Versioning

**1. JEP 286: Local Variable Type Inference**
Một đặc điểm mới trong Java 10 và có lẽ là tính năng thú vị nhất, ít nhất là từ góc độ mã hóa, là ngôn ngữ cố gắng cải thiện trải nghiệm của nhà phát triển bằng cách loại bỏ một số khai báo kiểu dữ liệu nghiêm ngặt, cho phép các nhà phát triển cho phép trình biên dịch suy ra kiểu chỉ sử dụng từ khóa var. Trong Java 10 ngôn ngữ sẽ không nghiêm ngặt về an toàn kiểu khi làm việc với các biến cục bộ. Điều này sẽ cho phép khai báo như sau :
```
var list = new ArrayList<String>(); 
var stream = list.stream(); 
```
**2. JEP 296: Consolidate the JDK Forest into a Single Repository**
Không có gì nhiều để nói về điều này sang một bên thực tế rằng đó là tất cả về vệ sinh. Nó sẽ kết hợp nhiều kho lưu trữ của rừng JDK vào một kho lưu trữ duy nhất.

**3. JEP 304: Garbage-Collector Interface**
Tăng cách ly mã của các bộ thu gom rác khác nhau và giới thiệu một giao diện sạch cho các bộ thu gom rác.
Điều này có một số lợi thế như, ví dụ, làm cho nó dễ dàng hơn để loại trừ một GC từ một JDK xây dựng và làm cho nó dễ dàng hơn để thêm một GC mới mà không có nó ảnh hưởng đến cơ sở mã.

**4. JEP 307: Parallel Full GC for G1**
Trong Java 9, G1 được tạo thành GC mặc định, được thiết kế để tránh các bộ sưu tập đầy đủ, nhưng khi các bộ sưu tập đồng thời không thể lấy lại bộ nhớ đủ nhanh, nó sẽ kết thúc trở lại trên một GC đầy đủ, và đây là nơi vấn đề nằm.

Mục đích của JEP 307 là song song với thuật toán GC đầy đủ để trong trường hợp không chắc chắn của G1 Full GC, thì cùng một số luồng có thể được sử dụng như trong các bộ sưu tập đồng thời.

**5. JEP 310:Application Class-Data Sharing**

**6. JEP 312: Thread-Local Handshakes**

Đặc điểm này này đặt nền tảng cho hiệu suất VM được cải tiến, bằng cách làm cho nó có thể thực hiện một cuộc gọi lại trên các luồng ứng dụng mà không thực hiện một điểm truy cập VM toàn cầu. Điều này có nghĩa là JVM có thể dừng các luồng riêng lẻ và không chỉ tất cả các luồng đó. Một số cải tiến nhỏ, cấp thấp mà điều này sẽ cho phép bao gồm:

* Giảm tác động của việc mua mẫu dấu vết ngăn xếp (ví dụ: để lược tả)
* Lấy mẫu theo dõi ngăn xếp tốt hơn bằng cách giảm sự phụ thuộc vào tín hiệu.
* Cải thiện khóa thiên vị bằng cách chỉ dừng các luồng riêng lẻ để thu hồi các thành kiến.
* Loại bỏ một số rào cản bộ nhớ khỏi JVM

**7. JEP 313: Remove the Native-Header Generation Tool**

JDK 10 sẽ không còn có một công cụ riêng biệt để tạo các tệp tiêu đề khi biên dịch mã JNI, vì điều này có thể được thực hiện thông qua javac. JEP này loại bỏ công cụ javah khỏi JDK.

**8. JEP 314: Additional Unicode Language-Tag Extensions**

**9. JEP 316: Heap Allocation on Alternative Memory Devices**

**10. JEP 317: Experimental Java-Based JIT Compiler**

**11. JEP 319: Root Certificates**
JEP 319 sẽ cung cấp một bộ mặc định của Cơ quan chứng nhận gốc làm cho OpenJDK xây dựng thêm hấp dẫn cho các nhà phát triển. Nó cũng nhằm giảm sự khác biệt giữa các bản dựng OpenJDK và Oracle JDK. Các thành phần bảo mật quan trọng như TLS giờ đây sẽ hoạt động theo mặc định trong các bản dựng OpenJDK

**12. JEP 322: Time-Based Release Versioning**
Nó sửa đổi lược đồ chuỗi phiên bản của Nền tảng Java SE và JDK và thông tin phiên bản có liên quan, cho các mô hình phát hành dựa trên thời gian hiện tại và trong tương lai, ho các mô hình phát hành dựa trên thời gian hiện tại và tương lai cho một số giải thích cần thiết, với một mô hình phát hành sáu tháng.
![](https://images.viblo.asia/4af39869-f709-4f3d-9148-cbf08e2c9…)

References:

[https://aboullaite.me/10-new-features-in-java-10/](https://aboullaite.me/10-new-features-in-java-10/)