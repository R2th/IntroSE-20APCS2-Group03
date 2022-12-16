## Dart là gì? 
Dart là một ngôn ngữ lập trình tối ưu phía client dành cho các ứng dụng đa nên tảng. Được giới thiệu bởi Google vào năm 2011 và release bản 1.0 vào năm 2013,  nó dùng để xây dựng mobile, desktop, server, và web applications.
![](https://dart.dev/assets/dash/2x/paint-your-ui.png)
*Nguồn: https://dart.dev*

## Hello World
```dart
void main() {
  print('Hello World');
}
```

## Variable 
Trong Dart có 3 cách để khai báo 1 biến:

Đầu tiên chúng ta có thể dùng từ khóa `var`
```dart 
var yourName = 'My name is dart';
```

Một cách tương tự, trong dart cung cấp thêm một kiểu dữ liệu gọi là `dynamic`
```dart
dynamic yourName = 'My name is dart';
```

Trong trường hợp, chúng ta cần chỉ rõ kiểu dữ liệu khi khai báo, ta có thể:
```dart
String yourName = "My name is dart";
```

Giá trị mặc định của một biến trong dart sẽ là `null` kể cả kiểu số, vì nó là một ngôn ngữ thuần hướng đối tượng. 
``` dart
String yourName;
```

Đối với biến không bao giờ thay đổi, chúng ta nên dùng `final` hoặc `const` thay vì `var`. 

* `final` là biến có thể set một lần. 
* `const` là compile-time constant.

```dart
final name = 'Bob'; // Without a type annotation
final String nickname = 'Bobby';
```
Lúc này chúng ta không thể set lại hoặc thay đổi nó:
```dart
name = 'Alice'; // Error: a final variable can only be set once.
```

Ở top-level hoặc là biến của class, final phải được khởi tạo lần đầu khi nó được sử dụng.
```dart
class MyClass {
    final String name;
    MyClass({this.name});
}
```
Syntax này sẽ được nói đến trong nội dung về `class` và function. Ở đây chúng ta chỉ cần hiểu là biến `name` sẽ được gán khi gọi constructor của class `MyClass`.

Chúng ta sẽ dùng `const` nếu muốn nó là *compile-time constants*. Trong trường hợp nếu biến `const` là biến của class thì ta phải đặt nó là `static const`. Ngoài ra, chúng ta có thể khai báo và set giá trị cho biến `const` với kiểu số, chuỗi, hoặc kết quả của biểu thức. 

```dart
const bar = 1000000; // Unit of pressure (dynes/cm2)
const double atm = 1.01325 * bar; // Standard atmosphere
```

`const` không chỉ dùng để khai báo biến hằng, mà còn dùng để tạo các giá trị hằng cũng như khai báo constructor nhận các giá trị hằng. Bất kì biến nào cũng có thể có giá trị hằng. 
```dart 
var foo = const [];
final bar = const [];
const baz = []; // Equivalent to `const []`
```
Bên cạnh đó, chúng ta có thể thay đổi giá trị của một non-final, non-const variable,  ngay cả khi nó được dùng để có một const value: 
```dart
foo = [1, 2, 3]; // Was const []
```
Và cuối cùng, chúng ta cũng không thể thay đổi giá trị của một const variable.
```dart
baz = [42]; // Error: Constant variables can't be assigned a value.
```

## Built-in types
### Numbers 
Dart cung cấp 2 kiểu `int` và `double` là subtype của kiểu `num` cung cấp đầy đủ các toán tử cơ bản như +, -, * và /.
```dart 
// int
var x = 1;
var hex = 0xDEADBEEF;

// double 
var y = 1.1;
var exponents = 1.42e5;
```
Trong dart 2.1, kiểu `int` sẽ tự convert thành double như:
```dart
double z = 1 // Tương đương với double z = 1.0.
```

Để convert `String` thành `num`, chúng ta có thể dùng phương thức `parse(_)` trong `int` và `double`
```dart
var one = int.parse('1');
var onePointTwo = double.parse('1.2');
```

Ngược lại, để convert `num` sang `String`
```dart
String oneString = 1.toString(); // "1"
String piString = 3.14159.toString(); // "3.14159"
String piStringFixed2 = 3.14159.toStringAsFixed(2); // "3.14"
```

### Strings
Khi khai báo string trong dart, chúng ta có thể dùng dấu nháy đơn hoặc nháy kép đều được. 
```
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```
Ngoài ra, để chèn một biến hoặc một biểu thức vào chuỗi bằng ta dùng `${expression}` như:
```dart
var yourName = "Bob";
var yourOld = 12;
print("My name is $yourName. I'm $yourOld");
```
Nối chuỗi ta có thể dùng các chuỗi liền kề hoặc dùng toán tử `+`
```dart
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
var s2 = 'The + operator ' + 'works, as well.';
```

Một cách khác, để khai báo chuỗi trên nhiều dòng, ta có thể dùng `'''` hoặc `"""`
```dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```
### Boolean
Kiểu `bool` đại diện cho giá trị boolean trong dart
```dart
// Check for an empty string.
var fullName = '';
assert(fullName.isEmpty);

// Check for zero.
var hitPoints = 0;
assert(hitPoints <= 0);

// Check for null.
var unicorn;
assert(unicorn == null);

// Check for NaN.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```
### Lists
Trong dart, *array* là một `List` objects. Để khai báo một list:
```dart
var list = [1, 2, 3];
```
Index của dart `List` cũng bắt đầu từ 0, và phần tử cuối cùng là ` list.length - 1`
```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```
Dart 2.3 giới thiệu **spread operator (`...`)** và **null-aware spread operator (`...?`)**, cung cấp một cách ngắn hơn để insert nhiều elements vào trong collection.
Ví dụ, chúng ta có thể insert tất cả các elements của một list vào trong list khác như:
```dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```
Trong trường hợp list có thể null, để tránh exception ta nên dùng null-aware spread operator (...?):
```dart
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```
Dart 2.3 cũng giới thiệu  **collection if** và **collection for**, dùng để build một collection với điều kiện if và vòng lặp for.
```dart
// collection if 
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];

// collection for 
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
assert(listOfStrings[1] == '#1');
```
### Sets & Maps
```dart
// set
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
Set<String> names = {}; // This works, too.

// map 
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};
var names = {}; // Creates a map, not a set.
```

## Functions
Dart là một ngôn ngữ thuần hướng đối tượng, do vậy ngay cả function của nó cũng có thể gán cho biến hoặc truyền vào như một tham số của function khác.
Ví dụ, để thực hiện một function ta có thể khai báo:
```dart 
int sum(int first, int second) {
  return first + second;
}
```
Trong dart cho phép lược bỏ các kiểu dữ liệu trả về và tham số của function như bên dưới, nhưng điều này không được khuyến nghị.
```dart
sum(first, second) {
  return first + second;
}
```
Trường hợp function chỉ có một biểu thức, chúng ta có thể đơn giản nó như dưới đây:
```dart 
int sum(int first, int second) => first + second;
```

Function trong dart có thêm 2 khái niệm đó là *required* và *optional* parameters. 
- *required* sẽ nằm ở đầu tiên.
- tiếp sau đó là *optional*.
### Optional parameters
Optional parameters có thể truyền theo tên hoặc theo vị trí. Nhưng không đồng thời có cả 2. 

**Named parameters**

Khi gọi một function ta có thể chỉ định tên của các params, với điều kiện ta phải dùng `{param1, param2, …}` khi khai báo chúng. Bên cạnh đó, khi đã được chỉ định tên, thì vị trí các params có thể thay đổi. Ví dụ như: 
```dart 
void main() {
  print("${sum(first: 1, second: 2)}"); // (1)
  print("${sum(second: 2, first: 1)}"); // (2)
  // both (1) and (2) are the same
}

int sum({int first, int second}) => first + second;
```
Mặc dù **named parameters** là một kiểu của optional parameter, tức là chúng ta có thể bỏ qua và không cần pass param đó. 
```dart
sum(first: 1);
sum(second: 2);
```
Tuy nhiên chúng ta có thể sử dụng `@required` annotation để chú thích rằng param đó là bắt buộc. 
```dart
sum(first: 1, second: 2);
sum(first: 1); // Warning: The parameter 'second' is required 
```
Để dùng `@required` annotation, chúng ta phải có [**meta**](https://pub.dev/packages/meta) package và `import package:meta/meta.dart`.

**Positional parameters**

Để khai báo optional positional parameters, ta sẽ bỏ nó trong dấu `[]`
```dart
int sum(int first, int second, [int third]) {
  if(third != null) {
    return first + second + third;
  }
  return first + second;
}

// without the optional parameter
sum(1, 2)

// with the third parameter
sum(1, 2, 3)
```

**Default parameter values**

Để định nghĩa default value cho named và positional parameters ta sẽ dùng dấu `=` sau param và trước giá trị default. *Default value phải là một compile-time constants*. Nếu ta không cung cấp giá trị default, thì nó sẽ là `null`. 
```dart
void main() {
  print(sum1(1, 2)); // print: 3
  print(sum1(1, 2, 3)); // print: 6
  print(sum2(1, 2)); // print: 3
  print(sum2(1, 2, third: 3)); // print: 6
}

// Default parameter values with positional parameters
int sum1(int first, int second, [int third = 0]) {
  return first + second + third;
}

// Default parameter values with named parameters
int sum2(int first, int second, {int third = 0}) {
  return first + second + third;
}
```

Ví dụ về trường hợp param là một `List`
```dart
void main() {
  print(sum()); // print: 6
}

int sum({List list = const [1, 2, 3]}) {
  var sum = 0;
  list.forEach((e) {
    sum += e;
  });
  return sum;
}
```
Như mình đã đề cập phía trên, default value phải là một compile-time constants. Nên trong trường hợp này, khi khai báo `List` ta phải có `const` keyword. Nếu không có thì compiler sẽ báo lỗi:
```dart
Error: Constant expression expected.
```

### Functions as first-class objects
Pass một function như parameter vào function khác. Ví dụ như:
```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// Pass printElement as a parameter.
list.forEach(printElement);
```

Hoặc gán nó như một biến như bên dưới
```dart
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

### Anonymous functions
Hầu hết các function đều có một cái tên cho nó, tuy nhiên có một loại function không có tên và nó được gọi là *anonymous functions* hoặc *lamda* hoặc *closure*. Chúng ta thường dùng nó để assign cho một biến hoặc truyền trực tiếp cho một function khác. 
Syntax cho một anonymous functions: 
```dart 
([[Type] param1[, …]]) { 
  codeBlock; 
}; 
```
Dưới đây là một ví dụ về anonymous function với một tham số đầu vào `item`:
```dart
var list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});
// 0: apples
// 1: bananas
// 2: oranges
```
Trong trường hợp nó chỉ có một biểu thức như trên, ta cũng có thể rút gọn như functions bình thường như:
```dart
list.forEach(
    (item) => print('${list.indexOf(item)}: $item'));
