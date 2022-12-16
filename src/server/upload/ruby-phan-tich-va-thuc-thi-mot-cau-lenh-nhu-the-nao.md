Bạn đã bao giờ thắc mắc rằng một đoạn Ruby code như bên trên sẽ được thực thi như thế nào? nó được Ruby đọc và chuyển hóa bao nhiêu lần trước khi nó được thực thi?
Câu trả lời chính xác là **3 lần**. Cho dù đó là một đoạn code đơn giản như trên hay là cả một ứng dụng Rails khổng lồ thì cũng  đều được Ruby tách thành những phần nhỏ và chuyển hóa thành những format khác nhau tổng cộng **3 lần**.
Hãy cùng xem một ví dụ đơn giản sau:

```ruby
puts 2 + 3
# => 5
```

Khoảng thời gian từ khi bạn gõ lệnh `ruby -e "puts 2 + 3"` đến khi bạn thấy số `5` được hiện ra trên màn hình console, đó thật sự là quá trình dài mà rất nhiều kĩ thuật, công nghệ và thuật toán được dùng đến.

Bạn hãy xem hình ảnh bên dưới để rõ hơn **3 lần** đó:
 
![](https://images.viblo.asia/584dddaf-1c46-470c-a242-73cad1eceb8d.png)

- Đầu tiên, Ruby sẽ tiến hành **tokenize** đoạn code của bạn thành những `token`.
- Tiếp theo, những `token` đó sẽ được **parse** thành `Abstract Syntax Tree (AST) Node`.
- Cuối cùng, các `AST nodes` kia sẽ được **compile** thành các `bytecode` - một tập lệnh thực thi cấp thấp (tuy nhiên không phải là mã máy). Đây chính là tập lệnh được chạy trong máy áo Ruby (Ruby Virtual Machine).

Hãy cùng tìm hiểu xem trong từng bước đó, công việc cụ thể mà Ruby đã thực hiện ra sao nhé.

### Tokenizing
#### 1. Thuật toán
Giả sử bạn có một đoạn Ruby code sau:
```ruby
# simple.rb
10.times do |n|
  puts n
end
```
Chạy file trên bằng lệnh:
```
$ ruby simple.rb
```

Đầu tiên Ruby sẽ đọc file `simple.rb` và bóc tách nó thành những kí tự. ví dụ với dòng code đầu tiên.
```
[1] [0] [.] [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]
```

Ta có một con trỏ đọc từng kí tự của hàng đầu tiên. Ruby nhận ra rằng số `1` là bắt đầu của một số, nó sẽ tiếp tục đọc cho đến khi trỏ đến một kí tự không phải số.
```
 *
[1] [0] [.] [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]
```

Tiếp theo con trỏ đến số 0, vẫn là một con số, nên nó nhảy đến kí tự tiếp theo
```
     *
[1] [0] [.] [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]
```

Ruby nhận ra rằng . vẫn có thể là một phần của số thực và nhảy đến kí tự tiếp theo.
```
         *
[1] [0] [.] [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]
```

Đến khi gặp kí tự `t`, đây không phải là một phần của một con số, kết luận không còn con số nào sau dấu `.` trước đó nữa; Ruby nhận thấy rằng dấu `.` đó là thể là một phần của token khác, nên nó trỏ ngược về thêm một kí tự.
```
             *
[1] [0] [.] [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]

```
```
         *
[1] [0] [.] [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]
```

Lúc này Ruby sẽ convert những kí tự số nó đã đi qua ngay trước dấu `.` thành `(tINTERGER)` token như sau:
```
            *
(tINTEGER) [.] [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]
```

Ruby trỏ tiếp đến kí tự tiếp theo và convert kí tự nó vừa đi qua dấu `.` thành token `(.)`
```
                *
(tINTEGER) (.) [t] [i] [m] [e] [s] [ ] [d] [o] [|] [n] [|]
```

Và như thế, Ruby lướt qua chữ `times`, và convert nó thành token `(tIDENTIFIER)`
`IDENTIFER` không phải là reserved keyword (từ khóa) trong Ruby, nó dùng để chỉ một biến (var), một hàm (function), hay một method.
```
                              *
(tINTEGER) (.) (tIDENTIFIER) [d] [o] [|] [n] [|]
```

Tiếp theo, Ruby đọc qua chữ `do` và nhận ra đây là một reserved keyword (`keyword_do`)
```
                                           *
(tINTEGER) (.) (tIDENTIFIER) (keyword_do) [|] [n] [|]
```

Tiếp tục, đến khi xong hàng đầu tiên thì ta được dãy token như sau:
```
                                           *
(tINTEGER) (.) (tIDENTIFIER) (keyword_do) (|) (tIDENTIFIER) (|)
```

#### 2.Ripper

Đến đây, ta đã hiểu được ý tưởng cơ bản của **tokenize**, để tìm hiểu kỹ hơn, ta có thể dùng tool **Ripper** để kiểm tra toàn bộ token được sinh ra của một đoạn Ruby code.

```ruby 
require 'ripper'
require 'pp'
code = <<STR
10.times do |n|
 puts n
end
STR
puts code
pp Ripper.lex(code)
```

### Ruby parsing.

Sau khi tokenize đoạn code Ruby của bạn thành một đống token rồi, Ruby sẽ tiến hành parse các token đó thành các câu, cụm có nghĩa với nó. Ruby sử dụng một parser generator tên là Bison, bạn có thể tìm hiểu thêm ở [đây](https://www.gnu.org/software/bison/).

![](https://images.viblo.asia/ae25090f-9a24-4172-99d3-4d6520145868.png)https://images.viblo.asia/5f13bdd6-9496-47b3-a013-a8a731d1878d.png

Như các bạn thấy ở hình trên
- **Bison** sẽ sinh ra parser `parse.c` thông qua bộ luật được định nghĩa ở `parse.y` (bạn có thể tìm hiểu thêm về bộ luật đó ở [đây](https://github.com/ruby/ruby/blob/trunk/parse.y)).
- Sau đó `parse.c` sẽ thực hiện parse code Ruby thành các **AST Nodes** và biên dịch nó thành byte code, để máy ảo Ruby có thể thực thi.

Ta sẽ tìm hiểu kĩ hơn về thuật toán parsing được sử dụng trong ngôn ngữ Ruby **LALR** (Look Ahead Left-reserved Right-most deviration, thông qua ví dụ nho nhỏ sau đây.

#### LALR.

Giả sử bạn có câu `Tôi ăn nhưng tôi không làm.`, và một bộ luật để kiểm tra độ đúng đắn như sau:

```
(1) Sentence -> Phrase Conjunction Phrase
(2) Phrase -> PositivePhrase | NegativePhrase 
(3) PositivePhrase -> Subject Verb
(4) NegativePhrase -> Subject không Verb
(5) Subject -> "Tôi"
(6) Verb -> "ăn" | "làm"
(7) Conjunction -> "nhưng"
```

Cách parse câu trên theo **LALR** là như sau:

Cho [] bên trái là một cái grammar stack, ta có

```
[] | Tôi ăn nhưng tôi không làm

```

Đầu tiên, `Tôi` được cho vào stack

```
[Tôi] | ăn nhưng tôi không làm

```

Macth `Tôi` với luật (5), ta được

```
[Subject] | ăn nhưng tôi không làm
```

Sau đó ta không match với với luật nào tiếp cả, ta đọc token tiếp theo, lúc này token ngay top của stack là `ăn`.

```
[Subject ăn] | nhưng tôi không làm
```

Macth `ăn` với **Verb** theo luật (6), mà **Subject Verb** sẽ match với **PositivePhrase** theo luật (3), mà  **PositivePhrase** thì có thể sinh được **Phrase** theo luật (2). Cuối cùng ta được

```
[Subject Verb] | nhưng tôi không làm

[PositivePhrase] | nhưng tôi không làm

[Phrase] | nhưng tôi không làm

```

Tiếp tục, `nhưng` mactch với **Conjunction** theo luật (7) nên ta có

```
[Phrase Conjunction] | tôi không làm
```

Sau đó ta tiếp tục thì `tôi không là` sẽ match với **NegativePhrase** theo luật (4) , từ **NegativePhrase** lại sinh có thể sinh ra **Phrase** theo luật (2). Cuối cùng ta được như sau:
```
[Phrase Conjunction NegativePhrase] | 

[Phrase Conjunction Phrase] |
```

Và ta có được production mong muốn là luật (1) **Sentence**, câu `Tôi ăn nhưng không không làm` được chấp thuận với bộ luật trên.

### Ruby Compilation
Ruby compile code Ruby thành bytecode, còn gọi là **YARV** (Yet Another Ruby VM) instructions, và được thực thi ở **YARV**. Ở phần này chúng ta sẽ tìm hiểu quá trình compile đó diễn ra như thế nào?

#### Cấu trúc của YARV instruction.

YARV bản chất là một Stack-oriented VM, nói một cách khác YARV sử dụng một value stack (chứa các args và giá trị trả về) để thực thi `YARV instruction`, nên các instruction được xây dựng tận dụng stack này (push giá trị tính được vào stack hoặc pop giá trị cần tìm ra khỏi stack).

Ruby là một ngôn ngữ OOP hoàn toàn, tất cả các lệnh gọi đều có dạng `receiver.method(arguments)`, vì thế instructions được sinh ra luôn đi theo nguyên tắc sau.

- Đẩy **receiver** vào stack.
- Đẩy **arguments** vào stack.
- Đẩy **method** vào stack.

Ví dụ với lệnh `5 + 4`, YARV instructions được sinh ra như sau:

```
putobject   5
putobject   4
opt_plus    <callinfo!mid:+, argc:1, ARGS_SKIP>
```

`ARGS_SKIP` ở đây nhằm giúp YARV biết được tham số được truyền vào là những giá trị đơn giản (không phải là block hay một array các tham số).

Và với lệnh `puts 9`, YARV instructions được sinh ra như sau:

```
putself
putobject           9
opt_send_simple     <callinfo!mid:puts, argc:1, FCALL|ARGS_SKIP>
```

Để xuất YARV instruction như trên bạn có thể dùng lệnh
```ruby
RubyVM::InstructionSequence.compile("your-ruby-code-goes-here").diasam
```

#### Local Table

Khi compiler chạy, thông tin về các biến, tham số được Ruby lưu ở một nơi khác gọi là **Local Table**.

Giá sử ta có một đoạn code Ruby sau:

```ruby
a = "Viet"
b = "Nam"
puts a + b
```

Để sử dụng local table Ruby dùng hai lệnh `setlocal` (dùng để gán) và `getlocal` (dùng để tham chiếu)

Với đoạn code trên đầu tiên, áp dụng kiến thức ở phần trên và phần này, ta có instruction như sau.

```
# YARV Instructions                                 # Local Table

putstring   "Viet"
setlocal    3                                       [3] a
# Tương tự Với b
putstring   "Nam"
setlocal    2                                       [2] b
putself
getlocal    3
getlocal    2
send        :+
send        :puts
leave
```

#### Scoping
Ta sẽ tìm hiểu **compiler** sẽ làm gì với các lệnh Ruby bao gồm scope (như block với tham số).

Cách Ruby làm là nó sẽ chia đoạn code trên thành 2 block khác nhau (với 2 `local table` khác nhau), tạm gọi là 
- Outer block gồm `10.times { ... }`
- Inner block gồm `{ |n| puts n }`

```
# YARV Instructions                                                     # Local Table
putobject   10
send        <callinfo!mid:times, argc:0, block:block in <compiled>>
# Send đến method :times, không tham số với block (inner block bên dưới)
```

```
# YARV Instructions                             # Local Table
#                                               [2] n<Arg>
# putself
# getlocal  2
# send      :puts
```

`<Arg>` ở trên để đánh dấu cho YARV biết rằng n là một tham số thông thường.

Ngoài ra còn một số kí hiệu cho các loại tham số khác như:

- `<Arg>`: như trên, dành cho tham số thông thường. Ví dụ: def foo(a)
- `<Rest>`: dành cho các tham số dạng argument (splat *). Ví dụdef foo(*args)
- `<Post>`: dành cho các tham số sau splat arguments. Ví dụ: def foo(*args, a)
- `<Block>`: dành cho các tham số block được truyền vào bằng kí hiệu &. Ví dụ def foo(&block)
- `<Opt=i>`: dành cho các tham số có giá trị mặc định. Ví dụ def foo(a=1)

### Tổng kết

Trên đây, ta đã đi qua sơ lược cách mà Ruby sẽ phân tích và chạy bất kỳ một câu lệnh nào đó của mình. Hi vọng bài viết sẽ giúp các bạn có một cái nhìn tổng quan hơn về Ruby.

Cám ơn bạn đã theo dõi bài viết này.