# I. Spring Bean là gì?
## 1. Định nghĩa:
Bean là một phần quan trọng ở trong Spring Boot. Để tìm hiểu rõ hơn về Spring thì việc tìm hiểu Bean cũng rất quan trọng. 
Dựa theo định nghĩa trong document của Spring Framework documentation:

    In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container.


## 2. Inversion of Control (IoC)
Có thể hiểu một cách đơn giản IoC là việc một object khởi tạo các phụ thuộc(dependencies) mà không cần phải khởi tạo chúng. Các object này uỷ thác (delegates) các việc xây dựng và khởi tạo các dependencies vào các Ioc Container.

> IoC Container: là nơi các object được khởi tạo, config và nhúng nó vào các dependencies và quản lý vòng đời của nó. Nó sử dụng Dependency Injection(DI) để quản lý các components cấu thành nên ứng dụng. Và lấy các thông tin dữ liệu từ các file config(XML) hoặc các annotations.

Ví dụ một lớp Person có 1 thuộc tính là Animal:
    public class Person {
        private Animal animal;
    
        public Person(Animal animal) {
            this.animal = animal;
        }
    
        // getter, setter
    }

Giả định rằng Animal có 2 thuộc tính là **name** và **age**. Khi khởi tạo 1 Person thì làm như sau:

    Animal animal = new Animal("fuffy", 5);
    Person person = new Person(animal);

Các khởi tạo nhưng trên không sai. Nhưng hãy tưởng tượng nếu như class Animal thay đổi (thay đổi thuộc tính, thêm thuộc tính mới,...) khi đó thì class Person cũng sẽ thay đổi theo. Như thế với việc quản lý khi có rất nhiều câu lệnh khởi tạo như thế thì sẽ rất là mất thời gian và khó quản lý.

Chính vì thế tính năng của Inverion of Controll sẽ được ứng dụng ở thời điểm này.

    @Configuration
    public class Config {
        @Bean
        public Animal getAnimal() {
            return new Animal("Fuffy", 5);
        }
    }
    
-------------------

    @Component
    public class Person {
        
        @Autowired
        private Animal animal;
        
        // ...
    }


Bây giờ thì class Person được tiêm (inject) một khởi tạo của class Animal.

**Ở đây có 2 Bean được khai báo chính là Animal và Person.**

# II. Các Bean annotations được sử dụng nhiều trong Spring

1. **@Component**: annotation cấp class, mặc định biểu thị 1 giá trị bean với tên trùng với tên class bắt đầu bằng chữ cái in thường. Nó có thể chỉ định tên khác bằng cách truyền tham số(param) vào annotations.
2. **@Repository**: annotation cấp class, đại diện cho lớp Data Access Object (DAO).
3. **@Service**: annotation cấp class, là nơi xử lý nghiệp vụ của hệ thống và có thể được sử dụng lại ở nhiều nơi.
4. **@Controller**: annotation cấp class, là nới đại diện cho lớp Controller trong mô hình MVC.
5. **Configuration**: annotation cấp class, là nơi có thể chứa các khai báo là bean thông qua Annotation @Bean

# III. Bean Scope
- **Singleton**: container chỉ khởi tạo 1 instance của bean và trả về chính nó nếu như có yêu cầu.
- **Prototype**: mỗi khi có yêu cầu thì container sẽ tạo ra một instance mới và trả về.
- **Request**: khởi tạo instance cho một HTTP Request
- **Session**: khởi tạo instance cho một HTTP Session
- **Application**: khởi tạo instance cho một vòng đời của ServletContext
- **WebSocket**: khởi tạo instance cho một Websocket Session

# IV. Vòng đời của Bean
Vòng đời của bean bao gồm các bước sau:

- Bean Definition : khởi tạo bean thông qua sử dụng Annotation hoặc XML
- Bean Instantiation : Spring khởi tạo các đối tượng Bean giống như khởi tạo đối tượng Java thông thường và đưa nó vào ApplicationContext 
- Populating Bean properties : Spring thực hiện scan các bean thực thi các Aware interfaces và thực hiện set các giá vào các property như id, scope và giá trị mặc định như khai báo của bean đấy
- Pre-Initialization : Các phương thức postProcessBeforeInitialization() bắt đầu thực thi và @PostConstruct thực thi sau ngay nó
- AfterPropertiesSet : Spring thực thi các phương thức afterPropertiesSet()  của beans mà có implement InitializingBean
- Custom Initialization : Spring kích hoạt các method khởi tạo với các thuộc tính được define ở trong initMethod trong @Bean annotations
- Post-initialization : BeanPostProcessors của Spring hoạt động lần thứ 2. Lần này nó kích hoạt các phương thức postProcessAfterInitialization()
- Ready : các Bean đã được khởi tạo và inject vào trong các dependencies
- Pre-Destroy : Spring kích hoạt @PreDestroy annotated methods ở bước này
- Destroy : Spring thực thi the destroy() methods
- Custom Destruction : chúc ta có thể tuỳ chỉnh các thời điểm huỷ bằng thuộc tính destroyMethod ở trong @Bean annotation và Spring sẽ chạy nó trong giai đoạn cuối.