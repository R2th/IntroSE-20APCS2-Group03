Facade được tạm hiểu là mặt tiền, một `interface` được tạo ra để giao tiếp với code client bên ngoài và
ẩn đi hết những thứ phức tạp của một hệ thống phía sau. Facade được xếp vào nhóm các pattern Kiến Trúc.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/52725c2d-c128-4685-b522-c29a7ced65c1.png)

Ở đây chúng ta có một phần mềm vẽ các hình phẳng 2D với các `class` mô tả thực thể là
`Circle`, `Triangle`, và `Square`. Một giao diện mặt tiền có tên là `Painter` được tạo ra để
ẩn đi các logic bên trong `package`. Cuối cùng là code `main` trên `PatternDemo` sẽ sử dụng
`Painter` để yêu cầu hình vẽ mà không cần biết tới các `class` mô tả thực thể ban đầu.

### Bước 1

Tạo `abstract Shape`.

`facadepattern/Shape.java`
```java
package facadepattern;

public abstract class Shape {
   public abstract void draw();
}
```

### Bước 2

Tạo các `class` mô tả thực thể hình học 2D.

`facadepattern/Circle.java`
```java
package facadepattern;

class Circle
extends Shape {
   @Override
   public void draw() {
      System.out.println("Circle::draw()");
   }
}
```

`facadepattern/Triangle.java`
```java
package facadepattern;

class Triangle
extends Shape {
   @Override
   public void draw() {
      System.out.println("Triangle::draw()");
   }
}
```

`facadepattern/Square.java`
```java
package facadepattern;

class Square
extends Shape {
   @Override
   public void draw() {
      System.out.println("Square::draw()");
   }
}
```

### Bước 3

Tạo giao diện mặt tiền `Painter`.

`facadepattern/Painter.java`
```java
package facadepattern;

public class Painter {
   private Shape circle;
   private Shape triangle;
   private Shape square;

   public Painter() {
      circle = new Circle();
      triangle = new Triangle();
      square = new Square();
   }

   public void drawCircle() {
      circle.draw();
   }

   public void drawTriangle() {
      triangle.draw();
   }

   public void drawSquare() {
      square.draw();
   }
}
```

### Bước 4

Sử dụng giao diện `Painter` để gửi yêu cầu vẽ các hình 2D.

`PatternDemo.java`
```java
import facadepattern.Painter;

public class PatternDemo {
   public static void main(String[] args) {
      Painter painter = new Painter();
      painter.drawCircle();
      painter.drawTriangle();
      painter.drawSquare();
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra tại `console`.

`console`
```java
Circle::draw()
Triangle::draw()
Square::draw()
```