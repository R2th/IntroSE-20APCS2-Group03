![image.png](https://images.viblo.asia/2b265815-7226-44dc-b4a0-8ff2dd6c7281.png)

Bạn có thể xem thêm bài viết tại đây: [series tự học ngôn ngữ Dart](https://200lab.io/blog/tu-hoc-ngon-dart-nhung-dieu-can-biet-truoc-khi-bat-dau/)

Ngôn ngữ Dart là một ngôn ngữ strongly typed. Ngôn ngữ strongly typed là một ngôn ngữ đảm bảo rằng kiểu của một object không thay đổi đột ngột. Nó có các quy tắc và những hạn chế để đảm bảo rằng giá trị của một biến luôn khớp với static type của biến đó.

> Ngôn ngữ lập trình static typed là những ngôn ngữ mà các biến không cần phải định nghĩa trước khi chúng được sử dụng.
Mặc dù kiểu (types) là bắt buộc trong Dart nhưng kiểu chỉ định (Type Annotation) có thể có hoặc không bởi vì Dart có kiểu tự suy (Type Inference).

Trước tiên hãy hiểu kiểu tự suy là như thế nào đã nhé!.

## 1. Kiểu tự suy (Type Inference) là gì?
Như tên gọi của nó, kiểu tự suy là một khả năng của ngôn ngữ lập trình để tự suy luận ra kiểu mỗi khi người dùng không đề cập tới.

Trong bài viết "[kiểu dữ liệu và biến](https://200lab.io/blog/tu-hoc-ngon-ngu-dart-kieu-du-lieu-va-bien-data-types-variables/)", chúng ta đã biết syntax để khai báo một biến như sau:

![image.png](https://images.viblo.asia/0911f47a-cf2c-46df-886d-0c86a03f8655.png)

Kiểu tự suy cho phép chúng ta khai báo một biến mà không cần đề cập rõ ràng về kiểu dữ liệu là gì. Trong ngôn ngữ Dart, chúng ta thay thế từ khóa `var` vào chỗ của `dataType` . Hãy xem Syntax sau đây:

![image.png](https://images.viblo.asia/4dcc430c-f0f1-4dfb-9f13-c1da850397be.png)

Kiểu biến được tự suy từ giá trị ban đầu của nó nếu có. Hãy xem ví dụ đơn giản dưới đây:

```
main() {
  var bookTitle = "Lord of the Rings: The Fellowship of the Ring";
  var bookAuthor = "J. R. R. Tolkien";
  var bookNoOfPages = 423;

  // Driving Code
  print(bookTitle);
  print(bookAuthor);
  print(bookNoOfPages);
}
```

Khi chạy đoạn code trên thì chương trình cho ra output:

`Lord of the Rings: The Fellowship of the Ring`
`J. R. R. Tolkien`
`423`

Mặc dù chúng ta không hề khai báo `bookTitle` là một kiểu `String`. Nó đã tự suy cho chúng ta.

### Kiểm tra kiểu

Trong bài viết "[kiểu dữ liệu và biến](https://200lab.io/blog/tu-hoc-ngon-ngu-dart-kieu-du-lieu-va-bien-data-types-variables/)", chúng ta đã nói về đối tượng và đối tượng thì có những thuộc tính đại diện cho những thông tin mà đối tượng đó biết.

Vậy đề xem những thông tin về kiểu dữ liệu của đối tượng thì chúng ta có thể dùng thuộc tính `runtimeType` của đối tượng đó.

Trong đoạn code bên dưới, chúng ta sẽ in ra kiểu dữ liệu của biến `bookTitle` bằng cách gọi thuộc tính `runtimeType` của nó.

> Ở đoạn này bạn đừng lo lắng quá về Syntax nhé. Chúng ta sẽ được biết trong phần sau.

```
main() {
  var bookTitle = "Lord of the Rings: The Fellowship of the Ring";

  print(bookTitle.runtimeType);
}
```

Output: `String`.

Điều này chứng mình rằng `bookTitle` được tự suy là kiểu `string` và chúng ta không cần gán nó với bất cứ giá trị của kiểu nào khác ngoài `String`

## 2. Kiểu chỉ định (Type Annotation)

Khi chúng ta nói về kiểu biến được tự suy có nghĩa là những biến ở lần khai báo sau sẽ không được xem xét mà nó sẽ tự suy luôn. Nếu những kiểu đó rõ ràng thì hãy tự suy còn nếu nó không được như bạn mong muốn, thì bạn có thể thêm kiểu chỉ định cho nó.

Trong ví dụ bên dưới, chúng ta sẽ khai báo biến `number` bằng cách sử dụng từ khóa var. Chúng ta muốn một biến chứa cả kiểu `int` và `double`.

```
main() {
  var number = 3;
  print(number);

  number = 3.2;
  print(number);
}
```

Output:

`main.dart:5:12: Error: A value of type 'double' can't be assigned to a variable of type 'int'. Try changing the type of the left hand side, or casting the right hand side to 'int'. number = 3.2; ^`

Output của đoạn code trên sẽ bị lỗi. Khi chúng ta gán giá trị ban đầu cho `number` là một số nguyên thì trình biên dịch sẽ tự suy `number` là kiểu của `int`. Cho nên khi ta tiếp tục gán một giá trị của kiểu `double` thì trình biên dịch sẽ báo lỗi.

Trường hợp này thì chúng ta có thể sử dụng kiểu chỉ định và khai báo biến `number` với kiểu dữ liệu là `num`. Nhớ rằng kiểu `num` thì đã bao gồm cả `int` và `double`.

```
main() {
  num number = 3;
  print(number);

  number = 3.2;
  print(number);
}
```

Output:
`3`
`3.2`

## 3. Dynamic Types

Nếu bạn muốn một biến để chứa nhiều đối tượng của nhiều kiểu khác nhau thì bạn có thể khai báo biến đó bằng cách sử dụng từ khóa `dynamic`.

```
main() {
  dynamic dynamicVariable = 'A string'; // type String
  print(dynamicVariable);

  dynamicVariable = 5; // type int
  print(dynamicVariable);

  dynamicVariable = true; // type bool
  print(dynamicVariable);
}
```

Output:
`A string`
`5`
`true`

Trong đoạn code trên, chúng ta khai báo một biến `dynamicVariable` và gán cho nó giá trị ban đầu của kiểu `String`. Sau đó chúng ta tiếp tục gán cho nó một giá trị của kiểu `int` và cuối cùng là giá trị của kiểu `bool`. Đoạn code vẫn chạy trơn tru mà không hiển thị lỗi nào cả.

## 4. Xác định hằng số (Constants)

Thỉnh thoảng chúng ta sẽ tạo ra một biến và gán cho nó một giá trị cụ thể với ý định sẽ không bao giờ thay đổi nó. Để chương trình chạy thành công, điều quan trọng nhất là giá trị của biến được giữ nguyên trong suốt thời gian tồn tại của nó.

Để tạo một biến như vậy, các từ khóa `final` và `const` nên được sử dụng. Trước khi chúng ta tìm hiểu về `final` và `const` thực sự làm được những gì? Thì trước tiên, chúng ta cần phải biết sự khác nhau giữa thời gian biên dịch (compile-time) và thời gian chạy chương trình (runtime)

### 4.1 Thời gian biên dịch (compile-time) và thời gian chạy chương trình (runtime)

![image.png](https://images.viblo.asia/ff3a210e-1ba1-445f-beb3-b6fe6544a4ce.png)

Thời gian biên dịch và thời gian chạy là các thuật ngữ lập trình đề cập đến các giai đoạn khác nhau trong vòng đời của chương trình. Để tạo ra một chương trình, đầu tiên bạn cần phải viết một vài source code. Source code sẽ quyết định cách mà chương trình sẽ hoạt động.

### Sự biên dịch và thời gian biên dịch

Máy tính sẽ không hiểu những đoạn code mà chúng ta viết. Chúng chỉ biết một ngôn ngữ duy nhất đó chính là ngôn ngữ của máy, những đoạn mã 1 và 0. Source code cần được biên dịch sang định dạng code của máy để nó có thể thực thi chương trình. Quá trình này được gọi là sự biên dịch.

Giờ chúng ta đã biết sự biên dịch là gì rồi, dựa trên khái niệm đó chúng ta sẽ tiếp tục tìm hiểu về thời gian biên dịch thông qua ví dụ dưới đây nhé!

Chúng ta đã xác định một vài biến `int` và `double` với những giá trị ban đầu trong chương trình của chúng ta. Những biến này luôn có cùng giá trị ban đầu bất cứ khi nào chúng ta chạy chương trình. Nó luôn được xác định tại thời điểm của sự biên dịch. Vậy nên những giá trị này là những giá trị cố định tại thời gian biên dịch.

### Run và Run-time

Sau khi chương trình được biên dịch, chúng ta có thể chạy chương trình đó.

Bạn có nhớ lúc chúng ta lấy thông tin đầu vào của người dùng ở bài viết "[Ứng dụng Dart đầu tiên](https://200lab.io/blog/tu-hoc-ngon-ngu-dart-ung-dung-dart-dau-tien/)" không? Tùy thuộc những input mà người dùng nhập vào, những giá trị sẽ thay đổi mỗi khi chúng ta chạy chương trình. Những giá trị đó không thể được xác định cho đến khi chương trình thực sự được chạy. Nó chỉ được cố định tại thời gian chạy chương trình.

### 4.2 Biến không bao giờ thay đổi

Để tạo ra những biến mà những giá trị của chúng không thể thay đổi, ngôn ngữ Dart cung cấp cho chúng ta 2 keyword final và const. Thay vì khai báo một biến sử dụng var hoặc một kiểu dữ liệu khác chúng ta sẽ sử dụng final và const.

### Sử dụng `final`

Một biến cuối cùng (biến được khởi tạo bởi từ khóa `final`)  được khai báo lần đầu tiên và nó sẽ được sử dụng xuyên suốt và không thể khai báo lại. Giá trị cuối cùng của biến sẽ được biết tại thời gian chạy.

```
import 'dart:io';
 
main() {
  final name = stdin.readLineSync();
  print("Hello " + name);
}   
```

Nếu chúng ta gán lại giá trị khác cho biến name, chúng ta sẽ gặp lỗi.

```
import 'dart:io';
 
main() {
  final name = stdin.readLineSync();
  name = stdin.readLineSync();
  print("Hello " + name);
}   
```

### Sử dụng `const`

Một biến hằng số (biến được khởi tạo bởi từ khóa `const`) nên được tạo ra khi bạn biết giá trị của nó tại thời gian biên dịch. Giống như biến final, một biến hằng số chỉ có thể thiết lập một lần.

```
main() {
  const name = "Bob";

  // Driver Code
  print(name);
}
```

Output: `Bob`

Tương tự, nếu chúng ta thử gán lại giá trị cho biến `name` chúng ta sẽ gặp lỗi.

```
main() {
  const name = "Bob";
  name = "Jack";

  // Driver Code
  print(name);
}
```

Output:
`main.dart:3:3: Error: Setter not found: 'name'.`
`name = "Jack";`
`^^^^`

Ở những ví dụ trên có thể bạn không thấy rõ được sự khác nhau giữa `final` và `const` . Sự khác nhau của chúng chỉ có thể được thể hiện qua các chương trình phức tạp hơn. Tất cả những gì bạn cần biết lúc này là cả hai đều chỉ được thiết lập một lần. Và biến `final` thì có thể thiết lập tại thời gian chạy và thời gian biên dịch. Trong khi đó biến `const` chỉ được thiết lập tại thời gian biên dịch mà thôi.

Qua bài viết này bạn đã hiểu hơn về kiểu chỉ định, kiểu tự suy, kiểu dynamic và constants. Chúng ta sẽ tiếp tục tìm hiểu về các toán tử trong ngôn ngữ Dart ở bài viết sau.