# Mở Đầu
Chắc hẳn khi bạn lần đầu đối mặt với Regular Expression, bạn sẽ cảm thấy nó dường như là một chuỗi khó hiểu, rối rắm và chỉ toàn là những ký tự đan xen vào nhau, trông thật là kinh khủng, nhưng nó lại cực kỳ hữu ích. Nó sẽ giúp bạn tăng level lập trình lên rất là nhiều. Để hiểu rõ về Regular Expression, chúng ta phải nắm rõ những khái niệm cơ bản nhất, sau đó bạn sẽ có thể xây dựng những biểu thức phức tạp hơn.


-----

# Regular Expression là gì ?
* Regular Expression hay Biểu thức chính quy hay viết tắt là Regex là một cách để mô tả các khuôn mẫu trong một chuỗi. Nó tạo ra một ngôn ngữ của riêng nó và là một phần trong nhiều ngôn ngữ lập trình như JavaScript, Perl, Java,...
* Regex cho phép bạn kiểm tra một chuỗi như là email hoặc mật khẩu với một khuôn mẫu, để xem liệu chuỗi đó có khớp với khuôn mẫu được định nghĩa hay không và trả về thông tin mà chúng ta mong muốn.

# Tạo một Regular Expression 
Có 2 cách tạo một Regex trong JavaScript. Thứ nhất, tạo bằng Regex contructor với từ khóa `new`.  Thứ hai, tạo bằng dấu gạch chéo trước `/`, bao bọc xung quanh khuôn mẫu (pattern).
## Tạo Regex với contructor
### Cú pháp: `new RegExp(pattern[, flags])`

### Ví dụ: 
```
var regexConst = new RegExp('abc');
```

## Tạo Regex với `/`
### Cú pháp: `/pattern/flags`

### Ví dụ:
```
var regexLiteral = /abc/;
```

* `flags` là không bắt buộc. Mình sẽ giải thích ở phần sau của bài viết.

Có một số trường hợp bạn muốn tạo regex một cách linh hoạt hơn, trong những trường hợp này thì bạn không thể tạo bằng dấu `/` mà phải dùng `contructor`. 

Nhưng cho dù bạn có tạo Regex bằng cách nào đi nữa, kết quả vẫn sẽ là một Regex object và sẽ có cùng phương thức cũng như thuộc tính.

-----

*Bởi vì dấu gạch chéo trước `/` được sử dụng để bao bọc pattern cho nên khi bạn muốn sử dụng dấu gạch chéo trước `/` trong Regex thì bạn phải dùng dấu gạch chéo ngược `\` ở đằng trước (vd: `/\//` => khớp với chuỗi có dấu `/`)*

-----

# Phương thức Regex
Có 2 phương thức chính trong cho việc kiểm tra Regex.
## RegExp.prototype.test()
Phương thức này dùng để kiểm tra liệu một chuỗi khớp có được tìm thấy hay không. Nó nhận một chuỗi được kiểm tra với Regex và trả về `true` nếu tìm được chuỗi khớp với pattern (khuôn mẫu), nếu không tìm thấy thì trả về `false`.

Ví dụ: 
```
var regex = /hello/;
var str = 'hello world';
var result = regex.test(str);
console.log(result); // returns true
```

### RegExp.prototype.exec()
Phương thức này nhận vào một chuỗi và trả về một mảng chứa thông tin chi tiết về chuỗi được tìm thấy.

Ví dụ: 
```
var regex = /hello/;
var str = 'hello world';
var result = regex.exec(str);
console.log(result);
// returns [ 'hello', index: 0, input: 'hello world', groups: undefined ]
// 'hello' -> is the matched pattern.
// index: -> Is where the regular expression starts.
// input: -> Is the actual string passed.
```
# Tìm một từ trong chuỗi
Đây là pattern đơn giản nhất, nó chỉ đơn giản là tìm một từ trong một chuỗi.
```
var regex = /hello/;
console.log(regex.test('hello world')); // true
```

