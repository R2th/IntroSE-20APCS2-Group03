Nếu bạn là một Android Developer thì chắc hẳn đã nghe hay sử dụng một trong hai ngôn ngữ Java và Kotlin rồi, nhưng bạn đã thực sự hiểu rõ về những ngôn ngữ này chưa ? Bạn đã thực sự biết giữa 2 ngôn ngữ này có những điểm tương đồng và điểm khác biệt gì chưa ? Và điều quan trọng nhất là bạn có thực sự biết ngôn ngữ nào được Google khuyến khích dùng để phát triển ứng dụng trên hệ điều hành Android chưa ?

Ở bài này mình sẽ chia sẻ một vài thông tin mà mình tổng hợp được về sự khác nhau cơ bản giữa hai ngôn ngữ này.Hãy cùng mình tìm hiểu nhé:smile:

Trước hết chúng ta sẽ cùng nhau có cái nhìn tổng quan về 2 ngôn ngữ này nhé.

## 1: **Ngôn ngữ Java là gì ?**

Java là một ngôn ngữ OOP (lập trình hướng đối tượng) được sử dụng vào năm 1995.Java được phát triển tại sun microsystems sau đó được Oracle mua lại.Các chương trình hoặc ứng dụng được phát triển bằng Java sẽ thực thi trong JVM (máy ảo Java) và cũng chính vì điều này nên Java có tính chất viết 1 lần chạy mọi nơi.Mặc dù là một ngôn ngữ ra đời từ rất lâu rồi nhưng ngôn ngữ này vẫn được các lập trình viên ưu ái sử dụng để viết nên các ứng dụng máy chủ dùng trong dịch vụ tài chính, Ứng dụng Web, Big Data... Và đặc biệt Java là lựa chọn chính của hầu hết các nhà phát triển khi phát triển ứng dụng Android vì bản thân Android được viết bằng Java.

Đó là một số thông tin về Java, vậy còn Kotlin thì như thế nào ? Chúng ta tiếp tục tìm hiểu nhé.

## 2: **Ngôn ngữ Kotlin là gì?**

Kotlin là một ngôn ngữ lập trình mới được phát triển bởi các lập trình viên từ IDE Jet Brains, xử lý một số tính năng hiện đại của nó. Nó đã xuất hiện lần đầu tiên vào năm 2011 và phát hành chính thức vào năm 2016 và nó là một ngôn ngữ mã nguồn mở. Kotlin cũng là một ngôn ngữ kiểu tĩnh - statically typed programming language như Java, C ++.Đó là những ngôn ngữ mà các variable cần phải định danh trước khi được sử dụng. Có nghĩa là variable cần phải khai báo và khởi tạo trước.Chúng ta có thể xem ví dụ sau để rõ hơn :

