Bridge pattern được sử dụng khi chúng ta muốn tách một abtraction từ implementation của nó để cả hai có thể thay đổi một cách độc lập với nhau.
Bridge Pattern là một mẫu cấu trúc (Structural Pattern) => Thể hiện rõ sự phân cấp giữa giao diện trong cả interface và các thành phần implement.
Chúng tôi đang trình bày cách sử dụng  Bridge Pattern thông qua ví dụ sau, trong đó một vòng tròn có thể được vẽ bằng các màu khác nhau bằng cách sử dụng cùng một phương thức lớp trừu tượng nhưng các lớp trình triển khai cầu khác nhau.
# Thực hiện:
Chúng tôi có một  DrawAPI interface hoạt động như một bridge implementer và các lớp concrete RedCircle, GreenCircle triển khai DrawAPI interface.
Shape là một lớp abstract và sẽ sử dụng đối tượng của DrawAPI. BridgePatternDemo, lớp demo của chúng ta sẽ sử dụng lớp Shape để vẽ các vòng tròn màu khác nhau.
![](https://images.viblo.asia/780a9d4e-4fa3-4290-a771-5249892c587b.jpg)
## Step 1:
Tạo bridge implementer interface.
### DrawAPI.java
```
public interface DrawAPI {
   public void drawCircle(int radius, int x, int y);
}
```

## Step 2:
Tạo concrete bridge implementer classes implementing của DrawAPI interface.
### RedCircle.java
```
public class RedCircle implements DrawAPI {
   @Override
   public void drawCircle(int radius, int x, int y) {
      System.out.println("Drawing Circle[ color: red, radius: " + radius + ", x: " + x + ", " + y + "]");
   }
}
```
### GreenCircle.java
```
public class GreenCircle implements DrawAPI {
   @Override
   public void drawCircle(int radius, int x, int y) {
      System.out.println("Drawing Circle[ color: green, radius: " + radius + ", x: " + x + ", " + y + "]");
   }
}
```
## Step 3
Tạo một abstract  Shape bằng cách sử dụng DrawAPI interface.
### Shape.java
```
public abstract class Shape {
   protected DrawAPI drawAPI;
   
   protected Shape(DrawAPI drawAPI){
      this.drawAPI = drawAPI;
   }
   public abstract void draw();	
}
```
## Step 4
Tạo 1 concrete implementing Shape interface.
### Circle.java
```
public class Circle extends Shape {
   private int x, y, radius;

   public Circle(int x, int y, int radius, DrawAPI drawAPI) {
      super(drawAPI);
      this.x = x;  
      this.y = y;  
      this.radius = radius;
   }

   public void draw() {
      drawAPI.drawCircle(radius,x,y);
   }
}
```
## Step 5
Sử dụng các lớp Shape và DrawAPI để vẽ các vòng tròn màu khác nhau.
### BridgePatternDemo.java
```
public class BridgePatternDemo {
   public static void main(String[] args) {
      Shape redCircle = new Circle(100,100, 10, new RedCircle());
      Shape greenCircle = new Circle(100,100, 10, new GreenCircle());

      redCircle.draw();
      greenCircle.draw();
   }
}
```
## Step 6
### Kết quả:
```
Drawing Circle[ color: red, radius: 10, x: 100, 100]
Drawing Circle[  color: green, radius: 10, x: 100, 100]
```