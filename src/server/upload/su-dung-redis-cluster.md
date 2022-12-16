Redis là một công cụ hữu dụng để phát triển các ứng dụng của bạn. Bạn có thể dùng Redis để cache, quản lý các session trong ứng dụng của bạn một cách nhanh chóng. Redis có tốc độ ghi và đọc dữ liệu nhanh hơn rất nhiều so với các cơ sở dữ liệu khác. Nó cũng xây dựng  tính năng pub/sub message borker. Điều này có nghĩa bạn có thể sử dụng Redis để thực hiện việc lắng nghe và phát đi các sự kiện. Ví dụ một hệ thống thông báo subscribe một channel trên redis message broker, nó có thể nhận được các thông báo của các  publishers khi có một sự kiện được phát đến channel này. Ngoài ra Redis hộ trợ nhiều kiểu dữ liệu khác nhau và các phương thức để truy xuất dữ liệu hợp lý.

Redis cũng giống các cơ sở dữ liệu khác, Redis cần cấu hình để đảm bảo tính sẵn sằng và hoạt động của nó với Redis Cluster và Redis Sentinel.


**Redis Sentinel**: được sử dụng khi tốc độ không phải là mối quan tâm của bạn, nó là lựa chọn tuyệt vời để đáp ứng tính sẵn sàng của Redis.

**Redis Cluster**: nó cung cấp tính sẵn sãng cao với giải pháp phân cụm. Nó là lựa chọn tuyệt vời để đảm bảo tính sẵn sàng trong khi vẫn có tốc độ truy vấn nhanh vào dữ liệu của bạn.

Bài viết này mình sẽ giới thiệu việc sử dụng cluster trong Redis

![](https://images.viblo.asia/f95dd900-2a8b-468b-8f7d-5d804482106a.png)

**Hiểu về Redis cluster**

Mỗi nút Redis Cluster yêu cầu mở 2 kết nối TCP. Cổng TCP Redis bình thường được sử dụng sể phục vụ cho clients, ví dụ 6379, cộng với cộng thu được bằng cách thêm 10000 vào cổng dữ liệu ta được cổng 16379. Đảm bảo bạn mở cả hai cổng trong tường lửa của mình, nếu không các nút cụm Redis sẽ không thể giao tiếp với nhau.

Redis Cluster  sử dụng  hash slot với 16384 hash slots.

Mỗi nút trong cluster sẽ chịu trách nhiệm cho một tập hợp con của các vị trí hash slots, ví dụ nếu chúng ta có cluster với 3 nút:
    
   - Nút A chứa hash slots từ 0 đến 5500.
   - Nút B chứa hash slots từ 5501 đến 11000.
   - Nút C chứa hash slots từ 11001 đến 16383.

**Tạo và sử dụng Redis Cluster**

Redis cluster sử dụng cấu hình master-slaver  để hộ trợ môi trường phân tán. Trong ví dụ này chúng ta sẽ tạo 3 master và 3 slave. Mỗi master sẽ có 1 slaver.

**Cài đặt Redis**

Chúng ta đang cấu hình cluster với 6 nút (3 master và 3 slaves) nên chúng ta sẽ tạo 6 thư mục với các tên tương ứng với port của nút đó.

![](https://images.viblo.asia/36770e84-9923-43f8-b6cd-7c0f678e0dda.png)

Trong mỗi thư mục, tải và tạo gói Redis bằng các lệnh sau:

     `$ wget http://download.redis.io/releases/redis-5.0.5.tar.gz
       $ tar xzf redis-5.0.5.tar.gz
       $ cd redis-5.0.5
       $ make`

**Chạy Redis cluster**

Sau khi cài đặt Redis bạn tạo file `redis.conf` trong  thư mục src của mỗi nút. File này sẽ chứa các thông tin cấu hình của cluster. VÍ dụ:

![](https://images.viblo.asia/c5d2fb16-8711-4fce-bb48-0daae546f38b.png)

Ý nghĩa các param trong file cấu hình:

 - port: cổng của nút sẽ hoạt động trong cluster.
 - cluster-enabled: enable redis cluster.
 - cluster-config-file: file chứa các cấu hình cho nút này được lưu trữ, mặc định là nodes.conf. File này được tự động tạo khi run cluster.
 - cluster-node-timeout: khoảng thời gian timeout của nút.
 - appendonly: lưu trữ dự liệu Redis vào ổ đĩa bằng AOF.
 
 * Đổi port trong file redis.conf tương ứng với từng port của nút.

Cuối cùng chạy từng nút bằng lệnh `./src/redis-server ./src/redis.conf`

![](https://images.viblo.asia/5d544e4a-3589-4c2f-b5d2-b83379ad970c.png)

**Tạo cluster**

Chạy lệnh sau trong thư mục src của nút 6001

`./redis-cli --cluster create 127.0.0.1:6001 127.0.0.1:6002 127.0.0.1:6003 127.0.0.1:6004 127.0.0.1:6005 127.0.0.1:6006 --cluster-replicas 1`

`cluster-replicas 1` có nghĩa là chúng ta sẽ tạo một slave cho mỗi master. Những giá trị khác là địa chỉ và port của từng nút.

![](https://images.viblo.asia/50ddb84b-4704-4f3b-ac70-f1ff4a1e4b94.png)

Sau khi cluster được cấu hình chúng ta sẽ có kết quả như hình bên dưới.

![](https://images.viblo.asia/50ddb84b-4704-4f3b-ac70-f1ff4a1e4b94.png)

Các nút chạy trên port 6001, 6002, 6003 là các master và các nút còn lại là các slave tương ứng.

Các nút trong cluster đã hoạt động, ta có thể thử set và get dữ liệu trên nút 6001.

![](https://images.viblo.asia/9f8c571c-6e8e-4af3-bbb1-22ce4cf66073.png)

Ta thấy dữ liệu đã được chuyển sang nút 6003 với hash slot tương ứng.

Ta thử get dữ liệu trên slave của 6003 là nút 6006

![](https://images.viblo.asia/9f8c571c-6e8e-4af3-bbb1-22ce4cf66073.png)

Dữ liệu đã được backup sang slave.

Đến đây bạn đã có thể chạy redis cluster cho mình :).