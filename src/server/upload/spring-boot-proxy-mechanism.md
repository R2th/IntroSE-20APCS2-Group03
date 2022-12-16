## Sring AOP (Aspect Oriented Programming) 

![image.png](https://images.viblo.asia/1cde55c8-70cb-4808-a9fb-0b9b46566a63.png)

![image.png](https://images.viblo.asia/4a907a5c-1348-43df-94af-c5147624d44d.png)

AOP về cơ bản dùng để trả lời câu hỏi sau:
> Liệu có thể thay đổi flow của một chương trình mà hạn chế gần như thấp nhất việc thay đổi cấu trúc của chương trình?

Có thể nói AOP là một mô hình được phát triển nhằm tăng hiệu quả và bổ sung khả năng tái sử dụng lại mã nguồn cho hạn chế mà OOP đang gặp phải.

> Khi dùng OOP bạn sẽ chia phần mềm thành những phần nhỏ nhất, có tính năng riêng biệt tạm gọi là blackbox , sau đó lắp ghép lại để thành một thể thống nhất, việc này giúp bạn dễ bảo trì và quản lí , tuy nhiên một vấn đề khác nảy sinh đó là khi bạn gặp phải sự thay đổi hoặc muốn tận dụng lại dự án cũ để thay đổi thành sản phẩm mới thì lại gặp khó khăn, vì dù chia ra nhỏ nhất, tuy nhiên các blackbox lại được gắn chặt với nhau ( nối cứng ) nên khi muốn thay đổi bạn phải tìm cách tháo ra , điều này làm bạn phải thay đổi cấu trúc mã nguồn tăng nguy cơ gặp lỗi và độ khó của dự án cao thì việc này càng phức tạp. Điều này có thể thấy rõ thông qua việc implements interface. Nếu cần chỉnh sửa interface trong lúc có hàng ngàn class implements đó thì quả thực là một rắc rối lớn. AOP giúp bạn không cần phải thay đổi blackbox mà vẫn có thể thêm tính năng vào cho nó.

Việc sử dụng AOP khiến Spring Boot trở thành một framework đơn giản, dễ dùng vì che giấu được những logic phức tạp ở bên dưới, ví dụ như xử lý database transaction với `@Transactional` hay lazy-loading, logging. Trong các nghiệp vụ thông thường chúng ta ít khi cần dùng đến Spring AOP, tuy nhiên kỹ thuật này được dùng trong các framework rất nhiều, vì vậy đôi lúc việc nắm được cơ chế hoạt động bên dưới lại trở nên cần thiết.
## Dynamic Agent vs Static Agent

![image.png](https://images.viblo.asia/8c279cf9-3a05-46a5-b37d-adda677bfc0a.png)

Spring AOP sử dụng kỹ thuật proxying (tương tự Proxy design pattern). Kỹ thuật này tạo ra một middeman (agent) wrap around blackbox để xử lý additional logic. 

Có hai loại agent là **static agent (compile time)** và **dynamic agent (runtime)**. 

Có hai cách để thêm additional logic vào method đó chính là thông qua:
- Proxy creation
- Bytecode manipulation (cglib, asm, javassist, bcel). 

Với static agent chúng ta tạo ra proxy class tại **compile time**. Hãy xem code ví dụ sau đây để hiểu rõ hơn.

Thứ tự các bước cần làm:
1. Tạo interface và implemetation class.

    **Action.java**
    ```
    public interface Action {
        void doSomething();
    }
    ```

    **RealObject.java**
    ```
    public class RealObject implements Action {

        @Override
        public void doSomething() {
            System.out.println("do something");
        }
    }
    ```
2. Tạo proxy class cũng implement interface.

    **StaticAgentHandler.java**
    ```
    public class StaticAgentHandler implements Action {

        private final Action realObject;

        public StaticAgentHandler(Action realObject) {
            this.realObject = realObject;
        }

        @Override
        public void doSomething() {
            System.out.print("proxy do: ");
            realObject.doSomething();
        }
    }
    ```
    
3. Inject target object vào proxy class và gọi override method từ proxy class trong target class.
    ```
     public static void main(String[] args) {
        StaticAgentHandler staticAgent = new StaticAgentHandler(new RealObject());
        staticAgent.doSomething();
    }
    ```

Chúng ta có thể add thêm log cho method `doSomeThing()` của đối tượng `RealObject` bằng static agent như trên, tuy nhiên cách làm này có một hạn chế là mỗi agent chỉ có thể đi kèm một interface. Khi số lượng interface nhiều lên thì số agent cũng phải tăng lên tương ứng. Điều này khá bất tiện trong trường hợp chúng ta muốn xử lý một logic như nhau cho nhiều interface khác nhau. Đó là lý do mà dynamic agent (JDK dynamic proxy) được ra đời từ **JDK 1.3** để giải quyết vấn đề trên.

Có hai cách để implement dynamic agent trong Spring AOP đó chính là:
- Dynamic agent based on JDK (built-in)
- Dynamic agent based on CGLib (**C**ode **G**eneration **Lib**rary - external library)

## JDK dynamic proxy vs CGLib proxy
![image.png](https://images.viblo.asia/7b574a2e-de06-44e1-beea-4aace0231e02.png)

### JDK dynamic proxy được tạo ra khi và chỉ khi thông qua interface

![image.png](https://images.viblo.asia/5838187f-1856-4784-b4bd-e452d7fd97c7.png)

**DynamicAgentHandler.java**
```
public class DynamicAgentHandler implements InvocationHandler {

    private final Object realObject;

    public DynamicAgentHandler(Object realObject) {
        this.realObject = realObject;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //Agent extension logic
        System.out.print("proxy do: ");

        return method.invoke(realObject, args);
    }
    
    //JDK dynamic proxy require interface Action.class.
    public static void main(String[] args) {
        System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
        RealObject realObject = new RealObject();
        Action dynamicAgent = (Action) java.lang.reflect.Proxy.newProxyInstance(
                ClassLoader.getSystemClassLoader(),
                new Class[]{Action.class},
                new DynamicAgentHandler(realObject)
        );
        dynamicAgent.doSomething();
    }
}
```

JDK dynamic proxy sử dụng kỹ thuật proxy creation tạo ra proxy class `com.sun.proxy.$Proxy0` tại **runtime** thông qua [Java Reflection - java.lang.reflect.Proxy](https://dzone.com/articles/java-dynamic-proxy).

![image.png](https://images.viblo.asia/8091f1db-4fae-4958-a2be-c00d18d975d5.png)

Kỹ thuật này có một hạn chế là chỉ support interface, cho nên với trường hợp concrete class thì không có cách nào tạo proxy được.

```
public static Object newProxyInstance(ClassLoader loader,
                                          Class<? >[] interfaces,
                                          InvocationHandler h) throws IllegalArgumentException
{
    ......
}
```

Để xử lý trường hợp này, chúng ta cần sử dụng thêm kỹ thuật **byte code manipulation** để tạo in-memory proxy class và load vào chương trình đang chạy thông qua một số thư viện khác như CGlib hay ASM.

### CGLib proxy được tạo ra thông qua subclassing
![image.png](https://images.viblo.asia/250ba107-0f95-49d9-863e-1b0032e6e78c.png)

**CglibDynamicAgentHandler.java**
```
public class CglibDynamicAgentHandler implements MethodInterceptor {

    public Object getInstance(Object target) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(target.getClass());
        enhancer.setCallback(this);
        return enhancer.create();
    }

    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.print("proxy do: ");
        return proxy.invokeSuper(obj, args);
    }
    
    //CGLIB proxy isn't require interface.
    public static void main(String[] args) {
        CglibDynamicAgentHandler cglibDynamicAgent = new CglibDynamicAgentHandler();
        RealObject instance = (RealObject) cglibDynamicAgent.getInstance(realObject);
        instance.doSomething();
    }
}
```

## Code example
Chúng ta sẽ đến với một ví dụ thực tế trong Spring Boot để hiểu rõ hơn cơ chế hoạt động của Spring AOP bằng cách viết một REST API và quan sát xem cách bean được tạo ra thông qua proxy như thế nào. Cấu trúc dự án và code demo như sau:

![image.png](https://images.viblo.asia/ac3d1637-f54c-4f74-890d-440800944b70.png)

**build.gradle**
```
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.7.2'
    id 'io.spring.dependency-management' version '1.0.12.RELEASE'
}

group = 'com.logbasex.ioc-di'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-aop'
    implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
}

test {
    useJUnitPlatform()
}
```

**application.yml**
```
server:
  port: 8282

spring:
  data:
    mongodb:
      database: config
      uri: mongodb://localhost/local
```

**UserApplication.java**
```
@SpringBootApplication
public class UserApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}
}
```

**UserController.java**
```
@RestController
public class UserController {
	
	@Autowired
	private UserServiceImpl userImplSv;
	
	@Autowired
	private UserService userSv;
    
    @Autowired
	private UserRepository userRepo;
	
	@GetMapping("/hello")
	public void hello() {
		//iUserService DEFAULT is wrap around using CGLIB proxy, debug for detail information.
		//if you want to use JDK proxy, please set: proxy-target-class = false
		iUserService.hello();
        userRepo.findAll();
		userServiceImpl.hello();
	}
}
```

**User.java**
```
public class User {
	private String id;
	private String name;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
}
```

**UserService.java**
```
public interface UserService {
	String sayHello();
}
```

**UserServiceImpl.java**
```
@Service
public class UserServiceImpl implements UserService {
	
	@Override
	public String sayHello() {
		return "Hello";
	}
}
```

**LogAspect.java**
```
//if we don't create this class, spring do not generate proxy.
@Aspect
@Component
@EnableAspectJAutoProxy
public class LogAspect {
	private static final Logger log = LoggerFactory.getLogger(LogAspect.class);

	@Before("execution(* com.logbasex.aop.service.UserServiceImpl.*(..))")
	public void before(JoinPoint jp) {
		log.info("jp.getSignature().getName() = {}", jp.getSignature().getName());
	}
}
```

## Demo
### Spring default proxy configuration

![image.png](https://images.viblo.asia/7978b1f7-b2b0-40fe-accf-f7d616b99803.png)

AOP auto configuration sẽ được thực thi tạo khi thuộc tính `spring.aop.auto` có giá trị bằng `true` 

![image.png](https://images.viblo.asia/1b52c490-5517-407e-8821-4eff7932c0df.png)

Chúng ta có thể thấy Spring AOP default (hay khi thuộc tính `spring.aop.proxy-target-class` có giá trị bằng `true` ) thì sẽ sử dụng CGLIB proxy, còn khi thuộc tính `spring.aop.proxy-target-class` có giá trị bằng `false` thì JDK dynamic proxy sẽ được sử dụng.

`@Configuration(proxyBeanMethods = false)` có nghĩa rằng by default thì khi gọi bean method sẽ không gọi qua proxy. Do đó nếu chúng ta comment class **LogAspect.java** (which is enable proxyBeanMethod) lại thì sẽ cho ra kết quả như sau:

![image.png](https://images.viblo.asia/f99c5091-638b-4369-a097-54a4a9037b6c.png)

Còn nếu chúng ta set thuộc tính `proxyBeanMethods = true` thông qua việc enable AOP config sử dụng **LogAspect.java** hoặc thêm `@Configuration` cho class `UserServiceImpl.java` thì mỗi lần gọi vào bean method sẽ đi qua CGLIB proxy:

![image.png](https://images.viblo.asia/e06680d1-6d8f-41ee-a876-58d9a43b881c.png)

![image.png](https://images.viblo.asia/c8c0bdb2-d055-483d-87c7-dd56609b4bc1.png)

Với đoạn code trên nếu bạn set thuộc tính `spring.aop.proxy-target-class = false` thì khi build lại sẽ bị lỗi, bởi vì [JDK dynamic proxy chỉ proxy được interface](https://stackoverflow.com/questions/28925311/spring-how-to-inject-concrete-interface-implementation).

![image.png](https://images.viblo.asia/5cc15199-c769-4a8a-ae3a-dffb805468c5.png)

![image.png](https://images.viblo.asia/283344a7-2462-4948-9381-80e2339b1069.png)

Một trường hợp khác đó chính là CGLIB proxy sử dụng cơ chế subclassing, nên nếu **UserServiceImpl.java** được đánh dấu là **final** thì build cũng sẽ bị lỗi.


## Additional infomation

Có một vài vấn đề với JDK dynamic proxy:

![image.png](https://images.viblo.asia/48630e0d-6e77-4fd7-aef5-695f7112d617.png)

Vì thế nên từ version Spring Boot 2.0, CGLIB proxying là phương thức mặc định được sử dụng. Có một vài vấn đề về performance như phải gọi constructor 2 lần cho target object và proxy object nhưng đã được giải quyết triệt để trong các [phiên bản sau đó](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop-proxying).


## References
- https://prasadct.medium.com/understanding-spring-aop-bdfe4cd84377
- https://daynhauhoc.com/t/lap-trinh-oop-va-aop/12198
- https://stackoverflow.com/questions/51795511/when-is-cglib-proxy-used-by-spring-aop
- https://stackoverflow.com/questions/45609868/cglib-proxy-with-interface
- https://topic.alibabacloud.com/a/spring-static-agents-and-dynamic-agents_8_8_30312760.html
- https://blog.csdn.net/weixin_38933749/article/details/109018919
- https://gmoon92.github.io/spring/aop/2019/04/20/jdk-dynamic-proxy-and-cglib.html
- https://programming.vip/docs/is-aop-in-spring-boot-jdk-dynamic-proxy-or-cglib-dynamic-proxy.html
- https://docs.spring.io/spring-framework/docs/3.0.0.M3/reference/html/ch08s06.html
- https://www.javai.net/post/202207/java-proxy/
- https://www.linkedin.com/pulse/why-interfaces-recommend-spring-sachin-gorade/