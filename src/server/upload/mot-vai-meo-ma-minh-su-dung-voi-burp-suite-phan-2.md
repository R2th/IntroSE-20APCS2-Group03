Bài này là bài nối tiếp về một bài mà mình đã viết tại [Một vài mẹo mà mình sử dụng với Burp Suite](https://viblo.asia/p/mot-vai-meo-ma-minh-su-dung-voi-burp-suite-GrLZDGowKk0). Bài đầu tiên mình đã viết về một vài tips và trick mình hay sử dụng với Burp Suite mặc định rồi, bài này mình sẽ viết về một vài extensions của Burp Suite mà mình hay dùng nhé ;)

## Burp Extensions
![image.png](https://images.viblo.asia/3bff8390-4cc6-4510-aec5-b8710c4a88ca.png)

Đây là một hình chụp nhanh các extension trong Burp Suite của mình, hiện tại thì vài cái thì hay dùng, vài cái thì xài rồi thôi không xài nữa, mình chỉ điểm qua những cái mà mình cảm thấy hay và mọi người có thể dùng nó nhé :D

#### Autorize
Về extension này thì mình đã có một bài viết tại [Tìm kiếm các lỗi IDOR, chưa bao giờ lại dễ đến thế với extension Autorize](https://viblo.asia/p/tim-kiem-cac-loi-idor-chua-bao-gio-lai-de-den-the-voi-extension-autorize-gDVK2z02KLj), extension này hỗ trợ khá hiệu quả trong việc tìm kiếm IDOR của các project pentest mình tham gia. Mình luôn luôn bật nó mỗi khi pentest dự án, tuy nhiên một điều khá phiền toái là nó sẽ tạo ra data duplicate nếu 2 user đều có thể tạo được data. Khắc phục điều này thì bạn có thể thêm black rules, đến cái URI đó thì k test là được :D

![](https://images.viblo.asia/full/f9394d44-d69a-4cac-b581-b2f9f794a753.png)

#### Turbo Intruder
![image.png](https://images.viblo.asia/042d20c8-22b0-451a-bc03-9cad4e390a7e.png)

Nếu bạn nào có test race condition rồi thì chắc hẳn có sử dụng qua Intruder rồi, còn Turbo Intruder là phiên bản nâng cấp của Intruder, mình có thể code payload bằng python để kiểm tra race condition hoặc làm việc khác với tốc độ kinh dị hơn rất nhiều. Turbo Intruder được James Kettle (aka @albinowax) tạo ra. Nó khá nhiều các code mẫu (example), hỗ trợ khá nhiều tính năng như Multi-host, Multiple parameters,... Bạn đọc có thể đọc thêm tại https://portswigger.net/research/turbo-intruder-embracing-the-billion-request-attack 

#### Copy As Python-Requests
Các bạn đã quá mệt mỏi vì phải import một đống dữ liệu bằng tay, các bạn đã nghĩ đến code tool bằng python để import cho nó nhanh. Đây rồi, extension này dành cho bạn, thật sự là nó đã cứu cánh mình không biết bao nhiêu lần :D.

Khi bạn cài extension này vào, muốn copy một request nào đó ra code python thì rất đơn giản, bạn chỉ cần chuột phải vào request đó -> Extensions -> Copy as Requests, sau đó paste ra 1 chiếc IDE hay editor nào mà mình yêu thích rồi code tiếp thôi 

Ví dụ, bạn có request như sau:
![image.png](https://images.viblo.asia/1147d81e-747d-4f12-813d-29d66df8a090.png)

Sau khi sử dụng extension ta sẽ được đoạn code 

![image.png](https://images.viblo.asia/6b3d5fb3-fcd8-4dd4-bf8f-e4514c518944.png)

Khá tiện mà phải không, tiết kiệm được rất nhiều thời gian code đó, nó cũng có một tùy chọn nữa là `Copy as request with session object` và chúng ta sẽ thu được thành quả như sau

![image.png](https://images.viblo.asia/5e7f0be1-fd24-4ff1-a81a-4d12797f586e.png)

Đỡ mệt mỏi, tiện thật luôn ấy.
#### BurpSuiteAutoCompletion và HopLa
Nếu bạn đã chán cái cảnh gõ payload bằng tay thì giờ đây chúng ta có extension suggest payload trên BurpSuite như suggest code trên IDE luôn mặc dù chưa xịn bằng :D

Bạn đọc có thể xem demo tại những đường link dưới nhé  
https://twitter.com/Synacktiv/status/1390630017957351432  
[https://twitter.com/_StaticFlow_/status/1367304795342721024](https://twitter.com/_StaticFlow_/status/1367304795342721024)

# Kết
Trên đây là một vài extension mà mình hay sử dụng với Burp Suite, tuy chưa hết nhưng mình sẽ cố gắng giới thiệu các extension hay và hữu ích trên Burp Suite cho các bạn, cảm ơn bạn đã đọc tới giây phút này ;).