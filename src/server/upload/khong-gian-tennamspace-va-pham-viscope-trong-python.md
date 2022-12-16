![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/01/background-namespace.jpg?w=1280&ssl=1)

Khi mình ngồi học và dịch bài ["Class trong Python"](https://docs.python.org/3/tutorial/classes.html) cho sê-ri ["Khám Phá Đại Bản Doanh Python"](https://viblo.asia/s/kham-pha-dai-ban-doanh-python-OVlYq8Ozl8W), mình đã đụng hai bạn này, và các bạn thật là trừu tượng và khó gặm. Thế là mình tìm kiếm và viết bài này để hiểu rõ hơn về hai bạn ấy, hi vọng bạn đọc thêm để hiểu về Python nhé.

## Không gian tên là gì?

Không gian tên(namespace) là một không gian chứa các tên =)) 

Thật đó, tên là các định danh, và không gian là các cấu trúc hay các tổ chức, hoặc hiểu đơn giản nó là một vùng nào đó.  

Không gian tên trong Python giống như là bảng phân công theo dõi công việc của một nhóm người vậy đó. Bảng phân công thì theo dõi tên người, còn không gian tên trong Python thì theo dõi tên các đối tượng.

*Thế đối tượng trong Python là gì nhỉ?*

Có thể bạn đã biết, mọi thứ trong Python đều là đối tượng. Khi mình viết chương trình Python, chúng ta định nghĩa các lớp và mô-đun; sử dụng các cấu trúc list, dict; các thực thể và các hàm.  Tất cả bọn chúng đều là đối tượng cả đó.

Không gian tên trong Python thì theo dõi tên các đối tượng, chẳng hạn như các như các thực thể của đối tượng và các hàm chức năng. Dưới đây là vài đặc điểm quan trọng của khái niệm này:

### Không gian tên thể hiện ở dạng từ điển

Vì không gian tên thể hiện ánh xạ giữa tên và đối tượng, do đó kiểu dữ liệu có thể thể hiện tham chiếu này chính là từ điển(dict), vì bạn ấy cũng có dạng tham chiếu key-value.

Ví dụ về không gian tên bằng gọi hàm globals(), locals():

```python
>>> a = [1, 2, 3, 4, 5]
>>> 
>>> def foo():
...     b = 11
...     print(locals())
... 
>>> class Student:
...     pass
... 
>>> student = Student()
>>> print(globals())
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, 'a': [1, 2, 3, 4, 5], 'b': 'Hello World!', 'foo': <function foo at 0x101fd93b0>, 'foo0': <function foo at 0x10200c7a0>, 'foo1': <function foo at 0x10200c7a0>, 'tracked_namespaces': {'local': {}}, 'tracked_keys': dict_keys(['local']), 'ns': <module 'namespaces_student' from '/Users/ycui/PythonProjects/namespaces_student.py'>, 'working_hard': True, 'Student': <class '__main__.Student'>, 'Teacher': <class 'namespaces_teacher.Teacher'>, 'student': <__main__.Student object at 0x102027490>}
>>> foo()
{'b': 11}
```

Hàm dựng sẵn **globals()** dùng để xem các định danh đi kèm với các đối tượng tương ứng của chính trong không gian tên hiện tại. Kết quả là danh sách các đối tượng được định nghĩa như list, function, class hay thực thể và các hàm dựng sẵn.

Bên cạnh globals() được sử dụng để theo dõi các đối tượng trong mô-đun như ở không gian tên toàn cục như trên, chúng ta còn có thể dùng **locals()** là hàm theo dõi các đối tượng trong một hàm nào đó như là không gian tên địa phương của hàm đó. Trong ví dụ, biến địa phương b được theo dõi trong không gian tên địa phương của hàm foo.

### Không gian tên có tính linh hoạt

Không gian tên được dùng để theo dõi các đối tượng. 

Trong Python code, chúng ta tạo ra các đối tượng cố định và xoá các đối tượng không còn được dùng nữa, do đó không gian tên cũng sẽ thay đổi theo dựa trên các thao tác này.

