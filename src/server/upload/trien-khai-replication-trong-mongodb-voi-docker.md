Trong bài viết này chúng ta cùng nhau Triển khai Replication cơ bản trong MongoDB với Docker 
1. Kiến thức chung về Replication
2. Cách Replication làm việc trong MongoDB
3. Chạy MongoDB trên Docker
4. Triển khai Replication trong MongoDB với Docker
5. Kết

# 1.  Kiến thức chung về Replication ?
 ***a. Replication là gì***
 
   Replication là tiến trình đồng bộ hóa dữ liệu từ nhiều Server. Replication cung cấp sự dư thừa và tăng dữ liệu có tính khả dụng với nhiều bản sao dữ liệu trên nhiều Database Server khác nhau. 
    Replication bảo vệ một cơ sở dữ liệu từ việc thất thoát của một Server nào đó. Replication cũng cho phép bạn phục hồi dữ liệu từ việc các lỗi ở phần cứng hoặc từ việc ngắt kết nối dịch vụ. Với các bản sao dữ liệu bổ sung, bạn có thể sử dụng cho việc phục hồi, báo cáo, hoặc backup.
    
***b. Tại sao lại sử dụng Replication***

   Replication đảm bảo cho dữ liệu của bạn an toàn, tăng tính khả dũng và phục hồi dữ liệu do một lỗi nào đó, ngoài ra nó không tốn thời gian để duy trì 
 
 
# 2. Cách Replication làm việc trong MongoDB
MongoDB sử dụng Replica Set để thực hiện Replication. Một Replica Set là một nhóm các sự thể hiện của mongodb mà host cùng tập hợp dữ liệu đó. 
Một replica set chỉ có duy nhất một primary. Primary member sẽ nhận các yêu cầu ghi. Primary ghi các thay đổi của nó vào oplog - một file có vai trò như binlog trên mysqld.
Các secondary sẽ có chung data set với primary, các yêu cầu đọc có thể scale trên primary và tất cả các secondary. Một replica set có thể có tối đa là 50 member.

![](https://images.viblo.asia/516e8619-d41f-45ad-b741-4ab69135b856.jpg)

Các member luôn giữ duy trì kết nối, trong trường hợp một member chết thì các member khác sẽ tự động được chuyển đổi dự phòng. Đây là một điểm khác biệt so với mysql. Với cơ chế chuyển đội dự phòng này khi một primary không hoạt động thì một secondary sẽ được bầu lên làm primary của cả replica set ( việc bầu chọn này có thể dựa theo mặc định hoặc voting)
tham khảo kĩ hơn và cách Replication làm việc với mongoDb và cấu trúc chuyển đổi dự phòng trong Replica Set trong link chính thức của MongoDB:
https://www.mongodb.com/docs/manual/replication/
# 3. Chạy MongoDB trên Docker
Để triển khai Replica Set trên Mongo với 3 member ta sử dụng docker để chạy mongoDb. Các bạn có thể tham khảo và tải về Docker tại : https://www.docker.com/
Ở đây mình sử dụng Docker deskop trên windows, docker sẽ triển khai tối ưu hơn nếu chạy với một máy ubuntu
- Start Docker Deskop, trong terminal windows, ta tải images mongoDB từ docker hub bằng câu lệnh :` docker pull mongo:tag` Với tag là phiên bản, bỏ qua tag nếu bạn muốn tải phiên bản mời nhất, giờ đây images của mongo đã được pull về máy.
- chạy lệnh docker images để kiểm tra images hiện tại
![image.png](https://images.viblo.asia/ef424440-0242-49ca-9eac-2e926b19c9c1.png)
- tạo một network riêng cho mongoDB, bằng lệnh: "*docker network create mongoNe*t" (với mongoNet là tên của network cần tạo). Nếu không tạo ta bỏ option --net ở bước dưới. chạy lênh "*docker network ls*" để kiểm tra network vừa tạo.
- tạo và chạy 3 container mongo bằng image vừa pull về bằng lệnh

`docker run -d -p 27018:27017 --net mongoNet --name r1 mongo --replSet mongoRep`

`docker run -d -p 27019:27017 --net mongoNet --name r2 mongo --replSet mongoRep`

`docker run -d -p 27020:27017 --net mongoNet --name r3 mongo --replSet mongoRep`


Ở đây ta đã tạo 3 container mongo là r1, r2, r3 và public ra localhost lần lượt ở port 27018, 27019, 27020
 - Chạy `docker ps` để kiểm tra xem các container đã được start lên chưa
 ![image.png](https://images.viblo.asia/bd1bd9e0-eea2-4bcc-8355-5f32370c64c7.png)
# 4.  Triển khai Replication trong MongoDB với Docker
Sau khi đã có được 3 menber MongoDB ta tiến hành config Replica Set cho nó.
- Vào terminal trên container r0 bằng lệnh` "*docker exec -it r0 bash*"`. Kiểm tra version  và chạy mongo trên r0
![image.png](https://images.viblo.asia/36bf8e16-1732-43de-abe4-cb33fea3a9a4.png)
ta tiến hành config trên r0. Định danh cách member là các container r1, r2, r3 vừa tạo theo cú pháp
>    config = {"_id": "tên replSet tạo container", "members": [{_id: 0, host: "r1:27018"}, {_id: 1, host: "r2:27019"}, {_id: 2, host: "r3:27020"}]}
>     rs.initiate(config)

![image.png](https://images.viblo.asia/ec277af0-46f6-4d7f-ab11-96cd3eba61ba.png)

r1 chuyển thành Primary. 2 container r2, r3 là secondary . Gõ ` rs. status()` để xem cấu hình hiện tại. 
Như vậy là ta đã hoàn thành được việc config  Replica Set trên mongoDB, tạo một database để test. Việc tạo mới hoặc thao tác với các collection chỉ diễn ra trên r0 là primary trong  Replica Set còn secondary chỉ có thể cập nhật dữ liệu từ primary. Nếu primary không hoạt động nữa thì bầu chọn sẽ diễn ra và một secondary sẽ lên làm thay primary
# 5. Kết
Replication trong mongodb giúp ích rất nhiều trong quá việc sao chép, khôi phục dữ liệu đặc biệt với cơ chế chuyển đổi dự phòng đảm bảo dữ liệu luôn sẵn sàng khi có sự cố.
Trong thực tế có rất nhiều bài toán đòi hỏi triển khai Replication một cách chặt chẽ hơn. Nếu có bất kì câu hỏi gì hay cmt để được giải đáp.
Thanks đã dành chút thời gian đọc bài của mình