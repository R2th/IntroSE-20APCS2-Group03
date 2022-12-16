## 1. Bean và ApplicationContext là gì?

### 1.1. Bean là gì?

Trong documentation của Spring framework, thì **bean** được định nghĩa như sau:

> In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container.

Nói một cách đơn giản, bean là những module chính của chương trình, được tạo ra và quản lý bởi Spring IoC container.

Các bean có thể phụ thuộc lẫn nhau, như ví dụ về `Car`, `Engine` và `ChinaEngine` từ đầu series tới giờ. Sự phụ thuộc này được mô tả cho IoC biết nhờ cơ chế Dependency injection.

Cách đánh dấu class là một bean thì mình sẽ trình bày trong bài tiếp theo. Lúc này các bạn chỉ cần biết đơn giản nhất là dùng `@Component` lên class là class đó là một bean.

### 1.2. ApplicationContext là gì?

**ApplicationContext** là khái niệm Spring Boot dùng để chỉ Spring IoC container, tương tự như bean là đại diện cho các dependency.

Ngoài ra bạn có thể sẽ nghe nói về BeanFactory. Nó cũng đại loại như ApplicationContext, đại diện cho Spring IoC container nhưng ở mức cơ bản. ApplicationContext thì ở mức cao hơn, cung cấp nhiều tính năng hơn BeanFactory như i18n, resolving messages, publishing events,...

![](https://images.viblo.asia/c3c028bb-94b2-4371-b4e4-b8d6dce63aea.jpg)

Khi ứng dụng Spring chạy, Spring IoC container sẽ quét toàn bộ packages, tìm ra các bean và đưa vào ApplicationContext. Cơ chế đó là Component scan, cũng sẽ được nói tới trong bài tiếp theo.

### 1.3. Cách lấy bean ra từ Context

Tất nhiên trước khi lấy bean ra từ context thì phải có context rồi :( Câu hỏi đặt ra là biến context ở đâu?

Đó là ngay dòng bắt đầu chương trình Spring Boot. Câu lệnh sau.

```Application.java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

Dòng method `SpringApplication.run()` sẽ return về một object `ApplicationContext` interface, đại diện cho IoC container.

```java
ApplicationContext context = SpringApplication.run(Application.class, args);
```

Chúng ta có thể lấy ra bean từ đây, dùng method `getBean()`.

```java
// Lấy ra bean có class cụ thể
Car car = context.getBean(Car.class);

// Lấy ra theo tên và class
// Tuy là Engine.class nhưng Engine lại là interface
Engine engine = context.getBean("ChinaEngine", Engine.class);
```

## 2. Kĩ thuật inject bean vào bean khác

Ví dụ bạn có hai bean là `Car` và `Engine` (như ví dụ từ đầu series tới giờ). Và `Car` thì phụ thuộc vào `Engine`, do đó theo Dependency injection thì chúng ta cần inject `Engine` vào trong `Car`.

### 2.1. Sử dụng `@Autowired`

Chúng ta sử dụng annotation `@Autowired` để báo cho Spring biết tự động tìm và inject bean phù hợp vào vị trí đặt annotation. Ví dụ.

```Engine.java
// Annotation chỉ đánh dấu lên class
public interface Engine {
    void run();
}
```

```ChinaEngine.java
@Component
public class ChinaEngine implements Engine {
    @Override
    public void run() {}
}
```

```Car.java
@Component
public class Car {
    // Báo cho Spring tìm bean nào phù hợp với Engine interface
    // Và có một bean phù hợp là ChinaEngine
    // Nó tương đương với = new ChinaEngine()
    @Autowired
    private final Engine engine;
}
```

Cách dùng `@Autowired` trên field là không được khuyến khích, do nó sử dụng Java reflection để inject. Chúng ta nên cân nhắc đổi qua dùng inject theo kiểu constructor hoặc setter.

### 2.2. Inject qua constructor hoặc setter

Code inject theo kiểu constructor-based nên dùng khi các module là bắt buộc. Khi đó Spring Boot khi tạo bean (cũng chỉ là tạo object, gọi constructor thôi) thì sẽ đưa các phụ thuộc vào constructor khi gọi.

Ví dụ class `Car` đã được sửa lại để inject `Engine` vào qua constructor.

```Car.java
@Component
public class Car {
    private final Engine engine;
    
    // Các bản Spring Boot mới thì không cần @Autowired trên constructor
    public Car(Engine engine) {
        this.engine = engine;
    }
}
```

Hoặc dùng kiểu setter-based như sau. Spring Boot sau khi tạo xong bean `Car` sẽ gọi thêm method `setEngine()` sau đó.

```Car.java
@Component
public class Car {
    private final Engine engine;
    
    // Thêm @Required để setter luôn được gọi để inject
    @Required
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}
```

Cách dùng setter để inject thường dùng trong trường hợp phụ thuộc vòng, module A phụ thuộc vào B và ngược lại. Do đó, nếu cả hai đều sử dụng constructor based injection thì Spring Boot sẽ không biết nên tạo bean nào trước. Vì thế, giải pháp là một bean sẽ dùng constructor, một bean dùng setter như trên.

## 3. Khi Spring Boot không biết chọn bean nào?

### 3.1. Khi tìm thấy nhiều bean phù hợp

Cũng lấy ví dụ trên, nếu chúng ta tạo thêm class `VNEngine` có chức năng tương tự `ChinaEngine`.

```VNEngine.java
@Component
public class VNEngine implements Engine {
    @Override
    public void run() {}
}
```

Thì Spring Boot sẽ báo lỗi như sau (báo khi chạy và cả trong IDE nữa.

![](https://images.viblo.asia/bd9c87e5-89e4-445f-8c5d-57f44799c3ce.png)

Có thể hiểu do Spring Boot đã tìm thấy hai bean phù hợp để inject vào `Car`. Do cả hai `VNEngine` và `ChinaEngine` đều implements `Engine`, mà `Car` cần `Engine` nên không biết nên chọn cái nào.

### 3.2. Giải pháp

Có hai cách giải quyết vấn đề này. Thứ nhất là dùng `@Primary` đánh dấu lên một bean. Khi đó bean này sẽ được ưu tiên chọn hơn, trong trường hợp có nhiều bean phù hợp trong context.

```VNEngine.java
@Component
@Primary
public class VNEngine implements Engine {
    ...
}
```

Cách 2 là chỉ định rõ tên bean (tên class) cụ thể được inject bằng `@Qualifier`.

```Car.java
@Component
public class Car {
    @Autowired
    @Qualifier("VNEngine")  // Phải khớp hoa thường luôn nhe
    private final Engine engine;
}
```

Đối với constructor hay setter based cũng tương tự, chỉ cần có `@Qualifier` trước tên field cần inject vào là được.

---

Okay thế là bài viết hôm nay đã xong. Hai bài viết về bean và context của mình hi vọng sẽ mang đến cho các bạn đủ các kiến thức cơ bản để đi tiếp những phần sau của series. Cảm ơn và nhớ upvote hoặc clip để ủng hộ mình nhé. Thân!