# Khi muốn ứng dụng hoạt động realtime thì Socket là keyword mà chúng ta không thể bỏ qua.

**Ở bài viết này chúng ta sẽ cùng tìm hiểu về Socket qua những câu hỏi**

1. Socket là gì ?
2. Tại sao cần sử dụng Socket ?
3. Socket hoạt động như thế nào ?
4. Phân loại Socket.
***

## Socket là gì ?

` Socket là giao diện lập trình ứng dụng mạng được dùng để truyền và nhận dữ liệu trên internet. Giữa hai chương trình chạy trên mạng cần có một liên kết giao tiếp hai chiều, hay còn gọi là two-way communication để kết nối 2 process trò chuyện với nhau. Điểm cuối (endpoint) của liên kết này được gọi là socket.`

> **Socket = IP adress + portnumber**

## Tại sao cần sử dụng Socket ?

Hẳn là trước khi đọc bài viết này bạn cũng đã biết chức năng chính của Socket là để "duy trì kết nối" giữa client với server để ứng dụng có thể hoạt động realtime. Chẳng hạn như một ứng dụng nhắn tin, Socket sẽ được sử dụng để "lắng nghe" mỗi khi có tin nhắn mới, reaction... ect để cập nhật lên giao diện. Việc cập nhật dữ liệu thời gian thực như thế đem lại một trải nghiệm tuyệt vời cho người dùng,

Nếu không sử dụng socket, ta vẫn có một cách khác để cập nhật dữ liệu đó là liên tục gửi/nhận các request/response trong một khoảng thời gian nhất định, ví dụ cứ sau mỗi 2s ta lại cho ứng dụng check api xem dữ liệu có gì thay đổi không, nếu có thì cập nhật vào ứng dụng. Tuy nhiên các xử lí này khá là "ngáo" vì nó gây mệt cho cả chính client và server.

Socket giải quyết vấn đề này một cách "perfectly", tiết kiệm tài nguyên cho cả client và server. Vậy câu hỏi đặt ra là làm thế nào để Socket có thể "lắng nghe" hay "duy trì kết nối" với server để có thể cập nhật dữ liệu realtime như vậy ?

## Socket hoạt động như thế nào

Socket hoạt động trên cả giao thức TCP và UDP. Như đã nói ở trên thì có thể xem 
`Socket = Địa chỉ IP + Số Port`, port ở đây chính là port logic của máy tính(16 bits = 65535 ports).

