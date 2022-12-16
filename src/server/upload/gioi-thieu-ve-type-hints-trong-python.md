## **I. Type Hints là gì ?**

Từ khi đi học đến lúc đi làm chắc chúng ta cũng được học qua vài ba ngôn ngữ lập trình như java, c, c++, php, javascript.
Nhưng chúng ta có thể đã biết và không để ý thì chúng được chia làm 2 loại là **Statically typed** và **Dynamically typed**.

**Statically typed languages** có thể hiểu là khi khai báo hàm và các param của nó thì kiểu dữ liệu của nó phải được biết tại thời điểm biên dịch. Điều này có nghĩa là khi chúng ta lập trình chúng ta phải khai báo kiểu của biến một cách tường minh.
Một số ngôn ngữ thuộc kiểu này như là C, C++, Java...


**Dynamically typed languages** được hiểu như là kiểu của biến được liên kết với giá trị lúc run-time. Điều này có nghĩa là khi lập trình chúng ta không cần khai báo kiểu của một biến. Với một biến được khai báo, chúng ta có thể tùy ý gán gía trị bất kì cho nó mà không cần quan tâm tới kiểu của nó là gì. Nó sẽ tự động ép kiểu khi nhận được giá trị.
Một số ngôn ngữ cùng có kiểu như vậy: Ruby, PHP, JavaScript, python...

Có thể thấy Python thuộc loại **Dynamically typed languages**. Không cần quan tâm kiểu dữ liệu đầu vào, điều này sẽ giúp chúng ta viết code nhanh hơn một chút. Nhưng đi kèm với đó trong nhiều trường hợp nó sẽ không được tường minh và làm chúng ta bối rối trong quá trình debug. Một đầu vào tùy biến sẽ làm chúng ta mất nhiều thời gian về những trường hợp của nó có thể xảy ra.

Từ phiên bản python 3.5. Python cho ra mắt một tính năng là  **Type Hints**. Mục đích là cung cấp một cú pháp tiêu chuẩn cho chú thích kiểu của dũ liệu đầu vào và đầu ra. Điều này thì được khuyến khích chứ không bắt buộc để không làm thay đổi bản chất của **Dynamically typed languages**.

## **II. Cách sử dụng**
### **1. Variable Annotations**
Thông thường biến sẽ được gán như sau:
```
a = 3
b = 3.14
c = 'abc'
d = False
e = ['a', 'b', 'c']
f = (1, 2, 3)
g = {'a': 1, 'b': 2}
```
Nhưng chúng ta có thể chú  thích đêr người sau đọc có thể dễ hình dung hơn

```
a: int = 3
b: float = 3.14
c: str = 'abc'
d: bool = False
e: list = ['a', 'b', 'c']
f: tuple = (1, 2, 3)
g: dict = {'a': 1, 'b': 2}
```
Nếu gán biến bình thường mà viết thế này thì sẽ rất dài dòng và có thể làm cho chúng ta thấy ghét. Nhưng nếu viết bên trong hàm thì có thể hữu ích hơn.
```
>>> def add_number(p1: int = 1, p2: int = 2):
...     p3: int = 3
...     return p1+p2+p3
... 
>>> add_number()
6
```
Nếu nhìn đơn giản có thế thấy là biến p3 đươc chú thích kiểu sẽ không có tác dụng gì nhiều. Nhưng thử nghĩ nếu 1 function quá dài và nhiều biến. Với việc gán đi lại lại có thể sẽ làm sai  kiểu dữ liệu chúng ta mong muốn. Thì khi nhìn vào  function với chú thích như vậy sẽ tốt hơn việc phải debug lại từ đầu xem biến đó nên là kiểu dữ liệu gì.
### **2. Function Annotations**
Hãy bắt đầu với việc không dùng type hints.
```
>>> def add_two_param(p1, p2):
...     return p1 + p2

>>> print(add_two_param(3, 5))
8
>>> type(add_two_param(3,5))
<class 'int'>

>>> print(add_two_param("thai", "son"))
thaison
>>> type(add_two_param("thai", "son"))
<class 'str'>
```
Cũng không có gì đăc biệt ở đây. Có thể thấy với cùng một hàm mà ta có thể truyền nhiều giá trị đầu vào và kết quả có thể trả lại nhiều kiểu dữ liệu khác nhau.

