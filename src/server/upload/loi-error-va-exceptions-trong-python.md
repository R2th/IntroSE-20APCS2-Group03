## 1. Lỗi cú pháp

Lỗi cú pháp, hay còn được biết tới là lỗi phân tích cú pháp, có lẽ là lỗi phổ biến nhất đối với các bạn mới bắt đầu học Python:

```text
>>> while True print('Hello world')
  File "<stdin>", line 1
    while True print('Hello world')
                   ^
SyntaxError: invalid syntax
```

Trình phân tích cú pháp lặp lại dòng xảy ra lỗi, cùng với một dấu `mũi tên` nhỏ trỏ vào điểm _sớm nhất_ tại nơi xảy ra lỗi. Lỗi được gây ra bởi \(hoặc ít nhất là đã phát hiện tại\) dấu hiệu _trước_ mũi tên. Trong ví dụ trên, lỗi được phát hiện tại hàm [`print()`](https://docs.python.org/3/library/functions.html#print) vì dấu hai chấm \(`':'`\) bị thiếu trước nó. Tên file và số dòng cũng được thông báo để bạn biết nơi bạn cần tìm để sửa chữa.

## 2. Ngoại lệ

Ngay cả khi câu lệnh hoặc biểu thức có cú pháp chính xác, khi thực thi cũng có thể gây ra lỗi. Lỗi được phát hiện trong quá trình thực thi được gọi là _ngoại lệ_, và nó không phải là **unconditionally fatal**, chúng ta sẽ tìm hiểu cách xử lí chúng trong các phần tiếp theo. Hầu hết các ngoại lệ không được xử lí bởi chương trình và dẫn đến các thông báo lỗi như các ví dụ dưới đây:&gt;&gt;&gt;

```text
>>> 10 * (1/0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
>>> 4 + spam*3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'spam' is not defined
>>> '2' + 2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Can't convert 'int' object to str implicitly
```

Dòng cuối cùng của mỗi thông báo lỗi cho biết lỗi gì đã xảy ra. Ngoại lệ có nhiều loại khác nhau, và loại của ngoại lệ được in ra như một phần của thông báo: loại của ngoại lệ trong các ví dụ trên lần lượt là [`ZeroDivisionError`](https://docs.python.org/3/library/exceptions.html#ZeroDivisionError), [`NameError`](https://docs.python.org/3/library/exceptions.html#NameError) và [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError). Chuỗi được in ra là tên của các ngoại lệ được tích hợp. Điều này đúng với tất cả các ngoại lệ tích hợp, nhưng không cần đúng với các ngoại lệ do người dùng định nghĩa \(mặc dù nó là một quy tắc hữu ích\). **Standard exception names are built-in identifiers \(not reserved keywords\).**

Phần còn lại của dòng cuối cùng trong thông báo lỗi cho biết chi tiết về loại lỗi và nguyên nhân xảy ra nó.

Phần trên của thông báo lỗi cho thấy nơi mà ngoại lệ xảy ra, dưới dạng một traceback stack. Có thể hiểu traceback stack theo vết ngược lại nơi đầu tiên xảy ra lỗi, từ đó liệt kê các dòng theo vết; tuy nhiên, nó sẽ không hiển thị các dòng được nhập từ đầu vào chuẩn.

[Built-in Exceptions](https://docs.python.org/3/library/exceptions.html#bltin-exceptions) liệt kê các ngoại lệ được tích hợp và ý nghĩa của chúng.

## 3. Xử lí ngoại lệ

Có thể viết chương trình có thể xử lí một ngoại lệ cụ thể. Ví dụ dưới đây yêu cầu người dùng nhập vào từ bàn phím, đến khi một số nguyên được nhập vào. Chương trình cũng cho phép người dùng có thể dừng chương trình bằng tổ hợp phím Ctrl - C \(hoặc bất kì tổ hợp phím nào hệ điều hành hỗ trợ\); lưu ý rằng cách làm này sẽ tạo ra ngoại lệ [`KeyboardInterrupt`](https://docs.python.org/3/library/exceptions.html#KeyboardInterrupt).&gt;&gt;&gt;

```text
>>> while True:
...     try:
...         x = int(input("Please enter a number: "))
...         break
...     except ValueError:
...         print("Oops!  That was no valid number.  Try again...")
...
```

Câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try) hoạt động như sau.

* Đầu tiên, _mệnh đề try_ \(các câu lệnh giữa từ khóa [`try`](https://docs.python.org/3/reference/compound_stmts.html#try) và [`except`](https://docs.python.org/3/reference/compound_stmts.html#except) keywords\) được thực thi.
* Nếu không có ngoại lệ nào xảy ra, _mệnh đề except_ bị bỏ qua và việc thực thi câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try) hoàn tất.
* Nếu một ngoại lệ xảy ra trong khi thực thi _mệnh đề try_, phần còn lại của _mệnh đề try_ bị bỏ qua. Sau đó, nếu kiểu của ngoại lệ khớp với kiểu ngoại lệ nằm sau từ khóa [`except`](https://docs.python.org/3/reference/compound_stmts.html#except), _mệnh đề except_ đó được thực thi. Sau đó thực thi tiếp các câu lệnh sau câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try).
* Nếu có ngoại lệ nào xảy ra mà không khớp với các ngoại lệ có trong mệnh đề except, nó được chuyển cho các câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try) ở bên ngoài; nếu vẫn không tìm thấy, nó là một _ngoại lệ không được xử lý_, chương trình sẽ dừng lại với một thông báo lỗi sẽ được hiển thị như ở trên.

Một câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try) có thể có nhiều _mệnh đề except_, để chỉ định việc xử lí cho các ngoại lệ khác nhau. Tối đa một trình xử lí ngoại lệ được thực hiện. Trình xử lí ngoại lệ chỉ xử lí các ngoại lệ xảy ra trong mệnh đề try tương ứng, không phải trong các trình xử lí ngoại lệ khác của cùng câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try). Một _mệnh đề except_ có thể xử lí nhiều ngoại lệ bằng cách đặt các ngoại lệ trong một tuple, ví dụ:

```text
... except (RuntimeError, TypeError, NameError):
...     pass
```

Một class trong mệnh đề [`except`](https://docs.python.org/3/reference/compound_stmts.html#except) tương thích với một ngoại lệ nếu nó cùng một lớp hoặc kế thừa từ một ngoại lệ. \(**but not the other way around**, một mệnh đề `except` sẽ chứa các lớp dẫn xuất không tương thích với lớp cơ sở\). Ví dụ, đoạn code sau đây sẽ in ra B, C, D theo thứ tự:

```text
class B(Exception):
    pass

class C(B):
    pass

class D(C):
    pass

for cls in [B, C, D]:
    try:
        raise cls()
    except D:
        print("D")
    except C:
        print("C")
    except B:
        print("B")
```

Lưu ý rằng nếu đảo ngược lại các mệnh đề except \(với `except B` được đưa lên đầu tiên\), kết quả sẽ là B, B, B - ngoại lệ được tìm thấy đầu tiên trong mệnh đề except sẽ được kích hoạt.

Mệnh đề except cuối cùng có thể bỏ qua kiểu ngoại lệ, dùng để bắt tất cả ngoại lệ xuất hiện. Sử dụng nó một cách cẩn thận, bởi vì nó bắt tất cả ngoại lệ mà không cho ta biết nguyên nhân của vấn đề làm xuất hiện ngoại lệ đó. Cách này có thể sử dụng để thông báo lỗi và tạo lại một ngoại lệ \(cho phép gọi một lời gọi để xử lí ngoại lệ này\):

```text
import sys

try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error: {0}".format(err))
except ValueError:
    print("Could not convert data to an integer.")
except:
    print("Unexpected error:", sys.exc_info()[0])
    raise
```

Câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try) … [`except`](https://docs.python.org/3/reference/compound_stmts.html#except) có thể có _mệnh đề else_. Khi có _mệnh đề else_, _mệnh đề else_ phải nằm phía dưới tất cả các mệnh đề except. Mệnh đề else hữu ích trong trường hợp mệnh đề try được thực hiện hoàn chỉnh mà không xảy ra bất kì ngoại lệ nào. Ví dụ:

```text
for arg in sys.argv[1:]:
    try:
        f = open(arg, 'r')
    except OSError:
        print('cannot open', arg)
    else:
        print(arg, 'has', len(f.readlines()), 'lines')
        f.close()
```

Mục đích của việc sử dụng mệnh đề [`else`](https://docs.python.org/3/reference/compound_stmts.html#else) là giảm việc thêm quá nhiều code vào mệnh đề [`try`](https://docs.python.org/3/reference/compound_stmts.html#try), vì nó sẽ tránh vô tình bắt được ngoại lệ không thể **raised** bởi mã lệnh đã được bảo vệ bởi câu lệnh [`try`](https://docs.python.org/3/reference/compound_stmts.html#try) … [`except`](https://docs.python.org/3/reference/compound_stmts.html#except).

Khi một ngoại lệ xảy ra, nó có thể có giá trị liên quan, còn được gọi là _đối số_ của ngoại lệ. Sự hiện diện và loại đối số phụ thuộc vào loại ngoại lệ.

Mệnh đề except có thể chỉ định một biến sau tên của ngoại lệ. Biến được ràng buộc với một instance ngoại lệ với các đối số được lưu trong `instance.args`. Để thuận tiện, các instance ngoại lệ định nghĩa [`__str__()`](https://docs.python.org/3/reference/datamodel.html#object.__str__) để các đối số có thể in trực tiếp mà không cần phải tham chiếu `.args`. Người ta cũng có thể tự tạo một ngoại lệ trước khi ném nó và thêm bất kì thuộc tính mong muốn vào nó.&gt;&gt;&gt;

```text
>>> try:
...     raise Exception('spam', 'eggs')
... except Exception as inst:
...     print(type(inst))    # lấy instance ngoại lệ
...     print(inst.args)     # các đối số được lưu trong .args
...     print(inst)          # __str__ cho phép in các args một cách trực tiếp,
...                          # nhưng nó thể bị ghi đè trong trường hợp lớp ngoại lệ con
...     x, y = inst.args     # giải nén args
...     print('x =', x)
...     print('y =', y)
...
<class 'Exception'>
('spam', 'eggs')
('spam', 'eggs')
x = spam
y = eggs
```

Nếu một ngoại lệ có đối số, chúng được in dưới dạng phần cuối cùng \('chi tiết'\) của thông báo của các ngoại lệ chưa được xử lý.

Các trình xử lý ngoại lệ không chỉ xử lý các ngoại lệ nếu chúng xảy ra ngay trong mệnh đề try, mà còn nếu chúng xuất hiện bên trong các hàm được gọi \(thậm chí gián tiếp\) trong mệnh đề try. Ví dụ:&gt;&gt;&gt;

```text
>>> def this_fails():
...     x = 1/0
...
>>> try:
...     this_fails()
... except ZeroDivisionError as err:
...     print('Handling run-time error:', err)
...
Handling run-time error: division by zero
```

## 4. Throw ngoại lệ

Câu lệnh [`raise`](https://docs.python.org/3/reference/simple_stmts.html#raise) cho phép người lập trình buộc một ngoại lệ cụ thể xảy ra. Ví dụ:&gt;&gt;&gt;

```text
>>> raise NameError('HiThere')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: HiThere
```

Đối số duy nhất sau từ khóa [`raise`](https://docs.python.org/3/reference/simple_stmts.html#raise) ám chỉ loại ngoại lệ sẽ được ném. Đối số này có thể là một instance ngoại lệ hoặc là một lớp ngoại lệ \(hoặc một lớp được dẫn xuất từ lớp [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception)\). Nếu một lớp ngoại lệ được truyền vào, nó có thể khởi tạo ngầm bằng cách gọi hàm khởi tạo của nó mà không cần đối số:

```text
raise ValueError  # rút gọn của "raise ValueError()"
```

Nếu bạn cần xác định liệu một ngoại lệ được ném nhưng bạn không có ý định sẽ xử lí nó, một cách đơn giản của câu lệnh [`raise`](https://docs.python.org/3/reference/simple_stmts.html#raise) cho phép bạn ném lại ngoại lệ:&gt;&gt;&gt;

```text
>>> try:
...     raise NameError('HiThere')
... except NameError:
...     print('An exception flew by!')
...     raise
...
An exception flew by!
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
NameError: HiThere
```

## 5. Ngoại lệ do người dùng định nghĩa

Chương trình có thể đặt tên các ngoại lệ của riêng chúng bằng cách tạo ra một lớp ngoại lệ mới \(xem thêm: [Lớp](https://docs.python.org/3/tutorial/classes.html#tut-classes)\). Các ngoại lệ thường được dẫn xuất từ lớp [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception), dù trực tiếp hay gián tiếp.

Các lớp ngoại lệ có thể được định nghĩa làm bất cứ thứ gì mà các lớp khác có thể làm, nhưng thường được giữ cho đơn giản. Thường các lớp ngoại lệ chỉ cung cấp một số thuộc tính cho phép thông tin về lỗi được rút ra bởi các trình xử lí ngoại lệ. Khi tạo một module có thể tạo ra một số lỗi riêng biệt, một hướng tiếp cận phổ biến là tạo một lớp cơ sở cho các ngoại lệ được định nghĩa bởi module đó, và các lớp con chỉ rõ các ngoại lệ cụ cho các điều kiện lỗi khác nhau:

```text
class Error(Exception):
    """Lớp ngoại lệ cơ sở của module"""
    pass

class InputError(Error):

    """Ngoại lệ được ném tương ứng với lỗi trong input
    Thuộc tính:
        expression -- biểu thức đầu vào xảy ra lỗi
        message -- giải thích về lỗi
    """

    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

class TransitionError(Error):

    """Ném ngoại lệ khi một cố gắng chuyển động trạng thái không được phép
    Thuộc tính:
        previous -- trạng thái lúc bắt đầu chuyển đổi
        next -- trạng thái mới đã thử
        message -- giải thích lý do vì sao chuyển động này không được phép
    """

    def __init__(self, previous, next, message):
        self.previous = previous
        self.next = next
        self.message = message
```

Hầu hết các ngoại lệ được định nghĩa với tên kết thức bằng "Error", giống với cách đặt tên của các ngoại lệ tiêu chuẩn.

Nhiều module chuẩn định nghĩa ngoại lệ của riêng chúng để báo cáo lỗi có thể xảy ra trong các hàm mà chúng định nghĩa. Thông tin thêm về các lớp được trình bày trong phần [Lớp](https://docs.python.org/3/tutorial/classes.html#tut-classes).

## Tham khảo
- https://docs.python.org/3/tutorial/errors.html