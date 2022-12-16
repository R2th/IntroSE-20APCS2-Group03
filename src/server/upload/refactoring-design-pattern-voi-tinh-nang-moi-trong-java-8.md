Trong bài này, tôi sẽ giới thiệu với các bạn cách sử dụng một số tính năng mới trong Java 8 như [Lambda](https://gpcoder.com/3898-bieu-thuc-lambda-trong-java-8-lambda-expressions/) , [Function](https://gpcoder.com/3976-function-trong-java-8/), [Supplier](https://gpcoder.com/3967-supplier-trong-java-8/), … để refactor code của một số [Design Pattern](https://gpcoder.com/category/design-pattern/).

# Refactoring Strategy Design Pattern

## Strategy Pattern là gì?

Các bạn xem lại bài viết “[Hướng dẫn Java Design Pattern – Strategy](https://gpcoder.com/4796-huong-dan-java-design-pattern-strategy/)“.

## Ví dụ Strategy Pattern

Strategy.java

```
package com.gpcoder.designpatterns.strategy;
 
public interface Strategy {
    void performTask();
}
```

### Strategy Pattern không sử dụng Lambda

StartegyPatternExample.java

```
package com.gpcoder.designpatterns.strategy;
 
import java.util.Arrays;
import java.util.List;
 
class EagerStrategy implements Strategy {
 
    @Override
    public void performTask() {
        System.out.println("Eager strategy");
    }
}
 
class LazyStratgey implements Strategy {
 
    @Override
    public void performTask() {
        System.out.println("Lazy strategy");
    }
}
 
public class StartegyPatternExample {
    public static void main(String[] args) {
        Strategy eagerStrategy = new EagerStrategy();
        Strategy lazyStrategy = new LazyStratgey();
        List<Strategy> strategies = Arrays.asList(eagerStrategy, lazyStrategy);
        for (Strategy stg : strategies) {
            stg.performTask();
        }
    }
}
```

### Strategy Pattern sử dụng [Lambda](https://gpcoder.com/3898-bieu-thuc-lambda-trong-java-8-lambda-expressions/)

```
package com.gpcoder.designpatterns.strategy;
 
import java.util.Arrays;
import java.util.List;
 
public class LambdaStartegyPatternExample {
 
    public static void main(String[] args) {
        Strategy eagerStrategy = () -> System.out.println("Eager strategy");
        Strategy lazyStrategy = () -> System.out.println("Lazy strategy");
        List<Strategy> strategies = Arrays.asList(eagerStrategy, lazyStrategy);
        strategies.forEach((elem) -> elem.performTask());
    }
}
```

# Refactoring Observer Design Pattern
## Observer Pattern là gì?

Các bạn xem lại bài viết “[Hướng dẫn Java Design Pattern – Observer](https://gpcoder.com/4747-huong-dan-java-design-pattern-observer/)“.

## Ví dụ Observer Pattern

Observer.java

```
package com.gpcoder.designpatterns.observer;
 
public interface Observer {
    void update(String str);
}
```

Subject.java

```
package com.gpcoder.designpatterns.observer;
 
public interface Subject {
 
    void registerObserver(Observer observer);
 
    void notifyObservers(String str);
}
```

AccountService.java

```
package com.gpcoder.designpatterns.observer;
 
import java.util.ArrayList;
import java.util.List;
 
public class AccountService implements Subject {
 
    private final List<Observer> observers = new ArrayList<>();
 
    public void login(String username) {
        System.out.println("Login: " + username);
        notifyObservers(username);
    }
 
    @Override
    public void registerObserver(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }
 
    @Override
    public void notifyObservers(String str) {
        for (Observer observer : observers) {
            observer.update(str);
        }
    }
}
```

### Observer Pattern không sử dụng Lambda

```
package com.gpcoder.designpatterns.observer;
 
class Logger implements Observer {
    @Override
    public void update(String str) {
        System.out.println("Logger: " + str);
    }
}
 
class Mailer implements Observer {
    @Override
    public void update(String str) {
        System.out.println("Mailer: " + str);
    }
}
 
public class ObserverPatternExample {
    public static void main(String[] args) {
        AccountService account = new AccountService();
        // Register Observers
        account.registerObserver(new Logger());
        account.registerObserver(new Mailer());
        // Call service
        account.login("gpcoder");
    }
}
```

### Observer Pattern sử dụng [Lambda](https://gpcoder.com/3898-bieu-thuc-lambda-trong-java-8-lambda-expressions/)

```
package com.gpcoder.designpatterns.observer;
 
public class LambdaObserverPatternExample {
    public static void main(String[] args) {
        AccountService account = new AccountService();
        // Register Observers
        account.registerObserver(str -> System.out.println("Logger: " + str));
        account.registerObserver(str -> System.out.println("Mailer: " + str));
        // Call service
        account.login("gpcoder");
    }
}
```

Chạy 2 chương trình trên, ta có cùng kết quả:

```
Login: gpcoder
Logger: gpcoder
Mailer: gpcoder
```

# Refactoring Chain of Responsibility Pattern

## Chain of Responsibility Pattern là gì?

Các bạn xem lại bài viết “[Hướng dẫn Java Design Pattern – Chain of Responsibility](https://gpcoder.com/4665-huong-dan-java-design-pattern-chain-of-responsibility/)“.

## Ví dụ Chain of Responsibility Pattern

Filter.java

```
package com.gpcoder.designpatterns.chain;
 
public abstract class Filter {
 
    private Filter nextFilter;
 
    public String doFilter(String str) {
        String result = handleString(str);
        if (nextFilter != null) {
            return nextFilter.doFilter(result);
        }
        return result;
    }
 
    public void setNextFilter(Filter nextFilter) {
        this.nextFilter = nextFilter;
    }
 
    protected abstract String handleString(String str);
}
```

### Chain of Responsibility Pattern không sử dụng Lambda

```
package com.gpcoder.designpatterns.chain;
 
class Filter1 extends Filter {
    @Override
    protected String handleString(String str) {
        System.out.println("Filter1: " + str);
        return str + "->Filter1";
    }
}
 
class Filter2 extends Filter {
    @Override
    protected String handleString(String str) {
        System.out.println("Filter2: " + str);
        return str + "->Filter2";
    }
}
 
class Filter3 extends Filter {
    @Override
    protected String handleString(String str) {
        System.out.println("Filter3: " + str);
        return str + "->Filter3";
    }
}
 
class AppFilter {
    public static Filter getFilter() {
        Filter1 filter1 = new Filter1();
        Filter2 filter2 = new Filter2();
        Filter3 filter3 = new Filter3();
        filter1.setNextFilter(filter2);
        filter2.setNextFilter(filter3);
        return filter1;
    }
}
 
public class ChainOfResponsibilityExample {
 
    public static void main(String[] args) {
        // Build the chain of responsibility
        Filter filter = AppFilter.getFilter();
        // Execute filter
        String result = filter.doFilter("gpcoder");
        System.out.println("Final data: " + result);
    }
}
```

### Chain of Responsibility Pattern sử dụng [Lambda](https://gpcoder.com/3898-bieu-thuc-lambda-trong-java-8-lambda-expressions/) và [Function](https://gpcoder.com/3976-function-trong-java-8/)

```
package com.gpcoder.designpatterns.chain;
 
import java.util.function.Function;
import java.util.function.UnaryOperator;
 
public class LamdaChainOfResponsibilityExample {
 
    public static void main(String[] args) {
 
        UnaryOperator<String> filter1 = (str) -> {
            System.out.println("Filter1: " + str);
            return str + "->Filter1";
        };
 
        UnaryOperator<String> filter2 = (str) -> {
            System.out.println("Filter2: " + str);
            return str + "->Filter2";
        };
 
        UnaryOperator<String> filter3 = (str) -> {
            System.out.println("Filter3: " + str);
            return str + "->Filter3";
        };
 
        // Compose all functions resulting in a chain of operations.
        Function<String, String> appFilter = filter1.andThen(filter2).andThen(filter3);
        String result = appFilter.apply("gpcoder");
        System.out.println("Final data: " + result);
    }
}
```

Lưu ý: UnaryOperator là một Function, có cùng kiểu dữ liệu đầu vào và đầu ra. UnaryOperator<String> tương đương với cách viết Function<String, String>.

Chạy 2 chương trình trên, chúng ta có cùng kết quả:
```
Filter1: gpcoder
Filter2: gpcoder->Filter1
Filter3: gpcoder->Filter1->Filter2
Final data: gpcoder->Filter1->Filter2->Filter3
```

# Refactoring Factory Method Design Pattern

## Factory Method Pattern là gì?

Các bạn xem lại bài viết “[Hướng dẫn Java Design Pattern – Factory Method](https://gpcoder.com/4352-huong-dan-java-design-pattern-factory-method/)“.

## Ví dụ Factory Pattern

Bank.java
    
```
package com.gpcoder.designpatterns.factory;
 
public interface Bank {
    String getBankName();
}
```
    
TPBank.java
```
package com.gpcoder.designpatterns.factory;
 
public class TPBank implements Bank {
    @Override
    public String getBankName() {
        return "TPBank";
    }
}
```
    
VietcomBank.java
```
package com.gpcoder.designpatterns.factory;
 
public class VietcomBank implements Bank {
    @Override
    public String getBankName() {
        return "VietcomBank";
    }
}
```

BankType.java
```
package com.gpcoder.designpatterns.factory;
 
public enum BankType {
    VIETCOMBANK, TPBANK;
}
```
    
### Factory Method Pattern không sử dụng Java 8

```
package com.gpcoder.designpatterns.factory;
 
class BankFactory {
    public static final Bank getBank(BankType bankType) {
        switch (bankType) {
            case TPBANK:
                return new TPBank();
            case VIETCOMBANK:
                return new VietcomBank();
            default:
                throw new IllegalArgumentException("This bank type is unsupported");
        }
    }
}
 
public class FactoryMethodExample {
    public static void main(String[] args) {
        Bank bank = BankFactory.getBank(BankType.TPBANK);
        System.out.println(bank.getBankName()); // TPBank
    }
}
```
    
### Factory Method Pattern sử dụng [Supplier](https://gpcoder.com/3967-supplier-trong-java-8/) và [Method Reference](https://gpcoder.com/3882-phuong-thuc-tham-chieu-trong-java-8-method-references)
    
```
package com.gpcoder.designpatterns.factory;
 
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;
 
class Java8BankFactory {
     
    private final static Map<BankType, Supplier<Bank>> map = new HashMap<>();
     
    static {
        map.put(BankType.TPBANK, TPBank::new);
        map.put(BankType.VIETCOMBANK, VietcomBank::new);
    }
     
    public static final Bank getBank(BankType bankType) {
        Supplier<Bank> bank = map.get(bankType);
        if (bank == null) {
            throw new IllegalArgumentException("This bank type is unsupported");
        }
        return bank.get();
    }
}
 
public class Java8FactoryMethodExample {
    public static void main(String[] args) {
        Bank bank = Java8BankFactory.getBank(BankType.TPBANK);
        System.out.println(bank.getBankName()); // TPBank
    }
}
```
    
Java 8 mang đến cho chúng ta rất nhiều tiện ích, các bạn hãy thử refactor code của mình sang Java 8 để code được gọn ràng hơn.
    
Link bài viết gốc: https://gpcoder.com/6200-refactoring-design-pattern-voi-tinh-nang-moi-trong-java-8/