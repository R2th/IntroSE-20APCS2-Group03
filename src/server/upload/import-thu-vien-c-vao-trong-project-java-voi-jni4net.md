# Import thư viện C# vào trong project Java với jni4net

### I. Mở đầu

Ngày trước khi mình mới bắt đầu sự nghiệp trên con đường làm coder, mình đã có quãng thời gian dài làm freelancer. Mình có gặp khá nhiều những dạng yêu cầu của khách hàng, rồi trong lúc bắt tay vào làm thì xuất hiện vô số vấn đề nan giải. 

Mình nhớ lúc đó có 1 vấn đề như thế này: Do mình là developer java nên mình thường ưu tiên làm các dự án bằng Java, nhưng đợt làm 1 cái app desktop lại dính ngay 1 cái vấn đề là bên java không có một cái lib cần cho quá trình làm cái app đó. May thay bên C# lại có lib đó. Vậy vấn đề là làm sao mình có thể cho cái thư viện đó vào trong code java của mình. Chứ mình không thể đập cả dự án đang làm dở để chuyển đổi ngôn ngữ vì một lib được

<br>
<br>

***Câu trả lời là nằm ở JNI4Net***
<br>
<br>

Hôm nay mình sẽ hướng dẫn các bạn làm thế nào để import 1 lib được viết bằng C# vào trong project java.

<br>
<br>


### II. Jni4net là gì


Nó là cầu nối giữa Java và .Net
<br>
<br>

Đây là cách thức thư viện hoạt động

![](https://images.viblo.asia/750ba19f-b0b8-41e8-b80d-8371b226c327.PNG)

<br>
<br>

### III. Ví dụ cụ thể để thêm một lib từ C# vào project java

<br>
<br>


**1. Tạo 1 lib định dạng file .dll bằng Visual studio**

Bạn tạo 1 project loại Class Library nhé:
![](https://images.viblo.asia/e07a214f-9e1a-47b3-8c33-789662ed6c73.PNG)

<br>
<br>

Đổi tên file class đi cho dễ nhìn xíu. Như của mình là TestClass và mình viết sẵn 1 hàm sum để lát nữa test trong java.

![](https://images.viblo.asia/56dd6350-71e7-490c-9ff7-d39614b405b8.PNG)

Cuối cùng là click Build -> Build Solution để tạo lib với định dạng file *.dll

Bạn vào thư mục project trong thư mục bin sẽ có lib đó
<br>
<br>

![](https://images.viblo.asia/28e138a5-c960-4627-a4d9-75c46b4b2ed2.PNG)

<br>
<br>

**2. Download thư viện jni4net về**

Các bạn vào link phía dưới để download nhé:

http://jni4net.com/index.html

Như bản của mình là jni4net-0.8.6.0-bin.zip. Bạn giải nén ra và bắt đầu tiến hành build và tạo lib cho java sử dụng:


Trước khi bạn làm cái này nhớ setup biến môi trường cho java và .net

<br>
<br>

Setup java home
![](https://images.viblo.asia/b3a76fc8-abd3-4e37-a7d8-e99de174b35e.PNG)

Set up thêm cái path cho java và .net

![](https://images.viblo.asia/a6c3a997-f499-4b18-bcac-3b3afe3d16eb.PNG)

Đã xong xuôi. giờ tiến hành build lib từ .Net thôi.
<br>
<br>


Vào cmd cd đến …..\jni4net-0.8.6.0-bin\bin

<br>
<br>

.\proxygen.exe [path_file_dll] -wd [directory_save]

<br>
<br>

Ví dụ: 

![](https://images.viblo.asia/851b9f6e-e0b3-4f99-a788-1474ccb0fb0f.PNG)

Tiếp theo cd vào thư mục chứa cái file mình vừa ghi ra. Mình di chuyển file dll đó vào E:\test. 

<br>
<br>

Gõ lệnh
<br>
<br>

.\build.cmd

![](https://images.viblo.asia/55bf8508-336c-42de-b2aa-a8051339b869.PNG)

<br>
<br>

Nó build cho mình 2 file

<br>
<br>

TestLibDll.j4n.jar

TestLibDll.j4n.dll

<br>
<br>

Giờ gom cho mình những tệp này bỏ cùng vào thư mục libs

![](https://images.viblo.asia/a45b0827-6499-471a-8a31-d73a649560b4.PNG)

3 tệp mình khoanh đỏ thì lấy trong cái jni4net ban đầu mình tải về nhé jni4net-0.8.6.0-bin\lib
Mình là win64 nên mình dùng cái đó.
<br>
<br>

**3. Add vào project java**

<br>
<br>

Ví dụ mình đang dùng IDE là Inteliji.


Bạn tạo 1 app java cơ bản

![](https://images.viblo.asia/1ba67b19-fc63-4d9f-8dde-f2c09ffcf791.PNG)

<br>
<br>

Add cái thư mục libs mà mình vừa mới tạo vào trong project

Chọn File -> project structure… -> module Xong click vào dấu + để thêm nhé

![](https://images.viblo.asia/2a53ec66-5db9-420d-99b8-a9e561e8b78d.PNG)

Chọn JARs or directories… xong trỏ đến thư mục libs mình vừa gom -> ok

Tạo 1 class App Main

Với source code như sau:

![](https://images.viblo.asia/7860fe27-a522-40ab-94db-f5f0a7fad680.PNG)
<br>
<br>

```
import net.sf.jni4net.Bridge;
import testlibdll.TestClass;

import java.io.File;
import java.io.IOException;

public class AppMain {

   public static void main(String[] args) throws IOException {
       Bridge.setVerbose(true);
       Bridge.init(new File("E:/test/libs/jni4net.n.w64.v40-0.8.6.0.dll"));
       Bridge.LoadAndRegisterAssemblyFrom(new File("E:/test/libs/TestLibDll.j4n.dll"));
       int x = TestClass.sum(10, 11);
       System.out.println("\nJava show: "+x);
   }
}
```


Đây là kết quả khi chạy
<br>
<br>

![](https://images.viblo.asia/40544c31-e9b0-4596-9763-44ef5f40d2b8.PNG)


Vậy là mình đã thành công gọi thư viện .Net sang project Java

## Cảm ơn các bạn đã theo dõi