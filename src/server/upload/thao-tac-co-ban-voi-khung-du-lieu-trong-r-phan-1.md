# Giới thiệu
R là một ngôn ngữ lập trình bậc cao, nó được tạo ra với mục đích dành cho các công việc phân tích dữ liệu, thống kê và học máy. Tôi gọi R là "Super Excel" và nó còn hơn thế nữa.
Nếu bạn là người mới tìm hiểu về ngôn ngữ R, đây là bài dành cho bạn. Hãy bắt đầu với những thao tác dữ với dữ liệu cơ bản nhất.

# Khởi tạo khung dữ liệu
khung dữ liệu (data frame) là một cấu trúc dữ liệu dạng bảng giống như excel.

Đầu tiên hãy tạo một khung dữ liệu (data frame) sau đó chúng ta sẽ thực hành trên khung dữ liệu này.

```r

id <- c(1, 2, 3, 4, 5, 6)
name <- c('Hien', 'Thu', 'Hung', 'Ngoc', 'Duong', 'Xuyen')
gender <- c('F', 'F', 'M', 'F', 'M', 'F')
date_of_birth <- c('11/3/1998', '21/2/1998', '12/7/1998', '30/5/1998', '23/2/1997', '15/1/2999')
math <- c(8, 7.5, 8.6, 9.25, 6, 7)
literature <- c(9, 6, 4.9, 6.6, 7.1, 8)
english <- c(7, 7.4, 5.9, 8.2, 5.5, 9)

students <- data.frame(id, name, gender, date_of_birth, math, literature, english)

students # hiển thị dữ liệu
```
kết quả được khung dữ liệu có tên ```students```:

![image.png](https://images.viblo.asia/6d11447a-1be1-45a8-bb15-2a5350f5c801.png)

Data frame có cấu trúc giống bảng tính gồm các quan sát (observation) và các biến (variable), ở đây tôi sẽ dùng thuật ngữ "quan sát" đại diện cho một dòng và "biến" đại diện cho cột.

trong R hàm hàm ```c()``` tạo ra một cấu trúc dữ liệu có tên là vector, bạn có thể tưởng tượng vector giống như mảng trong các ngôn ngữ lập trình khác như Java, C, C++...

Hàm ```data.frame()``` tạo ra một khung dữ liệu có các cột là các vector truyền vào.

### *! lưu ý:*

Dấu "." trong hàm ```data.frame()``` không giống như các ngôn ngữ lập trình khác, nó đơn giản chỉ là một ký tự. Có thể tác giả của hàm đó đã đặt tên là ```data_frame()``` hoặc  ```dataFrame()``` nhưng họ đã không làm vậy, và chúng ta đã có môt hàm với tên gọi  ```data.frame()```.

# Thao tác với khung dữ liệu
## Tạo ra biến mới trong khung dữ liệu
Bạn có thể tạo ra một vector từ các vector khác và toán tử
```r
mean_score <- (math + literature + english) / 3
mean_score 
# kết quả là: 8.000000 6.966667 6.466667 8.016667 6.200000 8.000000
```

Hoặc nếu có sẵn dữ liệu trong data frame, bạn có thể thao tác giữa các biến
```r
mean_score <- (students$math + students$literature + students$english) / 3
mean_score 
# kết quả là: 8.000000 6.966667 6.466667 8.016667 6.200000 8.000000
```

Hoặc bạn có thể vừa thao tác với dữ liệu và tạo ra biến mới trong data frame
```r
students$mean_score <- (students$math + students$literature + students$english) / 3
students # hiển thị dữ liệu
```

![image.png](https://images.viblo.asia/14db1eed-b0b8-4fe0-8e46-05a8f13050b8.png)

### Thay đổi giá trị trong khung dữ liệu
Ồ bạn Xuyen sinh ngày '15/1/2999', có vẻ đó là ngày '15/1/1999', chúng ta nên đặt lại giá trị cho dữ liệu này
```r
students$date_of_birth[students$name=='Xuyen'] <- '15/1/1999'
```

### Hãy tạo ra thêm một biến học lực
```r
students$academi[students$mean_score >= 8] <- 'Gioi'
students$academi[students$mean_score < 8 & students$mean_score >= 6] <- 'Kha'
students$academi[students$mean_score < 6] <- 'TB va Yeu'

students
```

![image.png](https://images.viblo.asia/bc67a433-b6c8-4fa4-a44b-568c81d6fbaf.png)

Tôi có thể viết lại đoạn code trên bằng cách khác (hơi nâng cao xíu, bạn có thể tham khảo hoặc không).
```r
within(students, {
  academi <- NA
  academi[students$mean_score >= 8] <- 'Gioi'
  academi[students$mean_score < 8 & students$mean_score >= 6] <- 'Kha'
  academi[students$mean_score < 6] <- 'TB va Yeu'
})

students
```
# Kiểu dữ liệu ngày tháng
có vẻ dữ liệu trong biến ```date_of_birth``` của chúng ta không phải kiểu dữ liệu date, nó đang được lưu dưới dạng chuỗi (string), điều đó có thể không tốt lắm cho sau này. Nếu chúng ta thường xuyên thao tác với biến  ```date_of_birth```, ta nên chuyển nó sang định dạng kiểu dữ liệu date. Điều đó thực hiện bằng câu lệnh dưới đây:
```r
students$date_of_birth <- as.Date(students$date_of_birth, '%d/%m/%Y')

students
```

![image.png](https://images.viblo.asia/1dc18a7b-5446-406b-847f-179b3f60ae7e.png)

**Hãy cùng tìm hiểu rõ hơn R chuyển đổi định dạng sang kiểu dữ liệu date như thế nào.<br>**
Định dạng mặc định của kiểu dữ liệu date là "yyyy-mm-dd", ví dụ R sẽ hiểu được câu lệnh sau:
```r
as.Date('2022-04-18')
```
Tuy nhiên nếu định dạng khác (ví dụ như trong dữ liệu của chúng ta) ta phải giải trình cho R hiểu bằng cách truyền vào định dạng trong hàm ```as.Date()``` ví dụ:
```r
as.Date('18/4/2022', '%d/%m/%Y')
```
hoặc
```r
as.Date('18-4-22', '%d-%m-%y')
```

Các định dạng ngày tháng được quy định trong bảng sau:


| Cú pháp | Ý nghĩa |Ví dụ |
| -------- | -------- | -------- |
| %d     | Ngày (từ 1 đến 31)     | 31     |
|%a      | Thứ trong tuần (viết tắt)| Mon|
|%A      | Thứ trong tuần | Monday|
|%m   | Tháng (từ 1 đến 12| 12|
|%b | Tên của tháng (viết tắt| Jun|
|%B | Tên của tháng | June|
|%y | Năm (hai số cuối) | 09
|%Y| Năm (bốn số)| 2009|
<br><br><br>
Các hàm cơ bản khác với khung dữ liệu: ```with()```, ```names()```, ```is.na()```, ```na.omit()```