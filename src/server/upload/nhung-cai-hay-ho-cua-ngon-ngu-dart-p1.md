### 1. Mở đầu
Như bạn đã biết Dart là ngôn ngữ lập trình cho Flutter- bộ công cụ giao diện người dùng của Google để xây dựng các ứng dụng Mobile, Web và Desktop app đẹp, được biên dịch nguyên bản từ một cơ sở mã code duy nhất và khá hot trong thời gian gần đây :)) 

Ngôn ngữ Dart được thiết kế để dễ học cho các lập trình viên đến từ các ngôn ngữ khác, nó khá là giống Java. Nhưng nó có một vài tính năng độc đáo. Dựa rên Dart Language Cheatsheet - được viết bởi các kỹ sư của Google - sẽ hướng dẫn chúng ta những tính năng quan trọng, hay ho nhất của ngôn ngữ này. Cùng bắt đầu thôi

### 2. String interpolation (nội suy String)
Để đặt giá trị của một biểu thức bên trong một chuỗi, hãy sử dụng $ {biểu thức}. Nếu biểu thức là một identifier (định danh), bạn có thể bỏ qua dấu {}.
```Dart
String	 	                    Result
'${6 + 9}'	 	                '69'
'${"handsome".toUpperCase()}'	 	'HANDSOME'
'$myObject'	 	                The value of myObject.toString()
```
Ví dụ với phương thức này
```Dart
String stringify(int x, int y) {
  return '$x$y';
}
```
thì khi gọi stringify(20, 21) thì sẽ trả về 2021

### 3. Nullable variable (biến có thể null)
Dart 2.12 đã giới thiệu tính năng sound null safety, có nghĩa là (khi ta enable null safety) các giá trị không được rỗng trừ khi ta nói chúng có thể có. Nói cách khác, các kiểu không thể null theo mặc định.

