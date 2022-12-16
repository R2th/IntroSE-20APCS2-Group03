Một lựa chọn phổ biến cho việc gửi dữ liệu từ server tới một web aplication là sử dụng WebSocket. WebSocket mở một kết nối hai chiều giữa server và client. Cả hai phía có thể gửi nhận dữ liệu qua lại.

Trong các ứng dụng chỉ cần giao tiếp một chiều từ server tới client thì Server-Sent Events (SSE) là một giải pháp tốt. SSE là một công nghệ web cho phép trình duyệt nhận tin nhắn từ server thông qua kết nối HTTP. Nó không giống với WebSocket, SSE thì dữ liệu chỉ đi một chiều từ server đến client. SSE thì tốt hơn Polling bởi vì Polling có nhiều HTTP overhead.

Cái hay khác của SSE là nó được xây dựng chức năng kết nối lại tự động. Nghĩa là khi client bị mất kết nối thì nó tự kết nối lại với server. WebSocket thì không có tính năng này.

### Stock Market
Là một ví dụ hệ thống mô phỏng các giao dịch trên thị trường chứng khoán và thông báo tới khách hàng.
#### Dependency
Chúng ta sử dụng Spring Boot 2, Spring Webflux, và Lombok.
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
        <version>2.0.3.RELEASE</version>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.4</version>
    </dependency>

    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webflux</artifactId>
        <version>5.1.7.RELEASE</version>
    </dependency>

</dependencies>
```
Các bước thực hiện.
* Khởi tạo stock với giá.
* Sau mỗi giây đồng hồ cập nhận giá stock và tạo giao dịch stock.
* Phía client sẽ nhận thông báo thông tin chi tiết giao dịch sau mỗi giây đồng hồ.

Lớp Stock đơn giản.
```java
@Data
@AllArgConstructor
@NoArgsConstructor
class Stock {
    String name;
    float price;
}
```
Lớp StockTransaction.
```java
@Data
@AllArgConstructor
@NoArgsConstructor
class StockTransaction {
    String user;
    Stock stock;
    Date when;
}
```
#### Reactive SSE
Chúng ta implement service trả vể Flux của `StockTransaction`.
```Java
@Service
class StockTransactionService {
    Flux<StockTransaction> getStockTransactions() {
        Flux<Long> interval = Flux.interval(Duration.ofSeconds(1));
        interval.subscribe((i) -> stockList.forEach(stock -> stock.setPrice(changePrice(stock.getPrice()))));
        Flux<StockTransaction> stockTransactionFlux = Flux.fromStream(Stream.generate(() -> new StockTransaction(getRandomUser(), getRandomStock(), new Date())));
        return Flux.zip(interval, stockTransactionFlux).map(Tuple2::getT2);
    }
}
```
Chúng ta khởi tạo random stock khi start ứng dụng.
```Java
void createRandomStock() {
        stockNames.forEach(stockName -> {
            stockList.add(new Stock(stockName, generateRandomStockPrice()));
        });
    }

    float generateRandomStockPrice() {
        float min = 30;
        float max = 50;
        return min + roundFloat(new Random().nextFloat() * (max - min));
    }

    float changePrice(float price) {
        return roundFloat(Math.random() >= 0.5 ? price * 1.05f : price * 0.95f);
    }

    String getRandomUser() {
        String users[] = "adam,tom,john,mike,bill,tony".split(",");
        return users[new Random().nextInt(users.length)];
    }

    Stock getRandomStock() {
        return stockList.get(new Random().nextInt(stockList.size()));
    }

    float roundFloat(float number) {
        return Math.round(number * 100.0) / 100.0f;
    }
```
#### Web API
Ta tạo Rest controller GET `/stock/transaction` liên tiếp trả về chi tiết giao dịch cuối cho client.
```java
@RestController
@RequestMapping("/stock/transaction")
class StockTransactionController {
    @Autowired
    StockTransactionService stockTransactionService;
    @GetMapping(produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<StockTransaction> stockTransactionEvents(){
        return stockTransactionService.getStockTransactions();
    }
}
```
`MediaType.APPLICATION_STREAM_JSON_VALUE` cho biết là server sẽ gửi SSE.
API sẽ trả response với header `Content-Type: application/stream+json`
Test nhận message từ server với cURL `curl -v http://localhost:8080/stock/transaction`.
Kết quả server gửi đến có dạng.
```
{"user":"adam","stock":{"name":"guava","price":32.73},"when":"2019-05-22T18:40:19.129+0000"}
{"user":"tom","stock":{"name":"infinity","price":39.97},"when":"2019-05-22T18:40:20.126+0000"}
{"user":"mike","stock":{"name":"mango","price":36.12},"when":"2019-05-22T18:40:21.123+0000"}
{"user":"mike","stock":{"name":"mango","price":37.93},"when":"2019-05-22T18:40:22.130+0000"}
{"user":"tom","stock":{"name":"mango","price":39.83},"when":"2019-05-22T18:40:23.125+0000"}
...
```
Tài liệu tham khảo.
* [Dzone - Spring boot server-sent events tutorial](https://dzone.com/articles/spring-boot-server-sent-events-tutorial)
* [Baeldung - Sping server-sent events](https://www.baeldung.com/spring-server-sent-events)