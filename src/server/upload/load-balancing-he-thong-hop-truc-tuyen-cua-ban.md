Hi. Lại là mình đây. Ở các bài viết trước mình đã build và làm 1 số trò hay ho với con Jitsi.
Ở bài viết này mình lại cùng vọc vạch nó nhé. 

Okay, mình đã build, live stream conference và translation giọng các bác đang nói rồi nhỉ, cùng điểm lại cấu trúc của nó 1 tý nhé:

```
                   +                           +
                   |                           |
                   |                           |
                   v                           |
                  443                          |
               +-------+                       |
               |       |                       |
               | Nginx |                       |
               |       |                       |
               +--+-+--+                       |
                  | |                          |
+------------+    | |    +--------------+      |
|            |    | |    |              |      |
| jitsi-meet +<---+ +--->+ prosody/xmpp |      |
|            |files 5280 |              |      |
+------------+           +--------------+      v
                     5222,5347^    ^5347   4443,10000
                +--------+    |    |    +-------------+
                |        |    |    |    |             |
                | jicofo +----^    ^----+ videobridge |
                |        |              |             |
                +--------+              +-------------+
```
Như cấu trúc bên trên thì mỗi 1 hệ thống mặc định sẽ có 1 con videobridge làm nhiệm vụ kết nối media trong cuộc họp.

Nếu bạn có nhiều người join vào conference cùng lúc, bạn nên cài nhiều videobridge trên các máy chủ riêng biệt để jitsi-meet có thể phân phối các kênh hội nghị tốt hơn trên tất cả các máy chủ cầu nối hiện có.

Thôi không lòng vòng nữa, mình cùng cài load balancing con Jitsi này nhé
> Ở đây mình hướng dẫn cài load balancing trên ubuntu 18.04 và jitsi version mới nhất nhé

### Dưới đây là các bước để  cài đặt 
> Lưu ý các bạn phải chuyển qua quyền root trước bằng lệnh `sudo -s` nhé

**Step 1**: Update các patches mới nhất của videobridge
```
echo 'deb https://download.jitsi.org stable/' >> /etc/apt/sources.list.d/jitsi-stable.list
wget -qO -  https://download.jitsi.org/jitsi-key.gpg.key | apt-key add -
apt-get install apt-transport-https
apt update
apt upgrade
```
**Step 2**: Cài đặt và cấu hình firewall trên các server videobridge mới
```
ufw status
ufw allow ssh
ufw allow 443/tcp
ufw allow 4443/tcp
ufw allow 10000:20000/udp
ufw enable
```
**Step 3**: Cấu hình firewall trên server mà mình build đầu tiên (xem lại build tại [đây](https://viblo.asia/p/xay-dung-va-trien-khai-he-thong-hop-truc-tuyen-aWj533wo56m))
```
ufw allow 5222/tcp
ufw reload
```
**Step 4** : Cài đặt videobridge trên các server mới
```
apt -y install jitsi-videobridge2
```
> - Trong lúc cài đặt sẽ có hỏi DNS name, bạn nhớ điền domain đang chạy con Jitsi vào nhé
> - Sau khi cài đặt xong mà bạn kiểm tra file `/etc/jitsi/videobridge/config` nó trông giống như này là okay
```
# Jitsi Videobridge settings
# sets the XMPP domain (default: none)
JVB_HOSTNAME=<your jitsi-meet domain name which you entered during installation>
# sets the hostname of the XMPP server (default: domain if set, localhost otherwise)
JVB_HOST=
# sets the port of the XMPP server (default: 5275)
JVB_PORT=5347
# sets the shared secret used to authenticate to the XMPP server
JVB_SECRET=fg4t55z
# extra options to pass to the JVB daemon
JVB_OPTS="--apis=,"
# adds java system props that are passed to jvb (default are for home and logging config file)
JAVA_SYS_PROPS="-Dnet.java.sip.communicator.SC_HOME_DIR_LOCATION=/etc/jitsi -Dnet.java.sip.communicator.SC_HOME_DIR_NAME=videobridge -Dnet.java.sip.communicator.SC_LOG_DIR_LOCATION=/var/log/jitsi -Djava.util.logging.config.file=/etc/jitsi/videobridge/logging.properties"
```
**Step 5**: Cấu hình videobrige mới vào hệ thống 
Bạn mở file `/etc/jitsi/videobridge/sip-communicator.properties` trên server cài đặt hệ thống sau đó copy toàn bộ và dán đè vào nội dùng file `/etc/jitsi/videobridge/sip-communicator.properties` của server videobridge mới. Nhưng nhớ trừ  `MUC_NICKNAME` nhé. File sẽ trông như này :

```
org.jitsi.videobridge.DISABLE_TCP_HARVESTER=true
org.jitsi.videobridge.ENABLE_STATISTICS=true
org.jitsi.videobridge.STATISTICS_TRANSPORT=muc
org.jitsi.videobridge.xmpp.user.shard.HOSTNAME=<your jitsi-meet Server as DNS like jitsi.example.tld>
org.jitsi.videobridge.xmpp.user.shard.DOMAIN=auth.<your jitsi-meet Server as DNS like jitsi.example.tld>
org.jitsi.videobridge.xmpp.user.shard.USERNAME=jvb
org.jitsi.videobridge.xmpp.user.shard.PASSWORD=<secret from JMS - keep it; do not change it>
org.jitsi.videobridge.xmpp.user.shard.MUC_JIDS=JvbBrewery@internal.auth.<your jitsi-meet Server as DNS like jitsi.example.tld>
org.jitsi.videobridge.xmpp.user.shard.MUC_NICKNAME=<any unique name here; important: unique value for each videobridge like "jvb2">
org.jitsi.videobridge.xmpp.user.shard.DISABLE_CERTIFICATE_VERIFICATION=true
```

**Step 6**: Restart videobridge
```
service jitsi-videobridge2 restart 
```

Sau đó bạn nhớ check log của videobridge mới vào jicofo của hệ thống đang chạy nhé

- Server với hệ thống đang chạy : `tailf /var/log/jitsi/jicofo.log`
- Server videobridge mới : `tailf //var/log/jitsi/jvb.log`

Log jicofo mà trông như này là đẹp zai:

```Jicofo INFORMATION: [30] org.jitsi.jicofo.xmpp.BaseBrewery.processInstanceStatusChanged().329 Added brewery instance: jvb
brewery@internal.auth.<your jitsi-domain>/<your JVB NICKNAME like jvb2>
Jicofo INFORMATION: [30] org.jitsi.jicofo.bridge.BridgeSelector.log() Added videobridge: jvbbrewery@internal.auth.<your jitsi-domain>/<your JVB NICKNAME like jvb2> v: null
```

### Test 

Để test vụ cài cắm này thì mình thấy cách đơn giản nhất là stop con videobridge đang chạy và vào mấy tab meet xem có hoạt động bình thường không là biết ngay, lỗi j thì đọc log thôi :laughing:

Done nha :kissing_heart: