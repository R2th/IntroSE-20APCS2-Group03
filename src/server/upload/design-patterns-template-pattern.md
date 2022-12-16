Template (bản mẫu) được sử dụng khi chúng ta cần triển khai tính đa hình cho một tính năng chung
được áp dụng cho nhiều kiểu dữ liệu đầu vào khác nhau. Trong Template, các hình thái triển khai
cụ thể của tính năng chung sẽ có bố cục triển khai giống nhau với các giai đoạn được sắp xếp theo 
cùng trình tự. Tuy nhiên, đối với mỗi kiểu dữ liệu đầu vào cụ thể thì chúng ta lại có thể viết code triển 
khai chi tiết khác nhau.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/1522f0d7-6f13-4f03-869f-9ee660077882.png)

Ở đây chúng ta có ví dụ về một phần mềm vẽ các hình phẳng 2D với các class mô tả thực thể
hình tròn `Circle` và hình tam giác `Triangle`. Tính năng chung của `Shape` đó là vẽ hình bằng 
phương thức `draw()` với dữ liệu đầu vào là chính bản thân object mô tả thực thể. Bố cục triển 
khai chung của `draw()` đối với một `Shape` bất kỳ luôn luôn bao gồm 3 bước chính với trình tự
thực hiện là:

1. Chấm các điểm tham chiếu ban đầu `drawSamplePoints()`.
2. Vẽ các nét viền để định hình cho `Shape` trên mặt phẳng vẽ `drawOutlines()`.
3. Tô kín diện tích bên trong hình sau khi đã vẽ viền xong `fillArea()`.

Các class mô tả thực thể triển khai `Shape` sẽ không thể ghi đè phương thức tổng quan `draw()`
và chắc chắn cũng không thể thay đổi trình tự các bước vẽ hình. Tuy nhiên chi tiết của các bước
vẽ sẽ được triển khai chi tiết khác nhau đối với từng kiểu hình vẽ. Ví dụ như `Circle` sẽ chấm
2 điểm tham chiếu ở bước `drawSamplePoints()` và `Triangle` sẽ chấm 3 điểm tham chiếu.

### Bước 1

Tạo `abstract Shape` để thiết lập bản mẫu của phương thức `draw()` với trình tự các bước vẽ hình
được sử dụng chung cho tất cả các kiểu hình vẽ. Ở đây để đảm bảo `draw()` sẽ không bị `override`
ở các class mô tả thực thể `Circle` và `Triangle` thì chúng ta cần sử dụng khóa `final`.

`templatepattern/Shape.java`
```java
package templatepattern;

public abstract class Shape {
   protected String name;

   public final void draw() {
      drawSamplePoints();
      drawOutlines();
      fillArea();
   }

   protected abstract void drawSamplePoints();
   protected abstract void drawOutlines();
   protected abstract void fillArea();
}
```

### Bước 2

Tạo các class mô tả thực thể hình tròn `Circle` và hình tam giác `Triangle`. Ở đây chúng ta
cũng sẽ tạo thêm một class hỗ trợ mô tả điểm `Point` với 2 tọa độ `(x, y)` trong mặt phẳng vẽ.

`templatepattern/Point.java`
```java
package templatepattern;

public class Point {
   private int x;
   private int y;

   public Point(
      int x,
      int y
   ) {
      this.x = x;
      this.y = y;
   }

   public int getX() {
      return x;
   }

   public int getY() {
      return y;
   }
}
```

`templatepattern/Circle.java`
```java
package templatepattern;

public class Circle
extends Shape {
   private Point center;
   private int radius;

   public Circle() {
      this.name = "hình tròn";
   }

   public void setCenter(Point p) {
      center = p;
   }

   public void setRadius(int r) {
      radius = r;
   }

   @Override
   protected void drawSamplePoints() {
      System.out.println("Bước 1:");
      System.out.println(
         "   Chấm điểm O sử dụng làm tâm hình tròn ở tọa độ: " +
         "(" + center.getX() + ", " + center.getY() +")"
      );
      System.out.println(
         "   Chấm điểm A sử dụng làm điểm bắt đầu vẽ nét viền ở tọa độ: " +
         "(" + center.getX() + ", " + (center.getY()-radius) +")"
      );
   }

   @Override
   protected void drawOutlines() {
      System.out.println("Bước 2:");
      System.out.println("   Vẽ nét viền đường tròn từ điểm A xoay quanh tâm O...");
   }

   @Override
   protected void fillArea() {
      System.out.println("Bước 3:");
      System.out.println("   Tô kín diện tích bên trong đường tròn vừa vẽ...");
   }
}
```

