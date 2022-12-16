![image.png](https://images.viblo.asia/192c65b0-1e07-448b-9196-90cca5fb0d25.png)

Toán tử là những ký hiệu được dùng để thực hiện một phép toán số hoặc logic nhằm để tùy chỉnh hoặc thao tác dữ liệu. Thao tác dữ liệu là một phần thiết yếu của bất kỳ ngôn ngữ lập trình nào và Dart cũng không ngoại lệ. Nó cung cấp một tập hợp các toán tử phong phú cho các kiểu cơ bản của nó.

Bạn có thể xem thêm bài viết tại đây: [series tự học ngôn ngữ Dart](https://200lab.io/blog/tu-hoc-ngon-dart-nhung-dieu-can-biet-truoc-khi-bat-dau/)

## 1. Các kiểu của toán tử

Trong phần này, chúng ta sẽ cùng tìm hiểu về các toán tử được tích hợp sẵn trong Dart:

* Toán tử số học
* Toán tử so sánh
* Toán tử gán
* Toán tử logic
* Toán tử kiểm tra kiểu
* Toán tử Bitwise và Shift

## 2. Toán tử và các biểu thức

Một biểu thức là một kiểu đặc biệt của câu lệnh nhằm ước lượng ra một số giá trị. Ví dụ, trong toán học, 1 + 1 là một biểu thức bởi vì nó ước lượng ra bằng 2.

Một biểu thức thì bao gồm 2 phần: toán hạng và toán tử.

Toán tử thường tuân theo một ký hiệu trung tố (infix notation). Ký hiệu trung tố là ký hiệu biểu diễn biểu thức, nơi toán tử nằm giữa hai toán hạng.

![image.png](https://images.viblo.asia/28d507c8-5ac7-4f87-a8b8-b7a24abeb2c5.png)

**Toán hạng** là các đối tượng dữ liệu mà toán tử đang thực hiện một phép toán trên nó. Nói cách khác toán tử xác định cách các toán hạng được xử lý để tạo ra một giá trị.

Những toán tử khác nhau thực hiện những phép tính khác nhau. Vậy nên, bạn cần biết mình muốn dữ liệu của mình được xử lý như thế nào để mà chọn đúng toán tử.

Hãy cùng tìm hiểu về từng loại toán tử ở các phần dưới đây.

## 3. Toán tử số học

Toán tử số học là những toán tử thực hiện những phép tính toán học như là cộng hoặc trừ.

![image.png](https://images.viblo.asia/cf1a4205-5fca-46c3-aef8-5dbc13d67783.png)

### 3.1 Danh sách của những toán tử số học

Dưới đây là danh sách những toán tử số học được hỗ trợ bởi Dart.

| Operator | Use |
| -------- | -------- |
| +     | Adds two operands     | 
| -     | Subtracts the second operand from the first     | 
| -expr     | Reverses the sign of the expression (unary minus)     | 
| *     | Multiplies both operands     | 
| /    | Divides the first operand by the second operand     | 
| ~/     | Divides the first operand by the second operand and returns an integer value     | 
| %     | Gets the remainder after division of one number by another     | 


Chúng ta lấy toán tử đầu tiên là 10 và toán tử thứ hai là 7, xem ví dụ dưới đây:

```
main() {
  var operand1 = 10;
  var operand2 = 7;

  print(operand1 + operand2);
  print(operand1 - operand2);
  print(- operand1);
  print(operand1 * operand2);
  print(operand1 / operand2);
  print(operand1 ~/ operand2);
  print(operand1 % operand2);
}

```

Output là:

```
173
-10
70
1.4285714285714286
1
3
```

Hầu hết các toán tử là những dấu chúng ta thường thấy trong toán học. Chỉ có một dấu có thể mới với chúng ta đó là toán tử  `~/`.

### 3.2 Toán tử tiền tố và hậu tố

Ngôn ngữ Dart cũng hỗ trợ cả toán tử tăng giảm dạng tiền tố và hậu tố.

Dưới đây là danh sách các toán tử tăng giảm dạng tiền tố và hậu tố được hỗ trợ bởi Dart.

|Operator	|Use |
| -------- | -------- |
|++var	|var = var + 1 |
|var++	|var = var + 1 |
|--var	|var = var - 1  |
|var--	|var = var - 1  |

Hãy xem thử cách mà mỗi toán tử hoạt động ở một vài ví dụ bên dưới nhé:

#### ++var

Giá trị biểu thức của ++var là var+1. Khi bạn chèn biểu thức vào một câu lệnh in, đầu tiên trình biên dịch sẽ tăng biến thêm 1 đơn vị sau đó mới in ra giá trị của biến đó.

```
main() {
  var prefixIncrement = 5;

  print(++prefixIncrement);
}
```

Output: `6`

Giá trị sau khi tăng là 6, tức là 5+1, được hiển thị ra output.

#### var++

Giá trị biểu thức của `var++` là `var`. Khi bạn chèn biểu thức vào một câu lệnh in, đầu tiên trình biên dịch sẽ in ra giá trị của biến đó rồi sau đó mới tăng thêm 1.

```
main() {
  var postfixIncrement = 5;

  print(postfixIncrement++);
  print(postfixIncrement);
}
```

Output:
`5
6`

Trong trường hợp này, câu lệnh `print` sẽ hiển thị giá trị của biến trước sau đó mới tăng nó lên. 5 là output của dòng `print(postfixIncrement++);`, trong khi đó câu lệnh print được gọi lại thì giá trị của biến sẽ được tăng lên. Dòng `print(postfixIncrement);` sẽ cho ra ouput là `6`.

#### --var

Giá trị biểu thức của `--var` là `var-1`. Khi chúng ta chèn biểu thức vào câu lệnh in, đầu tiên trình biên dịch sẽ giảm biến đi một 1 đơn vị sau đó mới in ra giá trị của biến.

```
main() {
  var prefixDecrement = 5;

  print(--prefixDecrement);
}
```

Output: `4`

Giá trị được hiển thị sau khi giảm là 4, tức là 5-1.

#### var--

Giá trị biểu thức của `var--` là `var`. Khi chúng ta chèn biểu thức vào câu lệnh in, đầu tiên trình biên dịch sẽ in ra giá trị của biến đó rồi sau đó mới giảm đi 1

```
main() {
  var postfixDecrement = 5;

  print(postfixDecrement--);
  print(postfixDecrement);
}
```

Output:
5
4

Trong trường hợp này, câu lệnh `print` sẽ hiển thị giá trị của biến trước sau đó mới giảm nó đi. 5 là output của dòng `print(postfixDecrement--);`, trong khi đó câu lệnh print được gọi lại thì giá trị của biến sẽ giảm xuống. Dòng `print(postfixDecrement);` sẽ cho ra ouput là 4.

## 4. Toán tử so sánh (toán tử quan hệ và đẳng thức)
![image.png](https://images.viblo.asia/0b98cdb9-055e-4a73-b7c4-77ada9f17456.png)

oán tử quan hệ là những toán tử thực hiện những phép so sánh giữa các toán hạng của kiểu numeric. Ví dụ như so sánh lớn hơn hay nhỏ hơn. Toán tử đẳng thức có thể so sánh các toán hạng thuộc bất kỳ kiểu

Dưới đây là danh sách các toán tử so sánh được hỗ trợ bởi Dart.

|Operator|Use|
| -------- | -------- |
|==	|Checks if the values of the two operands are equal (true if equal)|
|!=|Checks if the values of the two operands are not equal (true if not equal)|
|>	|Checks if the value of the left operand is greater than the value of the right operand|
|<	|Checks if the value of the left operand is less than the value of the right operand|
|>=	|Checks if the value of the left operand is greater than or equal to the value of the right operand|
|<=	|Checks if the value of the left operand is less than or equal to the value of the right operand|

> Toán tử so sánh mang lại kết quả kiểu boolean

Lấy toán tử đầu tiên là 10, toán tử thứ hai là 7. Hãy xem thử ví dụ sau đây:

### Toán tử quan hệ

```
main() {
  var operand1 = 10;
  var operand2 = 7;

  print(operand1 > operand2);
  print(operand1 < operand2);
  print(operand1 >= operand2);
  print(operand1 <= operand2);
}
```

Output:
`true
false
true
false`

### Toán tử đẳng thức
```
main() {
  var operand1 = 10;
  var operand2 = 7;

  print(operand1 == operand2);
  print(operand1 != operand2);
}
```

Output:
`false
true`

Chúng ta có thể sử dụng các toán tử đẳng thức trên với các ký tự không phải là số nguyên ví dụ như các ký tự `string`. Hãy xem ví dụ dưới đây. Toán tử đầu tiên là `a` và toán tử thứ hai là `b`

```
main() {
  var operand1 = 'a';
  var operand2 = 'b';

  print(operand1 == operand2);
  print(operand1 != operand2);  
}
```

Output:
`false
true`

## 5. Toán tử kiểm tra kiểu

![image.png](https://images.viblo.asia/313e79cb-b6ef-4b72-8c3a-161129b905fb.png)

Toán tử kiểm tra kiểu là những toán tử có thể sử dụng để kiểm tra kiểu của một đối tượng tại thời gian chạy.

Dưới đây là danh sách các toán tử kiểm tra kiểu được hỗ trợ bởi Dart:

|Operator	|Use|
| -------- | -------- |
|as	|typecast|
|is	|True if the object has the specified type|
|is!	|False if the object has the specified type|

> Chúng ta sẽ không đề cập đến toán tử as trong series bài viết này.

Mặc dù toán tử kiểm tra kiểu chỉ có hai toán hạng nhưng thứ tự của toán hạng thì rất quan trọng và chúng ta cần phân biệt rõ ràng. Giá trị của kiểu cần được kiểm tra phải ở bên trái của toán tử. Còn bên phải của toán tử chính là bản thân của kiểu.

Đây là syntax cơ bản:

![image.png](https://images.viblo.asia/510e998b-2dd2-4aa3-84b7-6b84f2f45540.png)

Hãy xem ví dụ dưới đây để hiểu hơn cách sử dụng toán tử kiểm tra kiểu trong ngôn ngữ Dart:

```
main() {
  double type1 = 5.0;
  int type2 = 87;
  String type3 = "educative";
  bool type4 = true;

  print(type1 is int);
  print(type2 is int);
  print(type3 is String);
  print(type4 is double);
  print(type4 is! double);
}
```

Output:
`false
true
true
false
true`

* Dòng `print(type1 is int);` hiển thị `false` vì `type1` là kiểu `doubl` mà chúng ta đang hỏi trình biên dịch là liệu nó có phải là kiểu `int` hay không
* Dòng `print(type2 is int);` hiển thị `true` vì `type2` là kiểu `int` và chúng ta cũng đang hỏi trình biên dịch là liệu nó có phải là kiểu `int` hay không
* Dòng `print(type3 is String);` hiển thị `true` vì `type3` là kiểu `String` và chúng ta cũng đang hỏi trình biên dịch là liệu nó có phải là kiểu `String` hay không
* Dòng `print(type4 is double);` hiển thị `false` vì `type4` là kiểu `bool` mà chúng ta đang hỏi trình biên dịch là liệu nó có phải là kiểu `doubl` hay không
* Dòng `print(type4 is! double);` hiển thị `true` vì `type4` không phải là kiểu `bool` và chúng ta cũng đang hỏi trình biên dịch là liệu nó không phải là kiểu `String` đúng không

## 6. Toán tử gán

![image.png](https://images.viblo.asia/71186b7f-9425-4903-9596-2fdc53d4422e.png)

Toán tử gán là những toán tử được dùng để thực hiện những phép gán một giá trị cho một toán hạng.

Trong phần này chúng ta sẽ gặp lại những toán tử mà chúng ta đã thảo luận, đặc biệt là toán tử `=`. Bên cạnh đó, chúng ta cũng sẽ tập trung vào những toán tử gán kết hợp (compound assignment operators).

### 6.1 Toán tử gán kết hợp (Compound Assignment Operators)

Toán tử gán kết hợp sẽ kết hợp những toán tử khác với toán tử gán (`=`).

||  |  | |  | |
| -------- | -------- | -------- | -------- | -------- | -------- |
|=	|-=	|/= |%=	|>>=|^=|
|+=	|*=	|~/=	|<<=|&=	|\|=|

Dưới đây là syntax chung:
![image.png](https://images.viblo.asia/29147fc1-6ce1-49a2-b1b4-932b72402901.png)

Ở cú pháp trên, toán tử đang đang thực hiện phép toán giữa operand1 và operand2 rồi sau đó gán giá trị kết quả cho operand1.

Nó cũng tương tự như syntax sau:

![image.png](https://images.viblo.asia/0bf79776-0a99-4a9b-af01-c67fc03898f5.png)

Để ý mô hình ở trên. Các toán tử gán yêu cầu rằng các toán hạng của nó phải là các biến vì kết quả của phép toán được chứa trong toán hạng bên trái / đầu tiên.

#### Ví dụ

`+=`

Trong ví dụ dưới đây, chúng ta sẽ lấy toán hạng bên trái  A là 10, toán hạng bên phải B là 7. Thử sử dụng cả toán tử gán và toán tử gán kết hợp xem thử như thế nào nhé:

```
main() {
  var A = 10;
  var B = 7;
  
  print("Before using a compound assignment operator:");
  print(A);

  A += B;

  print("After using a compound assignment operator:");
  print(A);
}
```

Output:
`Before using a compound assignment operator:
10
After using a compound assignment operator:
17`

Trước khi chúng ta gán lại biến `A` thì giá trị của nó là `10`. Sau khi sử dụng toán tử gán kết hợp `+=` thì giá trị mới của nó là 17. Phép `A += B` thì cũng giống như `A = A + B`.

Hãy xem thêm một vài ví dụ nữa nhé:

`&=`

```
main() {
  var A = 10;
  var B = 7;
  
  print("Before using a compound assignment operator:");
  print(A);

  A &= B;

  print("After using a compound assignment operator:");
  print(A);
}
```

Output:
`Before using a compound assignment operator:
10
After using a compound assignment operator:
2`

`A &= B` cũng tương tự `A = A & B`

`~/=`

```
main() {
  var A = 10;
  var B = 7;
  
  print("Before using a compound assignment operator:");
  print(A);

  A ~/= B;

  print("After using a compound assignment operator:");
  print(A);
}
```

Output:
`Before using a compound assignment operator:
10
After using a compound assignment operator:
1`

`A ~/= B` cũng tương tự `A = A ~/ B`

## 7. Toán tử logic

![image.png](https://images.viblo.asia/fabded90-40fb-4edc-9f81-19b1ffb4b351.png)

Toán tử logic là những toán tử thực hiện các phép toán logic như là **logic và (and), logic hoặc (or).** Chúng lấy toán hạng kiểu `bool` và mang lại kết quả kiểu `bool`. Dưới đây là danh sách các toán tử logic được hỗ trợ bởi ngôn ngữ Dart.

|Operator	|Name	|Use|
|-|-|-|
|!	|Logical NOT	|Reverses the logical state of its operand. If a condition is true, then the Logical NOT operator will make it false|
|\|\| |Logical OR	|If any of the two operands is not false, then the result is true|
|&&	|Logical AND	|If both the operands are not false, then the result is true|

### 7.1 Những quy tắc

Dưới đây là danh sách các quy tắc ngắn gọn cho các toán tử logic. Danh sách này rất hữu ích vì nó sẽ tóm tắt cách mỗi toán tử trả các biểu thức về kết quả cuối cùng của nó.

![image.png](https://images.viblo.asia/55b02a55-a18a-41f9-9b7c-caf42e43f092.png)

*expr* là một biểu thức tùy ý có thể được thay thế bằng một toán hạng kiểu `Boolean`. Toán hạng có thể là `true` hoặc `false` hoặc có thể là một biểu thức rút gọn thành `true` hoặc `false`.

### 7.2 Ví dụ:

Hãy xem những quy tắc trên được thực hiện như thế nào trong ví dụ dưới đây nhé. Biểu thức `expr` sẽ là `A && B` trong đó `A `là `true` và `B` là `false`.

```
main() {
  var A = true;
  var B = false;
  var expr = A && B; //false

  print(!A); // !true --> false
  print(!B); // !false --> true
  print(true || expr); // true || expr --> true
  print(false || expr); // false || expr --> expr
  print(true && expr); // true && expr --> expr
  print(false && expr); // false && expr --> false
}
```

Output:
`false
true
true
false
false
false`

`A && B` trả về `false` vì B là `false` và từ danh sách các quy tắc ở trên chúng ta biết rằng `false && expr --> false`.

## 8. Toán tử Bitwise và Shift

![image.png](https://images.viblo.asia/a7b48290-fb35-460a-8d6f-4825d7c1729a.png)

Toán tử Bitwise và toán tử Shift là những toán tử thực hiện những phép toán trên những bit riêng rẻ của kiểu integer.

Trong lập trình máy tính kỹ thuật số. Phép toán bitwise hoạt động trên một hoặc nhiều số nhị phân (binary numbers), hoặc các chuỗi giống số nhị phân. Đây là một phép toán đơn giản và nhanh, được hỗ trợ trực tiếp bởi bộ xử lý (processor).

Thông thường các phép tính bitwise nhanh hơn rất nhiều so với phép nhân, phép chia, đôi khi nhanh hơn đáng kể so với phép cộng. Các phép tính bitwise sử dụng ít năng lượng hơn bởi nó ít sử dụng tài nguyên

Dưới đây là danh sách các toán tử bitwise được hỗ trợ bởi Dart:

|Operator	|Name	|Use|
|-|-|-|
|&	|Bitwise AND	|If the corresponding bit in both operands is 1 it will give a 1, else 0|
|\|	|Bitwise OR	|If the corresponding bit in at least one operand is 1 it will give a 1, else 0|
|^	|Bitwise XOR	|If the corresponding bit in only one operand is 1 it will give a 1, else 0|
|~	|Unary Bitwise Complement	|Bits which are 0 become 1 and bits which are 1 become 0|

Dưới đây là danh sách các toán tử shift được Dart hỗ trợ.

|Operator	|Name	|Use|
|<<	|Shift Left	|Shifts all the bits of its operand to the left by the specified amount|
|>>	|Shift Right	|Shifts all the bits of its operand to the right by the specified amount|

> Cả hai toán tử Bitwise và Shift đều hoạt động trên số nhị phân.

### 8.1 Những quy tắc

Dưới đây chúng ta có một danh sách các quy tắc mà mỗi toán tử bitwise tuân theo. Đối với toán tử bitwise, chúng ta làm việc với số nhị phân. Do đó, thay vì false và true, chúng ta sẽ sử dụng 1 và 0 trong đó 1 đóng vai trò là true và 0 đóng vai trò là false. bit có thể là 1 hoặc 0.

![image.png](https://images.viblo.asia/d72a86da-fe65-4e3e-b2c5-132dd32181c5.png)

### 8.2 Ví dụ:

Bây giờ chúng ta hãy xem các quy tắc trên trong hoạt động như thế nào nhé. Chúng ta sẽ lấy toán hạng đầu tiên A  là 12 và toán hạng thứ hai B là 5.

```
main() {
  var A = 12;
  var B = 5;

  print(~A); // A complement
  print(~B); // B complement
  print(A & B); // A AND B
  print(A | B); // A OR B
  print(A ^ B); // A XOR B
  print(B << 2); // B Shift Left 2
  print(A >> 2); // A Shift Right 2
}
```

Output:
`-13
-6
4
13
9
20
3`

### 8.3 Phân tích code

Output của đoạn code trên có thể không rõ ràng như những output mà chúng ta đã thấy trước đây trong series này. Nhưng đừng lo quá nhé! Từng bước một chúng ta sẽ chia nhỏ những gì mà các toàn tử đang làm.

#### A & B
Đầu tiên toán tử sẽ chuyển các số thập phân sang dạng nhị phân.

* 12 trong dạng nhị phân sẽ là 0000 1100
* 5 trong dạng nhị phân sẽ là 0000 0101

Từ đó, nó sẽ áp dụng những quy tắc trên vào toán tử nhị phân AND (&) trên từng cặp bits, tức là, áp dụng toán tử & lên bit đầu tiên của 12 và bit đầu tiên của 5 rồi cứ tiếp tục như thế.

![image.png](https://images.viblo.asia/a2b4cd2e-0f29-47da-9d45-709beb3dbb38.png)

Đó là cách mà `A & B` sẽ trả về kết quả là `4`.

Thử áp dụng những quy tắc trên vào những toán tử khác và xem liệu bạn có nhận được kết quả cùng với output ở trên hay không?

### 8.4 Toán tử Shift

Toán tử Shift dịch chuyển các bit của toán hạng. Số lượng bit được dịch chuyển được chỉ định bằng cách sử dụng toán hạng bên phải. Vì vậy, trên dòng `print(B << 2); // B Shift Left 2` của mã, B được dịch sang trái bằng 2. Hãy xem cách này hoạt động như thế nào ở hình dưới nhé.

![image.png](https://images.viblo.asia/86c76833-6801-426b-bad0-61443190f833.png)

Và đó là cách mà `B << 2` trả về kết quả là `20`

Hãy thử giải thích biểu thức ở dòng `print(A >> 2); // A Shift Right 2` và hiểu cách mà `A >> 2` trả về `3`

## 9. Mức độ ưu tiên của các toán tử

Mức độ ưu tiên của toán tử xác định thứ tự mà các phần khác nhau của code hay biểu thức sẽ được thực hiện. Ví dụ, biểu thức 1 + 1 * 5 sẽ cho kết quả là 6 thay vì 10. Vì * có mức độ ưu tiên cao hơn +. Nếu chúng ta muốn ra kết quá là 10 thì phải viết (1 + 1) * 5 vì () có mức độ ưu tiên cao hơn *.

Dưới đây là bảng mức độ ưu tiên của các toán tử. Với mức độ ưu tiên cao nhất sẽ nằm ở trên cùng và thứ tự sẽ giảm dần xuống. Mỗi toán tử có mức độ ưu tiên cao hơn các toán tử trong các hàng theo sau nó.

|Description	|Operator|
|-|-|
|Unary postfix	|., ?., ++, --, [\`\`], ()|
|Unary prefix	|-, !, ˜, ++, --, await|
|Multiplicative	|*, /, ˜/, %|
|Additive	|+, -|
|Shift	|<<, >>, >>>|
|Bitwise AND|	&|
|Bitwise XOR|	ˆ|
|Bitwise OR	|\||
|Relational	|<, >, <=, >=, as, is, is!|
|Equality	|==, !=|
|Logical AND	|&&|
|Logical Or	|\|\||
|If-null	|??|
|Conditional	|? :|
|Cascade	|..|
|Assignment	|=, *=, /=, +=, -=, &=, ˆ=, etc.|


Có thể có một số toán tử trong danh sách trên bạn không quen thuộc, nhưng không sao cả; chúng sẽ được đề cập đến trong các bài viết sau. Mục đích của danh sách này là cung cấp cho bạn một thứ tự ưu tiên toán tử toàn diện để bạn có thể quay lại xem bất cứ khi nào bạn cần.

Chúng ta hãy tiếp tục tìm hiểu về Collection của Dart trong bài viết tiếp theo nhé!