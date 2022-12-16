**I: lời mở đầu**

Biểu thức chính quy (regular expressions ) là các mẫu dùng để tìm kiếm các bộ kí tự được kết hợp với nhau trong các chuỗi kí tự. Trong JavaScript thì biểu thức chính quy cũng đồng thời là các đối tượng, tức là khi bạn tạo ra một biểu thức chính quy là bạn có một đối tượng tương ứng. Các mẫu này được sử dụng khá nhiều trong JavaScript như phương thức exec và test của RegExp, hay phương thức match, replace, search, và split của String. Trong chương này, ta cùng tìm hiểu chi tiết hơn về biểu thức chính quy trong JavaScript.

**II: Tạo một biểu thức chính quy**

Bạn có thể tạo ra một biểu thức chính quy bằng 1 trong 2 cách sau:

Sử dụng cách mô tả chính quy thuần (regular expression literal) như sau:

`var re = /ab+c/;`

Các đoạn mã chứa các mô tả chính quy thuần sau khi được nạp vào bộ nhớ sẽ dịch các đoạn mô tả đó thành các biểu thức chính quy. Các biểu thức chính quy được dịch ra này sẽ được coi như các hằng số, tức là không phải tạo lại nhiều lần, điều này giúp cho hiệu năng thực hiện tốt hơn.

Tạo một đối tượng RegExp như sau:
```javascript

var re = new RegExp("ab+c");
```

Với cách này, các biểu thức chính quy sẽ được dịch ra lúc thực thi chương trình nên hiệu năng không đạt được như với việc sử dụng cách mô tả chính quy thuần. Nhưng ưu điểm là nó có thể thay đổi được, nên ta thường sử dụng chúng khi ta muốn nó có thể thay đổi được, hoặc khi ta chưa chắc chắn về các mẫu chính quy (pattern) như nhập từ bàn phím chẳng hạn.


**III: Cách viết một mẫu biểu thức chính quy**