![](https://images.viblo.asia/ce52321a-30d4-42fc-bbd0-28811f41f215.png)

Trong ví dụ trên ta có thể thấy mọi biến trong cả hai ngôn ngữ Java và Kotlin đều phải được khai báo và khởi tạo trước khi nó được sử dụng và gọi lại.

Tiếp tục nào!

Kotlin cũng dựa trên JVM ( Máy ảo Java ) giống như Java tuy nhiên nó có thể được biên dịch sang JavaScript , Android ...Có thể nói rằng Kotlin là một sự kế thừa và phát triển từ Java.Đặc biệt chuyển từ Java sang Kotlin rất dễ dàng, chúng ta chỉ cần cài đặt một Plugin. Trong bài phát biểu chính của Google I / O, Google đã thông báo rằng họ đã đưa Kotlin trở thành ngôn ngữ được hỗ trợ chính thức để phát triển ứng dụng Android.

Vậy điều gì khiến Google chọn Kotlin làm ngôn ngữ chính thức để phát triển ứng dụng Android mà không chọn Java ?

## 3: **Những khác biệt chính giữa Java và Kotlin.**

### 3.1:  * **Kotlin ngắn gọn và linh hoạt hơn Java:**

Kotlin giảm đáng kể số lượng dòng code mà bạn cần phải viết bởi cú pháp ngắn gọn hơn Java rất nhiều.Nếu như với bên Java để tạo một Class VideoGame thì lập trình viên cần tạo ra một đống code với các phương thức getters, setters, equals(), hashCode(), toString() và copy() thì với Kotlin tất cả các phương thức trên đều được gói gọn trong 1 dòng code của Data Class:

![](https://images.viblo.asia/ac9fbf85-b8b1-4abc-9259-52b6d47010ae.png)

Với đoạn code trên Kotlin đã tự động implement các phương thức mà mình vừa kể trên ở bên Java code.Thực sự sự là ngắn gọn đi rất nhiều đúng không ?

###  3.2: * **Khai báo biến trong Kotlin và Java.**

 Kotlin có sự hỗ trợ của kiểu suy luận có nghĩa là chúng ta không cần chỉ định kiểu dữ liệu của biến một cách rõ ràng trong khi trong Java chúng ta cần chỉ định rõ ràng.
 
 ![](https://images.viblo.asia/7b19c8ed-1f9a-41ac-849a-e7eca11202d7.png)
 
 ![](https://images.viblo.asia/8995cee9-4b52-4150-9799-032c72740733.png)


Phía trên là ta có thể thấy một số cách khai báo biến trong Kotlin.Bạn có thấy điều gì khác biệt so với khai báo biến trong  Java code không? Ngoài việc trong Kotlin lập trình viên không bắt buộc phải chỉ định dữ liệu cho biến như bên Java nữa thì ta có thể thấy rằng Kotlin xuất hiện 2 kiểu dữ liệu mới đó là var và val.Var là đại điện cho Variable tức là các biến khai báo kiểu var có thể thay đổi được giá trị nhưng ngược lại val lại đại điện cho Value tức là các biến khai báo kiểu val sẽ là final và không thể thay đổi giá trị được.


### 3.3:  * **Biến Null**

 Trong Kotlin, chúng ta không thể gán giá trị null cho biến hoặc trả về giá trị, nếu chúng ta thực sự muốn gán thì chúng ta có thể khai báo một biến với cú pháp đặc biệt.Hãy nhìn rõ hơn qua ví dụ sau:
 
 Khai báo biến null không hợp lệ trong Kotlin :
 ![](https://images.viblo.asia/275855cb-f0ac-43fe-9895-841822019a4c.png)
 
 Khai báo biến null hợp lệ trong Kotlin :
![](https://images.viblo.asia/9eca9f70-a35e-4d9b-9739-06ecb5d14314.png)

Sử dụng Kotlin giúp lập trình viên tránh được 1 vấn đề muôn thuở đó là NullPointerExeption.Trong khi trong Java chúng ta có thể gán giá trị null nhưng khi chúng ta cố gắng truy cập các đối tượng trỏ đến giá trị null nêu ra một ngoại lệ.

Kotlin có thể thay thế cho Java bất kể sự khác biệt giữa Java và Kotlin. Chúng ta có thể gọi mã Kotlin trong Java và mã Java trong Kotlin. Vì vậy, chúng ta có thể có cả hai lớp Java và Kotlin cạnh nhau trong một dự án và biên dịch mà không gặp bất kỳ vấn đề nào. Sau khi biên dịch, chúng tôi không thể tìm thấy lớp nào được viết bằng Java hoặc Kotlin.

###  3.4 * **Extension Functions ( Mở rộng Hàm )**

Trong Java, Nếu chúng ta muốn mở rộng chức năng của lớp hiện có, chúng ta cần tạo một lớp mới và kế thừa lớp cha. Vì vậy, các chức năng mở rộng không có sẵn trong  Java tuy nhiên ở Kotlin thì điều này đã được cải thiện nhanh hơn bằng các Extension Functions.Kotlin cung cấp cho các nhà phát triển khả năng mở rộng một lớp hiện có với chức năng mới. Chúng ta có thể tạo các hàm mở rộng bằng cách thêm tiền tố tên của một lớp vào tên của hàm mới.Chúng ta sẽ thấy rõ hơn trong ví dụ sau:

Ở đây ta có class CheckNumber với 1 funtion kiểm tra số lớn hơn 10

![](https://images.viblo.asia/cdc8e3de-ebf9-4c04-ad7a-00409df6a96d.png)

Câu hỏi đặt ra là điều gì xảy ra nếu muốn tạo thêm 1 hàm kiểm tra số nhỏ hơn 10 ở class CheckNumber ? Với Java thì mình đã giải thích ở trên,nhưng với Kotlin ta có 1 cách ngắn gọn hơn rất nhiều đó là:

![](https://images.viblo.asia/06bb765f-9845-4b63-b46d-661a306e4f3d.png)
Sử dụng Extention funtion lập trình viên có thể tạo mới hoặc overide các hàm có sẵn của lớp cha mà không cần sửa đổi class cha.

### 3.5: * **Xử lí bất đồng bộ**

Java cung cấp khả năng tạo multithread trong nền để xử lí các tác vụ phía background nhưng để quản lý chúng là một nhiệm vụ rất phức tạp.Trong khi đó ở Kotlin, chúng ta có thể tạo nhiều luồng để chạy các hoạt động chuyên sâu lâu dài dưới có hỗ trợ coroutines.Coroutines chỉ được giới thiệu như là một tính năng thử nghiệm của Kotlin 1.1 và họ cung cấp cho các developers khả năng viết ngắn gọn hơn, mã không đồng bộ. Ở Java Thread rất hạn chế vì ta biết đến Thread Pool, nó sẽ hạn chế số lượng Thread ở 1 thời điểm,còn coroutines thì gần như là hàng free, hàng nghìn coroutines có thể được bắt đầu cùng một lúc. Chúng cho phép chạy một đoạn mã không đồng bộ theo cách tương tự như bạn thường chạy một mã đồng bộ. Điều này giúp loại bỏ việc phải đối phó với cú pháp phức tạp và dài dòng khi viết code bất đồng bộ, nó rất điển hình khi xử lý các ứng dụng trong mobile

###  3.6: * **Functional Programming**

Functional programming là một dạng mô hình lập trình (FP – Gọi là lập trình hàm), cũng giống như lập trình tuần tự hay lập trình hướng đối tượng (OOP). Functional programming là một phương pháp lập trình dựa trên các hàm toán học (function), tránh việc thay đổi giá trị của dữ liệu. Nó có nhiều lợi ích như : các khối xử lý độc lập dễ tái sử dụng, thuận lợi cho việc thay đổi logic hoặc tìm lỗi chương trình.

Java không có hỗ trợ Functional Programming cho đến Java 8.Kotlin thì khác, nó là sự kết hợp giữa ngôn ngữ lập trình thủ tục và chức năng( procedural and functional programming language ) bao gồm nhiều phương thức hữu ích như lambda, operator overloading, higher-order functions, v.v.Điều này khiễn Kotlin trở nên linh hoạt hơn.

### 3.7: * **Thời gian biên dịch** 
 
Thời gian biên dịch của Java nhanh hơn 15-20% so với thời gian biên dịch Kotlin.Nhưng như chúng ta biết, hầu hết thời gian chúng ta cần incremental builds như thay đổi một đoạn code có sẵn và build lại chúng, và deploy không ngừng.

Theo quan điểm này, Kotlin mất thời gian biên dịch như Java, thâm chí còn nhanh hơn 1 chút

### 3.8:  * **Hỗ trợ đa nền tảng**

Ngôn ngữ Java có thể sử dụng để phát triển nhiều lĩnh vực khác nhau như Web, Ứng dụng nhúng, BigData ...Trong khi Kotlin thì chủ yếu sử dụng với phát triển ứng dụng trên nền tảng  Android.

## 4: **Kết Luận**

Thông qua bài viết của mình, hy vọng mọi người có thể có thêm một vài thông tin về những sự khác biệt cơ bản giữa Java và Kotlin cũng như hiểu được lí do vì sao Google chọn Kotlin là ngôn ngữ chính để phát triển ứng dụng Android.
Bài viết mình có tham khảo một số thông tin từ https://www.educba.com/java-vs-kotlin/

Xin cảm ơn!