# Ký tự đặc biệt
Từ đầu bài viết đến giờ, chúng ta đã tạo ra những pattern khá là đơn giản. Giờ thì hãy cùng mình khám phá sức mạnh thật sự của Regex với những pattern phức tạp hơn thôi nào.
Hãy tưởng tượng bạn có vài địa chỉ email và bạn chỉ muốn lấy tên của họ chẳng hạn, đó là phần đứng trước dấu `@`, tất nhiên mỗi người sẽ có một tên khác nhau và mình tin là bạn sẽ không muốn viết pattern cho từng cái tên đó đâu. Và đây chính là lúc mà các ký tự đặc biệt xuất hiện và để hiểu được Regex một cách thấu đáo thì bạn phải nhớ hết những ký tự này (đừng lo, cũng không nhiều lắm đâu!!!)

## flags
Regex có 5 flags (cờ) tùy chỉnh. Chúng ta hãy xem qua 2 flags quan trọng nhất: 
* `g` => Tìm tất cả các chuỗi khớp với pattern (theo mặc định thì Regex trả về chuỗi đầu tiên khớp với pattern)
* `i` => Không phân biệt chữ hoa thường
 
Bạn có thể kết hợp nhiều flags trong một Regex, thứ tự không quan trọng.

Sau đây là một vài ví dụ:

### Regex với `/` --- Cú pháp: `/pattern/flags` 
```
var regexGlobal = /abc/g;
console.log(regexGlobal.test('abc abc'));
// it will match all the occurence of 'abc', so it won't return 
// after first match.
var regexInsensitive = /abc/i;
console.log(regexInsensitive.test('Abc'));
// returns true, because the case of string characters don't matter 
// in case-insensitive search.
```

### Regex contructor --- Cú pháp: `new RegExp('pattern', 'flags')`

```
var regexGlobal = new RegExp('abc','g')
console.log(regexGlobal.test('abc abc'));
// it will match all the occurence of 'abc', so it won't return // after first match.
var regexInsensitive = new RegExp('abc','i')
console.log(regexInsensitive.test('Abc'));
// returns true, because the case of string characters don't matter // in case-insensitive search.
```

## Nhóm ký tự `[]`
* `[]` --- dùng để so khớp nhiều ký tự khác nhau trong cũng một vị trí, nó sẽ khớp với bất kỳ ký tự nào nằm bên trong cặp ngoặc vuông `[]`.
Ví dụ:
```
var regex = /[bt]ear/;
console.log(regex.test('tear'));
// returns true
console.log(regex.test('bear'));
// return true
console.log(regex.test('fear'));
// return false
```

* `^` --- nếu dấu `^` nằm trong cặp ngoặc vuông `[]` thì nó sẽ khớp với những chuỗi không có các ký tự theo sau dấu `^`.
Ví dụ: 
```
var regex = /[^bt]ear/;
console.log(regex.test('tear'));
// returns false
console.log(regex.test('bear'));
// return false
console.log(regex.test('fear'));
// return true
```

* `-` --- giả sử chúng ta muốn so khớp tất cả các chữ cái trong bảng chữ cái trong cùng một vị trí, chúng ta có thể viết tất cả các chữ cái vào dấu `[]`, nhưng như thế sẽ rất thiếu thực tế, có một cách đơn giản hơn đó là dùng dấu `-` ( vd: [a-h] --- so khớp tất cả chữ cái từ a đến h, [0-9] --- so khớp các số từ 0 đến 9 ).
Ví dụ:
```
var regex = /[a-z]ear/;
console.log(regex.test('fear'));
// returns true
console.log(regex.test('tear'));
// returns true
```

## Ký tự meta
Ký tự meta (meta-character) là những ký tự có ý nghĩa đặc biệt, nó dùng để rút gọn một số Regex, chúng ta hãy xem qua một vài ký tự meta quan trọng:
* `\d` --- Khớp với bất kỳ các ký tự là số (tương tự [0-9])
* `\D` --- Khớp với bất kỳ các ký tự không phải là số (tương tự [^0-9])
* `\w` --- Khớp với bất kỳ các ký tự là chữ cái hoặc số hoặc dấu gạch dưới `_` (tương tự [0-9a-zA-Z_])
* `\W` --- Khớp với bất kỳ các ký tự không phải là chữ cái hoặc số hoặc dấu gạch dưới `_` (tương tự [^0-9a-zA-Z_])
* `\s` --- Khớp với một ký tự khoảng trắng (spaces, tab)
* `\S` --- Khớp với một ký tự không phải khoảng trắng
* `\t` --- Chỉ khớp với ký tự là tab
* `\b` --- Tìm một chuỗi khớp tại vị trí đầu hoặc cuối của một từ (được xem như ranh giới của từ)
* `.` --- (period) Khớp với bất kỳ ký tự nào ngoại trừ ký tự xuống dòng `\n`.

