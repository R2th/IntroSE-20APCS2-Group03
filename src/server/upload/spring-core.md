# Learning Spring Core

## 1 Định nghĩa IoC Container
Chương này đề cập các nguyên tắc cơ bản của Spring Framework Inversion of Control. IoC cũng có thể được hiểu là Dependency Injection (DI). Nó là một quá trình mà các đối tượng định nghĩa các Dependency của nó chỉ thông qua cơ chế: **đối số cho hàm khởi tạo (construcor argument), đối số cho các phương thức (arguments to a factory methid) hoặc các thuộc tính được thiết lập cho 1 thể hiện của đối tượng (object instance) trước khi nó được khởi tạo**. Container sau đó injects các Dependency khi khởi tạo bean.

Nền tảng của Spring Framework’s IoC container là hai package: **org.springframework.beans và org.springframework.context**, hai package này có nhiệm vụ tạo nên bean object. Sự khác biệt cơ bản giữa **BeanFactory** và **ApplicationContext** là: 
- Dễ dàng tích hợp với Spring’s AOP.
- Message resource handling (for use in internationalization).
- Event publication.

Nói một cách ngắn gọn, BeanFactory cung cấp cấu hình cơ bản để tạo nên Bean Object. ApplicationContext cung cấp thêm các chức năng hướng tới mục đích Enterprise.

Trong spring, các đối tượng tạo thành khung cơ bản của ứng dụng và chúng được quản lý bởi Spring IoC Container, các đối tượng này được gọi là các bean. Bean là một đối được mà được khởi tạo, ghép nối các thuộc tính và được quản lý bởi Spring IoC container. Bean và các Dependency của nó được mô tả rõ ràng trong cấu hình metadata mà được sử dụng bởi Spring IoC Container

## 2 Tổng quan về Spring IoC Container
Interface **org.springframework.context.ApplicationContext** đại diện cho Spring IoC Container và chịu trách nhiệm: khởi tạo, cấu hình và ghép nối thuộc tính của bean. Spring IoC Container đọc cấu hình (trong spring gọi là configuration metadata) để nhận được chỉ dẫn trong việc khởi tạo, cấu hình và ghép nối thuộc tính cho các bean. Configuaration metadata có thể được biểu diễn dưới định dạng **XML, Java Annotations hoặc Java Code**.

Sơ đồ sau mô tả cái nhìn tổng quan cơ chế làm việc của soring. Application class kết hợp với configuartion metadata do đó sau khi ApplicationContext được khởi tạo và kích hoạt, ta đã có một ứng dụng đã được cấu hình đầy đủ.

