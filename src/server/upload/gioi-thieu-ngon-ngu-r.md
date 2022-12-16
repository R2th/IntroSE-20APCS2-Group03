R là một ngôn ngữ lập trình và môi trường thường được sử dụng trong tính toán thống kê, phân tích dữ liệu và nghiên cứu khoa học. Đây là một trong những ngôn ngữ phổ biến dùng cho thu thập, làm sạch, phân tích, biểu đồ hóa và biểu diễn dữ liệu. Nhờ vào giao diện dễ sử dụng và cú pháp dễ hiểu, R trở nên phổ biến nhanh trong những năm gần đây.

## 1. Tại sao ngôn ngữ R lại phổ biến?
* Thứ nhất, R là open source và hoàn toàn miễn phí. Bạn có thể download miễn phí và đọc code để xem cách nó hoạt động. Thêm vào đó, hầu hết các package của R cũng vậy, sẵn sàng cho bạn sử dụng thậm chí trong các phần mềm thương mại.

* Thứ hai, cộng đồng người sử dụng R tăng liên tục. Năm 2016, R được đánh giá là ngôn ngữ phổ biến thứ 5, thậm chí xếp cao hơn cả C#. Đây thực sự là một thành tựu lớn đối với một ngôn ngữ đặc thù (domain-specific) như vậy. Điều này cũng chứng tỏ sự phát triển mạnh mẽ của ngành Khoa học dữ liệu và Học máy, những nơi sử dụng R nhiều nhất.

* Thứ ba, R có thể chạy trên mọi nền tảng: Window, Linux và Mac. Sourcecode R có thể mang sang các nền tảng khác mà không gặp vấn đề gì, đây thực sự là tính năng quan trọng trong thế giới lập trình hiện nay.

* Thứ tư, R đang được sử dụng bởi các gã khổng lồ công nghệ, điều này chứng tỏ tiềm năng hứa hẹn của nó. Ngày nay, mọi quyết định quan trọng đều dựa trên kết quả phân tích số liệu, có thể kể ra một số công ty sử dụng R để phân tích ra quyết định dựa trên đặc tính đơn giản và mạnh mẽ của nó, điển hình như Twitter, Ford, Google hay Microsoft. Sử dụng R, bạn đang đứng trên vai những người khổng lồ.

## 2. Vậy học R dễ hay khó?
Rất khó để trả lời câu hỏi này. Rất nhiều nhà nghiên cứu học R để giải quyết các vấn đề về phân tích dữ liệu của mình.
Sức mạnh của R nằm ở chỗ, nó đủ đơn giản để học. Tất cả những gì bạn cần là dữ liệu và ý định rõ ràng để đưa ra kết luận dựa trên phân tích về dữ liệu đó. Thực tế là R được xây dựng trên nền tảng ngôn ngữ S – ngôn ngữ vốn được thiết kế như ngôn ngữ lập trình để giúp sinh viên học lập trình trong lúc thao tác với dữ liệu. 

Tuy vậy, những lập trình viên đã quen thuộc với Python, PHP hay Java có thể cảm thấy kỳ quặc và bối rối lúc ban đầu, vì R sử dụng cú pháp hơi khác với các ngôn ngữ lập trình khác. Mặc dù R có đủ chức năng như một ngôn ngữ lập trình, bạn sẽ không phải viết quá nhiều điều kiện hoặc vòng lặp khi viết code. Các cấu trúc cơ bản của R như vector, list, frame, data table, matrix,.. cho phép bạn xử lý dữ liệu theo lô.

## 3. Ứng dụng thực tế của R
* Data Science: Trong thời đại IoT, các thiết bị tạo ra hàng terabyte dữ liệu có thể sử dụng để hỗ trợ ra quyết định, khoa học dữ liệu không có cách nào khác là phải tiến lên. Ngôn ngữ R cho các nhà khoa học dữ liệu một công cụ mạnh mẽ để thu thập dữ liệu thời gian thực, đồng thời thực hiện phân tích thống kê và dự báo, tạo ra các kết quả trực quan dễ hiểu.

