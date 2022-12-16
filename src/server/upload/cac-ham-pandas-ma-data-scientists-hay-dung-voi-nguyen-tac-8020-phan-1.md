Làm chủ toàn bộ thư viện Python như Pandas có thể là một thách thức đối với bất kỳ ai. Tuy nhiên, nếu chúng ta lùi lại một bước và suy nghĩ, liệu chúng ta có thực sự cần phải lưu ý đến từng chi tiết nhỏ của một thư viện cụ thể, đặc biệt là khi chúng ta sống trong một thế giới được điều hành bởi Nguyên tắc 80/20 (nguyên tắc Pareto)?

Do đó, bài đăng này là nỗ lực của tôi để áp dụng Nguyên tắc Pareto cho thư viện Pandas và giới thiệu cho bạn 20% các hàm Pandas cụ thể mà bạn có khả năng sử dụng 80% thời gian làm việc với DataFrames. Những phương pháp được đề cập dưới đây là những gì tôi đã sử dụng nhiều lần trong công việc hàng ngày của mình và cảm thấy cần thiết và đủ để làm quen với bất kỳ ai bắt đầu với Pandas.

# 1. Đọc file CSV:
Nếu bạn muốn đọc tệp CSV trong Pandas, hãy sử dụng phương thức *pd.readcsv ()*  như được minh họa bên dưới:
```python
import pandas as pd
file = "file.csv"

# Reading CSV
df = pd.read_csv(file)

# Changing Delimiter
symbou = "|"
df = pd.read_csv(file, sep = symbol)
```
Đọc tài liệu tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html?highlight=read_csv#pandas.read_csv).
# 2. Lưu một DataFrame thành 1 file CSV:
Nếu bạn muốn lưu DataFrame vào tệp CSV, hãy sử dụng phương thức *tocsv ()* như được minh họa bên dưới:
```python
import pandas as pd
file = "file.csv"

# Saving CSV
df.to_csv(file)

# Changing Delimiter while saving
symbol = "|"
df.to_csv(file, sep = symbol)
```
Đọc tài liệu tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html?highlight=to_csv#pandas.DataFrame.to_csv).
# 3. Tạo DataFrame từ danh sách các list:
Nếu bạn muốn tạo một DataFrame từ một list (danh sách), hãy sử dụng phương thức *pd.DataFrame()* như được minh họa bên dưới:
```python
import pandas as pd

data = [[1,2,3],[4,5,6]]

df = pd.DataFrame(data, columns = ['A', 'B', 'C'])

"""
  A B C
0 1 2 3 
1 4 5 6
"""
```

Đọc tài liệu tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

# 4. Tạo một DataFrame từ 1 dictionary:
Nếu bạn muốn tạo DataFrame từ từ điển, hãy sử dụng phương thức *pd.DataFrame()* như được minh họa bên dưới:
```python
import pandas as pd

data = {'A':[1,2], 'B':[3,4]}
df = pd.DataFrame(data)

"""
  A B
0 1 3
1 2 4
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

# 5. Hợp DataFrames (Merging DataFrames):
Thao tác hợp nhất trong DataFrames cũng giống như thao tác JOIN trong SQL. Chúng tôi sử dụng nó để nối hai DataFrames trên một hoặc nhiều cột. Nếu bạn muốn hợp nhất hai DataFrames, hãy sử dụng phương thức *pd.merge ()* như được minh họa bên dưới:
```python
import pandas as pd

df1 = pd.DataFrame([[1,"A"],[2,"B"]], columns = ["col1", "col2"])

df2 = pd.DataFrame([["A", 3],["B", 4]], columns = ["col2", "col3"])

pd.merge(df1, df2, on = "col2", how = "inner")

"""
 col1 col2 col2
0  1    A    3
1  2    B    4
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html?highlight=merge#pandas.DataFrame.merge).

# 6. Sắp xếp một DataFrame (Sorting a DataFrame):
Nếu bạn muốn sắp xếp một DataFrame dựa trên các giá trị trong một cột cụ thể, hãy sử dụng phương thức *sortvalues()* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[2,"A"],[3,"B"],[1,"C"]],columns = ["col1", "col2"])

df.sort_values(by = "col1")

"""
  col1 col2
2 1    C
0 2    A
1 3    B
"""
```
Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.sort_values.html?highlight=sort_values#pandas.DataFrame.sort_values).
# 7. Nối DataFrame (Concatenating):
Nếu bạn muốn nối các DataFrames, hãy sử dụng phương thức *pd.concat()* như được minh họa bên dưới:
```python
import pandas as pd

df1 = pd.DataFrame([[1, "A"], [2, "B"]], columns = ["col1", "col2"])
df2 = pd.DataFrame([["A", 3], ["B", 4]], columns = ["col3", "col4"])

pd.concat((df1, df2), axis = 1)

"""
    col1 col2 col3 col4
0  1     A     A     3
1  2     B     B     4
"""
```
- axis = 1 xếp các cột lại với nhau. 
- axis = 0 xếp các hàng lại với nhau, được cung cấp khớp với tiêu đề cột.

Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.concat.html?highlight=concat#pandas.concat).
# 8. Đổi tên cột:
Nếu bạn muốn đổi tên một hoặc nhiều cột trong DataFrame, hãy sử dụng phương thức *rename()* như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                  [2,"B"]],
                  columns = ["col1", "col2"])

df.rename(columns = {"col1":"col3",
                    "col2":"col4"})

"""
   col3 col4
0    1    A
1    2    B
"""
```

Đọc thêm tại [đây](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rename.html?highlight=rename#pandas.DataFrame.rename).

# 9. Thêm cột mới:
Nếu bạn muốn thêm một cột mới vào DataFrame, bạn có thể sử dụng thao tác gán thông thường như được minh họa bên dưới:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                   [2,"B"]],
                   columns = ["col1", "col2"])

df["col3"] = df["col1"] +2

"""
 Col1 col2 cols
0  1   A   3
1  2   B   4
"""
```

# 10. Lọc theo điều kiện:
Nếu bạn muốn lọc các hàng từ DataFrame dựa trên một điều kiện, bạn có thể thực hiện như dưới đây:
```python
import pandas as pd

df = pd.DataFrame([[1,"A"],
                [2,"B"],
                [2,"A"],
                [3,"C"],
                columns = ["col1", "col2"])

df[df.col1 > 1]

"""
col1 col2
 1    2    B
 2    2    A
 3    3    C
"""
```

**Phần 2** sẽ sớm được ra mắt . Cảm ơn vì đã đọc. Tôi hy vọng bài viết này hữu ích.
# Kham khảo
https://towardsdatascience.com/20-of-pandas-functions-that-data-scientists-use-80-of-the-time-a4ff1b694707

https://pandas.pydata.org/docs/index.html