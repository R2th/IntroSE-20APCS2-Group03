![](https://images.viblo.asia/b52c6d78-5e88-4771-9fd6-6f97b00a365a.jpg)

`KeyError` là một exception rất quen thuộc với những người mới bắt đầu tiếp xúc với Python. Biết tại sao `KeyError` được raise lên và một số giải pháp giúp chương trình của bạn không bị dừng lại là một điều thật tuyệt với lập trình viên Python.

#### By the end of this tutorial, you'll know:

- Ý nghĩa của `KeyError`
- Bạn có thể bắt gặp `KeyError` trong một thư viện chuẩn
- Cách xử lý `KeyError` khi bạn gặp nó

### What a Python `KeyError` Usually Means

Exception `KeyError` được raise lên khi bạn cố gắng truy cập một key không hề tồn tại trong một dictionary (dict).

Document chuẩn của Python nói rằng `KeyError` được raise lên khi việc tham chiếu key (mapping key) được thực hiện và không được tìm thấy trong ánh xạ (mapping). Ánh xạ là một cấu trúc dữ liệu kết nối một tập giá trị A với một tập giá trị khác B. Ánh xạ phổ biến nhất trong Python chính là dictionary.

`KeyError` là một exception thuộc kiểu `LookupError` chỉ ra lỗi khi tìm kiếm key. Khi bạn thấy `KeyError`, điều đó có nghĩa là key đang được tìm kiếm có thể không tồn tại.

Ở trong ví dụ dưới đây, bạn có thể thấy một dict (`ages`) được khai báo với tuổi của ba người. Khi bạn cố gắng truy cập một key không thuộc về dict đó, exception `KeyError` sẽ được raise lên:

```Python
>>> ages = {'Jim': 30, 'Pam': 28, 'Kevin': 33}
>>> ages['Michael']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Michael'
```

Trong chương trình bên dưới, bạn có thể thấy dict `ages` được khai báo lại một lần nữa. Lần này, bạn sẽ được gợi ý cung cấp tên của một người và lấy ra tuổi của người đó:

```Python
# ages.py

ages = {'Jim': 30, 'Pam': 28, 'Kevin': 33}
person = input('Get age for: ')
print(f'{person} is {ages[person]} years old.')
```

Lặp lại lỗi trước đó, chúng ta nhận được traceback khác:

```Shell
$ python ages.py
Get age for: Michael
Traceback (most recent call last):
File "ages.py", line 4, in <module>
  print(f'{person} is {ages[person]} years old.')
KeyError: 'Michael'
```

### Where Else You Might See a Python `KeyError` in the Standard Library

Phần lớn thời gian, `KeyError` được raise lên khi một key không được tìm thấy trong một dict và một class con của dict (ví dụ như `os.environ`)

Hiếm hoi hơn, bạn có thể thấy nó được raise lên ở một thư viện chuẩn của Python, ví dụ như ở trong module `zipfile` nếu như một file không được tìm thấy trong một tập nén zip.

Chúng ta sẽ sử dụng class `zipfile.ZipFile` để lấy ra các thông tin về một tập nén zip với `.getinfo()`:

```Python
>>> from zipfile import ZipFile
>>> zip_file = ZipFile('the_zip_file.zip')
>>> zip_file.getinfo('something')
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
File "/path/to/python/installation/zipfile.py", line 1304, in getinfo
  'There is no item named %r in the archive' % name)
KeyError: "There is no item named 'something' in the archive"
```

Rõ ràng, `KeyError` ở đây không hề tồn tại trong code của bạn. Nó thuộc về thư viện `zipfile` nhưng traceback đã chỉ ra vị trí lỗi trong code của bạn.

### When You Need to Raise a Python `KeyError` in Your Own Code

Đôi khi bạn muốn tự raise lên exception. Việc này có thể được thực hiện bằng cách sử dụng keyword `raise` và gọi exception `KeyError`:

```Python
raise KeyError(message)
```

Thông thường, `message` sẽ là key cần tìm. Tuy nhiên, như trong trường họp của `zipfile`, bạn có thể đưa ra nhiều thông tin hơn một chút để người đọc có thể hiểu đoạn code của bạn hơn.

Nếu bạn quyết định raise `KeyError` trong code của bạn, hãy chắc chắn rằng mục đích của việc bạn làm đúng với ý nghĩa thực sự đằng sau exception này. Nghĩa là bạn phải chắc chắn rằng là exception này có thể xảy ra.

### How to Handle a Python `KeyError` When You See It

Khi bạn gặp exception này, có một vài cách để xử lý. Tùy trường hợp, cách này sẽ tốt hơn cách khác. Mục đích cuối cùng là không để cho các exception không mong muốn bị raise lên.

#### The Usual Solution: `.get()`

```Python
# ages.py

ages = {'Jim': 30, 'Pam': 28, 'Kevin': 33}
person = input('Get age for: ')
age = ages.get(person)

if age:
    print(f'{person} is {age} years old.')
else:
    print(f"{person}'s age is unknown.")
```

Hàm `.get()` sẽ trả về giá trị được tìm thấy trong dict đối với key truyền vào hoặc giá trị mặc định `None`.

Lần này, bạn sẽ không nhận được exception `KeyError`:

```Python
$ python ages.py
Get age for: Michael
Michael's age is unknown.
```

Bạn cũng có thể set giá trị trả về mặc định của `.get()` như sau:

```Python
age = ages.get(person, 0)
```

Ở đây, với key truyền vào là `'Michael'`, thay vì trả về `None`, nó sẽ trả về `0`.

#### The Rare Solution: Checking for Keys

Đôi khi bạn lại cần xác định sự tồn tại của một key, Trong những trường họp này, sử dụng `.get()` sẽ không đáp ứng được yêu cầu của bạn. Việc nhận được giá trị `None` khi gọi `.get()` có thể rơi vào hai trường hợp: key không tồn tại hoặc key tồn tại nhưng giá trị tương ứng với nó lại chính là `None`.

Với một dict hoặc đối tượng giống dict, bạn có thể sử dụng toán tử `in` để xác định xem một key có nằm trong ánh xạ hay không. Toán tử này sẽ trả về một giá trị boolean (`True` hoặc `False`).

Trong ví dụ này, bạn nhận được một dict tên là `response` sau khi gọi một API. Và `response` có thể chứa key `error` được dùng để chỉ ra rằng API đó trả về lỗi:

```Python
# parse_api_response.py
...
# Assuming you got a `response` from calling an API that might
# have an error key in the `response` if something went wrong

if 'error' in response:
    ...  # Parse the error state
else:
    ...  # Parse the success state
```

#### The General Solution: `try except`

Như với bất kỳ exception nào, bạn luôn có thể sử dụng khối `try except` để tách biệt các đoạn code có thể raise lên exception và chuẩn bị một giải pháp dự phòng.

Bạn có thể sử dụng khối `try except` trong ví dụ tương tự bên trên:

```Python
# ages.py

ages = {'Jim': 30, 'Pam': 28, 'Kevin': 33}
person = input('Get age for: ')

try:
    print(f'{person} is {ages[person]} years old.')
except KeyError:
    print(f"{person}'s age is unknown.")
```

Bạn có thể thấy được ở đây trường hợp bình thường sẽ in ra tên và tuổi của một người; còn trường hợp dự phòng sẽ in ra một message khác.

Sử dụng `try except` cũng là một giải pháp tuyệt vời khi `.get()` hoặc toán tử `in` không được hỗ trợ:

```Python
>>> from zipfile import ZipFile
>>> zip = ZipFile('the_zip_file.zip')
>>> try:
...     zip.getinfo('something')
... except KeyError:
...     print('Can not find "something"')
...
Can not find "something"
```

Nguồn: https://realpython.com/python-keyerror/