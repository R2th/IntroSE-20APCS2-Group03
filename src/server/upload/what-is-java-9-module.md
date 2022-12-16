Như các bạn đã biết, Oracle phát hành JDK9 vào tháng 9 năm 2017 với 3 tính năng lớn đó là:
- Java Module System (Jigsaw Project)
- Java REPL
- Milling Project Coin
 
Tuy nhiên trong bài viết dưới đây tôi chỉ nói về Jigsaw project, một sự thay đổi lớn nhất trong Java9, dự án giới thiệu một khái niêm hoàn toàn mới trong Java đó là Module System.
Jigsaw là dự án rất lớn và uy tín của Oracle Corp trong bản phát hành Java SE 9. Ban đầu họ đã bắt đầu dự án này như một phần của bản phát hành Java SE 7. Tuy nhiên với những thay đổi lớn, nó bị hoãn lại với Java SE 8 rồi lại bị trì hoãn. Bây giờ nó sắp phát hành với Java SE 9 vào tháng 9 năm 2017.

**Mục tiêu chính của dự án Jigsaw:**

* The Modular JDK: Như chúng ta đã biết, hệ thống JDK hiện tại quá lớn. Vì vậy, họ đã quyết định chia JDK thành các mô-đun nhỏ để có được một số lợi ích (Chúng tôi sẽ thảo luận chúng sớm trong các phần sắp tới).

* Modular Source Code: Các tệp jar mã nguồn hiện tại quá lớn, đặc biệt là rt.jar quá lớn. Vì vậy, họ sẽ chia mã nguồn Java thành các mô-đun nhỏ hơn.

* Modular Run-Time Images: Mục tiêu chính của tính năng này là “Tái cơ cấu DK and JRE run-time images để chứa các mô-đun”.

* Encapsulate Most Internal APIs: Mục tiêu chính của tính năng này là “Hầu hết các API bên trong của JDK không thể truy cập được theo mặc định nhưng để lại một vài API quan trọng, được sử dụng rộng rãi có thể truy cập”.

* Java Platform Module System: Mục tiêu chính của tính năng này là "Cho phép người dùng tạo các mô-đun của họ để phát triển các ứng dụng của họ".

* jlink: The Java Linker:  Mục tiêu chính của Công cụ jlink này là "Cho phép người dùng tạo executable cho các ứng dụng của họ".

Nếu bạn không hiểu những điều này rõ ràng, đừng lo lắng. Chúng tôi sẽ thảo luận sâu về các khái niệm này với một số ví dụ hữu ích trong các phần sắp tới và cũng trong các bài viết sắp tới của tôi.

**Vấn đề của hệ thống Java hiện tại?**

Trong phần này, chúng ta sẽ thảo luận về "Tại sao chúng ta cần tới Module System trong Java SE 9" có nghĩa là ta nói tơi các vấn đề của Hệ thống Java Hiện tại. Các hệ thống Java SE 8 hoặc cũ hơn có các vấn đề sau trong việc phát triển hoặc phân phối các ứng dụng Java Based.

* Vì JDK quá lớn nên khó có thể giảm kích thước xuống các thiết bị nhỏ. Java SE 8 đã giới thiệu 3 loại cấu hình nhỏ gọn để giải quyết vấn đề này: compact1, compact2 và compact3. Nhưng nó không giải quyết vấn đề này.
* Các tệp JAR như rt.jar vv quá lớn để sử dụng trong các thiết bị và ứng dụng nhỏ.
* Vì JDK quá lớn, các ứng dụng hoặc thiết bị của chúng tôi không thể hỗ trợ Hiệu suất tốt hơn.
* Không có đóng gói mạnh trong hệ thống Java hiện tại vì công cụ sửa đổi truy cập "công khai" quá mở. Mọi người đều có thể truy cập nó.
* Như JDK, JRE quá lớn, rất khó để kiểm tra và duy trì các ứng dụng.
* Vì công chúng quá cởi mở, họ không được tránh việc truy cập vào một số API không quan trọng bên trong như mặt trời. *, * .internal. * V.v.
* Vì người dùng cũng có thể truy cập các API nội bộ, Bảo mật cũng là vấn đề lớn
* Ứng dụng quá lớn.
* Một chút khó khăn của nó để hỗ trợ ít khớp nối giữa các thành phần.
.
Để giải quyết tất cả những vấn đề này, Oracle Corp sẽ phát hành hệ thống Java Module trong bản phát hành Java SE 9.

**Ưu điểm của Module System trong Java SE 9**

Hệ thống mô-đun trong Java SE 9 sẽ cung cấp các lợi ích sau:

* Vì Java SE 9 sẽ phân chia JDK, JRE, JAR, vv thành các mô-đun nhỏ hơn, chúng ta có thể sử dụng bất kỳ mô-đun nào chúng ta muốn. Vì vậy, rất dễ dàng để mở rộng ứng dụng Java xuống các thiết bị nhỏ.
* Dễ kiểm tra và bảo trì.
* Hỗ trợ hiệu suất tốt hơn.
* Vì công chúng không chỉ là công khai, nó hỗ trợ đóng gói rất mạnh. (Đừng lo lắng một khái niệm lớn của nó. Chúng tôi sẽ khám phá nó với một số ví dụ hữu ích sớm).
* Chúng tôi không thể truy cập vào API không quan trọng bên trong nữa.
* Mô-đun có thể ẩn các chi tiết không mong muốn và nội bộ rất an toàn, chúng tôi có thể bảo mật tốt hơn.
* Ứng dụng quá nhỏ vì chúng tôi chỉ có thể sử dụng những mô-đun mà chúng tôi muốn.
* Dễ dàng của nó để hỗ trợ ít khớp nối giữa các thành phần.
* Dễ dàng hỗ trợ Nguyên tắc Trách nhiệm Duy nhất (SRP).

