![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/07/cutlery-948563_1920.jpeg?w=1920&ssl=1)

Chào cả nhà 🥳! Chào BeautyOnCode  🤣 

Just for vui tí, thực ra đó là cách gia đình mình chào nhau dạo gần đây lol 

Ba bảo: “Chào Minh Hoàng!”. Chicken bảo: “Chào Ba Lộc!” . Mẹ Út bảo: “Chào Minh Hoàng”. Chicken bảo: “Chào Mẹ Út” 🤣

Hôm nay tụi mình sẽ cầm gương lên, dũng cảm xông pha ra trận chém con thú hai đầu, một đầu nó có màu hồng tên là “Iterator“, một đầu màu xanh tên là “Generator“. 

Để mình kể bạn nghe, đây là một câu chuyện có thật, từ chiếc ti vi, kênh Cartoon Network, chương trình hoạt hình “Biệt đội Titan xuất kích”. Hai bạn quái vật này được nhốt trong một cái hộp thần bí, Raven đã dặn các bạn không được mở nó ra vì nó rất nguy hiểm, nhưng StarFire đã không kiềm được tò mò và mở ra. Hai bạn này siêu dễ thương luôn, cùng vui chơi với các bạn nhỏ, nhưng khi hai bạn đó được StarFire không kiềm được mà hôn cho một cái thì lập tức hai bạn biến hình thành một con quái vật có hai đầu đi phá thành phố. Sau đó, StarFire đã nói ra những lời đau lòng đến mức từ con quái vật hai đầu khổng lồ hai bạn càng ngày càng thu bé lại và biến thành hai con tiểu yêu khóc nức nở vì không được yêu thương nữa.                        

Câu chuyện vậy đó, khi mình soạn bài này tự dưng mình thấy cũng trùng hợp ghê, hai bạn “Iterator” và “Generator” này cũng dễ thương như vậy, nhưng cũng có thể biến thành quái vật khi mình chủ quan về các bạn ấy đúng không nào. Còn mình mà đã hiểu á, thì sẽ biến lại thành hai bạn tiểu yêu xinh xắn dễ cưng thôi.

Cho nên là hôm nay, mình cùng quyết tâm chinh phục con quái thú hai đầu này nha! 👻  Ý quên, còn gặp cả sư phụ của tụi nhỏ nữa đấy.

