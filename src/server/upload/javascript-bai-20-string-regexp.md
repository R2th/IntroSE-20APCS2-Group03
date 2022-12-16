Bài viết này là một trong số những bài thuộc chỉ mục bổ sung của Sub-Series JavaScript. Ở đây chúng ta sẽ điểm qua một vài phương thức thường sử dụng để làm việc với các chuỗi ký tự, và làm quen với một công cụ mới giúp chúng ta nhận dạng các chuỗi ký tự cần thao tác xử lý.

## Biểu thị các ký tự đặc biệt trong một chuỗi String

Các ký tự đặc biệt được biểu thị trong chuỗi bằng cách mở đầu với ký hiệu `\`.

```escape.js
console.log('Dấu nháy đơn \' trong chuỗi');
// Dấu nháy đơn ' trong chuỗi

console.log("Dấu nháy kép \" trong chuỗi");
// Dấu nháy kép " trong chuỗi

console.log('Gạch nghiêng lùi lại \\ đi');
// Gạch nghiêng lùi lại \ đi

console.log('Xuống dòng\nmới');
// Xuống dòng
// mới
```

## Chuyển đổi một giá trị bất kỳ sang kiểu chuỗi String

Trong những trường hợp chúng ta truyền một giá trị thuộc kiểu khác vào thao tác xử lý yêu cầu một chuỗi, giá trị đó sẽ được JavaScript tự động chuyển đổi bằng phương thức `.toString()` của kiểu giá trị tương ứng. Trong trường hợp các kiểu giá trị đặc biệt không có phương thức `.toString()` thì sẽ được chuyển đổi bằng hàm `String()`.

```string.js
var thing = { age: 1001 };

// thing.toString() -> '[object object]'
console.log('value | ' + thing);
// 'value | [object Object]'

   /* Ghi đè phương thức .toString() kế thừa của class Object */

thing.toString = function() {
   return '{ age: ' + this.age + ' }';
};

// thing.toString() -> '{ age: 1001 }'
console.log('value | ' + thing);
// 'value | { age: 1001 }'

   /* null & undefined không thể sử dụng phương thức .toString() */

// String(null) -> 'null'
console.log('value | ' + null);
// 'value | null'

// String(undefined) -> 'undefined'
console.log('value | ' + undefined);
// 'value | undefined'
```

## Dạng mẫu của chuỗi String Template

Một `string template` được khoanh vùng bởi một cặp dấu nháy ngược `backstick`. Các `string template` sẽ duy trì sự hiện diện của các ký tự khoảng trống thay vì lược giản giống như các chuỗi thông thường và chúng ta có thể viết chuỗi trên nhiều dòng code.

```template.js
var template = `
   code in console
   remains spaces
`;
console.log(template);
//   code in console
//   remains spaces
```

Bên cạnh đó thì các `string template` cho phép chúng ta truyền vào các giá trị nội dung là các biến hoặc các biểu thức tính toán, mà không cần viết tách rời các chuỗi ở dạng ghép nối bằng phép `+`.

```template.js
var name = 'sky';
var age  = 1001;
var message = `Thing is ${name}, and time is ${age - 1 + 1} years.`;
console.log(message);
// 'Thing is sky, and time is 1001 years.'
```

Các `string template` còn được sử dụng với các hàm theo cách viết khá đặc biệt - đó là không sử dụng các dấu ngoặc đơn khi truyền vào hàm. Lúc này hàm được gọi sẽ nhận được tham số đầu tiên là mảng các chuỗi con, và các tham số tiếp theo lần lượt là các biến đặt trong `string template`. Các hàm được thiết kế với mục đích sử dụng với `string template` như thế này thường được gọi tên là các hàm gắn nhãn `tagged function`.

```tagged.js
var name = 'sky';
var age  = 1001;

const printTags = function(subStringArray, first, second) {
   console.log(subStringArray);
   console.log(`${first} , ${second}`);
}; // printTags

printTags`Thing is ${name}, and time is ${age} years.`;

