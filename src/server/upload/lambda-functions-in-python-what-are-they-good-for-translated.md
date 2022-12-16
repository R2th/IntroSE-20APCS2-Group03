Giới thiệu về biểu thức lambda trong Python: Chúng có tác dụng gì? Khi nào thì dùng chúng? Và khi nào thì tránh sử dụng?

![](https://images.viblo.asia/5e341620-f23b-4a98-91d1-831e55e78aab.png)

Keyword `lambda` trong Python cung cấp một shortcut để khai báo các tiểu hàm vô danh. Hàm lambda hoạt động giống như các hàm thông thường được khai báo với keyword `def`. Chúng có thể được sử dụng bất cứ khi nào các đối tượng hàm được yêu cầu.

Ví dụ, đây là cách chúng ta định nghĩa một hàm lambda đơn giản thực hiện phép toán cộng:

```Python
>>> add = lambda x, y: x + y
>>> add(5, 3)
8
```

Bạn có thể khai báo hàm tương đương với keyword `def`:

```Python
>>> def add(x, y):
...     return x + y
>>> add(5, 3)
8
```

Bây giờ bạn có thể thắc mắc: **Tại sao lại chúng ta lại làm ầm lên về lambda?** Nếu chúng chỉ là một phiên bản ngắn gọn của việc khai báo hàm với `def` thì nó có gì hay?

Hãy nhìn vào ví dụ sau và nghĩ về cụm từ *biểu thức hàm*:

```Python
>>> (lambda x, y: x + y)(5, 3)
8
```

Okay, điều gì đã xảy ra ở đây? Tôi chỉ sử dụng `lambda` để định nghĩa hàm "add" và sau đó gọi nó với các tham số 5 và 3 ngay lập tức.

Về mặt ý niệm, *biểu thức lambda* `lambda x, y: x + y` giống với việc định nghĩa hàm với `def`. Điểm khác biệt chính là tôi đã không móc nó với một cái tên giống như "add" trước khi sử dụng. Tôi đơn giản chỉ phát biểu thức tôi muốn tính toán và sau đó ngay lập tức đánh giá nó bằng cách gọi nó như với hàm thông thường.

Trước khi đi tiếp, bạn có thể muốn "vọc" đoạn code trên một chút để thực sự hiểu nó. Tôi vẫn nhớ điều này đã tiêu tốn của tôi một lúc lâu để nhồi nhét nó vào trong đầu tôi. Vậy nên đừng lo lắng rằng bạn sẽ mất một vài phút :)

Có một sự khác biệt về cú pháp giữa lambda và định nghĩa hàm thông thường: Hàm lambda bị giới hạn ở biểu thức đơn. Điều này có nghĩa là một hàm lambda không thể sử dụng nhiều câu lệnh và annotation - thậm chí cả lệnh `return` cũng không.

Vậy làm thế nào bạn có thể trả về giá trị với lambda? Thực thi một hàm lambda sẽ đánh giá biểu thức của nó và sau đó trả về giá trị của nó. Vậy luôn có một câu lệnh return ẩn. Đó là lý do mà nhiều người nhắc đến lambda như các hàm biểu thức đơn.

#### Lambdas You Can Use

Khi nào bạn nên sử dụng lambda? Về mặt kỹ thuật, bất cứ khi nào bạn muốn sử dụng một đối tượng hàm, bạn có thể sử dụng biểu thức lambda. Và bởi vì biểu thức lambda là vô danh, bạn không gán tên cho nó.

Điều này mang lại một shortcut tiện dụng để định nghĩa hàm trong Python. Với tôi, trường hợp sử dụng lambda phổ biến nhất chính là khi muốn sắp xếp các iterable với một key thay thế:

```Python
>>> sorted(range(-5, 6), key=lambda x: x ** 2)
[0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]
```

Giống như các hàm nested, lambda còn hoạt động như các closure.

