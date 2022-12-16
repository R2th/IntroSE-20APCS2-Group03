Besiness Delegate được sử dụng khi chúng ta muốn tách rời tầng biểu thị dữ liệu 
`presentation` và tầng logic quản lý `business`. Pattern này thường được sử dụng để 
giảm thiểu giao tiếp trong code của tầng `presentation` tới tầng `business`.

Trong Business Delegate, chúng ta có các thực thể sau:

- `Client` - Đại diện cho tầng `presentation`. Có thể là JSP, servlet, hoặc code UI.
- Business `Delegate` - Đại diện cho tầng `business` để các thực thể `Client`
có thể truy xuất tới các chức năng quản lý Business `Service`.
- Business `Service` - Một interface chung cho các class triển khai các chức năng quản lý.
- Business `LookUp` - Object hỗ trợ Business `Delegate` tìm kiếm chức năng phù hợp. 

## Áp dụng triển khai

![](https://images.viblo.asia/2b230743-b04d-4679-b30c-50c864570b7e.png)

### Bước 1

Tạo giao diện Business `Service` cho các class triển khai chức năng quản lý.

`businessdelegate/service/Service.java`
```java
package businessdelegate.service;

public interface Service {
   public void process();
}
```

### Bước 2

Tạo các class triển khai `Service` là `EJB` và `JMS`.

`businessdelegate/service/EJB.java`
```java
package businessdelegate.service;

class EJB
implements Service {
   @Override
   public void process() {
      System.out.println("EJB Service processing...");
   }
}
```

`businessdelegate/service/JMS.java`
```java
package businessdelegate.service;

class JMS
implements Service {
   @Override
   public void process() {
      System.out.println("JMS Service processing...");
   }
}
```

### Bước 3

Tạo class hỗ trợ tìm kiếm chức năng Business `LookUp`.

`businessdelegate/service/LookUp.java`
```java
package businessdelegate.service;

public class LookUp {
   public Service getService(String serviceType) {
      if ("EJB".equalsIgnoreCase(serviceType))
         return new EJB();
      if ("JMS".equalsIgnoreCase(serviceType))
         return new JMS();
      else
         return null;
   }
}
```

### Bước 4

Tạo class đại diện Business `Delegate`.

`businessdelegate/Delegate.java`
```java
package businessdelegate;

import businessdelegate.service.LookUp;
import businessdelegate.service.Service;

public class Delegate {
   private Service service;

   public void setType(String serviceType) {
      LookUp lookup = new LookUp();
      service = lookup.getService(serviceType);
   }

   public void process() {
      service.process();
   }
}
```

### Bước 5

Tạo class `Client`.

`Client.java`
```java
import businessdelegate.Delegate;

public class Client {
   private Delegate businessDelegate;

   public Client(Delegate businessDelegate) {
      this.businessDelegate = businessDelegate;
   }

   public void doTask() {
      businessDelegate.process();
   }
}
```

### Bước 6

Sử dụng Business `Delegate` và `Client` để thử hoạt động của pattern.

`PatternDemo.java`
```java
import businessdelegate.Delegate;

public class PatternDemo {
   public static void main(String[] args) {
      Delegate businessDelegate = new Delegate();
      Client client = new Client(businessDelegate);

      businessDelegate.setType("EJB");
      client.doTask();

      businessDelegate.setType("JMS");
      client.doTask();
   }
}
```

## Bước 7

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
EJB Service processing...
JMS Service processing...
```