Chào các bạn, hôm nay mình cùng nhau tìm hiểu về lệnh **ping** và **traceroute** trong network như thế nào nhé

![](https://images.viblo.asia/7212118d-f72e-4268-bc07-bfb2c4815fd7.jpeg)

## 1. Lệnh ping

Ping, viết tắt của Packet Internet Grouper, là một công cụ cho mạng máy tính sử dụng trên các mạng TCP/IP để kiểm tra xem có thể kết nối tới một máy chủ cụ thể nào đó hay không, và ước lượng khoảng thời gian trễ trọn vòng để gửi gói dữ liệu cũng như tỉ lệ các gói dữ liệu có thể bị mất giữa hai máy.

### Cú pháp:
```
ping [options] targetname
```
Trong đó targetname có thể là IP của máy chủ hoặc 1 domain.

Một số options trên Linux:

> -c <number>: dừng lại sau khi nhận được <number> phản hồi từ máy chủ
> 
> -t <number>: định nghĩa time to live
> 
> -v: hiển thị kết quả chi tiết

Các bạn có thể sử dụng lệnh ping --help để xem thêm các options khác. Cùng xem ví dụ bên dưới:
   ![](https://images.viblo.asia/14475ffe-d56d-4eb6-b250-36df85dab101.png)
Dựa vào kết quả trên chúng ta có thể biết được một số thông tin:

+ **IP** ứng với domain là 8.8.8.8

+ **ttl**: giá trị ttl (time to live) mặc định trên Linux là 64, khi đi qua mỗi trạm router thì giá trị ttl giảm đi 1, vì vậy dựa vào giá trị này chúng ta có thể biết được gói tin đi qua bao nhiêu trạm trước khi đến đích, để biết chi tiết các trạm router mà gói tin đã đi qua thì chúng ta có thể dùng lệnh traceroute.

+ **time**: dựa vào giá trị time trả về trong lệnh ping chúng ta có thể biết được độ ổn định của mạng, các giá trị time trả về càng gần nhau thì chứng tỏ mạng càng ổn định.
    
### Một số lỗi trả về khi dùng lệnh ping

+ **Destination Host Unreachable**: không có đường đi tới địa chỉ đích hoặc sai địa chỉ đích, khi lệnh ping gặp lỗi này nó sẽ trả về kèm theo IP của nơi cuối cùng mà gói tin đi được tới.    
+ **Request time out**: Lỗi này xuất hiện khi không kết nối được đến máy đích và không có đáp hồi trả về. Nguyên nhân của lỗi này là do các thiết bị định tuyến router bị tắt hoặc địa chỉ máy đích không có thật, bị tắt hay cấm ping.

+ **TTL expired in transit**: Lỗi này xuất hiện khi giá trị TTL (Time To Live) được đặt cho gói ping giảm xuống 0 trong khi di chuyển qua mạng trước khi đến đích. Nguyên nhân có thể do:
>  * Gói tin bị loop giữa các router do cài đặt mạng sai khiến giá trị TTL giảm đi 1 khi đi qua mỗi router cho đến khi giá trị TTL giảm bằng 0.
> * Giá trị TTL của gói bị đặt quá thấp.
    
Để khắc phục lỗi này các bạn có thể dùng lệnh **traceroute** để xem chi tiết các điểm gói tin đi qua

## 2. Lệnh traceroute (tracert)

**Traceroute** (hay tracert trên Windows) là một công cụ chẩn đoán mạng máy tính để hiển thị các tuyến đường (đường dẫn) và đo lường sự chậm trễ quá cảnh của các gói dữ liệu trên một giao thức Internet (IP) mạng.

**traceroute** sử dụng bản tin time to live expired của lệnh ping để biết được từng chặng mà gói tin sẽ phải đi qua trước khi đến đích.

traceroute để làm gì?
    
Biết được địa chỉ của Server trỏ đến (là gì và ở đâu)
Biết được tốc độ phản hồi khi gói tin của chúng ta đi qua các thiết bị layer 3 (là các thiết bị cung cấp khả năng như là bộ định tuyến, thường là router – khi đi qua các thiết bị layer 3 này thì IP sẽ đổi thành một IP khác) trên mạng.
Biết được số hop và số thiết bị mà gói tin đã đi qua
Tạo được các con đường tối ưu (áp dụng cho mạng chậm, wifi chậm không rõ nguyên nhân và live stream chậm)
### Cú pháp: 
   ```
    traceroute [options] host_address
   ```
Một số option trên Linux:

> -I : sử dụng gói tin giao thức ICMP ECHO
> 
> -U : sử dụng gói tin giao thức TCP SYN
> 
> -w <number> : cấu hình thời gian chờ phản hồi, tính bằng giây.
> 
> -f <number> : Chỉ định giá trị TTL bắt đầu, default là 1, có nghĩa là traceroute sẽ hiển thị kết quả với route đầu tiên trong đường đi.
> 
> -q <number> : cấu hình số gói tin phản hồi ở mỗi hop (default là 3)
> 
> -m <number> : cấu hình số hops tối đa (giá trị TTL tối đa) sẽ thực hiện, default số hops tối đa là 30.

Các bạn có thể sử dụng lệnh traceroute --help để xem thêm các options khác.  Cùng xem ví dụ bên dưới
    ![](https://images.viblo.asia/cf698ac1-f8fe-4b5c-ac17-6dc10e8a5090.png)
Dựa vào kết quả trên chúng ta có thể biết được một số thông tin sau:

+ Địa chỉ server ứng với domain trên là 125.212.247.72 (server 24h.com.vn đặt ở viettel – VietNam)

+ Gói tin của chúng ta phải đi qua 12 route trước khi đến đích

+ Thời gian phản hồi ở mỗi điểm ==> dựa vào đây chúng ta có thể xác định được đang bị chậm ở đâu hoặc vị trí có vấn đề trên mạng.

+ Các hops (bước nhảy) là 13 -1 = 12

+ Ở trên chúng ta có thể thấy ở một số điểm chỉ hiển thị dấu * thì đây là những điểm thường có đặt firewall, nó cho phép gói tin của chúng ta đi qua nhưng không cho phép phản hồi vì lý do bảo mật.
## Lời kết
Như vậy, qua bài viết này mình chia sẻ các bạn về lệnh ping và traceroute trong network. Các bạn có đóng góp gì thêm để lại bình luận bên dưới nhé. Chúc các bạn thành công.!