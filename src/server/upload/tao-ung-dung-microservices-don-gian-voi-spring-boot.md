Microservices ngày càng được sử dụng nhiều trong phát triển phần mềm khi các nhà phát triển đang cố gắng tạo ra các ứng dụng lớn hơn, phức tạp hơn, và được quản lý tốt hơn như một sự kết hợp chặt chẽ các dịch vụ nhỏ với nhau.
### I. Microservice là gì?
Microservices là một dạng của kiến trúc hướng dịch vụ, trong đó các ứng dụng được xây dựng như một tập hợp các dịch vụ nhỏ hơn khác nhau chứ không phải toàn bộ một ứng dụng. Thay vì ứng dụng nguyên khối, bạn có một số ứng dụng độc lập có thể tự chạy và có thể được tạo bằng các ngôn ngữ lập trình hoặc mã hóa khác nhau. Các ứng dụng lớn và phức tạp có thể được tạo thành từ các chương trình đơn giản và độc lập được thực thi bởi chính chúng. Các chương trình nhỏ hơn này được nhóm lại với nhau để cung cấp tất cả các chức năng của ứng dụng lớn, nguyên khối.
![](https://images.viblo.asia/1cc2ad9a-301e-415d-96e9-75befd90c191.jpg)
Có nhiều lợi ích khi sử dụng microservices. Thứ nhất, do các ứng dụng nhỏ này không phụ thuộc vào cùng một ngôn ngữ mã hóa, các nhà phát triển (developers) có thể sử dụng ngôn ngữ lập trình mà họ quen thuộc nhất. Điều đó giúp các nhà phát triển đưa ra một chương trình nhanh hơn với chi phí thấp hơn và ít lỗi hơn. Sự nhanh nhẹn và chi phí thấp cũng có thể đến từ việc có thể sử dụng lại những chương trình nhỏ hơn này trên các dự án khác, làm cho nó hiệu quả hơn.
### II. Tạo ứng dụng Top Sports Brands
Giờ chúng ta cùng tạo một ứng dụng Microservices đơn giản gồm các service sau:
* **Eureka Service**: Dịch vụ này sẽ đăng ký mọi dịch vụ microservice và rồi microservice client sẽ tìm kiếm máy chủ Eureka để có được một dịch vụ microservice phụ thuộc để hoàn thành công việc. Máy chủ Eureka này thuộc sở hữu của Netflix và trong đó, Spring Cloud cung cấp một cách khai báo để đăng ký và gọi các dịch vụ bằng chú thích Java.
* **Item Catalog Service**: Dịch vụ này sẽ tạo danh sách các thương hiệu thể thao nổi tiếng trên thị trường.
* **Edge Service**: Là service Item độc lập được tạo ra trong Bootiful Development với Spring Boot và Angular. Nó có khả năng ngăn chặn client nhận lỗi HTTP khi service không sẵn có.
![](https://images.viblo.asia/103fa530-1cde-49bb-83fc-c5be4ac9e196.png)
#### 1. Tạo Eureka service
Trước tiên Eclipse của bạn phải cài Sping Tool Suite (STS), bạn có thể tham khảo cách cài đặt [ở đây](https://www.edureka.co/blog/spring-boot-setup-helloworld-microservices-example/).
Khởi động Eclipse, chọn File -> New -> Project -> Other... Bạn chọn Spring Starter Project.

![](https://images.viblo.asia/ada5e911-a55d-4688-a79f-fa9b23c7dac3.png)

Nhập tên cho service là EurekaServer, các thông tin khác sẽ được điền tự động.

![](https://images.viblo.asia/69f7c7fa-d547-419a-b452-54e2d8524df0.png)

Click [Next] và chọn Spring boot version, chọn Cloud discovery là **Eureka server** ở cửa sổ Project Dependencies.

![](https://images.viblo.asia/769296bc-4d17-4a7a-8555-6a654eaa5525.png)

Giờ chúng ta khai báo cổng (port), hủy đăng ký registration cho service. File cấu hình *EurekaServer/src/main/resources/application.properties*

![](https://images.viblo.asia/c501b5ef-a0d6-41dd-a715-06620da3fb1b.png)

Mở file *EurekaServer/src/main/java/com/example/EurekaServiceApplication.java* và thêm chú thích Java \@*EnableEurekaServer*, \@*SpringBootApplication* để nói rằng đây là ứng dụng Spring Boot, nó sử dụng Eureka service.

![](https://images.viblo.asia/24260f6d-849c-461d-9ce5-cd5c9517abf2.png)

Để chạy ứng dụng này ta click chuột phải lên file **EurekaServerApplication.java** chọn Project -> Run As -> Click on "Spring Boot App"

Truy cập `http://localhost:8761` và xem kết quả. Ta thấy là hiện tại không có service nào đang chạy.

![](https://images.viblo.asia/ad07b629-1231-4502-9814-a99660a27ba4.jpg)

#### 2. Tạo Item Catalog Service
Tương tự tạo Eureka service, ta tạo service mới có tên **Item-catalog-service** rồi click **[Next]**

![](https://images.viblo.asia/ebe04d6d-549f-4d0b-901c-1b59ec95e5f2.png)

Ta thêm các dependency sau cho service của mình: Actuator, EurekaDiscovery, JPA, H2, Rest Repositories, Web, DevTools, Lombok.

![](https://images.viblo.asia/bff1138f-528a-425e-b435-832d7d823e13.png)


Giờ ta tạo một entiry cho service bằng cách mở file *ItemCatalogServiceApplication.java* và thêm những dòng code sau.
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
class Item {

    public Item(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue
    private Long id;

    private String name;
}

@RepositoryRestResource
interface ItemRepository extends JpaRepository<Item, Long> {}

@Component
class ItemInitializer implements CommandLineRunner {

    private final ItemRepository ItemRepository;

    ItemInitializer(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of(""Lining", "PUMA", "Bad Boy", "Air Jordan", "Nike", "Adidas", "Reebok")
                .forEach(item -> itemRepository.save(new Item(item)));

        itemRepository.findAll().forEach(System.out::println);
    }
}
```
IDE của ta sẽ tự động import các thư viện tương ứng, bằng không bạn hãy thêm nó.
```
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.stream.Stream;
```
Mở file ** và cấu hình tên và port cho service như sau.
```
spring.application.name=item-catalog-service
server.port=8088
```
Giờ ta có thể start service của mình. Bạn nhớ Maven build module trước khi chạy.
Truy cập lại địa chỉ của Eureka server *http://localhost:8761* ta sẽ thấy Item-category service đang chạy.

![](https://images.viblo.asia/0460e84a-1829-4898-922a-b90cb9f24221.png)

Giờ ta truy cập list Item từ service Item-category tại địa chỉ *http://localhost:8100/items*

![](https://images.viblo.asia/f772455e-102d-4572-ac42-95c146bbba9c.jpg)

#### 3. Tạo Edge Service
Tương tự tạo 2 service trên, ta tạo mới project với tên **edge-service** với các dependency: Eureka Discovery, Feign, Zuul, Rest Repositories, Web, Hystrix, và Lombok.

![](https://images.viblo.asia/adb555e0-7e92-4fdc-bed6-a2a9887b8e78.jpg)

Vì service *Item-category-service* đã sử dụng cổng 8088 nên ta chọn cổng 8089 cho service *Edge-service*
```
spring.application.name=Edge-service
server.port=8089
```
Thêm chú thích Java cho service application này *EdgeServiceApplication.java*.
```
package com.example.edgeservice;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
...

@EnableFeignClients
@EnableCircuitBreaker
@EnableDiscoveryClient
@EnableZuulProxy
@SpringBootApplication
public class EdgeServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EdgeServiceApplication.class, args);
    }
}
```

Thêm `Item` DTO cho ứng dụng.
```
@Data
class Item {
    private String name;
}
```
Tạo `ItemClient` interface sẽ dùng **Feign** để giao tiếp với `Item-catalog-service`
```
@RestController
class GoodItemApiAdapterRestController {

    private final ItemClient itemClient;

    public GoodItemApiAdapterRestController(ItemClient ItemClient) {
        this.itemClient = itemClient;
    }

    @GetMapping("/top-brands")
    public Collection<Item> goodItems() {
        return itemClient.readItems()
                .getContent()
                .stream()
                .filter(this::isGreat)
                .collect(Collectors.toList());
    }

    private boolean isGreat(Item item) {
        return !item.getName().equals("Nike") &&
                !item.getName().equals("Adidas") &&
                !item.getName().equals("Reebok");
    }
}
```
Giờ ta build Maven cho module này và rồi chạy nó theo `Spring Boot App`.

Quan sát Eureka service ta thấy có 2 service đang chạy.

![](https://images.viblo.asia/31694f37-7e6f-4055-a002-f20b99d392b1.png)

Ta truy cập service này theo địa chỉ `localhost:8089/top-brands` và xem kết quả trả về.

![](https://images.viblo.asia/532a3c40-7fed-4f5c-a9f1-0ef499ea3de0.jpg)

Nếu chúng ta stop service `item-catalog-service` khi ấy service `Edge-service` sẽ gặp lỗi sau.
```
{
    "error": "Internal Server Error",
    "exception": "feign.RetryableException",
    "message": "connect timed out executing GET http://item-catalog-service/items",
    "path": "/top-brands",
    "status": 500,
    "timestamp": 1328088897672
}
``` 
Để khắc phụ lỗi này ta sử dụng **Hystrix** tạo method `fallback` trả về list item rỗng.
```
public Collection<Item> fallback() {
    return new ArrayList<>();
}

@HystrixCommand(fallbackMethod = "fallback")
@GetMapping("/top-brands")
public Collection<Item> goodItems() {
    ....
}
```
Chạy lại service `Edge-service` và xem kết quả trả về là một list rỗng.
```
[]
```
Chạy lại service `Item-catalog-service`, truy cập lại `Edge-service` và ta lại có được list item như trước.

**Tài liệu tham khảo**
* [spring - Microservices with Spring](https://spring.io/blog/2015/07/14/microservices-with-spring)
* [edureka - Microservices with Spring Boot](https://www.edureka.co/blog/microservices-with-spring-boot)