* Tính toán thống kê: R là ngôn ngữ phổ biến nhất trong cộng đồng các nhà thống kê, với một kho package khổng lồ chứa gần 10000 package đáp ứng mọi phép tính thống kê bạn có thể nghĩ ra. Cú pháp đặc biệt của R cho phép các nhà thống kê, kể cả những người không có nền tảng khoa học máy tính, cũng có thể nhanh chóng import, làm sạch và phân tích dữ liệu từ nhiều nguồn khác nhau, vẽ biểu đồ từ bất cứ dataset nào.

* Học máy (Machine Learning): R cũng có nhiều package thực hiện các thao tác machine learning như hồi quy tuyến tính, phi tuyến tính, cây quyết định, … R còn được sử dụng để cài đặt các thuật toán trong lĩnh vực tài chính, nghiên cứu di truyền, marketing hay chăm sóc sức khỏe.

## 4. Lập trình với R
R có 5 lớp đối tượng (object) cơ bản (nguyên tố). Mọi thứ bạn thấy trong R đều là 1 đối tượng. 1 vector, ma trận, data frame hay thậm chí 1 biến cũng được coi là 1 đối tượng. 5 lớp đối tượng này là:

* Character
* Numeric (Real Numbers)
* Integer (Whole Numbers)
* Complex
* Logical (True / False)

Mỗi lớp lại có các thuộc tính, có thể view bằng hàm attributes(), bao gồm:
* Tên, tên dimension
* Các dimension
* Lớp
* Độ dài
Đối tượng cơ bản nhất của R là vector, khởi tạo 1 vector rỗng bằng vector(). 1 vector chứa các đối tượng thuộc cùng 1 lớp. 
Lấy ví dụ, chúng ta tạo ra các vector chứa đối tượng thuộc các lớp khác nhau, sử dụng hàm c() hoặc command hư sau:

```
> a <- c(1.8, 4.5)   #numeric
> b <- c(1 + 2i, 3 - 6i) #complex
> d <- c(23, 44)   #integer
> e <- vector("logical", length = 5)
```

### 4.1 Các loại dữ liệu trong R
Có nhiều loại dữ liệu được sử dụng trong R, như vector, ma trận, data frame và list.
* Vector

Như đã nói trên, vector chứa các đối tượng thuộc cùng 1 lớp. Nhưng bạn có thể trộn các đối tượng thuộc các lớp khác, khi đó sẽ cần cưỡng chế. Các đối tượng của lớp khác sẽ được convert về chung 1 lớp.
```
> qt <- c("Time", 24, "October", TRUE, 3.33)  #character
> ab <- c(TRUE, 24) #numeric
> cd <- c(2.5, "May") #character
```
Để kiểm tra lớp của 1 đối tượng, dùng hàm (“vector name”):
```
> class(qt)
 "character"
```
Để đổi lớp cho 1 vector, dùng hàm as.
```
> bar <- 0:5
> class(bar)
> "integer"
> as.numeric(bar)
> class(bar)
> "numeric"
> as.character(bar)
> class(bar)
> "character"
```
Tương tự, bạn có thể đối lớp cho bất kỳ vector nào. Tuy nhiên, cần chú ý, khi convert dữ liệu kiểu “character” sang “numeric”, sẽ thành các mising values.

* List
List là một loại vector đặc biệt mà chứa các thành phần có kiểu dữ liệu khác nhau.
```
> my_list <- list(22, "ab", TRUE, 1 + 2i)
> my_list
[[1]]
[1] 22
[[2]]
[1] "ab"
[[3]]
[1] TRUE
[[4]]
[1] 1+2i
```
Biểu diễn của 1 list cũng khác vector, bới vì, tất cả các đối tượng đều có kiểu dữ liệu khác nhau. 2 dấu ngoặc vuông  [[1]]  thể hiện index của thành phần, bạn có thể lấy ra dữ liệu bằng index của chung.
```
> my_list[[3]]
> [1] TRUE
```
Nếu thay 2 dấu ngoặc vuông thành 1, ta sẽ nhận được elemet cùng với index của nó.
```
> my_list[3]
> [[1]]
  [1] TRUE
```

