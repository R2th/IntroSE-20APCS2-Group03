<h1>Đặt vấn đề</h1><br>
* IOT (Internet of things) là thuật ngữ bạn được nghe rất nhiều trong thời gian gần đây.Chúng là gì? Chúng làm được gì?<br>
* Câu trả lời của mình là rất nhiều.Bạn thử tượng tưởng,mùa hè nóng nực,bước chân về nhà trong sự mệt mỏi của khói bụi kẹt xe,thì chào đón bạn bằng không khi mát làm của chiếc điều hòa đã được bật từ trước đó 30 phút,
nhưng câu hỏi quan tâm "Anh về rồi à.Có mệt không anh?" từ cô trợ lí ảo "xinh đẹp",nước đã được chuẩn bị bạn chỉ cần thả minfnh,...Thật thú vị phải không nào.Chúng đều được vận hành một cách trơn chu.Vậy tại sao bạn lại không tự tay làm cho mình hệ thống thông minh như vậy? Có khó không? Mình nghĩ là có,nhưng hãy bắt đầu từ những thứ đơn giản nhất.Series này,mình xin chia sẻ các điều khiển mọi thiết bị một cách thông minh nhất!<br>
<h1>Chuẩn bị</h1><br>
1. 1 Module thu phát Wifi ESP8266 NodeMCU Lua CP2102 <br>
<img src="https://nshopvn.com/wp-content/uploads/2019/03/module-thu-phat-wifi-esp8266-nodemcu-lua-cp2102-MD4D-2020-600x600.jpg" style="width:100px;height:100px;">

2. 1  Module 1 Relay Với Opto Cách Ly Kích H/L (5VDC) <br>
<img src="https://ae01.alicdn.com/kf/H1a013c8fb1714b4fa2782b3c44b7eeffX/8-chi-c-B-C-L-p-Module-Relay-5V-1-Module-Relay-v-i-Optocoupler.jpg_q50.jpg" style="width:100px;height:100px;">

3. 1 Dây cáp mini Usb, cáp nano (Cáp Usb to Mini Usb)<br>
 <img src="https://nshopvn.com/wp-content/uploads/2019/03/day-cap-mini-usb-cap-nano-85GZ-2020-600x600.jpg" style="width:100px;height:100px;"><br>

4. Đương nhiên bạn có cái máy tính đã cài [Arduino](https://www.arduino.cc/) ,và bạn biết lập trình(cái này thì đương nhiên quá rồi! Hehe)
 
 <h1> Lắp đặt phần cứng</h1>
 <img src="https://hackster.imgix.net/uploads/attachments/924941/electronic-scheme_pOW1sTLnUt.jpeg" style="width:100px;height:100px;"><br>
Theo như hình vẽ,bạn chỉ cần nối 1 chân 3v,1 chân GND và 1 chân tín hiệu(chân số bao nhiêu cũng được) trên modul  NodeMCU với 3 chân tương ứng là VCC,GND và IN.<br>
Với 1 thiết bị điện bạn cần nối 2 dây thì nó mới hoạt động. Bạn  cần cho 1 dây nguồn điện vào cồng  COMMON và 1 dây thiết bị vào 1 cổng khác trong 2 cổng còn lại.còn 1 dây khác thiết bị thì nối thằng vào nguồn điện.<br>
Oke đơn giản vậy thôi.Trong bài tiếp theo chúng ta sẽ đến bước lập trình.Các bạn nhớ theo dõi nhé!
<h1>Demo</h1>
Để cho các bạn hứng thú,mình để kết quả mà bạn có thể làm được sau khi đọc xong series này!<br>

{@embed: https://youtu.be/4UOHLaBUWqI}