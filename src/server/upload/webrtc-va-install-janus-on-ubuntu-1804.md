**1. Tổng quát WebRTC**

Là một dự án mã nguồn mở cho phép các trình duyệt và ứng dụng di động giao tiếp trực tiếp với nhau trong thời gian thực (peer to peer). Webrtc cung cấp các api java script giúp xây dựng ứng dụng web truyền tải dữ liệu, video, âm thanh một cách đơn giản. 

WebRTC được hỗ trợ bởi các trình duyệt chính như Chrome, Firefox, Opera và Microsoft Edge, cũng như các nền tảng như Android và iOS.
WebRTC không cần cài đặt bất kỳ plugin bên ngoài nào trong trình duyệt.

**2. Các bước thiết lập webrtc**

WebRTC thiết lập kết như thế nào? Đó là câu hỏi quan trong mình nghĩ sẽ có nhiều người quan tâm. Vậy webrtc thực hiện kết nối giữa hai máy PC qua mấy bước? Xin trả lời gồm hai bước như sau:

***2.1. Tìm vị trí một PC***

Để hiểu dễ hơn cách webrtc tìm vị trí một PC như nào, các bạn hãy liên tưởng tới khi bạn muốn call điện thoại cho ai đó thì bạn phải bấm số điện thoại người kia và call kết nối. Điều tương tự ngược lại khi ai đó muốn call tới bạn.
Đấy là trường hợp call điện thoại thì số điện thoại là định danh nhận dạng người dùng được nhà mạng viễn thông sử dụng để xác định vịt trí người nhận.

