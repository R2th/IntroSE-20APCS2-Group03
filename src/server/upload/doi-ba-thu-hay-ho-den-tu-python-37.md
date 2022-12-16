Một điều khá hay ho ở python đó là mọi thứ đều được viết theo phong cách `explicit` khiến người dùng dễ hiểu được bản chất của code (đơn giản nhất là "nó từ đâu đến?". Tuy nhiên, điều này cũng đồng nghĩa với hai chữ `phiền phức`, lúc đặt debug, lúc viết class mới, ..v.v Phiên bản này đây sẽ giúp chúng ta thoải mái hơn khi code với python.

### Breakpoint
Như các bản trước của python, thì mỗi khi đặt debug, ta lại phải dí cái dòng này vô, ghõ đến mòn cả tay
```
foo()
import pdb; pdb.set_trace()  # debug, cái này ghõ nhiều đến mức viết tay còn nhanh hơn autocomplete :v..
bar()
```
Giờ đây, sẽ đơn giản chỉ là
```
foo()
breakpoint()  # ngắn hơn tí, mà đọc nó cũng "make sense"
bar()
```
Thêm nữa, nếu ta thêm một biến môi trường `PYTHONBREAKPOINT=0` thì `breakpoint` sẽ được skip! Như vậy thì sao ư? Ta sẽ chả cần phải lo để quên `breakpoint` ở trên production nữa (dù chả mấy khi nó xay ra, cơ mà ko cần lo nghĩ vẫn tốt hơn đúng ko ;))

### Dataclass
Dù có cố phủ nhận như thế nào đi chăng nữa thì viết một class thông thường trong python khá là thốn, nào là `__init__`, nào là `__repr__`, .. sơ sơ chưa có tí logic nào đã cần phải có 2 cái rồi
```
class Foo:

    def __init__(self, bar, boo='..'):  # viết cái constructor kiểu này dễ ngán quá trời
        self.bar = bar
        self.boo = boo
    
    def __repr__(self):
        return "1 đoạn string gì đó đễ object dễ đọc thay vì địa chỉ của nó trong bộ nhớ"
        
    def some_behavior(self):
       # cuối cùng cũng đến lượt mình T_T
```
Với dataclass, viết class trong python sẽ ngắn gọn và tiện lợi hơn rất nhiều
```
from dataclasses import dataclass, field

@dataclass(order=True)
class Foo:
     bar: str  # á đù có cả declare type luôn
     boo: str = '..'
     
     def some_behavior(self):
         # ớ đến lượt t rồi hả? sớm zậy?
```

### Unittest - mode K
Cái unittest khá khó chịu là chạy test theo group mà cấu trúc vật lý nó méo theo group thì lại mất công đánh dấu gom chúng lại bằng decorator, cơ mà lười nên lại gõ path chạy từng cái một :|
```
python -m unittest -v tests.test_abc.test_create
python -m unittest -v tests.test_xyz.test_create
...
```
Với cái 3.7 thì chúng ta có thể dùng regex để lọc test với lệnh `-k`, trong 1 vài trường hợp (như trên), cuộc sống sẽ trở nên tươi đẹp hơn hết
```
python -m unittest -k create  # tuyệt vời!
```

### Kết
Những điều kể trên không quá nhiều và cũng không phải là tất cả nội dung cập nhật của 3.7. Cơ mà với việc phát triển web thì tôi mấy cái kể trên thật quá là tuyệt. Lót dép hóng bản tiếp theo ..