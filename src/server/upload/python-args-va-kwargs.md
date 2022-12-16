> Bài viết gốc https://manhhomienbienthuy.github.io/2019/09/20/python-args-kwargs.html

Thỉnh thoảng, khi nhìn vào định nghĩa hàm, bạn có thể sẽ bắt gặp những hàm sử dụng cú pháp rất đặc biệt, đó là `*args` và `**kwargs`.  Những người lần đầu tiên nhìn thấy cú pháp đó có thể sẽ cảm thấy ngỡ ngàng, không hiểu chúng có ý nghĩa gì và phải sử dụng như thế nào.

Có một điều chắc chắn là dù rất nhiều lập trình viên sử dụng cú pháp này, thì việc sử dụng tên `*args` và `**kwargs` là hoàn toàn không bắt buộc.  Chỉ có cú pháp với dấu `*` là bắt buộc mà thôi.  Nếu muốn chúng ta hoàn toàn có thể viết là `*var` và `**vars` cũng không gặp bất cứ vấn đề gì cả.  Tuy nhiên, `*args` và `**kwargs` được sử dụng phổ biến như một quy tắc ngầm vậy, do đó, hầu như mọi người đều sử dụng cách viết đó.

Trong bài viết này, chúng ta sẽ tìm hiểu xem chúng có ý nghĩa gì và cách sử dụng chúng như thế nào.

# Sử dụng trong định nghĩa hàm

Cả `*args` và `**kwargs` đều chủ yếu được sử dụng trong định nghĩa. Hai cú pháp đặc biệt này giúp chúng ta có thể truyền bao nhiêu tham số vào hàm cũng được.

Để dễ hiểu hơn, chúng ta hãy xem hàm sau.  Đây là một hàm đơn giản, nhận vào hai tham số và trả về tổng của chúng:

```python:pycon
>>> def foo(x, y):
...     return x + y
...
>>> foo(1, 2)
3
```

Hàm này hoạt động rất tốt, nhưng nó sẽ gặp vấn đề khi muốn mở rộng. Bây giờ, nếu muốn tính tổng của nhiều số hơn, chúng ta phải định nghĩa lại hàm với nhiều tham số hơn.

Đặc biệt, nếu muốn tính tổng có nhiều số nhưng số lượng không biết trước (chỉ biết được khi thực thi) thì cách định nghĩa hàm cơ bản này không còn phù hợp nữa.

Lúc đó chúng ta cần đến các phương thức khác.

## Sử dụng `*args`

Bây giờ, vấn đề của chúng ta là cần tính tổng của tất cả các số được truyền vào hàm, nhưng không biết trước số lượng của chúng.  Có nhiều cách để làm việc này.  Một cách khá đơn giản là chúng ta sẽ truyền vào hàm một list, hoặc một tuple các số cần tính tổng:

```python:pycon
>>> def foo(numbers):
...     result = 0
...     for n in numbers:
...         result += n
...     return result
...
>>> foo([1, 2])
3
>>> foo([1, 2, 3])
6
```

Cách làm này khá hiệu quả, ngoại trừ một bất tiện nhỏ là chúng ta cần tạo ra một list các số cần tính toán.  Điều này khá bất tiện trong các bài toán thực tế hơn, do các số cần tính toán nà nhiều khi cũng biến động chứ không cố định.

Đây là lúc là cú pháp `*args` cực kỳ hữu ích, bởi nó cũng giúp chúng ta có thể truyền một số lượng tham số tuỳ ý vào hàm:

```python:pycon
>>> def foo(*args):
...     result = 0
...     for x in args:
...         result += x
...     return result
...
>>> foo(1, 2)
3
>>> foo(1, 2, 3)
6
```

Cú pháp này tiện lợi hơn rất nhiều do chúng ta hoàn toàn không cần xây dựng một list để truyền vào hàm.  Tất cả các tham số truyền vào sẽ là phần tử của `args` và chúng ta có thể duyệt qua nó như một tuple bình thường.

