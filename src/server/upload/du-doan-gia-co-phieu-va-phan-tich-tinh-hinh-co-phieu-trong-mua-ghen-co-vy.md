Xin chào cả nhà, mấy dạo này lướt internet hay FB đều xuất hiện từ covid-19 và thật may mắn là VN mình vẫn đang kiểm soát tốt. Tuy nhiên Cô Vy đã và đang gây ảnh hưởng rất nhiều đến không chỉ riêng chúng ta mà còn cả thế giới. Vì vậy chúng ta hãy cùng thực hiện đúng chính sách của chính phủ nha #stayathome hạn chế ra ngoài đường nhiều nhất có thể để cùng nhau đẩy lùi dịch bệnh nè :D :D :D. 

Đi vào vấn đề chính, hôm nay mình tình cờ đọc được[ bài viết này](https://towardsdatascience.com/in-12-minutes-stocks-analysis-with-pandas-and-scikit-learn-a8d8a7b50ee7) về phân tích cổ phiếu, chứng khoán dùng Pandas và Scikit-Learn, lâu không thực hành với phân tích data nên sợ quên ý mà. Chợt mình nghĩ thử xem xem mùa dịch này cổ phiếu hay chứng khoán có bị ảnh hưởng nhiều không và nó ảnh hưởng như thế nào. Ví dụ như giá vàng trong nước mình hiện tại vẫn tăng đều trong mùa dịch hay là xăng hiện tại chỉ 12k 1 lít thì không biết thị trường chứng khoán biến động như thế nào. 
# Download data
Ở đây mình sử dụng cả data trong nước và ngoài nước để thử xem xét xem có sự khác biệt không ví dụ như mình có nói ở trên. Khoảng thời gian mình lấy là từ ngày 01-12-2019 đến 13-04-2020 nhé.  Mình lựa chọn 3 mã cổ phiếu VIC (vincommerce), HVN (VNairlines), NFLX (Netflix) thử xem xem các nhu cầu trọng yếu trong mùa dịch như là: ăn uống, đi lại, giải trí mùa dịch này trên sàn giao dịch như thế nào nha mọi người :D. Mình đoán là HVN sẽ bị giảm không ít do Vn mình đang cách ly toàn xã hội cơ mà :D. 
Với mã NFLX mình sẽ sử dụng dataloader của pandas để down dữ liệu về. Vaf chúng ta sẽ đọc dữ liệu mã VIC, HVN với data này mình sử dụng [vnquant ](https://github.com/phamdinhkhanh/vnquant) của a Phạm ĐÌnh Khánh: 
Đầu tiên load dữ liệu của Netflix nào: 
```
import pandas as pd
import datetime
import pandas_datareader.data as web
from pandas import Series, DataFrame


start = datetime.datetime(2019, 12, 1)
end = datetime.datetime(2020, 4, 13)

data_netflix = web.DataReader("NFLX", 'yahoo', start, end)
data_netflix.tail()
```
![](https://images.viblo.asia/03d56df4-20f4-4775-bc2b-9b054d63e8ed.PNG)

Hình 1: giá cổ phiếu netflix
Đầu tiên phải clone cái package này về sau đó tiến hành cài đặt nó: 
```
!git clone https://github.com/phamdinhkhanh/vnquant
os.chdir('vnquant')
!python setup.py install
```
Load dữ liệu mã  VIC: 
```
from vnquant.DataLoader import DataLoader

loader = DataLoader(symbols="VIC",
           start="2020-01-01",
           end="2020-04-13",
           minimal=False,
           data_source="vnd")

data_vic = loader.download()
data_vic.tail()
```

![](https://images.viblo.asia/56aac173-0bf1-4023-80af-99d2e1736403.PNG)


Hình 2: giá cổ phiếu mã VIC

Tiếp tục load dữ liệu của HVN nào mọi người: 
```
loader = DataLoader(symbols="HVN",
           start="2019-12-1",
           end="2020-04-13",
           minimal=False,
           data_source="vnd")

data_hvn = loader.download()
data_hvn.tail()
```

![](https://images.viblo.asia/bdcbc55b-7244-429a-9c79-d71ff79be53c.PNG)
Hình 3: giá cổ phiếu VNairlines

p.s: Nhìn 3 hình trên các bạn chắc có tâm trạng như mình đều hỏi sao chênh nhau kinh thế =)) 1 bên tính bằng VND 1 bên tính bằng Đô xanh mà cũng thấy sự khác biệt ghê gớm =))). 

