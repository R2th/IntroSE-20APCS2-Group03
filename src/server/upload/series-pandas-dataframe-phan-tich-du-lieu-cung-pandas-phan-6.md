# Thống kê dữ liệu trong Pandas
Pandas cung cấp nhiều phương pháp thống kê cho DataFrames. Bạn có thể sử dụng thống kê cơ bản cho các cột số của Pandas DataFrame bằng .**describe()**:
```
>>> df
     name     city  age  py-core    php-score
6    Hoc      HCM   41     88.0       86.0
7   Tuan   Ha Noi   28     79.0       81.0
8    Nam  Da Nang   33     81.0       78.0
9    Huy  Long An   34     80.0       88.0
10  Luan      HCM   38     68.0       74.0

>>> df.describe()
            age    py-core  php-score
count   5.000000   5.000000   5.000000
mean   34.800000  79.200000  81.400000
std     4.969909   7.190271   5.727128
min    28.000000  68.000000  74.000000
25%    33.000000  79.000000  78.000000
50%    34.000000  80.000000  81.000000
75%    38.000000  81.000000  86.000000
max    41.000000  88.000000  88.000000
```

Bạn có thể thấy, .describe() trả về một DataFrame mới với số hàng được hiển thị ra các thông số như giá trị trung bình, độ lệch chuẩn, min, max và tỷ lệ phần trăm của các cột.

Nếu bạn muốn nhận thống kê cụ thể cho một hoặc tất cả các cột của mình, thì bạn có thể gọi các phương thức như *.mean()* hoặc *.std()*:
```
>>> df.mean()
age          34.8
py-core      79.2
php-score    81.4
dtype: float64

>>> df['php-score'].mean()
81.4

>>> df.std()
age          4.969909
py-core      7.190271
php-score    5.727128
dtype: float64

>>> df['php-score'].std()
5.727128425310541
```

Khi được áp dụng cho Pandas DataFrame, các methods này trả về Series với kết quả cho mỗi cột. Khi được áp dụng cho một  Series object hoặc một cột của DataFrame, các methods sẽ trả về **scalars**.

# Handling Missing Data
Missing data rất phổ biến trong data science và machine learning. Nhưng đừng bao giờ ngại điều đó! Pandas có các tính năng rất mạnh mẽ để làm việc với missing data.

Pandas thường đại diện cho missing data bằng giá trị  **NaN (not a number)**. Trong Python, bạn có thể lấy NaN bằng *float ('nan')*, *math.nan* hoặc *numpy.nan*. Từ Pandas 1.0, có những cách mới hơn như BooleanDtype, Int8Dtype, Int16Dtype, Int32Dtype và Int64Dtype sử dụng *pandas .NA* làm missing data.

```
df_ = pd.DataFrame({'b': [1, 2, np.nan, 4]})
>>> df_
     b
0  1.0
1  2.0
2  NaN
3  4.0
```

Bạn có thể thấy df_ tham chiếu đến DataFrame với một cột, b và bốn giá trị. Giá trị thứ ba là *nan* và được coi là missing theo mặc định.

### Tính toán với missing data
Nhiều phương thức Pandas bỏ qua các giá trị nan khi thực hiện các phép tính trừ khi chúng được định nghĩa rõ ràng:
```
>>> df_.mean()
b    2.333333
dtype: float64

>>> df_.mean(skipna=False)
b   NaN
dtype: float64
```

Trong ví dụ đầu tiên, df_.mean() tính giá trị trung bình và loại bỏ giá trị NaN (giá trị thứ ba) khi tính toán. Nó chỉ lấy 1, 2, 4 và trả về mức trung bình là 2,33.

Ví dụ thứ hai, nếu bạn định nghĩ .mean() với giá trị *skipna=False* để không bỏ qua các giá trị *nan* thì nó sẽ kiểm tra và trả về *nan* nếu có bất kỳ giá trị nào bị missing trong dữ liệu.

### Filling Missing Data
Pandas có một số tùy chọn để điền hoặc thay thế missing data bằng các giá trị khác. Một trong những phương thức thuận tiện nhất là *.fillna()*. Bạn có thể sử dụng nó để thay thế missing data bằng:
* Các giá trị được chỉ định
* Các giá trị trên giá trị bị thiếu
* Các giá trị dưới giá trị bị thiếu

Bạn có thể áp dụng với các tùy chọn được đề cập ở trên:

```
>>> df_.fillna(value=0)
     b
0  1.0
1  2.0
2  0.0
3  4.0

>>> df_.fillna(method='ffill')
     b
0  1.0
1  2.0
2  2.0
3  4.0

>>> df_.fillna(method='bfill')
     b
0  1.0
1  2.0
2  4.0
3  4.0
```

Trong ví dụ đầu tiên, *.fillna(value=0)* thay thế giá trị bị thiếu bằng 0.0, mà bạn đã chỉ định giá trị. Trong ví dụ thứ hai, *.fillna(method='ffill')* thay thế giá trị bị thiếu bằng giá trị ở trên nó, là 2.0. Trong ví dụ thứ ba, *.fillna(method='bfill')* sử dụng giá trị bên dưới giá trị bị thiếu, là 4,0.

Một cách phổ biến khác là áp dụng phép nội suy và thay thế các giá trị bị thiếu bằng các giá trị được nội suy. Bạn có thể làm điều này với *.interpolate()*:

