## Toán tử
Dart xác định các toán tử được hiển thị trong bảng sau. Bạn có thể ghi đè nhiều toán tử này, như được mô tả trong các toán tử Overridable .

| **Mô tả** | **Toán tử** |
| -------- | -------- |
| Hậu tố đơn     | expr++ expr-- () \[] . ?.     |
| Tiền tố đơn     | -expr !expr ~expr ++expr --expr     |
| Nhân chia | * / % ~/ |
| Cộng trừ | + - |
| Dịch chuyển | << >> >>> |
| bitwise AND | & |
| bitwise XOR | ^ |
| bitwise OR | \| |
| Kiểm tra quan hệ và kiểu | >= > <= < as is! |
| So sánh | == != |
| logic AND | && |
| logic OR | \|\| |
| if null | ?? |
| Điều kiện 3 ngôi | expr1 ? expr2 : expr3 |
| Cascade | .. |
| Gán | = *= /= += -= &= ^= v.v. |

> Cảnh báo: Mức độ ưu tiên của toán tử là một hành vi của trình phân tích cú pháp Dart. Để có câu trả lời chính xác, hãy tham khảo ngữ pháp trong đặc tả ngôn ngữ của Dart .

Khi bạn sử dụng toán tử, bạn tạo biểu thức. Dưới đây là một số ví dụ về biểu thức toán tử:

```
a++
a + b
a = b
a == b
c ? a : b
a is T
```

 Trong bảng toán tử , mỗi toán tử có độ ưu tiên cao hơn các toán tử trong các hàng theo sau nó. Ví dụ, toán tử % có độ ưu tiên cao hơn (và do đó thực thi trước) toán tử đẳng thức ==, toán tử này lại có độ ưu tiên cao hơn toán tử &&. Ưu tiên đó có nghĩa là hai dòng mã sau đây thực thi theo cùng một cách:

```
// Parentheses improve readability.
if ((n % i == 0) && (d % i == 0)) ...

// Harder to read, but equivalent.
if (n % i == 0 && d % i == 0) ...
```

> Cảnh báo: Đối với các toán tử hoạt động trên hai toán hạng, toán hạng ngoài cùng bên trái sẽ xác định phiên bản nào của toán tử được sử dụng. Ví dụ: nếu bạn có đối tượng Vector và đối tượng Point, thì phép tính aVector + aPoint sẽ sử dụng phiên bản Vector của +.

### Toán tử số học
Dart hỗ trợ các toán tử số học thông thường, như trong bảng sau.

| Toán tử | Ý nghĩa |
| -------- | -------- |
| +     | Cộng     |
| –     | Trừ     |
| -expr     | Phủ định (đảo dấu của biểu thức)     |
| *     | Nhân     |
| /     | Chia     |
| ~/     | Chia lấy phần nguyên     |
| %     | Chia lấy phần dư     |

Thí dụ:

```
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // Result is a double
assert(5 ~/ 2 == 2); // Result is an int
assert(5 % 2 == 1); // Remainder

assert('5/2 = ${5 ~/ 2} r ${5 % 2}' == '5/2 = 2 r 1');
```

Dart cũng hỗ trợ cả toán tử tăng và giảm tiền tố và hậu tố.

| Toán tử | Ý nghĩa |
| -------- | -------- |
| ++var     | var = var + 1 (giá trị biểu thức là var + 1)     |
| var++     | var = var + 1 (giá trị biểu thức là var)     |
| --var     | var = var – 1 (giá trị biểu thức là var – 1)     |
| var--     | var = var – 1 (giá trị biểu thức là var)     |

Thí dụ:

```
var a, b;

a = 0;
b = ++a; // Increment a before b gets its value.
assert(a == b); // 1 == 1

a = 0;
b = a++; // Increment a AFTER b gets its value.
assert(a != b); // 1 != 0

a = 0;
b = --a; // Decrement a before b gets its value.
assert(a == b); // -1 == -1

a = 0;
b = a--; // Decrement a AFTER b gets its value.
assert(a != b); // -1 != 0
```

### Các toán tử so sánh
Bảng sau liệt kê các ý nghĩa của các toán tử quan hệ và đẳng thức.