Ví dụ: hãy xem xét đoạn code sau, code này không hợp lệ vì (với null safety) một biến kiểu int không thể có giá trị null:
```Dart
int a = null; // INVALID in null-safe Dart.
```
Khi tạo một biến trong Dart 2.12 trở lên, bạn có thể thêm? sang kiểu để chỉ ra rằng biến có thể là null:
```Dart
int? a = null; // Valid in null-safe Dart.
```
Ta có thể đơn giản hóa mã đó một chút bởi vì, trong tất cả các phiên bản của Dart, null là giá trị mặc định cho các biến chưa được khởi tạo:
```Dart
int? a; // The initial value of a is null.
```
Ví dụ khai báo về một String name có thể null với value là 'Trum', một String address với value có thê null
```Dart
String? name = 'Trump';
String? address;
```
### 4. Null-aware operators (toán tử nhận biết null)
Dart cung cấp một số toán tử tiện dụng để xử lý các giá trị có thể là rỗng. Một là toán tử gán ?? =, chỉ gán giá trị cho một biến nếu biến đó hiện đang rỗng:
```Dart
int? a; // = null
a ??= 6;
print(a); // <-- Prints 6.

a ??= 9;
print(a); // <-- Still prints 6.
```
Một toán tử nhận biết null khác là ??, trả về biểu thức ở bên trái trừ khi giá trị của biểu thức đó là null, trong trường hợp đó nó null thì sẽ đánh giá và trả về biểu thức ở bên phải:
```Dart
print(1 ?? 3); // <-- Prints 1.
print(null ?? 12); // <-- Prints 12.
```
### 5. Conditional property access (truy cập property có điều kiện)
Để bảo vệ quyền truy cập vào thuộc tính hoặc phương thức của một đối tượng có thể là rỗng, hãy đặt dấu chấm hỏi (?) Trước dấu chấm (.):
```Dart
myObject?.someProperty
```
Code trên sẽ tương đương với
```Dart
(myObject != null) ? myObject.someProperty : null
```
Ta có thể nhiều lần sử dụng?. cùng nhau trong một biểu thức duy nhất:
```Dart
myObject?.someProperty?.someMethod()
```
Nếu myObject hoặc someProperty bị null thì someMethod() sẽ không được gọi.
### 6. Collection literals (List, Set, Map)
Dart có hỗ trợ tích hợp cho lists, maps, và sets. Ta có thể tạo chung sử dụng các ký tự
```Dart
final aListOfStrings = ['one', 'two', 'three'];
final aSetOfStrings = {'one', 'two', 'three'};
final aMapOfStringsToInts = {
  'one': 1,
  'two': 2,
  'three': 3,
};
```
Như trên thì Dart ngầm định đả chỉ định kiểu các biến cho chúng ta đó là List<String>, Set<String>, Map<String, int>. Hoặc ta cũng có thể tự viết ra rõ như vài cách dưới đây:
```Dart
final aListOfInts = <int>[];
final aSetOfInts = <int>{};
final aMapOfIntToDouble = <int, double>{};
```
Việc chỉ định kiểu rất hữu ích khi ta khởi tạo danh sách có nội dung của kiểu con, nhưng vẫn muốn danh sách là Danh sách <BaseType> ví dụ:
```Dart
final aListOfBaseType = <Animal>[Dog(), Cat()];
```
code example
```Dart
// Assign this a list containing 'a', 'b', and 'c' in that order:
final aListOfStrings = ['a', 'b', 'c'];

// Assign this a set containing 3, 4, and 5:
final aSetOfInts = {3, 4, 5};

// Assign this a map of String to int so that aMapOfStringsToInts['myKey'] returns 12:
final aMapOfStringsToInts = {'myKey':12};

// Assign this an empty List<double>:
final anEmptyListOfDouble = <double>[];

// Assign this an empty Set<String>:
final anEmptySetOfString = <String>{};

// Assign this an empty Map of double to int:
final anEmptyMapOfDoublesToInts = <double, int>{};
```
Arrow syntax =>
Ta có thể đã thấy biểu tượng => trong mã Dart. Cú pháp mũi tên này là một cách để xác định một hàm thực thi biểu thức ở bên phải của nó và trả về giá trị của nó.
    
Ví dụ: hãy xem xét lệnh gọi này đến phương thức any () của class List:
```Dart
bool hasEmpty = aListOfStrings.any((s) {
  return s.isEmpty;
});
```
Dưới đây đã cách đơn giản hơn để thay thế đoạn code trên
```Dart
bool hasEmpty = aListOfStrings.any((s) => s.isEmpty);
```
### 7. Cascades (dấu ..)
(có thể tạm dịch là tầng hay dòng thác)

Để thực hiện một chuỗi các hoạt động trên cùng một đối tượng, hãy sử dụng các Cascades (..). Ta đều đã thấy một biểu hiện như thế này:
```Dart
myObject.someMethod()
```
Nó gọi someMethod () trên myObject và kết quả của biểu thức là giá trị trả về của someMethod (). 
    
Dưới đây là biểu thức tương tự khi sử dụng với một cascade, tức với 2 dấu chấm:
```Dart
myObject..someMethod()
```
Mặc dù nó vẫn gọi someMethod () trên myObject, nhưng kết quả của biểu thức không phải là giá trị trả về, nó là một tham chiếu đến myObject! Sử dụng cascades, ta có thể xâu chuỗi các hoạt động với nhau mà nếu không sẽ yêu cầu các câu lệnh riêng biệt. Ví dụ: hãy xem xét code này để rõ hơn:
```Dart
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
```
Với cascades, code trở nên ngắn hơn nhiều và ta không cần biến button
```Dart
querySelector('#confirm')
..text = 'Confirm'
..classes.add('important')
..onClick.listen((e) => window.alert('Confirmed!'));
```
Getters and setters
Ta có thể xác định getters và setters bất cứ khi nào ta cần kiểm soát một biến. Ví dụ: bạn có thể đảm bảo giá trị của thuộc tính là hợp lệ
```Dart
class MyClass {
  int _aProperty = 0;

  int get aProperty => _aProperty;

  set aProperty(int value) {
    if (value >= 0) {
      _aProperty = value;
    }
  }
}
```
giá trị của _aProperty điều kiện là phải >= 0

