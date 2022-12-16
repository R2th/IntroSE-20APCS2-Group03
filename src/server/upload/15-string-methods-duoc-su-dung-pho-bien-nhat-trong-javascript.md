## String trong JS là gì?
Cũng giống như hầu hết các ngôn ngữ lập trình khác, JS có một phương tiện để đại diện cho văn bản bằng các chuỗi(strings). Mô tả cơ bản chỉ là, strings là văn bản. Mô tả theo kỹ thuật thì chuỗi là một tham chiếu tập hợp các ký tự unicode được sắp xếp theo một thứ tự nhất định. Mỗi chuỗi có độ dài, và nó tương ứng với số ký tự 16 bit mà nó chứa. Cũng giống như Mảng trong JavaScript, strings sử dụng zero base indexing. Điều này có nghĩa là ký tự đầu tiên trong một chuỗi có index bắt đầu từ số không. Mỗi chuỗi có một thuộc tính chiều dài mà bạn có thể dễ dàng truy vấn để tìm ra độ dài chính xác của bất kỳ chuỗi xác định nào.

Chuỗi trống có độ dài bằng 0. Các chuỗi được biểu thị bằng JavaScript sử dụng **string literals**. Điều này có nghĩa là bạn gõ một văn bản trong cặp nhaý đơn hoặc nháy kép là bạn đang định nghĩa một string. Bạn có thể sử dụng một trong hai quy ước, hoặc có thể kết hợp cả hai như ví dụ dưới đây:
```
"" // An empty string
'google is for searching'
"3.14"
'name="someform"'
"Don't even think about it!"
"This is a string\n that has two lines"
"twitter is for tweeting"
```
Lưu ý rằng nếu một chuỗi được phân tách bằng dấu ngoặc kép, bạn có thể sử dụng dấu nháy đơn bên trong chuỗi. Điều ngược lại là đúng nếu bạn sử dụng với dấu nháy đơn. Trong trường hợp đó, bạn có thể chứa dấu ngoặc kép bên trong chuỗi. Tất nhiên, bạn cũng có thể sử dụng ký tự thoát `\n` nếu bạn cần xuống dòng trong chuỗi strings.
## 01. String.prototype.replace()
**string.replace() description**

Khi bạn muốn thực hiện tìm kiếm và thay thế trên một chuỗi trong JavaScript, hàm replace () sẽ giúp bạn làm điều đó. Hàm này sẽ tìm kiếm và trả về một ký tự hoặc một chuỗi phù hợp với điều kiện cho trước hoặc một regular expression. Sau đó nó thay thế những chuỗi phù hợp đó bằng một chuỗi nhất định. Bạn có thể dùng ký tự **/g** để thay thế tất cả các kết quả phù hợp nếu bạn thích khi sử dụng regular expression thay vì một chuỗi đơn giản. Nếu **/g** không được chỉ định, chỉ có kết quả phù hợp đầu tiên sẽ được thay thế.

**replace() returns**
Hàm replace() trả về một chuỗi mới với các kết quả trùng khớp của chuỗi hoặc biểu thức chính quy được thay thế. Chuỗi ban đầu không thay đổi, chỉ có giá trị trả về được thay đổi.

**ví dụ về string.replace()**
Ví dụ về hàm replace () này sẽ tìm kiếm trong chuỗi ban đầu và thay thế các chuỗi javascript bằng JavaScript. Chúng tôi sử dụng cả flags **g** và **i** trong ví dụ này. **g** được dùng để tìm kiếm và thay thế toàn bộ, tức là mọi ký tự được tìm thấy sẽ được thay thế. Nếu không sử dụng **g** thì chỉ có ký tự đầu tiên được tìm thấy là được thay thế. **i** sẽ không phân biệt chữ hoa hay chữ thường mà sẽ thay thế hết.
```javascript
var oldstring = 'Programming with string in javascript is fun! ' +
    'Old javascript string, not the same as new javascript string';
var newstring = oldstring.replace(/javascript/gi, 'JavaScript');
 
console.log(oldstring);
// Programming with string in javascript is fun! Old javascript string, not the same as new javascript string
 
console.log(newstring);
// Programming with string in JavaScript is fun! Old JavaScript string, not the same as new JavaScript string
```

