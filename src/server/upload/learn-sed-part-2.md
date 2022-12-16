# Regular expression in sed

## Overview

Regular expression hay viết ngắn là regex là 1 mẫu (pattern) hỗ trợ tìm kiếm các đoạn substring phù hợp điều kiện cho trước trong 1 string khác, là công cụ mạnh trong việc tìm kiếm, xử lí text. Regex được sử dụng trong các câu lệnh như `grep` hay `sed` để thực hiện nhiệm vụ tìm kiếm, thay thế text 1 cách dễ dàng.

Regex thậm chí còn cho phép thực hiện việc thay thế, lặp lại các pattern đã match, sử dụng chúng như 1 biến, giúp thực hiện các thao tác phức tạp hơn.

```
$ printf "12\n34\n56\nHERE\n78\n90\n" | sed -n '/HERE/p'
HERE

# tương đương với

$ printf "12\n34\n56\nHERE\n78\n90\n" | grep 'HERE'
HERE

```

## Basic (BRE) & extended (ERE) regex

Basic regex và extended regex là 2 biến thể trong cú pháp regex. Mặc định thì cú pháp được sử dụng trong `sed` hay `grep` là basic regex. Để sử dụng được extended regex bạn cần thêm option `-E`. Với kinh nghiệm cá nhân thì mình thích dùng option `-E` này hơn vì nó sẽ dùng cú pháp regex gần với cú pháp regex được dùng trong các ngôn ngữ lập trình khác như Ruby hay Javascript

Điểm khác biệt giữa cú pháp basic và extend nằm trong cách xử lí đối với 1 vài kí tự đặc biệt sau:
`?`, `+`, `{}`, `|`

