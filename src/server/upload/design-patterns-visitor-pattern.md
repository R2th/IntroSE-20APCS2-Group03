Visitor (hành động khách quan) được sử dụng khi chúng ta muốn triển khai tách rời 
các phương thức xử lý khỏi các class mô tả thực thể. Visitor được xếp vào nhóm các
pattern Hành Vi.

Trong Visitor có 2 giao diện chính được tạo ra để chúng ta có thể triển khai tách rời
các phương thức xử lý khỏi các class mô tả thực thể:

1. Một interface có tên là `Visitor` để mô tả trừu tượng về một hành động khách quan.
Các object mô tả phương thức hành động triển khai `Visitor` sẽ ghé thăm `visit()`
các object mô tả thực thể để truy vấn dữ liệu cần xử lý.
2. Một interface có tên là `Element` để mô tả trừu tượng về đối tượng của hành động.
Các object mô tả thực thể dữ liệu `Element` sẽ tiếp nhận sự ghé thăm của các hành
động khách quan bằng phương thức `accept()`. Ở đây `accept()` sẽ không chứa
code xử lý logic mà chỉ đơn giản là được sử dụng để phát động một phương thức hoạt
động hay một tính năng được mô tả chi tiết bởi một object `Visitor` được chọn.

Với tên gọi được sử dụng cho pattern thì phần mà tác giả thiết kế pattern này muốn
chúng ta chú ý tới là phần đầu tiên. Đó là các object mô tả chi tiết triển khai các hành động
khách quan. Đây cũng là phần sẽ được mở public về phía code client để các đoạn code client 
có thể lựa chọn hành động muốn thực hiện bằng cách sử dụng các class thực tế triển khai 
giao diện `Visitor`.

Ở khía cạnh còn lại thì các class thực thể dữ liệu triển khai `Element` lại thường được ẩn
đối với code client và các object này thường được cung cấp tới code client qua phương 
thức gián tiếp nào đó. Code client sẽ không cần và không nên biết tới chi tiết kiến trúc
của các object thực thể dữ liệu.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/3ef7464b-49a4-4b0e-9063-8e489ea3c21a.png)

Ở đây chúng ta có một phần mềm mô phỏng các hình phẳng 2D với một vài chức năng chính
đó là vẽ `Drawing` và định lượng diện tích các hình `Evaluating`.

Lý do triển khai áp dụng Visitor Pattern ở đây là vì chúng ta muốn tập trung vào việc "quản lý 
các tính năng của phần mềm" và có thể nhìn thoáng qua cấu trúc thư mục code cũng có thể biết 
được những tính năng đang có là gì? Và code triển khai chi tiết của mỗi tính năng sẽ được tập 
trung trong một class `Visitor` cụ thể thay vì được triển khai rời rạc trong các class mô tả thực thể 
`Circle` và `Square`.

Cụ thể là `Drawing` được sử dụng để tách rời việc triển khai phương thức vẽ hình `draw()`
khỏi các class thực thể `Circle` và `Square`; Và đồng thời cũng là nơi tập trung tất cả các phiên bản
khác nhau của phương thức `draw()` tách ra từ các class thực thể. Code triển khai của `draw()`
trong `Circle` được di chuyển vào `Drawing` với tên gọi mới là `visit(Circle c)`, và tương tự thì
`draw()` trong `Square` sẽ có tên gọi mới là `visit(Square s)`.

`Drawing.java`
```
public interface Drawing() {
   Object visit(Circle c);
   Object visit(Square s);
}
```

Một lý do khác để chúng ta triển khai Visitor Pattern đó là tư duy ở trên phương diện thuật toán 
xử lý dữ liệu thay vì phương diện quản lý kiến trúc code. Ở đây chúng ta cung cấp cho code client 
một cấu trúc dữ liệu trừu tượng là `Element` và một phương thức xử lý dữ liệu có tên là `Evaluating` 
có thể áp dụng lên một `Element` để nhận được một giá trị kết quả.

### Bước 1

Tạo cặp interface `Element` và `Visitor` để mô tả giao tiếp giữa object thực thể và object hành động.
Ở đây mục đích là thay thế việc gọi phương thức trực tiếp của object thực thể `shape.draw()`
bằng một phiên đón tiếp sự ghé thăm của object hành động là `shape.accept(new Drawing())`.

