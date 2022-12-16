## Lời dẫn đầu
Trong quá trình tìm hiểu thư viện Pandas ứng dụng để giải quyết các bài toán liên quan đến Time series, mình nhận thấy có một số hàm cơ bản cần thiết và mình xin được chia sẻ một số điều tổng kết được của bản thân được rút ra từ khóa học trên udemy. Đây chỉ là một số hàm cơ bản và chủ quan mình thấy phổ biến nên rất cần sự đóng góp và bổ sung thêm từ các anh chị và các bạn trong Cộng đồng ạ. Cách triển khai nội dung và cách sử dụng hàm trong Pandas được tóm lược theo từng trường hợp tức là từng dạng câu hỏi khác nhau.
![Pandas](https://miro.medium.com/max/481/1*cxfqR8NAj8HGal8CVOZ7hg.png)
***
## Nội dung
### Một số hàm Pandas cơ bản 
#### Sử dụng thư viện Pandas bằng câu lệnh nào?
```
import pandas as pd
```
#### Sử dụng hàm nào trong pandas để đọc file csv?
```
pandas.read_csv(<file_csv_path>)
``` 
Ví dụ: 
```
df = pandas.read_csv('test.csv')
```
Tương tự, pandas cũng có hỗ trợ đọc các file ở dạng extension khác nhau như excel, html... Các bạn có thể tìm hiểu nâng cao thêm về phần này theo key-word **Pandas IO**. \
*Lưu ý:* Có thể sử dụng `pwd` để kiểm tra vị trí thư mục hiện tại. 
#### Hiển thị các dòng dữ liệu trong dataframe từ pandas như thế nào?
```
df.head()
```
Mặc định, hàm head() sẽ trả về 5 dòng đầu tiên trong dataframe, tuy nhiên mình có thể điều chỉnh số lượng dòng trả về bằng cách truyền vào một số nguyên dương trong hàm head()
#### Hiển thị một số thông tin từ dataframe trong pandas?
 1. Hàm cho biết thông tin của dataframe:
```
df.info()
```
2. Hàm mô tả về dataframe bao gồm độ lệch chuẩn, phương sai, phân vị, trung bình của từng cột (tương ứng với từng trường)
```
df.describe()
```
#### Lấy tên columns - tên trường trong dataframe?
```
df.columns
```
#### Làm thế nào để lọc ra danh sách các giá trị từng cột và các giá trị không trùng với nhau?
```
df['<tên một trường>'].unique()
```
Ví dụ:
```
df['test'].unique()
```
#### Làm thế nào để lấy được số lượng của danh sách các giá trị của một cột cụ thể?
```
df['<tên một trường>'].nunique()
```
Ví dụ:
```
df['test'].nunique()
```
#### Làm thế nào để đếm số lần xuất hiện của từng giá trị tại một trường của dataframe?
```
df['<tên một trường>'].value_counts().head(5)
# hàm head() chỉ hỗ trợ hiển thị kết quả.
```
#### Làm thế nào để sắp xếp và lọc ra top x trong dataframe? 
```
df.sort_values(by = '<tên trường cần sắp xếp>', ascending = False).head(10)
# cần lưu ý phải có tham số `ascending = False` để quá trình sắp xếp diễn ra và trường hợp này đang lấy top 10 
```
#### Làm thế nào để lọc ra top x trong dataframe và các thông tin này cần nhóm lại?
Giải pháp cho vấn đề này là: Kết hợp giữa hàm groupby và hàm sort_values
```
df.groupby(by = '<tên trường cần nhóm>').sum().sort_values(by = '<tên trường cần sắp xếp>', ascending = False).head()
```
#### So sánh điều kiện đối với dataFrame và cho biết số dòng thỏa điều kiện
Cách 1: Toán tử `>=` chỉ phục vụ cho ví dụ bên dưới, có thể sử dụng nhiều biểu thức điều kiện khác như `< > <= >= == !=`...
```
len(df[df['<tên trường>'].apply(lambda <tên trường alias>: <tên trường alias> >= <conditional thresh>)])
# Ví dụ: Cho biết số lượng dòng thỏa điều kiện, giá trị của các dòng test nhỏ hơn 2000
len(df[df['test'].apply(lambda field: field < 2000 )])
```
Cách 2 và mình thấy rất cool 😄:
```
sum(df['<tên trường>'] >= <conditional thresh>)
# Ví dụ: Cho biết số lượng dòng thỏa điều kiện, giá trị của các dòng test nhỏ hơn 2000
sum(df['test] < 2000)
```
Một ví dụ khác như lọc từng thành phố để kiểm tra những thành phố không có dòng chữ 'County': \
`sum(data['County'].apply(lambda string: 'County' not in string))`
#### Một số hàm khác
Còn rất nhiều hàm thú vị khác trong Pandas. Các bạn có thể tìm hiểu thêm về nó tại series rất thú vị về Pandas của anh SF Raze [Series Pandas DataFrame](https://viblo.asia/p/series-pandas-dataframe-phan-tich-du-lieu-cung-pandas-phan-1-bWrZny7OKxw)
***
## Lời cảm ơn
Cảm ơn mọi người đã ủng hộ. 
## Tài liệu tham khảo
1. https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html
2. https://www.udemy.com/course/python-for-time-series-data-analysis/\
3. https://youtu.be/B67x_p-slYc