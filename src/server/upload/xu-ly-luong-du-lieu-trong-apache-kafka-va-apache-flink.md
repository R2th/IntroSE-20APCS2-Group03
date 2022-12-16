## Giới thiệu
Trong bài viết này chúng ta sẽ xây dựng một luồng tiếp nhận và xử lý dữ liệu live với Apache kafka và Apache Flink. Trước khi đi sâu hơn về cách thức hoạt động thì mình sẽ nói qua một chút về những khái niệm chính những công nghệ chúng ta sẽ dùng trong bài viết này.
## Luồng dữ liệu (data streaming) là gì ?
Data streaming là dữ liệu được tạo ra từ nhiều nguồn dữ liệu khác nhau. Cho dễ hình dung thì nó rất giống với dòng chảy trên sông, dòng nước được chảy liên tục và cũng được hình thành từ nhiều nguồn khác nhau
như mưa, suối và hồ... 

Có 2 dạng luồng dữ liệu:
1.  Bounded Streams - Luồng yêu cầu có điểm đầu và điểm cuối. Dữ liệu trong luồng sẽ được tập hợp tại điểm cuối rồi mới được xử lý một lượt. Quá trình xử lý này được gọi là Batch Processing.
2. Unbounded Streams - Luồng chỉ cần điểm bắt đầu nhưng không có điểm kết thúc, thay vì tập hợp dữ liệu rồi mới xử lý thì dữ liệu trong luồng sẽ được tiếp nhận và xử lý một cách liên tục. Quá trình này là Real-time Proccessing

<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/gr1NkBia4-HorEA5RgI-uFWcvBaoWWA6X2c1siW1nELB-Xj9OXvbNdEDDyPRlfXZHsplr7HTqWN0WeuzhoJpK7abyFY365OEFiJ2i_WyEsda8nM5NDiueStSKXVsdcNnrJKOXOE=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTAzNzoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/gr1NkBia4-HorEA5RgI-uFWcvBaoWWA6X2c1siW1nELB-Xj9OXvbNdEDDyPRlfXZHsplr7HTqWN0WeuzhoJpK7abyFY365OEFiJ2i_WyEsda8nM5NDiueStSKXVsdcNnrJKOXOE=s0">

Trong nội dung bài viết, chúng ta tập trung vào Unbounded Streams. Do đó luồng dữ liệu sẽ bao gồm 2 microservice - một Kafka producer sẽ tạo ra dòng dữ liệu liên tục, cái còn lại là một cosumer tiếp nhận dòng dữ liệu đó và đẩy nó lên Flink thực hiện tính toán, biến đổi dòng dữ liệu đó thành 1 dòng dữ liệu khác.

<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/zFlVvlDHxo3zrb-sELS0t_353nE3HJJgYtPz4oXKJp0iLKEr4o9ZKN0KTTBdACcw8JI3ICNhPY_wgOLjlISx1MHuCrJVkA-p0TG4E6rDkZPTFoWwP0lV86X0vlnxgvdcWXm7fls=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTA0NToyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/zFlVvlDHxo3zrb-sELS0t_353nE3HJJgYtPz4oXKJp0iLKEr4o9ZKN0KTTBdACcw8JI3ICNhPY_wgOLjlISx1MHuCrJVkA-p0TG4E6rDkZPTFoWwP0lV86X0vlnxgvdcWXm7fls=s0">

