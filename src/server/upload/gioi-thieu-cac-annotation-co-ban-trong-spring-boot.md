![](https://images.viblo.asia/51b458b2-92c5-453b-b205-1e4f93b58094.png)

## **Mở Đầu**
Trong quá trình sử dụng **Spring Framework** để lập trình, đặc biệt là **Spring Boot**. Chắc hẳn các bạn đã gặp các **Annotation** (Chú thích) là điều khó tránh khỏi. Nó thường hay sử dụng để ***cung cấp thông tin dữ liệu*** cho đoạn source code Java của bạn.<br/><br/>
Bài viết sau đây, mình xin giải thích và hướng dẫn sử dụng một số annotation thường gặp nhiều nhất.    

## **Các kiến thức cần nắm**
+ ***Dependency Injection*** (DI) Là một design pattern, một cách code nhằm giảm sự phụ thuộc giữa các Object để tiện cho việc thay đổi hay mở rộng code sau này. Các Object nên phục thuộc vào các Abstract Class và thể hiện chi tiết của nó sẽ được Inject vào lúc runtime chương trình.
+  ***Inversion of Control*** (IoC): <br />
→ Tuy nhiên khi có nhiều Dependency (>10) chúng ta phải tiêm (Injection) cho các denpendency này thì rất mất thời gian.<br />
→ Tưởng tượng một Class bản thân phải Inject cho hàng chục dependency thì rất mất thời gian.
	- Thay vì cách khởi tạo các Object như cách thông thường thì ra đảo ngược lại chiều điều khiển để cho Spring tạo Object, quản lí bộ nhớ cho các Object thay việc của chúng ta. (**ĐẢO NGƯỢC CHIỀU ĐIỀU KHIỂN**)
+ ***Spring Container*** là nơi chứa đựng tất cả các Bean.
+ Đọc thêm ở: <br />
    → [DI & IoC](https://loda.me/spring-giai-thich-dependency-injection-di-va-io-c-bang-ngoc-trinh-loda1553326013583) <br />
    → [Spring Container](https://levunguyen.com/laptrinhspring/2020/03/01/ioc-container-la-gi-trong-spring/)

## **@*Autowire***
- Tự động nhúng các bean được Spring Container sinh ra vào các class được khai báo **@*Autowire*** (theo cơ chế **Dependency Injection**) <br />
	→ Cơ chế khi Spring bắt đầu chạy nó sẽ quét qua các lớp có sử dụng **annotation** để tạo Bean. <br />
    → Đồng thời sẽ tìm kiếm xem trong các bean đó có khai báo **@*Autowire*** không, nó sẽ tìm kiếm các bean tương ứng để tiêm (Injection) vào bean đó.
	- Sử dụng **@*Autowire*** với 3 trường hợp sau:
```java
//Properties
@Service
public class UserService {

        @Autowired
        UserRepository userRepository;

        @Autowired
        FacebookUtil facebookUtil;
}
```
```java
//Setter
@Service
public class User {
    
        Private String name;
        
        @Autowire
        void setName(String name) {
            this.name = name;
        }
}
```
```java
//Contructor
@Service
public class User {
    
        private long id;

        private String name;

        @Autowire
        void user(long id, String name) {
            this.id = id;
            this.name = name;
        }
}
```
## **@*Configuration***
- Được sử dụng để chỉ ra rằng, Class khai báo sử dụng **@*Configuration*** sẽ khai báo một hoặc nhiều **@*Bean*** method trong class đó.<br />
→ Thông thường các Bean cấu hình trong dự án ta sẽ để trong các lớp configuration này. Ví dụ cấu hình Elasticsearch, Thymeleaf, đa ngôn ngữ,…
## **@*Bean***
- Đánh dấu trên method thông báo cho Spring, method đó sẽ sinh ra một bean và được quản lí bởi **Spring Container**. <br />
→ Tất cả các Method sử dụng annotation **@*Bean*** phải nằm trong class Configuration.
```java
@Configuration
public class WebDriverConfig {

    @Bean
    public WebDriver Chrome() {
        System.setProperty("webdriver.chrome.driver", "/Downloads/chromedriver_linux64/chromedriver");
        return new ChromeDriver();
    }
}
```
## **@*ComponentScan***
- Sử dụng annotation này để thông báo cho ***spring container*** rằng: “Phải biết vào các package nào trong dự án để quét các ***Annotation*** và tạo Bean.” <br />

```java
@Configuration
@ComponentScan(basePackages = "minhchuan.spring ")
public class SpringComponentDemo {
   // ...
}
```
## **@*Component***
- Khi một class sử dụng annotation này: “Thì sẽ được tạo thành 1 Bean, và tiêm vào các lớp nào cần dùng tới nó” 

| Component | Configuration |
| -------- | -------- |
| Sẽ không thể @Autowire một lớp nếu lớp đó không sử dụng @Component.      | Nó giống như file Bean.xml dùng để khai báo các bean .    |
| Khi bạn muốn xác định lớp để Injection thì phải đánh dấu bằng cách sử dụng annotation này để spring biết.      | Sẽ được spring tự động phát hiện.     |


## **@*Service***
- Đây là annotation đặc biệt của @Component. Được dùng để sử lý nghiệp vụ, logic.
```java
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FacebookUtil facebookUtil;
}
```
## **@*Repository***
- Đây cũng là một annotation đặc biệt của @Component. Được dùng để thao các với cơ sở dữ liệu.
- Jpa sẽ cung cấp cho các hàm select, update,... cơ bản. Có thể áp dụng thêm ***Query Creation***.
- Các **Interface** thường gặp: *CrudRepository*, *JpaRepository*, *MongoRepository*,...

```java
@Repository
public interface UserRepository extends JpaRepository <User, Integer> {
    //Query Creation
}
```


## **@*Scope***
+ Đây là phạm vi Bean được sinh ra và bị phá hủy dưới sự quản lí của Spring Container. Khi Bean sinh ra có các phạm vi được sử dụng và các tùy chỉnh của nó: <br />
    + Singleton: Đây sẽ là scope mặc định của 1 bean khi được sinh ra. nó có nghĩa: “bean chỉ tạo 1 lần và sử dụng trong container. Chỉ duy nhất một bean tồn tại trong container”.<br />
            → Có nghĩa là tại 1 thời điểm Container chỉ load một Bean nhất định.<br />
	+ Prototype: ngược lại với Singleton, ta muốn có nhiều Bean thì sử dụng scope này. <br />
	+ Request: Bean được sinh ra thông qua các HTTP Request của người dùng. Chỉ được dụng trong các ứng dụng Web.<br />
	+ Session: Bean được sinh ra thông qua các HTTP Session.<br />

## **@*PropertySource*** & **@*Value***
- Chúng ta sử dụng @PropertySource để cho Spring biết tìm các file properties cấu hình cho hệ thống ở đâu.
- Đồng thời sử dụng @Value để lấy giá trị trong file properties.
```java
    @Configuration
    @PropertySource("classpath:application.properties")
    public class MongoDBConfiguration {

        @Value("${mongodb.url}")
        private String url;

        @Value("${mongodb.db}")
        private String name;
    }
```

## **@*Valid***
- Dùng để kiểm tra dữ liệu có đúng như mình mong muốn hay không.<br />
```java
@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotEmpty(message = "Please provide a name")
    private String name;

    @NotEmpty(message = "Please provide a className")
    private String className;

    //...
}

@RestController
public class UserController {

    @PostMapping("/users")
    Book newBook(@Valid @RequestBody User user) {
        //...
    }

}
```
=> Ở trường hợp này nếu như Object User bị null ở properties (name, className) thì sẽ bị bắt lỗi.
## **@*ReponseBody***
+  Thông báo cho người dùng biết rằng APIở controller, sẽ trả về một đối tượng Object kiểu Json cho client chứ không render ra một trang view.


## ***Kết***
Như vậy là đã xong rồi đấy! Hi vọng bạn hiểu được cách sử dụng các **Annotation** làm việc thông qua trong các ví dụ nhỏ này.<br />

Ví dụ này cũng khá là phức tạp, nên có khi bạn sẽ phải đọc đi đọc lại nhiều lần, nhưng hãy kiên nhẫn nhé!<br />

Cảm ơn các bạn đã đọc bài