```

Cuối cùng, để tìm hiểu thêm về phạm vi của biến trong functions, bạn có thể tìm hiểu thêm về [lexical scope](https://dart.dev/guides/language/language-tour#lexical-scope) và [lexical closures](https://dart.dev/guides/language/language-tour#lexical-closures). Nó tương tự các ngôn ngữ lập trình khác.

## Operators 
Dart cung cấp đầy đủ các toán tử giống như mọi ngôn ngữ lập trình khác. Bạn có thể xem thêm [tại đây](https://dart.dev/guides/language/language-tour#operators). 
Chúng ta sẽ chỉ đề cập đến một vài toán tử đặt biệt: 
- Type test operators
- Conditional expressions
- Cascade notation (..)
- Conditional member access

### Type test operators

Dart cung cấp 3 operators: `as`, `is`, và `is!` dùng để ép và kiểu tra kiểu dữ liệu tại runtime.
- `as` dùng để ép kiểu
- `is` trả về true nếu đúng kiểu được chỉ ra.
- `is!` trả về true nếu không đúng kiểu được chỉ ra. 
```dart
(emp as Person).firstName = 'Bob';
// or 
if (emp is Person) {
  // Type check
  emp.firstName = 'Bob';
}
```
### Conditional expressions
Tương tự C/C++, Dart cũng cung cấp toán tử điều kiện với syntax:
```dart
condition ? expr1 : expr2
```
Nếu điều kiện đúng trả về `expr1`, ngược lại trả về `expr2`
```dart 
var visibility = isPublic ? 'public' : 'private';
```

Ngoài ra, trong trường hợp cần kiểm tra nullable, chúng ta có thể dùng.
```dart
expr1 ?? expr2
```
Nếu `expr` là `null` thì trả về `expr2`
```dart 
String playerName(String name) => name ?? 'Guest';
// equal with
String playerName(String name) {
    if(name == null){
        return 'Guest';
    }
    return name;
}
```

### Cascade notation (..)
`..` cho phép thực hiện chuỗi các operations trên cùng một object. 
Ví dụ như:
```dart
querySelector('#confirm') // Get an object.
  ..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```
và 
```dart
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
```
Vì `querySelector` return một selector object. Vì vậy nó cho phép cascade notation hoạt động trên selector object này. Tuy nhiên hãy cẩn thận trong trường hợp
```dart
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
```
Vì `write` return `void`, và chúng ta không thể cascade trên `void`.

### Conditional member access
Tương tự trong Kotlin, Dart cũng cung cấp một toán tử cho null-safely, `.?`
```dart
void main() {
  Greeting greeting;
  
  greeting.sayHello(); // makes TypeError: Cannot read property 'sayHello$0' of null
  
  greeting?.sayHello(); // don't call sayHello() method because greeting is null
  // equal with
  if(greeting != null) {
    greeting.sayHello();
  }
  
  greeting = Greeting();
  greeting.sayHello(); // print: hello
}

