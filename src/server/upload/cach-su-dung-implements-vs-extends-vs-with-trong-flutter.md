Trong bài đăng này, tôi sẽ đề cập đến Implements v/s Extends v/s With.Là các từ khóa trong Dart.

### Introduction

Nếu bạn đang phát triển một ứng dụng Flutter, bạn hẳn đã thấy rất nhiều trường hợp sử dụng Implements v/s Extends v/s With. Đối với một người chưa bao giờ làm việc với Dart trước đây, sự khác biệt giữa các từ khóa này là không rõ ràng.
Trong bài đăng này, tôi sẽ đi sâu về các từ khóa này để chia sẻ hiểu biết của tôi về Flutter và Dart.

### ABSTRACT
Như trong bất kỳ ngôn ngữ OOP nào, một lớp trừu tượng không thể được khởi tạo trực tiếp. Trong Dart, bạn chỉ có thể sử dụng từ khóa `abstract` trên các lớp vì các phương thức trừu tượng chỉ đơn giản là không có phần thân. Hãy cùng nhau kiểm tra ví dụ này:


```Dart
/// This is an abstract class.
abstract class Example {
  /// This is an abstract method because it has no body.
  void methodOne();

  /// This is NOT an abstract method because it has a body.
  void methodTwo() {}
}

/// This must be an abstract class too!
abstract class AnotherExample extends Example {}

```

Class AnotherExample cũng trừu tượng vì nó không ghi đè lên tất cả các phương thức trừu tượng của lớp cha. Khi bạn muốn ghi đè một hoặc nhiều phương thức, chỉ cần sử dụng chú thích `@override` và đảm bảo sử dụng cùng một tên. Lưu ý rằng trong Dart, bạn cũng có thể ghi đè các phương thức không trừu tượng nhưng đây được coi là một cách thực hành không tốt; chỉ các phương thức trừu tượng nên được ghi đè.

```Dart

/// This is an abstract class.
abstract class Example {
  /// This is an abstract method because it has no body.
  void methodOne();

  /// This is an abstract getter.
  int get calculate;

  /// This is NOT an abstract method because it has a body.
  void methodTwo() {}
}

/// This is a concrete class
class AnotherExample extends Example {
  @override
  void methodOne() {
    print('hello!');
  }

  @override
  int get calculate => 1;
}
```

Getters và setters cũng có thể bị ghi đè. Điều quan trọng cần ghi nhớ là bạn không cần ghi đè tất cả các phương thức trong lớp cha khi sử dụng `extends`.

### INTERFACES

Trái ngược với các ngôn ngữ lập trình khác, Dart không có từ khóa `interface` và bạn phải sử dụng các lớp để tạo `interfaces`. Bất kỳ lớp nào cũng được phép triển khai một hoặc nhiều `interfaces`.

```Dart
/// This is an abstract class but we treat it as an "Interface" because we're going to use 
/// 'implements' on this type (rather than 'extends').
abstract class Example {
  void methodOne();
  void methodTwo() {}

  int get calculate;
}

/// This is a concrete class.
class AnotherExample implements Example {
  @override
  void methodOne() {
    print('hello1!');
  }

  @override
  void methodTwo() {
    print('hello 2!');
  }

  @override
  int get calculate => 1;
}

```

Khi sử dụng các `implements`, bạn phải ghi đè mọi phương thức được khai báo trong lớp cha. Với `extends`, bạn có thể không ghi đè hoặc ghi đè nhiều phương thức (vì vậy bạn không bị buộc phải xác định lại tất cả chúng). Bạn cũng có thể sử dụng một lớp thông thường làm `interface`:

```Dart
class Example {
  void method() => print('Hi');
}

class AnotherExample implements Example {
  @override
  void method() => print('Hello');
}
```

Một lần nữa, vì bạn đang sử dụng `implements`, bạn phải ghi đè tất cả các phương thức của lớp cha (ngay cả khi chúng không trừu tượng và có body). Để tránh nhầm lẫn và code clean, bạn nên luôn sử dụng các lớp trừu tượng làm `interface`. Trong Dart có hỗ trợ multiple interfaces :

```Dart
abstract class InterfaceOne {
  void one();
}

abstract class InterfaceTwo {
  void two();
}

class Example implements InterfaceOne, InterfaceTwo {
  @override
  void one() {}

  @override
  void two() {}
}
```

### MIXINS

