Service Locator được sử dụng khi chúng ta muốn định vị các object xử lý yêu cầu `service` khác nhau bằng việc sử dụng trình tìm kiếm JNDI. Hãy lấy ví dụ về một tác vụ tìm kiếm JNDI cho một `service` tiêu tốn nhiều tài nguyên xử lý của hệ thống và cả thời gian thực hiện, Service Locator xuất hiện ở đây và tận dụng kĩ thuật ghi nhớ đệm `caching` để giúp chúng ta hoàn thành công việc. Lần đầu tiên khi 1 `service` được yêu cầu, Service Locator sẽ tìm kiếm trong JNDI và ghi đệm `object` được tìm thấy và sử dụng. Những lần yêu cầu sau tới `service` này được thực hiện qua `cache` của Service Locator giúp cải thiện hiệu năng xử lý của hệ thống. Sau đây là các thành phần có mặt trong pattern:

- `Service` - interface chung cho các class tạo object xử lý yêu cầu.
- `Context` - JNDI tập trung tất cả tham chiếu tới các `service`.
- `Service Locator` - gửi yêu cầu tìm kiếm `service` tới JNDI và ghi đệm các `service` đã được sử dụng.
- `Cache` - bộ nhớ đệm lưu trữ các tham chiếu tới các `service` đã được sử dụng.
- `Client` - object gửi yêu cầu tới `Service Locator`.

## Áp dụng triển khai

![](https://images.viblo.asia/2d868e44-a11d-4772-84d4-5767b585c68b.png)

Chúng ta sẽ tạo ra interface `Service` và các class triển khai, sau đó là các class `Context`, `Cache`, `ServiceLocator`. Code client gửi yêu cầu sẽ được viết mô phỏng tại `main` của `PatternDemo`.

## Bước 1

Tạo interface `Service` và các class triển khai.

`servicelocator/Service.java`
```java
package servicelocator;

public interface Service {
   String getName();
   void process();
}
```

Các class triển khai `Service`.

`servicelocator/OneService.java`
```java
package servicelocator;

class OneService
implements Service {
   @Override
   public String getName() {
      return "One Service";
   }

   @Override
   public void process() {
      System.out.println("Processing One Service...");
   }
} // class
```

`servicelocator/AnotherService.java`
```java
package servicelocator;

class AnotherService
implements Service {
   @Override
   public String getName() {
      return "Another Service";
   }

   @Override
   public void process() {
      System.out.println("Processing Another Service...");
   }
} // class
```

## Bước 2

Tạo `Context` để tìm kiếm JDNI.

`servicelocator/Context.java`
```java
package servicelocator;

class Context {
   public Service lookup(String jndiName) {
      if ("one service".equalsIgnoreCase(jndiName))
         return new OneService();
      if ("another service".equalsIgnoreCase(jndiName))
         return new AnotherService();
      else
         return null;
   }
}
```

## Bước 3

Tạo `Cache` ghi đệm các `service`.

`servicelocator/Cache.java`
```java
package servicelocator;

import java.util.ArrayList;
import java.util.List;

class Cache {
   private List<Service> serviceList = new ArrayList<Service>();

   public Service getService(String jndiName) {
      List<Service> matched = serviceList
         .stream()
         .filter((service) -> service.getName().equalsIgnoreCase(jndiName))
         .toList();

      if (matched.isEmpty())
         return null;
      else
         return serviceList.get(0);
   }

   public void addService(Service jndi) {
      if (getService(jndi.getName()) != null)
         { /* do nothing */ }
      else
         serviceList.add(jndi);
   }
} // class
```

## Bước 4

Tạo `ServiceLocator`.

`servicelocator/ServiceLocator.java`
```java
package servicelocator;

public class ServiceLocator {
   private static Cache cache = new Cache();

   public static Service getService(String jndiName) {
      Service service = cache.getService(jndiName);

      if (service != null)
         return log(service);
      else
         return requestService(jndiName);
   }

   private static Service requestService(String jndiName) {
      Context context = new Context();
      Service service = context.lookup(jndiName);
      cache.addService(service);
      return service;
   }

   private static Service log(Service service) {
      System.out.println("Found cached service: " + service.getName());
      return service;
   }
}
```

## Bước 5

Viết code `main` để thử hoạt động của pattern.

`PatternDemo.java`
```java
import servicelocator.Service;
import servicelocator.ServiceLocator;

public class PatternDemo {
   public static void main(String[] args) {
      Service service;

      /* Request new services */

      System.out.println("===============");
      service = ServiceLocator.getService("one service");
      service.process();
      service = ServiceLocator.getService("another service");
      service.process();

      /* Request cached services */

      System.out.println("===============");
      service = ServiceLocator.getService("one service");
      service.process();
      service = ServiceLocator.getService("another service");
      service.process();
   }
}
```

## Bước 6

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
===============
Processing One Service...
Processing Another Service...
===============
Found cached service: One Service
Processing One Service...
Found cached service: One Service
Processing One Service...
```