class Greeting {
  void sayHello() {
    print("hello");
  }
}
```

## Control flow statements
Dart cung cấp đầy đủ câu lệnh lặp và điều kiện, được ví dụ như bên dưới:
- `if` và `else`
```dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```
- `for` loops

Vòng lặp for tiêu chuẩn:
```dart
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```

`for` trong các collections 
```dart
var collection = [0, 1, 2];
for (var x in collection) {
  print(x); // 0 1 2
}
```
- `while` và `do-while` loops
```dart
// while: Kiểm tra điều kiện trước khi lặp
while (!isDone()) {
  doSomething();
}

// do-while: Kiểm tra điều kiện sau khi lặp.
do {
  printLine();
} while (!atEndOfPage());
```
- `break` và `continue`
```dart
// Use break to stop looping
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}

// Use continue to skip to the next loop iteration
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```
- `switch` và `case`
```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
```
`default` sẽ thực hiện trong trường hợp không vào các case khác. Nếu miss một break của case nó sẽ gây ra một error:
```dart
var command = 'OPEN';
switch (command) {
  case 'OPEN':
    executeOpen();
    // ERROR: Missing break

  case 'CLOSED':
    executeClosed();
    break;
}
```
Tuy nhiên, dart vẫn cho phép điều đó khi case đó empty. 
```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // Empty case falls through.
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```
- Trong trường hợp, bạn vẫn muốn qua nó, thì có thể dùng continue statement và một lable như phía dưới. 
```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
  // Continues executing at the nowClosed label.

  nowClosed:
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```

## Exceptions
Với dart chúng ta cũng có thể throw và catch exception như trong Java, Kotlin hay các ngôn ngữ khác. Về cơ bản, exception là một lỗi không mong muốn xảy ra lúc runtime. 

Dart cung cấp 2 kiểu `Exception` và `Error`, cũng như các kiểu khác được kế thừa từ chúng. Chúng ta hoàn toàn có thể định nghĩa exception của riêng mình. Tuy nhiên, Dart có thể throw bất kể non-null object, không chỉ Exception và Error. 

### Throw
Throw một exception 
```dart
throw FormatException('Expected at least 1 section');
```
Ngoài ra, chúng ta cũng có thể ném một đối tượng bất kì.
```dart
throw 'Out of llamas!';
```

### Catch
Việc catch một ngoại lệ, sẽ ngăn chặn nó lan rộng và ảnh hưởng đến các chức năng khác. 
```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

