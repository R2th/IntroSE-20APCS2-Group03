# Tự sự
Hồi đầu năm 2020, mình mới có order Taobao về được một em **RaspberryPi 4** để phục vụ công việc của mình (thực ra hồi đó mua chơi thôi, mang về nghịch cho vui). Em Pi 4 này khá mạnh, làm được đủ thứ trò, Ram 4GB DDR4, sử dụng nguồn 15W, chạy kiến trúc ARM 64-bit (Raspberry Pi OS bản chính thức vẫn đang chạy 32-bit, nếu bạn muốn sử dụng hết sức mạnh của con Pi 4 từ 4GB trở lên thì phải cài OS nào hỗ trợ 64-bit nhé). 

![](https://images.viblo.asia/008902c0-b62c-4cc6-9c99-698771711751.jpg)

Hồi đó mình mua combo cả case, fan tản nhiệt (có đèn led RGB lập lòe làm đèn ngủ cũng được), nguồn có công tắc khá tiện (mặc dù em Pi 4 này bây giờ mình chẳng tắt đi bao giờ), và quan trọng em này có sử dụng USB 3.0 ngon phết. Nếu anh em k thích tốc độ chậm chậm của thẻ nhớ thì cắm hẳn con SSD qua cổng USB 3.0 này chạy cho nó max công suất :heart_eyes: 

![](https://images.viblo.asia/817257b0-f54f-49a6-a0cc-c5996fb6a52f.jpg)

<div align="center">
Đây là em Pi 4 của mềnh đây nhé
</div>

# Một vài dự án mình đang sử dụng trên em Pi 4 nè
## Sun* AirViewer 
Hiện tại mình đang chạy 1 node sensor đo không khí tại nhà, các bạn có thể xem dự án này tại https://github.com/sun-asterisk-research/air-viewer   
Dự án này được thực hiện theo ý tưởng của một người anh, người sếp mẫu mực @vigov5, các bạn có thể đọc thêm tại bài viết này nhé
https://viblo.asia/p/tu-do-chi-so-o-nhiem-khong-khi-tai-nha-voi-sensor-va-raspberry-pi-YWOZrBBvZQ0  
Trang chủ: https://airviewer.sun-asterisk.vn/
> Mới có 2 node thôi anh em ạ :(, hi vọng là có nhiều node hơn để xem cho vui :v 

## WireGuard Server
Mình đang cài một server WireGuard trên em nó để thi thoảng nhảy về nhà điều khiển vài thứ khác, cách cài đặt cũng dễ thôi, tuy nhiên các bạn sẽ dính phải 1 vài lỗi liên quan đến module thì làm theo cách dưới nhé
#### Fix lỗi Module wireguard not found in directory
```bash
[#] ip link add wg0 type wireguard
Error: Unknown device type.
Unable to access interface: Protocol not supported
[#] ip link delete dev wg0
Cannot find device "wg0"
```

Chạy lệnh load module vào kernel
```bash
sudo dpkg-reconfigure wireguard-dkms
```

Tuy nhiên, do việc sử dụng mạng nhà, còn gọi là được mạng gia đình để cài đặt WireGuard Server, mà mạng gia đình thì mình không bỏ tiền ra để mua IP tĩnh vì nó lãng phí :v, nên mình sử dụng Dynamic DNS. Các bạn có thể sử dụng một vài dịch vụ như hình bên dưới (hình mình chụp tính năng Dynamic DNS trên modem của FPT). Do mạng gia đình là mạng IP động, cứ thi thoảng mạng nhà nó lại đổi IP sang một địa chỉ khác, vậy để lúc nào cũng truy cập đúng cái IP mạng nhà mình thì sử dụng Dynamic DNS sẽ giúp cho bạn lúc nào cũng truy cập được mạng nhà mình từ xa :D. 

![](https://images.viblo.asia/b7e97694-b422-4774-ab60-48570ee8ee3a.png)

Do việc sử dụng WireGuard này khá tiện, lúc nào mình ngồi những quán công cộng cần riêng tư thì mình sẽ bật nó lên, thay vì mình VPN lên cái server bên Đức xa tít tắp thì mình VPN đến mạng nhà mình luôn, vừa gần vừa nhanh dùng sướng hẳn :D  

> Về Wireguard có thể đọc thêm tại: https://viblo.asia/p/wireguard-mot-tac-pham-nghe-thuat-3Q75w1OeZWb

Việc cài đặt WireGuard cho Pi 4 mình cảm thấy nó có lợi nhất đấy. Kết nối với WireGuard cực kỳ nhanh, mà từ công ty về đến nhà cũng khá gần nên kết nối không hề có cảm giác giật lag gì luôn. Việc sử dụng Dynamic DNS cũng giúp mình dễ dàng SSH về em Pi 4 khá tiện, gõ terminal mượt như cách mà các bạn gõ trên máy đang ngồi vậy, k bị delay. 

## Wake on LAN
Sẽ như thế nào nếu bạn đang đi chơi xa, đi làm trên công ty mà muốn lấy tài liệu ở cái máy tính case đặt tại nhà 🤔. Hoặc do máy tính trên công ty cấu hình hơi yếu, bạn có build một bé case ở nhà cấu hình khủng long, muốn tận dụng cấu hình đó để làm việc từ xa. Có thể các bạn nghĩ đến việc buổi sáng mở máy tính ở nhà lên, tắt màn hình đi cho đỡ tốn điện + mở teamviewr hay đại loại chương trình nào cho phép remote desktop. Tuy nhiên việc này có thể gây lãng phí do không phải lúc nào bạn cũng cần dùng cái case ở nhà, việc mở máy liên tục như thế vừa tốn điện vừa chẳng được gì nhiều. Có một giải pháp là sử dụng [Wake On LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) để đánh thức máy tính của bạn mỗi khi cần nó khởi động lên. Cách này vừa hiệu quả lại đỡ phần chi phí dư thừa kia.

Nhưng có một điều cần lưu ý, muốn gửi được gói tin Magic Packet để đánh thức chiếc PC yêu dấu của bạn dậy thì bạn cần phải trong mạng LAN hoặc bạn cần phải mở port trên router đến chiếc PC của bạn, việc public port trực tiếp đến PC có thể sẽ có nguy hiểm về security, lỡ đâu ai đó hoặc nhiều ai đó brute force gửi Magic Packet rồi vô tình mở máy tính bạn lên thì sao 🤔. Tuy nhiên, tại sao bạn không sử dụng thiết bị trong mạng LAN của mình để đánh thức chiếc PC của mình lên ;). Đó chính là chiếc RaspberryPi đang cài WireGuard, mình kết nối tới WireGuard server và dùng để mở máy tính từ xa, sử dụng RDP để remote desktop lên chiếc PC đó. Các này vừa hiệu quả, vừa nhanh, vừa an toàn.

Các bạn có thểm xem thêm video ở đây để thấy được khả năng của Wake on LAN nhé
{@embed: https://www.youtube.com/watch?v=hHGPp0K29kw}
## Các thứ linh tinh khác nữa
- Mình có thể truy cập đến router của nhà mình từ xa, sử dụng để đổi mật khẩu wifi, hay khắc phục sự cố gì từ xa chỉ với em RaspberryPi nhỏ bé
- Sử dụng RaspberryPi để chạy tools (mình là 1 researcher/pentester, việc fuzzing hay switch mạng qua lại khá quan trọng, việc thuê server khá tốn kém mà CPU thường yếu đối với những gói thấp, vậy sao không dùng RaspberryPi vừa nhanh vừa hơi mạnh để làm những việc kia nhỉ, đỡ một khoản chi phí khá lớn đấy ;))
- Dùng làm đèn ngủ. Vâng các bạn không nghe nhầm đâu, mình dùng chính cái bóng đèn ở cái fan tản nhiệt của RaspberryPi của mình để làm đèn ngủ, đèn thì mình có thể control được nó màu gì nên config cho nó cái màu vàng dịu, ánh sáng vừa phải làm đèn ngủ khá tiện :v 

Trên đây là một vài thứ mình đang sử dụng với Raspberry Pi, với các bạn thì sao, các bạn dùng chiếc máy tính bỏ túi này làm việc gì có thể chia sẻ dưới comment nhé ;)