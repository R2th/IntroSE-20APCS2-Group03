# Lời nói đầu
Gần đây mình mới có cơ hội được tham gia vào một khóa học về networking cơ bản rất thú vị . Nó cho mình các kiến thức nền tảng về Networking để mình hiểu hơn về hệ thống mạng . Nên mình rất muốn chia sẻ với mọi người những kiến thức này và cũng coi như một lần mình note ra để nhớ lại bài học . Và các kiến thức mình tiếp thu được trong bài thì nó không toàn diện và có thể sai sót vì đây là những kiến thức hạn hẹp của mình . Nếu có gì thiếu sót mong mọi người comment và cho mình biết . Mình rất hy vọng nó có ích cho ai đó . Cám ơn các bạn rất nhiều ! Nào mình cùng bắt đầu nhé ! :D :D

 [Basic Networking !](#) 
 
  [AWS Basic Networking Structure!](https://viblo.asia/p/aws-basic-networking-structure-3Q75wVWGlWb) 
# Nội dung
## Request Life Cycle 
Bây giờ chúng ta có một bài toán rất cơ bản. Bạn vào web và muốn truy cập đến google.com . 
![](https://images.viblo.asia/0b9acfc5-4e1d-4b9e-b34f-f031234129d0.png)

Rất hiển nhiên đây  sẽ nhận được kết quả mà bạn nhận được một cách nhanh chóng .

Không bàn đến những cái này, chúng ta sẽ cùng tìm hiểu xem Network bên dưới đã hoạt động như thế nào nhé .

- Đầu tiên máy của bạn cần có địa chỉ `IP` cụ thể
- Máy của bạn cần biết  google.com có địa chỉ IP  là bao nhiêu thông qua việc hỏi `DNS` (Domain Name System) server 
- Sau khi đã có được IP, máy của bạn sẽ gửi một request đến google.com thông qua địa chỉ IP vừa nhận được 
- Mạng máy tính của bạn nhận được yêu cầu của bạn và gửi request đi đồng thời cấp phát 1 cổng để google.com biết sẽ trả về cổng bao nhiêu để xác nhận gói tin đấy là của máy tính của bạn (cùng 1 lúc sẽ có rất nhiều request hoạt động nên mỗi request sẽ có cổng nhận response riêng để định danh)
- Các bộ định tuyến `router` trên mạng Internet sẽ nhận được yêu cầu của bạn và chuyển tuyến cho đến khi google.com nhận được request của bạn
- google.com nhận request và sẽ response về IP của mạng máy tính nhà bạn và cổng đã được cấp phát
- Các bộ định tuyến sẽ vận chuyển reponse lại theo cấp
- Mạng máy tính của bạn nhận được gói tin và trả lại cho máy bạn
- Và kết quả hiện lên trên máy tính của bạn :D

Đây chính là vòng đời của 1 request trong hàng chục nghìn reques mà bạn vẫn thực hiện hàng ngày nhé :D Nghe có vẻ rất phúc tạp đúng không . Chúng ta hãy tìm hiểu từng phần nhé :D


## IP 

Ip  là định danh của mỗi máy tính trên môi trường mạng để hệ thống mạng có thể hiểu được máy tính của bạn là ai , ở đâu . Nó khá giống tên tuổi của chúng ta trong xã hội . 

Ip có 2 loại:


- Mac IP Address: Đây là định danh cá nhân của tùy từng máy tính , mỗi máy tính sẽ có định danh cá nhân riêng và không máy nào giống máy nào hết . (Nó tương tự cái số chứng minh thư nhân dân của bạn đấy , mỗi người một số không ai giống ai)
- IP Address:  Đây là định danh của máy  trong môi trường mạng . Và IP trong môi trường mạng có thể bị trùng nhau nhé . Và IP thì cũng có 2 loại nhé :
    - IP private  : Là định danh trong môi trường mạng nội bộ . Tức là mạng LAN của bạn nhé , trong môi trường nội bộ này thì mỗi máy là 1 IP khác nhau nhé .
    - IP public : Là định danh trong môi trương mạng Internet (Mang WAN đó :D ). Thực tế khi đi ra ngoài thì bạn và những người cùng mạng nội bộ với bạn đi ra ngoài sẽ có cùng một dải IP và khi đó sự khác nhau sẽ chỉ nằm ở MAC IP Address 


> Để phân biệt một cách dễ dàng xem IP nào là IP public , IP nào là IP private thì rất đơn giản . Bạn chỉ cần để ý xem dải IP đó có nằm trong 3 dải IP :
> 
>  10.0.0.0 ==> 10.255.255.255 
>  
> 172.16.0.0 => 172.31.255.255
> 
> 192.168.0.0 =>  192.168.255.255
>
> Nếu nó trùng với 1 trong 3 dải IP bên trên thì đây là IP private , còn lại tất cả các thằng khác là dải IP public nhé.

## DNS (Domain Name System) 

Thực tế thì các địa chỉ IP thường khá khó nhớ không thể thông dụng nên người ta sinh ra một khái niệm mới là `domain` để khắc phục điều này

Tuy nhiên các `domain` tuy dễ nhớ nhưng lại không thể hiện được địa chỉ IP của chính bản thân chúng. Chính vì vậy `DNS` ra đời 

`DNS` có chức năng là hệ thống phân giải tên miền . Bạn có thể hiểu đơn giản là DNS server là nới để lưu trữ các IP và domain tương ứng của nó

Việc của bạn là cung cấp domain và `DNS` server sẽ trả về IP của domain đó.  

Như mình đã phân tích bên trên, trước khi đến google.com , máy bạn sẽ thưc hiện phân giải tên miền . Các bước như sau :

- Check xem domain có phải là domain local không . Băng cách quét vào file `/etc/hosts` (với Ubutu , path sẽ thay đổi tùy theo OS). Nếu đúng thì trả ra ip đã setup trong file `hosts`
- Nếu không phải ip local, thì sẽ thực hiện call lên hỏi các server DNS config trong network của máy . Bạn có thể bật Network Config lên và xem

> Noted: Trên thế giới có 1 vài DNS server lớn và điển hình là `DNS` server của google là `8.8.8.8`. Nên nhiều khi bạn update IP cho cho Domain cần chờ 1 vài giờ cho đến cả ngày để việc thay đổi của bạn được apply vào tất cả các DNS server tùy vào bên provider bạn sử dụng nhé (Với AWS thì hình như là ăn ngay :D)

Bạn cung có thể dùng command để thực hiện truy vấn domain nhé :

-  nslookup dantri.com ==> Hỏi DNS server mặc định của máy bạn xem dantri.com có địa chỉ IP là nhiêu
-  nslookup dantri.com 8.8.8.8 => Hỏi DNS server của google  xem dantri.com có địa chỉ IP là nhiêu


## PORT
Sau khi có IP của google.com . Mạng máy tính của bạn nhận được yêu cầu của bạn và gửi request đi đồng thời cấp phát 1 cổng để google.com biết sẽ trả về cổng bao nhiêu để xác nhận gói tin đấy là của máy tính của bạn (cùng 1 lúc sẽ có rất nhiều request hoạt động nên mỗi request sẽ có cổng nhận response riêng để định danh)

Các cổng được assgin sẽ được tự động tìm trong khoảng 32768 - 65535 nhé .

> Ai đã làm server nhiều chắc sẽ không lạ gì với các khái niệm port này. Ngoại trừ 1 số port default dành cho các service cụ thể như :
> 
> 22 dành cho ssh
> 
> 80 dành cho http
> 
> 443 dành cho https
> 
> v..v...v..v...v..v..........
> 
> Các port khác bạn có thể cấp phát cho các dịch vụ tùy thích


## Router (Bộ đinh tuyến)

Sau khi request của bạn đã ra khỏi mạng nội bộ, nó sẽ được chuyển đến các bộ định tuyến traffic . Ở đây request sẽ được quét xem điểm đích có nằm trong vùng mạng của khu vực đấy không . Nếu có thì sẽ chuyển thẳng đến điểm đích . Nếu không có thì sẽ chuyển đến bộ định tuyến cấp cao hơn

Thế giới có 13 bộ định tuyến lớn , tuy nhiên request của bạn đôi khi sẽ không đi qua các bộ định tuyến tầm thế giới mà chỉ đi qua các bộ định tuyến vùng hay quốc gia

VÍ dụ : Nếu bạn tời `dantri.vn` thì bạn chỉ cần đi nội bộ Việt Nam , còn tới `aws.com` thì cần qua Mỹ . 

Đơn giản là thế :D Nếu bạn muốn qua `aws.com` mà cá mập cắn cáp quang biển thì bạn biết vì sao chậm rồi đấy :D

Ngoài ra, nếu bạn muốn check xem request của mình đã được đi qua những đâu . Có thể dùng comand sau (Áp dụng cho ubuntu nhé ):

```
traceroute aws.com
```

Bạn đại khái sẽ nhận được kết quả như sau :

```
traceroute to aws.com (13.226.120.109), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  1.455 ms  2.636 ms  2.630 ms
 2  static.vnpt.vn (123.29.4.131)  10.571 ms  10.580 ms  11.019 ms
 3  static.vnpt.vn (113.171.31.22)  11.297 ms  11.362 ms  11.776 ms
 4  * * *
 5  * * *
 6  static.vnpt.vn (113.171.16.93)  15.449 ms  7.358 ms  10.301 ms
 7  static.vnpt.vn (113.171.35.137)  36.021 ms  36.130 ms  38.552 ms
 8  static.vnpt.vn (113.171.31.218)  43.137 ms  45.438 ms  47.012 ms
 9  99.82.178.192 (99.82.178.192)  45.785 ms  46.453 ms  45.905 ms
10  54.240.241.254 (54.240.241.254)  50.645 ms 54.240.241.244 (54.240.241.244)  47.262 ms 54.240.241.248 (54.240.241.248)  61.410 ms
11  54.240.241.17 (54.240.241.17)  52.457 ms 54.240.241.239 (54.240.241.239)  61.858 ms 54.240.241.79 (54.240.241.79)  48.858 ms
12  52.93.156.189 (52.93.156.189)  54.053 ms 52.93.156.195 (52.93.156.195)  42.052 ms 52.93.156.191 (52.93.156.191)  39.240 ms
13  52.93.35.110 (52.93.35.110)  32.774 ms 52.93.35.62 (52.93.35.62)  45.728 ms 52.93.35.28 (52.93.35.28)  43.038 ms
14  150.222.114.27 (150.222.114.27)  55.972 ms 150.222.114.33 (150.222.114.33)  41.694 ms 150.222.114.23 (150.222.114.23)  42.499 ms
15  * * *  // ===> những thăng *** này là các bộ định tuyến không trả về thông tin nhé !
16  * * *
17  * * *
18  * * *
19  * * *
20  server-13-226-120-109.hkg62.r.cloudfront.net (13.226.120.109)  34.437 ms  34.444 ms  33.675 ms

```

Như bạn có thể thấy, gói tin đi qua rất nhiều nơi chứ không phải đi thăng tơi nơi nhé :D

# Lời kết

Cám ơn các bạn đã đọc đến tận lúc này , đây là kiến thức mình đúc rút ra được sau bài học . Nếu có gì sai sót mong mọi người góp ý thêm nhé .

Hẹn gặp lại mọi người ở bài viết sau của minh. Mình sẽ nói về AWS Networking nhé !

Thank you very much !