## Ký hiệu định lượng
Ký hiệu định lượng (Quantifiers) là những ký hiệu mang ý nghĩa đặc biệt, thường liên quan đến việc tìm ký tự lặp lại trong chuỗi.
* `+` --- Khớp với ký tự hoặc biểu thức xuất hiện đằng trước 1 lần hoặc nhiều lần
```
var regex = /\d+/;
console.log(regex.test('8'));
// true
console.log(regex.test('88899'));
// true
console.log(regex.test('8888845'));
// true
```
* `*` --- Khớp với ký tự hoặc biểu thức xuất hiện đằng trước 0 lần hoặc nhiều lần
```
var regex = /go*d/;
console.log(regex.test('gd'));
// true
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// true
```
* `?` --- Khớp với ký tự hoặc biểu thức xuất hiện đằng trước 0 lần hoặc 1 lần
```
var regex = /goo?d/;
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// false
```
* `^` --- Khớp với chuỗi bắt đầu bằng một chuỗi theo sau dấu `^` (Lưu ý là khác với trường hợp dấu `^` nằm trong cặp ngoặc vuông `[]`)
```
var regex = /^g/;
console.log(regex.test('good'));
// true
console.log(regex.test('bad'));
// false
console.log(regex.test('tag'));
// false
```
* `$` --- Khớp với chuỗi kết thúc bằng một chuỗi đứng trước dấu `$`
```
var regex = /.com$/;
console.log(regex.test('test@testmail.com'));
// true
console.log(regex.test('test@testmail'));
// false
```
* `{N}` --- Khớp với ký tự hoặc biểu thức xuất hiện đằng trước nó N lần
```
var regex = /go{2}d/;
console.log(regex.test('good'));
// true
console.log(regex.test('god'));
// false
```
* `{N,}` --- Khớp với ký tự hoặc biểu thức xuất hiện đằng trước nó ít nhất là N lần
```
var regex = /go{2,}d/;
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// true
console.log(regex.test('gooood'));
// true
``` 
* `{N,M}` --- Khớp với ký tự hoặc biểu thức xuất hiện đằng trước nó ít nhất là N lần và nhiều nhất là M lần
```
var regex = /go{1,2}d/;
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// false
```

### `|`
* `X|Y` --- Khớp với X hoặc Y
```
var regex = /(green|red) apple/;
console.log(regex.test('green apple'));
// true
console.log(regex.test('red apple'));
// true
console.log(regex.test('blue apple'));
// false
```

