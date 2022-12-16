Xem bài viết trước để biết về Factory: [[Design Patterns] Factory Pattern](https://viblo.asia/p/design-patterns-factory-pattern-naQZRRrPZvx)

Abstract Factory là dạng thức được đưa ra để làm việc xoay quanh trọng tâm tạo ra một "siêu" Factory đóng vai trò tạo ra các Factory khác. Abstract Factory cũng được xếp vào nhóm các dạng thức Khởi Tạo.

Trong phép triển khai Abstract Factory, `01 interface` được sử dụng để đảm nhiệm vai trò tạo ra `01 Factory` của các `object` liên quan mà không cần chỉ ra đặc định `class` của các `object` đó. Mỗi `Factory` được khởi tạo sẽ có thể giúp chúng ta khởi tạo các `object` thực thể như đã biết trong bài `Factory Pattern`.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/ea520e8b-fa3c-4f16-b42e-f3695c8c006d.png)

- Chúng ta sẽ tạo ra `01 interface Shape` mở `public`.
- Và `04 class` triển khai `interface` này.
- Ở bước tiếp theo, `01 class AbstractFactory` sẽ được tạo ra.
- Kế đến là `02 class Factory` mở rộng `AbstractFactory`.
- Sau đó là một phương thức `static` để khởi tạo các `object Factory`.
- Cuối cùng, trong `main` ở `PatternDemo`, chúng ta sử dụng phương thức `static` để tạo ra các `Factory`. Rồi sau đó truyền vào thông tin về kiểu `object` hình học muốn tạo ra (triangle / square).

![cấu trúc thư mục](https://images.viblo.asia/81af7874-c398-4b86-b636-f05e1af900ed.png)

Về mặt quản lý code, chúng ta sẽ có `01 package` được đặt tên là `shapefactory`. `Package` này sẽ chứa các thành phần `public` tới code client bao gồm `interface Shape` và `class AbstractFactory`. Tất cả các thành phần còn lại bao gồm `04 class` triển khai `Shape` và `02 class` mở rộng `AbstractFactory` sẽ đều sử dụng `access modifier` là `default`.

Do đó, toàn bộ tiến trình logic để khởi tạo các `Factory` cũng như các `Shape` đều không để mở về phía code client và các tham chiếu đều được thực hiện thông qua `abstract class`
 và `interface`.
 
### Bước 1

Tạo `01 interface Shape` mở `public`.

`shapefactory/Shape.java`
```java
package shapefactory;

public interface Shape {
   void draw();
}
```

### Bước 2

Tạo các `class` triển khai giao diện `Shape`.

`shapefactory/NormalTriangle.java`
```java
package shapefactory;

class NormalTriangle
implements Shape {
   @Override
   public void draw() {
      System.out.println("Một hình tam giác bình thường.");
   }
}
```

`shapefactory/NormalSquare.java`
```java
package shapefactory;

class NormalSquare
implements Shape {
   @Override
   public void draw() {
      System.out.println("Một hình vuông bình thường.");
   }
}
```

`shapefactory/RoundedTriangle.java`
```java
package shapefactory;

class RoundedTriangle
implements Shape {
   @Override
   public void draw() {
      System.out.println("Một hình tam giác có các góc bo tròn.");
   }
}
```

`shapefactory/RoundedSquare.java`
```java
package shapefactory;

class RoundedSquare
implements Shape {
   @Override
   public void draw() {
      System.out.println("Một hình vuông có các góc bo tròn.");
   }
}
```

### Bước 3

Tạo `01 class abstract` để khái quát hóa các `Factory`.

`shapefactory/AbstractFactory.java`
```java
package shapefactory;

public abstract class AbstractFactory {
   public abstract Shape createShape(String type);
}
```

### Bước 4

Tạo các `class` mở rộng `AbstractFactory` giúp khởi tạo các `Shape` với thông tin được cung cấp.

`shapefactory/NormalFactory.java`
```java
package shapefactory;

class NormalFactory
extends AbstractFactory {
   @Override
   public Shape createShape(String type) {
      if (type == null)                        return null;
      if (type.equalsIgnoreCase("triangle"))   return new NormalTriangle();
      if (type.equalsIgnoreCase("square"))     return new NormalSquare();
      else                                     return null;
   }
}
```

`shapefactory/RoundedFactory.java`
```java
package shapefactory;

class RoundedFactory
extends AbstractFactory {
   @Override
   public Shape createShape(String type) {
      if (type == null)                        return null;
      if (type.equalsIgnoreCase("triangle"))   return new RoundedTriangle();
      if (type.equalsIgnoreCase("square"))     return new RoundedSquare();
      else                                     return null;
   }
}
```

### Bước 5

Thêm phương thức `static` cho `AbstractFactory` để khởi tạo các `object Factory` cụ thể.

`shapefactory/AbstractFactory`
```java
package shapefactory;

public abstract class AbstractFactory {
   public static AbstractFactory createFactory(boolean rounded) {
      if (rounded)      return new RoundedFactory();
      else              return new NormalFactory();
   }

   abstract public Shape createShape(String type);
}
```

### Bước 6

Sử dụng phương thức `static` vừa rồi để khởi tạo các `objectFactory`. Sau đó, sử dụng các `Factory` để khởi tạo các `object` hình học bằng cách truyền vào thông tin về kiểu `Shape`.

`PatternDemo.java`
```java
import shapefactory.AbstractFactory;
import shapefactory.Shape;

public class DesignPatterns {
   public static void main(String[] args) {
      // Tạo ra một Factory cho các hình 2D bình thường
      AbstractFactory normalFactory = AbstractFactory.createFactory(false);

      // Yêu cầu khởi tạo 1 hình tam giác bình thường và gọi `draw()`
      Shape normalTriangle = normalFactory.createShape("triangle");
      normalTriangle.draw();

      // Yêu cầu khởi tạo 1 hình vuông bình thường và gọi `draw()`
      Shape normalSquare = normalFactory.createShape("square");
      normalSquare.draw();

      // Tạo ra một Factory cho các hình 2D bo tròn góc
      AbstractFactory roundedFactory = AbstractFactory.createFactory(true);

      // Yêu cầu khởi tạo 1 hình tam giác bo góc và gọi `draw()`
      Shape roundedTriangle = roundedFactory.createShape("triangle");
      roundedTriangle.draw();

      // Yêu cầu khởi tạo 1 hình vuông bình thường và gọi `draw()`
      Shape roundedSquare = roundedFactory.createShape("square");
      roundedSquare.draw();
   }
}
```

### Bước 7

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```
Một hình tam giác bình thường.
Một hình vuông bình thường.
Một hình tam giác với các góc bo tròn.
Một hình vuông với các góc bo tròn.
```