Bài viết này nhắm mục đích giúp bạn có thể tận dụng hiệu quả với các biểu thức chính quy với các ví dụ thực tế.<br/>

![](https://images.viblo.asia/0d6f3386-32fc-4d86-b266-62616e002bf6.jpeg)

Yepp, regex! Phần cuối cùng của chiếc mỳ mà đại đa số mọi người đều muốn bỏ qua khi ăn  :slightly_smiling_face:. Nếu bạn đang ở bên đa số kia thì hi vọng cuối bài viết này bạn sẽ thay đổi suy nghĩ giống mình và đọc chúng như tiếng việt. <br/> 

## Regular Expressions là gì ?
Regular Expressions(RegEx) - với cái tên thuần việt là biểu thức chính quy, là `một chuỗi các ký tự` được sử dụng để tìm kiếm một hoặc nhiều kết quả phù hợp trong mẫu tìm kiếm - `pattern`. Về cơ bản, nó là một cách để `tìm kiếm các pattern` trong câu. <br/>
Bạn muốn định dạng đầu vào của ngày tháng hoặc địa chỉ email theo một cách cụ thể? `regex` sẽ giúp bạn làm điều đó. Bạn muốn `parse` và  `replace` một string ? hãy dùng `regex`. Ban đầu, bạn có thể gặp khó khăn khi làm việc với nó, nhưng một khi đã thành thục về nó thì tin tôi đi, nó giúp giúp bạn tiết kiệm `hàng nghìn giờ` trong việc `validate` lẫn `parse` dữ liệu đó.<br/>
Các ngôn ngữ lập trình khác nhau có thể hơi khác nhau trong việc triển khai regex nhưng các khái niệm cơ bản thì hầu hết đều giống nhau. Trước tiên chúng ta hãy xem qua một số khái niệm cơ bản trước khi đi sâu vào ví dụ nhé: <br/>
## Cách tạo một regex
Có hai cách để tạo ra một regex trong Javascript. Nó có thể được tạo bằng hàm tạo RegExp hoặc bằng cách sử dụng dấu gạch chéo  - `/` để bao quanh pattern.

### 1. Hàm khởi tạo RegExp
```Javascript
new RegExp(pattern[, flags])

// Example
var regexConst = new RegExp('abc');
```
### 2. Chuỗi RegExp
```javascript
/pattern/flags

// Example
var regexLiteral = /abc/;
```
Ở đây `flags` là `optional`, một lúc nữa bạn sẽ biết để làm gì.
> Vì dấu gạch chéo - `/` được sử dụng để bao các pattern trong ví dụ trên, nên nếu muốn sử dụng nó trong pattern bạn cần phải thêm dấu gạch chéo ngược - `\` trước nó để sử dụng.

## Regular Expressions Methods
Chủ yếu thì chỉ có 2 method kiểm tra matching với pattern đó là:
### 1. RegExp.prototype.test()
Phương pháp này được sử dụng để kiểm tra xem một kết quả phù hợp đã được tìm thấy hay chưa. Kết quả đầu ra sẽ là `true` hoặc `false`.
```javascript
var regex = /hello/;
var str = 'hello world';

var result = regex.test(str);
console.log(result);
// returns true
```
### 2. RegExp.prototype.exec()
Phương thức này trả về một mảng chứa tất cả các nhóm đã so khớp
```javascript
var regex = /hello/;
var str = 'hello world';

var result = regex.exec(str);
console.log(result);
// returns [ 'hello', index: 0, input: 'hello world', groups: undefined ]
// 'hello' -> là kết quả matched với pattern.
// index: -> là vị trí bắt đầu của kết quả tìm thấy
// input: -> là chuỗi truyền vào
```
Chúng ta sẽ sử dụng phương thức `test ()` ở trong bài viết này.
## Simple Regex Patterns
Đây là mẫu cơ bản nhất, chỉ đơn giản là khớp văn bản chữ với chuỗi kiểm tra
```javascript
var regex = /hello/;

console.log(regex.test('hello world'));
// true
```

## Special Characters
Bây giờ, hãy khai thác toàn bộ sức mạnh của regex khi xử lý các trường hợp phức tạp hơn nhé
### 1. Flags
Regex có 5 tùy chọn flags, hãy bắt đầu với 2 flag sau:
```
g — Tìm kiếm toàn cầu, không trả về chuỗi matched
i — Tìm kiếm không phân biệt chữ hoa, chữ thường
```
#### Bỏ qua chữ hoa trong khi so sánh

Thông thường, regex tìm kiếm sự khớp theo nghĩa đen của các chuỗi nhưng đôi khi bạn muốn khớp các chữ hoa chữ thường khác nhau, khi đó bạn hãy sử dụng `flag i` quy chúng về cùng 1 kiểu và không phân biệt hoa thường.

#### Tìm nhiều hơn một kết quả trả về
Thường thì bạn sẽ nhận được 1 kết quả trích xuất từ chuỗi đưa vào theo pattern. Để tìm kiếm nhiều hơn , hãy sử `flag g`. 
Bạn hãy thử xem ví dụ sau:
```javascript
var regexGlobal = /abc/g;
console.log(regexGlobal.test('abc abc'));
// return true

var regexInsensitive = /abc/i;
console.log(regexInsensitive.test('Abc'));
// returns true

var regexGlobal = new RegExp('abc','g')
console.log(regexGlobal.test('abc abc'));

var regexInsensitive = new RegExp('abc','i')
console.log(regexInsensitive.test('Abc'));
```

### 2. Character groups
**Character set [xyz]** - là một cách để khớp các ký tự khác nhau ở một vị trí duy nhất. Nó sẽ khớp với bất kỳ ký tự đơn nào trong chuỗi từ các ký tự có bên trong dấu ngoặc.
```javascript
var regex = /[bt]ear/;

console.log(regex.test('tear')); // returns true
console.log(regex.test('bear')); // return true
```
**Negated character set [^xyz]** - Nó khớp với bất kỳ thứ gì không được đặt trong dấu ngoặc.
```javascript
var regex = /[^bt]ear/;

console.log(regex.test('tear')); // returns false
console.log(regex.test('fear')); // return true
```
**Ranges [a-z]** - khớp tất cả các chữ cái trong bảng chữ cái ở một vị trí duy nhất
Ngoài ra bạn có thể dùng **[0-9]** hoặc **[A-Z]**.
```javascript
var regex = /[a-z]ear/;

console.log(regex.test('fear')); // returns true
console.log(regex.test('tear')); // returns true
```
### 3. Meta-characters
**Meta-characters** - là các ký tự có ý nghĩa đặc biệt
* **\d** - Khớp với bất kỳ ký tự `chữ số` nào (giống như `[0-9]`).
* **\w** - Khớp với bất kỳ ký tự `từ` nào - chữ cái, chữ số và dấu gạch.(giống như  `[a-zA-Z0–9_]`)
* **\s** - Khớp một ký tự `khoảng trắng` (`spaces`, `tabs`).
* **\t** - Chỉ khớp với một ký tự `tab`.
* **\b** - Find a match at beginning or ending of a word. Also known as word boundary.
* **.** - Khớp với bất kỳ ký tự nào `ngoại trừ dòng mới`.
* **\D** - Khớp với bất kỳ ký tự nào `không phải số` (giống như  `[^0–9]`).
* **\W** - Khớp với bất kỳ ký tự nào `không phải từ` (giống như `[^a-zA-Z0–9_]`).
* **\S** - Khớp một ký tự không có khoảng trắng.

### 4. Quantifiers
**Quantifiers** - là các ký hiệu có ý nghĩa đặc biệt trong regex
* **+** - So khớp biểu thức trước đó `1` hoặc `nhiều lần`.
```javascript
 var regex = /\d+/;
 
console.log(regex.test('8')); // true
console.log(regex.test('88899')); // true
console.log(regex.test('8888845')); // true
 ```
*  **\*** - Khớp với biểu thức trước `0` hoặc `nhiều lần`.
```javascript
var regex = /go*d/;

console.log(regex.test('gd')); // true - xuất hiện 0 lần
console.log(regex.test('god')); // true - xuất hiện 1 lần
console.log(regex.test('good')); // true - xuất hiện 2 lần
console.log(regex.test('goood')); // true
```
* **?** - Khớp với biểu thức trước `0` hoặc `1` lần, đó là mẫu trước đó là tùy chọn
```javascript
var regex = /goo?d/;

console.log(regex.test('god')); // true - xuất hiện 0 lần
console.log(regex.test('good')); // true - xuất hiện 1 lần
console.log(regex.test('goood')); // false - xuất hiện 2 lần
```
* **^** - Đối sánh với phần đầu của chuỗi, regex theo sau nó phải ở đầu chuỗi kiểm tra. tức là dấu mũ - `^` khớp với phần bắt đầu của chuỗi.
```javascript
var regex = /^g/;

console.log(regex.test('good')); // true
console.log(regex.test('bad')); // false
console.log(regex.test('tag')); // false
```
* **$** - Đối sánh với phần cuối của chuỗi, đó là regex đứng trước nó phải ở cuối chuỗi kiểm tra. Ký hiệu đô la - ` $` khớp với phần cuối của chuỗi.
```javascript
var regex = /.com$/;

console.log(regex.test('test@testmail.com')); // true
console.log(regex.test('test@testmail')); // false
```
* **{N}** - Đối sánh chính xác N lần xuất hiện của regex trước đó.
```javascript
var regex = /go{2}d/;

console.log(regex.test('good')); // true
console.log(regex.test('god')); // false
```
* **{N,}** - Khớp với ít nhất N lần xuất hiện của regex trước đó.
```javascript
var regex = /go{2,}d/;

console.log(regex.test('good')); // true
console.log(regex.test('goood')); // true
console.log(regex.test('gooood')); // true
```
* **{N, M}** - Matches ít nhất N lần xuất hiện và nhiều nhất M lần xuất hiện của regex trước (trong đó M> N).
```javascript
var regex = /go{1,2}d/;

console.log(regex.test('god')); // true
console.log(regex.test('good')); // true
console.log(regex.test('goood')); // false
```
* **Alternation X|Y** Matches với X hoặc Y
```javascript
var regex = /(green|red) apple/;

console.log(regex.test('green apple')); // true
console.log(regex.test('red apple')); // true
console.log(regex.test('blue apple')); // false
```
> Nếu bạn muốn sử dụng bất kỳ ký tự đặc biệt nào làm một phần của biểu thức, chẳng hạn như bạn muốn so khớp chữ `+` hoặc`.`, Thì bạn phải thêm vào trước chúng dấu gạch ngược - `\`

```javascript
var regex = /a+b/;  // Sẽ không hoạt động
var regex = /a\+b/; // Good

console.log(regex.test('a+b')); // true
```
## Advanced
**(x)** - Matches x và ghi nhớ kết quả. Cách này cũng được sử dụng để tạo các biểu thức phụ trong một biểu thức chính quy
```javascript
var regex = /(foo)bar\1/;

console.log(regex.test('foobarfoo')); // true
console.log(regex.test('foobar')); // false
```
`\1`- nhớ lại kết regex và sử dụng matches đó từ biểu thức con đầu tiên trong dấu ngoặc đơn

**(?: x)** - Matches x và không ghi nhớ kết quả.
```javascript
var regex = /(?:foo)bar\1/;

console.log(regex.test('foobarfoo')); // false
console.log(regex.test('foobar')); // false
console.log(regex.test('foobar\1')); // true
```
`\1` sẽ không hoạt động, nó sẽ khớp với chữ `\1`

**x (? = y)** - Chỉ so khớp x khi x theo sau y
```javascript
var regex = /Red(?=Apple)/;

console.log(regex.test('RedApple')); // true
```
Chuỗi đưa vào chỉ đúng khi khi có chứa `Red` theo sau là `Apple`.
## Practicing Regex
Hãy  thử thực hành một số khái niệm mà chúng ta đã học ở trên.

![](https://images.viblo.asia/795f4097-057b-4486-94f9-1ea667055310.jpeg)


**Kiểm tra 1 chuỗi đưa vào có phải là 10 chữ số hay không?**
```javascript
var regex = /^\d{10}$/;

console.log(regex.test('9995484545')); // true
```
Hãy thử chia nhỏ chuỗi regex ra xem nha:

1. Để bắt đầu và kết thúc một chuỗi ta sử dụng quantifiers `^` và `$`. Dấu mũ `^` khớp với phần bắt đầu của chuỗi đầu vào, trong khi ký hiệu đô la `$` khớp với phần cuối. Vì vậy, nó sẽ không khớp nếu chuỗi chứa nhiều hơn 10 chữ số.
2. `\d` khớp với bất kỳ ký tự chữ số nào.
3. `{10}` khớp với biểu thức trước đó, trong trường hợp này là `\d` chính xác 10 lần. Vì vậy, nếu chuỗi kiểm tra chứa ít hơn hoặc nhiều hơn 10 chữ số, kết quả sẽ là `false`.

**Kiểm tra chuỗi đưa vào có khớp với định dạng ngày sau DD-MM-YYYY hoặc DD-MM-YY**
```javascript
var regex = /^(\d{1,2}-){2}\d{2}(\d{2})?$/;

console.log(regex.test('01-01-1990')); // true
console.log(regex.test('01-01-90')); // true
console.log(regex.test('01-01-190')); // false
```
Hãy chia nhỏ điều đó và xem điều gì đang diễn ra ở đây.
1. Một lần nữa, bao toàn bộ chuỗi regex bên trong `^` và `$`, để khớp kéo dài toàn bộ chuỗi
2. `(` để bắt đầu của biểu thức con đầu tiên
3. `\d{1,2}` khớp với ít nhất 1 chữ số và nhiều nhất 2 chữ số
4. `-` khớp với ký tự gạch nối theo nghĩa đen.
5. `)` kết thúc biểu thức con đầu tiên.
6. `{2}` so khớp biểu thức con đầu tiên chính xác hai lần.
7. `(\d{2})?` khớp đúng hai chữ số. Nhưng nó là tùy chọn, vì vậy một trong hai năm chứa 2 chữ số hoặc 4 chữ số.

**Common Regex**

**Telephone** phải là số điện thoại hợp lệ (10 chữ số) : `/^\d{10}$/`

**username** phải là chữ và số và chứa 5-11 ký tự (không phân biệt chữ hoa chữ thường): `/^[a-z\d]{5,11}$/i`

**Password** phải là chữ và số (@, _, - cũng được phép) và dài 8–20 ký tự: `/^[\w@-]{8,20}$/`

**slug** chỉ được chứa các chữ cái thường, số và dấu gạch nối và dài 8–20 ký tự: `/^[a-z\d-]{8,20}$/`