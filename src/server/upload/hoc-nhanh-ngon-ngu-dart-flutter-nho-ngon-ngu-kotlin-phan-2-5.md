# 1. Lời mở đầu
Series này được viết nhằm mục đích giúp những bạn đã hiểu biết về ngôn ngữ Kotlin hoặc Java có thể học nhanh ngôn ngữ Dart để code Flutter. Nếu bạn chưa đọc phần 1, bạn có thể đọc lại phần 1 [tại đây](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-1-07LKX9eEZV4)
# 2. Toán tử
Đa số là giống Kotlin. Tuy nhiên có 1 vài điểm khác thì mình đã gạch đỏ và chú thích vào trong code.

![](https://images.viblo.asia/ed5a15be-03f0-495b-8048-7b7e7fdfc2ab.PNG)

Ngoài các toán tử trên ra thì:
* Toán tử gọi hàm (function call) cũng giống Kotlin là `()`. Ví dụ: `print(3)`
* Toán tử gọi member function hoặc property của object cũng là `.`. Ví dụ: `student.goToSchool()` hoặc `student.age`
* Trong Dart chỉ có `as` chứ không có `as?` như Kotlin.
* Toán tử `*` cũng có ích trong trường hợp mình cần sinh ra chuỗi string với độ dài mong muốn. `print('a' * 3); // Output là: aaa`
# 3. If else
Giống y Kotlin :D
```dart
if (3 > 2) {
  print('Đúng');
  print('Vào if')
} else if (4 > 5) {
  print('Vào else if');
} else {
  print('Vào else');
}
```
hoặc trong trường hợp trong block `{ }` chỉ có 1 câu lệnh:
```dart
if (3 > 2) print('Đúng');
```
# 4. For loop
![](https://images.viblo.asia/1a7e5ece-054a-48e2-8de6-6f53710d7713.jpg)

Trông Kotlin có vẻ dễ nhớ cú pháp hơn. Còn Dart thì hơi khó nhớ nhỉ?. Nhưng đừng lo, vì qua phần 2 mình sẽ giới thiệu biểu thức lambda (lambda expression), dễ dùng hơn thế này nhiều :D. Biến `list` trong ảnh bị lỗi do mình chưa khai báo biến `list` đó. Qua phần 2 mình sẽ giới thiệu kiểu `List` luôn nhé.
# 5. While loop
Giống y Kotlin:
## while
```dart
while (!isDone()) {
  doSomething();
}
```
## do-while
```dart
do {
  printLine();
} while (!atEndOfPage());
```
# 6. Break and continue
Công dụng của `break` và `continue` giống y Kotlin.
# 7. Switch and case
Chính là `when` trong Kotlin

![](https://images.viblo.asia/736c7cfc-3c3f-496d-a1d0-76d32da8eb6e.jpg)
# 8. String template, String raw
String template thì giống hệt Kotlin. Nó cũng dùng `$a` và `${a.func}`
```dart
void main() {
  var a = 3;
  print('Giá trị của a là $a Kiểu của a là ${a.runtimeType}');
}
```

Để hiển thị String raw, Dart sử dụng double quote `" "` (nháy kép)
```dart
print("Can't help falling in love with Dart");
```
Để ý, mình không sử dụng escape `\` trước ký tự `'`. Tức là nếu các bạn in câu trên mà sử dụng nháy đơn thì phải như thế này:
```dart
print('Can\'t help falling in love with Dart');
```

Multi-line string literal, Dart sử dụng 3 dấu nháy đơn `'''`
```dart
var s = '''A
multi-line
string''';
```
# 9. Exceptions
Giống Kotlin, tất cả các Exceptions trong Dart đều là unchecked exceptions, tức là bạn sẽ không bị ép phải try catch bắt cứ dòng code nào. 

Dart cung cấp 2 lớp là `Exception` (là class cha của tất cả các exception) và lớp `Error`. `Exception` và `Error` không có ai kế thừa ai nhé. 2 thằng này về bản chất khác nhau hoàn toàn. Nếu như `Exception` là những trường hợp ngoại lệ không lường trước và nên `try/catch` những trường hợp này để đề phòng các case không mong muốn. Còn nếu app bạn gặp `Error` thì chứng tỏ code bạn bị fail, code tệ, code lỗi và bạn buộc phải sửa chứ không nên `try/catch`. 

Cách throw một Exception cũng giống như Kotlin:
```dart
throw FormatException('Expected at least 1 section');
```
Ngoài ra, bạn có thể ném một Exception bất kỳ không cần biết class nào luôn:
```dart
throw 'Expected at least 1 section';
```
# 10. try / catch / finally
![](https://images.viblo.asia/680fc0a0-53ad-44a0-a397-7db1dcc5df5d.jpg)
Tương đối giống Kotlin, chỉ có 2 điểm khác:
* Cách bắt cụ thể 1 exception nào đó: `on FormatException catch (e) { }`
* Để throw lại một exception thì Dart cung cấp cho ta keyword là `rethrow`
# 11. Class Null
Class `Null` rất là đặc biệt, nó chỉ có 1 instance duy nhất chính là `null`. Chính vì vậy mà so sánh null trong Dart sẽ có 2 kiểu thế này.
```dart
if (a is Null) // tuy nhiên cách viết này bị warning
```
hoặc
```dart
if (a == null) // cách viết này chuẩn
```

Khi khai báo biến mà chưa có giá trị khởi tạo thì biến đó sẽ có kiểu là `Null`, cũng chính vì vậy mà ở bài 1 mình có nói nếu không có giá trị khởi tạo thì mọi biến đều có giá trị default là `null`
```dart
void main() {
  var a;
  print('Giá trị của a = $a');
  print('Type của a là ${a.runtimeType}');
}
```
Output:
```
Giá trị của a = null
Type của a là Null
```
# 12.Toán tử 3 ngôi
Giống hệt Java. Toán tử này thì Kotlin không có.
```dart
var visibility = isPublic ? 1 : 0;
```
Giải thích: Nếu biến `isPublic == null` thì biến `visibility` được gán giá trị là `1`, ngược lại gán là `0`
# 13. Toán tử null-aware
## Toán tử ??
```dart
void main() {
  var x; // biến x đang là null
  print(x ?? 'x là null thì in vế sau ra');
}
```
Output:
```
x là null thì in vế sau ra
```
Toán tử này giống với toán tử Elvis `?:` trong Kotlin. Nghĩa là nếu `x` là `null` thì in vế sau ra
## Toán tử ??=
```dart
void main() {
  var x; // biến x đang là null
  x ??= 'Nếu x bằng null thì gán x bằng String này';
  print(x);
}
```
Output:
```
Nếu x bằng null thì gán x bằng String này
```
Nếu biến `x` là `null` thì gán giá trị bằng vế sau cho `x`
## Toán tử ?.
`?.` dùng để check null trước khi gọi function hoặc property giống Kotlin. Ví dụ `student?.goToSchool()` hoặc `student?.age`.
# 14. List và Array
Trong Dart nó gộp kiểu Array vs List lại chung một kiểu là `List`. Cú pháp tạo ra một `List` là `[value, value, value, ...]`
```dart
void main() {
  // không sử dụng generic
  var list = [1, 'a', true];
  
  // sử dụng generic
  var intList = <int>[1, 2, 3]; // một list object có kiểu int <=> listOf<Int>(1, 2, 3) trong Kotlin
  
  var numList = <num>[1, 2, 3.333]; // một list object kiểu num
  var dynamicList = <dynamic>[1, 'a', true]; // một list object có type bất kỳ
}
```

**Hàm add, set, remove và get của List**
```dart
void main() {
  var intList = <int>[1, 2, 3]; // một list object có kiểu int
  
  // add phần tử
  intList.add(4);
  
  // update phần tử tại index
  intList[0] = 5;
  
  // remove phần tử tại index
  intList.removeAt(0);
  
  // get phần tử tại index
  var b = intList[0];
}
```

# 15. Collection if, collection for
Collection if này Kotlin không có hỗ trợ.
```dart
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (isMine) 'Outlet'
]; // chỉ khi biến isMine == true thì 'Outlet' mới được add vào list và ngược lại
```

Collection for này Kotlin cũng không có hỗ trợ.
```dart
var listOfInts = [1, 2, 3];
  var listOfStrings = [
    'số 0',
    for (var i in listOfInts) 'số $i'
  ];
  print(listOfStrings);
```
Output:
```
[số 0, số 1, số 2, số 3]
```
Nó duyệt hết phần tử trong list `listOfInts` rồi add vào list `listOfStrings`
# 16. Toán tử spread (spread operator và null-aware spread operator)
Toán tử spread `...` này Kotlin không có, nó giúp mình addAll một list B vào một list A một cách nhanh chóng.
```dart
var listA = [1, 2, 3];
var listB = [0, ...listA]; // addAll tất cả phần tử của listA vào listB
print(listB); // in ra: [0, 1, 2, 3]
```

Tương tự null-aware spread operator `...?` cũng giống vậy nhưng khác ở chỗ nó sẽ check null trước khi addAll.
```dart
var listA; // listA đang null
var listB = [0, 1, ...?listA]; // nên listA sẽ không được addAll vào listB
print(listB); // in ra: [0, 1]
```
# 17. Immutable và Mutable List
Thật sự trong Dart không tồn tại khái niệm Immutable List. Nó chỉ có một kiểu gọi là `List`, mà kiểu này cho phép `add`, `set` và `remove` phần tử ra khỏi list nên nó là kiểu mutable. Tuy nhiên cũng có 3 cách để lách luật tạo ra một immutable list :v

**Cách 1**: sử dụng `List.unmodifiable` truyền vào 1 biến kiểu `List`
```dart
var a = List.unmodifiable(<int>[1, 2]);
a.add(3);
```
Nếu immutable list Kotlin nó sẽ báo lỗi compile ngay dòng code `a.add(3)` và tất nhiên bạn sẽ không thể chạy được chương trình thì ở Dart hơi khác một chút, nó không báo lỗi compile nhưng khi run nó sẽ xảy ra lỗi ở Runtime: 
```
Unsupported operation: Cannot add to an unmodifiable list
```
Ngoài hàm add ra, thì hàm set, remove cũng sẽ xảy ra Exception:
```dart
var a = List.unmodifiable(<int>[1, 2]);
a.add(3); // throw Exception
a[0] = 1; // throw Exception
a.removeAt(0); // throw Exception
```
**Cách 2 và 3**: sử dụng từ khóa `const`
```dart
  // Cách 2
  var a = const [1, 2, 3];
  a.add(4); // throw Exception
  a[1] = 1; // throw Exception
  a.removeAt(0); // throw Exception

  // Cách 3
  const b = [1, 2, 3]; 
  b.add(4); // throw Exception
  b[1] = 1; // throw Exception
  b.removeAt(0); // throw Exception
```
# 18. Set
Set chứa những phần tử không duplicate. Cú pháp tạo ra một `Set` là `{value, value, value, ...}`

```dart
void main() {
  // không sử dụng generic
  var set = {1, 'a', true};

  // sử dụng generic
  var intSet = <int>{1, 2, 3, 2, 3, 4}; // <=> setOf<Int>(1, 2, 3, 2, 3, 4) trong Kotlin
  print(intSet); // in ra: {1, 2, 3, 4}
}
```

Set cũng support spread operator `...` and the null-aware spread operator `...?`
# 19. Map
Cú pháp tạo ra một `Map` là: `{key: value, key: value, key: value, ....}`
```dart
void main() {
  // không sử dụng generic
  var map = {1: 3, 'a': 3.3, 0.333: true};

  // sử dụng generic
  var genericMap = <int, dynamic>{1: 3, 2: 3.3, 3: true};
  print(genericMap); // in ra: {1: 3, 2: 3.3, 3: true}
  
  // Hàm put
  genericMap[5] = 'abc';
  
  // Hàm get
  var b = genericMap[5];
  print(b); // in ra: abc
}
```
*Chú ý*: Vì cả `Set` và `Map` đều dùng dấu `{ }` cho nên khi ta viết code thế này nó sẽ suy đoán kiểu ra kiểu `Map`:
```dart
var names = {}; // Tạo ra một Map rỗng, ko phải Set
```
Nếu chúng ta muốn tạo ra một Set rỗng có thể làm như sau:
```dart
var names = <String>{};
// hoặc
Set<String> otherNames = {};
```
# Kết luận
Như vậy là chúng ta đã đi được hơn nửa chặng đường rồi :D. Hy vọng các bạn tiếp tục theo dõi những phần tiếp theo :D

Tham khảo: https://dart.dev/guides

Đọc tiếp phần 3: [Học nhanh ngôn ngữ Dart (Flutter) nhờ ngôn ngữ Kotlin (Phần 3)](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-3-Qbq5Qm935D8)