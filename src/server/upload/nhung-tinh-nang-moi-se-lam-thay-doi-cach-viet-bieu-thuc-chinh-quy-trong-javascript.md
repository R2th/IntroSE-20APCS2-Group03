*Tóm tắt nhanh*: Nếu đã từng phải thao tác và xử lý các chuỗi ký tự phức tạp trong JavaScript, bạn sẽ bất ngờ về các tính năng mới trong phiên bản ES2018. Ở bài viết này, chúng ta sẽ có cái nhìn tích cực về cách mà phiên bản thứ chín của JavaScript cải thiện việc xử lý chuỗi.

Có một lý do chính đáng mà hầu hết các ngôn ngữ lập trình đều hỗ trợ biểu thức chính quy: chúng là công cụ rất hữu hiệu trong việc xử lý chuỗi văn bản. Tác vụ xử lý chuỗi ký tự yêu cầu nhiều dòng code thường có thể được thực hiện bởi chỉ một dòng biểu thức chính quy. Trong khi các hàm tích hợp của đa số các ngôn ngữ thường là đủ để thực hiện các tác vụ tìm kiếm và thay thế trên chuỗi, thì những thao tác phức tạp hơn - chẳng hạn thẩm định chuỗi đầu vào - thường yêu cầu sử dụng biểu thức chính quy.

Biểu thức chính quy là một phần của ngôn ngữ JavaScript từ phiên bản thứ ba của chuẩn ECMAScript, được ra đời năm 1999. ECMAScript 2018 (ES2018) là phiên bản thứ chín của chuẩn này và hơn thế nữa là cải thiện khả năng xử lý chuỗi văn bản của JavaScript bằng việc cung cấp bốn điểm mới sau:

- Thẩm định phía trước
- Nhóm ký tự cần bắt được định danh
- Giá trị cờ `s` (`dotAll`)
- Nhận dạng ký tự Unicode

## Thẩm định phía trước
 
Khả năng khớp một chuỗi ký tự dựa trên các giá trị đứng trước hoặc sau nó, cho phép loại bỏ những giá trị không mong muốn còn tiềm ẩn. Điều này đặc biệt quan trọng khi bạn cần xử lý một chuỗi ký tự lớn và những ký tự không mong muốn có khả năng xuất hiện cao. Thật may là hầu hết các biến thể của biểu thức chính quy cung cấp các phép thẩm định phía trước và phía sau cho mục đích kể trên.

Trước phiên bản ES2018, chỉ có thẩm định phía sau là có thể dùng được trong JavaScript. Thẩm định phía sau cho phép kiểm tra một mẫu ký tự có được theo ngay sau bởi một mẫu ký tự khác hay không.

Có hai phiên bản thẩm định phía sau: có tồn tại và không tồn tại. Cú pháp của thẩm định phía sau có tồn tại là `(?= ...)`. Ví dụ, biểu thức `/Item(?= 10)/` khớp mẫu ký tự `Item` chỉ khi theo sau nó là một khoảng trắng và ký tự số 10.

```javascript
const re = /Item(?= 10)/;

console.log(re.exec('Item'));
// → null

console.log(re.exec('Item5'));
// → null

console.log(re.exec('Item 5'));
// → null

console.log(re.exec('Item 10'));
// → ["Item", index: 0, input: "Item 10", groups: undefined]
```

Đoạn code trên sử dụng hàm `exec()` để tìm kiếm mẫu ký tự phù hợp trong một chuỗi văn bản. Nếu tìm thấy, `exec()` sẽ trả về một mảng, trong đó phần tử đầu tiên của mảng là chuỗi ký tự đã khớp. Thuộc tính `index` của mảng chỉ định vị trí chỉ mục của ký tự đã khớp và thuộc tính `input` nắm giữ toàn bộ chuỗi được dùng để tìm kiếm. Cuối cùng, nếu các nhóm ký tự cần bắt có định danh được sử dụng trong biểu thức chính quy, chúng sẽ nằm ở thuộc tính `groups`. Trong trường hợp này, `groups` có giá trị là `undefined` vì không có nhóm định danh nào được sử dụng.