Closure là gì? Chỉ là một cái tên cho một hàm nhớ được các giá trị thuộc phạm vi bên ngoài (the enclosing scope) thậm chí cả khi luồng chương trình không còn ở trong phạm vi đó nữa. Dưới đây là một ví dụ để minh họa ý tưởng:

```Python
>>> def make_adder(n):
...     return lambda x: x + n

>>> plus_3 = make_adder(3)
>>> plus_5 = make_adder(5)

>>> plus_3(4)
7
>>> plus_5(4)
9
```

Trong ví dụ bên trên, lambda `x + n` vấn có thể truy cập giá trị của n thậm chí nó được định nghĩa trong hàm `make_adder` (the enclosing scope).

Đôi khi sử dụng một hàm lambda thay thế cho một hàm nested, được định nghĩa bởi `def`, lại làm cho mọi thứ trở nên rõ ràng hơn. Nhưng thành thực mà nói, đây không phải là một điều xảy ra thường xuyên - chí ít là với kiểu code mà tôi hay viết.

#### But Maybe You Shouldn’t…

Một mặt tôi mong muốn bài viết này sẽ khiến bạn thích thú với việc khám hàm lambda trong Python. Mặt khác tôi cảm thấy đã đến lúc cảnh báo bạn: Các hàm lambda nên được sử dụng dè xẻn và với sự cẩn trọng đặc biệt.

Tôi biết tôi đã viết một đoạn code sử dụng lambda trông rất "cool" nhưng thực sự là một khó khăn trở ngại với tôi và các đồng nghiệp. Nếu bạn sa đà vào việc sử dụng một lambda, hãy bỏ ra vài tích tắc để suy nghĩ xem đó có thực sự dễ đọc và dễ maintain nhất để đạt được kết quả mong muốn hay không.

Ví dụ, làm những điều đại loại như dưới đây để tiết kiệm hai dòng code thực sự là ngớ ngẩn. Chắc chắn về mặt kỹ thuật nó hoạt động và trông đủ "vi diệu" :). Nhưng nó sẽ làm cho người khác bị lúng túng khi phải tìm bug trong điều kiện deadline đã đến gần :D

```Python
# Harmful:
>>> class Car:
...     rev = lambda self: print('Wroom!')
...     crash = lambda self: print('Boom!')

>>> my_car = Car()
>>> my_car.crash()
'Boom!'
```

Tôi có cảm giác tương tự với việc kết hợp `map()` hoặc `filter()` với `lambda`. Thông thường sẽ rõ ràng hơn nếu chúng ta sử dụng list comprehension hay generator expression:

```Python
# Harmful:
>>> list(filter(lambda x: x % 2 == 0, range(16)))
[0, 2, 4, 6, 8, 10, 12, 14]

# Better:
>>> [x for x in range(16) if x % 2 == 0]
[0, 2, 4, 6, 8, 10, 12, 14]
```

Nếu bạn thấy bản thân mình đang làm một cái gì đó phức tạp với biểu thức lambda, hãy cân nhắc định nghĩa một hàm thực sự với một cái tên phù hợp.

Tiết kiệm chút thời gian gõ phím không có ý nghĩa. Đồng nghiệp của bạn (hoặc chính bạn trong tương lai) sẽ trân trọng các đoạn code sạch và dễ đọc hơn là những đoạn code ma thuật súc tích.

#### Things to Remember:

- Các hàm lambda là các hàm biểu thức đơn không cần thiết phải gắn với một cái tên (vô danh)

- Các hàm lambda không thể sử dụng các câu lệnh Python thông thường và luôn luôn bao gồm một lệnh `return` ẩn

- Luôn luôn hỏi chính bạn: Liệu việc sử dụng một hàm thông thường (có tên) hay list comprehension hay generator expression có làm cho mọi thứ rõ ràng hơn hay không?

Nguồn: https://dbader.org/blog/python-lambda-functions