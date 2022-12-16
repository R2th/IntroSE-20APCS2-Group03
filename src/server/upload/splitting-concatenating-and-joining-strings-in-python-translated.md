Có rất nhiều vấn đề trong cuộc sống mưu sinh và lập trình viên cũng không ngoại lệ, chúng ta cần phải đối mặt với string. String có thể đến rất nhiều dạng. Chúng có thể là text không có cấu trúc (unstructured text), username, mô tả sản phẩm, tên cột CSDL và những thứ khác mà chúng ta có thể mô tả bằng ngôn ngữ.

Với sự hiện diện gần như ở khắp mọi nơi của string, việc làm chủ các thao tác với string là tối quan trọng. May thay, Python đã làm cho việc thao tác với string trở nên đơn giản, đặc biệt là khi so sánh với các ngôn ngữ khác và thậm chí là với các phiên bản cũ của Python.

Trong bài viết này, bạn sẽ tìm hiểu một thao tác cơ bản nhất với string: split, concatenate và join. Bạn không những tìm hiểu cách sử dụng những công cụ này mà còn cả cái nhìn sâu rộng về cách thức hoạt động đằng sau chúng.

### Splitting Strings

Trong Python, string được biểu diễn bởi các đối tượng `str`. String có tính **bất biến (immutable)**: điều này có nghĩa là đối tượng được lưu trong bộ nhớ không thể bị thay đổi. Hai sự thật này có thể giúp bạn tìm hiểu (và sau đó là nhớ) cách sử dụng `.split()`.

Bạn đã đoán được hai đặc tính của string liên quan thế nào đến tính năng split trong Python chưa? Nếu bạn đoán `.split()` là một instance method bởi vì string là một kiểu đặc biệt, có thể bạn đúng! Ở một số ngôn ngữ khác (như Perl), string là đầu vào của hàm `.split()` thay vì một method gọi bởi chính string đó.

