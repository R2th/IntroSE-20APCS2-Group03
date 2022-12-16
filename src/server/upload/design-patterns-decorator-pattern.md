Decorator pattern cho phép người dùng thêm chức năng mới vào đối tượng hiện tại mà không làm thay đổi cấu trúc của nó. Kiểu thiết kế này có cấu trúc dưới dạng mô hình này hoạt động như một lớp bao bọc cho lớp hiện có.
Mô hình này tạo ra một decorator class   và cung cấp thêm chức năng giữ các method class nguyên vẹn.
# Đạt vấn đề:
Khi bạn để bạn hiểu về Decorator Pattern -> Bạn muốn mua 1 món quà tặng cho bán gái thù sẽ thực hiện theo trình tự :
Mua quà thô  -> đóng hộp -> gói quà.
Trình tự chia thành 3 phần : món quà, chiếc hộp và giấy gói. "Decor" là để món quà bắt măt hơn.
# Thực hiện:
Chúng ta sẽ tạo ra một Shape interface và các lớp cụ thể implementing  Shape interface. Sau đó chúng ta sẽ tạo một abstract decorator ShapeDecorator implementing  Shape interface và có đối tượng Shape làm biến dụ của nó.
RedShapeDecorator là lớp học implementing ShapeDecorator.
![](https://images.viblo.asia/66675185-c0e3-45c9-8d25-f5cdbf592ff0.jpg)
## Step 1:
Tạo 1 interface.
### Shape.java
```
public interface Shape {
   void draw();
}
```
## Step 2:
Tạo các concrete classe implementing cùng một giao diện.
### Rectangle.java
```
public class Rectangle implements Shape {

   @Override
   public void draw() {
      System.out.println("Shape: Rectangle");
   }
}
```
### Circle.java
```
public class Circle implements Shape {

   @Override
   public void draw() {
      System.out.println("Shape: Circle");
   }
}
```
## Step 3 :
Tạo abstract decorator class implementing giao diện Shape
### ShapeDecorator.java
```
public abstract class ShapeDecorator implements Shape {
   protected Shape decoratedShape;

   public ShapeDecorator(Shape decoratedShape){
      this.decoratedShape = decoratedShape;
   }

   public void draw(){
      decoratedShape.draw();
   }	
}
```
## Step 4:
Tạo concrete decorator class extending lớp ShapeDecorator
### RedShapeDecorator.java
```
public class RedShapeDecorator extends ShapeDecorator {

   public RedShapeDecorator(Shape decoratedShape) {
      super(decoratedShape);		
   }

   @Override
   public void draw() {
      decoratedShape.draw();	       
      setRedBorder(decoratedShape);
   }

   private void setRedBorder(Shape decoratedShape){
      System.out.println("Border Color: Red");
   }
}
```
## Step 5:
Sử dụng RedShapeDecorator để trang trí các Shape objects.
### DecoratorPatternDemo.java
```
public class DecoratorPatternDemo {
   public static void main(String[] args) {

      Shape circle = new Circle();

      Shape redCircle = new RedShapeDecorator(new Circle());

      Shape redRectangle = new RedShapeDecorator(new Rectangle());
      System.out.println("Circle with normal border");
      circle.draw();

      System.out.println("\nCircle of red border");
      redCircle.draw();

      System.out.println("\nRectangle of red border");
      redRectangle.draw();
   }
}
```
## Step 6:
### Kết quả:
```
Circle with normal border
Shape: Circle

Circle of red border
Shape: Circle
Border Color: Red

Rectangle of red border
Shape: Rectangle
Border Color: Red
```
Link tham khảo: https://www.tutorialspoint.com/design_pattern/decorator_pattern.htm