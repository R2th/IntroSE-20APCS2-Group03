Nếu ngẫu nhiên bạn lang thang đến đây và tự hỏi: **Spring Webflux** là gì? Giống hay khác so với **Spring MVC**? Tương lai Spring MVC sẽ ra sao? Vị trí nào dành cho Spring Webflux,...bla blô

Thì vui lòng đọc qua [bài viết abcxyz](https://viblo.asia/p/spring-mvc-va-dua-em-sinh-sau-de-muon-Eb85op1kK2G) giúp mình nhé, câu trả lời đang chờ bạn ở đó.

Còn bây giờ, trong bài này, mình sẽ mần một ví dụ nhỏ, dùng thử Reactive web với Spring Webflux để xem nó sang hay kém sang hơn Spring MVC nhé :D
## 1. Chuẩn bị project
Đầu tiên, mình sẽ tạo Spring boot project với Reactive web sử dụng [Spring Initializr](http://start.spring.io/) (Nếu bạn dùng intellij thì có thể tạo luôn trên IDE nhé)

**Lưu ý: Spring Webflux (với Reactive web) chỉ hỗ trợ trong Spring boot version 2.x thôi.*

![](https://images.viblo.asia/d5803545-3312-47a0-be3e-e14d01a27a98.jpg)
Mở nó thử trên IDE thì vầy nè:
![](https://images.viblo.asia/635351d1-0de8-48f0-a3c7-ecc833a63364.jpg)

## 2. Đặt yêu cầu
> Trong ví dụ này, mình sẽ tạo một ứng dụng nhỏ, cung cấp đơn chiếc một API để có thể lấy về tất cả dữ liệu tin tức ngẫu nhiên được thêm vào sau mỗi giây. Khi người dùng request đến API, mỗi khi một tin tức được thêm vào, thông tin của tin tức này sẽ được response về cho người dùng.
## 3. Bắt đầu thôi
##### Tạo class quản lý thông tin tin tức trước nào
```java
package com.ngockhuong.springwebfluxstarter.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class News {
    private String title;
    private String description;
}
```

Ở đây mình đang sử dụng hai annotation @Data và @AllArgsConstructor của **Lombok** để tự sinh constructor, getter, setter. Nếu bạn muốn dùng, thêm dependency sau vào ***pom.xml*** nhé:

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.18</version>
    <scope>provided</scope>
</dependency>
```

##### Tiếp đến, tạo service chịu trách nhiệm sinh ngẫu nhiên thông tin tin tức mỗi giây
```java
package com.ngockhuong.springwebfluxstarter.service;

import com.github.javafaker.Faker;
import com.ngockhuong.springwebfluxstarter.model.News;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.SynchronousSink;

import java.time.Duration;

@Service
public class NewsService {
    public Flux<News> getItems() {
        Faker faker = new Faker();
        return Flux.generate((SynchronousSink<News> sink) -> sink.next(new News(faker.food().ingredient(), faker.food().ingredient())))
                .delayElements(Duration.ofSeconds(1L));
    }
}
```
* **Faker**: Class hỗ trợ việc sinh ngẫu nhiên các chuỗi dữ liệu như tên, địa chỉ, quốc gia,...ở đây, mình dùng để sinh ngẫu nhiên thành phần tạo nên một món ăn và gán dữ liệu cho đối tượng tin tức `new News(faker.food().ingredient(), faker.food().ingredient())`

Thêm dependency bên dưới vào *pom.xml* để dùng ***Faker library*** bạn nhé:
```html
<dependency>
    <groupId>com.github.javafaker</groupId>
    <artifactId>javafaker</artifactId>
    <version>0.15</version>
</dependency>
```
* **@Service**: Để định nghĩa một class như là một service trong Spring Webflux, tương tự như khi bạn định nghĩa trong Spring MVC.
* **Flux**: Class được sử dụng để generate mới một đối tượng tin tức sau thời gian một giây và sau đó trả về chính đối tượng tin tức này.

##### Cuối cùng, cần tạo một endpoint để truy cập đến ứng dụng và sử dụng service đã tạo
```java
package com.ngockhuong.springwebfluxstarter.controller;

import com.ngockhuong.springwebfluxstarter.model.News;
import com.ngockhuong.springwebfluxstarter.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping(value = "/all-news", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<News> getAll() {
        return newsService.getItems();
    }
}
```
* **@RestController**: Khai báo để spring container biết class là một rest controller
* **Flux<News>**:  Kiểu dữ liệu trả về của một ứng dụng reactive stream. Ngoài Flux thì còn có Mono (Tương tự như List<News> và News trong Spring MVC)
* **produces**: Với giá trị "**application/stream+json**", giúp tin tức mới được đẩy xuống cho người dùng mỗi khi nó được thêm vào.

##### Chạy thử nào
Wow. Một list tin tức ngẫu nhiên được tạo mỗi giây và trả về

![](https://images.viblo.asia/cd4d6dc6-14aa-45bf-bba9-4a0b3fbf3aa0.jpg)

## 4. Thế là hết
Như vậy, lượn qua vài vòng thì mình đã tạo xong một ứng dụng **reactive stream** sử dụng **Spring Webflux** rồi đó. Việc lập trình web với reactive stream thật sự rất khó và mới lạ. Tuy nhiên, với sự hỗ trợ của Spring Webflux thì hầu như những khó khăn cũng sẽ khăn gói bỏ đi ngay thôi. Việc Spring tạo ra các annotation cho Spring Webflux giống hệt như Spring MVC cũng phần nào giúp bạn có một cách tiếp cận dễ dàng hơn rồi đấy.

Ở những bài viết sau, chúng ta sẽ cùng đi sâu vào tìm hiểu từng ngóc ngách của reactive stream, reactive web cũng như Spring Webflux nhé :D

![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)

Hẹn gặp lại các bạn :)))