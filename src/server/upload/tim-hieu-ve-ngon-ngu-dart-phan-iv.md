Bài này chúng ta sẽ cùng tìm hiểu về hàm trong Dart

## Hàm
Dart là một ngôn ngữ hướng đối tượng thực sự, vì vậy ngay cả các hàm cũng là các đối tượng và có kiểu Function. Điều này có nghĩa là các hàm có thể được gán cho các biến hoặc được truyền dưới dạng đối số cho các hàm khác. Bạn cũng có thể gọi một thể hiện của lớp Dart như thể nó là một hàm. Để biết chi tiết, xem các lớp [Callable](https://dart.dev/guides/language/language-tour#callable-classes) .

Đây là một ví dụ về việc thực hiện một hàm:

```
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```
Mặc dù Dart khuyến nghị nên có chú thích kiểu cho các API, hàm vẫn hoạt động nếu bạn bỏ qua các type:

```
isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```
Đối với các hàm chỉ chứa một biểu thức, bạn có thể sử dụng cú pháp tốc ký:

```
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```
Cú pháp => expr là một tốc ký cho { return expr ; }. Ký hiệu => đôi khi được gọi là cú pháp mũi tên .

Một hàm có thể có hai loại tham số: bắt buộc và tùy chọn. Các tham số bắt buộc được liệt kê đầu tiên, theo sau là bất kỳ tham số tùy chọn nào. Các tham số tùy chọn được đặt tên cũng có thể được đánh dấu là @required . Xem phần tiếp theo để biết chi tiết.

### Tham số tùy chọn
Các tham số tùy chọn có thể đặt theo vị trí hoặc được đặt tên, nhưng không thể là cả hai.

***Các tham số tùy chọn được đặt tên***
Khi gọi một hàm, bạn có thể chỉ định các tham số được đặt tên bằng paramName : value . Ví dụ:

```
enableFlags(bold: true, hidden: false);
```
Khi định nghĩa hàm, sử dụng { param1 , param2 , …} để chỉ định tham số đã đặt tên:

```
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold, bool hidden}) {...}
```
Các biểu thức tạo đối tượng Flutter có thể trở lên phức tạp, vì vậy các hàm tạo widget chỉ sử dụng các tham số có tên riêng. Điều này làm cho các biểu thức tạo instance dễ đọc hơn.

Bạn có thể chú thích một tham số đã đặt tên trong bất kỳ mã Dart nào (không chỉ Flutter) với *@required* để chỉ ra rằng đó là tham số bắt buộc . Ví dụ:

```
const Scrollbar({Key key, @required Widget child})
```
Khi Scrollbar được xây dựng, bộ phân tích báo cáo sự cố khi không có đối số child .

*Required* được xác định trong gói meta . Hoặc là import *package:meta/meta.dart* trực tiếp hoặc import gói khác có meta , chẳng hạn như *package:flutter/material.dart*.

***Tham số tùy chọn theo vị trí***
Gói một bộ tham số trong [] đánh dấu chúng là tham số vị trí tùy chọn:

```
String say(String from, String msg, [String device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```
Đây là một ví dụ về cách gọi hàm này mà không có tham số tùy chọn:

```
assert(say('Bob', 'Howdy') == 'Bob says Howdy');
```
Và đây là một ví dụ về cách gọi hàm này với tham số thứ ba:

```
assert(say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal');
```

***Giá trị tham số mặc định***
Hàm của bạn có thể sử dụng = để xác định các giá trị mặc định cho cả tham số được đặt tên và vị trí. Các giá trị mặc định phải là hằng số thời gian biên dịch. Nếu không có giá trị mặc định được cung cấp, giá trị mặc định là null .

Dưới đây là ví dụ về cài đặt giá trị mặc định cho các tham số được đặt tên:

```
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold will be true; hidden will be false.
enableFlags(bold: true);
```
> **Ghi chú**: Mã cũ có thể sử dụng dấu hai chấm (:) thay vì = để đặt giá trị mặc định của các tham số được đặt tên. Lý do là ban đầu, chỉ : được hỗ trợ cho các tham số được đặt tên. Hỗ trợ đó có thể không được chấp nhận, vì vậy chúng tôi khuyên bạn nên sử dụng = để chỉ định các giá trị mặc định.

Ví dụ tiếp theo cho thấy cách đặt giá trị mặc định cho các tham số vị trí:

```
String say(String from, String msg,
    [String device = 'carrier pigeon', String mood]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  if (mood != null) {
    result = '$result (in a $mood mood)';
  }
  return result;
}

assert(say('Bob', 'Howdy') ==
    'Bob says Howdy with a carrier pigeon');
```
Bạn cũng có thể truyền vào 1 List hoặc Map làm giá trị mặc định. Ví dụ sau định nghĩa một hàm, doStuff() , chỉ định danh sách mặc định cho tham số list và map mặc định cho tham số gifts .

```
void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list');
  print('gifts: $gifts');
}
```
### Hàm main ()
Mọi ứng dụng phải có hàm main() cấp cao nhất, đóng vai trò là điểm bắt đầu của ứng dụng. Hàm main() trả về void và có tham số List<String> tùy chọn cho các đối số.

Dưới đây là ví dụ về hàm main() cho ứng dụng web:

```
void main() {
  querySelector('#sample_text_id')
    ..text = 'Click me!'
    ..onClick.listen(reverseText);
}
```
> **Lưu ý**: Cú pháp .. trong mã trên được gọi là cascade. Với các cascade, bạn có thể thực hiện nhiều thao tác trên các thành viên của một đối tượng.

Dưới đây là ví dụ về hàm main() cho ứng dụng command-line nhận đối số:

```
// Run the app like this: dart args.dart 1 test
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
```
Bạn có thể sử dụng thư viện *args* để xác định và phân tích các đối số dòng lệnh.

### Hàm làm tham số
Bạn có thể truyền một hàm làm tham số cho hàm khác. Ví dụ:

```
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// Pass printElement as a parameter.
list.forEach(printElement);
```
Bạn cũng có thể gán một hàm cho một biến, chẳng hạn như:

```
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```
Ví dụ này sử dụng một hàm ẩn danh. Chi tiết thêm trong phần tiếp theo.

### Hàm ẩn danh
Hầu hết các hàm được đặt tên, chẳng hạn như main() hoặc printElement() . Bạn cũng có thể tạo một hàm không tên gọi là hàm ẩn danh , hoặc đôi khi là lambda hoặc closure . Bạn có thể gán một hàm ẩn danh cho một biến để, ví dụ, bạn có thể thêm hoặc xóa nó khỏi bộ sưu tập.

Một hàm ẩn danh trông tương tự như một hàm có tên, và có 0 hoặc nhiều tham số, được phân tách bằng dấu phẩy và chú thích loại tùy chọn, giữa các dấu ngoặc đơn.

Code block sau chứa phần thân của hàm:

```
([[Type] param1[, …]]) { 
  codeBlock; 
}; 
```

Ví dụ sau định nghĩa một hàm ẩn danh với tham số, item . Hàm, được gọi cho từng mục trong danh sách, in một chuỗi bao gồm giá trị tại chỉ mục đã chỉ định.

```
var list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});
```

Nếu hàm chỉ chứa một câu lệnh, bạn có thể rút ngắn nó bằng cách sử dụng ký hiệu mũi tên. Dán dòng sau vào DartPad và bấm chạy để xác minh rằng nó tương đương về chức năng.

```
list.forEach(
    (item) => print('${list.indexOf(item)}: $item'));
```
### Phạm vi từ vựng
Dart là một ngôn ngữ có phạm vi từ vựng, có nghĩa là phạm vi của các biến được xác định tĩnh, chỉ đơn giản bằng cách bố trí code. Bạn có thể theo dõi các dấu ngoặc nhọn hướng ra ngoài để xem một biến có nằm trong phạm vi không.

Dưới đây là một ví dụ về các hàm lồng nhau với các biến ở mỗi cấp phạm vi:

```
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```
Lưu ý cách nestedFunction() có thể sử dụng các biến từ mọi cấp độ, cho đến cấp cao nhất.

### Closure từ vựng
Closure nghĩa là một đối tượng hàm có quyền truy cập vào các biến trong phạm vi từ vựng của nó, ngay cả khi hàm được sử dụng bên ngoài phạm vi ban đầu của nó.

Các hàm có thể đóng trên các biến được xác định trong phạm vi xung quanh. Trong ví dụ sau, makeAdder() nắm bắt biến addBy . Bất cứ nơi nào, nó sẽ nhớ addBy .

```
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(num addBy) {
  return (num i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```
### Kiểm tra địa chỉ hàm
Dưới đây là một ví dụ về kiểm tra các hàm cấp cao nhất, phương thức tĩnh và phương thức thể hiện cho đẳng thức:

```
void foo() {} // A top-level function

class A {
  static void bar() {} // A static method
  void baz() {} // An instance method
}

void main() {
  var x;

  // Comparing top-level functions.
  x = foo;
  assert(foo == x);

  // Comparing static methods.
  x = A.bar;
  assert(A.bar == x);

  // Comparing instance methods.
  var v = A(); // Instance #1 of A
  var w = A(); // Instance #2 of A
  var y = w;
  x = w.baz;

  // These closures refer to the same instance (#2),
  // so they're equal.
  assert(y.baz == x);

  // These closures refer to different instances,
  // so they're unequal.
  assert(v.baz != w.baz);
}
```
### Giá trị trả về
Tất cả các hàm trả về một giá trị. Nếu không có giá trị trả về được chỉ định, câu lệnh return null; được gán vào body của hàm.

```
foo() {}

assert(foo() == null);
```

Nguồn https://dart.dev/guides/language/language-tour#functions
Còn tiếp