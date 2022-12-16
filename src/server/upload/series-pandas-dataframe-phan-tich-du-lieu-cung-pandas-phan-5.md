# Áp dụng các phép toán số học trong pandas
- Bạn có thể áp dụng các phép toán số học cơ bản như cộng, trừ, nhân và chia cho các đối tượng Pandas Series và DataFrame giống như cách bạn làm với mảng NumPy:

```
>>> df['py-score'] + df['php-score']
 6    174.0
7     160.0
8     159.0
9     168.0
10    142.0
dtype: float64

>> df['php-score'] / 100
6     0.86
7     0.81
8     0.78
9     0.88
10    0.74
dtype: float64

      name     city     age  py-score    php-score
6     Hoc      HCM      41      88.0       86.0
7     Tuan     Ha Noi   28      79.0       81.0
8     Nam      Da Nang  33      81.0       78.0
9     Huy      Long An  34      80.0       88.0
10    Luan     HCM      38      68.0       74.0
```

Bạn có thể sử dụng kỹ thuật này để chèn một cột mới vào Pandas DataFrame. Ví dụ: hãy thử tính tổng điểm dưới dạng kết hợp tuyến tính của điểm py-core, php-core của mỗi người:

```
>>> df['total'] = (df['py-score']*3 + df['php-score']*2)/5
>>> df
      name     city     age  py-score    php-score    total
6     Hoc      HCM      41      88.0       86.0       87.2
7     Tuan     Ha Noi   28      79.0       81.0       79.8
8     Nam      Da Nang  33      81.0       78.0       79.8
9     Huy      Long An  34      80.0       88.0       83.2
10    Luan     HCM      38      68.0       74.0       70.4
```

Bây giờ DataFrame của bạn có một cột total với tổng điểm được tính từ điểm py-core và php-core.


# Áp dụng các hàm NumPy và SciPy

Hầu hết các quy trình NumPy và SciPy có thể được áp dụng cho các đối tượng Chuỗi Pandas hoặc DataFrame dưới dạng đối số thay vì dưới dạng mảng NumPy. Để minh họa điều này, bạn có thể tính toán tổng điểm kiểm tra của từng người bằng cách sử dụng NumPy routine *numpy.average()*.

Thay vì chuyển một mảng NumPy sang *numpy.average()*, bạn sẽ chuyển một phần của Pandas DataFrame của mình:

```
>>> import numpy as np

>>> score = df.iloc[:, 3:5]
>>> score
      py-score    php-score
6       88.0       86.0
7       79.0       81.0
8       81.0       78.0
9       80.0       88.0
10      68.0       74.0

>>> np.average(score, axis=1, weights=[0.7, 0.3])
array([87.4, 79.6, 80.1, 82.4, 69.8])
```

Biến *score* hiện nay đề cập đến DataFrame với điểm py-core, php-core. Bạn có thể sử dụng điểm số làm đối số của *numpy.average()* và nhận kết hợp tuyến tính của các cột với trọng số được chỉ định. Như kết quả trên ta có được mảng điểm total score được tính từ cột (py-score * 0.7 + php-score * 0.3)

Nhưng đó không phải là tất cả! Bạn có thể sử dụng mảng NumPy được trả về bởi *average()* làm cột mới của df. Đầu tiên, xóa tổng số cột hiện có khỏi df, sau đó thêm cột mới bằng cách sử dụng *average()*:

```
>>> del df['total']
>>> df
      name     city     age  py-score    php-score
6     Hoc      HCM      41      88.0       86.0
7     Tuan     Ha Noi   28      79.0       81.0
8     Nam      Da Nang  33      81.0       78.0
9     Huy      Long An  34      80.0       88.0
10    Luan     HCM      38      68.0       74.0

>>> df['total'] = np.average(score, axis=1, weights=[0.7, 0.3])
>>> df
      name     city     age  py-score    php-score    total
6     Hoc      HCM      41      88.0       86.0        87.4
7     Tuan     Ha Noi   28      79.0       81.0        79.6
8     Nam      Da Nang  33      81.0       78.0        80.1
9     Huy      Long An  34      80.0       88.0        82.4
10    Luan     HCM      38      68.0       74.0        69.8
```

Kết quả tương tự như trong ví dụ trước đó.

# Sorting trong Pandas DataFrame
Bạn có thể sắp xếp một Pandas DataFrame bằng *.sort_values()*:

