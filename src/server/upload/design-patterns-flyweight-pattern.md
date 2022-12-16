Flyweight được sử dụng chủ yếu để giảm thiểu số lượng `object` cần được khởi tạo để tiết kiệm
bộ nhớ đệm và cải thiện hiệu năng hoạt động của phần mềm. Flyweight được xếp vào nhóm các
pattern Kiến Trúc.

Flyweight luôn cố gắng tái sử dụng những `object` cùng loại đã tồn tại trước đó và chỉ khởi tạo
`object` mới khi không tìm thấy `object` nào phù hợp.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/29993b81-858f-43c6-8cbc-389528b807a1.png)

Ở đây chúng ta có một phần mềm vẽ các hình tròn 2D. Phần mềm này sẽ vẽ khoảng 20 hình tròn
có màu sắc và vị trí khác nhau. Tuy nhiên nhờ có Flyweight, chúng ta sẽ chỉ cần tạo ra 5 `object`
mô tả thực thể hình tròn tương ứng với 5 màu sắc khả dụng.

Chúng ta có `class` mô tả thực thể `Circle` và sau đó là `Factory` được định nghĩa để thực hiện
công việc khởi tạo các `object Circle` khi cần thiết. Tuy nhiên, ở đây `Factory` có một `HashMap`
để lưu lại những `object Circle` đã từng khởi tạo với mỗi màu sắc. Do đó, khi có yêu cầu khởi
tạo một `object Circle` với một màu sắc cụ thể, `Factory` sẽ kiểm tra xem trước đó đã tạo ra
thứ tương tự hay chưa. Nếu như có `object` phù hợp được tìm thấy trong `HashMap` đã lưu trữ
thì sẽ trả về `object` đó, còn nếu như chưa có thì khởi tạo `object` mới và đồng thời lưu lại.

### Bước 1

Tạo `class Circle` mô tả thực thể hình tròn 2D.

`flyweightpatter/Circle.java`
```java
package flyweightpattern;

public class Circle {
   private String color;
   private int x;
   private int y;
   private int r;

   public Circle(String color) {
      this.color = color;
   }

   public void setX(int x) {
      this.x = x;
   }

   public void setY(int y) {
      this.y = y;
   }

   public void setR(int r) {
      this.r = r;
   }

   public void draw() {
      System.out.println(
         "Circle::Draw() [ Color: " + color +
         ", x: " + x + ", y: " + y +
         ", radius: " + r + " ]"
      );
   }
}
```

### Bước 2

Tạo `Factory` thực hiện công việc khởi tạo các `object Circle`.

`flyweightpattern/Factory.java`
```java
package flyweightpattern;

import java.util.HashMap;

public class Factory {
   private static final HashMap<String, Circle> circleMap = new HashMap<String, Circle>();

   public static Circle getCircle(String color) {
      if (circleMap.containsKey(color)) {
         return circleMap.get(color);
      }
      else {
         System.out.println("Creating circle of color: " + color);
         Circle c = new Circle(color);
         circleMap.put(color, c);
         return c;
      }
   }
}
```

### Bước 3

Sử dụng `Factory` để yêu cầu lấy các `object Circle` bằng cách truyền vào thông tin về màu sắc.

`PatternDemo.java`
```java
import flyweightpattern.Circle;
import flyweightpattern.Factory;

public class PatternDemo {
   private static final String colorList[] = { "Red", "Green", "Blue", "White", "Black" };

   public static void main(String[] args) {
      for (int i=0; i<20; i++) {
         Circle c = Factory.getCircle(randomCollor());
         c.setX(randomX());
         c.setY(randomY());
         c.setR(100);
         c.draw();
      }
   }

   private static String randomCollor() {
      return colorList[(int) (Math.random() * colorList.length)];
   }

   private static int randomX() {
      return (int) (Math.random() * 100);
   }

   private static int randomY() {
      return (int) (Math.random() * 100);
   }
}
```

### Bước 4

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
Creating circle of color: Red
Circle::Draw() [ Color: Red, x: 20, y: 91, radius: 100 ]
Circle::Draw() [ Color: Red, x: 93, y: 33, radius: 100 ]
Creating circle of color: White
Circle::Draw() [ Color: White, x: 49, y: 40, radius: 100 ]
Creating circle of color: Green
Circle::Draw() [ Color: Green, x: 82, y: 60, radius: 100 ]
Circle::Draw() [ Color: White, x: 27, y: 73, radius: 100 ]
Creating circle of color: Black
Circle::Draw() [ Color: Black, x: 66, y: 5, radius: 100 ]
Circle::Draw() [ Color: Red, x: 71, y: 69, radius: 100 ]
Circle::Draw() [ Color: White, x: 39, y: 87, radius: 100 ]
Circle::Draw() [ Color: Black, x: 82, y: 25, radius: 100 ]
Circle::Draw() [ Color: Green, x: 24, y: 69, radius: 100 ]
Circle::Draw() [ Color: Black, x: 83, y: 17, radius: 100 ]
Circle::Draw() [ Color: Red, x: 60, y: 27, radius: 100 ]
Circle::Draw() [ Color: Black, x: 48, y: 73, radius: 100 ]
Circle::Draw() [ Color: Red, x: 99, y: 10, radius: 100 ]
Circle::Draw() [ Color: Red, x: 86, y: 74, radius: 100 ]
Creating circle of color: Blue
Circle::Draw() [ Color: Blue, x: 94, y: 85, radius: 100 ]
Circle::Draw() [ Color: White, x: 87, y: 51, radius: 100 ]
Circle::Draw() [ Color: Red, x: 82, y: 81, radius: 100 ]
Circle::Draw() [ Color: White, x: 94, y: 2, radius: 100 ]
Circle::Draw() [ Color: White, x: 75, y: 74, radius: 100 ]
```