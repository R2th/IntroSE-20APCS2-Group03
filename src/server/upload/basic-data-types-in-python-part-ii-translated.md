![](https://images.viblo.asia/335ef808-e6eb-4404-9a57-aeef3060059d.png)

#### Here’s what you’ll learn in this tutorial:

- Bạn sẽ tìm hiểu về một số dữ liệu cơ bản **numeric**, **string** và **Boolean** được xây dựng sẵn trong Python
- Bạn cũng sẽ có được cái nhìn tổng quan về các hàm built-in của Python

### String

String là chuỗi các ký tự. Kiểu string trong Python là `str`.

Các chuỗi string được định giới bởi một cặp dấu nháy đơn hoặc nháy kép:

```Python
>>> print("I am a string.")
I am a string.
>>> type("I am a string.")
<class 'str'>

>>> print('I am too.')
I am too.
>>> type('I am too.')
<class 'str'>
```

String trong Python có thể chứa một lượng tùy ý các ký tự. Giới hạn duy nhất chính là tài nguyên bộ nhớ máy tính của bạn. Một string cũng có thể là rỗng:

```Python
>>> ''
''
```

Sẽ thế nào nếu bạn muốn thêm một ký tự nháy đơn như một phần của string? Ý nghĩ đầu tiên của bạn có thể là như sau:

```Python
>>> print('This string contains a single quote (') character.')
SyntaxError: invalid syntax
```

Như bạn thấy đấy, mọi việc không được như ý muốn. String trong ví dụ được mở bởi một ký tự nháy đơn, vì vậy Python sẽ giả định dấu nháy đơn tiếp theo, ở trong ngoặc đơn, là ký tự đóng. Do đó dấu nháy đơn cuối cùng gây ra lỗi cú pháp như đã thấy ở trên.

Nếu bạn muốn thêm các ký tự thuộc một trong hai kiểu nháy đơn, nháy kép đó, cách đơn giản nhất chính là định giới string với kiểu còn lại. Nếu một string chứa nháy đơn, hãy định giới nó với cặp nháy kép và ngược lại.

```Python
>>> print("This string contains a single quote (') character.")
This string contains a single quote (') character.

>>> print('This string contains a double quote (") character.')
This string contains a double quote (") character.
```

#### Escape Sequences in Strings

Thi thoảng bạn muốn Python hiểu một ký tự hoặc chuỗi các ký tự trong một string một cách hoàn toàn khác. Điều này có thể xảy theo một trong hai cách:

- Bạn muốn loại bỏ việc thông dịch đặc biệt đối với một số ký tự

- Bạn muốn áp dụng việc thông dịch đặc biệt đối với một số ký tự

Bạn có thể đạt được mục đích bằng cách sử dụng ký tự backslash (`\`). Ký tự backslash trong string ngụ ý rằng một hoặc nhiều ký tự theo sau nó sẽ được xử lý đặc biệt.

Hãy cùng xem điều này hoạt động thế nào.

<big>Suppressing Special Character Meaning</big>

Bạn đã thấy được các vấn đề mà chúng ta có thể đối mặt khi thêm các dấy nháy vào trong string. Nếu một string được định giới bởi các dấu nháy đơn, bạn không thể chèn các ký tự nháy đơn như là một phần của string bởi với string đó, dấu nháy đơn mang một ý nghĩa đặc biệt - kết thúc string:

```Python
>>> print('This string contains a single quote (') character.')
SyntaxError: invalid syntax
```

Đặt một backslash trước ký tự nháy trong string sẽ "giải thoát" nó và làm cho Python loại bỏ ý nghĩa đặc biệt của nó. Sau đó nó sẽ được hiểu đơn thuần là một ký tự nháy tầm thường.

```Python
>>> print('This string contains a single quote (\') character.')
This string contains a single quote (') character.
```

Điều tương tự cũng xảy ra với dấu nháy kép:

```Python
>>> print("This string contains a double quote (\") character.")
This string contains a double quote (") character.
```

Dưới đây là bảng các chuỗi thoát khiến cho Python loại bỏ việc thông dịch đặc biệt của một ký tự trong string:

| Chuỗi thoát | Ý nghĩa thông thường của (các) ký tự sau backslash | Ý nghĩa đặc biệt |
|:----------:|:-------------:|:------:|
| \' | Kết thúc string có định giới là `'` | Ký tự `'` tầm thường |
| \" | Kết thúc string có định giới là `"` | Ký tự `"` tầm thường |
| \newline | Kết thúc dòng đầu vào | newline bị bỏ qua |
| \\ | Mở đầu cho chuỗi thoát | Ký tự `\` tầm thường |

Thông thường, một ký tự newline sẽ kết thúc dòng đầu vào. Do đó nhắn *"Enter"* ở giữa string sẽ khiến cho Python nghĩ rằng nó chưa hoàn thiện:

```Python
>>> print('a
SyntaxError: EOL while scanning string literal
```

Để ngắt một string thành nhiều hơn một dòng, hãy sử dụng backslash trước mỗi newline, và các newline sẽ được bỏ qua:

```Python
>>> print('a\
... b\
... c')
abc
```

Để thêm ký tự blackslash tầm thường, hãy giải thoát nó với một backslash:

```Python
>>> print('foo\\bar')
foo\bar
```

**Applying Special Meaning to Characters**

Tiếp theo, giả sử bạn cần tạo một string có chứa ký tự tab. Một số trình chỉnh sửa văn bản (text editor) có thể cho phép bạn thêm một ký tự tab trực tiếp vào code của bạn. Nhưng rất nhiều lập trình viên coi đây là một thói quan tồi, vì một số lý do:

- Máy tính có thể phân biệt một ký tự tab và một chuỗi các ký tự trắng nhưng bạn thì không. Với người đọc code, tab và các ký tự trắng là không thể phân biệt bằng mắt.

- Một số trình chỉnh sửa văn bản được config để tự động loại bỏ các ký tự tab bằng cách mở rộng chúng thành số khoảng trắng tương ứng.

- Một số môi trường REPL Python sẽ không thêm tab vào trong code.

Trong Python (và hầu hết các ngôn ngữ phổ biến khác), ký tự tab có thể được xác định bởi chuỗi thoát `\t`:

```Python
>>> print('foo\tbar')
foo     bar
```

Chuỗi thoát `\t` khiến ký tự `t` mất ý nghĩa tầm thường của nó. Thay vào đó, tổ hợp này sẽ được hiểu như là một ký tự tab.

Đây là list các chuỗi thoát khiến Python phải áp dụng việc thông dịch đặc biệt kiểu như ví dụ trên:

| Chuỗi thoát | Ý nghĩa đặc biệt |
|:----------:|:-------------:|
| \a | Ký tự ASCII Bell (`BEL`) |
| \b | Ký tự ASCII Backspace (`BS`) |
| \f | Ký tự ASCII Formfeed (`FF`) |
| \n | Ký tự ASCII Linefeed (`LF`) |
| \N{<name>} | Ký tự từ database Unicode với tên `<name>` |
| \r | Ký tự ASCII Carriage Return (`CR`) |
| \t | Ký tự ASCII Horizontal Tab (`TAB`) |
| \uxxxx | Ký tự Unicode với giá trị hex 16-bit `xxxx` |
| \Uxxxxxxxx | Ký tự Unicode với giá trị hex 32-bit `xxxx` |
| \v | Ký tự ASCII Vertical Tab (`VT`) |
| \ooo | Ký tự với giá trị octal `ooo` |
| \xhh | Ký tự với giá trị hex `hh` |

Ví dụ:

```Python
>>> print("a\tb")
a    b
>>> print("a\141\x61")
aaa
>>> print("a\nb")
a
b
>>> print('\u2192 \N{rightwards arrow}')
→ →
```

Kiểu chuỗi thoát này thường được sử dụng để thêm các ký tự không thể sinh ra từ bàn phím hoặc không dễ đọc hoặc in.

**Raw String**

Một chuỗi thô đi sau `r` hoặc `R`. Với chuỗi thô, các chuỗi thoát sẽ không được dịch:

```Python
>>> print('foo\nbar')
foo
bar
>>> print(r'foo\nbar')
foo\nbar

>>> print('foo\\bar')
foo\bar
>>> print(R'foo\\bar')
foo\\bar
```

**Triple-Quoted Strings**

Hãy còn một cách định giới string khác trong Python. Triple-quoted string được định giới bởi các nhóm ba dấu nháy đơn hoặc ba dấu nháy kép. Các chuỗi thoát vẫn sẽ hoạt động trong triple-quoted string nhưng các dấu nháy đơn, nháy kép và newline có thể được thêm vào mà không cần giải thoát chúng. Điều này cung cấp một cách tiện dụng để tạo ra một string gồn các dấu nháy đơn và nháy kép:

```Python
>>> print('''This string has a single (') and a double (") quote.''')
This string has a single (') and a double (") quote.
```

Bởi vì newline có thể được thêm và không cần phải giải thoát, việc này cũng dẫn đến sự tồn tại của các string nhiều dòng:

```Python
>>> print("""This is a
string that spans
across several lines""")
This is a
string that spans
across several lines
```

Bạn sẽ thấy ở trong tutorial sắp tới về cấu trúc chương trình Python cách triple-quoted string được sử dụng để chèn comment vào code Python.

Nguồn: https://realpython.com/python-data-types/