Lưu ý rằng, `args` là một tuple chứ không phải list.  Tuy chúng có nhiều điểm tương đồng nhưng sự khác biệt cũng tương đối lớn: [list là mutable còn tuple là immutable](https://manhhomienbienthuy.github.io/2018/Aug/20/python-object-mutable-and-immutable.html).

Ngoài ra, chúng ta hoàn toàn có thể kết hợp `*args` với các tham số khác của hàm với ý nghĩa "những tham số còn lại".  Trong trường hợp này, `*args` sẽ phải đặt ở cuối cùng nếu không sẽ gặp lỗi ngay.

```python:pycon
>>> def foo(a, b, *args):
...     print('normal arguments', a, b)
...     for x in args:
...         print('another argument through *args', x)
...
>>> foo(1, 2, 3, 4)
normal arguments 1 2
another argument through *args 3
another argument through *args 4
```

Như vậy, nếu chúng ta biết chắc chắn một số lượng tham số nào đó, chúng ta có thể sử dụng tên tham số bình thường, và với các tham số còn lại chúng ta sẽ dùng `*args`.  Tôi hy vọng ví dụ trên đã đủ để giải thích cho cách làm này.

Về lý thuyết, chúng ta có thể đặt `*args` ở bất cứ đâu chúng ta muốn trong định nghĩa hàm.  Tuy nhiên, nếu đặt ở giữa, chúng ta sẽ không thể gọi hàm được bởi mọi lời gọi sẽ đều gặp lỗi.  Nguyên nhân là do `*args` sẽ nhận toàn bộ các tham số "còn lại" sau khi các tham số đầu tiên đã có giá trị, do đó, các tham số phía sau `*args` sẽ không bao giờ được truyền vào nữa.

```python:pycon
>>> def foo(a, *args, b):
...     print(a, b, args)
...
>>> foo(1, 2, 3, 4)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: foo() missing 1 required keyword-only argument: 'b'
```

## Sử dụng `**kwargs`

Giờ đây chúng ta đã hiểu về cách sử dụng `*args`.  Trong phần này, chúng ta sẽ nghiên cứu việc sử dụng `**kwargs`.

Cách sử dụng `**kwargs` cũng tương tự như như `*args`, tuy nhiên, nó không dùng cho các tham số thông thường truyền vào lần lượt, mà nó được sử dụng cho các tham số đặt tên (thuật ngữ chính xác là named arguments hoặc keyword arguments).

Các tham số đặt tên này khi định nghĩa cần kèm theo giá trị mặc định của nó.  Khi gọi hàm với các tham số đặt tên, nó linh hoạt cho phép chúng ta có thể gọi theo bất kỳ thứ tự nào của tham số cũng được (tất nhiên là gọi lần lượt như bình thường cũng không sao).

Các tham số dạng này cho phép gọi hàm linh hoạt hơn rất nhiều, thậm chí vì có giá trị mặc định, khi gọi hàm không cần truyền tham số cũng được.

```python:pycon
>>> def foo(a=0, b=1):
...     return a + b
...
>>> foo()
1
>>> foo(1, 2)
3
>>> foo(b=3, a=4)
7
```

Ở đây, nếu số lượng và tên của các tham số này không biết trước, chúng ta có thể sử dụng một cách "thông thường" là truyền vào hàm một dict làm tham số.  Khi đó, hàm có thể nhận số lượng giá trị truyền vào một cách tuỳ ý:

```python:pycon
>>> def foo(a):
...     for key, value in a.items():
...         print(key, value)
...
>>> foo({'a': 1, 'b': 2})
a 1
b 2
```

Cách làm này có nhiều bất tiện, thậm chí còn phức tạp hơn cả việc truyền vào một list cho hàm.  Và trong trường hợp này, `**kwargs` vô cùng cần thiết.

```python:pycon
>>> def foo(**kwargs):
...     for key, value in kwargs.items():
...         print(key, value)
...
>>> foo(a=1, b=2)
a 1
b 2
```

Như ví dụ ở trên, có thể thấy rằng việc sử dụng `**kwargs` đơn giản hơn rất nhiều.  Thậm chí việc gọi hàm cũng dễ dàng hơn sử dụng dict.

Lưu ý rằng, với cách sử dụng `**kwargs` thì `kwargs` trong hàm sẽ nhận giá trị là một dict với key là các tham số được truyền kèm giá trị tương ứng của chúng.

Ngoài ra, cũng tương tự như `*args`, `**kwargs` cũng hoàn toàn có thể kết hợp được với các tham số thông thường khác, và kết hợp với cả `*args` luôn.  Nhưng thứ tự khi khai báo các tham số này rất quan trọng và không thể thay đổi được.  Thứ tự đúng sẽ là:

1. Các tham số bình thường
2. `*args`
3. `**kwargs`

Việc kết hợp này rất phổ biến trong thực tế, nhưng một điều trớ trêu là các trường hợp mà tôi hay gặp lại thường dùng `*args` và `**kwargs` để bỏ qua các tham số không cần xử lý (các tham số quan trọng được khai báo là tham số như thông thường).

Điều này cực kỳ phổ biến với các hàm nhận đầu vào từ form GUI hay lập trình web, vì dữ liệu đầu vào dạng này thường rất đa dạng, mà không phải dữ liệu nào nhận được chúng ta cũng cần xử lý.

```python:pycon
>>> def foo(a, b, *args, **kwargs):
...     return a + b
...
```

Việc thay đổi thứ tự của `**kwargs` là không thể, nếu khai báo hàm với `**kwargs` trước bất kỳ một tham số nào, chúng ta sẽ gặp lỗi ngay:

```python:pycon
>>> def foo(a, **kwargs, b):
  File "<stdin>", line 1
    def foo(a, **kwargs, b):
                         ^
SyntaxError: invalid syntax
```

# Sử dụng để unpack

Thực ra unpack không phải chính xác là sử dụng `*args` và `**kwargs`, nhưng cú pháp thì hoàn toàn giống nhau.

[Unpack](https://www.python.org/dev/peps/pep-0448/) thực ra đã có từ Python 2, nhưng kể từ phiên bản 3.5, năng lực của nó đã được tăng lên hẳn vài bậc.

## Unpack khi gọi hàm

Trong phần trước, chúng ta đã thấy cách sử dụng `*args` và `**kwargs` để định nghĩa hàm.  Không chỉ định nghĩa, nó còn có thể được sử dụng để gọi hàm.

Để minh hoạ, hãy xem xét hai cách gọi hàm như sau:

```scala:pycon
>>> x = (1, 2, 3)
>>> print(x)
(1, 2, 3)
>>> print(*x)
1 2 3
```

Tôi nghĩ là kết quả trên đã phản ánh rất rõ cách hoạt động của unpack khi gọi hàm.  Nếu cần một ví dụ khác, tôi nghĩ nên sử dụng một hàm tự định nghĩa, hãy xem xét một hàm đơn giản như sau:

```python:pycon
>>> def foo(a, b, c):
...     print("a = %d, b = %d, c = %d" % (a, b, c))
...
>>> foo(1, 2, 3)
a = 1, b = 2, c = 3
```

Chúng ta có thể sử dụng unpack để truyền tham số vào cho hàm.  Nói một cách đơn giản thì cú pháp `*` được xử dụng với một đối tượng iterable, còn `**` chỉ có thể dùng được với dict mà thôi.

```html:pycon
>>> x = (4, 5, 6)
>>> foo(*x)
a = 4, b = 5, c = 6
>>> y = {'a': 7, 'b': 8, 'c': 9}
>>> foo(**y)
a = 7, b = 8, c = 9
```

Cú pháp `*` và `**` khi gọi hàm sẽ yêu cầu unpack giá trị được truyền vào trước khi thực hiện hàm đó.  Và khi unpack, hàm sẽ nhận các tham số đơn lẻ như các tham số riêng biệt vậy.

Một lưu ý nhỏ là khi gọi hàm, số lượng các tham số của hàm và số lượng giá trị unpack được phải khớp nhau, nếu không sẽ có lỗi xảy ra:

```cpp:pycon
>>> x = (1, 2, 3, 4)
>>> foo(*x)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: foo() takes 3 positional arguments but 4 were given
```

Như trong ví dụ trên, hàm chỉ nhận 3 tham số nhưng lại được truyền vào 4 giá trị nên chúng ta thấy lỗi đã xảy ra.

Trong các ví dụ trên, chúng ta thấy, việc unpack chủ yếu sử dụng cú pháp `*` mà ít khi sử dụng đến `**`.  Nguyên nhân cũng là vì `**` chỉ áp dụng được với dict.  Và thực tế thì `**` thường được dùng với dict trong trường hợp hàm có sử dụng keyword arguments:

```rust:pycon
>>> def foo(a=0, b=1, c=2):
...     print(a, b, c)
...
>>> y = {'c': 3, 'b': 4, 'a': 5}
>>> foo(**y)
5 4 3
```

Lưu ý rằng, dict cũng là một iterable nên nó hoàn toàn có thể sử dụng `*` để unpack khi truyền hàm.  Tuy nhiên, dùng `*` thì chúng ta sẽ chỉ truyền được key của dict vào cho hàm mà thôi:

```python:pycon
>>> foo(*y)
c b a
```

Ngoài ra, chúng ta hoàn toàn có thể unpack nhiều đối tượng khác nhau trong cùng một lời gọi hàm mà không gặp phải khó khăn gì (lưu ý duy nhất là số lượng giá trị sau khi unpack phải phù hợp với tham số của hàm):

```erlang:pycon
>>> list1 = [1, 2, 3]
>>> list2 = [4, 5]
>>> list3 = [6, 7, 8, 9]
>>> print(list1, list2, list3)
[1, 2, 3] [4, 5] [6, 7, 8, 9]
>>> print(*list1, *list2, *list3)
1 2 3 4 5 6 7 8 9
```

Bằng cách unpack nhiều giá trị như thế này, chúng ta đã làm "phẳng" các list này và truyền chúng như những giá trị riêng biệt vào hàm như trong ví dụ trên.

## Unpack khi gán biến

Có nhiều trường hợp khác mà unpack cực kỳ cần thiết.  Một nhu cầu khá thường xuyên của lập trình viên đó là chia giá trị một list (hoặc tuple) vào các biến riêng biệt.  Như trong ví dụ dưới đây, chúng ta cần lấy ra giá trị đầu tiên, giá trị cuối cùng và các giá trị khác.

Sử dụng unpack cực kỳ nhanh chóng

```html:pycon
>>> x = [1, 2, 3, 4, 5, 6]
>>> a, *b, c = x
>>> a
1
>>> b
[2, 3, 4, 5]
>>> c
6
```

Nếu không có unpack, chúng ta sẽ phải làm một việc khá lòng vòng kiểu như thế này:

```html:pycon
>>> a, b, c  = x[0], x[1:-1], x[-1]
>>> a
1
>>> b
[2, 3, 4, 5]
>>> c
6
```

Một vấn đề nho nhỏ là cú pháp `**` không áp dụng được khi gán biến để unpack một dict được.  Riêng điểm này thì ngôn ngữ JavaScript lại làm tốt hơn khi cho phép unpack cả một object với các thuộc tính cực kỳ phức tạp (hơi ngoài lề tí).

```javascript
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;
foo
// 42
bar
// true
```

Cú pháp unpack này có thể áp dụng với mọi đối tượng iterable, nhưng lưu ý rằng, đã gọi là unpack thì chúng ta phải chia giá trị ban đầu cho nhiều hơn một biến mới là unpack.  Python cũng yêu cầu chúng ta, khi unpack thì phải gán giá trị cho một list hoặc tuple.

Ngoài ra cũng không thể sử dụng nhiều lần dấu `*` để unpack trong cùng một phép gán.  Điều này cũng dễ hiểu thôi, vì nếu dùng nhiều dấu `*` thì biết các giá trị được phân chia như thế nào mà gán.

```html:pycon
>>> x = [1, 2, 3, 4, 5, 6]
>>> *a = x
  File "<stdin>", line 1
SyntaxError: starred assignment target must be in a list or tuple
>>> *a, *b = x
  File "<stdin>", line 1
SyntaxError: two starred expressions in assignment
```

Có một trick nhỏ để giúp chúng ta unpack rồi gán cho một biến duy nhất, tuy nhiên chắc không ai dùng trick này làm gì cả vì trông nó không được thông minh cho lắm (không ai lại phải dùng unpack để gán biến này thành biến kia cả):

```html:pycon
>>> *a, = x
>>> a
[1, 2, 3, 4, 5, 6]
```

## Các trường hợp unpack khác

Một điều thú vị là unpack có thể áp dụng với mọi đối tượng iterable, nó sẽ rất cần thiết nếu chúng ta cần làm "phẳng" 2 hay nhiều list, ví dụ:

```html:pycon
>>> list1 = [1, 2, 3]
>>> list2 = [4, 5]
>>> list3 = [6, 7, 8, 9]
>>> [*list1, *list2, *list3]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Với dict, chúng ta cần đến cú pháp `**` nếu muốn gộp hai dict với nhau:

```ruby:pycon
>>> dict1 = {"A": 1, "B": 2}
>>> dict2 = {"C": 3, "D": 4}
>>> {**dict1, **dict2}
{'A': 1, 'B': 2, 'C': 3, 'D': 4}
```

# Kết luận

Cú pháp `*args` và `**kwargs` cho phép chúng ta định nghĩa hàm có thể nhận số lượng tham số tuỳ ý.  Ngoài ra, cú pháp này còn có thể được sử dụng để unpack khi gọi hàm cũng như trong nhiều trường hợp khác.

Hy vọng bài viết giúp ích cho các bạn trong công việc.