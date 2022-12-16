# Pandas
Pandas là một thư viện mã nguồn mở được xây dựng dựa trên NumPy, sử dụng thao tác và phân tích dữ liệu, được thiết kế để cho phép bạn làm việc với dữ liệu được gắn nhãn hoặc quan hệ theo cách trực quan hơn
* Có thể xử lý tập dữ liệu khác nhau về định dạng: chuỗi thời gian, bảng không đồng nhất, ma trận dữ liệu
* Khả năng import dữ liệu từ nhiều nguồn khác nhau như CSV, DB/SQL
* Có thể xử lý vô số phép toán cho tập dữ liệu: subsetting, slicing, filtering, merging, groupBy, re-ordering, and re-shaping,..
* Xử lý dữ liệu mất mát theo ý người dùng mong muốn: bỏ qua hoặc chuyển sang 0
* Xử lý, phân tích dữ liệu tốt như mô hình hoá và thống kê
* Tích hợp tốt với các thư viện khác của python
* Cung cấp hiệu suất tốt

Để cài đặt pandas nếu bạn có Anaconda chỉ cần gõ `conda install pandas`  hoặc sử dụng tools pip `pip install pandas`.

Sau khi cài đặt xong, trong Python, chúng ta cần khai báo `import pandas` để có thể bắt đầu sử dụng các hàm của pandas. Vì pandas là thư viện được sử dụng thường xuyên nên nó thường được khai báo gọn lại thành pd `import pandas as pd` pd có thể thay thế bằng các từ khác, tuy nhiên bạn nên đặt là pd vì các tài liệu hướng dẫn đều ngầm quy ước như thế

Pandas có ba cấu trúc dữ liệu và nó được xây dựng dựa trên thư viện Numpy vậy nên chúng hoạt động rất nhanh và hiệu quả: **Series**, **DataFrame**, **Panel**. Trong đó **Panel** là mảng 3 chiều. **Panel** thì không được sử dụng rãi như như Series hay DataFrame và nó cũng không dễ hiển thị hay trừu tượng hoá như màn một chiều và hai chiều, nên dưới đây mình chỉ giới thiệu **Series** và **DataFrame**
## Series
Series là mảng một chiều giống như mảng Numpy, hay như một cột của một bảng, nhưng nó bao gồm thêm một bảng đánh label. Series có thể được khởi tạo thông qua NumPy, kiểu Dict hoặc các dữ liệu vô hướng bình thường

Series có thể được tạo bằng cách sử dụng hàm tạo sau `pandas.Series( data, index, dtype, copy)`

|  | Mô tả |
| -------- | -------- |
| **data**     |có nhiều dạng khác nhau như ndarray (mảng n chiều), list, constants   |
| **index**     |Các giá trị index phải là duy nhất và có thể là hash có cùng độ dài với dữ liệu Mặc định `np.arrange (n)` nếu không có chỉ mục nào được thông qua   |
| **dtype**     |loại dữ liệu. Nếu không có, kiểu dữ liệu sẽ được suy ra   |
| **copy**     |Sao chép dữ liệu, mặc định là false   |

Một Series có thể được tạo bằng các đầu vào khác nhau như: **Array**, **Dict**, **Scalar value** hoặc **constant**

### Tạo một series rỗng: 
**Example 1:**
```python
#Khai báo thư viện pandas và khai báo nó là pd
import pandas as pd
s = pd.Series()
print s
```
Output của nó là như sau:
```scala
0   a
1   b
2   c
3   d
dtype: object
```
Khi chúng ta không truyền **index**, thì mặc định nó sẽ đánh từ **0** đến **len(data)-1**