Trong trường hợp throw nhiều hơn một exception ta có thể dùng
```dart 
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```
Nếu chúng ta không chỉ rõ kiểu của exception, nó sẽ handle bất kì kiểu nào được ném ra.

Trong catch chúng ta có thể chỉ rõ 1 hoặc 2 params. Param đầu tiên là exception được throw, còn param thứ 2 là stack trace. 
```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

Dart còn cung cấp `rethrow` keyword, cho phép ném lại exception đó. 
```dart
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
```

### Finally
Finally đảm bảo luôn được gọi mặc cho có hoặc không throw exception. Trong trường hợp k có catch, exception tiếp tục được lan truyền sau khi `finally` được gọi.
```dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

`finally` sẽ run sau catch, nếu có nó. 
```dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```
## Classes
### Using class members
Trong Dart, chúng ta có thể truy cập vào method, hoặc biến của class thông qua `.` hoặc `.?`.
```dart
var p = Point(2, 2);

// Set the value of the instance variable y.
p.y = 3;

// If p is non-null, set its y value to 4.
p?.y = 4;
```
Đối với các biến là nullable, chúng ta nên dùng `.?` để tránh null exception.

### Constructors
Dart cung cấp 3 kiểu constructor đó là:  `ClassName`, `ClassName.identifier` hoặc Factory constructors.
```dart
void main() {
  var point1 = Point(1, 2);
  var point2 = Point.fromJson({"x": 3, "y": 4});
  
  print("(${point1.x}, ${point1.y})"); // (1, 2)
  print("(${point2.x}, ${point2.y})"); // (3, 4)
}

class Point {
  int x;
  int y;
  
  // ClassName constructor
  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
  // or, its automatic assign x, and y like above
  Point(this.x, this.y);
  
  // ClassName.identifier constructor
  Point.fromJson(Map<String, dynamic> json){
    this.x = json["x"];
    this.y = json["y"];
  }
}
```
`ClassName.identifier` dùng để định nghĩa nhiều constructors trong class và khiến chúng rõ ràng hơn. 