```
>>> df_.interpolate()
     b
0  1.0
1  2.0
2  3.0
3  4.0
```

Như bạn có thể thấy, *.interpolate()* thay thế giá trị bị thiếu bằng một giá trị nội suy.

Bạn cũng có thể sử dụng tham số tùy chọn thay thế bằng *.fillna()*. Như vậy sẽ:
* Tạo và trả về DataFrame mới khi *inplace=False*
* Sửa đổi DataFrame hiện có và trả về None có khi *inplace=True*

Mặc định inplace là False. Tuy nhiên, inplace=True có thể rất hữu ích khi bạn đang làm việc với lượng lớn dữ liệu và muốn ngăn việc sao chép không cần thiết và không hiệu quả.

### Xóa hàng và cột có dữ liệu bị thiếu (missing data)

Trong một số trường hợp nhất định, bạn có thể muốn xóa các hàng hoặc  các cột có giá trị bị thiếu. Bạn có thể làm điều này với *.dropna()*:

```
>>> df_.dropna()
     b
0  1.0
1  2.0
3  4.0
```

Trong trường hợp này, *.dropna()* chỉ cần xóa hàng có giá trị *nan*. Nó cũng có tham số tùy chọn *inplace*,  cách thức hoạt động giống như với *.fillna()* và *.interpolate()*.

### Iterating Over một Pandas DataFrame
Như bạn đã biết, các label hàng và cột của DataFrame có thể được truy xuất dưới dạng chuỗi là *.index* và *.columns*. Bạn có thể sử dụng tính năng này để iterate over các label và lấy hoặc gắn các giá trị mong muốn. Tuy nhiên, Pandas cung cấp một số phương pháp thuận tiện hơn để iteration:
* *.items()* và *.iteritems()* để iterate qua các cột
*  *.iterrows()* để iterate qua các hàng
*  .itertuples() để iterate qua các hàng và lấy các bộ giá trị được named-tuple

Với *.items()* và *.iteritems()*, bạn sẽ iterate qua các cột của Pandas DataFrame. Mỗi lần iterate tạo ra một bộ giá trị với tên của cột và dữ liệu cột dưới dạng Series object:

```
>>> for col_label, col in df.iteritems():
...     print(col_label, col, sep='\n', end='\n\n')
...
      name
6      Hoc
7     Tuan
8      Nam
9      Huy
10    Luan
Name: name, dtype: object

      city
6         HCM
7      Ha Noi
8     Da Nang
9     Long An
10        HCM
Name: city, dtype: object

      age
6     41
7     28
8     33
9     34
10    38
Name: age, dtype: int64

      py-core
6     88.0
7     79.0
8     81.0
9     80.0
10    68.0
Name: py-core, dtype: float64

      php-score
6     86.0
7     81.0
8     78.0
9     88.0
10    74.0
Name: php-score, dtype: float64
```

Với *.iterrows()*, bạn iterate qua các hàng của Pandas DataFrame. Mỗi lần iterate lại tạo ra một *tuple* với tên của hàng và dữ liệu hàng dưới dạng *Series* object:

```
>>> for row_label, row in df.iterrows():
...    print(row_label, row, sep='\n', end='\n\n')
...
6
name          Hoc
city          HCM
age            41
py-core      88.0
php-score    86.0
Name: 6, dtype: object

7
name           Tuan
city         Ha Noi
age              28
py-core        79.0
php-score      81.0
Name: 7, dtype: object

8
name             Nam
city         Da Nang
age               33
py-core         81.0
php-score       78.0
Name: 8, dtype: object

9
name             Huy
city         Long An
age               34
py-core         80.0
php-score       88.0
Name: 9, dtype: object

10
name         Luan
city          HCM
age            38
py-core      68.0
php-score    74.0
Name: 10, dtype: object
```

Tương tự, với *.itertuples()*, nó sẽ iterate qua các hàng và trong mỗi lần iterate tạo ra một *named tuple* với (optionally) index và data:

```
>>> for row in df.loc[:, ['name', 'city', 'age']].itertuples():
...     print(row)
...
Pandas(Index=6, name='Hoc', city='HCM', age=41)
Pandas(Index=7, name='Tuan', city='Ha Noi', age=28)
Pandas(Index=8, name='Nam', city='Da Nang', age=33)
Pandas(Index=9, name='Huy', city='Long An', age=34)
Pandas(Index=10, name='Luan', city='HCM', age=38)
```

Bạn có thể chỉ định tên của tuple bằng tham số *name*, 'Pandas' là giá trị default. Bạn cũng có thể chỉ định label hàng với *index*,  với giá trị default là *True*.

```
>>> for row in df.loc[:, ['name', 'city', 'age']].(name='JunVu2VN', index=False):
...     print(row)
...
JunVu2VN(name='Hoc', city='HCM', age=41)
JunVu2VN(name='Tuan', city='Ha Noi', age=28)
JunVu2VN(name='Nam', city='Da Nang', age=33)
JunVu2VN(name='Huy', city='Long An', age=34)
JunVu2VN(name='Luan', city='HCM', age=38)
```

##### **Phần 6 đến đây là kết thúc rồi. Xin chào và hẹn gặp các bạn ở phần tiếp theo nhé!!! :wave:**