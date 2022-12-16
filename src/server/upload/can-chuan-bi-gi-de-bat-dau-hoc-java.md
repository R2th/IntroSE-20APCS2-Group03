Cần chuẩn bị những gì để bắt đầu lập trình Java?

## 1. Chuẩn bị môi trường chạy Java

### 1.1. Cài JDK hay JRE?

Đây là hai thành phần cơ bản của Java mà các bạn sẽ gặp thường xuyên. Cả hai đều là các bộ thư viện, công cụ hỗ trợ java, cung cấp nền tảng để chạy và biên dịch các chương trình java. Dưới đây là bảng so sánh tóm tắt về hai khái niệm này.

| Tiêu chí | JRE | JDK |
| - | - | - |
| Viết tắt cho? | Java Runtime Environment | Java Development Kit |
| Dùng để làm gì? | Dùng để chạy các chương trình viết bằng Java | Dùng để biên dịch code Java thành chương trình chạy được |
| Dành cho ai? | Cho người dùng muốn sử dụng chương trình viết bằng Java | Cho lập trình viên để viết chương trình java |
| Bao gồm | JVM (máy ảo java, là nơi chạy chương trình) và các thư viện java | JRE và các development tools khác |

Lưu ý, JDK có chứa JRE bên trong, do đó khi cài JDK thì máy bạn cũng có JRE luôn. Và như hình, JDK ngoài chứa JRE ra còn có thêm các công cụ hỗ trợ lập trình (development tools) nữa, để giúp lập trình viên trong việc viết code.

