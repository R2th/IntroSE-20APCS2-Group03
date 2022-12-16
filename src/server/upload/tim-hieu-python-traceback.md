Python in một traceback khi có một exception đc gây lên khi chạy code của bạn. Traceback được in ra có thể gây choáng ngợp nếu lần đầu nhìn thấy hoặc bạn cũng không thể hiểu nó ghi nội dung gì mà tìm lỗi để sửa. Nhưng Python traceback có rất nhiều thông tin có thể giúp bạn suy đoán và khắc phục lý do exception gây ra trong code của bạn. Hiểu được thông tin của một Python traceback sẽ giúp bạn code dễ dàng hơn
# 1. Vậy Python traceback là gì ?
Một traceback là một báo cáo chứa các hàm được thực hiện trong code của bạn tại một thời điểm cụ thể. Traceback được biết đến với nhiều tên, bao gồm stack trace, strack traceback, backtrace, ... Khi kết quả của chương trình của bạn là 1 exception, Python sẽ in ra traceback lập tức để giúp bạn biết bạn sai ở đâu. Dưới đây là ví dụ:
```
# example.py
def greet(someone):
    print('Hello, ' + someon)

greet('Chad')
```
```
$ python example.py
Traceback (most recent call last):
  File "/path/to/example.py", line 4, in <module>
    greet('Chad')
  File "/path/to/example.py", line 2, in greet
    print('Hello, ' + someon)
NameError: name 'someon' is not defined
```
Traceback in ra có tất cả các thông tin bạn sẽ cần để giải quyết lỗi này. Ở dòng cuối của traceback sẽ nói cho bạn loại exception được gây lên với một số thông tin về lỗi đó. Các dòng trước đó chỉ ra code dẫn đến lỗi. Ở traceback trên, exception tên là NameError, với ý nghĩa có liên quan đến tên (variable, function, class) không được định nghĩa. Trong trường hợp này là tên *someon*

