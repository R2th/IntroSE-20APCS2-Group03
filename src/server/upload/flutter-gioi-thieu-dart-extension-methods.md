[Nguồn](https://resocoder.com/2019/10/31/dart-extension-methods-tutorial-incl-generic-extensions-properties-operators/)

Từ bản phát hành Dart 2.6, các nhà phát triển Flutter đã ra mắt một tính năng thú vị đó là **Extension**. Ta hãy đi tìm hiểu nó.

# Set up Dart 2.6

Có thể khi đọc bài viết này, Dart 2.6 đã sẵn sàng cho việc phát hành chính thức. Nếu thế thì thật tuyệt. Còn nếu không thì bạn hãy tự cài đặt bằng tay nhé.

```
pubspec.yaml
environment:
  sdk: '>=2.6.0 <3.0.0'

```

# Lí do dùng Extension?

Hầu như mọi ngôn ngữ nào cũng hỗ trợ **extension**, mang lại nhiều lợi ích cho Coder. Chúng có thể biến các lớp có sẵn của các nhà phát triển với một loạt các static method thành một *tác phẩm nghệ thuật tuyệt đẹp* của riêng bạn.

Ví dụ Quokka có đoạn mã sau:

```
main.dart
```
```
class StringUtil {
  static bool isValidEmail(String str) {
    final emailRegExp = RegExp(r"^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+");
    return emailRegExp.hasMatch(str);
  }
}

// Usage
main() {
  StringUtil.isValidEmail('someString');
}
```

Có vẻ sử dụng `StringUtil` class là dư thừa. Nếu chúng ta có thể viết như sau thì sao:

``'someString'.isValidEmail;``

# Extension giải quyết điều đó

Thay vì định nghĩa một lớp `util`, bạn có thể định nghĩa một `extension` nó sẽ được áp dụng (`on`) một type nhất định. Sau đó sử dụng `this` để có được `instance` hiện tại, như thể bạn đang xử lý code ở trong một regular class thông thường.

```
main.dart
```
```
extension StringExtensions on String {
  bool get isValidEmail {
    final emailRegExp = RegExp(r"^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+");
    return emailRegExp.hasMatch(this);
  }
}

// Usage
main() {
  'someString'.isValidEmail;
}
```

# Nhiều extensions

Hãy tạo hai `String Extensions` giống hệt nhau để nối chuỗi với nhau bằng khoảng trắng:

```
main.dart
```
```
extension StringExtensions on String {
  String concatWithSpace(String other) {
    return '$this $other';
  }

  // DOCUMENTATION IS SUPPORTED: Concatenates two strings with a space in between.
  String operator &(String other) => '$this $other';
}
```

Sử dụng nó lúc này thật đơn giản:

```
main.dart
```
```
main() {
  'one'.concatWithSpace('two');
  'one' & 'two';
}
```

# Lưu ý vấn đề về kế thừa

Giả sử Quokka muốn thêm extensions vào `int`. Tất nhiên việc này là có thể:

```
main.dart
```
```
extension IntExtensions on int {
  int addTen() => this + 10;
}
```

Nhưng sau đó Quokka lại muốn áp dụng nó cho `double`. Vậy ta lại phải copy code thật mất thời gian.

Quokka lại chợt nhận ra rằng `int` và `double` đều là lớp con của `num`, vậy ta sẽ định nghĩa một extension cho `num`:

```
main.dart
```
```
extension NumExtensions on num {
  num addTen() => this + 10;
}
```

Có vẻ như Quokka đã giải quyết vấn đề. Nhưng... đó chỉ là khi ta chưa chạy thử nó. Vì method trong extension có giá trị trả về là `num` nên nếu bạn gọi đến method đó, bạn cũng chỉ nhận được `num`  mà thôi:

```
main.dart
```
```
main() {
  int anInt = 1.addTen();
  // Run-time error!
  // Putting a 'num' which is really a 'double' into an 'int' variable
  int shouldBeDouble = 1.0.addTen();
}
```

*Việc định nghĩa extension cho các base class có thể dẫn đến lỗi tại run-time, chẳng hạn: `TypeError`: "type `'double'` is not a subtype of type `'int'`"*

# Áp dụng Generic extensions ?

Quokka sẽ giải quyết vấn đề kế thừa bằng *generic type*:

```
main.dart
```
```
extension NumGenericExtensions<T extends num> on T {
  T addTen() => this + 10;
}
```

Generics sẽ giúp câu lệnh `int anInt = 1.addTen();` hoạt động đúng. Nhưng câu lệnh sau lại bị lỗi:


```
main.dart
```
```
main() {
  // Compile-time error!
  int shouldBeDouble = 1.0.addTen();
}
```

# Bạn đã học được gì?

Extension là một tính năng mạnh mẽ của Dart:
- Bạn đã học được cách tạo extension **properties**, **method** and **operators**
- Cách giải quyết việc copy code bằng cách định nghĩa một extension trên base class có thể không phải luôn là một lựa chọn tốt nhất. Trong hầu hết các trường hợp có thể, bạn nên sử dụng **generic extensions**