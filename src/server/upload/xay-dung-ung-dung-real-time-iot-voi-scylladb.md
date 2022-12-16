## Real-Time Là Gì?
Real-time đề cập đến thời gian cần để dữ liệu được xử lý, ghi hoặc đọc. Ví dụ trong thực tế, các cảm biến ở Đà Lạt sẽ phải gửi dữ liệu đến cơ sở dữ liệu nằm trên một máy chủ ở TP. HCM thông qua HTTP.

Khi này ứng dụng IoT của bạn sẽ xuất hiện 2 vấn đề về độ trễ (latency):
* Đầu tiên là độ trễ đầu cuối, chính là toàn bộ thời gian khứ hồi (Round Trip Time) từ chính thiết bị IoT, đến ứng dụng của bạn (và cơ sở dữ liệu), sau đó quay trở lại chính thiết bị IoT. Điều này thường phụ thuộc vào cấu trúc liên kết địa lý (thế giới thực) của bạn và loại mạng và phần cứng máy tính bạn đang sử dụng. Để khắc phục độ trễ đầu cuối cao, bạn có thể cải thiện hình thức kết nối mạng (ví dụ: chuyển từ cơ sở hạ tầng 4G sang 5G), nâng cấp cảm biến IoT.
* Thứ hai là độ trễ trong ứng dụng hoặc trong chính cơ sở dữ liệu. Để đạt được độ trễ thấp hơn trong một ứng dụng IoT, điều kiện cần là phải giảm thời gian xử lý và IO trên máy chủ và cơ sở dữ liệu đằng sau nó.