| Toán tử | Ý nghĩa |
| -------- | -------- |
| ==     | Bằng nhau; xem thảo luận bên dưới     |
| !=     | Khác nhau     |
| >     | Lớn hơn     |
| <     | Nhỏ hơn     |
| >=     | Lớn hơn hoặc bằng     |
| <=     | Nhỏ hơn hoặc bằng     |

Để kiểm tra xem hai đối tượng x và y có đại diện cho cùng một thứ hay không, hãy sử dụng toán tử ==. (Trong trường hợp hiếm hoi mà bạn cần biết liệu hai đối tượng có phải là cùng một đối tượng hay không, hãy sử dụng hàm identical().) Đây là cách toán tử == hoạt động:

1. Nếu x hoặc y là null, trả về true nếu cả hai đều null và false nếu chỉ có một là null.

2. Trả về kết quả của lời gọi phương thức x. == (y). (Đúng vậy, các toán tử như là == là các phương thức được gọi trên toán hạng đầu tiên của chúng. Bạn thậm chí có thể ghi đè nhiều toán tử, bao gồm ==, bạn có thể xem thêm trong [các toán tử có thể override](https://dart.dev/guides/language/language-tour#overridable-operators) .)

Dưới đây là một ví dụ về việc sử dụng từng toán tử so sánh:

```
assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);
```

### Toán tử kiểm tra kiểu
Các toán tử as, is và is! dùng để kiểm tra các kiểu trong thời gian chạy.

| Toán tử | Ý nghĩa |
| -------- | -------- |
| as     | Typecast (cũng được sử dụng để chỉ định tiền tố thư viện )     |
| is     | Đúng nếu đối tượng có kiểu được chỉ định     |
| is!     | Sai nếu đối tượng có kiểu được chỉ định     |

Kết quả của obj is T là đúng nếu obj thực hiện giao diện được chỉ định bởi T. Ví dụ, obj is Object luôn luôn đúng.

Sử dụng toán tử as để cast một đối tượng sang một kiểu cụ thể. Nói chung, bạn nên sử dụng nó như một cách viết tắt cho một bài kiểm tra is trên một đối tượng theo sau bởi một biểu thức sử dụng đối tượng đó. Ví dụ, hãy xem xét mã sau đây:

```
if (emp is Person) {
  // Type check
  emp.firstName = 'Bob';
}
```
Bạn có thể làm cho mã ngắn hơn bằng cách sử dụng toán tử as:

```
(emp as Person) .firstName = 'Bob'; 
```

> Lưu ý: Mã không tương đương. Nếu emp là null hoặc không phải là một đối tượng kiểu Person, ví dụ đầu tiên (với is) không làm gì cả; thứ hai (với as) sẽ throw một ngoại lệ.

### Toán tử gán
Như bạn đã thấy, bạn có thể gán giá trị bằng toán tử =. Để chỉ gán nếu biến được gán là null, hãy sử dụng toán tử ??=.

```
// Assign value to a
a = value;
// Assign value to b if b is null; otherwise, b stays the same
b ??= value;
```
Toán tử gán hợp chất như += kết hợp một toán tử tính toán với một toán tử gán.

```
=	-=	/=	%=	>>=	^=

+=	*=	~/=	<<=	&=	|=
```

Dưới đây là cách các toán tử gán hoạt động:

|  | Toán tử | Biểu thức tương đương |
| -------- | -------- | -------- |
| Với một toán tử op | a op = b     | a = a op b    |
| Ví dụ | a += b     | a = a + b     |

Ví dụ sau sử dụng toán tử gán và gán ghép:

```
var a = 2; // Assign using =
a *= 3; // Assign and multiply: a = a * 3
assert(a == 6);
```

### Toán tử logic
Bạn có thể đảo ngược hoặc kết hợp các biểu thức boolean bằng các toán tử logic.

| Toán tử | Ý nghĩa |
| -------- | -------- |
| !expr     | đảo ngược biểu thức sau (thay đổi sai thành đúng và ngược lại)     |
| \|\|     | logic HOẶC     |
| &&     | logic VÀ     |

Đây là một ví dụ về việc sử dụng các toán tử logic:

```
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

### Toán tử bit và shift
Bạn có thể thao tác các bit riêng lẻ của số trong Dart. Thông thường, bạn sẽ sử dụng các toán tử bitwise và shift này với các số nguyên.

| Toán tử | Ý nghĩa |
| -------- | -------- |
| &     | VÀ     |
| \|     | HOẶC     |
| ^     | XOR     |
| ~expr     | Đảo dấu bit (0 trở thành 1; 1 trở thành 0)     |
| <<     | Dịch trái     |
| >>     | Dịch phải     |

Đây là một ví dụ về việc sử dụng các toán tử bitwise và shift:

```
final value = 0x22;
final bitmask = 0x0f;

assert((value & bitmask) == 0x02); // AND
assert((value & ~bitmask) == 0x20); // AND NOT
assert((value | bitmask) == 0x2f); // OR
assert((value ^ bitmask) == 0x2d); // XOR
assert((value << 4) == 0x220); // Shift left
assert((value >> 4) == 0x02); // Shift right
```

### Biểu thức điều kiện
Dart có hai toán tử cho phép bạn đánh giá chính xác các biểu thức có thể yêu cầu các câu lệnh if-other :

`condition ? expr1 : expr2`
Nếu điều kiện là đúng, đánh giá expr1 (và trả về giá trị của nó); ngoài ra, đánh giá và trả về giá trị của expr2 .

`expr1 ?? expr2`
Nếu expr1 không null, trả về giá trị của nó; ngoài ra, đánh giá và trả về giá trị của expr2 .

Khi bạn cần gán giá trị dựa trên biểu thức boolean, hãy xem xét sử dụng ?:

```
var visibility = isPublic ? 'public' : 'private';
```
Nếu biểu thức boolean kiểm tra null, hãy xem xét sử dụng ?? .

```
String playerName(String name) => name ?? 'Guest';
```

Ví dụ trên có thể được viết bằng ít nhất hai cách khác, nhưng không ngắn gọn bằng:
```
// Slightly longer version uses ?: operator.
String playerName(String name) => name != null ? name : 'Guest';

// Very long version uses if-else statement.
String playerName(String name) {
  if (name != null) {
    return name;
  } else {
    return 'Guest';
  }
}
```

### Cascades (..)
Cascades (..) cho phép bạn thực hiện một chuỗi các hành động trên cùng một đối tượng. Ngoài các lệnh gọi hàm, bạn cũng có thể truy cập các trường trên cùng một đối tượng. Điều này thường giúp bạn tiết kiệm bước tạo một biến tạm thời và cho phép bạn viết mã trôi chảy hơn.

Hãy xem xét các mã sau đây:

```
querySelector('#confirm') // Get an object.
  ..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```
Cuộc gọi phương thức đầu tiên querySelector(), trả về một đối tượng. Mã theo ký hiệu xếp tầng hoạt động trên đối tượng này, bỏ qua mọi giá trị tiếp theo có thể được trả về.

Ví dụ trước tương đương với:

```
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));

