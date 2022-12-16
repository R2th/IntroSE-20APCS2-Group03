Các bạn có thể đọc phần trước của bài viết tại [đây](https://viblo.asia/p/cac-ham-pandas-ma-data-scientists-hay-dung-voi-nguyen-tac-8020-phan-1-Ny0VG988JPA).

# 11.Xóa cột
Nếu bạn muốn bỏ một hoặc nhiều cột khỏi DataFrame, hãy sử dụng phương thức *drop()* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                [2,"B"]],
                columns = [“coli", "“col2"])

df.drop(columns = ["col2"])

"""
    col1
0    1
l    2
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html?highlight=drop#pandas.DataFrame.drop).

# 12. GroupBy:
Nếu bạn muốn thực hiện thao tác tổng hợp sau khi nhóm, hãy sử dụng phương thức *groupby()* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                   [2,"B"],
                   [3,"A"],
                   [4,"C"]],
                   columns = ["col1", "col2"])

df.groupby("col2").col1.sum()
"""
    Col2
A    4
B    2
C    4
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.groupby.html?highlight=groupby#pandas.DataFrame.groupby).

# 13. Giá trị duy nhất trong cột:
Nếu bạn muốn đếm hoặc in giá trị duy nhất trong một cột của DataFrame, hãy sử dụng phương thức *unique()*  hoặc *nunique()* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                   [2,"B"],
                   [3,"A"],
                   [4,"C"]],
                   columns = ["col1", "col2"])

# Print Unique values
df.col2.unique()
"""
['A','B','C']
"""

# Number of unique values
df.col2.nunique()

"""
3
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.Series.unique.html?highlight=unique#pandas.Series.unique).

# 14. Điền các giá trị NaN (trống)
Nếu bạn muốn thay thế các giá trị NaN trong một cột bằng một số giá trị khác, hãy sử dụng phương thức *fillna()*  như được minh họa bên dưới:
```python
import pandas as pd
import numpy as np

df = pd.DataFrame([[1, "A"],
                   [2, np.nan],
                   [3, np.nan],
                   columns = ["col1", "col2"])

df.col2.fillna("B", inplace = True)

"""
 col1 col2
0  1   A
1  2   B
2  3   B
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.Series.fillna.html?highlight=fillna#pandas.Series.fillna).

# 15. Áp dụng hàm trên 1 cột:
Nếu bạn muốn áp dụng một hàm cho một cột, hãy sử dụng phương thức *apply()* như được minh họa bên dưới:
```python
import pandas as pd

def f(number):
    return number + 2

df = pd.DataFrame([[1, "A"],
                   [2, "B"],
                   columns = ["col1", "col2"])
                   
df["col3"] = df.col1.apply(f)

"""
 col1 col2 col3
0  1   A   3   
1  2   B   4
"""
```

Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.apply.html?highlight=apply#pandas.DataFrame.apply).

# 16. Loại bỏ trùng lặp:
Nếu bạn muốn loại bỏ các giá trị trùng lặp, hãy sử dụng phương thức *dropduplicates ()* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                   [2,"B"],
                   [1,"A"],
                   columns = ["col1", "col2"])
                   
df.drop_duplicates()
"""
 col1 col2
0  1   A
1  2   B
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html?highlight=drop_duplicates#pandas.DataFrame.drop_duplicates).

# 17. Đếm giá trị:
Nếu bạn muốn tìm tần suất của từng giá trị trong một cột, hãy sử dụng phương thức *value_counts()* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                   [2,"B"],
                   [2,"A"],
                   [3,"C"]],
                   columns = ["col1", "col2"])

df.col2.value_counts()

"""
A 2
B 1
C 1
"""
```

# 18. Kích thước của DataFrame:
Nếu bạn muốn tìm kích thước của DataFrame, hãy sử dụng thuộc tính *.shape* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                   [2,"B"],
                   [2,"A"],
                   [3,"C"]],
                   columns = ["col1", "col2"])

df.shape

"""
(4,2)
"""
```

Để kết thúc, trong bài đăng này, tôi đã trình bày một số hàm / phương thức được sử dụng phổ biến nhất trong Pandas để giúp bạn bắt đầu với thư viện này.

Hơn nữa, không có nơi nào tốt hơn là tham khảo tài liệu chính thức về Pandas có sẵn ở [đây](https://pandas.pydata.org/docs/) để có được kiến thức cơ bản và thực tế về các phương pháp khác nhau trong Pandas. Tài liệu chính thức của Pandas cung cấp giải thích chi tiết về từng đối số được một hàm chấp nhận cùng với ví dụ thực tế, theo tôi, là một cách tuyệt vời để có được kiến thức chuyên môn về Pandas.

Cảm ơn vì đã đọc. Tôi hy vọng bài viết này hữu ích.
# Kham khảo
https://towardsdatascience.com/20-of-pandas-functions-that-data-scientists-use-80-of-the-time-a4ff1b694707

https://pandas.pydata.org/docs/index.html