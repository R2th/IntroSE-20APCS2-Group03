Chào các bạn. Như các bạn đã biết thì để xây dựng 1 ứng dụng realtime thì chúng ta thường sử dụng  **socketio**  để duy trì và truyền dữ liệu qua lại giữa client và server. 
<br>
Và nhờ nó chúng ta có thể làm được nhiều ứng dụng  điển hình như chat, game, ... và vô vàn ứng dụng khác mà ta muốn realtime .<br>
Sau 1 thời gian tìm hiểu và hôm nay mình xin chia sẻ lại với các bạn về luồng hoạt động của socket cũng như xây dựng 1 hệ thống điển hình như chat sử dụng socketio kết hợp với redis như thế nào. 
Bắt đầu nào.

# Socket io là gì? 
Socket.io là một thư viện giúp real-time giúp chúng ta có thể giao tiếp 2 chiều giữa client (browser) và server

![](https://images.viblo.asia/8f950b7e-7c16-40c4-89b8-abb83f39be98.png)

Các bạn nhìn hình ở trên  thì để kết nối giữa client và server (ở đây là mình dùng server nodejs) thì chúng ta sẽ sử dụng socket.io như sau: <br>
socket.io sẽ hỗ trợ chúng ta 2 phía: <br>
+ Client:  Chúng ta sẽ sử dụng 1 kết nối link đến server  
+ Server: Chúng ta sẽ tạo ra 1 server websocket dùng node js (hoặc bất cứ ngôn ngữ nào nhưng node js là phổ biến nhất) và mở cổng cho client kết nối lên. <br>
Và sau khi client gửi kết nối lên server và server kiểm tra oke thì từ đó client và server websocket đã có thể nói chuyện và truyền dữ liệu qua nhau. <br>

**Chú ý:** ở bài này mình chỉ giải thích cho các bản hiểu rõ luồng hoạt động hơn thay vì viết code kiểu để kết nối đến server thì client sẽ dùng gì hay tạo server websocket bằng node js thì sẽ phải làm như thế nào. Mình nghĩ khi các bạn đã hiểu luồng hoạt động cũng như cách thiết kế 1 ứng dụng cụ thể thì các bạn mới dễ dàng code hơn thay vì cắm đầu code cũng chạy đấy nhưng luồng lại k hiểu rõ và đôi lúc lại xoắn đầu hỏi tại sao lại k sử dụng cái này và cái kia. @@ .

# Tính năng cơ bản của Socket io
**1. Giao tiếp giữa client và server** <br>
Để giao tiếp qua lại giữa chúng thì socket.io sẽ dùng 2 khái niện **emit** và **on**. <br>
Các bạn cứ mặc định hiểu cho mình thế này: 
+ emit : Phát sự kiện 
+ on : lắng nghe sự kiện 
<br>

Đặc biệt giao tiếp này là cả 2 chiều tức client vừa có thể phát (emit) và lắng nghe (on) sự kiện từ phía server gửi về và ngược lại .

**2. Các cách emit (phát) data**
<br>Mặc định các bạn hiểu các hình ảnh dưới phần này như sau nhé. : 
+  SERVER : tức là server websocket
+  Sokcet1, 2,... là các client gửi yêu cầu  kết nối lên server và server oke thì thì chúng sẽ gửi dữ liệu qua lại cho nhau như phần trước mình có giải thích nhé. <br>
 
<br>- **Self emit** : Tức 1 client gửi 1 message lên server thì server sẽ chỉ phát lại cho chính client đó thôi. 
 <br>
![](https://images.viblo.asia/48f10b6f-45d6-490c-a9d5-7e3efa23d47f.png)

<br>

<br>- **Broadcast emit** : Tức 1 client gửi 1 message lên server thì server sẽ phát lại cho tất cả các client khác cùng kết nối tới server (socket2 , socket 3 đều nhận được)
![](https://images.viblo.asia/9431ec3e-602d-4e93-bd53-30fef9a3a5c5.png)

<br>- **Room emit** : Tức 1 client gửi 1 message lên server thì server sẽ chỉ phát lại các phòng được chỉ định (như hình ảnh dưới đây socker2 và socket 3 nhóm 1 lại 1 phòng)
![](https://images.viblo.asia/4fed4584-ea7e-4e36-b6a4-fa06950d5ce8.png)

<br>- **SocketId emit** : Tức 1 client gửi 1 message lên server thì server sẽ chỉ phát lại cho riêng 1 client nào đó (kiểu chat riêng giữa 2 người đó) <br>
![](https://images.viblo.asia/7da08c2f-92b1-415c-8119-14813a8c2b34.png)

Để hiểu sâu hơn cũng như xem code nó  như thế nào thì các bạn có thể vào https://socket.io/docs/v3/broadcasting-events/ để tìm hiểu kĩ hơn.

# Xây dựng mô hình ứng dụng chat


**1.Quy mô nhỏ**<br>
Với 1 hệ thống nhỏ và theo nhu cầu lượng người dùng k lớn thì ta có thể áp dụng mô hình dưới đây 
<br>Tức là ta sẽ tạo ra : <br>
+ 1 webserver (php, nodejs, ...) và cài server websocket trên cùng 1 server luôn
+ các client sẽ chỉ kết nối và gửi dữ liệu qua 1 server websocket duy nhất
<br>Các bạn có thể nhìn hình bên dưới :
<br>Mỗi máy khi kết nối với server websocket sẽ tạo ra 1 socketid riêng để phân biệt ai gửi lên và trả về cho ai.
 

![](https://images.viblo.asia/67c87ce0-e68e-431c-a71a-8f57bdfbb3da.png)

**2.Quy mô  trung bình và lớn**<br>

Giả sử ứng dụng của chúng ta chỉ đáp ứng được 10K người request cùng 1 lúc , 1 ngày đẹp trời tự dưng lại có 20k 30k người request vào ứng dụng của chúng ta khiến server quá tải và không thể đáp ứng kịp ====> Toang , server sập @@ 
<br>
Chính vì vậy để đáp ứng được nhiều người dùng ta sẽ có giải pháp là sử dụng thêm :
+ LoadBalance (ở đây mình dùng nginx)
+ Redis 

<br>

**Bắt đầu với nginx loadbalance**

Nhìn vào mô hình bên dưới các bạn tưởng tượng : <br>
Ở đây sẽ có nhiều request (r1, r2, ...) đến nginx (port 3000) và nginx sẽ phân tải các request tới server nodejs (server websocket cũng được cài trên các server nodejs )
theo thuật toán **round robin**  
<br>
Các bạn có thể tìm hiểu thêm **round robin** nginx còn ở đây mình nói gọn là thuật toán này sẽ gửi request đến các server theo thứ tự lần lượt ví dụ:<br> 
r1 -> nodejs:8000, r2-> nodejs:8001, r3-> nodejs:8002, ..... tức là gửi xoay vòng lần lượt. 

![](https://images.viblo.asia/c16ce001-ebe6-4529-bf24-901410543261.png)


**Sử dụng redis vào ứng dụng**

Các bạn hầu như các bạn đều biết đến redis như là 1 bộ nhớ tạm lưu các giá trị key,value mà k biết nó còn có tính năng đặc biệt khác như pus/sub và chính nhờ tính năng này nó có thể giúp chúng ta áp dụng vào bài toán trên. <br>

Pub: Publish, có nghĩa là một producer đẩy dữ liệu vào một channel (kênh) hay còn gọi là topic như trong Kafka<br>
Sub: Subscribe có nghĩa là một consumer đăng ký nhận dữ liệu từ một channel hay topic. <br>

Hiểu đơn giản giống như các bạn xem truyền hình cáp vậy (ví dụ như SCTV), chúng ta là các consumer, đăng ký (subscribe) vào các kênh như: VTV1, VTV3, VTV6, HBO, Fox Movies…. thì SCTV chính là một producer, đẩy dữ liệu (publish) ra các kênh tương ứng đó và chúng ta chỉ nhận và xem trên TV thôi.<br>
Như hình bên dưới thì một subscriber(client) sẽ nhận được data từ nhiều kênh. 

![](https://images.viblo.asia/c9b8b962-0a4f-4ef2-b8c2-068c2555ae0d.png)

Mình cũng k miên man sâu về phần này nữa nếu các bạn thích hiểu rõ hơn về redis pub/sub hơn thì có thể vào link dưới đây để đọc và cũng thử test xem tính năng thần thánh này của redis nhé https://codingpearls.com/lap-trinh-web/laravel-5-x-tips/redis-pubsub-co-che-hoat-dong-cai-dat-tren-windows.html

<br>
Oke vậy là ta có thể dùng redis để truyền tin nhắn rồi. Nhưng các bạn có thắc mắc là ví dụ tôi không dùng redis mà dùng như cách loadbalance như ở trên thôi hoặc có thể dùng pusher chả hạn có được k. <br>

Thì mình xin trả lời từng câu đó nhé: <br>

**Đầu tiên để trả lời cho câu hỏi:** <br>
Nếu dùng loadbalacne mà không cần thêm bất kì dịch vụ thứ 3 nào như ảnh dưới : 
![](https://images.viblo.asia/15e63d2d-7c1f-48b2-851a-e35428ad64c5.png)

Các bạn có thể thấy như hình trên: <br>
U1 connect với server Nodejs:8000 và gửi data qua lại với nhau tương tự U2 connect với  Nodejs:8001 có thể thấy ổn đúng k nhưng thực ra là không ổn chút nào vì chúng chỉ gửi data qua lại được cho server websocket chúng kết nối với chứ bây giờ làm sao có thể chuyển tin nhắn thông qua các server websocket mà chúng k kết nối với cũng có thể nhận được tức  là khi  u1 gửi data  thì u2 có thể nhận được hay nói cách khác làm thế nào để nói chuyện được giữa các server websocket như hình trên.
<br>
Chính vì vậy ở đây bắt buộc sẽ phải dùng thêm dịch vụ thứ 3 : Redis, Pusher ,...

**Thứ 2 để trả lời cho câu hỏi:** <br>
Thì nếu không dùng redis thì có thể dùng cái khác được không như pusher, ... . Câu trả lời là được ở bài này tại sao mình chỉ nói đến redis vì nó phổ biến và đặc biệt nhiều người dùng trong dự án hơn pusher vì đơn giản nó free và không mất phí như pusher (nếu số lượng người dùng nhiều nên là phải mất phí).
<br>

**Kiến trúc  tổng thể**<br>
Tổng hợp lại các ý trên ta sẽ có kiến trúc tổng thể cho ứng dụng chat như sau: <br>
![](https://images.viblo.asia/377c1c84-48fa-4425-81bd-501815540b46.png) 
**(Hình 1)**

Nhìn vào hình trên ta có thể hiểu qua luồng như sau: <br> 
Ở trên sẽ có 3 websever (Nodejs:8000, Nodejs:8001, Nodejs:8002) tương ứng với nó là 3 server websocket đặt trong từng webserver
<br>
Các websocket sẽ đăng kí (Subscribe) các kênh thì khi redis Publish data thì mặc các server websocket đều nhận được. <br>
Đặc biệt ở đây khi ta triển khai theo cách này thì server redis có thể nhận được data từ bên ngoài và truyền lại cho các client.<br>  
Chi tiết các bạn có thể tham khảo thêm ở link dưới đây: https://socket.io/docs/v3/using-multiple-nodes/
<br>
Chính vì nhận được data từ bên ngoài thì rất hữu ích cho các thao tác từ server ví dụ khi ta lưu dữ liệu hay gửi mail xong thì ta sẽ emit 1 data tới redis và redis sẽ truyền dữ liệu qua các server websocket rồi cuối cùng đến các client. <br>

Oke mình là code PHP và cũng sử dụng framework laravel ở laravel có tính năng **Broadcasting** . Nghe tên thôi các bạn cũng có thể hiểu **Broadcast** kiểu gửi data từ 1 điểm tới các điểm khác trong cùng 1 mạng (kiểu vậy). Nó có thể sử dụng redis và pusher như mình có giải thích ở trên thì redis sẽ được sử dụng nhiều hơn do free. (phổ biến)
Thực ra khi các bạn hiểu được luồng chạy ở kiến trúc tổng thể trên thì dù ngôn ngữ hay cách code có khác nhau nhưng thực ra luồng chỉ có 1. Ví dụ ở laravel nó sẽ sử dụng kiến trúc như hình 1 và sửa đổi theo ngôn ngữ thôi: <br>
1.  Ở hình 1 ở trên thì 3 server node js sẽ được thay thế bằng server PHP <br>
2.  Mỗi server PHP sẽ cài đặt websocket tương ứng. (**laravel-echo-server**:  thư viện tích hợp sẵn socket.io và để kết nối với redis )
3. Phía client sẽ dùng **laravel-echo** là 1 thư viện javascript để lắng nghe  các event broadcast từ laravel truyền xuống hoặc đăng kí (subscribe) kênh với redis
4. Nó có thể emit data từ bên ngoài vào redis sử dụng các phương thức có sẵn trong laravel rất tiện. (https://laravel.com/docs/8.x/broadcasting#broadcasting-events)

# Kết luận
Trên đó là những gì mình tìm hiểu được mong rằng có thể giúp ích được các bạn hiểu rõ hơn về socket io cũng như luồng xây dựng 1 ứng dụng chat tổng quát. 
<br>

Nguồn tham khảo: <br>
https://socket.io/<br>
https://laravel.com/docs/8.x/broadcasting<br>
https://blog.jscrambler.com/scaling-node-js-socket-server-with-nginx-and-redis/<br>
https://codingpearls.com/lap-trinh-web/laravel-5-x-tips/redis-pubsub-co-che-hoat-dong-cai-dat-tren-windows.html <br>
https://viblo.asia/p/mot-so-dieu-can-biet-khi-su-dung-socketio-Ljy5VoayKra