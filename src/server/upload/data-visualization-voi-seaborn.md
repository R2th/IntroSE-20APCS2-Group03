Trong bài viết này mình giới thiệu với mọi người các biểu đồ mình hay dùng để visualize dữ liệu bằng seaborn.

Vì là intro nên để hiểu rõ hơn ý nghĩa của từng biểu đồ, mọi người có thể đọc thêm tại series data visualization của anh Ngọc tại [đây](https://viblo.asia/p/data-visualization-trong-machine-learning-phan-1-bWrZnp8w5xw) và của anh Khánh tại [đây](https://phamdinhkhanh.github.io/2019/09/16/VisualizationPython.html)

# I. Seaborn vs Matplotlib

Seaborn là mở rộng của matplotlib, có nghĩa là seaborn kế thừa từ matplotlib và cũng chính vì vậy, seaborn khong thể thay thế hoàn toàn được matplotlib.

Mình sẽ so sánh nhanh giữa 2 tools visualize này nhé!

|          |Matplotlib|Seaborn|
|:--------:|:---------|:------|
| **Chức năng** | Thường được sử dụng biểu diễn các biểu đồ đơn giản như: bars, pies, lines, scatter,..| Về cơ bản, seaborn cung cấp nhiều dạng biểu đồ hơn, với cú pháp đơn giản và hình vẽ "default" thể hiện ra cũng màu mè và thú vị hơn.|
|**Xử lý đa hình**| Cần phải tắt bỏ hình hiện tại để hiện hình tiếp theo|Tự động tạo nhiều hinh (Có thể gây tràn bộ nhớ)|
|**Tính linh hoạt**|Có khả năng tùy biến cao, mạnh mẽ|Cung cấp nhiều giao diện thường được sử dụng|
|**Dataframes và Arrays**|Hoạt động với dataframes và arrays, được kế thừa từ matlab|Hoạt động với toàn bộ dữ liệu và trực quan hơn matplotlib|

Đại khái là thế :) . Nào bắt đầu thôi!!
# II. Các biểu đồ thường dùng trong seaborn
Trong bài viết này mình sẽ sử dụng data tips, iris vaf planets nhé!
```
# Import library
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
```

```
# Load data
tips = sns.load_dataset('tips')
iris = sns.load_dataset('iris')
planets = sns.load_dataset('planets')
```