Ta cũng có thể sử dụng getter để xác định một thuộc tính được tính toán
```Dart
class MyClass {
  List<int> _values = [];

  void addValue(int value) {
    _values.add(value);
  }

  // A computed property.
  int get count {
    return _values.length;
  }
}
```
### 8. Optional positional parameters (tham số có hoặc không theo vị trí)
Dart có 2 loại tham số phương thức: vị trí và tên. Tham số vị trí là cái khá quen thuộc.
```Dart
int sumUp(int a, int b, int c) {
  return a + b + c;
}
// ···
  int total = sumUp(1, 2, 3);
```
Với Dart, ta có thể làm cho các tham số vị trí này là tùy chọn bằng cách đặt chúng trong dấu ngoặc vuông:
```Dart
int sumUpToFive(int a, [int? b, int? c, int? d, int? e]) {
  int sum = a;
  if (b != null) sum += b;
  if (c != null) sum += c;
  if (d != null) sum += d;
  if (e != null) sum += e;
  return sum;
}
// ···
  int total = sumUpToFive(1, 2);
  int otherTotal = sumUpToFive(1, 2, 3, 4, 5);
```
Các tham số tuỳ ý này luôn nằm cuối cùng trong danh sách tham số như bạn thấy bên trên. 
    
Giá trị mặc định của chúng là null trừ khi ta cung cấp một giá trị mặc định khác:
```Dart
int sumUpToFive(int a, [int b = 2, int c = 3, int d = 4, int e = 5]) {
// ···
}
// ···
  int newTotal = sumUpToFive(1);
  print(newTotal); // prints 15
```
### 9.Optional named parameters (tham số tuỳ chọn theo tên)
Thay vì sử dụng dấu ngoặc vuông thì ta sử dụng dấu ngoặc nhọn để làm các tham số tuỳ chọn với tên. Tuỳ chọn ở đây có nghĩ là tham số tuỳ chọn đó có thể có hoặc không
```Dart
void printName(String firstName, String lastName, {String? suffix}) {
  print('$firstName $lastName ${suffix ?? ''}');
}
// ···
  printName('Donald', 'Trump');
  printName('Vladimir', 'Vladimirovich', suffix: 'Putin');
```
Trên thì giá trị của tham số tuỳ chọn là null, và ta cũng có thể thêm giá trị mặc định. 
    
Nếu loại tham số là không thể null thì ta phải cung cấp giá trị mặc định (như đoạn code dưới) hoặc đánh dấu tham số theo yêu cầu (như được hiển thị trong constructor - bạn có thể xem bài viết trước của mình nhé).
```Dart
void printName(String firstName, String lastName, {String suffix = ''}) {
  print('$firstName $lastName $suffix');
}
```
**Chú ý: trong một phương thích thì chỉ có tuỳ chọn về postition (vị trí) hoặc name (tên)**
### 10. Tổng Kết
Vì những phần chú ý, khác biệt và cái hay của ngôn ngữ Dart cũng không phải ít, đẻ tránh khỏi dài thì mình sẽ chia sẻ ở bài viết sau. Vậy qua bài viết này mình đã chia sẻ về:
- Nội suy một String
- Biến có thể null, cách kiểm tra một biến null
- Truy cập property có điều kiện
- Lists, Sets, Maps,
- Syntax =>
- Cascades ..
- Getters và Setters
- Và optional parametter (position và name)

Cảm ơn đã theo dõi bài viết. hẹn gặp lại
Link tham khảo: https://dart.dev/