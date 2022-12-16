# Lời nói đầu
Hello mọi người, lại là mình đây . Và tiếp tục về chủ đề AWS . Ngày hôm nay chúng ta sẽ cùng nghien cứu về Route 53 nhé .  Đây là những kiến thức mình muốn chia sẻ với mọi người và cũng coi như một lần mình note ra để nhớ lại bài học . Và các kiến thức mình tiếp thu được trong bài thì nó không toàn diện và có thể sai sót vì đây là những kiến thức hạn hẹp của mình . Nếu có gì thiếu sót mong mọi người comment và cho mình biết . Mình rất hy vọng nó có ích cho ai đó . Cám ơn các bạn rất nhiều ! Nào mình cùng bắt đầu nhé !
# Nội dung
## DNS là gì

- DNS là viết tắt của Domain Name System . Như các bạn đã biết thì không gian mạng là một không gian số , mọi địa chỉ đều được số hóa kiểu `182.123.120.1`  . Tuy nhiên, đây là những con số không có ý nghĩa và rất khó để ghi nhớ . Vì vậy `DNS` ra đời nhằm mục đích chuyển đổi những dãy số vô nghĩa thành những cấu trúc gần gũi và dễ nhớ với con người hơn. Ví dụ:

        172.217.18.36  => www.google.com

- DNS có vai trò như là xương sống của internet .

### Một số định nghĩa:

- Domain registar: Godday, Router 53 , ... ... Các công ty bán domain mà bạn biết
- DNS Record : A , AAA, CNAME, NS, ........... (Nếu ban chưa hiểu thì cũng đừng lo lắng chung ta sẽ nói kĩ hơn ở các phần sau)
- Name Server: Nơi phân giải domain thành ip của chúng
- Top Level Domain : `.com`, `.vn`, ........
- Second Level Domain:  `google.com`, `aws.com`

