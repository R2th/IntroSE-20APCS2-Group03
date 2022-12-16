Một cái nhìn tổng quát về làm việc với sự ngẫu nhiên trong Python, chỉ sử dụng các hàm thư viện chuẩn.

![](https://images.viblo.asia/9876407c-b93c-4b63-a66f-060cb07b4fd9.jpg)

### Generating Random Floats Between 0.0 and 1.0

Hàm `random.random()` trả về một số float ngẫu nhiên trong nửa khoảng [0.0, 1.0). Điều này có nghĩa là số ngẫu nhiên trả về sẽ luôn nhỏ hơn điểm đầu mút bên phải (1.0):

```Python
>>> import random
>>> random.random()
0.11981376476232541
>>> random.random()
0.757859420322092
>>> random.random()
0.7384012347073081
```

### Generating Random Ints Between x and y

Đây là cách tạo ra một số nguyên ngẫu nhiên giữa hai đầu mút trong Python với hàm `random.randint()`. Cái này bao gồm cả khoảng [x, y]:

```Python
>>> import random
>>> random.randint(1, 10)
10
>>> random.randint(1, 10)
3
>>> random.randint(1, 10)
7
```

Với hàm `random.randrange()`, bạn có thể loại trừ khoảng bên phải, tức là số được sinh ra nằm trong nửa khoảng [x, y) và luôn nhỏ hơn điểm đầu mút phải:

```Python
>>> import random
>>> random.randrange(1, 10)
5
>>> random.randrange(1, 10)
3
>>> random.randrange(1, 10)
4
```

### Generating Random Floats Between x and y

Nếu bạn cần tạo các số float ngẫu nhiên nằm trong khoảng [x, y] xác định, bạn có thể sử dụng hàm `random.uniform`:

```Python
>>> import random
>>> random.uniform(1, 10)
7.850184644194309
>>> random.uniform(1, 10)
4.00388600011348
>>> random.uniform(1, 10)
6.888959882650279
```

### Picking a Random Element From a List

Để lấy một phần tử ngẫu nhiên từ một non-empty sequence (list hay tuple), bạn có thể sử dụng hàm `random.choice`:

```Python
>>> import random
>>> items = ['one', 'two', 'three', 'four', 'five']
>>> random.choice(items)
'five'
>>> random.choice(items)
'one'
>>> random.choice(items)
'four'
```

Nếu sequence là empty, `IndexError` sẽ được ném ra.

### Randomizing a List of Elements

Bạn có thể ngẫu nhiên hóa một sequence sử dụng hàm `random.shuffle`. Hàm này sẽ chỉnh sửa đối tượng sequence và ngẫu nhiên hóa thứ tự các phần tử:

```Python
>>> import random
>>> items = ['one', 'two', 'three', 'four', 'five']
>>> random.shuffle(items)
>>> items
['four', 'one', 'five', 'three', 'two']
```

Nêu bạn không muốn thay đổi sequence gốc, bạn sẽ cần tạo ra bản copy trước, rồi sau đó shuffle bản copy. Bạn có thể tạo ra các bản copy của các đối tượng Python với module `copy`.

### Picking n Random Samples From a List of Elements

Để lấy một mẫu ngẫu nhiên gồm n phần tử từ một sequence, ta sử dụng hàm `random.sample`:

```Python
>>> import random
>>> items = ['one', 'two', 'three', 'four', 'five']
>>> random.sample(items, 3)
['one', 'five', 'two']
>>> random.sample(items, 3)
['five', 'four', 'two']
>>> random.sample(items, 3)
['three', 'two', 'five']
```

### Generating Cryptographically Secure Random Numbers

Nếu bạn cần các số ngẫu nhiên được đã hóa vì mục đích bảo mật, hãy sử dụng `random.SystemRandom` - class sử dụng bộ sinh số giả ngẫu nhiên mã hóa.

Các instance của class `SystemRandom` cung cấp hầu hết các giao tác sinh số ngẫu nhiên như trong module `random`:

```Python
>>> import random
>>> rand_gen = random.SystemRandom()

>>> rand_gen.random()
0.6112441459034399

>>> rand_gen.randint(1, 10)
2

>>> rand_gen.randrange(1, 10)
5

>>> rand_gen.uniform(1, 10)
8.42357365980016

>>> rand_gen.choice('abcdefghijklmn')
'j'

>>> items = ['one', 'two', 'three', 'four', 'five']
>>> rand_gen.shuffle(items)
>>> items
['two', 'four', 'three', 'one', 'five']

>>> rand_gen.sample('abcdefghijklmn', 3)
['g', 'e', 'c']
```

### Python 3.6+ – The `secrets` Module:

Nếu bạn đang sử dụng Python 3 và mục đích của bạn là sinh các số ngẫu nhiên mã hóa thì hãy thử module `secrets`. Module này sẵn có trong Python 3.6:

```Python
>>> import secrets

# Generate secure tokens:
>>> secrets.token_bytes(16)
b'\xc4\xf4\xac\x9e\x07\xb2\xdc\x07\x87\xc8 \xdf\x17\x85^{'
>>> secrets.token_hex(16)
'a20f016e133a2517414e0faf3ce4328f'
>>> secrets.token_urlsafe(16)
'eEFup5t7vIsoehe6GZyM8Q'

# Picking a random element from a sequence:
>>> secrets.choice('abcdefghij')
'h'

# Securely compare two strings for equality
# (Reduces the risk of timing attacks):
>>> secrets.compare_digest('abcdefghij', '123456789')
False
>>> secrets.compare_digest('123456789', '123456789')
True
```

Nguồn: https://dbader.org/blog/python-random-numbers