# Giới thiệu
* Regular Expression (biểu thức chính quy) là một chuỗi các ký tự tạo thành một mẫu tìm kiếm.
* Khi bạn tìm kiếm dữ liệu trong một văn bản, bạn có thể sử dụng mẫu tìm kiếm này để mô tả những gì bạn đang tìm kiếm.
* Biểu thức chính quy có thể là một ký tự đơn hoặc một mẫu phức tạp hơn.
* Biểu thức chính quy có thể được sử dụng để thực hiện tất cả các loại hoạt động tìm kiếm văn bản và thay thế văn bản .
# Nội dung
## Kí hiệu chữ và hàm tạo
* Có hai cách để tạo một biểu thức chính quy: một kí hiệu chữ và một phương thức khởi tạo.
    * Các tham số của ký hiệu chữ được đặt giữa các dấu gạch chéo và không sử dụng dấu ngoặc kép.
    * Các tham số của hàm tạo không được đặt giữa các dấu gạch chéo nhưng sử dụng dấu ngoặc kép.
* Ba biểu thức sau tạo cùng một đối tượng biểu thức chính quy:
```
let re = /ab+c/i;    // Kí hiệu chữ
let re = new RegExp('ab+c', 'i')     // Hàm khởi tạo đối tượng RegExp với tham số đầu tiên là một pattern
let re = new RegExp(/ab+c/, 'i')     // Hàm khởi tạo với tham số đầu tiên là một biểu thức chính quy dạng kí hiệu chữ (bắt đầu có ở ECMAScript6)
```
* Ký hiệu chữ dẫn đến việc biên dịch biểu thức chính quy khi biểu thức được đánh giá. Sử dụng ký hiệu chữ khi biểu thức chính quy sẽ không đổi. Ví dụ: nếu bạn sử dụng ký hiệu chữ để tạo một biểu thức chính quy được sử dụng trong một vòng lặp, biểu thức chính quy sẽ không cần biên dịch lại trên mỗi lần lặp.
* Phương thức khởi tạo của đối tượng biểu thức chính quy — ví dụ — **new RegExp('ab+c')** — kết quả trong quá trình biên dịch biểu thức chính quy trong thời gian chạy. Sử dụng hàm khởi tạo khi bạn biết mẫu biểu thức chính quy sẽ thay đổi hoặc bạn không biết mẫu và lấy nó từ một nguồn khác, chẳng hạn như đầu vào của người dùng.
* Ở bài viết này tôi sẽ tập trung giới thiệu biểu thức chính quy dạng kí hiệu chữ. Ví dụ:
```
var patt = /schools/i;
```
trong đó schools là mẫu (được sử dụng để search), còn i là một kí tự bổ nghĩa (để search không phân biệt chữ hoa-thường)
## Phương thức search()
* Phương thức search() tìm kiếm một chuỗi (biểu thức chính quy) cho một giá trị nhất định và trả về vị trí tìm thấy:
* Ví dụ search() truyền vào một chuỗi
```
var str = "Visit my schools";
var n = str.search("schools");  // Trả về vị trí thứ 9
```
* Ví dụ search() sử dụng biểu thức chính quy:
```
var str = "Visit my schools";
var n = str.search(/Schools/i); // Cũng trả về 9
```
Các bạn có thể thấy với bổ ngữ i (search không phân biệt hoa-thường) nên vẫn có thể trả về giá trị chính xác.
## Phương thức replace()
* Trả về một chuỗi mới với các chuỗi khớp với biểu thức chính quy được thay thế bằng chuỗi truyền vào. Nếu pattern truyền vào là một chuỗi thì chỉ lần xuất hiện đầu tiên được thay thế.
* Ví dụ replace() với pattern là một chuỗi:
```
var p = "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?";
console.log(p.replace("dog", "monkey")); 
// Kết quả: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
```
* Ví dụ replace() với pattern là một biểu thức chính quy:
```
var p = "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?";
var regex = /dog/i;
console.log(p.replace(regex, "ferret")); 
// Kết quả: "The quick brown fox jumps over the lazy ferret. If the dog reacted, was it really lazy?"
```
* Ví dụ thay thế tất cả sự xuất hiện của regex:
```
var p = "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?";
var regex = /dog/gi;
console.log(p.replace(regex, "ferret")); 
// Kết quả: "The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"
```
Bổ ngữ (gi) là thay thế tất cả các lần xuất hiện trùng khớp biểu thức chính quy không phân biệt chữ hoa-thường.
## Sử dụng biểu thức chính quy để chia văn bản kết thúc dòng với CRLF
* Kết thúc dòng mặc định khác nhau tùy thuộc vào nền tảng (Unix, Windows, v.v.). Tính năng tách dòng được cung cấp trong ví dụ này hoạt động trên tất cả các nền tảng.
```
let text = 'Some text\nAnd some more\r\nAnd yet\rThis is the end'
let lines = text.split(/\r\n|\r|\n/)
console.log(lines) // array [ 'Some text', 'And some more', 'And yet', 'This is the end' ]
```
* Ngoài bổ ngữ g và i, ta còn một bổ ngữ m:
```
var str = "\nIs th\nis it?";
var patt1 = /^is/m;
var result = str.match(patt1);   // Trả về is
```
Kí hiệu (^) đối chiếu bất kì chuỗi nào có is ở đầu, (m) là thực hiện đối chiếu trên nhiều dòng (ở đây là kí tự \n)
# Một số mẫu biểu thức chính quy
## Đặt trong cặp dấu ngoặc
* Dấu ngoặc được sử dụng để tìm một loạt các kí tự:

