![](https://images.viblo.asia/43c236fd-255d-4989-9e18-11766a158787.png)

## Dart là gì?
[**Dart**](https://www.dartlang.org/guides/language)  là ngôn ngữ được sử dụng trong Flutter, là ngôn ngữ lập trình dạng hướng đối tượng. Cũng là một ngôn ngữ viết ở một lần dùng ở nhiều nơi nhưng khác với Java, **Dart** thay vì tạo ra những môi trường trung gian giữa code thực thi và môi trường thiết bị thì **Dart** sử dụng những trình biên dịch khác nhau để biên dịch ra mã máy tương ứng. Hiện tại **Dart** đang hỗ trợ để tạo ra những ứng dụng trên iOS, Android, Fuchsia và Web. Riêng với Web Application, **Dart** biên dịch bản thân thành code Javascript (ở trường hợp này, **Dart** được coi như là một synxtax sugar cho Javascript). 

**Dart** đồng thời cũng là một ngôn ngữ hỗ trợ asynchrony. Tức nghĩa là trong **Dart** chỉ có một dòng chảy tuần tự chảy từ trên xuống dưới. Code được đưa vào hàng đợi và hoàn toàn có thứ tự khi được thực thi. Đọc thêm về [Dart Language Asynchrony Support](https://www.dartlang.org/articles/language/beyond-async) 

## Trong Dart mọi thứ đều là object
Tất cả mọi thứ bạn có thể đặt trong một biến là một Object và kế thừa từ [Object class](https://api.dartlang.org/stable/2.2.0/dart-core/Object-class.html). Đã là Object thì luôn phải là instance của một class nào đó. Chính vì tất cả đều là object nên dù là số, chữ hay bất kể loại kiểu dữ liệu nào thì `giá trị mặc định của nó đều là null`. Nhờ vậy, mọi biến số trong Dart đều là `reference type`. Cũng chính thế mà Dart có một loại biến `dynamic` chấp nhận mọi kiểu dữ liệu.

Non-dynamic data type
```dart
main () {
  var x = 1;
  x = 1.5;  // Error: A value of type 'double' can't be assigned to a variable of type 'int'
}
```

Dynamic data type
```dart
main () {
  dynamic x = 1;
  x = 1.5;
}
```

## Toán tử Null-aware
Vì giá trị mặc định của mọi thứ trong Dart đều là **null**. Chính vì vậy mà Dart có một loạt toán tử Null-aware  (??,  ??= và ?. )   để đảm bảo **null safe** trong quá trình thực thi code.

Ví dụ về  các toán tử Null-aware

Sử dụng toán tử **??** <br> Hiểu đơn giản ở trong toán tử này : Nếu **exp** != null thì trả về **exp**, ngược lại thì trả về **otherExp** 
```dart
String playerName(String name) => name ?? 'Guest';
```

<br>

Toán tử **??=** dùng để gán một giá trị vào object nếu object là null 
```dart
// Assign value to b if b is null; otherwise, b stays the same
b ??= value;
```

<br>

Toán tử **?.** dùng để gọi phương thức hoặc getter một object nhưng object này có thể là `null`
```dart
  obj?.method()
```
## Khai báo một biến/hằng số trong Dart
Có 5 cách để khai báo một biến/hằng số trong Dart 
* Cách đầu tiên là đặt kiểu dữ liệu trước tên biến. Biến sẽ chỉ được khai báo một lần và tất cả mọi lần thay đổi dữ liệu biến đều phải giữ nguyên kiểu dữ liệu cũ.
```dart
String name = 'Bob';
```
* Sử dụng `var` giúp cho biến dù được khai báo một lần và không thể thay đổi kiểu dữ liệu. Tuy nhiên sau lần nhận dữ liệu đầu tiên, biến mới được xác định kiểu dữ liệu của bản thân.
```dart
var name = 'Bob';
```
*  Sử dụng `dynamic` giúp cho biến dù được khai báo một lần nhưng muốn thay đổi dữ liệu và kiểu dữ liệu bao nhiêu lần cũng được.
```dart
dynamic name = 'Bob';
```
*  `final` và `const` là hai từ khóa dễ nhầm cần được nói riêng.
Một biến được khai báo là `final` sẽ trở thành hằng số chỉ có thể được truyền dữ liệu một lần. Tuy nhiên dữ liệu vẫn có thể tự thay đổi các giá trị thuộc tính bên trong nó.
```dart
final name = 'Bob'; // Without a type annotation
final String nickname = 'Bobby';
```
Bạn không thể thay đổi giá trị của biến `final`:
```dart
name = 'Alice'; // Error: a final variable can only be set once.
```

Một biến được khai báo là `const` sẽ trở thành hằng số được build thành các `literal` tại thời điểm `compile time`. Điều này nghĩa là toàn bộ dữ liệu được truyền vào đều bị đóng băng và không thể thay đổi. Và vì được build vào thời điểm `compile time` dẫn đến phần tử của object thì không thể là `const` được. Một biến muốn được khai báo là `const` thì buộc phải `static` hoặc là `top-level variable`.
```dart
const bar = 1000000; // Unit of pressure (dynes/cm2)
const double atm = 1.01325 * bar; // Standard atmosphere
```

Ngoài ra, `const` cũng có thể được dùng cho việc khai báo cho khối dữ liệu truyền vào. 
```dart
var foo = const [];  // (1) foo có thể được đổi thành giá trị khác ngoài một list rỗng ([])
final bar = const [];  // (2)
const baz = [];
```
Trường hợp (2) chính là lí do. Vì một phần tử của object không thể là `const` vì lí do tại thời điểm `compile time` thì nó chưa tồn tại. Vậy cách để thực hiện việc này là tạo ra một khối dữ liệu `const` được build tại thời điểm `compile time` là list rỗng ([]). Đến lúc xuất hiện object thì ta đặt phần tử mong muốn thành `final`, truyền cho nó khối dữ liệu ([]) và rồi nó đã biến thành một phần tử `const`.

Bạn có thể thay đổi giá trị của biến không phải là `final`, không phải là `const`, ngay cả khi nó được sử dụng để có giá trị `const`:
```dart
foo = [1, 2, 3]; // Was const []
```
Bạn **không** thể thay đổi giá trị của biến `const`:
```dart
baz = [42]; // Error: Constant variables can't be assigned a value.
```

## Dart hỗ trợ UTF-32
Vì mặc định một kí tự Unicode được biểu diễn như regex sau:` \\u[0-9a-f]{4}` ví dụ `\u09af`. Điều này cho thấy là một kí tự chỉ biểu diễn được tối đa là 4 kí tự hex có tổng là 16 bits. Vậy để biểu diễn được UTF-32, Dart đưa ra một cú pháp được gọi là [Runes](https://api.dartlang.org/stable/2.2.0/dart-core/Runes-class.html) có các biểu diễn như regex sau: `\\u\{[0-9a-f]{1, 8}\}` ví dụ `\u09af, \u09, \u09affa90`

Ví dụ 
```dart
 main() {
  var clapping = '\u{1f44f}';
  print(clapping);
  print(clapping.codeUnits);
  print(clapping.runes.toList());

  Runes input = new Runes(
      '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
  print(new String.fromCharCodes(input));
}
```

Kết quả hiển thị 
```
👏
[55357, 56399]
[128079]
♥  😅  😎  👻  🖖  👍
```

## Dart hỗ trợ đa kế thừa
Sử dụng `extends` để tạo ra subclass, và `super` để trỏ tới superclass:
```dart
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```

Về mặt cú pháp thì Dart vẫn chỉ có một kế thừa duy nhất, tuy nhiên Dart lại hỗ trợ kĩ thuật `mixins` thông qua từ khóa with. Việc này dẫn đến `diamon problem` là việc khi kế thừa lại có ít nhất hai `supper class` có ít nhất một method cùng tên và cùng danh sách tham số truyền vào. Điều này gây ra là ở phía `sub-class` khi gọi đến method đó thì không biết chọn cái nào. Với Dart, nó sẽ chọn theo `supper class` cuối cùng được khai báo. Vậy điểm lưu ý là thứ tự khai báo rất quan trọng trong Dart.

```dart
class Point implements Comparable, Location {...}
```

## Dart không có accept modifier
Dart không có các keywords `public`, `protected`, và `private`.
Trong Dart thì cùng một `file.dart` với nhau thì mọi thứ là **public**. Còn với những tài nguyên thuộc về `file.dart` khác nếu tên biến có bắt đầu bởi kí tự `_` thì được coi là **private** ở mức độ `packages/files/libraries`.
```dart
class Person {
  // In the interface, but visible only in this library.
  final _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}
```

Vậy nếu không có private, làm sao triển khai được singleton? Dart lại sinh ra một keyword gọi là `factory`. Với `factory` ta sẽ triển khai được một singleton như sau:

Giới thiệu về singleton trong Dart
```dart
class Singleton {
  static final Singleton _singleton = new Singleton._internal();

  factory Singleton() {
    return _singleton;
  }

  Singleton._internal();
}

main() {
  var s1 = new Singleton();
  var s2 = new Singleton();
  assert(identical(s1, s2));
  assert(s1 == s2);
}
```

## Tham số dạng positional và named trong Dart
Dart đưa ra hai khái niệm là `positional` và `named` tham số. Hai khái niệm này khác nhau ở điểm: 
- `positional` cho phép ta đặt giá trị mặc định hoặc không (mặc định là null) cho tham số truyền vào. Từ đó, ta có thể thêm bớt số lượng tham số trong lời gọi hàm. Ràng buộc của `positional` là vị trí khai báo phải nằm cuối cùng trong phần khai báo. Danh sách `positional` trong lời gọi hàm không được thay đổi thứ tự. Các tham số `positional` đặt trong dấu `[]` 
```dart
getNumber(String one, String two, [int three, String four]) {
    return '$one, $two, $three, $four';
}

main() {
  assert(getNumber('1', '2') == '1, 2, null, null');
  assert(getNumber('1', '2', 3) == '1, 2, 3, null');
  assert(getNumber('1', '2', 3, '4') == '1, 2, 3, 4');
}
```

- `named` thì linh hoạt hơn khi chấp nhận không theo thứ tự khi gọi hàm miễn là thỏa mãn việc tên tham số được chỉ rõ. Vị trí khai báo tham số `named` phải nằm cuối cùng trong phần khai báo và các tham số sẽ được đặt trong dấu `{}`.
```dart
getNumber(String one, String two, {int three, String four}) {
    return '$one, $two, $three, $four';
}

main() {
  assert(getNumber('1', '2') == '1, 2, null, null');
  assert(getNumber('1', '2', three: 3) == '1, 2, 3, null');
  assert(getNumber('1', '2', four: '4') == '1, 2, null, 4');
  assert(getNumber('1', '2', four: '4', three: 3) == '1, 2, 3, 4');
}
```

**Lưu ý** là không thể có cả `positional` lẫn `named` trong cùng một method.


Trên đây chỉ là một số phần đặc biệt được nhìn nhận dưới góc độ của bản thân mình.
Ngoài ra để nắm rõ về Dart thì các bạn có thể tìm hiểu tại [A Tour of the Dart Language](https://www.dartlang.org/guides/language/language-tour)