### 1.Java là gì?
Java là một nền tảng phát triển các ứng dụng phần mềm có vị trí rất lớn trong những năm cuối thế kỉ 20, đầu thế kỉ 21. Đánh dấu sự trưởng thành của mô hình lập trình hướng đối tượng, nó được coi là một nền tảng mang tính cách mạng trong ngành phần mềm. Mô hình máy ảo Virtual Machine đã cho phép các ứng dụng viết bằng Java có thể chạy trên nhiều hệ điều hành khác nhau.

Lần đầu tiên xuất hiện vào năm 1992 như là một ngôn ngữ dùng trong nội bộ tập đoàn Sun Microsystems để xây dựng ứng dụng điều khiển các bộ xử lý bên trong máy điện thoại cầm tay, lò vi sóng, các thiết bị điện tử dân dụng khác. Không chỉ là một ngôn ngữ, Java còn là một nền tảng phát triển và triển khai ứng dụng trong đó máy ảo Java, bộ thông dịch có vai trò trung tâm.

Sun, công ty đã phát minh ra ngôn ngữ Java, chính thức ban hành bản Java Development Kit 1.0 vào năm 1996 hoàn toàn miễn phí để các nhà phát triển có thể tải về, học Java, xây dựng các ứng dụng Java và triển khai chúng trên các hệ điều hành có hỗ trợ Java. Ban đầu, Java chủ yếu dùng để phát triển các applet, các ứng dụng nhúng vào trình duyệt, góp phần làm sinh động các trang web tĩnh vốn hết sức tẻ nhạt hồi đó. Tuy nhiên, cùng với sự phát triển của công nghệ thông tin và nhu cầu của xã hội, Java applet đã dần mất đi vị trí của nó và thay vào đó, các công ty, cộng đồng ủng hộ Java đã phát triển nó theo một hướng khác. Hiện nay, công nghệ Java được chia làm ba bộ phận:

**J2SE**
    Gồm các đặc tả, công cụ, API của nhân Java giúp phát triển các ứng dụng trên desktop và định nghĩa các phần thuộc nhân của Java.
**J2EE**
    Gồm các đặc tả, công cụ, API mở rộng J2SE để phát triển các ứng dụng quy mô xí nghiệp, chủ yếu để chạy trên máy chủ (server). Bộ phận hay được nhắc đến nhất của công nghệ này là công nghệ Servlet/JSP: sử dụng Java để làm các ứng dụng web.
**J2ME**
    Gồm các đặc tả, công cụ, API mở rộng để phát triển các ứng dụng Java chạy trên điện thoại di động, thẻ thông minh, thiết bị điện tử cầm tay, robo và những ứng dụng điện tử khác

Java đã trải qua 3 bước phát triển quan trọng: Java 1.0 gắn liền với bản JDK đầu tiên, Java 2 gắn với JDK 1.2 và Java 5 gắn với J2SDK 1.5

Ngày nay, khi nhắc đến Java người ta không còn chỉ nhắc đến Java như là một ngôn ngữ mà nhắc đến Java như là một công nghệ hay một nền tảng phát triển. Nó bao gồm các bộ phận:

    Máy ảo Java: JVM
    Bộ công cụ phát triển: J2SDK
    Các đặc tả chi tiết kĩ thuật (specifications)
    Ngôn ngữ lập trình (programming language)
### 2.Ứng dụng của Java
Ngày nay Java được sử dụng với các mục đích sau:

*     Phát triển ứng dụng cho các thiết bị điện tử thông minh, các ứng dụng cho doanh nghiệp với quy mô lớn.
*     Tạo các trang web có nội dung động (web applet), nâng cao chức năng của server.
*     Phát triển nhiều loại ứng dụng khác nhau: Cơ sở dữ liệu, mạng, Internet, viễn thông, giải trí,...
### 3. Những đặc điểm cơ bản của Java

*     Đơn giản và quen thuộc: Vì Java kế thừa trực tiếp từ C/C++ nên nó có những đặc điểm của ngôn ngữ này, Java đơn giản vì mặc dù dựa trên cơ sở C++ nhưng Sun đã cẩn thận lược bỏ các tính năng khó nhất của của C++ để làm cho ngôn ngữ này dễ sử dụng hơn.
*     Hướng đối tượng và quen thuộc.
*     Mạnh mẽ (thể hiện ở cơ chế tự động thu gom rác - Garbage Collection) và an toàn.
*     Kiến trúc trung lập, độc lập nền tảng và có tính khả chuyển (Portability).
*     Hiệu suất cao.
*     Máy ảo (biên dịch và thông dịch).
*     Phân tán.
*     Đa nhiệm: Ngôn ngữ Java cho phép xâ dựng trình ứng dụng, trong đó nhiều quá trình có thể xảy ra đồng thời. Tính đa nhiệm cho phép các nhà lập trình có thể biên soạn phần mềm đáp ứng tốt hơn, tương tác tốt hơn và thực hiện theo thời gian thực.
*     ...
### 4. Các platform cơ bản của Java.
Java Platform gồm có 3 thành phần chính:

    Java Virtual Machine (Java VM): Máy ảo Java.
    Java Application Programming Interface (Java API).
    Java Development Kit (JDK) gồm trình biên dịch, thông dịch, trợ giúp, soạn tài liệu... và các thư viện chuẩn.

