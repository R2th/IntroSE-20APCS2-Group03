![image.png](https://images.viblo.asia/a31e9450-3ca0-47f4-b777-9be05b7b9950.png)

Bạn có thể tham khảo bài viết trước về việc tạo ứng dụng đầu tiên của bạn với Flutter [ở đây](https://200lab.io/blog/flutter-co-ban-xay-dung-ung-dung-dau-tien/). Còn bây giờ, chúng ta hãy cùng nhau tìm hiểu những điều cơ bản về **Dart**, ngôn ngữ lập trình cho phép chúng ta viết code logic phức tạp hơn.

**200Lab** đã publish một seri rất chi tiết về ngôn ngữ **DART** tại đây:
https://200lab.io/blog/tu-hoc-ngon-dart-nhung-dieu-can-biet-truoc-khi-bat-dau/

## Biến và kiểu dữ liệu

Dart là một ngôn ngữ hướng đối tượng có kiểu dữ liệu tĩnh (static typed). Một biến không gán giá trị khi khởi tạo sẽ có giá trị `null` theo mặc định. Chúng ta cũng có thể gán giá trị `null` một cách tường minh cho một biến tại thời điểm khai báo biến, hoặc tại bất kỳ thời điểm nào đó trong chương trình.

### Các kiểu dữ liệu cơ bản

Dart có các kiểu dữ liệu `int, double, bool, String` là kiểu dữ liệu **Cơ bản** trong dart. Trong suốt thời gian tồn tại của một biến, nó chỉ dùng với đúng kiểu dữ liệu mà nó đã được định nghĩa ban đầu. Mọi nỗ lực gán dữ liệu khác kiểu sẽ dẫn đến **lỗi biên dịch**.

Giá trị `infinity` là một thuộc tính static của `double` class và nó có thể được truy cập bằng cách sử dụng `double.infinity`. Một số thuộc tính quan trọng hơn mà bạn nên tham khảo [ở đây](https://api.flutter.dev/flutter/dart-core/double-class.html#constants).

### Từ khóa `var`

Chúng ta có thể gán bất kỳ giá trị nào cho một **biến** được khai báo kiểu `var` và Dart sẽ tự động suy ra kiểu của nó từ **giá trị khởi tạo**. Kiểu dữ liệu tự suy (Type-inference) là một tính năng được tích hợp sẵn của Dart.

### Kiểu dữ liệu `num`

Từ khóa `num` cũng có sẵn trong dart cho phép chúng ta tạo các biến có thể chứa cả giá trị `int` và `double`. Trường hợp sử dụng của nó có thể là nơi một biến có thể chứa các giá trị kiểu `int` hoặc kiểu `kép` ( `double` ) tại bất kỳ thời điểm nào.

### Chuỗi (String)

Một chuỗi có thể được khai báo bằng cách sử dụng dấu nháy đơn `' '` hoặc dấu nháy kép `" "` tương tự như **Javascript**. Bạn cũng có thể sử dụng dấu ngoặc kép đơn `'''` hoặc dấu ngoặc kép `"` để ngắt một dòng đơn thành nhiều dòng code.

### Kiểu dữ liệu `động` (`dynamic`)

Bạn có thể khai báo một biến `dynamic` một cách rõ ràng bằng cách sử dụng từ khóa `dynamic` hoặc nó được tự động gán bằng dart khi kiểu dữ liệu không được khai báo **rõ ràng**.

**Lưu ý,**

> Luôn sử dụng kiểu dữ liệu `dynamic` một cách thận trọng và khai báo kiểu dữ liệu của bạn một cách rõ ràng thường xuyên nhất có thể. Nếu không làm như vậy có thể tạo ra một số lỗi nhất định trong code của bạn. **Lưu ý** - Chỉ sử dụng `dynamic` khi bạn biết rõ mình đang làm gì.

## Hàm (function)

Dart là một **typed language** có nghĩa là mọi thứ trong Dart đều có một **kiểu** (type), hàm cũng vậy! Hãy xem xét một ví dụ về hàm `main` bên dưới.

### Hàm `main`
```
void main() {
  for (int i = 0; i < 5; i++) {
    print('hello ${i + 1}');
  }
}
```

Hàm này có kiểu trả về là `void`. Dart tự động gọi hàm `main`(){...} cho bạn khi ứng dụng của bạn khởi động. Đây là một vòng lặp for đơn giản thực thi khi hàm `main` này được gọi.

Nói chung, bạn có thể đặt tên cho bất kỳ chức năng nào bằng bất kỳ tên nào bạn muốn nhưng `main` là một tên đặc biệt vì nó là **điểm khởi động** của bất kỳ ứng dụng Dart nào.

**Lưu ý,**

> Bạn nên tuân theo quy ước về camel-case để đặt tên cho các hàm của mình, tức là yourFunctionName(){}.

## Cách dùng hàm (function)

### Xác định các chức năng cho hàm của bạn

Như đã thảo luận ở trên, bạn có thể xác định hàm của mình và đặt tên cho nó bằng cách sử dụng camel-case. Nếu bạn đang trả về giá trị từ hàm thì kiểu trả về của hàm phải được khai báo. Nó không bắt buộc nhưng nếu bạn không làm điều đó thì Dart sẽ không báo lỗi mà thực hiện nó với một cảnh báo. Chúng ta hãy xem xét ví dụ này về các hàm có kiểu trả về và không có kiểu trả về,

```
addTwoNumbers(num1, num2){
  print(num1 + num2);
}

void addTwoIntegerNumbers(int num1, int num2){
  print(num1 + num2);
}

int sumOfTwoNumbers(int num1, int num2){
  return num1 + num2;
}


void main() {
  addTwoNumbers(1, 2);
  addTwoIntegerNumbers(3,4);
  print (sumOfTwoNumbers(10,20));
}
```

Bây giờ, chúng ta hãy xem xét hàm đầu tiên `addTwoNumbers(...){...}`. Hàm này không có kiểu trả về và kiểu đối số được khai báo rõ ràng. Vì vậy, Dart vẫn sẽ phân tích cú pháp và thực thi chức năng này như,

```
dynamic addTwoNumbers(dynamic num1, dynamic num2)
```

Dart tự động gán kiểu `dynamic` cho hàm và các đối số. Bạn có thể chuyển bất kỳ loại dữ liệu nào làm đối số cho hàm này và dart sẽ cố gắng thêm chúng. Nhưng kiểu khai báo hàm này dễ **xảy ra lỗi** hơn vì việc bạn có thể thêm kiểu `int` và `bool` sẽ không gây ra lỗi biên dịch mà là lỗi runtime!

Hàm thứ hai `void addTwoIntegerNumbers(int num1, int num2){...}` ít bị lỗi hơn vì chúng ta đã khai báo rõ ràng kiểu trả về và các kiểu đối số, tức là `void` và `int`. Ngay sau khi bạn chuyển bất kỳ dữ liệu nào khác không phải là `int` vào hàm này, trình biên dịch sẽ bắt **cảnh báo** bạn.

Hàm thứ ba `int sumOfTwoNumbers(int num1, int num2){...}` có kiểu trả về là `int` bởi vì thay vì in tổng, chúng ta trả về nó từ hàm.

Trong hàm `main`, chúng ta gọi các phương thức này bằng tên của chúng và để thực thi chúng, chúng ta thêm `() dấu ngoặc đơn`.

### Tôi nhắc lại lần nữa! Bạn hãy tránh dynamic type!

Dart là sự kết hợp của ngôn ngữ strongly-typed cũng như ngôn ngữ loosely-typed nhưng bạn nên tránh dynamic type càng nhiều càng tốt như tôi đã minh họa cho bạn bằng ví dụ trên. Điều này sẽ giúp code ổn định hơn và không có lỗi.

## Objects

Tất cả mọi thứ trong Dart đều là `Object!` Mọi object bao gồm `null` là instance của một số class và tất cả các class này kế thừa từ `Object` class. Bạn có thể xác nhận điều này bằng cách sử dụng `is` và `is!` toán tử để kiểm tra xem một object là một instance hay là kiểu của một class. Hãy xem xét ví dụ bên dưới,

```
void main() {
  print('"Shashank" is an instance of "String" class: ${"Shashank" is String}');
  print('7799 is an instance of "int" class: ${7799 is int}');
  print('79.97 is an instance of "double" class: ${77.99 is double}');
  print('true is an instance of "bool" class: ${true is bool}');
  print('null is an instance of "null" class: ${null is Null}');
  print('"Anything even strings" are an instance of "Object" class: ${"Anything even strings" is Object}');
  print('null is an instance of "Object" class: ${null is Object}');
}
```

Điều này dẫn đến kết quả bên dưới:

```
"Shashank" is an instance of "String" class: true
7799 is an instance of "int" class: true
79.97 is an instance of "double" class: true
true is an instance of "bool" class: true
null is an instance of "null" class: true
"Anything even strings" are an instance of "Object" class: true
null is an instance of "Object" class: true
```

Vì vậy, bạn có thể thấy rõ rằng mọi thứ trong Dart đều là một Object và tên của class là **Định danh kiểu dữ liệu (Data Type Identifier)**! Toán tử `$` được sử dụng trong ví dụ trên để đưa dữ liệu `dynamic` vào chuỗi. Đối với các giá trị nhiều cấp, hãy sử dụng `$` với {} như thế này, `${person.name}` hoặc `${77.99 là double}`. Nếu sử dụng một single value hoặc một biến, bạn có thể sử dụng `$` đơn giản mà không có `{}` như `"Tên tôi là $ name"` trong đó tên là một biến.

## Classes (lớp)

Cũng giống như các ngôn ngữ lập trình hướng đối tượng khác, các class là tính năng cốt lõi của **Dart**. Nó cho phép chúng ta xác định các đặc tả cho các **Object** của chúng ta. Một class phải có một tên bằng cách sử dụng quy ước đặt tên `UpperCamelCase`. Bên trong class, chúng ta xác định **Object** sẽ trông như thế nào.

> Bạn thường xây dựng các class của riêng mình nếu bạn muốn thể hiện các mối quan hệ phức tạp hơn giữa dữ liệu hoặc nếu bạn muốn gói gọn các  chức năng nhất định trong **một khối duy nhất (one building block).**

```
class Product {
  var name = 'MacBook Pro';
  var price = 1299.99;
}

void main() {
  var product1 = Product();
  var product2 = Product();
  product2.name = 'iPad Pro';
  product2.price = 999.99;
  print(product1);
  print(product1.name);
  print(product1.price);
  print(product2);
  print(product2.name);
  print(product2.price);
}
```

Đoạn code trên sẽ dẫn đến kết quả sau:

```
Instance of 'Product'
MacBook Pro
1299.99
Instance of 'Product'
iPad Pro
999.99
```

Chúng ta có một class có tên là `Product` có hai biến instance (class-level), tức là các biến bên trong một class mà chúng ta khởi tạo với một số giá trị. Ở đây chúng ta đang sử dụng var để xác định các biến của chúng ta vì `dart type-inference`. Dart khá thông minh trong việc tự động tham chiếu kiểu giá trị được gán cho biến kiểu `var`.

Sau đó, chúng ta tạo hai Objects mới với class này trong hàm `main(){...}` của chúng ta. Chúng ta có thể truy cập biến class / instance bằng cách sử dụng dấu chấm . ký hiệu như `product1.name`, tức là `objectName.instanceVariableName`. Chúng ta cũng có thể gán giá trị mới cho các biến này.

Để khai báo một biến **private** trong dart, chúng ta sử dụng `_` ở trước tên biến instance như,` _description`. Điều này làm cho biến private và không thể truy cập được bên ngoài class.

Chúng ta hãy xem sơ qua Lists, Maps, const và final.

## `final` vs `const`

Các từ khóa `const` và `final` có sẵn trong Dart được sử dụng để tạo các biến có giá trị cố định.  Vậy sự khác biệt là gì?

`const` cung cấp một compile-time constant, có nghĩa là giá trị của nó phải được khai báo trong khi biên dịch chương trình trong khi `final` là một runtime constant có nghĩa là giá trị của nó có thể được gán trong quá trình thực thi chương trình.

Hãy hiểu điều này tốt hơn với các ví dụ:

```
int calculateSquare(int value){
  return value * value;
}

void main() {
  const double PI = 3.1415;
  final int square_7 = calculateSquare(7);

  print(PI);
  print(square_7);
}
```

Như bạn có thể thấy ở trên, giá trị của `PI` được biết tại thời điểm biên dịch nhưng giá trị của `square_7` không được biết tại thời điểm biên dịch. Nó được tính toán trong runtime. Đây là sự khác biệt chính giữa `final` (runtime constant) và `const` (compile-time constant).

## Danh sách trong Dart

Giống như Arrays trong các ngôn ngữ lập trình khác, Dart cung cấp một class **Danh sách** được sử dụng để xây dựng các cấu trúc dữ liệu giống **array** có thể chứa một số lượng cố định tương tự hoặc một số biến kiểu dữ liệu `dynamic`. Dart cũng có cú pháp chữ `[]` được sử dụng để tạo danh sách.

### Danh sách cố định

Danh sách có độ dài cố định có thể được khai báo bằng cách xác định độ dài của chúng. Ví dụ:

```
List<dynamic> aFixedList = new List(9);
List<String> anotherFixedList = new List(7);
```

`List<dynamic>` tạo một danh sách có độ dài 9 và kiểu dữ liệu của các yếu tố trong danh sách được xác định bởi từ khóa bên trong `<>` vì Danh sách là một kiểu chung. Trong trường hợp đầu tiên, độ dài của Danh sách là 9 và kiểu dữ liệu của các yếu tố là `dynamic`. Trong trường hợp thứ hai, chúng là 7 và kiểu `string`.

### Danh sách động (Growable Lists)

Danh sách được xác định mà không có bất kỳ đối số / giá trị nào trong phương thức khởi tạo `List()` được gọi là danh sách có thể phát triển (Growable lists). Hãy xem thử ví dụ này bên dưới:

```
List<String> aGrowableList = new List();
aGrowableList.add("Shashank");
aGrowableList.add("Biplav");

//changing a value at an existing index in a list
aGrowableList[0]= 'Love';
aGrowableList[1]= 'Dart';
```

### Maps

Nếu bạn đã quen thuộc với từ điển bằng Python hoặc object theo nghĩa đen trong Javascript thì `maps` trong Dart cũng tương tự như vậy. Về cơ bản, maps là một tập hợp các cặp `key-value`. Dart có một `Map` class được sử dụng để tạo map. Một map có thể chứa bất kỳ loại `key` và `value` nào.

Hãy xem thử ví dụ này:

```
var trainCompartments = new Map<int, String>();

//assign values to the keys
trainCompartments[1] = 'ENGINE';
trainCompartments[2] = 'WOMEN CHAIR CAR';
trainCompartments[3] = 'WOMEN SLEEPER CAR';
trainCompartments[4] = 'MEN CHAIR CAR';
trainCompartments[5] = 'MEN SLEEPER CAR';
print("trainCompartments=> $trainCompartments");
```

Ở đây, `1`, `2`, `3`, `4`, `5` không phải là chỉ mục nhưng chúng là **keys**! Câu lệnh `print` sẽ cho kết quả sau:

```
trainCompartments=> {1: ENGINE, 2: WOMEN CHAIR CAR, 3: WOMEN SLEEPER CAR, 4: MEN CHAIR CAR, 5: MEN SLEEPER CAR}
```

Chúng ta có thể lặp qua các mục của `map` có thể được truy cập từ thuộc tính `.entries` trên map.

> Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/flutter-co-ban-lap-trinh-dart/

Bài viết được dịch lược từ [Shashank Biplav](https://shashankbiplav.me/flutter-basics-understanding-dart).