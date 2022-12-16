> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/08/20/python-object-mutable-and-immutable.html

Python là một ngôn ngữ cho phép chúng ta lập trình theo nhiều paradigm khác nhau: Lập trình thủ tục, lập trình hàm, lập trình hướng đối tượng, lập trình mệnh lệnh.  Điều đó có nghĩa là chúng ta có thể sử dụng Python để giải quyết các bài toán theo rất nhiều hướng tiếp cận khác nhau.

Trong bài viết này, chúng ta tạm thời chỉ tập trung vào cách thức lập trình hướng đối tượng mà thôi.  Đây cũng là một trong số những paradigm phổ biến nhất hiện nay.

# Python và lập trình hướng đối tượng

Trong lập trình hướng đối tượng, một đối tượng cần phải có những yếu tố sau:

- Thuộc tính
- Phương thức

Đây là kiến thức cơ bản nên có lẽ không cần bàn nhiều nữa.  Cái đáng nói ở đây là việc Python triển khai những thứ này như thế nào trong ngôn ngữ.  Python tập trung việc lập trình hướng đối tượng vào việc tạo ra các code dễ dàng tái sử dụng.  Tư tưởng này được gọi là DRY (Don't Repeat Yourself), một tư tưởng rất phổ biến trong mọi ngôn ngữ nói chung.

Trong Python, việc lập trình hướng đối tượng sao cho DRY tuân theo những nguyên tắc sau, đây cũng những tính chất quan trọng nhất của lập trình hướng đối tượng:

- **Kế thừa**: Đây là một trong những tính chấtgiúp chúng ta tái sử dụng code.  Bằng cách kế thừa, chúng ta có thể tạo ra các lớp đối tượng mới từ những lớp có sẵn mà không cần phải code lại từ đầu.
- **Đóng gói**: Các thuộc tính cũng như phương thức của một đối tượng được là của riêng đối tượng đó.  Những đối tượng khác chỉ có thể truy cập đến những thuộc tính hay phương thức được public mà thôi.
- **Đa hình**: Cho phép các đối tượng cho chung cách thức hoạt động có thể có những hành động khác nhau tuỳ vào thuộc tính của chúng.

# Class

Class (lớp đối tượng) là tập hợp các đối tượng có một đặc điểm chung nào đó.  Tất nhiên là đặc điểm chung đó phải được xây dựng dựa trên bài toán cụ thể chứ không phải đặc điểm bất kỳ nào.

Chúng ta có thể định nghĩa một class trong Python như sau:

```pycon
>>> class Foo:
>>>     pass
>>>
```

Python cho phép chúng ta tạo ra một class trống mà không có thuộc tính cũng như phương thức này.  Từ class này, chúng ta có sẽ tạo ra các instance, đó chính là các đối tượng được nhắc đến thường xuyên trong mô hình lập trình này.

# Đối tượng

Trong Python, chúng ta có thể hiểu đối tượng là một vùng bộ nhớ chứa tất cả những dữ liệu về đối tượng đó.  Một biến được gán cho một đối tượng đơn giản là nó có thông tin để lấy dữ liệu từ vùng nhớ đó ra mà thôi.  Với cách làm như này, Python cho chúng ta cách thức rất dễ dàng để gán biến cho một đối tượng khác, ngay cả khi kiểu dữ liệu của chúng khác nhau:

```pycon
>>> a = 1
>>> a = "I am a string now"
>>> print(a)
I am a string now
>>>
```

Mọi đối tượng trong Python có một định danh riêng, dùng để xác định địa chỉ vùng nhớ lưu giá trị của nó.  Ngoài ra, một thông tin quan trọng khác mà mọi đối tượng phải nắm giữ chính là kiểu dữ liệu của chúng.

Một vài kiểu dữ liệu phức tạp hơn có thể có chứa thông tin liên kết đến các đối tượng khác.  Ví dụ một list chẳng hạn, nó cần phải chứa thông tin vùng nhớ của từng phần tử trong list đó.  Python có hai hàm được định nghĩa sẵn là `id` và `type` dùng để trả về những thông tin cơ bản đó:

```pycon
>>> a_list = [1, 2, 3]
>>> a_list
[1, 2, 3]
>>> id(a_list)
4469837896
>>> type(a_list)
<class 'list'>
>>>
```

Chúng ta cũng có thể tự định nghĩa một class và xây dựng các đối tượng từ class đó như sau:

```pycon
>>> class Foo:
...     class_attribute = "foo"
...     def __init__(self, foo, bar):
...         self.foo = foo
...         self.bar = bar
...
>>> a_foo = Foo('foo1', 10)
>>> another_foo = Foo('foo2', 20)
>>> print(a_foo.foo, a_foo.bar)
foo1 10
>>> print(another_foo.foo, another_foo.bar)
foo2 20
>>> a_foo.__class__.class_attribute
'foo'
>>> another_foo.__class__.class_attribute
'foo'
>>>
```

Trong đoạn code trên, chúng ta đã tạo ra một class, rồi tạo ra các đối tượng từ class đó.  Các đối tượng sẽ có những thuộc tính của riêng mình.  Ngoài ra, nó còn có thuộc tính của cả class, truy cập thông qua `__class __.class_attribute`.  Thuộc tính của cả class sẽ là giống nhau với mọi đối tượng của class đó.  Còn thuộc tính của từng đối tượng (`foo` và `bar`) sẽ là đặc trưng của mỗi đối tượng.

Python có hai phương thức khác nhau để so sánh hai đối tượng.  Đó là so sánh `==` (so sánh giá trị) và `is` (so sánh định danh) Trong so sánh `is`, hai đối tượng bằng nhau khi và chỉ khi nó trỏ đến cùng một vùng nhớ, có nghĩa là giống nhau hoàn toàn, tương tự như so sánh `id` của hai đối tượng vậy.

Ví dụ dưới đây sẽ giải thích rõ hơn:

```pycon
>>> a = Foo('foo', 'bar')
>>> id(a)
4529667600
>>> b = a
>>> id(b)
4529667600
>>> id(a) == id(b)
True
>>> a is b
True
>>> a == b
True
>>> c = Foo('foo', 'bar')
>>> a == c
False
>>> id(c)
4529667656
>>> id(a) == id(c)
False
>>> a is c
False
>>>
```

## Hashable

Theo [tài liệu của Python](https://docs.python.org/3/glossary.html#term-hashable), một đối tượng được gọi là hashable (có thể hash được) nếu giá trị của nó không bao giờ thay đổi giá trị và có thể so sánh với các đối tượng khác.  Hash là một số nguyên, đại diện cho giá trị của đối tượng đó. Vì đối tượng không thay đổi giá trị, hash của nó sẽ là cố định, vì vậy các đối tượng đó mới được gọi là hashable.

> Hash là một thuật toán mã hoá một chiều, thuật toán này sẽ tính toán sao cho các đầu vào khác nhau sẽ cho ra các hash khác nhau.  Việc này thực ra không được chứng minh mà chỉ là một dạng tiên đề, giống như vân tay của mỗi người một khác vậy.  Tuy nhiên, một số thuật toán hash cổ điển như MD5 và SHA-1 đã được chứng minh là sai, khi có thể tìm ra hai đầu vào khác nhau cho ra cùng một hash.  Xem thêm [ở đây](https://www.mscs.dal.ca/~selinger/md5collision/) và [ở đây](https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html)

Python có hàm `hash` sẽ trả về giá trị chính là hash của một đối tượng, và dương nhiên, nó chỉ có giá trị nếu đối tượng là hashable.

```pycon
>>> hash(a_foo)
-9223372036571671608
>>> hash([1, 2, 3])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'list'
```

Hashable rất quan trọng, bởi vì có những trường hợp đối tượng phải là hashable.  Ví dụ key trong một dict phải là đối tượng hashable, các phần tử trong set cũng phải là hashable.

```pycon
>>> {[1, 2], [1, 2, 3]}
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'list'
```

Các đối tượng trong python được phân chia thành hai loại: mutable và immutable.  Các đối tượng thuộc kiểu cơ bản được định nghĩa sẵn trong Python cũng có loại là immutable, có loại là mutable.  Các đối tượng có kiểu nguyên thuỷ như số, xâu ký tự, byte đều là immutable.  Các đối tượng phức tạp hơn như tuple cũng là immutable trong khi list, set, dict lại là mutable.

Chúng ta sẽ tìm hiểu kỹ hơn về các đối tượng này trong các phần sau. Ở đây, tôi chỉ muốn nói đến chuyện hashable.  Các đội tượng được định nghĩa sẵn này phải là immutable thì mới hashable, trong khi các đối tượng mutable thì không.  Ngoài các đối tượng được định nghĩa sẵn, Python cho phép chúng ta định nghĩa các class khác và tạo ra các đối tượng theo đúng bài toán của chúng ta.  Các đối tượng này mặc định sẽ là mutable, nhưng một điều thật vi diệu là các đối tượng đó dù là mutable nhưng lại hashable.

## `id`

Hàm `id` như đã nói ở trên, sẽ trả về kết quả là định danh của một đối tượng.  Định danh này là một số nguyên, giá trị của nó khá "ngẫu nhiên", dùng để xác định vùng nhớ chứa dữ liệu của đối tượng đó.  Dù ngẫu nhiên, nhưng định danh này luôn được đảm bảo là duy nhất.  Ví dụ:

```pycon
>>> id(1)
4527210512
>>> id('foo')
4529666960
>>>
```

Trong lập trình, việc gán các đối tượng lẫn nhau là một việc phổ biến. Tuy nhiên, với các đối tượng immutable, việc gán cho nhau là một việc rất dễ hiểu, bởi khi thay đổi giá trị thì định danh của nó cũng thay đổi theo.

```pycon
>>> a = 1
>>> b = a
>>> id(a)
4527210512
>>> id(b)
4527210512
>>> a = 2
>>> a
2
>>> b
1
>>> id(a)
4527210544
>>>
```

Tuy nhiên, với đối tượng mutable, mọi việc rắc rối hơn rất nhiều. Việc gán biến lẫn nhau chỉ đơn giản là nói rằng biến đó sẽ trỏ đến cùng một vùng nhớ, và giá trị được lưu trong vùng nhớ đó hoàn toàn có thể thay đổi mà không thay đổi định danh.

```pycon
>>> a = [1, 2, 3]
>>> b = a
>>> id(a)
4529329160
>>> id(b)
4529329160
>>> a[2] = 4
>>> a
[1, 2, 4]
>>> b
[1, 2, 4]
>>> id(a)
4529329160
>>> id(b)
4529329160
>>>
```

Phải hết sức cẩn thận trong những trường hợp như vậy để tránh các bug có thể phát sinh.

## Mutable vs. Immutable

Như đã nói ở trên, các đối tượng trong Python được chia làm hai loại: mutable và immutable.  Hai loại đối tượng trên sẽ có một số khác biệt trong cách chúng ta xử lý dữ liệu của chúng.

Nếu một đối tượng là mutable, nó có thể thay đổi giá trị, nghĩa là dữ liệu được lưu trong vùng nhớ của nó có thể thay đổi được, và biến gán cho vùng nhớ đó không cần thay đổi gì.  Ngược lại, nếu một đối tượng là immutable, giá trị của nó không thể thay đổi được.  Nhưng biến gán giá trị đó vẫn có thể có giá trị khác, bởi vì khi đó, một đối tượng khác, được lưu ở một vùng nhớ khác sẽ được gán lại cho biến đó, còn đối tượng cũ không mất đi đâu cả, nó vẫn ở đó.  Tất nhiên là sau khi chương trình kết thúc, trình dọn rác (GC) sẽ lo xử lý những vùng nhớ này giúp chúng ta nên về cơ bản thì chúng ta không cần lo gì cả.

Trong Python, những đối tượng thuộc loại sau là mutable:

- list
- dict
- set
- bytearray
- Các class được định nghĩa bởi code (mặc định)

Các đối tượng thuộc loại sau là immutable:

- int
- float
- decimal
- complex
- bool
- string
- tuple
- range
- frozenset
- bytes

Vậy là sự khác biệt rất đơn giản: mutable có thể thay đổi giá trị, không khi immutable thì không.  Nhưng thực sự điều này có ảnh hưởng như thế nào khi chúng ta code?

Hãy xem xét một ví dụ thế này: tuple và list.  Về cơ bản thì chúng khá giống nhau, và giống một mảng.  Nhưng tuple là immutable còn list là mutable.  Một tuple khi đuợc tạo ra sẽ chứa toàn bộ các phần tử của nó, và nó "đóng băng" ở đó.  Nghĩa là các phần tử của tuple đó không thể thay đổi được nữa, tạo ra thế nào thì dùng như thế.  Khi chúng ta muốn thay đổi giá trị của biến gán cho tuple đó, một tuple khác, ở một vùng nhớ khác sẽ được tạo ra.

Một list thì khác, vì là mutable, nên việc thay đổi nội dung của nó rất dễ dàng.  Chúng ta có thể thêm phần tử, thay đổi giá trị một phần tử có sẵn, hoặc xoá bớt phần tử.  Mọi việc rất dễ dàng và vùng nhớ của list đó vẫn ở chỗ cũ chứ không đi đâu cả.

Với những tính chất khác biệt như trên, nên khi giải quyết một bài toán nào đó, chúng ta phải cân nhắc cẩn thận, chọn ra kiểu dữ liệu phù hợp để có thể tối ưu performance, trong trường hợp này là tối ưu về bộ nhớ.  Tất nhiên là với những đoạn code nhỏ, những đoạn code quick-and-dirty thì việc này không có nhiều ý nghĩa lắm nhưng với những hệ thống lớn thì hoàn toàn khác.  Một lựa chọn sai lầm sẽ khiến hàng GB bộ nhớ bị lãng phí.

Một điều khá thú vị là, mặc dù tuple là immutable, nhưng các phần tử của nó có thể là mutable.  Ví dụ:

```pycon
>>> foo = (1, 2, [3, 4])
>>>
```

Thế nhưng trong trường hợp này, tuple không thể hash được nữa.

```pycon
>>> hash(foo)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'list'
>>>
```

Như vậy, các đối tượng immutable có thể hashable, nhưng không có nghĩa rằng tất cả các đối tượng immutable đều hashable.  Và có những trường hợp là mutable (đối tượng thuộc class tự định nghĩa) vẫn là hashable. Hash thực chất phụ thuộc còn phụ thuộc rất lớn vào giá trị của đối tượng đó.

Trong trường hợp này, một tuple (thông thường là immutable), lại có chứa một đối tượng mutable (list), và nó không thể hash được.  Bởi vì giá trị của tuple đó vẫn có thể thay đổi được (thay đổi một phần trong list nằm trong tuple), do đó, hash của tuple đó, được tính toán dựa trên giá trị, không thể đảm bảo sẽ giữ nguyên.  Như vậy thì một tuple, dù được định nghĩa là immutable, nhưng có những lúc vẫn là mutable, như trường hợp trên chẳng hạn.  Ranh giới giữa mutable và immutable có vẻ hơi mỏng manh.

Hãy xem xét thêm một ví dụ dưới đây:

```pycon
>>> foo = (1, 2, [3, 4])
>>> bar = (1, 2, [3, 4])
>>> foo == bar
True
>>> foo is bar
False
>>> foo[2].append(5)
>>> foo
(1, 2, [3, 4, 5])
>>> bar
(1, 2, [3, 4])
>>>
```

Trong trường hợp này, hai tuple (`foo` và `bar`) bằng nhau (so sánh `==`) bởi vì giá trị của chúng giống nhau, nhưng chúng là hai object riêng biệt được lưu trên hai vùng nhớ hoàn toàn khác nhau.  Khi chúng ta thay đổi giá trị của tuple `foo` thì chỉ mình nó được thay đổi giá trị mà thôi, `bar` vẫn giữ nguyên giá trị như lúc ban đầu.  Trong trường hợp này, tuple không khác gì một đối tượng mutable cả.

Mutable và immutable nhiều khi là rất quan trọng.  Như đã nói ở trên, việc chọn đúng kiểu dữ liệu sẽ giúp chúng ta tối ưu hoá việc sử dụng bộ nhớ.

Mutable là đối tượng tốt nhất nếu chúng ta muốn thay đổi giá trị của nó thường xuyên.  Ví dụ hai đối tượng `foo` và `bar` chứa cùng một mảng, khi chúng ta muốn thêm một phần tử mới vào `foo` thì `bar` cũng cần phải có giá trị đó.  Nếu sử dụng tuple (immutable) thì bộ nhớ sẽ bị lãng phí rất nhiều vì mỗi lần thay đổi, một đối tượng mới sẽ được tạo ra.  Đồng thời việc truy cập dữ liệu bằng biến `bar` rắc rối vì chúng ta sẽ phải làm thêm một thao tác là copy dữ liệu từ `foo` sang `bar`.

```pycon
>>> foo = (1, 2, 3)
>>> bar = foo
>>> foo
(1, 2, 3)
>>> bar
(1, 2, 3)
>>> foo += (4, )
>>> foo
(1, 2, 3, 4)
>>> bar
(1, 2, 3)
>>>
```

Nhưng nếu sử dụng list trong trường hợp này, mọi việc dễ dàng hơn nhiều.

```pycon
>>> foo = [1, 2, 3]
>>> bar = foo
>>> foo
[1, 2, 3]
>>> bar
[1, 2, 3]
>>> foo += [4]
>>> foo
[1, 2, 3, 4]
>>> bar
[1, 2, 3, 4]
>>>
```

Mutable có thể được sử dụng trong mọi trường hợp mà dữ liệu cần thay đổi.  Immutable được sử dụng tương đối ít, các đối tượng thuộc class tự định nghĩa đều mặc định là mutable.  Immutable được dùng nhiều nhất là các dữ liệu nguyên thuỷ, kiểu số nguyên, số thực, xâu ký tự, v.v... Một trường hợp nữa là Python yêu cầu sử dụng dữ liệu hashable (thường là immutable) làm key trong dict.

Đề viết code hiệu quả, việc hiểu biết là mutable và immutable là việc làm quan trọng.  Ví dụ tuple là immutable, việc nối hai tuple với nhau, sẽ tạo ra một tuple thứ ba, chứa nội dung của hai tuple trước đó.  Nếu lạm dụng việc này, chúng ta sẽ lãng phí rất nhiều bộ nhớ.  Sử dụng list sẽ là tốt hơn trong trường hợp này. 

Thế nhưng, ngược lại với sự thay đổi tương đối khó khăn, việc đọc dữ liệu từ immutable thì nhanh hơn mutable.  Vậy là cái gì khó thay đổi thì dễ lấy ra, cái gì khó lấy ra thì dễ thay đổi.

# Intern

Vì việc thay đổi giá trị của một biến gán với immutable tương đối phức tạp (cấp phát vùng nhớ mới rồi lưu giá trị vào) nên Python có một cơ chế khá hay để giúp tăng tốc quá trình này: intern.

Python định nghĩa `NSMALLNEGINTS` là các số nguyên trong khoảng [-5, 0] và `NSMALLPOSINTS` là các số nguyên trong khoảng [0, 256].  Tuỳ vào phiên bản ngôn ngữ mà giá trị này có thể thay đổi đôi chút.  Chúng ta có thể hiểu đơn giản rằng, Python định nghĩa một khoảng các số nguyên từ [-5, 256].

Việc này có ý nghĩa gì?  Khi một chương trình Python khởi động, tất cả các giá trị trong khoảng đó sẽ được tạo ra và lưu sẵn trong bộ nhớ. Khi chúng ta tạo một biến với giá trị trong khoảng đó, sẽ không cần phải cấp phát bộ nhớ nữa, mà mọi việc chỉ đơn giản là lấy ra địa chỉ vùng nhớ chứa giá trị tương ứng là được.

Ví dụ: khi chúng ta gán `x = 100`, Python sẽ biết rằng, nó trong khoảng [-5, 256] nên tìm kiếm vùng nhớ chứa giá trị tương ứng.  Khi chúng ta gán một biến nằm ngoài khoảng trên, một vùng nhớ mới được cấp phát chứa giá trị mới.  Nếu sau đó chúng ta tiếp tục thay đổi giá trị biến này, một vùng nhớ khác sẽ được cấp phát, đồng thời trình dọn rác (GC) sẽ xoá đi vùng nhớ chứa giá trị cũ.  Việc này tốn kha khá thời gian nên Python đã đơn giản hoá mọi việc với những giá trị số nguyên thường được sử dụng.

Một số những đối tượng sau sẽ luôn luôn được sử dụng cơ chế intern:

- String dưới 20 ký tự không có dấu cách
- Số nguyên trong khoảng [-5, 256] như đã nói ở trên
- Các đối tương immutable trống (tuple trống)

Điều này sẽ giúp tối ưu bộ nhớ cũng như thao tác trong Python, bởi vì

- Những thứ trên sẽ được sử dụng thường xuyên, lưu sẵn sẽ tiết kiệm bộ nhớ và thời gian.
- Vì các đối tương intern là immutable nên không có vấn đề gì xảy ra bởi giá trị của chúng không thay đổi.

Vậy cơ chế intern cho phép chúng ta truy cập đến cùng một vùng nhớ nếu hai biến có cùng một giá trị và kiểu dữ liệu của chúng ta immutable. Python tự động thực hiện việc này, mà chúng ta không cần biết đến chúng.

Ví dụ, việc gán biến như sau sẽ tạo ra hai vùng nhớ khác nhau:

```pycon
>>> foo = "Hello, world"
>>> bar = "Hello, world"
>>> foo is bar
False
```

Nhưng nếu string ít hơn 20 ký tự và không có dấu cách, intern sẽ được sử dụng:

```pycon
>>> foo = "Hello"
>>> bar = "Hello"
>>> foo is bar
True
```

Với số nguyên thì sao?  Như đã nói ở trên, việc intern chỉ áp dụng với số nguyên trong khoảng [-5, 256], và thậm chí Python còn không cần đợi chúng ta gán biến, các giá trị trong khoảng nảy sẽ được lưu sẵn trong bộ nhớ:

```pycon
>>> foo = 256
>>> bar = 256
>>> foo is bar
True
```

Nếu ngoài khoảng trên thì hoàn toàn không có intern:

```pycon
>>> foo = 257
>>> bar = 257
>>> foo is bar
False
```

Với một đối tượng immutable trống cũng tương tự:

```pycon
>>> foo = tuple()
>>> bar = tuple()
>>> foo is bar
True
```

Nhưng nếu đối tượng có giá trị thì lại khác:

```pycon
>>> foo = (1, 2)
>>> bar = (1, 2)
>>> foo is bar
False
```

# Truyền các đối tượng làm tham số của hàm

Các đối tượng mutable hoặc immutable sẽ có những cách thức rất khác nhau khi được truyền làm tham số của hàm.

Tham số được truyền vào hàm luôn luôn là đối tượng.  Với những đối tượng là immutable (số nguyên, số thực, tuple, v.v...) thì giá trị của nó sẽ không thể thay đổi được bởi hàm, nhưng nếu là mutable (list, dict) thì hàm lại có thể thay đổi giá trị bên ngoài.

## Tham số của hàm là immutable

Các đối tượng immutable như số, tuple, string được truyền vào hàm giống hệt như list, set.  Nó truyền reference chứ không truyền giá trị, tức là chỉ truyền địa chỉ bộ nhớ.  Thế nhưng vì tính chất của immutable là không thể thay đổi giá trị, vì vậy nếu trong nội dung của hàm mà có thay đổi giá trị của tham số, nó hoạt động khá giống với việc truyền giá trị vào.

Bởi vì mỗi khi thay đổi giá trị, một vùng nhớ mới được cấp phát, nó được gán cho tham số nhưng không gán cho biến bên ngoài, vì vậy việc thay đổi giá trị này chỉ có ý nghĩa trong hàm mà thôi, còn giá trị biến ở bên ngoài không ảnh hưởng gì.

```pycon
>>> def foo(bar):
...     bar += 1
...     print(id(bar))
...     return bar
...
>>> x = 100
>>> y = foo(x)
4447808656
>>> x
100
>>> y
101
>>> id(x)
4447808624
>>> id(y)
4447808656
>>>
```

Trong ví dụ trên, x là một biến gán với giá trị immutable.  Khi biến này được truyền vào hàm `foo`, tất nhiên là vùng nhớ này sẽ được truyền cho tham số `bar`.  Tham số `bar` được thay đổi giá trị, nên nó sẽ được gán với một vùng nhớ mới chứa giá trị mới.  Lúc này, `bar` đã được thay đổi nhưng `x` phía bên ngoài vẫn trỏ vào vùng nhớ cũ.  Giá trị của `y` nhận từ hàm sẽ là giá trị của `bar` mới, nhưng `x` thì vẫn là giá trị cũ cho nên `x` và `y` có giá trị khác nhau.

Để ý thêm một chút sẽ thấy, `y` và tham số `bar` trong hàm trỏ đến cùng một vùng nhớ.  Đó chính là do mọi việc gán biến cũng như tham số đều được thực hiện thông qua reference.

## Tham số của hàm là mutable

Các đối tượng mutable như list, dict cũng được truyền vào qua qua reference, tức là địa chỉ vùng nhớ, không khác gì các đối tượng immutable cả.  Thế nhưng vì tính chất của mutable, nên vùng nhớ này hoàn toàn có thể chứa giá trị mới mà không cần cấp phát gì cả.  Vì vậy, nếu một mutable được truyền vào hàm mà bị thay đổi giá trị, thì biến bên ngoài cũng sẽ chưa giá trị mới:

```pycon
>>> def foo(bar):
...     bar.append(100)
...
>>> a_list = [1, 10]
>>> another_list = a_list
>>> a_list
[1, 10]
>>> another_list
[1, 10]
>>> foo(a_list)
>>> a_list
[1, 10, 100]
>>> another_list
[1, 10, 100]
>>> foo(another_list)
>>> a_list
[1, 10, 100, 100]
>>> another_list
[1, 10, 100, 100]
>>>
```

Trong đoạn code trên, chúng ta tạo ra hai list, `a_list` và `another_list`, cả hai đều trỏ đến cùng một vùng nhớ (với giá trị `[1, 10]`).  Chúng ta truyền địa chỉ vùng nhớ này làm tham số cho hàm `foo`, trong hàm này, chúng ta thêm phần tử cho list nhận được.  Vì là một đối tượng mutable, nên việc thay đổi giá trị này không làm thay đổi địa chỉ vùng nhớ, mọi việc hoàn toàn diễn ra ở vùng nhớ ban đầu. Vì vậy, các biến `a_list`, `another_list` ở bên ngoài cũng được thay đổi giá trị theo.

# Kết luận

Mutable và immutable là những kiến thức cơ bản trong Python.  Hiểu biết về nó sẽ giúp chúng ta code tối ưu hơn.  Hy vọng bài viết giúp ích cho các bạn trọng công việc.