`visitorpattern/Element.java`
```java
package visitorpattern;

public interface Element {
   Object accept(Visitor v);
}
```

Lúc này do chưa viết các class thực thể nên chúng ta sẽ tạm để trống interface `Visitor`.

`visitorpattern/Visitor.java`
```java
package visitorpattern;

public interface Visitor {
   // các phiên bản visit() sẽ được bổ sung sau
}
```

### Bước 2

Tạo các class mô tả thực thể hình học 2D là `Circle` và `Triangle`.
Đồng thời triển khai giao diện `Element` cho các class này. Ở đây
chúng ta cũng sẽ tạo thêm class hỗ trợ mô tả điểm `Point` trong mặt
phẳng tọa độ.

Các class này sẽ không để mở `public` về phía code client để tránh việc 
bị ghi đè logic hoạt động. 

`visitorpatter/Point.java`
```java
package visitorpattern;

class Point {
   final int x;
   final int y;

   Point(
      int x,
      int y
   ) {
      this.x = x;
      this.y = y;
   }

   double distanceTo(Point p) {
      int dX = x - p.x;
      int dY = y - p.y;
      return Math.sqrt(dX*dX + dY*dY);
   }

   @Override
   public String toString() {
      return "(" + x + ", " + y + ")";
   }
}
```

`visitorpatter/Circle.java`
```java
package visitorpattern;

class Circle
implements Element {
   Point O;
   int radius;

   @Override
   public Object accept(Visitor v) {
      return v.visit(this);
   }
}
```

`visitorpattern/Square.java`
```java
package visitorpattern;

class Square
implements Element {
   Point A, B, C, D;

   @Override
   public Object accept(Visitor v) {
      return v.visit(this);
   }
}
```

Tới đây thì chúng ta đã biết về 2 class thực thể và có thể bổ sung thêm
2 phương thức `visit()` tương ứng cho interface `Visitor`, để có thể
đảm bảo rằng các class mô tả phương thức hành động khách quan sẽ
phải được triển khai tính đa hình đầy đủ tương đương với mô hình kế thừa
truyền thống của OOP.

Cụ thể là thay vì `override` phương thức abstract `draw()` của một class
cơ sở `Shape` trong code của `Circle` và `Square`, thì ở đây chúng ta
cần đảm bảo `Drawing` sẽ phải có có đủ các phiên bản `overload` của 
`visit()` để có thể áp dụng lên cả `Circle` và `Square`.

`visitorpattern/Visitor.java`
```java
package visitorpattern;

public interface Visitor {
   Object visit(Circle c);
   Object visit(Square s);
}
```

### Bước 3

Triển khai các tính năng vẽ hình `Drawing` và định lượng diện tích hình `Evaluating`.

`visitorpatter/Drawing.java`
```java
package visitorpattern;

public class Drawing
implements Visitor {
   @Override
   public Object visit(Circle c) {
      Point A = new Point(c.O.x, c.O.y + c.radius);
      System.out.println("Bắt đầu vẽ hình tròn...");
      System.out.println("Chấm điểm O làm tâm hình tròn tại tọa độ: " + c.O);
      System.out.println("Chấm điểm A làm điểm bắt đầu vẽ đường tròn tại tọa độ: " + A);
      System.out.println("Vẽ đường tròn tâm O " + c.O + " với bán kính " + c.radius + " bắt đầu từ điểm A " + A);
      System.out.println("Tô kín diện tích bên trong đường tròn vừa vẽ.");

      return c;
   }

   @Override
   public Object visit(Square s) {
      System.out.println("Bắt đầu vẽ hình vuông...");
      System.out.println("Chấm điểm A tại tọa độ: " + s.A);
      System.out.println("Chấm điểm B tại tọa độ: " + s.B);
      System.out.println("Chấm điểm C tại tọa độ: " + s.C);
      System.out.println("Chấm điểm D tại tọa độ: " + s.D);
      System.out.println("Vẽ đoạn thẳng nối từ điểm A " + s.A + " tới điểm B " + s.B);
      System.out.println("Vẽ đoạn thẳng nối từ điểm B " + s.B + " tới điểm C " + s.C);
      System.out.println("Vẽ đoạn thẳng nối từ điểm C " + s.C + " tới điểm D " + s.D);
      System.out.println("Vẽ đoạn thẳng nối từ điểm D " + s.D + " tới điểm A " + s.A);
      System.out.println("Tô kín diện tích bên trong các đường vừa vẽ.");

      return s;
   }
}
```