Một mẫu biểu thức chính quy là một tập các kí tự thường, như ***/abc/*** , hay một tập kết hợp cả kí tự thường và kí tự đặc biệt như  ***/abc/***   hoặc  **/Chapter (\d+)\.\d/** .  Trong ví dụ cuối, ta thấy rằng nó chứa cả các dấu ngoặc đơn（ () ）được sử dụng như các thiết bị nhớ, tức là các mẫu trong phần () này sau khi được tìm kiếm có thể được nhớ lại để sử dụng cho các lần sau. Bạn có thể xem chi tiết hơn tại:  Sử dụng dấu ngoặc đơn tìm xâu con.


**Sử dụng mẫu đơn giản**

Các mẫu đơn giản là các mẫu có thể được xây dựng từ các kí tự có thể thể tìm kiếm một cách trực tiếp. Ví dụ, mẫu **/abc/** sẽ tìm các các đoạn 'abc' theo đúng thứ tự đó trong các chuỗi. Mẫu này sẽ khớp được với  "Hi, do you know your abc's?" và "The latest airplane designs evolved from slabcraft.", vì cả 2 chuỗi này đều chứa đoạn 'abc'. Còn với  chuỗi 'Grab crab', nó sẽ không khớp vì chuỗi này không chứa 'abc' theo đúng thứ tự, mà chỉ chứa 'ab c'.

**Sử dụng các kí tự đặc biệt**
Các mẫu có thể chứa các kí tự đặc biệt cho các mục đích tìm kiếm nâng cao mà tìm kiếm trực tiếp sẽ khó khăn như tìm một đoạn chứa một hoặc nhiều hơn một kí tự b, hay tìm một hoặc nhiều kí tự dấu cách (while space). Ví dụ, mẫu  ***/abc/***  có thể tìm các đoạn có chứa: một kí tự 'a', theo sau là không có hoặc có một hoặc có nhiều kí tự 'b', cuối cùng là một kí tự 'c' như chuỗi "cbbabbbbcdebc," sẽ được khớp với xâu con 'abbbbc'.

Bảng dưới đây mô tả đầy đủ các kí tự đặc biệt có thể dùng với biểu thức chính quy.

**Bảng 4.1 Các kí tự đặc biệt trong biểu thức chính quy.
Kí tự (kí hiệu, cờ)	Ý nghĩa**



|Kí tự (kí hiệu, cờ) | Ý nghĩa |
| -------- | -------- | -------- |
| \     | Tìm với luật dưới đây: Một dấu gạch chéo ngược sẽ biến một kí tự thường liền kế phía sau thành một kí tự đặc biệt, tức là nó không được sử dụng để tìm kiếm thông thường nữa. Ví dụ,  trường hợp kí tự 'b' không có dấu gạch chéo ngược này sẽ được khớp với các kí tự 'b' in thường, nhưng khi nó có thêm dấu gạch chéo ngược, '\b' thì nó sẽ không khớp với bất kì kí tự nào nữa, lúc này nó trở thành kí tự đặc biệt. Xem thêm phần word boundary character để biết thêm chi tiết. Tuy nhiên nếu đứng trước một kí tự đặc biệt thì nó sẽ biến kí tự này thành một kí tự thường, tức là bạn có thể tìm kiếm kí tự đặc biệt này trong xâu chuỗi của bạn như các kí tự thường khác. Ví dụ, mẫu /a*/ có '*' là kí tự đặc biệt và mẫu này sẽ bị phụ thuộc vào kí tự này, nên được hiểu là sẽ tìm khớp  với 0 hoặc nhiều kí tự a. Nhưng, với mẫu /a\*/ thì kí tự '*' lúc này được hiểu là kí tự thường nên mẫu này sẽ tìm kiếm xâu con là 'a*'.Đừng quên \ cũng là một kí tự đặc biệt, khi cần so khớp chính nó ta cũng phải đánh dấu nó là kí tự đặc biệt bằng cách đặt \ ở trước (\\).     |
^	| Khớp các kí tự đứng đầu một chuỗi. Nếu có nhiều cờ này thì nó còn khớp được cả các kí tự đứng đầu của mỗi dòng (sau kí tự xuống dòng). Ví dụ, /^A/ sẽ không khớp được với 'A' trong "an A" vì 'A' lúc này không đứng đầu chuỗi, nhưng nó sẽ khớp "An E" vì lúc này 'A' đã đứng đầu chuỗi. Ý nghĩa của '^' sẽ thay đổi khi nó xuất hiện như một kí tự đầu tiên trong một lớp kí tự, xem phần complemented character sets để biết thêm chi tiết. |
$	|So khớp ở cuối chuỗi. Nếu gắn cờ multiline (đa dòng), nó sẽ khớp ngay trước kí tự xuống dòng. Ví dụ, /t$/ không khớp với 't' trong chuỗi "eater" nhưng lại khớp trong chuỗi "eat".
*	| Cho phép kí tự trước nó lặp lại 0 lần hoặc nhiều lần. Tương đương với cách viết {0,}. Ví dụ, /bo*/ khớp với 'boooo' trong chuỗi "A ghost booooed" nhưng không khớp trong chuỗi "A birth warbled".
+	| Cho phép kí tự trước nó lặp lại 1 lần hoặc nhiều lần. Tương đương với cách viết {1,}. Ví dụ, /a+/ khớp với 'a' trong chuỗi "candy" và khớp với tất cả kí tự a liền nhau trong chuỗi "caaaaaaandy".
?	| Cho phép kí tự trước nó lặp lại 0 lần hoặc 1 lần duy nhất. Tương đương với cách viết {0,1}. Ví dụ, /e?le?/ khớp với 'el' trong chuỗi "angel" và 'le' trong chuỗi "angle" hay 'l' trong "oslo". Nếu sử dụng kí tự này ngay sau bất kì kí tự định lượng nào trong số *,+,? hay {}, đều làm bộ định lượng "chán ăn" (dừng so khớp sau ngay khi tìm được kí tự phù hợp), trái ngược với đức tính "tham lam" vốn sẵn của chúng (khớp tất cả kí tự chúng tìm thấy). Ví dụ, áp dụng biểu mẫu /\d+/ cho "123abc" ta được "123". Nhưng áp /\d+?/ cho chính chuỗi trên ta chỉ nhận được kết quả là "1". Bạn có thể đọc thêm trong mục x(?=y) và x(?!y) của bảng này.
.	| Dấu . khớp với bất kì kí tự đơn nào ngoại trừ kí tự xuống dòng. Ví dụ, /.n/ khớp với 'an' và 'on' trong chuỗi "no, an apple is on the tree", nhưng không khớp với 'no'.
(x)	 | Khớp 'x' và nhớ kết quả so khớp này, như ví dụ ở dưới. Các dấu ngoặc tròn được gọi là các dấu ngoặc có nhớ. Biểu mẫu /(foo) (bar) \1 \2/ khớp với 'foo' và 'bar' trong chuỗi "foo bar foo bar". \1 và \2 trong mẫu khớp với 2 từ cuối. Chú ý rằng \1, \2, \n được sử dụng để so khớp các phần trong regex, nó đại diện cho nhóm so khớp đằng trước. Ví dụ: /(foo) (bar) \1 \2/ tương đương với biểu thức /(foo) (bar) foo bar/. Cú pháp $1, $2, $n còn được sử dụng trong việc thay thế các phần của một regex. Ví dụ: 'bar foo'.replace(/(...) (...)/, '$2 $1') sẽ đảo vị trí 2 từ 'bar' và 'foo' cho nhau.
(?:x)	| Khớp 'x' nhưng không nhớ kết quả so khớp. Những dấu ngoặc tròn được gọi là những dấu ngoặc không nhớ, nó cho phép bạn định nghĩa những biểu thức con cho những toán tử so khớp. Xem xét biểu thức đơn giản /(?:foo){1,2}/. Nếu biểu thức này được viết là /foo{1,2}/, {1,2} sẽ chỉ áp dụng cho kí tự 'o' ở cuối chuỗi 'foo'. Với những dấu ngoặc không nhớ, {1,2} sẽ áp dụng cho cả cụm 'foo'.
x(?=y)	| Chỉ khớp 'x' nếu 'x' theo sau bởi 'y'. Ví dụ, /Jack(?=Sprat)/ chỉ khớp với 'Jack' nếu đằng sau nó là 'Sprat'. /Jack(?=Sprat|Frost)/ chỉ khớp 'Jack' nếu theo sau nó là 'Sprat' hoặc 'Frost'. Tuy nhiên, cả 'Sprat' và 'Frost' đều không phải là một phần của kết quả so khớp trả về.
x(?!y)	| Chỉ khớp 'x' nếu 'x' không được theo sau bởi 'y'. Ví dụ: /\d+(?!\.)/ chỉ khớp với số không có dấu . đằng sau. Biểu thức /\d+(?!\.)/.exec("3.141")​ cho kết quả là '141' mà không phải '3.141'.
x\y	  | Khớp 'x' hoặc 'y' Ví dụ, /green|red/ khớp với 'green' trong chuỗi "green apple" và 'red' trong chuỗi "redapple".
{n}	| Kí tự đứng trước phải xuất hiện n lần. n phải là một số nguyên dương. Ví dụ, /a{2}/ không khớp với 'a' trong "candy", nhưng nó khớp với tất cả kí tự 'a' trong "caandy", và khớp với 2 kí tự 'a' đầu tiên trong "caaandy".
{n,m}	| Kí tự đứng trước phải xuất hiện từ n đến m lần. n và m là số nguyên dương và n <= m. Nếu m bị bỏ qua, nó tương đương như ∞. Ví dụ, /a{1,3}/ không khớp bất kì kí tự nào trong "cndy", kí tự 'a' trong "candy", 2 kí tự 'a' đầu tiên trong "caandy", và 3 kí tự 'a' đầu tiên trong "caaaaaaandy". Lưu ý là "caaaaaaandy" chỉ khớp với 3 kí tự 'a' đầu tiên mặc dù chuỗi đó chứa 7 kí tự 'a'.
[xyz]	| Lớp kí tự. Loại mẫu này dùng để so khớp với một kí tự bất kì trong dấu ngoặc vuông, bao gồm cả escape sequences. Trong lớp kí tự, dấu chấm (.) và dấu hoa thị (*) không còn là kí tự đặc biệt nên ta không cần kí tự thoát đứng trước nó. Bạn có thể chỉ định một khoảng kí tự bằng cách sử dụng một kí tự gạch nối (-) như trong ví dụ dưới đây: Mẫu [a-d] so khớp tương tự như mẫu [abcd], khớp với 'b' trong "brisket" và 'c' trong "city". Mẫu /[a-z.]+/ và /[\w.]+/ khớp với toàn chuỗi "test.i.ng".
[^xyz] | Lớp kí tự phủ định. Khi kí tự ^ đứng đầu tiên trong dấu ngoặc vuông, nó phủ định mẫu này. Ví dụ, [^abc] tương tự như [^a-c], khớp với 'r' trong "brisket" và 'h' trong "chop" là kí tự đầu tiên không thuộc khoảng a đến c.
[\b]	| Khớp với kí tự dịch lùi - backspace (U+0008). Bạn phải đặt trong dấu ngoặc vuông nếu muốn so khớp một kí tự dịch lùi. (Đừng nhầm lẫn với mẫu \b).
\b	| Khớp với kí tự biên. Kí tự biên là một kí tự giả, nó khớp với vị trí mà một kí tự không được theo sau hoặc đứng trước bởi một kí tự khác. Tương đương với mẫu (^\w|\w$|\W\w|\w\W). Lưu ý rằng một kí tự biên được khớp sẽ không bao gồm trong kết quả so khớp. Nói cách khác, độ dài của một kí tự biên là 0. (Đừng nhầm lẫn với mẫu [\b]) Ví dụ: /\bm/ khớp với 'm' trong chuỗi "moon";
/oo\b/ | không khớp  'oo' trong chuỗi "moon", bởi vì 'oo' được theo sau bởi kí tự 'n';  /oon\b/ khớp với 'oon' trong chuỗi "moon", bởi vì 'oon' ở cuối chuỗi nên nó không được theo sau bởi một kí tự; 
/\w\b\w/ | sẽ không khớp với bất kì thứ gì, bởi vì một kí tự không thể theo sau một kí tự biên và một kí tự thường. Chú ý: Engine biên dịch biểu thức chính quy trong Javascript định nghĩa một lớp kí tự là những kí tự thường. Bất kỳ kí tự nào không thuộc lớp kí tự bị xem như một kí tự ngắt. Lớp kí tự này khá hạn chế: nó bao gồm bộ kí tự La-tinh cả hoa và thường, số thập phân và kí tự gạch dưới. Kí tự có dấu, như "é" hay "ü", không may, bị đối xử như một kí tự ngắt.
\B	| khớp với kí tự không phải kí tự biên. Mẫu này khớp tại vị trí mà kí tự trước và kí tự sau nó cùng kiểu: hoặc cả hai là kí tự hoặc cả hai không phải là kí tự. Bắt đầu và kết thúc chuỗi không được xem là những kí tự. Ví dụ, /\B../ khớp với 'oo' trong "noonday", và /y\B./ khớp với 'ye' trong "possibly yesterday."
\cX	| X là một kí tự trong khoảng A tới Z. Mẫu này khớp với một kí tự điều khiển trong một chuỗi. Ví dụ: /\cM/ khớp với control-M (U+000D) trong chuỗi.
\d	| Khớp với một kí tự số. Tương đương với mẫu [0-9]. Ví dụ: /\d/ hoặc /[0-9]/ khớp với '2' trong chuỗi "B2 is the suite number."
\D	| Khớp với một kí tự không phải là kí tự số. Tương đương với mẫu [^0-9]. Ví dụ; /\D/ hoặc /[^0-9]/ khớp với 'B' trong "B2 is the suite number."
\f |	Khớp với kí tự phân trang - form feed (U+000C).
\n |	Khớp với kí tự xuống dòng - line feed (U+000A).
\r |	Khớp với kí tự quay đầu dòng -  carriage return (U+000D).
\s	| Khớp với một kí tự khoảng trắng, bao gồm trống - space, tab, phân trang - form feed, phân dòng - line feed. Tương đương với [ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​\u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​​\u202f\u205f​\u3000]. Ví dụ: /\s\w*/ khớp với ' bar' trong "foo bar."
\S	| Khớp với một kí tự không phải khoảng trắng. Tương đương với [^ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​\u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​\u202f\u205f​\u3000]. Ví dụ: /\S\w*/ khớp với 'foo' trong chuỗi "foo bar."
\t |	Khớp với kí tự tab (U+0009).
\v |	Khớp với kí tự vertical tab (U+000B).
\w	| Khớp với tất cả kí tự là chữ, số và gạch dưới. Tương đương với mẫu [A-Za-z0-9_]. ví dụ, /\w/ khớp với 'a' trong "apple," '5' trong "$5.28," và '3' trong "3D."
\W	| Khớp với tất cả kí tự không phải là chữ. Tương đương với mẫu [^A-Za-z0-9_]. ví dụ, /\W/ hoặc /[^A-Za-z0-9_]/ khớp với '%' trong "50%."
\n	| Trong đó, n là một số nguyên dương, một tham chiếu ngược tới chuỗi khớp thứ n trong biểu thức (đếm từ trái sang, bắt đầu bằng 1). ví dụ, /apple(,)\sorange\1/ hay /apple(,)\sorange,/ khớp với 'apple, orange,' trong chuỗi "apple, orange, cherry, peach."
\0 |	Khớp với kí tự NULL (U+0000). Lưu ý: không được thêm bất kì một kí tự số nào sau 0, vì \0<các-kí-tự-số> là một biểu diễn hệ bát phân escape sequence.
\xhh |	Khớp với kí tự với mã code là hh (2 số trong hệ thập lục phân)
\uhhhh |	Khớp với kí tự có mã hhhh (4 số trong hệ thập lục phân).


