*Trí tuệ nhân tạo là lĩnh vực đang được đề cập rất nhiều trong những năm gần đây. Vậy trí tuệ nhân tạo là gì mà cao siêu vậy? Trí tuệ nhân tạo (AI: Artificial Intelligence) có thể được định nghĩa như một ngành của khoa học máy tính liên quan đến việc tự động hóa các hành vi thông minh.*
# Machine learning
Machine learning (hay là học máy) là một tập con của AI. Machine Learning là một lĩnh vực nhỏ của Khoa Học Máy Tính, nó có khả năng tự học hỏi dựa trên dữ liệu đưa vào mà không cần phải được lập trình cụ thể. Netflix dựa trên bài toán *recommendation system* để gợi ý bộ phim cho người dùng. Hay là Amazon sử dụng kỹ thuật học máy để đề xuất các mặt hàng mua sắm dựa trên tìm kiếm gần đây. 
# Machine learning in trading
Trong bài này chúng ta sẽ thử tìm hiểu xem có thể áp dụng bài toán học máy trong giao dịch chứng khoán không? Trên thực tế, có những quỹ phòng hộ hoàn toàn dựa trên AI, cụ thể là Nghiên cứu nổi loạn và KFL Capital. Học máy là logic và khắc phục những hạn chế của con người. Điều này rất quan trọng trong giao dịch vì cảm xúc của người chơi sẽ dẫn đến sa vào cạm bẫy trên sàn giao dịch. Điểm mấu chốt của cuộc chơi này là là mua ở đầu gối và bán ở trên đầu. Điều này được thực hiện bằng cách sử dụng các kỹ thuật học máy phát hiện những điểm nổi bật trong dữ liệu và đưa ra dự đoán. Xây dựng mô hình là một phần quan trọng của các chiến lược giao dịch. Dựa trên dữ liệu quá khứ và nó phân cụm xung quanh các dự đoán điểm dữ liệu cho tương lai được thực hiện. Có nhiều mô hình để thực hiện áp dụng cho bài toán trading.  Tuy nhiên, đây chỉ là một ví dụ thú vị để giúp chúng ta tăng hiểu biết và kiến thức về AI hơn chứ không khuyến khích các bạn sử dụng nó để chơi chứng khoán, Coins hay Forex, ... ở trên các sàn giao dịch. Hơn nữa mình chỉ biết một ít kiến thức ngoài lề về nghiệp vụ này nên có gì không đúng mong các bạn góp ý. 

# Data
Ở đây mình sử dụng tập data  được lấy từ trang https://coinmarketcap.com/ bằng cách: 
```
market_info = pd.read_html("https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20130428&end="+time.strftime("%Y%m%d"))[0]
```
![](https://images.viblo.asia/5c699fb2-187f-4fbe-969f-2d34416698f6.png)

Bảng trên đây biểu thị các thông số mình đọc từ *market_info*.

# Phân tích dữ liệu
Tiếp theo, chúng ta sẽ vẽ đồ thị thể hiện giá cả của market_info này nhé: 
```
Df=market_info[['bt_Close']] 
# Drop rows with missing values 
Df= Df.dropna() 
Df.bt_Close.plot(figsize=(10,5)) 
plt.ylabel("bitcoin  Prices")
plt.show()
```
**Out put: **
 ![](https://images.viblo.asia/37bb22a7-f342-4f3c-be9e-1f90ce44f9b9.png)
 
Ta sẽ tiếp tục phân tích giá của bitcoin biến động theo từng ngày như thế nào nha. 
```
ax1 = plt.subplot()
ax1.hist(market_info['bt_day_diff'].values, bins=100)
ax1.set_title('Bitcoin Daily Price Changes')
plt.show()
```
**Out put:**
![](https://images.viblo.asia/60b0052a-3491-4e9c-88fa-5240d18bb493.png)


Dựa vào 2 hình vẽ trên chúng ta có thể nhìn thấy được một sự biến động rất lớn giá từ thấp đến đỉnh điểm và lại về đáy đúng không nào :D. Nên tốt nhất ai yếu tim đừng chơi mấy trò này nha :))

# Thực hiện bài toán
## Mô hình  
### Chia Training và Test-sets 
Trước tiên để thực hiện bài toán chúng ta sẽ phải chia tập train và tập test. Các bạn có thể sử dụng `train_test_split` của `sklearn` để chia tập training và test-set. Tuy nhiên, với bài toán này mình sẽ chia theo mốc thời gian: split_date = '2018-04-01' cho thực tế. 
```
split_date = '2018-04-01'
ax1 = plt.subplot()
ax1.set_xticks([datetime.date(i,j,1) for i in range(2013,2019) for j in [1,7]])
ax1.set_xticklabels('')
ax1.plot(market_info[market_info['Date'] < split_date]['Date'].astype(datetime.datetime),
         market_info[market_info['Date'] < split_date]['bt_Close'], 
         color='#B08FC7', label='Training')
ax1.plot(market_info[market_info['Date'] >= split_date]['Date'].astype(datetime.datetime),
         market_info[market_info['Date'] >= split_date]['bt_Close'], 
         color='#8FBAC8', label='Test')
ax1.set_xticklabels('')
ax1.set_ylabel('Bitcoin Price ($)',fontsize=12)
plt.show()
```
![](https://images.viblo.asia/fdfc9bf5-7584-4d3d-8c34-7b4769090598.png)

Ở đây mình chia 2 tập training và test ở thời điểm nó đã giảm đến một mức quá lớn bạn có thể thấy trong hình ở trên.  Chúng ta cùng xem nó dự đoán như thế nào nhé :D 
### Model 

 Theo như mình đọc được một ít thông tin về giao dịch chứng khoán để dự đoán giá đóng cửa của ngày hôm sau các nhà đầu tư sẽ xem xét lịch sử về giao dịch hay giá của một loại cổ phiếu đó trong 1 khoảng thời gian trước đó. Bởi vì chứng khoán hay forex đều biến động gần giống nhau trong 1 khoảng thời gian nào đó (Tuy nhiên đây chỉ là thông tin tớ tìm hiều được thôi nhé =)) ) . Vì vậy tớ sẽ chọn 10 ngày và 3 ngày  nhé vì số 10 đẹp và tớ thích số 3 =))). 
 Cùng tiến hành dự đoán bằng model linear đơn giản nha: 
 Đầu tiên lấy tập train và tập test. 
 Train: 
