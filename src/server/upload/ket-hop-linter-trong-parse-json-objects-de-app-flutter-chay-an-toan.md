![image.png](https://images.viblo.asia/d1ed3c85-ce18-4016-8abf-c518bede3489.png)

Nhìn chung, việc bạn upgrade lên Dart 2.12 để làm việc với sound null safety là khá dễ dàng… ngoại trừ một điều: Tất cả các chuyển đổi JSON sang object của bạn đều bị lỗi và rất khó để tìm ra cách sửa lỗi.

Trong bài viết này, tôi sẽ giải thích cho bạn một số thông tin cơ bản đằng sau đó và cách chúng ta parse JSON objects an toàn hơn. Và thực sự tôi đã thay đổi suy nghĩ của mình về một số điều trong lúc làm việc, vì vậy tôi sẽ cho bạn thấy quá trình suy nghĩ của tôi, cách tôi tiếp cận đến vấn đề và giải quyết các tình huống có thể xảy ra lỗi trong quá trình làm việc với Dart 2.12.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/ket-hop-linter-voi-parse-json-trong-dart/)

## 1. Strong mode in analysis options

Tôi đã chuyển sang sử dụng [analysis_options.yaml](https://dart.dev/guides/language/analysis-options#the-analysis-options-file) và bật [strong mode](https://chromium.googlesource.com/external/github.com/dart-lang/dev_compiler/+/refs/heads/master/doc/STATIC_SAFETY.md) cùng thời điểm tôi bắt đầu sử dụng Dart 2.12 với sound null safety.

Giải thích thêm cho những bạn không biết về file analysis_options.yaml và tại sao phải sử dụng chúng:

* Đây gần giống như một file linter chứa tập hợp các rule khi làm việc với ngôn ngữ Dart được định nghĩa sẵn trong file này. Mình sử dụng từ gần giống vì bản chất nó còn powerful như vậy nữa. Ví dụ khi bạn đang làm việc với `StreamController` nhưng bạn quên close nó đi khi hết sử dụng, nó sẽ "nhắc nhở" bạn và khuyên bạn nên làm điều đúng đắn.
* Bạn có thể tìm hiểu và đọc tất cả rule tại [đây](https://dart-lang.github.io/linter/lints/). Tất nhiên đây là những rule được team Dart recommend và nó được update theo những bản cập nhật ngôn ngữ Dart.
* Hiện tại trên Pub có 2 package được Flutter khuyên dùng khi sử dụng để kết hợp với file trên đó là: [flutter_lints](https://pub.dev/packages/flutter_lints) và [lints.](https://pub.dev/packages/lints)
* Tôi thật lòng khuyên bạn sử dụng cho những dự án của mình, đặc biệt là trong các dự án lớn hoặc team đông người. Không những giúp code style của bạn được chặt chẽ hơn mà còn là một quy ước chung để code khi teamwork.

```
analyzer:
  strong-mode:
    implicit-casts: false
    implicit-dynamic: false
```

Kể từ Dart 2.12, implicit cast không còn được cho phép nữa. Vì vậy, việc đưa nó vào file trên dường như là thừa.

## 2. Implicit casts

Tắt implicit casts có nghĩa là Dart sẽ không tự động gán kiểu cho bạn:

```
num x = 3;
int y = x;   // not allowed
```

Vì `x` thuộc loại `num`, Dart sẽ không gán kiểu nó thành `int` cho bạn. Điều này đã từng được cho phép nhưng hiện nay không còn nữa. "Tại sao không?" bạn hỏi. “ `3` chắc chắn là một số nguyên.” Bởi vì nó có thể nguy hiểm. Nếu bạn “biết” đó là `int`, thì bạn có thể tự gán kiểu cho nó:

```
num x = 3;
int y = x as int;   // OK
```

Dart cho phép điều này bởi vì nó không còn là một gán kiểu không tường minh nữa; đó là một gán kiểu tường minh. Tuy nhiên, khi sử dụng như vậy nó vẫn chứa đầy rủi ro. Hãy xem tình huống sau:

```
num x = 3.1;
int y = x as int;   // runtime exception
```

Chương trình sẽ báo lỗi runtime exception cho bạn bởi vì bạn đang cố gắng cast một số `double` thành một số `int`. Tuy nhiên, đó hoàn toàn là lỗi của bạn và Dart sẽ không phải chịu trách nhiệm về loại lỗi đó nữa.

## 3. Implicit dynamic

Dart thường giả định rằng một biến bất kỳ sẽ có kiểu là `dynamic` khi nó không thể suy ra đó là kiểu dữ liệu gì. Đây là một ví dụ đơn giản:

```
var x;
```

Dart không có đủ thông tin để biết kiểu dữ liệu nào sẽ sử dụng cho biến `x`. Dart 2.12 sẽ sử dụng `dynamic` cho loại này. Tuy nhiên, nếu bạn tắt implicit dynamic trong analysis_options.dart như sau:

```
analyzer:
  strong-mode:
    implicit-dynamic: false
```

thì Dart sẽ không còn giả định `x` là `dynamic` nữa và sẽ cung cấp cho bạn lỗi trong thời gian biên dịch (compile-time error):

![image.png](https://images.viblo.asia/ecad51a2-4b64-40a1-ab47-3beb56a14b36.png)

"Tại sao không sử dụng `dynamic`?" bạn hỏi. "Điều đó có tác hại gì?". Bởi vì nó có thể nguy hiểm đến chương trình của bạn. Nếu không quan tâm, bạn có thể đặt lại thành `dynamic` và lỗi sẽ biến mất:

```
dynamic x;
```

Dart cho phép điều này vì nó không còn implicitly`dynamic` nữa; nó rõ ràng là `dynamic`. Tuy nhiên, khi sử dụng như vậy nó vẫn chứa đầy rủi ro. Hãy xem tình huống sau:

```
dynamic x;
x = 3;
x.length;
```

Chương trình của bạn sẽ bị crash. Sự cố đó xảy ra trong thời gian chạy bởi vì `3` là một số và không có thuộc tính có tên là `length`. Khi bạn sử dụng `dynamic`, bạn tắt tất cả kiểm tra tĩnh (nghĩa là thời gian biên dịch) và bạn không phát hiện ra lỗi cho đến thời gian chạy. Nếu bạn muốn làm điều đó, điều đó là tốt, nhưng Dart sẽ không chịu trách nhiệm về điều đó.

![image.png](https://images.viblo.asia/a3b55b9f-e88a-4950-b76d-07a3ce9fa20f.png)

## 4. Unpacking JSON (parse JSON)

Khi bạn sử dụng thư viện [convert ](https://api.dart.dev/stable/2.13.4/dart-convert/dart-convert-library.html)để chuyển đổi một chuỗi JSON thành một object trong Dart, `json.decode` sẽ trả về một giá trị `dynamic`.
Bạn cần phải sử dụng kiểu `dynamic` một cách rõ ràng, như sau:

```
dynamic myObject = json.decode(jsonString);
```

Hoặc bạn cần cast phía bên phải sang kiểu dữ liệu mà bạn mong muốn như sau:

```
final myObject = json.decode(jsonString) as Map<String, dynamic>;
```

Tất nhiên, như bạn đã học về gán kiểu không tường minh trước đó, nếu chuỗi JSON được parse hóa ra không phải là `Map` (ví dụ: nếu đó là `List`), thì điều này sẽ gây ra lỗi thời gian chạy (runtime error). Do đó, hãy chuyển nó đến cái chung nhất trong tất cả các object, `Object?`

```
final myObject = json.decode(jsonString) as Object?;
```

Lưu ý: dynamic và Object? tương tự nhau, nhưng chúng có một sự khác biệt nhỏ. dynamic nói rằng bạn không quan tâm đến kiểu dữ liệu, trong khi Object? nói rằng bạn không biết kiểu dữ liệu đó là gì. Chúng ta quan tâm đến kiểu dữ liệu, chúng ta chỉ không biết chắc chắn nó là gì.

## 5. Catching errors

Casting như Object sẽ không gây ra lỗi? Không hề vì có một cách khác mà code ở trên vẫn có thể gặp sự cố trong thời gian chạy. Lấy ví dụ sau:

```
final malformedJson = 'abc';
final myObject = json.decode(malformedJson) as Object?;
```

Chương trình sẽ throw một lỗi FormatException vì abc không phải là một [valid JSON string](https://jsonlint.com/)  (mặc dù "abc" với dấu ngoặc kép đi chăng nữa).

Vì vậy, hãy bao quanh decode bằng một try-catch block:

```
try {
  final myObject = json.decode(jsonString) as Object?;
} on FormatException catch (error) {
  print('JSON is in the wrong format');
}
```

Giờ đây chương trình sẽ không còn crash nữa, nhưng thứ chúng ta muốn là parse giá trị JSON cơ.

## 6. Maps

Trước tiên, chúng ta hãy xem xét tình huống sau đây. Giả sử jsonString có giá trị sau:

```
String jsonString = '''
{
  "name":"mary",
  "age":35
}
''';
```

Bạn muốn lấy được tên và tuổi từ object đó. Bạn có thể làm như sau:

```
try {
  final myObject = json.decode(jsonString) as Object?;
  if (myObject is! Map) throw FormatException();
  final name = myObject['name'] as String? ?? '';
  final age = myObject['age'] as int? ?? 0;
} on FormatException {
  print('JSON is in the wrong format');
}
```

Ghi chú:

* Vì bạn đang mong đợi kiểu giá trị sau khi decode json là Map và bạn throw một FormatException cho bất kỳ thứ gì không phải là Map, điều này cho phép Dart ngầm hiểu myObject sẽ có kiểu dữ liệu Map.
* Vì Dart biết myObject là Map, bạn có thể lấy giá trị bằng cách thông qua key. Ví dụ: myObject [‘name’]. Tuy nhiên, Dart không biết loại giá trị, vì vậy, một lần nữa, bạn có thể đặt rõ ràng là biến có kiểu dynamic hoặc cast nó với kiểu dữ liệu mà bạn mong muốn. Trong trường hợp này, chúng tôi gán kiểu các nullable types và cung cấp các giá trị mặc định nếu chúng thực sự là null.

Một lần nữa, gán kiểu có phần nguy hiểm. Điều gì sẽ xảy ra nếu myObject [‘name’] là 42? Điều đó sẽ làm crash ứng dụng vì 42 là một int, không phải là một String. Vì code nằm trong một khối try catch, bạn có thể xử lý tất cả các trường hợp ngoại lệ theo cùng một cách:

```
try {
  final myObject = json.decode(jsonString) as Object?;
  if (myObject is! Map) throw FormatException();
  final name = myObject['name'] as String? ?? '';
  final age = myObject['age'] as int? ?? 0;
} catch (error) {
  print('JSON is in the wrong format');
}
```

Code trên không còn bao gồm phần on FormatException và chỉ cho biết catch (error). Có thực sự cần thiết để gán kiểu dữ liệu cho các biến trên? Đây là một cách khác để đạt được kết quả tương tự bằng cách sử dụng dynamic:

```
try {
  dynamic myObject = json.decode(jsonString);
  dynamic name = myObject['name'];
  dynamic age = myObject['age'];
} catch (error) {
  print('JSON is in the wrong format');
}
```

Nó thực sự dễ đọc hơn. Nhưng mà có phải trước đó tôi đã bảo cách code này sẽ không an toàn? Điều gì sẽ xảy ra nếu bạn muốn chuyển nó thành object Person?
Đây là một class Person với một phương thức khởi tạo fromJson lấy một Map:

```
class Person {
  final String name;
  final int age;
  Person(this.name, this.age);
  factory Person.fromJson(Map<String, dynamic> json) {
    dynamic name = json['name'];
    dynamic age = json['age'];
    if (name is! String) name = '';
    if (age is! int) age = 0;
    return Person(name, age);
  }
}
```

Không có cách nào để bạn có thể throw exception ở đây, vì vậy không cần phải bọc nó trong một khối try-catch nữa. Ngoài ra, bạn còn phải chỉ định kiểu dữ liêu cho biến name và age bằng cách kiểm tra loại của chúng với is! và đưa ra các giá trị mặc định nếu chúng là null hoặc không đúng loại.

Và đây là cách bạn sẽ gọi hàm tạo đó:

```
try {
  dynamic myMap = json.decode(jsonString);
  if (myMap is! Map<String, dynamic>) throw FormatException();
  final person = Person.fromJson(myMap);
  print(person.name);
} catch (error) {
  print('JSON is in the wrong format');
}
```

Lần này, việc kiểm tra kiểu cần cụ thể hơn một chút (Map<String, dynamic> chứ không phải đơn thuần là Map nữa) trước khi bạn parseJson khi gọi hàm fromJson, miễn là đừng xảy ra bất kỳ lỗi FormatException nào, bạn sẽ được đảm bảo nhận được Person object.

## 7. List

Giả sử trong trường hợp JSON string của bạn là một danh sách chứ không phải là Map? Lấy ví dụ sau:

```
String jsonString = '''
[
  {
    "name":"bob",
    "age":22
  },
  {
    "name":"mary",
    "age":35
  }
]
''';
```

Trong ví dụ này, chúng ta sẽ có 2 JSON maps bên trong JSON list. Đây là cách bạn sẽ trích xuất giá trị của nó và tạo danh sách các object Person:

```
final myList = <Person>[];
try {
  dynamic jsonList = json.decode(jsonString);
  if (jsonList is! List) throw FormatException();
  for (dynamic item in jsonList) {
    if (item is! Map<String, dynamic>) continue;
    final person = Person.fromJson(item);
    myList.add(person);
  }
} on FormatException {
  print('JSON is in the wrong format');
}
```

Vì bạn đang mong đợi kiểu dữ liệu là một danh sách, bạn phải kiểm tra xem có đúng kiểu dữ liệu bạn muốn hay không và throw FormatException nếu bạn không nhận được. Điều này cho phép Dart ngầm định dynamic jsonList thành một List thực tế để bạn có thể chạy vòng lặp thông qua nó. Sau đó, bạn kiểm tra từng item và nếu đó là kiểu mà bạn mong đợi, bạn chuyển đổi nó thành object Person và thêm nó vào danh sách.

## Tóm lại:

Tôi hài lòng với kết quả ở đây. Nó safely unpacks bất kỳ string JSON nào mà bạn cung cấp cho nó, validate dữ liệu, giả định của bạn về cấu trúc là đúng hay sai và cung cấp các giá trị mặc định cho các giá trị trong trường hợp nó bị null.

Tôi đã thay đổi ý kiến ​​một chút về việc sử dụng tạm thời dynamic trong khi đã parse JSON. Trước kia tôi nghĩ sử dụng Object? tốt hơn, nhưng bây giờ tôi thích dynamic. Trước đây tôi đã [hỏi trên GitHub](https://github.com/dart-lang/sdk/issues/46017) rằng liệu json.decode có nên trả về Object? hơn là dynamic.[ Đây là câu trả lời](https://github.com/dart-lang/sdk/issues/46017#issuecomment-845113179) tôi nhận được từ một trong những kỹ sư của Google (Lasse R.H. Nielsen):

If you want more safety, you can easily introduce Object? jsonDecodeObject(String input) => jsonDecode(input); and use that instead.

> I also find that JSON is one of the places where dynamic access actually makes sense. The data structure is inherently dynamically typed. You typically expect a specific layout, and will have to throw if it isn’t satisfied anyway. As long as you assign the values you extract to the correct type immediately, you shouldn’t have lingering dynamics.

(Tạm dịch: Nếu bạn muốn an toàn hơn, bạn có thể dễ dàng sử dụng Object? jsonDecodeObject(String input) => jsonDecode(input);. Tôi cũng thấy rằng JSON là một trong những nơi mà truy cập động thực sự có ý nghĩa. Cấu trúc dữ liệu vốn được định kiểu động. Bạn thường mong đợi một bố cục cụ thể và sẽ phải loại bỏ nếu nó không hài lòng. Miễn là bạn chỉ định các giá trị mà bạn trích xuất cho đúng loại ngay lập tức, bạn sẽ không cần phải chỉ định dynamics nữa.)

Bài viết được dịch và viết lại, cũng như cung cấp thêm một số thông tin cần làm rõ hơn từ nguồn bài gốc: [Safely unpacking JSON objects in Dart.](https://suragch.medium.com/safely-unpacking-json-objects-in-dart-42d2eb12049d)

## Full Code

```
include: package:pedantic/analysis_options.yaml

analyzer:
  strong-mode:
    implicit-casts: false
    implicit-dynamic: false
```

```
import 'dart:convert';

void main() {
  implicitCastsExample();
  implicitDynamicExample();
  jsonMapExample();
  jsonListExample();
}

/// Implicit casts example
void implicitCastsExample() {
  // num x = 3;
  // int y = x;

  num x = 3;
  int y = x as int;

  // num x = 3.1;
  // int y = x as int;
}

/// Implicit dynamic example
void implicitDynamicExample() {
  // var x;
  dynamic x;
  x = 3;
  // x.length;
}

/// Map example
String jsonMapString = '''
{
  "name":"mary",
  "age":35
}
''';

void jsonMapExample() {
  try {
    dynamic myMap = json.decode(jsonMapString);
    if (myMap is! Map<String, dynamic>) throw FormatException();
    final person = Person.fromJson(myMap);
    print('${person.name} ${person.age}');
  } catch (error) {
    print('JSON is in the wrong format');
  }
}

/// List example
String jsonListString = '''
[
  {
    "name":"bob",
    "age":22
  },
  {
    "name":"mary",
    "age":35
  }
]
''';

void jsonListExample() {
  final myList = <Person>[];
  try {
    dynamic jsonList = json.decode(jsonListString);
    if (jsonList is! List) throw FormatException();
    for (dynamic item in jsonList) {
      if (item is! Map<String, dynamic>) continue;
      final person = Person.fromJson(item);
      myList.add(person);
    }
  } on FormatException {
    print('JSON is in the wrong format');
  }

  myList.forEach((person) => print('${person.name} ${person.age}'));
}

/// Data class
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);

  factory Person.fromJson(Map<String, dynamic> json) {
    dynamic name = json['name'];
    dynamic age = json['age'];
    if (name is! String) name = '';
    if (age is! int) age = 0;
    return Person(name, age);
  }
}
```