Chúng tôi sẽ sớm khám phá tất cả các khái niệm này.

**So sánh JDK 8 và JDK 9**

Chúng ta biết phần mềm JDK có chứa những gì. Sau khi cài đặt phần mềm JDK 8, chúng ta có thể thấy vài thư mục như bin, jre, lib, vv trong thư mục Java Home.
Tuy nhiên, Oracle Corp đã thay đổi cấu trúc thư mục này một chút khác nhau như hình dưới đây:

![](https://images.viblo.asia/37515bfc-fb52-4308-8850-af8b1eb81c7d.png)

Cấu trúc thư mục JDK 8:

![](https://images.viblo.asia/e624526c-2a21-46e5-839e-f3bc1842418f.png)

Cấu trúc thư mục JDK 9:

![](https://images.viblo.asia/f50e8820-7717-4692-b230-3a8760953a0d.png)

Ở đây JDK 9 KHÔNG chứa JRE. Trong JDK 9, JRE được tách ra thành một thư mục phân phối riêng biệt. Phần mềm JDK 9 chứa một thư mục mới “jmods”. Nó chứa một tập hợp các mô-đun Java 9 như hình dưới đây.

Trong JDK 9, Không có rt.jar và No tools.jar

![](https://images.viblo.asia/79ea6eb3-418d-4783-9a19-e1b67f7beba1.png)

Thư mục “jmods” có sẵn tại $ {JAVA_HOME} / jmods. Chúng được gọi là Module JDK.

**Vậy Module System trong Java9 là gì ?**

Module là bộ sưu tập tự mô tả code, dữ liệu và một số tài nguyên. Nó là một tập hợp các package, type có liên quan (class, astract class, interface, vv) với code, data và resource. Mỗi Module chỉ chứa một tập hợp các mã và dữ liệu có liên quan để hỗ trợ Single Responsibility (Functionality) Principle (SRP).

![](https://images.viblo.asia/21162508-67db-4e8a-b770-3a57c27060b5.png)

Hiện tại, Hệ thống mô-đun Java 9 có 95 mô-đun trong Early Access JDK. Oracle Corp đã tách các JDK jars và Java SE Specifications thành hai bộ Modules.
* Tất cả các Mô-đun JDK bắt đầu bằng “jdk. *”
* Tất cả các thông số kỹ thuật của Java SE Các mô-đun bắt đầu bằng “java. *”

Hệ thống Module Java 9 có module “java.base” . Nó được gọi là mô-đun cơ sở. Đây là một mô-đun độc lập và KHÔNG phụ thuộc vào bất kỳ mô-đun nào khác. Theo mặc định, tất cả các Mô-đun khác phụ thuộc vào mô-đun này. Đó là lý do tại sao mô-đun “java.base” còn được gọi là Module mẹ của Java 9. Đây là mô-đun mặc định cho tất cả các Module JDK và Module do người dùng xác định.

**So sánh các ứng dụng Java 8 và Java 9**

Chúng ta đã phát triển nhiều ứng dụng Java bằng cách sử dụng Java 5, 6,7 hoặc 8. Chúng ta biết cách một ứng dụng Java 8 hoặc các ứng dụng trước đó trông như thế nào và nó chứa những gì.
Tóm lại, tôi đã mô tả một ứng dụng Java 8 trong một sơ đồ như hình dưới đây:

![](https://images.viblo.asia/7b56a63c-2bd7-4751-badc-02199ad2b7cd.png)

Trong một ứng dụng Java 8 hoặc trước đó, thành phần cấp cao nhất là một packge. Nó nhóm một tập hợp các loại liên quan thành một nhóm. Nó cũng chứa một tập hợp các tài nguyên.

Các ứng dụng Java 9 không có nhiều khác biệt với điều này. Nó vừa giới thiệu một thành phần mới có tên là “Module”, được sử dụng để nhóm một nhóm các gói có liên quan thành một nhóm. Và một thành phần mới nữa mô tả mô-đun (“module-info.java”). 

Phần còn lại của ứng dụng giống như các ứng dụng phiên bản cũ hơn như được hiển thị bên dưới.

![](https://images.viblo.asia/758ef69b-10cd-4957-a246-7349c38b08cb.png)

Giống như các ứng dụng Java 8 có các package như là một thành phần mức cao nhất, các ứng dụng Java 9 có Module là các thành phần mức cao nhất.

*LƯU Ý:*  Mỗi Module Java 9 có một và chỉ một Module và một Module mô tả. Không giống như các package trong Java 8, chúng tôi không thể tạo nhiều mô đun thành một Module duy nhất.

Qua nội dụng trên tôi nghĩ rằng các bạn đã đủ hiểu những điều cơ bản về Java 9 Module System. Chúng ta sẽ thảo luận về “Module Descriptor là gì”  và “Cách phát triển các Module trong Java” trong các bài viết sắp tới của tôi.