* Ma trận

Khi một vector được sử dùng với dòng và cột, nó trở thành ma trận.
```
> my_matrix <- matrix(1:6, nrow=3, ncol=2)
> my_matrix
[,1] [,2]
[1,] 1 4
[2,] 2 5
[3,] 3 6

> dim(my_matrix)
[1] 3 2
> attributes(my_matrix)
$dim
[1] 3 2
```
Như vậy, có thể xem các dimensions của 1 ma trận bằng lệnh dim() hoặc attributes(). Để lấy ra một thành phần nhất định từ ma trận, có thể  làm như sau:
```
> my_matrix[,2]   #extracts second column
> my_matrix[,1]   #extracts first column
> my_matrix[2,]   #extracts second row
> my_matrix[1,]   #extracts first row
```
Ngoài ra, có thể tạo nên ma trận từ vector bằng cách gán thêm dimension dim().

```
> age <- c(23, 44, 15, 12, 31, 16)
> age
[1] 23 44 15 12 31 16

> dim(age) <- c(2,3)
> age
[,1] [,2] [,3]
[1,] 23 15 31
[2,] 44 12 16
> class(age)
[1] "matrix"
```
Cũng có thể join 2 vector với nhau, sử dụng hàm cbind() and rbind(). Cần đảm bảo 2 vector có số thành phần bằng nhau, nếu không sẽ sinh ra NA.

```
> x <- c(1, 2, 3, 4, 5, 6)
> y <- c(20, 30, 40, 50, 60)
> cbind(x, y)
> cbind(x, y)
x    y
[1,] 1 20
[2,] 2 30
[3,] 3 40
[4,] 4 50
[5,] 5 60
[6,] 6 70
> class(cbind(x, y))
[1] “matrix”
```

* Data frame

Đây là loại được sử dụng nhiều nhất trong các loại dữ liệu, được dùng để lưu trữ tabular data. Không giống như trong ma trận, nơi mọi thành phần phải thuộc cùng 1 class, data frame có thể chứa 1 list các vectors chứa các lớp khác nhau. Nghĩa là, mỗi cột của 1 data frame hành xử như 1 list.

```
> df <- data.frame(name = c("ash","jane","paul","mark"), score = c(67,56,87,91))
> df
name score
1 ash 67
2 jane 56
3 paul 87
4 mark 91

> dim(df)
[1] 4 2

> str(df)
'data.frame': 4 obs. of 2 variables:
$ name : Factor w/ 4 levels "ash","jane","mark",..: 1 2 4 3
$ score: num 67 56 87 91

> nrow(df)
[1] 4

> ncol(df)
[1] 2
```

Trong đoạn trên, df là tên của data framw, dim() trả về sô dimension của data frame: 4 dòng và 2 cột. str() trả về cấu trúc của df, ví dụ như danh sách biến lưu trong df. Nrow() và ncol() trả về số dòng và sổ cột của data set.

* Continuous variables

Continuous variables có thể ở bất cứ dạng nào, như 1, 2, 3.5, 4.66,..

* Categorical variables 

Categorical variables chỉ chứa các giá trị rời rạc như 2, 5, 11, 15,.. Trong R, categorical variables được biểu diễn bởi factors. 

* Missing values.

Đây là một trong những vấn đề quan trọng nhất trong mô hình dự đoán. Bạn cần phải biết các kỹ thuật để xử lý chúng.
Missing values được thể hiện bằng NA hoặc NaN. Ví dụ sau đây kiểm tra xem data set có chứa missing values không, sử dụng cùng Dataframe như trên.