Mã hóa escapse chuỗi người dùng nhập vào bằng một hàm thay thế đơn giản sử dụng biểu thức chính quy
```
 function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
```
**Sử dụng ngoặc tròn**
Ngoặc tròn bao quanh bất kỳ phần nào của biểu thức chính quy sẽ khiến phần kết quả so khớp được nhớ. Mỗi lần nhớ, chuỗi con có thể được gọi lại để sử dụng, mô tả trong Using Parenthesized Substring Matches.

Ví dụ, mẫu /Chapter (\d+)\.\d*/ khớp đúng với 'Chapter ' theo sau bởi một hoặc nhiều kí tự số, sau nữa là một dấu chấm thập phân, cuối cùng có thể là 0 hoặc nhiều kí tự số. Bên cạnh đó, dấu ngoặc tròn được sử dụng để nhớ một hoặc nhiều kí tự số đầu tiên được khớp.

Mẫu này được tìm thấy trong chuỗi "Open Chapter 4.3, paragraph 6", nhớ '4' nhưng không được tìm thấy trong chuỗi "Chapter 3 and 4", bởi vì chuỗi đó không có dấu chấm sau kí tự số '3'.

Để so khớp một chuỗi con không nhớ, đặt ?: ở vị trí đầu tiên trong ngoặc. Ví dụ, (?:\d+) khớp với một hoặc nhiều kí tự số nhưng không nhớ kết quả so khớp.

