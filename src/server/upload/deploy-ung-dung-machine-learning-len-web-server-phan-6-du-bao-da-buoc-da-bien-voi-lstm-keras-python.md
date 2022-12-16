Oke tiếp tục với series này hôm nay mình xin giới thiệu với mọi người dự báo chuỗi thời gian đa chiều, đa bước.

Mình tiếp tục lấy ví dụ là dự báo giá coin của bài trước nhé.

## Ý tưởng cho dự báo nhiều bước, nhiều chiều
### Với một chiều
Việc dự báo có 4 ý tưởng các bạn có thể thao khảo [tại đây](https://machinelearningmastery.com/multi-step-time-series-forecasting/).
### Với nhiều chiều 

Mong muốn của chúng là với những giá trị close, open,... hiện tại chúng ta mong muốn dự báo giá close cho nhiều bước thời gian tiếp theo.

Nhưng lấy dữ liệu đâu để dự báo cho các bước tiếp theo?

Câu trả lời đó là *1 bước chúng ta sẽ cho dự báo nhiều giá close trong khung tiếp theo.*

Trong bài viết này mình dự báo với 3 bước thời gian nhé. Tuy nhiên với mạng Neural thì việc dự báo nhiều bước nghe có vẻ không khả thi cho lắm, sai số và sai số xu hướng khá lớn. Kết quả không được tốt như các phương pháp truyền thống trong chuỗi thời gian như **ARIMA, SARIMA**.

Oke nói qua lý thuyết 1 chút vậy bây giờ đến bài toán của chúng ta

Với dữ liệu gốc như sau:

| open | high | low | close | volume | quoteAssetVolume | numberOfTrader | takerBuyBaseAssetVolume | takerBuyQuoteAssetVolume | ignore |
| ---- | ---- | --- | ----- | ----   | ---------------- |--------------- | ----------------------- | ------------------------ |------- |
| 0.0304000000 | 0.0306000000 | 0.0298550000 | 0.0304370000 | 1560.9700000000 | 47.4380609300 | 78 | 1227.1100000000 | 37.3092471400 | 57146.3825541400 |
| 0.0305260000 | 0.0307860000 | 0.0295340000 | 0.0301300000 | 578.1300000000 | 17.4638475100 | 195 | 314.9800000000 | 9.5420328900 | 54835.6917909400 |
| 0.0299520000 | 0.0302000000 | 0.0292500000 | 0.0298500000 | 563.5500000000 | 16.7206037600 | 225 | 176.9500000000 | 5.2605256600 | 54957.7561959400 |
| 0.0300330000 | 0.0306820000 | 0.0296000000 | 0.0300320000 | 790.9300000000 | 23.8081811100 | 221 | 322.3500000000 | 9.7097861000 | 54957.7561959400 |
| 0.0300860000 | 0.0305000000 | 0.0297560000 | 0.0299660000 | 643.7500000000 | 19.4555166800 | 222 | 280.4600000000 | 8.4800854000 | 51842.1161959400 |

Sẽ được chuyển thành dạng sau:

| open(t) | high(t) | low(t) | close(t) | volume(t) | quoteAssetVolume(t) | numberOfTrader(t) | takerBuyBaseAssetVolume(t) | takerBuyQuoteAssetVolume(t) | ignore(t) | close(t+1) | close(t+2) | close(t+3) |
| ---- | ---- | --- | ----- | ----   | ---------------- |--------------- | ----------------------- | ------------------------ |------- | ----- | ----- | ----- |
| 0.0304000000 | 0.0306000000 | 0.0298550000 | 0.0304370000 | 1560.9700000000 | 47.4380609300 | 78 | 1227.1100000000 | 37.3092471400 | 57146.3825541400 | 0.0301300000 |  0.0298500000 | 0.0300320000 |
| 0.0305260000 | 0.0307860000 | 0.0295340000 | 0.0301300000 | 578.1300000000 | 17.4638475100 | 195 | 314.9800000000 | 9.5420328900 | 54835.6917909400 | 0.0298500000 | 0.0300320000 |  0.0299660000 |
| 0.0299520000 | 0.0302000000 | 0.0292500000 | 0.0298500000 | 563.5500000000 | 16.7206037600 | 225 | 176.9500000000 | 5.2605256600 | 54957.7561959400 | 0.0300320000 |  0.0299660000 | Nan |
| 0.0300330000 | 0.0306820000 | 0.0296000000 | 0.0300320000 | 790.9300000000 | 23.8081811100 | 221 | 322.3500000000 | 9.7097861000 | 54957.7561959400 | 0.0299660000 | Nan | Nan |
| 0.0300860000 | 0.0305000000 | 0.0297560000 | 0.0299660000 | 643.7500000000 | 19.4555166800 | 222 | 280.4600000000 | 8.4800854000 | 51842.1161959400 | Nan | Nan | Nan |

Ta sẽ chém mấy thằng có dữ liệu là Nan đi nhé :D

#### Code
```
def series_to_supervised(self, data, n_out=1, n_in=1, dropnan=True):
    n_vars = 1 if type(data) is list else data.shape[1]
    df = DataFrame(data)
    df_drop = DataFrame(data)
    df_drop.drop(df_drop.columns[range(1, n_vars)], axis=1, inplace=True)
    cols, names = list(), list()
    for i in range(0, n_in):
        cols.append(df.shift(i))
        if i == 0:
            names += [('var%d(t)' % (j+1)) for j in range(n_vars)]
        else:
            names += [('var%d(t+%d)' % (j+1, i)) for j in range(n_vars)]
    for i in range(1, n_out+1):
        cols.append(df_drop.shift(-i))
        names += [('var%d(t+%d)' % (1, i))]
    agg = concat(cols, axis=1)
    agg.columns = names
    if dropnan:
        agg.dropna(inplace=True)
    agg = agg.fillna(0)
    return agg
```

## Build model
Tương tự bài trước mình build model với cấu hình sau:
### Config
```
units = 64
n_time_predicts = 2 * 24
epochs = 50
batch_size = 128
verbose = 0
min_delta = 1e-15 
patience = 30 # với 30 vòng lặp mà loss giản không đáng kể thì dừng (1e-15 yên tâm là nó sẽ chạy hết 50 epochs :D)
monitor = 'val_loss'
```
### Model
Tương tự như bài 4 mình dùng 2 layer với LSTM như sau:
```
def build_model(self, units, train_X, loss='mse', optimizer='adam'):
    model = Sequential()
    model.add(LSTM(units,input_shape=(train_X.shape[1], train_X.shape[2]), return_sequences=True))
    model.add(LSTM(units))
    model.add(Dense(3)) # 3 output giá close
    model.compile(loss=loss, optimizer=optimizer)
    return model
```
Các bạn nên thử tự build cho mình 1 model riêng để có kết quả chính xác hơn nhé.

## Train model, Fit model
Tương tự như bài 4 các bạn xem lại nhé

## Predict 
Ở đây việc lấy dữ liệu sau khi predict có khác 1 chút đó là:

Hiện tại có 3 output cho mỗi bước dự báo nên mình sẽ lấy giá trị đầu tiên cho các bước dự báo trước và đến bước thời gian cuối cùng thì ta lấy toàn bộ 3 giá trị dự báo cho giá đóng cửa:

### Code
```
inv_yhat = concatenate((yhat[:,0], yhat[-1:,1:]),axis=None)
```
## Code sample
Các bạn có thể tham khảo code ở đây nhé: https://github.com/hung96ad/multi_variables_multi_steps_predict

## Kết quả
Nhìn chung với dự báo nhiều bước thì như mình đã nói từ đầu kết quả không được khả quan cho lắm :( :

![](https://images.viblo.asia/e16279c3-615c-4d3d-85b7-077f81f2dd45.png)

Sai số:
```
RMSE: 0.00131984	
MAX ERROR: 0.0039352
```

## Train model, predict với nhiều cặp coin
Tương tự như bài 4 các bạn tham khảo ở đây nhé: https://viblo.asia/p/deploy-ung-dung-machine-learning-len-web-server-phan-4-du-bao-gia-coin-voi-lstm-keras-python-Do754JdBZM6

## Tài liệu tham khảo
* Code tham khảo: https://github.com/hung96ad/predict_price_cryptocurrencies
* Multivariate Time Series Forecasting with LSTMs in Keras: https://machinelearningmastery.com/multivariate-time-series-forecasting-lstms-keras/
* 4 Strategies for Multi-Step Time Series Forecasting: https://machinelearningmastery.com/multi-step-time-series-forecasting/
* LONG SHORT-TERM MEMORY - Hochreiter & Schmidhuber (1997): https://www.bioinf.jku.at/publications/older/2604.pdf
* Understanding LSTM Networks: http://colah.github.io/posts/2015-08-Understanding-LSTMs/
* The Unreasonable Effectiveness of Recurrent Neural Networks: http://karpathy.github.io/2015/05/21/rnn-effectiveness/
* LSTM là gì? - dominhhai: https://dominhhai.github.io/vi/2017/10/what-is-lstm/
* LSTM - Keras: https://keras.io/layers/recurrent/#lstm