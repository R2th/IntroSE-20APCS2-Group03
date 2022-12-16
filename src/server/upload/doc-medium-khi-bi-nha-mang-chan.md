# Intro
Dạo gần đây nhà mạng VN cứ chặn medium làm mình không load được, làm mọi cách rồi nhưng mà vẫn không truy cập được medium ngoài bật VPN sang nước khác :sleepy:, tuy nhiên mình lại có con VPS bên Châu Âu nên thành ra chạy khá chậm. Ban đầu mình định config allow các IP của medium mới chạy qua VPN, tuy nhiên Medium lắm IP nên việc này khả thi nhưng mất thời gian =)). 

Tuy nhiên có một cách khác mà bạn chỉ vài click là xong thôi, bài viết này mình sẽ chỉ các bạn cách config mà bạn muốn trang này thì chạy qua VPS, trang này dùng card mạng bình thường cho nó nhanh :v: 

Nhược điểm của nó là mới chỉ chạy được trên Linux, Windows với Mac chưa config được, nên anh em dùng Win với Mac chịu khó đọc thôi nhé :(

> P/S: Dạo này chả hiểu sao văn phong chán quá, bạn đọc đọc chỗ nào ngượng ngượng bảo mình sửa lại nhé, chân thành xin lỗi các bạn rất nhiều :(
# Wireguard
## Cách 1
### Phía Server
Đầu tiên, trên VPS các bạn cài Wireguard lên nhé, nếu muốn cài nhanh thì sử dụng script sau, chạy phát ăn luôn ;)
```bash
wget https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh | sudo bash wireguard-install.sh
```
Chạy lên nó sẽ hỏi 1 số câu hỏi cơ bản, cứ ấn enter là được, nếu muốn config khác thì thay đổi số liệu tương tự thôi nhé ;).


Sau khi cài đặt xong, nó sẽ cung cấp cho bạn 1 file wireguard client, cứ để file đấy ở đó đã, về client cài đặt tiếp

**Ai con nhà nghèo k có VPS dùng riêng thì có thể sử dụng cách sau nhé**
- Truy cập https://warp.apkcombo.com/warpplus.conf
- Lấy nội dung file này lưu lại xong làm tiếp bên dưới nhé, đây là server VPN miễn phí mình lấy trên https://apkcombo.com/vi-vn/vpn/, nhưng mình đoán nhiều người dùng chắc là lag lắm, nhưng mà để đọc mỗi Medium chắc thoải mái thôi :v 
### Phía Client
Mô hình cài đặt nó sẽ như thế này, mình vẽ hơi sida, mong các bạn thông cảm :(

![](https://images.viblo.asia/4e6f66b9-54e7-4256-8510-7a056a225b8e.png)

- Lấy nội dung file wireguard client mà server generate ra rồi lưu vào file 
```bash
/etc/wireguard/wg0.conf
```
- Cài đặt docker trên Linux 
- Chạy command này để cài đặt wireguard phía client. Lý giải một chút, chạy lệnh docker này lên sẽ tạo 1 container sử dụng file wireguard client mình vừa lưu vừa nãy connect đến server, sau đó mở port 1080 để kết nối SOCK5 ra ngoài máy thật của mình.
```bash
docker run -d --restart=always --cap-add=NET_ADMIN \
    --name wireguard-socks-proxy \
    --volume /etc/wireguard/:/etc/wireguard/:ro \
    -p 1080:1080 \
    kizzx2/wireguard-socks-proxy
```
Có thể xem source code tại https://github.com/kizzx2/docker-wireguard-socks-proxy

Đến bây giờ ta có một connect lên VPS từ client thông qua SOCKS5 port 1080. Vậy bây giờ chỉ cần điều chỉnh làm sao cho khi truy cập vào medium thì sẽ gửi request thông qua SOCKS5 port 1080 để server xử lý rồi gửi response về trình duyệt hiển thị lên là xong :D. Vì mặc định request máy client gửi qua card mạng bình thường của mình thôi. 

Vậy làm thế nào để điều chỉnh các trang web mình muốn truy cập thông qua VPS, có một extension có cả trên Chromium và Firefox tên **Proxy SwitchyOmega**

Chrome: https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?hl=vi  
Firefox: https://addons.mozilla.org/vi/firefox/addon/switchyomega/

Ở đây mình sẽ demo qua Chrome nhé, Firefox làm tương tự.

- Tạo 1 profile tên WireGuard, mình để thế còn các bạn để tên thế nào cũng được ;), config như hình dưới, với Protocol là SOCKS5.

![](https://images.viblo.asia/55ea5233-d73c-458f-96ab-ac01c0ccbf09.png)


Nhớ ấn Apply changes để confirmd thay đổi nhé.
- Truy cập vào Medium, chọn extension Switchy Omega, chọn Add condition

![](https://images.viblo.asia/579970ba-f169-4ed2-9266-038571c3e7ee.png)

- Chuyển sang profile WireGuard rồi Add condition

![](https://images.viblo.asia/5578627d-5470-447a-9d3b-b1d4af624a20.png)

Lúc này trang đã load lại, nhớ chọn auto switch để nó tự động chuyển qua lại giữa các profile nhé :D

![](https://images.viblo.asia/46ad2017-36a8-4d6c-8e44-02532ec907d4.png)

Cái icon extension Switchy Omega chuyển sang màu xanh thế kia là đang load medium với kết nối wireguard lên VPS rồi nhé, cách này có thể làm tương tự đối với những website bị chặn khác. Chúc anh em thành công ;)
## Cách 2
Cách này không yêu cầu các bạn có 1 con VPS nào cả, sử dụng luôn hàng của Cloudflare cho nó miễn phí  
Thực hiện cài đặt Cloudflare Warp trên https://1.1.1.1/ (tuỳ vào Hệ điều hành của bạn là gì thì cài tương tự)  
Truy cập vào **Preferences** để cài đặt Proxy Socks5 cho Cloudflare Warp (thực chất đằng sau thằng Warp này cũng sử dụng Wireguard nên nó mới nhanh thế :joy:)  
![image.png](https://images.viblo.asia/2cc3a044-f652-45b3-8e72-107c23949f7d.png)  
Enable proxy mode, port thì các bạn thích để port nào cũng được, mặc định Socks5 proxy sẽ là 1080  
![image.png](https://images.viblo.asia/ae9a2788-70dd-47e0-bfa3-b533a9c299ed.png)  
Chuyển sang tính năng Warp via Local Proxy, rồi enable Warp lên là xong  
![image.png](https://images.viblo.asia/0e3d5b04-bfb1-4ee0-8344-094b6d77fc18.png)  

Trình duyệt các bạn sử dụng  **Proxy SwitchyOmega** và làm tương tự như hướng dẫn bên trên thôi.