**Lưu ý** --- Nếu bạn muốn sử dụng bất kỳ ký tự đặc biệt nào (vd: `+`, `?`, ...) trong biểu thức Regex thì bạn chỉ cần đặt dấu gạch chéo ngược `\` trước những ký tự đó là được. Ví dụ:
```
var regex = /a+b/;  // This won't work
var regex = /a\+b/; // This will work
console.log(regex.test('a+b')); // true
```

Nâng cao hơn một chút thì chúng ta có vài Regex sau: 

* `(x)` --- (capturing groups) Khớp với `x` và ghi nhớ chuỗi khớp. Những biểu thức nằm trong cặp ngoặc nhọn `()` , nó cũng được sử dụng như là các biểu thức con (subexxpression). Ví dụ:
```
var regex = /(foo)bar\1/;
console.log(regex.test('foobarfoo'));
// true
console.log(regex.test('foobar'));
// false
```
`\1`  ghi nhớ và sử dụng biểu thức con đầu tiên chính là `foo` 

* `(?:x)` ---  (non-capturing groups) Ngược lại với trường hợp trên, Regex này khớp với `x` và không ghi nhớ, nghĩa là lúc này `\1` sẽ không tham chiếu tới biểu thức đầu tiên nữa. Ví du:
```
var regex = /(?:foo)bar\1/;
console.log(regex.test('foobarfoo'));
// false
console.log(regex.test('foobar'));
// false
console.log(regex.test('foobar\1'));
// true
```

Regex lúc này sẽ khớp với chuỗi có `\1`

* `x(?=y)` --- (Positive look ahead) Khớp với `x` chỉ khi nào `x` được theo sau bởi `y`. Ví dụ:
```
var regex = /Red(?=Apple)/;
console.log(regex.test('RedApple'));
// true
```

Trong ví dụ trên thì Regex chỉ khớp với những chuỗi có `Red` theo sau bởi `Apple`

### Luyện tập Regex
Chúng ta hãy đi qua một số ví dụ để ôn lại kiến thức nhé!
* Khớp với số có 10 chữ số bất kỳ:
```
var regex = /^\d{10}$/;
console.log(regex.test('9995484545'));
// true
```
Hãy cùng mình phân tích đoạn code phía trên nhé:
1. Nếu chúng ta muốn chuỗi khớp phải kéo dài ra toàn bộ chuỗi, chúng ta có thể sử dụng `^` và `$`. Dấu `^` khớp với vị trí bắt đầu của chuỗi, trong khi dấu `$` khớp với vị trí kết thúc của chuỗi. Vì vậy nó sẽ không thể khớp với chuỗi có hơn 10 chữ số được.
2. `\d` khớp với bất kỳ ký tự nào là số
3. `{10}` số lần xuất hiện của ký tự hoặc biểu thức đằng trước nó, trong trường hợp này là `\d`

* Khớp với ngày tháng năm với định dạng DD-MM-YY hoặc DD-MM-YYYY
```
var regex = /^(\d{1,2}-){2}\d{2}(\d{2})?$/;
console.log(regex.test('01-01-1990'));
// true
console.log(regex.test('01-01-90'));
// true
console.log(regex.test('01-01-190'));
// false
```
1. Một lần nữa, chúng tôi lại sử dụng `^` và `$`  bên trong Regex, để chuỗi khớp kéo dài toàn bộ chuỗi.
2. `(` bắt đầu của biểu thức con đầu tiên.
3. `\d{1,2}` khớp với ít nhất 1 chữ số và nhiều nhất 2 chữ số.
4. `-` khớp với ký tự gạch nối.
5. `)` kết thúc biểu thức con đầu tiên.
6. `{2}` so khớp với biểu thức con đầu tiên chính xác hai lần.
7. `\d{2}` khớp chính xác 2 chữ số.
8. `(\d{2})?` khớp đúng hai chữ số nhưng nó là tùy chọn (`?` là khớp với chuỗi xuất hiện đắng trước nó 0 hoặc 1 lần), vì vậy nó có thể là 2 chữ số hoặc 4 chữ số.

* Khớp với bất kỳ ký tự nào trừ ký tự xuống dòng `\n`
```
var regex = /^(.{3}\.){3}.{3}$/;
console.log(regex.test('123.456.abc.def'));
// true
console.log(regex.test('1243.446.abc.def'));
// false
console.log(regex.test('abc.def.ghi.jkl'));
// true
```
1. `^` và `$` để chuỗi khớp kéo dài toàn bộ chuỗi.
2. `(` bắt đầu của biểu thức con đầu tiên.
3. `.{3}` khớp với bất kỳ ký tự nào đúng 3 lần ngoại trừ ký tự xuống dòng.
4. `\.` khớp với dấu chấm `.`
5. `)` kết thúc biểu thức con đầu tiên.
6. `{3}` so khớp với biểu thức con đầu tiên chính xác 3 lần.
7. `.{3}` khớp với bất kỳ ký tự nào ngoại trừ xuống dòng đúng 3 lần.

# Kết luận
Regex đôi khi có thể khá phức tạp, nhưng hiểu đúng về các khái niệm trên sẽ giúp bạn dễ dàng hiểu các mẫu Regex phức tạp hơn. Bạn có thể tìm hiểu thêm về Regex [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) và thực hành nó [tại đây](https://www.hackerrank.com/domains/regex).

Đây là bài đầu tiên mình viết mong mọi người góp ý ạ! E cám ơn!!! :heart:

Bài viết được dịch từ: [https://blog.bitsrc.io/a-beginners-guide-to-regular-expressions-regex-in-javascript-9c58feb27eb4](https://blog.bitsrc.io/a-beginners-guide-to-regular-expressions-regex-in-javascript-9c58feb27eb4)