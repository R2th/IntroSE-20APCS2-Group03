© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Ngoài core concept, Apache Kafka có những concept khác chúng ta cần quan tâm là:
- Kafka connect concept.
- Kafka stream concept.
- Kafka SQL concept.

Sau khi nắm hết tất cả các chiêu thức trên ta sẽ có cái nhìn tổng quan về Kafka ecosystem - big picture để đưa ra lựa chọn đúng đắn khi quyết định sử dụng chiêu thức nào cho đối tượng nào.

## 1) Kafka connect

Kafka được phát triển bởi LinkedIn để giải quyết các bài toàn data-integration giữa nhiều thành phần với nhau. Có thể là in-house service, database, 3rd system... 

![](https://i.imgur.com/7aXepzM.png)

Rất nhiều producers và consumers cùng tham gia vào quá trình này đặc biệt là trong hệ thống Enterprise nơi có hàng chục thậm chí hàng trăm thứ khác nhau hoạt động cùng lúc.
> - Core service tự build.
> - Một vài business sử dụng 3rd-party service.
> - Vài service khác được develop và maintain bởi partners hoặc service provides khác nhau.
> - Ti tỉ thứ trong một hệ thống doanh nghiệp khổng lồ.

![](https://i.imgur.com/9njuAa9.png)

Nhu cầu kết nối dữ liệu giữa các service là cực lớn.

Hệ thống Finance cần thông tin của Invoice, Inventory cần thông tin của Invoice, Shipment và Data warehouse, Analytics thống kê thông tin của tất cả các service... Một mớ bòng bòng hiện ra trước mắt. 

Data integration là vấn đề không của riêng ai. Nếu kết nối trực tiếp như trên, sớm hay muộn sẽ đến một ngày chẳng thể nào maintain nổi, chỉ có đập đi làm lại :hammer:. Và rồi định mệnh đã xuất hiện, LinkedIn tạo ra Kafka và sử dụng nó để giải quyết vấn đề trên. 

> Có thể bạn sẽ thắc mắc vấn đề này nói ở bài đầu tiên trong series rồi?
> 
> Đúng thế, nhưng mới dừng lại ở mức core concept của Kafka hay bất kì một hệ thống Message broker nào cũng có thể xử lý được. Cứ bình tĩnh đọc tiếp để hiểu rõ về Kafka connect nhé.

Giải pháp đã có là sử dụng Message broker, nhưng điều quan trọng là sử dụng thế nào. Cùng đến với ví dụ đơn giản sau.

Order service có database riêng để lưu trữ order cho khách hàng. Service đã go-live, chạy ngon (chưa thấy user chửi). Một ngày đẹp trời sếp yêu cầu trích xuất data đưa vào hệ thống Data warehouse phục vụ nhu cầu phân tích và lên chiến lược tầm nhìn 10 năm cho công ty.

![](https://i.imgur.com/qgWqwld.png)

Sau khi tìm hiểu, anh Senior quyết định sử dụng Kafka cho hệ thống. Đại khái Kafka sẽ đứng giữa quá trình gửi nhận data giữa Order database và Data warehouse. Như vậy trong tương lai nếu một service nào đó cũng cần thông tin của order thì chỉ cần listen trên Kafka topic và consume message, nhẹ nhàng rồi.

![](https://i.imgur.com/88B59QE.png)

Mọi chuyện khá ổn... Nhưng thiếu thiếu cái gì đó thì phải, làm thế nào **Order database** gửi data sang **Kafka cluster**?

> Ngoài ra, vì sao lại là Apache Kafka mà không phải là một Message broker khác như ActiveMQ, RabbitMQ...?

Anh Senior tiếp tục chém phần phật: cái này không khó, tạo Kafka producer là xử lý được, và có 2 cách tiếp cận.

Cách thứ nhất, có source code của Order service, sửa code, tạo producer trong đó đọc data từ database và gửi đến Kafka cluster. Test ngon nghẻ sau đó deploy là đẹp trai. Rất nhanh và thực dụng, nhưng có 2 nhược điểm:
> - Producer gắn liền với source code, mỗi khi thay đổi cần deploy lại service. Có thể có downtime khi deploy gây ảnh hưởng đến trải nghiệm người dùng.
> - Và cũng vì gắn chặt vào Order service nên producer sẽ chạy khi service chạy, dừng khi service dừng. Lỡ service Quang tèo thì producer cũng ngỏm củ tỏi. Tuy nhiên các service đều deploy với multi-replicas nên đây cũng không phải vấn đề quá lớn.

![](https://i.imgur.com/qLO1OyD.png)

Cách thứ hai, tạo Kafka producer độc lập, đọc data từ Order database và produce đến Kafka broker. Vấn đề ở cách thứ nhất được giải quyết nhưng cũng gây ra 2 bất lợi:
> - Cần maintain một service nữa cho Kafka producer.
> - Cần thiết kế để scalable, fault tolerance này nọ lọ chai...

![](https://i.imgur.com/uVLB5NC.png)

Thực ra cả 2 cách tiếp cận đều ổn. Nhưng với bài toán như ví dụ, chúng ta có xu hướng lựa chọn cách 2 nhiều hơn.

Và với cách tiếp cận thứ 2, nó giống y hệt những gì mà Kafka connect làm. Hay nói cách khác, chúng ta đang đi chế tạo lại cái bánh xe trong khi nó đã có sẵn.

![](https://i.imgur.com/eG2yH4D.png)

Không cần viết thêm bất kì một dòng code nào, việc của chúng ta là tạo các config để nó hoạt động, những thứ còn lại đã có Kafka connect lo.

> Giờ thì đã hiểu vì sao anh Senior lựa chọn Kafka rồi.

Mọi thứ đã ổn, nhưng chưa xong, còn đầu Kafka cluster sang Data warehouse nữa.

Tiếp tục là config cho một Kafka connect nữa từ Kafka cluster sang Data warehouse, cũng không tốn thêm dòng code nào.

> Ngồi chơi xơi nước và hưởng thụ thành quả thôi.

![](https://i.imgur.com/ZzGy41f.png)

Túm cái váy lại, có 2 loại connect là **Source connector** và **Sink connector**:
> - Bên trái được gọi là **Source connector**: pull data từ source system và gửi đến Kafka cluster.
> - Bên phải là **Sink connector**: consume data từ topic và sink đến hệ thống đích.

Như vậy, Kafka connect là một component của Kafka với nhiệm vụ connect và transfer data giữa Kafka và các external system như:
> - **Source**: Twitter, Viblo, Reddit, MySQL, PostgreSQL..
> - **Sink**: Cloud storage, Elasticsearch, MongoDB, Cassandra...


## 2) Kafka connect hoạt động thế nào?

Rất rất nhiều external system, vậy làm thế nào Kafka connect có thể kết nối được nhiều hệ thống đến vậy?

![](https://i.imgur.com/PXo8vH4.png)

Read và write cho mỗi hệ thống là hoàn toàn khác nhau từ cơ chế cho đến cách implement.

Bản chất Kafka connect giống như một interface, abstract level, tạo các API để 3rd party có thể implement dựa trên từng cách thức hoạt động khác nhau của từng service.

> Nếu bạn quen với JDBC của Java, Kafka connect tương tự như JDBC. Nó chỉ cung cấp phần API đóng mở connection, tạo statement, execute query, tương tác với database. Còn việc chi tiết implement do các database vendor cung cấp, là database driver.

Các engineer đã phát triển Kafka connect framework để implement Kafka connector, tất nhiên nó cũng là open-source. Nó cho phép các vendor tự tạo các connector, chúng ta chỉ việc config và sử dụng. Hoặc bạn có thể tự viết connector nếu muốn.

**Kafka connect framework** bao gồm:
> - **Source connector**:
>     - SourceConnector.
>     - SourceTask.
> - **Sink connector**:
>     - SinkConnector.
>     - SinkTask.

Kafka connect framework đã code hết những thứ magic phía sau như scalability, fault tolerance, error handling... Các engineer chỉ cần implement 2 class cho mỗi Kafka connect là:
> - **SourceConnector** và **SourceTask**.
> - Hoặc **SinkConnector** và **SinkTask**.
>
> Thực ra còn khá nhiều thứ xung quanh nhưng chúng ta chỉ cần có cái nhìn tổng quan về Kafka connect.

Đó là tất cả những gì cần làm để tạo ra Kafka connector. Sau đó chỉ cần config và bùm.. bài toán được giải quyết nhanh gọn.

![](https://i.imgur.com/B4R4Z9r.png)

## 3) Kafka connect scalability

**Scalability** - bài toán muôn thuở, xuất hiện tại mọi ngóc ngách từ database cho đến application, từ producer đến consumer và giờ là Kafka connect.

> - Scale producer để tăng số lượng message gửi đến Kafka.
> - Scale Kafka cluster bằng cách thêm brokers để tăng tải cho hệ thống.
> - Scale consumer để handle được nhiều message hơn.
> - Và scale Kafka connect cũng cùng chung một mục đích là tăng tải cho hệ thống, handle được nhiều message hơn tại cùng một thời điểm.

Bản thân Kafka connect có thể coi là một cluster với mỗi một unit là một worker.

> Chúng ta có thể khởi tạo một tập các SourceTask hoặc SinkTask để share workload. Mỗi worker pull task từ một hoặc một phần table, trong khi worker còn lại pull task từ những table khác. Tùy thuộc vào cách config và cách design/implement của Kafka connect.

## 4) Kafka connect transformation

Bài toán trở nên phức tạp hơn, sếp muốn chuẩn hóa data và thêm thắt một vài field trước khi đẩy ra các hệ thống bên ngoài. Với Kafka connect, nếu chỉ config thôi liệu có đủ?

> Kafka connect được thiết kế với mục đích ban đầu là **copy** data từ các 3rd party đến Kafka. Tuy nhiên các kĩ sư tài ba cũng đã lường trước cả. Kafka connect cung cấp thêm tính năng Single Message Transformations - SMTs. Điều đó có nghĩa là chúng ta hoàn toàn có thể apply transformation cho từng mesage on the fly.
>
> Tất nhiên, tính năng này apply được cho cả Source connector và Sink connector.

Một vài [SMTs phổ biến](https://docs.confluent.io/platform/current/connect/transforms/overview.html) là:
> - Thêm field mới cho message.
> - Filter message dựa trên field.
> - Rename field.
> - Route message đến các topic khác nhau.

Nếu bạn đã quen với Java 8 stream API thì SMT giống như intermediate operation, có thể nối các SMT thành một chuỗi để transform message.

![](https://i.imgur.com/l14HYHS.png)

Btw, hàng thửa sẵn nên sẽ khá mất thời gian và đôi khi không phù hợp với những bài toán validate và transform thực tế vốn dĩ phức tạp.

> Có thể tự tự implement phần validate/transform message để đạt hiệu quả tối đa nhất :hammer:.

## 5) Kafka connect architecture

Phần cuối cùng trong bài viết sẽ bàn luận về Kafka connect architecture với 3 keywork:
> - Worker.
> - Connector.
> - Task.

Worker là những công nhân chăm chỉ có sẵn 2 khả năng:
> - **Fault tolerant**: nếu một worker gặp sự cố, task của worker đó sẽ được assign sang cho các worker khác để tiếp tục thực thi.
> - **Self managed**: trong trường hợp có worker mới join vào cluster, các task sẽ được phân phối lại để đảm bảo load balance. 

Như vậy, worker cung cấp 4 tính năng:
> - Reliability.
> - High avalability.
> - Scalability.
> - Load balancing.

Tất cả việc chúng ta cần implement là copy data từ source, hoặc config để Kafka connect có thể read data từ database với ví dụ đầu bài.

Tiếp theo, worker cần thực thi các task. Việc phân thành nhiều task có thể thực thi đồng thời là cách để tăng performance cho hệ thống. Giả sử, ta cần read data từ 5 tables, cách đơn giản nhất là chia thành 5 task. Mỗi task read một table. Cách phân chia task có thể thay đổi tùy thuộc yêu cầu bài toán. Keyword là cố gắng chia thành nhiều concurrent task nhất có thể để tối đa hóa parallel execution.

Concept không có gì đặc biệt, tất cả chỉ focus vào việc read data từ source và đẩy vào worker xử lý. Tuy nhiên không dính dáng gì đến việc send message đến Kafka cluster.

> Task chỉ có ý nghĩa trong việc tương tác với external system, SourceTask sẽ read data từ source và chuyển đến Worker. Worker mới chính là thứ gửi message đến Kafka cluster, và chúng ta không cần implement việc này. Tương tự với SinkTask, task chỉ có nhiệm vụ insert data vào external system.

Read và write message đến Kafka cluster là việc của Kafka connect, đã được xử lý bởi framework. Chúng ta chỉ cần tập chung vào 2 nhiệm vụ chính:
> - Làm thế nào để phân chia input thành các phần có thể thực hiện đồng thời.
> Làm thế nào để tương tác với các external system.

Trên đây là toàn bộ về Kafka connect concept, được tạo ra với mục đích streaming data giữa Kafka và external system mà không cần động tới go-live project với 2 cách thức sử dụng:
> - Sử dụng các open-source Kafka connect.
> - Tự viết Kafka connect dựa trên Kafka connect framework để triển khai business riêng.

Bài tiếp theo sẽ practice với Kafka connect, tự viết luôn một connector và deploy cho hoành tráng :hammer_and_pick:.

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)