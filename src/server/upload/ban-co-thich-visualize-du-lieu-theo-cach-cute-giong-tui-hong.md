Tối qua rảnh rỗi lướt twitter chơi chơi tình cờ thấy bài viết hướng dẫn làm sao để tạo ra những biểu đồ để trực quan hóa dữ liệu theo cách ciu ciu nhất. Nên hôm nay tui cũng thử xem sao. Thực chất khi click ngay vào bài viết đó thấy mấy hình visualize dữ liệu trông thật đáng yêu và cực kỳ bắt mắt. Trong bài viết này tui sẽ chia sẻ cho mọi người một package cực kì dễ thương của python giống kiểu vẽ tay á mọi người =)). Tên em ý là: cutecharts ~ nghe thoai cũng thấy đáng iêu roài. 

Cùng bắt đầu xem sao nhé. 

# Giới thiệu đôi chút
Khác với các thư viện phổ biến như Matplotlib, seaborn hay Plotly, thư viện cutecharts lúc vẽ lên trông giống kiểu bạn vẽ tay hơn và trong một số trường hợp có thể hữu ích trong một số trường hợp. Tuy nhiên tui thấy thì nhìn hình đáng iu và bắt mắt cũng một phần tăng sự hứng thú đối với bản thân khi đọc dữ liệu rồi (ai có suy nghĩ giống hem?). Cute charts vừa dễ thương vừa giúp chúng ta có thể tương tác trực tiếp trên biểu đồ (cái điểm này khá giống với plotly này). Khi bạn di chuột trên biểu đồ thì có thể hiển thị ra những con số một cách trực quan nhất có thể. 

