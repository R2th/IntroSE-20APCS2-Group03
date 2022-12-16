## Giới thiệu
Khi làm việc với các framework PHP, chúng ta thấy xuất hiện các toán tử ?? và ?: được sử dụng rất thường xuyên. Bản thân mình trong quá trình làm việc hay bị nhầm lẫn khi sử dụng chúng. Để có thể sử dụng hiệu quả thì chúng ta hãy cùng tìm hiểu và phân biệt 2 toán tử này nhé

### 1. Toán tử Elvis ?:

Trước phiên bản 5.3, PHP đã cung cấp cú pháp if else toán tử 3 ngôn ngắn gọn
```javascript
condition ? true : false;
```

Kể từ PHP 5.3+, chúng ta có thể sử dụng cú pháp toán tử ternary ngắn hơn bằng cách bỏ phần giữa của toán tử ternary

```perl
expr1 ?: expr2;
```

Để hiểu rõ cách hoạt động thì chúng ta hãy xem cách viết đầy đủ của toán tử này

```objectivec
// Sử dụng toán tử elvis
expr1 ?: expr2;

// Sử dụng toán tử ternary
expr1 ? expr1 : expr2;

// Sử dụng if else
if (expr1) {
    return expr1;
} else {
    return expr2;
}
```

Cú pháp này dịch ra văn nói sẽ là "nếu điều kiện expr1 là **True** thì sẽ return expr1, nếu không thì return expr2". Biểu thức bên phải của toán tử Elvis tức toán hạng thứ 2 sẽ chỉ được thực thi nếu toán hạng thứ nhất được đánh giá là **False**.

Chúng ta cần phải ghi nhớ thế nào được coi là **False** trong PHP:
* Kiểu Boolean: `false`
* Kiểu Integer: `0`
* Kiểu Float: `0.0`
* Kiểu String: `'0', "0"`
* String rỗng: `'', ""`
* Mảng rỗng: `[] hoặc array()`
* NULL
* SimpleXML objects được tạo từ các thẻ trống

> Lưu ý: Các chuỗi dạng "00", "0.0", "\0", và "false" đều được coi là TRUE, chúng khác với string '0' hoặc boolean false.

Chúng ta có thể sử dụng cùng lúc nhiều toán tử Elvis và nó sẽ trả về giá trị TRUE đầu tiên mà nó gặp phải

```swift
echo 0 ?: 1 ?: 2 ?: 3; // output: 1
```

Nếu chỉ dùng if else thì nó sẽ dài dằng dặc như này

```objectivec
if (expr1) {
    return expr1;
} else if (expr2) {
    return expr2;
} else if (expr3) {
    return expr3;
} else {
    return expr4;
}
```

Với các ngôn ngữ khác:

Trong một số ngôn ngữ lập trình khác như Perl, Python, Ruby và JavaScript, toán tử elvis được viết dưới dạng toán tử **OR** (ký hiệu ||). Điều này có hành vi tương tự, tức là trả về toán hạng đầu tiên của nó nếu nó được đánh giá là TRUE hoặc đánh giá và trả về toán hạng thứ hai của nó theo cách khác.

### 2. Toán tử hợp nhất NULL ??
Từ PHP 7, toán tử hợp nhất NULL được giới thiệu và có cú pháp như sau

```perl
expr1 ?? expr2;
```

Nó có nghĩa là expr1 được trả về nếu expr1 tồn tại và không NULL, mặt khác biểu thức sẽ trả về expr2.

Nếu không sử dụng cú pháp `??` thì biểu thức trên sẽ được biểu diễn như này
```javascript
// Sử dụng if else
if (isset($x)) {
    return $x;
} else {
    return $y;
}

// Sử dụng toán tử ternary để biểu diễn
return isset($x) ? $x : $y;

```

> Lưu ý: Toán tử này chỉ quan tâm 2 điều biến có tồn tại và không NULL còn lại nếu biến được gán boolean FALSE thì cũng được coi là TRUE.

Tương tự với toán tử Elvis, ta có thể sử dụng nhiều ?? cùng lúc

```php
$x ?? $y ?? $z ?? 'empty'; // output: 'empty'
```

> Trong trường hợp không có giá trị được xác định trong chuỗi liên kết, thông báo "Notice: Undefined variable: ..." được hiển thị.
> 
### 3. So sánh ?: vs ??
Chúng ta sẽ làm 1 bảng so sánh 2 toán tử này với 1 biểu thức đã cho để thấy rõ sự khác biệt của chúng

| Expression | echo ($x ?: 'hello') | echo ($x ?? 'hello') |
| -------- | -------- | -------- |
| $x = ""; | 'hello' |	"" |
|$x = null;	|'hello'	|'hello'|
|$x;|	'hello' <br> (and Notice: Undefined variable: x)	|'hello'|
|$x = [];|	'hello'	|[]|
|$x = ['a', 'b'];|	['a', 'b'] | ['a', 'b']|
|$x = false;|	'hello'|	false|
|$x = true;	|true|	true|
|$x = 1;	|1|	1|
|$x = 0;	|'hello'	|0|
|$x = -1;	|-1	|-1|
|$x = '1';	|'1'	|'1'|
|$x = '0';	|'hello'	|'0'|
|$x = '-1';|	'-1'	|'-1'|
|$x = 'random';	|'random'	|'random'|
|$x = new stdClass;	|object(stdClass)	|object(stdClass)|

##  Tổng kết
Trên đây mình đã trình bày về 2 toán tử thường xuyên sử dụng trong PHP hy vọng sẽ giúp ích cho các bạn trong quá trình làm việc. Cảm ơn các bạn đã đọc bài. Nếu có sai sót hãy góp ý cho mình nhé ;)

Nguồn:

* https://www.designcise.com/web/tutorial/whats-the-difference-between-null-coalescing-operator-and-ternary-operator-in-php#elvis-operator
* https://www.php.net/manual/en/language.operators.comparison.php