![](https://images.viblo.asia/3498d9db-f964-47d0-82dc-9d9416da4611.png)


## Overview Route 53

- `Route 53` là một công ty cung cấp domain , nơi mà bạn có thể đăng kí những domain mà bạn muốn sở hữu (Ví dụ : example.com )
- `Route 53` cũng là một công cụ quản lý DNS được quản lý  rât hữu hiệu , có tính ứng dụng cao và có khả năng mở rộng rất tốt. Nó cho phép bạn có toàn quyền kiểm soát các DNS mà bạn có
- Đây là công cụ để bạn kết nối client với EC2 của bạn . Dưới đây là quy trình từ client đến `EC2`
![](https://images.viblo.asia/f239c120-ed43-4c55-bff2-9f3f880cb8b1.png)

    - EC 2 chỉ cung cấp cho bạn một địa chỉ public ip
    - Bạn dụng public ip này tạo 1 record DNS trên route 53 (Ví dụ : example.com )
    - Khi client vào example.com thì sẽ gọi ROUTE 53 hỏi và ra ip 52.22.33.44
    - Client kết nối EC2 thông qua IP
    
- `Route 53` cho phép bạn định nghĩa cách mà một domain đi đến đúng đích của nó thông quan các DNS record . Mỗi record này có những thuộc tính như sau :
    - Domain or Subdomain
    - Record type  . E.g : A , AAAA , NS , 
    - Value  : Là ip hoặc DNS (Loadbalancer , S3, ...v....v...) target  - E.g : 52.22.33.44
    - Routing Policy : Cách mà Route 53 sẽ trả lại ip từ domain được cung cấp
    - ttl : Thời gian bản ghi đó được lưu vào bộ nhứ đệm DNS Resolvers dưới client 

- `Route 53`Support khá nhiều DNS record type :
    - A , AAAA, CNAME, NS (Những type mà chúng ta nên biết)
    - CAA / DS / MX / NAPTR/ PTR / SOA/ TXT / SPF / SRV

### DNS record type
- A :  DNS map domain với IPv4
- AAAA :  DNS map domain với IPv6
- CNAME:  DNS map hostname đến một hostname khác  (Target hostname có thể là A vs AAAA record) 
- NS :  Name Servers forr the Hosted Zone (Nơi quản lý các traffic của một domain)

### Hosted Zone
- Là một tập hợp các DNS record dùng chung một domain (trong đó có thể có đầy đủ các DNS cho chính bản thân domain và subdomain của nó - E.g : example.com , api.example.com, ....v....v..... -- E.g : application.example.com)
 - Có 2 loại hosted zone :
     - Public Hosted Zone : Nơi chứa đựng các bản ghi route trên môi trường Internet ( Bạn mua 1 domain xong sau đó add record vào public Hosted Zone , các client mọi nơi trên thế giới đều vào đk thông qua đây)
     - Private Hosted Zone: Nơi chứa đụng các bản ghi chỉ đường trong môi trường VPC private cua bạn (Hiểu ngắn gọn thì là mỗi trường mạng LAN . Chỉ có các máy tính thuộc VPC của bạn mới có thể truy câp vào đk -- E.g : `application.company.internal`) 
- Mỗi Hosted Zone sẽ bị tính phí là 0.5$ / tháng
![](https://images.viblo.asia/7b975d38-b5bf-43ac-b196-dea773a6dfc4.png)

## TTL (Time to live)
 - Khi bạn truy cập vào một domain nào đó example.com, trước tiên máy của bạn sẽ query lên DNS server (Ở đây là Route 53)
 - Route 53 sẽ trả về IP của example.com kèm theo 1 thông số là `ttl`
 - Máy của bạn sẽ cache lại thông tin này trong 1 khoảng thời gian đúng bằng với số `ttl` (Đơn vị đo là phút)
 - Trong khoảng thời gian cache này , khi có thêm 1 request tời example.com , máy của bạn sẽ không query lên DNS server để hỏi nữa mà sẽ dùng trực tiếp cache. Cụ thể như sau :
![](https://images.viblo.asia/35c48fd5-484e-4f8c-9541-cc2acec65c29.png)
 - Nếu bạn để `ttl` có giá trị cao:
     - Hạn chế các request đến DNS server ==> tiết kiệm tiền
     - Chỉ nên dùng khi domain ít thay đổi các địa chỉ IP , vì nếu thay đổi nhiều sẽ dẫn đến việc request tới các server không mong muốn do DNS record bị cache lại ở client

- Nếu bạn để `ttl` có giá trị thấp :
    - Gia tăng request đến DNS server ==> Mất phí nhiều hơn
    - Có thể thay đổi linh hoạt được địa chỉ IP cho domain vì thời gian cache là rất thấp.

- `ttl` là thông số bắt buộc với các record type . Trừ `ALIAS`

>  Trong trường hợp cần check ttl của DNS record chúng ta có thể sử dụng các package lệnh `nslookup example.com` hay là `dig example.com`

## CNAME và ALIAS

Nhìn một cách đơn giản thì CNAME và ALIAS khá giống nhau  nhưng thực ra lại khác nhau khá nhiều. Nào hãy cũng nhìn bảng dưới đây nhé :



|  | CNAME | ALIAS |
| -------- | -------- | -------- |
| Target group Object    | Point to other host     | Only Point to AWS resource ![](https://images.viblo.asia/7505bd86-42a3-4b70-a7f1-88177198c0a9.png)  |
| Target group Value      | DNS or Hostname      | DNS     |
| Reponse to client      | Trả về DNS or Hostname , client cần query thêm để có A/AAAA value  | Trả về  A/AAAA valune     |
| Charge      | Yes      | No     |
| TTL      | Yes      | No     |
| Use Root Domain      | No      | Yes     |


## Health Checks
- Health Checks trong Route 53 chỉ được áp dụng với các public resource . Đây là một công cụ rất tốt để kiểm tra trạng thái của từng resource.
- Hình ảnh trên miêu ta 1 case study như sau :
    - Chúng ta có 2 ALB trỏ về 2  EC2 thuộc 2 resgion khác nhau nhưng chạy cùng 1 App
    - Chúng ta sử dụng Route 53 để định danh domain để truy cập vào 2 ALB này (example.com)
    - Đương nhiên chúng ta cần quan tâm đến tinh khả dụng và chống chịu lỗi cao nên cần tính đến việc 1 trong 2 server bị down thì vẫn còn server còn lại phục vụ client
    - Ok, vậy chúng ta cần create Health Checks ở ở Route 53 và từ đây có thể quản lý việc phân tải traffic (Mình sẽ nói kĩ hơn ở phần sau)

![](https://images.viblo.asia/9a5f083d-afde-49c1-be34-04d2ba4e4506.png)

- Health Checks có thể theo dõi các nhiều dạng endpoint khác nhau (Application , server, public resourch khác của AWS )
- Health Check có thể theo dõi các Health Check khác 
- Healcheck cũng có thể theo dõi CloudWatch Alarms (Điều này rất có ích cho việc kiểm xoát các Private Resouce)
- Health Check cũng có những thông số riêng và ta có thể xem nó bên trong CloudWatch 

### Work with Specific endpoint

![](https://images.viblo.asia/4f51b29f-e393-4365-98d9-8d943ed21a6c.png)

- Không chỉ có 1 mà sẽ có 15 Healtch Checker đến từ khắp các nơi trên thế giới check endpoint chúng ta setup 
    - Healthy / Unhealthy Threshold (Default : 3)
    - Interval (Time set Healthy or Unheathy )  30s (default)
    - Support method : HTTP, HTTPS, TCP
    - Nếu > 18% heath checker report endpoint là healthy thì Router 53 sẽ đánh giá là Healthy và ngược lại
    - Có thể lựa chọn location mà bạn muốn Route 53 sư dụng

- Health check chỉ pass khi khi reponse của endpoint trả về là 2xx hoặc 3xx status code
- Nếu Bạn muốn kiểm tra pass or fail thông qua kí tự trả về thì cũng có thể , health check có thể check 5120 byte kí tự đầu tiên

### Work with other Healthcheck 

![](https://images.viblo.asia/de5c1025-18b6-4acf-91e3-1e03070a8f96.png)

- Chúng ta cũng có thể thực hiện healcheck cho một nhóm healcheck đơn lẻ khác nhau
- Có thể theo doi cùng 1 lúc 256 healtcheck cùng 1 lúc
- Định nghĩa được bao nhiêu health check con phải pass thì health check cha mới pass
- Bạn có thể sử dụng các toán tử OR, AND, NOT
- Sử dụng khi muốn theo dõi cả 1 hệ thông website của bạn chứ ko phải từng website con đơn lẻ


### Work with private resource. 
![](https://images.viblo.asia/d0227421-8043-4342-a1ae-3f8cd0cbfd57.png)

- Như đã trình bày bên trên, Health Check chỉ có thể work với các public resource và private resource (VPC private ) thì Health Check không thể truy cập vào đk.
- Tuy nhiên, vẫn có cách để xử lý việc này đó là dung CloudWatch Metric để theo dõi VPC (sẽ thiết lâp ALARM cho metric này) và Health Check thì theo dõi  CloudWatch Metric này
- Và khi ALARM chuyển trạng thái thì Health Check cũng sẽ nhận được thông tin (Consider to set Unhealthy) .


## Routing Policy
Thông số này cho ta biết cách mà Router 53 sẽ trả về các DNS record cho client . Hãy tìm hiểu từng loại nhé :
### Simple
![](https://images.viblo.asia/8fd82274-5f64-4771-8dec-167a12b8721e.png)

- Ý tưởng ở đây rất đơn giản như truy vấn dữ liệu thông thường, bạn request lên DNS server và server sẽ trả lại Record cho bạn
- Ngoài ra cũng có thể setup nhiều value cho record này , trong trường hợp này thì client sẽ RANDOM 1 trong các value của record
- Với cách này chúng ta ko thể sử dụng Health Checks 

### Weighted
- Ý tưởng ở đây là chúng ta có thể điều hướng request đến IP tương ứng thông qua tỉ lệ phần trong request đến 1 domain. Cụ thể bạn có thể xem ví dụ bên dưới:

![](https://images.viblo.asia/4e7cfa24-8f20-4b5e-88b4-43a24007d18b.png)

- Bạn không cần thiết phải set tổng weight của các  record là 100. Bởi vì % này được tính theo công thức :

    `trafic (%)`  = `weight of record` / `sum of weight for all record`
    
- Các DNS record này phải cùng chung một `Domain or Subdomain` và chung `type` (A, AAAA, .v...v...)
- Chúng ta có thể áp dụng healcheck cho record này
- Khi bạn set weight bằng 0 cho 1 trong các record thì điều đó có nghĩa là sẽ dưng phân phối traffic cho ip của record đó
- Khi tất cả các weight được set là 0 thì traffic sẽ được phân phối đều nhau

### Latency
![](https://images.viblo.asia/b4b41be5-0ceb-4d1b-a0d9-73c25ab1ab4f.png)

- Ý tưởng ở đây là sẽ trả lại các bản ghi DNS dựa trên độ trễ reponse của user vs AWS resource
- Route 53 sẽ chọn resource có khoảng cách gần nhất user
- Điều này khá hữu dụng trong thực tế để nâng cao trải nghiệm người dùng khi user có thể đến từ khắp các khu vực chứ không phải cố định
- Chúng ta có thể sử dụng Health Checks với cách này


### Failover
![](https://images.viblo.asia/ac145a36-9285-48e8-bba6-bd864ac7a7ab.png)

- Bài toán cần giải quyết ở đây khá đơn giản: Đó là việc bạn cần 1 server backup cho server đang chạy hiện tại, trong case mà server chính có vấn đề ta luôn có server thứ 2 backup
- Như bạn đã thấy trên bản mô tả , khá rõ ràng rằng chúng ta sẽ setup 2 server (1 chính - 1 phụ) server chính là bắt buộc phải có . Hiển nhiên rồi
- Router 53 sẽ dùng health check để đánh giá xem server chính còn hoạt động nếu ok thì vẫn set ở trạng thái healthy và có thể tiếp nhận request . Còn nếu ko thì server thứ 2 sẽ đk kích hoạt. Vậy thôi


### Geolocation
![](https://images.viblo.asia/b06bebe2-d6be-4b04-8834-c096500a71b2.png)

- Type này nhìn thì có vẻ giống nhưng khác khá nhiều so với `Latency`
- Mặc dù cũng base-on trên user location nhưng với `Geolocation` bạn sẽ chỉ định xem user ip nào sẽ đi đến server nào chứ ko phải để Router 53 tính toán như `Latency` 
- Bạn cần set 1 bản ghi mặc định (Khi user position không thuộc bất kì record nào mà bạn định nghĩa thì DNS server sẽ trả về địa điểm này)
- Với type này chúng ta cũng có thể sử dụng Health Check
- Với ví dụ như hình vẽ , nếu ip chúng ta đến từ Pháp thì sẽ active server của Pháp , ở Đức thì active server tại đức

### Geoproximity
![](https://images.viblo.asia/50f74602-ac7b-45cc-b13b-fbcdc54b540d.png)

- Chính sách này khá thú vị vi nó base trên vị trí của user và resouce của ban
- Nó cho phép bạn chuyển nhiều traffic hơn đến 1 resource mà bạn mong muốn thông quan 1 thông số là `bias`
    - Khi muốn nhiều traffic hơn thì tăng Bias lên (1 - 99)
    - Khi muốn ít traffic thì giảm Bias(-99 -> -1)

- Nhìn trên hình vẽ ta cũng thấy đk sự thiên lệch khi set Bias
- Chính sách này thực sự rất hữu ích khi bạn muốn , user từ location này có thể sử dụng resouce từ location khác . Hoặc lý do có thể là location này bạn mua đk server ngon hơn server bên location kia và muốn nhiều request hơn :D

### Multi Value

- Chính sách này được sử dụng khi traffic có thể đi tới nhiều resource khác nhau
- Router trả về nhiều value cho cùng 1 domain
- Chính sách này chúng ta có thể áp dụng health check (Chỉ trả về nhưng resource healthy) ==> điều này khác với thằng `simple` bên trên , `simple` cũng có thể trả về nhiều value nhưng vs `simple` chúng ta ko đảm bảo đk các resource là healthy
- Có thể trả đến 8 record resource khi được query
- Nhìn có vẻ giống ELB nhưng nó không thể thay thế đk ELB , ý tưởng là client sẽ làm ELB và random 1 trong các resource để truy cập

# Kết luận
Ok, bài viết của mình đã trình bày hết tất cả kiến thức của mình về Router 53 rồi nên mình xin kết thúc tại đây. Hy vọng bài viết này sẽ giúp ích chút gì đó cho mọi người. Thân !