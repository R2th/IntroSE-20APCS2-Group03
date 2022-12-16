## 1. Vòng đời của bean

### 1.1. Bean life cycle

Trong bài trước chúng ta đã tìm hiểu sơ lược về bean là gì, hôm nay chúng ta sẽ đi sâu hơn tí nhé. 

Vòng đời (life cycle) của bean được hiểu là từ khi bean được tạo ra cho tới khi chết đi, sẽ có những sự kiện (event) khác nhau xảy ra. Về vòng đời của bean có thể mô tả bởi sơ đồ sau.

![](https://images.viblo.asia/d9391b5c-4ac6-4b33-80ed-9c8c88071e08.jpg)

Nhìn có vẻ dài và khó hiểu, nhưng đại loại sẽ gồm các bước sau:

* IoC container tạo bean bằng cách gọi constructor (có thể inject các bean dependency vào đây)
* Gọi các setter method để inject các bean vào bằng setter based injection
* Các method khởi tạo khác được gọi (không cần quan tâm nhiều)
* `@PostConstructor` được gọi
* Init method được gọi

Sau đó bean sẽ sẵn sàng hoạt động. Nếu sau đó bean không dùng nữa thì nó sẽ được hủy:

* Gọi `@PreDestroy`
* Hủy bean như các object thông thường

### 1.2. `@PostConstructor` và `@PreDestroy`

Đây là hai event khá quan trọng với bean, bạn có thể hook một method vào đó để thực thi khi event xảy ra:

* `@PostConstruct` là sau khi bean đã khởi tạo xong
* `@PreDestroy` là trước khi bean bị phá hủy

Chúng ta dùng hai annotation trên đánh dấu lên method nào đó, method đó sẽ được tự động gọi khi sự kiện bean xảy ra.

```java
class Car {
    @Autowired
    private final Engine engine;
    
    @PostConstruct
    public void testRun() {
        engine.run();
        engine.stop();
    }
    
    @PreDestroy
    public void stopEngine() {
        engine.stop();
    }
}
```

Như code ví dụ trên, mình gắn `@PostConstruct` cho method `testRun()`. Method này được gọi khi bean `Car` được tạo ra và khởi tạo hoàn chỉnh. Và trước khi `Car` bị phá hủy, thì cần gọi `stopEngine` tương tự như trên.

Dùng trong thực tế thì hai annotation trên làm các nhiệm vụ như:

* `@PostConstruct` dùng để thực hiện một số task khi khởi tạo bean
* `@PreDestroy` thực hiện các task để dọn dẹp bean sau khi dùng xong

## 2. Các loại bean

Nói đúng hơn thì gọi là các scope, phân loại dựa trên số lượng bean được tạo ra. Bean gồm có 5 scope:

* Singleton (mặc định): IoC container chỉ tạo đúng duy nhất 1 object từ class bean này
* Prototype: return một bean object riêng biệt cho mỗi lần sử dụng.
* Request: tạo mỗi bean cho mỗi request
* Session: tạo mỗi bean cho mỗi session
* Global session: tạo mỗi bean cho mỗi global session (cái này không hiểu lắm :()

Trong 5 scope trên chúng ta chỉ quan tâm tới hai scope đầu. Thường thì các bạn sẽ ít đụng tới prototype bean, nhưng mình cũng viết ra tại đây luôn.

Đối với singleton bean thì khỏi cần đánh dấu gì hết, nó là mặc định rồi. Còn nếu muốn chỉ định một class là prototype bean thì dùng `@Scope` như sau.

```java
@Component
@Scope("prototype")
class PrototypeBean {
    ...
}
```

Nói rõ hơn về prototype bean, ví dụ bean X được sử dụng bởi hai bean khác là A, B:

* Nếu X là singleton bean, thì chỉ có một object X được tạo ra. A và B dùng chung X.
* Nếu X là prototype bean, thì có 2 X được tạo ra cho 2 bean khác sử dụng là X cho A và X cho B.

## 3. Cách định nghĩa bean

Có 3 cách định nghĩa class là một bean:

* Khai báo trong file XML
* Dùng annotation trên class
* Dùng `@Configuration` và `@Bean`

Tùy từng trường hợp cụ thể mà dùng cho phù hợp. Ví dụ trong series này mình không bàn sâu về cấu hình bean bằng XML (do Spring Boot sinh ra không phải để cấu hình :D).

### 3.1. Dùng XML, annotations

Nhưng đơn giản, các bạn cũng nên biết trước đây Spring dùng XML để cấu hình các bean như sau. Nó khá là cực nên người ta dùng cách khác hay hơn.

```xml
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    
    <!-- Đây là bean Car -->
    <bean id="" class="Car" init-method="testRun">
        <!-- Cấu hình thuộc tính property cho bean -->
    </bean>
</beans>
```

Do đó người ta mới dùng cách cấu hình bean dựa trên các annotation như `@Component`. Cụ thể thì như bài trước có nói, chỉ cần đánh dấu `@Component` lên trên class thì IoC sẽ biết và tạo bean từ class đó.

```Car.java
@Component
public class Car {
    ...
}
```

Ngoài ra có các annotations khác cụ thể hơn như `@Service`, `@Repository`, `@Controller`,... cũng bao gồm `@Component`, nên tác dụng của chúng cũng là tạo bean.

### 3.3. Dùng `@Bean` bên trong `@Configuration`

Cách này dùng cho trường hợp bean cần thực hiện nhiều thao tác phức tạp để khởi tạo, hoặc có nhiều bean liên quan với nhau. Do đó, thay vì khởi tạo riêng rẽ từng class là từng bean, thì gom chung các bean cần khởi tạo lại bỏ vào class chứa là `@Configuration`.

Thường thì các class đánh dấu `@Configuration` có hậu tố là Config.

```AppConfig.java
@Configuration
public class AppConfig {
    // Khởi tạo trước các logic phức tạp
    // Có thể quy định thứ tự khởi tạo bean bằng `@Order`
    public AppConfig() {
        ...
    }

    @Bean
    public Car carBean() {
        return new Car();
    }
    
    @Bean
    public PasswordEncoder passwordEncoderBean() {
        return new BCryptPasswordEncoder();
    }
    
    // Có thể định nghĩa nhiều bean khác với @Bean
}
```

Khi Spring tìm thấy class `@Configuration`, nó sẽ tạo bean của class này trước (do `@Configuration` cũng là `@Component`). Trong khi tạo thì các logic khởi tạo cũng được thực thi, để chuẩn bị sẵn sàng tạo các `@Bean` bên trong.

Sau đó Spring Boot sẽ tìm các method được đánh dấu `@Bean` bên trong `@Configuration` để tạo bean. Thường thì các bean dạng này ngắn và return ngay object chứ không phải để Spring Boot tạo ra.

Các bean cũng được đưa vào ApplicationContext như bình thường.

Tuy nhiên, không phải class nào đánh dấu cũng được tạo bean. Mà phải có điều kiện quá trình component scan của IoC phải tìm thấy nó. Chúng ta sẽ đi tiếp về component scan ngay sau đây.

## 4. Component scan

### 4.1. Cách component scan hoạt động

Khi ứng dụng Spring Boot bắt đầu chạy, thì nó sẽ tìm hết các class đánh dấu là bean trong chương trình và tạo bean. Quá trình tìm kiếm các bean này gọi là component scan.

> Component scan sẽ tìm toàn bộ class ở package cùng cấp hoặc các package thấp hơn

Do đó, class đánh dấu `@SpringBootApplication` có chứa main method sẽ là nơi bắt đầu. Spring Boot sẽ tìm từ package này (package gốc) tìm xuống để tạo các bean.

```
src/main/java/
    com/tonghoangvu/demo/
        DemoApplication.java
        components/
            Engine.java
            ChinaEngine.java
            Car.java
        controllers/
            UserController.java
```

Do cấu trúc thư mục mặc định của Spring Boot nó thế, nên từ package gốc có `DemoApplication.java` là `com.tonghoangvu.demo`, nó sẽ tìm:

* Các class cùng cấp, tìm được `DemoApplication` class, tạo bean
* Tìm xuống các package thấp hơn như `com.tonghoangvu.demo.components` và `com.tonghoangvu.demo.controllers`, tìm thêm được các class như `ChinaEngine`, `Car`, `UserController` (`Engine.java` là interface nhé).

Do đó, mặc định mọi class được khai báo là bean đều có thể được tìm được.

### 4.2. Tùy chỉnh package tìm kiếm

Trong trường hợp bạn chỉ muốn Spring Boot tìm các bean trong một package cụ thể, ví dụ chỉ tìm trong thư mục `components` thì có 2 cách như sau.

```DemoApplication.java
// Cách 1 dùng @ComponentScan với 1 hoặc nhiều string (cần có {})
@ComponentScan("com.tonghoangvu.demo.components")

// Cách 2 thêm thuộc tính @SpringBootApplication scanBasePackages
@SpringBootApplication(scanBasePackages = {
    "com.tonghoangvu.demo.components",
    "com.tonghoangvu.demo.controllers"
})
public class DemoApplication {
    public static void main(String[] args) {
        ...
    }
}
```

---

Bài viết hôm nay đến đây là xong, cũng coi như là đi gần hết phần lý thuyết của Spring Boot rồi. Từ bài tiếp theo chúng ta sẽ tìm hiểu về những thứ thực tế hơn trong Spring Boot.

Chúc mừng năm mới, nhớ upvote và clip nếu bạn thấy hay nhé. Happy Vietnamese new year <3