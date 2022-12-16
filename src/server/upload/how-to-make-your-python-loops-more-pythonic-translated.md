Python hóa các vòng lặp "for" và "while" bằng cách refactor chúng với generator và các kỹ thuật khác.

![](https://images.viblo.asia/48af8ce1-b357-407f-930f-32533116c6cb.png)

Một trong những cách dễ dàng nhất để nhận ra một nhà phát triển có kiến thức nền tảng về ngôn ngữ kiểu C (C-style language) vừa mới sử dụng Python chính là nhìn vào cách họ viết vòng loop.

Ví dụ, bất cứ khi nào tôi nhìn thấy đoạn code như dưới đấy, tôi nghĩ ngay tới việc một ai đó đang cố gắng viết Python như kiểu với C hoặc Java:

```Python
my_items = ['a', 'b', 'c']

i = 0
while i < len(my_items):
    print(my_items[i])
    i += 1
```

### Now, what's so "unpythonic" about this code?

Hai điều có thể cải thiện trong đoạn code:

- Đầu tiên, nó kiểm soát index `i` bằng tay - khởi tạo nó bằng `0` và tăng nó qua mỗi vòng lặp

- Thứ hai, nó sử dụng `len()` để lấy size của list để xác định giới hạn lặp

Trong Python, bạn có thể viết vòng lặp xử lý cả hai việc này một cách tự động. Chúng ta nên tận dụng nó. Nó sẽ làm cho code ngắn gọn và do đó dễ đọc hơn.

### How to track the loop index *automatically*

Để refactor vòng lặp `while` trong đoạn code ví dụ, tôi sẽ bắt đầu bằng việc bỏ đoạn code update index. Một cách tốt để làm điều này là với vòng lặp `for` trong Python.

Sử dụng hàm built-in `range()`, tôi có thể tạo ra các index một cách tự động (mà không cần sử dụng đến biến đếm):

```Python
>>> range(len(my_items))
range(0, 3)

>>> list(range(0, 3))
[0, 1, 2]
```

Kiểu `range` biểu diễn một dãy các số không thể thay đổi. Lợi thế của nó so với `list` là nó luôn chiếm cùng một lượng bộ nhớ.

Đối tượng `range` không thực sự lưu các giá trị đơn lẻ biểu diễn dãy số - thay vào đó chúng làm việc như các `iterator` và tính toán các giá trị dãy khi chạy chương trình.

(Điều này đúng với Python 3. Trong Python 2, bạn cần sử dụng `xrange()` để tiết kiệm bộ nhớ, bởi vì `range()` sẽ tạo ra một đối tượng `list` chứa tất cả các giá trị)

Bây giờ, thay vì tăng `i` ở mỗi vòng lặp, tôi có thể refactor lại thành như sau:

```Python
for i in range(len(my_items)):
    print(my_items[i])
```

Cái này tốt hơn. Tuy nhiên nó vẫn không phải tốt nhất - trong hầu hết các trường hợp khi bạn thấy code sử dụng `range(len(...))` để lặp một container, nó có thể được cải tiến để trở nên đơn giản hơn.

Hãy xem cách mà chúng ta có thể làm điều đó trong thực tế.

### Python’s “for” loops are “for-each” loops

Như đã đề cập, vòng lặp `for` trong Python chính là vòng lặp "for-each" - cái có thể lặp qua các item từ một container hoặc sequence một cách trực tiếp mà không cần phải dùng index. Tôi có thể tận dụng nó và đơn giản hóa vòng loop:

```Python
for item in my_items:
    print(item)
```

Tôi nghĩ giải pháp này hoàn toàn rất Python (Pythonic). Nó đẹp và sạch và đọc gần giống như giả code từ một cuốn sách. Tôi không phải để mắt tới kích thước container hoặc sử dụng index để truy cập các phần tử.

Nếu container là có thứ tự (ordered) thì dãy phần tử trả về cũng vậy. Nếu container không theo thứ tự, nó sẽ trả về các phần tự theo thứ tự bất kỳ.

### What if I need the item index?

Tất nhiên bây giờ bạn sẽ không thể luôn viết lại vòng lặp như vậy. Sẽ thế nào nếu bạn cần index? Có một cách rất Python để kiểm soát index mà không cần đến `range(len(...))`.

Hàm built-in `enumerate()` hữu ích trong trường hợp này:

```Python
>>> for i, item in enumerate(my_items):
...     print(f'{i}: {item}')

0: a
1: b
2: c
```

Bạn thấy đấy, `iterator` trong Python có thể trả về nhiều hơn một giá trị. Chúng có thể trả về các `tuple` với số lượng giá trị bất kỳ mà sau đó có thể được unpack ngay trong câu lệnh `for`.

Cái này rất mạnh. Ví dụ, bạn có thể sử dụng kỹ thuật này để lặp các key và value của một `dictionary` cùng một lúc:

```Python
>>> emails = {
...     'Bob': 'bob@example.com',
...     'Alice': 'alice@example.com',
... }

>>> for name, email in emails.items():
...     print(f'{name} → {email}')

'Bob → bob@example.com'
'Alice → alice@example.com'
```

### Okay, what if I just *have to* write a C-style loop?

Có một ví dụ nữa tôi muốn cho bạn xem. Sẽ ra sao nếu bạn hoàn toàn cần viết vòng lặp kiểu C (C-style loop). Ví dụ sẽ thế nào nếu bạn phải kiểm soát bước nhảy của index? Tưởng tượng bạn phải viết đoạn code sau trong C hoặc Java:

```C
for (int i = a; i < n; i += s) {
    // ...
}
```

Làm thế nào để làm được điều tương tự trong Python?

Hàm `range()` có thể giải quyết được vấn đề này - nó có thể chấp nhận tham số phụ để kiểm soát giá trị bắt đầu (a), giá trị dừng (n) và bước nhảy (s).

Do đó vòng lặp kiểu C có thể được implement như sau:

```Python
for i in range(a, n, s):
    # ...
```

### Main Takeaways

- Viết vòng loop kiểu C trong Python được coi là unpythonic. Tránh quản lý index và điều kiện dừng bằng tay nếu có thể

- Vòng `for` của Python chính là vòng lặp "for-each"

Nguồn: https://dbader.org/blog/pythonic-loops