Ở đây chúng ta sẽ sử dụng replace () để tìm kiếm các ký tự AAPL trong một chuỗi văn bản và thay thế chúng bằng văn bản của Apple. Lưu ý rằng ví dụ này hoạt động vì chúng tôi sử dụng **i** để không phân biệt chữ hoa chữ thường.
```javascript
var oldstring = 'AAPL is a great company with awesome products';
var newstring = oldstring.replace(/aapl/i, 'Apple');
console.log(newstring);
//  Apple is a great company with awesome products
```

Khi bạn có các phần của cụm từ thông dụng được bao quanh bởi dấu ngoặc đơn, bạn có thể truy cập vào kết hợp chuỗi con đó bằng toán tử `$n`. Hãy xem cách chúng tôi làm điều này. Trong ví dụ sau, chúng tôi có một cụm từ thông dụng phù hợp với bốn ký tự chữ thường theo sau là một dấu cách, bốn lần liên tiếp. Mỗi bộ sưu tập gồm bốn ký tự được bao quanh bởi dấu ngoặc đơn, vì vậy bây giờ chúng ta có quyền truy cập vào các vị trí số 1, 2, 3, 4. Trong ví dụ thứ hai, chúng tôi chỉ sử dụng vị trí `$4` và `$3` để hiển thị kết quả tìm kiếm.

```javascript
var regularexp = /([a-z]{4})\s([a-z]{4})\s([a-z]{4})\s([a-z]{4})\s/;
var oldstring = 'aapl goog msft amzn ';
var newstring = oldstring.replace(regularexp, '$4, $3, $2, $1');
console.log(newstring);
//  amzn, msft, goog, aapl
 
var regularexp = /([a-z]{4})\s([a-z]{4})\s([a-z]{4})\s([a-z]{4})\s/;
var oldstring = 'aapl goog msft amzn ';
var newstring = oldstring.replace(regularexp, '$4, $3, $4, $3');
console.log(newstring);
//  amzn, msft, amzn, msft
```
**Các mẫu thay thế đặc biệt**

Có một vài ký tự mẫu thay thế đặc biệt mà bạn có thể nhúng vào trong chuỗi thay thế. Tham số thứ hai cho hàm replace() là chuỗi thay thế. Đầu tiên chúng ta sẽ xem xét toán tử `$&`. Biểu thức này đơn giản là chèn chuỗi con phù hợp với mẫu biểu thức chính quy được cung cấp.
```javascript
var pattern = /[aA-zZ]*!/g;
var oldstring = 'Special characters can be used in the replacement string!  Money!';
var newstring = oldstring.replace(pattern, '$& $&');
console.log(newstring);
//  Special characters can be used in the replacement string! string!  Money! Money!
```
Thay thế ký tự đặc biệt tiếp theo là toán tử `$$`. Điều này là để chèn một ký hiệu đô la vào chuỗi thay thế. Hãy thay thế Money! với `$` trong ví dụ dưới đây.
```javascript
var pattern = /M[aA-zZ]*!/g;
var oldstring = 'Special characters can be used in the replacement string!  Money!';
var newstring = oldstring.replace(pattern, '$$');
console.log(newstring);
//  Special characters can be used in the replacement string!  $
```

Bạn cũng có thể truy cập vào một phần của chuỗi trước chuỗi con phù hợp. Đối với điều này, chúng tôi sẽ sử dụng toán tử `$ backtick`. Chúng ta sẽ tìm thấy sự phù hợp có thể và thay thế nó bằng bất kỳ văn bản nào xuất hiện trước nó.
```javascript
var pattern = /can/g;
var oldstring = 'Special characters can be used in the replacement string!  Money!';
var newstring = oldstring.replace(pattern, '$`');
console.log(newstring);
// Special characters Special characters  be used in the replacement string!  Money!
```
Bây giờ chúng ta sẽ sử dụng `$'`để chèn văn bản xuất hiện sau chuỗi con phù hợp. Chúng tôi sẽ tìm từ thích hợp và thay thế bằng bất kỳ văn bản nào xuất hiện sau đó.
```javascript
var pattern = /into/;
var oldstring = 'You are turning into a pro with this replace function!';
var newstring = oldstring.replace(pattern, "$'");
console.log(newstring);
// You are turning  a pro with this replace function! a pro with this replace function!
```

