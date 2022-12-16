Nhân dịp những ngày cuối năm Kỷ Hợi mình xin cảm ơn mọi người đã đọc bài viblo của mình trong một năm vừa qua. Và mình xin kính chúc tất cả mọi người một năm mới " Vạn Sự Như Ý, An Khang Thịnh Vượng". 

Tiếp tục với bài viết thôi nào =)). Ở bài viết lần này mình sẽ chia sẻ về việc Visualization trong data như thế nào. Tuy nhiên ở bài viết này mình sẽ sử dụng *plotly* thay vì *matplotlib* hay *seaborn*. Thứ nhất bởi vì mình cảm thấy nó khá là thú vị :v những cái gì mà càng trực quan thì càng làm cho chúng ta thích thú hơn mà =)). Tiếp theo là lợi ích của nó: 
- Nhanh 
- Dễ sử dụng
- sự kết hợp tốt với pandas 

Okay bây giờ chúng ta cùng bắt đầu nhé!
Ở đây mình sử dụng tập dataset Titanic [ở đây](https://www.kaggle.com/c/titanic/data) nha mn. Mình sẽ so sánh giữa *seaborn* với *plotly* nha. Còn ở phần practise mình sẽ thực hiện code để so sánh Plotly với Matplotlib and Seaborn.

# Seaborn and Plotly 
## Seaborn 
Seaborn là thư viện thú vị và có nhiều mẫu biểu đồ hơn, cú pháp câu lệnh cũng dễ sử dụng. Seaborn được rất nhiều người sử dụng và yêu thích. 
![](https://images.viblo.asia/b07bcd95-d847-4b5f-b4e6-46c5cc987018.png)

Hình 1: Ví dụ histogram: distribution for Fare (Titanic Dataset) in Seaborn

Thư viện seaborn cũng cung cấp nhiều biểu đồ đa dạng: 

![](https://images.viblo.asia/70dbb930-e6da-4173-a9c0-710a6eb17730.png)

Hình 2: Những biểu đồ bạn có thể sử dụng với thư viện seaborn

Tuy nhiên, vẫn có một vài hạn chế đó là tất cả đồ thị, biểu đồ của seaborn đều là static (tĩnh). Nó chỉ chỉ ra cho chúng ta thấy những gì được show ra trên màn hình và không thể xem chi tiết từng ô trong biểu đồ hoặc giá trị tại 1 khoảng thời gian nào đó. Hơn nữa cũng không thể di chuột hay click để hiển thị thông tin chi tiết.

Plotly có thể đáp ứng được hạn chế của seaborn. Chúng ta cùng tìm hiểu xem plotly hữu ích như thế nào nhé!

## Plotly
Plotly có khả năng thực hiện những functions "Interactive Visualization". "Interactive Visualization" có thể giúp tăng thêm cảm giác thu hút =)) cũng như việc bạn có thể trình bày dữ liệu một cách trực quan hơn nữa đối với người nghe. 
Hình 3 dưới đây cũng là distribution cho Fare trong tập dataset Titanic cùng xem và so sánh nhé 
![](https://images.viblo.asia/d6fd77e1-d003-4aea-bb72-f02a0a24ad37.gif)

Hình 3: Distribution ò Fares ( nguồn: [ở đây](https://towardsdatascience.com/python-for-data-science-a-guide-to-data-visualization-with-plotly-969a59997d0c))

Thật là vi diệu phải không nào =)). Chúng ta có thể lựa chọn các options để show ra biểu đồ hoặc phóng to từng giá trị tùy ý. 
# Plotly Library
Như đã nói ở trên Plotly là thư viện Python hỗ trợ người dùng trực quan hóa dữ liệu tương tác. Nó cho phép chúng ta vẽ đồ thị tương tác không những trực quan hơn mà còn thuyết phục người nghe hơn so với matplotlib hay là seaborn. 

## Những kiểu đồ thị mà chúng ta có thể vẽ với Plotly là gì? 

- Tất cả những gì chúng ta có thể thực hiện với Matplotlib và Seaborn
- Biểu đồ thống kê 
- Biểu đồ khoa học
- Biểu đồ Tài chính 
- Bản đồ địa chất
![](https://images.viblo.asia/b0a17086-6efa-41b1-bc08-cd5ed23af0f1.gif)
Hình 4: ví dụ về các đồ thị, biểu đồ có thể sử dụng trong Plotly 

## Install and Import Plotly
Sử dụng pip để cài đặt Plotly 
```
pip install plotly
pip install cufflinks
```

Ở đây mình sẽ sử dụng Jupyter Notebook nha cả nhà: 
Chúng ta sẽ phải import thư viện này để sử dụng
```
from plotly.offline import init_notebook_mode,iplot
import plotly.graph_objects as go
import cufflinks as cf
init_notebook_mode(connected=True)
import pandas as pd
```
Do cách hoạt động của Plotly,  Plotly lưu đồ thị của bạn vào một file html và mở ở một cửa sổ mới. Nó sẽ xảy ra lỗi khi bạn run code trong console/terminal. Do vậy ở đây chúng ta sẽ sử dụng plotly.offline, iplot và init_notebook để giúp chúng ta vẽ biểu đồ ngay trên Jupyter Notebook. 

## Practise 
Đầu tiên đọc data đã nào: 
```
df = pd.read_csv("dataset_titanic/train.csv")
df.head()
```

![](https://images.viblo.asia/60eef552-7507-4e2a-961f-6d25c175bd28.png)

Hình 5: Dữ liệu tập train titanic dataset


### Pie chart

Mình sẽ vẽ Survived column với Plotly và matplotlib nhé 

Plotly: 

```
#labels
lab = df["Survived"].value_counts().keys().tolist()
#values
val = df["Survived"].value_counts().values.tolist()
trace = go.Pie(labels=lab, 
                values=val, 
                marker=dict(colors=['red']), 
                # Seting values to 
                hoverinfo="value"
              )
data = [trace]
```
layout: bạn có thể plot title, x và y axis titles hoặc show legends
```
#set title 
layout = go.Layout(title="Survived Distribution")
```
figure: khi bạn muốn show trên đồ thị, nó lấy thông số data và layout đã được định nghĩa
```
fig = go.Figure(data = data,layout = layout)
```
Tiếp theo là dùng iplot để show ra thôi: 
```
iplot(fig)
```
![](https://images.viblo.asia/33416751-e9f4-42df-9a42-26bcf4c1ff3d.gif)


Hình 6: Pie chart vẽ bằng plotly 

Với matplotlib: 

```
from matplotlib import pyplot as plt
title = "pie chart"
plt.pie(val, labels=lab)
plt.axis('equal')
plt.title(title)
plt.tight_layout()
plt.show()
```
![](https://images.viblo.asia/a6677ba7-df6e-4c03-89b1-37be4e006565.png)


Hình 7: plot pie chart by matplotlib 
### histogram 

plotly: 
```
# defining data
trace = go.Histogram(x=df['Age'],nbinsx=40,histnorm='percent')
data = [trace]
# defining layout
layout = go.Layout(title="Age Distribution")
# defining figure and plotting
fig = go.Figure(data = data,layout = layout)
iplot(fig)
```
![](https://images.viblo.asia/747ef86f-7fb9-4ebe-bd63-cad71dff2204.gif)
 Hình 8: plot histogram by Plotly
 
 matplotlib: 
 
 ```
 plt.hist(df["Age"], bins=40)
plt.title("distribute of age")
```
![](https://images.viblo.asia/ca31796b-1078-4455-bb10-265fb8c54495.png)


Hình 9: plot histogram by matplotlib 

### Scatter
Plotly: 
```
#defining data
trace = go.Scatter(x = df['Age'],y=df['Fare'],text = df['Survived'],mode='markers')
data=[trace]
#defining layout
layout = go.Layout(title='Fare Vs Age Scatter Plot',xaxis=dict(title='Age'),yaxis=dict(title='Fare'),hovermode='closest')
#defining figure and plotting
figure = go.Figure(data=data,layout=layout)
iplot(figure)
```
 ![](https://images.viblo.asia/022563d8-c872-4a69-9d68-1d4bf4d2f160.gif)

Hình 10: Scatter by Plotly 

Ở đây đã được add thêm các tính năng để chúng ta có thể thao tác trực tiếp với hình vẽ như khi di chuột vài một điểm sẽ hiển thị giá trị của "Fare" và "Age" để mọi người có thể thấy chi tiết hơn. Dựa vào biểu đồ này chúng ta cũng thấy xu hướng giá tăng dưới 300 và những người già thường có xu hướng mua vé giá rẻ. Mọi người có thể vẽ thêm các biểu đồ để rõ hơn ví dụ như average age và giá cho Pclass. 

Seaborn: 
```
ax = sns.scatterplot(x=df["Age"], y=df['Fare'], data=df)
ax.set_title("scatter plot by seaborn")
```
![](https://images.viblo.asia/d3beadfc-ba82-4a13-895a-c8e1cd741e25.png)

Hình 11: Scatter by Seaborn

### Bar Chart
Plotly: 
Mỗi Pclass chúng ta sẽ show ra average age và fare bằng Bar Chart. 
```
y=[]
fare = []
for i in list(df['Pclass'].unique()):
    result = df[df['Pclass']==i]['Age'].mean()
    fares = df[df['Pclass']==i]['Fare'].mean()
    y.append(result)
    fare.append(fares)
```
```
#defining data
trace = go.Bar(x = list(df['Pclass'].unique()),y=y,marker=dict(color=fare,colorscale='Viridis',showscale=True),text = fare)
data=[trace]
#defining layout
layout = go.Layout(title='Age/Fare vs Pclass Bar Chart',xaxis=dict(title='Pclass'),yaxis=dict(title='Age'),hovermode='closest')
#defining figure and plotting
figure = go.Figure(data=data,layout=layout)
iplot(figure)
```
![](https://images.viblo.asia/fea4739c-b72a-45c9-a9b5-f3dd87194ec8.gif)

Hình 12: Bar Chart by Plotly

Thêm 2 parameters: color và colorscale để lựa chọn màu sắc hiển thị tùy ý 
Seaborn:
```
plt.figure(figsize = (6,4))
ax = sns.barplot(x = list(df['Pclass'].unique()),y=y)
plt.xlabel("Pclass")
plt.ylabel("Age")
plt.title('Age/Fare vs Pclass Bar Chart')
plt.show()
```
![](https://images.viblo.asia/c6b13894-82e6-4fd0-a153-5e20dd917798.png)

Hình 13: Bar Chart by Seaborn

 ### Distribution Plots
 Lưu ý với đồ thị distribution các giá trị của data phải khác "NAN" nếu không thì phải khắc phục bằng cách fillna() nhé!!!!
 Plotly: 
 
 ```
 #defining data
a = df[df['Pclass']==1]['Fare']
b = df[df['Pclass']==2]['Fare']![](https://images.viblo.asia/e1c99ce8-cd1e-4e0a-a6f4-793b478daf68.gif)

c = df[df['Pclass']==3]['Fare']
hist_data=[a,b,c]
group_labels=['1','2','3']
#defining fig and plotting
fig = ff.create_distplot(hist_data,group_labels,bin_size=
[1,1,1],show_curve=False)
fig.update_layout(title_text='Distribution for Fares')
iplot(fig)
 ```
 ![](https://images.viblo.asia/e1c99ce8-cd1e-4e0a-a6f4-793b478daf68.gif)

 Hình 14: Distribution by Plotly
 
 Matplotlib: 
```

title = 'Distribution for Fares'
plt.figure(figsize = (6, 4))
plt.hist([a, b, c], label = group_labels)
plt.title(title)
plt.legend(loc='upper right')
plt.show()
```
![](https://images.viblo.asia/6e1d454b-d004-418b-8d09-35f24d1addbd.png)

Hình 15: Distribution by Matplotlib
 # Kết Luận 
 Visualize data bằng Plotly trông "cool" hơn đúng không ạ? Thực ra mọi người muốn visualize data bằng library hay tool nào cũng được hết. Quan trọng nhất vẫn là bạn sẽ thu được gì sau khi trực quan hóa dữ liệu thôi đúng không nào. Tuy nhiên mình cảm thấy Plotly khá là hữu ích bởi những tính năng của nó cũng như việc sẽ thu hút người nghe hơn. Nhìn vào những hình ảnh động cảm giác vẫn hấp dẫn hơn là ảnh tĩnh phải không nào =))). Cảm ơn mn đã dành thời gian để đọc bài của mình. Mong được sự góp ý của mn dành cho bài viết của mình ạ. 
 
 
# Reference 
https://towardsdatascience.com/python-for-data-science-a-guide-to-data-visualization-with-plotly-969a59997d0c


https://www.kaggle.com/c/titanic/data