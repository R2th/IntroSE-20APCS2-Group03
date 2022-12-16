Hãy cùng khám phá hai thư viện Python  itertools và more_itertools và xem cách tận dụng chúng để xử lý dữ liệu.
Có rất nhiều thư viện Python tuyệt vời, nhưng hầu hết trong số đó không phải là gần với những gì itertools tích hợp và more_itertools cung cấp. Hai thư viện này thực sự rất đầy đủ khi xử lý / lặp lại một số dữ liệu trong Python. Tuy nhiên, thoạt nhìn, các chức năng trong các thư viện đó có vẻ không hữu ích, vì vậy, hãy đi lần lượt những điều thú vị nhất, bao gồm các ví dụ về cách tận dụng tối đa chúng!
# 1. Compress
```
dates = [
    "2020-01-01",
    "2020-02-04",
    "2020-02-01",
    "2020-01-24",
    "2020-01-08",
    "2020-02-10",
    "2020-02-15",
    "2020-02-11",
]

counts = [1, 4, 3, 8, 0, 7, 9, 2]

from itertools import compress
bools = [n > 3 for n in counts]
print(list(compress(dates, bools)))  # Compress returns iterator!
#  ['2020-02-04', '2020-01-24', '2020-02-10', '2020-02-15']
```
Bạn có khá nhiều tùy chọn khi lọc các chuỗi, một trong số đó là compress  trong đó có bộ chọn iterable và boolean và xuất ra các mục của iterable trong đó phần tử tương ứng trong bộ chọn là true

Chúng ta có thể sử dụng điều này để áp dụng kết quả của việc lọc một chuỗi này sang chuỗi khác, như trong ví dụ trên, nơi chúng ta tạo danh sách các ngày trong đó số lượng tương ứng lớn hơn 3.
# 2. Accumulate
Như tên cho thấy - chúng ta sẽ sử dụng chức năng này để tích lũy kết quả của một số hàm (nhị phân). Ví dụ về điều này có thể được chạy max hoặc giai thừa:
```
from itertools import accumulate
import operator

data = [3, 4, 1, 3, 5, 6, 9, 0, 1]

list(accumulate(data, max))  # running maximum
#  [3, 4, 4, 4, 5, 6, 9, 9, 9]

list(accumulate(range(1, 11), operator.mul))  # Factorial
#  [1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
```
Nếu bạn không quan tâm đến kết quả trung gian, bạn có thể sử dụng functools.reduce  chỉ giữ giá trị cuối cùng và hiệu quả bộ nhớ cao hơn.
# 3. Cycle
Hàm này có thể lặp lại và tạo chu kỳ vô hạn từ nó. Điều này có thể hữu ích ví dụ trong game, nơi người chơi thay phiên nhau. Một điều tuyệt vời cycle tạo ra vòng quay vô hạn
```
# Cycling through players
from itertools import cycle

players = ["John", "Ben", "Martin", "Peter"]

next_player = cycle(players).__next__
player = next_player()
#  "John"

player = next_player()
#  "Ben"
#  ...

# Infinite Spinner
import time

for c in cycle('/-\|'):
    print(c, end = '\r')
    time.sleep(0.2)
```

# 4. Tee
Cuối cùng từ module itertools là tee, hàm này tạo ra nhiều vòng lặp từ một, cho phép chúng ta nhớ những gì đã xảy ra. Ví dụ về điều đó là hàm cặp từ các công thức itertools (và cả more_itertools), trả về các cặp giá trị từ iterable đầu vào (giá trị hiện tại và trước đó):
```
from itertools import tee

def pairwise(iterable):
    """
    s -> (s0, s1), (s1, s2), (s2, s3), ...
    """
    a, b = tee(iterable, 2)
    next(b, None)
    return zip(a, b)
```
Chức năng này rất hữu ích mỗi khi bạn cần nhiều con trỏ riêng biệt cho cùng một luồng dữ liệu. Hãy cẩn thận khi sử dụng nó, vì nó có thể khá tốn kém khi nói đến bộ nhớ. Cũng cần lưu ý là bạn không nên sử dụng một bản gốc sau khi bạn sử dụng tee vì nó đã trở thành object tee mới
# 5. Divide
Đầu tiên lên từ more_itertools là devide. Như tên cho thấy, nó chia iterable thành số lần lặp phụ. Như bạn có thể thấy trong ví dụ dưới đây, độ dài của các lần lặp phụ có thể không giống nhau, vì nó phụ thuộc vào số lượng phần tử được chia và số lượng các lần lặp phụ.
```
from more_itertools import divide
data = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"]

[list(l) for l in divide(3, data)]
#  [['first', 'second', 'third'], ['fourth', 'fifth'], ['sixth', 'seventh']]

```