![](https://i.imgur.com/cI5IHAg.png)

*Spring container IoC*

### 2.1 Configuration Metadata
Như mô tả ở sơ đồ trên, Spring container sử dụng dạng configuration metadata. Configuration metadata hướng dẫn Spring Container khởi tạo, cấu hình và ghép nối thuộc tính cho các đối tượng trong ứng dụng.

Các loại chính của Configuration metadata là:
- Anotation-based configuration.
- Java-based configuration: Bắt đầu với soring 3.0, ta có thể định nghĩa beans bằng cách sử dụng java code thay vì XML file. Với các Annotation **@Configuration, @Bean, @Import, @DependsOn** người dùng có thể tự định nghĩa cách các bean được khởi tạo, cấu hình và ghép nối thuộc tính.

Bean tương tứng với các đối tượng làm nên ứng dụng. Thông thường, ta xác định các đối tượng lớp dịch vụ, đối tượng truy cập dữ liệu (DAO), các đối tượng trình bày.

### 2.2 Khởi tạo container

Ta có thể khởi tạo bằng các constructor như sau: 
```
ApplicationContext ctx = new AnnotationConfigApplicationContext(BeanConfiguration.class);

ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```
### 2.3 Sử dụng container
ApplicationContext là interface cho các class với nhiệm vụ duy trì sự đăng ký của các bean và Dependency của chúng. Bằng cách sử dụng phương thức **T getBean(String name, Class<T> requiredType)**, ta có thể nhận được instance của một bean: 

```
ApplicationContext ctx = new AnnotationConfigApplicationContext(BeanConfiguration.class);
        FooBean fooBean = (FooBean) ctx.getBean("getFooBean");
```
## 3 Tổng quan Bean

## 4 Dependency 

Một ứng dụng doanh nghiệp điển hình không bao giờ chỉ tồn tại duy nhất một object. Kể cả đối với các ứng dụng đơn giản nhất cũng tồn tại một vài đối tượng cùng hoạt động để trình bày một ứng dụng mạch lạc cho người dùng cuối. Trong phần này sẽ trình bày cơ chế để ta đi từ việc định nghĩa các bean độc lập cho đến phối hợp các bean để hình thành nên một ứng dụng hoàn chỉnh.

### 4.1 Dependency Injection 

Dependency Injection là một quá trình mà tại đó các đối tượng định nghĩa các Dependency của nó chỉ thông qua cơ chế: **đối số cho hàm khởi tạo (construcor argument), đối số cho các phương thức (arguments to a factory methid) hoặc các thuộc tính được thiết lập cho 1 thể hiện của đối tượng (object instance) trước khi nó được khởi tạo**. Các Dependency này được thiết lập cho Object Instance sau khi nó được tạo ra bởi hàm khởi tạo hoặc được tạo bởi Factory Method. 

DI tồn tại ở hai dạng là  Constructor-based dependency injection và Setter-based dependency injection.

- Constructor-based dependency injection: Constructor-based DI được thực hiện khi container invoke một class constructor với một số tham số, mỗi tham số sẽ đại diện cho một dependency đến một class khác.
- Setter-based dependency injection: Setter-based DI được thực hiện bởi container bằng cách gọi setter method từ bean sau khi invoke no-argument constructor hay no-argument static factory để khởi tạo bean.

### 4.2 Autowiring

Wiring, hoặc là Bean wiring là trường hợp mà các bean được kết hợp lại trong Spring container. Khi wiring bean, Spring container cần biết những bean nào cần và làm thế nào để container sử dụng dependency injection nối tất cả chúng lại với nhau.

Spring container có khả năng autowire quan hệ giữa các bean có mối quan hệ hợp tác với nhau. Spring sẽ giải quyết các mối quan hệ hợp tác bằng cách xem xét nội dụng của BeanFactory với các tag.

Autowiring có năm mode được sử dụng để hướng dẫn Spring container làm sao autowiring giải quyết dependency injection.

- no: đây là default setting, bean tham chiếu sẽ được reference rõ ràng khi khai báo.
- byName: khi autowiring byName, Spring container sẽ cố gắng match giá trị được khai báo trong bean với tên tương tự trong configuration file.
- byType: khi autowiring bằng data type, Spring container sẽ cố gắng match chính xác với tên của bean trong configuration file. Nếu có nhiều hơn một, fatal exception sẽ được throw ra.
- constructor: mode này tương tự với byType, nhưng type sẽ apply lên các constructor argument. Nếu không có kết quả nào phù hợp, thì fata exception cũng được throw ra.
- autodetect: Spring sẽ cố gắng wire bằng cách sử dụng constructor, nếu không có nó sẽ fallback xuống sử dụng byType.

## 5 Annotation-based Container Configuration

Một phương thức thay thế cho việc setup application bằng XML là chúng ta cung cấp các annotation-based configuration dựa trên bytecode metadata cho việc wiring các component. Thay vì sử dụng XML để mô tả một bean, lập trình viên chuyển các configuration vào trong component class bằng cách sử dụng annotation trong class, method hay field của chính class đó.

### 5.1 @Autowire Annotation
@Autowired annotation cung cấp phương thức wiring cũng như làm thế nào autowiring được hoàn thành. Nó có thể sử dụng autowire bean trong setter method như @Required annotation, trong constructor, trong property hoặc trong method nào đói với một hoặc nhiều argument.

Ta có thể sử dụng @Autowire annotation cho các constructor: 
```
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}
```
Sử dụng @Autowire annotation cho phương thức setter:
```
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Autowired
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```

Sử dụng @Autowire annotation cho các thuộc tính: 
```
public class FooBean {

    @Autowired
    private BarBean barBean;

    // ...
}
```
Sử dụng @Autowire annotation cho các thuộc tính và cho cả constructor:
```
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    private MovieCatalog movieCatalog;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}
```
Sử dụng @Autowire annotation để nhận tất cả các đối tượng thuộc một kiểu nhất định như sau:
```
public class MovieRecommender {

    @Autowired
    private MovieCatalog[] movieCatalogs;

    // ...
}
```
### 5.2 Fine-tuning Annotation-based Autowiring with Qualifiers
Khi có nhiều hơn một bean với cùng một loại và chỉ có một bean trong số đó cần được wire với một property nào đó, @Qualifier sẽ được sử dụng với @Autowired để giảm thiểu sự nhầm lẫn bằng cách định danh chính xác bean nào được wire. Ví dụ dưới đây mô tả cách sử dụng @Qualifier để autowiring với tên bean cụ thể. 
```
public class FooBean {

    @Autowired
    @Qualifier("getAnotherBarBean")
    private BarBean barBean;

    // ...
}
```
## 6 Classpath Scanning và quản lý các Component
Như đã trình bày trong chương 2, có 3 cách để định nghĩa một bean bảo gồm: **Định nghĩa bằng file XML, định nghĩa bằng Annotation và định nghĩa bằng java code**. Trong chương 5 đã giới thiệu cơ chế định nghĩa spring bean bằng Annotation và cơ chế Autowiring để khai báo các Dependancy cho một bean nhất định. Chương này sẽ mô tả cách xác định một thành phần bằng cách quét các đường dẫn class. Các thành phần là các class mà đáp ứng tiêu chuẩn lọc và những class này định nghĩa các bean cụ thể. Với cơ chế này, ta không cần nhất thiết phải sử dụng các file xml để định nghĩa các bean. Thay vào đó, ta có thể sử dụng các annotations để lựa chọn class có định nghĩa bean để đăng ký với Spring Container. 

### 6.1 @Component and Further Stereotype Annotations
Spring cung cấp các annotation khuôn mẫu: **@Component, @Service, @Controller, @Repository**. @Service, @Controller và @Repository là các trường hợp đặc biệt của @Component để phục vụ các use case cụ thể. Ta có thể chú thích component class với **@Component**, tuy nhiên, khi chú thích các class này với **@Repository, @Service, và @Controller**, các class phù hợp hơn để xử lý với các chức năng chuyên biệt khác nhau. các annotation này có thể đảm nhiệm thêm các tính năng trong các bản spring tiếp theo. Do đó, nếu ta chọn @Component và @Service cho tầng dịch vụ thì rõ ràng @Servicce là lựa chọn tốt hơn.
### 6.2 Automatically Detecting Classes and Registering Bean Definitions
Spring có thể tự động phát hiện các class khuôn mẫu và đăng ký với ApplicationContext. Ví dụ với các class sau là đủ điều kiện để spring tự động phát hiện: 
```
@Service
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Autowired
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

```
@Repository
public class JpaMovieFinder implements MovieFinder {
    // implementation elided for clarity
}
```
Để tự động phát hiện các class và đăng ký các bean tương ứng, ta cần thêm annotation @ComponentScan vào @Configuration class với thuộc tính basePackages có giá trị là package chứa các component class.
```
@Configuration
@ComponentScan(basePackages = "spring.core.learning_spring_bean.BeanDefinition")
public class BeanConfiguration {

    @Bean
    FooBean getFooBean(){
        return new FooBean();
    }

    @Bean
    BarBean getBarBean(){
        return new BarBean("I'm bar bean which was dependency of foo bean");
    }

    @Bean
    BarBean getAnotherBarBean(){
        return new BarBean("I'm another bar bean");
    }
}
```
### 6.3 Defining Bean Metadata within Components
Spring component cũng có thể đóng góp định nghĩa bean cho spring container. Ta có thể sử dụng @Bean annotation trong component class. Các ví dụ sau miêu tả cách sử dụng @Bean annotation: 
```
@Component
public class FactoryMethodComponent {

    @Bean
    @Qualifier("public")
    public TestBean publicInstance() {
        return new TestBean("publicInstance");
    }

    public void doWork() {
        // Component method implementation omitted
    }
}
```
Class trong ví dụ trên là spring component có chứa bean factory method, @Bean annotation xác định factory method và các thuộc tính định nghĩa bean như @Quanlifier annotation. Các annotation ở mức phương thức là @scope và @lazy.
### 6.4 Naming Autodetected Components