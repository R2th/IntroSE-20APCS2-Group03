Xin chào mọi người, chúc mừng năm mới mọi người, chúc mọi người năm mới mạnh khỏe, an khang thịnh vượng. 

Dữ liệu chứa rất nhiều thông tin chi tiết có ý nghĩa. Phân tích dữ liệu là cách để có được những thông tin chi tiết đó. Đôi khi, chúng ta bối rối trong việc lựa chọn công cụ nào chúng ta muốn sử dụng. Hoặc chúng ta có thể sử dụng một ngôn ngữ lập trình như Python hoặc một số bạn không biết code python vẫn muốn dùng python để phân tích dữ liệu, ... . Ở bài viết này mình sẽ chia sẻ cho mọi người một số package trực quan hóa dữ liệu mình vừa thử sử dụng,mình khá thích tìm hiểu về mấy cái thư viện kiểu này và bên cạnh đó mình thấy nó khá là hữu ích và tiện lợi cho việc phân tích cũng như trực quan hóa dữ liệu. Mình sẽ chia sẻ các Package:

- Lux
- Pandas Profiling
- Mito

# Lux 
Lux là một thư viện Python hỗ trợ việc khám phá dữ liệu nhanh chóng và dễ dàng bằng cách tự động hóa quá trình trực quan hóa và phân tích dữ liệu. Chỉ cần in  dữ liệu trong Jupyter, Lux đề xuất một tập hợp các hình ảnh trực quan - cực kì hữu ích và tiện lợi đúng không :D.  Tất cả những gì mình cẩn phải làm là nhấp vào hình ảnh mình mong muốn vậy là đã hoàn tất - không cần phải viết code gì luôn á :v ! Lux là lựa chọn tuyệt vời cho những ai muốn  trực quan hóa dữ liệu mình có nhanh hơn bằng Python.( nhanh hơn cả pandas_profiling mình đã từng viết bài [ở đây](https://viblo.asia/p/exploring-du-lieu-chi-mot-dong-code-trong-python-ByEZk29xKQ0) luôn). Ok chúng ta cùng thử xem nhé. Dữ liệu các bạn xem tại [đây ](https://raw.githubusercontent.com/lux-org/lux-datasets/master/data/college.csv)nhé

Đầu tiên chúng ta phải cài đặt đã 
```python
!pip install lux-api
```

```python
import lux
import pandas as pd
```
 cùng đọc dữ liệu bằng pandas và thử xem nhé.
 
```python
 df = pd.read_csv("https://raw.githubusercontent.com/lux-org/lux-datasets/master/data/college.csv")
```

Để có thể lựa chọn pandas hay lux thì chúng ta phải tiến hành cài đặt extension cho jupyter-notebook đã nha. 

```python
jupyter nbextension install --py luxwidget
jupyter nbextension enable --py luxwidget
```

Còn nếu bạn dùng jupyter-lab thì cài đặt như sau: 


```python
jupyter labextension install @jupyter-widgets/jupyterlab-manager
jupyter labextension install luxwidget
```

Nếu bạn bị lỗi gì đó thì thử l[àm theo cái này ](https://stackoverflow.com/questions/69931575/problem-running-the-lux-library-jupyter-notebooks)nhé. 

Cài extension xong rồi thì cùng xem kết quả nào. 

![](https://images.viblo.asia/f4ff7a7c-f4f6-46a9-9d09-837defd7632d.gif)

Hình: kết quả 

Nhìn vào ảnh gif trên thì mọi thứ đã có sẵn đúng không nào :D. Các bạn thử cài đặt và làm theo nhé ^^. 

Đối với Lux ngoài việc thư viện đưa ra tất cả những hình ảnh liên quan thì bạn có thể lựa chọn những biến hay những giá trị mà bạn quan tâm để đáp ứng đúng nhu cầu của mình hơn. 

Ví dụ chúng ta có thể quan tâm đến các thuộc tính AverageCost và SATAverage

```python
df.intent = ["AverageCost","SATAverage"]
df
```

![](https://images.viblo.asia/23ad4c01-ab07-4aac-8962-9b171e076dd6.png)

Hình: 2 thuộc tính "AverageCost","SATAverage"

Khi bạn muốn visualize nhanh hơn thì thực hiện như sau:

```python
from lux.vis.Vis import Vis
Vis(["Region=New England","MedianEarnings"],df)
```

![](https://images.viblo.asia/797fef52-023d-46ee-869c-cc1a21baf499.png)

Hình: Kết quả 

Tóm lại Lux rất nhanh chóng và tiện lợi phải không nào :D
# Pandas Profiling
Về package này mình đã có 1 bài viết ở đây [](https://viblo.asia/p/exploring-du-lieu-chi-mot-dong-code-trong-python-ByEZk29xKQ0). Mọi người tham khảo nhé. Với pandas Profiling thì bạn chỉ cần 1 dòng code là show hết tất cả những gì mà bạn mong muốn có luôn.

# Mito

Mito là một thư viện có khả năng phân tích dữ liệu. Không giống như thư viện Pandas, Mito có giao diện giống như phần mềm bảng tính. Do đó, chúng tôi có thể khám phá và xử lý dữ liệu mà không cần phải code. Mỗi chỉnh sửa bạn thực hiện trong Mitosheet sẽ tạo Python tương đương trong ô mã bên dưới. Mito rất hữu ích với những bạn không biết code python hoặc không thích gõ code cho lắm, và những người chưa biết lựa chọn biểu đồ nào cho phù hợp với dữ liệu mình đang có. 

{@embed: https://www.youtube.com/watch?v=VobWi0af-Tc}

Video hướng dẫn sử dụng Mito, mọi người có thể xem cách dùng Mito ở video trên hoặc ở tutorial mình cho [ở đây ](https://docs.trymito.io/getting-started/tutorial).

## Cài đặt
Thực hiện cài đặt Mito như sau 

`pip install mitoinstaller`

`python -m mitoinstaller install`

Với Mito các bạn nên dùng jupyter lab nha :D
 
 
 Cùng thử xem nào 
 
```python
 import mitosheet
 mitosheet.sheet()
```

Chạy thử trên jupyter-lab thì mình được kết quả như dưới đây:

![](https://images.viblo.asia/5b60750f-8cf9-4b66-86e2-c1fe5533b810.png)

Hình: Mitosheet

Mình thấy yêu cầu nhập tài khoản mail để sử dụng. Ok, nhập mail vào thì được như thế này nè :D

![](https://images.viblo.asia/e82233c0-bcac-40af-b610-68c4ec6dea1c.png)

Hình: Mitosheet

Ở Hình trên chúng ta thấy có export, import file, có tạo pivot table, graph để visualize dữ liệu, ... việc của chúng ta chỉ cần click thôi chứ không cần phải viết code python nữa, quá hữu ích và nhanh chóng luôn. Ok cùng tiếp tục xem nào :D 


Ở đây mình sử dụng 2 file  **Airport-Pets.csv** và **Zipcode-Data.csv** mọi người tải ở [đây](https://drive.google.com/file/d/1hX13lQD7Co-Dk8KLAfinuqJt2PI2EAYa/view?usp=sharing) nè. 

### Import file 

- Đầu tiên chúng ta click vào import 
- Chọn file mà bạn muốn thực hiện trực quan hóa dữ liệu
- click import file -> ok (như hình bên dưới)

![](https://images.viblo.asia/ac3b34ed-412b-4644-b928-c9e4ad4f602d.png)

Hình: import file

Sau khi mình import xong thì được ntn 

![](https://images.viblo.asia/2703c0cf-9939-4f62-bdef-1d87bde6ad4e.png)

Hình: import file

Như mình đã nói ở trên Mito bạn chỉ cần click chứ không cần phải viết code gì hết. Và lúc bạn thao tác thì Mito cũng tự động gen ra code luôn như dưới đây nè:

![](https://images.viblo.asia/aa96117a-fbb5-4c5d-9e19-10545debebd4.png)

Hình: code Mito tự gen

```python
from mitosheet import *; register_analysis('UUID-1c64d513-edbf-4f4f-9064-c185cfa053ee')
import pandas as pd
Airport_Pets = pd.read_csv(r'/home/pham.thi.hong.anh/Mito Tutorial Data/Airport-Pets.csv')

import pandas as pd
Zipcode_Data = pd.read_csv(r'/home/pham.thi.hong.anh/Mito Tutorial Data/Zipcode-Data.csv')
```

Cũng là dùng pandas để đọc csv nè.  Vậy là chúng ta đã hoàn thành xong import data (đọc dữ liệu)

### Merge các sheet lại
Bây giờ chúng ta tiến hành merge 2 file **Airport-Pets.csv** và **Zipcode-Data.csv**.

Đơn giản chỉ cần click vào merge là xong, chúng ta được df3 như dưới đây

![](https://images.viblo.asia/7a973f08-68fc-44c3-98e0-58251242685c.png)

Hình: merge file

Code thì như thế này đây, xịn quá :D

```python
# Merged Zipcode_Data and Airport_Pets
temp_df = Airport_Pets.drop_duplicates(subset='Zip') # Remove duplicates so lookup merge only returns first match
df3 = Zipcode_Data.merge(temp_df, left_on=['Zip'], right_on=['Zip'], how='left', suffixes=['_Zipcode_Data', '_Airport_Pets'])
```

### Tạo pivot table 

Bạn click vào Pivot xong lựa chọn cột mong muốn để tạo thành pivot table

![](https://images.viblo.asia/06570041-f53c-48a6-9358-26b795b121a8.png)
Hình: Pivot Table

Code như dưới đây 

```python
# Pivoted df3 into df4
unused_columns = df3.columns.difference(set(['State']).union(set([])).union(set({'Mean_Income', 'Median_Income'})))
tmp_df = df3.drop(unused_columns, axis=1)
pivot_table = tmp_df.pivot_table(
    index=['State'],
    values=['Median_Income', 'Mean_Income'],
    aggfunc={'Median_Income': ['count'], 'Mean_Income': ['count']}
)
pivot_table.columns = [flatten_column_header(col) for col in pivot_table.columns.values]
df3_pivot_1 = pivot_table.reset_index()
```


### Trực quan hóa 

Mito còn cung cấp cả vẽ biểu đồ cho mình nữa, bạn muốn vẽ với column nào thì lựa chọn thôi nè :D

![](https://images.viblo.asia/6c1ca0af-09d6-41c5-a018-f14723b1c771.png)

Hình: trực quan hóa

Copy code Mito tự gen ra thì được vầy nè:

```python
# Import plotly and create a figure
import plotly.graph_objects as go
fig = go.Figure()



# Add the bar chart traces to the graph
for column_header in ['State']:
    fig.add_trace(
        go.Bar( 
            x=df3[column_header],
            y=df3['Median_Income'],
            name=str(column_header)
        )
    )

# Update the title and stacking mode of the graph
# See Plotly documentation for customizations: https://plotly.com/python/reference/bar/
fig.update_layout(
    xaxis_title="State",
    yaxis_title="Median_Income",
    title="State, Median_Income bar chart",
    barmode='group',
)
fig.show(renderer="iframe")
```

Mito quá tiện đúng k nào, mọi người tự cài đặt về rồi khám phá nhé :D

# Kết Luận
Vậy là mọi nguời đã biết thêm các thư viện phân tích dữ liệu hữu ích rồi . Cảm ơn mọi người đã đọc bài viết của mình ạ. Mong mn đóng góp ý kiến :D
# Reference
https://medium.com/trymito/3-python-packages-to-try-in-2022-6126e37b111f

https://github.com/lux-org/lux

https://docs.trymito.io/

https://docs.trymito.io/getting-started/tutorial