`templatepattern/Triangle.java`
```java
package templatepattern;

public class Triangle
extends Shape {
   private Point A;
   private Point B;
   private Point C;

   public Triangle() {
      this.name = "hình tam giác";
   }

   public void setA(Point p) {
      A = p;
   }

   public void setB(Point p) {
      B = p;
   }

   public void setC(Point p) {
      C = p;
   }

   @Override
   protected void drawSamplePoints() {
      System.out.println("Bước 1:");
      System.out.println(
         "   Chấm điểm A ở tọa độ: " +
         "(" + A.getX() + ", " + A.getY() +")"
      );
      System.out.println(
         "   Chấm điểm B ở tọa độ: " +
         "(" + B.getX() + ", " + B.getY() +")"
      );
      System.out.println(
         "   Chấm điểm C ở tọa độ: " +
         "(" + C.getX() + ", " + C.getY() +")"
      );
   }

   @Override
   protected void drawOutlines() {
      System.out.println("Bước 2:");
      System.out.println("   Vẽ nét viền nối từ A đến B...");
      System.out.println("   Vẽ nét viền nối từ B đến C...");
      System.out.println("   Vẽ nét viền nối từ C đến A...");
   }

   @Override
   protected void fillArea() {
      System.out.println("Bước 3:");
      System.out.println("   Tô kín diện tích bên trong các đường vừa vẽ...");
   }
}
```

### Bước 3

Viết code `main` để thử tính năng `draw()` của `Circle` và `Triangle`.

`PatternDemo.java`
```java
import templatepattern.Circle;
import templatepattern.Point;
import templatepattern.Shape;
import templatepattern.Triangle;

public class PatternDemo {
   public static void main(String[] args) {
      // Tạo object mô tả hình tròn có tọa độ tâm (10, 20)
      // và độ dài đường kính là 100
      System.out.println("========== [ Vẽ một hình tròn ] ==========");
      Circle circle = new Circle();
      circle.setCenter(new Point(10, 20));
      circle.setRadius(100);
      circle.draw();

      // Tạo object mô tả hình tam giác với 3 điểm
      // A (10, 20) và B (20, -30) và C (0, -20)
      System.out.println("========== [ Vẽ một hình tam giác ] ==========");
      Triangle triangle = new Triangle();
      triangle.setA(new Point(10, 20));
      triangle.setB(new Point(20, -30));
      triangle.setC(new Point(0, -20));
      triangle.draw();
   }
}
```

### Bước 4

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
========== [ Vẽ một hình tròn ] ==========
Bước 1:
   Chấm điểm O sử dụng làm tâm hình tròn ở tọa độ: (10, 20)
   Chấm điểm A sử dụng làm điểm bắt đầu vẽ nét viền ở tọa độ: (10, -80)
Bước 2:
   Vẽ nét viền đường tròn từ điểm A xoay quanh tâm O...
Bước 3:
   Tô kín diện tích bên trong đường tròn vừa vẽ...
========== [ Vẽ một hình tam giác ] ==========
Bước 1:
   Chấm điểm A ở tọa độ: (10, 20)
   Chấm điểm B ở tọa độ: (20, -30)
   Chấm điểm C ở tọa độ: (0, -20)
Bước 2:
   Vẽ nét viền nối từ A đến B...
   Vẽ nét viền nối từ B đến C...
   Vẽ nét viền nối từ C đến A...
Bước 3:
   Tô kín diện tích bên trong các đường vừa vẽ...
```