Cú pháp cho thẩm định phía sau không tồn tại là `(?! ...)`. Phép thẩm định này kiểm tra một mẫu ký tự không được theo sau bởi một mẫu ký tự khác. Ví dụ, mẫu `/Red(?!head)/` khớp mẫu `Red` chỉ khi nó không được theo sau bởi mẫu `head`:

```javascript
const re = /Red(?!head)/;

console.log(re.exec('Redhead'));
// → null

console.log(re.exec('Redberry'));
// → ["Red", index: 0, input: "Redberry", groups: undefined]

console.log(re.exec('Redjay'));
// → ["Red", index: 0, input: "Redjay", groups: undefined]

console.log(re.exec('Red'));
// → ["Red", index: 0, input: "Red", groups: undefined]
```

ES2018 bổ sung thêm thẩm định phía trước vào JavaScript với cú pháp `(?<=...)`. Phép thẩm định này cho phép khớp một mẫu ký tự khi đứng trước nó là một mẫu ký tự khác.

Giả sử chúng ta cần nhận giá của sản phẩm mà không đi kèm ký tự euro (€). Với phép thẩm định mới, tác vụ này trở nên đơn giản hơn rất nhiều:
```javascript
const re = /(?<=€)\d+(\.\d*)?/;

console.log(re.exec('199'));
// → null

console.log(re.exec('$199'));
// → null

console.log(re.exec('€199'));
// → ["199", undefined, index: 1, input: "€199", groups: undefined]
```

***Chú ý***: Thẩm định sau và thẩm định trước còn được gọi là thẩm định xung quanh.

Dạng phủ định của phép thẩm định phía trước có cú pháp: `(?<!...)` và cho phép khớp một mẫu ký tự mà đứng trước nó không có mẫu ký tự được chỉ định. Ví dụ, biểu thức `/(?<!\d{3}) meters/` sẽ khớp từ `meters` nếu không có các số gồm 3 ký tự đứng trước nó:

```javascript
const re = /(?<!\d{3}) meters/;

console.log(re.exec('10 meters'));
// → [" meters", index: 2, input: "10 meters", groups: undefined]

console.log(re.exec('100 meters'));    
// → null
```

Có thể sử dụng nhiều phép thẩm định phía sau (ở dạng tồn tại hoặc phủ định) liền kề nhau để tạo nên một biểu thức phức tạp hơn. Ví dụ:

```javascript
const re = /(?<=\d{2})(?<!35) meters/;

console.log(re.exec('35 meters'));
// → null

console.log(re.exec('meters'));
// → null

console.log(re.exec('4 meters'));
// → null

console.log(re.exec('14 meters'));
// → ["meters", index: 2, input: "14 meters", groups: undefined]
```

Đoạn biểu thức trên khớp một chuỗi ký tự bao gồm `meters` chỉ khi đứng trước nó là một số có 2 chữ số bất kỳ khác 35. Phép thẩm định phía trước có tồn tại đảm bảo đứng trước mẫu ký tự là một số có 2 chữ số, và sau đó phép thẩm định phía trước phủ định đảm bảo số đó không phải là 35.

## Các nhóm ký tự cần bắt được định danh

Chúng ta có thể nhóm một phần của biểu thức chính quy bằng việc bọc các ký tự bên trong dấu ngoặc tròn. Việc này cho phép giới hạn luân phiên một phần của mẫu ký tự hoặc áp dụng định lượng vào toàn nhóm. Hơn thế nữa, chúng ta có thể trích xuất giá trị đã khớp bởi dấu ngoặc nhọn cho việc xử lý về sau.

Đoạn code sau đưa ra một ví dụ về việc tìm kiếm tên của file với đuôi mở rộng là `.jpg` trong một chuỗi ký tự và trích xuất tên của file.