Trước khi bắt đầu code, cùng nhau tìm hiểu những công nghệ chính chúng ta sẽ sử dụng
### Apache Kafka
Apache Kafka là một nền tảng phân tán luồng dữ liệu được phát triển bởi Apache Software Foundation.
Nền tảng này được dùng để:
1. Publish và subscribe đến luồng sự kiện
2. Lưu trữ luồng sự kiện với tính an toán và độ tin cậy cao
3. Xử lý luồng sự kiện ngay khi chúng xuất hiện
Nói tóm tắt thì Kafka sử dụng Topics để phân loại sự kiện(events)/ tin nhắn(messages). Các Topics được chia thành nhiều các Partitions được phân bố đều trong Kafka và có thể được truy cập cùng lúc bởi nhiều consumsers.
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/JHN9IB86-1F0jfWmAlD2KleD-PybXK4C-e1j7KM3UsBRNvnMlQ0CTMKglLl21D-61RIk8k7O_bMtDN-v4uqb0YlYunoZEISgHK1X_22QxY3ya2ChiY7j_GAESi6sekGnBBxgPiA=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTA3MzoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/JHN9IB86-1F0jfWmAlD2KleD-PybXK4C-e1j7KM3UsBRNvnMlQ0CTMKglLl21D-61RIk8k7O_bMtDN-v4uqb0YlYunoZEISgHK1X_22QxY3ya2ChiY7j_GAESi6sekGnBBxgPiA=s0">

### Apache Flink
Apache Flink là một framework dùng để xử lý luồng dữ liệu từ bounded streams và unbounded streams. Nó có thể chạy hầu hết trên mọi môi trường cluster phổ biến hiện nay (Kubernetes, YARN,...) và thực hiện tính toán luồng dữ liệu với tốc độ rất nhanh
###  Streaming windows
Windows là một khái niệm quan trọng trong Kafka, khi xử lý một luồng dữ liệu liên tục và vô tận thì kafka sẽ chia luồng dữ liệu đó thành những windows với một kích thước nhất định nào đó rồi sau đó sẽ thực hiện tính toán trên những windows đó. Có nhiều cách để thực hiện chia luồng dữ liệu thành các windows, hình minh họa cho thấy 2 cách thực hiện đó là - tumbling và slicing windows
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/jOCjCVajO8O33ffew8x3w1p_bhwpUg_Pb_RdhA3D25gg3-y5b92ILFIx_U05KxBKwZqmEYwtv5tEhGQjcC047mvHX19vEIo8zfx0kLAaynOubheUWEBvOGJ-riOJShrx4w1JZfU=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTExMzoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/jOCjCVajO8O33ffew8x3w1p_bhwpUg_Pb_RdhA3D25gg3-y5b92ILFIx_U05KxBKwZqmEYwtv5tEhGQjcC047mvHX19vEIo8zfx0kLAaynOubheUWEBvOGJ-riOJShrx4w1JZfU=s0">
Cả hai cách thực hiện đều dựa theo thời gian, nhưng khác với tumbling windows, slicing windows có sự trùng lặp trên các windows.

## Streaming data pipeline implementation
Luồng dữ liệu chúng ta sẽ build mô phỏng dữ liệu giao thông lấy từ camera quan sát. Một consumer service sẽ tiếp nhận dữ liệu đó in ra kết quả có bao nhiêu loại phương tiện giao thông trong một khoảng thời gian nhất định.
###  The producer microservice
Trước tiên bạn cần setup Kafka trên máy local. Sau khi setup thành công, chúng ta tạo một ứng dụng Java hoạt động như một Producer. Chúng ta sử dụng Spring Boot và do đó không cần cấu hình gì để có thể sử dụng Kafka, chỉ cần thêm các dependencies là đủ rồi.
<p><em>Figure 1: Maven dependencies</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/uMFCwzbO428CIv7VXuTGZI1qFcIjoJ2R35YUAB7SVx1MNJlTZ9pQrKEbF4DIE5RzOtonfEZOMWzzh7i4VZZuhzXfZImfCnrBiqj1Dvrrbv9H4sCdgxjFmPIzNPSyHpnGF01NIwE=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTE0OToyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/uMFCwzbO428CIv7VXuTGZI1qFcIjoJ2R35YUAB7SVx1MNJlTZ9pQrKEbF4DIE5RzOtonfEZOMWzzh7i4VZZuhzXfZImfCnrBiqj1Dvrrbv9H4sCdgxjFmPIzNPSyHpnGF01NIwE=s0">
<p><em>Figure 2: application.yml</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/5YOW34fTVG8P3NG-IWoE_Tifb-XOMiaAb0CVrukzCR0J4C1cG_ED_zOofTb3xB62QROBxwLFvRKWjtBFRqaeQCcHCreVslgQht21--yEePCYWSQ6UTSrsk6eCQDDiRQJaTXXHuk=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTE1NzoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/5YOW34fTVG8P3NG-IWoE_Tifb-XOMiaAb0CVrukzCR0J4C1cG_ED_zOofTb3xB62QROBxwLFvRKWjtBFRqaeQCcHCreVslgQht21--yEePCYWSQ6UTSrsk6eCQDDiRQJaTXXHuk=s0">

