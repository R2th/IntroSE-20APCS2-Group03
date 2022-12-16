Đây là phần III của series về number trong Python.

Link tham khảo phần I và phần II:

- https://viblo.asia/p/number-trong-python-phan-i-yMnKMjnjZ7P
- https://viblo.asia/p/number-trong-python-phan-ii-eW65G16jZDO

### Arithmetic Operators and Expressions (Continued)

#### The Modulus Operator

Toán tử `%` hay modulus trả về phần dư của phép chia toán hạng bên trái cho toán hạng bên phải:

```Python
>>> 5 % 3
2

>>> 20 % 7
6

>>> 16 % 8
0
```

`5` chia `3` được `1` dư `2` vậy nên `5 % 3` được `2`. Tương tự, `20` chia `7` được `2` dư `6`. Trong ví dụ cuối cùng, `16` chia hết cho `8` vậy nên `16 % 8` được `0`.  Bất cứ khi nào số bên trái chia hết cho số bên phải, kết quả của phép toán modulus là `0`.

Một trong những ứng dụng quen thuộc nhất của toán tử modulus chính là để xác định một số có chia hết được cho một số khác hay không. Ví dụ, một số `n` là chẵn khi và chỉ khi `n % 2` bằng `0`. Bạn nghĩ ` % 0` trả về gì? Hãy thử xem:

```Python
>>> 1 % 0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: integer division or modulo by zero
```

Điều này có lý bởi `1 % 0` trả về phần dư của `1` chia cho `0`. Nhưng bạn không thể chia `1` cho `0` nên Python đã raise lên exception `ZeroDivisionError`.

>**Note:** Khi bạn làm việc trong cửa sổ tương tác IDLE, các lỗi kiểu `ZeroDivisionError` không gây ra quá nhiều vấn đề. Lỗi được hiển thị và một prompt mới xuất hiện.
>
>Tuy nhiên, khi Python bắt gặp một lỗi khi chạy script, việc thực thi sẽ dừng lại. Nói cách khác, chương trình **chết**.

Mọi thứ trở nên ma muội hơn một chút khi thực hiện phép toán modulus với các số âm:

```Python
>>> 5 % -3
-1

>>> -5 % 3
1

>>> -5 % -3
-2
```

Có thể bạn sẽ bị giật mình nhưng những kết quả này hoàn toàn đúng. Để tính phần dư `r` thu được từ việc chia `x` cho `y`, Python sử dụng phương trình `r = x - (y * (x // y))`.

Ví dụ, để tìm `5 % -3`, đầu tiên Python tính `5 // -3`. Bởi vì `5 / -3` được giá trị khoảng `-1.67`, điều này có nghĩa `5 // -3` bằng `-2`. Bây giờ Python nhân kết quả đó với `-3` và thu được `6`. Cuối cùng, Python lấy `6` trừ đi `5` và nhận được `-1`.

#### Arithmetic Expressions

Bạn có thể kết hợp các toán tử để tạo ra các biểu thức phức tạp. Một biểu thức là một tổ hợp các số, toán tử và các ngoặc đơn mà Python có thể tính toán hoặc **đánh giá** để trả về một giá trị.

Dưới đây là một vài ví dụ về biểu thức số học:

```Python
>>> 2*3 - 1
5

>>> 4/2 + 2**3
10.0

>>> -1 + (-3*2 + 4)
-3
```

Quy tắc đánh giá các biểu thức cũng giống như những gì bạn đã học ở trong trường học. **Thứ tự thực các phép toán** - các bạn còn nhớ tới cụm từ này chứ *_^

Các toán tử `*`, `/`, `//` và `%` có cùng độ ưu tiên trong một biểu thức và chúng có độ ưu tiên cao hơn `+` và `-`. Đây là lý do tại sao `2*3 - 1` trả về `5`, chứ không phải `4`. `2*3` được đánh giá trước bởi vì `*` có độ ưu tiên cao hơn toán tử `-`.

