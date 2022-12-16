## Giới thiệu
Chắc hẳn mọi người cũng có nghe nói qua về VPN rồi. **VPN (Virtual Private Network)** là một mạng riêng ảo, sử dụng internet để kết nối 2 địa điểm từ xa hoặc người dùng với một mạng LAN.  
#### Vậy sử dụng VPN có mục đích gì?
Tùy theo mục đích của người sử dụng VPN, có thể kết nối tới server từ xa, truy cập các trang web bị chặn, hay là đơn giản đảm bảo tính riêng tư của bản thân khi kết nối với các mạng công cộng.
#### Cài đặt VPN
Việc cài đặt VPN trên server cá nhân cũng mất khá nhiều thời gian và công sức, các bạn có thể tham khảo cách cài **OpenVPN** hay các tools hỗ trợ việc cài đặt VPN trên internet. Nhưng hôm nay mình sẽ giới thiệu với các bạn cách cài đặt 1 VPN Server đơn giản nhất mà mình đang sử dụng
## Outline VPN
Với **Outline VPN** thì việc cài đặt VPN Server được trở nên cực kỳ đơn giản chỉ với **1 dòng lệnh**. Chỉ với 1 dòng lệnh thôi là các bạn đã cài đặt xong 1 VPN Server rồi. Cũng khá nhiều VPN Server cũng cài đặt chỉ với 1 dòng lệnh nhưng mình vẫn thích sử dụng Outline VPN hơn vì sự tiện lợi của nó.

Outline VPN là một phần mềm mã nguồn mở được Jigsaw (thuộc Alphabet – công ty mẹ của Google) phát triển. Outline sử dụng docker nên đem lại cảm giác an toàn cho người sử dụng. Và Outline hướng đến rằng mọi người đều có thể cài VPN Server cho riêng mình bằng cách thiết lập đơn giản nhất có thể.