Mẫu tin nhắn là một lớp POJO đơn giản 
<p><em>Figure 3: Vehicle</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/57yXXxm23LRE424w77xwxec8fmV44-Icj0NJEJTu_TtybabMDF_pgzJhYJBJYgh5bLPMjEVwpfpZOhaxNMkdMyGpSokCQWk7Hv-42ntXJHZkDuPuadxshE4wf9r-h7gPyr9SOmE=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTE3MzoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/57yXXxm23LRE424w77xwxec8fmV44-Icj0NJEJTu_TtybabMDF_pgzJhYJBJYgh5bLPMjEVwpfpZOhaxNMkdMyGpSokCQWk7Hv-42ntXJHZkDuPuadxshE4wf9r-h7gPyr9SOmE=s0">

<p><em>Figure 4: VehicleType</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/LFMytD2NsDpAxZ3lfw0g5ThdjA_GHcDfphNVkWGVMTgDLtO5vWi8LXbiNNAxXkisQOCZuKIl7sdEVqzkdPQSBWWHHrpZxXY6IJ-zl6m9m4LCGdxGjg9sHIUpIpK6GWYc00A7of4=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTE4MToyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/LFMytD2NsDpAxZ3lfw0g5ThdjA_GHcDfphNVkWGVMTgDLtO5vWi8LXbiNNAxXkisQOCZuKIl7sdEVqzkdPQSBWWHHrpZxXY6IJ-zl6m9m4LCGdxGjg9sHIUpIpK6GWYc00A7of4=s0">

Producer sẽ tạo ra ngẫu nhiên các dòng dữ liệu liên tục, ở đây là các phương tiên giao thông khác nhau. Để tạo ra các tin nhắn trong Kafka chỉ cần inject bean KafkaTemplate

<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/QqD_vjXTe-efpJlx_gxhwrJNN39WrhS6Uq5fxta7RTKpcVjcwK00r8v3lWGxJIv5vz9H56OAPZCOEr23aGm7QW24eQfV-jXDS0py2CmwjERv4Uz1gXC91gAv2ZX12MtSROiEzVw=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTE5MzoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/QqD_vjXTe-efpJlx_gxhwrJNN39WrhS6Uq5fxta7RTKpcVjcwK00r8v3lWGxJIv5vz9H56OAPZCOEr23aGm7QW24eQfV-jXDS0py2CmwjERv4Uz1gXC91gAv2ZX12MtSROiEzVw=s0">

Khi chúng ta chạy ứng dụng Spring Boot, ứng dụng sẽ gửi các tin nhắn loại phương tiện giao thông đến topic "vehicle-topic" trong local cluster trên máy chúng ta. 
###  The Data Processor Service
<p><em>Figure 6: Maven Dependencies</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/9Wsts8cNRX6URLzbCVcZUHsX3BaM59gLJQS4O47gbcs1yno4E0u-TiVc2HOgHpV2svjjSLpu2Zg1whkpCNxVUspaHjoNdcQEBG5zAQvr8rtWh5HSRcXBpvhOx_3BpdwxvTJ4sGI=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTIxMzoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/9Wsts8cNRX6URLzbCVcZUHsX3BaM59gLJQS4O47gbcs1yno4E0u-TiVc2HOgHpV2svjjSLpu2Zg1whkpCNxVUspaHjoNdcQEBG5zAQvr8rtWh5HSRcXBpvhOx_3BpdwxvTJ4sGI=s0">