# 6. Partition
Với chức năng này, chúng ta cũng sẽ phân chia lần lặp, tuy nhiên lần này, bằng cách sử dụng một predicate
```
# Split based on age
from datetime import datetime, timedelta
from more_itertools import partition

dates = [ 
    datetime(2015, 1, 15),
    datetime(2020, 1, 16),
    datetime(2020, 1, 17),
    datetime(2019, 2, 1),
    datetime(2020, 2, 2),
    datetime(2018, 2, 4)
]

is_old = lambda x: datetime.now() - x < timedelta(days=30)
old, recent = partition(is_old, dates)
list(old)
#  [datetime.datetime(2015, 1, 15, 0, 0), datetime.datetime(2019, 2, 1, 0, 0), datetime.datetime(2018, 2, 4, 0, 0)]
list(recent)
#  [datetime.datetime(2020, 1, 16, 0, 0), datetime.datetime(2020, 1, 17, 0, 0), datetime.datetime(2020, 2, 2, 0, 0)]


# Split based on file extension
files = [
    "foo.jpg",
    "bar.exe",
    "baz.gif",
    "text.txt",
    "data.bin",
]

ALLOWED_EXTENSIONS = ('jpg','jpeg','gif','bmp','png')
is_allowed = lambda x: x.split(".")[1] in ALLOWED_EXTENSIONS

allowed, forbidden = partition(is_allowed, files)
list(allowed)
#  ['bar.exe', 'text.txt', 'data.bin']
list(forbidden)
#  ['foo.jpg', 'baz.gif']
```
Trong ví dụ đầu tiên ở trên, chúng ta đang chia danh sách ngày thành những ngày gần đây và ngày cũ, sử dụng đơn giản lambda.  Đối với ví dụ thứ hai, chúng ta đang phân vùng các tệp dựa trên phần mở rộng của chúng, một lần nữa sử dụng hàm lambda để chia tên tệp thành tên và phần mở rộng và kiểm tra xem phần mở rộng có nằm trong danh sách các phần mở rộng được phép hay không.
# 7.  Consecutive_groups
Nếu bạn cần tìm các chuỗi số liên tiếp, ngày tháng, chữ cái, booleans hoặc bất kỳ đối tượng có thứ tự nào khác, thì bạn có thể tìm thấy consecutive_groups :
```
# Consecutive Groups of dates
import datetime
import more_itertools
  
dates = [ 
    datetime.datetime(2020, 1, 15),
    datetime.datetime(2020, 1, 16),
    datetime.datetime(2020, 1, 17),
    datetime.datetime(2020, 2, 1),
    datetime.datetime(2020, 2, 2),
    datetime.datetime(2020, 2, 4)
]

ordinal_dates = []
for d in dates:
    ordinal_dates.append(d.toordinal())

groups = [list(map(datetime.datetime.fromordinal, group)) for group in more_itertools.consecutive_groups(ordinal_dates)]

```
Trong ví dụ này, chúng ta có một danh sách các ngày, trong đó một số trong số đó là liên tiếp. Để có thể chuyển những ngày này sang hàm liên tiếp, trước tiên chúng ta phải chuyển đổi chúng thành số thứ tự. Sau đó, bằng cách sử dụng tính năng hiểu danh sách, chúng tôi lặp lại qua các nhóm ngày thứ tự liên tiếp được tạo bởi liên tiếp_groups và chuyển đổi chúng trở lại datetime.datetime bằng cách sử dụng các hàm map và fromordinal.

# 8.  Side_effect
Hãy nói rằng bạn cần gây ra tác động phụ khi lặp lại danh sách các mục. Tác động phụ này có thể là ví dụ ghi nhật ký log, ghi vào tệp hoặc giống trong ví dụ bên dưới đếm số sự kiện đã xảy ra:

```
import more_itertools
num_events = 0

def _increment_num_events(_):
    nonlocal num_events
    num_events += 1

# Iterator that will be consumed
event_iterator = more_itertools.side_effect(_increment_num_events, events)

more_itertools.consume(event_iterator)

print(num_events)
```