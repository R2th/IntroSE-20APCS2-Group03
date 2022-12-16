Xin chào mọi người hôm nay mình sẽ viết bài viết với chủ đề khá quen thuộc mà mình hay viết đó là: Data Visualization, ở những bài viết trước mình đã viết về [Plotly](https://viblo.asia/p/gioi-thieu-visualization-data-voi-plotly-voi-tap-dataset-titanic-gAm5y8bqldb), [Cutecharts](https://viblo.asia/p/ban-co-thich-visualize-du-lieu-theo-cach-cute-giong-tui-hong-3P0lPPk4lox),... ở bài viết này mình sẽ thử với Lib để trực quan hóa dữ liệu mới: Altair. Altair là một thư viện trực quan hóa khai báo thống kê sử dụng với ngôn ngữ lập trình Python, dựa trên [Vega](https://vega.github.io/vega/) và [Vega-Lite](http://vega.github.io/vega-lite/). Thư viện này cung cấp ngôn ngữ trực quan hóa ngắn gọn và mạnh mẽ để xây dựng và thống kê dữ liệu một cách nhanh chóng và đơn giản.


![](https://images.viblo.asia/367cafcd-1e02-46c2-8699-17e5d280d966.png)
Hình 1. một số ví dụ trong Altair 

# Cài đặt 
Để cài đặt thư viện Altair bạn có thể dùng pip/conda đều được. 

## pip 
```
pip install altair vega_datasets
```
## conda
```
conda install -c conda-forge altair vega_datasets
```
Sau khi đã cài xong thư viện thì chúng ta bắt đầu làm thôi nào :D 
# Hướng dẫn cơ bản 
## Data 
Chúng ta có thể sử dụng pandas để đọc dữ liệu dạng csv, excel, ... Đầu tiên mình sẽ thử tạo một DataFrame đơn giản để trực quan hóa dữ liệu với thư viện này, với 2 column là col-1 và col-2

```
import altair as alt
import pandas as pd
data = pd.DataFrame({'col-1': list('CCCDDDEEE'),
                     'col-2': [2, 7, 4, 1, 2, 6, 8, 4, 7]})
chart = alt.Chart(data)
```
## Marks 
Sau khi  lựa chọn dữ liệu, chúng ta cần phải chọn loại biểu đồ mà mình mong muốn như: bar charts, line charts, area charts, scatter charts, histograms, and maps. Thuộc tính **mark** để thể hiện cụ thể cách chính xác mà sẽ biểu diễn trên hình vẽ như một điểm hay hình tròn,... 
![](https://images.viblo.asia/ccb5c8ec-da73-46e6-877d-a99e7f1093e8.png)
Hình: Altair Basic Marks
![](https://images.viblo.asia/614b0e95-766c-418d-a236-4ef90b628808.png)
Hình: Một số marks biểu đồ kết hợp 

Ví dụ chúng ta có thể biểu diễn dữ liệu dưới 1 điểm như dưới đây: 

```
import altair as alt
import pandas as pd
data = pd.DataFrame({'a': list('CCCDDDEEE'),
                     'b': [2, 7, 4, 1, 2, 6, 8, 4, 7]})
chart = alt.Chart(data)
alt.Chart(data).mark_point()
```

Sẽ thu được kết quả như sau: 

![](https://images.viblo.asia/6d091309-c188-4d2c-a6b4-14af2d0c5fdf.png)
Hình: mark_point() example

## Encodings

Trong Altair, encodings là ánh xạ dữ liệu đến các thuộc tính trực quan như axis, màu sắc, điểm đánh dấu và hình dạng của điểm đánh dấu ,... . Phương thức mã hóa: Chart.encode() xác định các thuộc tính khác nhau của display biểu đồ nó là chức năng quan trọng nhất để tạo ra hình ảnh trực quan có ý nghĩa. Mọi người có thể tham khảo thêm [tại đây](https://altair-viz.github.io/user_guide/encoding.html). 

Sử dụng encoding ở ví dụ trên: 
```
alt.Chart(data).mark_point().encode(
    x='col-1',
    y='col-2'
)
```
Mình gán x ứng với col-1, y ứng với col-2, kết qủa như dưới đây: 
![](https://images.viblo.asia/27063504-b605-47bc-aa39-a0e0f5694044.png)
Hình: encoding example 1

Thử một ví dụ lấy thêm từ 
```
import altair as alt
from vega_datasets import data
cars = data.cars()

alt.Chart(cars).mark_point().encode(
    x='Horsepower',
    y='Miles_per_Gallon',
    color='Origin',
    shape='Origin'
)
```

Kết quả sẽ như sau: 
![](https://images.viblo.asia/92ce7086-4e3e-4429-8894-21ec643a297e.png)

Hình: encodings example 2

## Position channels 

x: giá trị trục x 

y: gía trị trục y 

row: Hàng của một điểm mà chúng ta vẽ 

column: Cột của một điểm mà chúng ta vẽ 

## Mark Property channels 

color: Màu sắc của mark 

opacity: Độ mờ nhạt của mark 

shape: Hình dáng của mark 

size: kích thước của mark 

## Text channel 

text: text sử dụng cho mark 

## Tạo nên biểu đồ tương tác 

Bên cạnh những biểu đồ cơ bản, một trong những tính năng độc đáo của Altair là người dùng có thể tạo biểu đồ tương tác và tương tác với biểu đồ, như xoay, thu phóng, chọn một loạt dữ liệu. như code ở dưới đây: 

```
alt.Chart(data).mark_point().encode(
    x='col-1',
    y='col-2'
).interactive()
```
![](https://images.viblo.asia/e39915b9-5a05-4e21-9210-6c9f6352b21f.gif)
Hình: chart interactive 

# Hướng dẫn vẽ biểu đồ interactive 
Ở đây mình sẽ sử dụng dữ liệu car từ tập data trong [vega_datasets](https://github.com/altair-viz/vega_datasets)

Load dữ liệu từ vega_datasets ra: 
```
from vega_datasets import data
cars = data.cars()
```
Đầu tiên sẽ sử dụng selection_interval()

```
brush = alt.selection_interval()
```

Tiếp theo liên kết thuộc tính **brush** đến biểu đồ bằng cách add_selection:

```
alt.Chart(cars).mark_point().encode(
    x='Miles_per_Gallon:Q',
    y='Horsepower:Q',
    color='Origin:N'
).add_selection(
    brush
)
```

kết quả:
![](https://images.viblo.asia/2bd98da7-40a5-4bad-a751-a69a2dc0c97b.gif)
Hình: add_selection 

Việc add_selection chúng ta có thể lựa chọn và di chuyển từng vùng mà ta mong muốn tuy nhiên nó cũng chưa thể hiện được gì nhiều :v hoặc nói cách khác là làm cho vui. Vì vậy Altair cung cấp thêm condition() chức năng tạo hóa màu có điều kiện: khi lựa chọn đến vùng nào thì vùng còn lại sẽ bị mờ nhạt hơn như hình dưới đây: 

```
alt.Chart(cars).mark_point().encode(
    x='Miles_per_Gallon:Q',
    y='Horsepower:Q',
    color=alt.condition(brush, 'Origin:N', alt.value('lightgray'))
).add_selection(
    brush
)
```
Kết quả:
![](https://images.viblo.asia/9a9a6abf-a5b3-4813-b8bf-adabe65628c0.gif)
Hình: condition

mark_bar() chart
Tạo chart hình cột ở trong Altair
```
alt.Chart(cars).mark_bar().encode(
    y='Origin:N',
    color='Origin:N',
    x='count(Origin):Q'
)
```
![](https://images.viblo.asia/d2cda665-bf1e-4761-9543-9b53cdbc7da1.png)
Hình: mark_bar

Bên cạnh những biểu đồ đơn thì chúng ta có thể sử dụng để kết hợp 2 biểu đồ với nhau bằng cách sửa dụng **transform_filter()**. Vì vậy việc show nhiều biểu đồ sẽ đơn giản hơn :D 

```
points = alt.Chart(cars).mark_point().encode(
    x='Horsepower:Q',
    y='Miles_per_Gallon:Q',
    color=alt.condition(brush, 'Origin:N', alt.value('lightgray'))
).add_selection(
    brush
)
bars = alt.Chart(cars).mark_bar().encode(
    y='Origin:N',
    color='Origin:N',
    x='count(Origin):Q'
).transform_filter(
    brush
)
points & bars
```
Kết qủa :

![](https://images.viblo.asia/3207bd68-c63a-4197-a369-cfb538febad8.png)
Hình: bar and point chart




# Kết Luận
Cảm ơn mọi người đã đọc bài viết của mình. Hi vọng với bài viết này sẽ giúp mọi người có thêm nhiều lựa chọn khi show những bài phân tích dữ liệu của mình hơn.  Mọi người tham khảo link code[ tại đây](https://colab.research.google.com/drive/17Q8uW2dESIBsU6YTDnu5AAW7laOuHn4k?usp=sharing).
# Reference 

https://viblo.asia/p/ban-co-thich-visualize-du-lieu-theo-cach-cute-giong-tui-hong-3P0lPPk4lox

https://viblo.asia/p/gioi-thieu-visualization-data-voi-plotly-voi-tap-dataset-titanic-gAm5y8bqldb

https://towardsdatascience.com/python-interactive-data-visualization-with-altair-b4c4664308f8

https://vega.github.io/vega/

http://vega.github.io/vega-lite/

https://altair-viz.github.io/gallery/index.html#example-gallery