**Example 2:**
```python
#Khai báo thư viện pandas và khai báo nó là pd
import pandas as pd
import numpy as np
data = np.array(['a','b','c','d'])
s = pd.Series(data,index=[100,101,102,103])
print s
```
Output của nó
```shell
100  a
101  b
102  c
103  d
dtype: object
```
Chúng tôi đã truyền **index** ở đây. Bây giờ chúng ta có thể thấy các giá trị được lập **index** tùy chỉnh trong đầu ra
### Tạo một Series từ dict
```python
#import the pandas library and aliasing as pd
import pandas as pd
import numpy as np
data = {'a' : 0., 'b' : 1., 'c' : 2.}
s = pd.Series(data,index=['b','c','d','a'])
print s
```
Output:
```scala
b 1.0
c 2.0
d NaN
a 0.0
dtype: float64
```
**Chú ý:**  Thứ tự của index được duy trì và phần tử bị thiếu được lấp đầy bằng NaN (Không phải là số
### Tạo một Series từ Scalar
Nếu dữ liệu là một giá trị **scalar**, **index** phải được cung cấp. Giá trị sẽ được lặp lại để phù hợp với độ dài của **index**
```python
#import the pandas library and aliasing as pd
import pandas as pd
import numpy as np
s = pd.Series(5, index=[0, 1, 2, 3])
print s
```
Output:
```php
0  5
1  5
2  5
3  5
dtype: int64
```
### Truy cập dữ liệu từ Series với Position
Dữ liệu trong series có thể được truy cập tương tự như dữ liệu trong một ndarray.

Example
```python
import pandas as pd
s = pd.Series([1,2,3,4,5],index = ['a','b','c','d','e'])
print s[0] # Lấy phần tử đầu tiên
```
Output:
```markdown
1
```

```python
import pandas as pd
s = pd.Series([1,2,3,4,5],index = ['a','b','c','d','e'])
print s[:3] # Lấy 3 phần tử đầu tiên
```
Output:
```scala
a  1
b  2
c  3
dtype: int64
```
```python
import pandas as pd
s = pd.Series([1,2,3,4,5],index = ['a','b','c','d','e'])
print s[-3:] # Lấy 3 phần tử cuối cùng
```
Output:
```css
c  3
d  4
e  5
dtype: int64
```
### Truy xuất dữ liệu bằng Label  (Index)
Example 1: Truy xuất một phần tử bằng giá trị **index label**
```python
import pandas as pd
s = pd.Series([1,2,3,4,5],index = ['a','b','c','d','e'])

# Lấy một phần tử
print s['a'] # Output: 1
```
Example 2: Truy xuất nhiều phần tử bằng cách sử dụng danh sách các giá trị **index label**
```python
import pandas as pd
s = pd.Series([1,2,3,4,5],index = ['a','b','c','d','e'])

# Lấy nhiều phần tử
print s[['a','c','d']]
```
Output:
```shell
a  1
c  3
d  4
dtype: int64
```
Example 3: Nếu label không tồn tại, thì sẽ ném exception
```python
import pandas as pd
s = pd.Series([1,2,3,4,5],index = ['a','b','c','d','e'])

# Lấy một phần tử
print s['f']
```
Output:
```javascript
…
KeyError: 'f'
```
## DataFrame
Một **Data frame** là một cấu trúc dữ liệu 2  chiều, dữ liệu được sắp xếp theo kiểu bảng trong các hàng và cột có các đặc trưng sau:

* Các cột dữ liệu là các kiểu không đồng nhất: float64, int, bool, …
* Kích thước table có thể thay đổi: các cột có thể thêm hoặc xoá đi
* Các trục được dán nhãn (hàng và cột)
* Có thể thực hiện các phép toán số học trên các hàng và cột

![](https://images.viblo.asia/2ea8ca17-9c5c-49d5-a6bf-2be1d6b791a5.jpg)

Một DataFrame có thể được tạo bằng cách sử dụng hàm tạo sau `pandas.DataFrame( data, index, columns, dtype, copy)`
|  | Mô tả |
| -------- | -------- |
| **data**     |dữ liệu có nhiều dạng khác nhau như ndarray, series, map, lists, dict, constants hoặc một DataFrame khác   |
| **index**     |Đối với các row labels, **Index** được sử dụng cho resulting frame là Mặc định tùy chọn `np.arrange (n)` nếu không có **index** nào được thông qua   |
| **columns**     |Đối với các column  labels. cú pháp mặc định tùy chọn là - `np.arrange(n)`   ,Điều này chỉ đúng nếu không có **index** nào được thông qua|
| **dtype**     |Kiểu dữ liệu của từng cột   |
| **copy**     |Sao chép dữ liệu, mặc định là false   |
Một DataFrame có thể được tạo bằng các đầu vào khác nhau như: **Lists**, **Dict**, **Series**, **Numpy ndarrays**, **DataFrame** khác
### Tạo một DataFrame rỗng
```python
#import the pandas library and aliasing as pd
import pandas as pd
df = pd.DataFrame()
print df
```
Output:
```markdown
Empty DataFrame
Columns: []
Index: []
```
### Tạo một DataFrame từ Lists
Example 1: Tạo bằng một list
```python
import pandas as pd
data = [1,2,3,4,5]
df = pd.DataFrame(data)
print df
```
Output:
```csharp
     0
0    1
1    2
2    3
3    4
4    5
```
Example 2: Tạo từ một danh sach các lists
```python
import pandas as pd
data = [['Alex',10],['Bob',12],['Clarke',13]]
df = pd.DataFrame(data,columns=['Name','Age'])
print df
```
Output:
```markdown
      Name      Age
0     Alex      10
1     Bob       12
2     Clarke    13
```
Example 3: 
```objectivec
import pandas as pd
data = [['Alex',10],['Bob',12],['Clarke',13]]
df = pd.DataFrame(data,columns=['Name','Age'],dtype=float)
print df
```
Output:
```markdown
      Name     Age
0     Alex     10.0
1     Bob      12.0
2     Clarke   13.0
```
**Chú ý:** tham số **dtype** thay đổi kiểu dữ liệu cột Age thành **float**
### Tạo một  DataFrame từ Dict của ndarrays / Lists
Tất cả các **ndarrays** phải có cùng độ dài. Nếu **index** được thông qua, thì độ dài của **index** sẽ bằng với độ dài của mảng

Nếu không có index nào được truyền, thì theo mặc định, index sẽ là range (n), trong đó n là độ dài mảng

Example 1:
```python
import pandas as pd
data = {'Name':['Tom', 'Jack', 'Steve', 'Ricky'],'Age':[28,34,29,42]}
df = pd.DataFrame(data)
print df
```
Output:
```markdown
      Age      Name
0     28        Tom
1     34       Jack
2     29      Steve
3     42      Ricky
```
**Chú thich:** Quan sát các giá trị 0,1,2,3. Chúng là index mặc định được gán cho từng row sử dụng hàm range(n).

Example 2: Bây giờ chúng ta hãy tạo một DataFrame được lập index bằng cách sử dụng các arrays
```python
import pandas as pd
data = {'Name':['Tom', 'Jack', 'Steve', 'Ricky'],'Age':[28,34,29,42]}
df = pd.DataFrame(data, index=['rank1','rank2','rank3','rank4'])
print df
```
Output:
```shell
         Age    Name
rank1    28      Tom
rank2    34     Jack
rank3    29    Steve
rank4    42    Ricky
```
**Chú thich:** Tham số **index** gán một index cho mỗi hàng
### Tạo một DataFrame từ một danh sách của Dicts
Danh sách Dictionaries  có thể được chuyển qua dưới dạng dữ liệu đầu vào để tạo DataFrame. Các keys  của Dictionaries theo mặc định được lấy làm tên cột

Example 1: Ví dụ sau đây cho thấy cách tạo DataFrame bằng cách truyền một list các dictionaries
```python
import pandas as pd
data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}]
df = pd.DataFrame(data)
print df
```
Output:
```markdown
    a    b      c
0   1   2     NaN
1   5   10   20.0
```
**Chú thích:** NaN (Not a Number) được thêm vào các khu vực bị thiếu

Example 2: Ví dụ sau đây cho thấy cách tạo DataFrame bằng cách chuyển danh sách dictionaries  và các **index** hàng
```python
import pandas as pd
data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}]
df = pd.DataFrame(data, index=['first', 'second'])
print df
```
Output:
```sql
        a   b       c
first   1   2     NaN
second  5   10   20.0
```
Example 3: Ví dụ sau đây cho thấy cách tạo DataFrame với danh sách dictionaries, index hàng và index cột
```python
import pandas as pd
data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}]

#With two column indices, values same as dictionary keys
df1 = pd.DataFrame(data, index=['first', 'second'], columns=['a', 'b'])

#With two column indices with one index with other name
df2 = pd.DataFrame(data, index=['first', 'second'], columns=['a', 'b1'])
print df1
print df2
```
Output:
```markdown
#df1 output
         a  b
first    1  2
second   5  10

#df2 output
         a  b1
first    1  NaN
second   5  NaN
```
**Chú thích:** df2 DataFrame được tạo với một index cột khác với khóa của dictionary, do đó, nối thêm NaN vào vị trí. Trong khi đó, df1 được tạo với các index cột giống như các khóa của dictionary
### Tạo một DataFrame từ Dict của Series
Dictionary của Series có thể được thông qua để tạo thành một DataFrame. Index là sự kết hợp của tất cả các index được thông qua
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
   'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print df
```
Output: 
```scala
      one    two
a     1.0    1
b     2.0    2
c     3.0    3
d     NaN    4
```
**Note:** Quan sát series thứ nhất, không có nhãn **‘d’** được thông qua, nhưng kết quả là, đối với nhãn **d**, NaN được gắn vào
### Column Selection
Chúng tôi sẽ hiểu điều này bằng cách chọn một cột từ DataFrame
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
   'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print df ['one']
```
Output:
```css
a     1.0
b     2.0
c     3.0
d     NaN
Name: one, dtype: float64
```
### Column Addition
Chúng tôi sẽ hiểu điều này bằng cách thêm một cột mới vào DataFrame hiện có
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
   'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)

# Adding a new column to an existing DataFrame object with column label by passing new series

print ("Adding a new column by passing as Series:")
df['three']=pd.Series([10,20,30],index=['a','b','c'])
print df

print ("Adding a new column using the existing columns in DataFrame:")
df['four']=df['one']+df['three']

print df
```
Output:
```markdown
Adding a new column by passing as Series:
     one   two   three
a    1.0    1    10.0
b    2.0    2    20.0
c    3.0    3    30.0
d    NaN    4    NaN

Adding a new column using the existing columns in DataFrame:
      one   two   three    four
a     1.0    1    10.0     11.0
b     2.0    2    20.0     22.0
c     3.0    3    30.0     33.0
d     NaN    4     NaN     NaN
```
### Column Deletion
Cột có thể bị xóa hoặc popped; hãy để mình lấy một ví dụ để hiểu làm thế nào
```python
# Using the previous DataFrame, we will delete a column
# using del function
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']), 
   'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd']), 
   'three' : pd.Series([10,20,30], index=['a','b','c'])}

