![image.png](https://images.viblo.asia/2af2f310-672a-4e9a-89d8-2b0d9b287c55.png)
Trong bài viết này chúng ta sẽ đi tìm hiểu về các kiểu dữ liệu trong ngôn Dart: numbers, strings, booleans, lists, sets, và maps.

Bạn có thể xem thêm bài viết tại đây: [series tự học ngôn ngữ Dart](https://200lab.io/blog/tu-hoc-ngon-dart-nhung-dieu-can-biet-truoc-khi-bat-dau/)

## 1. Ngôn ngữ Dart: Kiểu numbers -` num` Type

Nếu bạn muốn một biến có giá trị là số thì chúng ta phải khai báo với kiểu dữ liệu `num`.

Syntax cơ bản của nó như sau:

![image.png](https://images.viblo.asia/93f49b43-b81a-409a-947b-a824ceb1c2c4.png)

Hãy nhìn vào ví dụ dưới đây:

```
main() {
  num firstNumber = 5;
  num secondNumber = 5.1;
  num thirdNumber = firstNumber;

  // Driver Code
  print(firstNumber);
  print(secondNumber);
  print(thirdNumber);
}
```

Output:

`5`
`5.1`
`5`

Trong ngôn ngữ Dart, numbers được chia nhỏ hơn thành 2 kiểu phụ:

1. Integers (`int`) - số nguyên.
2. Doubles (`double`) - số lẻ.

Cả `int` và `double` đều là kiểu con của `num`.

Nào bây giờ chúng ta sẽ xem qua từng kiểu một cách chi tiết hơn nhé!

### 1.1 Số nguyên - Integers

Số nguyên là tất cả những số không có dấu thập phân.

Trong đoạn code bên dưới, chúng ta sẽ khai báo hai biến của kiểu `int`. Biến thứ nhất là một số nguyên đơn giản trong khi đó biến thứ hai là là một số có sáu chữ số.

Syntax cơ bản sẽ như sau:

![image.png](https://images.viblo.asia/f65a80a8-0e32-4ead-bfdb-087b25088e7d.png)

Hãy xem qua ví dụ dưới đây:

```
main() {
  int simpleInteger = 1;
  int hex = 0xDA34F;
  int integer = simpleInteger;

  // Driver Code
  print(simpleInteger); 
  print(hex);
  print(integer);
}
```

Output:
`1`
`893775`
`1`

### 1.2 Số lẻ - Doubles

Số lẻ là những số có chứa dấu thập phân

Trong đoạn code dưới đây, chúng ta sẽ khai báo hai biến của kiểu `double `. Biến thứ nhất là một số lẻ đơn giản, biến thứ hai là một số lẻ có mũ.

Syntax sẽ là:

![image.png](https://images.viblo.asia/96ab2ee3-1a33-4561-b2a3-a927ea535721.png)

Hãy nhìn vào ví dụ dưới đây:

```
main() {
  double simpleDouble = 1.1;
  double exponents = 1.42e5;

  // Driver Code
  print(simpleDouble);
  print(exponents);
}
```

Output:

`1.1`
`142000.0`

Đối với phiên bản Dart 2.1, các số nguyên sẽ tự động được chuyển sang số lẻ khi cần thiết. Khi bạn chạy đoạn code bên dưới, output sẽ hiển thị `1.0 `thay vì `1`.

```
main() {
  double integerLiteral = 1;
  
  print(integerLiteral);
}
```

Output: `1.0`

Nếu đoạn code trên chạy trên phiên bản Dart cũ hơn 2.1 thì trình biên dịch sẽ trả về kết quả lỗi.

## 2. Ngôn ngữ Dart: Kiểu strings (chuỗi)

Kiểu strings trong ngôn ngữ Dart là một chuỗi các đơn vị mã UTF-16. UTF là viết tắt của từ “Unicode Transformation Format”.

Unicode là bộ mã chuẩn quốc tế được thiết kế để dùng làm bộ mã duy nhất cho tất cả các ngôn ngữ khác nhau trên thế giới. Nó là một tập hợp các ký tự, trong đó mỗi ký tự là một đơn vị mã duy nhất.

### 2.1 String Literals

Ký tự string chỉ đơn giản là văn bản được gói gọn trong dấu ngoặc đơn hoặc ngoặc kép.

Hãy xem những cách khác nhau để tạo ký tự string trong ngôn ngữ Dart:

```
main() {
  // Single Quotes
  print('Using single quotes');

  // Double Quotes
  print("Using double quotes");

  // Single quotes with escape character \
  print('It\'s possible with an escape character');

  // Double quotes
  print("It's better without an escape character");
}
```

Output:

`Using single quotes`
`Using double quotes`
`It's possible with an escape character`
`It's better without an escape character`


Tất cả những gì chúng ta vừa làm ở đoạn code trên đó chính là in kiểu string bằng nhiều kỹ thuật khác nhau. Tất cả mọi thứ đều suôn sẻ ngoại trừ dòng code `print('It\'s possible with an escape character');`. Chúng ta cần điều chỉnh một số thứ ở dòng code này.

Như các bạn thấy, ở dòng này chúng ta dùng dấu ngoặc đơn để tạo chuỗi. Nhưng bên trong chuỗi cũng có chứa một dấu ngoặc đơn ở từ `It's`. Điều này sẽ gây hiểu lầm cho trình biên dịch rằng chúng ta muốn kết thúc chuỗi tại dấu ngoặc đơn đó.

Thế nên để giải quyết vấn đề, chúng ta cần sử dụng ký tự `\` để trình biên dịch hiểu là phải thoát chức năng cho dấu ngoặc đơn đó. Chuỗi của chúng ta sẽ được in như bình thường.

### 2.2 Khai báo biến của chuỗi

Nếu bạn muốn khai báo một biến có chứa giá trị của kiểu String thì hãy sử dụng syntax sau:

![image.png](https://images.viblo.asia/70fe163a-9d8b-416d-92b1-6cf63b486eca.png)

Áp dụng syntax đó vào code thực tế trong Dart:

```
main() {
    String s1 = "A String";

    print(s1);
} 
```

Output: `A String`

## 3. Ngôn ngữ Dart: String Interpolation - phép nội suy chuỗi

### 3.1 Phép kết hợp chuỗi - String Concatenation

Để kết hợp hai hay nhiều chuỗi lại với nhau thì ta sử dụng toán tử` +`.

```
main() {
  String s1 = "First half of the string. ";
  String s2 = "Second half of the string";
  print(s1 + s2);
}
```

Output: `First half of the string. Second half of the string`

Đoạn code bên trên khá đơn giản và dễ hiểu phải không? Ở dòng code` print(s1 + s2);,` chúng ta kết hợp chuỗi thứ nhất `s1` với chuỗi thứ hai `s2 `và sau đó in ra một chuỗi đã được kết hợp lại với nhau.

### 3.2 Phép nội suy chuỗi - String Interpolation

Phép nội suy chuỗi là khả năng tạo ra những chuỗi mới hoặc chỉnh sửa những chuỗi hiện tại bằng cách gắn vào chúng những biểu thức (expressions). Những biểu thức này đã được đánh giá, và những giá trị của kết quả được chuyển sang chuỗi và kết hợp với chuỗi bao quanh. Phép nội suy chuỗi trong Dart thì ngắn gọn và hiệu quả hơn phép kết hợp chuỗi. Tuy nhiên phép nội kết hợp chuỗi lại đơn giản và linh hoạt hơn.

Ký tự `$` trong một chuỗi biểu thị sự bắt đầu của một biểu thức nội suy. Dấu `$ `có thể được theo sau bởi một id định danh duy nhất không chứa ký tự `$`.

![image.png](https://images.viblo.asia/18c262b2-7658-4210-948e-0b0617c42e14.png)

Dấu $ cũng có thể được theo sau bởi một biểu thức được phân tách bằng dấu ngoặc nhọn.

![image.png](https://images.viblo.asia/d58faa6a-64b0-4019-abdb-23327602611f.png)

Hãy nhìn vào đoạn code dưới đây để hiểu hơn về cách mà phép nội suy hoạt động

```
main() {
  String country = "Japan";

  print("I want to visit $country");
}
```

Output: `I want to visit Japan`

Trong đoạn mã trên, chúng ta đã khai báo một giá trị cho biến `country` dựa trên quốc gia mà bạn muốn đến.

Thay vì mỗi lần muốn đến một quốc gia khác ta phải thay đổi câu lệnh `print` , thì tất cả những gì chúng ta phải làm là thay đổi giá trị của biến `country` được nội suy.

Bây giờ hãy thử gắn một biểu thức toán học vào một chuỗi bên trong dấu ngoặc nhọn.

```
main() {
  print("The sum of 5 and 3 equals ${5+3}.");
}
```

Output: `The sum of 5 and 3 equals 8.`

Trong đoạn code trên, `5+3` là một biểu thức và được trình biên dịch xử lý và dịch thành 8. Cho nên output của chúng ta sẽ là `The sum of 5 and 3 equals `8.

### 3.3 Multiple Lines

Bạn có thể kết hợp các chuỗi lại với nhau bằng cách sử dụng những chuỗi liền kề.

> Hãy để ý cách mà bạn sử dụng dấu ngoặc đơn hoặc dấu ngoặc kép.

```
main() {
  var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
    
  print(s1);
}
```

Output: `String concatenation works even over line breaks.`

Khi chúng ta thực hiện dòng code ở trên chúng ta sẽ nhận được một dòng string hoàn chỉnh. `String concatenation works even over line breaks.`

Còn một cách nữa để tạo ra chuỗi nhiều dòng trong ngôn ngữ Dart. Bạn đơn giản chỉ việc đặt các dòng chuỗi của mình bên trong 3 dấu ngoặc đơn hoặc 3 dấu ngoặc kép.

Hãy xem thử ví dụ bên dưới:

```
main() {
  var multilineString = """This is a 
multiline string
consisting of 
multiple lines""";

  print(multilineString);
}
```

Output:
`This is a`
`multiline string`
`consisting of`
`multiple lines`


## 4. Ngôn ngữ Dart: kiểu dữ liệu Booleans

Kiểu `bool `trong ngôn ngữ Dart đại diện cho giá trị boolean. Chỉ có hai đối tượng có kiểu `bool` dó là `true` và `false`. Trong đoạn code bên dưới, chúng ta khai báo một biến `b1` của kiểu` bool` và gán cho nó một giá trị ban đầu là `true`.

```
main() {
  bool b1 = true;
  print(b1);
}
```

Output sẽ hiện thị: `true`

Syntax cơ bản để khai báo một biến kiểu bool như sau:

![image.png](https://images.viblo.asia/48cbe7d1-5115-4a3b-852e-1377e6687c07.png)

Hiện tại thì bạn chỉ cần biết những kiến thức ở trên về kiểu booleans. Chúng ta sẽ tìm hiểu nhiều hơn khi thảo luận về toán tử và những câu lệnh điều kiện ở các phần sau nhé.