| Ký tự | Tác dụng |
| -------- | -------- |
| `$$`    | Chèn một ký hiệu đô la vào chuỗi thay thế |
| `$&`    | Chèn chuỗi con phù hợp trong chuỗi thay thế |
| `$ backtick`  | Đưa một phần của chuỗi xuất hiện trước chuỗi kết hợp chuỗi con và chèn nó vào chuỗi thay thế |
| `$'`    | Lấy một phần của chuỗi xuất hiện sau chuỗi kết hợp chuỗi con và chèn nó vào chuỗi thay thế |
| `$n`    | Toán tử này tìm vị trí index của kết quả và chèn đối số cụ thể trong chuỗi thay thế miễn là đối số đầu tiên là biểu thức chính quy |

**Sử dụng function() làm đối số thứ 2 của hàm replace()**

Như chúng ta đã biết, đối số thứ hai của hàm replace() thường là chuỗi thay thế. Tuy nhiên, bạn có thể chuyển một hàm làm tham số thứ hai. Trong trường hợp này, kết hợp với các điều kiện xảy ra và trả về một chuỗi thay thế hoàn chỉnh.
```javascript
var oldstring = 'AAPL GOOG and MSFT are really big technology companies.';
 
var newstring = oldstring.replace(/[A-Z]{4}/g, tickerToName);
 
function tickerToName(match){
    if(match === 'AAPL'){
        return 'Apple';
    } else if (match === 'GOOG'){
        return 'Google';
    } else if (match === 'MSFT') {
        return 'Microsoft';
    }
}
 
console.log(newstring);
//  Apple Google and Microsoft are really big technology companies.
```
## 02. String.prototype.toLowerCase()
Hàm toLowerCase () thực hiện chính xác với cái tên gọi của chính mình. Nó đơn giản trả về một chuỗi mới đã được chuyển đổi thành tất cả các chữ thường từ chuỗi cũ. Chuỗi gốc không bị thay đổi.
Đây là một ví dụ đơn giản.
```javascript
var oldstring = 'HEY SHORTY, ITS YOUR BIRTHDAY!';
 
var newstring = oldstring.toLowerCase();
 
console.log(oldstring);
//  HEY SHORTY, ITS YOUR BIRTHDAY!
 
console.log(newstring);
//  hey shorty, its your birthday!
```
Ví dụ này có một chút nâng cao hơn khi kết hợp với replace():

```javascript
var oldstring = 'The Most Popular JavaScript String Functions';
 
var pattern = /\s/g;
 
function sluggify(str) {
    return str.replace(pattern, '-').toLowerCase();
}
 
var newstring = sluggify(oldstring);
 
console.log(oldstring);
//  The Most Popular JavaScript String Functions
 
console.log(newstring);
//  the-most-popular-javascript-string-functions
```
## 03. String.prototype.trim()
Hàm trim () loại bỏ bất kỳ ký tự khoảng trống nào từ cả đầu và cuối của một chuỗi cụ thể.
```javascript
var oldstring = ' \r   \n   the string be with you   \v \f     ';
 
var newstring = oldstring.trim();
 
console.log(oldstring);
//   \r   \n   the string be with you   \v \f     
 
console.log(newstring);
// the string be with you 
```
```javascript
var stringone = '     abc     ';
var stringtwo = '     def     ';
 
var newstring = stringone.trim() + stringtwo.trim();
 
console.log(newstring);
//  abcdef
```
## 04. String.prototype.charAt()
Hàm charAt () là viết tắt của character at. Bạn có thể tìm thấy một ký tự đã cho trong chuỗi khi bạn sử dụng chức năng này. Nó gần giống như đọc, "Hãy cho tôi biết ký tự ở vị trí x". Để hàm charAt () thực hiện công việc của nó, bạn phải cung cấp tham số chỉ mục từ 0 đến ít hơn độ dài của chuỗi một giá trị. Nếu chỉ mục được cung cấp dưới dạng tham số không nằm trong khoảng từ 0 đến string.length - 1, thì hàm này trả về một chuỗi rỗng.
Đại khái nó hoạt động ngược lại với hàm indexOf(). Với charAt (), bạn cung cấp một giá trị index, và charAt () cho bạn biết ký tự tại vị trí đó. Với indexOf (), bạn cung cấp ký tự và indexOf () cho bạn biết vị trí chỉ mục của nó trong chuỗi string.
```javascript
var lightsaber = 'Super Powerful Slicing Ability';
 
console.log(lightsaber.charAt(0));
// S
 
console.log(lightsaber.charAt(lightsaber.length - 1));
// y
```
## 05. String.prototype.charCodeAt()
Hàm charCodeAt () hoạt động gần giống như charAt () ngoại trừ thay vì trả về ký tự ở vị trí chỉ mục cụ thể, nó trả về vị trí unicode của ký tự tại vị trí đã cho trong chuỗi.

