Chức năng *groupby* của Pandas cho phép chúng ta thực hiện mô hình phân tích dữ liệu “**Split-Apply-Combine**” một cách dễ dàng. Về cơ bản, với *Pandas groupby*, chúng ta có thể chia dữ liệu Pandas thành các nhóm nhỏ hơn bằng cách sử dụng một hoặc nhiều biến. Pandas có một số chức năng tổng hợp làm giảm kích thước của đối tượng được nhóm. Trong bài đăng này sẽ ví dụ về việc sử dụng 13 chức năng tổng hợp sau khi thực hiện thao tác *Pandas groupby*.

Dưới đây sẽ là tóm tắc công dụng của 13 chức năng tổng hợp có sẵn trong Pandas:

1. **mean()**: Tính trung bình của các nhóm
2. **sum()**: Tính tổng các giá trị của nhóm
3. **size()**: Tính kích thước nhóm
4. **count()**: Tính toán số lượng nhóm
5. **std()**: Độ lệch chuẩn của các nhóm
6. **var()**: Tính toán phương sai của các nhóm
7. **sem()**: Sai số chuẩn của giá trị trung bình của các nhóm
8. **describe()**: Tạo thống kê mô tả
9. **first()**: Tính toán giá trị đầu tiên của nhóm
10. **last()**: Tính giá trị cuối cùng của nhóm
11. **nth()**: Lấy giá trị thứ n hoặc một tập hợp con nếu n là một danh sách
12. **min()**: Tính toán giá trị nhỏ nhất nhóm
13. **max()**: Tính toán giá trị lớn nhất nhóm

Nào, giờ chúng ta sẽ cùng tìm hiểu chi tiết từng chức năng nhé.

Đầu tiên, chúng ta hãy tạo 1 bảng dữ liệu mẫu bằng Pandas.

```
>>> import pandas as pd

>>> df = pd.DataFrame({
    'rating_title': ['PG-13', 'TV-PG', 'TV-14', 'TV-14', 'PG-13', 'TV-PG', 'PG-13', 'TV-PG', 'TV-14'],
    'rating_core': [82., 61., 98., 98., 82., 98., 64., 92., 92.]})

>>> df
  rating_title  rating_core
0        PG-13         82.0
1        TV-PG         61.0
2        TV-14         98.0
3        TV-14         98.0
4        PG-13         82.0
5        TV-PG         98.0
6        PG-13         64.0
7        TV-PG         92.0
8        TV-14         92.0
```

Trong các ví dụ tiếp thep, chúng ta sẽ phân nhóm theo rating_title và tính toán tổng hợp trong mỗi group/rating_title trên các giá trị rating_core.

### 1. Pandas groupby: mean()
Hàm tổng hợp **mean()** tính các giá trị trung bình cho mỗi nhóm. Ở đây,  pandas groupby  sẽ tính toán giá trị trung bình là điểm trung bình (rating_core) theo mỗi tiêu đề (rating_title).
```
>>> df.groupby('rating_title').mean()

              rating_core
rating_title             
PG-13           76.000000
TV-14           96.000000
TV-PG           83.666667

```

### 2. Pandas groupby: sum
Hàm tổng hợp **sum()** chỉ đơn giản là tổng các giá trị trong mỗi nhóm. Trong ví dụ này, **sum()** tính tổng điểm ở mổi tiêu đề.
```
>>> df.groupby('rating_title').sum()

              rating_core
rating_title             
PG-13               228.0
TV-14               288.0
TV-PG               251.0
```

### 3. Pandas groupby: size()
Hàm tổng hợp **size()** tính toán kích thước cho mỗi nhóm. Trong ví dụ này, hàm **size()** tính số hàng trên tiêu đề.
```
>>> df.groupby('rating_title').size()

rating_title
PG-13           3
TV-14           3
TV-PG           3
dtype: int64
```

### 4. Pandas groupby: count()
Hàm tổng hợp **count()** tính toán số lượng giá trị có trong mỗi nhóm.

Về cơ bản, hàm này như .size(), nhưng bỏ qua bất kỳ giá trị nào bị thiếu. Dữ liệu phía trên không có bất kỳ giá trị nào bị thiếu, vì vậy kết quả từ cả hai hàm là như nhau.

```
>>> df.groupby('rating_title').count()

              rating_core
rating_title             
PG-13                   3
TV-14                   3
TV-PG                   3
```