Cùng xem ví dụ khi thực hiện thao tác thêm và xoá các thuộc tính sẽ làm thay đổi không gian tên:

```python
>>> a = [1, 2, 3, 4, 5]
>>> print(globals().keys())
dict_keys(['__name__', '__doc__', '__package__', '__loader__', '__spec__', '__annotations__', '__builtins__', 'a'])
>>> b, c = 'Hi', (1, 2)
>>> print(globals().keys())
dict_keys(['__name__', '__doc__', '__package__', '__loader__', '__spec__', '__annotations__', '__builtins__', 'a', 'b', 'c'])
>>> del c
>>> print(globals().keys())
dict_keys(['__name__', '__doc__', '__package__', '__loader__', '__spec__', '__annotations__', '__builtins__', 'a', 'b'])
```

Khi một hàm được gọi, nó tạo ra một không gian tên cục bộ, và không gian tên này sẽ mất đi khi hàm hoàn thành nhiệm vụ của mình(trả về giá trị hoặc raise lỗi). Khi đó, không gian tên cũng sẽ bị thay đối.

### Phạm vi là hàng rào của không gian tên

Để cho dễ hình dung, bạn có thể nghĩ đến scope như là hàng rào quanh nhà bạn, còn namespace là toàn bộ đất trong đó, và trên đất có thể bao gồm cây cối, nhà cửa, .... là các đối tượng.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/01/namespace-scope-pyhon-1.png)

Bạn thấy không, không gian tên theo dõi các đối tượng trong mô-đun này, vì tụi này nằm trong không gian của nó, còn phạm vi chính là đường màu cam thể hiện hàng rào bọc ngoài không gian tên này. 

Nói cách khác, nếu mình muốn sử dụng attr0 nằm trong mô-đun ở trên ở một hàm “bo” chẳng hạn, nếu hàm này không thể truy cập vào phạm vi này thì không thể dùng biến đó được.

Cùng xem một ví dụ nhé:

Đây là code trong file namespace_student.py

```python
working_hard = True

class Student:
   def study(self):
      print("I'm studing.")
```

Truy cập vào trình biên dịch PI:

```python
>>> print(f'working_hard: {working_hard}')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'working_hard' is not defined
>>> import namespace_student as ns
>>> print(f'working_hard: {ns.working_hard}')
working_hard: True
>>> print(globals())
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <class '_frozen_importlib.BuiltinImporter'>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, 'ns': <module 'namespace_student' from '/Users/thanhnguyen/Desktop/namespace/namespace_student.py'>}
```

Khi mình làm việc trong PI, mô-đun mặc định ở đây là main, nơi không gian tên có `__main__` là giá trị của `__name__`.

Dòng đầu tiên print, mình không thể truy cập vào biến working_hard vì tụi mình đang không đứng trong mô-đun namespace_student. Tuy nhiên, sau khi mình nạp mô-đun này vào, thì mình có thể truy cập tên này không qua tên mô-đun của nó vì ns đã thuộc không gian tên nơi mình đang đứng(main). Mình có thể kiểm tra điều đó bằng hàm in ra không gian tên globals như ở trên.

Vì mình có thể dùng tên của mô-đun để truy cập vào các thuộc tính trong đó, cho nên ở các mô-đun khác nhau hoàn toàn có thể chứa các tên giống nhau.

Bạn có thể hình dung nó kiểu như là nhà mình có một cái macbook, nhà hàng xóm cũng có một cái macbook y như vậy, thì hai cái macbook này mình có thể hoàn toàn phân biệt được đúng không nào 😀

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/01/namespace-scope-pyhon-2.png?w=1280&ssl=1)

### Không gian tên và phạm vi đều phân cấp

Bạn có để ý thấy chỉ cần truy cập vào trình biên dịch là mình có thể sử dụng các hàm dựng sẵn của Python như print() hay các kiểu dữ liệu như dict(), list(). 