>**Note: Ways to Call String Methods**<br><br>
>Các method như `.split()` được trình bày ở đây chủ yếu như là các instance method. Chúng có thể được gọi như các static method nhưng điều này thực sự không lý tưởng. Ví dụ:
>```Python
># Avoid this:
>str.split('a,b,c', ',')
>```
>Cái này trông kềnh càng và khó sử dụng so với cách thông thường:
>```Python
># Do this instead:
>'a,b,c'.split(',')
>```
>Để tìm hiểu thêm về instance, class và static method trong Python, vui lòng bấm vào [đây](https://realpython.com/instance-class-and-static-methods-demystified/).

Còn đặc tính bất biến của string thì sao? Điều này nhắc nhở bạn rằng là các method của string không phải là các **thao tác in-place (in-place operation)**, mà chúng trả về một đối tượng mới trong bộ nhớ.

>**Note: In-Place Operations**<br><br>
>Các thao tác in-place là các thao tác trực tiếp thay đổi đối tượng được gọi. Một ví dụng phổ biến là method `.append()` được sử dụng với list: Khi bạn gọi `.append()` với một list, list đó sẽ bị thay đổi trực tiếp bằng cách thêm một list khác vào.

#### Splitting Without Parameters

Trước khi tìm hiểu sâu hơn, hãy cùng xét ví dụ sau:

```Python
>>> 'this is my string'.split()
['this', 'is', 'my', 'string']
```

Đây là một trường hợp đặc biệt của `.split()`. Khi không truyền vào separator, `.split()` sẽ coi khoảng trắng (whitespace) là separator.

Một đặc điểm khác của việc gọi `.split()` mà không truyền tham số chính là nó sẽ tự động bỏ đi các khoảng trắng ở đầu và cuối cũng như là các khoảng trắng liên tiếp. Hãy so sánh việc gọi `.split()` trong hai trường hợp có separator và không có separator:

```Python
>>> s = ' this   is  my string '
>>>
>>> s.split()
['this', 'is', 'my', 'string']
>>>
>>> s
' this   is  my string '
>>>
>>> s.split(' ')
['', 'this', '', '', 'is', '', 'my', 'string', '']
```

Điều đầu tiên cần chú ý chính là tính bất biến của string trong Python. Có thể thấy là giá trị của string `s` không hề bị thay đổi.

Điều thứ hai chính là việc gọi hàm `.split()` mà không có tham số sẽ trích xuất ra các từ trong câu và loại bỏ các khoảng trắng.

#### Specifying Separators

Mặt khác, `.split(' ')` tầm thường hơn rất nhiều. Khi có các khoảng trắng ở đầu hoặc ở cuối, bạn sẽ nhận được các string rỗng - bạn có thể thấy chúng ở phần tử đầu tiên và cuối cùng của list trả về.

Còn khi có nhiều separator liên tiếp (ví dụ như giữa "this" với "is" và giữa "is" với "my"), ký tự đầu tiên sẽ được coi như là separator, các ký tự tiếp theo sẽ được trả về là string rỗng.

>**Note: Separators in Calls to `.split()`**<br><br>
>Khi sử dụng khoảng trắng đơn (single space character) làm separator, bạn không bị giới hạn bởi kiểu ký tự hay chiều dài string mà bạn dùng để làm separator. Yêu cầu duy nhất chính là separator phải là string.

#### Limiting Splits With Maxsplit

`.split()` có một tham số không bắt buộc là `maxsplit`. Mặc định, `.split()` sẽ tạo ra tối đa lượng phân đoạn. Tuy nhiên khi bạn truyền giá trị cho `maxsplit`, số phân đoạn tối đa chính bằng giá trị này:

```Python
>>> s = "this is my string"
>>> s.split(maxsplit=1)
['this', 'is my string']
```

### Concatenating and Joining Strings

Một phép toán cơ bản khác là nối string.

#### Concatenating With the + Operator

Có vài cách để thực hiện điều này, tùy vào những thứ mà bạn muốn nhận được. Cách đơn giản và phổ biến nhất chính là sử dụng toán tử `+` để nối các string với nhau:

```Python
>>> 'a' + 'b' + 'c'
'abc'
```

Tiếp tục, về mặt toán học, bạn có thể nhân một string để lặp lại nó:

```Python
>>> 'do' * 2
'dodo'
```

Hãy nhớ rằng: string có tính bất biến! Nếu bạn nối hoặc nhân một string được lưu bởi một biến, bạn phải gán chuỗi mới cho một biến khác để lưu nó.

```Python
>>> orig_string = 'Hello'
>>> orig_string + ', world'
'Hello, world'
>>> orig_string
'Hello'
>>> full_sentence = orig_string + ', world'
>>> full_sentence
'Hello, world'
```

Một chú ý khác chính là việc Python không hỗ trợ ép kiểu ẩn đối với string:

```Python
>>> 'Hello' + 2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: must be str, not int
```

Đây là một điều mới mẻ nếu bạn mới nhảy sang Python từ một ngôn ngữ kiểu JavaScript.

#### Concatenating With ``.join()``

Một cách khác, mạnh mẽ hơn để nối các string: method `.join()`.

Trường hợp phổ biến chính là khi bạn có một iterable - ví dụ một list - gồm các string và bạn muốn kết hợp các string đó thành một string đơn. Tương tự `.split()`, `.join()` là một instance method của string:

```Python
>>> strings = ['do', 're', 'mi']
>>> ','.join(strings)
'do,re,mi'
```

Ở đây, chúng ta nối mỗi phần tử của `strings` bởi một dấu phẩy (`,` - joiner).

`.join()` thông minh ở chỗ nó thêm joiner vào giữa các string trong iterable mà bạn muốn nối, thay vì thêm joiner và cuối mỗi string. Điều này có nghĩa là nếu iterable có size là `1`, bạn sẽ không thấy joiner:

```Python
>>> 'b'.join(['a'])
'a'
```

Nguồn: https://realpython.com/python-string-split-concatenate-join/