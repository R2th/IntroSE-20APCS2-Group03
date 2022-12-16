© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Kafka và cụ thể Kafka cluster là một hệ thống phân tán với số lượng lớn các broker. Các **topic** được chia thành nhiều **partition** và nhân bản ra nhiều nơi trên các broker. Nhờ đó nó biến một **topic** thông thường thành nhiều phần nhỏ hơn. Tăng số lượng **consumer** để tăng số lượng read message đồng thời, trực tiếp tăng performance cho chương trình. 

Như vậy chia thành càng nhiều **partition** thì **throughput** càng lớn. Bình thường **1 topic - 1 partition - 1 consumer** xử lý được 10 message/s thì với **1 topic - 10 partition - 10 consumer** có thể xử lý được 100 message/s.

Tuy nhiên nó mới chỉ là một yếu tố, việc tăng số lượng **partition** kéo theo vô vàn các hệ lụy khác như tăng số lượng open file, tăng latency...

Tiến thoái lưỡng nan. Rốt cuộc số lượng **partition** ảnh hưởng đến các yếu tố gì và như thế nào?

Let's begin.

## 1) Throughput

Từ các bài trước, có thể kết luận rằng số lượng partition trong một topic quyết định việc topic đó được xử lý song song tối đa đến mức nào.

> Có thể coi topic giống chốt kiểm dịch Covid-19, partiton là các làn kiểm tra. Nếu được thiết kế với duy nhất một làn, các phương tiện phải nối đuôi nhau để thông quan. 
> 
> Nếu tăng số lượng làn kiểm tra, số lượng phương tiện cùng được qua trạm trong một thời điểm sẽ nhiều hơn. Throughput có thể tăng từ 1 lên 5 phương tiện/phút.

