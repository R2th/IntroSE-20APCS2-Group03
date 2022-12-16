Đây là phần II của series về number trong Python.

Tham khảo phần I ở [đây](https://viblo.asia/p/number-trong-python-phan-i-yMnKMjnjZ7P).

### Arithmetic Operators and Expressions

Trong phần này bạn sẽ tìm hiểu cách thực hiện các phép toán số học cơ bản như cộng, trừ, nhân và chia với số trong Python. Cùng với đó, bạn cũng sẽ tìm hiểu các quy tắc viết các biểu thức số học trong code.

#### Addition

Cộng được thực hiện với toán tử `+`:

```Python
>>> 1 + 2
3
```

Hai số ở hai bên toán tử `+` được gọi là toán hạng (operand). Trong ví dụ ở trên, các toán hạng là số nguyên (int) nhưng toán hạng không nhất thiết phải cùng kiểu.

Bạn có thể cộng một `int` với một `float`:

```Python
>>> 1.0 + 2
3.0
```

Chú ý rằng kết quả của `1.0 + 2` là `3.0` - một số dấu phẩy động (float). Bất cứ khi nào một `float` được cộng với một số, kết quả sẽ là một `float` khác. Tổng hai số nguyên luôn trả về một số nguyên.

>**Note**: PEP 8 khuyến cáo tách biệt hai toán hạng với toán tử bởi một dấu cách (khoảng trắng).
>Python có thể hiểu `1+1` nhưng `1 + 1` sẽ được ưa chuộng hơi tại nó dễ đọc. Quy tắc ngón tay cái được áp dụng với tất cả các toán tử trong mục này.

#### Subtraction

Để trừ hai số, chỉ việc đặt toán tử `-` giữa chúng:

```Python
>>> 1 - 1
0

>>> 5.0 - 3
2.0
```

Cũng giống như cộng hai số, trừ hai số nguyên luôn trả về một số nguyên. Bất cứ khi nào một trong các toán hạng là `float`, kết quả sẽ là một `float`.

Toán tử `-` cũng được sử dụng để chỉ các số âm:

```Python
>>> -3
-3
```

Bạn có thể trừ một số âm từ một số khác nhưng như bạn có thể thấy ở bên dưới, đôi khi việc này khiến chúng ta lúng túng:

```Python
>>> 1 - -3
4

>>> 1 --3
4

>>> 1- -3
4

>>> 1--3
4
```

Trong bốn ví dụ ở trên, cái đầu tiên tuân theo PEP 8 chặt nhất. Tuy nhiên bạn có thể bao `-3` với cặp dấu ngoặc đơn để làm cho nó rõ ràng hơn rằng là dấu `-` thứ hai dùng để thay đổi số `3`:

```Python
>>> 1 - (-3)
4
```

Sử dụng các dấu ngoặc đơn là một ý tưởng tốt bởi nó làm cho code của bạn rõ ràng hơn. Máy tính xử lý code nhưng con người lại đọc code. Bất cứ điều gì bạn làm để giúp cho code của bạn dễ đọc và dễ hiểu là một điều tốt.

#### Multiplication

Để nhân hai số, sử dụng toán tử `*`:

```Python
>>> 3 * 3
9

>>> 2 * 8.0
16.0
```

Kiểu number mà bạn nhận được bởi phép nhân cũng tuân theo các quy tắc như đối với pháp cộng và phép trừ. Nhân hai số nguyên trả về một số nguyên và nhân một số với một `float` sẽ trả về một `float`.

#### Division

Toán tử `/` được sử dụng để chia hai số:

```Python
>>> 9 / 3
3.0

>>> 5.0 / 2
2.5
```

Không giống như cộng, trừ và nhân, phép chia với toàn tử `/` luôn trả về một `float`. Nếu bạn muốn chắc chắn là bạn nhận được một số nguyên sau phép chia, bạn có thể sử dụng `int()` để convert kết quả:

```Python
>>> int(9 / 3)
3
```

Luôn nhớ rằng `int()` sẽ bỏ đi phần thập phân:

```Python
>>> int(5.0 / 2)
2
```

`5.0 / 2` trả về số phẩy động `2.5` và `int(2.5)` chính là `2` với phần thập phân `.5` bị lược bỏ.

#### Integer Division

Nếu việc viết `int(5.0 / 2)` trông dài dòng, Python cung cấp toán tử chia thứ hai được gọi là toán tử chia nguyên `//` (integer division) hay còn gọi là toán tử chia làm tròn (floor division):

```Python
>>> 9 // 3
3

>>> 5.0 // 2
2.0

>>> -3 // 2
-2
```

Toán tử `//` đầu tiên chia số bên trái bởi số bên phải, sau đó làm tròn xuống một số nguyên. Việc này có thể không trả về giá trị mà bạn mong muốn khi một trong các số là âm.

Ví dụ `-3 // 2` trả về `-2`. Đầu tiên `-3` được chia bởi `2` được `-1.5`. Sau đó `-1.5` được làm tròn xuống `-2`. Mặt khác, `3//2` trả về `1` bởi cả hai số đều dương.

Ví dụ trên củng chỉ ra rằng `//` trả về một float khi một trong các toán hạng là một float. Đây là lý do tại sao `9 // 3` trả về số nguyên `3` và `5.0 // 2` trả về float `2.0`.

Hãy xem điều gì sẽ xảy ra nếu bạn cố chia một số bởi `0`:

```Python
>>> 1 / 0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
```

Python có exception `ZeroDivisionError` cho phép bạn biết khi nào bạn đang cố phá bỏ một quy tắc cơ bản trong vũ trụ :D

#### Exponents

Bạn có thể nâng lũy thừa một số với toán tử `**`:

```Python
>>> 2 ** 2
4

>>> 2 ** 3
8

>>> 2 ** 4
16
```

Mũ không cần phải là một số nguyên. Nó có thể là một float:

```Python
>>> 3 ** 1.5
5.196152422706632

>>> 9 ** 0.5
3.0
```

Nâng lũy thừa cho một số lên `0.5` chính là lấy căn bậc hai của số đó nhưng chú ý rằng mặc dù căn bậc hai của `9` là một số nguyên, Python lại trả về float `3.0`.

Với các toán hạng dương, toán tử `**` trả về một số nguyên nếu cả hai toán hạng là các số nguyên và một float nếu một trong hai toán hạng là một float.

Bạn cũng có thể nâng lũy thừa âm:

```Python
>>> 2 ** -1
0.5

>>> 2 ** -2
0.25
```

Nâng lũy thừa cho một số với một số mũ âm tương đương với việc chia `1` bởi số đó được nâng lũy thừa với số mũ dương. Vậy `2 ** -1` chính là `1 / (2 ** 1)`, cũng chính là `1 / 2` hay `0.5`. Tương tự, `2 ** -2` là `1 / (2 ** 2)` hay `1 / 4` và `0.25`.

Nguồn: https://realpython.com/python-numbers/