// ['Thing is ', ', and time is ', ' years.']
// 'sky, 1001'
```

## Một số phương thức phổ biến của String

- [string.charAt(index)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) - lấy ra ký ở vị trí `index` trong chuỗi `string`.
- [string.charCodeAt(index)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt) - lấy ra mã ký tự ở vị trí `index` trong chuỗi `string`.

```char.js
var text = 'The quick brown fox jumps over the lazy dog.';
console.log( text.charAt(10) );   // b
console.log( text.charCodeAt(10) );   // 98
```

[string1.concat(string2)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat) - nối 2 chuỗi `str1` và `str2`, trả về kết quả là một chuỗi mới.

```concat.js
var str1 = 'brown ';
var str2 = 'fox';
console.log( str1.concat(str2) );
// 'brown fox'
```

[string.slice(start, end)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) - tách lấy chuỗi con từ vị trí `start` đến vị trí `end`.

```slice.js
var text = 'The quick brown fox jumps over the lazy dog.';
console.log( text.slice(10, 19) );   // 'brown fox'
```

[string.split(str)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) - phân tách chuỗi `string` thành mảng các chuỗi con bởi phần phần phân tách là `str`.

```split.js
var text = 'The quick brown fox jumps over the lazy dog.';
console.log( text.split(' ') );
// ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.']
```

- [string.startsWith(subString)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) - kiểm tra chuỗi `string` có khởi đầu bởi `subString` hay không, có phân biệt chữ viết hoa/viết thường.
- [string.endsWith(subString)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) - kiểm tra chuỗi `string` có kết thúc bởi `subString` hay không, có phân biệt chữ viết hoa/viết thường.

```with.js
var text = 'The quick brown fox jumps over the lazy dog.';
console.log( text.startsWith('the') );   // false
console.log( text.endsWith('dog.') );   // true
```

[string.includes(subString)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) - kiểm tra sự hiện diện của `subString` trong `string`, có phân biệt chữ viết hoa/viết thường.

```includes.js
var text = 'The quick brown fox jumps over the lazy dog.';
console.log( text.includes('Fox') );   // false
```

- [string.indexOf(subString) hoặc string.indexOf(subString, index)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) - tìm vị trí xuất hiện đầu tiên của `subString` trong `string` tính từ `index` (nếu có tham số `index`).
- [string.lastIndexOf(subString) hoặc string.lastIndexOf(subString, index)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf) - tìm vị trí xuất hiện cuối cùng của `subString` trong `string` tính từ `index` (nếu có tham số `index`).

```indexof.js
var text = 'The quick brown fox jumps over the lazy dog.';
console.log( text.indexOf('he', 10) );   // 32
console.log( text.lastIndexOf('he', 10) );   // 1
```

- [string.padStart(length, subStr)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) - lặp chuỗi `subStr` và nối vào trước nội dung của `string` để tạo ra chuỗi mới có độ dài `length`.
- [string.padEnd(length, subStr)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd) - lặp chuỗi `subStr` và nối vào sau nội dung của `string` để tạo ra chuỗi mới có độ dài `length`.

```pad.js
var thing = 'sky';

console.log( thing.padStart(9, '.') );
// '......sky'

console.log( thing.padEnd(9, '.') );
// 'sky......'
```

[string.repeat(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) - lặp chuỗi `string` để tạo ra chuỗi mới dài gấp `n` lần.

```repeat.js
var text = 'o';
console.log( text.repeat(9) );
// 'ooooooooo'
```

- [string.toUperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) - Tạo ra chuỗi mới từ `string` với nội dung được chuyển toàn bộ thành chữ viết hoa.
- [string.toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) - Tạo ra chuỗi mới từ `string` với nội dung được chuyển toàn bộ thành chữ viết thường.

```case.js
var text = 'The Quick Brown Fox';

console.log( text.toUpperCase() );
// 'THE QUICK BROWN FOX'

console.log( text.toLowerCase() );
// 'the quick brown fox';
```

- [string.trimStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) - xóa các khoảng trống ở đầu chuỗi `string` để tạo ra chuỗi mới.
- [string.trimEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd) - xóa các khoảng trống ở cuối chuỗi `string` để tạo ra chuỗi mới.
- [string.trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) - xóa các khoảng trống ở đầu và cuối chuỗi `string` để tạo ra chuỗi mới.

```trim.js
var text = '         sky         ';
var trimmed = text.trim();
console.log( trimmed.length );   // 3
```

## Biểu thức thường thị Regular Expression

Các biểu thức thường thị `regular expression`, viết tắt là `regex` hay `regexp` được sử dụng để biểu thị dạng thức `pattern` của chuỗi mà chúng ta muốn tìm kiếm và làm việc trong một chuỗi lớn hơn hoặc nội dung văn bản lớn. Các `regular expression` được sử dụng kèm với các phương thức của `class String` giúp chúng ta nhanh chóng thực hiện các thao tác nhận dạng, tìm kiếm, thay thế, phân tách các chuỗi, v.v...

Để tạo ra một biểu thức `regexp` chúng ta có thể sử dụng cú pháp khởi tạo trực tiếp với cú pháp ngắn giống như việc khởi tạo mảng hay `object`, hoặc khởi tạo bằng [class RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

```regexp.js
// tìm kiếm chuỗi có các chữ cái `b`
// ở giữa chữ cái `a` và `c`

// khởi tạo trực tiếp có cách viết ngắn gọn
var oneRegexp = /ab+c/;

// sử dụng class RegExp khi không biết trước pattern
var patternString = 'ab+c';
var anotherRegexp = new RegExp(patternString);

