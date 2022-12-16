Composite Entity (thực thể tổng hợp) được sử dụng trong cơ chế đồng bộ của EJB.
Một object Composite Entity là một EJB bean biểu thị một biểu đồ các object. Khi
một object tổng hợp được cập nhật thì các object lệ thuộc vào object này cũng sẽ
được tự động cập nhật. Dưới đây là các thành phần trong Composite Entity Bean.

- Composite Entity - Là thực thể chính của bean. Có thể là một object thô Coarse-Grained Object hoặc chứa một Coarse-Grained Object.
- Coarse-Grained Object - Chứa các object lệ thuộc Dependent Object.
- Dependent Object - Lệ thuộc vào Coarse-Grained Object trong thời gian tồn tại.

## Áp dụng triển khai

![](https://images.viblo.asia/77cf36c1-c536-4088-9c3d-c3850b33f68b.png)

### Bước 1

Tạo class cho các object lệ thuộc.

`compositeentity/dependency/Heaven.java`
```java
package compositeentity.dependency;

import java.util.List;

public class Heaven {
   private String name;
   private String data;

   public Heaven() {
      name = "Heaven";
   }

   public void setData(String data) {
      this.data = data;
   }

   public String getData() {
      return data;
   }
}
```

`compositeentity/dependency/Earth.java`
```java
package compositeentity.dependency;

public class Earth {
   private String name;
   private String data;

   public Earth() {
      name = "Earth";
   }

   public void setData(String data) {
      this.data = data;
   }

   public String getData() {
      return data;
   }
}
```

### Bước 2

Tạo object tổng hợp.

`compositeentity/Entity.java`
```java
package compositeentity;

import compositeentity.dependency.Earth;
import compositeentity.dependency.Heaven;

import java.util.*;

public class Entity {
   private Heaven dependency1;
   private Earth dependency2;

   public Entity() {
      dependency1 = new Heaven();
      dependency2 = new Earth();
   }

   public void setData(
      String messageToHeaven,
      String messageToEarth
   ) {
      dependency1.setData(messageToHeaven);
      dependency2.setData(messageToEarth);
   }

   public List<String> getData() {
      List<String> data = new ArrayList<String>();
      data.add(dependency1.getData());
      data.add(dependency2.getData());
      return data;
   }
}
```

### Bước 3

Tạo class mô tả `Client` sử dụng `Entity`.

`Client.java`
```java
import compositeentity.Entity;

public class Client {
   private Entity entity;

   public Client() {
      entity = new Entity();
   }

   public void displayData() {
      entity.getData().forEach((message) -> System.out.println(message));
   }

   public void updateData(
         String messageToHeaven,
         String messageToEarth
   ) {
      entity.setData(messageToHeaven, messageToEarth);
   }
}
```

### Bước 4

Sử dụng `Client` để chạy thử.

`PatternDemo.java`
```java
public class PatternDemo {
   public static void main(String[] args) {
      Client client = new Client();

      client.updateData("To heaven", "To earth");
      client.displayData();

      client.updateData("Mind", "Body");
      client.displayData();
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
To heaven
To earth
Mind
Body
```