```
Bạn cũng có thể lồng các tầng của bạn. Ví dụ:

```
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
```
Hãy cẩn thận khi xây dựng tầng của bạn trên một hàm trả về một đối tượng thực tế. Ví dụ: đoạn mã sau không thành công:

```
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
```
Cuộc sb.write() trả về void và bạn không thể tạo một tầng trên void.

> Lưu ý: Nói đúng ra, ký hiệu hai chấm (..) không phải là một toán tử. Nó chỉ là một phần của cú pháp Dart.

### Các toán tử khác
Bạn đã thấy hầu hết các toán tử còn lại trong các ví dụ khác:

| Toán tử | Tên | Ý nghĩa |
| -------- | -------- | -------- |
| ()     | Ứng dụng hàm     | Gọi 1 hàm |
| \[]     | Truy cập danh sách     | Truy cập đến giá trị tại chỉ mục được chỉ định trong danh sách |
| .     | Truy cập member     | Truy cập đến một thuộc tính của một biểu thức; ví dụ: foo.bar chọn thuộc tính bar từ biểu thức foo |
| ?.     | Truy cập member có điều kiện     | Giống như . nhưng toán hạng ngoài cùng bên trái có thể là null; ví dụ: foo?.bar chọn thuộc tính bar từ biểu thức foo trừ khi foo là null (trong trường hợp đó giá trị foo?.bar là null) |

(Còn tiếp)

Nguồn https://dart.dev/guides/language/language-tour#operators