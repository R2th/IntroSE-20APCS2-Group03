Việc thực hiện code java trên Visual Studio Code có lẽ không phải lựa chọn cho nhiều người, bởi lẽ đã có nhiều IDE hỗ trợ rất tốt cho lập trình viên java như Intelij, eclipse,... Tuy nhiên, nếu mục đích của bạn không phải lập trình mà chỉ muốn debug xem cách thức mà đoạn code thực hiện như thế nào thì bài viết này dành cho bạn. Trong bài viết này, tôi sẽ hướng dẫn các bạn debug và remote debug ứng dụng viết bằng java với Visual Studio Code. Lý do tại sao tôi chọn Vs code, một phần vì nó nhẹ, hỗ trợ nhiều plugin thú vị và phần khác thì do cảm quan cá nhân thích mà thôi. Ok, hãy bắt đầu với việc debug một đoạn code java đơn giản.

# Debug ứng dụng java
Để có thể debug ứng dụng java, trước hết ta cần phải cài đặt JDK trên máy tính của mình.  Sau khi cài đặt JDK, bạn sẽ cần cấu hình môi trường cho Java. Cách phổ biến nhất là đặt biến môi trường JAVA_HOME đến vị trí cài đặt của JDK. Tiếp theo chúng ta cần cài đặt 2 plugin là `Debugger for Java` và `Language Support for Java(TM) by Red Hat`. 

Trước hết hãy tạo ra một chương trình java đơn giản với tên `Test.java` với nội dung như sau:

```java

import java.util.Scanner;

public class Test {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.println("nhap so nguyen thu nhat");
            int a = scanner.nextInt();
            System.out.println("nhap so nguyen thu hai");
            int b = scanner.nextInt();
            scanner.close();
            System.out.println("tong cua hai so nguyen tren la: " + Add(a, b));
        } catch (Exception e) {
            System.out.println("so ban nhap khong la so nguyen");
        } finally {
            scanner.close();
        }
        System.exit(0);
    }

    public static int Add(int a, int b) {
        return a+b;
    }
}
```

Nếu các bạn cài đặt môi trường java đúng, thì chúng ta có thể chạy hoặc debug ứng dụng trên bằng cách bấm vào nút như hình vẽ dưới đây