Trong trường hợp không được khai báo bất kì constructor nào thì class sẽ dùng *default constructor*, đây là một constructor với không có đối số đầu vào cũng như nó sẽ gọi constructor không có đối số của superclass. 

#### Constant constructors
Một số class cung cấp constant constructors. Để tạo một compile-time constant sử dụng constant constructor, chúng ta sẽ đặt `const` keyword trước constructor name:
```dart
void main() {
  var point = const ImmutablePoint(1, 2);
  print("(${point.x}, ${point.y})");
}

class ImmutablePoint {
  final int x;
  final int y;

  const ImmutablePoint([this.x, this.y]);
}
```

Khi chúng ta tạo 2 compile-time constants giống nhau, thì chúng sẽ là một instance.
```dart
void main() {
  var a = const ImmutablePoint(1, 1);
  var b = const ImmutablePoint(1, 1);
  print("${identityHashCode(a)}, ${identityHashCode(b)}"); // They are the same instance!
}

class ImmutablePoint {
  final int x;
  final int y;

  const ImmutablePoint([this.x, this.y]);
}
```
Trong trường hợp chúng k đồng thời là constant hoặc cả hai không là constant. Thì chúng sẽ là 2 instance khác nhau. 

```dart
var a = const ImmutablePoint(1, 1); // Creates a constant
var b = ImmutablePoint(1, 1); // Does NOT create a constant
print("${identityHashCode(a)}, ${identityHashCode(b)}"); // They are different
```
Hoặc,
```dart
var a = ImmutablePoint(1, 1); // Does NOT create a constant
var b = ImmutablePoint(1, 1); // Does NOT create a constant
print("${identityHashCode(a)}, ${identityHashCode(b)}"); // They are different
```
Gọi một non-default superclass constructor
```dart
class Person {
  String firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson(data).
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

main() {
  var emp = new Employee.fromJson({});

  // Prints:
  // in Person
  // in Employee
  if (emp is Person) {
    // Type check
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
}
```

