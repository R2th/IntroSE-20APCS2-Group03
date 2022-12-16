Prototype Pattern thường được sử dụng để nhân bản một `object` với lưu ý về mặt hiệu năng xử lý. Protype Pattern được xếp vào nhóm các pattern Khởi Tạo.

Prototype Pattern sử dụng một giao diện kiểu mẫu để tạo ra một bản sao `clone` của một `object`. Pattern này được sử dụng khi mà việc khởi tạo một `object` trực tiếp gặp nhiều khó khăn và tiêu tốn tài nguyên về thời gian.

Ví dụ, một `object` được tạo ra sau một lần mở kết nối tới CSDL có thể được cho là đắt đỏ. Chúng ta có thể ghi đệm lại `object` này vào một `cache`, và lần tới khi yêu cầu được gửi đến, chúng ta có thể tạo ra một bản sao `clone` và trả về, đồng thời cập nhật CSDL, thay vì truy xuất lại thông tin từ CSDL và khởi tạo lại `object` từ đầu.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/4f821d66-f712-4e6b-925a-d520427c2ebf.png)

- Chúng ta sẽ tạo `01 abstract class Shape`.
- Và các `class` mô tả thực thể mở rộng `Shape`.
- Ở bước tiếp theo, `01 class Cache` ghi đệm các `object` đã được tạo ra sẽ được định nghĩa.
- Cuối cùng là code `main` ở `PatternDemo` sẽ sử dụng `Cache` để yêu cầu lấy các `object Shape`.

Về mặt quản lý code, chúng ta sẽ có `01 package` tên là `shapeprototype`.  Code sử dụng ở phía client sẽ chỉ có thể tham chiếu tới `Cache` và `Shape` được mở `public`. Các  thành phần còn lại của `shapeprototype` đều được đặt `access modifier` là `default`.

### Bước 1

Tạo `01 abstract class Shape` triển khai `interface Cloneable`. 

`shapeprototype/Shape.java`
```java
package shapeprototype;

public abstract class Shape
implements Cloneable {
   private String id;
   protected String type;

   public abstract void draw();

   public String getType() {
      return type;
   }

   public void setId(String id) {
      this.id = id;
   }

   public String getId() {
      return id;
   }

   @Override
   public Object clone() {
      Object clone = null;

      try {
         clone = super.clone();
      }
      catch (CloneNotSupportedException e) {
         e.printStackTrace();
      }

      return clone;
   }
}
```

### Bước 2

Tạo các `class` mô tả thực thể mở rộng `Shape`.

`shapeprototype/Circle.java`
```java
package shapeprototype;

class Circle
extends Shape {
   public Circle() {
      type = "circle";
   }

   @Override
   public void draw() {
      System.out.println("Một hình tròn.");
   }
}
```

`shapeprototype/Triangle.java`
```java
package shapeprototype;

class Triangle
extends Shape {
   public Triangle() {
      type = "triangle";
   }

   @Override
   public void draw() {
      System.out.println("Một hình tam giác.");
   }
}
```

`shapeprototype/Square.java`
```java
package shapeprototype;

class Square
extends Shape {
   public Square() {
      type = "square";
   }

   @Override
   public void draw() {
      System.out.println("Một hình vuông.");
   }
}
```

### Bước 3

Tạo `01 class Cache` để truy vấn các `object Shape` từ CSDL và ghi đệm vào một.

`shapeprototype/Cache.java`
```java
package shapeprototype;

import java.util.Hashtable;

public class Cache {
   private static Hashtable<String, Shape> cachedShapes = new Hashtable<String, Shape>();

   public static Shape getShape(String id) {
      return (Shape) cachedShapes.get(id).clone();
   }

   public static void load() {
      Circle circle = new Circle();
      circle.setId("1");
      cachedShapes.put(circle.getId(), circle);

      Triangle triangle = new Triangle();
      triangle.setId("2");
      cachedShapes.put(triangle.getId(), triangle);

      Square square = new Square();
      square.setId("3");
      cachedShapes.put(square.getId(), square);
   }
}
```

### Bước 4

Tại `PatternDemo`, sử dụng `Cache` để tạo ra các bản sao của các `object Shape` được ghi đệm trước đó trong Hashtable.

`PatternDemo.java`
```java
import shapeprototype.Cache;
import shapeprototype.Shape;

public class PatternDemo {
   public static void main(String[] args) {
      Cache.load();

      Shape clonedCircle = (Shape) Cache.getShape("1");
      System.out.println("=== Cloned " + clonedCircle.getType());
      clonedCircle.draw();

      Shape clonedTriangle = (Shape) Cache.getShape("2");
      System.out.println("=== Cloned " + clonedTriangle.getType());
      clonedTriangle.draw();

      Shape clonedSquare = (Shape) Cache.getShape("3");
      System.out.println("=== Cloned " + clonedSquare.getType());
      clonedSquare.draw();
   }
}
```

### Bước 5

Kiểm chứng lại thông tin được in ra ở `console`.

`console`
```java
=== Cloned circle
Một hình tròn.
=== Cloned triangle
Một hình tam giác.
=== Cloned square
Một hình vuông.
```