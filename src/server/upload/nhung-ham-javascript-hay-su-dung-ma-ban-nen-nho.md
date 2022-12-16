Bạn là một web developer và làm việc rất nhiều với javascript (js) chắc hẳn bạn đã gặp trường hợp tìm đi tìm lại một hàm của string, hay thậm chí không nhớ keyword của nó khiến cho việc tìm kiếm và làm việc bị chậm đi phần nào. Bài viết dưới đây là tổng hợp lại các note của mình trong quá trình làm việc và học hỏi =)).

### Phần 1 - String methods
Bắt đầu từ những thứ quen thuộc trước nhé :D
#### 1, toUpperCase(), toLowerCase()
- Những LTV chắc hẳn ai cũng biết hai cụm từ **LowerCase** và **UpperCase** trong các không còn xa lạ đây là một phần của các ngôn ngữ lập trình tạo cho sự thuật tiện khi biến đổi hay chỉ đơn thuần là đưa hết về chữ thường/hoa và tìm kiếm.

Cú pháp:
``` js
string.toUpperCase()
string.toLowerCase()
```

VD:
``` js
var str = 'Method Converts A String';

console.log(str.toUpperCase()); // 'METHOD CONVERTS A STRING'
console.log(str.toLowerCase()); // 'method converts a string'
```

#### 2, startsWith(), endsWith()
- Bắt đầu bởi và kết thúc bằng
- Nếu bạn để ý trong lập trình để biểu thị sự bắt đầu và kết thúc những develop chúng ta thường sử dụng các cặp từ khóa **'start - end'**. Điều này hầu như ai cũng biết, để tận dùng điều này js tạo ra 2 hàm **startsWith()** và **endsWith()**.
- Dùng để kiểm tra xem chuỗi có bắt đầu hoặc kết thúc với cụm từ khóa đó không.

Cú pháp:
``` js
string.startsWith(searchvalue, start)
string.endsWith(searchvalue, length)
```

VD:

- **startsWith()**
``` js
  var str = 'AHiHi olala olele';

  console.log(str.startsWith('AHiHi')); // true
  console.log(str.startsWith('AHi')); // true
  console.log(str.startsWith('ahihi')); // false

  // Tùy chọn vị trí bắt đầu kiểm tra từ đâu, mặc định là 0
  console.log(str.startsWith('olala', 6)); // true
  console.log(str.startsWith('Olala', 6)); // false
```
- **endsWith()**
``` js
  var str = 'AHiHi olala olele';

  console.log(str.endsWith('olele')); // true
  console.log(str.endsWith('lele')); // true
  console.log(str.endsWith('oLeLe')); // false

  // Tùy chọn độ dài kiểm tra của chuỗi, mặc định là chính là độ dài của chuỗi
  console.log(str.endsWith('la', 11)); // true
  console.log(str.endsWith('l', 11)); // false
```
#### 3, includes()
- Bạn muốn tìm 1 chuỗi con trong 1 chuỗi cha ?. Trước đây khi học **C** mình có cơ hội viết một hàm kiểm tra 1 chuỗi nhỏ có nằm trong chuỗi lớn hay không đó là một bài toán logic đơn thuần. Cụm từ khóa để tìm kiếm vấn đề này là **contains**.
- Trong js hàm để làm việc đó là **includes()**

Cú pháp:
``` js
string.includes(searchvalue, start)
```

VD:
``` js
var str = 'who are you ???';

console.log(str.includes('are')); // true
console.log(str.includes('????')); // false
console.log(str.includes('')); // true

// bạn có thể bắt đầu tìm kiếm từ vị trí nào đó
console.log(str.includes('are', 6)); // false
```
#### 4, slice()
- Tạo một chuỗi mới từ chuỗi ban đầu

Cú pháp:
``` js
string.slice(start, end)
```

VD:
``` js
var str = 'who are you ???';
// bạn có 2 option là start và end tương ứng với điểm xuất phát và điểm cuối, không truyền gì mặc định là lấy hết.
console.log(str.slice()); // who are you ???
console.log(str.slice(4)); // are you ???
console.log(str.slice(1,6)); // ho ar
```
#### 5, charAt()
- Trả về ký tự tại vị trí chỉ định

Cú pháp:
``` js
string.charAt(index)
```

VD:
``` js
var str = 'who are you ???';
// Nếu không truyền tham số mặc định là vị trí đầu tiên
console.log(str.charAt()); // w
console.log(str.charAt(4)); // a
```
#### 6, split()
- Tách chuỗi thành một mảng chuỗi.

Cú pháp:
``` js
string.split(separator, limit)
```

VD:
``` js
var str = '-How-are-you-doing-today';

// Nếu không truyền tham số mặc định chuỗi đó là phần tử đầu tiên trong mảng
console.log(str.split()); // ["-How-are-you-doing-today"]
console.log(str.split('-')); // ["", "How", "are", "you", "doing", "today"]
```
#### 7, replace()
- Hàm này hẳn ai cũng biết, đây là hàm thay thế một chuỗi bằng một chuỗi mới nếu nó tồn tại

Cú pháp:
``` js
string.replace(searchvalue, newvalue)
```

VD:
``` js
var str = 'How are you doing today';

// Nếu không truyền tham số mặc định chuỗi đó là phần tử đầu tiên trong mảng
console.log(str.replace("you doing", "youu")); // How are youu today
```
#### 8, repeat()
- Nhân bản chuỗi với số lần được chỉ định.

Cú pháp:
``` js
string.repeat(count)
```

VD:
``` js
var str = 'banana ';

// Nếu không truyền tham số mặc định chuỗi đó là phần tử đầu tiên trong mảng
console.log(str.repeat(3)); // "banana banana banana "
```
## Kết luận
Mình thao khảo ở đây này :D [LINK](https://www.w3schools.com/jsref/jsref_obj_string.asp)