#### Redirecting constructors
Đôi khi chúng ta cần redirect đến một constructor khác trong một class. Ta có thể thực hiện như sau:
```dart
class Point {
  num x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}
```
#### Factory constructors
Dùng để implement một constructor mà nó không nhất thiết phải tạo new instance của chính class đó, mà có thể trả về instance của subtype.
```dart
void main() {
  final dog = Animal.createAnimal("dog");
  final cat = Animal.createAnimal("cat");
  print(dog);
  print(cat);
}

abstract class Animal {
  // default constructor
  Animal();
  
  // factory constructor
  factory Animal.createAnimal(String type) {
    if (type == "dog") {
      return Dog();
    } else {
      return Cat();
    }
  }
}

class Dog extends Animal {}

class Cat extends Animal {}
```

### Methods
Methods là các functions cung cấp hành vi của một object.
#### Instance methods
Instance methods là method có thể truy cập vào instance variables và `this`.
```dart
class Point {
  num x, y;

  Point(this.x, this.y);

  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```
#### Getters and setters
Là các method đặt biệt, cung cấp read và write access vào thuộc tính của objects. Trong dart, ta có thể dùng `set` và `get` keyword để định nghĩa 2 method này. 
```dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

#### Abstract methods
Abstract methods, là method chưa định nghĩa nội dung và phải nằm trong abstract classes.
```dart
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```

### Abstract classes
Abstract classes sẽ không thể khởi tạo instance, chứa các abstract methods, thường dùng để định nghĩa các interface. 
```dart
// This class is declared abstract and thus
// can't be instantiated.
abstract class AbstractContainer {
  // Define constructors, fields, methods...

  void updateChildren(); // Abstract method.
}
```
#### Implicit interfaces
Không giống như Java, hay Kotlin. Dart không định nghĩa cụ thể một `interface` keyword, mà thay vào đó. khi một class `implement` một class khác, thì mặc định class đó sẽ là một interface, và chúng ta chỉ định nghĩa các được function của class đó ở subclass, mà không thể kế thừa từ nó. 
```dart
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```
Một class thì có khả năng `implements` nhiều interface.
```dart
class Point implements Comparable, Location {...}
```
### Extending a class
Dùng từ khóa `extends` để kế thừa một class trong dart, và nó cung cấp cho chúng ta `super` keyword để có thể refer đến superclass.
```dart
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  @override
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```
Chúng ta dùng `@override` anotation để chỉ ra đây là phương thức được override.
Bên cạnh đó, Dart cũng hỗ trợ *overridable operators*, bạn có thể xem thêm [ở đây](https://dart.dev/guides/language/language-tour#methods).

### Extension methods
Chúng ta có thể mở rộng methods của một class mà không nhất thiết phải kết thừa nó, bằng cách sử dụng extension methods.
```dart
void main() {
  final greeting = Greeting();
  greeting.sayGoodbye();
}

