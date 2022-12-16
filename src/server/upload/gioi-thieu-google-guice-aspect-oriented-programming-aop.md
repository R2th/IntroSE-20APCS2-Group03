Trong các bài trước, tôi đã giới thiệu với các bạn [Aspect Oriented Programming (AOP)](https://gpcoder.com/5112-gioi-thieu-aspect-oriented-programming-aop/) và cách tự xây dựng một AOP Framework với JDK Proxy. Trong bài này, chúng ta sẽ cùng tìm hiểu cách sử dụng AOP với thư viện Google Guice.

Một số bài viết liên quan đến **Dependency injection (DI)** và **Aspect Oriented Programming (AOP)**, các bạn nên tìm hiểu trước khi xem phần tiếp theo của bài viết này:

* [Hướng dẫn Java Design Pattern - Dependency Injection](https://gpcoder.com/4975-huong-dan-java-design-pattern-dependency-injection/)
* [Giới thiệu Google Guice – Dependency injection (DI) framework](https://gpcoder.com/5015-gioi-thieu-google-guice-dependency-injection-di-framework/)
* [Giới thiệu Google Guice – Binding](https://gpcoder.com/5029-gioi-thieu-google-guice-binding/)
* [Giới thiệu Google Guice – Injection, Scope](https://gpcoder.com/5041-gioi-thieu-google-guice-injection-scope/)
* [Giới thiệu Aspect Oriented Programming (AOP)](https://gpcoder.com/5112-gioi-thieu-aspect-oriented-programming-aop/)

## Giới thiệu Google Guice AOP

Ngoài việc hỗ trợ mạnh mẽ về Dependency Injection (DI), nhiều loại Binding, Injection và Scope. Google còn hỗ trợ về AOP.

Guice AOP tuân thủ các đặc tả về cài đặt của  AOP Alliance cho lập trình hướng khía cạnh (AOP). Điều này cho phép sử dụng cùng một Interceptor trên nhiều Framework khác nhau.

Hai class quan trọng của Guice AOP:

* Matcher : là một interface dùng để chấp nhận hoặc từ chối một giá trị. Trong Guice AOP, chúng ta cần hai matcher: một để xác định lớp nào tham gia và một để xác định các phương thức của các lớp đó.
* MethodInterceptor : phương thức này được thực thi khi một phương thức thõa mãn matcher được gọi. Chúng ta có thể lấy được thông tin về phương thức gọi, các đối số và instance nhận được. Chúng ta có thể thực hiện logic cross-cutting concern và sau đó ủy quyền lại cho phương thức cơ bản (core concern). Cuối cùng, chúng ta có thể kiểm tra giá trị trả về hoặc throw ngoại lệ và return kết quả.

## Ví dụ sử dụng AOP với thư viện Google Guice
Để sử dụng AOP với Guice, đơn giản chỉ thực hiện theo một vài bước sau:

* Tạo một class implements lại phương thức invoke() của interface MethodInterceptor : dùng để cài đặt logic cross-cutting concern – các xử lý trước và sau khi logic xử lý chính được gọi (core concerns).
* Tạo một annotation : dùng để đánh dấu phương thức nào sẽ được áp dụng logic được cài đặt với MethodInterceptor. Nếu không thích sử dụng Annotation, bạn thể có thể sử config Matcher trên package, sub-package, …
* Cấu hình Binding cho Matcher trong file Module của Guice.
* Đánh dấu Annotation đã tạo ở trên cho các phương thức cần áp dụng logic cross-cutting concern.

Ở ví dụ của bài viết [Giới thiệu Aspect Oriented Programming (AOP)](https://gpcoder.com/5112-gioi-thieu-aspect-oriented-programming-aop/), chúng ta cần thêm một vài xử lý trước và sau khi các phương thức trong class AccountService được gọi như sơ đồ sau:

![](https://images.viblo.asia/137bd9ea-b15b-47f6-ae2e-f33420b8d7fe.png)

Bây giờ, chương trình của chúng ta được viết lại bằng cách sử dụng Google Guice AOP như sau:

```java:Account.java
package com.gpcoder.patterns.creational.googleguice.aop.account;
 
import lombok.AllArgsConstructor;
import lombok.Data;
 
@Data
@AllArgsConstructor
public class Account {
 
    private String owner;
    private String currency;
    private int balance;
}
```

```java:AccountService.java
package com.gpcoder.patterns.creational.googleguice.aop.account;
 
public interface AccountService {
 
    void addAccount(Account account);
 
    void removeAccount(Account account);
     
    int getSize();
}
```

```java:AccountServiceImpl.java
package com.gpcoder.patterns.creational.googleguice.aop.account;
 
import java.util.ArrayList;
import java.util.List;
 
import com.gpcoder.patterns.creational.googleguice.aop.handler.Loggable;
 
public class AccountServiceImpl implements AccountService {
 
    private List<Account> accounts = new ArrayList<>();
 
    @Loggable
    @Override
    public void addAccount(Account account) {
        System.out.println("addAccount: " + account);
        accounts.add(account);
    }
 
    @Loggable
    @Override
    public void removeAccount(Account account) {
        System.out.println("removeAccount: " + account);
        accounts.remove(account);
    }
 
    @Loggable
    @Override
    public int getSize() {
        System.out.println("getSize: " + accounts.size());
        return accounts.size();
    }
}
```

```java:LoggingInterceptor.java
package com.gpcoder.patterns.creational.googleguice.aop.handler;
 
import java.util.logging.Logger;
 
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
 
import com.google.inject.Inject;
 
/**
 * Implement the AOP Alliance's MethodInterceptor
 */
public class LoggingInterceptor implements MethodInterceptor {
 
    @Inject
    private Logger logger;
 
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        logger.info("LoggingInterceptor");
         
        // Handle before
        System.out.println("Handling before actual method execution");
         
        // Inspect the call: the method, its arguments
        System.out.println("Gets the method being called: " + invocation.getMethod().getName());
        Object[] objectArray = invocation.getArguments();
        for (Object object : objectArray) {
            System.out.println("Get the arguments: " + object);
        }
         
        // Proceeds to the next interceptor in the chain. 
        Object result = invocation.proceed();
         
        // Handle after
        System.out.println("Handling after actual method execution");
        System.out.println("---");
         
        return result;
    }
}
```

```java:BasicModule.java
package com.gpcoder.patterns.creational.googleguice.aop.handler;
 
import com.google.inject.AbstractModule;
import com.gpcoder.patterns.creational.googleguice.aop.account.AccountService;
import com.gpcoder.patterns.creational.googleguice.aop.account.AccountServiceImpl;
 
public class BasicModule extends AbstractModule {
 
    @Override
    protected void configure() {
        bind(AccountService.class).to(AccountServiceImpl.class);
    }
}
```

```java:AOPModule.java
package com.gpcoder.patterns.creational.googleguice.aop.handler;
 
import com.google.inject.AbstractModule;
import com.google.inject.matcher.Matchers;
 
public class AOPModule extends AbstractModule {
 
    @Override
    protected void configure() {
        // Inject interceptor
        LoggingInterceptor loggingInterceptor = new LoggingInterceptor();
        requestInjection(loggingInterceptor);
 
        // Define a binding for a Matcher
        bindInterceptor(Matchers.any(), Matchers.annotatedWith(Loggable.class), loggingInterceptor);
    }
}
```

```java:Loggable.java
package com.gpcoder.patterns.creational.googleguice.aop.handler;
 
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
 
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Loggable {
     
}
```

```java:AspectOrientedProgrammingInJdkExample.java
package com.gpcoder.patterns.creational.googleguice.aop;
 
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.gpcoder.patterns.creational.googleguice.aop.account.Account;
import com.gpcoder.patterns.creational.googleguice.aop.account.AccountService;
import com.gpcoder.patterns.creational.googleguice.aop.account.AccountServiceImpl;
import com.gpcoder.patterns.creational.googleguice.aop.handler.AOPModule;
import com.gpcoder.patterns.creational.googleguice.aop.handler.BasicModule;
 
/**
 * This class to verify an AOP example using Google Guice.
 */
public class AspectOrientedProgrammingWithGuice {
 
    public static void main(String[] args) {
 
        Injector injector = Guice.createInjector(new BasicModule(), new AOPModule());
        AccountService proxy = injector.getInstance(AccountServiceImpl.class);
 
        Account account = new Account("gpcoder", "USD", 100);
        proxy.addAccount(account);
        proxy.getSize();
        proxy.removeAccount(account);
        proxy.getSize();
    }
}
```

Output của chương trình:

```
Feb 12, 2019 9:25:04 PM com.gpcoder.patterns.creational.googleguice.aop.handler.LoggingInterceptor invoke
INFO: LoggingInterceptor
Handling before actual method execution
Gets the method being called: addAccount
Get the arguments: Account(owner=gpcoder, currency=USD, balance=100)
addAccount: Account(owner=gpcoder, currency=USD, balance=100)
Handling after actual method execution
---
Feb 12, 2019 9:25:04 PM com.gpcoder.patterns.creational.googleguice.aop.handler.LoggingInterceptor invoke
INFO: LoggingInterceptor
Handling before actual method execution
Gets the method being called: getSize
getSize: 1
Handling after actual method execution
---
Handling before actual method executionFeb 12, 2019 9:25:04 PM com.gpcoder.patterns.creational.googleguice.aop.handler.LoggingInterceptor invoke
INFO: LoggingInterceptor
 
Gets the method being called: removeAccount
Get the arguments: Account(owner=gpcoder, currency=USD, balance=100)
removeAccount: Account(owner=gpcoder, currency=USD, balance=100)
Handling after actual method execution
---
Feb 12, 2019 9:25:04 PM com.gpcoder.patterns.creational.googleguice.aop.handler.LoggingInterceptor invoke
INFO: LoggingInterceptor
Handling before actual method execution
Gets the method being called: getSize
getSize: 0
Handling after actual method execution
---
```

Link bài viết gốc: https://gpcoder.com/5137-gioi-thieu-google-guice-aspect-oriented-programming-aop/