Ở đây chúng ta sẽ sử dụng bảng chữ cái dưới dạng một chuỗi và tìm hiểu vị trí unicode liên kết với mỗi chữ cái bằng cách sử dụng charCodeAt ().
```javascript
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
 
console.log(alphabet.charCodeAt(0)); // 97
console.log(alphabet.charCodeAt(1)); // 98
console.log(alphabet.charCodeAt(2)); // 99
console.log(alphabet.charCodeAt(3)); // 100
console.log(alphabet.charCodeAt(4)); // 101
console.log(alphabet.charCodeAt(5)); // 102
console.log(alphabet.charCodeAt(6)); // 103
console.log(alphabet.charCodeAt(7)); // 104
console.log(alphabet.charCodeAt(8)); // 105
console.log(alphabet.charCodeAt(9)); // 106
console.log(alphabet.charCodeAt(10)); // 107
console.log(alphabet.charCodeAt(11)); // 108
console.log(alphabet.charCodeAt(12)); // 109
console.log(alphabet.charCodeAt(13)); // 110
console.log(alphabet.charCodeAt(14)); // 111
console.log(alphabet.charCodeAt(15)); // 112
console.log(alphabet.charCodeAt(16)); // 113
console.log(alphabet.charCodeAt(17)); // 114
console.log(alphabet.charCodeAt(18)); // 115
console.log(alphabet.charCodeAt(19)); // 116
console.log(alphabet.charCodeAt(20)); // 117
console.log(alphabet.charCodeAt(21)); // 118
console.log(alphabet.charCodeAt(22)); // 119
console.log(alphabet.charCodeAt(23)); // 120
console.log(alphabet.charCodeAt(24)); // 121
console.log(alphabet.charCodeAt(25)); // 122
```
## 06. String.prototype.toUpperCase()
Cũng giống như tên của nó, hàm toUpperCase () biến một chuỗi thành một phiên bản tất cả chữ hoa của chính nó. Lưu ý rằng chuỗi gốc không bị ảnh hưởng, trong khi chuỗi trả về toàn bộ là cữ hoa.
```javascript
var light = 'lightsabers';
var sabers = light.toUpperCase();
 
console.log(light);
// lightsabers
 
console.log(sabers);
// LIGHTSABERS
```
## 07. String.prototype.match()
Hàm match () dùng để sử dụng các mẫu biểu thức chính quy. Để match () hoạt động, bạn phải truyền cho nó một tham số là một biểu thức chính quy. match () sau đó sẽ sử dụng biểu mẫu truyền vào để tìm tất cả các kết quả phù hợp trong chuỗi đã cho, sau đó trả về một mảng của bất kỳ kết quả phù hợp nào. Nếu không có kết quả phù hợp dựa trên biểu thức chính quy bạn truyền vào thì match() sẽ trả về giá trị null.
```javascript
var numbersinstring = '50 plus 50 equals 100!'
var result = numbersinstring.match(/\d+/g);
 
console.log(result);
//  ["50", "50", "100"]
```
```javascript
var regExPattern = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Find great tutorials at  https://vegibit.com/javascript-string-functions/";
 
var result = text.match(regExPattern);
 
var fullurl = result[0];
var protocol = result[1];
var host = result[2];
var path = result[3];
 
console.log(fullurl);
// https://vegibit.com/javascript-string-functions/
 
console.log(protocol);
// http
 
console.log(host);
// vegibit.com
 
console.log(path);
// javascript-string-functions/
```
## 08. String.prototype.concat()
Trong JavaScript, bạn có thể sử dụng hàm concat () để nối các chuỗi lại với nhau. Bạn cũng có thể sử dụng toán tử +, điều này cũng rất dễ dàng. Bạn có thể truyền nhiều chuỗi như bạn thích cho hàm concat (). Hãy xem một vài ví dụ về string.concat () đang hoạt động.
```javascript
var firstString = 'JavaScript is ';
var newString = firstString.concat('awesome, ', 'fun, ', 'and useful!');
 
console.log(newString);
//  JavaScript is awesome, fun, and useful!
```
```javascript
var one = 'abcdefg';
var two = 'hijklmnop';
var three = 'qrstuv';
var four = 'wxy and z';
 
var five = one.concat(two, three, four);
 
console.log(five);
//  abcdefghijklmnopqrstuvwxy and z
```
## 09. String.prototype.substr()
Hàm substr () sẽ tìm kiếm chính xác một chuỗi ký tự cụ thể từ chuỗi ban đầu dựa trên các tham số truyền vào ký tự bắt đầu và chiều dài ký tự, sau đó trả về chính xác chuỗi ký tự được tìm thấy. Tham số bắt đầu là nơi tìm kiếm chuỗi con bắt đầu và tham số chiều dài chỉ định số ký tự cần trích xuất. Nếu tham số chiều dài không được cung cấp, tất cả các ký tự từ vị trí bắt đầu sẽ được trích xuất. Nếu độ dài bằng 0 hoặc giá trị âm, thì substr () sẽ trả về một chuỗi rỗng. Ngoài substr (), bạn cũng có thể sử dụng các hàm substring () và slice () mà chúng ta cũng đề cập sau.
```javascript
var supercali = 'supercalifragilisticexpialidocious';
 
console.log(supercali.substr(0, 5));
//  super
 
console.log(supercali.substr(5, 4))
//  cali
 
console.log(supercali.substr(9, 11))
//  fragilistic
 
console.log(supercali.substr(20));
//  expialidocious
 
console.log(supercali.substr(0));
//  supercalifragilisticexpialidocious
```
```javascript
var stringtut = 'Epic JavaScript String Tutorial';
var tuts = stringtut.substr(0, 15);
var plus = stringtut.substr(16, 15);
 
console.log(tuts);
//  Epic JavaScript
 
console.log(plus);
//  String Tutorial
```
## 10. String.prototype.split()