Ngoài model chúng ta sẽ tạo để ánh xạ với model từ Producer, chúng ta sẽ tạo thêm 1 model dùng để lưu trữ kết quả của quá trình tính toán.
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/ZB2OYMSGdQXbjzMKzs-3BbOFx7uVbPsqA1-FRMj7C12AwdJ5HIJQz-nsl0SVWOAODvsWSqFx2OkSxN5BYmoMfSZEuDSPPd0qvU7fRoR37zqDovQ1Q8LTm0QDa6wwLwXNYb9hE70=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTIyOToyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/ZB2OYMSGdQXbjzMKzs-3BbOFx7uVbPsqA1-FRMj7C12AwdJ5HIJQz-nsl0SVWOAODvsWSqFx2OkSxN5BYmoMfSZEuDSPPd0qvU7fRoR37zqDovQ1Q8LTm0QDa6wwLwXNYb9hE70=s0">
Để hỗ trợ việc deserialisation model Vehicle từ producer và serialisation đến VehicleStatistics, chúng ta triển khai lần lượt interfaces DeserialisationSchema và SerialisationSchema trong thư viện Flink.

<p><em>Figure 7: VehicleDeserializationSchema</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/sS7881dyL9PNQ5AfpKt2u7_Gg3OHGAK6cEM-iqzAa4Hjznvq6rucXcxTcGDJ09EqkeXPAib6ui6ibj3nzK3_RPt-n4WYwmEPNCYYQw4qU69R8mEJ_FE6Dl1anx0j61MWA83jcOc=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTI0MToyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/sS7881dyL9PNQ5AfpKt2u7_Gg3OHGAK6cEM-iqzAa4Hjznvq6rucXcxTcGDJ09EqkeXPAib6ui6ibj3nzK3_RPt-n4WYwmEPNCYYQw4qU69R8mEJ_FE6Dl1anx0j61MWA83jcOc=s0">

<p><em>Figure 8: VehicleStatisticsSerializationSchema</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/AFKCZhOzXHew1f8uFCEJyPSpBmkGof2Cfd9jmqeQdkqmmTa8bgt7hg7Sr0KjMW5mITKy-YGOYbtAG-VqND5BAkP76VrA2oRfS_lB5oXSh6EB2UZOLCNuJME-bjC2lfLAYDgp8Ig=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTI0OToyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/AFKCZhOzXHew1f8uFCEJyPSpBmkGof2Cfd9jmqeQdkqmmTa8bgt7hg7Sr0KjMW5mITKy-YGOYbtAG-VqND5BAkP76VrA2oRfS_lB5oXSh6EB2UZOLCNuJME-bjC2lfLAYDgp8Ig=s0">

Đoạn code triển khai Flink trong lớp ProcessingService

```
@Service
@Log4j2
@RequiredArgsConstructor
public class ProcessingService {
  @Value("${kafka.bootstrap-servers}")
  private String kafkaAddress;
  @Value("${kafka.group-id}")
  private String kafkaGroupId;
  public static final String TOPIC = "vehicle-topic";
  public static final String VEHICLE_STATISTICS_TOPIC = "vehicle-statistics-topic";
  private final VehicleDeserializationSchema vehicleDeserializationSchema;
  private final VehicleStatisticsSerializationSchema vehicleStatisticsSerializationSchema;
  @PostConstruct
  public void startFlinkStreamProcessing() {
    try {
      processVehicleStatistic();
    } catch (Exception e) {
      log.error("Cannot process", e);
    }
  }
  public void processVehicleStatistic() throws Exception {
    StreamExecutionEnvironment environment = StreamExecutionEnvironment.getExecutionEnvironment();
    FlinkKafkaConsumer<Vehicle> consumer = createVehicleConsumerForTopic(TOPIC, kafkaAddress, kafkaGroupId);
    consumer.setStartFromLatest();
    consumer.assignTimestampsAndWatermarks(WatermarkStrategy.forMonotonousTimestamps());
    FlinkKafkaProducer<VehicleStatistics> producer = createVehicleStatisticsProducer(VEHICLE_STATISTICS_TOPIC, kafkaAddress);
    DataStream<Vehicle> inputMessagesStream = environment.addSource(consumer);
    inputMessagesStream
        .keyBy((vehicle -> vehicle.getVehicleType().ordinal()))
        .window(TumblingEventTimeWindows.of(Time.seconds(20)))
        .aggregate(new VehicleStatisticsAggregator())
        .addSink(producer);
    environment.execute();
  }
  private FlinkKafkaConsumer<Vehicle> createVehicleConsumerForTopic(String topic, String kafkaAddress, String kafkaGroup ) {
    Properties properties = new Properties();
    properties.setProperty("bootstrap.servers", kafkaAddress);
    properties.setProperty("group.id", kafkaGroup);
    return new FlinkKafkaConsumer<>(topic, vehicleDeserializationSchema, properties);
  }
  private FlinkKafkaProducer<VehicleStatistics> createVehicleStatisticsProducer(String topic, String kafkaAddress){
    return new FlinkKafkaProducer<>(kafkaAddress, topic, vehicleStatisticsSerializationSchema);
  }
}<div class="open_grepper_editor" title="Edit & Save To Grepper"></div>
```