![](https://images.viblo.asia/d82601c4-ba4c-4c0a-b8b7-21f253ff40ed.png)

Kết quả sau khi chạy chương trình như sau:

![image.png](https://images.viblo.asia/678a6a53-086d-4bb5-9be3-dff30dc107f9.png)

Vậy còn debug thì sao, để debug ta cần đặt `BreakPoint` tại một dòng nào đó (ở đây tôi đặt tại dòng 14) sau đó chúng ta bấm vào `Debug`

![](https://images.viblo.asia/0c40af9d-f01e-4a46-a592-b6db7d0bf70d.png)


Chương trình sẽ chạy như bình thường cho đến khi chạm đến `BreakPoint`, VSCode sẽ hightlight dòng mà ta đặt `BreakPoint`

![](https://images.viblo.asia/f74517d0-215f-4e75-9659-5ab6d994b2ab.png)

Tại đây ta có thể quan sát một số giá trị như là giá trị ta nhập vào cho 2 biến a và b (có thể quan sát tại dòng 14 hoặc ở cửa sổ `Variables` bên trái). Cũng ở đây ta để ý sẽ thấy 1 thanh công cụ ở trên cùng bao gồm một số chức năng sau: `Continue, Step Over,
Step Into, Step Out, Restart, Stop ...`. Ta sẽ đi vào chi tiết từng chức năng

* `Continue`: Chương trình sẽ tiếp tục thực thi cho đến khi kết thúc hoặc gặp một `BreakPoint` khác.
* `Step Over`: Chương trình sẽ thực hiện dòng code ta đang đứng và tạm dừng tại dòng code tiếp theo (Trong trường hợp của tôi ở đây, sau khi bấm Step Over thì chương trình sẽ thực hiện method Add, in ra màn hình, sau đó tạm dừng tại dòng thứ 15).
* `Step into`: cho phép chương trình nhảy vào method đang được gọi (Trong trường hợp này, sau khi bấm Step into, chương trình sẽ nhảy vào một loạt các method của jdk trước rồi sau đó mới nhảy vào method Add và dừng ở dòng thứ 24). Đây là một điều bất tiện so với intelij khi mà sử dụng step into trong intelij, chúng ta có thể lựa chọn sẽ nhảy vào method nào, từ đó bỏ qua các method chúng ta không cần quan tâm đến. Còn trong vs code, ta phải đi lần lượt theo thứ tự thực hiện của chương trình.
*  `Step Out` sẽ thực thi xong method hiện tại và sau đó dừng tại nơi method trả về kết quả. Để rõ ràng hơn, nếu ta bấm Step out khi ta đang ở main() thì chương trình sẽ thực hiện và dừng, ngược lại nếu ta bấm step out khi đang ở trong Add method, thì method Add sẽ được thực hiên xong và chương trình quay về tạm dừng ở dòng 14.

Bây giờ ta sẽ đến phần hay ho hơn này. 

# Remote debug java với Visual Studio Code
## Tạo project và build jar file
Đầu tiên, chúng ta sẽ tạo một project java bằng cách bấm nút sau:
![](https://images.viblo.asia/c34e5332-0f56-4cde-aefb-d2e4040d03b6.png)

Lúc này ta có nhiều lựa chọn như tạo project spring boot, maven hay gradle. Ở đây, để đơn giản, tôi tạo console project mà thôi. 

![image.png](https://images.viblo.asia/8ba65199-96d7-450d-8651-a13f897c4680.png)

Sau khi ta tạo xong project, kết quả đạt được sẽ như hình trên. Các bạn sửa lại class App với nội dung như file Test.java mà mình đã để ở phần đầu. Tiếp theo chúng ta sẽ build project này thành file jar. 

![](https://images.viblo.asia/933f9d75-73b4-4c45-bd20-b517c80a5dd8.png)

![image.png](https://images.viblo.asia/2c10a564-c5bd-484c-bb4c-c22f6a6385ca.png)

Build jar thành công chúng ta sẽ thấy file Test.jar xuất hiện trong folder như sau

![image.png](https://images.viblo.asia/f43b2fb0-ac77-4b2b-9fdf-0824e29cb11f.png)

## Remote debug

Một nhược điểm của VsCode khi thực hiện remote debug là chúng ta phải có đầy đủ source code của chương trình thì ta mới có thể thực hiện debug được. Nếu chúng ta chỉ có file jar, thì chúng ta sẽ không remote debug ứng dụng được, khi đó intelij sẽ là lựa chọn thích hợp hơn.

Đầu tiên chúng ta cần tạo config cho việc remote debug bằng cách bấm vào `Run and Debug` sau đó click vào `create a launch.json file`

![](https://images.viblo.asia/6d2fb08b-8250-4afa-b387-b25642c8f8d3.png)

Tiếp theo chúng ta click vào `Add Configuration`  và lựa chọn `Java: Attach to remote Program`.

![](https://images.viblo.asia/48385703-1c1a-471d-940a-9a6db9928bae.png)

Config sẽ hiện ra, bạn sẽ cần điền một số thông tin như sau:

* hostName: là địa chỉ ip của máy chạy server bạn muốn debug (ở đây mình chạy trên máy của mình luôn nên sẽ là localhost)
* port: là cổng debug mà mình cài đặt để có thể remote debug (ở đây mình để là 5005)

![image.png](https://images.viblo.asia/2e1862b8-c18c-4655-b8e7-f0dfa9658aa0.png)

Bây giờ ta đã cấu hình cho VsCode thành công. Bây giờ ta sẽ chạy file jar mà ta tạo ra từ bước trước với option debug được bật lên.

```
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar .\Test.jar
```

Sau khi chạy lên ta nhận được thông báo `Listening for transport dt_socket at address: 5005` là chương trình đã sẵn sàng remote debug ở cổng 5005. 

Bây giờ ta tiến hành đặt breakpoint sau đó click vào `Run and Debug` tiếp theo click vào `Attach to remote Program`

![](https://images.viblo.asia/639dcfb0-8a8c-4efe-87bb-8a48bbaa8113.png)

Như vậy là ta đã debug thành công. Các bước tiếp theo để debug sẽ như phần đầu của bài viết.

![image.png](https://images.viblo.asia/761ec312-b306-4bcc-a6a5-8f02bbe0be8d.png)

Cảm ơn các bạn đã đọc bài viết. Nếu có chỗ nào sai sót các bạn có thể cho mình biết để làm bài viết được tốt hơn.