```
>>> df.sort_values(by='total', ascending=False)
      name     city     age  py-score    php-score    total
6     Hoc      HCM      41      88.0       86.0        87.4
9     Huy      Long An  34      80.0       88.0        82.4
8     Nam      Da Nang  33      81.0       78.0        80.1
7     Tuan     Ha Noi   28      79.0       81.0        79.6
10    Luan     HCM      38      68.0       74.0        69.8
```

Bạn đã sắp xếp DataFrame của bạn theo các giá trị trong cột *total*. Tham số *by* đặt label của hàng hoặc cột để sắp xếp theo *.ascending* chỉ định xem bạn muốn sắp xếp theo thứ tự tăng dần (True) hay giảm dần (False). Bạn có thể *pass axis* nếu bạn muốn sort theo hàng (axis = 0) hoặc theo cột (axis = 1)

Nếu bạn muốn sort theo nhiều cột, thì bạn chỉ cần thêm đối số ở *by* và *ascending* tương ứng.

```
>>>  df.sort_values(by=['py-score', 'php-score'], ascending=[False, False])
      name     city     age  py-score    php-score    total
6     Hoc      HCM      41      88.0       86.0        87.4
8     Nam      Da Nang  33      81.0       78.0        80.1
9     Huy      Long An  34      80.0       88.0        82.4
7     Tuan     Ha Noi   28      79.0       81.0        79.6
10    Luan     HCM      38      68.0       74.0        69.8
```

Trong trường hợp này, DataFrame được sắp xếp theo cột py-core, nhưng nếu hai giá trị giống nhau, thì thứ tự của chúng được xác định bởi các giá trị từ cột php-score.

Tham số *inplace* cũng có thể được sử dụng với *.sortvalues()*. Nó được đặt thành False theo mặc định, đảm bảo *.sortvalues()* trả về một Pandas DataFrame mới. Khi bạn đặt inplace = True, DataFrame hiện có sẽ được sửa đổi và *.sortvalues()* sẽ trả về *None*.

# Filtering Data
Data filtering là một tính năng mạnh mẽ khác của Pandas. Nó hoạt động tương tự như  indexing với mảng Boolean trong NumPy.

Nếu bạn áp dụng một số thao tác logic trên một Series object, thì bạn sẽ nhận được một Series khác với các giá trị Boolean True và False:

```
>>> filter_ = df['total] >= 80
>>> filter_
6   True
7   False
8   True
9   True
10  False
Name: total, dtype: bool
```

Trong trường hợp này, df['total'] >= 80 trả về True cho những hàng có điểm Total lớn hơn hoặc bằng 80. Nó trả về False cho các hàng có điểm Total nhỏ hơn 80.

Bây giờ bạn có Series filter_ chứa đầy dữ liệu Boolean. Biểu thức df[filter_] trả về một Pandas DataFrame với các hàng từ df tương ứng với True trong filter_:

```
>>> df[filter_]
      name     city     age  py-score    php-score    total
6     Hoc      HCM      41      88.0       86.0        87.4
8     Nam      Da Nang  33      81.0       78.0        80.1
9     Huy      Long An  34      80.0       88.0        82.4
```

Bạn có thể tạo các biểu thức phức tạp bằng cách kết hợp các phép toán logic với các toán tử sau:
* **NOT (~)**
* **AND (&)**
* **OR (|)**
* **XOR (^)**

Ví dụ: bạn có thể nhận được DataFrame với các thành viên có điểm py-score và điểm php-score lớn hơn hoặc bằng 80:
```
>>> df[(df['py-score'] >= 80) & (df['php-score'] >= 80)]
      name     city     age  py-score    php-score    total
6     Hoc      HCM      41      88.0       86.0        87.4
9     Huy      Long An  34      80.0       88.0        82.4
```

Biểu thức (df ['py-score']> = 80) & (df ['php-score']> = 80) trả về một Series có kết quả thỏa điều kiện  >= 80 là True và False ở các giá trị khác.

Đối với một số hoạt động yêu cầu lọc dữ liệu, sẽ thuận tiện hơn khi sử dụng *.where()*. Nó có thể thay thế các giá trị ở các vị trí mà điều kiện không được thỏa mãn:
```
>>> df['total'].where(cond=df['total'] >= 80, other=0.0)
6   87.4
7    0.0
8   80.1
9   82.4
10   0.0
```

**Tạm kết thúc phần 5 ở đây nhé. Hẹn gặp lại các bạn ở phần tiếp theo... :wink:**