Python nổi tiếng vì cú pháp đơn giản của nó. Tuy nhiên, khi bạn đang học Python lần đầu tiên hoặc khi bạn đến với Python với một nền tảng vững chắc ở ngôn ngữ lập trình khác, bạn có thể tìm hiểu những thứ mà Python không cho phép. Nếu bạn nhận được lỗi `SyntaxError` khi chạy code của bạn thì bài viết này sẽ giúp đỡ bạn giải quyết vấn đề này. Xuyên suốt tutorial, bạn sẽ thấy các ví dụ điển hình về lỗi cú pháp trong Python hà học cách giải quyết chúng.

Đến cuối tutorial này, bạn có thể:
-  Xác định cú pháp không hợp lệ trong Python
-  Hiểu được traceback của `SyntaxError`
-  Sửa và phòng tránh lỗi cú pháp

### Invalid Syntax in Python

Khi bạn chạy code, đầu tiên trình biên dịch sẽ phân tích (parse) để convert nó thành Python byte code - đoạn code sau đó được chạy. Trình biên dịch sẽ tìm các lỗi về cú pháp trong bước đầu tiên trong quá trình xử lý chương trình, hay còn gọi là bước phân tích (parsing stage). Nếu trình biên dịch không thể parse đoạn code thành công thì có nghĩa là bạn đã sử dụng sai cú pháp ở đâu đó trong code của bạn. Trình biên dịch sẽ cố gắng chỉ cho bạn thấy chỗ mà lỗi đó xảy ra.

Khi bạn tiếp Python lần đầu tiên, bạn có thể bị nản khi bạn lỗi `SyntaxError`. Python sẽ giúp bạn xác định chỗ mà bạn sử dụng sai cú pháp nhưng traceback nó đưa ra có thể khó hiểu một chút. Thi thoảng, code nó trỏ tới hoàn toàn hợp lý.

