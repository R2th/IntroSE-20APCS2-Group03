Biểu thức chính quy (Regular expression viết tắt là: regex, regexp hay regxp)  là một nhóm các ký tự hoặc ký hiệu được sử dụng để tìm một mẫu cụ thể từ một văn bản, là một khuôn mẫu được khớp với chuỗi các từ, từ trái sang phải. Biểu thức chính quy được sử dụng để thay thế một văn bản trong một chuỗi, xác thực mẫu, trích xuất một chuỗi con từ một chuỗi dựa trên khớp mẫu và hơn thế nữa. Trong một lần tìm kiếm trên github thì mình thấy một repository khá hay về regex nên trong bài viết lần này mình muốn chia sẻ với các bạn. Bắt đầu nào :D
<br>
![](https://images.viblo.asia/6d3581ec-7704-4f04-a064-ce57a803de9c.png)
## Basic Matchers
- Biểu thức chính quy chỉ là một mẫu các ký tự mà chúng ta sử dụng để thực hiện tìm kiếm trong văn bản. Ví dụ, biểu thức chính quy "Viblo":
<br><br>
`Viblo` => [Viblo](https://regex101.com/r/29tbW5/1) is the awesome platform.
<br><br>
[Test biểu thức chính quy](https://regex101.com/r/29tbW5/1)
- Biểu thức chính quy khớp với chuỗi đầu vào bằng cách so sánh từng ký tự trong biểu thức chính quy với từng ký tự trong chuỗi đầu vào, lần lượt từng ký tự. Biểu thức chính quy thường phân biệt chữ hoa chữ thường nên biểu thức chính quy "Viblo" sẽ không khớp với chuỗi "viblo"
<br>
`Viblo` => [Viblo](https://regex101.com/r/itZ8vA/1) is the awesome platform, viblo.
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/1)
## Meta Characters
Meta Characters là các khối xây dựng của các biểu thức chính quy. Các ký tự meta không biểu diễn chính nó mà thay vào đó được diễn giải theo một cách đặc biệt nào đó. Một số ký tự meta có ý nghĩa đặc biệt và được viết bên trong dấu ngoặc vuông. Các ký tự meta như sau:
![](https://images.viblo.asia/01b5ab4c-c7c1-4e67-97b3-e365011a7b21.jpg)
### Full Stop (.)
Full stop `.` là ví dụ đơn giản nhất về ký tự meta. Kí tự meta `.` khớp với bất kì kí tự nào. Nó sẽ không khớp kí tự trả về (return) hoặc xuống dòng (newline)
<br>
Ví dụ: `.o` có nghĩa là: bất kỳ kí tự nào và phía sau kí tự đó là `o`
<br>
`.o` => Vib[lo](https://regex101.com/r/itZ8vA/2) is the awe[so](https://regex101.com/r/itZ8vA/2)me plat[fo](https://regex101.com/r/itZ8vA/2)rm, vib[lo](https://regex101.com/r/itZ8vA/2).
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/2)
### Character set ([])
Dấu ngoặc vuông được sử dụng để chỉ định bộ ký tự (Character set). Sử dụng dấu gạch nối bên trong bộ ký tự để chỉ định phạm vi của các ký tự. Thứ tự của phạm vi ký tự trong dấu ngoặc vuông không quan trọng.
<br>
Ví dụ: biểu thức chính quy `[Vv]iblo` có nghĩa là: chữ hoa `V` hoặc chữ thường `v`, theo sau là `iblo`
<br>
<br>
`[Vv]iblo` => [Viblo](https://regex101.com/r/itZ8vA/3) is the awesome platform, [viblo](https://regex101.com/r/itZ8vA/3).
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/3)
<br>
### Negated character set (^)
Biểu tượng dấu mũ biểu diễn sự bắt đầu của chuỗi, nhưng khi nó ở trong dấu ngoặc vuông, nó sẽ phủ định bộ ký tự. 
<br>
Ví dụ: biểu thức chính quy `[^l]o` có nghĩa là: bất kỳ ký tự nào ngoại trừ `l`, theo sau là ký tự `o`
<br>
`[^l]o` => Viblo is the awe[so](https://regex101.com/r/itZ8vA/4)me plat[fo](https://regex101.com/r/itZ8vA/4)rm, viblo.
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/4)
### The Star (*)
Biểu tượng `*` khớp 0 hoặc nhiều lần lặp lại của biểu thức trước. Biểu thức chính quy `a*` có nghĩa là: 0 hoặc nhiều lần lặp lại ký tự chữ thường trước a. Nhưng nếu nó xuất hiện sau một bộ ký tự thì nó sẽ tìm thấy sự lặp lại của toàn bộ bộ ký tự. Ví dụ: biểu thức chính quy [a-z]* có nghĩa là: bất kỳ số lượng chữ cái viết thường trong một hàng.
<br>
`[a-z]*` => V[iblo is the awesome platform, viblo.](https://regex101.com/r/itZ8vA/5)
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/5)
<br>
Ký tự `*` có thể được sử dụng với ký tự meta, để khớp với bất kỳ chuỗi ký tự nào `.*` . Ký tự `*` có thể được sử dụng với ký tự khoảng trắng `\s` để khớp với một chuỗi các ký tự khoảng trắng.
<br>
`\s*the\s` => Viblo is[ the ](https://regex101.com/r/itZ8vA/6)awesome platform, viblo.
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/6)
### The Plus (+)
Biểu tượng + khớp với một hoặc nhiều lần lặp lại của ký tự trước. 
<br>
Ví dụ: Biểu thức `o.+t` có nghĩa là biểu thức sẽ lấy bắt đầu từ kí tự `o` đầu tiên và các kí tự tiếp theo  đến chữ `t` cuối cùng trong câu
<br>
`o.+t` => Vibl[o is the awesome plat](https://regex101.com/r/itZ8vA/8)form, viblo.
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/8)
### The Question Mark (?)
Trong biểu thức chính quy các ký tự `?` làm cho ký tự trước là một tùy chọn.
<br>
Ví dụ: `[V]?iblo` có nghĩa là tùy chọn chữ `V`, theo sau là `iblo`
<br>
`[V]iblo` => [Viblo](https://regex101.com/r/itZ8vA/9) is the awesome platform, viblo.
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/9)
<br>
`[V]?iblo` => [Viblo](https://regex101.com/r/itZ8vA/10) is the awesome platform, v[iblo](https://regex101.com/r/itZ8vA/10).
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/10)
### Braces
Trong các dấu ngoặc nhọn thông thường còn được gọi là bộ định lượng được sử dụng để chỉ định số lần mà một ký tự hoặc một nhóm ký tự có thể được lặp lại. Ví dụ: biểu thức chính quy `[0-9]{2,3}` có nghĩa là: ghép ít nhất 2 chữ số nhưng không quá 3 (ký tự trong phạm vi từ 0 đến 9).
<br>
`[0-9]{2,3}` => The number was 9.[999](https://regex101.com/r/itZ8vA/11)7 but we rounded it off to [10](https://regex101.com/r/itZ8vA/11).0.
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/11)
<br><br>
Chúng ta có thể bỏ qua số thứ hai. Ví dụ: biểu thức chính quy `[0-9]{2,}` có nghĩa là: Ghép 2 chữ số trở lên. Nếu chúng tôi cũng xóa dấu phẩy, biểu thức chính quy `[0-9]{3}` có nghĩa là: Ghép chính xác 3 chữ số.
<br>
`[0-9]{2,}` => The number was 9.[9997](https://regex101.com/r/itZ8vA/12) but we rounded it off to [10](https://regex101.com/r/itZ8vA/12).0.
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/12)
<br><br>
### Capturing Group ()
Capturing Group là một nhóm các mẫu con được viết bên trong dấu ngoặc đơn (...). Chúng ta đặt bộ biểu thức sau một nhóm capturing thì nó lặp lại toàn bộ nhóm capturing.
<br>
Ví dụ: biểu thức chính quy `(ab)*` khớp với 0 hoặc nhiều lần lặp lại của ký tự `ab`.
<br>
Chúng ta cũng có thể sử dụng luân phiên `|` kí tự meta trong nhóm capturing.
<br>
Ví dụ: biểu thức chính quy `(l|s|f)o` có nghĩa là: ký tự chữ thường l, g hoặc f, theo sau là ký tự o
<br>
`(l|s|f)o` => Vib[lo](https://regex101.com/r/itZ8vA/14) is the awe[so](https://regex101.com/r/itZ8vA/14)me plat[fo](https://regex101.com/r/itZ8vA/14)rm, vib[lo](https://regex101.com/r/itZ8vA/14).
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/14)
### Dollar ($)
Biểu tượng `$` được sử dụng để kiểm tra xem ký tự khớp có phải là ký tự cuối cùng của chuỗi đầu vào không. 
<br>
Ví dụ: biểu thức chính quy `(lo\.)$` có nghĩa là: ký tự chữ thường l, theo sau là ký tự chữ thường  o, theo sau là ký tự `.` và bộ biểu thức phải là cuối chuỗi
<br>
`(lo\.)$` => Viblo. is the awesome platform, vib[lo](https://regex101.com/r/itZ8vA/15).
<br>
[Test biểu thức chính quy](https://regex101.com/r/itZ8vA/15)
## Lời kết
Trong bài viết này thì mình đã giới thiệu đến các bạn các charater cơ bản của regex trong phần tiếp theo một số character set khác nữa. Cảm ơn các bạn đã theo dõi bài viết <3