df = pd.DataFrame(d)
print ("Our dataframe is:")
print df

# using del function
print ("Deleting the first column using DEL function:")
del df['one']
print df

# using pop function
print ("Deleting another column using POP function:")
df.pop('two')
print df
```
Output:
```markdown
Our dataframe is:
      one   three  two
a     1.0    10.0   1
b     2.0    20.0   2
c     3.0    30.0   3
d     NaN     NaN   4

Deleting the first column using DEL function:
      three    two
a     10.0     1
b     20.0     2
c     30.0     3
d     NaN      4

Deleting another column using POP function:
   three
a  10.0
b  20.0
c  30.0
d  NaN
```
### Row Selection, Addition, and Deletion
Bây giờ chúng ta sẽ hiểu **selection** hàng, **addition** và **deletion** thông qua các ví dụ. Hãy bắt đầu với khái niệm **selection**

**Selection by Label**

Hàng có thể được chọn bằng cách chuyển label hàng cho hàm **loc**
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']), 
   'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print df.loc['b']
```
Output:
```css
one 2.0
two 2.0
Name: b, dtype: float64
```
Kết quả là một series có label là tên cột của DataFrame. Và tên của series là label mà nó được lấy

**Selection by integer location**

Hàng có thể được chọn bằng cách chuyển vị trí số nguyên cho hàm **iloc**
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
   'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print df.iloc[2]
