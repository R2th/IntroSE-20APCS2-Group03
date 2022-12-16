## Lời mở đầu

Trong bài viết này, mình sẽ cùng các bạn bước chân vào con đường được cho là làm giàu không khó-mà khó không tưởng. Mình sẽ chia sẻ:
* Trang web cung cấp free data thị trường chứng khoán, forex ...
* Xây dựng mô hình dự đoán xu hướng giá
* Cuộc đời nở hoa hay cuộc sống bế tắc (phải sau bài này, mình test thực tế rồi chia sẻ =)))

## Chuẩn bị dữ liệu
Data mình dùng trong bài này liên qua tỉ giá ngoại hối (forex) nhé.
Trước tiên, các bạn vào trang này để download dữ liệu: https://www.dukascopy.com/plugins/fxMarketWatch/?historical_data

![](https://images.viblo.asia/3c9c9ff0-2a56-459b-9279-16855ba08c4e.png)

Như các bạn thấy, trang này có lịch sử dữ liệu của rất nhiều loại cặp tiền hay hàng hóa, bạn chọn một loại để nghiên cứu thôi nhé. Nghiên cứu nhiều loại quá bị tẩu hỏa nhập ma mình không chịu trách nhiệm nha :D
Sau khi chọn được cặp tiền thích hợp rồi, các bạn chọn setup một số thông số như sau:

![](https://images.viblo.asia/11eee229-3750-4f61-b56e-ab249aa75de4.png)

Chọn khung giờ cho dữ liệu dạng nến(Candlestick), khung thời gian càng lớn càng ít nhiễu nhé. 
Chọn khoảng thời gian lấy dữ liệu trong phần From date và To date

Khi chọn xong, bạn có thể quan sát dữ liệu của bạn bằng cách nhấn vào nút "Show on chat", ta sẽ thấy biểu đồ kiểu này:

![](https://images.viblo.asia/8d3459f3-2468-4723-8bde-95c9abdd79e5.png)

Để mình giải thích thêm nhé: Biểu đồ thông thường mà chúng ta hay gặp là dạng line, nhưng trong thị trường ngoại hối, giá cả không ngừng biến động khiến cho việc dùng biểu đồ line rất khó quan sát. Biểu đồ nến là phân tích trong giá từng khoảng thời gian thành 4 yếu tố: Giá mở cửa, đóng cửa, giá cao nhất, thấp nhất.

![](https://images.viblo.asia/fe128f3a-4384-4fb8-b5b0-2adf52082da2.png)
 

![](https://images.viblo.asia/0c17ed6b-ddf2-4382-9e88-8f8b7e5e39a1.png)

Trong một khung thời gian, giá cả liên tục biến động tạo thành 1 đường giống như hình trên. Mức giá tại điểm bắt đầu của khung thời gian gọi là Open, tại điểm kết thúc gọi là Close, giá cao nhất trong khung này gọi là High, và giá thấp nhất trong khung thời gian này gọi là Low

Trong biểu đồ nến, cả khoảng dao động giá như hình trên được mô tả thành hình một cây nến:

![](https://images.viblo.asia/0fc1cd20-9cce-41f3-890f-c2fab3b79b9b.jpg)

* Nến biểu hiện giá tăng (bên trái hình): Cây nến có mức giá đóng cửa cao hơn mức giá mở cửa.
* Nến biểu hiện giá giảm (bên phải hình): Cây nến có mức giá đóng cửa thấp hơn mức giá mở cửa.
* Phần thân nến: Phần giá trong khoảng Open-Close
* Phần như cái que còn lại kia gọi là bóng nến nhé (shadow candlestick)

Qua biểu đồ nến, phần nào đó chúng ta có thể thấy thị trường đang giằng co như thế nào trong 1 khoảng thời gian, cây nến càng dài thì thị trường biến động càng mạnh, ngược lại, cây nến ngắn cho thấy thị trường bình ổn.


## Tiền xử lý

Sau khi tải file csv về, ta tiến hành đọc và quan sát dữ liệu dưới dạng số:
```
raw_data = pd.read_csv("XAUUSD.csv")
raw_data.head()
```

![](https://images.viblo.asia/6ff952b7-3791-4ff7-9460-7b1fed756edb.png)

Như các bạn thấy, tại mỗi time step, dữ liệu của chúng ta có 5 đặc trưng:
* Open: Giá mở cửa
* High: Giá cao nhất trong khung thời gian đó
* Low: Giá thấp nhất trong khung thời gian đó
* Close: Giá đóng cửa
* Volume: Khối lượng giao dịch


Ngoài các đặc trưng nến, mà data cung cấp sẵn, ta có thể đưa vào một số đặc trưng khác như:
* Độ dài thân nến, bóng nến, đặc trưng nến là  tăng hay  giảm ...
* Trung bình giá qua các time step (MA)
* Chỉ báo liên quan sức mua, bán. Ví dụ như RSI 
* Các tín hiệu phân kì trên các chỉ báo 
* Và rất nhiều đặc trưng khác, nếu có thời gian mình sẽ thử  nghiệm và chia sẻ

Trong bài này mình sẽ thử nghiệm các đặc trưng cơ bản của nến bao gồm: Open, High, Low, Close, các độ dài thân nến, bóng nến.

Kiểm tra trong data có trường nào rỗng hay không:

```
raw_data.isna().sum()
```
Kết quả:
```
Local time    0
Open          0
High          0
Low           0
Close         0
Volume        0
dtype: int64
```

Loại bỏ những ngày thị trường đóng cửa, những ngày này, giá sẽ đi ngang và volume = 0 :

```
14.09.2019 04:00:00.000 GMT+0700	1488.5	1488.5	1488.5	1488.5	0
14.09.2019 08:00:00.000 GMT+0700	1488.5	1488.5	1488.5	1488.5	0
14.09.2019 12:00:00.000 GMT+0700	1488.5	1488.5	1488.5	1488.5	0
14.09.2019 16:00:00.000 GMT+0700	1488.5	1488.5	1488.5	1488.5	0
14.09.2019 20:00:00.000 GMT+0700	1488.5	1488.5	1488.5	1488.5	0
15.09.2019 00:00:00.000 GMT+0700	1488.5	1488.5	1488.5	1488.5	0
15.09.2019 04:00:00.000 GMT+0700	1488.5	1488.5	1488.5	1488.5	0
```

Code:
```
raw_data = raw_data[raw_data.Volume != 0]
```

Tính toán một số đặc trưng:
```
high = raw_data["High"]
low = raw_data["Low"]
open_ = raw_data["Open"]
close = raw_data["Close"]
volume = raw_data["Volume"]
candle_body = open_ - close

candle_top_shadow = candle_body.copy()
candle_bot_shadow = candle_body.copy()

for i in range(len(candle_body)):
  if candle_body[i] > 0:
    candle_top_shadow[i] = high[i] - close[i]
    candle_bot_shadow[i] = open_[i] - low[i]
  else:
    candle_top_shadow[i] = high[i] - open_[i]
    candle_bot_shadow[i] = close[i] - low[i]

candle_values = [open_, high, low, close, candle_body, candle_top_shadow, candle_bot_shadow]
candle_values = np.asarray(candle_values).T
```

   Ý tưởng lấy input và output là: Sử dụng một cửa sổ trượt trên candle_values, tại mỗi thời điểm, các giá trị trên khung đó sẽ lấy làm input train, bốn nến sau đó được đưa ra để tính output train.
   
  ```
length_x = 20
length_y = 4
step = 3
index  = 0

while length_x + length_y + index < len(raw_data):
    x.append(candle_values[index: length_x + index])
    y_buffer = candle_values[index + length_x: index + length_x + length_y]
    result = []
    for i in range(length_y):
      mean = (y_buffer[i][1] + y_buffer[i][2])/2
      result.append(mean)
      
    y.append(result)
    index = index + step
    
num_split = int(0.85*len(y))
x = np.asarray(x)
y = np.asarray(y)
    
x_test = x[num_split:]
y_test = y[num_split:]  

x_train = x[0: num_split]
y_train = y[0: num_split]
  ```
    
## Mô hình

Mình sử dụng một mô hình LSTM đơn giản để giải quyết. Chi tiết về cách hoạt động của LSTM đã có nhiều bài viết trên viblo chia sẻ nên mình không mô tả lại nữa.

```
model = Sequential()
model.add(TimeDistributed(Dense(128, activation="relu"), input_shape=(time_steps, features)))
model.add(LSTM(128))
model.add(Dense(16, activation="relu"))
model.add(Dense(4, activation="linear"))
model.compile(loss="mse", optimizer="adam")
model.summary()
```

Kết quả:

```
Model: "sequential_2"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
time_distributed_9 (TimeDist (None, 20, 128)           1024      
_________________________________________________________________
lstm_2 (LSTM)                (None, 128)               131584    
_________________________________________________________________
dense_11 (Dense)             (None, 16)                2064      
_________________________________________________________________
dense_12 (Dense)             (None, 4)                 68        
=================================================================
Total params: 134,740
Trainable params: 134,740
Non-trainable params: 0
```

Giờ chúng ta thử tranning với loss function là "mean squared error", optimizer là "adam"  với 100 epoch  

```
hist = model.fit(x_train, y_train, validation_data=(x_test, y_test),  epochs=100) 
model.save_weights("lstm_stock_market_weight.h5")
model.save("lstm_stock_market_model.h5")
model_json = model.to_json()
with open("lstm_stock_market_json.json", "w") as json_file:
    json_file.write(model_json)
```

Kết quả:

```
Train on 10164 samples, validate on 1794 samples
Epoch 1/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.8960e-05 - val_loss: 7.3103e-06
Epoch 2/100
10164/10164 [==============================] - 16s 2ms/step - loss: 2.0148e-05 - val_loss: 1.8132e-05
Epoch 3/100
10164/10164 [==============================] - 16s 2ms/step - loss: 2.0164e-05 - val_loss: 2.5460e-05
Epoch 4/100
10164/10164 [==============================] - 15s 2ms/step - loss: 1.9579e-05 - val_loss: 5.8763e-05
Epoch 5/100
10164/10164 [==============================] - 16s 2ms/step - loss: 2.3302e-05 - val_loss: 1.7358e-05
Epoch 6/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.8696e-05 - val_loss: 1.0073e-05
Epoch 7/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.7204e-05 - val_loss: 1.4730e-05
Epoch 8/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.9232e-05 - val_loss: 7.0074e-06
Epoch 9/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.9284e-05 - val_loss: 1.4055e-05
Epoch 10/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.9396e-05 - val_loss: 2.0943e-05
Epoch 11/100
10164/10164 [==============================] - 16s 2ms/step - loss: 2.1322e-05 - val_loss: 1.1825e-05
Epoch 12/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.7433e-05 - val_loss: 1.0396e-05
Epoch 13/100
10164/10164 [==============================] - 16s 2ms/step - loss: 1.9289e-05 - val_loss: 3.7445e-05
```

Nhìn con số có vẻ ổn, nhưng ta kiểm tra thử xem sao nhé.

## Test thử:
Mình lấy 100 nến gần nhất để dự đoán kết quả:

```
data_test = candle_values[-100:]
x_test = []
length_x = 20
step = 4
index  = 0
while length_x + index < len(data_input):
    x_test.append(data_input[index: length_x + index])
    index = index + step
x_test = np.array(x_test)
result = model.predict(x_test)
```

Nối kết quả tính được để vẽ biểu đồ:
```
predict_plot = []
for item  in result:
  predict_plot.extend(item)
```

Vẽ biểu đồ đường trung bình thực tế và đường do máy học dự đoán:
```
plt.plot(simple_ma[-100:-4])
plt.plot(range(20,20+len(predict_plot)), predict_plot)
```

![](https://images.viblo.asia/f2b8bba9-12da-4d7c-9317-2a6ddf957497.png)

Như các bạn thấy, tuy giá trị thực tế với giá trị do máy dự đoán khác biệt nhau, nhưng điểm bù của mô hình này là  nó dự đoán trước 4 cây nến, ta có thể tận dụng để dự đoán xu hướng. Khác với một số mô hình  dự đoán trước 1 cây nến - rất khó để áp dụng trong giao dịch thực tế. Với model của mình vừa xây dựng, mình có ý tưởng để áp dụng như sau:

B1. Hình thức trading kiểu ngắn hạn, trong ngày hoặc 1 đến 2 ngày (vì khung nến là 4 giờ và mô hình dự đoán trước 4 nến )

B2. Đợi các dấu hiệu nến cho biết thời điểm vào lệnh (cái này cần tìm hiểu thêm về nến nhé)

B3. Dùng model vừa xây dựng để xác nhận xu hướng đúng hay không

B4. Vào lệnh, và nhớ chốt lỗ-lãi ngay từ đầu.

Lưu ý: Phương pháp này chỉ mang tính tham khảo, các bạn cũng như mình nên demo trước thật kĩ  =)))
## Kết luận

Trong thị trường giao dịch có rất nhiều biến cố, không có 1 mô hình nào có thể dự đoán chính xác 100% nên trong giao dịch thực tế, mọi phương pháp hay mô hình nào đó các bạn chỉ nên tham khảo.

### Cảm ơn các bạn đã đọc bài!