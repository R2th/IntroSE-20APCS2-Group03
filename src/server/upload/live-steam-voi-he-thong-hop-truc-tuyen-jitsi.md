Bài viết trước mình đã hướng dẫn xây dựng hệ thống họp trực tuyến với Jitsi
Các bạn có thể xem lại ở đây :  [here](https://viblo.asia/p/xay-dung-va-trien-khai-he-thong-hop-truc-tuyen-aWj533wo56m)
Ở bài viết này mình sẽ hướng dẫn các bạn live steam cuộc họp lên youtube với JIBRI

## JIBRI là gì?
Jibri cung cấp dịch vụ để ghi hoặc phát trực tuyến hội nghị Jitsi Meet.

Jibri hoạt động bằng cách giả lập một user với với Chrome ảo sau đó capture lại màn hình và mã hóa đầu ra bằng ffmpeg. Jibri được thiết kế để chạy trên một máy riêng biệt (hoặc VM), không có ứng dụng nào khác sử dụng màn hình hoặc thiết bị âm thanh. Chỉ một bản ghi tại một thời điểm được hỗ trợ trên một jibri duy nhất.

## Cài đặt Jibri
#### Lưu ý trước khi cài đặt
Jibri được built trên Ubuntu 16.04 (Xenial) và đã được test với the pre-built kernel and extra kernel modules `(linux-image-extra-virtual package)`. Bất kỳ thay đổi hoặc cấu hình kernel nào khác CÓ THỂ hoạt động nhưng chưa được test.

#### ALSA and Loopback Device
* Trước tiên, hãy đảm bảo mô đun loopback ALSA đã được cài đặt. Các mô-đun bổ sung (bao gồm ALSA loopback) có thể được cài đặt trên Ubuntu 16.04 bằng tên package `linux-image-extra-virtual` 
* Chạy với quyền root
    * Cài đặt module được load trong boot: `echo "snd-aloop" >> /etc/modules`
    * Load module : `modprobe snd-aloop`
    * Kiểm tra xem module đã được load chưa: `lsmod | grep snd_aloop`
* Nếu output hiển thị module snd-aloop được load, thì bước cấu hình ALSA loopback hoàn tất.

#### Ffmpeg với hỗ trợ chụp X11
* Jibri yêu cầu cài đặt ffmpeg  với chụp x11 được biên dịch. Điều này được mặc định trong Ubuntu 16.04, bằng cách cài đặt gói ffmpeg.
* Nếu xây dựng Jibri cho Ubuntu 14.04 (trusty), repo mc3man cung cấp các package. Sử dụng như sau trong Ubuntu 14.04:
```
sudo add-apt-repository ppa:mc3man/trusty-media
sudo apt-get update
sudo apt-get install ffmpeg
```

#### Google Chrome stable & Chromedriver

Bạn nên sử dụng phiên bản stable của Google Chrome. Bạn có thể cài đặt bằng apt với các bước như sau:
```
curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
apt-get -y update
apt-get -y install google-chrome-stable
```

Thêm chrome managed policies file và set `CommandLineFlagSecurityWarningsEnabled` bằng `false`. Giúp ảnh các cảnh báo của Chrome. Set như sau: 
```
mkdir -p /etc/opt/chrome/policies/managed
echo '{ "CommandLineFlagSecurityWarningsEnabled": false }' >>/etc/opt/chrome/policies/managed/managed_policies.json
```

Chromedriver cũng bắt buộc. Cài như sau: 
```
CHROME_DRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`
wget -N http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/bin/chromedriver
sudo chown root:root /usr/local/bin/chromedriver
sudo chmod 0755 /usr/local/bin/chromedriver
```

Cài đặt một số package cần thiết khác:
```
sudo apt-get install default-jre-headless ffmpeg curl alsa-utils icewm xdotool xserver-xorg-input-void xserver-xorg-video-dummy
```

#### Cài đặt jibri 

```
wget -qO - https://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add -
sudo sh -c "echo 'deb https://download.jitsi.org stable/' > /etc/apt/sources.list.d/jitsi-stable.list"
sudo apt-get update
sudo apt-get install jibri
```

#### User, group
* Jibri được chạy như một người dùng hệ thống thông thường. Ví dụ này tạo user 'jibri' và group 'jibri', nhưng bất kỳ user nào cũng được. Điều này chưa được test với user root.
```
sudo usermod -aG adm,audio,video,plugdev jibri
```

#### Config files
* Sửa biến trong file config.json (/etc/jitsi/jibri/config.json).

#### Logging
* Các loại log sẽ được lưu ở `/var/log/jitsi/jibri`

> Đến bước này bạn đã cài đặt xong Jibri. Bước tiếp theo chúng ta sẽ connect jibri vào hệ thống họp trực tuyến được cài đặt ở bài trước nhé

## Connect Jibri với Jitsi Meet
Jibri yêu cầu một số cài đặt trong config của Jitsi Meet. Những thay đổi này bao gồm virtualhosts và accounts trong Prosody, cài đặt cho web (trong config.js) cũng như `jicofo sip-communicator.properties`

#### Prosody
Create the internal MUC component entry. This is required so that the jibri clients can be discovered by Jicofo in a MUC that's not externally accessible by jitsi meet users. Add the following in /etc/prosody/prosody.cfg.lua:
Khởi tạo MUC. Điều này là bắt buộc để  jibri connect được với  Jicofo. Thêm vào file `/etc/prosody/prosody.cfg.lua`:
```
    -- internal muc component, meant to enable pools of jibri and jigasi clients
Component "internal.auth.yourdomain.com" "muc"
    modules_enabled = {
      "ping";
    }
    storage = "null"
    muc_room_cache_size = 1000
   ```
    
Ở file /etc/prosody/prosody.cfg.lua: 
```
VirtualHost "recorder.yourdomain.com"
  modules_enabled = {
    "ping";
  }
  authentication = "internal_plain"
  ```
  
  Đăng kí tài khoản để jibri sử dụng: 
  ```
  prosodyctl register jibri auth.yourdomain.com jibriauthpass
  prosodyctl register recorder recorder.yourdomain.com jibrirecorderpass
```

#### Config Jicofo
Sửa file `/etc/jitsi/jicofo/sip-communicator.properties`, thiết lập MUC thích hợp để tìm kiếm  Jibri Controllers. Đây phải là MUC giống như set trong config.json của jibri. Restart Jicofo sau khi setup. Bạn cũng nên đặt PENDING_TIMEOUT thành 90 giây, để cho phép Jibri một thời gian khởi động trước khi bị đánh dấu là thất bại.

```
org.jitsi.jicofo.jibri.BREWERY=JibriBrewery@internal.auth.yourdomain.com
org.jitsi.jicofo.jibri.PENDING_TIMEOUT=90
```

#### Config Jitsi Meet
Sửa file config.js trong code hoặc` /etc/jitsi/meet/yourdomain-config.js`:
```
fileRecordingsEnabled: true, // If you want to enable file recording
hiddenDomain: 'recorder.yourdomain.com',
```

#### Start Jibri
```
sudo systemctl restart jibri
```

Sau bước này bạn cần đọc log jibri, jicofo và prosody :
`tailf /var/log/jitsi/jibri/log.0.txt`, `tailf /var/log/jitsi/jicofo.log`, `tailf /var/log/prosody/prosody.log`
nếu log của jicofo hiển thị như sau là bạn đã connect được jibri và jicofo
``` 
Jicofo 2020-07-22 15:59:21.357 INFO: [30] org.jitsi.jicofo.xmpp.BaseBrewery.log() Added brewery instance: jibribrewery@internal.auth.yourdomain/jibri-name
Jicofo 2020-07-22 15:59:21.357 INFO: [30] org.jitsi.jicofo.recording.jibri.JibriDetector.log() Received Jibri jibribrewery@internal.auth.yourdomain/jibri-name status <jibri-status xmlns='http://jitsi.org/protocol/jibri'><busy-status xmlns='http://jitsi.org/protocol/jibri' status='idle'/><health-status xmlns='http://jitsi.org/protocol/health' status='healthy'/></jibri-status>
Jicofo 2020-07-22 15:59:21.357 INFO: [30] org.jitsi.jicofo.recording.jibri.JibriDetector.log() Jibri: jibribrewery@internal.auth.yourdomain/jibri-name available: true
```

## Live Stream
Sửa file config của JItsi Meet: 
```
liveStreamingEnabled: true, // If you want to enable live streaming
```

Khi vào giao diện của Jitsi Meet và mở option bạn sẽ thấy như sau 

![](https://images.viblo.asia/4b8eebb8-c881-4aab-97ba-674c0cc03e47.png)

Chọn live steam và nhập Youtube live stream key 

![](https://images.viblo.asia/681b0a08-6cc6-4980-b078-1dada212dcab.png)

Truy cập link sau:  [here](https://www.youtube.com/live_dashboard?nv=1) để lấy key của bạn

![](https://images.viblo.asia/267e2f5c-40b3-43d1-9c02-74fe62e17550.png)


# Tham khảo
https://jitsi.github.io/handbook/docs/intro