Vậy các bạn này từ đâu ra thế nhỉ ? Vâng, các bạn này thuộc không gian tên dựng sẵn(built-in) đó ạ.

Còn khi tạo một mô-đun, ta sẽ có không gian tên toàn cục(global) của mô-đun đó, khi tạo một hàm mình có không gian tên cục bộ(local) của hàm đó. Khi các không gian tên được tạo thì các phạm vi tương ứng của chúng cũng được tạo.

> **Đặc điểm quan trọng của không gian tên là chúng có mối quan hệ phân cấp như vậy.** 

Biểu đồ dưới thể hiện sự phân cấp này: không gian tên và phạm vi dựng sẵn bao trùm không gian tên và phạm vi toàn cục, và lớp này bao trùm không gian tên và phạm vi cục bộ.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/01/namespace-scope-pyhon-3.png?w=1280&ssl=1)

### Hiểu luật LEGB

Vì phạm vi xác định việc có thể truy cập đối tượng trong một ranh giới nhất định và chúng có tính phân cấp như trên, những điều này dẫn đến việc chúng cần hiểu và nắm quy luật **LEGB** – một nguyên tắc giúp xác định thứ tự các phạm vi.

LEGB là viết tắc của các phạm vi **local**, **enclosing**, **global** và **built-in**.

Ở trên, mình có đề cập đến các loại phạm vi: local, global, built-in rồi. Thế còn phạm vi bao quanh(enclosing) nghĩa là gì nhỉ?

Cùng nhìn ví dụ sau về phạm vi bao quanh nha:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/01/1_NrD4tbuRGT1yLy9gNezGng.png?w=1280&ssl=1)

Ở ví dụ trên, mình có hàm *outer_function* có hàm bên trong là *inner_function*, hàm này có phạm vi cục bộ của riêng nó. Với hàm *inner_function*, phạm vi của hàm *outer_function* gọi là **phạm vi bao quanh**(enclosing scope), tức nó bọc luôn hàm bên trong.

Do đó khi hàm *inner_function* được goi, dù local scope của nó không có hai biến a, b, nhưng trình thông dịch tiếp tục tìm kiếm ở enclosing scope và tìm được hai biến này, do đó kết quả trên được hiển thị ba biến a, b, c.

Nếu không thể tìm thấy biến cần tìm không enclosing scope, chương trình sẽ tiếp tục tìm kiếm ở global scope của mô-đun và nếu không có nữa sẽ tìm kiếm tới built-in scope.

Nếu tìm hết bốn scope mà vẫn không tìm ra thì chương trình sẽ báo lỗi NameError để chỉ cho mình biết giá trị này chưa được định nghĩa.

Do đó, nguyên tắc LEGB định nghĩa thứ tự tìm kiếm của tên theo thứ tự như sau:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/01/1_Wc-YlKPDuImP4_4TGfbt_g.png?w=1280&ssl=1)

Và thêm nữa, nếu tên đã được tìm kiếm ở cấp nào rồi, thì chương trình sẽ dừng việc tìm kiếm lại và sử dụng tên đó chứ không đi tìm ở những lớp trên nữa nha, vì tìm ra rồi thì dùng liền chớ hỉ.

Ví dụ như ở trên biến a gọi trong hàm inner_function sẽ có giá trị là 11, chứ chương trình không tìm tiếp cấp ở ngoài, nơi a có giá trị là 1 đó. 

### Kết

Nội dung bài không gian tên và phạm vi đến đây tạm hết rồi, cùng ôn lại hôm ni mình học được gì:

- Không gian tên sử dụng dict để theo dõi các đối tượng cùng định danh của chúng

- Không gian tên có thể tạo thêm hay xoá bớt một cách linh hoạt

- Không gian tên có ranh giới chính là scope, định nghĩa phạm vi tên có thể tìm thấy

- Thứ tự tìm tên tuân theo luật LEGB(local, enclosing, global, built-in)


Bài viết gốc ở [beautyoncode.com](https://beautyoncode.com/khong-gian-ten-va-pham-vi-trong-python/) ạ.

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