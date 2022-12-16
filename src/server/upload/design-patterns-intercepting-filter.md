Intercepting Filter (màng chắn) được sử dụng khi chúng ta muốn thực hiện các thao tác tiền xử lý / hậu xử lý với các yêu cầu `request` hoặc phản hồi `response` của ứng dụng. Các `filter` được định nghĩa và áp dụng lên các `request` trước khi chuyển tới lớp xử lý chính hoặc các `response` trước khi chuyển tới máy khách `client`. Các `filter` có thể thực hiện các chức năng như xác thực đăng nhập / ghi nhật ký / hoặc theo dõi các `request`, rồi sau đó chuyển các `request` tới lớp xử lý tương ứng. Sau đây là các thành phần có mặt trong pattern:

- Client - object gửi yêu cầu `request` tới `Target` hoặc nhận `response`.
- Target - object xử lý `request` hoặc `response`.
- Filter - thực hiện các tác vụ trước hoặc sau xử lý `request` hoặc `response`.
- Filter Chain - chứa một bộ các `Filter` giúp chúng ta thực hiện theo thứ tự.
- Filter Manager - quản lý các `Filter` và cả `Filter Chain`.

## Áp dụng triển khai

![](https://images.viblo.asia/937f823d-b830-4198-a2d2-8c4c9d0758ba.png)

- Chúng ta sẽ tạo ra một `Client` để gửi `request`  và `Target` để xử lý.
- Sau đó thêm `FilterManager` cho `Target` để bổ sung các `Filter` tiền xử lý cho các `request`.

Ở đây với một ví dụ đơn giản thì chúng ta sẽ không tách `filterChain` thành một class riêng mà có thể sử dụng giao diện `List` có sẵn. Cách thêm các `Filter` tiền xử lý cho `response` cũng tương tự.

### Bước 1

Tạo `Client` và `Target`.

`interceptingfilter/Client.java`
```java
package interceptingfilter;

public class Client {
   private Target target;

   public void setTarget(Target target) {
      this.target = target;
   }

   public void sendRequest(String request) {
      target.processRequest(request);
   }
}
```

`interceptingfilter/Target.java`
```java
package interceptingfilter;

public class Target {
   private FilterManager filterManager;

   public void setFilterManager(FilterManager filterManager) {
      this.filterManager = filterManager;
   }

   public void processRequest(String request) {
      filterManager.processRequest(request);
      System.out.println("Processing request: " + request);
   }
}
```

### Bước 2

Tạo `FilterManager` để thêm các `Filter` cho `Target`.

`interceptingfilter/FilterManager.java`
```java
package interceptingfilter;

import interceptingfilter.filter.AuthenticationFilter;
import interceptingfilter.filter.DebugFilter;
import interceptingfilter.filter.Filter;

import java.util.ArrayList;
import java.util.List;

public class FilterManager {
   private List<Filter> filterChain = new ArrayList<Filter>();

   public FilterManager() {
      filterChain.add(new AuthenticationFilter());
      filterChain.add(new DebugFilter());
   }

   void setFilter(Filter filter) {
      filterChain.add(filter);
   }

   void processRequest(String request) {
      filterChain.forEach((filter) -> filter.process(request));
   }
}
```

### Bước 3

Tạo interface `Filter` và các class triển khai tiền xử lý `request`.

`interceptingfilter/filter/Filter.java`
```java
package interceptingfilter.filter;

public interface Filter {
   void process(String request);
}
```

`interceptingfilter/filter/AuthenticationFilter.java`
```java
package interceptingfilter.filter;

public class AuthenticationFilter
implements Filter {
   @Override
   public void process(String request) {
      System.out.println("Authenticating request: " + request);
   }
}
```

`interceptingfilter/filter/DebugFilter.java`
```java
package interceptingfilter.filter;

public class DebugFilter
implements Filter {
   @Override
   public void process(String request) {
      System.out.println("Request log: " + request);
   }
}
```

### Bước 4

Sử dụng `Client` và `Target` để thử hoạt động của pattern.

`PatternDemo.java`
```java
import interceptingfilter.Client;
import interceptingfilter.FilterManager;
import interceptingfilter.Target;
import interceptingfilter.filter.AuthenticationFilter;
import interceptingfilter.filter.DebugFilter;
import interceptingfilter.filter.Filter;

public class PatternDemo {
   public static void main(String[] args) {
      FilterManager fm = new FilterManager();
      Filter authFilter = new AuthenticationFilter();
      Filter debugFilter = new DebugFilter();
      fm.setFilter(authFilter);
      fm.setFilter(debugFilter);

      Target target = new Target();
      target.setFilterManager(fm);

      Client client = new Client();
      client.setTarget(target);
      client.sendRequest("Home");
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra ở `console`.

```
Authenticating request: Home
Request log: Home
Processing request: Home
```