```javascript
const re = /(\w+)\.jpg/;
const str = 'File name: cat.jpg';
const match = re.exec(str);
const fileName = match[1];

// The second element in the resulting array holds the portion of the string that parentheses matched
console.log(match);
// → ["cat.jpg", "cat", index: 11, input: "File name: cat.jpg", groups: undefined]

console.log(fileName);
// → cat
```

Trong các mẫu phức tạp hơn, việc tham chiếu đến một nhóm sử dụng số chỉ mục khiến bản thân biểu thức chính quy đã khó hiểu rồi càng trở nên khó hiểu hơn. Ví dụ, khớp một ngày trong chuỗi. Vì vị trí của ngày và tháng khác nhau theo từng vùng, nên sẽ không rõ đâu là nhóm tham chiếu đến ngày và nhóm tham chiếu đến tháng:

```javascript
const re = /(\d{4})-(\d{2})-(\d{2})/;
const match = re.exec('2020-03-04');

console.log(match[0]);    // → 2020-03-04
console.log(match[1]);    // → 2020
console.log(match[2]);    // → 03
console.log(match[3]);    // → 04
```

Giải pháp của ES2018 cho vấn đề này là nhóm tìm kiếm được định danh, sử dụng cú pháp diễn đạt hơn theo dạng như sau: `(?<name>...)`:

```javascript
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2020-03-04');

console.log(match.groups);          // → {year: "2020", month: "03", day: "04"}
console.log(match.groups.year);     // → 2020
console.log(match.groups.month);    // → 03
console.log(match.groups.day);      // → 04
```

Bởi đối tượng trả về có thể chứa một thuộc tính có cùng tên với tên của nhóm, nên tất cả các nhóm có định danh sẽ được định nghĩa bên trong một đối tượng tách biệt, được gọi là `groups`.

Một cấu trúc tương tự tồn tại ở nhiều ngôn ngữ lập trình mới và truyền thống. Python là một ví dụ khi sử dụng cú pháp `(?P<name>)` cho nhóm định danh. Không bất ngờ khi Perl cũng hỗ trợ nhóm định danh với cùng cú pháp với JavaScript (JavaScript kế thừa cú pháp biểu thức chính quy từ Perl). Java cũng có cú pháp giống Perl.

Ngoài việc truy cập thông qua nhóm định danh với đối tượng `groups`, chúng ta cũng có thể sử dụng tham chiếu là số chỉ mục - tương tự với một nhóm thông thường:

```javascript
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2020-03-04');

console.log(match[0]);    // → 2020-03-04
console.log(match[1]);    // → 2020
console.log(match[2]);    // → 03
console.log(match[3]);    // → 04
```
Cú pháp mới cũng sử dụng được với phép gán phân rã:
 ```javascript
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const [match, year, month, day] = re.exec('2020-03-04');

console.log(match);    // → 2020-03-04
console.log(year);     // → 2020
console.log(month);    // → 03
console.log(day);      // → 04
```
Đối tượng `groups` luôn được tạo kể cả khi không có nhóm định danh nào tồn tại trong biểu thức chính quy.
```javascript
const re = /\d+/;
const match = re.exec('123');

console.log('groups' in match);    // → true
```
Nếu một nhóm định danh tùy ý không khớp trong biểu thức, đối tượng `groups` vẫn có thuộc tính cho nhóm định danh này và giá trị của thuộct tính là `undefined`.
```javascript
const re = /\d+(?<ordinal>st|nd|rd|th)?/;

let match = re.exec('2nd');

console.log('ordinal' in match.groups);    // → true
console.log(match.groups.ordinal);         // → nd

match = re.exec('2');

console.log('ordinal' in match.groups);    // → true
console.log(match.groups.ordinal);         // → undefined
```
Với nhóm thông thường, chúng ta có thể gọi lại với cú pháp `\1`. Ví dụ, đoạn code sau sử dụng nhóm mà khớp hai ký tự liên tiếp sau đó gọi lại trong cùng mẫu đó.
```javascript
console.log(/(\w\w)\1/.test('abab'));    // → true

// if the last two letters are not the same 
// as the first two, the match will fail
console.log(/(\w\w)\1/.test('abcd'));    // → false
```
Để gọi lại một nhóm định danh trong mẫu ký tự, sử dụng cú pháp `/\k<name>/`. Ví dụ:
```javascript
const re = /\b(?<dup>\w+)\s+\k<dup>\b/;

const match = re.exec("I'm not lazy, I'm on on energy saving mode");        

console.log(match.index);    // → 18
console.log(match[0]);       // → on on
```
Biểu thức trên tìm các từ trùng nhau trong câu. Nếu muốn, chúng ta cũng có thể sử dụng cú pháp `\1`:
```javascript
const re = /\b(?<dup>\w+)\s+\1\b/;

const match = re.exec("I'm not lazy, I'm on on energy saving mode");        

console.log(match.index);    // → 18
console.log(match[0]);       // → on on 
```
Có thể sử dụng cả cú phép `\1` và `\k` đồng thời:
```javascript
const re = /(?<digit>\d):\1:\k<digit>/;

const match = re.exec('5:5:5');        

console.log(match[0]);    // → 5:5:5
```
Tương tự với nhóm thông thường, nhóm định danh có thể được sử dụng là giá trị thay thế trong hàm `replace()` với cú pháp `$<name>`. Ví dụ:
```javascript
const str = 'War & Peace';

console.log(str.replace(/(War) & (Peace)/, '$2 & $1'));    
// → Peace & War

console.log(str.replace(/(?<War>War) & (?<Peace>Peace)/, '$<Peace> & $<War>'));    
// → Peace & War
```
Nếu sử dụng một hàm để thực hiện việc thay thế, chúng ta có thể tham chiếu nhóm định danh giống như nhóm thông thường. Giá trị của nhóm đầu tiên sẽ là tham số thứ hai của hàm, và giá trị của nhóm thứ hai sẽ là tham số thứ ba.
```javascript
const str = 'War & Peace';

const result = str.replace(/(?<War>War) & (?<Peace>Peace)/, function(match, group1, group2, offset, string) {
    return group2 + ' & ' + group1;
});
console.log(result);    // → Peace & War
```
## Giá trị cờ `s` (`dotAll`)

Mặc định, ký tự chấm `.` trong biểu thức chính quy khớp bất kỳ ký tự nào ngoại trừ các dấu line breaks, bao gồm line feed (`\n`) và carriage return (`\r`):
```javascript
console.log(/./.test('\n'));    // → false
console.log(/./.test('\r'));    // → false
```

Mặc dù có cú pháp viết tắt này, lập trình viên JavaScript cũng có thể khớp tất cả các ký tự sử dụng hai ký tự viết tắt đối lập nha như `[\w\W]`, khớp các ký tự là chữ cái (`\w`) và không phải chữ cái (`\W`):

ES2018 giải quyết vấn ddè này bằng cách cung cấp cờ `s` (`dotAll`). Khi cờ này được sử dụng, nó sẽ thay đổi hay vi của dấu chấm `.` thành khớp cả những ký tự line break:

```javascript
console.log(/./s.test('\n'));    // → true
console.log(/./s.test('\r'));    // → true
```

Cờ `s` có thể được sử dụng trên nền tảng mỗi biểu thức và do đó không làm sai lệch những mẫu đang tồn tại dựa vào hành vi cũ của dấu chấm. Bên cạnh đó, cờ `s` còn xuất hiện ở một số ngôn ngữ lập trình khác như Perl hay PHP.

## Nhận dạng ký tự Unicode

Một trong những đặc tính mới được giới thiệu trong ES2015 là nhận dạng ký tự Unicode. Tuy nhiên, tính năng này chưa thật sự hữu hiệu ngay cả khi cờ `u` được sử dụng.

Ví dụ:
```javascript
const str = '𝟠';

console.log(/\d/.test(str));     // → false
console.log(/\d/u.test(str));    // → false
```