![](https://images.viblo.asia/94cd05c3-6356-4ca5-a600-c14d83400feb.png)


Nếu bạn là lập trình viên, muốn dùng java viết ra các phần mềm, hãy dùng JDK. Ngược lại nếu bạn chỉ muốn dùng các app viết bằng Java (như Minecraft), chỉ cần cài JRE.

### 1.2. Chọn version và cài đặt

Có hai loại JDK (và JRE) phổ biến hiện nay là của Oracle và OpenJDK:

* Oracle thì phải cần giấy phép khi dùng cho mục đích thương mại
* OpenJDK thì miễn phí hoàn toàn

Ngoài ra giữa chúng còn có vài điểm khác nữa, như lịch phát hành, hiệu năng (khác nhau tí),... tuy vậy code java thì vẫn khá tương đồng. Đối với lập trình viên, thì cả hai đều có thể dùng để học code được.

![](https://images.viblo.asia/7ec09d58-edda-468e-b7ed-4b72ac7a4f48.jpg)

Tải JDK và JRE tại trang chủ Oracle https://www.oracle.com/java/technologies/javase-downloads.html. Các bước cài đặt sau đó các bạn có thể tự làm được nên mình không bàn tới nhé.

Về phiên bản thì mình khuyến khích dùng phiên bản 11, vì đây là bản stable (ổn định) nhất và được LTS (Long terms support). Nếu bạn muốn dùng các tính năng java mới nhất, hãy cài JDK 15 (mới nhất hiện tại). Tuy java 8 phổ biến nhất, nhưng sẽ sớm chuyển qua java 11, vì cả hai đều là LTS.

![](https://images.viblo.asia/9cb948cb-6e35-4257-8305-8d456470432b.png)

Lưu ý nhỏ về số phiên bản Java, phần này có lẽ nhiều bạn chưa rõ. Từ java 8 trở về sau thì số version JDK giống với version của Java (ví dụ java 8 là JDK 8, java 11 là JDK 11). Còn các phiên bản trước java 8 thì JDK có dạng `1.X`, ví dụ java 8 thì là JDK 1.8.

### 1.3. Đặt biến môi trường

Sau khi cài xong, các bạn cần thiết lập biến môi trường cho JDK (hoặc JRE). Mục đích là để có thể chạy được `javac` hoặc `java` ở mọi nơi, mọi thư mục khác nhau trong máy tính.

Đầu tiên, các bạn tìm tới thư mục cài JDK, mặc định là `C:\Program Files\Java\jdk-15.0.2`. Copy đường dẫn đó lại.

Sau đó mở System properties lên (bằng Windows search hoặc dùng Control panel > System). Hộp thoại hiện lên như sau, click vào **Environment Variables**.

![](https://images.viblo.asia/df6a2b79-cf5b-440b-a003-6709fd3a13d6.png)

Sau đó trong phần **System variables**, tạo thêm mục có tên `JAVA_HOME` (hoặc `JDK_HOME`) với giá trị là thư mục JDK đã copy ở trên.

![](https://images.viblo.asia/823cec00-eeb2-4828-b8d9-074d14d90b29.png)

Sau đó ở phần trên **User variables for User**, tìm mục **Path** và double click vào nó. Thêm một mục là `%JAVA_HOME%\bin` (hoặc `%JDK_HOME%\bin` cho tương ứng ở trên) là được.

![](https://images.viblo.asia/eb5fecc3-a2a7-4da1-a9dc-d9e35575baf2.png)

Thế là xong, biến môi trường đã được thiết lập.

## 2. IDE lập trình Java

Tiếp theo, bạn cần có một IDE tốt để hỗ trợ code java được thuận tiện. Hiện tại có 3 ứng cử viên khá phổ biến:

* Eclipse: đơn giản, nhẹ, dễ dùng
* IntelliJ IDEA: tuyệt vời, nhưng khá nặng
* NetBean: mình không dùng do không thích giao diện của nó lắm :(

Với các bạn mới học, mình khuyến khích dùng Eclipse. IDE này đủ chức năng, đồng thời khá nhẹ và dễ dùng, thích hợp với người mới bắt đầu.

Ngoài ra VSCode cũng có thể code được Java, tuy nhiên cần cài thêm plugin. Các bạn có thể tìm hiểu thêm.

## 3. Bắt đầu code và build chương trình

### 3.1. Chương trình đầu tiên

Sau khi đã cài xong JDK và IDE là các bạn đã sẵn sàng để code chương trình đầu tiên - **Hello world**. Các bạn tạo project mới, rồi tạo file có tên `HelloWorld.java` và gõ đoạn code sau vào.

```HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

Lúc này các bạn chưa cần hiểu ý nghĩa từng keyword trong chương trình trên, chỉ cần biết 3 điều:

* Hàm `main()` là nơi bắt đầu chương trình Java
* Lệnh `System.out.println()` là in dòng chữ ra màn hình (console)
* Tên class chính `HelloWorld` phải trùng với tên file `HelloWorld.java` (khớp cả hoa thường)

Để chạy chương trình các bạn nhấn Run (tùy IDE nhé) và xem kết quả dòng chữ "Hello World" được in ra màn hình.

### 3.2. Build bằng dòng lệnh

Tuy đã có IDE hỗ trợ build và chạy chương trình rồi, nhưng bạn cũng cần phải biết cách build code đã viết thủ công (bằng command line). Gồm 2 bước, tương ứng với 2 câu lệnh:

* Biên dịch mã nguồn trong file `.java` thành file `.class` (chứa bytecode)
* Chạy file bytecode `.class` đã biên dịch

```shell
# Biên dịch HelloWorld.java thành HelloWorld.class
javac HelloWorld.java

# Chạy file đã biên dịch HelloWorld.class (không cần thêm .class)
java HelloWorld
```

Lưu ý nhỏ, hai command trên thuộc hai phần khác nhau của Java:

* `javac` thuộc về JDK, dùng để biên dịch code Java
* `java` thuộc về JRE (JDK chứa JRE, nên cũng chứa `java`), dùng để chạy bytecode Java

Do đó, khi các bạn không chạy được `javac`, nghĩa là máy tính của bạn chỉ mới có JRE mà chưa có JDK. Cần cài đặt JDK để biên dịch code Java nhé.