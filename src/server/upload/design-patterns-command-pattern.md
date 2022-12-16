Command là một dạng thức triển khai data driven được xếp vào nhóm các pattern Hành Vi.
Trong Command, một yêu cầu được đóng gói ở dạng 1 object mô tả mệnh lệnh và được truyền 
tới object thực thi mệnh lệnh. Object thực thi sẽ tìm kiếm một object phù hợp có thể thực hiện
được yêu cầu và ủy thác lại mệnh lệnh đó.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/90e82aed-e5cd-4b50-8aa8-37df1d1b09cc.png)

Chúng ta có một `abstract Order` đóng vai trò mô tả mệnh lệnh. Class `Stock` được tạo ra với
vai trò là yêu cầu xử lý. Kế đến là chúng ta có `Buying` và `Selling` là các mệnh lệnh thực tế.
Class `Broker` đóng vai trò là object thực thi có thể nhận và xử lý mệnh lệnh.
`Broker` sẽ sử dụng command pattern để tìm kiếm object phù hợp để thực thi mệnh lệnh
tùy thuộc vào kiểu của từng object Order.

### Bước 1

Tạo `class Stock` đóng vai trò là yêu cầu xử lý.

`commandpattern/Stock.java`
```java
package commandpattern;

public class Stock {
   private String name = "ABC";
   private int quantity = 10;

   public void buy() {
      System.out.println(
         "Stock [ Name: " + name +
         ", quantity: " + quantity +
         " ] bought"
      );
   }

   public void sell() {
      System.out.println(
         "Stock [ Name: " + name +
         ", quantity: " + quantity +
         " ] sold"
      );
   }
}
```

### Bước 2

Tạo `abstract Order`.

`commandpattern/Order.java`
```java
package commandpattern;

public abstract class Order {
   protected Stock stock;

   public Order(Stock stock) {
      this.stock = stock;
   }

   public abstract void execute();
}
```

### Bước 3

Tạo các class command `Buying` và `Selling`.

`commandpattern/Buying.java`
```java
package commandpattern;

public class Buying
extends Order {
   public Buying(Stock stock) {
      super(stock);
   }

   @Override
   public void execute() {
      stock.buy();
   }
}
```

`commandpattern/Selling.java`
```java
package commandpattern;

public class Selling
extends Order {
   public Selling(Stock stock) {
      super(stock);
   }

   @Override
   public void execute() {
      stock.sell();
   }
}
```

### Bước 4

Tạo class thực thi command `Broker`.

`commandpattern/Broker.java`
```java
package commandpattern;

import java.util.ArrayList;
import java.util.List;

public class Broker {
   private List<Order> orderList = new ArrayList<Order>();

   public void takeOrder(Order o) {
      orderList.add(o);
   }

   public void placeOrders() {
      for (Order o : orderList) { o.execute(); }
      orderList.clear();
   }
}
```

### Bước 5

Sử dụng `Broker` để nhận và xử lý các yêu cầu.

`PatternDemo.java`
```java
import commandpattern.Broker;
import commandpattern.Buying;
import commandpattern.Selling;
import commandpattern.Stock;

public class PatternDemo {
   public static void main(String[] args) {
      Stock abc = new Stock();
      Broker b = new Broker();

      Buying buyOrder = new Buying(abc);
      b.takeOrder(buyOrder);

      Selling sellOrder = new Selling(abc);
      b.takeOrder(sellOrder);

      // các yêu cầu được thực hiện tại đây
      b.placeOrders();
   }
}
```

### Bước 6

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
Stock [ Name: ABC, quantity: 10 ] bought
Stock [ Name: ABC, quantity: 10 ] sold
```