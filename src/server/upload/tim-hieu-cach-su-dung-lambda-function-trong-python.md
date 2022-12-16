# Tìm hiểu cách sử dụng Lambda Function trong Python

Lambda trong python là anonymous function, cú pháp chặt chẽ và ngắn gọn hơn so với hàm thông thường.

Với bài viết này, chúng ta sẽ biết được:
- Lambda là như thế nào
- Lambda và function bình thường khác nhau như nào
- Cách viết một lambda function
- Các hàm trong thư viện sử dụng lambda
- Khi nào sử dụng hoặc tránh lambda

> Bài viết được dịch từ nguồn: https://realpython.com/python-lambda/#anonymous-functions
> Nội dung bài viết được test trên Python 3.6 nhé 

## Phép Tính Lambda (Lambda Calculus)

Biểu thức Lambda trong python hay các ngôn ngữ khác có nguồn gốc từ phép tính lambda, một phương pháp tính toán do Alozo Church tìm ra. Ở mục này, bạn sẽ biết phép tính lambda được giới thiệu khi nào và lý do tại sao nó là concept cơ bản lại xuất hiện trong hệ sinh thái Python.

### Lịch Sử
Alozo Church đã đề xuất phép tính lambda, một ngôn ngữ dựa trên sự trừu tượng năm 1930. Phép tính lambda có thể mã hóa bất kỳ phép tính nào. Nó là [Turing complete](https://simple.wikipedia.org/wiki/Turing_complete) nhưng trái với khái niệm Turing machine, nó ở dạng thuần khiết và không giữ bất kỳ trạng thái nào (Dịch tới đây cũng chưa hiểu gì)

Ngôn ngữ hàm số có nguồn gốc như logic toán học và phép tính lambda, các ngôn ngữ lập tình hàm dựa trên các mô hình tính toán trạng thái do Alan Turning phát minh. Hai mô hình tính toán là phép tính lambda và Turning machine có thể được dịch qua lại nhau. Sự tương đường này được gọi là gỉa thuyết Church-Turing.

Ngôn ngữ hàm số kế thừa trực tiếp triết lý phép itnhs lambda, áp dụng cách tiếp cận của lập trình nhấn mạnh vào tính trừu tượng, chuyển đổi dữ liệu, tính composition, và pureity (không có trạng thái và không có side effect). Ví dụ của ngôn ngữ hàm số là Haskell, Lisp, Erlang

Ngược lại, Turning Machine dẫn tới lập trình bằng ngỗn ngữ như Fortan, C, Python

Phong cách lập trình với câu lệnh (statements), điều khiển dòng chương trình từng bước từng với một. Cách tiếp cận này thức đẩy sự mutaion và yêu cầu quản lý trạng thái.

Python vôn dĩ không kết thừa ngôn ngữ hàm, nhưng nó đã áp dụng một số functional concept từ khá sớm. Tháng 1 năm 1994, `map()`, `filter()`, `reduce()` và toán tử lambda được được thêm vào ngôn ngữ này.

### Ví dụ đầu tiên

Đây là một vài ví dụ về style functional trong Python:

Một function được định nghĩa sử dụng keyword `def`:

```python=
def indentity(x):
    return x
```

`indentity()` nhận một tham số x và trả về tính nó

mặc khác, nếu sử dụng Lambda Python, bạn sẽ viết như sau:

```python=
lambda x: x
```

Trong ví dụ trên, biểu thức được tạo thành tuwf:
- Keyword: lambda
- Biến ràng buộc: x
- Body: x

Note: Trong nội dung bài viết này, một biến rạng buộc (bound variable) là một đối số tới lambda function
Mặc kahcs, một free variable không ràng buộc có thể được tham chiếu trong thân của biểu thức. Free variable có thể là một hàng số hoặc biết được định nghĩa bên trong phạm vi hàm.

Bạn có thể viết phưc tạp thêm một chú, một hàm mà trả về giá trị được cộng thêm một:

```python=
lambda x: x + 1
```

Bạn có thể dùng hàm trên với một đối số bằng cách bao quanh hàm và đối số của nó bằng dấu ngoặc đơn:

```python=
(lambda x: x + 1)(2)
```

Dưới đây là cách giải thích chi tiết của lambda.

```text=
(lambda x: x + 1)(2) = lambda 2: 2 + 1
                     = 2 + 1
                     = 3
```

Bởi vì lambda function là một biểu thức nên có đặt tên cho nó.
```python=
>>> add_one = lambda x: x + 1
>>> add_one(2)
3
```

Biểu thức trên tương ứng với cách viết như này:
```python=
def add_one(x):
    return x + 1
```

Tất cả các hàm này đều nhận một đối số duy nhất. Bạn có thể nhận thấy rằng, trong định nghĩa của lambdas, các đối số không có dấu ngoặc đơn xung quanh chúng. Các hàm đa đối số  được biểu diễn bằng lambdas Python bằng cách liệt kê các đối số và phân tách chúng bằng dấu phẩy (,) nhưng không bao quanh chúng bằng dấu ngoặc đơn:

```python=
>>> full_name = lambda first, last: f'Full name: {first.title()} {last.title()}'
>>> full_name('guido', 'van rossum')
'Full name: Guido Van Rossum'
```

Lambda function được gán cho `full_name` nhận 2 đối số và trả về 1 string chứa last name và first name. Như ở phía trên, lambda function không cần dấu ngoặc đơn và việc gọi hàm đơn giản như cách gọi thông thường.

## Anonymous Function (hàm ẩn danh)

Các từ sau có thể được sử dụng để thay thế cho nhau phụ thuộc vào ngôn ngữ:
- Anonymous functions
- Lambda functions
- Lambda expressions
- Lambda abstractions
- Lambda form
- Function literals

Nhưng về cơ bản nó chỉ ám chỉ hàm ẩn danh. Một hàm ẩn danh là một hàm không có tên. Trong Python, anonymous function có thể được tạo với keyword `lamda`. Mặc dụ không tên nhưng cơ bản nó có thể được gán cho một biến. Dưới đây là motọ lambda không tên nhận 2 đối số và trả về tổng

```python=
>>> lambda x, y: x + y
```
Để gọi nó, bạn sử dụng
```python=
>>> _(1, 2)
3
```

Ví dụ trên đang tận dụng tính năng chỉ dành cho trình thông dịch tương tác được cung cấp qua dấu gạch dưới (). Bạn có thể không code tương tự trong module. 

**Note:**
Trong trình biên dịch, dấu ngạch dưới được liên kết với biểu thức cuối cùng được thực hiện. Trong ví dụ trên, `_` trỏ tới lambda function. Để hiểu chi tiết thêm thì có thể tham khảo[ link](https://dbader.org/blog/meaning-of-underscores-in-python)

Ngoài ra, một pattern được sự trong ngỗn ngữ khác như JS là thực thi hàm ngay lập tức cũng được áp dụng với Lambda. Đây được gọi là Immediately Invoked Function Expression (IIFE, phát âm là “iffy”). Đây là một ví dụ:

```python=
>>> (lambda x, y: x + y)(2, 3)
5
```

Lambda function phái trên định nghĩa và thực khi với 2 đối số truyền vào. Nó trả lại tổng giá trị là 5. Python không khuyến khích sử dụng các biểu thức lambda dạng này. Nó chỉ đơn giản là kết quả của một biểu thức lambda có thể gọi được, không giống như phần thân của một hàm bình thường. Các lambda function thường được sử dụng với các hàm bậc cao hơn, các hàm này nhận một hoặc nhiều hàm làm đối số hoặc trả về một hoặc nhiều hàm. Một lambda function có thể là một hàm bậc cao hơn bằng cách lấy một hàm (bình thường hoặc lambda) làm đối số như trong ví dụ tiếp theo sau:

```python=
>>> high_ord_func = lambda x, func: x + func(x)
>>> high_ord_func(2, lambda x: x * x)
6
>>> high_ord_func(2, lambda x: x + 3)
7
```

Python có những HOF được dựng sẵn trong thư viện chuẩn như `map()`, `filter()` v.v... và bạn có thể sử dụng lambda function trong đó.

## Python Lambda và Function Thuần 

Từ trích dẫn này [Python Design and History FAQ](https://docs.python.org/3/faq/design.html) ta có thể thấy tổng thể liên quan đến việc sử dụng các hàm lambda trong Python:

> Không giống như lambda from - nơi chúng ta thêm các function trong các ngôn ngữ khác, Python lambda chỉ là một dạng viết tắt nếu bạn quá lười để viết một function.

Tuy nhiên, đừng để câu nói này ngăn cản bản sử dụng lambda function. Các nội dung sau sẽ chỉ rõ những điểm chung và sự kahcs biết giưa lambda và hàm thông thường.

### Function

Bạn có lẽ tự hỏi điều gì để phân biệt lambda function khi gán vào một biến và một hàm thông thường, về cảm quan thì không có gì. Hãy cùng xem các Python nhìn một function được build với một câu lệnh `retủn` và một hàm được xây dựng dưới dạng lambda:

```python=
>>> import dis
>>> add = lambda x, y: x + y
>>> type(add)
<class 'function'>
>>> dis.dis(add)
  1           0 LOAD_FAST                0 (x)
              2 LOAD_FAST                1 (y)
              4 BINARY_ADD
              6 RETURN_VALUE
>>> add
<function <lambda> at 0x7f30c6ce9ea0>
```

> `dis` là module phân tích mã bytecode Python được tạo bởi trình biên dịch Python

Bạn có thể thấy ràng `dis()` hiển thị ra dạng bytecode Python cho phép kiểm tra các hướng dẫn ở mức low-level mà trình thông dịch Python sẽ sử dụng trong khi thực thi chương trình.

Còn bây giờ hãy giá trị trả ra với một hàm thông thường:

```python=
>>> import dis
>>> def add(x, y): return x + y
>>> type(add)
<class 'function'>
>>> dis.dis(add)
  1           0 LOAD_FAST                0 (x)
              2 LOAD_FAST                1 (y)
              4 BINARY_ADD
              6 RETURN_VALUE
>>> add
<function add at 0x7f30c6ce9f28>
```

Nhìn hai kết quả, ta có thể nó giống nhau. Nhưng bạn chú ý rằng về cách đặt tên thì khác nhau: với hàm thông thường, tên hàm sẽ là `add` còn với lambda function nó chỉ là `lambda`.

### Traceback

Ở phần trước, trong bối cảnh của lambda function, Python không cung cấp tên cho hàm đó, mà chỉ hiển thị là `lambda`. Điều này có thể là một hạn chế mà ta cần xem xét khi một exception xảy ra và một traceback sẽ chỉ hiển thị `<lambda>`:

```python=
>>> div_zero = lambda x: x / 0
>>> div_zero(2)
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    File "<stdin>", line 1, in <lambda>
ZeroDivisionError: division by zero
```

Phía trên là traceback của exception được raise với lambda function. Và bên dươi là ví dụ với hàm thông thường

```python=
>>> def div_zero(x): return x / 0
>>> div_zero(2)
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    File "<stdin>", line 1, in div_zero
ZeroDivisionError: division by zero
```

Hàm bình thường bắn ra lỗi tương tự nhưng chỉ dẫn đến chính xác hơn vì nó cung cấp tên hàm, div_zero.

### Syntax

#### No Statements

Một lambda function không thể chứa bất kỳ câu lệnh nào. Trong lambda function, câu lệnh như `return`, `pass`, `raise` sẽ gây lên lỗi `SyntaxError`. Đây là ví dụ khi ta thêm `assert` bên trong lambda:

```python=
>>> (lambda x: assert x == 2)(2)
  File "<input>", line 1
    (lambda x: assert x == 2)(2)
                    ^
SyntaxError: invalid syntax
```

Ví dụ này kiểm tra x có giá trị là 2 hay không. Nhưng trình thông dịch xác định một Lỗi cú pháp trong khi phân tích cú pháp liên quan đến câu lệnh `asser` trong phần thân của lambda.

#### Single Expression

Đối lập với hàm thông thường, lambda function chỉ là một biểu thức. Mặc dù bên trong body của một lambda, bạn có thể mở rộng biểu thức trên nhiều dòng bằng cách sử dụng dấu ngoặc đơn hoặc một chuỗi nhiều dòng, những tóm lại nó vẫn chỉ có duy nhất một biểu thức: 

```python=
>>> (lambda x:
... (x % 2 and 'odd' or 'even'))(3)
'odd'
```

Ví dụ phái trên sẽ trả về `odd` nếu tham số là số chẵn và ngược lại. Nó được viết thành 2 dòng bởi vì ta đã đặt nó bên trong dấu ngoặc đơn, nhưng thật chất nó vẫn coi là một biểu thức duy nhất.

#### Type Annotations

Nếu bạn đã quen với việc sử dụng gợi ý kiểu đã có sẵn trong Python, thì bạn đã có thêm lý do để thích cá hàm thông thường hơn làm lambda function bởi lambda function không hỗ trợ điều này.
```python=
def full_name(first: str, last: str) -> str:
    return f'{first.title()} {last.title()}'
```
Bất kỳ lỗi liên quan tới type của đối số  với full_name () đều có thể bị bắt bởi các tool như `mypy` hoặc `pyre`, trong khi với hàm lambda  banj chir nhaanj được lỗi cú pháp:
```python=
>>> lambda first: str, last: str: first.title() + " " + last.title() -> str
  File "<stdin>", line 1
    lambda first: str, last: str: first.title() + " " + last.title() -> str

SyntaxError: invalid syntax
```

#### IIFE
Lambda function có IIFE trong khi hàm thông thường thì không. Tuy nhiên, tính năng này có thể không được sử dụng trong thực tế. Ví dụ về IIFE của lambda function. 
```python=
>>> (lambda x: x * x)(3)
9
```

### Đối số 

Giống như function bình thường, Lambda cũng cho phép truyền đối số. Ví dụ dưới đây sẽ cho ta thấy điều đó và 1 số cách truyền đối số.

```python=
>>> (lambda x, y, z: x + y + z)(1, 2, 3)
6
>>> (lambda x, y, z=3: x + y + z)(1, 2)
6
>>> (lambda x, y, z=3: x + y + z)(1, y=2)
6
>>> (lambda *args: sum(args))(1,2,3)
6
>>> (lambda **kwargs: sum(kwargs.values()))(one=1, two=2, three=3)
6
>>> (lambda x, *, y=0, z=0: x + y + z)(1, y=2, z=3)
6
```

### Decorator
Trong Python, 1 decorator là một pattern cho phép thêm một hành vi tới một hàm hoặc class. Nó thường được biểu diễn với `@decorator` trước một function.

```python=
def some_decorator(f):
    def wraps(*args):
        print(f"Calling function '{f.__name__}'")
        return f(args)
    return wraps

@some_decorator
def decorated_function(x):
    print(f"With argument '{x}'")
```

Trong ví dụ trên, hàm `some_decorator` là một function thêm một hành vi tới hàm `decorated_function`, vì thế khi gọi `decorated_function("Python")` kết quả sẽ là:

```shell=
Calling function 'decorated_function'
With argument 'Python'
```

`decorated_function()` chỉ in ra `With argument 'Python'`, nhưng với decorator, nó được add thêm hành vi khác là in thêm đoạn `Calling function 'decorated_function'`.

Một decorator có thể áp dụng vào một lambda như sau:

```python
# Defining a decorator
def trace(f):
    def wrap(*args, **kwargs):
        print(f"[TRACE] func: {f.__name__}, args: {args}, kwargs: {kwargs}")
        return f(*args, **kwargs)

    return wrap

# Applying decorator to a function
@trace
def add_two(x):
    return x + 2

# Calling the decorated function
add_two(3)

# Applying decorator to a lambda
print((trace(lambda x: x ** 2))(3))
```
`add_two()`, đã được decorated với @trace. Và với lambda nó được gọi thông qua việc bọn như ví dụ bên trên. và kết quả sẽ là 

```python=
[TRACE] func: add_two, args: (3,), kwargs: {}
[TRACE] func: <lambda>, args: (3,), kwargs: {}
9
```

## Lạm Dụng Lambda

Với một vài ví dụ ở bài viết này, có thể được coi là đang lạm dung lambda. Nếu bạn thấy mình đang cố gắng khắc phục điều gì đó mà lambda không hỗ trợ, đây có thể là dấu hiệu cho thấy một hàm bình thường sẽ phù hợp hơn. Ở phần này chúng ta sẽ xem một vài ví dụ nên tránh không sử dụng lambda.

### Raise exception

Raise một exception bằng lambda không phải phương án hay. 

```python=
>>> def throw(ex): raise ex
>>> (lambda: throw(Exception('Something bad happened')))()
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    File "<stdin>", line 1, in <lambda>
    File "<stdin>", line 1, in throw
Exception: Something bad happened
```

Nên tránh sử dụng kiểu này. Nếu bạn gặp đoạn code như này, hãy xem xét sửa lại nó.

### Cryptic Style

Như bất kỳ ngôn ngữ nào, bạn có thể khó tìm code mà bạn muốn nếu như style được sử dụng gây khó khăn cho việc đọc. Và lambda là một loại như vậy.

```python=
>>> (lambda _: list(map(lambda _: _ // 2, _)))([1,2,3,4,5,6,7,8,9,10])
[0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
```
`(_)` tham chieué tới một giá trị mà không cần dùng nó. Nhưng trong ví dụ này, `_` tham chiếu tới các biến khác nhau.  Và chúng ta hãy đặt tên cho các biến cho dễ nhìn.

```python=
>>> (lambda some_list: list(map(lambda n: n // 2,
                                some_list)))([1,2,3,4,5,6,7,8,9,10])
[0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
```

Phải thừa nhận rằng nó vẫn còn khó đọc. Vẫn tận dụng lambda, ta sẽ chuyển nó dưới dạng một hàm thông thường để dễ đọc hơn.

```python=
>>> def div_items(some_list):
      div_by_two = lambda n: n // 2
      return map(div_by_two, some_list)
>>> list(div_items([1,2,3,4,5,6,7,8,9,10])))
[0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
```

### Class

Bạn có thể nhưng không nên viết các phương thức lớp dưới dạng các hàm lambda của Python. Ví dụ sau hoàn toàn hợp lệ. Ví dụ: thay vì triển khai __str__ như một hàm thông thường, ta sử dụng lambda. Tương tự, `brach` và `year` là các thuộc tính cũng được triển khai với các hàm lambda, thay vì các hàm hoặc decorators:

```python=
class Car:
    """Car with methods as lambda functions."""
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

    brand = property(lambda self: getattr(self, '_brand'),
                     lambda self, value: setattr(self, '_brand', value))

    year = property(lambda self: getattr(self, '_year'),
                    lambda self, value: setattr(self, '_year', value))

    __str__ = lambda self: f'{self.brand} {self.year}'  # 1: error E731

    honk = lambda self: print('Honk!')     # 2: error E731
```

Khi chạy tool như `flake8`, một tool check style, nó sẽ hiển thị 

```shell=
E731 do not assign a lambda expression, use a def
```
Mặc dù `flake8` không chỉ ra vấn đề đối với việc sử dụng các hàm lambda của Python trong các thuộc tính, nhưng chúng rất khó đọc và dễ bị lỗi do sử dụng nhiều chuỗi như `brand` và `year`. Và hãy luôn dùng kiểu này để triển khai

```python=
def __str__(self):
    return f'{self.brand} {self.year}'
    
@property
def brand(self):
    return self._brand

@brand.setter
def brand(self, value):
    self._brand = value    
```

Theo nguyên tắc chung, hãy ưu tiên sử dụng các hàm thông thường hơn các biểu thức lambda. 

## Khi nào nên dùng Lambda

Lambda luôn là chủ để để tranh cái với những vấn đề khó đọc, khó hiểu. Nhưng hãy bỏ qua nó và tìm hiểu khi nào nên dùng lambda

### Hàm khởi tạo class
Lambda thường được sử dụng với `map()`, `filter()`. Dưới đây là một vài ví dụ về dùng lambda cho các hàm đó.

```python=
>>> list(map(lambda x: x.upper(), ['cat', 'dog', 'cow']))
['CAT', 'DOG', 'COW']
>>> list(filter(lambda x: 'o' in x, ['cat', 'dog', 'cow']))
['dog', 'cow']
>>> from functools import reduce
>>> reduce(lambda acc, x: f'{acc} | {x}', ['cat', 'dog', 'cow'])
'cat | dog | cow'
```

Bạn có thể đã đọc code tương tự như các ví dụ trên, và nó khá phổ biến khiến cho việc sử dụng nó hiệu quả hơn.

### Key Functions

Các key function trong Python là các hàm bậc cao sử dụng một `key` tham số làm đối số được đặt tên. `Key` nhận một hàm có thể là lambda. Hàm này ảnh hưởng trực tiếp đến thuật toán được điều khiển bởi chính hàm chính. Dưới đây là một số chức năng chính:

```python=
>>> ids = ['id1', 'id2', 'id30', 'id3', 'id22', 'id100']
>>> print(sorted(ids)) # Lexicographic sort
['id1', 'id100', 'id2', 'id22', 'id3', 'id30']
>>> sorted_ids = sorted(ids, key=lambda x: int(x[2:])) # Integer sort
>>> print(sorted_ids)
['id1', 'id2', 'id3', 'id22', 'id30', 'id100']
```

## Tổng hợp

Sau bài viết này bạn đã biết được:
- Lambda là gì
- Nguồn gốc, cách dùng
- Nên sử dụng hay tránh sử dụng như nào

Hy vọng bài viết này giúp ích trong quá trình làm việc với python của mọi người.