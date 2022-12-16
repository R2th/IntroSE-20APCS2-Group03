# Thêm và xóa dữ liệu
- Pandas cung cấp một số thuật toán thêm và xóa dữ liệu ở row hoặc column. Dựa trên nhu cầu của bạn và có thể chọn ra những cách thức phù hợp để áp dụng.

### Thêm và xóa dữ liệu của row (dòng)
Nếu bạn muốn thêm một người mới vào danh sách dữ liệu của mình. Bạn có thể bắt đầu bằng cách tạo một Series object mới đại diện cho người mới này:
```
>>> data = pd.Series(data = ['Huy', 'HCM', 17, 100],
...                   index=df.columns, name=11)
>>> john
name          Huy
city          HCM
age           17
py-score      100
Name: 11, dtype: object

>>> data.name
11
```

Dữ liệu mới này có nhãn(labels) tương ứng với column label từ dữ liệu df. Đó là lý do tại sao bạn cần *index = df.columns.*

Nếu bạn cần dữ liệu mới khởi tạo và row cuối cùng của df đã tạo trước đó. Bạn có thể sử dụng phương thức *.append()*
```
>>> df = df.append(data)
>>> df
      name     city     age  py-score
6     Hoc      HCM      41      88.0
7     Tuan     Ha Noi   28      79.0
8     Nam      Da Nang  33      81.0
9     Huy      Long An  34      80.0
10    Luan     HCM      38      68.0
11    Huy      HCM      17     100.0
```

Ở đây, .append() trả về Pandas DataFrame với hàng mới được thêm vào. Lưu ý cách Pandas sử dụng thuộc tính data.name, là giá trị 11, để chỉ định labels cho hàng mới.

Bạn đã thêm một hàng mới bằng một lệnh gọi tới .append() và bạn có thể xóa hàng đó bằng một lệnh gọi tới .drop():

```
>>> df = df.drop(labels=[11])
>>> df
      name     city     age  py-score
6     Hoc      HCM      41      88.0
7     Tuan     Ha Noi   28      79.0
8     Nam      Da Nang  33      81.0
9     Huy      Long An  34      80.0
10    Luan     HCM      38      68.0
```

Ở đây, .drop() loại bỏ các hàng được chỉ định với labels tham số. Theo mặc định, nó trả về Pandas DataFrame với dữ liệu sau khi thực hiện xóa. Nếu bạn chuyển inplace = True, thì DataFrame ban đầu sẽ được sửa đổi và bạn sẽ nhận được None có làm giá trị trả về.

### Thêm và xóa dữ liệu của column (cột)

Cách đơn giản nhất để chèn một cột trong Pandas DataFrame là làm theo cùng một quy trình mà bạn sử dụng khi thêm một mục vào df. Đây là cách bạn có thể thêm một cột chứa điểm của ứng viên của bạn trong một bài kiểm tra JavaScript.

```

>>> df['js-score'] = np.array([89.0, 81.0, 69.6, 96.9, 88.0])
>>> df
      name     city     age  py-score    js-core
6     Hoc      HCM      41      88.0       89.0
7     Tuan     Ha Noi   28      79.0       81.0
8     Nam      Da Nang  33      81.0       69.6
9     Huy      Long An  34      80.0       96.9
10    Luan     HCM      38      68.0       88.0
```

Bây giờ DataFrame ban đầu có thêm một cột: *js-score* ở cuối.

Bạn không cần phải cung cấp một mãng giá trị đầy đủ. Bạn có thể thêm một cột mới với một giá trị duy nhất:

```
>>> df['total'] = 0.0
>>> df
      name     city     age  py-score    js-core     total
6     Hoc      HCM      41      88.0       89.0       0.0
7     Tuan     Ha Noi   28      79.0       81.0       0.0
8     Nam      Da Nang  33      81.0       69.6       0.0
9     Huy      Long An  34      80.0       96.9       0.0
10    Luan     HCM      38      68.0       88.0       0.0
```

Nếu bạn muốn chỉ định vị trí của cột mới, thì bạn có thể sử dụng *.insert()*:

```
>>> df.insert(loc=4, column='php-score',
...           value=np.array([86.0, 81.0, 78.0, 88.0, 74.0]))
>>> df
      name     city     age  py-score    php-core    js-core     total
6     Hoc      HCM      41      88.0       86.0       89.0       0.0
7     Tuan     Ha Noi   28      79.0       81.0       81.0       0.0
8     Nam      Da Nang  33      81.0       78.0       69.6       0.0
9     Huy      Long An  34      80.0       88.0       96.9       0.0
10    Luan     HCM      38      68.0       74.0       88.0       0.0
```

Tham số *loc* xác định vị trí hoặc chỉ mục dựa trên index của cột mới trong Pandas DataFrame. Cột đặt nhãn(labels) của cột mới và giá trị chỉ định các giá trị dữ liệu để thêm vào.

Bạn có thể xóa một hoặc nhiều cột khỏi Pandas DataFrame giống như cách bạn làm với Python dictionary thông thường, bằng cách sử dụng câu lệnh *del*:

```
>>> del df['total']
>>> df
      name     city     age  py-score    php-core    js-core
6     Hoc      HCM      41      88.0       86.0       89.0
7     Tuan     Ha Noi   28      79.0       81.0       81.0
8     Nam      Da Nang  33      81.0       78.0       69.6
9     Huy      Long An  34      80.0       88.0       96.9
10    Luan     HCM      38      68.0       74.0       88.0
```

Cũng giống với *del*, khi bạn xử dụng *.pop('total')*, dữ liệu cột chỉ định sẽ được xóa và sẽ trả về dữ liệu được xóa đi. 

```
>>> df.pop('total')
0    0.0
1    0.0
2    0.0
3    0.0
4    0.0
Name: total, dtype: float64
```

Bạn có thể xóa một hoặc nhiều cột với *.drop()*

```
>>> df = df.drop(labels='js-core', axis=1)
>>> df
      name     city     age  py-score    php-core
6     Hoc      HCM      41      88.0       86.0
7     Tuan     Ha Noi   28      79.0       81.0
8     Nam      Da Nang  33      81.0       78.0
9     Huy      Long An  34      80.0       88.0
10    Luan     HCM      38      68.0       74.0
```

Theo mặc định, *.drop()* trả về DataFrame không có các cột được chỉ định trừ khi bạn chuyển inplace = True.