>**Note**: Nếu code đúng cú pháp, bạn có thể nhận được các exception khác được raise lên mà không phải là `SyntaxError`. Để tìm hiểu thêm về các exception khác và cách xử lý chúng, xem ở [đây](https://realpython.com/python-exceptions/)

Bạn không thể xử lý lỗi cú pháp như các exception khác. Thậm chí, nếu bạn cố gắng đưa đoạn code sai cú pháp vào trong một khối `try...catch...`, bạn vẫn sẽ trình biên dịch raise lên lỗi `SyntaxError`.

### `SyntaxError` Exception and Traceback

Khi trình biên dịch gặp phải lỗi cú pháp, Python sẽ raise lên exception `SyntaxErrror` và cung cấp trace back với một số thông tin hữu ích để giúp bạn debug. Đây là đoạn code chứa lỗi cú pháp:

```
ages = {

    'pam': 24,

    'jim': 24

    'michael': 43

}

print(f'Michael is {ages["michael"]} years old.')
```

Bạn có thể thấy cú pháp không hợp lệ ở trong dict dòng 4. Mục thứ hai, `'jim'`, thiếu dấu phẩy. Nếu bạn chạy đoạn code, bạn sẽ thu được traceback sau:

```Python
$ python theofficefacts.py
File "theofficefacts.py", line 5
    'michael': 43
            ^
SyntaxError: invalid syntax
```

Chú ý rằng traceback sẽ chỉ ra lỗi ở dòng 5, chứ không phải 4. Trình biên dịch Python đã cố chỉ ra vị trí lỗi. Tuy nhiên, nó chỉ có thể trỏ tới nơi nó bắt được lỗi đầu tiên. Khi nhận được traceback và traceback trông có ý nghĩa, bạn cần nhìn loại đoạn code để xác định chỗ sai.

Trong ví dụ bên trên, không có với đề với việc thiếu dấu phẩy mà phụ thuộc vào việc cái gì theo sau nó. Ví dụ, việc không có dấu phẩy sau `'michael'` ở dòng 5 chẳng ảnh hưởng gì. Nhưng một khi trình biên dịch bắt gặp điều gì đó bất ổn, nó chỉ có thể trỏ ngay tới dòng code đầu tiên mà nó không hiểu.

>**Note:** Tutorial này giả định rằng bạn đã có kiến thức cơ bản về **traceback** trong Python. Để tìm hiểu thêm về traceback và cách đọc hiểu chúng, đọc bài viết [này](https://realpython.com/python-traceback/).

Có một vài thành phần của `SyntaxError` có thể giúp bạn xác định vị trí lỗi:

- **File name** - file mà lỗi cú pháp được tìm thấy
- **Line number** - nội dung dòng lỗi
- **Caret** - vị trí chính xác mà lỗi được bắt gặp
- **Error message** - xuất hiện ngay sau kiểu lỗi `SyntaxError`, nội dung lỗi giúp bạn xác định vấn đề

Trong ví dụ trên, file name là `theofficefacts.py`, line number là `5` và caret trỏ vào dấu nháy đơn của key `michael`. Traceback `SyntaxError` có thể không chỉ ra vấn đề thực sự nhưng nó sẽ chỉ tới vị trí đầu tiên mà trình biên dịch không hiểu.

Có hai exception khác bạn có thể sẽ thấy Python raise lên. Nó tương tự như `SyntaxError` nhưng dưới những cái tên khác:
1. `IndentationError`
2. `TabError`

Những exception này đều kế thừa từ `SyntaxError` nhưng chúng là những trường hợp đặc biệt liên quan đến indentation (thụt đầu dòng). `IndentationError` được raise lên khi các mức indent không khớp nhau. Còn `TabError` xuất hiện khi code của bạn sử dụng cả tab và space trong cùng một file. Chúng ta sẽ xét kỹ hơn đến những exception này trong phần sau.

### Common Syntax Problems

Khi chúng ta bắt gặp `SyntaxError` lần đầu tiên, việc biết lý do lỗi xảy ra và cách fix nó thực sự hữu ích. Trong các phần tiếp theo, chúng ta sẽ thấy một số lý do phổ biến mà `SyntaxError` có thể được raise lên và cách bạn có thể fix chúng.

#### Misusing the Assignment Operator (=)

Có vài trường hợp trong Python mà bạn không để gán các object ví dụ như với chuỗi và lời gọi hàm:

```Python
>>> len('hello') = 5
  File "<stdin>", line 1
SyntaxError: can't assign to function call

>>> 'foo' = 1
  File "<stdin>", line 1
SyntaxError: can't assign to literal

>>> 1 = 'foo'
  File "<stdin>", line 1
SyntaxError: can't assign to literal
```

Ví dụ đầu tiên cố gắng  gán giá trị `5` cho lời gọi `len()`. Message `SyntaxError` rất hữu ích trong trường hợp này. Nó nói rằng là bạn không thể gán một giá trị cho một lời gọi hàm.

Ví dụ thứ hai và thứ ba cố gắng gái một string với một số nguyên cho các chuỗi. Quy tắc tương tự đúng với các giá trị chuỗi khác. Một lần nữa, traceback chỉ ra vấn đề xảy ra khi bạn cố gắng gán một giá trị cho một chuỗi.

>**Note:** Các ví dụ bên trên thiếu dòng code được lặp lại và dấu mũ (^) chỉ ra vấn đề trong traceback. Exception và traceback mà bạn nhìn thấy sẽ khác khi bạn đang ở trong một phiên REPL so với việc bạn chạy code từ một file. Nếu code này nằm ở trong file, bạn sẽ nhận được dòng code lặp và dấu mũ.

Có lẽ là bạn sẽ chẳng bao giờ có ý định gán một giá trị cho một chuỗi hoặc lời gọi hàm. Các lỗi trên xảy ra chỉ khi bạn vô tình quên mất một dấu "=" khi bạn muốn thực hiện phép so sánh:

```Python
>>> len('hello') == 5
True
```

Đa số các trường hợp, khi Python nói rằng bạn đang thực hiện phép gán với một object mà không thể được gán, đầu tiên bạn nên kiểm tra chắc chắn rằng xem câu lệnh là một lệnh gán hay là một biểu thức Boolean. Bạn cũng có thể gặp vấn đề này khi bạn đang cố gắng gán một giá trị với các keyword. Chúng ta sẽ đề cập đến trường hợp này trong mục sau.

#### Misspelling, Missing, or Misusing Python Keywords

Các keyword trong Python là một tập các **protected word** có ý nghĩa đặc biệt trong Python. Đây là những từ khóa bạn không thể sử dụng như là các định danh, biến hoặc tên hàm. Chúng là một phần của ngôn ngữ và chỉ có thể sử dụng trong ngữ cảnh mà Python cho phép.

Những trường hợp mà bạn có thể nhầm lẫn sử dụng các keyword:

1. Sai chính tả
2. Thiếu keyword
3. Sử dụng sai keyword

Nếu bạn viết sai chính tả, bạn sẽ thấy lỗi `SyntaxError`. Ví dụ đầy là điều xảy ra khi bạn viết sai keyword `for`:

```Python
>>> fro i in range(10):
  File "<stdin>", line 1
    fro i in range(10):
        ^
SyntaxError: invalid syntax
```

Message là `SyntaxError: invalid syntax` - không quá hữu ích. Traceback trỏ tới vị trí đầu tiên mà Python phát hiện có cái gì đó sai. Để fix các lỗi kiểu như này, hãy chắc chắn rằng một keyword đều đúng.

Một vấn đề phổ biến khác chính là việc bạn quên keyword:

```Python
>>> for i range(10):
  File "<stdin>", line 1
    for i range(10):
              ^
SyntaxError: invalid syntax
```

Một lần nữa, message lại không hữu ích nhưng traceback lại trỏ tới đúng vị trí. Nếu bạn di chuyển dấu mũ ngược lại bạn sẽ đấy keyword `in` bị thiếu trong cú pháp của vòng lặp `for`.

Bạn cũng có thể sử dụng sai protected keyword. Hãy nhớ rằng, các keyword chỉ được sử dụng trong một số trường hợp nhất định. Nếu bạn sử dụng sai chúng bạn cũng sẽ nhận được lỗi sai cú pháp. Một ví dụ điển hình là việc sử dụng `continue` hoặc `break` ngoài vòng lặp. Điều này có thể dễ dàng xảy ra khi bạn di chuyển một đoạn code ra khỏi một vòng lặp:

```Python
>>> names = ['pam', 'jim', 'michael']
>>> if 'jim' in names:
...     print('jim found')
...     break
...
  File "<stdin>", line 3
SyntaxError: 'break' outside loop

>>> if 'jim' in names:
...     print('jim found')
...     continue
...
  File "<stdin>", line 3
SyntaxError: 'continue' not properly in loop
```

Ở đây, Python đã làm tốt việc thông báo chính xác lỗi cho bạn biết. Message "`'break' outside loop`" và "`'continue' not properly in loop`" giúp bạn biết việc mình cần làm.

Một ví dụ khác là nếu bạn cố gắng gán một keyword cho một biến hoặc sử dụng keyword để khai báo hàm:

```Python
>>> pass = True
  File "<stdin>", line 1
    pass = True
         ^
SyntaxError: invalid syntax

>>> def pass():
  File "<stdin>", line 1
    def pass():
           ^
SyntaxError: invalid syntax
```

Nếu bạn thử gắn một giá trị cho `pass` hoặc khi bạn định nghĩa một hàm với tên `pass`, bạn sẽ gặp lỗi `SyntaxError` và thấy message `invalid syntax` một lần nữa.

Giải quyết lỗi cú pháp này có thể khó hơn một chút bởi đoạn code nhìn bên ngoài trông thì khá ổn. Nếu code trông ổn mà bạn vẫn gặp lỗi `SyntaxError` thì bạn nên cân nhắc kiểm tra tên biến và hàm mà bạn muốn sử dụng.

Danh sách các protected keyword sẽ thay đổi theo phiên bản của Python. Ví dụ trong Python 3.6 bạn có thể sử dụng `await` làm tên biến hoặc tên hàm nhưng trong Python 3.7 thì nó lại nằm trong danh sách keyword. Bây giờ, nếu bạn thử sử dụng `await` làm tên biến hoặc tên hàm, lỗi `SyntaxError` sẽ bị raise lên nếu bạn sử dụng Python 3.7 hoặc cao hơn.

Một ví dụ khác của vấn đề này chính là `print` - có sự khác nhau giữa Python 2 và 3:

Phiên bản | Kiểu của `print` | Nhận giá trị
|----------|:-------------:|------:|
Python 2 | keyword | không
Python 3 | built-in function | có

`print` là một keyword trong Python 2 nên bạn không thể gán giá trị cho nó. Tuy nhiên trong Python 3, nó là một hàm có sẵn có thể được gán các giá trị.

Bạn có thể chạy code sau để thấy một danh sách keyword trong phiên bản Python mà bạn sử dụng:

```Python
import keyword
print(keyword.kwlist)
```

`keyword.iskeyword()` là một hàm hữu ích dùng để kiểm tra xem một từ có là keyword hay không:

```Python
>>> import keyword; keyword.iskeyword('pass')
True
```

#### Missing Parentheses, Brackets, and Quotes

Thông thường, nguyên nhân gây ra lỗi cú pháp trong Python là do thiếu dấu đơn, ngoặc vuông hoặc dấu nháy đơn/kép đóng. Những thiếu xót này khó phát hiện ra ở những dòng dài mà có nhiều dấu ngoặc đơn lồng nhau hoặc ở những khối code nhiều dòng. Bạn có thể phát hiện ra điều này nhờ sự giúp đỡ của traceback:

```Python
>>> message = 'don't'
  File "<stdin>", line 1
    message = 'don't'
                                     ^
SyntaxError: invalid syntax
```

Ở đây, traceback chỉ ra chỗ code không hợp lệ là ở vị trí `t'`. Để fix lỗi này, bạn có thể sử dụng hai cách:

1. Thêm ký tự thoát `\` trước dấu nháy đơn thứ hai (`'don\'t'`)
2. Bao quanh string với cặp dấu nháy kép (`"don't"`)

Một sai lầm thường gặp khác là quên đóng string:

```Python
>>> message = "This is an unclosed string
  File "<stdin>", line 1
    message = "This is an unclosed string
                                        ^
SyntaxError: EOL while scanning string literal
```

Lần này, dầu mũ trong traceback trỏ chính xác tới vị trí code có vấn đề. Thông báo `SyntaxError`, "`EOL while scanning string literal`", đã cụ thể và hữu ích hơn một chút trong việc xác định vấn đề. Điều này cũng có nghĩa là trình biên dịch Python đã đi tới tận cùng của dòng code đó. Để fix lỗi này, hãy đóng string với dấu nháy mà bạn đã sử dụng để mở string. Trong trường hợp này là dấu nháy kép `"`.

Việc thiếu dấu nháy trong các statement thuộc một [f-string](https://realpython.com/python-f-strings/) có thể dẫn tới lỗi cú pháp:

```Python
# theofficefacts.py
ages = {
    'pam': 24,
    'jim': 24,
    'michael': 43
}
print(f'Michael is {ages["michael]} years old.')
```

Ở đây, việc tham chiếu tới dict `ages` bên trong f-string bị thiếu dấu nháy kép đóng ở tham chiếu key. Traceback nhận được là:

```Shell
$ python theofficefacts.py
  File "theofficefacts.py", line 7
    print(f'Michael is {ages["michael]} years old.')
         ^
SyntaxError: f-string: unterminated string
```

Python xác định vấn đề và cho bạn biết vấn đề nằm ở trong f-string. Message "unterminated string" cũng chỉ ra vấn đề là gì. Dấu mũ trong trường hợp này chỉ trỏ tới vị trí bắt đầu của f-string.

Việc này có thể không có ý nghĩa khi mà dấu mũ trỏ tới khu vực của f-string nhưng nó lại không thu hẹp vị trí mà chúng ta cần quan tâm. Có một string chưa kết thúc bên trong f-string. Bạn chỉ việc tìm ra nó. Để fix lỗi này, hãy đảm bảo rằng tất cả các dấu nháy trong f-string và ngoặc nhọn phải đầy đủ.

Lỗi tương tự xảy ra khi thiếu ngoặc đơn và ngoặc vuông. Ví dụ, nếu bạn quên dấu ngoặc vuông dùng để đóng một list, Python sẽ phát hiện và trỏ tới đó. Tuy nhiên, không có nhiều sự khác biệt trong những trường hợp này. Trong ví dụ đầu tiên, chúng ta quên dấu ngoặc vuông đóng:

```Python
# missing.py
def foo():
    return [1, 2, 3

print(foo())
```

Khi chạy đoạn code này, bạn sẽ được nhắc nhở rằng có lỗi khi gọi `print()`:

```Shell
$ python missing.py
  File "missing.py", line 5
    print(foo())
        ^
SyntaxError: invalid syntax
```

Điều xảy ra ở đây chính là việc Python nghĩ là list gồm ba phần tử: `1`, `2` và `3 print(foo())`. Python sử dụng khoảng trắng (whitespace) để nhóm các thứ lại với nhau và bởi vì không có dấu phẩy và ngoặc vuông ngăn `3` với `print(foo())`, Python gộp chúng lại thành phần tử thứ ba của list.

Một biến thể nữa là thêm một dấu phẩy sau phần tử cuối cùng của list trong khi vẫn quên dấu ngoặc vuông đóng:

```Python
# missing.py
def foo():
    return [1, 2, 3,

print(foo())
```

Bây giờ bạn nhận được một traceback khác:

```Shell
$ python missing.py
  File "missing.py", line 6

                ^
SyntaxError: unexpected EOF while parsing
```

Trong ví dụ trước đó, `3` và `print(foo())` được nhóm lại thành một phần tử nhưng ở đây bạn thấy dấu phẩy sẽ ngăn cách chúng. Bây giờ việc gọi `print(foo())` được thêm vào như là phần tử thứ tư của list và Python chạy tới cuối file mà không có dấu ngoặc vuông đóng. Traceback nói cho bạn biết rằng Python đã đọc hết file (EOF) nhưng nó vẫn mong chờ một cái gì đó khác.

Trong ví dụ này, Python mong chờ một dấu ngoặc vuông đóng `]` nhưng dòng được nhắc và dấu mũ không thực sự hữu ích. Việc thiếu dấu ngoặc đơn hoặc dấu ngoặc đơn khiến Python rất khó để nhận ra. Đôi khi điều duy nhất bạn có thể làm là bắt đầu từ dấu mũ và quay ngược lại cho đến khi bạn phát hiện ra những thiếu sót.

#### Mistaking Dictionary Syntax

Trước đó bạn đã thấy rằng bạn có thể gặp lỗi `SyntaxError` nếu bạn quên dấu phẩy ở một phần tử dict. Một dạng khác của lỗi cú pháp với dict là việc sử dụng dấu "=" để ngăn cách các key và value thay vì ":":

```Python
>>> ages = {'pam'=24}
  File "<stdin>", line 1
    ages = {'pam'=24}
                 ^
SyntaxError: invalid syntax
```

Một lần nữa thông báo lỗi lại không hữu ích. Tuy nhiên, dòng nhắc lại và dấu mũ lại rất hữu ích! Chúng trỏ tới đúng ký tự có vấn đề.

Để fix lỗi này, bạn có thể thay thế các dấu "=" với dấu ":". Bạn cũng có thể chuyển sang dùng `dict()`:

```Python
>>> ages = dict(pam=24)
>>> ages
{'pam': 24}
```

Bạn có thể sử dụng `dict()` để khai báo dict nếu cú pháp này hữu ích hơn.

#### Using the Wrong Indentation

Có hai class con của `SyntaxError` dành riêng cho các vấn đề về indentation:

1. IndentationError
2. TabError

Trong khi các ngôn ngữ lập trình khác sử ngoặc nhọn để khai báo một khối code, Python lại sử dụng `whitespace` (khoảng trắng). Python sẽ raise lên lỗi `IndentationError` nếu có một dòng code trong khối có số khoảng trắng không đúng:

```Python
# indentation.py
def foo():
    for i in range(10):
        print(i)
  print('done')

foo()
```

Điều này có thể khá khó để phát hiện nhưng dòng thứ 5 chỉ bị thụt có hai khoảng trắng. May thay Python lại dễ dàng phát hiện và nói cho bạn biết vấn đề là gì:

```Shell
$ python indentation.py
  File "indentation.py", line 5
    print('done')
                ^
IndentationError: unindent does not match any outer indentation level
```

Mặc dù traceback trông khá giống traceback của `SyntaxError`, nó thực tế lại là một `IndentationError`. Thông báo lỗi rất hữu ích. Nó nói cho bạn biết mức indentation của dòng code không khớp các mức indentation khác. Bạn có thể sửa lỗi này một cách nhanh chóng bằng cách đảm bảo rằng đoạn code được thụt lùi sao cho đúng mức indentation mong muốn.

Một loại  `SyntaxError` khác là `TabError` - error nói cho bạn biết rằng có một dòng có sử dụng tab hoặc space cho mục đích indentation trong khi cái còn lại được dùng ở một nơi khác trong file. Điều này có thể bị bỏ qua cho đến khi Python chỉ ra lỗi đó cho bạn biết!

Nếu tab size trùng với số khoảng trắng trong mỗi mực indentation thì mọi thứ chẳng có vẻ gì lạ. Tuy nhiên, nếu một dòng được indent bằng space và một dòng khác lại được indent với tab thì Python sẽ chỉ cho bạn thấy vấn đề:

```Python
# indentation.py
def foo():
    for i in range(10):
        print(i)
    print('done')

foo()
```

Ở đây, dòng 5 được indent với một ký tự tab gồm 4 space. Khối code này có thể nhìn có vẻ hoàn hảo hoặc hoàn toàn sai, tùy vào setting hệ thống của bạn.

Tuy nhiên, Python sẽ để ý vấn đề này ngay lập tức. Nhưng trước khi bạn chạy đoạn code để xem Python sẽ nói cho bạn biết cái gì sai, hãy xem ví dụ sau:

```Shell
$ tabs 4 # Sets the shell tab width to 4 spaces
$ cat -n indentation.py
     1   # indentation.py
     2   def foo():
     3       for i in range(10)
     4           print(i)
     5       print('done')
     6   
     7   foo()

$ tabs 8 # Sets the shell tab width to 8 spaces (standard)
$ cat -n indentation.py
     1   # indentation.py
     2   def foo():
     3       for i in range(10)
     4           print(i)
     5           print('done')
     6   
     7   foo()

$ tabs 3 # Sets the shell tab width to 3 spaces
$ cat -n indentation.py
     1   # indentation.py
     2   def foo():
     3       for i in range(10)
     4           print(i)
     5      print('done')
     6   
     7   foo()
```

Chú ý là sự khác biệt trong hiển thị giữa ba ví dụ trên. Trừ dòng 5 sử dụng single tab thì các dòng code khác sử dụng 4 space cho một mức indentation. Độ rộng của tab thay đổi dựa vào **tab width** setting:

- **Nếu tab width là 4** thì lệnh `print` nhìn có vẻ nằm ngoài vòng lặp `for`. Console sẽ in "done" ở cuối vòng lặp.
- **Nếu tab width là 8**, chuẩn của rất nhiều hệ thống, thì lệnh `print` trông có vẻ nằm trong vòng lặp `for`. Console sẽ in "done" sau mỗi số.
- **Nếu tab width là 3** thì lệnh `print` nhìn có vẻ chẳng thuộc về đâu. Trong trường hợp này, dòng 5 không khớp với một mức indentation nào cả.

Khi bạn chạy đoạn code, bạn sẽ nhận được lỗi và traceback sau:

```Sheell
$ python indentation.py
  File "indentation.py", line 5
    print('done')
                ^
TabError: inconsistent use of tabs and spaces in indentation
```

Chú ý rằng ở đây ta nhận được `TabError` thay vì `SyntaxError`. Python chỉ ra dòng có vấn đề và cung cấp cho bạn một thông báo hữu ích. Nó nói cho bạn rằng tab và space bị sử dụng lẫn lộn cho indentation trong cùng một file.

Giải pháp cho vấn đề này là sử dụng hoặc là tab hoặc là space cho indentation, chứ không phải là cả hai.

#### Defining and Calling Functions

Bạn có thể gặp lỗi cú pháp khi bạn định nghĩa hoặc gọi hàm. Ví dụ, bạn sẽ thấy SyntaxError nếu bạn sử dụng ";" thay vì  ":" ở cuối cuối nghĩa hàm:

```Python
>>> def fun();
  File "<stdin>", line 1
    def fun();
             ^
SyntaxError: invalid syntax
```

Traceback ở đây rất hữu ích với việc dấu mũ trỏ tới đúng ký tự gây ra lỗi. Bạn có thể xóa xổ lỗi này bằng cách chuyển sang sử dụng ":".

Hơn nữa, các keyword argument trong định nghĩa hàm và gọi hàm cũng cần phải đúng vị trí. Keyword argument luôn đến sau các positional argument:

```Python
>>> def fun(a, b):
...     print(a, b)
...
>>> fun(a=1, 2)
  File "<stdin>", line 1
SyntaxError: positional argument follows keyword argument
```

Ở đây, một lần nữa, tin nhắn lỗi lại rất hữu ích khi nói chỉ rõ cho bạn thấy vị trí lỗi.

#### Changing Python Versions

Thi thoảng, code chạy tốt ở một phiên bản Python nhưng lại bị lỗi ở các version mới hơn. Điều này là vì những thay đổi trong cú pháp ngôn ngữ. Ví dụ điển hình nhất chính là lệnh `print` khi nó chuyển mình từ một keyword trong Python 2 thành một hàm built-in trong Python 3:

```Python
>>> # Valid Python 2 syntax that fails in Python 3
>>> print 'hello'
  File "<stdin>", line 1
    print 'hello'
                ^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print('hello')?
```

Đây là một trong các ví dụ mà tin nhắn lỗi cho `SyntaxError` được đưa ra có ý nghĩa nhất! Không chỉ nói cho bạn biết là bạn đang thiếu các dấu ngoặc đơn mà còn đưa ra giải pháp cho bạn.

Một vấn đề khác bạn có thể gặp chính là khi bạn đọc hoặc học về các cú pháp hợp lệ trong phiên bản mới hơn nhưng lại không hợp lệ trong phiên bản mà bạn đang dùng. Một ví dụ của việc này chính là cú pháp [f-string](https://realpython.com/python-f-strings/) - nó chỉ tồn tại trong các phiên bản từ 3.7 trở về sau:

```Python
>>> # Any version of python before 3.6 including 2.7
>>> w ='world'
>>> print(f'hello, {w}')
  File "<stdin>", line 1
    print(f'hello, {w}')
                      ^
SyntaxError: invalid syntax
```

Trong các phiên bản Python trước 3.6, trình biên dịch không hề hiểu gì về f-string và sẽ chỉ đưa ra một thông báo chung chung là "invalid syntax". Trong trường hợp này, vấn đề là code trông thì rất ổn nhưng nó lại được chạy với Python phiên bản cũ.

Cú pháp Python đang tiếp tục thay đổi, do đó sẽ có những tính năng mới được giới thiệu trong [Python 3.8](https://realpython.com/python38-new-features/):

- [Walrus operator (assignment expressions)](https://docs.python.org/3.8/whatsnew/3.8.html#assignment-expressions)
- [F-string syntax for debugging](https://docs.python.org/3.8/whatsnew/3.8.html#f-strings-support-for-self-documenting-expressions-and-debugging)
- [Positional-only arguments](https://docs.python.org/3.8/whatsnew/3.8.html#positional-only-parameters)

Nếu bạn muốn thử các tính năng mới này thì bạn hãy chắc chắn rằng mình sử dụng môi trường Python 3.8. Nếu không thì bạn sẽ gặp lỗi `SyntaxError`.

Python 3.8 cũng cung cấp `SyntaxWarning` mới. Bạn sẽ thấy cảnh báo này trong các trường hợp mà cú pháp hợp lệ nhưng vẫn có chút nghi ngờ. Ví dụ như khi bạn thiếu dấu "," giữa hai tuple trong một list. Việc làm như vậy có thể là hợp lệ về mặt cú pháp trong các phiên bản Python trước 3.8, nhưng code sẽ raise lên lỗi `TypeError` bởi vì một tuple là không callable (không thể gọi):

```Python
>>> [(1,2)(2,3)]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object is not callable
```

`TypeError` này có nghĩa là bạn không thể gọi một tuple như với một hàm - điều mà trình biên dịch nghĩ bạn đang cố gắng làm.

Trong Python 3.8, đoạn code này sẽ vẫn raise lên lỗi `SyntaxError` nhưng bây giờ bạn sẽ thấy một `SyxtaxWarning` nói rằng bạn cần phải giải quyết vấn đề:

```Python
>>> [(1,2)(2,3)]
<stdin>:1: SyntaxWarning: 'tuple' object is not callable; perhaps you missed a comma?
Traceback (most recent call last):   
  File "<stdin>", line 1, in <module>    
TypeError: 'tuple' object is not callable
```

Lời nhắn kèm theo `SyntaxWarning` thậm chí còn chỉ cho bạn hướng giải quyết vấn đề!

### Conclusion

Trong tutorial này, bạn đã thấy được các thông tin mà traceback của `SyntaxError`  cung cấp cho bạn. Bạn cũng đã thấy được các ví dụ về lỗi cú pháp và giải pháp cho chúng.

Khi viết code, bạn thử sử dụng một IDE hỗ trợ việc soát lỗi và cung cấp feedback hữu ích. Nếu bạn đưa những đoạn code này vào một trình IDE tốt, nó sẽ highlight các lỗi cú pháp cho bạn thấy.

Việc gặp lỗi cú pháp `SyntaxError` khi bạn đang học Python có thể khiến bạn nản lòng nhưng bây giờ bạn đã hiểu được các tin nhắn từ traceback và các dạng lỗi cú pháp trong Python mà bạn có thể gặp. Lần say khi gặp một lỗi `SyntaxError`, bạn sẽ sửa lỗi đó nhanh hơn!

Nguồn: https://realpython.com/invalid-syntax-python/