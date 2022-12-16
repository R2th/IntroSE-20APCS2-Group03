<h1>Tổng quan </h1>
Trong phần 1,mình đã giới thiêu về sơ qua phần cứng, cũng như ghép nối.<br>
Trong phần này mình sẽ giới thiệu cách thức hoạt động của từng phần!<br>
Oke,Let's go!
<h1>Mô hình hoạt động</h1>

![](https://images.viblo.asia/bbc45be2-ee7a-4051-b696-0f061cee9048.jpg)
1. Đây là mô hình mình dùng trong series này.Hiện có rất nhiều cách triển khai khác.Nhưng ở mức độ học tập,"mì ăn liền" thì mình chọn cách này! Sau này sẽ có những series khác nhé!<br>
2. Cùng đi vào cách thức hoạt động nào.<br>
    1. Linh kiện phần cứng mà mình liệt kê ở phần 1 chúng ta coi như "end-user",nó subscriber một server.Với giá trị nào ta bật thiết bị,với giá trị nào ta sẽ tắt (cái này trong code),vì vậy bài toán quay về làm cách nào thay đổi giá trị đó? Oke,nếu bạn hiểu thì bạn đã biết cách để chúng ta "cách ly" được "phần cứng" và "phần mềm"
    2. Làm sao để thay đỏi giá trị nào đó trên server? Chắc các bạn đã hình dung hơn rồi.thông qua API thôi,đơn giản mà...Có API rồi,thì chúng ta làm  App mobile,Web,.. để điều khiển thì quá bình thường đúng không?<br>
    3. Ví dụ trong mô hình này.mình dùng Realtime Database service của Firebase-cái này chắc bạn nào cũng từng nghe qua.Mình để con ESP8266 subscriber giá tri trường status trên đó.Với **status =0** điều khiển relay hoạt động -> sáng đèn.với **status =1** điều khiển relay ngắt -> tắt đèn.Sau đó mình xây dưng App Android,Web,Google Assistant,.. để tác động vào giá trị **status** này(cái này đọc doccument là dễ dàng rồi.hehe)
<h1>Tổng kết</h1>
Trong phần này,mình đã giới thiệu cách hoạt động cơ bản và đơn giản nhất của một thiết bị gọi là smart-điều khiển qua internet,wifi.
Trong phần tiếp theo,mình sẽ giới thiệu cách code trên ESP8266 để tắt bật đơn giản qua wifi.