```
X_1 = market_info[market_info['Date'] < split_date]
X_train=X_1[['bt_Close']] 


X_train['S_3'] = X_train['bt_Close'].shift(1).rolling(window=3).mean() 

X_train['S_10']= X_train['bt_Close'].shift(1).rolling(window=10).mean() 
# Drop rows with missing values 
X_train= X_train.dropna() 

y_train = X_train['bt_Close']
X_train = X_train[['S_3', 'S_10']]
```
Test: 
 ``` 
 X_2 =  market_info[market_info['Date'] >= split_date]
X_test =X_2[['bt_Close']] 

X_test['S_3'] = X_test['bt_Close'].shift(1).rolling(window=3).mean() 

X_test['S_10']= X_test['bt_Close'].shift(1).rolling(window=10).mean() 
# Drop rows with missing values 
X_test= X_test.dropna() 

y_test = X_test['bt_Close']
X_test = X_test[['S_3', 'S_10']] 
```
Mình sử dụng thư viện sklearn nhé: 
```
from sklearn.linear_model import LinearRegression 
```
```
linear = LinearRegression().fit(X_train,y_train) 

print (" Price =", round(linear.coef_[0],2),  "* 3 Days Moving Average", round(linear.coef_[1],2),  "* 10 Days Moving Average +", round(linear.intercept_,2)) 
```

Xem giá thực tế và dự đoán chênh lệch ntn nha: 
```
predicted_price = linear.predict(X_test)  

predicted_price = pd.DataFrame(predicted_price,index=y_test.index,columns = ['price'])  

predicted_price.plot(figsize=(10,5))  

y_test.plot()  

plt.legend(['predicted_price','actual_price'])  

plt.ylabel("bitcoin Price")  

plt.show()
```
![](https://images.viblo.asia/54264b9f-674c-4a54-8fef-0467b9ecbe80.png)
Kết quả predict của model là **0.92** nhá :))). Nếu mà thực tế cũng được như này chắc ai cũng giàu mất tuy nhiên là ai chơi cũng biết trong chứng khoán hay forex hay coins ai cũng biết là giá cả nó biến động ra sao mà =)) 
```
r2_score = linear.score(X_test,y_test)*100  

float("{0:.2f}".format(r2_score))
```

# Kết Luận

Trên thực tế để có thể gia nhập vào lĩnh vực này bạn phải có kiến thức nghiệp vụ cực kỳ tốt và một cái đầu lạnh thì khả năng bạn thắng ở trong cuộc đua này mới cao. Nếu bạn là một kỹ sư lập trình thì cũng tương tự như bao người bạn phải có kiến thức và kỹ năng tốt để tham gia sàn giao dịch. Tuy nhiên, có thể xây dựng model để góp phần tăng thêm độ chính xác hơn nhưng bạn phải thu thập dữ liệu và training đủ lâu. Mình chỉ nói là tăng thêm cho dự đoán của bạn thôi nhé chứ không phải là chắc chắn =)))). Cuộc đua này yêu cầu nhiều thứ lắm đấy, tài chính, kiến thức, và một chút may mắn =)))).
# Tham Khảo

https://www.quantinsti.com/blog/machine-learning-application-forex-markets-working-models?utm_campaign=News&utm_medium=Community&utm_source=DataCamp.com

https://github.com/VivekPa/IntroNeuralNetworks

https://www.oreilly.com/learning/algorithmic-trading-in-less-than-100-lines-of-python-code