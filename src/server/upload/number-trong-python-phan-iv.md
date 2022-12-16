Đây là phần IV của series về number trong Python.

Link tham khảo phần I - III:

- https://viblo.asia/p/number-trong-python-phan-i-yMnKMjnjZ7P
- https://viblo.asia/p/number-trong-python-phan-ii-eW65G16jZDO
- https://viblo.asia/p/number-trong-python-phan-iii-L4x5xvQOZBM

### Math Functions and Number Methods

Python cung cấp một số hàm có sẵn để làm việc với number. Trong phần này, bạn sẽ tìm hiểu ba hàm phổ biến nhất:

1. **round()** - làm tròn số tới vị trí thập phân mong muốn
2. **abs()** - lấy giá trị tuyệt đối của một số
3. **pow()** - nâng lũy thừa cho một số

Bạn cũng sẽ tìm hiểu về một method bạn có thể sử dụng với các số dấu phẩy động để kiểm tra xa chúng có giá trị nguyên hay không.

#### Round Numbers with `round()`

Bạn có thể sử dụng `round()` để làm tròn một số tới số nguyên gần nhất:

```Python
>>> round(2.3)
2

>>> round(2.7)
3
```

`round()` có một số hành vi không mong muốn khi các số kết thúc với `.5`:

```Python
>>> round(2.5)
2

>>> round(3.5)
4
```

`2.5` được làm tròn xuống `2` và `3.5` được làm tròn lên thành `4`. Đa số chúng ta sẽ mong một số kết thúc bởi `.5` sẽ được làm tròn lên, vậy hãy cùng xem điều gì đang xảy ra ở đây.

Python 3 làm tròn số dựa vào một chiến lược được gọi là [rounding ties to even - làm tròn chẵn](https://en.wikipedia.org/wiki/IEEE_754#Roundings_to_nearest). Một **tie** là các số có chữ số thập phân cuối cùng là `5`: `2.5` và `3.1415` là tie nhưng `1.37` thì không.

Khi bạn làm chẵn các tie, đầu tiên bạn sẽ để ý số bên trái chữ số thập phân cuối cùng của số đó. Nếu số đó là chẵn thì bạn làm tròn xuống. Còn ngược lại, bạn làm tròn lên. Đó là lý do tại sao `2.5` được làm tròn xuống `2` và `3.5` được làm tròn lên `4`.

>**Note:** Chiến lược rounding ties to even được khuyến cáo bởi `IEEE` vì nó giúp hạn chế được các ảnh hưởng mà việc làm tròn trong trường hợp chúng ta thực hiện các phép liên quan tới rất nhiều các con số.
>IEEE duy trì một chuẩn gọi là [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) để giải quyết với các số dấu phẩy động trên máy tính. Nó được công bố năm 1985 và hiện tại vẫn được sử dụng rộng rãi bởi các nhà sản xuất phần cứng.

Bạn có thể làm tròn một số với một lượng vị trí thập phân mong muốn như sau:

```Python
>>> round(3.14159, 3)
3.142

>>> round(2.71828, 2)
2.72
```

Số `3.14159` được làm tròn về ba vị trí thập phân để thu được `3.142` và `2.71828` được làm tròn về hai vị trí thập phân để nhận được `2.72`.

Tham số thứ hai của `round()` phải là một số nguyên. Nếu không, Python sẽ raise lên lỗi `TypeError`:

```Python
>>> round(2.65, 1.4)
Traceback (most recent call last):
  File "<pyshell#0>", line 1, in <module>
    round(2.65, 1.4)
TypeError: 'float' object cannot be interpreted as an integer
```

Thi thoảng `round()` lại không trả về kết quả hoàn toàn đúng:

```Python
>>> # Expected value: 2.68
>>> round(2.675, 2)
2.67
```

`2.675` là một tie và do đó sẽ được làm tròn theo chiến lược chúng ta đã nhắc tới ở bên trên. Đúng ra thì chúng ta sẽ nhận được kết quả là `2.68` nhưng cuối cùng chúng ta lại nhận được `2.67`. Thực ra thì lỗi này chính là lỗi biểu diễn dấu phẩy động, chứ không phải lỗi do hàm `round()` gây ra.

Chú ý là không riêng gì Python, tất cả các ngôn ngữ tuân theo chuẩn dấu phẩy động của IEEE đều gặp phải các vấn đề này - bao gồm cả C/C++, Java và JavaScript.

Tuy nhiên, thông thường những lỗi nhỏ với số dấu phẩy động thường có thể bỏ qua được và `round()` thực sự hoàn hảo.

#### Find the Absolute Value with `abs()`

Giá trị tuyệt đối của một số `n` chính là `n` nếu `n` là một số dương và `n` nếu `n` âm. Ví dụ, giá trị tuyệt đối của `3` là `3` trong khi giá trị tuyệt đối của `-5` là `5`.

Để tính giá trị tuyệt đối của một số trong Python, bạn có thể sử dụng:

```Python
>>> abs(3)
3

>>> abs(-5.0)
5.0
```

`abs()` luôn trả về một số dương cùng kiểu với tham trị được truyền. Ấy là, giá trị tuyệt đối của một số nguyên luôn là một số nguyên dương và giá trị tuyệt đối của một float luôn luôn là một float dương.

#### Raise to a Power with `pow()`

Ở một bài viết trước trong series, bạn đã được học cách nâng lũy thừa một số bằng toán tử `**`. Bạn có thể sử dụng `pow()` để đạt được cùng kết quả.

`pow()` nhận hai tham trị. Tham trị thứ nhất là cơ số (base) hay số được nâng lũy thừa. Tham trị thứ hai là số mũ (exponent) hay số bậc nâng lũy thừa.

Ví dụ:

```Python
>>> pow(2, 3)
8
>>> pow(2, -2)
0.25
```

Vậy đâu là sự khác biệt giữa `**` và `pow()`?

Hàm `pow()` chấp nhận một tham số tùy ý thứ ba để tính lũy thừa của số thứ nhất bậc của số thứ hai, sau đó nhận modulo tương ứng với số thứ ba. Nói cách khác, `pow(x, y, z)` tương đương với `(x ** y) % z`.

Đây là một ví dụ với `x = 2`, `y = 3`, và `z = 2`:

```Python
>>> pow(2, 3, 2)
0
```

Đầu tiên, `2` được nâng lên bậc `3` để nhận được `8`. Sau đó `8 % 2` được tính toán cho ra kết quả `0`.

#### Check if a Float Is Integral

Có thể bạn đã quen với các method thao tác với string như `.lower()`, `.upper()` và `.find()`. Các số nguyên và các số dấu phẩy động cũng có một số method.

Các method thao tác với số ít khi được sử dụng nhưng có một cái rất hữu ích. Các số dấu phẩy động có method `.is_integer()` để kiểm tra xem một số có là nguyên - nghĩa là không có phần phân số - hay không.

```Python
>>> num = 2.5
>>> num.is_integer()
False

>>> num = 2.0
>>> num.is_integer()
True
```

Một trường hợp chúng ta cần sử dụng đến `.is_integer()` là để xác thực đầu vào từ người dùng. Ví dụ, nếu bạn đang viết một ứng đặt pizza online thì có thể bạn muốn kiểm tra số lượng pizza mà khách hàng nhập vào là một số nguyên.

Nguồn: https://realpython.com/python-numbers/