Hàm split () là hàm chuyển một chuỗi thành một mảng các ký tự dựa trên dấu phân cách được cung cấp. Bạn có thể tùy chọn giới hạn số lượng phân tách được tìm thấy bằng cách truyền giá trị số nguyên làm đối số thứ hai cho hàm split (). Đây là một chức năng rất hữu ích.

Trong ví dụ sau đây, chúng ta có tất cả các hàm chuỗi JavaScript được liên kết với nhau bằng dấu chấm. Sử dụng string.split (), chúng ta sẽ biến một chuỗi đó thành một mảng, với mỗi tên hàm chiếm một vị trí trong mảng.

```javascript
var oneBigString = 'fromCharCode.fromCodePoint.anchor.big.blink.bold.charAt.charCodeAt.codePointAt.concat.endsWith.' +
    'fixed.fontcolor.fontsize.includes.indexOf.italics.lastIndexOf.link.localeCompare.match.normalize.quote.repeat.' +
    'replace.search.slice.small.split.startsWith.strike.sub.substr.substring.sup.toLocaleLowerCase.toLocaleUpperCase.' +
    'toLowerCase.toSource.toString.toUpperCase.trim.trimLeft.trimRight.valueOf.raw';
 
var newArray = oneBigString.split('.');
 
console.log(newArray);
 
//  ["fromCharCode", "fromCodePoint", "anchor", "big", "blink", "bold", "charAt", "charCodeAt", "codePointAt", 
// "concat", "endsWith", "fixed", "fontcolor", "fontsize", "includes", "indexOf", "italics", "lastIndexOf", "link",
// "localeCompare", "match", "normalize", "quote", "repeat", "replace", "search", "slice", "small", "split", "startsWith",
// "strike", "sub", "substr", "substring", "sup", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toSource", 
// "toString", "toUpperCase", "trim", "trimLeft", "trimRight", "valueOf", "raw"]
```
## 11. String.prototype.fromCharCode()
Hàm fromCharCode () được sử dụng để tạo một chuỗi từ mã hóa Unicode. Bạn chuyển một hoặc nhiều số nguyên cho hàm fromCharCode() làm tham số chỉ định mã hóa Unicode của các ký tự trong chuỗi được tạo.