Còn với  ứng dụng web thì sao? Nó sẽ khác so với viễn thông ở chỗ là mỗi web browser để đi tới internet phần lớn đều thông qua thiết bị định tuyến (switch, router) các thiết bị này được gọi là *Network Address Traversal (NAT)*, cho nên các PC không thể nhìn thấy được địa chỉ IP public của máy PC khác qua internet vì nó bị tre bời IP public của NAT. 
![](https://images.viblo.asia/d555d4bb-70a9-491c-b06b-fa3791e240ee.png)

Vậy làm sao để các PC biết được IP public của nhau? Các bạn hãy liển tưởng tới khi mình muốn ai đó call điện thoại thì mình đưa số điện thoại mình cho họ biết. Để khắc phục điều này thì chúng ta sử dụng một giao thức gọi là *Interactive Connectivity Establishment (ICE)*

ICE giữ một vai trò là tìm ra con đường tốt nhất kết nối 2 máy với nhau.

ICE cung cấp cho chúng ta "ICE Candidate" chứa IP public, port, thông tin kết nối khác. Các bạn hiểu nôm na là ICE Candidate chưa thông tin con đường từ internet qua các NAT rồi tới máy PC.

ICE có thể kết nối trực tiếp hoặc gián tiếp tương ứng với trường hợp không có NAT or có NAT.

1. Khi có NAT thì ICE phải dựa vào Session Traversal Utilities for NAT (STUN) and/or Traversal Using Relays around NAT (TURN).
2. Khi không có NAT thì ICE rất đơn giản để kết nối hai máy với nhau vì có sẵn IP public của các máy.

Vậy STUN và TURN là như nào đóng vai trò gi các bạn xem tiếp phía dưới.

***STUN server***

STUN được hiểu là cho phép một máy PC tìm ra địa chỉ IP của chính nó, tức là một PC-A cần biết địa chỉ IP public của nó thì thực hiện gửi requet tới STUN. STUN sẽ response gửi về IP của PC-A, lúc này địa chỉ IP của PC-A có thể được các máy PC khác tìm thấy để kết nối.

Tuy nhiên trường hợp máy PC-A bị chặn bời tường lửa hoặc lí do nào đó STUN không cung cấp đc IP của nó, thì ICE sẽ dựa vào TURN để thiết lập kết nối. Khi dựa vào TURN server, thì lúc này không còn gọi là peer to peer nữa mà phải là client to host. Tất nhiên webrtc vẫn ưu tiên hướng tới việc kết nối peer to peer hơn tức là sử sử dụng tới STUN thôi, nhưng  TURN server vẫn luôn sẵn sàng dự phòng.
![](https://images.viblo.asia/b9c94a8e-4e6f-49e1-894a-46a8390835d5.png)

Vậy TURN server là gi? Các bạn xem tiếp phía dưới.

***TURN server***

TURN là một máy chủ chuyển tiếp và hoạt động như một trung gian để truyền dữ liệu, âm thanh, video khi không thể kết nối trực tiếp giữa hai PC.

TURN được yêu cầu sẵn sàng xuyên suốt ngay cả khi kết nối WebRTC đã được thiết lập.

Lưu ý : 
1. TURN là giải pháp cuối cùng khi webrtc không thể thiết lập kết nối P2P. 
2. Dữ liệu chảy qua máy chủ TURN, nó tiêu tốn nhiều băng thông và giao tiếp không sử dụng P2P trong trường hợp này.

***2.2. Thông báo thiết lập webrtc***

Khi các PC có được ICE candidate rồi, bước tiếp theo là gửi ICE Candidate tới một máy PC ngang hàng khác để kết nối. Việc gửi các candidate ICE như nào? Nó sẽ được nhóm candidates ICE và Session Description lại với nhau thành một đối tượng duy nhất.

Sau đó sẽ gửi đối tượng đi bằng giao thức Session Description Protocol (SDP). Cũng có trường hợp ICE Candidate ko đc gói lại và được gửi riêng được gọi là Trickle ICE. (Trickle ICE là một khái niệm mới mình xin phép không nói ở bài chia sẻ này)

Đến đây đặt ra một câu hỏi khi chưa có thông tin máy nhận thì gửi ICE candidate và session description đi bằng cách nào?

Nó sẽ sử dụng một cơ chế Signalling Mechanism (phát tín hiệu), cơ chế phát tín hiệu như name suggest or trao đổi tín hiệu giữa các máy có ý định kết nối.

Cơ chế phát tín hiệu thông thường sử dụng kênh giao tiếp như web socket, socket.io.
Đó là cách mà hai máy PC kết nối peer to peer với nhau để thiết lập kêt nối webrtc, để rõ hơn mình tóm tắt lại thông qua ví dụ như sau:


PC-A thiết lập WebRTC với PC-B cần thực hiện các hành động:
1. PC-A tạo ra ICE Candidate bằng cách sử dụng Interactive Connectivity Establishment (ICE). Trong hầu hết các trường hợp, nó yêu cầu một (STUN) hoặc (TURN) .

2. PC-A nhóm ICE Candidate và Session Description thành một đối tượng duy nhất. Đối tượng này được lưu trữ như Local Description trong máy PC-A và được chuyển đến PC-B thông qua cơ chế signalling mechanism phần này được gọi là Offer.

3. PC-B tiếp nhận Offer và lưu trữ như remote description để sử dụng tiếp. PC-B tạo ra ICE Candidate và Session Description của chính nó, lưu trữ như Local description và gửi nó đến PC-A thông qua signalling mechanism. Phần này được gọi là Answer.

( Lưu ý: Như đã nói trước đó, các ứng viên ICE ở bước 2 và 3 cũng có thể được gửi riêng )

4. PC-A nhận Answer từ PC-B và lưu trữ nó như Remote Description.
 Lúc này cả hai máy đều có thông tin kết nối của nhau và có thể bắt đầu giao tiếp qua WebRTC.
 ![](https://images.viblo.asia/39e0f330-3941-4e69-bbf9-a3f3b8c99ee1.png)


**3. Janus server**

Janus là một máy chủ WebRTC do Meetecho phát triển. Nó cung cấp các phương tiện thiết lập giao tiếp WebRTC giữa trình duyệt với nhau, giữa android, IOS với trình duyệt.

Trao đổi thông tin bằng JSON. Bất kỳ tính năng / ứng dụng cụ thể nào đều được cung cấp bởi các plugin phía máy chủ, 
Các trình duyệt sau đó có thể liên hệ qua Janus để tận dụng chức năng mà họ cung cấp.

***Install Janus server on Ubuntu***
Mình cài đặt janus trên ubuntu 18.04, các bước tiến hành như sau:

Step1:  Tạo file dependencies.sh để install các phần mềm và dependence cần thiết. Mở file dependencies.sh rồi add nội dung:
```
#!/bin/bash

packagelist=(
    git
    libmicrohttpd-dev
    libjansson-dev
    libssl-dev
    libsrtp-dev
    libsofia-sip-ua-dev
    libglib2.0-dev
    libopus-dev
    libogg-dev
    libcurl4-openssl-dev
    liblua5.3-dev
    libconfig-dev
    pkg-config
    gengetopt
    libtool
    automake
    gtk-doc-tools
    cmake
)
sudo apt-get install ${packagelist[@]}
```
mở terminal chạy: bash dependencies.sh or nếu ai cài zsh thì chạy lệch: zsh dependencies.sh

Step2: Install libnice
```
cd ~
git clone https://gitlab.freedesktop.org/libnice/libnice
cd libnice
# nếu branch master không có file autogen.sh thì bạn git fetch rồi checkout sang branch latest-release
./autogen.sh
./configure --prefix=/usr
make && sudo make install
```

Step3: Install libsrtp2
```
cd ~
wget https://github.com/cisco/libsrtp/archive/v2.2.0.tar.gz
tar xfv v2.2.0.tar.gz
cd libsrtp-2.2.0
./configure --prefix=/usr --enable-openssl
make shared_library && sudo make install
```
Step4: Install usrsctp
```
cd ~
git clone https://github.com/sctplab/usrsctp
cd usrsctp
./bootstrap
./configure --prefix=/usr && make && sudo make install
```
Step5: Install libwebsockets
```
cd ~
git clone https://libwebsockets.org/repo/libwebsockets
cd libwebsockets
# bạn nên sử dụng stable version of libwebsockets lớn hơn 2.x
# git fetch và checkout v2.4-stable
mkdir build
cd build
cmake -DLWS_MAX_SMP=1 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" ..
make && sudo make install
```
Step6: Install MQTT C
```
cd ~
git clone https://github.com/eclipse/paho.mqtt.c.git
cd paho.mqtt.c
make && sudo prefix=/usr make install
```
Step7: Install RabbitMQ
```
cd ~
git clone https://github.com/alanxz/rabbitmq-c
cd rabbitmq-c
git submodule init
git submodule update
mkdir build && cd build
cmake -DCMAKE_INSTALL_PREFIX=/usr ..
make && sudo make install
```
Step8: Install janus
```
cd ~
git clone https://github.com/meetecho/janus-gateway.git
cd janus-gateway
sh autogen.sh
./configure --prefix=/opt/janus
make
sudo make install
sudo make configs
```
Đến đây bạn đã cài xong để start server janus bạn vào: 
```
cd /opt/janus/bin
./janus
```
![](https://images.viblo.asia/076724c3-c9bf-40ee-a10d-b53d6af6cd80.png)
nếu các bạn thấy log như trên là ok rồi đó, mấy cái ERROR đỏ kia là mình chưa connect tới STUN server, chưa trỏ tới websocket nữa. Mình sẽ nói tới phía sau.

Video cài: https://www.youtube.com/watch?v=fS8lj9csVuI

Tiếp theo để mở web và chạy demo Echo Test thì làm như nào?
Các bạn copy thư mục html từ folder janus-gateway vào: /var/www/

Có 2 cách sử dụng web server apache2 or nginx để chạy web lên. Ở đây mình dùng nginx
install thêm nginx: 
```
sudo apt-get install nginx
```
cài nginx xong các bạn mở file
```
cd /etc/nginx/sites-enabled
nano default
```
sẽ thấy root trỏ tới thư mục html của mình vừa copy, đây là đường dẫn default, các bạn có thể để folder html chỗ khác rồi trỏ tới.
```
server {
        listen 80;
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name .demovd.com;
        location / {
                try_files $uri $uri/ =404;
        }
}
```
run nginx lên
```
sudo systemctl start nginx.service
sudo systemctl enable nginx.service
```
truy cập http://localhost
![](https://images.viblo.asia/3a1c04ea-4724-4678-baaf-9eb906deccf6.png)

Lưu ý: chorme version 47 trở lên chỉ cho phép getUserMedia theo https or localhost
cho nên bạn muốn truy cập dạng link ip như này: http://10.10.2.3/echotest.html sẽ cần setup chút ở trình duyệt
Bạn mở: chrome://flags/ rồi enable ip truy cập máy bạn lên
![](https://images.viblo.asia/18c7d472-1272-4ce2-afb0-3cc413f5e53f.png)

***Trường hợp không có NAT.*** 
Như máy tính mình đang connect vào mạng wifi nội bộ cùng với mobile, thì video call trực tiếp qua nhau được luôn.
Trên laptop mình đăng ký tên: duy

![](https://images.viblo.asia/86b0a39b-cf14-4901-b9eb-eec17fba2979.png)

Trên điện thoại mình đăng ký tên: napo

![](https://images.viblo.asia/5faf2406-6f5f-4931-be6e-f70787d7902b.jpg)

Bây giờ từ laptop call tới mobile
![](https://images.viblo.asia/92206781-7949-47b8-bcc5-a589b4264fff.png)


***Trường hợp có NAT***

Tức là mạng internet có các router thì sẽ cần tới STUN server.
Lưu ý: khi kết nối tới server websocket bạn sẽ và file này:
```
  cd /var/www/html
  nano janus.js
  var server = gatewayCallbacks.server;
```
server đó là trỏ tới websocekt các bạn có thể thay tới socket vd: var server = "wss://xxxxx/janus";

Config janus trỏ tới STUN server public thì các bạn vào trong file này: 
```
cd /opt/janus/etc/janus
nano janus.jcfg
```
các bạn thay đổi link server STUN ở config NAT:
```
nat: {
        stun_server = "stun.stunprotocol.org"
        stun_port = 3478
        nice_debug = false
}
```
OK như vậy là bạn có thể call qua internet, giữa PC và mobile.

Như vậy là xong trọn vẹn để dựng một webrtc sử dụng janus server.

Chúc các bạn thành công ! ^_^