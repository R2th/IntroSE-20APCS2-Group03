![image.png](https://images.viblo.asia/9db57997-bc74-430d-8a36-c6e2873531a2.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Các biểu thức chính quy (regex hoặc regexp) cực kỳ hữu ích trong **việc trích xuất thông tin từ bất kỳ văn bản nào** bằng cách tìm kiếm một hoặc nhiều kết quả khớp của một mẫu tìm kiếm cụ thể (nghĩa là một chuỗi ký tự ASCII hoặc unicode cụ thể).

Ứng dụng của Regex thì vô vàn: từ authentication đến phân tích cú pháp/thay thế chuỗi, passing dữ liệu sang các định dạng khác nhau hoặc [web scraping](https://en.wikipedia.org/wiki/Web_scraping).v.v.

Một trong những tính năng thú vị nhất là khi bạn đã học cú pháp regex, bạn thực sự có thể sử dụng công cụ này trong (gần như) tất cả các ngôn ngữ lập trình (JavaScript, Java, VB, C#, C/C++, Python, Perl, Ruby, Delphi, R, Tcl, nhiều thứ khác) đều hỗ trợ mạnh mẽ Regex và cách sử dụng về mặt bản chất thì y hệt.

GÉT GÔ hãy cùng nhau tìm hiểu một số ví dụ và giải thích về các `syntax` quan trọng nhé.
*Phần giải thích đôi khi khó hiểu mình nhưng có đính kèm ví dụ. Các bạn nên test thử để hiểu rõ hơn nhé.*

Basic - Cơ bản
=============

Anchors — `^` và `$`
----------------

```markdown
^The        khớp với bất kỳ chuỗi nào bắt đầu bằng 'The'
end$        khớp với một chuỗi kết thúc bằng 'end'
^The end$   khớp với chuỗi (bắt đầu và kết thúc bằng 'The' 'end')
roar        khớp với bất kỳ chuỗi nào có đoạn text là 'roar' trong đó
```
[Cùng Test thử những syntax trên nào](https://regex101.com/r/cO8lqs/2)



Quantifiers — `*` `+` `?` và `{}` - Các công thức dùng để `Định Lượng`
--------------------------------

```markdown
abc*        khớp với một chuỗi có 'ab' theo sau bởi không hoặc nhiều ký tự 'c'
abc+        khớp với một chuỗi có 'ab' theo sau bởi một hoặc nhiều ký tự 'c'
abc?        khớp với một chuỗi có 'ab' theo sau bởi không hoặc một ký tự 'c'
abc{2}      khớp với một chuỗi có 'ab' theo sau là hai ký tự 'c'
abc{2,}     khớp với một chuỗi có 'ab' theo sau là hai ký tự 'c' trở lên
abc{2,5}    khớp với một chuỗi có 'ab' theo sau là hai đến năm ký tự 'c'
a(bc)*      khớp với một chuỗi theo sau có không hoặc nhiều bản sao của chuỗi 'bc'
a(bc){2,5}  khớp với một chuỗi theo sau có từ 2 đến 5 bản sao của chuỗi 'bc'
```
[Cùng Test thử những syntax trên nào](https://regex101.com/r/cO8lqs/1)


Toán tử HOẶC — `|` hoặc `[]`
------------------------

```markdown
a(b|c)     khớp với một chuỗi có 'b' hoặc 'c' theo sau (có capturing group - xem phần giải thích bên dưới)
a[bc]      giống như trước, nhưng không chụp b hoặc c
```

[Cùng Test thử những syntax trên nào](https://regex101.com/r/cO8lqs/3)

Giải thích thuật ngữ quan trọng 
----------------
`Capturing group` là một thuật ngữ quan trọng trong Regex. Các bạn cứ tưởng tượng nó như là **BIẾN** ở trong ngôn ngữ lập trình vậy. Nó sử dụng để lưu và lấy dữ liệu theo các group với điều kiện mà chúng ta đã đặt ra.

Ví dụ: Mình có một chuỗi `ANHTUANTUANANH TUANANH ANHTUAN`

Mình sử dụng Regex: `/(ANH)(TUAN)\2\1/` cái này nó sẽ tương đương tới Regex `/(ANH)(TUAN)TUANANH/`
=> kết quả tìm được sẽ là chuỗi `ANHTUANTUANANH` trong chuỗi `ANHTUANTUANANH TUANANH ANHTUAN`

Bạn chú ý ở đây `\2\1` ý nghĩa là; Nội dung group trong dấu ngoặc đầu tiên sẽ được quy định là `\1` -> nó cũng chính là `/(ANH)/`.

Tương tự: Nội dung trong group thứ hai sẽ được quy định là `\2` -> nó cũng chính là `/(TUAN)/`.

Và bạn hoàn toàn có thể đặt tên cho các Group này một cách tùy ý. Phần dưới mình sẽ giải thêm về cách đặt tên cho các group. 
Với mình thì mình thấy `Captures group` như các `BIẾN` cho các group. Và mình có thể tái sử dụng lại nó trong chính câu regex đó. Rất tiện đúng không.

Character classes — `\d` `\w` `\s` và `.`
--------------------------------

```markdown
\d         khớp với một ký tự đơn là một chữ số
\w         khớp với một ký tự là chữ (ký tự là chữ và số cộng với dấu gạch dưới. vd: `_2`)
\s         khớp với một ký tự khoảng trắng (bao gồm các tab và ngắt dòng)
.          khớp với bất kỳ ký tự nào
```

[Cùng Test thử syntax \d](https://regex101.com/r/cO8lqs/4)
[Cùng Test thử syntax \s](https://regex101.com/r/cO8lqs/5)


Sử dụng toán tử `.` trong một số trường hợp rất hữu dụng. Tuy nhiên hãy cần thận khi sử dụng nó nhe.

`\d`, `\w` và `\s` cũng có phủ định của nó tương ứng là `\D`, `\W` và `\S`.

Ví dụ: `\D` sẽ thực hiện khớp với kết quả thu được ngược với `\d`.

```markdown
\D         khớp với một ký tự không có chữ số
```

[Cùng Test thử những syntax trên nào](https://regex101.com/r/cO8lqs/5)


Để hiểu theo nghĩa đen, bạn phải **escape** các ký tự `^.[$()|*+?` bằng dấu gạch chéo ngược `\` trước chúng vì chúng có ý nghĩa đặc biệt.

```markdown
\$\d       khớp với một chuỗi có $ trước một chữ số。VD:　$1995
```

[Cùng Test thử những syntax trên nào](https://regex101.com/r/cO8lqs/9)

Lưu ý rằng bạn cũng có thể khớp **các ký tự không in được** như tab `\t`, dòng mới `\n`, xuống dòng `\r`.

Flags
----

Chúng ta đang học cách xây dựng một **Regex** nhưng lại quên một khái niệm cơ bản: **Flags** .

**Regex** thường xuất hiện theo dạng này `/abc/` mà trong đó mẫu tìm kiếm được phân tách bằng hai ký tự gạch chéo `/`. Cuối cùng, chúng ta có thể chỉ định một Flags với các value (chúng ta cũng có thể kết hợp chúng với nhau): 
VD: `/abc/g`, `/abc/i`, `/abc/gmi`

*   **g** (global) tìm tất cả kết quả cho đến khi nào hết chuỗi thì mới dừng tìm.
*   **m** (multi-line) khi sử dụng **flag** này `^` và `$` sẽ khớp với đầu và cuối của một dòng, thay vì toàn bộ chuỗi.
*   **i** (insensitive) không phân biệt chữ hoa chữ thường (ví dụ: `**/aBc/i**` sẽ khớp với `**AbC**`)

Intermediate - Trung cấp
================

Grouping và capturing — ()
-----------------

```markdown
a(bc)           dấu ngoặc đơn tạo capturing group có giá trị bc
a(?:bc)*        sử dụng ?: để vô hiệu hóa capturing group
a(?<foo>bc)     sử dụng ?<foo> đặt tên cho group là foot
```
[Cùng Test thử vd: a(bc)](https://regex101.com/r/cO8lqs/11)
[Cùng Test thử vd: a(?:bc)* ](https://regex101.com/r/cO8lqs/12)
[Cùng Test thử vd: a(?<foo>bc) ](https://regex101.com/r/cO8lqs/17)

Toán tử này rất hữu ích khi bạn cần trích xuất thông tin từ chuỗi hoặc dữ liệu bằng ngôn ngữ lập trình ưa thích của bạn. Bất kỳ lần xuất hiện nào được `Grouping và capturing` sẽ được hiển thị dưới dạng một **classical array**: chúng ta sẽ truy cập các value của chúng được chỉ định bằng cách sử dụng chỉ mục trên kết quả khớp.

Nếu chúng ta chọn đặt tên cho các nhóm (vd: `(?<foo>...)`), chúng ta sẽ có thể truy xuất các value của nhóm bằng cách sử dụng kết quả khớp giống như một từ điển trong đó các khóa sẽ là tên của từng nhóm.

Biểu thức ngoặc — `[]`
----------------------

```markdown
[abc]            khớp với một chuỗi có a hoặc b hoặc c -> giống như /a|b|c/
[a-c]            các ký tự hoặc a tới c -> giống ở trên /a|b|c/
[a-fA-F0-9]      một chuỗi đại diện cho một chữ số thập lục phân, không phân biệt chữ hoa chữ thường
[0-9]%           một chuỗi có ký tự từ 0 đến 9 trước dấu %
[^a-zA-Z]        một chuỗi không có chữ cái từ a đến z hoặc từ A đến Z. Trong trường hợp này, ^ được dùng làm phủ định của biểu thức đứng sau nó.
```
[Cùng Test thử vd: [abc]](https://regex101.com/r/cO8lqs/7)
[Cùng Test thử vd: [a-fA-F0-9]](https://regex101.com/r/cO8lqs/22)
[Cùng Test thử vd: [^a-zA-Z]](https://regex101.com/r/cO8lqs/10)

Greedy and Lazy match
-------------------------------

Các bộ định lượng (`* + {}`) là các toán tử Greedy (tham lam), vì vậy chúng mở rộng kết quả nhiều nhất có thể thông qua chuỗi được cung cấp. Greedy algorithm: thuật toán tham lam mà ae đã học trong môn `Toán Rời Rạc` ấy. 

<.+?>    khớp với bất kỳ ký tự nào một hoặc nhiều lần được bao bên trong < và > và được mở rộng khi cần.

[Cùng Test thử vd: <.+?>](https://regex101.com/r/cO8lqs/24)

Một giải pháp tốt hơn để tránh việc sử dụng `.` và giúp regex chặt chẽ hơn:

<[^<>]+>   khớp với bất kỳ ký tự nào ngoại trừ < hoặc > một hoặc nhiều lần được bao bên trong < và >

[Cùng Test thử vd: <[^<>]+>   ](https://regex101.com/r/cO8lqs/23)

Advanced - Nâng cao
================

Ranh giới - `\b` và `\B`
--------------------------

```markdown
\babc\b     thực hiện tìm kiếm một từ độc lập.
```
[Cùng Test thử vd: \babc\b](https://regex101.com/r/cO8lqs/25)

`\b` nó tương tự như `$`và `^` và phù hợp với các vị trí trong đó một bên là ký tự chữ (vd: `\w`) và bên còn lại không phải là ký tự chữ (ví dụ: đó có thể là phần đầu của chuỗi hoặc ký tự khoảng trắng).

Nó cũng có **phủ định** của nó là `\B`. Điều này khớp với tất cả các vị trí không khớp với `\b` và có thể khớp nếu chúng ta muốn tìm một mẫu tìm kiếm được bao quanh hoàn toàn bởi các ký tự chữ.

\Babc\B      matches only if the pattern is fully surrounded by word characters -> Try it!
**\\B** abc **\\B          **chỉ khớp nếu mẫu được **bao quanh hoàn toàn bởi các** ký tự từ -> [**Hãy thử!**](https://regex101.com/r/cO8lqs/26)

```markdown
\Babc\B    chỉ khớp nếu mẫu được bao quanh hoàn toàn bởi các ký tự chữ
```

[Cùng Test thử vd: \Babc\B](https://regex101.com/r/cO8lqs/26)

Tham chiếu ngược - `\1`
----------------------

```markdown
([abc])\1              \1 nó khớp với cùng một văn bản được khớp bởi capturing group đầu tiên
([abc])([de])\2\1      Có thể sử dụng \2 (\3, \4, v.v.) để xác định cùng một văn bản được khớp với capturing group thứ hai (thứ ba, thứ tư, v.v.)
(?<foo>[abc])\k<foo>   Đặt tên foo cho nhóm và tham chiếu nó (\k<foo>). Kết quả giống với regex đầu tiên
```

[Cùng Test thử vd: ([abc])\1 ](https://regex101.com/r/cO8lqs/14)
[Cùng Test thử vd: ([abc])([de])\2\1 ](https://regex101.com/r/cO8lqs/15)
[Cùng Test thử vd: ?<foo>[abc])\k<foo> ](https://regex101.com/r/cO8lqs/16)

Trước và sau — `(?=)` và `(?<=)`
----------------------------------------------

```markdown
d(?=r)       khớp với d nếu theo sau là r, nhưng r sẽ không phải là một phần của regex tổng thể
(?<=r)d      khớp với d chỉ khi d đứng trước r, nhưng r sẽ không phải là một phần của regex tổng thể
```

[Cùng Test thử vd: d(?=r) ](https://regex101.com/r/cO8lqs/18)
[Cùng Test thử vd: (?<=r)d ](https://regex101.com/r/cO8lqs/19)

Bạn cũng có thể sử dụng toán tử phủ định!

```markdown
d(?!r)       khớp với d nếu không có r theo sau, nhưng r sẽ không phải là một phần của regex tổng thể
(?<!r)d      khớp với d chỉ khi không có r đứng trước, nhưng r sẽ không phải là một phần của regex tổng thể
```

[Cùng Test thử vd: d(?!r) ](https://regex101.com/r/cO8lqs/20)
[Cùng Test thử vd: (?<!r)d ](https://regex101.com/r/cO8lqs/21)

Tóm tắt
===========

Như bạn đã thấy, các trường ứng dụng regex có thể có nhiều và chắc chắn rằng bạn đã nhận ra ít nhất một trong những ứng dụng thường thấy của nó trong sự nghiệp làm Dev của mình. 
Dưới đây là danh sách các trường hợp thường dùng: 

*   Validation dữ liệu (ví dụ: kiểm tra xem thời gian, email... có đúng định dạng không.)
*   Thu thập dữ liệu `data scraping` (đặc biệt là thu thập dữ liệu trên web, tìm tất cả các trang có chứa một nhóm từ nhất định theo một thứ tự cụ thể).
*   Sắp xếp dữ liệu `data wrangling` (chuyển đổi dữ liệu từ “thô” sang định dạng khác)
*   Phân tích cú pháp chuỗi `string parsing` (ví dụ: `catch` tất cả các tham số URL GET, `catch` văn bản bên trong một bộ dấu ngoặc đơn)
*   Thay thế chuỗi `string replacement` (các IDE cũng hỗ trợ chúng ta tìm kiếm và thay thế chuỗi bằng cách sử dụng Regex. Ví dụ: `/Employee.*Service/`)
*   Đánh dấu cú pháp, đổi tên tệp, packet sniffing và nhiều ứng dụng khác liên quan đến chuỗi (trong đó dữ liệu không cần ở dạng `text`)

Roundup
========================================
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
========================================
*     https://tuan200tokyo.blogspot.com/2022/12/blog62-giai-thich-cac-regex-syntax-quan.html