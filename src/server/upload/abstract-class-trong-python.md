Hello everyone! Sau bao khó khăn thì chúng ta lại được gặp nhau mọi người nhỉ. Và như thường lệ, mình sẽ giới thiệu với mọi người về nội dung của bài viết ngày hôm nay. Ở bài viết [trước](https://viblo.asia/p/class-va-object-trong-python-4P856dvLZY3) mình đã trình bày với mọi người về Class và Object trong Python. Và hôm nay, để tiếp tục thì mình sẽ đưa mọi người đến với một loại class rất quan trọng đó là Abstract class (lớp trừu tượng). Are you ready? Here we go!<br>
# Abstract class là gì?
Một **Abstract** class có thể được coi là một bản thiết kế cho các class khác, cho phép bạn tạo một tập hợp các phương thức mà phải được tạo trong bất kỳ class con nào được xây dựng từ **Abstract** class của bạn. Một class có chứa một hoặc các **phương thức abstract** được gọi là một **Abstract** class. Một **phương thức abstract** là một phương thức có khai báo nhưng không có bất kỳ triển khai nào. Các **Abstract** class không thể khởi tạo và nó cần các class con để triển khai cho các phương thức abstract được định nghĩa trong các **Abstract** class.<br>
# Tại sạo phải sử dụng Abstract class?
Các Abstract class cho phép bạn cung cấp chức năng mặc định cho các class con. Bằng cách định nghĩa một abstract base class (lớp cơ sở trừu tượng), bạn có thể xây dựng nên một mô hình chung cho một nhóm các class con. Khả năng này đặc biệt hữu ích cho bạn khi làm việc trong một team lớn hoặc với dự án lớn, nơi mà bạn rất khó khăn hoặc không thể nào đưa mọi thứ vào trong một hoặc một nhóm các class nào đó. Lúc đó bạn cần có một mẫu class chung chứa các thứ cần thiết, sau đó thì chỉ cần implement nó vào để giải quyết thôi.<br>
## Abstract Base classes (ABC)
Mặc định trong Python sẽ không cung cấp Abstract class cho chúng ta sử dụng. Nhưng Python có một mô-đun gọi là Abstract Base Classes (ABC) để giúp chúng ta làm điều đó. Mô-đun này nằm trong package abc nên chúng ta cần import vào trước khi sử dụng.<br>
```
from abc import ABC
```
## Từ khóa `@abstractmethod`
Vì Abstract class là một class, nên các bạn có thể hoàn toàn khai báo thuộc tính và phương thức như một class bình thường. Và để khai báo được phương thức abstract thì các bạn cần import thêm mô-đun **abstractmethod** cùng với từ khóa `@abstractmethod`. Mô-đun này cũng nằm trong package abc nên các bạn có thể import như sau:<br>
```
form abc import ABC, abstractmethod
```
## Cú pháp khai báo Abstract class
```
form abc import ABC, abstractmethod
# câu này bắt buộc phải có nhé
class abstractClassName(ABC):
    [danh sách thuộc tính]
    [danh sách phương thức]
    @abstractmethod
    def methodName(self):
        pass

# tạo class thứ 2 implement từ abstractClassName
class normalClass(abstractClassName):
    # khai báo cho class ở đây
```
Trên đây là cú pháp khai báo một abstract class cơ bản. Ở đây mình dùng từ khóa `@abstractmethod` để khai báo rằng phương thức phía dưới là phương thức abstract. Cụ thể cách dùng các bạn có thể tham khảo ví dụ dưới đây.
# Ví dụ minh họa
Trong ví dụ này mình sẽ tạo một lớp đa giác (**Polygon**) là Abstract class. Trong lớp này có 3 phương thức abstract là `draw()`, `getArea()` và `getCircuit()`. Và 2 class sẽ implement cái class **Polygon** này là **Rectangle** và **Square**. Dưới đây là code của 2 class và file main.py<br>
class Polygon<br>
![](https://images.viblo.asia/7f6b9db4-b306-4f21-9450-6851c3039b0a.png)<br>
class Rectangle<br>
![](https://images.viblo.asia/17b75b70-9f1f-4875-9f3c-90a8e877108b.png)<br>
class Square<br>
![](https://images.viblo.asia/fd863895-5970-44bb-9e2f-7135be6a0af7.png)<br>
Như các bạn thấy, trong 2 class trên mình đã tiến hành định nghĩa lại cho phương thức abstract đã được khai báo trong class Polygon.<br>
file main.py<br>
![](https://images.viblo.asia/417dadba-b76c-4872-b170-fbe5e6a5045c.png)<br><br>
Và đây là kết quả của mình:<br>
![](https://images.viblo.asia/292e28d2-8bd3-40de-a024-3b28c547c465.png)
# Kết luận
Như vậy là mình đã giới thiệu xong với các bạn một trong những class very very important trong Python rồi nhé. Qua đó mình xin tổng kết lại một số thứ như sau:<br>
* Đầu tiên, để có thể tạo một abstract class ta cần import 2 mô-đun là **ABC** và **abstractmethod** trong package **abc**.
* Dùng cú pháp `class abstractClassName(ABC):` để khai báo Abstract class.
* Dùng từ khóa `@abstractmethod` để chỉ ra những phương thức abstract.
* Dùng cú pháp `class normalClassName(abstractClassName):` để implement 1 Abstract class.
* Cần phải định nghĩa lại phương thức abstract trong những class con được implement từ Abstract class.
* Một Abstract class không phải là một class cụ thể, nó không thể được khởi tạo.

Cảm ơn các bạn đã cố gắng xem hết bài viết, chúc các bạn thành công.