**Làm việc với biểu thức chính quy**
Biểu thức chính quy được sử dụng với phương thức test và exec của lớp RegExp hoặc phương thức match, replace, search và split của chuỗi. Những phương thức này được giải thích chi tiết trong JavaScript Reference.
**
Bảng 4.2 Những phương thức được sử dụng trong biểu thức chính quy**


| Phương thứ | 	Mô tả | 
| -------- | -------- | -------- |
| exec	| Một phương thức của RegExp dùng để tìm kiếm chuỗi phù hợp với mẫu so khớp. Nó trả về một mảng chứa kết quả tìm kiếm. |
test |	Một phương thức của RegExp dùng để kiểm tra mẫu có khớp với chuỗi hay không. Nó trả về giá trị true hoặc false.
match |	Một phương thức của chuỗi dùng để tìm kiếm chuỗi phù hợp với mẫu so khớp. Nó trả về một mảng chứa kết quả tìm kiếm hoặc null nếu không tìm thấy.
search	| Một phương thức của chuỗi dùng để tìm kiếm chuỗi phù hợp với mẫu so khớp và trả về vị trí của chuỗi đó hoặc -1 nếu không tìm thấy.
replace |	Một phương thức của chuỗi dùng để tìm kiếm một chuỗi theo mẫu so khớp và thay thế chuỗi con được khớp với một chuỗi thay thế.
split |	Một phương thức của chuỗi dùng một biểu mẫu chính quy hoặc một chuỗi bất biến để ngắt chuỗi đó thành một mảng các chuỗi con.

Khi bạn muốn biết một mẫu có được tìm thấy trong chuỗi hay không, sử dụng phương thức test hoặc search; để lấy nhiều thông tin hơn (nhưng chậm hơn) sử dụng phương thức exec hoặc match.

Như ví dụ dưới đây, phương thức exec được dùng để tìm chuỗi phù hợp theo mẫu so khớp.

```
> var myRe = /d(b+)d/g;
> var myArray = myRe.exec("cdbbdbsbz");
```

Nếu bạn không cần truy cập những thuộc tính khác của biểu thức chính quy, sử dụng cách sau:

`var myArray = /d(b+)d/g.exec("cdbbdbsbz");`

Nếu bạn muốn khởi tạo một biểu thức chính quy từ một chuỗi:

```
var myRe = new RegExp("d(b+)d", "g");
var myArray = myRe.exec("cdbbdbsbz");
```

Với những mã này, so khớp thành công và trả về một mảng kết quả với những thuộc tính được liệt kê trong bảng dưới đây.

**Kết Luận:**
Đây là 1 số kiến thức về Regex mà tôi muốn nói với các bạn. Vui long các bạn có thể góp ý thêm với tôi.

Thanks