Xin chào mọi người hôm nay mình sẽ viết bài về cách lấy thêm tính năng từ bộ dữ liệu Time Series bằng code python. Nào chúng ta cùng bắt đầu thôi. 

Trong khi làm việc với dữ liệu Time series, các giá trị của tập dữ liệu có thể bị ảnh hưởng bởi ngày nghỉ lễ, ngày nào trong tuần, số ngày trong tháng. Vậy thì làm sao để chúng ta có thể trích xuất các tính năng này từ Datetime bằng python để có thêm thông tin cho chúng ta đây? 

# Import và chuẩn bị dữ liệu 
Chúng ta sẽ sử dụng tập dữ liệu [daily female births dataset](https://raw.githubusercontent.com/jbrownlee/Datasets/master/daily-total-female-births.csv). Tập dữ liệu này mô tả số lượng trẻ em gái sinh hàng ngày ở California năm 1959. 

Download dữ liệu: 
```
!wget https://raw.githubusercontent.com/jbrownlee/Datasets/master/daily-total-female-births.csv
```

Sau khi download dữ liệu xong thì chúng ta bắt đầu thôi nào ^^

Việc đầu tiên chắc chắn là đọc và kiểm tra xem dữ liệu như thế nào nhỉ? 

```
import pandas as pd
df = pd.read_csv('daily-total-female-births.csv')\
df.head()
```

![](https://images.viblo.asia/f66c8ea1-d0fe-47f8-a884-d8179a5a2132.png)

Hình: data của chúng ta đây 

Kiểm tra định dạng của dữ liệu:
```
df.info()
```

![](https://images.viblo.asia/5c39502a-9309-4664-adce-4c38109e7283.png)

Hình: type của dữ liệu 

Như bạn cũng thấy ở hình trên Date ở đây đang là object, vì vậy bây giờ mình sẽ convert hết sang datetime nhé: mình sử dụng **pd.to_datetime**

```
df.Date = pd.to_datetime(df.Date)
df.info()
```

Sau khi đã convert xong thì chúng ta thử kiểm tra xem đã đưa về datetime chưa nhé? 

![](https://images.viblo.asia/e3426373-49c2-490a-bcaa-702989a9c59a.png)

Hình: kiểm tra type df

Ở hình trên chúng ta cũng thấy rằng cột Date đã được convert từ object sang datetime rồi :D. Bây giờ visualize dữ liệu lên xem nào. 

```
df.set_index('Date').plot()
```

![](https://images.viblo.asia/5c04fdb9-f5e0-4e90-90ad-f4c59a0cc6c4.png)

Hình: visualize cột Date

# Trích xuất ngày trong tuần 

Thông tin về các ngày trong tuần cũng khá là quan trọng, biết đâu số lượng người sinh ra ở những ngày trong tuần nhiều hơn cuối tuần thì sao nhỉ? 

```
df['weekday'] = df.Date.dt.weekday

df.head(10)
```

![](https://images.viblo.asia/d59c805a-e6d3-4d8d-9af2-868ee24d7ee0.png)

Hình: trích xuất ngày trong tuần

# Trích xuất Ngày, tháng, năm, quý từ cột Date
Trích xuất Ngày, tháng, năm, quý từ cột Date khá là đơn giản chúng ta chỉ cần dùng dữ liệu của cột Date là xong. 
## Ngày 
Chúng ta có thể trích xuất dữ liệu ngày từ cột Date đơn giản như sau: 

```
df['day'] = df['Date'].dt.day
df[['Date','day']].head()
```
![](https://images.viblo.asia/ecd364f9-f41d-4493-8a98-020671d8227d.png)
Hình: day
## Tháng
Tương tự với ngày:
```
df['month'] = df['Date'].dt.month
df[['Date','month']].head()
```
![](https://images.viblo.asia/90accd0d-2847-4d2e-9773-2e8b351f8222.png)
Hình: month
## Năm
Tương tự với ngày và tháng ở trên
```
df['year'] = df['Date'].dt.year
df[['Date','year']].head()
```
![](https://images.viblo.asia/d8c8b89a-cb4b-44ff-bf4e-0bab1195f5b3.png)

Hình: year 

## Quý
Tương tự như trên: 
```
df['quarter'] = df['Date'].dt.quarter
df[['Date','quarter']].head()
```
![](https://images.viblo.asia/065cf7ee-25f2-4128-851e-2dcb30315a8f.png)
Hình: Quarter

Đơn giản phải không nào mọi người :D 

# Trích xuất Holidays
Những ngày lễ như năm mới, giáng sinh, ... thì mình nghĩ cũng ít người sinh hơn chăng? Tuy nhiên với một số dữ liệu như giao dịch ở ngân hàng, mua bán các thứ hoặc tiêu thụ điện năng, ... thì những ngày lễ lại ảnh hưởng rất nhiều nên mình cũng áp dụng để trích xuất dữ liệu ngày nghỉ lễ trong tập dữ liệu này. 

Mình có sử dụng package **holidays** của python, thư viện này cung cấp các ngày lễ của nhiều quốc gia trên thế giới. CHúng ta có thể lựa chọn nơi mình muốn lấy dữ liệu này. 

```
pip install holidays
```

Do dataset này mình sử dụng tập dữ liệu về số lượng trẻ em gái sinh hàng ngày ở California năm 1959. Nên ở đây mình chọn US nhé mọi người. 

```
ca_holidays = holidays.UnitedStates(state='CA')
df['holidays']  = df.Date.apply(lambda x: ca_holidays.get(x))
```
Dưới đây là các ngày lễ ở California
![](https://images.viblo.asia/0d87c9c9-20d0-4d08-8e45-f2a37f66219b.png)
Hình: California holidays 

Dữ liệu thu được:

![](https://images.viblo.asia/6bc172e6-9337-42da-9de3-09075e87aecf.png)
Hình: holidays

Để so sánh số lần sinh giữa ngày lễ và ngày thường, chúng ta sẽ nhóm dữ liệu theo ngày lễ và lấy giá trị trung bình tất cả các lần sinh vào cùng một ngày. 

```
df.holidays = df.holidays.fillna('No holiday') 

birth_df = df.groupby('holidays').median().reset_index()
birth_df
```

![](https://images.viblo.asia/8a7b23e9-c094-45c9-8667-95fd32df5350.png)
Hình: số lượng ca sinh trong holidays

Dựa vào hình trên, số trẻ sinh vào ngày Tết là thấp nhất, dường như là số lượng sinh vào các ngày lễ khác khá cao so với số lượng sinh vào các ngày bình thường. Tuy nhiên dữ liệu ngày chỉ có 1 năm nên cũng không đủ để đưa ra kết luận gì cả. 
![](https://images.viblo.asia/e04ab2d9-d4b8-499d-afd2-9da114fa73ef.png)
Hình: bar chart
# Trích xuất số ngày trong tháng
Một số ngày đặc biệt như 29/2 cũng hiếm khi xảy ra, vì vậy có thể số trẻ sinh vào ngày này cực ít. Hoặc nếu chúng ta muốn so sánh số lần sinh giữa các tháng khác nhau, vì vậy số lượng ngày trong 1 tháng cũng ảnh hưởng khá nhiều. Vì vậy chúng ta thử trích xuất dữ liệu này ra nhé. Chúng ta có thể sử dụng thư viện có sẵn của Python là **calendar** . 

```
from calendar import monthrange

first_day_of_month, days_in_a_month = monthrange(2021, 2)

print('Weekday of first day of the month:', first_day_of_month)
print('Number of days in month:', days_in_a_month)
```

```
Weekday of first day of the month: 0
Number of days in month: 28
```

Chúng ta test thử với tháng 2 trong 2021 như ở trên. 

```
def extract_month_range(year, month):
    '''Extract how many days in a month'''
    
    first_day_of_month, days_in_a_month = monthrange(int(year), int(month))
    return days_in_a_month
    
average_per_month = df.set_index('Date').resample('M').mean()

average_per_month['month'] = average_per_month.index.month
average_per_month['year'] = average_per_month.index.year
```

```
average_per_month['days_in_a_month'] = average_per_month.apply(lambda row: extract_month_range(row.year, row.month), axis=1)
```
![](https://images.viblo.asia/35e56061-278c-47f2-a935-0990a786cce7.png)
Hình: average_per_month

Chúng ta có thể vẽ biểu đồ cột Births và month ra để so sánh:

```
plt.plot(average_per_month.month, average_per_month.Births)
plt.ylabel('Birth')
plt.xlabel('month')
```
![](https://images.viblo.asia/8d11459b-3a7b-4df0-8503-ef5420a82fa9.png)
Hình: Birth and month

Ở hình trên chúng ta có thể thấy rằng ở tháng 9 số lượng trẻ em sinh ra là nhiều nhất, do tháng 9 có nhiều ngày hơn chăng? Chúng ta cùng thử vẽ biểu đồ để so sánh nhé 
```
plt.bar(average_per_month.month, average_per_month.days_in_a_month)
plt.ylabel('days_in_a_month')
plt.xlabel('month')
```

![](https://images.viblo.asia/89fb517d-d2c8-4c44-84b3-13d61cffd58f.png)
Hình: số ngày trong tháng

Dựa vào hình trên và thực tế chúng ta biết rằng tháng 9 chỉ có 30 ngày thôi mà, trong khi đó tháng 1, 3, 5,... có 31 ngày cơ mà? Vậy là số ngày trong 1 tháng và số lượng trẻ em sinh ra không có mối tương quan trực tiếp rồi. Dù sao thì chúng ta cũng có thêm 1 feature để có thể kết hợp với các feature khác. 


# Kết luận
Cảm ơn mọi người đã đọc bài viết của mình, hi vọng sẽ hữu ích với mọi người. Nếu có gì sai sót mong nhận được góp ý ạ. Và đừng quên **Upvoted**   cho bài viết của mình nhé ^^. 
# Reference 
 https://raw.githubusercontent.com/jbrownlee/Datasets/master/daily-total-female-births.csv
 
 https://medium.com/@swethalakshmanan14/simple-ways-to-extract-features-from-date-variable-using-python-60c33e3b0501
 
 https://towardsdatascience.com/3-ways-to-extract-features-from-dates-927bd89cd5b9
 
 https://pypi.org/project/holidays/