Các hàm createVehicleConsumerForTopic  và createVehicleStatisticsProducer  tạo ra Flink consumer và producer. Các producer có thể được gọi là sink và consumer được gọi là source. Tất cả các ứng dụng Flink phải được trên StreamExecutionEnvironment
<p><em>Figure 9: Flink Data Stream Processing</em></p>
<img alt="Streaming Data Processing with Apache Kafka and Apache Flink" nitro-lazy-src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/kRhJYCYnvZ3DOW9po3kNAByd7_0nJiJe-H-jHHy8zOthiVDEeL2oks30tzyPpYiiq7c6PBTQLSQ4jjYIAq1t16fdYuR8V1-EsaeiKf5qez63etCyB90WFXp7y8NU2Nz7vYxFnpw=s0" class=" lazyloaded" nitro-lazy-empty="" id="MTM0NDoyODI=-1" src="https://cdn-bilib.nitrocdn.com/fToHGrxDUtMsMuCwglOXbkAJBmbeqKGG/assets/desktop/optimized/rev-f8e2644/kRhJYCYnvZ3DOW9po3kNAByd7_0nJiJe-H-jHHy8zOthiVDEeL2oks30tzyPpYiiq7c6PBTQLSQ4jjYIAq1t16fdYuR8V1-EsaeiKf5qez63etCyB90WFXp7y8NU2Nz7vYxFnpw=s0">

Luồng dữ liệu đầu vào được lấy từ vehicle-topic, xử lý thông qua một AggregateFunction, cuối cùng chúng ta addSink, nhập dữ liệu đó vào một topic khác. Cách lấy source và ghi vào sink được cung cấp bới Flink thông qua một thứ gọi là connectors. Dưới đây là một số connectors phổ biến của Flink với các hệ thống khác nhau:
* Apache Kafka (source/sink)
* Apache Cassandra (sink)
* Amazon Kinesis Streams (source/sink)
* Elasticsearch (sink)
* FileSystem (Hadoop included) – Streaming only (sink)
* FileSystem (Hadoop included) – Streaming and Batch (sink)
* RabbitMQ (source/sink)
* Apache NiFi (source/sink)
* Twitter Streaming API (source)
* Google PubSub (source/sink)
* JDBC (sink)

# Kết bài
Chúng ta đã tạo một đường luồng dữ liệu đơn giản để sản xuất, tiêu thụ và xử lý dữ liệu phát trực tuyến vô tận bằng Apache Kafka và Apache Flink. Chúng ta đã trình bày những vấn đề sau:
Hiểu biết chung về dữ liệu truyền trực tuyến.
* Giới thiệu về Apache Kafka và cách sử dụng nó liên quan đến xử lý dữ liệu trực tuyến.
* Giới thiệu về Apache Flink và các tính toán dữ liệu phát trực tuyến trạng thái của nó.
* Hiểu cách Flink có thể được tích hợp với Kafka và sử dụng nó như bộ nguồn và bộ ghi.

# Nguồn
[https://flink.apache.org/](https://kafka.apache.org/ )

[https://flink.apache.org/](https://flink.apache.org/)