Những kí tự trên sẽ chỉ mang ý nghĩa đặc biệt của nó trong bản extend còn với bản basic nó chỉ đơn thuần là những kí tự tương ứng giống như các kí tự thông thường khác. Để tìm kiếm (match) các kí tự trên trong bản regex extend chúng ta cần escape bằng backslash `\`.

```
# BRE
$ printf "12+\n34+\n56+\n" | sed 's/[0-9]+/-/g'
1-
3-
5-
# ERE
$ printf "12+\n34+\n56+\n" | sed -E 's/[0-9]+/-/g'
-+
-+
-+
```

* Trong regex của sed không hỗ trợ `\d`, bạn có thể thay thế bằng `[[:digit:]]` nhưng viết `[0-9]` thì ngắn hơn

```
$ printf "12+\n34+\n56+\n" | sed -E 's/[[:digit:]]+/-/g'
-+
-+
-+
```

## Regex common syntax

Về cú pháp, cách sử dụng một số kí tự đặc biệt trong regex các bạn có thể tham khảo trên nhiều tài liệu khác về regex, trong mục này mình chỉ note lại một vài cách sử dụng cơ bản.

* . kí tự bất kì
* * Một, một chuỗi các kí tự cho trước lặp lại hoặc không có kí tự nào
* + Có 1 hoặc nhiều kí tự cho trước lặp lại
* ^ Kí tự bắt đầu (trong sed có ý nghĩa là bắt đầu pattern space)
* $ Kí tự kết thúc (trong sed có ý nghĩa là kết thúc pattern space)
* {i} Kí tự lặp lại `i` lần

## Character Classes & Bracket Expressions

Một bracket expression là 1 chuỗi các kí tự nằm trong phạm vi của `[` và `]`. Nó biểu diễn 1 pattern match kí tự nằm trong list các kí tự trong phạm vi của `[` và `]`. Riêng trường hợp kí tự đầu tiên sau dấu `[` là `^` thì lại mang 1 ý nghĩa khác đó là match các kí tự KHÔNG nằm trong list các kí tự trong phạm vi của `[` và `]`.

Ví dụ: để thay thế chuỗi kí tự `cat` hoặc `bat` thành `dog` ta có thể làm như sau

```
$ printf "cat\nbat\nmouse\n" | sed 's/[cb]at/dog/g'
dog
dog
mouse
```

Trong phạm vi của bracket expression ta có thể sử dụng `range expression` được tạo thành bởi 2 kí tự nối với nhau bởi dấu gạch ngang `-`. Nó cho phép bạn match 1 kí tự bất kí nằm trong `range` của 2 kí tự này.

```
$ printf "cat\nbat\nmouse\n" | sed 's/[a-s]/Z/g'
ZZt
ZZt
ZZuZZ
# thay thế các kí tự trong khoảng từ a đến s thành kí tự Z
```

Ngoài ra trong bracket expression ta có thể sử dụng 1 số class cho trước (bản thân tên class cũng nằm trong dấu ngoặc vuông).
Một số class được sử dụng:

* [:space:] : space
* [:blank:] : space và tab
* [:digit:] : chữ số
* [:alpha:] : chữ cái alphabet bao gồm cả chữ hoa chữ thường
* [:lower:] : chữ cái alphabet thường
* [:upper:] : chữ cái alphabet viết hoa
* [:punct:] : các dấu nằm trong bảng ASCII cơ bản bao gồm ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~ .

## Back-references & Subexpressions

Back-references biểu diễn một phần đã được đề cập trước đó trong regex, được thể hiện bằng cách dùng backslash `\` đi kèm với 1 số đơn. Phần được đề nhắc đến trước đó gọi là 1 subexpression - được bọc trong cặp ngoặc đơn `()`.

Back-references và subexpressions được dùng trong bản thân mẫu regex để tìm kiếm substring hoặc trong biểu thức thay thế khi có command `s` - substitute.

Ví dụ: loại bỏ các từ bị lặp liên tiếp 2 lần trong 1 câu

```
$ printf "there there are are multiple lexical errors in this line line" | sed 's/\([a-z]*\) *\1/\1/g'
there are multiplexical erors in this line
```

Phần subexpressions ở đây chính là đoạn nằm giữa 2 dấu ngoặc  `\([a-z]*\)` - do sử dụng ở dạng BSE nên cần có thêm backslash `\` trước mỗi dấu ngoặc. Còn back-referances trong ví dụ này được dùng ở cả phần biểu thức tìm kiếm substring cũng như phần thay thế `\1`. Nó có ý nghĩa đề cập đến đoạn subexpressions thứ 1. Trong các ví dụ phức tạp hơn ta có thể sử dụng `\2`, `\3` để đề cập đến các đoạn subexpressions thứ 2, thứ 3 khi mà biểu thức tìm kiếm có nhiều subexpressions.

# Advanced sed

## How sed work

Sed hoạt động dựa trên 2 vùng data `pattern space` (chính) và `hold space` (phụ trợ). Lúc khởi tạo cả 2 vùng này đều rỗng.

Một chu kì - cycle hoạt động của sed như sau:
- Đọc 1 dòng từ input stream (file hay standard input của terminal), bỏ đi dấu xuống dòng - trailing newline - bỏ phần vừa đọc được vào pattern space
- Thực hiện sed command  khi điều kiện về địa chỉ (address) thoả mãn
- Khi command quét hết pattern space, trừ phi option `-n` được sử dụng, nếu không in nội dung của pattern space ra output stream, thêm dấu xuống dòng trở lại.
- Bắt đầu 1 cycle mới

Thông thường pattern space sẽ bị xoá khi kết thúc 1 cycle trừ phi có command đặc biệt như `D` chẳng hạn. Về phần hold space sẽ luôn được giữ lại giữa các cycle. (tham khảo 1 số command đặc biệt như `h`, `H`, `x`, `g`, `G`)

## Multiline techniques

Bằng cách sử dụng những sed command như `D,G,H,N,P` chúng ta có thể thực hiện các thao tác xử lí với multiple line.
Thông thường câu lệnh `sed` hay được sử dụng để tìm kiếm theo dòng nhưng trong trường hợp mẫu pattern mà chúng ta tìm kiếm bị phân bố trên nhiều dòng thì các command trên mới thể hiện được sức mạnh của mình.

- D: xoá dòng khỏi pattern space cho đến dấu newline đầu tiên, restart cycle
- G: thêm dòng từ hold space vào pattern space đi kèm với dấu newline ở phía trước đoạn thêm vào
- H: thêm dòng từ pattern space   hold space, with a newline before it.
- N: thêm dòng từ input file vào pattern space.
- P: in dòng trong pattern space cho đến dấu newline đầu tiên

```
$ seq 4
1
2
3
4
$ seq 4 | sed -n 'N;p;D'
1
2
2
3
3
4
```

Hãy phân tích ví dụ trên từng bước một để có thể hiểu rõ hơn có chế của sed

1. sed đọc dòng đầu tiên vào pattern space. Lúc này trong pattern space sẽ chứa `1`
2. Đầu cycle, command N đọc dòng tiếp theo (dòng thứ 2) của input stream rồi cho vào pattern space dấu xuống dòng + nội dung dòng thứ 2. Sau bước này trong pattern space sẽ chứa `1`, `\n`, `2`
3. Command `p` in ra nội dung của pattern space. Bên ngoài màn hình hiện `1`, `\n`, `2`
4. Command `D` thực hiện xoá nội dung trong pattern space cho đến khi gặp dấu xuống dòng. Sau bước này pattern space sẽ chỉ còn chứa `2`
5. Tại cycle tiếp theo command `N` tiếp tục thêm dấu xuống dòng + nội dung dòng thứ 3 vào pattern space. Các bước sau đó lặp lại từ step 3

Một ví dụ khác thường được sử dụng trong thực tế - search and replace trên đối tượng là toàn bộ đoạn văn bản thay vì từng dòng một như bình thường.

Cú pháp để thực hiện việc này

```
sed '/./{H;$!d;} ; x ; s/REGEXP/REPLACEMENT/'
```

- Phần biểu thức đầu tiên `/./{H;$!d}` có tác dụng xác định phạm vi xử lí là toàn bộ các dòng không trống, sau khi các dòng đó được cho vào pattern space thì chuyển chúng qua hold space `H;`. Sau đó với mỗi dòng ngoại trừ dòng cuối cùng thì xoá pattern space và restart cycle - `$!d`.
- Command `x` và `s` chỉ được thực hiện trên các dòng trống. Command `x` thực hiện chuyển nội dung từ hold space về pattern space và command `s` thực hiện phép thay thế trên phạm vi là 1 paragraph chứ không còn là 1 dòng riêng lẻ nữa.