```
Output:
```css
one   3.0
two   3.0
Name: c, dtype: float64
```
**Slice Rows**

Có thể chọn nhiều hàng bằng cách sử dụng toán tử **‘:'**
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']), 
   'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print df[2:4]
```
Output:
```shell
   one  two
c  3.0    3
d  NaN    4
```
**Addition of Rows**

Thêm hàng mới vào DataFrame bằng function **append**. Hàm này sẽ nối các hàng ở cuối
```python
import pandas as pd

df = pd.DataFrame([[1, 2], [3, 4]], columns = ['a','b'])
df2 = pd.DataFrame([[5, 6], [7, 8]], columns = ['a','b'])

df = df.append(df2)
print df
```
Output:
```markdown
   a  b
0  1  2
1  3  4
0  5  6
1  7  8
```
**Deletion of Rows**
Dùng index label để xóa hoặc drop hàng từ DataFrame. Nếu nhãn được nhân đôi, thì nhiều hàng sẽ bị loại bỏ
```python
import pandas as pd

df = pd.DataFrame([[1, 2], [3, 4]], columns = ['a','b'])
df2 = pd.DataFrame([[5, 6], [7, 8]], columns = ['a','b'])

df = df.append(df2)

# Drop rows with label 0
df = df.drop(0)

print df
```
Output:
```markdown
  a b
1 3 4
1 7 8
```
# Kết Luận
Trên đây mình chỉ giới thiệu sơ lược về **Pandas** cũng như 3 cấu trúc chính của **Pandas**: **Series** là các mảng một chiều, **DataFrame** là mảng hai chiều, và **Panel** là 3 chiều. Ở bài tiếp theo mình sẽ giới thiệu cách thao tác với CSV file, cơ sở dữ liệu và một số hàm hữu ích khác của **Pandas**
# Tài liệu tham khảo
Bài viết được dịch từ nguồn: [python pandas tutorials](https://www.tutorialspoint.com/python_pandas/index.htm)