```javascript
var secretcode = String.fromCharCode(69, 118, 101, 114, 121, 116, 104, 105, 110, 103, 32, 105, 115, 32, 65, 87, 69, 83, 79, 77, 69);
 
console.log(secretcode);
//  Everything is AWESOME
```
## 12. String.prototype.substring()
Hàm substring () có hai tham số, đó là indexStart và indexEnd. Tham số indexStart là bắt buộc và chỉ định vị trí của nơi bắt đầu trích xuất các ký tự. indexEnd là tùy chọn và chỉ định vị trí mà việc trích xuất các ký tự sẽ kết thúc. Nếu tham số indexEnd không được cung cấp, thì tất cả các ký tự từ vị trí bắt đầu cho đến khi kết thúc chuỗi được trích xuất. Một hành vi tò mò của hàm substring () là nếu giá trị của indexStart lớn hơn giá trị của indexEnd, substring() sẽ tự động hoán đổi hai đối số này!

```javascript
var supercali = 'supercalifragilisticexpialidocious';
 
console.log(supercali.substring(0, 5));
//  super
 
console.log(supercali.substring(5, 9));
//  cali
 
console.log(supercali.substring(9, 20));
//  fragilistic
 
console.log(supercali.substring(20));
//  expialidocious
 
console.log(supercali.substring(0));
//  supercalifragilisticexpialidocious
```
```javascript
var theForce = 'The force is strong with you because you are AWESOME';
var last8oftheForce = theForce.substring(theForce.length - 8);
console.log(last8oftheForce);
//  AWESOME
```
## 13. String.prototype.valueOf()
Hàm valueOf () là một phương thức xây dựng JavaScript trong đối tượng String và trả về giá trị nguyên thủy của một đối tượng String như một kiểu dữ liệu chuỗi. Giá trị trả về giống như bạn nhận được từ String.prototype.toString().
```javascript
var str = new String('Jumping Jack Flash');
 
console.log(str.valueOf()); 
// Jumping Jack Flash 
```
## 14. String.prototype.slice()
Hàm slice () có hai tham số cần truyền vào. **beginSlice** là tham số đầu tiên và **endSlice** là tham số thứ hai. **beginSlice** là tham số bắt buộc và chỉ định điểm bắt đầu của việc trích xuất chuỗi con. Tham số **endSlice** là tùy chọn, nó chỉ định vị trí để dừng quá trình trích xuất. Ký tự được chỉ định bởi endSlice không được bao gồm trong chuỗi con được trích xuất. Nếu bạn không cung cấp tham số endSlice, tất cả các ký tự bắt đầu từ vị trí beginSlice sẽ được trích xuất từ chuỗi gốc như một phần của chuỗi con. Chúng ta có thể thấy rằng các hàm slice (), substring () và substr () tất cả đều hoạt động theo cách rất giống nhau.
```javascript
var usForce = 'The Force Is With Us!';
var youforce = usForce.slice(0, 19);
 
console.log(youforce); 
//  The Force Is With U
```
## 15. String.prototype.indexOf()
Hàm indexOf () rất hữu ích, đặc biệt khi làm việc với một chuỗi con trong JavaScript. Hàm này trả về vị trí của lần xuất hiện đầu tiên của một giá trị đã cho trong một chuỗi. Nếu giá trị đó không được tìm thấy trong chuỗi, thì indexOf () sẽ trả về -1.

```javascript
var email = 'gmail@google.com';
var index = email.indexOf('@');
console.log(index);
```
## Tài liệu tham khảo
https://vegibit.com/javascript-string-functions/