![](https://i.imgur.com/lKlFDjF.png)

Tuy nhiên để tận dụng được khả năng parallelism này, ta cũng cần số lượng producer và consumer tương ứng để toàn bộ flow được diễn ra song song.

> Nếu chỉ lẻ tẻ một vài phương tiện thì việc xây dựng chốt với nhiều nhân viên không những không tăng hiệu quả mà còn tốn thêm chi phí, nguồn lực.

Dẫn đến kết luận đầu tiên, topic càng nhiều partition thì khả năng tăng throughput càng lớn nhưng nó sẽ phụ thuộc vào số lượng message, số lượng producer, consumer của hệ thống.

Do đó, việc quyết định số lượng partition có thể dựa trên throughput mong muốn của hệ thống.

Mỗi topic partition có khả năng xử lý 10 MB/s (benchmark [tại đây](https://engineering.linkedin.com/kafka/benchmarking-apache-kafka-2-million-writes-second-three-cheap-machines)). 

Như vậy, nếu hệ thống cần xử lý khoảng 5 TB/ngày cho một topic, tương đương khoảng 60 MB/giây, ta cần chia tối thiểu thành 6 partition.

![](https://i.imgur.com/U9wbrj9.png)

Nghe có vẻ đơn giản :hamster:, có gì đó sai sai không nhỉ?

> Hệ thống sẽ chạy hoàn hảo như những gì ta mong muốn nếu các message gửi đi không define key. Lúc này Kafka sẽ round-robin message tới partition, đảm bảo số lượng message trong mỗi partition cân bằng với nhau, không chênh lệch nhiều.

Thực tế, message được gửi kèm key. Lúc này Kafka sẽ xác định partition cho message dựa trên key hashing để đảm bảo các message cùng key luôn route đến cùng partition. Như vậy sẽ có trường hợp partition có quá nhiều message, trong khi đó có partition chẳng có message nào.

> Mặc dù có đến 10 làn đường nhưng chỉ có 2 làn đường cho xe đạp và xe thô sơ.
> 
> Bình thường không đến nỗi nào, dù xe cộ có đông, cả ô tô lẫn xe máy thì cũng không quá tắc đường. 
>  
> Bỗng một ngày đẹp trời, người dân nổi hứng yêu mẹ thiên thiên chuyển sang đi xe đạp hết thì.. tắc như đường Trường Chinh vì chỉ sử dụng được 2 làn xe.

Như chúng ta thấy, đó là vấn đề của người dân, chính phủ đã thiết kế đường to và đẹp, đầy đủ các làn. Việc còn lại là sử dụng như nào cho phù hợp.

Tương tự, Kafka sử dụng thuật toán hashing và routing phù hợp để đảm bảo số lượng key/partition không chênh lệch quá nhiều. Nếu các message bắt buộc phải xử lý tuần tự thì nó vẫn phải được xử lý tuần tự, việc tăng partition, tăng consumer không giúp ích gì trong trường hợp này.

Cũng ví dụ trên, trên thực tế 10 làn xe là quá đủ dùng cho không chỉ năm nay mà thậm chí tương lai 3 - 5 năm nữa. Mặc dù tốn chi phí ban đầu nhưng nó đem lại 2 lợi ích:
> - Có thể dự trù trong tương lai.
> - Không tốn effort cho việc sửa chữa giữa quá trình. Hãy nhìn những con đường tại Hà Nội, vừa sửa vừa làm, bụi bặm mù mịt mà cũng ảnh hưởng tới an toàn giao thông. Với Kafka, việc tăng partition có thể ảnh hưởng đến message ordering vì Kafka cần tính toán lại key hasing để tìm partition cho message.
> 
> Từ ví dụ trên rút ra lưu ý, Kafka không cho phép giảm số lượng partition của một topic, chỉ có thể tăng lên, hoặc xóa đi và tạo lại. Chả có ai đi tu sửa con đường 10 làn về 2 làn làm gì :hammer:.

Túm cái váy lại, nếu có số lượng N broker, khoảng 6 brokers trở xuống, best practice là tạo tối đa 2N partition cho mỗi topic, tức là khoảng 12 partition.

Nếu cụm cluster lớn hơn với 12 brokers thì.. mình chưa có cơ hội được xử lý tới bài toán nào lớn như vậy nên không chắc chắn, lúc này cần nhiều thông số hơn để quyết định.

## 2) File descriptor

Mỗi partition được lưu trữ tại một folder của broker. Như vậy, số lượng partition tỉ lệ thuận với số lượng file phải xử lý của broker.

> Mỗi partition cần xử lý 2 files: index và actual data.

Vấn đề này liên quan tới I/O của broker, tốc độ đọc ghi ổ cứng và config của OS. Nếu số lượng open files quá lớn ta cần setting lại config phù hợp thông qua câu lệnh:

```shell=
sysctl fs.file-max
```

Đây không phải big problem và thường xuyên xảy ra nhưng cũng cần biết về nó để tính các phương án dự phòng khi chúng ta set số lượng lớn partition.

## 3) Avalability & Latency

Kafka support intra-cluster replication, chính là việc mỗi partition có thể bao gồm nhiều bản sao với 1 leader và nhiều ISR để đảm bảo higher availability và durability.

> Khi một broker gặp sự cố, leader replica thuộc broker đó không còn hoạt động. Điều đó yêu cầu một ISR khác lên thay thế. Expectation việc này phải diễn ra cực nhanh chỉ vài milliseconds để như chưa hề có cuộc chia ly.

Trong trường hợp broker cần shutdown để maintain, tức là graceful shutdown, mọi việc diễn ra đúng như kịch bản, Kafka biết broker nào shutdown và quá trình leader election diễn ra nhanh chóng, phục hồi lại hệ thống. Tuy nhiên với các sự cố không lường trước, broker bị force shutdown đột ngột khiến quá trình này không được xử lý chủ động.

> Graceful shutdown giống việc tắt máy bình thường. Còn force shutdown là giữ nút nguồn vài giây và.. màn hình đen ngòm.

Vậy nó liên quan gì đến số lượng partition?

Well, nếu số lượng partition cực nhiều đồng nghĩa với việc 1 broker có khả năng chứa đến vài chục hoặc vài trăm leader replica của partition đó. Do force shutdown nên quá trình này không được kích hoạt chủ động. Vậy nên rất có khả năng tại một thời điểm nào đó sau quá trình shutdown, hệ thống tăng latency đột ngột lên vài giây. 

Trong thực tế, tình huống force shutdown hiếm khi xảy ra. Và cũng không nhiều bài toán có số lượng partition lớn đến vậy.

> Chúng ta chỉ cần hiểu nó ảnh hưởng ít nhiều đến tính availability của hệ thống là ổn rồi. Việc còn lại dành cho SA và DevOps :hammer:.
> 
> Nếu bạn là SA hoặc Senior DevOps, hãy chia sẻ quan điểm tại phần comment nhé.

Một yếu tố khác cũng bị ảnh hưởng tỉ lệ thuận với số lượng partition là end-to-end latency.

Latency được tính bằng thời gian message gửi nhận giữa producer và consumer.

Consumer chỉ có thể consume message sau khi message được replicated đến toàn bộ các replicas. Default, việc sync data trên Kafka broker là single thread. Như vậy nếu broker nào đó chứa rất nhiều leader replicas của partition, quá trình sync này có thể tốn đến vài ms. Với real-time application, vài ms cũng là một vấn đề lớn.

## 4) Tổng kết

Việc tăng partitions nhằm mục đích tăng throughput là hoàn toàn đúng đắn. Tuy nhiên có rất nhiều thứ chúng ta cần cân nhắc như latency, availability, config... Đấy là trong trường hợp chúng ta cần số lượng partition cực lớn và bài toán khổng lồ.

Với các bài toán nhỏ nhỏ mình đã gặp,  con số partition rơi vào khoảng 3 hoặc 10. Không quá khó khăn để quyết định :joy_cat:.

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

### After credit

Như vậy chúng ta đã đi qua toàn bộ về Apache Kafka core concept bao gồm:
> - Producer.
> - Consumer.
> - Consumer group.
> - Offset.
> - Cluster, broker.
> - Topic, partition, replica.

Ngoài core concept, Kafka còn bao gồm:
> - Kafka connect concept.
> - Kafka stream concept.
> - Kafka SQL concept.

Tìm hiểu dần dần trong các bài viết tiếp theo nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)