Bài blog này thuộc series [“Khám phá Đại Bản Doanh Python”](https://beautyoncode.com/dai-ban-doanh-python-series-overview/).

(Image by [artemtation](https://pixabay.com/users/artemtation-45390/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=948563) from Pixabay)

# Mở đầu
Trong nội dung bài [“Các công cụ điều khiển luồng dữ liệu”](https://beautyoncode.com/control-flow-in-python/), mình đã biết cách lặp qua các phần tử của các kiểu dữ liệu là tập hợp nhiều phần tử trong đó, như là string, list, dict rồi, dùng for phần_tử in danh_sách. Và mình cũng đã học cách sử dụng enumerate() để có thể vừa lặp qua vừa sử dụng chỉ số index của phần tử, ví dụ:

```python
>>> a = ["Thanh", "has", "a", "blog"]
>>> for i, s in enumerate(a):
...     print("chuoi hien tai la:", s)
...     if i < len(a) - 1:
...             print("chuoi tiep theo la:", a[i+1])
...     else:
...             print("day la chuoi cuoi cung!")
...
chuoi hien tai la: Thanh
chuoi tiep theo la: has
chuoi hien tai la: has
chuoi tiep theo la: a
chuoi hien tai la: a
chuoi tiep theo la: blog
chuoi hien tai la: blog
day la chuoi cuoi cung!
>>>
```
“a” đang là một danh sách. Nếu a là một set thì sao nhỉ? Cùng xem ví dụ ở trên với b có giá trị tương tự a nhưng là kiểu dữ liệu set nhé. (Đọc thêm về các loại dữ liệu ở bài [“Cấu trúc dữ liệu trong Python”](https://beautyoncode.com/data-structure-in-python/) nhé)

```python
>>> b = {"Thanh", "has", "a", "blog"}
>>> for i, s in enumerate(b):
...     print("chuoi hien tai la:", s)
...     if i < len(b) - 1:
...             print("chuoi tiep theo la:", b[i+1])
...     else:
...             print("day la chuoi cuoi cung!")
...
chuoi hien tai la: blog
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
TypeError: 'set' object is not subscriptable
>>>
```

Ôi nó bị sao thế nhỉ, lỗi *“TypeError: ‘set’ object is not subscriptable”* có nghĩa là kiểu dữ liệu “set” không hỗ trợ truy cập phần tử theo chỉ mục index. 

Hiểu nôm na thì nếu a là list, nó có thể truy cập đến phần tử đầu tiên bằng index là 0 với a[0], còn b là set thì nó không có chỉ số index như vậy nên b[0] sẽ báo lỗi như trên.

---

Thế còn kiểu dữ liệu dict thì sao nhỉ? Không biết bạn này có hỗ trợ truy cập theo chỉ mục index không ta?

```python
>>> a = {"name": "Thanh", "age": 29}
>>> for i, key in enumerate(a):
...     print("tu khoa: ", key)
...     print(f"gia tri cua tu khoa {key} la: {a[key]}")
...     print(f"gia tri cua a tại index {i} la: {a[i]}")
...
tu khoa:  name
gia tri cua tu khoa name la: Thanh
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
KeyError: 0
>>>
```

Úi, vậy là kiểu dữ liệu dict cũng không truy cập theo chỉ mục index được.

Vậy là, trong Python cùng là kiểu dữ liệu có thể chứa nhiều phần tử(string, list, set, dict, …) nhưng các bạn này lại chia làm **hai nhóm**: 

🥰  **Nhóm dữ liệu tuần tự(sequence): string, list, …** cho phép mình truy cập qua các phần tử trong bộ sưu tập bằng chỉ mục, hay gọi là số index, các bạn này có chỉ số index được đánh dấu từ 0 đến len – 1(chiều dài của nó trừ đi 1). 

🥰  **Nhóm dữ liệu tập hợp(collection): set, dict, …** không truy cập được theo chỉ mục index.

---
Rồi sao nữa 😊  Hehe, rồi thì luật sinh ra là để lách luật đó mấy bạn 😅

Muốn lách luật tức là muốn duyệt có trình tự mấy kiểu dữ liệu tập hợp như set, dict trên, thì mình cần hiểu bản chất và cơ chế của luật này cái đã. Đây chính là sư phụ của hai bạn tiểu yêu trên, tớ tạm gọi là sư phụ **iterable** 

# Iterable

Thực ra nãy giờ mình từng gặp nhiều bạn là iterable rồi ấy 👉  **a** và **b** của những ví dụ trên đều là các iterable.

Một đối tượng là **iterable** nghĩa là nó có thể lặp qua, hiểu nôm na nếu **a** là một **iterable** thì:

👉  có thể lặp qua a được, tức có thể viết *“for x in a” *

👉  gọi *iter(a)*, sẽ trả về một iterator

👉  a có phương thức *\_\_iter\_\_* cũng trả về một iterator, hoặc đôi khi A có phương thức *\\getitem\\* nếu a thuộc nhóm dữ liệu tuần tử có thể truy cập phần tử theo chỉ số index đã nói ở trên.

Xem ví dụ với iterable là list:

```python
>>> a = ["Thanh", "has", "a", "blog"]]
>>> a = ["BeautyOnCode", "blog"]
>>> for s in a:
...     print(s)
...
BeautyOnCode
blog
>>> iter(a)
<list_iterator object at 0x10b5dbd60>
>>> a.__dir__()
['__repr__', '__hash__', '__getattribute__', '__lt__', '__le__', '__eq__', '__ne__', '__gt__', '__ge__', '__iter__', '__init__', '__len__', '__getitem__', '__setitem__', '__delitem__', '__add__', '__mul__', '__rmul__', '__contains__', '__iadd__', '__imul__', '__new__', '__reversed__', '__sizeof__', 'clear', 'copy', 'append', 'insert', 'extend', 'pop', 'remove', 'index', 'count', 'reverse', 'sort', '__doc__', '__str__', '__setattr__', '__delattr__', '__reduce_ex__', '__reduce__', '__subclasshook__', '__init_subclass__', '__format__', '__dir__', '__class__']
>>> a.__iter__()
<list_iterator object at 0x10b5dbd60>
>>> a.__getitem__(0)
'BeautyOnCode'
>>>
```

Tiếp theo b là một dict nè:

```python
>>> b = {"name": "Thanh", "age": 29}
>>> for x in b:
...     print(x)
...
name
age
>>> iter(b)
<dict_keyiterator object at 0x10b61cc20>
>>> b.__dir__()
['__repr__', '__hash__', '__getattribute__', '__lt__', '__le__', '__eq__', '__ne__', '__gt__', '__ge__', '__iter__', '__init__', '__len__', '__getitem__', '__setitem__', '__delitem__', '__contains__', '__new__', '__sizeof__', 'get', 'setdefault', 'pop', 'popitem', 'keys', 'items', 'values', 'update', 'fromkeys', 'clear', 'copy', '__reversed__', '__doc__', '__str__', '__setattr__', '__delattr__', '__reduce_ex__', '__reduce__', '__subclasshook__', '__init_subclass__', '__format__', '__dir__', '__class__']
>>> b.__iter__()
<dict_keyiterator object at 0x10b61cc20>
>>> b.__getitem__(0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 0
```

Bạn đã thấy sự khác nhau chưa, vậy là điểm chung duy nhất của các iterable là **có nhiều phần tử** và cho **phép mình lặp qua** chúng nó đấy.

Tuy nhiên, số lượng phần tử trong iterable có thể là hữu hạn hoặc vô hạn, ở các ví dụ trên rõ là chúng nó có số lượng hữu hạn. Giờ thì cũng đi qua một ví dụ với số lượng phần tử vô hạn nhé.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/05/count-iterable.gif?fit=640%2C430&ssl=1)

Trong ví dụ này, mình sử dụng hàm **count** từ [itertools](https://docs.python.org/3/library/itertools.html) để tạo một bộ đếm là bội của 3. 

Khi thực hiện lặp qua bộ đếm này với vòng lặp for và in các phần tử ra thì nó sẽ chạy mãi mãi cho đến khi mình ngừng chương trình hoặc mình phải thêm điều kiện dừng cho vòng lặp for là khi n > 200 thì thoát khỏi vòng lặp như trong ví dụ trên.

Với số lượng phần tử vô hạn như vậy thì mình không thể chuyển các bạn ấy về kiểu danh sách được. Chưa kể với số lượng phần tử quá lớn sẽ gây hại cho bộ nhớ và hiệu suất của chương trình.

Hehe, thực ra tớ chuyển thử rồi, và nó kill luôn PI và tự thoát ra ngoài luôn 😅

```python
>>> list(multiples_of_three)
[1]    5953 killed     python
```

Vì những nguyên nhân đó, **sư phụ Iterable** đã nhận một đệ tử đầu tiên, chính là bạn tiểu yêu màu hồng, bạn mà sau này biến thành quái thú màu hồng trong con quái thú hai đầu đó, bạn ấy tên là Iterator.

Cùng xem bạn Iterator giúp giải quyết vấn đề trên ra sao nhé!

# Iterator
Thực ra iterator là một khái niệm trong lĩnh vực khoa học máy tính đấy nhé. [Đây](https://en.wikipedia.org/wiki/Iterator) là xuất thân của Iterator từ Wikipedia:

> In computer programming, an **iterator** is an object that enables a programmer to traverse a container, particularly lists.

Mình tạm dịch là: Trong lĩnh vực khoa học máy tính, một iterator là một đối tượng cho phép các nhà lập trình có thể duyệt qua một vùng chứa các dữ liệu, như danh sách.

Còn trong Python, iterator được định nghĩa trong [Python wiki](https://wiki.python.org/) là:

> [iterator](https://wiki.python.org/moin/Iterator) là đối tượng có phương thức **\_\_next\_\_**, và phương thức này sẽ trả về phần tử tiếp theo của đối tượng, nếu đối tượng không còn phần tử nào để lặp qua thì nó sẽ báo lỗi **StopIteration**. 

---

Bạn đã thấy iterator lần nào chưa nhỉ? 

Thực ra mình đã thấy bạn ấy khi mình gọi iter(a) ở ví dụ trên đấy, cùng xem mình gọi **\_\_next\_\_** thì bạn ấy sẽ trả ra gì nhé: 

```python
>>> a = ["BeautyOnCode", "blog"]
>>> x = iter(a)
>>> x
<list_iterator object at 0x10b5dbd60>
>>> x.__next__()
'BeautyOnCode'
>>> x.__next__()
'blog'
>>> x.__next__()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
>>>
```

Ồ hay chưa, mình có thể đi qua các phần tử trong a bằng phương thức **\_\_next\_\_**, thay vì dùng for nè. Khi đi đến phần tử cuối cùng rồi, thì nó sẽ báo lỗi *StopIteration* để báo cho mình biết hết đồ để đi tiếp rồi nghen 🤣 

Thêm nữa, **iterator cũng là iterable** đó, cùng xem tớ lặp qua nó với for nè, và cả gọi iter() cho x thì nó trả về chính nó luôn.

```python
>>> a = ["BeautyOnCode", "blog"]
>>> x = iter(a)
>>> for s in x:
...     print(s)
...
BeautyOnCode
blog
>>> iter(x)
<list_iterator object at 0x10b5a84f0>
>>> x
<list_iterator object at 0x10b5a84f0>
>>>
```

Ra vậy, để lặp qua một iterable vô hạn, như cái ví dụ bội số của 3 ở trên, mình cần biến nó thành iterator bằng hàm iter(), rồi sau đó có thể dùng **\_\_next\_\_()** hoặc **next()** để đi qua lần lượt các phần tử. Nhưng vì đang nói đến iterable vô hạn, cho nên nó sẽ không bao giờ có ngoại lệ StopIteration luôn ấy.

Cùng xem cách mình đã lặp qua “*multiplesofthree*” dùng iterator thay cho for nhé:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/05/iterator-example-unlimit.gif?fit=640%2C616&ssl=1)

Thật thú vị đúng không nào, mình không dùng for mà vẫn lặp qua các đối tượng của một iterable đấy. 

Và bật mí với các bạn, đây cũng chính là cơ chế lặp được sử dụng nhiều trong Python đấy, cụ thể là cho vòng lặp for nè, rồi xác định nhiều giá trị trong tuple nè, rồi list comprehension(ví dụ cho bạn nào quên nè, [i +1 for i in a]), ….

Trước khi đi tiếp mình xin tóm tóm lại một xíu cho bạn đỡ ngợp nha. 

Mình đã tìm hiểu qua về: **Iterable**, **Iterator**

😊  **Iterable được xác định bằng 3 cách:**

  1. dùng được với for

  2. iter(X) không báo lỗi

  3. có phương thức \_\_iter\_\_

😊  **Iterator được xác định bằng:**

   1. Y = iter(X), với X là một iterable, thì Y là một iterator

   2. next(Y) sẽ trả về giá trị phần tử tiếp theo hoặc ngoại lệ StopIteration, thì Y là iterator.

   3. iter(Y) sẽ trả về Y, thì Y là iterator(tức iterator cũng chính là iterable)

Nhìn tóm tắt trên bạn thử hình dung xem nếu mình muốn tạo một iterable cho riêng mình thì mình cần phải định nghĩa những gì để Python hiểu nó là một iterable nhỉ?

Để xem nào, hẳn là nó cần có một phương thức là **\_\_iter\_\_**, và phương thức này cần trả về một bạn **iterator**.

Cùng mình thử sức định nghĩa một iterable của riêng bạn nhé!

---

```python
class BlogPostIterator:
    def __init__(self, blogpost):
        self._blogpost = blogpost
        self._current = 0

    def __next__(self):
        """Trả về bạn post tiếp theo nhé"""
        # Số posts trong blog nè
        posts = self._blogpost._posts
        if self._current < len(posts):
            # lấy phần tử với chỉ sổ index là _current ra nha
            next = posts[self._current]
            # tăng _current lên 1 nhé
            self._current += 1
            return next

        # Nếu chỉ số index vượt quá số posts có thì
        # la làng ngoại lệ StopIteration
        raise StopIteration

class BlogPost:
    """Posts in blog"""
    def __init__(self):
        self._posts = []

    def add_post(self, posts):
        """Thêm posts vào nhé"""
        self._posts += posts

    def __iter__(self):
        """Trả về iterator nhé"""
        return BlogPostIterator(self)
```

Ở trên, lớp BlogPost có thể tạo ra các đối tượng là iterable đó, cùng thử nghiệm nha:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/05/custom-iterable-run.gif?fit=640%2C357&ssl=1)

Mình có thực hành và giải thích ở trên [video này](https://youtu.be/nEIV8lXn1Hs) nè

Ui, mãi quần quật với hai bạn này mà mình sắp trễ thời gian rồi, nhanh nhanh đi tiếp đến chú tiểu yêu tiếp theo cần phải chinh phục, đó là chú màu xanh **generator** .

# Generator

[Đây](https://en.wikipedia.org/wiki/Generator_(computer_programming)) là xuất thân của Generator từ Wikipedia:

> In computer science, a **generator** is a routine that can be used to control the iteration behaviour of a loop. All generators are also iterators.

Mình tạm dịch là: Trong lĩnh vực khoa học máy tính, một generator là một bộ các quy trình các có thể dùng để kiểm soát hành động của một vòng lặp. Và tất cả generator cũng là iterators.

Còn trong Python, generator được định nghĩa trong Python wiki là:

[generator](https://wiki.python.org/moin/Generators) hay gọi là **hàm generato**r, cho phép bạn tạo ra một hàm hoạt động tương tự như một iterator, tức là nó cũng là iterable, và có thể dùng với vòng lặp for.

## Dùng generator trong trường hợp nào

Mình là một bạn nhỏ hay thắc mắc, mình cũng rất tò mò lý do vì sao cần có hàm generator ấy nhỉ? Nó cũng tạo ra iterator đúng hem, thế sao không dùng luôn iterator thôi nhỉ?

Bạn đoán thử cùng mình xem sao? 

Mình nghĩ là nếu tạo một iterator khoai như ở trên, thì buồn thật đấy, khi nào cũng viết phương thức **\_\_iter\_\_** rồi nó phải trả về iterator, rồi muốn trả về iterator thì lại phải đi định nghĩa phương thức **\_\_next\_\_** và viết cái logic khác nữa. Thật tình mà nói thì cũng hơi khó gặm đó nha 🥲.

Hẳn là mấy chú Python thấy thế bèn nghĩ ra một cách, hay là mình cho tụi nhỏ viết một hàm thôi, và hàm đó hoạt động như là một iterator, còn những thứ lằng nhằng kia hãy để các chú lo, phải không? 🥰

Hihi, đoán bậy vậy mà nó trúng rồi nha, chính xác là generator giúp mình tạo iterator một cách dễ dàng hơn nhiều. Và thêm nữa, generator sẽ thường sử dụng cho các trường hợp cần cân nhắc về chuyện hiệu suất của chương trình, ví dụ như là khi mình làm việc với số siêu lớn, hay làm việc với các file có dung lượng lớn cần xử lý.

Vì sao? Vì khi đó nếu dùng một kiểu dữ liệu tuần tự để lưu hay xử lý thì chương trình sẽ ngốn nhiều dung lượng RAM, dẫn đến tràn RAM và gây lỗi về bộ nhớ(*Memory Error*). 

Nếu bạn gặp các trường hợp này, thì generator chính là chân ái của đời bạn đó, nhớ nhé 😘

## Ví dụ giùm cái

**Đề bài:** tạo một danh sách các số từ 0 đến n, sau đó tính tổng của chúng nó. Hãy thử nghiệm với n = 1000000000 nhé.

Nào, giờ mình sẽ đi cùng với mọi người giải bài toán bằng ba cách nhé

### Cách 1: dùng một danh sách để lưu các số.

```python
def list_n_list(n):
    num, nums = 0, []
    while num < n:
        nums.append(num)
        num += 1
        return nums

sum(list_n_list(1000000000))
```

Và mình chạy thử xem nó tốn bao nhiêu time:

```python
$ python list_n_list.py     
time execute 0:06:51.453351
```

Rồi, đoạn code này khá là đơn giản phải không, logic rất dễ hiểu, nhưng nó đang tạo một list với tất cả các phần tử từ 0 đến n, rồi cộng lại. Rõ là phương án này nhìn thì đơn giản, nhưng rất khó chấp nhận trong trường hợp n là một số siêu lớn, vì làm sao mà mình lưu tất cả 1000000000… phần tử trong bộ nhớ được. 

Với n = 1000000000000000, chương trình sẽ bị đứng sau một hồi cố gắng hiu hiu, thương ghê!

```python
$ python generator.py
[1]    2247 killed     python generator.py
```


### Cách 2: dùng iterator

Đầu tiên, mình sẽ tiếp cận cách số 2 với bạn iterator trước nha, vì bạn này cũng giúp mình không lưu cả dãy như ở trên, và vẫn có thể xử lý trong tình huống này ha.

Ôkê, vì bạn ni hơi cực, nên mình lại nhắc xíu là mình tính làm gì nha. Đầu tiên là mình cần tạo một lớp có phương thức **\_\_iter\_\_** sau đó phương thức này trả ra iterator, ở đây là mình muốn gom hết vào một chỗ luôn, vì mình hiểu là iterator cũng là iterable nên mình sẽ return self ở đây. Sau đó mình sẽ tạo tiếp một phương thức **\_\_next\_\_** để self chính là iterator. 

Cùng xem code nha:

```python
class list_n_iterator(object):
    def __init__(self, n):
        # giới hạn là n
        self.n = n
        # bắt đầu từ 0
        self.next = 0

    def __iter__(self):
        # list_n vừa là iterable, vừa là iterator
        # vì nó có phương thức __iter__ và __next__
        return self

    def __next__(self):
        if self.next < self.n:
            # gán giá trị hiện tại của next
            current = self.next
            # tăng 1 cho next
            self.next = current + 1
            return current
        raise StopIteration

sum(list_n_iterator(100000000))
```

Còn đây là thời gian chạy của đoạn code với iterator nhé:

```python
$ python list_n_iterator.py  
time execute 0:06:08.411233
```

Và tất nhiên là đoạn code trên có thể hoạt động ổn hơn rồi. 

Tuy nhiên có vài vấn đề mà mình từng đoán trước đây như là:

– Nhiều code quá, gồm lớp rồi phương thức, …

– Và logic khá rối, trừ khi bạn hiểu sâu về iterator, iterable còn không thì nhìn vào đã hoa mắt rồi

Chưa hết, nếu dùng đoạn code này lại ở nhiều nơi sẽ làm cho code càng dài hơn đấy. Vì thế, Python đã hỗ trợ mình bạn generator, bạn này được giới thiệu từ [PEP255](https://www.python.org/dev/peps/pep-0255/).


Cách 3: dùng người anh hùng generator, chân ái khi làm việc với số lớn và dữ liệu lớn

Cùng viết lại code trên với generator nhé! Bạn sẽ ngạc nhiên vì độ thanh lịch của nó đấy!

```python
def list_n_generator(n):
    num = 0
    while num < n:
        yield num
        num += 1

sum(list_n_generator(1000000000))
```

Và thời gian của bạn này chạy là:

```python
$ python list_n_generator.py                                            
time execute 0:02:07.852190
```

*Lưu ý nhỏ là thời gian chỉ mang tính chất so sánh khách quan thôi nha, vì nó còn phụ thuộc vào máy của tớ nữa ý. *

## Cách tạo generator

### Cách 1: Dùng hàm generator

Đây chính là cách mà ví dụ ở trên dùng đấy. 

Để tạo hàm generator thì mình tạo hàm như bình thường và thay vì dùng return để trả về giá trị thì mình dùng yield để trả về giá trị.

### Cách 2: Dùng biểu thức generator

Ngoài ra còn có thể dùng biểu thức generator để tạo nữa, biểu thức này tương tự như list comprehension ấy, mà thay dấu [] bằng dấu () thôi

```python
>>> list_odds = [1, 3, 5, 7, 9]
>>> (x**2 for x in list_odds)
<generator object <genexpr> at 0x10b914b30>
```

Vậy là hôm nay mình đã cùng gặp qua sư phụ iterable, và chiến đấu với hai bạn tiểu yêu **iterator** và **generator** rồi. Bạn quái thú hai đầu này dù có sự giúp sức của sư phụ **iterable** nữa nhưng vẫn đầu hàng trước sự cố gắng của tụi mình và cả ba đều biến thành các bạn tiểu yêu xinh xắn rồi đó. 🥳

Những khái niệm này dễ gây nhầm lẫn nên mình và các bạn hãy chú ý khi sử dụng nha.

Và [bài gốc của nội dung này nằm trên blog cá nhân của tớ](https://beautyoncode.com/iterator-va-generator-trong-python/) nhé!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!