Socket hoạt động ở tầng 4 của mô hình OSI (Transport layer)
![](https://images.viblo.asia/dc304a84-d33d-4d13-9f70-44c0a5612979.jpg)

#### Quá trình khởi tạo socket connection từ client tới server.

Như chúng ta đã biết thì có những port được server service  quy định dùng cho các dịch vụ quy định (Assigned Numbers Authority). (Port 80 dùng cho giao thức HTTP, 20 dùng cho FTP, 22 dùng cho SSH, 25 dùng cho SMTP, ...ect).

Quá trình khởi tạo kết nối tới Gmail sẽ diễn ra như sau: 

1. Client có địa chỉ IP1 đang có port 5000 rảnh dỗi và quyết định sử dụng cặp (IP, Port) = (IP1, 5000) để kết nối tới web server có địa chỉ IP2 và port 80 (để chạy giao thức HTTP => lấy về giao diện trang web)
2. Sau khi client được server xác thực thành công và đã có đủ thông tin cần thiết, nó sẽ mở cổng số 25 cho địa chỉ IP2. Lưu ý là client không hề gửi request đi mà chỉ mở port 25 cho web server.
3. Khi có email mới, server sẽ kiểm tra xem kết nối tới (IP1, 25) có còn sống hay không, nếu có thì nó sẽ gửi thông báo về cho client.

&nbsp;

##### Lúc này một câu hỏi lớn vẫn là **làm sao để client và server có thể duy trì được kết nối ?**
 
Đến đây mình có thể hiểu tại sao cặp (IP, port) lại được gọi là socket vì nó đi theo cặp như 2 đầu của một ổ cắm vậy.

![](https://images.viblo.asia/f3f08e93-2806-44f1-8ce8-cbf430c8b894.png)

> Sở dĩ 2 máy có thể duy trì được kết nối là do **port đã được mở và sẽ không đóng** cho đến khi chiều bên kia gửi tín hiệu muốn chấm dứt bằng cách gửi gói tin RST. Trong trường hợp chiều bên kia ngắt kết nối mà không gửi RST thì kết nỗi vẫn sẽ được đóng sau một khoảng timeout nào đó được quy định ở quá trình Keep-Alive.

Quá trình Keep-Alive có 3 thuộc tính để quyết định có đóng kết nối hay không:
1. tcp_keepalive_time: Khoảng thời gian không có tín hiệu. Mặc định là 7200s.
2. tcp_keepalive_intvl: Khoảng thời gian chờ chiều bên kia hồi đáp. Mặc định là 75s.
3. tcp_keppalive_probles: Số lần sẽ thử lại nếu việc giao tiếp gặp lỗi. Mặc định là 9.


#### Quá trình Keep-Alive sẽ diễn ra như sau:

1. Client mở kết nối TCP.
2.  Sau một khoảng thời gian tcp_keepalive_time, nếu như server kia im lặng không có tín hiệu gì. Client sẽ gửi đi cờ ACK (kích thước rất nhỏ, có thể không được xem là một package) đến server và chờ hồi đáp.
3. Server có hồi đáp ACK hay không ?

*  (3.1) Nếu không hồi đáp: Kiểm tra xem số lần thử lại đã vượt quá tcp_keppalive_probles hay chưa ? Nếu chưa thì tiến hành đợi sau khoảng tcp_keepalive_intvl rồi gửi lại ACK và quay lại bước 3. Nếu đã vượt quá tcp_keepalive_probes thì gửi RST đến server (không quan tâm đến kết quả trả về) rồi đóng kết nối.


*  (3.2) Nếu server hồi đáp:
    
    1. Nếu hồi đáp đúng => reset lại các thuộc tính rồi quay về bước 2.
    2. Nếu hồi đáp sai => chuyển sang 3.1


***
Như vậy thì mặc định, client socket sẽ mở : tcp_keepalive_time + tcp_keepalive_intvl * tcp_keepalive_probes = 7200 + 75 * 9 (giây) = 2h11p nếu như không nhận được RST của server. 
Tuy nhiên những thuộc tính đó chỉ là mặc định, chúng ta hoàn toàn có thể tùy chỉnh lại theo nhu cầu. Ví dụ [Amazon](https://docs.aws.amazon.com/redshift/latest/mgmt/configure-jdbc-options.html) cho phép tùy chỉnh AWS.

## Phân loại Socket

* Stream Socket: Dựa trên giao thức TCP( Tranmission Control Protocol), việc truyền dữ liệu chỉ thực hiện giữa 2 quá trình đã thiết lập kết nối. Do đó, hình thức này được gọi là socket hướng kết nối.
    * Ưu điểm: Có thể dùng để liên lạc theo mô hình client và sever. Nếu là mô hình client /sever thì sever lắng nghe và chấp nhận từ client. Giao thức này đảm bảo dữ liệu được truyền đến nơi nhận một cách đáng tin cậy, đúng thứ tự nhờ vào cơ chế quản lý luồng lưu thông trên mạng và cơ chế chống tắc nghẽn. Đồng thời, mỗi thông điệp gửi phải có xác nhận trả về và các gói tin chuyển đi tuần tự.
    * Hạn chế: Có một đường kết nối (địa chỉ IP) giữa 2 tiến trình nên 1 trong 2 tiến trình kia phải đợi tiến trình kia yêu cầu kết nối. 


* Datagram Socket: Dựa trên giao thức UDP( User Datagram Protocol) việc truyền dữ liệu không yêu cầu có sự thiết lập kết nối giữa 2 quá trình. Do đó, hình thức này được gọi là socket không hướng kết nối.
    * Ưu điểm: Do không yêu cầu thiết lập kết nối, không phải có những cơ chế phức tạp nên tốc độ giao thức khá nhanh, thuận tiện cho  các ứng dụng truyền dữ liệu nhanh như chat, game…..
    * Hạn chế: Ngược lại với giao thức TCP thì dữ liệu được truyền theo giao thức UDP không được tin cậy, có thế không đúng trình tự và lặp lại.

Trên đây là những tìm hiểu và hiểu biết cá nhân của mình về socket, hi vọng đem lại góc nhìn mới cho các bạn về Socket.