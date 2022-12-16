Với những bạn nào đã từng sử dụng Kotlin khi lập trình Android và có tìm hiểu sâu một chút, chắc hẳn các bạn đã biết và cũng sẽ rất ấn tượng với extension của Kotlin. Mình cũng đã từng sử dụng và thấy nó giúp ích rất nhiều trong quá trình code bởi chúng ta có thể viết thêm các phương thức cho các class mà không phải sửa trực tiếp vào class. Việc này rất hữu dụng trong trường hợp bạn muốn viết thêm vào một class nào đó nhưng class đó lại nằm trong một thư viện nào đó hoặc thậm chí là class trong core của Kotlin như `String`, `List`,... Một ví dụ (viết bằng dart để cho mọi người dễ nắm bắt):

#### Cách truyền thống: 
```dart 
String getFirstChar(String text = "") {
   return (text[0] ?? "").toLowerCase();
}

final firstChar = getFirstChar("Hello"); // Kết quả: "h"
```

#### Với extension:
```dart
// ... implement extension (sẽ nói ở dưới sau)

final firstChar = "Hello".getFirstChar(); // Kết quả: "h"

// hay thậm chí là

final firstChar = "Hello".firstChar; // Kết quả: "h"
```

Nhìn khá là gọn phải không? Mình rất mong chờ tính năng này sẽ có mặt trong Dart. Và thật tuyệt vời, ở phiên bản **Dart 2.6** đã giới thiệu tính năng này, nhưng mình thấy nhiều người còn chưa nắm rõ về nó. Vậy nên mình viết bài này để giới thiệu cho mọi người một tính năng không nên bỏ qua này.

## Viết extension như thế nào
Đầu tiên, chúng ta nên viết extension này ra một file riêng để dễ dàng maintain hơn nhé. Mình hay đặt là `extensions.dart`.
Giờ chúng ta hãy cùng thử viết với ví dụ bên trên. Bắt đầu với class extension:

```dart:extensions.dart
extension StringX on String {
    // ...
}
```

Cú pháp ở đây là: `extension <TênCủaExtension> on <ClassMuốnExtend> {}`. Trong đó tên của extension là do bạn chọn, miễn là không trùng với các class đã có sẵn để tránh nhầm lẫn khi sử dụng. Mình hay đặt là `TênClass` kèm `X` (nghe phát âm cũng na ná extend :D) để dễ phân biệt. Sau đó chúng ta hãy cùng viết ví dụ cho `"Hello".getFirstChar()`:

```dart:extensions.dart
extension StringX on String {
    String getFirstChar() {
        return (this[0] ?? "").toLowerCase();
    }
}

final firstChar = "Hello".getFirstChar();
```

Nhiều bạn sẽ thắc mắc, `this` ở đây là gì, tại sao lại có `this` này nhỉ? Thì `this` ở đây chính là instance của class `String` mà chúng ta dùng function này (ở đây là `"Hello"`). Khi viết function trong extension, chúng ta có thể access trực tiếp vào các member variable của class mà chúng ta đang extend, ví dụ như String thì chúng ta sẽ có thể dùng `this.length`, `this.substring()`, `this.split()` (có thể bỏ chữ `this` nếu như không bị trùng tên với params truyền vào trong function)

Còn với ví dụ thứ hai thì sao nhỉ? Chắc các bạn cũng biết dart cho phép viết các compute properties, getter và setter dạng như:

```dart
class A {
   int _getCurrentAge() => 5;
   
   int get age => _getCurrentAge();
}
```

Vậy nên chúng ta sẽ tận dụng tính năng này để làm code ngắn hơn:

```dart:extensions.dart
extension StringX on String {
    String get firstChar => (this[0] ?? "").toLowerCase();
}

final firstChar = "Hello".firstChar;
```

## Sử dụng
Extension có thể sử dụng ngay tại file chứa class extension đó (như ở đây là file `extensions.dart`) mà không cần làm gì khác. Nhưng nếu muốn sử dụng ở file khác, bạn phải import file đó vào nơi muốn dùng nhé

```dart:the_other_file.dart
import './extensions.dart';

final fullName = "Hung Pham";
final firstChar = fullName.firstChar; // "h"
```

## Một vài extension mà mình thường sử dụng
```dart
extension BuildContextX on BuildContext {
    // Để lấy screen size (context.screenSize)
    Size get screenSize => MediaQuery.of(this).size;

    // Để lấy icon size mặc định (context.iconSize)
    double get iconSize => IconTheme.of(this).size;

    // Để lấy size của safe area (context.padding)
    EdgeInsets get padding => MediaQuery.of(this).padding;
}
```

và 

```dart
extension StringX on String {
    // Viết hoa chữ cái đầu
    String capitalize() {
        if (length > 0) {
            return '${this[0].toUpperCase()}${substring(1)}';
        }

        return this;
    }

    // Parse string sang double (trả về default value thay vì throw lỗi)
    double parseDouble([double defaultValue = 0.0]) {
        return double.tryParse(replaceAll(RegExp(r'[^0-9\.]'), '')) ?? defaultValue;
    }
}
```

## Kết
Mình đã giới thiệu qua về extension trong Dart và Flutter. Đây là một tính năng rất hay mà mình muốn mọi người nên biết và sử dụng, hi vọng các bạn thấy hữu ích và áp dụng tính năng này một cách hiệu quả :D