# Visualize và Phân tích dữ liệu
Đầu tiên chúng ta cần phải biết các khái niệm như, Close/ Adj Close hay là Open mọi người có thể tham khảo [ở đây](https://www.ssi.com.vn/tin-tuc/tin-tuc-chung/kien-thuc-co-ban-ve-thi-truong-chung-khoan). CHúng ta có thể hiểu đơn giản là: **Giá đóng cửa hôm nay chính là Giá tham chiếu ngày mai (Giá đóng cửa chính là Giá giao dịch thành công cuối cùng của ngày). Giá đóng cửa ngày mai lại là Giá tham chiếu ngày kia... Cứ như thế suốt tạo ra 1 sự liền mạch về Giá thị trường.**

Vẽ biểu đồ giá dựa trên giá đóng cửa " close/ adj close". 2 mã "HVN" và "VIC" đều tính theo giá là VND tất nhiên "NFLX" là tính theo mỹ kim nha cả nhà.  
## Opening price
Vẽ đồ thị Opening price của Netflix: 
```
data_netflix['Open'].plot(label='netflix', figsize=(15,10), title ='open')
```
![](https://images.viblo.asia/f8c17940-6ba5-4a88-835f-c15f38799946.PNG)

Hình 5: Opening price của Netflix

Vẽ đồ thị Opening price của HVN và VIC:
```
import matplotlib.pyplot as plt
fig,ax = plt.subplots(figsize=(15,10))
ax.plot(data_hvn['open'], label="VN-airlines")
ax.plot(data_vic['open'], label='Vincommerce')
ax.set_xlabel('Date')
ax.set_title('open')
plt.legend()
```
![](https://images.viblo.asia/5fa697c8-b38f-4336-b5f4-19062294e333.PNG)

Hình 6: Opening price của HVN và VIC
## Closed price
Vẽ đồ thị Closed price của Netflix: 
```
data_netflix['Adj Close'].plot(label='netflix', figsize=(15,10), title ='close')
```

![](https://images.viblo.asia/e09b19b6-e1f7-41ef-af4c-87c6717c4d58.PNG)
Hình 6: Closed price của Netflix

Vẽ đồ thị Closed price của HVN và VIC 
```
import matplotlib.pyplot as plt
fig,ax = plt.subplots(figsize=(15,10))
ax.plot(data_hvn['close'], label="VN-airlines")
ax.plot(data_vic['close'], label='Vincommerce')
ax.set_xlabel('Date')
ax.set_title('close')
plt.legend()
```
![](https://images.viblo.asia/8c29211b-252e-4f94-bdb1-8da639cbba7d.PNG)
Hình 7: Closed price của HVN và VIC

Dựa vào hình 4,5,6,7 cho chúng ta thấy có vẻ cách ly xã hội góp phần cho cổ phiếu của Netflix tăng lên đáng kể trong những ngày gần đây, người người nhà nhà ở nhà thì cày phim thôi =)) càng nhiều lượt xem thì giá sẽ tăng (maybe thôi nhé, mình k rõ =)) ). Còn Với VIC và HVN thì có sự giảm đáng kể từ tháng 3 năm nay trở lại tuy nhiên trước đó có giảm nhưng có vẻ nhiều lắm.

## Volume ( khối lượng giao dịch)
Mọi người muốn hiểu sâu hơn về volume thì[ ở đây nè](https://daututhanhcong.com/phan-tich-khoi-luong-giao-dich-volume/).\

Với Netflix: 
```
data_netflix['Volume'].plot(label='netflix', figsize=(15,10), title ='Volume')
```
![](https://images.viblo.asia/38485864-4884-4d9b-95a3-6b0022126315.PNG)

Hình 8: Volume mã NFLX

 HVN và VIC:
 ```
 import matplotlib.pyplot as plt
fig,ax = plt.subplots(figsize=(15,10))
ax.plot(data_hvn['volume'], label="VN-airlines")
ax.plot(data_vic['volume'], label='Vincommerce')
ax.set_xlabel('Date')
ax.set_title('Volume')
plt.legend()
```
![](https://images.viblo.asia/49c63bb0-c278-4842-bdd4-cac6fdbea934.PNG)
Hình 9: Volume mã HVN và VIC 
## Tổng số lượng giao dịch 
Ở đây được tính theo công thức **Open * Volume**
```
data_netflix['total traded'] = data_netflix['Open'] * data_netflix['Volume']
data_hvn['total traded'] = data_hvn['open'] * data_hvn['volume']
data_vic['total traded'] = data_vic['open'] * data_vic['volume']
```
Vẽ đồ thị xem như nào nào? 
![](https://images.viblo.asia/b4ca52f7-ecce-44e7-8a14-15aaf5efa896.PNG)
Hình 10: total traded 
Tiếp theo chúng ta thử tính toán xem lợi nhuận hàng ngày như thế nào nha
## Daily return
Cách tính như thế này: 
```
x['returns'] = x['close'].pct_change(1)
```
Vẽ đồ thị mật độ KDE
```
data_netflix['returns'].plot(kind='kde', label='Netflix', figsize=(15,10), title='returns')
data_hvn['returns'].plot(kind='kde', label='VN-airlines')
data_vic['returns'].plot(kind='kde', label='Vincommerce')
plt.legend()
```
![](https://images.viblo.asia/260318d6-8057-40ee-a541-bb8ad4309790.PNG)

Hình 10: Daily return

Dựa trên những hình vẽ ở trên chúng ta có thể thấy covid-19 ảnh hưởng  lớn đến thị trường chứng khoán, cổ phiếu. Với 3 công ty ở trên đạ diện cho những nhu cầu thiết yếu hàng ngày của mọi người thì chúng ta có thể thấy  do cách ly toàn xã hội nên cổ phiếu của HVN và VIC có giảm đáng kể (trong 2 tuần cách ly xã hội), còn với kênh giải trí như Netflix thì lại tăng kha khá =)) và gần như cao nhất trong tháng 4 này. Tuy nhiên đây chỉ là nhận định cá nhân của mình thôi nhé :D. 


 # Áp Dụng mô hình dự đoán
 Ở đây mình sẽ chỉ dùng data của mã "HVN" để dự đoán thôi nhé, cái mình cần dự đoán ở đây là Close nên mình sẽ dùng nó làm label. Và data ở đây mình lấy có 3 tháng nên cực ít, do đó model sẽ không được chính xác nha mn :D
 
 Đầu tiên mình sẽ kiểm tra và xử lý với  missing value nhé. Mn có thể tham khảo về xử lý Missing Value ở[ bài trước](https://viblo.asia/p/xu-ly-missing-data-trong-data-analysis-maGK7qaAlj2) của mình nha. 
 `data_hvn.info()`
 ![](https://images.viblo.asia/348368c6-8edc-4026-9f1f-feee26f9377e.PNG)
Hình 11:Info của data netflix
 
 Ở hình 11 chúng ta có thể thấy chỉ có 1 giá trị null ở trường "returns" thôi nên chúng ta có thể drop nó đi hoặc điền giá trị "-999" vào đều được nhé. 
 `data_hvn.fillna(value=-999, inplace=True)`
 ![](https://images.viblo.asia/4c250504-2ac9-48b6-9730-60ebab82de38.PNG)
Hình 12:Info data sau khi fillna

Sau khi điền  giá trị '-999' vào thì tất cả đều là non-null rồi nhé. Tiếp theo là tách label thôi.

Ở đây 'close' mình sẽ giữ để làm label. 

```
data_hvn=data_netflix.drop(columns=['Close'])
```

Tổng số dòng ở đây là 89 nên mình sẽ chia tập train và test như sau: 
```
data_train = data_hvn[:80]
data_test = data_hvn[80:]
```

Vì ở đây là dữ liệu dạng timeseries nên nếu bạn nào sử dụng train_test_split của sklearn sẽ bị sai nhé. Và dữ liệu chỉ có trong khoảng 3 tháng nên sẽ rất ít và độ chính xác mô hình sẽ không tốt nha các bạn :P hoặc khả năng model sẽ bị underfit :p  
```
X_train = data_train.drop(['close'], 1)
y_train = np.array(data_train['close'])
x_test = data_test.drop(['close'], 1)
y_test = data_test['close']
```
Mình sẽ thử với linear regression nha. 
```
from sklearn.linear_model import LinearRegression
clfreg = LinearRegression()
clfreg.fit(X_train, y_train)
```

Dự đoán và tính RMSE: 
```
y_pred =clfreg.predict(x_test)
rmse=np.sqrt(np.mean(np.power((np.array(y_test)-np.array(y_pred)),2)))
print(rmse)
```

Vẽ đồ thị dự đoán xem nhé: 

```
import matplotlib.pyplot as plt
plt.figure(figsize=(16,8))
data_test['Predictions'] = y_pred
plt.plot(data_train['close'])
plt.plot(data_test[['close', 'Predictions']])
plt.legend(['Train', 'Val', 'Predictions'], loc='lower right')
```

![](https://images.viblo.asia/3629854b-41d5-48d6-b7bd-959d4ff58f14.PNG)
Hình: visualize train, test và predict

# Kết Luận 
Cảm ơn mọi người đã đọc bài viết của mình ạ. 

# Reference 

https://towardsdatascience.com/in-12-minutes-stocks-analysis-with-pandas-and-scikit-learn-a8d8a7b50ee7