![image.png](https://images.viblo.asia/7785b0c8-c982-4ccd-a745-14995988c48f.png)

## Tại Sao Cần Real-Time?
Hãy tưởng tượng một nhà máy sản xuất sô cô la với hàng nghìn cảm biến và mỗi cảm biến ghi lại 50 điểm dữ liệu quan trọng mỗi giây.

Trong trường hợp nhà máy sản xuất sô cô la có thể không cần dữ liệu thời gian thực. Chúng ta có thể giảm tần suất lấy dữ liệu như mỗi 5 phút, mỗi 15 phút, mỗi giờ.
Tuy nhiên, ban giám đốc có thể mất đi "bức tranh real time" về năng suất của nhà máy. Hoặc chúng ta có thể lưu dữ liệu của cảm biến mỗi giây vào một batch, nhưng chỉ send batch lên ứng dụng (cơ sở dữ liệu) để update sau khoảng 15 - 30 phút. Nhưng làm hàng đống công việc chỉ để tăng một ít khả năng xử lý thì thật sự không đáng.

Trong trường hợp thời gian thực, một ứng dụng IoT luôn cần thời gian phản hồi ở quy mô mili giây hoặc thậm chí dưới mili giây.

## IoT & ScyllaDB, Một Cặp Trời Sinh
[ScyllaDB](https://www.scylladb.com/) là một OPEN-SOURCE DATABASE cung cấp dữ liệu highly available và tốc độ đọc-ghi dưới mili giây, đáp ứng yêu cầu thiết kế hệ thống IoT trên quy mô lớn.

Kiến trúc shard-per-core của ScyllaDB cho phép các truy vấn không chỉ kết nối trực tiếp đến các nút DB mà còn đến chính xác CPU để xử lý dữ liệu. Cách tiếp cận này giảm thiểu các bước nhảy intracluster, cũng như giao tiếp giữa CPU với CPU.

![image.png](https://images.viblo.asia/9044ef7f-e86a-40fd-b85a-5a21436fe6fd.png)

## DEMO
Lý thuyết nhiều rồi giờ thì bắt tay vào thực hành thôi

### Phần deployment
1. Cài đặt [Docker](https://docs.docker.com/engine/install/ubuntu/)

2. Cài đặt ScyllaDB (Nếu xài local)

Bạn có thể cài đặt bản open-source từ [trang chủ ScyllaDB](https://www.scylladb.com/download/#server)

![image.png](https://images.viblo.asia/7a7f0663-e89f-49c3-8852-3e0f91304c3d.png)

Chọn continue sẽ có hướng dẫn các bước tiếp theo

![image.png](https://images.viblo.asia/d968b9cc-a4df-4fa8-92ba-f506e9384679.png)
![image.png](https://images.viblo.asia/e8e50549-c2d7-45c9-839f-00cc89e35d59.png)

3. Tạo tài khoản ScyllaDB Cloud (Nếu xài cloud)

Để cho dễ thì ở đây mình sẽ dùng ScyllaDB Cloud

Bước 1: Chọn provider, đặt tên cluster, cấu hình Allowed IPs
![image.png](https://images.viblo.asia/ec189426-f886-4aaa-9f10-0fb6facfb09a.png)

Bước 2: Chọn region, instance
![image.png](https://images.viblo.asia/799408f6-267f-4761-96fe-f5433ca940b8.png)

Bước 3: Cuối cùng là preview và lauch thôi!
![image.png](https://images.viblo.asia/e637e6e4-0e89-4406-a92f-9bf259760abb.png)

Sau khi tạo xong bạn có thể vào xem lại cluster đã tạo
![image.png](https://images.viblo.asia/163102d5-d014-4e18-bc7d-397a4962e4cd.png)

Xem thêm các cách connect khác:
![image.png](https://images.viblo.asia/765e2b02-d6bd-4940-a14a-914c50538f05.png)

### Phần coding
Download source code về máy -> [link GITHUB](https://github.com/70G37H3R/realtime-iot-app)

1. Cài đặt VSCode & NodeJS

Kiến trúc của project như sau:
* File model.js -> Dùng để định nghĩa 2 model là Sensor và Measure
* File helpers.js -> Dùng để generate Measure data
* File index.js -> Dùng để connect với ScyllaDB, truyền câu lệnh truy vấn

2. Dùng lệnh `npm i` để cài đặt các gói thư viện cần thiết

3. Connect với ScyllaDB sử dụng docker
```
docker run -it --rm --entrypoint cqlsh scylladb/scylla -u [USERNAME] -p [PASSWORD] [NODE_IP_ADDRESS]
```
![image.png](https://images.viblo.asia/1e03b499-acfe-4d9b-92e3-03a225814fb8.png)

Tạo KEYSPACE iot
```
CREATE KEYSPACE iot WITH replication = {'class': 'NetworkTopologyStrategy', 'AWS_AP_EAST_1' : 3} AND durable_writes = true;
Use iot;

CREATE TABLE IF NOT EXISTS iot.sensor
(
  sensor_id UUID,
  type TEXT,
  PRIMARY KEY (sensor_id)
);

CREATE TABLE IF NOT EXISTS iot.measurement
(
  sensor_id UUID,
  ts    TIMESTAMP,
  value FLOAT,
  PRIMARY KEY (sensor_id, ts)
) WITH compaction = { 'class' : 'TimeWindowCompactionStrategy' };
```
![image.png](https://images.viblo.asia/1934e32b-8cfb-42eb-9a62-8633f17b8124.png)

4. Dùng lệnh `npm run dev` để chạy application
![image.png](https://images.viblo.asia/cb4928da-6902-4046-a308-119d2ec89005.png)

5. Dùng cqlsh để check database
![image.png](https://images.viblo.asia/82bd21e1-6e40-4d0f-844f-e6f90f1875af.png)

![image.png](https://images.viblo.asia/e7c9f04d-3014-42ca-aa13-b45501c128a2.png)

## Kết Luận
Trong bài viết này, chúng ta đã mô phỏng cảm biến IoT để sinh dữ liệu và gửi đến cơ sở dữ liệu với độ trễ thấp nhất. Trong đó, chúng ta cũng đã tạo một cluster ScyllaDB on Cloud, học một số câu lệnh CQLSH cơ bản, và tạo ứng dụng kết nối với ScyllaDB. Tôi hy vọng bạn thấy bài viết này thú vị.