Bắt đầu từ câu hỏi của một chị đồng nghiệp về việc test performance trên mobile bằng Jmeter, giật mình nhận ra mình chưa từng thử test performance trên mobile lần nào :v liệu nó có giống với test trên PC hay ko ? liệu có phải cài Jmeter trên điện thoại giống với trên PC ko nhỉ ? tìm trên viblo không thấy bài nào đề cập đến vấn đề này nên mình quyết định tìm hiểu và chia sẻ cách để thực hiện performance test trên mobile .

### **I - Cài Đặt**

-----



Vấn đề đầu tiên là bộ cài Jmeter . Tất nhiên ta không cài trên mobile devices mà sẽ cài trên PC trước. JMeter là một ứng dụng Java thuần túy 100%, nó đòi hỏi một JVM 7 tương thích hoàn toàn hoặc cao hơn. Nên các bạn cần cài đặt Java (SDK) và tool Jmeter trên PC.

+ Bạn có thể tải và cài đặt phiên bản mới nhất Java (SDK) [từ đây](http://www.oracle.com/technetwork/java/javase/downloads/index.html) . Chọn tab download rồi chọn bộ cài Java (SDK) , tải về xong click Next -> Next -> Next ...

![](https://images.viblo.asia/8a08fc69-83b8-4521-8749-ff48ce584eb9.jpg)

+ Bạn có thể tải và cài đặt phiên bản mới nhất JMeter [từ đây](https://jmeter.apache.org/download_jmeter.cgi).  Chọn apache-jmeter-4.0.zip , tải về xong giải nén là chạy được luôn . File chạy Jmeter trong thư mục bin mới giải nén tên ApacheJMeter.jar ấy 

![](https://images.viblo.asia/4613fab5-5942-46ec-9ef3-5affcc1d9a6c.jpg)

Cài đặt thành công, khi chạy file ApacheJMeter.jar bạn sẽ thấy giao diện Jmeter như bên dưới 

![](https://images.viblo.asia/5f96e808-305e-4108-90f1-a5edc7d8ecfa.jpg)

### **II - Kết nối với mobile devices**

-----



Như bình thường bạn test performance trên PC thì tới đây là đủ. Còn muốn test trên các thiết bị mobile, table thì còn phải qua bước kết nối với mobile/table devices nữa . Kết nối trên các thiết bị Android thì đơn giản hơn nên mình sẽ hướng dẫn kết nối với các thiết bị iOS , tí nữa có gì khác biệt thì mình sẽ đề cập sau. 

1. Trên máy tính, các bạn chạy tool Jmeter , click chuột phải vào Test Plan -> Add -> Non-Test Elements -> HTTP(S) Test Script Recorder
2. Sau khi add HTTP(S) Test Script Recorder thì các bạn config như bên dưới:
+ Port: chọn cổng để kết nối, thường thì người ta dùng 8888, hoặc 1 số trang thì thấy để 2020, mình thử với 6969 xem sao, hình như không quan trọng lắm
+ Targer Controller: Test Plan > HTTP(S) Test Script Recorder

![](https://images.viblo.asia/e295515e-1b82-40d4-8218-f3541758ae29.jpg)

3. Tiếp theo click nút Start trên HTTP(S) Test Script Recorder , bạn sẽ thấy một thông báo như hình bên dưới , có chi quan trọng tí nữa mình note ở dưới rồi.

![](https://images.viblo.asia/143a9d4f-2930-440b-b8cc-899347cd5f0d.jpg)

Click OK xong thì các bạn có thể nhấn Stop luôn, bước này để mình tạo file CRT thôi.

4. Vào thư mục bin của Jmeter, các bạn sẽ thấy xuất hiện thêm 1 file có tên là ApacheJMeterTemporaryRootCA.crt . Chúng ta tiến hành cài đặt file CRT trên mobile bằng cách quăng nó vào mail rồi mở nó ra trên device. 

![](https://images.viblo.asia/91341287-b4d3-4ef4-b2e5-3733c93967ce.jpg)

Tap vào file thì nó chuyển thẳng đến Setting->Profile trên device, chọn Install - > Install -> Done thôi
![](https://images.viblo.asia/284dc583-8a50-49cd-b573-e4d60a0c31dd.jpg)

![](https://images.viblo.asia/1282400c-a8fe-4b32-91e6-cc4609ebe265.jpg)
Click vào More Details thì có thể xem được ngày hết hạn của file CRT.

Ở bước này có một số bạn copy file CRT vào máy nhưng không cài đặt vào Setting>Profile trên máy thì cũng không thể connect được nhé :) đã có trường hợp có bạn copy vào máy thôi đã nghĩ nhầm là cài đặt file CRT rồi, làm ngồi tìm hiểu nguyên nhân vì sao không connect được mệt nghỉ @_@

5. Tiếp theo các bạn tiến hành thiết lập Wifi trên device của bạn, đầu tiên phải bảo đảm PC/LAP và devices của bạn sử dụng chung một mạng wifi . Sau đó vào thiết lập Wifi trên device như bên dưới:
Setting -> Wifi ->Wifi details ( tap vào mạng wifi đang connect ấy )
+  Mục HTTP Proxy chọn Manual, phần server nhập IP của PC/LAP của mình, phần port thì điền số port trên Jmeter ở step 2 (6969)

![](https://images.viblo.asia/2b6ff840-ce73-442b-ad5e-6a4797699585.PNG)

IP của PC/LAP có thể tìm bằng cách: mở cmd-> chạy lệnh ipconfig -> tìm IPv4 address . Sẽ có trường hợp bạn thấy khá nhiều địa chỉ IPv4 như hình dưới, nhớ là chọn ở phần Wireless LAN adapter Wifi nhé , chọn nhầm không kết nối được đâu.

![](https://images.viblo.asia/b8cfb0b7-28f9-4ac0-b4e7-a47fad9c7dec.png)

6. OK, đến lúc trở lại với công cụ Jmeter rồi. Các bạn click nút Start trên HTTP(S) Test Script Recorder lại lần nữa sau đó thử chạy 1 App hoặc web bất kỳ trên device, nếu thấy xuất hiện các http request bên dưới HTTP(S) Test Script Recorder thì chứng tỏ PC/LAP của các bạn đã kết nối thành công đến device rồi nhé . Sau khi kết nối thành công thì các bạn có thể tiến hành mở App/Web cần test rồi thực hiện các thao tác test như bình thường, Jmeter sẽ record các request cần thiết để thực hiện test performance như bên dưới. 

![](https://images.viblo.asia/c8a20ec0-5b27-47a5-8c21-67014b9a3ae9.jpg)

* Kết nối với các thiết bị Android thì dễ hơn, các bạn không cần cài file CRT vào máy như iOS (bỏ step 4) , chỉ cần config Wifi như trên là được.

### **III- Một số lỗi, vấn đề thường gặp khi kết nối**

-----


 Đôi lúc, bạn làm đúng các step ở trên rồi nhưng Jmeter vẫn không bắt được các request trên mobile. Sau đây là một số các issue thường gặp

1. File CRT hết hạn. Thường thì mỗi CRT sẽ hết hạn sau 7 ngày. Nếu gặp trường hợp vậy thì bạn vào thư mục bin của Jmeter, sau đó xóa 3 file bên dưới, xóa xong làm lại cái step ở trên để tạo lại file CRT mới.

![](https://images.viblo.asia/77257c03-9776-4e06-95f3-a74cf7216b3e.png)

2. Bị nhầm địa chỉ IP khi config trên device. Như mình đã nói ở step 5, nhớ là chọn ở phần Wireless LAN adapter Wifi. Cái này mình từng bị nên nhắc lại.

3. Máy của bạn có thiết lập tường lửa trong các chương trình cài đặt chống vi-rút. Điều này hạn chế kết nối mạng khi thiết lập với proxy. Chỉ cần tắt tính năng bảo vệ tường lửa trong các chương trình cài đặt chống vi-rút.

4. Wifi bạn đang dùng bị chặn proxy hoặc sử dụng proxy riêng ( thường hay bị khi bạn sử dụng mạng của công ty ). Cách nhanh nhất là đổi sang mạng wifi khác, chạy ra quán cafe xài mạng public (yaoming) hoặc bật/tắt proxy của máy lên, hoặc chạy tập tin jmeter.bat từ command line với các tham số sau:

-H [proxy server hostname or ip address]

-P [proxy server port]

-N [nonproxy hosts] (e.g. *.apache.org|localhost)

-u [username for proxy authentication - if required]

-a [password for proxy authentication - if required]

Example: jmeter -H my.proxy.server -P 8000 -u username -a password -N localhost

Case này mình chưa bị nên chưa thử :v:

Đến đây mình xin dừng bài viết, phần sau mình sẽ demo hướng dẫn test performance trên mobile như thế nào.