## 2.1. Pair plots
Khi muốn nhìn tổng quan dữ liệu và mối tương quan giữa các chiều dữ liệu theo từng cặp với nhau, thì pair plots là lựa chọn vô cùng hoàn hảo (Các features dạng số, hiển nhiên :v):
```
sns.pairplot(iris, hue='species', height=1.5)
```
![](https://images.viblo.asia/9af041c5-d3ed-4e3d-90f1-f161d6585866.png)

## 2.2.  Countplot

Countplot sẽ trả về số lượng của từng category dưới dạng cột
```
sns.countplot(x = tips['day'])
```
![](https://images.viblo.asia/d24fcab2-e518-48e6-a2bf-5887e125c9ab.png)

Và với một chút điều chỉnh, chúng ta có thể sắp xếp các cột theo thứ tự tăng hoặc giảm (Có trường hợp xấp xỉ mà nhìn ko ra chả hạn :D):
```
sns.countplot(x = tips['day'],
             order = tips['day'].value_counts().index)
```
![](https://images.viblo.asia/c5c4064c-f2d6-40c3-84f9-515b9b36ea86.png)

Hoặc cũng có thể dùng countplot để xem tương quan giữa 2 features:
Ví dụ : Xem các ngày trong tuần nam, nữ ai trả nhiều hơn
```
sns.countplot(x= 'day', hue= 'sex', data= tips)
```
![](https://images.viblo.asia/00692a36-db91-432b-9187-a6a03cc50d92.png)

## 2.3. Histplot và Distplot (Trong version cũ của seaborn)

Displot giúp ta xem được sự phân phối (Distribution) của dữ liệu
```
sns.distplot(tips['total_bill'], bins= 7) # bins: chia ra thành bins cột
```
![](https://images.viblo.asia/f0458df9-9e14-44da-85d9-01b7ac399316.png)

Sử dụng `sns.histplot` thì ko còn thấy pdf nữa :v 
```
sns.histplot(tips['total_bill'], bins= 7)
```


## 2.4. Joint distributions

Tương tự như pairplot, chúng ta có thể sử dụng `sns.jointplot` để xem phân phối dữ liệu
```
sns.jointplot(x= 'tip', y= 'total_bill', kind= 'hex', data= tips)
```
![](https://images.viblo.asia/1e01c452-1efd-4398-8560-c34da5f48dad.png)

Hoặc:
```
sns.jointplot(x= 'tip', y= 'total_bill', kind= 'kde', data= tips)
```
![](https://images.viblo.asia/f9832510-b709-43bb-89d9-9c13b74e3425.png)

Hoặc:
```
sns.jointplot(x= 'tip', y= 'total_bill', kind= 'reg', data= tips)
```
![](https://images.viblo.asia/f3b7621b-3319-4ea6-a06c-c775e55072cd.png)

Có rất nhiều lựa chọn có thể thử, tùy vào việc bạn nhìn vào biểu đồ nào thấy dễ hình dung về phân phối hơn!

## 2.5. Bar plots

Time series data có thể biểu diễn thông qua `sns.factorplot` (version hiện tại khuyên dùng `sns.catplot`) . Xem thử việc sử dụng chúng với data planets nào

```
# sns.factorplot("year", data=planets, aspect=2, kind="count")
sns.catplot(x = "year", data=planets, aspect=2, kind="count")
```
![](https://images.viblo.asia/3daa04ef-2466-4576-922b-1aade335f190.png)

Thử catplot với `hue = 'method'` xem sao nhé!!

## 2.6. Heatmap

Cái này chắc quá quen thuộc với mọi người khi muốn plot Correlation Matrix rồi nhỉ?

```
sns.heatmap(tips.corr())
```
![](https://images.viblo.asia/105f2381-48ee-4b32-8b39-815b26cd2984.png)

## 2.7. Box plot, Swarm plot và Violin plot
![](https://i.imgur.com/5Lo17qp.png)

Ý tưởng chung là giúp ta dễ hình dung hơn phân phối dữ liệu và phát hiện outlier :thinking:

### 2.7.1. Box plot 
```
sns.boxplot(x= 'total_bill', y= 'sex', data= tips)
```
![](https://images.viblo.asia/b6a08d09-e6eb-40c0-9506-486c09000a05.png)

Và với `hue = 'smoker'` để xem ai hút thuốc :mask:

```
sns.boxplot(x= 'total_bill', y= 'sex', hue= 'smoker', data= tips)
```
![](https://images.viblo.asia/be5f7dec-37ff-447a-a29f-cd176a4f09a9.png)

### 2.7.2. Swarm plot
```
sns.swarmplot(x= 'day', y= 'tip', hue= 'smoker', data= tips)
```
![](https://images.viblo.asia/af843e7f-3358-4d2c-9c2c-5af0ce6fc23d.png)

### 2.7.3. Violin plot (:violin:)
```
sns.violinplot(x= 'day', y= 'tip', hue= 'smoker', data= tips)
```
![](https://images.viblo.asia/1bb7b098-47d5-4566-89cb-019e60f1ab3f.png)

## 2.8. Pie chart

(Đổi gió dùng chút matplotlib.pyplot :)))

```
# Pie chart
labels = []
sizes = []
explode = []

labels = tips['size'].value_counts().index.sort_values()
for index, size in enumerate(labels):
    sizes.append(size)
    if size==3:
        explode.append(0.2)
    else:
        explode.append(0)
 
_, ax1 = plt.subplots()
ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
        shadow=True, startangle=90)
# Equal aspect ratio ensures that pie is drawn as a circle
ax1.axis('equal')  
plt.tight_layout()
plt.show()
```
![](https://images.viblo.asia/68f5f1a2-2a3d-4eee-be0d-1bd57ba35027.png)

# III. Kết luận
Vậy là mình đã giới thiệu đơn giản với mọi người các biểu đồ mình thường dùng khi sử dụng seaborn, để hiểu rõ hơn cách dùng mọi người có thể xem tại [source code](https://seaborn.pydata.org/index.html) của seaborn. Cảm ơn đã dành thời gian đọc bài viết của mình. See ya!!! (KxSS)

# Reference
https://jakevdp.github.io/PythonDataScienceHandbook/04.14-visualization-with-seaborn.html