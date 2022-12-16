# Mở đầu
Chào mọi người, hôm nay mình sẽ hướng dẫn cho các bạn chỉ cần sử dụng một dòng code có thể show ra được hết các đặc điểm của tập dữ liệu dưới dạng DataFrame mà bạn có. Thật là khó tin đúng không nào? Mình cũng thấy vậy cho đến khi dùng để trực quan hóa và phân tích dữ liệu titanic. Thôi, không dài dòng nữa cùng thử thôi nào? 

# Pandas

Pandas đã quá quen thuộc với chúng ta khi thực hiện trực quan hóa dữ liệu dưới dạng bảng rồi nhỉ? Pandas là một trong những package cực kì hữu ích để xử lý những dữ liệu dạng DataFrame cực kì nhanh chóng. Nếu như bạn chưa dùng package này bao giờ thì hãy thử cài đặt và làm quen với nó để biết được package này kì diệu như thế nào nhé, bạn sẽ không bao giờ thất vọng đâu =))).

Cài đặt pandas cho những bạn nào chưa từng sử dụng:

```
pip install pandas
```

Khi cài đặt xong thì học và sử dụng thôi. Mọi người có thể tham khảo và học Pandas qua [tutorial này](https://www.tutorialspoint.com/python_pandas/index.htm) 

Mình sẽ sử dụng Pandas để đọc và xem qua dữ liệu như sau đây: 

```
import pandas as pd
train = pd.read_csv('train.csv')
train.head()
```

![](https://images.viblo.asia/62b33987-0d58-4ba2-9b66-897ec125b900.png)
Hình 1: Đọc dữ liệu với Pandas 

Như bình thường, hoặc như [bài viết này](https://viblo.asia/p/gioi-thieu-visualization-data-voi-plotly-voi-tap-dataset-titanic-gAm5y8bqldb) của mình viết về cách visualize dữ liệu mình đều sử dụng pandas hoặc matplotlib, plotly tuy nhiên những việc đó thường cực kì tốn thời gian và chúng ta còn cần phải biết được rằng các trường dữ liệu có kiểu gì, hay phải lựa chọn các biểu đồ sao cho phù hợp.  Ở bài viết này mình sẽ giới thiệu cho mọi người một cách chỉ cần sử dụng một dòng code có thể cho chúng ta biết cực kì nhiều về dữ liệu mà chúng ta đang có. Ví dụ như: thông tin dữ liệu, số lượng giá trị missing của các trường, kiểu dữ liệu, ... . Cùng xem xem đó là cái gì mà vi diệu vậy nha. 

# Pandas Profiling 

![](https://images.viblo.asia/0115798f-1855-401b-981a-01fba3f128d8.png)
Hình 2: Overview về tập dữ liệu titanic 1

![](https://images.viblo.asia/d85b980a-9e68-43ff-9d05-50eab933a959.png)

Hình 2.1: Overview về tập dữ liệu titanic 2

Ở *Hình 2 và Hình 2.1* là phần mở đầu cho chúng ta biết về tổng quan dữ liệu của mình đang có những gì, gồm những trường nào, bao nhiêu trường có giá trị missing, ... 

Bạn có tin không nếu mình nói chỉ cần khoảng 2 dòng code python mình có thể tạo ra các số liệu thống kê về tập dữ liệu đang có không? Thực tế chỉ cần 1 dòng nếu không tính đến import và đọc dữ liệu đầu vào :D =)). 

Đầu tiên bạn phải cài đặt đã dựa theo repo github [này](https://github.com/pandas-profiling/pandas-profiling). 

```
!pip install https://github.com/pandas-profiling/pandas-profiling/archive/master.zip
```

Sau đó import vào để sử dụng :

```
import pandas as pd
import pandas_profiling
```

Tiếp theo thì cùng kiểm tra xem có phải chỉ cần một dòng code và có thể show ra được không nhé. 

```
profile = pandas_profiling.ProfileReport(train, title='Pandas Profiling Report', explorative=True)
profile
```


Kết quả chúng ta thu được sẽ như hình dưới đây: 
![](https://images.viblo.asia/a314ddd0-6669-4aee-9cf0-799da6ac9f3a.png)
Hình 3: kết quả 

Tuy nhiên kết quả thu được  dưới dạng interactive HTML nên tổng quát hơn nhiều và mình có thể kiểm tra và xem trực quan hơn thông qua việc tương tác trực tiếp với nó. Vì vậy, mình đã quay video lại cho mọi người xem được rõ hơn.

![](https://images.viblo.asia/794456b1-77ab-4056-ba6c-3de7ec5bae74.gif)
Hình 4: Kết quả đầy đủ

Mọi người có thể bắt tay vào thử luôn để xem như thế nào nhé :D :D 


Trong ảnh gif ở phía trên chúng ta có thể biết tất cả các thông tin về dữ liệu mà mình có dựa vào ảnh gif đó:
* Type inference: kiểu dữ liệu của các trường, cột trong dataframe 
* Essentials: type, giá trị unique, giá trị missing
* Quantile statistics: đưa ra các giá trị như: mean, min, Q1, median, Q3, max, range
* Descriptive statistic: mean, mode, std, sum, median absolute deviation, coefficient of variation, kurtosis, skewness
* Most frequent values: giá trị xuất hiện với tần suất lớn
* Histogram: các biểu đồ thống kê của các trường dữ liệu
* Correlations : tương quan giữa các biến 
* Missing values: ma trận, số lượng, heatmap và dendrogram của các giá trị missing
* Interactions: Biểu đồ kết hợp giữa các biến 

# Kết Luận
Thực sự mình thấy package này rất hữu ích, nhất là đối với những người mới và chưa biết phải phân tích dữ liệu như thế nào. 
Cảm ơn mọi người đã đọc bài viết của mình nhé, nếu cảm thấy hữu ích thì ngại gì không upvoted nhỉ :D. Và rất  mong nhận được sự góp ý của mọi người ạ!
# Reference 
https://github.com/pandas-profiling/pandas-profiling

https://www.tutorialspoint.com/python_pandas/index.htm