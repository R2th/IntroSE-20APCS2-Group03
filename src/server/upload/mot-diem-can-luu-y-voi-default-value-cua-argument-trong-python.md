Nguồn: 
https://qiita.com/yukinoi/items/57f6150c5d805d4b25e4

Những điều cần chú ý với giá trị đối số mặc định của Python.

Gần đây tôi gặp rắc rối với việc những giá trị đối số mặc định của Python tự ý hoạt động.
Nay tôi viết bài này để chia sẽ thông tin giúp sự việc này không xảy ra với các bạn. 
Môi trường là Python 3.7.7 và 3.8.3.

Giá trị đối số default là gì?
Ví dụ như trong đoạn code sau,
thì giá trị đối số default là dt=datetime.now()

```
from datetime import datetime


def show_second(dt=datetime.now()):
    print(dt.second)
```

Cái bẫy của giá trị đối số mặc định của Python 
Trong đoạn code ở trên, thì đã gọi hàm show_second một lần. Tôi đã chỉnh để  ba giây sau lại gọi hàm show_second một lần nữa.

```
import time
from datetime import datetime
def show_second(dt=datetime.now()):
    print(dt.second)

show_second()  #=> 23
time.sleep(3)
show_second()  #=> 23
```
Khi đó thì chuyện gì xảy ra? Dù đã sleep 3 giây nhưng mà khi gọi hàm show_second lần hai thì giá trị vẫn y hệt 3 giây trước.
Thời gian dừng lại ư? Hay là Za Warudo? Hay là dùng Stand của Arate? ( reference bộ truyện tranh JoJo Bizzare Adventure)

Hoạt động của  giá trị đối số mặc định Python


Tôi đã tìm hiểu trong tài liệu của Python thì thấy đoạn sau:
Giá trị đối số mặc định thì khi thực hiện định nghĩa hàm số, sẽ đánh giá từ trái san phải. 
```
Các giá trị đối số mặc định được ước tính từ trái sang phải khi định nghĩa hàm được thực thi. Điều này có nghĩa là biểu thức đối số mặc định chỉ được ước tính một lần khi hàm được xác định và cùng một giá trị "được tính" được sử dụng cho mỗi cuộc gọi.
from: https://docs.python.org/ja/3/reference/compound_stmts.html#function-definitions

```


Nói cách khác, giá trị đối số mặc định được ước tính một lần tại thời điểm xác định hàm, kết quả được lưu trong bộ nhớ và nếu giá trị đối số mặc định được sử dụng cho dù hàm đó được gọi bao nhiêu lần, kết quả đánh giá tại thời điểm xác định hàm được sử dụng. Nó dường như làm việc.

Vì vậy, thật nguy hiểm khi sử dụng cái gì đó như datetime.now () mang lại kết quả khác nhau mỗi lần bạn gọi và / hoặc thứ gì đó yêu cầu tính thời gian thực làm giá trị đối số mặc định.

Tương tự, bạn cần cẩn thận khi chỉ định danh sách hoặc từ điển làm giá trị đối số mặc định. (Cách sử dụng đối số mặc định trong các hàm và ghi chú Python | note.nkmk.me)

Các biện pháp chống lại các giá trị đối số mặc định trong Python

Vậy nên điều cần làm là đặt Không làm giá trị đối số mặc định và nếu không có giá trị, có vẻ tốt hơn là thay thế giá trị ban đầu muốn được đặt làm giá trị đối số mặc định.

Dưới đây là một ví dụ.
```
import time
from datetime import datetime

def show_second(dt=None):
    if dt is None:
        dt = datetime.now()
    print(dt.second)

show_second()  #=> 23
time.sleep(3)
show_second()  #=> 26
```
Trên đây là nội dung những điều cần chú ý về đối số mặc định Python.