Mixin là một loại lớp có thể được "associated" với một lớp khác để sử dụng lại các đoạn code mà không cần sử dụng tính kế thừa. Nó yêu cầu từ khóa `with`:

```Dart
mixin Breathing {
  void swim() => print("Breathing");
}

mixin Walking {
  void walk() => print("Walking");
}

mixin Coding {
  void code() => print("print('Hello world!')");
}

/// This class now has the `walk()` method
class Human with Walking {}

/// This class now has the `walk()` and `code()` methods
class Developer with Walking, Coding {}
```

Một lớp có thể có vô số mixin. Khi bạn gán một mixin cho một lớp, nó sẽ tự động có quyền truy cập vào tất cả các phương thức được khai báo trong mixin đó:

```Dart
mixin BallUtils {
  double ballVolume(double radius) {
    return 4 / 3 * 3.14 * pow(radius, 3);
  }
}

/// A model class that defines some statistics of a football team.
abstract class FootballTeam with BallUtils {
  Strategy freeKickStrategy();
  int get offSidesCount;
}

class Team1 extends FootballTeam {}
class Team2 extends FootballTeam {}

// A Flutter widget that displays info of a volleyball pitch.
class VolleyballPitch extends StatelessWidget with BallUtils {
  const VolleyballPitch();

  @override
  Widget build(BuildContext context) {
    // code...
  }
}
```
Kết quả:
![](https://images.viblo.asia/395b0367-3a97-4f59-8ef0-91cba32c3df3.png)
Như bạn thấy, các chức năng được “imported” từ các mixin. Nói chung, mixin rất hữu ích khi các lớp có lôgic hoặc model kế thừa khác nhau, có các phương thức giống hệt nhau mà bạn không muốn sao copy / paste. Đây là một ví dụ đơn giản:

```Dart
/// Một lớp mô hình xác định một số thống kê của một đội bóng đá.
mixin BallUtils {
  double ballVolume(double radius) {
    return 4 / 3 * 3.14 * pow(radius, 3);
  }
}

/// A model class that defines some statistics of a football team.
abstract class FootballTeam with BallUtils {
  Strategy freeKickStrategy();
  int get offSidesCount;
}

class Team1 extends FootballTeam {}
class Team2 extends FootballTeam {}

// A Flutter widget that displays info of a volleyball pitch.
class VolleyballPitch extends StatelessWidget with BallUtils {
  const VolleyballPitch();

  @override
  Widget build(BuildContext context) {
    // code...
  }
}
```

Nếu bạn muốn, bạn cũng có thể hạn chế `mixin` chỉ được áp dụng trên một số loại nhất định bằng cách sử dụng từ khóa `on`:

```Dart
mixin BallUtils on Widget {
  // code...
}

/// This code DOESN'T work because 'FootballTeam' is not a subtype of 'Widget'
abstract class FootballTeam with BallUtils {
  // code...
}

// This works because 'StatelessWidget' is a subtype of 'Widget'
class VolleyballPitch extends StatelessWidget with BallUtils {
  // code...
}
```

### SUMMARY
**EXTENDS**
- Đây là kế thừa OOP điển hình có thể được sử dụng khi bạn muốn thêm các tính năng mới trong một lớp con.

- Khi bạn sử dụng `class B extends A {}`, bạn **KHÔNG** bị buộc phải ghi đè mọi phương thức của lớp A. Bạn có thể ghi đè bao nhiêu phương thức tùy thích.

- Dart chỉ hỗ trợ kế thừa đơn.

**IMPLEMENTS**
- `Interfaces` hữu ích khi bạn không muốn cung cấp triển khai các phương thức mà chỉ cung cấp API của chúng. 

- Khi bạn sử dụng `class B implements A {}`, bạn phải ghi đè mọi phương thức của lớp A.

- Bạn có thể sử dụng `implements` với một hoặc nhiều lớp.

**MIXIN**

- Mixin rất hữu ích khi bạn cần chia sẻ code mà không cần sử dụng tính năng thừa kế.

- Khi bạn sử dụng `class B with A {}`, bạn `importing` mọi phương thức của mixin A vào lớp B. Theo tùy chọn, việc sử dụng `mixin` có thể bị giới hạn ở một loại nhất định bằng cách sử dụng từ khóa `on`.

- Bạn có thể sử dụng `with` một hoặc nhiều `mixin`.

### Tham khảo
https://www.topcoder.com/thrive/articles/dart-differences-between-extends-implements-and-mixin