© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Cùng tìm hiểu về Consumer offset, ZooKeeper và Broker discovery trong bài viết này nhé. Let's begin!

## 1) Consumer offset

Chúng ta đã hiểu về **offset**, càng hiểu về **consumer**, vậy **consumer offset** là gì?
> - **Offset**: vị trí của mỗi message lưu trong mỗi partition.
> - **Consumer**: thuộc **consumer group**, consume message từ **topic**.

Để consume lại các message đã xử lý, hoặc tiếp tục xử lý các message chưa được xử lý trong topic, **consumer** cần biết offset chính xác vị trí của message cần đọc.

> Vậy có thể hiểu **consumer offset** giống như một checkpoint hoặc bookmark cho **consumer group**.
> 
> Mỗi **consumer group** khác nhau có **consumer offset** khác nhau.

Khi **consumer** xử lý xong message, chúng ta nên commit giá trị offset, các giá trị này sẽ lưu tại Kafka topic có tên là **__consumer_offsets**. Vì sao vậy?

> Trong trường hợp **consumer** gặp sự cố và khởi động lại sau đó hoặc một **consumer** khác thay thế, nó có thể tiếp tục từ message cuối cùng được xử lý. Tránh trường hợp đọc lại toàn bộ message từ đầu.

![](https://i.imgur.com/jzo94EF.png)

Như vậy chúng ta đã hiểu mục đích của **consumer offset**, từ đó dẫn đến 3 tình huống khi consumer commit offset.

### 1.1) At most once

Consumer commit offset ngay khi nhận được message. Điều đó có nghĩa trong trường hợp đang xử lý message mà consumer gặp sự cố và transaction chưa được commit thì.. tạch. 

Không thể consume lại message để xử lý.

### 1.2) At least once

Consumer commit offset sau khi xử lý xong message. Như vậy, nếu consumer gặp sự cố trong khi process message cũng không có vấn đề lớn. Consumer sau khi wake up sẽ consume và xử lý lại message đó. 

Tuy nhiên nó dẫn đến vấn đề khác. Giả sử trong quá trình process cần gọi đến bên thứ 3 để xử lý. Bên thứ 3 xác nhận, trừ tiền trong tài khoản thành công. Đen đủi là hệ thống bên này gặp sự cố, phải consume lại message để xử lý, và tiếp tục gọi đến 3rd party để trừ tiền tiếp... toang.

Như vậy message có thể đến nhiều hơn một lần, nên được gọi là **at least once**. Cần rất chú ý khi xử lý những case như trên. Cần đảm bảo quá trình process là **idempotent**, hoặc có cơ chế check choác các kiểu.

> **Idempotent** là những xử lý có thể lặp lại nhiều lần mà không ảnh hưởng đến hệ thống.
>
> Ví dụ RESTful API quey resource GET method là **idempotent** API, có thể request nhiều lần mà không impact đến hệ thống. Ngược lại với create resource POST method không phải **idempotent** vì mỗi request sẽ tạo ra một resource mới, thay đổi data của hệ thống. 

**Note**: mặc dù nó có risk nhưng có thể handle và vẫn an toàn hơn trường hợp lost message. Do vậy đây là lựa chọn phổ biến.

### 1.3) Exactly once

Cuối cùng là case vô cùng đặc biệt. Hiện tại nó không áp dụng cho các **consumer group** dạng BE application như Java, C#...

Nó chỉ xuất hiện trong case message được transfer từ Kafka sang Kafka.

> Ngoài ra một cách khác có thể biến **at least once** thành **exactly one** đó là sử dụng các **idempotent** consumer với lý do nhận nhiều message xử lý nhiều lần nhưng giống như nhận một message xử lý một lần.

## 2) Kafka broker discovery

**Kafka brokers** bao gồm rất nhiều broker. Mỗi topic có thể có nhiều partition, mỗi partition được lưu trên các broker khác nhau. Tuy nhiên **consumer** chỉ cần connect tới một **broker** bất kì là có thể connect với toàn bộ **Kafka cluster**. Điều đó giúp **consumer** có thể đọc được message của topic nằm trên bất kì một **broker** nào.

> Mỗi Kafka broker là một **bootstrap server**, nó có cơ chế thông báo cho client biết làm thế nào để connect tới các broker còn lại. Như vậy khi connect tới một broker là connect tới toàn bộ **Kafka brokers**.
>
> **Bootstrap servers** là một danh sách các endpoint của từng broker trong cụm cluster. Một broker có toàn bộ các thông tin của các broker còn lại. 

Mỗi **broker** có thông tin về các **broker**, **topic** và **partition** của **Kafka cluster**, được gọi là metadata. **Broker** không trực tiếp lưu trữ các metadata này mà nó là nhiệm vụ của **Zookeeper**. Bàn về nó sau nhé.

Đi vào chi tiết, cùng đi tìm hiểu kĩ hơn về cách thức hoạt động của **broker discovery**, client connect tới **Broker 102** để lấy message ở **Broker 101** như thế nào.

Đầu tiên, **client** connect đến **Broker 102** và request **metadata**.

![](https://i.imgur.com/XG8oZtv.png)

**Broker 102** trả về thông tin metadata và danh sách toàn bộ các **broker** hiện có trong mạng Kafka cluster.

![](https://i.imgur.com/LILTuXA.png)

Sau khi có thông tin của toàn bộ **broker** và metadata, client sẽ quyết định connect tới **broker** nào để produce hoặc consume message.

![](https://i.imgur.com/4lCPNJk.png)

Thật may mắn là chúng ta không cần implement những thứ phức tạp này :game_die:. Xử lý đống business đã mệt não lắm rồi.

## 3) Zookeeper

**Zookeeper** mới chính là thứ đứng đằng sau tất cả.
> - Lưu trữ tất cả thông tin của **Kafka broker**, **topic**, **partition**... Hay nói cách khác là quản lý chúng.
> - Thực hiện **leader election** cho các partition. Nói về **leader election** thì có nhiều bài toán và thuật toán kinh điển để xử lý. Rất nhiều thứ hay ho, khả năng mình sẽ có series riêng cho phần này, đón chờ nhé.
> - Gửi thông tin đến Kafka về các event phát sinh trong hệ thống: new topic, delete topic, partition die, broker die, broker comes up...

Có thể thấy sức mạnh to lớn của **Zookeeper**  trong việc duy trì và đảm bảo hoạt động của **Kafka**. Vậy **Kafka** có thể hoạt động mà không cần **Zookeeper** không?

> Vài năm trước có thể khẳng định chắc chắn rằng Kafka không thể hoạt động nếu thiếu Zookeeper. Design ban đầu của Kafka đã là như vậy.
> 
> Tuy nhiên công nghệ thay đổi chóng mặt, không gì là không thể. Hiện tại Kafka có thể hoạt đồng bình thường mà không cần Zookeeper, cụ thể thế nào thì theo dõi hết series nhé.

Để tránh single-point failure, **Zookeeper** được triển khai cluster nhiều node với số lẻ là 3, 5 hoặc 7...

> Vì sao không phải số chẵn? Hiểu đơn giản rằng số lẻ sẽ dễ bỏ phiếu hơn, không có trường hợp 50 - 50 mà luôn là 49 - 50. Dễ dàng đi đến kết luận chung hơn so với số chẵn.

**Zookeeper** cũng tuân theo mô hình **leader-follower**:
> - Một **leader** thực hiện write data.
> - Các **follower** còn lại handle việc read data.
>
> Với Kafka v0.10 trở về trước, **consumer offset** được lưu tại Zookeeper. Tuy nhiên sau đó các kĩ sư đã tách sự phụ thuộc này để **Zookeeper** hoàn toàn độc lập với **consumer** và **producer**.

Dưới đây là mô hình kết nối phổ biến của Kafka và Zookeeper. 

![](https://i.imgur.com/DNSMiIL.png)

Với level beginner, chúng ta không cần quá bận tâm về Zookeeper, cách thức hoạt động ra sao, tương tác với Kafka thế nào. Chỉ cần hiểu rằng nó quản lý các Kafka broker, lưu trữ metadata và là thành phần quan trọng trong hệ thống **Kafka cluster**.

## 4) Tổng kết

Chúng ta đã đi qua toàn bộ các thành phần của Apache Kafka và sẵn sàng practice với nó. Phần này chỉ nhằm mục đích khái quát hóa lại các tính chất của Kafka:
- Message được lưu tại **partition** theo thứ tự được gửi đi.
- **Consumer** read message theo thứ tự được lưu trong **partition**.
- Với replication factor = N, **producer** và **consumer** vẫn có thể hoạt động tốt khi N - 1 broker gặp sự cố.
- Đó cũng là lý do chúng ta hay chọn replication factor = 3 thay vì giá trị default = 1.
- Một broker có thể down cho việc maintenance.
- Một broker khác bị down do gặp sự cố.
- Nếu để giá trị replication factor cao quá cũng sẽ gặp vấn đề liên quan đến đồng bộ. Ngoài ra Kafka cũng không cho phép replication factor vượt quá số lượng broker.
- Các message có cùng key được route đến cùng **partition** trong trường hợp số lượng **partiton** của topic không thay đổi.
- Có thể tự define cơ chế routing message đến partition bằng cách implement interface **Partitioner**.

![](https://i.imgur.com/TwGnT49.png)

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

### After credit

Default config partition = 1 cho mỗi Kafka topic, tuy nhiên chúng ta có xu hướng tăng số lượng partition lên để tăng throughput với mục đích xử lý được nhiều message hơn tại cùng một thời điểm.

Nhưng nó dẫn đến một vấn đề khác, lựa chọn số lượng **partition** sao cho tối ưu là một chuyện cần phải rất cân nhắc. Bài tiếp theo cùng tìm hiểu về các yếu tố tác động đến số lượng partition, từ đó đưa ra lựa chọn phù hợp.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)