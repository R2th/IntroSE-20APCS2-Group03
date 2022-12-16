Bài viết được dịch từ https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285

Regular expressions (regex or regexp) cực kỳ hữu ích trong việc trích xuất thông tin từ 1 đoạn text. Nó tìm kiếm những ký tự trong đoạn text phù hợp với một quy tắc cụ thể, thường gọi là **search pattern**. Và học regex chính là việc học cách viết ra những search pattern đó.

Ứng dụng của regex rất da dạng, từ validate, phân tích và thay thế ký tự chong chuỗi, chuyển dữ liệu sang một định dạng khác, trích xuất data của một trang web ..

Một trong những điều thú vị của regex là bạn chỉ cần học một lần và có thể sử dụng ở hầu hết các ngôn ngữ lập trình(JavaScript, Java, VB, C #, C / C++, Python, Perl, Ruby, Delphi, R, Tcl...) và cú pháp cơ bản là giống nhau ở các ngôn ngữ lập trình, chỉ có sự khác biệt nhỏ ở những cú pháp nâng cao.

Trước tiên hãy bắt đầu bằng một số ví dụ cơ bản.  Trong quá trình tìm hiểu, các bạn hãy vào một số trang regex online để thực hành những ví dụ, như thế sẽ dễ hiểu hơn nhiều.

# Quy tắc cơ bản
## Ký tự thể hiện vị trí   `^ và $`
Chúng ta sẽ làm ví dụng với chuỗi `The end`

* `^The`        Khớp với từ `The` nhưng nó phải đứng ở đầu chuỗi -> [Try it!](https://regex101.com/r/cO8lqs/2)
* `end$`        Khớp với từ `end` nhưng nó phải đứng ở cuối chuỗi
* `^The end$`   Khớp với chuỗi `The end`
* `end`       Khớp với  từ `end` ở bất kỳ vị trí nào

## Ký tự thể hiện số lượng  `* + ? và {}`
Chuỗi ví dụ `abc`

* `abc*`        Khớp với từ `ab` và có nhiều hoặc không có ký tự `c` đắng sau `(ab, abc ,abccccc...)`  -> [Try it!](https://regex101.com/r/cO8lqs/1)
* `abc+ `       Khớp với từ `ab` và có một hoặc nhiều ký tự `c` đằng sau `(abc, abcccc....)`
* `abc?`        Khớp với từ `ab` và có 1 hoặc không có ký tự `c` đắng sau`(ab, abc)` 
* `abc{2}`      Khớp với từ `ab` và có 2 ký tự `c` đắng sau`(abcc) `
* `abc{2,}`     Khớp với từ `ab` và có từ 2 ký tự `c` đắng sau`(abcc, abccccc...) `
*` abc{2,5}`    Khớp với từ `ab`và có từ 2 đến 5 ký tự `c` đắng sau`(abcc,baccc..)`
* `a(bc)*`      Khớp với từ `a` và có nhiều hoặc không có ký tự `bc` đắng sau`(a, abc ,abcbc...)`
* `a(bc){2,5}`  Khớp với từ `a` và có từ 2 đến 5 ký tự `bc` đắng sau`(abcbc, abcbc....)`

## Toán tử hoặc `| và []`
* `a(b|c)`     Khớp với từ 'a' và có 1 ký tự `c` hoặc `b` đắng sau`(ab, ac) ` ->  [Try it!](https://regex101.com/r/cO8lqs/3)
* `a[bc]`      Kết quả như trên

## Ký tự phân loại ` \d \w \s và .`

* ` \d`         Khớp với 1 ký tự số(từ 0 đến 9) -> [ Try it!](https://regex101.com/r/cO8lqs/4)
* `\w `        Khớp với bất kỳ ký 1 tự số hoặc chữ hoặc dấu gạch dưới `_`
* `\s `        Khớp với ký tự khoảng trăng(bap gồm cả tab, xuống dòng)
* `.`          Khớp với bất kỳ ký tự nào -> [Try it!](https://regex101.com/r/cO8lqs/5)

`\d, \w, \s ` còn có phủ định của nó `\D, \W, \S`

* `\D `        Khớp với 1 ký tự không phải là số->  [Try it!](https://regex101.com/r/cO8lqs/6)
* ` \W`         Khớp với bất kỳ ký tự không phải là 1 số, chữ hoặc dấu gạch dưới '_'
* `\S `        Khớp với ký tự không phải là khoảng trăng(bap gồm cả tab, xuống dòng)

Bạn cũng có thể chọn riêng những ký tự không nhìn thấy như xuống dòng `\n`, tabs `\t`,  carriage returns(ký tự đưa con trỏ về đầu dòng) `\r`

## Flags
Chúng ta sử dụng regex nhưng thường không chú ý đến một khái niệm cơ bản là **flag(cờ)**.
Biểu thức chính quy có dạng `/abc/` và sau nó là flag với 3 giá trị sau
* g (global) tìm tất cả các đoạn ký tự khớp với mẫu tìm kiếm, nếu không có cờ `g` thì việc tìm kiếm sẽ dừng lại ở lần khớp đầu tiên.
* m (multi line) khi có `^ và $` thì `^` sẽ là bắt đầu 1 dòng và `$` là kết thúc 1 dòng trong chuỗi, nếu không có cờ `m` thì `^ và $` là bắt đầu và kết thúc của cả chuỗi
* i (insensitive) không phân biệt chữ hoa chữ thường(vd:`aBc` sẽ khớp với pattern `/abc/i` )

# Quy tắc nâng cao
## Ký hiệu phân nhóm `()`
*  `a(bc)`           trong cặp dấu ngoặc là một group, giá trị trong group sẽ được capture lại [Try it!](https://regex101.com/r/cO8lqs/11)
*  `a(?:bc)*`        giá trị trong group sẽ không được capture lại [Try it!](https://regex101.com/r/cO8lqs/12)
*  `a(?<foo>bc)`     đặt tên cho group, mặc địng group sẽ có chỉ số là group[0], group[1], trường hợp này group sẽ là group[foo][](https://regex101.com/r/cO8lqs/12)


Đây là một quy tắc  rất hữu ích nếu bạn bần trích xuất data từ một chuỗi. Bất kì thông tin nào được match sẽ được trích xuất vào trong một mảng, và ta có thể lấy nó thông qua chỉ mục của các group hoặc tên của group nếu đặt tên.
Nếu không muốn bắt thông tin trong group, ta dùng `?:`, khi đó group chỉ đơn thuần là một điều kiện và giá trị trong đó xẽ không được trích xuất.

## Kí hiệu chỉ phạm vi `[]`

*  `[abc]`            khớp với 1 ký tự a hoặc `b` hoặc `c` -> tương tự cách dùng `a|b|c` [Try it!](https://regex101.com/r/cO8lqs/7)
*  `[a-c]`            tác dụng như trên
*  `[a-fA-F0-9]`      khớp với 1 ký tự nằm trong khoảng từ `a -> z` hoặc `A -> Z` hoặc `0 -> 9`(đây chính là đoạn regex để bắt ký tự trong hệ HEX) [Try it!](https://regex101.com/r/cO8lqs/22)
* ` [0-9]%  `         khớp với 1 ký tự từ `0 ->9` và theo sau nó là ký tự `%`
* ` [^a-zA-Z]`        khớp với ký tự không nằm nằm trong `a -> z` và `A -> Z` [Try it!](https://regex101.com/r/cO8lqs/10)

> Chú ý: Chức năng của một ký tự đặc biệt nào đó sẽ thay đổi khi nó nằm ở các vị trí khác nhau trong partten.
> ở ví dụ cuối cùng, ký tự  `^` nằm trong [] thể hiện sự phủ định, chứ không phải  xác định bắt đầu chuỗi. 
> Nên cần chú ý vị trí của ký tự đặc biệt để biết chức năng của nó

## Greedy and Lazy match
Cái này khá khó để diễn tả bằng tiếng việt nên mình để nguyên tiếng anh.


Những ký tự chỉ số lượng ( * + {}) sẽ cố gắng match một đoạn string dài nhất chính vì thế trong tiếng anh nó được gọi là Greedy- sự tham lam

Ví dụ:  xét chuỗi `<div>Greedy</div><div>Lazy</div>match`

`<.+>` sẽ match `<div>Greedy</div><div>Lazy</div>`  trong chuỗi `<div>Greedy</div><div>Lazy</div>match`. 

Vì nó sẽ match kí tự `<` đầu tiên cho đến kí tự `>` cuối cùng nên chỉ có một lần match duy nhất.

Dấu `?` sẽ làm biểu thức trở nên lười biếng hơn (Lazy), nghĩa là sẽ match với số lần càng nhiều càng tốt.

`<.+?>`  sẽ match toàn bộ những thẻ div riêng lẻ và trong ví dụ trên nó sẽ match 4 lần tương ứng với 2 cặp thẻ div. [Try it!](https://regex101.com/r/cO8lqs/24)
> Có một cách khác để thực hiện việc nàyc `<[^<>]+>`, các này sẽ tối ưu hơn là dùng `.`
> 
> => Có nhiều cách để giải quyết một vấn đề với regex, nên hãy chọn cách tối ưu nhất nhé.
> 
# Nâng cao hơn
## Boundaries  ` \b và \B`
* `\babc\b`         match những từ `abc` [Try it!](https://regex101.com/r/cO8lqs/25)

Từ `abc` trong chuỗi phải là một từ riêng,nghĩa là nó phải được phân cách giữa các từ khác bằng khoảng trắng hoặc xuống dòng.

* `\Babc\B`       math những từ mà giữa nó có cụm `abc`[Try it!](https://regex101.com/r/cO8lqs/26)

\B là phủ định của \b, nghĩa là trước và sau `abc` không được là kí tự khoảng trắng hoặc xuống dòng.

## Back-references  ` \1`
* `([abc])\1`             sử dụng `\1` sẽ match khi có 1 kí tự tiếp theo giống với kí tự được match trong group đầu tiên. Hơi khó hiểu, bạn xem ví dụ sẽ rõ hơn nhé [Try it!](https://regex101.com/r/cO8lqs/14)
* `([abc])([de])\2\1`      Chúng ta có thể xử dụng `\2,\3` để math kí tự giống với group thứ 2, 3 [Try it!](https://regex101.com/r/cO8lqs/15)
* `(?<foo>[abc])\k<foo>`   Có thể đặt tên cho group thay cho số thứ tự [Try it!](https://regex101.com/r/cO8lqs/16)

## Look-ahead and Look-behind —`(?=) và (?<=)`
* `d(?!r)`       match với `d` và theo sau `d` là `r`, nhưng `r` sẽ không nằm trong data được match [Try it!](https://regex101.com/r/cO8lqs/18)
* `(?<!r)d`     match với `d` và trước `d` là `r` , tất nhiên `r` cũng hông nằm trong data được match [Try it!](https://regex101.com/r/cO8lqs/19)

Nó cũng có toán tử phủ định 
* `d(?!r)`       match với `d` và theo sau `d` là 1 ký tự không phải là `r`. [Try it!](https://regex101.com/r/cO8lqs/20)
* `(?<!r)d `     match với `d` và trước `d` là 1 ký tự không phải `r` [Try it!](https://regex101.com/r/cO8lqs/21)

# Tổng kết
Regex có thể làm rất nhiều việc, như dưới đây
* Validate dữ liệu
* Trích xuất dữ liệu từ html đơn giản
* Chuyển dữ liệu từ định dạng thô thành một định dạng khác
* Phân tích chuỗi
* Thay thế chuỗi
* highlight text....

Tuy regex rất mạnh mẽ và làm được nhiều ciệc, nhưng chúng ta cũng không nên lạm ụng nó quá. ví dụ như nó có thể valiate dữ liệu nhưng đó là những dữ liệu có dạng riêng, còn với dạng cơ bản như email, number thì không nên dùng regex vì hầu hết các framework đều hỗ trợ validate những dữ liệu đó rồi.

Nên các bạn hãy cân nhắc phương pháp tốt nhất để giảiquyết vấn đề của mình nhé