`visitorpattern/Evaluating.java`
```java
package visitorpattern;

public class Evaluating
implements Visitor {
   @Override
   public Object visit(Circle c) {
      double pi = 3.14;
      return pi * c.radius * c.radius;
   }

   @Override
   public Object visit(Square s) {
      double width = (s.A).distanceTo(s.B);
      return width * width;
   }
}
```

### Bước 4

Viết code client để chạy thử 2 tính năng `Drawing` và `Evaluating` đã được
triển khai xong. Ở đây code client sẽ không thể khởi tạo các object mô tả thực thể
bằng việc trực tiếp sử dụng các class `Circle` và `Square` mà chỉ truy vấn một
mảng các `Element` từ đâu đó. Chúng ta sẽ viết thêm 1 class public `Test` 
trong package `visitorpattern` để cung cấp cho `main` các object thực thể.

`visitorpattern/Test.java`
```java
package visitorpattern;

import java.util.ArrayList;
import java.util.List;

public class Test {
   public static List<Element> generateSomeShapes() {
      List<Element> shapeList = new ArrayList<Element>();

      Circle c = new Circle();
      c.O = new Point(1, 2);
      c.radius = 100;
      shapeList.add(c);

      Square s = new Square();
      s.A = new Point(0, 1);
      s.B = new Point(1, 1);
      s.C = new Point(1, 0);
      s.D = new Point(0, 0);
      shapeList.add(s);

      return shapeList;
   }
}
```

Code client tại `main` sử dụng phương thức static của `Test` để nhận được một `List<Element>`.
Sau đó chạy thử 2 tính năng `Drawing` và `Evaluating` trên mỗi `Element`.

`PatternDemo.java`
```java
import visitorpattern.Drawing;
import visitorpattern.Element;
import visitorpattern.Evaluating;
import visitorpattern.Test;

import java.util.List;

public class PatternDemo {
   public static void main(String[] args) {
      // truy vấn dữ liệu từ đâu đó để có được vài object hình học
      List<Element> shapeList = Test.generateSomeShapes();

      // thực hiện tính năng vẽ hình
      shapeList.forEach((shape) -> {
         System.out.println("==============");
         shape.accept(new Drawing());
      });

      // thực hiện tính năng định lượng diện tích các hình
      shapeList.forEach((shape) -> {
         System.out.println("==============");
         System.out.println("Kiểu hình: " + shape.getClass().getSimpleName());
         System.out.println("Diện tích: " + shape.accept(new Evaluating()));
      });
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
==============
Bắt đầu vẽ hình tròn...
Chấm điểm O làm tâm hình tròn tại tọa độ: (1, 2)
Chấm điểm A làm điểm bắt đầu vẽ đường tròn tại tọa độ: (1, 102)
Vẽ đường tròn tâm O (1, 2) với bán kính 100 bắt đầu từ điểm A (1, 102)
Tô kín diện tích bên trong đường tròn vừa vẽ.
==============
Bắt đầu vẽ hình vuông...
Chấm điểm A tại tọa độ: (0, 1)
Chấm điểm B tại tọa độ: (1, 1)
Chấm điểm C tại tọa độ: (1, 0)
Chấm điểm D tại tọa độ: (0, 0)
Vẽ đoạn thẳng nối từ điểm A (0, 1) tới điểm B (1, 1)
Vẽ đoạn thẳng nối từ điểm B (1, 1) tới điểm C (1, 0)
Vẽ đoạn thẳng nối từ điểm C (1, 0) tới điểm D (0, 0)
Vẽ đoạn thẳng nối từ điểm D (0, 0) tới điểm A (0, 1)
Tô kín diện tích bên trong các đường vừa vẽ.
==============
Kiểu hình: Circle
Diện tích: 31400.0
==============
Kiểu hình: Square
Diện tích: 1.0
```