```
> df[1:2,2] <- NA #injecting NA at 1st, 2nd row and 2nd column of df 
> df
name score
1 ash NA
2 jane NA
3 paul 87
4 mark 91

> is.na(df) #checks the entire data set for NAs and return logical output
name score
[1,] FALSE TRUE
[2,] FALSE TRUE
[3,] FALSE FALSE
[4,] FALSE FALSE
> table(is.na(df)) #returns a table of logical output
FALSE TRUE 
6      2

> df[!complete.cases(df),] #returns the list of rows having missing values
name  score
1 ash  NA
2 jane NA
```
Missing values cản trở các phép tính thông thường trên tập dữ liệu. Ví dụ như, phép tính trung bình sẽ không thực hiện được khi có 2 missing values.

```
mean(df$score)
[1] NA
> mean(df$score, na.rm = TRUE)
[1] 89
```

Tham số na.rm = TRUE bỏ qua các NA và tính trung bình của các giá trị còn lại trong cột. Để loại bỏ các dòng có giá trị NA trong data frame, có thể dùng na.omit:

```
> new_df <- na.omit(df)
> new_df
name score
3 paul 87
4 mark 91
```

### 4.2 Cấu trúc trong R

* if, else

Cú pháp:
```
if (<condition>){
         ##do something
} else {
         ##do something
}
```
Ví dụ:
```
#initialize a variable
N <- 10
#check if this variable * 5 is > 40
if (N * 5 > 40){
       print("This is easy!")
} else {
       print ("It's not easy!")
}
[1] "This is easy!"
```

* for: vòng lặp. Thường dùng khi duyệt qua các thành phần của list, vector.

```
for (<search condition>){
          #do something
	}
```
Ví dụ:
```
#initialize a vector
y <- c(99,45,34,65,76,23)
#print the first 4 numbers of this vector
for(i in 1:4){
     print (y[i])
}
[1] 99
[1] 45
[1] 34
[1] 65
```

* while : bắt đầu bằng bước kiểm tra điều kiện, thực thi chỉ khi điều kiện đúng.

```
#initialize a condition
Age <- 12
#check if age is less than 17
while(Age < 17){
         print(Age)
         Age <- Age + 1 #Once the loop is executed, this code breaks the loop
}
[1] 12
[1] 13
[1] 14
[1] 15
[1] 16
```

Ngoài ra còn một số cấu trúc thường dùng khác, như repeat, break, next, return,...

### 4.3 Các package R hữu ích

Có hàng nghìn package trong thư viện của R, dưới đây sẽ liệt kê một số package có thể coi là mạnh nhất và thường sử dung nhất trong mô hình dự đoán.

*  Importing Data: xử lý dữ liệu ở mọi loại format: txt, csv, .. Để import nhanh 1 khối lượng dữ liệu lớn, nên cài đặt và sử dụng data.table, readr, RMySQL, sqldf, jsonlite.

* Data Visualization: R có thể tạo các biểu đồ đơn giản nhanh chóng. Tuy nhiên, để vẽ các biểu đồ phức tạp hơn, bạn nên cài ggplot2.

* Data Manipulation: R có nhiều package giúp bạn thực hiện công việc đơn giản cũng như phức tạp, như dplyr, plyr, tidyr, lubridate, stringr.

* Modeling / Machine Learning: để mô hình hóa, package caret là đủ mạnh để đáp ứng mọi nhu cầu khi xây dựng mô hình học máy. Bạn cũng nên cài thêm các package giải thuật như  randomForest, rpart, gbm,...

## Tài liệu tham khảo
* [Analyticsvidhya - A Complete Tutorial to Learn Data Science in R from Scratch](https://www.analyticsvidhya.com/blog/2016/02/complete-tutorial-learn-data-science-scratch/)
* [Datamento - Learn R programming](https://www.datamentor.io/r-programming/)