## I. Giới thiệu
Kafka là hệ thống message theo cơ chế pub/sub. Nó được thiết kế cho việc chịu lỗi cao và khả năng mở rộng dễ dàng.

## II. Thành phần trong hệ thống Kafka
#### 1. Apache Zookeeper
Zookeeper đóng vai trò cung cấp các dịch vụ lõi của hệ thống phân tán như: dịch vụ quản lý cấu hình hệ thống, bầu trưởng nhóm (leader election), định danh (naming), lưu trữ các thông tin chung metadata như thông tin về topic, partition của topic, danh sách broken, vị trí dữ liệu offset mà consumer đã đọc đến… Zookeeper được Kafka để bầu tự động leader cho các partition, quản lý danh sách nút máy chủ hoạt động và quản lý danh sách các topic.

#### 2. Apache Kafka
Một hoặc nhiều instance chạy Kafka. Chúng kết nối chung tới Zookeeper.

## II. Thành phần trong Apache Kafka
#### 1. Broker
Một host có thể chạy nhiều server kafka, mỗi server như vậy gọi là một broker. Các broker này cùng trỏ tới chung 1 zookeeper thì chúng là 1 cụm broker(Clusters). Broker là nơi chứa các partition. Một broker có thể chứa nhiều partition.

#### 2. Topic
Nhìn về mặt database thông thường thì topic giống như một table trong CSDL SQL. Topic là nơi chứa message. Mỗi message giống như record trong table (Chỉ khác là chúng NoSql).

#### 3. Partition
Nơi lưu trữ message của topic. Một topic có thể có nhiều partition. Khi khởi tạo topic cần set số partition cho topic đó. Partition càng nhiều thì khả năng làm việc song song cho đọc và ghi được thực hiện nhanh hơn. Các message trong partition được lưu theo thứ tự bất biến(offset). Một partition sẽ có tối thiểu 1 replica để đề phòng trường hợp bị lỗi. Số lượng replica luôn nhỏ hơn số lượng broker.




#### 4. Producer
Là nơi đẩy dữ liệu từ người dùng vào các partition của topic. Tùy vào việc có chỉ định rõ ghi vào phân vùng nào không thì producer sẽ gửi đến phân vùng của topic đó hoặc phân bố đều vào các partition.

#### 5. Consumer
Mỗi consumer phụ trách 1 vài partition của topic. Nhiều consumer có thể sử dụng chung 1 nhóm (group consumer) để hỗ trợ cho việc xử lý nhanh các dữ liệu. Có nhiều group consumer xử lý cùng 1 topic theo các điểm start offset khác nhau. Điều này có thể phục vụ cho việc bạn có 2 process riêng biệt, một phục vụ cho việc duy trì hệ thống với dữ liệu mới đẩy vào, một phục vụ cho việc re-process lại toàn bộ data.

## III. Cài đặt qua Docker
Cài đặt server kafka sử dụng docker compose và 2 image sau:
- Zookeeper: https://hub.docker.com/r/wurstmeister/zookeeper
- Kafka: https://hub.docker.com/r/wurstmeister/kafka/
Nội dung file docker-compose.yml
```
# docker-compose.yml
version: '3.3'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
   volumes:
      - /data/zookeeper:/opt/zookeeper*
  kafka:
   image: wurstmeister/kafka
    ports:
      - "9092-9094:9092"
    environment:
      HOSTNAME_COMMAND: "echo $$(hostname)"
      BROKER_ID_COMMAND: "docker inspect --format '{{ .Name }}' $$(hostname) | awk -F_ '{ printf $$NF }'"
      KAFKA_ADVERTISED_HOST_NAME: <ip-address>
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_CREATE_TOPICS: "Topic1:3:2,Topic2:2:2"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /data/kafka:/kafka
    depends_on:
      - zookeeper
```

Giải thích qua nội dung file trên thì nó sẽ build 2 container. Một container là zookeeper chạy trên cổng 2181. Cổng này để mặc định theo config của zookeeper. Một container còn lại là kafka. Container này share bên ngoài nhìn vào nằm ở dải port từ 9092->9094, tất cả port nằm trong dải trên sẽ đc đẩy vào port 9092 trên container. Các biến môi trường config ở trên có tác dụng: set broker id không đổi khi restart lại kafka(giúp cho topic không bị mất), cấu hình kafka connect tới đúng container zookeeper phía trên, tạo topic ngay từ lần khởi động đầu tiên. Mount các vùng dữ liệu của container vào thư mục của host để đảm bảo tắt đi bật lại không bị mất data.

Sau khi edit file docker-compose.yml  xong thì chạy lệnh 
```
docker-compose up --scale kafka=3 -d
```
để start server kafka. Vì sao lại `kafka=3`? Vì mình để dải port kia có 3 cổng thôi nên nếu scale hơn sẽ config, nếu cần thì nới dải port kia ra nhưng cần đảm bảo k bị conflict với các ứng dụng khác.

Sau khi start thì cần 1 tool để quản lý cho dễ. Mình đang dùng tool Kafka Tool 2.0 và nó có bản cài trên Ubuntu nên mình suggest luôn http://www.kafkatool.com/download.html

## IV. Cách sử dụng qua Python
Ok, sau khi server đã lên sóng thì push thử message vào và lấy message ra thôi. Trước tiên, cần cài đặt lib kafka-python
`# pip install kafka-python`
Push message:
```
from kafka import KafkaProducer
brokers = ['localhost:' + str(i) for i in range(9092, 9095)]
producer = KafkaProducer(bootstrap_servers=brokers)
producer.send('Topic1', b'content message')
```

Bật một cửa sổ python khác và hóng message đẩy vào
```
from kafka import KafkaConsumer
brokers = ['localhost:' + str(i) for i in range(9092, 9095)]
consumer = KafkaConsumer('Topic1', bootstrap_servers=brokers,  auto_offset_reset='earliest')
for msg in con: 
    print(msg.value)
```
Giải thích qua các syntax trên:

`brokers`: là danh sách địa chỉ các broker

`auto_offset_reset`: đọc message từ vị trí đầu tiên

Trong các class KafkaProducer và KafkaConsumer còn nhiều param khác, các bạn có thể tự tìm hiểu thêm.

## V. Một số câu hỏi
#### 1. Nên bật bao nhiêu broker trong 1 cụm kafka?
Càng nhiều broker thì khả năng chịu lỗi sẽ càng cao vì số lượng replicate cho 1 partition sẽ phụ thuộc vào số lượng broker. Nhưng đồng thời thì cũng tốn chi phí hơn và control phức tạp hơn. Giả sử bạn đang mong muốn một cụm brokers có khả năng lưu trữ 20T thì nên chia đều mỗi broker có cùng 1 lượng lưu trữ, giả sử như 4T. Vậy ta sẽ cần 5 broker.

#### 2. Khi tạo topic thì nên set số lượng partition và replicate là bao nhiêu?
- Số partition sẽ quyết định khả năng xử lý song song của bạn, càng nhiều xử lý càng nhanh. Nhưng nó cũng đẻ ra nhiều vấn đề. Ae có thể đọc tại link này: https://www.confluent.io/blog/how-choose-number-topics-partitions-kafka-cluster nó dài quá mình không thể tóm lược được
- Số replicate càng cao thì tăng khả năng chịu lỗi càng lớn, nhưng nó lại bị phụ thuộc vào số broker. Replicate càng lớn thì có thể tăng về số RAM và disk sử dụng của server Kafka.