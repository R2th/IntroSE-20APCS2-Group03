Hi mọi người lại là mình đây, 
Tiếp tục với loạt bài viết về video conference nào :D

Đã bao giờ bạn họp với đối tác hoặc khách hàng là người nước ngoài trong khi kỹ năng nghe của bạn không thực sự tốt :scream::scream::scream::scream::scream::scream:

Mình cần biến giọng nói của các thành viên trong conference thành text cho dễ giao tiếp nhỉ

Không cần biết về AI vẫn làm đc :D Mình sử dụng jigasi nhé :D

Okay let's start

## Các bước chuẩn bị 
 Trước tiên bạn cần có 1 hệ thống conference trước đã nhé. Xem [ở đây](https://viblo.asia/p/xay-dung-va-trien-khai-he-thong-hop-truc-tuyen-aWj533wo56m) này
 
## Cài đặt jigasi 
**1. Clone source**
> Nhớ checkout về tag cùng version với các hệ thống jicofo, jitsi-videobridge nhé
```
git clone https://github.com/jitsi/jigasi.git
```
**2. Build**

```
cd jigasi
mvn install -Dassembly.skipAssembly=false
```
**3. Giải nén** `jigasi-linux-x64-{version}.zip, jigasi-linux-x86-{version}.zip` **hoặc** `jigasi-macosx-{version}.zip` **tùy thuộc vào system của bạn nhé**

```
cd target/
unzip jigasi-{os-version}-{version}.zip
```
 
**4. Config prosody, jicofo**

- **Prosody**:
Thêm component khai báo callcontrol và internal muc tại /etc/prosody/prosody.cfg.lua (hoặc trong conf.avai/domain.lua):
```
Component "callcontrol.your-domain.com"
    component_secret = "topsecret"

Component "internal.muc.your-domain.com" "muc"
   modules_enabled = {
     "ping";
   }
   storage = "memory" -- for 0.11
   muc_room_cache_size = 1000
```

>- Callcontrol để gọi điện vào trong lớp.
Internal MUC để jigasi internal join vào lớp để record và transcribe
>- "topsecret" dùng để config trong jigasi/config giống nhau để callcontroll vào được lớp (Nếu dùng quickinstall component này sẽ được tựu động add thêm)

- **Jicofo**:
Trong /jicoso/sip-communicator.properties thêm dòng sau:

```
org.jitsi.jicofo.jigasi.BREWERY=JigasiBreweryRoom@internal.muc.your-domain.com
```
Tạo tài khoản MUC cho Jigasi	
```
sudo prosodyctl register jigasi auth.your-domain.com pass
```

**5**. **Config Jigasi**

- **Trong jigasi/config**
   + Thêm Credentials dùng để kết nối gcloud dùng speech to text api
   export GOOGLE_APPLICATION_CREDENTIALS=/home/.../google-speech-example.json
>Credential tạo ở:
https://developers.google.com/accounts/docs/application-default-credentials
   
   
- **Trong jigasi/sip-communicator.properties:**
   - Config tài khoản SIP (k cần nếu chỉ transcript):
   ( ***exp***: ACCOUNT_UID=SIP\:9920, PASSWORD=OTkyMHRvcGljYXRlc3Q=, SERVER_ADDRESS=<your-ip-server>, USER_ID=9920)

    - Enable tính năng transcriber và call SIP:
    
    ```
    org.jitsi.jigasi.ENABLE_TRANSCRIPTION=true
    org.jitsi.jigasi.ENABLE_SIP=false

    # delivering final transcript
    org.jitsi.jigasi.transcription.DIRECTORY=/home/thuanbx/text_trans
    org.jitsi.jigasi.transcription.BASE_URL=your-domain.com
    org.jitsi.jigasi.transcription.jetty.port=-1
    org.jitsi.jigasi.transcription.ADVERTISE_URL=false

    # save formats
      org.jitsi.jigasi.transcription.SAVE_JSON=false
      org.jitsi.jigasi.transcription.SAVE_TXT=true

    # send formats
     org.jitsi.jigasi.transcription.SEND_JSON=true  (để show được trên màn hình user)
     org.jitsi.jigasi.transcription.SEND_TXT=false  (để gửi lên khung chat)
    ```
   -  Enable Brewery:  
    ```
    org.jitsi.jigasi.BREWERY_ENABLED=true
    ```
   + Config tài khoản BREWERY, XMPP muc để jigasi join vào lớp transcript (giống tài khoản config cho prosody và jicofo):
    ```
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1=acc-xmpp-1
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.ACCOUNT_UID=Jabber:jigasi@auth.your-domain.com@your-domain.com
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.USER_ID=jigasi@auth.your-domain.com
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IS_SERVER_OVERRIDDEN=true
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.SERVER_ADDRESS=42.112.28.161
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.SERVER_PORT=5222
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.BOSH_URL=https://your-domain.com/http-bind
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.ALLOW_NON_SECURE=true
    #base64
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.PASSWORD=aGFpbm4z
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.RESOURCE_PRIORITY=30
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.KEEP_ALIVE_METHOD=XEP-0199
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.KEEP_ALIVE_INTERVAL=30
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.CALLING_DISABLED=true
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.JINGLE_NODES_ENABLED=false
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IS_CARBON_DISABLED=true
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IS_USE_ICE=true
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IS_ACCOUNT_DISABLED=false
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IS_PREFERRED_PROTOCOL=false
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.AUTO_DISCOVER_JINGLE_NODES=false
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.PROTOCOL=Jabber
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IS_USE_UPNP=false
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IM_DISABLED=true
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.SERVER_STORED_INFO_DISABLED=true
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.IS_FILE_TRANSFER_DISABLED=true
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.BOSH_URL_PATTERN=https://{host}{subdomain}/http-bind?room={roomName}
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.DOMAIN_BASE=your-domain.com
    net.java.sip.communicator.impl.protocol.jabber.acc-xmpp-1.BREWERY=JigasiBreweryRoom@internal.muc.your-domain.com
    ```
**6. Run**
```
    ./jigasi.sh --domain=your-domain.com --subdomain=callcontrol --secret=Tyw2TZ8N
```
    
## Setup ngôn ngữ Transcription 
Bạn vào đây nhé
   cd /src/main/java/org/jitsi/jigasi/transcription/GoogleCloudTranscriptionService.java
Sửa line 270
  ```
  // set the Language tag
    String languageTag = <language-code>;
    validateLanguageTag(languageTag);
    builder.setLanguageCode(languageTag);
```
Danh sách language-code đây nhé:

```
    "af-ZA",
    "id-ID",
    "ms-MY",
    "ca-ES",
    "cs-CZ",
    "da-DK",
    "de-DE",
    "en-AU",
    "en-CA",
    "en-GB",
    "en-IN",
    "en-IE",
    "en-NZ",
    "en-PH",
    "en-ZA",
    "en-US",
    "es-AR",
    "es-BO",
    "es-CL",
    "es-CO",
    "es-CR",
    "es-EC",
    "es-SV",
    "es-ES",
    "es-US",
    "es-GT",
    "es-HN",
    "es-MX",
    "es-NI",
    "es-PA",
    "es-PY",
    "es-PE",
    "es-PR",
    "es-DO",
    "es-UY",
    "es-VE",
    "eu-ES",
    "fil-PH",
    "fr-CA",
    "fr-FR",
    "gl-ES",
    "hr-HR",
    "zu-ZA",
    "is-IS",
    "it-IT",
    "lt-LT",
    "hu-HU",
    "nl-NL",
    "nb-NO",
    "pl-PL",
    "pt-BR",
    "pt-PT",
    "ro-RO",
    "sk-SK",
    "sl-SI",
    "fi-FI",
    "sv-SE",
    "vi-VN",
    "tr-TR",
    "el-GR",
    "bg-BG",
    "ru-RU",
    "sr-RS",
    "uk-UA",
    "he-IL",
    "ar-IL",
    "ar-JO",
    "ar-AE",
    "ar-BH",
    "ar-DZ",
    "ar-SA",
    "ar-IQ",
    "ar-KW",
    "ar-MA",
    "ar-TN",
    "ar-OM",
    "ar-PS",
    "ar-QA",
    "ar-LB",
    "ar-EG",
    "fa-IR",
    "hi-IN",
    "th-TH",
    "ko-KR",
    "cmn-Hant-TW",
    "yue-Hant-HK",
    "ja-JP",
    "cmn-Hans-HK",
    "cmn-Hans-CN",
```
Và sau đó chạy lại với lệnh run ở bên trên
## Join vào conference và trải nghiệm nào :D
    
Để kích hoạt transcription bạn ở vào nút cc ở thanh toolbar nhé ![](https://images.viblo.asia/ee5993a2-04e2-404e-bd24-5ab242584e11.png) 

## Tham khảo
https://github.com/jitsi/jigasi