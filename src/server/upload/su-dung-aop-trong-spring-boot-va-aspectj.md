# 1. AOP là gì
AOP (Aspect Oriented Programming) là 1 kỹ thuật lập trình bổ sung cho lập trình hướng đối tượng (OOP), nó tạo ra 1 cách suy nghĩ khác của lập trình cấu trúc. Đối tượng của OOP là class, còn đối tượng của AOP là *aspect*. 

(*p/s lý thuyết dài dòng và khó hiểu, đọc ví dụ và xem ứng dụng thực tế của nó giúp bạn dễ hình dung hơn nhiều*)
# 2. Sử dụng AOP trong project 
## 2.1 Insert Log vào các method 
Chèn log khi chạy các service mà không sửa các method đó. 
Ví dụ mình có 1 method như thế này.
```
    public String callDaoSuccess(){
        return "dao1";
    }
```

Mình muốn chèn log khi method đó được gọi. Theo các logic thông thường thì sẽ vào sửa method đó. 
1. Phải sửa code trong method
2. Nếu 1 Class có nhiều method mà muốn sửa thì phải sửa tất cả các method đó.
```
    public String callDaoSuccess(){
        logger.info("callDaoSuccess is called");
        return "dao1";
    }
```
hoặc tìm tất cả những chỗ nào method được gọi, insert log vào trước => Tốn thời gian nếu method được dùng nhiều chỗ.

Để giải quyết vấn đề này AOP giúp chung ta thực hiện dễ hơn nhiều.
Làm theo các bước như sau:

Thêm thư viện AOP
```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
            <version>2.4.5</version>
        </dependency>
```

Tạo 1 file khai báo Aspect
```
@Aspect
@Configuration
public class TestServiceAspect {
    private Logger logger = LoggerFactory.getLogger(TestServiceAspect.class);

    @Before("execution(* com.ldt.demospringaop.dao.*.*(..))")
    public void before(JoinPoint joinPoint){
        logger.info(" before called " + joinPoint.toString());
    }
}
```

Có 1 khái niệm cần làm rõ ở đây:
- **@Aspect**: Chỉ ra rằng class này là 1 Aspect (hiển nhiên) 
- **@Before**: Chạy hàm này trước khi chạy hàm cần chèn
- ("execution(* com.ldt.demospringaop.dao.*.*(..))"): 
  Cái này giống như 1 regex để lực chọn method nó sẽ áp dụng. 
 Dấu  * thứ nhất chỉ rằng bất kỳ class nào trong package **com.ldt.demospringaop.dao** 
 Dấu * thứ hai chi ra bất cứ method nào. Chúng ta có thể chỉ chính xác method 
```
@Before("execution(* com.ldt.demospringaop.dao.TestDAO.callDaoSuccess(..))")
    public void before(JoinPoint joinPoint){
        logger.info(" before called " + joinPoint.toString());
    }
```

Khi chạy ta sẽ thấy 2 log được sinh ra
1-> Log sinh ra tư Aspect, nó gọi trước khi gọi method
2-> Log sinh ra trong service
```
2021-05-11 17:42:41.460  INFO 36803 --- [           main] c.l.d.aspect.TestServiceAspect           :  before called execution(String com.ldt.demospringaop.dao.TestDAO.callDaoSuccess())
2021-05-11 17:42:41.474  INFO 36803 --- [           main] com.ldt.demospringaop.dao.TestDAO        : callDaoSuccess is called
```

Để hiểu rõ hơn về bản chất, chúng ta đi vào các thuật ngữ:
## 2.2. Các thuật ngữ
### Pointcut: 
Điểm cắt, nó dùng để khai báo rằng Aspect đó sẽ được gọi khi nào. Ở ví dụ trên
("execution(* com.ldt.demospringaop.dao.*.*(..))") nó xảy ra ở tất cả các method trong class trong package com.ldt.demospringaop.dao.

### Advice
Chúng ta sẽ làm gì khi xảy ra điểm cắt đó. Advice là logic chúng ta muốn thực hiện. chính là đoạn code bên trong 
```
public void before(JoinPoint joinPoint){
        logger.info(" before called " + joinPoint.toString());
    }
```

### Aspect 
Đây là kết hợp giữa Pointcut và Advice, cái này không có nhiều điểm đặc biệt

### Join Point 
Khi code chạy và điều kiện pointcut đạt được. advice được chạy. Join Point là 1 instance của advice (cái này mình chưa dùng nhiều).

### @Before, @After, @AfterReturning, @AfterThrowing 
Đây là định nghĩa khi nào code của advice được chạy 
- @Before : chạy trược method
- @After: Chạy trong 2 trường hợp method chạy thành công hay có exception
- @AfterReturning: Chạy khi method chạy thành công 
- @AfterThrowing: Chạy khi method có exception 

### @Around 
Around  cũng được sử dụng để chèn đầu và cuối của method, Cách dùng nó hơi khác chút. 
```
    @Around("execution(* com.ldt.demospringaop.dao.*.*(..))")
    public void around(ProceedingJoinPoint joinPoint) throws Throwable {

        Long startTime = System.currentTimeMillis();
        logger.info("Start Time Taken by {} is {}", joinPoint, startTime);
        joinPoint.proceed();

        Long timeTaken = System.currentTimeMillis() - startTime;
        logger.info("Time Taken by {} is {}", joinPoint, timeTaken);
    }
```

Method khi được gọi nó sẽ gọi vào around này trước, sau đó gọi đến 
```
joinPoint.proceed();
```

Để thực hiện hàm, rồi tiếp tục gọi đến đoạn code tiếp theo.

Có 1 cách khác sử dụng Around là tạo ra **Annotation**

### @Around with Annotation
Tạo 1 annotation TrackTime
```
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TrackTime {
    
}
```

Sửa @Around không phải **execution** nữa mà là **annotation** trỏ trực tiếp annotation của chúng ta.
```
@Around("@annotation(com.ldt.demospringaop.aspect.TrackTime)")
```

Method nào muốn track thì thêm annotation này vào **@TrackTime**
```
    @TrackTime
    public String callMethodTrackTime(){
        logger.info("callDaoSuccess is called");
        return "dao1";
    }
```


### **Xem chi tiết source code**  ở [đây](https://github.com/ledangtuanbk/spring-aop-example)


# 3. Kết luận:
Trong bài này giúp chúng ta có cái nhìn tồng quan về Spring AOP. Hiểu được các khái niệm của nó, 
Làm 1 ví dụ cụ thể thấy được lợi ích mà nó đem lại.