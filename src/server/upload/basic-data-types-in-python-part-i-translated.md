![](https://images.viblo.asia/335ef808-e6eb-4404-9a57-aeef3060059d.png)

#### Here’s what you’ll learn in this tutorial:

- Bạn sẽ tìm hiểu về một số dữ liệu cơ bản **numeric**, **string** và **Boolean** được xây dựng sẵn trong Python
- Bạn cũng sẽ có được cái nhìn tổng quan về các hàm built-in của Python

### Integers

Trong Python 3, không có giới hạn về dải giá trị cho số nguyên, ngoại trừ ràng buộc về bộ nhớ của máy tính:

```Python
>>> print(123123123123123123123123123123123123123123123123 + 1)
123123123123123123123123123123123123123123123124
```

Python sẽ hiểu một các chữ số thập phân không có prefix là một số thập phân:

```Python
>>> print(10)
10
```

Các string sau có thể thêm vào đầu một giá trị nguyên để chỉ ra cơ số khác 10:

| Tables   |      Are      |  Cool |
|:----------:|:-------------:|:------:|
| c0b (zero + lowercase letter 'b')<br>0B (zero + uppercase letter 'B') | Binary | 2 |
| 0o (zero + lowercase letter 'o')<br>0O (zero + uppercase letter 'O') | Octal | 8 |
| 0x (zero + lowercase letter 'x')<br>0X (zero + uppercase letter 'X') | Hexadecimal | 16 |

Ví dụ:

```Python
>>> print(0o10)
8

>>> print(0x10)
16

>>> print(0b10)
2
```

Để tìm hiểu kỹ hơn về các giá trị số nguyên với cơ số phi thập phân, xem các link Wikipedia sau: [Binary](https://en.wikipedia.org/wiki/Binary_number), [Octal](https://en.wikipedia.org/wiki/Octal) và [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal).

Kiểu nằm dưới của một số nguyên Python được gọi là `int`:

```Python
>>> type(10)
<class 'int'>

>>> type(0o10)
<class 'int'>

>>> type(0x10)
<class 'int'>
```

**Note**

Đây là thời điểm thích hợp để đề cập rằng nếu bạn muốn hiển thị một giá trị khi dùng REPL, bạn không cần sử dụng hàm `print()`. Chỉ việc gõ giá trị ở dấu nhắc `>>>` và nhấn "**Enter**":

```Python
>>> 10
10

>>> 0x10
16

>>> 0b10
2
```

À, mẹo này sẽ không hoạt động trong các script nhé!

---

### Floating-Point Numbers

Kiểu `float` trong Python được dùng cho các số dấu phẩy động. Các giá trị `float` được xác định bởi một dấu thập phân. Một cách tùy ý, ký tực `e` hoặc `E` theo sau bởi một số nguyên được thêm vào để chỉ rõ ký hiệu khoa học ([scientific notation](https://en.wikipedia.org/wiki/Scientific_notation)):

```Python
>>> 4.2
4.2

>>> type(4.2)
<class 'float'>

>>> 4.
4.0

>>> .2
0.2

>>> .4e7
4000000.0

>>> type(.4e7)
<class 'float'>

>>> 4.2e-4
0.00042
```

**Deep Dive: Floating-Point Representation**

Chúng ta sẽ nói thêm chút về cách Python biểu diễn số dấu phẩy động. Bạn có thể dùng chúng một cách thoải mái cho dù bạn không hiểu những gì được nói đến ở đây. Thông tin ở được trình bày ở đây trong trường hợp bạn tò mò :)

Hầu hết các nền tảng biểu diễn các giá trị `float` Python như các giá trị có độ chính xác 64-bit, theo chuẩn [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754_revision). Trong trường hợp này, giá trị lớn nhất của một số dấu phẩy động là một số xấp xỉ 1.8 x 10<sup>308</sup>. Những số lớn hơn được biểu diễn bởi string `inf`:

```Python
>>> 1.79e308
1.79e+308

>>> 1.8e308
inf
```

Số khác không gần với 0 nhất có giá trị xấp xỉ 5.0 x 10<sup>-324</sup>. Những số gần 0 hơn nữa được coi là bằng 0.0

```Python
>>> 5e-324
5e-324

>>> 1e-325
0.0
```

Số dấu phẩy động được biểu diễn dưới dạng phân số nhị phân. Hầu hết các phân số thập phân không thể biểu diễn được chính xác như các phân số nhị phân, vậy nên trong phần lớn các tình huống, biểu diễn nội tại của một số dấu phẩy động là xấp xỉ của một giá trị thực sự. Trong thực tiễn, sự khác biệt giữa giá trị thực sự và giá trị biểu diễn là rất nhỏ và thường không gây ra những vấn đề đáng kể.

**Đọc thêm:** [Floating Point Arithmetic: Issues and Limitations](https://docs.python.org/3.6/tutorial/floatingpoint.html)

---

### Complex Numbers

Số phức được biểu diễn dưới dạng `<real part>+<imaginary part>j`. Ví dụ:

```Python
>>> 2+3j
(2+3j)

>>> type(2+3j)
<class 'complex'>
```

### Boolean Type, Boolean Context, and “Truthiness”

Python 3 cung cấp kiểu dữ liệu Boolean. Các đối tượng có kiểu Boolean chỉ có thể có một trong hai giá trị: `True` hoặc `False`:

```Python
>>> type(True)
<class 'bool'>

>>> type(False)
<class 'bool'>
```

Các biểu thức trong Python thường được đánh giá trong ngữ cảnh Boolean, nghĩa là chúng được dùng để biểu diễn đúng hoặc sai. Một giá trị là đúng trong ngữ cảnh Boolean được gọi là "truthy" và một giá trị là sai được gọi là "falsy".

"Tính đúng" ("truthiness") của một đối tượng kiểu Boolean rất rõ ràng: Một đối tượng bằng `True` là truthy (true), còn nếu nó bằng `False` là falsy (false). Tuy nhiên các đối tượng không phải kiểu Boolean cũng có thể được đánh giá trong ngữ cảnh Boolean để xác định true / false.

Nguồn: https://realpython.com/python-data-types/