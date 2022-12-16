### 1. Giới thiệu
Dart là ngôn ngữ lập trình cho Flutter- bộ công cụ giao diện người dùng của Google để xây dựng các ứng dụng Mobile, Web và Desktop app đẹp, được biên dịch nguyên bản từ một cơ sở mã code duy nhất.

Theo cá nhân mình thì Dart giống Java 70 ~ 80%, vì vậy nếu những bạn nào đã sử dụng Java thì quá tiện. Với những bạn thấy nó mới tinh, hay là ngôn ngữ lập trình đầu tiên của mình thì bắt đầu cũng ok thôi, không thành vấn đề ;) 

Qua bài viết này mình sẽ trình bày cơ bản: cách tạo một constructor, các cách khác nhau để chỉ định tham số, khi nào và làm thể nào để tạo getters và setters, cách Dart xử lý bảo mật, functional programming trong Dart, ...

Để bắt đầu bạn có thể sử dụng một IDE ví dụ như IntelliJ, Android Studio, Visual Studio Code, ... thậm chỉ đơn giản nhất là có thể vào trình duyện web và mở trang [dartpad.dev](https://dartpad.dev/) để chạy các mã code của mình. Nào chúng ta bắt đầu thôi.
### 2. Tạo một Dart class đơn giản
Class Bicycle chứa một vài private instance variable với getters và setters. Hàm main() khởi tạo Bicycle và in nó ra trong console.

![](https://images.viblo.asia/eaaeb02a-4cfe-4769-97cc-5b2815227617.png)

Mọi người có thể viết đoạn code dưới đây và cùng phân tích nó
```Dart
class Bicycle {
  int cadence;
  int _speed = 0;
  int get speed => _speed;
  int gear;

  Bicycle(this.cadence, this.gear);

// phanh
  void applyBrake(int decrement) {
    _speed -= decrement;
  }

// tăng tốc
  void speedUp(int increment) {
    _speed += increment;
  }

  @override
  String toString() => 'Bicycle: $_speed mph';
}

void main() {
  var bike = Bicycle(2, 1);
  print(bike);
}
```
- Phương thức chính của Dart được đặt tên là main (). Nếu bạn cần quyền truy cập vào các đối số dòng lệnh, bạn có thể thêm 
```Dart
main(List<String> args)
```
- Phương thức main () sống ở cấp cao nhất. Trong Dart, bạn có thể xác định mã bên ngoài các lớp. Tất cả các biến, hàm, getters và setters đều có thể tồn tại bên ngoài các lớp.
- Cả main () và Bicycle đều không được khai báo là public vì tất cả các định danh đều là public theo mặc định. Dart không có các từ khóa cho public, private hoặc protected.
- Nếu Class Bicycle có 3 tham số : cadence, speed và gear, ta có thể tạo constructor như sau
```Dart
Bicycle(this.cadence, this.speed, this.gear);
```
constructors này không có phần thân và có dấu ; cuối, sử dụng cách này khá là tiện dụng để gán giá trị cho instance variables. Đoạn mã trên tương đương với đoạn code sau (như Java)
```Dart
Bicycle(int cadence, int speed, int gear) {
  this.cadence = cadence;
  this.speed = speed;
  this.gear = gear;
}
```
- Do biến speed ta muốn nó là private và chỉ có quyền đọc thì ta thêm dấu _ đằng trước, khởi tạo nó bằng 0 và thêm một phương thức get với dấu => như trên. Nên trong constructor ta remove biến này đi. Dart compiler nhận biết những biến hay thư viện nào được khai báo là dấu gạch dưới là private.
- Không giống như Java mà như Kotlin, Dart cung cấp getters và setters ngầm định cho tất cả các biến công khai (public). Ta không cần phải xác định getters hoặc setters của riêng mình trừ khi ta muốn thực thi các biến chỉ đọc hoặc ghi, tính toán hoặc xác minh một giá trị ở nơi khác.
### 3. Sử dụng các tham số tuỳ chọn
Trong Java nếu bạn tạo nhiều constructors cho một class thì các constructors này sẽ cũng tên với class nhưng khác nhau về số lượng hoặc kiểu tham số, sẽ như thế này:
```Java
public class Rectangle {
    public int width = 0;
    public int height = 0;
    public Point origin;

    // four constructors
    public Rectangle() {
        origin = new Point(0, 0);
    }
    public Rectangle(Point p) {
        origin = p;
    }
    public Rectangle(int w, int h) {
        origin = new Point(0, 0);
        width = w;
        height = h;
    }
    public Rectangle(Point p, int w, int h) {
        origin = p;
        width = w;
        height = h;
    }

    // a method for moving the rectangle
    public void move(int x, int y) {
        origin.x = x;
        origin.y = y;
    }

    // a method for computing the area of the rectangle
    public int getArea() {
        return width * height;
    }
}
```
Dart không làm như thế này mà sẽ là:
```Dart
Rectangle({this.origin = const Point(0, 0), this.width = 0, this.height = 0});
```
chỉ với một dòng nó đã khai báo được 1 class và thay thế 4 constructors trong Java. this.origin, this.width và this.height là các tham số tùy chọn, có khi khi tạo instance thì có hay không có cũng được. Chúng được đặt trong dấu ngoặc nhọn. Cú pháp this.origin = const Point (0, 0) chỉ định giá trị mặc định của Point (0,0) cho instance variable gốc.

Chúng ta có thể override hàm toString()
```Dart
@override
String toString() =>
      'Origin: (${origin.x}, ${origin.y}), width: $width, height: $height';
```
Viết code trong hàm main:
```Dart
main() {
  print(Rectangle(origin: const Point(10, 20), width: 100, height: 200));
  print(Rectangle(origin: const Point(10, 10)));
  print(Rectangle(width: 200));
  print(Rectangle());
}
```
Và chạy để xem output:
```Dart
Origin: (10, 20), width: 100, height: 200
Origin: (10, 10), width: 0, height: 0
Origin: (0, 0), width: 200, height: 0
Origin: (0, 0), width: 0, height: 0
```
### 4. Tạo một factory
Factories, một mẫu thiết kế thường được sử dụng trong Java, có một số lợi thế so với việc khởi tạo đối tượng trực tiếp, chẳng hạn như ẩn các chi tiết của việc khởi tạo, cung cấp khả năng trả về một kiểu con của kiểu trả về của factory và tùy chọn trả về một đối tượng hiện có thay vì một đối tượng mới.

Ở đây tôi sẽ trình bày 2 cách để tạo một shape-creation factory:
- Tạo một top-level function.
- Tạo một factory constructor.

Ta sử dụng ví dụ Shapes, ví dụ này khởi tạo các shapes và in tính toán diện tích của chúng:
```Dart
import 'dart:math';

abstract class Shape {
  num get area;
}

class Circle implements Shape {
  final num radius;
  Circle(this.radius);
  num get area => pi * pow(radius, 2);
}

class Square implements Shape {
  final num side;
  Square(this.side);
  num get area => pow(side, 2);
}

main() {
  final circle = Circle(2);
  final square = Square(2);
  print(circle.area);
  print(square.area);
}
```
Đây là output
```Dart
12.566370614359172
4
```
- Dart có hỗ trợ abstract class
- Có thể define nhiều class trong một file
- Ngoài dart:match thì dart:core, dart:async, dart:convert, và dart:collection cũng là các thư viện cốt lõi của Dart

Option 1: Tạo một top-level function, tức function không thuộc một Class nào 
```Dart
Shape shapeFactory(String type) {
  if (type == 'circle') return Circle(2);
  if (type == 'square') return Square(2);
  throw 'Can\'t create $type.';
}
```
gọi hàm factory bằng cách thay thế hai dòng đầu tiên trong phương thức main ():
```Dart
  final circle = shapeFactory('circle');
  final square = shapeFactory('square');
```
Ta chạy và output sẽ giống như lúc trước

Option 2: Tạo một factory constructor. Thêm một constructor trong abstract class Shape
```Dart
abstract class Shape {
  factory Shape(String type) {
    if (type == 'circle') return Circle(2);
    if (type == 'square') return Square(2);
    throw 'Can\'t create $type.';
  }
  num get area;
}
```
Thay thế hai dòng đầu tiên của main () bằng đoạn mã sau:
```Dart
  final circle = Shape('circle');
  final square = Shape('square');
```
Xóa 2 hàm shapeFactory () mà ta đã thêm trước đó. sau đó chạy thì kết quả vẫn như 2 lần trước.
### 5. Implement một interface
Dart không có từ khoá **interface** bởi ***every class defines an interface.***

Thêm một lớp CircleMock và implement Circle interface của mục 4. Và ta bắt buộc phải xác định các biến thể hiện area và radius
```Dart
class CircleMock implements Circle {
  num area = 0;
  num radius = 0;
}
```
### 6. Sử dụng Dart cho functional programming
Trong functional programming, ta có thể làm những việc sau:
- Truyền functions (hàm hay phương thức) như một tham số
- Gán một function cho một biến.
- Phân rã cấu trúc một hàm có nhiều tham số thành nhiều hàm mà mỗi hàm nhận mội tham số (gọi là currying)
- Tạo một hàm không tên có thể được sử dụng như một giá trị không đổi (còn được gọi là biểu thức lambda; biểu thức lambda đã được thêm vào Java trong bản phát hành JDK 8).

Dart hỗ trợ tất cả các tính năng đó. Trong Dart, các hàm là các object và có một kiểu, Function. Điều này có nghĩa là các hàm có thể được gán cho các biến hoặc được chuyển làm đối số cho các hàm khác. Ta cũng có thể gọi một thể hiện của lớp Dart như thể nó là một hàm, như ví dụ:
```Dart
String scream(int length) => "A${'a' * length}h!";

main() {
  final values = [1, 2, 3, 5, 10, 50];
  for (var length in values) {
    print(scream(length));
  }
}
```
output:
```Dart
Aah!
Aaah!
Aaaah!
Aaaaaah!
Aaaaaaaaaaah!
Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah!
```
Khi sử dụng phép nội suy chuỗi, chuỗi $ {'a' * length} được đánh giá là "ký tự 'a' lặp lại length lần.

Tiếp theo ta loại bỏ vòng lặp for () {...} bắt buộc trong main () và thay thế nó bằng một dòng mã sử dụng chuỗi phương thức:
```Dart
values.skip(1).take(3).map(scream).forEach(print);
```
Chạy thì output sẽ là:
```Dart
Aaah!
Aaaah!
Aaaaaah!
```
skip(1) có nghĩa là loại bỏ giá trị đầu tiên, take(3) là chọn ra 3 giá trị tiếp theo, ở đây là 2, 3 và 5. Các giá trị còn lại bỏ qua.
### 7. Tổng kết
Qua bài viết này thì bạn sẽ biết được một số điểm khác biệt giữa Dart và Java. Dart khá dễ học, ngoài ra các core lib và danh sách các package phong phú sẽ giúp tăng năng suất code của bạn ;) . Dart quy mô tốt cho các ứng dụng lớn. Hàng trăm kỹ sư của Google sử dụng Dart để viết các ứng dụng quan trọng mang lại nhiều doanh thu cho Google. Tại sao chúng ta lại không :))

Cảm ơn bạn đã theo dõi bài viết. Để hoàn thành mình đã tham khảo của trang chủ https://dart.dev/