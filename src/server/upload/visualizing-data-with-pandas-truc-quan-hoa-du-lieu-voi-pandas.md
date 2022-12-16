## Lời dẫn đầu
Chào mọi người, tiếp nối một số sharing nho nhỏ về một số hàm cơ bản hay sử dụng trong Pandas [Link bài](https://viblo.asia/p/mot-so-ham-pandas-co-ban-su-dung-trong-bai-toan-time-series-PAoJe6p3L1j), lần này mình xin tiếp tục chia sẻ những điều mình biết được trong quá trình học visualizing data với Pandas. Sẽ có rất nhiều phương thức visualizing nhưng mình nghĩ mỗi bài toán đặt ra sẽ có một cách visualizing phù hợp. Do đó, mình hy vọng, một ít chia sẻ của mình có thể hỗ trợ cho các bạn một phần nhỏ nào đó. Và ok, bắt đầu bài sharing hôm nay thôi 😄.
***
## Nội dung
### Tại sao phải thực hiện Visualizing data?
Visualizing data như cách giải thích của anh Phạm Đình Khánh thì nó có thể hiểu là hình ảnh hóa dựa trên dữ liệu. Mục đích chính của **Visualizing data** hay **Trực quan hóa dữ liệu** là bước có thể giúp mình hiểu một cách trực quan và dễ dàng bộ dữ liệu của chúng ta hơn. 
> Nhờ có visualization, chúng ta có thể dễ dàng đưa ra các so sánh trực quan, tính toán tỷ trọng, nhận biết trend, phát hiện outlier, nhận diện đặc điểm phân phối của biến tốt hơn. Từ đó hỗ trợ quá trình nắm thông tin và đưa ra quyết định tốt hơn. Trong các kĩ năng của ***data scientist thì visualization là một trong những kĩ năng cơ bản và quan trọng nhất.***

Rất may mắn, Pandas hỗ trợ rất mạnh mẽ công đoạn Visualizing data này. Một ít sức mạnh của nó được thể hiện ở các phần dưới đây.
![apt](https://i.imgur.com/9i806Rh.png)
Nguồn: https://jovian.ai/a-ashish01kumar/python-matplotlib-data-visualization#C0
### Các loại biểu đồ trong Pandas
*Một số loại biểu đồ cơ bản mà Pandas hỗ trợ bao gồm:*
```shell
df.plot.hist() #histogram
df.plot.bar()  #bar chart
df.plot.barh() #horizontal bar chart
df.plot.line() #line chart
df.plot.area() #area chart
df.plot.scatter() #scatter plot
df.plot.box()  #box plot
df.plot.kde()  #kde plot
df.plot.hexbin() #hexagonal bin plot
df.plot.pie()  #pie chart
```
***Hoặc mình có thể gọi các biểu đồ này trong Pandas theo cách:*** \
`df.plot(kind = '<loại biểu đồ>');`  \
Ví dụ: `df.plot(kind = 'area');` \
🤔 ***Tại sao phải chấm phẩy ở cuối dòng lệnh???***
> NOTE: To avoid seeing `Out[5]: <matplotlib.axes._subplots.AxesSubplot at 0x2640e47af60>`
in jupyter you can add a semicolon to the end of the plot line. This is `;`

### Một số loại biểu đồ mình đã sử dụng
#### Histograms
Đây là một trong những loại biểu đồ phổ biến nhất. Histograms biểu điễn phân phối tần suất trong những khoảng giá trị được xác định trước của biến. Và biểu đồ này thường áp dụng cho biến liên tục.
```javascript
df.plot.hist()
```
![Hình minh họa về Histogram](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/1.png) \
Ảnh minh họa biểu đồ histogram \
Mình có thể căn chỉnh biểu đồ, lựa chọn màu cạnh và tô viền cho các bins - các cột trong histogram bằng câu lệnh:
```objectivec
df.plot.hist(edgecolor = 'c').autoscale(enable = True, axis = 'both', tight = True)
```
![Hình minh họa về Histogram](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/2.png) \
Ảnh minh họa về kết quả khi thiết lập một số thông số trên biểu đồ histogram \
*Lưu ý* Mình có thể thay đổi một vài giá trị cho các tham số như: 
* Đối với `edgecolor = 'c'` - nó thể hiện màu viền của cột và một số giá trị khác trong tham số edgecolor như `'b', 'g', 'r', 'c', 'm', 'y', 'k', 'w'`
* Đối với `autoscale` cơ chế căn chỉnh có thể bao gồm `'x' , 'y' và 'both'`
* Thú vị đây 😃! Default số bins tức số cột được biểu diễn là 10 do  đó ta có thể thay đổi giá trị này thành một con số khác. Ví dụ:
```python
#bins = 40
df.plot.hist(bins=40, edgecolor='k').autoscale(enable=True, axis='both', tight=True)
```
![Hình minh họa về Histogram](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/3.png) \
Biểu đồ histogram với bins = 40
#### Bar plots
Tương tự như histogram, đây cũng là một loại biểu đồ phổ biến, ngoại trừ việc nó thường biểu diễn các dữ liệu discrete - rời rạc. Và nó thường được sử dụng để so sánh giá trị giữa các nhóm thông qua độ dài cột. 
* Câu lệnh vẽ bar plot:
```java
df.plot.bar();
```
![Hình minh họa về bar chart](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/4.png) 
* Bar plots với các cột chồng lên nhau
```rust
df.plot.bar(stacked = True);
```
![Hình minh họa về bar chart chồng lên nhau](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/5.png) 
* Horizontal bar plot - Đảo trục trong bar plot
```rust
df.plot.barh();
```
![Hình minh họa về bar chart chồng lên nhau](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/6.png) 
#### Line Plots
Biểu đồ Line thường được sử dụng để so sánh giá trị của hai hoặc nhiều biến. Các điểm được biểu diễn dưới dạng đường. Để biểu diễn biểu đồ đường có hai cách: `df.plot()` - vì mặc định, nó sẽ gán giá trị `line` cho tham số `kind`; cách 2 dùng lệnh `df.plot.line()`
```shell
df.plot.line(y = '<tên trường muốn biểu diễn>');
#Ví dụ
df.plot.line(y = 'test');
```
![Hình minh họa về line chart](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/7.png) \
*Lưu ý*: 
* Trường hợp biểu diễn nhiều trường, mình sẽ truyền vào một danh sách chứa tên các trường muốn biểu diễn:
```python
df.plot.line(y = ['tên trường 1', 'tên trường 2', ... 'tên trường n'])
#Ví dụ
df.plot.line(y = ['test', 'test1', 'test2']);
```
![Hình minh họa về line chart](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/8.png) 
* Một số tham số thiết lập thêm:
```sql
df.plot(y='test',figsize=(12,3),lw=2);
#figsize: thiết lập kích cỡ figure
#lw: thiết lập độ dày của đường
```
#### Area plot
Biểu đồ **area** biểu diễn diện tích của đường tức là tô màu không gian bên dưới biểu đồ đường đã biểu diễn. 
```shell
df.plot.area(alpha = 0.4)
#tham số anpha là transparency value của area plots. Nó có giá trị nằm trong khoảng 0 đến 1.
```
![Hình minh họa về area plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/9.png) \
Để tạo ra một *blended area plot*, mình thay đổi giá trị mặc định của tham số `stacked = False`:
```rust
df.plot.area(stacked = False)
```
![Hình minh họa về area plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/10.png) 
#### Scatter Plots
Scatter plots là biểu đồ biểu diễn một cách trực quan để so sánh hai biến và nhận biết xu hướng của chúng.
```javascript
df.plot.scatter(x = '<tên trường 1>', y = '<tên trường 2>');
```
![Hình minh họa về area plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/11.png) \
Giả sử, mình muốn biểu diễn một cột khác tức là biểu diễn 3 cột sử dụng Scatter plot. Và câu trả lời là 👉️ Mình có thể biểu diễn giá trị cột thứ 3 thông qua sự thể hiện của không gian màu. Giống như việc quan sát không gian màu HSV, HSL trong xử lý ảnh.
```sql
df.plot.scatter(x = '<tên trường 1>', y = '<tên trường 2>', c = '<tên trường 3>', cmap = 'coolwarm');
```
![Hình minh họa về area plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/12.png) \
Chúng ta có thể quan sát hình ảnh minh họa trên và thấy rõ, giá trị của cột `C` được thể hiện dựa vào độ sáng của cột màu.
👉️ Ngoài ra, mình có thể sử dụng sized markers. Đây là phương pháp biểu diễn trực quan một cột khác thông qua kích thước của các điểm biểu diễn. Thiết lập phương pháp này qua tham số `s`:
```javascript
df.plot.scatter(x = 'test', y = 'test2', s = df['test3']*50);
```
![Hình minh họa về area plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/13.png) \
*Lưu ý*: trong trường hợp cột được trực quan hóa thông qua sized markers thì có thể xuất hiện lỗi 
> C:\ProgramData\Anaconda3\lib\site-packages\matplotlib\collections.py:922: RuntimeWarning: invalid value encountered in sqrt
  scale = np.sqrt(self._sizes) * dpi / 72.0 * self._factor

 Xuất hiện lỗi trên là do trong cột ấy có những giá trị âm, để khắc phục lỗi này, mình có thể xử lý như sau:
 1. Tìm giá trị minimum trong cột đó
 `df['<tên cột>'].min()`
 2. Viết hàm để xử lý normalize các giá trị thành bộ giá trị dương.
 ```
 #Ví dụ: giá trị minimum của cột test là -5, hàm được thiết kế như sau
 def add(value):
    return value + 5
 ``` 
 3. Biểu diễn thông qua scatter
 ```
 df.plot.scatter(x = 'test1', y = 'test2', s = df['test3'].apply(add)*50, alpha = 0.2)
 ```
#### BoxPlots
> Biểu đồ boxplot sẽ cho ta biết đặc trưng về phân phối của 1 biến dựa trên các giá trị trung bình, min, max, các khoảng phân vị 25%, 50%, 75%. Đây là biểu đồ được sử dụng nhiều trong chứng khoán và thống kê học để so sánh các biến với nhau.

Nguồn: https://phamdinhkhanh.github.io/2019/09/16/VisualizationPython.html#12-bi%E1%BB%83u-%C4%91%E1%BB%93-barchart

```javascript
df.boxplot();
```
![Hình minh họa về box plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/14.png) 
#### Kernel Density Estimation (KDE) Plot
Biểu đồ này được sử dụng nhằm mục đích tìm được hình dạng tương đối hàm mật độ xác suất của một bộ dữ liệu. Chi tiết một số lý thuyết của KDE, mọi người có thể đọc qua bài viết của anh Phạm Đình Khánh [Link bài viết](https://phamdinhkhanh.github.io/2019/09/16/VisualizationPython.html#14-bi%E1%BB%83u-%C4%91%E1%BB%93-boxplot) (phần 2.1).
```python
df.plot.kde()
# hoặc sử dụng lệnh
df.plot.density()
```
Câu lệnh sẽ thực hiện trên tất cả các cột của dataframe, trường hợp muốn trực quan KDE trên một cột, mình có thể sử dụng `df['<tên cột>'].plot.kde()`
![Hình minh họa về kde plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/15.png) 
#### Hexagonal Bin Plot
Dạng biểu đồ thường sử dụng cho dạng bivariate data. Nó có thể dùng để so sánh sự tương quan giữa hai cột.
```python
df.plot.hexbin(x = '<cột 1>', y = '<cột 2>', cmap = 'Oranges')
```
![Hình minh họa về hexbin plot](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/16.png) 

## Lời cảm ơn
Hy vọng một vài chia sẻ trên sẽ hỗ trợ được phần nào cho mọi người trong việc cảm nhận sức mạnh khổng lồ của Pandas.

##  Tài liệu tham khảo
1. https://phamdinhkhanh.github.io/2019/09/16/VisualizationPython.html#14-bi%E1%BB%83u-%C4%91%E1%BB%93-boxplot
2. https://pandas.pydata.org/pandas-docs/stable/index.html
3. https://www.udemy.com/course/python-for-time-series-data-analysis/