class Greeting {
  void sayHello() {
    print("Hello");
  }
}

extension ExtensionGreeting on Greeting {
  void sayGoodbye() {
    print("bye");
  }
}
```
- `ExtensionGreeting` là name của extension, chúng ta có thể lược bỏ nó. 
```dart
extension on Greeting {
  void sayGoodbye() {
    print("bye");
  }
}
```
- `Greeting` là tên class cần thêm extension methods.
- `sayGoodbye` method được bổ sung.

### Enumerated types
Enumerated types, thường được gọi là *enumerations* hoặc *enums*, là một loại class đại diện cho fixed number (số cố định) của constant values.
#### Using enums
chúng ta sẽ dùng `enum` keyword để khai báo nó,
```dart
enum Color { red, green, blue }
```
mỗi value trong enum có một `index` getter, nó sẽ return vị trí của value được khai báo. Ví dụ, value đầu tiên sẽ có index 0, và value thức 2 sẽ có index 1.
```dart
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);
```
Để get tất cả giá trị của enums, chúng ta có thể dùng `values` constant.
```dart
List<Color> colors = Color.values;
assert(colors[2] == Color.blue);
```
Dưới đây là một ví dụ về việc sử dụng enums
```dart
var aColor = Color.blue;

switch (aColor) {
  case Color.red:
    print('Red as roses!');
    break;
  case Color.green:
    print('Green as grass!');
    break;
  default: // Without this, you see a WARNING.
    print(aColor); // 'Color.blue'
}
```
Chúng ta nên lưu ý một số giới hạn trong enum:
- Không có subclass, mix in, hoặc implement một enum.
- Không thể khởi tạo rõ ràng một enum.

### Class variables and methods
Class variables và methods sẽ có `static` keyword. 
- Class variables (Static variables): Biến đại diện cho trạng thái toàn class và constants.
```dart
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
```
Static variables không được khởi tạo cho đến khi nó được dùng.

- Class methods (Static methods): Không truy cập được instance của class, cũng như `this`, nhưng có thể truy cập vào static variables.
```dart
class Point {
  num x, y;
  Point(this.x, this.y);