Hãy chú ý về việc chuẩn PEP 8 nói về khoảng trắng (whitespace) trong các biểu thức phức tạp:

>Nếu nhiều toán tử với độ ưu tiên khác nhau được sử dụng, hãy cân nhắc thêm các khoảng trắng quanh các toán tử với (các) mức ưu tiên thấp nhất. Hãy tự cân đối, tuy nhiên đừng bao giờ sử dụng nhiều hơn một khoảng trắng và luôn để một lượng các khoảng trắng bằng nhau ở cả hai bên của một toán tử nhị phân.

Một thói quen tốt là sử dụng các cặp ngoặc đơn để chỉ ra thứ tự thực hiện của các phép toán, thậm chí khi chúng không cần thiết. Ví dụ, `(2 * 3) - 1` luôn rõ ràng hơn `2*3 - 1`.

### Make Python Lie to You

Bạn nghĩ gì về phép toán `0.1 + 0.2`? Con số `0.3` phải không? Hãy thử gõ phép toán đó vào trong shell:

```Python
>>> 0.1 + 0.2
0.30000000000000004
```

Wew, *gần* đúng :D Cái khỉ gì vậy! Lỗi chăng?

Không, đó không phải là bug! Đó là **lỗi hiển thị dấu phẩy động** và nó không liên quan gì đến Python cả. Vấn đề là ở cách các số dấu phẩy động được lưu trong bộ nhớ máy tính.

`0.1` có thể được biểu diễn là phân số `1/10`. Cả `0.1` và `1/10` đều là các biểu diễn thập phân. Tuy nhiên, máy tính lưu các số dấu phẩy động dưới dạng biểu diễn nhị phân.

Khi được biểu diễn ở dạng nhị phân, có một cái gì đó quen thuộc nhưng không hề mong muốn lại xảy ra với số `0.1`. Phân số `1/3` không có biểu diễn thập phân hữu hạn. Ý là, `1/3 = 0.333...` với vô hạn các số `3` ở phần thập phân. Điều tương tự xảy ra với phân số `1/10` trong hệ nhị phân.

Biểu diễn nhị phân của `1/10` là phần số lặp vô hạn sau:

```Text
0.00011001100110011001100110011...
```

Các máy tính có bộ nhớ hữu hạn với nên số `0.1` bắt buộc phải được lưu dưới dạng một xấp xỉ và không phải là giá trị chính xác của nó. Giá trị xấp xỉ được lưu lớn hơn giá trị thật một chút:

```Text
0.1000000000000000055511151231257827021181583404541015625
```

Tuy nhiên, bạn có thể thấy, khi yêu cần in `0.1`, Python sẽ in ra `0.1` thay vì giá trị xấp xỉ trên ;p

```Python
>>> 0.1
0.1
```

Python không hề lược bớt các chữ số trong biểu diễn nhị phân của `0.1`. Những gì diễn ra lại tinh vi hơn một chút.

Bởi vì xấp xỉ của `0.1` trong hệ nhị phân đơn thuần chỉ một xấp xỉ - hoàn toàn có khả năng có nhiều hơn một số thập phân có cùng xấp xỉ nhị phân.

Ví dụ, cả `0.1` và `0.10000000000000001` có cùng xấp xỉ nhị phân. Python in ra số thập phân ngắn nhất trong các số có cùng xấp xỉ nhị phân đó.

Việc này lý giải tại sao trong ví dụ đầu tiên mục này `0.1 + 0.2` lại không bằng `0.3`. Python cộng các xấp xỉ nhị phân cho `0.1` và `0.2` và cho ra một kết quả không phải là xấp xỉ nhị phân của `0.3`.

Nếu tất cả những điều này bắt đầu khiến bạn nhức óc, đừng lo lắng! Trừ phi bạn viết các chương trình liên quan đến tài chính hoặc tính toán khoa học, bạn không cần phải lo lắng về sự không chính xác của số học dấu phẩy động.

Nguồn: https://realpython.com/python-numbers/