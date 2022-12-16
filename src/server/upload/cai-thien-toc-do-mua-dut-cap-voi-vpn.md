Cải thiện tốc độ mùa “đứt cáp” với VPN
Hiện theo một số thử nghiệm cho thấy việc VPN ra nước ngoài mỗi khi “đứt cáp” thì tốc độ truy cập các trang nước ngoài sẽ nhanh hơn hẳn. Bên cạnh đó đôi lúc khi ra cafe ngồi bạn cần vào Wifi và sợ bị một số “trẻ trâu” sniff mạng và ăn cắp mật khẩu, nếu có VPN thì bạn sẽ có thêm một lớp bảo mật kết nối của mình

Vậy “VPN là gì ?”

VPN viết tắt của Virtual Private Network ( mạng riêng ảo )
Là một dạng kết nối an toàn, khi thực hiện kết nối VPN thì thông thường toàn bộ kết nối internet trên thiết bị cùa bạn sẽ được chuyển hướng tới 1 máy chủ VPN Gateway bằng một kết nối an toàn được mã hóa, rồi từ máy chủ đó kết nối mới đi ra internet. Tức là giống khái niệm Proxy, nhưng mà kết nối giữa thiết bị của bạn và proxy sẽ bị mã hóa hoàn toàn, nên các cách thức tấn công như sniff mạng trên đường truyền dẫn, wan sniffing, tampering attack… đều tránh được phần nào.

Vậy “Làm sao để có VPN ?”

Có 2 cách:
1. Mua VPN : đây là cách đơn giản nhất, tiện, giá cả khá đa dạng, từ bèo bèo chậm thì 4-5$/tháng cũng có như hotspotshield, anchor vpn hoặc xịn tốc độ nhanh như Pure VPN giá khoảng 9.99$/tháng.
Có thể tham khảo thêm ở đây: http://www.pcmag.com/

Tuy nhiên xài VPN mua thì đôi lúc tốc độ sẽ chậm rồi lại nhanh rồi lại chậm, do thực tế là các VPN mua hầu hết là nhiều account VPN xài chung một VPN Gateway Server. Cái nào mà nhà cung cấp nó warranty tốc độ thì giá hơi cao 

2. Tự cài lên Server (Virtual Private Server – máy chủ ảo ): cách này thì tiện cho bạn nào đã có VPS ở nước ngoài thì có thể tận dụng để mở VPN hoặc là có thể tận dụng các VPS miễn phí ( được khuyến mãi ) để mở VPN xài miễn phí luôn dĩ nhiên để làm việc này cần chút ít kiến thức kỹ thuật :))
Cái lợi là VPN sẽ chỉ có mình bạn xài nên băng thông Server có nhiêu thì bạn xài VPN có bấy nhiêu. Mình dùng VPN tự tạo này quất Dota 2 ầm ầm ko lag 😀

Cách cài Open VPN  trên Digital Ocean VPS

Ở dưới đây là hướng dẫn cách cài Open VPN lên VPS của Digital Ocean để xài free 2 tháng, nếu bạn click vào link (affiliate) dưới đây để đăng kí VPS trên Digital Ocean thì bạn sẽ nhận dc 15$ free, đủ xài 3 tháng VPS qua mùa đứt cắt =)) gói thấp nhất (5$/tháng khoảng 100k VND/tháng), được 1000GB băng thông mỗi tháng, nhưng tốc độ nhanh bằng VPN mua giá 10$ tháng ( do VPN tự tạo thì có mình bạn dùng thôi, còn VPN kia mua thường là đồ xài chung )

Link đăng kí account Digital Ocean:

[https://www.digitalocean.com/](https://www.digitalocean.com/?refcode=70079299d0ed)
![](https://images.viblo.asia/fdb2e5b4-b9ec-44f7-b29c-2aa7c9c335c5.png)

Đăng ký thì cứ như bình thường thôi, tuy nhiên Digital Ocean yêu cầu bạn phải add thẻ thanh toán quốc tế ( VISA hay Master Card ) để kích hoạt account. Bạn cứ add vì xài hết 10$ thì destroy cái VPS là được 🙂 còn bạn nào muốn xài tiếp sau 2 tháng free thì hàng tháng DO sẽ tự động charge 5$ vào thẻ

Sau khi đã có account Digital Ocean thì bạn tiến hành tạo VPS ( bên Digital Ocean nó gọi VPS là droplets )

Có hướng dẫn từng bước tại đây: https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server

Chú ý tới bước Select Droplet Image tức là bước chọn hệ điều hành cài đặt lên VPS thì nhớ chọn CentOS 6.5 x64 
![](https://images.viblo.asia/bc788116-076d-40d3-a8f5-70003c05c177.png)

Sau khi tạo VPS thì thông tin truy cập server sẽ được gửi qua mail, vô mail để lấy thông tin truy cập. Thông tin truy cập thực ra là SSH account tức là giao diện dòng lệnh truy cập từ xa trên Linux

Oke quất thôi =))
Cài đặt Open VPN
IP Server : 167.x.x.x
OS  : CentOS release 6.8 (Final)

ssh root@167.x.x.x

[root@ajino2k ~]# _

wget http://swupdate.openvpn.org/as/openvpn-as-2.0.26-CentOS6.x86_64.rpm
yum localinstall openvpn-as-2.0.26-CentOS6.x86_64.rpm

[root@ajino2k ~]# passwd openvpn
Changing password for user openvpn.
New password:

Xong vào Web admin thôi :
Sau đó gõ vô thanh địa chỉ của trình duyệt:
https://địa_chỉ_ip_của_vps:943
login user openvpn/pass rồi tại profile về sử dụng

![](https://images.viblo.asia/8ae4a12f-56b5-4f3a-bc58-571936cc56f5.png)
Sau khi Download được profile thì sử dụng command sau để connect
sudo openvpn –config /tmp/client.ovpn
rồi nhập thông tin account VPN để login .

Nguồn : https://techzones.me/2019/08/26/cai-thien-toc-do-mua-dut-cap-voi-vpn/