### 5. Pandas groupby: std()
Hàm tổng hợp **std()** tính toán độ lệch chuẩn của các giá trị trong mỗi nhóm. Trong ví dụ này, hàm **std()** tính toán độ lệch chuẩn trên các giá trị điểm số trên mỗi tiêu đề.
```
>>> df.groupby('rating_title').std()

              rating_core
rating_title             
PG-13           10.392305
TV-14            3.464102
TV-PG           19.857828
```

### 6. Pandas grouby: var()
Hàm tổng hợp **var()** tính toán phương sai, ước tính độ biến thiên, cho mỗi cột mỗi nhóm. Trong ví dụ này, hàm **var()** tính toán phương sai của các giá trị  điểm số cho mỗi tiêu đề.
```
>>> df.groupby('rating_title').var()

              rating_core
rating_title             
PG-13          108.000000
TV-14           12.000000
TV-PG          394.333333
```

### 7. Pandas grouby: sem()
Hàm tổng hợp **sem()** tính toán sai số chuẩn của các giá trị trung bình cho mỗi nhóm.
```
>>> df.groupby('rating_title').sem()

              rating_core
rating_title             
PG-13            6.000000
TV-14            2.000000
TV-PG           11.464922
```

### 8. Pandas groupby: describe()
Hàm tổng hợp **description()** tính toán một bản tóm tắt nhanh các giá trị cho mỗi nhóm. Nó tính toán số lượng giá trị, giá trị trung bình, std, giá trị nhỏ nhất, giá trị lớn nhất và giá trị ở nhiều phần trăm mỗi nhóm.
```
>>> df.groupby('rating_title').describe()

             rating_core                                                    
                   count       mean        std   min   25%   50%   75%   max
rating_title                                                                
PG-13                3.0  76.000000  10.392305  64.0  73.0  82.0  82.0  82.0
TV-14                3.0  96.000000   3.464102  92.0  95.0  98.0  98.0  98.0
TV-PG                3.0  83.666667  19.857828  61.0  76.5  92.0  95.0  98.0
```

### 9. Pandas groupby: first()
Hàm tổng hợp **first()** nhận giá trị hàng đầu tiên trong mỗi nhóm
```
>>> df.groupby('rating_title').first()

              rating_core
rating_title             
PG-13                82.0
TV-14                98.0
TV-PG                61.0
```

### 10. Pandas groupby: last()
Hàm tổng hợp **last()** nhận giá trị hàng cuối cùng trong mỗi nhóm
```
>>> df.groupby('rating_title').last()

              rating_core
rating_title             
PG-13                64.0
TV-14                92.0
TV-PG                92.0
```

### 11. Pandas groupby: nth()
Hàm tổng hợp **nth()**, cho giá trị thứ n, trong mỗi nhóm. Ví dụ, nếu chúng ta muốn giá trị thứ 2 trong mỗi nhóm, chúng ta chỉ định 2 làm đối số cho hàm nth(). Hàm tổng hợp nth() cũng có thể lấy một danh sách làm đối số và cung cấp cho chúng ta một tập con các hàng trong mỗi nhóm.
```
>>> df.groupby('rating_title').nth(2)

              rating_core
rating_title             
PG-13                64.0
TV-14                92.0
TV-PG                92.0
```

### 12. Pandas groupby: max()
Hàm tổng hợp **max()** tính giá trị lớn nhất cho mỗi nhóm.
```
>>> df.groupby('rating_title').max()

              rating_core
rating_title             
PG-13                82.0
TV-14                98.0
TV-PG                98.0
```

### 13. Pandas groupby: min()
Hàm tổng hợp **min()** tính giá trị nhỏ nhất cho mỗi nhóm.
```
>>> df.groupby('rating_title').min()

              rating_core
rating_title             
PG-13                64.0
TV-14                92.0
TV-PG                61.0
```


Okay, tất cả các ví dụ ở trên, mình chỉ có hai cột trong dữ liệu. Và sử dụng một cột cho **groupby()** và cột kia để tính toán một số hàm. Còn nếu bạn có nhiều cột và muốn làm những việc khác nhau trên mỗi cột đó. Điều đó nghe có vẻ thú vị phải không? Bạn có thể sử dụng *groupby* cho các trường hợp đó để tìm được dữ liệu bạn mong muốn một cách dễ dàng. Hãy sử dụng *groupby* ngay đi nào. :grinning:

**Chúc bạn thành công. :v:**