Được chia làm 2 phần là Outline Manager và Outline Client. Outline Manager sử dụng để quản lý các VPN Server của mình, còn Outline Client sử dụng để cho client kết nối lên server.
## Cài đặt
Tất cả các bản cài đặt các bạn có thể tải tại đây [Download Outline](https://getoutline.org/en/home)
### Outline Manager
![](https://images.viblo.asia/b5aea081-e927-4e8a-9d8b-7d263ed80110.png)  

Outline Manager hỗ trợ khá nhiều nền tảng phổ biến hiện nay gồm có Windows, Linux, macOS. Các bạn có thể tải đúng theo phiên bản máy mình đang dùng nhé :D.

**Bước 1: Mở giao diện Outline Manager**

Ở đây nó yêu cầu chúng ta setup Outline lên Server của mình 

![](https://images.viblo.asia/ca17f6b5-2974-4217-a808-ced91c0c53a9.png)

Các bạn chọn theo đúng Server VPS mà mình đang sử dụng, nếu không rõ thì cứ chọn cái **Set up Outline anywhere**.

**Bước 2: Cài đặt Outline Server lên VPS**

![](https://images.viblo.asia/bd6f0d6e-065c-4459-9663-cd502761b8ba.png)

Copy đoạn code này và thực thi trên server

```bash
sudo bash -c "$(wget -qO- https://raw.githubusercontent.com/Jigsaw-Code/outline-server/master/src/server_manager/install_scripts/install_server.sh)"
```
Công việc hoàn toàn tự động, nếu code chạy suôn sẻ thì các bạn sẽ nhận được output như dưới đây.
```bash
> Verifying that Docker is installed .......... OK
> Verifying that Docker daemon is running ..... OK
> Creating persistent state dir ............... OK
> Generating secret key ....................... OK
> Generating TLS certificate .................. OK
> Generating SHA-256 certificate fingerprint .. OK
> Writing config .............................. OK
> Starting Shadowbox .......................... OK
> Starting Watchtower ......................... OK
> Waiting for Outline server to be healthy .... OK
> Creating first user ......................... OK
> Adding API URL to config .................... OK
> Checking host firewall ...................... OK

CONGRATULATIONS! Your Outline server is up and running.
To manage your Outline server, please copy the following line (including curly
brackets) into Step 2 of the Outline Manager interface:

{"apiUrl":"https://3.0.213.165:16250/xxxxxxxxxxxxxxxxxxx","certSha256":"xxxxxxxxxxxxxxx"}

If you have connection problems, it may be that your router or cloud provider
blocks inbound connections, even though your machine seems to allow them.

Make sure to open the following ports on your firewall, router or cloud provider:
- Management port 16250, for TCP
- Access key port 28808, for TCP and UDP
```
**Bước 3: Dán key nhận được vào Outline Manager**

Bạn nhận được đoạn key 
```bash
{"apiUrl":"https://3.0.213.165:16250/xxxxxxxxxxxxxxxxxxx","certSha256":"xxxxxxxxxxxxxxx"}
```
copy chúng và dán vào mục 2 trên Outline Manager rồi ấn Done, vậy là hoàn tất việc cấu hình VPN Server rồi. 

Cài đặt xong chúng ta sẽ có 1 giao diện quản lý VPN Server mà mình tạo ra. Ở đây có lượng data transferred / 30 days, khóa quản lý và tạo khóa.

![](https://images.viblo.asia/72186bae-f1ef-4b10-98ff-6719573d2d3d.png)

Ok rồi, tạm thời xong ở bên Outline Manager, tiếp tục chúng ta chuyển sang Outline Client

### Outline Client
Thiết lập cấu hình Outline Server xong rồi, vậy mình muốn kết nối thì làm thế nào nhỉ? Cực kỳ đơn giản với Outline Client. 

![](https://images.viblo.asia/449ddf1c-7e4b-451b-b3d5-3f3dc4c12f8a.png)

Outline Client hỗ trợ đủ thể loại từ Android, Windows, Chrome OS, iOS, macOS, Linux. Gần như là tất tần tật thiết bị rồi.

Tải và sử dụng Outline Client rất đơn giản, với 2 thao tác là bạn có thể kết nối đến với VPN của mình rồi.

Để kết nối với Outline Server thì chúng ta cần có access code. Các bạn để ý bên Outline Manager có cái nút biểu tượng computer với nút share không. Các bạn bấm vào đấy thì nó sẽ cấp cho chúng ta 1 access code dưới dạng `ss://xxxx=@<ip-server>:<port>/?outline=1`, copy access code đấy rồi paste vào Outline Client là xong. Giờ thì các bạn có thể dễ dàng kết nối mạng sử dụng VPN rồi :D.
## Đánh giá

Sau khi sử dụng thì mình có 1 vài nhận xét như sau:
- Outline khá dễ sử dụng, ngay cả việc cài đặt cũng cực kỳ đơn giản, nhất là phần client hỗ trợ đầy đủ các thiết bị mình đang sử dụng hiện nay.
- Phần quản lý Outline Manager cũng khá trực quan, cho phép mình kiểm tra lưu lượng mà mỗi thiết bị mình đang sử dụng là bao nhiêu. Mình thì đang sử dụng VPS unlimited network nên cũng không quan tâm về vấn đề dùng quá lưu lượng mạng cho lắm :D
- Có thể quản lý nhiều VPN Server cùng 1 lúc thông qua 1 trình quản lý thôi. Khá đơn giản và thuận tiện, và Outline Client cũng có thể thêm nhiều accesss code để có thể dễ dàng chuyển sang một VPN khác.
- Mình dùng Outline cũng được 6 tháng rồi và cũng chưa có tý nào phàn nàn về nó cả. Mọi thức vẫn khá ok.
## Lưu ý
1 vài lưu ý nhỏ đối với các bạn thôi.
- Sử dụng VPS miễn phí càng nhiều băng thông càng tốt, mình gặp nhiều trường hợp vì kết nối đến VPN quá nhiều dẫn tới lưu lượng mạng truy cập sử dụng VPS quá lớn, thành ra phải trả tiền cho lưu lượng mạng mà mình dùng dư ra cũng khá vất đấy :v.
- Nên sử dụng VPS gần mình, càng gần càng tốt, nếu không thì độ trễ khá lớn và bạn không vui vẻ gì đâu. Nếu có thể chọn VPS ở Singapore càng tốt, mình thấy khá nhanh và ok.

> Mình đang thử nghiệm Outline với Raspberry để tạo 1 VPN Server tại nhà, nếu các bạn hứng thú thì upvote để mình có động lực viết thêm 1 bài nữa để tạo 1 VPN Server tại nhà sẽ như thế nào nhé (seeyou).