// thay thế chuỗi con tìm thấy trong một chuỗi ban đầu
console.log('aabbbbbbbccc'.replace(oneRegexp, 'B'));
// 'aBcc'
```

Các `regexp` có thể được gắn cờ `flag` biểu thị cho chế độ duyệt kiểm tra chuỗi:

- `/pattern/i` - cờ `i` hay `case-insensitive` biểu thị `pattern` sẽ được tìm kiếm trong chuỗi mà không phân biệt chữ cái viết hoa hay viết thường.
- `/pattern/m` - cờ `m` hay `multiline` biểu thị `pattern` sẽ được tìm kiếm trên nhiều dòng chứ không dừng lại ở ký tự ngắt dòng `\n` có mặt trong chuỗi.
- `/pattern/g` - cờ `g` hay `global` biểu thị `pattern` sẽ được tìm kiếm với tất cả các khả năng xuất hiện trong chuỗi chứ không chỉ kết quả đầu tiên tìm thấy.

```regexp.js
var text = 'The quick brown fox jumps over the lazy dog.';

// tìm kiếm vị trí chuỗi con 'th', không phân biệt chữ viết hoa/viết thường
var thIgnoreCase = /th/i;
console.log( text.search(thIgnoreCase) );
// 0   '..e quick brown fox jumps over the lazy dog.'

// tìm kiếm vị trí chuỗi con 'th', có phân biệt chữ viết hoa/viết thường
var thCaseSensitive = /th/;
console.log( text.search(thCaseSensitive) );
// 31   '..e lazy dog.'
```

Để học các ký hiệu quy ước trong `pattern` và có thể viết ra các `regexp` đáp ứng tiêu chí tìm kiếm linh động, bạn có thể tham khảo các liên kết dưới đây. :D

1. [Các lớp ký tự trong RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
2. [Các kiểm tra ràng buộc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
3. [Các nhóm và các dải ký tự](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges)
4. [Các ký hiệu định lượng ký tự](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers)
5. [Biểu thị các thuộc tính Unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers)

## Một số phương thức để sử dụng RegExp với String

Ngoài phương thức `string.search(regexp)` trong ví dụ ở phần trên, chúng ta còn có thể sử dụng `regexp` với `string` trong nhiều trường hợp khác nữa. Dưới đây là danh sách một số phương thức của `string` và `regexp` phổ biến trong nhóm tác vụ tìm kiếm, thay thế, và phân tách chuỗi.

- [regexp.exec(string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) - tìm kiếm một chuỗi con phù hợp. Kết quả trả về một mảng chứa các thông tin liên quan đến tác vụ tìm kiếm đang thực hiện, hoặc `null` nếu đã di chuyển đến hết chuỗi `string`.
- [regexp.test(string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) - kiểm tra để tìm ít nhất một kết quả phù hợp trong chuỗi `string`. Kết quả trả về là `true` hoặc `false`.
- [string.match(regexp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) - kiểm tra `regexp` nhận được có xuất hiện trong chuỗi `string` hay không. Kết quả trả về là một mảng chứa tất cả các chuỗi con phù hợp, hoặc `null`.
- [string.matchAll(regexp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) - tương tự với `string.match(regexp)`. Kết quả trả về là một `collection` hỗ trợ lặp hay `iterator`.
- [string.search(regexp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search) - tìm kiếm một kết quả phù hợp gần nhất. Trả về trị số chỉ vị trí của kết quả tìm được, hoặc `-1` nếu không tìm thấy.
- [string.replace(regexp, newstring)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) - thay thế kết quả tìm thấy với một chuỗi con mới `newstring`.
- [string.replaceAll(regexp, newstring)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) - thay thế tất cả các kết quả phù hợp với chuỗi con mới `newstring`.
- [string.split(regexp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) - Phân tách chuỗi `string` tại các vị trí phù hợp. Trả về một mảng chứa các chuỗi con.

```replace.js
var text = 'The quick brown fox jumps over the lazy dog.';

// thay thế tất cả các chuỗi con 'th'
// không phân biệt chữ hoa/thường
var newText = text.replaceAll(/th/ig, '...');
console.log(newText);
// '...e quick brown fox jumps over ...e lazy dog.'
```

## Kết thúc bài viết

Bài viết bổ sung và điểm danh các phương thức phổ biến làm việc với kiểu dữ liệu `string` của chúng ta tới đây là kết thúc. :D Trong bài sau, chúng ta sẽ nói sơ lược về 2 kiểu dữ liệu phổ biến được sử dụng để làm thành phần định danh cho các `object` trong môi trường chạy code JavaScript. Hẹn gặp lại bạn trong bài viết tiếp theo.

[[JavaScript] Bài 21 - Date & Symbol](https://viblo.asia/p/m68Z0BMA5kG)