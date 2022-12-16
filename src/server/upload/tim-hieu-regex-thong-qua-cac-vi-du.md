Regex là viết tắt của cụm từ Regular expressions, cực kỳ hữu ích trong việc trích xuất thông tin từ một văn bản bất kì hoặc kiểm tra đoạn văn bản nhập vào có đúng định dạng yêu cầu hay không, đặc biệt hơn là bạn có thể sử dụng nó trong hầu hết các ngôn ngữ lập trình (JavaScript, Java, VB, C #, C / C++, Python, Perl, Ruby, Delphi, R, Tcl,...). 

Trong bài viết này chúng ta sẽ tìm hiểu regex thông qua các ví dụ. Thử trên này nhé: https://regex101.com
## Kiến thức cơ bản
### Điểm neo — ^ và $
* **^The**: khớp với bất kì chuỗi nào bắt đầu với 'The'
* **end$**: khớp với bất kì chuỗi nào kết thức bằng 'end'
* **^The end$**: khớp chuỗi chính xác là 'The end'
* **roar**: khớp với bất kì chuỗi nào có chuỗi 'roar' bên trong
### Quantifiers — * + ? và {}
* **abc***: khớp với chuỗi 'ab', theo sau là không có gì hoặc nhiều chữ c (vd: 'ab', 'abc', 'abccc')
* **abc+**: tương tự như trên, nhưng ở đây bắt buộc phải có ít nhất 1 chữ c (vd: 'abc', 'abccc')
* **abc?**: tương tự cái đầu tiên, nhưng theo sau lại chỉ được có 1 chữ c (vd: 'ab', 'abc')
* **abc{2}**: khớp với chuỗi ab, theo sau là 2 chữ c (vd: 'abcc')
* **abc{2,}**: tương tự trên, nhưng theo sau có thể 2 hoặc nhiều chữ c hơn (vd: 'abcc', 'abccccc')
* **abc{2,5}** : tương tự trên, theo sau là 2 đến 5 chữ c
* **a(bc)*** : khớp với chuỗi có chữ a, theo sau là 0 hoặc nhiều cụm 'bc' (vd: 'ag', 'abc', 'abcbcbc')
* **a(bc){2,5}** : kết hợp của 2 cái trên, ta có chuỗi có chữ a, theo sau là 2 đến 5 cụm 'bc'
### Toán tử OR — | hoặc []
* **a(b|c)**: chuỗi có chữ a, theo sau là b hoặc c (vd: 'ab', 'ac', 'abd') 
* **a[bc]**: tương tự như trên
### Các kiểu kí tự — \d \w \s and .
* **\d** => kí tự chữ số (vd: 'a2b', 'a42c')
* **\w** => tất cả các kí tự (chữ hoa, chữ thường, chữ số, dấu gạch dưới)
* **\s** => các kí tự cách, bao gồm cả tab và xuống dòng
* **.**  => tất cả các kí tự

Tuy nhiên chúng ta nên cẩn thận khi sử dụng `.`, sử dụng các kiểu bình thường và phủ định của chúng sẽ chính xác hơn. Phủ định của `\d`, `\w`, `\s` là `\D`,`\W`, `\S`. 

Ví dụ như `\D` sẽ trả về kết quả nghịch đảo của `\d`, tức là là tất cả các kí tự không phải chữ số.

Ngoài ra để tránh nhầm lẫn thì với các kí tự đặc biệt `^.[$()|*+?{\` phải thêm `\` đằng trước, ví dụ một chuỗi có kí tự $, theo sau là 1 chữ số, ta viết `\$\d`.
## Kiến thức nâng cao
### Group — ()
* **a(bc)** => cái này phía trên cũng vừa dùng rồi, nhóm 2 kí tự b, c lại thành 1 nhóm, và bắt buộc phải nối tiếp bằng nhóm 'bc'
* **a(?:bc)*** => cái này gần giống cái trên, nhưng nó sẽ là kiểu không bắt buộc
* **a(?<foo>bc)** => dùng để đặt tên cho group, ví dụ như trong cùng 1 chuỗi regex mà có nhiều nhóm, thì việc đặt tên sẽ giúp bạn dễ phân biệt các nhóm hơn.

Toán tử này rất hữu ích khi cần lấy thông tin từ một chuỗi, thông tin sẽ được lưu dưới dạng mảng và có thể lấy ra thông qua index, hoặc là sử dụng `?<foo>` thì có thể truy xuất nhóm bằng tên của chúng.
### Bracket expressions — []
* **[abc]** => chuỗi có a hoặc b hoặc c, giống như a|b|c 
* **[a-c]** => giống trên, các kí tự từ a đến c 
* **[a-fA-F0-9]** => format của chuỗi số hệ thập lục phân
* **[0-9]%** => chuỗi có kí tự từ 0 đến 9 phía trước %
* **[^a-zA-Z]** => chuỗi có các kí tự không phải từ a đến z, A đến Z, `^` dùng để phủ định

Lưu ý là bên trong `[ ]` các kí tự đặc biệt, bao gồm cả `\` đều không có tác dụng.
### Ranh giới — \b và \B
**\babc\b** => thực hiện tìm kiếm toàn bộ từ, tức là chỉ tìm từ nào chính xác là `abc`

`\b`là một điểm neo giống như `^` hoặc `$`, nhưng neo cả 2 đầu, đi kèm với nó là phủ định `\B`, ví dụ như:
    
 **\Babc\B** sẽ khớp với các chuỗi mà có kí tự 'abc' được bao quanh bởi các kí tự khác (ví dụ: 'gabcy')
### Phía trước và phía sau  — (?=) và (?<=)
* **d(?=r)** => khớp với kí tự d chỉ khi phía sau nó là kí tự r, nhưng r không phải 1 phần của chuỗi regex (ví dụ: drone)
* **(?<=r)d** => tương tự trên, nhưng d phải đi ngay sau r (ví dụ: third)

Tương tự ta cũng có phủ định của nó là `(?!)` và `(?<!)`
* **d(?!r)** => khớp với kí tự d nếu phía sau nó không phải kí tự r, r cũng không phải 1 phần của chuỗi regex 
* **(?<!r)d** => tương tự trên, nhưng d không được đi sau r

## Tổng kết
Như bạn thấy regex có thể được dùng trong rất nhiều chỗ, dưới đây là một vài cái cơ bản:
* Xác thực dữ liệu: quen thuộc nhất chính là kiểm tra xem chuỗi nhập vào có đúng định dạng email không khi đăng nhập hay đăng ký.
* Quét dữ liệu: đặc biệt là quét web, kiểm tra tất cả các trang có chứa 1 bộ từ nhất định, cái này có thể dùng cho từ khóa trong SEO
* Sắp xếp dữ liệu: chuyển đổi dữ liệu từ định dạng "raw" sang định dạng khác.
* phân tích chuỗi: ví dụ bắt tất cả các tham số URL GET
* thay thế chuỗi

Bài viết khá đơn giản, hy vọng có thể giúp bạn hiểu và dễ dàng sử dụng regex.
Nguồn: https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285