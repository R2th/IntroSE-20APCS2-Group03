# Giới thiệu
R là một ngôn ngữ lập trình bậc cao, nó được tạo ra với mục đích dành cho các công việc phân tích dữ liệu, thống kê và học máy. Tôi gọi R là "Super Excel" và nó còn hơn thế nữa.  Trong phần trước tôi đã giới thiệu một số thao tác cơ bản với khung dữ liệu (data frame) (https://viblo.asia/p/thao-tac-co-ban-voi-khung-du-lieu-trong-r-phan-1-4P856rGW5Y3). Hãy cùng tìm hiểu thêm về chủ đề này trong bài viết này.

# Thực hành trên dữ liệu nào?
R có rất nhiều tập dữ liệu cho chúng ta thực hành các câu lệnh, bạn có thể xem danh sách các tập dữ liệu sẵn có bằng hàm ```data()```. Tuy nhiên trong bài này tôi sẽ thao tác trên tập dữ liệu "titanic", mặc dù nó cũng là một tập dữ liệu khá nổi tiếng tuy nhiên không có sẵn trong R. Có nhiều cách để thêm tập dữ liệu này, dưới đây tôi sẽ cài đặt thư viện "titanic", rồi khai báo sử dụng thư viện này và sau đó chúng ta có thể sử dụng tập dữ liệu "titanic":
```r
> install.packages("titanic")
> library(titanic)
> head(titanic_train)
  PassengerId Survived Pclass                                                Name    Sex Age SibSp Parch           Ticket    Fare Cabin Embarked
1           1        0      3                             Braund, Mr. Owen Harris   male  22     1     0        A/5 21171  7.2500              S
2           2        1      1 Cumings, Mrs. John Bradley (Florence Briggs Thayer) female  38     1     0         PC 17599 71.2833   C85        C
3           3        1      3                              Heikkinen, Miss. Laina female  26     0     0 STON/O2. 3101282  7.9250              S
4           4        1      1        Futrelle, Mrs. Jacques Heath (Lily May Peel) female  35     1     0           113803 53.1000  C123        S
5           5        0      3                            Allen, Mr. William Henry   male  35     0     0           373450  8.0500              S
6           6        0      3                                    Moran, Mr. James   male  NA     0     0           330877  8.4583              Q
```
hàm ```head()``` hiển thị sáu quan sát của khung dữ liệu được truyền vào. Tương tự hàm ```head()``` là hàm ```tail()```, nó hiển thị sáu quan sát cuối cùng.

Data frame có cấu trúc giống bảng tính gồm các quan sát (observation) và các biến (variable), ở đây tôi sẽ dùng thuật ngữ "quan sát" đại diện cho một dòng và "biến" đại diện cho cột.
# Thực hành

### Truy vấn dữ liệu con
Nhu cầu phổ biến nhất trong thao tác dữ liệu là chọn ra những dữ liệu mà người phân tích quan tâm, có thể là các biến hoặc các quan sát thỏa mãn điều kiện nào đó. R là một ngôn ngữ mạnh mẽ và nó làm điều này một cách hết sức đơn giản.

**Chọn các biến**

Cú pháp chung là: ```dataframe[row indices, column indices]```, nếu muốn lấy toàn bộ các quan sát chúng sẽ để trống phần ```row indices```:
```r
> x <- titanic_train[ , 'Name']
> head(x)
[1] "Braund, Mr. Owen Harris"                            
[2] "Cumings, Mrs. John Bradley (Florence Briggs Thayer)"
[3] "Heikkinen, Miss. Laina"                             
[4] "Futrelle, Mrs. Jacques Heath (Lily May Peel)"       
[5] "Allen, Mr. William Henry"                           
[6] "Moran, Mr. James"  
```
Các câu lệnh sau sẽ làm điều tương tự với câu lệnh trên: ```titanic_train['Name']``` hoặc ```titanic_train$Name```.


 Hoặc truy vấn nhiều hơn một biến:
 ```r
 > y <- titanic_train[ , c('Name', 'Age')]
> head(y)
                                                 Name      Age
1                             Braund, Mr. Owen Harris 22.00000
2 Cumings, Mrs. John Bradley (Florence Briggs Thayer) 38.00000
3                              Heikkinen, Miss. Laina 26.00000
4        Futrelle, Mrs. Jacques Heath (Lily May Peel) 35.00000
5                            Allen, Mr. William Henry 35.00000
6                                    Moran, Mr. James 29.69912
 ```
 Tương tự, câu lệnh ```titanic_train[c('Name', 'Age')]``` cũng có ý nghĩa giống câu lệnh trên.
 
 **Lọc điều kiện**
 
 Hãy xem một ví dụ:
 ```r
 > x <- titanic_train[titanic_train$Sex=='male' & titanic_train$Age > 30, ]
> head(x)
    PassengerId Survived Pclass                        Name  Sex Age SibSp Parch   Ticket    Fare Cabin Embarked
5            5        0      3    Allen, Mr. William Henry male  35     0     0   373450  8.0500              S
7            7        0      1     McCarthy, Mr. Timothy J male  54     0     0    17463 51.8625   E46        S
14          14        0      3 Andersson, Mr. Anders Johan male  39     1     5   347082 31.2750              S
21          21        0      2        Fynney, Mr. Joseph J male  35     0     0   239865 26.0000              S
22          22        1      2       Beesley, Mr. Lawrence male  34     0     0   248698 13.0000   D56        S
31          31        0      1    Uruchurtu, Don. Manuel E male  40     0     0 PC 17601 27.7208              C
 ```
 
 Bây giờ kết hợp giữa việc lọc điều kiện và chọn ra các biến mong muốn:
 ```r
 > y <- titanic_train[titanic_train$Sex=='male' & titanic_train$Age > 30, c('Name', 'Age', 'Fare')]
> head(y)
                          Name Age    Fare
5     Allen, Mr. William Henry  35  8.0500
7      McCarthy, Mr. Timothy J  54 51.8625
14 Andersson, Mr. Anders Johan  39 31.2750
21        Fynney, Mr. Joseph J  35 26.0000
22       Beesley, Mr. Lawrence  34 13.0000
31    Uruchurtu, Don. Manuel E  40 27.7208
 ```
 
### Thống kê cơ bản

**Có bao nhiêu hành khách**

Số hành khách chính là số quan sát của khung dữ liệu:
```r
> nrow(titanic_train)
[1] 891
```
Vậy trong khung dữ liệu titanic_train có 891 quan sát tương ứng với 891 hành khách.

**Giá vé trung bình là bao nhiêu **

```r
> mean(titanic_train$Fare)
[1] 32.20421
```

**Độ tuổi trung bình**
```r
> mean(titanic_train$Age)
[1] NA
```

Trong trường hợp này R không tính được trung bình của biến "Age". Câu hỏi là tại sao lại như vậy ? Là do trong biến này có giá trị chưa xác định (missing value), vì vậy chúng ta sẽ không tính toán với các quan sát chứa missing value.
```r
> mean(titanic_train$Age, na.rm=TRUE)
[1] 29.69912
```

Nhân tiện tôi đã kiểm tra có 177 quan sát xảy ra missing value với biến "Age":
```r
> sum(is.na(titanic_train$Age))
[1] 177
```

### Missing values
Để kiểm tra missing value ta sử dụng hàm ```is.na()``` :
```r
> x <- c('a', 'b', NA, 'd', 'e', NA)
> is.na(x)
[1] FALSE FALSE  TRUE FALSE FALSE  TRUE
```
Bạn hãy tự thử với câu lệnh ```is.na(titanic_train)```. Thậm chí ta có thể truyền cả một khung dữ liệu vào hàm ```is.na()```. R thật là "mạnh" !

Bây giờ hãy "lấp các khoảng trống", Một số mô hình học máy không hoạt động được nếu có missing value trong khung dữ liệu, chúng ta sẽ thay các giá trị missing value trong biến "Age" bằng giá trị trung bình của chính nó:
```r
> age.mean = mean(titanic_train$Age, na.rm=TRUE)
> titanic_train$Age[is.na(titanic_train$Age)] = age.mean
```

### Sắp xếp dữ liệu
Tôi có một câu hỏi: "Số phận của những người trả vé cao hoặc thấp cho chuyến đi đã ra sao?". Để trả lời câu hỏi này, tôi sẽ sắp xếp dữ liệu theo biến "Fare" (giá vé)

```r
> new.data = titanic_train[order(titanic_train$Fare), ]
> head(new.data)
    PassengerId Survived Pclass                            Name  Sex      Age SibSp Parch Ticket Fare Cabin Embarked
180         180        0      3             Leonard, Mr. Lionel male 36.00000     0     0   LINE    0              S
264         264        0      1           Harrison, Mr. William male 40.00000     0     0 112059    0   B94        S
272         272        1      3    Tornquist, Mr. William Henry male 25.00000     0     0   LINE    0              S
278         278        0      2     Parkes, Mr. Francis "Frank" male 29.69912     0     0 239853    0              S
303         303        0      3 Johnson, Mr. William Cahoone Jr male 19.00000     0     0   LINE    0              S
414         414        0      2  Cunningham, Mr. Alfred Fleming male 29.69912     0     0 239853    0              S
```
Thứ tự sắp xếp mặc định là tăng dần, vì vậy ở câu lệnh trên chúng ta đã quan sát thấy sáu hành khách có giá vé thấp nhất. Còn những người trả vé cao nhất thì sao:
```r
> new.data2 = titanic_train[order(-titanic_train$Fare), ]
> head(new.data2)
    PassengerId Survived Pclass                               Name    Sex Age SibSp Parch   Ticket     Fare       Cabin Embarked
259         259        1      1                   Ward, Miss. Anna female  35     0     0 PC 17755 512.3292                    C
680         680        1      1 Cardeza, Mr. Thomas Drake Martinez   male  36     0     1 PC 17755 512.3292 B51 B53 B55        C
738         738        1      1             Lesurer, Mr. Gustave J   male  35     0     0 PC 17755 512.3292        B101        C
28           28        0      1     Fortune, Mr. Charles Alexander   male  19     3     2    19950 263.0000 C23 C25 C27        S
89           89        1      1         Fortune, Miss. Mabel Helen female  23     3     2    19950 263.0000 C23 C25 C27        S
342         342        1      1     Fortune, Miss. Alice Elizabeth female  24     3     2    19950 263.0000 C23 C25 C27        S
```

Thật đơn giản đến bất ngờ, hầu như không có sư khác nhau giữa hai đoạn code trên, sự khác biệt duy nhất là tôi đã thêm dấu "trừ" trong hàm ```order(-titanic_train$Fare)```.
Bạn hãy tự đưa ra nhận xét của mình: những người trả tiền cao thì sao, những người trả tiền thấp nhất thì sao?

###