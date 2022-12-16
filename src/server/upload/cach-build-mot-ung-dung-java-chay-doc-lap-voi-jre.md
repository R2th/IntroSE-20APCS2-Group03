# 1. Mở đầu
Java Virtual Machine hay viết tắt là JVM là một môi trường ảo có thể giúp máy tính có thể chạy được các chương trình Java. Cung cấp môi trường Runtime mà Java Bytecode được thực thi.

JVM là có sẵn cho nhiều nền tảng (Windows, Linux…). JVM, JRE và JDK là phụ thuộc nền tảng, bởi vì cấu hình của mỗi OS (hệ điều hành) là khác nhau. Nhưng, Java là độc lập nền tảng.

Cấu trúc của JVM:
![](https://images.viblo.asia/70989216-d996-4f49-b705-4b75323955ee.jpg)
JVM có nhiệm vụ: tải code, kiểm tra code, thực thi code, cung cấp môi trường runtime. Biên dịch Java Bytecode thành tập lệnh thực thi đối với từng OS, tối ưu hóa code, cung cấp, quản lí lưu trữ các đối tượng trong chương trình chạy.

JRE (là viết tắt của Java Runtime Environment) được sử dụng để cung cấp môi trường runtime. Nó là trình triển khai của JVM. JRE bao gồm tập hợp các thư viện và các file khác mà JVM sử dụng tại runtime. Trình triển khai của JVM cũng được công bố bởi các công ty khác ngoài Sun Micro Systems.
![](https://images.viblo.asia/825cd754-5943-4720-8f4f-afb76dc931e0.jpg)
Nhưng gần đây, mình mới biết đến một công cụ do Oracle phát triển nên, có thể compile trực tiếp từ Java code hay Java bytecode sang native code, đó là GraalVM. GraalVM là một máy ảo đa ngôn ngữ và mang lại hiệu quả cao hơn, cách ly tốt hơn và linh hoạt hơn. Sau đây là một số thành phần chính:
* GraaVMl Compiler: sinh ra code đã được biên dịch để chạy trên JVM hoặc Native Image Virtual Machine.
* GraalVM Native Image: chuyển đổi từ một ứng dụng thành một khối binary code để có thể chạy độc lập trên hệ thống.
* Polyglot Capabilities: hỗ trợ cho nhiều loại ngôn ngữ như: Java, Scala, Kotlin, JavaScript và Node.js
* Language Implementation Framework: có thể thực hiện bất kì ngôn ngữ nào trên môi trường GraalVM
* LLVM Interpreter: cho phép native code chạy và quản lí bởi môi trường GraalVM.
# 2. Giới thiệu công cụ native-image
GraalVM Native Image cho phép bạn biên dịch toàn bộ source code Java thành một ứng dụng có thể chạy được độc lập, được gọi là **native image**. Nó bao gồm source code, các thư viện, JDK và không cần chạy trên JVM. Nhưng vẫn cần phải đính kèm những thành phần như quản lí bộ nhớ, thread scheduling từ những máy ảo khác, đây được gọi là "Substrate VM".
## a. Cài đặt công cụ native-image
 -  Đầu tiên có thể download GraalVM tại [đây](https://www.graalvm.org/downloads/). Sẽ có 3 lựa chọn cho 3 môi trường: Windows, Linux, MacOS.
 - Tiếp theo, hãy giải nén file vừa tải về. Sau đó trên cửa sổ Terminal chạy các lệnh sau `cd ${GRAALVM_PATH}` và `gu install native-image`.
 - Hãy chắc chắn rằng máy của bạn đã cài `glibc-devel`, `zlib-devel` (header files dành cho thư viện C và `zlib`) và `gcc`
## b. Sử dụng công cụ native-image
*   `native-image [options] class`: build thành 1 file executable từ 1 class chứa trong thư mục hiện tại.
Ví dụ ta có đoạn Java code sau:
```
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```
- Biên dịch thành file .class: `javac HelloWorld.java`
- Build thành file executable: `native-image HelloWorld`
- Chạy file vừa build được: `./helloworld`
*   `native-image [options] -jar jarFile`: build 1 image từ file .jar
Cũng với ví dụ code HelloWorld trên:
- Tạo file MANIFEST.MF chứa nội dung định nghĩa main class: `Main-Class: HelloWorld`
- Build file `HelloWorld.jar`: `jar cmvf MANIFEST.MF HelloWorld.jar HelloWorld.class`
- Build file `HelloWorld.jar` thành file executable: `native-image -jar HelloWorld.jar`
* Tuy nhiên, với 2 cách trên, khi chúng ta chạy file kết quả thì vẫn thấy yêu cầu phải cài đặt JRE (nếu gỡ bỏ toàn bộ JRE và GraalVM). Để có thể chạy độc lập với JRE, hay thêm option `--no-fallback` vào sau lệnh build.
* Còn rất nhiều option khác để support cho 2 lệnh build trên, các bạn có thể tham khảo tại [đây](https://github.com/oracle/graal/tree/master/substratevm).

Nhìn chung, việc convert từ Java bytecode sang binary code này sẽ giúp chương trình của chúng ta cải thiện tốc độ chạy hơn rất nhiều. Nhưng trái lại, đôi khi trong khi build hoặc run kết quả còn xảy ra nhiều lỗi không mong muốn. Việc tìm ra nguyên nhân cũng rất là khó, bởi vì chúng ta không thể debug code được, nên tốn nhiều thời gian, công sức để tìm được nguyên nhân và xử lí. Tất nhiên, nếu đánh đổi được việc đó thì ta sẽ thu được một ứng dụng có performance tốt hơn rất nhiều.
# 3. Tham khảo
* https://www.graalvm.org/docs/reference-manual/aot-compilation/
* https://github.com/oracle/graal/tree/master/substratevm