Để sử dụng type hints và muốn chú thích rằng đối số truyền vào cần phải là kiểu int và kết quả trả về cũng là kiểu int thì chúng ta làm như sau:
```
>>> def add_two_param(p1: int, p2: int) -> int:
...     return p1 + p2
```

Để thêm giá trị mặc định cho biến:
```
>>> def add_two_param(p1: int = 10, p2: int = 20) -> int:
...     return p1+p2
... 
>>> add_two_param()
30
```
### **3. Module typing**
Module typing của python có thể làm cho viêc khai báo trở nên dài dòng hơn.

Đối với biến:
```
from typing import List, Tuple, Dict
e: List[str] = ['a', 'b', 'c']
f: Tuple[int, int, int] = (1, 2, 3)
g: Dict[str, int] = {'a': 1, 'b': 2}
```
Đối với function:
```
def squre(arr: List[float]) -> List[float]:
    return [x ** 2 for x in arr]
print(squre([1, 2, 3])) # 1, 4, 9
```
Có thể tùy biến đầu vào là  int hoặc float bằng các dùng toán tử `Union`
```
def square(arr: List[Union[int, float]]) -> List[Union[int, float]]:
    return [x ** 2 for x in arr]
print(squre([1, 2, 3])) # 1, 4, 9
```
Làm như vầy thì có thể cho chúng ta biết là nó chấp nhận đầu vào là int hoặc float và có thể trả về là int hoặc float.
Còn rất nhiều option khác để có thể phù hợp với bài toán. Các bạn có thể tham khảo ở  [đây](https://docs.python.org/3/library/typing.html).

### **4. mypy**
Tất cả những gì ở trên viết là để chú thích cho 1 hàm, 1 function dễ học hơn.
Những người đọc code của chúng ta sẽ cảm thấy dễ chịu hơn. Nhưng nếu không có cũng không sao.
Một việc khác là nếu chúng ta chú thích sai thì điều này sẽ làm mọi việc tồi tệ hơn.
Rõ ràng chú thích đầu vào kiểu int, mà truyền kiểu int vào cứ bị sai sai.
Do vậy mình xin giới thiệu một thư viện là **mypy**. Nó sẽ giúp chúng ta validate tất cả những gì chúng ta chú  thích.
Nếu không chú thích gì thì nó sẽ bỏ qua.
Ví dụ:
test_hint.py
```
def square(number: int) -> int:
    return number ** 2
    
if __name__ == '__main__':
    print(square(3))
    print(square(3.14))
```
Khi chạy file này với mypy thì kết quả như sau:
```
test_hint.py:6: error: Argument 1 to "square" has incompatible type "float"; expected "int"
Found 1 error in 1 file (checked 1 source file)
```

Nó đã bắt validate và thông báo rõ ràng rằng đầu vào accept là int mà truyền vào float.

Nếu chúng ta sửa file python trên như sau
```
from typing import Union

def square(number: Union[int, float]) -> Union[int, float]:
    return number ** 2
    
if __name__ == '__main__':
    print(square(3))
    print(square(3.14))
```
Khi chạy lại mypy:
```
Success: no issues found in 1 source file
```
## **III. Kết Luận**
Việc sử dụng type hints là vừa có mặt lợi vừa có mặt hại. Mặt lợi là giúp chúng ta debug, check lỗi dễ dàng hơn. Code đọc sẽ dễ hiểu hơn. Nhưng mặt hại thì làm code trở lên dài dòng, tốn thời gian. Nên việc sử dụng nó một cách linh hoạt sẽ giúp công việc của chúng ta trở nên nhanh chóng hơn. 

Với tôi, tôi thường sử dụng nó trong việc khai báo hàm, đối với biến thì rất ít khi. Hãy giữ cho code gọn gàng và dễ đọc nhất.
Cảm ơn đã đọc bài viết.

Tham khảo:
- https://docs.python.org/3/library/typing.html#
- https://towardsdatascience.com/type-hints-in-python-everything-you-need-to-know-in-5-minutes-24e0bad06d0b