![](https://images.viblo.asia/569871da-57d6-4304-b91e-3da9facc9bd2.png)
Hình 1: Hình vẽ minh họa 

Như ở hình 1 bạn hoàn toàn có thể package này thực sự rất đáng yêu luôn. Hơn nữa tui còn thấy nó khá là *dễ gần* nữa cơ. 

# Cutecharts có gì hay? 
## Install như nào 
Giống như các package khác  thì bạn hoàn toàn có thể cài đặt bằng một dòng trong phút chốc. 

* pip install 
```
$ pip install cutecharts
```
hoặc bạn có thể cài đặt từ source code của tác giả

```
$ git clone https://github.com/cutecharts/cutecharts.py.git
$ cd cutecharts.py
$ pip install -r requirements.txt
$ python setup.py install
```
## Import thư viện 
```
import cutecharts.charts as ctc
```

## Dữ liệu 
Mình sử dụng GDP của các nước Đông Nam Á để visualize cho đơn giản. Mọi người có thể down [tại đây ](https://drive.google.com/file/d/1awb7mEEkrofvWTafQZCnM6hoP6L898X3/view?usp=sharing). Nguồn mình tham khảo [ở đây](https://vi.wikipedia.org/wiki/Danh_s%C3%A1ch_c%C3%A1c_qu%E1%BB%91c_gia_%C4%90%C3%B4ng_Nam_%C3%81_theo_GDP_danh_ngh%C4%A9a).

```
data_gdp = pd.read_excel('GDP.xlsx')
```
Cùng thử visualize với package này xem thế nào nhé!

## Visualize với cutecharts như thế nào? 
### Vẽ biểu đồ bar 
Vẽ biểu đồ cột với tập dữ liệu ở trên 

```
chart = ctc.Bar('GDP DNA',width='1000px',height='800px')
chart.set_options(
 labels=list(data_gdp['Country']),
 x_label='Country',
 y_label='GDP_2009' ,
 colors=['#1EAFAE' for i in range(len(train))]
 )
chart.add_series('GDP_2009',list(data_gdp[2009]))
chart.render_notebook()
```
Cùng show xem như thế nào nhé 
![](https://images.viblo.asia/d643e339-6c9a-4a9b-b152-048c5af2e27f.png)

Hình 2: Biểu đồ bar chart thể hiện GDP DNA năm 2009 

Ở biểu đồ này mình đang chọn 1 màu sắc cho tất cả các cột nếu mọi muốn nhiều màu sắc hơn chúng ta có thể thay đổi ở **param colors** như ở dưới đây. 

```
chart = ctc.Bar('GDP DNA',width='1000px',height='800px')
chart.set_options(
 labels=list(data_gdp['Country']),
 x_label='Country',
 y_label='GDP_2009' ,
 colors=['#1EAFAE', '#FFF1C9', '#FFF1C9','#F7B7A3','#EA5F89','#9B3192','#57167E','#47B39C','#00529B']
 )
chart.add_series('GDP_2009',list(data_gdp[2009]))
chart.render_notebook()
```
![](https://images.viblo.asia/4e94a02e-f986-442b-b40c-46240da457f6.png)

Hình 3: Biểu đồ bar chart với nhiều màu sắc được sử dụng

Các bạn chỉ cần click vào các cột khác nhau thì sẽ thấy sự khác biệt giữa các cột, mình thấy nó khá là thú vị :D. 

### Line chart 
Để có thể so sánh sự phát triển của các quốc gia trong 2 năm 2009 và 2011 chúng ta sẽ sử dụng biểu đồ line để có thể nhìn thấy nó trực quan hơn. Mình sẽ vẽ 2 đường biểu đồ về GDP trong 2 năm 2009 và 2011. 

```
chart = ctc.Line('GDP DNA 2009 & 2011',width='1000px',height='800px')
chart.set_options(
 labels=list(data_gdp['Country']), 
x_label='Country',
y_label='GDP_2009' )
chart.add_series('GDP 2009', list(data_gdp[2009])) 
chart.add_series('GDP 2011', list(data_gdp[2011]))
chart.render_notebook()
```

![](https://images.viblo.asia/ce58b3f7-39d5-499b-85fe-18cc6b5936f8.png)

Hình 4: Biểu đồ line chart trong 2 năm 2009 và 2011

Khi di chuyển  chuột ở trên biểu đồ, biểu đồ sẽ tự động show ra các nhãn như *hình 4*, bên cạnh đó còn show cho chúng ta đường nét đứt ở giữa để có thể thấy sự khác biệt giữa 2 năm rõ ràng hơn. 
### Pie Chart
Vẽ biểu đồ Pie Chart về GDP của các quốc gia Đông Nam Á. 

```
chart = ctc.Pie('GDP DNA pie chart',width='500px',height='400px')
chart.set_options(
 labels=list(data_gdp['Country']),
inner_radius=0
 )
chart.add_series(list(data_gdp[2011]))
chart.render_notebook()
```

![](https://images.viblo.asia/569871da-57d6-4304-b91e-3da9facc9bd2.png)
Hình 5: Pie chart

Bạn có thể thay đổi màu sắc của các trường giống như ở biểu đồ Bar ở trên mình hướng dẫn. Và nếu như bạn muốn vẽ biểu đồ Pie chart giống như cái bánh donut (donut chart). Bạn chỉ cần thay đổi tham số inner_radius. Giống như hình vẽ dưới đây. 
![](https://images.viblo.asia/1ccfe11d-cb18-4677-a0ee-b2d538553377.png)

### Radar Chart
Thực tế mình chưa dùng Radar chart bao giờ nhưng package này cung cấp có mỗi 5 loại biểu đồ nên mình thêm vào luôn :D không lẽ bỏ rơi bạn ý :p. Mọi người có thể tham khảo ý nghĩa của Radar chart ở [đây](https://datavizcatalogue.com/methods/radar_chart.html).
```
chart = ctc.Radar('GDP DNA',width='700px',height='600px')
chart.set_options(
 labels=list(data_gdp['Country']),
is_show_legend=True,
legend_pos = 'upRight'
 )
chart.add_series('GDP_2009',list(data_gdp[2009]))
chart.add_series('GDP_2011',list(data_gdp[2011]))
chart.render_notebook()
```
![](https://images.viblo.asia/22bbbe7a-95b6-41ab-b88b-8126c1e2ab08.png)
Hình : Radar chart. 

### Scatter Plot
Ở đây mình sử dụng luôn ví dụ trong [bài ](https://towardsdatascience.com/make-the-cutest-chart-in-python-visualize-your-data-with-hand-drawn-charts-f21157f76b4b) để xem mối quan hệ giữa nhiệt độ thời tiết và lượng kem bán ra như thế nào. 


```
#data
Temperature = [14.2,16.4,11.9,15.2,18.5,22.1,19.4,25.1,23.4,18.1,22.6,17.2]
Sales = [215,325,185,332,406,522,412,614,544,421,445,408]
```
Vẽ biểu đồ scatter
```
chart = ctc.Scatter('Ice Cream Sales vs Temperature',width='500px',height='600px')
chart.set_options(
 x_label='Temperature (Celcius)',
 y_label='Icecream Sales' ,
 colors=['#1EAFAE'],
 is_show_line = False,
 dot_size=1)
chart.add_series('Temperature', [(z[0], z[1]) for z in zip(Temperature, Sales)])
chart.render_notebook()
```
![](https://images.viblo.asia/aa16568f-cbd3-48ca-8011-1fc2d3e1a2a2.png)

Hình: scatter Plot 

Chúng ta có thể nhận thấy rằng thời tiết càng nóng thì lượng kem bán ra được càng nhiều  :D. ps:  quá hiển nhiên nhỉ =))
# Kết Luận
Thực tế có rất nhiều package trong việc hỗ trợ visualize model như matplotlib, seaborn hay plotly, ... .
Tuy nhiên,  mình thấy package này khá là đáng yêu. Chúng ta có thể sử dụng nó để show các hình vẽ cute cho những bài post của mình trên viblo hay khi EDA dữ liệu để mình cảm thấy hứng thú hơn với việc đi phân tích từng trường của dữ liệu. Điểm trừ của package này là lượng biểu đồ vẽ được vẫn còn hạn chế so với các package khác như matplotlib, ... . Anw, mình hi vọng mọi người sẽ có hứng thú hơn khi thực hiện trực quan hóa dữ liệu bằng package này :D 

# Reference 
https://github.com/cutecharts/cutecharts.py

https://towardsdatascience.com/make-the-cutest-chart-in-python-visualize-your-data-with-hand-drawn-charts-f21157f76b4b