![](https://images.viblo.asia/7996c193-f77a-4b37-abf6-e34226051aad.png)

### 5. Tiêu chuẩn của một môi trường Java điển hình.
    Editor:Lập trình viên viết chương trình được lưu vào máy tính với định dạng .jav.
    Compiler:Biên dịch chương trình thành bytecodes( định dạng .class)
    Class Loader:Đọc file .class chứa mã bytecodes và được lưu trong bộ nhớ.
    Bytecode Verifier:Đảm bảo rằng mã bytecodes là hợp lệ và không vi phạm các vấn đề bảo mật của Java.
    Interpreter:Biên dịch bytecodes thành mã máy để máy tính có thể hiệu được và thực thì chowng trình.

![](https://images.viblo.asia/22d18662-5e8b-418b-86da-d41148ab41be.png)


### 6.Chuẩn bị môi trường lập trình Java cài đặt IDE IntelliJ
Để thực hành lập trình **JAVA** cơ bản, trước tiên cần cài đặt **JDK** (Java SE Development Kit) là nền tảng Java và máy áo thực thi code Java.Để download JDK bạn vào [đây](https://www.oracle.com/java/technologies/javase-downloads.html) để download phiên bản JDK phù hợp với bạn.

Tiếp theo chọn một **IDE** (Integrated Development Environment) phù hợp với nhu cầu để xử dụng,có nhiều IDE có phí hay mất phí để sử dụng như IntelliJ,Netbean,Eclipse.....

Ở đây tôi chọn IntelliJ là một IDE có hai bản Community và Ultimate khác nhau hỗ trợ của chũng cho các ngôn ngữ lập trình khác nhau như Java,Python ..Nó có đầy đủ các phiên bản cho Windows,macOs hay Linux.Bạn vào
[đây](https://www.jetbrains.com/idea/download/#section=linux) để tải nó về và cài đặt.

Chạy **IDE IntelliJ** nó có giao diện


![](https://images.viblo.asia/af57cd61-cb35-4f11-a039-1ef16420e2fa.png)



### 7.Chương trình Hello World

Tạo dự án HelloWorld trong IntelliJ

Mở IntelliJ,tạo dự án mới bằng cách *File*->*New*->*Project*->*Java(bấm Next)*->*Next*->*Nhập tên Project mà bạn muốn đặt rồi ấn Finish*

Bạn sẽ nhìn thấy dự án mình vừa tạo trong phần **Project**

![](https://images.viblo.asia/936d39c2-4ffe-490a-8b67-9cdcf05a6f08.png)

Như vậy bạn đã có dự án đầu tiên **HelloWorld**,tiếp theo tạo package và class để viết những đoạn code đơn giản đầu tiên.

### 8.Hello World

**Java** có tổ chức code thành từng gói **package**,mỗi **package** chứa các lớp,hàm...có một chức năng nhất định.Để tạo một **package**,bạn chọn *New*->*package* rồi nhập tên **package** để tạo.

Bây giờ bạn tạo **class** đầu tiên trong **package** vừa tạo,chọn *New*->*Java Class* rồi nhập tên **class** bạn muốn đặt.

Như vậy ta đã có một **class** **java** để thao tác.Trước tiên bạn cần mở **class** vừa tạo nên và biên tập đoạn mã trong file đó thành :
```
package com.ncs.fristpackage;

//Lớp HelloWorldClass

public class HelloWorld {
    /***
     * Hàm main là điểm khởi đầu chạy một ứng dụng Java
     * Khối lệnh Java nằm trong cặp { }
     */
    public static void main(String[] args) {
        System.out.println("Hello World");
        //kết thúc lệnh phải có ;
    }
}
```

Để chạy chương trình ta bấm chuột phải vào màn hình rồi chọn **Run**

### Phương thức main

```
public static void main(String[ ] args)
```

* **public**: bất kỳ đâu cũng truy cập được
* **static**: phương thức có thể thi hành mà không cần tạo ra đối tượng lớp chứa phương thức.
* **void**: phương thức không có giá trị trả về
* **main**: tên của phương thức

### System.out.println()

```
System.out.println("Hello World!")
```

Phương thức **println()** để in dòng chữ ra màn hình. Lớp **System** và **stream** out dùng để truy cập **println()**

### Ghi chú trên một dòng
Sử dụng ký hiệu //...ghi chú..., ví dụ:
```
// đây là ghi chú trên một dòng
System.out.println("Hello World!") // đây là ghi chú trên một dòng sau code
```

### Ghi chú nhiều dòng
Sử dụng ký hiệu /*...các dòng ghi chú..*/, ví dụ:

```
/*  Đây là 
    ghi chú
    Được viết trên nhiều dòng
*/
```

**Kết luận**:như vậy bạn đã biết cách sử dụng IntelliJ IDEA để tạo một dự án Java,packge và class và viết một đoạn code đơn giản bằng Java.Khi đang gõ code trên IntelliJ IDEA,để có gợi ý theo nột dung gõ bạn ấn **Ctrl** + **Space**,để Format lại code bạn ấn **Ctrl**+**Alt**+**L**


Trên đây là bài chia sẻ của mình,mong nó sẽ giúp được các bạn.