| Biểu thức | Mô tả |
| -------- | -------- |
| [abc]   | Tìm bất kì kí tự nào nằm trong cặp dấu ngoặc |
| [^abc] | Không tìm bất kì kí tự nào nằm trong cặp dấu ngoặc |
| [0-9]    | Tìm bất kì chữ số nào từ 0 đến 9 |
| [^0-9]  | Không tìm bất kì chữ số nào từ 0 đến 9 |
| (x\|y)    | Trả về kí tự khớp chuỗi x hoặc y |
* Với [abc]:
```
var str = "Is this all there is?";
var patt1 = /[hai]/g; 
var result = str.match(patt1);  // Kết quả: h,i,a,h,i (trả về hết các trường hợp khớp h hoặc a hoặc i)
```
* Với [^abc] thì như trên sẽ trả về các kí tự còn lại.
* Với [0-9]:
```
var str = "123456789";
var patt1 = /[1-4]/g;
var result = str.match(patt1);  // Kết quả: 1,2,3,4
```
* Với (x|y):
```
var str = "re, greenn, red, greene, gren, gr, blue, yellow";
var patt1 = /(red|green)/g;
var result = str.match(patt1);   // Kết quả: green,red,green
```
Trường hợp này có thể thấy các chuỗi khớp trả về đúng chuỗi mà nó tìm thấy.
## Metacharacters
* Metacharacters là các kí tự với ý nghĩa đặc biệt khi đi sau kí tự (\):


