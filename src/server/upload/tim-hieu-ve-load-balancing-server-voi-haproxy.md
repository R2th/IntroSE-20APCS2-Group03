## Khái quát về HAproxy
### HAproxy là gì?
HAproxy (Hight Available proxy) là ứng dụng cân bằng tải với khả năng mở rộng cao, được cài đặt cho những website chạy các ứng dụng dựa trên TCP và HTTP, được phát triển trên hệ điều hành Linux. Nó hỗ trợ chuyển mạch ngữ cảnh (content switching) cho phép người quản trị webiste có thể thiết đặt các luật chuyển mạch trong file cấu hình. HAproxy cũng hỗ trợ nhiều thuật toán phân tải phong phú, hỗ trợ cài đặt cookie và health check. HAproxy hỗ trợ cài đặt một số thuật toán LB như round robin, weighted round robin, least connection, source,…
HAproxy là ứng dụng chạy độc lập. Để sử dụng HAproxy thiết lập hệ thống cân bằng tải, cần cài đặt Haproxy lên một máy chủ và thiết lập cài đặt trong file cấu hình.
### File cấu hình haproxy.cfg
File cấu hình HAproxy là nơi lưu trữ các cấu hình cho hệ thống HAproxy. Khi chạy chương trình cân bằng tải, máy chủ HAproxy sẽ đọc file cấu hình này và thực hiệu điều khiển hệ thống cân bằng tải. Đây cũng là nơi quản trị viện có thể cấu hình cho hệ thống cân bằng tải, bằng cách thay đổi các tham số được HAproxy quy định.
Cấu hình của Haprox thường gồm 4 phần chính: **global, defaults, fontend** và **backend**. Các thành phần này sẽ định nghĩa cách máy chủ HAproxy tiếp nhận, xử lý yêu cầu, chọn máy chủ tiếp nhận yêu cầu và chuyển tiếp. 

  **Global**
  