`𝟠` được coi là một số, nhưng `\d` chỉ có thể khớp các ký tự ASCII [0-9], vì vậy hàm `test()` trả về `false`. Bởi việc thay đổi hành vi của các lớp ký tự viết tắt có thể làm sai lệnh các mẫu biểu thức hiện tại nên một giá trị cờ mới được ra đời.

Ở ES2018, việc nhận dạng ký tự Unicode có thể sử dụng cú pháp `\p{ ... }` cùng với cờ `u`. Giờ nếu muốn khớp một ký tự số Unicode, cú pháp sẽ là `\p{Number}`:

```javascript
const str = '𝟠';
console.log(/\p{Number}/u.test(str));     // → true
```
Và để khớp bất cứ ký tự chữ Unicode nào, cú pháp sẽ là `\p{Alphabetic}`:
```javascript
const str = '漢';

console.log(/\p{Alphabetic}/u.test(str));     // → true

// the \w shorthand cannot match 漢
console.log(/\w/u.test(str));    // → false
```
`\P{ ... } ` là dạng phủ định của `\p{ ... } ` và khớp bất kỳ ký tự nào mà  `\p{ ... } `  không khớp.
```javascript
console.log(/\P{Number}/u.test('𝟠'));    // → false
console.log(/\P{Number}/u.test('漢'));    // → true

console.log(/\P{Alphabetic}/u.test('𝟠'));    // → true
console.log(/\P{Alphabetic}/u.test('漢'));    // → false
```
Chú ý việc sử dụng thuộc tính không hỗ trợ sẽ gây ra lỗi `SyntaxError`:
```javascript
console.log(/\p{undefined}/u.test('漢'));    // → SyntaxError
```

## Tính tương thích

### Trình duyệt desktop

![](https://images.viblo.asia/5a09d01a-35d6-4a71-a85e-257b3faa09be.jpg)
### Trình duyệt di động
![](https://images.viblo.asia/a0165c42-dc35-4302-80aa-d612887d85d2.jpg)

### Node.js

- **8.3.0** (yêu cầu cờ runtime `--harmony`)
- **8.10.0** (hỗ trợ cờ `s` và phép thẩm định phía trước)
- **10.0.0** (hỗ trợ tất cả các đặc tính trên)

## Tổng kết

ES2018 tiếp tục kế nhiệm các phiên bản ECMAScript trước bằng việc khiến biểu thức chính quy trở nên hữu dụng hơn. Những điểm mới bao gồm thẩm định giá trị đứng trước, nhóm định danh, cờ `s` (`dotAll`) và nhận dạng Unicode. Phép thẩm định phía trước cho phép khớp một mẫu ký tự chỉ khi nó được đứng trước bởi một mẫu khác. Nhóm định danh sử dụng cú pháp diễn đạt hơn so vớ nhóm thông thường. Cờ `s` (`dotAll`) thay đổi hành vi của dấu chấm `.` khi khớp tất cả các ký tự. Cuối cùng, việc nhận dạng ký tự Unicode được thực hiện theo một cách mới.

Khi xây dựng một mẫu biểu thức phức tạp, việc sử dụng các bộ công cụ test biểu thức chính quy thường trở nên hữu dụng. Một bộ cung cụ test hiệu quả cung cấp giao diện trực quan để kiểm tra một biểu thức chính quy trên một chuỗi ký tự và hiển thị từng bước xử lý của engine, điều mà đặc biệt hữu ích khi cố gắng hiểu những mẫu biểu thức được viết bởi người khác. Công cụ test cũng có thể phát hiện những lỗi cú pháp mà bạn gặp phải khi viết biểu thức chính quy. Regex101 và RegexBuddy là hai công cụ test biểu thức chính quy đáng để dùng thử.

### ** Lược dịch **

**Faraz**, *New JavaScript Features That Will Change How You Write Regex*, [www.smashingmagazine.com](https://www.smashingmagazine.com/2019/02/regexp-features-regular-expressions/#unicode-property-escapes)