  static num distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```

### Adding features to a class: mixins
Minxins là cách để reuse code của một class trong nhiều class hierarchies.Hay nói cách khác, mixin là một class chứa các methods và variables dùng cho class khác, mà không phải superclass của class đó.  
Để dùng mixin, chúng ta sẽ dùng `with` keyword theo sau bởi một hoặc nhiều mixin names. 

```dart
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

Để *implement* một mixin, chúng ta create một class extends Object , khai báo *no constructors* và mixin keyword thay vì class.
```dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

Trong trường hợp mixin muốn mix với một mixin hoặc một class khác, thì nó có thể dùng keyword `on`.
```dart
mixin MusicalPerformer on Musician {
  // ···
}
```

## Asynchrony support
Dart cung cấp 2 đối tượng `Future` và `Stream` để phục vụ việc xử lý bất đồng bộ, bên cạnh `async` và `await` keywords. Khiến cho việc xử lý bất đồng bộ đơn giản hơn.

### Handling Futures
Khi cần nhận result của Future đã hoàn thành, chúng ta có thể dùng:
- `async` và `await`.
- [Future API](https://dart.dev/guides/libraries/library-tour#future)

Code dùng async và await là bất đồng bộ, tuy nhiên trông giống như code đồng bộ. Chúng ta có thể xem ví dụ dưới đây.
```dart
await lookUpVersion();
```
Để sử dụng được `await` thì function chứa nó phải được khai báo là async-function.
```dart
Future checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```
Chúng ta nên dùng `try`, `catch` và `finally` để handle error và cleanup code dùng với `await`.
```dart
try {
  version = await lookUpVersion();
} catch (e) {
  // React to inability to look up the version
}
```
Ngoài ra, chúng ta có thể gọi `await` nhiều lần trong async function. 
```dart
var entrypoint = await findEntrypoint();
var exitCode = await runExecutable(entrypoint, args);
await flushThenExit(exitCode);
```
Trong `await` *`expression`*, giá trị của *`expression`* thường là `Future`. Nếu không, thì sau đó giá trị sẽ tự động wrap với Future. Một Future chỉ ra một object sẽ được return ở tương lai. 

#### Declaring async functions
Async function là function được mark `async` ở body. Với `async` keyword sẽ giúp cho function trả về một `Future` objects.
Đây là một function bình thường:
```dart
String lookUpVersion() => '1.0.0';
```
Còn đây là một async function
```dart
Future<String> lookUpVersion() async => '1.0.0';
```

### Handling Stream
Khác biệt giữa Stream và Future đó là stream là asynchronous sequence of data (chuỗi bất đồng bộ data). Để get được gía trị của Stream chúng ta cũng có 2 option:
- Dùng `async` và asynchronous for loop (`await for`)
- Dùng [`Stream API`](https://dart.dev/guides/libraries/library-tour#stream)

 Ví dụ về async và stream:
```dart
Future<int> sumStream(Stream<int> stream) async { // (4)
  var sum = 0;
  await for (var value in stream) { // (3)
    sum += value;
  }
  return sum;
}

Stream<int> countStream(int to) async* { // (1)
  for (int i = 1; i <= to; i++) {
    yield i; // (2)
  }
}

main() async {
  var stream = countStream(10);
  var sum = await sumStream(stream);
  print(sum); // 55
}

```
- (1) `countStream` sẽ return một `Steam<Int>` bằng việc sử dụng `async*`.
- (2) Để emit value cho một stream, ta dùng keyword `yield`.
- (3) Dùng `await for` để wait value sẽ emit về từ chuỗi stream.
- (4) `await for` phải nằm trong `async` function.


## Comments

Dart support 3 loại comments  
- Single-line comments: Bắt đầu với `//`. Những gì sau `//` và trước khi EOL (end of line) sẽ được compiler ignore.
```dart
void main() {
  // TODO: refactor into an AbstractLlamaGreetingFactory?
  print('Welcome to my Llama farm!');
}
```
- Multi-line comments:  Bắt đầu với `/*` và kết thúc với `*/`. Những gì bên trong `/*` và `*/`  sẽ được compiler ignore.
```dart
void main() {
  /*
   * This is a lot of work. Consider raising chickens.

  Llama larry = Llama();
  larry.feed();
  larry.exercise();
  larry.clean();
   */
}
```
- Documentation comments: Nó có thể là multi-line hoặc single-line comments, bắt đầu với `///` hoặc `/**`. 

Dùng liên tiếp `///` trên các dòng có hiệu quả giống như multi-line doc comment. 

Bên trong documments comment, dart compiler sẽ ignore các text bên trong dấu ngoặc. Bằng việc sử dụng dấu ngoặc trong doc comment sẽ giúp chúng ta có thể tham chiếu đến classes, methods, fields, top-level vars, functions và các params. 

```dart
/// A domesticated South American camelid (Lama glama).
///
/// Andean cultures have used llamas as meat and pack
/// animals since pre-Hispanic times.
class Llama {
  String name;

  /// Feeds your llama [Food].
  ///
  /// The typical llama eats one bale of hay per week.
  void feed(Food food) {
    // ...
  }

  /// Exercises your llama with an [activity] for
  /// [timeLimit] minutes.
  void exercise(Activity activity, int timeLimit) {
    // ...
  }
}
```
Khi dùng [documentation generation tool](https://github.com/dart-lang/dartdoc#dartdoc) để tạo documents thì `[Food]` sẽ link đến API docs cho `Food` class.

## References
1. https://dart.dev/guides/language/language-tour