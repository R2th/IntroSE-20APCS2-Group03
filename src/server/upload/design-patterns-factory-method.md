Factory Method - còn được biết đến với một tên gọi khác là Virtual Constructor - là một trong những dạng thức triển khai được sử dụng nhiều nhất và được xếp vào nhóm các dạng thức Khởi Tạo `Creational Patterns`.

Trong phép triển khai Factory Method, chúng ta tạo ra các `object` mà không để mở logic khởi tạo cho phía client (đoạn code gửi yêu cầu và sử dụng `object` được khởi tạo).

Thêm vào đó, việc tham chiếu tới `object` được khởi tạo sẽ được thực hiện thông  qua một `interface` (giao diện) chung thay vì sử dụng tên các `class` mô tả thực thể.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/48e2578f-6105-4bf6-8aca-166f3263f169.png)

- Chúng ta sẽ tạo ra `01 interface` chung có tên là `Shape` cho các `class` mô tả hình 2D.
- `Circle` / `Triangle` / `Square` - hình tròn / tam giác / hình vuông là các `class` cụ thể triển khai `interface` này.
- Ở bước tiếp theo, `01 class` có tên là `Factory` sẽ được định nghĩa.
- Cuối cùng là `main` của chương trình sẽ sử dụng `Factory` để yêu cầu khởi tạo `1 Shape`, `main` sẽ truyền vào thông tin về kiểu `Shape` muốn khởi tạo.
 
Về mặt quản lý code, chúng ta sẽ có `01 package` được đặt tên là `shapefactory`.  
`Package` này sẽ chứa:

- `01 interface Shape` mở `public`.
- `03 class` triển khai `Shape` để `default`.
- `01 class Factory` mở `public`.

Điều này có nghĩa là code client ở phía bên ngoài `package` sẽ hoàn toàn không biết 
tới `03 class` triển khai `Shape` mà chỉ có thể gọi `Factory` để khởi tạo các `Shape`
và tham chiếu tới các `object` được tạo ra thông qua `interface Shape`.

### Bước 1

Tạo `01 interface` có tên là `Shape` mở `public`.

```shapefactory/Shape.java
package shapefactory;

public interface Shape {
   void draw();
}
```

### Bước 2

Tạo các `class` cụ thể triển khai `interface` với `access modifier`
đặt `default`, không mở `public`.

```shapefactory/Circle.java
package shapefactory;

class Circle
implements Shape {
   @Override
   public void draw() {
      System.out.println("Một hình tròn.");
   }
}
```

```shapefactory/Triangle.java
package shapefactory;

class Triangle
implements Shape {
   @Override
   public void draw() {
      System.out.println("Một hình tam giác.");
   }
}
```

```shapefactory/Square.java
package shapefactory;

class Square
implements Shape {
   @Override
   public void draw() {
      System.out.println("Một hình vuông.");
   }
}
```

### Bước 3

Tạo `01 class Factory` để sản xuất các `object` thực thể với thông tin
được cung cấp từ code client.

```shapefactory/Factory.java
package shapefactory;

public class Factory {
   public Shape createShape(String type) {
      if (type == null)                        return null;
      if (type.equalsIgnoreCase("circle"))     return new Circle();
      if (type.equalsIgnoreCase("triangle"))   return new Triangle();
      if (type.equalsIgnoreCase("square"))     return new Square();
      else                                     return null;
   }
}
```

### Bước 4

Sử dụng `Factory` trong code client ở `main` để yêu cầu khởi tạo các `object`
bằng cách truyền vào thông tin về loại hình của `Shape`.

`PatternDemo.java`
```java
import shapefactory.Factory;
import shapefactory.Shape;

public class FactoryPatternDemo {
   public static void main(String[] args) {
      Factory shapeFactory = new Factory();

      // Yêu cầu khởi tạo một `object` hình tròn và gọi `draw()` để vẽ
      Shape circle = shapeFactory.createShape("circle");
      circle.draw();

      // Yêu cầu khởi tạo một `object` hình tam giác và gọi `draw()` để vẽ
      Shape triangle = shapeFactory.createShape("triangle");
      triangle.draw();

      // Yêu cầu khởi tạo một `object` hình vuông và gọi `draw()` để vẽ
      Shape square = shapeFactory.createShape("square");
      square.draw();
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra ở `console`.

```console.io
Một hình tròn.
Một hình tam giác.
Một hình vuông.
```