Bạn không cần là một cao thủ Toán học để lập trình tốt. Sự thực là rất ít lập trình viên cần biết nhiều hơn các kiến thức đại số cơ bản. Tất nhiên, lượng kiến thức Toán mà bạn cần phụ thuộc và ứng dụng mà bạn phát triển. Nhìn chung thì để trở thành một lập trình viên, bạn không cần biết quá nhiều về Toán đâu. Mặc dù Toán và lập trình không hề tương quan như mọi người vẫn tin, **number** là thành phần quan trọng của bất cứ ngôn ngữ lập trình nào. Và **Python** không phải là ngoại lệ.

Trong tutorial này, bạn sẽ tìm hiểu:

- Tạo các số nguyên (integer - INT) và các số dấu phẩy động (floating-point number - FPN)
- Làm tròn số
- Định dạng và hiển thị số trong string

Bắt đầu nào!

### Integers and Floating-Point Numbers

Python có ba kiểu dữ liệu số có sẵn: số nguyên, số dấu phẩy động, số phức (complex number - CN). Trong phần này, bạn sẽ học về INT và FPN - những kiểu được sử dụng nhiều nhất. Số phức sẽ được đề cập tới ở một phần sau.

#### Integers

Một INT là một số không chứa phần thập phân. Ví dụ `1` là một INT nhưng `1.0` lại không phải. Tên của kiểu dữ liệu INT là `int` - cái bạn có thể thấy với `type()`:

```Python
>>> type(1)
<class 'int'>
```

Bạn có thể tạo một INT bằng gõ số mong muốn. Ví dụ, dòng lệnh sau gán `25` cho biến `num`:

```Python
>>> num = 25
```

Khi bạn tạo một INT như này, giá trị `25` sẽ được gọi là một **integer literal** (INTL) bởi vì số đó được gõ trực tiếp ở trong code.

Bạn có thể đã quen với việc convert một string chứa một INT sang một số sử dụng `int()`. Ví dụ, lệnh sau convert string `"25"` thành INT `25`:

```Python
>>> int("25")
25
```

`int("25")` không phải là một INTL bởi vì giá trị nguyên được tạo từ một string.

Khi bạn viết các số lớn bằng tay, thường thì bạn sẽ nhóm các số thành các nhóm ba ngăn cách bởi một dấu phẩy (comma) hoặc một dấu thập phân (decimal point). Đơn giản là vì 1,000,000 sẽ dễ đọc hơn rất nhiều so với 1000000.

Trong Python, bạn không thể sử dụng các dấu phẩy để nhóm các chữ số trong các INTL nhưng bạn có thể sử dụng dấu gạch dưới (underscore). Cả hai cách sau đều là các cách hợp lệ để biểu diễn số một triệu như một INTL:

```Python
>>> 1000000
1000000

>>> 1_000_000
1000000
```

Không có giới hạn về độ lớn của một INT - điều này có thể gây bất ngờ khi mà máy tính có bộ nhớ hữu hạn. Thử viết một số lớn nhất mà bạn có thể nghĩ tới vào một phiên IDLE. Python sẽ xử lý mà không có vấn đề gì xảy ra!

#### Floating-Point Numbers

Một FPN hoặc ngắn gọn là float là một số với phần thập phân. `1.0` là một FPN, tương tự như `-2.75`. Tên của kiểu dữ liệu FPN là `float`:

```Python
>>> type(1.0)
<class 'float'>
```

Giống như INT, float có thể được tạo từ các chuỗi dấu phẩy động (**floating-point literal** - FPL hoặc FL) hoặc convert một string thành một float với `float()`:

```Python
>>> float("1.25")
1.25
```

Có ba cách để biểu diễn một FPL:

```Python
>>> 1000000.0
1000000.0

>>> 1_000_000.0
1000000.0

>>> 1e6
1000000.0
```

Hai cách đầu tiên tương tự như hai kỹ thuật để tạo INTL. Cách thứ ba sử dụng **ký hiệu E** (E notation) để tạo một FL.

>**Note**: E notation viết tắt của **exponential notation**. Bạn có thể đã thấy cú pháp này được sử dụng bởi máy tính bỏ túi để biểu diễn các số quá lớn, không thể hiển thị vừa màn hình.

Để viết một FL theo ký hiệu E, gõ một số theo sau đó là một chữ cái `e` và tiếp đó là một số khác. Python nhận số bên trái `e` và nhân nó với lũy thừa bậc giá trị đằng sau `e` của `10` . Vậy `1e6` chính là `1×10⁶`.

Python cũng sử dụng ký hiệu E để hiển thị các FPN lớn:

```Python
>>> 200000000000000000.0
2e+17
```

Số `200000000000000000.0` được biểu diễn là `2e+17`. Dấu `+` chỉ ra rằng số mũ `17` là một số dương. Bạn có thể sử dụng các số âm như là số mũ:

```Python
>>> 1e-4
0.0001
```

Chuỗi `1e-4` được thông dịch là `10` lũy thừa `-4`, ấy là `1/10000` hoặc `0.0001`.

Không giống như INT, float có giới hạn về giá trị. Giá trị lớn nhất của một FPN phụ thuộc vào hệ điều hành của bạn nhưng `2e400` là một số vượt quá khả năng của hầu hết các máy tính. `2e400` là `2x10⁴⁰⁰` - con số lớn hơn rất nhiều [tổng số nguyên tử trong vũ trụ](https://en.wikipedia.org/wiki/Observable_universe#Matter_content).

Khi giá trị đạt được của chương trình đạt tới hoặc vượt qua, Python sẽ trả về một giá trị đặc biệt - `inf`:

```Python
>>> 2e400
inf
```

`inf` viết tắt của infinity và điều này có nghĩa là số bạn cố tạo ra đã vượt quá giá trị lớn nhất cho phép đối với một float trên máy tính của bạn. Kiểu của `inf` vẫn là `float`:

```Python
>>> n = 2e400
>>> n
inf
>>> type(n)
<class 'float'>
```

Python cũng sẽ sử dụng `-inf` để biểu diễn một số float nhỏ hơn giá trị nhỏ nhất cho phép đối với một float trên máy của bạn:

```Python
>>> -2e400
-inf
```

Nhiều khả năng là bạn sẽ không gặp phải `inf` và `-inf` quá nhiều trừ khi bạn thường xuyên làm việc với các con số cực kỳ lớn.







Nguồn: https://realpython.com/python-numbers/