| Metacharacter | Mô tả |
| -------- | -------- | 
| .     | Tìm một kí tự đơn ngoại trừ kí tự CRLF |
| \w  | Tìm kí tự từ a-z, A-Z, 0-9, kể cả _ |
| \W  | Tìm kí tự khác a-z, A-Z, 0-9,  _  (không gồm khoảng trắng)|
| \d    | Tìm kí tự là chữ số |
| \D   | Tìm kí tự không phải là chữ số |
| \s  | Tìm kí tự là khoảng trắng bao gồm dấu cách, dấu tab, CRLF |
| \S  | Tìm kí tự không phải là khoảng trắng |
| \b  | Tìm ở đầu hoặc ở cuối của một từ như bắt đầu với: \bLO, kết thúc là LO\b |
| \B  | Tìm nhưng không ở đầu hoặc ở cuối của một từ như không bắt đầu với: \BLO, không kết thúc là LO\B |
| \0  | Tìm kí tự NULL |
| \n  | Tìm kí tự newline (hệ Unix) |
| \f  | Tìm kí tự form feed |
| \r  | Tìm kí tự carriage return (hệ MacOS) |
| \t  | Tìm kí tự tab |
* Với (.):
```
var str = "That's hot!";
var patt1 = /h.t/g;
var result = str.match(patt1);  // Kết quả: hat,hot
```
* Với \w:
```
var str = "%%Hello 100!"; 
var patt1 = /\w/g;
var result = str.match(patt1);   // Kết quả: H,e,l,l,o,1,0,0
``` 
* Với \W:
```
var str = "%%Hello 100!"; 
var patt1 = /\w/g;
var result = str.match(patt1);   // Kết quả: %,%,!
``` 
* Với \d:
```
var str = "Give 100%!"; 
var patt1 = /\d/g;
var result = str.match(patt1);  // Kết quả: 1,0,0
```
* Với \s:
```
var str = "\nGood afternoon\t everybody!"; 
var patt1 = /\d/g;
var result = str.match(patt1);  // Kết quả: , ,	,
```
* Với \b:
```
var str = "HELLO, LOOK AT YOU!"; 
var patt1 = /\bLO/;
var result = str.search(patt1);  // Kết quả: 7 (tìm vị trí đầu tiên bắt đầu với LO là từ LOOK)
```
* Với \B:
```
var str = "HELLO, LOOK AT YOU!"; 
var patt1 = /\BLO/;
var result = str.search(patt1);  // Kết quả: 3 (tìm vị trí đầu tiên không bắt đầu với LO là từ HELLO)
```
## Bộ định lượng


| Quantifier | Mô tả|
| -------- | -------- |
| n+     | Khớp với bất kì chuỗi nào chứa ít nhất 1 kí tự n     |
| n*     | Khớp với bất kì chuỗi nào chứa không hoặc nhiều lần xuất hiện kí tự n     |
| n?     | Khớp với bất kì chuỗi nào chứa không hoặc đúng một lần xuất hiện kí tự n     |
| n{X}     | Khớp với bất kì chuỗi nào bao gồm X lần nối tiếp của n |
| n{X,Y}  | Khớp với bất kì chuỗi nào bao gồm X đến Y lần nối tiếp của n |
| n{X,}  | Khớp với bất kì chuỗi nào bao gồm ít nhất X lần nối tiếp của n |
| n$     | Khớp với chuỗi kết thúc bằng từ n |
| ^n     | Khớp với chuỗi bắt đầu bằng từ n |
| ?=n    | Khớp với bất kì chuỗi nào theo sau bởi chuỗi chỉ định n |
| ?!n     | Khớp với bất kì chuỗi nào không theo sau bởi chuỗi chỉ định n |
* Với n+:
```
var str = "Hellooo World! Hello schools!"; 
var patt1 = /o+/g;
var result = str.match(patt1);   // Kết quả: ooo,o,o,oo
```
* Với n*:
```
var str = "Hellooo World! Hello Schools!"; 
  var patt1 = /lo*/g;
  var result = str.match(patt1);   // Kết quả: l,looo,l,l,lo,l
```
* Với n?:
```
var str = "1, 100 or 1000?";
var patt1 = /100?/g;
var result = str.match(patt1);  // Kết quả: 100,100 (tìm toàn bộ cho kí tự 10, theo sau là không hoặc một lần xuất hiện của kí tự 0)
```
* Với n{X}:
```
var str = "100, 1000 or 10000?";
var patt1 = /\d{4}/g;
var result = str.match(patt1);  // Kết quả: 1000,1000 (sự nối tiếp 4 kí tự có thể là khác nhau)
```
* Với n$:
```
var str = "Is this his";
var patt1 = /is$/g;
var result = str.match(patt1);  // Kết quả: is
```
Thay vì tìm từng từ chứa is trong chuỗi thì chuỗi sẽ trỏ ngay đến vị trí cuối cùng để check xem có phải kết thúc là is hay không.
* Với ?=n:
```
var str = "Is this all there is";
var patt1 = /is(?= all)/;
var result = str.match(patt1);  // Kết quả: is
```
# Kết luận
* Trên đây là một vài tìm hiểu của tôi về Regular Expression trong Javascript. Hi vọng bài viết này sẽ giúp ích được cho các bạn.
Nguồn tham khảo: [https://www.w3schools.com/jsref/jsref_obj_regexp.asp](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)