Các thiết lập global nằm ở phần đầu của file cấu hình haproxy.cfg, được định danh bằng từ khóa global và chỉ được định nghĩa riêng một mình, quy định các thiết lập bảo mật, điều chỉnh hiệu năng… cho toàn hệ thống HAproxy. Một số tham số quan trọng được đặt trong global như số lượng kết nối tối đa (maxconn), đường dẫn file log, số tiến trình… Ví dụ về phần global của file cấu hình haproxy.cfg
![](https://images.viblo.asia/71939436-c9e3-466d-95f8-6003a5f9d96a.png)



   **Default**
   
Defaults chứa các cấu hình được thiết lập áp dụng chung cho cả phần frontend và backend trong file cấu hình. Các thiết lập defaults có thể được thiết lập nhiều lần trong file cấu hình và chúng được ghi đè lên nhau (các mục defaults sau sẽ đè lên các mục defaults trước nó), ngược lại các thiết lập trong frontend và backend sẽ đè lên defaults.
![](https://images.viblo.asia/cb79e12d-74c4-4c5d-a01c-0fd5c2093f71.png)


Một số các thông số cấu hình quan trọng được thiết lập trong default như:
* *mode*: định nghĩa HAproxy sẽ sử dụng TCP proxy hay HTTP proxy.
* *maxconn*: thiết lập số kết nối tối đa ( mặc định là 2000 nếu không được thiết lập lại)

   **Frontend**
   
Các thiết lập trong phần frontend định nghĩa địa chỉ IP và port mà client có thể kết nối tới, có thể có nhiều mục frontend tùy ý, chỉ cần đặt label của chúng khác nhau :  frontend<tên>
Một số thiết lập trong Hpaproxy được định nghĩa trong phần frontend như sau:
* *bind*: IP và Port HAProxy sẽ lắng nghe để mở kết nối. IP có thể bind tất cả địa chỉ sẵn có hoặc chỉ 1 địa chỉ duy nhất, port có thể là một port hoặc nhiều port (1 khoảng hoặc 1 list).
* *http-request redirect*: Phản hỏi tới client với đường dẫn khác. Ứng dụng khi client sử dụng http và phản hồi từ HAProxy là https, điều hướng người dùng sang giao thức https.
* *userbackend*: Chỉ định backend sẽ xử lý request nếu thỏa mãn điều kiện (Khi sử dụng ACL).
* *defaultbackend*: Backend mặc định sẽ xử lý request (Nếu request không thỏa mẵn bất kỳ điều hướng nào.


**Backend**

Các thiết lập trong phần backend định nghĩa tập server sẽ được cân bằng tải khi có các kết nối tới (ví dụ tập các server chạy dịch vụ web giống nhau). Một số thiết lập quan trọng như:

* *balance*: Kiểm soát cách HAProxy nhận, điều phối request tới các backend server. Đây chính là các thuật toán cân bằng tải.
* *cookie*: Sử dụng cookie-based. Cấu hình sẽ khiến HAProxy gửi cookie tên SERVERUSER tới client, liên kết backend server với client. Từ đó các request xuất phát từ client sẽ tiến tục nói chuyện với server chỉ định. Cần bổ sung thêm tùy chọn cookie trên server line.
* *option httpchk*:  Với tùy chọn, HAProxy sẽ sử dụng health check dạng HTTP (Layer 7) thay vì kiếm trả kết nối dạng TCP (Layer 4). Và khi server không phản hồi request http, HAProxy sẽ thực hiện TCP check tới IP Port. Health check sẽ tự động loại bỏ các backend server lỗi, khi không có backend server sẵn sàng xử lý request, HAProxy sẽ trả lại phản hồi 500.
* *server error*: Mặc định HTTP check sẽ kiểm tra root path (có thể thay đổi). Và nếu phản hồi health check là 2xx, 3xx sẽ được coi là thành công.
* *default server*: Bổ sung tùy chọn cho bất kỳ backend server thuộc backend section (VD: health checks, max connections, v.v). Điều này kiến cấu hình dễ dàng hơn khi đọc.
* *server*: Tùy chọn quan trọng nhất trong backend section. Tùy chọn đi kèm bao gồm tên, id, port. Có thể dùng domain thay cho IP. 
    
**Listen**

Là sự kết hợp của cả 2 mục frontend và backend, có thể sử dụng listen thay thế các các mục frontend và backend. Một số thiết lập được định nghĩa trong phần listen như:
* *inter*: khoảng thời gian giữa hai lần check liên tiếp.
** rise*: Số lần kiểm tra backend server thành công trước khi HAProxy đánh giá nó đang hoạt động bình thường và bắt đầu điều hướng request tới.
* *fall:* Số lần kiểm tra backend server bị tính là thất bại trước khi HAProxy đánh giá nó xảy ra sự cố và không điều hướng request tới.
### HAproxy stats
HAproxy hỗ trợ theo dõi hoạt động các thông số của các server thông qua một bảng điều khiển được gọi là trang HAproxy Stats, giúp hiển thị các chỉ số bao gồm các thông số liên quan đến tình trạng máy chủ, tỷ lệ yêu cầu trong thời gian hiện tại, tỉ lệ phản hồi… và các thông số quan trọng cung cấp chi tiết trên cơ sở cấc cấu hình các phần frontend, backend, default và global trong file cấu hình haproxy.cfg. Một số cấu hình để theo dõi trang HAproxy stats như sau:
```
frontend stats

        bind *:8404

        stats enable

        stats uri /stats

        stats refresh 10s

        stats admin if LOCALHOST

```
![](https://images.viblo.asia/5078bcd7-5455-4a88-ad2d-9addd9339078.png)

Trong đoạn cấu hình trên sử dụng các thiết lập: 
* *bind*: đặt địa chỉ cổng để truy cập trang stats (trong ví dụ trên là cổng 80)
* *stats uri*: thay đổi đường dẫn của URL
** stats refresh*: tần suất tự động làm mới trang trong trình duyệt (trong ví dụ trên là 10 giây)
** stats admin* hạn chế người truy cập chức năng này, để bỏ qua hạn chế có thể đặt thiết lập thành stats admin if TRUE, để thêm xác thực, có thể thêm thiết lập stats auth **username:password** để quy định tài khoản và mật khẩu để truy nhập trang Haproxy stats

## Demo
### Mô hình demo
Hệ thống được cài đặt với bộ cân bằng tải HAproxy và các webserver được cài trên các máy ảo Ubuntu 16.04 được cài đặt trên VMware. 
Địa chỉ IP của các server:

* HAproxy server: 192.168.52.128
* Server1: 192.168.52. 131
* Server2: 192.168.52. 132
### Cài đặt 
Cài đặt webserver Apache2 ở máy ảo Server1 và Server2:
`sudo apt-get install apache2`

Khởi động webserver:
`systemctl start apache2`

Tại máy ảo HAproxy server, cài đặt phần mềm HAproxy với dòng lệnh: 
`sudo apt-get install haproxy`
### Cấu hình
Tạo file cấu hình haproxy.cfg tại thư mục haproxy:
`sudo gedit /etc/haproxy/haproxy.cfg`

Thêm nội dung vào file cấu hình như sau:

![](https://images.viblo.asia/408458b4-7209-497c-9272-4e3eace23791.png)

![](https://images.viblo.asia/d00042d6-a5c9-4663-87ac-821a77fdd2d8.png)

![](https://images.viblo.asia/d26094d8-cc15-4c37-9a95-a8cf36c6c9aa.png)

![](https://images.viblo.asia/c0d1e463-59af-450d-bbe7-df24d8127437.png)

Trong demo này sử dụng thuật toán roundrobin, với số kết nối tối đa là 4000. Các server1 và server2 lần lượt có trọng số 1 và 2, sử dụng cookie *check*
Khởi chạy HAproxy:
`systemctl start haproxy`

Kiểm tra trạng thái các thông số về server, trạng thái server hiện tại, số kết nối hiện tại, số lượt truy cập bằng địa chỉ http://192.168.52.131:37200/stats.
Kết quả thu được như sau:
![](https://images.viblo.asia/247bec0a-1968-425d-b11b-c28f73b1f7af.png)

Bài viết đã giới thiệu sơ lược và hướng dẫn xây dựng hệ thống Load balancing đơn giản với HAproxy. Để tìm hiểu thêm về HAproxy, có thể tham khảo tại [đây](http://www.haproxy.org/).