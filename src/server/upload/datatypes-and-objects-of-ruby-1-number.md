Để hiểu về 1 ngôn ngữ lập trình, bạn phải hiểu về các kiểu dữ liệu mà nó có thể thao tác. Ở part "Datatypes and Objects of Ruby" mình sẽ nói về các kiểu dữ liệu : Number, Text, Arrays, Hashes, Ranges, Symbols, True, False and Nil. Mở đầu với #1, mình sẽ nói về kiểu Number(kiểu số học)
Ruby bao gồm 5 class được tích hợp đại diện cho kiểu số học. Ngoài ra, standard library của Ruby định nghĩa thêm 3 class kiểu số học khác sẽ có ích trong 1 số trường hợp. Sự phân cấp của 8 class này được thể hiện qua sơ đồ dưới đây.
![](https://images.viblo.asia/2e20c660-38d9-4c5f-9368-ef173df68b3f.png)

***Hình 1: Sơ đồ phân cấp các Numeric Class trong Ruby***

Tất cả các numeric object(các đối tượng số học) trong Ruby đều là thể hiện của class **Numeric**. Trong đó:
* **Integer**: là lớp định nghĩa tất cả các số nguyên. Đối với những phiên bản Ruby < 2.4, để tăng độ chính xác cho các đối tượng số nguyên, hai lớp **Bignum** và **Fixnum** kế thừa lớp **Integer** được tạo ra. Một số nguyên có giá trị chiếm 31bits(trong hầu hết các trường hợp) sẽ là đối tượng của lớp **Fixnum** . Trong khi đó, class **Bignum** đại diện cho những objects số nguyên có giá trị tùy biến. Cụ thể, nếu kết quả của một biểu thức vượt ngoài giá trị **Fixnum** nó sẽ được tự động convert thành objects của lớp **Bignum** . Và nếu 1 biểu thức giữa các **Bignum** objects cho ra kết quả là 1 giá trị nằm trong khoảng của **Fixnum**, thì kết quả tạo ra là 1 **Fixnum** object.
* **Float**: Lớp định nghĩa số thực, sử dụng dấu phẩy động để định nghĩa. 

Chúng ta có 3 class ko được tích hợp trong Ruby, và được sử dụng như là 1 phần của standard-library, đó là:
* **BigDecimal** : Định nghĩa số thực với độ chính xác cao, sử dụng biểu diễn thập phân thay vì nhị phân. (Điểm khác biệt giữa BigDecimal và Float nằm ở **độ chính xác**, chúng ta sẽ nói rõ điều này ở phần về "dấu phẩy động - binary floating point ).
* **Complex** : Lớp định nghĩa số phức.
* **Rational** : Lớp định nghĩa phân số 

Khác với nhiều ngôn ngữ khác, tất cả các giá trị bao gồm cả các số, chữ số(thậm chí cả các giá trị true, false, null) đều là các object. Chúng được viết sẵn nhiều loại method để gọi ví dụ: 
```
irb(main):006:0> 3.times do puts "Khi anh hao quang dan khuat"
irb(main):007:1> end
Khi anh hao quang dan khuat
Khi anh hao quang dan khuat
Khi anh hao quang dan khuat
=> 3
```
Tuy nhiên, không có 1 method nào có thể thay đổi giá trị của 1 Numeric Object. 
> All numeric objects are immutable

## Integer Literal
Trình thông dịch Ruby( Ruby interpreter) phân tích 1 chương trình thành chuỗi các token. Token bao gồm comments, **literals** , punctuation, identifiers và keywords. 
Một literal là một giá trị xuất hiện trực tiếp trong sourecode của ngôn ngữ lập trình(ở đây là Ruby). Một Integer literal là một giá trị nguyên xuất hiện **theo đúng nghĩa đen của nó** .
Ví dụ:  
* 1 là một integer literal của giá trị nguyên 1. 
* 0x10, 16 là những integer literal của giá trị 16.
```
irb(main):010:0> 1
=> 1
irb(main):011:0> 0x10
=> 16
irb(main):012:0>
```
* Tuy nhiên (2 + 2) trả về giá trị bằng 4.  là một expression chứ không phải một integer literal.

Trong Ruby, để phân tách các hàng phần nghìn, phần triệu, ta có thể sử dụng dấu phẩy, hoặc các dấu gạch dưới vào các integer literal. Ví dụ:
```
irb(main):001:0> 1_000_000_000
=> 1000000000
```
Nếu một integer literal bắt đầu với số 0, và có nhiều hơn 1 chữ số, thì nó là 1 số thuộc hệ thập phân. Nếu nó bắt đầu với 0x hoặc 0X thì nó là 1 số thuộc hệ hexa, và bắt đầu với 0b hoặc 0B thì nó là số thuộc hệ nhị phân. (Khá dễ hiểu, bởi vì Ruby cố gắng định nghĩa cách gọi các đối tượng theo cách gần gũi với toán học nhất có thể).
Các đối tượng số nguyên âm và số nguyên dương có thể được định nghĩa bằng dấu "-" hoặc dấu "+" đứng đằng trước.
```
0377 # Octal representation of 255
0b1111_1111 # Binary representation of 255
0xFF # Hexadecimal representation of 255
+-100 # -100
```

## Floating-point Literal
Một floating-point literal là một đối tượng số thập phân bao gồm: ***các chữ số** + **dấu chấm động(floating-point)** + **các chữ số** + **số mũ(không bắt buộc)*** 
Ví dụ:
```
0.0
-3.14
6.02e23 # This means 6.02 × 1023
1_000_000.01 # One million and a little bit more
```
***Lưu ý:***:
* Số mũ có thể sử dụng ký tự "e" hoặc "E". 
* Dấu chấm động(floating-point) chỉ có thể sử dụng với các chữ số ở hệ thập phân.
* Buộc phải có chữ số nguyên ở đằng trước và sau dấu chấm động. Bạn không thể viết giá trị 0.1 dưới dạng .1 hoặc giá trị 1.0 dưới dạng 1.
```
irb(main):003:0> .1
Traceback (most recent call last):
        3: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `<main>'
        2: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `load'
        1: from /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
SyntaxError ((irb):3: no .<digit> floating literal anymore; put 0 before dot)
(irb):3: syntax error, unexpected '.'
```

## Arithmetic in Ruby(số học trong Ruby)
Ruby định nghĩa các toán tử  + , - , * , /  cơ bản để thực hiện phép tính giống như các ngôn ngữ thông dụng. Việc các đối tượng số nguyên có thể chuyển đổi thành các đối tượng Fixnum và Bignum như đã nói ở trên, giúp cho giá trị của các phép tính số nguyên không bị overflows như trong các ngôn ngữ khác. Các số thập phân có thể bị overflow về 1 giá trị +, - Infinity đặc biệt.
```
irb(main):005:0> 9999999**9999999999999999999999999999999999999999999999999999
(irb):5: warning: in a**b, b may be too big
=> Infinity
irb(main):006:0> -9999999**9999999999999999999999999999999999999999999999999999 
(irb):6: warning: in a**b, b may be too big
=> -Infinity
```

Kết quả của phép chia trong Ruby phụ thuộc vào class của tử số hoặc mẫu số. Nếu class của cả tử số và mẫu số là số nguyên, phép / sẽ tương đương với phép div trong số học. Nếu class của 1 trong 2 là số thập phân, thì kết quả phép / sẽ là số thập phân. Ví dụ:
```
x = 5/2 # result is 2
y = 5.0/2 # result is 2.5
z = 5/2.0 # result is 2.5
```
Số nguyên chia 0, số thập phân chia 0 và 0.0 / 0.0 đều là những trường hợp đặc biệt, và ta hãy cùng xem kết quả của nó trong Ruby là gì:
```
irb(main):011:0> 5/0
=> ZeroDivisionError (divided by 0)
irb(main):012:0> 5.1/0
=> Infinity
irb(main):014:0> 0.0 / 0.0
=> NaN
```
Khi tử số hoặc mẫu số có giá trị âm, kết quả tìm được ở 1 phép chia giữa số nguyên âm và số nguyên dương khá thú vị. Ta có thể thấy:
```
irb(main):015:0> -7/3
=> -3
irb(main):017:0> -7%3
=> 2
irb(main):019:0> -7/3 == 7/-3
=> true
irb(main):020:0> -(7/3) == 7/-3
=> false
```
Điểm thú vị là, nếu trong C hoặc Java, phép toán -7/3 sẽ cho ra giá trị là -2, phép -7%3 ra giá trị -1. Sự khác biệt ở đây giữa Ruby và C là Ruby làm tròn kết quả về phía giá trị -Infinity, còn trong C thì kết quả được làm tròn về phía giá trị 0.

Ruby mượn cú pháp của ngôn ngữ Fortran với toán tử ** để làm toán tử mũ. 
```
x**4 # This is the same thing as x*x*x*x
x**-1 # The same thing as 1/x
x**(1/3.0) # The cube root of x
x**(1/4) # Oops! Integer division means this is x**0, which is always 1
x**(1.0/4.0) # This is the fourth-root of x
```
Điểm cần lưu ý là phép toán này có thứ tự ưu tiên từ phải qua trái, nghĩa là 4 ** 3 ** 2 bằng với 4 ** 9 thay vì 64 ** 2.

## Binary Floating-Point and Rounding Errors.
Hầu hết các ngôn ngữ lập trình đều cố gắng thể hiện gần đúng các số thực bằng cách sử dụng dấu chấm động như trong class Float của Ruby. Dấu chấm động này được biểu diễn  dưới dạng nhị phân, nên nó có thể biểu diễn chính xác các giá trị 1/2, 1/4, 1/8, 1/1024. Tuy nhiên, trong các bài toán thực tế, đặc biệt là với cơ sở dữ liệu của các bài toán kinh tế, chúng ta cần phải sử dụng các giá trị như 1/10, 1/100, 1/1000 rất nhiều. Và dấu chấm động được biểu diễn dưới dạng nhị phân, hầu như ko thể biểu diễn chính xác các biểu thức trả về giá trị 0.1 . Ví dụ:
```
irb(main):024:0> 0.4 - 0.3 == 0.1
=> false
```
Để giải quyết vấn đề này, chúng ta có thể sử dụng đối tượng của lớp BigDecimal với độ chính xác cao hơn thay cho lớp Float:
```
irb(main):028:0> require 'bigdecimal'
=> true
irb(main):032:0> BigDecimal("0.4") - BigDecimal("0.3") == 0.1 
=> true
```
(Vì BigDecimal ko được tích hợp trong Ruby mà là 1 phần của standard library, nên bạn nhớ require 'bigdecimal' trước khi sử dụng nhé).

Bài viết của mình tạm dừng ở đây. Hẹn gặp lại các bạn ở chương sau.