# 2. Đọc một python traceback như thế nào ?
Python traceback bao gồm nhiều thông tin hữu ích khi bạn cố xác định lý do cho 1 exception gây lên trong code. Trong phần này bạn sẽ đi qua các tracebacks khác nhau để hiểu những thông tin khác nhau của chúng.
## Python Traceback Overview
Có một số phần cho mỗi lần truy xuất Python rất quan trọng. Sơ đồ dưới đây nêu bật các phần khác nhau:
![](https://images.viblo.asia/bb37bd82-1560-4677-9de3-31e334d10b6b.png)

Trong Python, cách tốt nhất để đọc traceback là từ dưới lên trên
* màu lam: dòng cuối của traceback là dòng thông báo lỗi, nó bao gồm tên exception
* màu xanh lục: sau tên exception là thông báo lỗi, thông báo thường gồm thông tin hứu ích giúp hiểu lý do gây ra lỗi
* màu vàng: chia làm các line của các hàm liên quan. Mỗi dòng bao gồm thông tin như tên file, số dòng, tên module, chỉ định rõ code bạn có thể tìm
* màu đỏ: dòng thứ 2 của mỗi line trên , chỉ chính xác code thực thi như thế nào
# 3. Một số Tracebacks phổ biến trong python
Biết cách đọc một traceback khi bị gây ra exception và đặc biệt nhận biết các traceback phổ biến sẽ giúp bạn tăng tốc trong quá trình xử lý exception
Dưới đây là một số trường hợp ngoại lê phổ biến bạn có thể gặp phải, nguyên nhân gây ra, ý nghĩa như thế nào
## AttributeError
AttributionError được gây lên khi bạn cố truy cập một thuộc tính trên một đối tượng không có thuộc tính đó được xác định. Tài liệu Python xác định khi exception này được nêu ra:
```
Raised when an attribute reference or assignment fails. [Source](https://docs.python.org/3/library/exceptions.html#AttributeError)
```
```
>>> an_int = 1
>>> an_int.an_attribute
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'int' object has no attribute 'an_attribute'
```
Dòng thông báo lỗi cho AttributionError cho bạn biết rằng loại đối tượng cụ thể, int trong trường hợp này, không có thuộc tính được truy cập, an_attribution trong trường hợp này. Xem AttributionError trong dòng thông báo lỗi có thể giúp bạn nhanh chóng xác định thuộc tính nào bạn đã cố truy cập và nơi để sửa nó.

Hầu hết thời gian, nhận được ngoại lệ này cho thấy rằng bạn có thể đang làm việc với một đối tượng không phải là loại bạn đang mong đợi:
```
>>> a_list = (1, 2)
>>> a_list.append(3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'tuple' object has no attribute 'append'
```
Trong ví dụ trên, bạn có thể mong đợi a_list thuộc loại list, có phương thức gọi là .append (). Khi bạn nhận được exception AttributionError và thấy rằng nó đã được nêu ra khi bạn đang cố gắng gọi .append (), điều đó cho bạn biết rằng bạn có thể đã xử lý loại đối tượng mà bạn đang mong đợi. Thông thường, điều này xảy ra khi bạn đang mong đợi một đối tượng được trả về từ một hàm gọi hoặc phương thức là một kiểu cụ thể và bạn kết thúc với một đối tượng thuộc loại None. Trong trường hợp này, dòng thông báo lỗi sẽ đọc, AttributionError: đối tượng 'noneType' không có thuộc tính 'append'.
## ImportError
ImportError được nêu ra khi có sự cố xảy ra với câu lệnh nhập. Bạn có thể nhận được exception hoặc subclass ModuleNotFoundError của nó, nếu module bạn đang cố nhập có thể được tìm thấy hoặc nếu bạn cố gắng nhập một cái gì đó từ module không tồn tại.
```
Raised when the import statement has troubles trying to load a module. Also raised when the ‘from list’ in from ... import has a name that cannot be found.
```
```
>>> import asdf
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'asdf'
>>> from collections import asdf
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: cannot import name 'asdf'
```
Ở ví dụ trên, có thể thấy đang cố import module không tồn tại , kết quả là ModuleNotFoundError. Khi cố import một thứ gì đó không tồn tại từ một module không tồn tại,  kết quả sẽ là ImportError

## IndexError
IndexError được gây ra khi cố lấy index từ 1 list hoặc tuple, index không được tìm thấy 
```
Raised when a sequence subscript is out of range
```
Ví dụ 
```
>>> a_list = ['a', 'b']
>>> a_list[3]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
```
## KeyError
Giống IndexError, KeyError được gây lên khi cố truy cập 1 key mà không mapping , thường là dict.
```
Raised when a mapping (dictionary) key is not found in the set of existing keys.
```
```
>>> a_dict['b']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'b'
```
## NameError
NameError được gây ra khi bạn đã tham chiếu một biến, module, class, function hoặc một số tên khác đã được định nghĩa trong code của bạn. Tài liệu Python xác định khi ngoại lệ này được nêu ra:
```
Raised when a local or global name is not found
```
```
>>> def greet(person):
...     print(f'Hello, {persn}')
>>> greet('World')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 2, in greet
NameError: name 'persn' is not defined
```
## SyntaxError
```
Raised when the parser encounters a syntax error
```
```
>>> def greet(person)
  File "<stdin>", line 1
    def greet(person)
                    ^
SyntaxError: invalid syntax
```
missing ":"
## TypeError
TypeError được gây lên khi code của bạn cố gắng làm điều gì đó với một đối tượng không cho phép làm điều đó, chẳng hạn như cố gắng thêm một chuỗi vào một số nguyên hoặc gọi len () trên một đối tượng trong đó độ dài của nó được xác định.
```
>>> 1 + '1'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
>>> '1' + 1
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: must be str, not int
>>> len(1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: object of type 'int' has no len()
```
## ValueError
ValueError được gây lên khi giá trị của đối tượng không chính xác. Bạn có thể coi đây là một IndexError được nâng lên vì giá trị của chỉ mục là giá trị trong phạm vi của chuỗi, chỉ có ValueError là dành cho trường hợp chung hơn.
```
>>> a, b, c = [1, 2]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: not enough values to unpack (expected 3, got 2)
>>> a, b = [1, 2, 3]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: too many values to unpack (expected 2)
```
# 3. Log 1 traceback như thế nào ?
Ví dụ có một đoạn code như sau
```
# urlcaller.py
import sys
import requests

response = requests.get(sys.argv[1])

print(response.status_code, response.content)
```
```
python urlcaller.py http://thisurlprobablydoesntexist.com
...
During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "urlcaller.py", line 5, in <module>
    response = requests.get(sys.argv[1])
  File "/path/to/requests/api.py", line 75, in get
    return request('get', url, params=params, **kwargs)
  File "/path/to/requests/api.py", line 60, in request
    return session.request(method=method, url=url, **kwargs)
  File "/path/to/requests/sessions.py", line 533, in request
    resp = self.send(prep, **send_kwargs)
  File "/path/to/requests/sessions.py", line 646, in send
    r = adapter.send(request, **kwargs)
  File "/path/to/requests/adapters.py", line 516, in send
    raise ConnectionError(e, request=request)
requests.exceptions.ConnectionError: HTTPConnectionPool(host='thisurlprobablydoesntexist.com', port=80): Max retries exceeded with url: / (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x7faf9d671860>: Failed to establish a new connection: [Errno -2] Name or service not known',))
```
Gặp lỗi , nhanh trong xử dụng try except để bắt các exception ghi vào log
```
import logging
import sys
import requests

logger = logging.getLogger(__name__)

try:
    response = requests.get(sys.argv[1])
except requests.exceptions.ConnectionError as e:
    logger.exception()
    print(-1, 'Connection Error')
else:
    print(response.status_code, response.content)
```