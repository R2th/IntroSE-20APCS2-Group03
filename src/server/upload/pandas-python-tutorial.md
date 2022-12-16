Thư viện pandas python là gì? Nó có thể giúp bạn những gì và làm sao để sử dụng thư viện pandas này trong lập trình python. Hãy cùng [Lập trình không khó](http://nguyenvanhieu.vn) đi tìm câu trả lời cho các câu hỏi trên trong bài viết ngày hôm nay. Tôi tin rằng đây là một bài viết cực kỳ hữu ích. Nó chắc chắn sẽ đem lại cho các bạn nhiều kiến thức bổ ích và làm chủ được cách sử dụng thư viện này.

Toàn bộ source code hướng dẫn của bài học bạn có thể xem và tải về [tại đây](https://github.com/Hieunv1996/nguyenvanhieu.vn/blob/master/python-tutorial/pandas_tutorial.ipynb).

## Thư viện pandas là gì?
Thư viện pandas trong python là một thư viện mã nguồn mở, hỗ trợ đắc lực trong thao tác dữ liệu. Đây cũng là bộ công cụ phân tích và xử lý dữ liệu mạnh mẽ của ngôn ngữ lập trình python. Thư viện này được sử dụng rộng rãi trong cả nghiên cứu lẫn phát triển các ứng dụng về khoa học dữ liệu. Thư viện này sử dụng một cấu trúc dữ liệu riêng là Dataframe. Pandas cung cấp rất nhiều chức năng xử lý và làm việc trên cấu trúc dữ liệu này. Chính sự linh hoạt và hiệu quả đã khiến cho pandas được sử dụng rộng rãi.

**Tại sao sử dụng thư viện pandas?**
- DataFrame đem lại sự linh hoạt và hiệu quả trong thao tác dữ liệu và lập chỉ mục;
- Là một công cụ cho phép đọc/ ghi dữ liệu giữa bộ nhớ và nhiều định dạng file: csv, text, excel, sql database, hdf5;
- Liên kết dữ liệu thông minh, xử lý được trường hợp dữ liệu bị thiếu. Tự động đưa dữ liệu lộn xộn về dạng có cấu trúc;
- Dễ dàng thay đổi bố cục của dữ liệu;
- Tích hợp cơ chế trượt, lập chỉ mục, lấy ra tập con từ tập dữ liệu lớn.
- Có thể thêm, xóa các cột dữ liệu;
- Tập hợp hoặc thay đổi dữ liệu với group by cho phép bạn thực hiện các toán tử trên tập dữ liệu;
- Hiệu quả cao trong trộn và kết hợp các tập dữ liệu;
- Lập chỉ mục theo các chiều của dữ liệu giúp thao tác giữa dữ liệu cao chiều và dữ liệu thấp chiều;
- Tối ưu về hiệu năng;
- Pandas được sử dụng rộng rãi trong cả học thuật và thương mại. Bao gồm thống kê, thương mại, phân tích, quảng cáo,…

## Cài đặt Pandas

Để cài đặt thư viện Pandas, bạn có thể làm theo một số cách khác nhau theo [tài liệu hướng dẫn](https://pandas.pydata.org/pandas-docs/stable/install.html):

1. Sử dụng pip:
`pip install pandas`
2. Sử dụng conda:
`conda install pandas`


Bây giờ chúng ta sẽ bắt đầu học cách sử dụng thư viện pandas python. Nhưng trước khi bắt đầu, hãy import thư viện pandas nhé. Chúng ta sẽ dùng cả thư viện matplotlib nữa.

Nếu bạn chưa biết về thư viện matplotlib, hãy đọc [bài viết này](https://nguyenvanhieu.vn/khoa-hoc-lap-trinh-python/#Matplotlib) trước nhé.

```python
# Render our plots inline
%matplotlib inline
 
import pandas as pd
import matplotlib.pyplot as plt
import random
```

## Đọc file csv sử dụng thư viện pandas
Bạn có thể dễ dàng đọc vào một file .csv bằng cách sử dụng hàm `read_csv` và được trả về 1 dataframe. Mặc định, hàm này sẽ phân biệt các trường của file csv theo dấu phẩy. Cách đọc hết sức đơn giản như sau:
```python
peoples_df = pd.read_csv('./people.csv')
```
Bạn có thể in ra n bản ghi đầu tiên của dataframe sử dụng hàm `head`. Ngược lại của hàm `head` là hàm `tail`
```python
peoples_df.head(5)
```
Kết quả in ra như sau:
![](https://images.viblo.asia/723aadc2-9227-4b45-8f30-d99aeb8521f6.png)

Tuy nhiên, bạn cũng sẽ phải lưu ý một vài tham số của hàm `read_csv` như:

* *encoding*: chỉ định encoding của file đọc vào. Mặc định là utf-8.
* *sep*: thay đổi dấu ngăn cách giữa các cột. Mặc định là dấu phẩy (‘,’)
* *header*: chỉ định file đọc vào có header(tiêu đề của các cột) hay không. Mặc định là infer.
* *index_col*: chỉ định chỉ số cột nào là cột chỉ số(số thứ tự). Mặc định là None.
* *n_rows*: chỉ định số bản ghi sẽ đọc vào. Mặc định là None – đọc toàn bộ.

Ví dụ:
```python
peoples_df = pd.read_csv('./people.csv', encoding='utf-8', header=None, sep=',')
peoples_df.head(5)
```

Khi tôi chỉ định không có header, dòng header của chúng ta đã biến thành 1 bản ghi dữ liệu:
![](https://images.viblo.asia/0a3f89e1-2b11-47c5-bafb-62293386a59c.png)

Bạn đọc có thể xem mô tả đầy đủ từng tham số của hàm `read_csv` của thư viện pandas python [ tại đây](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_csv.html).

## Thao tác với dataframe trong pandas

### Xem thông tin của dataframe

Bạn có thể xem thông tin của dataframe vừa đọc vào bằng cách sử dụng hàm `.info()` hoặc xem kích thước của dataframe này với thuộc tính `shape`. Cụ thể như sau:

```
# Xem chiều dài của df, tương đương shape[0]
print('Len:', len(peoples_df))
# Xem thông tin dataframe vừa đọc được
peoples_df.info()
# Xem kích thước của dataframe
print('Shape:', peoples_df.shape)
```
Và kết quả thu được là:

```
Len: 40
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 40 entries, 0 to 39
Data columns (total 11 columns):
person_ID    40 non-null int64
name         40 non-null object
first        40 non-null object
last         40 non-null object
middle       15 non-null object
email        40 non-null object
phone        40 non-null object
fax          40 non-null object
title        40 non-null object
age          40 non-null int64
is_young     40 non-null bool
dtypes: bool(1), int64(2), object(8)
memory usage: 3.2+ KB
Shape: (40, 11)
```

### Truy xuất dữ liệu trên dataframe
**Lấy 1 cột theo tên cột**

Để chỉ định cột muốn lấy, bạn chỉ cần truyền vào tên cột như sau:

```
peoples_df['name']
```
![](https://images.viblo.asia/64868f2b-0d01-44f8-8603-51644d692a31.png)

**Lấy theo nhiều cột**

Thay vì truyền vào 1 string thì hãy truyền vào 1 list các tên cột. Mình thêm `.head(5)` để chỉ in ra 5 bản ghi đầu tiên cho ngắn, mặc định sẽ lấy hết.

```
peoples_df[['name', 'age']].head(5)
```
![](https://images.viblo.asia/43831f21-b3c6-4adc-b558-2a5e5198cb54.png)

**Lấy bản ghi theo chỉ số**

Để lấy một hoặc nhiều bản ghi liên tiếp trong dataframe, sử dụng cơ chế trượt theo chỉ số giống như trên list trong python. Lấy 5 bản ghi đầu tiên:

```
peoples_df[0:5]
```
Trong trường hợp này kết quả giống như hàm head phía trên. Đều là lấy 5 bản ghi đầu tiên.

![](https://images.viblo.asia/95b9a125-de3f-49e0-8ab0-d6aedb7b33b4.png)

Bạn cũng có thể kết hợp lấy theo hàng và cột mong muốn:

```
peoples_df[['name', 'age']][:5]
```
![](https://images.viblo.asia/466b365a-14f9-48e5-8ade-8f29dd13bbfc.png) 

**Lấy các bản ghi theo điều kiện**

```
young_pp = peoples_df[peoples_df['age'] < 25]
young_pp[:5]
```
![](https://images.viblo.asia/91f403b9-6691-4d35-99a1-e06e13a50807.png)

Một ví dụ khác: Lấy tất cả các bản ghi chứa thông tin của người có chức danh là giáo sư:

```
professor = peoples_df[peoples_df.title == 'Professor']
professor.head(5)
```
![](https://images.viblo.asia/c73df05f-fe1b-4b73-b4d0-5e77e9c79e5f.png)

Hoặc 1 ví dụ so sánh chuỗi như sau:

```
name_compare = peoples_df['name'].str.contains('Rosella')
name_compare.head(5)
```
Kết quả thu được là một dataframe có 1 cột chưa 2 giá trị True hoặc False

```
0     True
1    False
2    False
3    False
4    False
Name: name, dtype: bool
```
**Lấy giá trị trả về numpy arrays**

Để lấy giá trị của một cột trả về dưới dạng numpy array trong thư viện pandas python, bạn chỉ cần thêm `.values` vào sau, ví dụ:

```
peoples_df['name'].values
```

Output bạn thu được như sau:

```python
array(['Burks, Rosella ', 'Avila, Damien ', 'Olsen, Robin ',
       'Moises, Edgar Estes', 'Brian, Heath Pruitt',
       'Claude, Elvin Haney', 'Mosley, Edmund ', 'Derek, Antoine Mccoy',
       'Hawkins, Callie ', 'Pate, Andrea ', 'Austin, Liz ',
       'Kendrick, Reba Alford', 'Sims, Angelina ', 'Mullins, Kimberly ',
       'Chuck, Lloyd Haney', 'Payne, Ladonna ',
       'Baxter, Johnathan Browning', 'Weiss, Gilbert ',
       'Deirdre, Florence Barrera', 'Fernando, Toby Calderon',
       'Garrison, Patrica ', 'Effie, Leila Vinson', 'Buckley, Rose ',
       'Stanton, Kathie ', 'Banks, Shannon ', 'Barnes, Cleo ',
       'Brady, Nellie ', 'Katheryn, Ruben Holt', 'Michael, Dianne ',
       'Grant, Adam ', 'Head, Kurtis ', 'Berger, Jami ',
       'Earline, Jaime Fitzgerald', 'Evelyn, Summer Frost',
       'Quentin, Sam Hyde', 'Dunlap, Ann ', 'Shields, Rich Pena',
       'Page, Winnie ', 'Sparks, Ezra ', 'Kaufman, Elba '], dtype=object)
```

Nếu bạn quan tâm tới numpy array, hãy tìm đọc [bài hướng dẫn về numpy](https://nguyenvanhieu.vn/khoa-hoc-lap-trinh-python/#Numpy)

### Thêm, sửa, xóa trong dataframe

**Thêm cột từ dữ liệu mới**

Để thêm cột vào một dataframe có sẵn. Trước tiên, bạn cần có 1 list dữ liệu tương ứng với cột mà bạn muốn thêm. Tức là chiều dài của list phải tương ứng với số bản ghi của dataframe bạn muốn thêm.

Ở đây, tôi sẽ sử dụng thư viện random để sinh ngẫu nhiên một list năm sinh và thêm vào dataframe như sau:

```
df_len = len(peoples_df)
birthday = [random.randrange(1980, 2000, 1) for i in range(df_len)]
peoples_df['birthday'] = birthday
peoples_df.tail(5)
```
![](https://images.viblo.asia/a65ccd84-f0e5-4f47-826c-ddb234f62fc4.png)

**Thêm cột dựa vào dữ liệu đã có**

Giả sử ở đây mình muốn thêm cột `is_young` có giá trị `True` nếu tuổi < 25 và `False` trong trường hợp còn lại.

```
peoples_df['is_young'] = peoples_df['age'] < 25
peoples_df.head(5)
```
![](https://images.viblo.asia/7d743b74-ebb5-485c-860d-a31f335a4ce3.png)

**Khởi tạo cột mới có giá trị rỗng**

Sử dụng cú pháp đơn giản như dưới đây, bạn sẽ có một trường mới và tất cả các giá trị là `None`

```
peoples_df['new_column'] = None
```

**Thêm bản ghi trong dataframe**

Về vấn đề thêm bản ghi, chúng ta thường ít khi sử dụng nên tôi sẽ không trình bày. Bạn đọc quan tâm có thể đọc thêm tại [tài liệu này](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.append.html)

**Sửa giá trị của cột**

Để sửa giá trị của 1 cột, bạn làm tương tự như thêm mới cột. Nhưng khác với thêm ở chỗ là tên cột bạn truyền vào đã có trong dataframe. Còn thêm là 1 tên trường mới hoàn toàn chưa có. Chẳng hạn, bạn muốn thay đổi trường `name`, bạn chỉ cần làm như sau:

```
peoples_df['name'] = xxx #list các tên mới có chiều dài bằng chiều dài của dataframe
// Hoặc reset trường name về None
peoples_df['name'] = None
```

**Xóa cột trong dataframe**

Bạn có thể sử dụng một trong các cách sau:

```
peoples_df.drop('tên cột cần xóa', axis=1) # Xóa 1 cột
peoples_df.drop(['cột 1', 'cột 2'], axis=1) # Xóa nhiều cột
df.drop(columns=['B', 'C']) # Xóa các cột có tên là B và C
```
**Xóa bản ghi theo chỉ số**

```
peoples_df.drop([0, 1]) # Xóa bản ghi ở chỉ số 1 và 2
```

## Hiểu dữ liệu trong dataframe

Thư viện pandas python cung cấp cho bạn một số hàm giúp bạn hiểu về cấu trúc, phân bố của dữ liệu. Dưới đây là cách để bạn khám phá và hiểu dữ liệu của mình.

Tôi đã bổ sung trường `age` vào file people.csv và tiến hành đọc lại.

```
peoples_df['age']
```
```
0     25
1     23
2     21
3     18
4     30
5     35
.
.
.
38    25
39    25
Name: age, dtype: int64
```
Sử dụng hàm `describe()` cho bạn các thống kê cơ bản về dữ liệu:

```
peoples_df.describe()
```
![](https://images.viblo.asia/5a26a651-b82a-43b4-a7f9-8ffda316d6d8.png)


Xem thống kê cụ thể hơn trên từng cột như sau:

```
peoples_df['age'].value_counts()
```
```
25    21
28     6
35     3
29     2
23     2
22     2
30     1
24     1
21     1
18     1
Name: age, dtype: int64
```

Bạn cũng có thể vẽ đồ thị xem phân bố giá trị của một trường trong dataframe như sau:

```
peoples_df['age'].value_counts().plot(kind='bar')
```
![](https://images.viblo.asia/a6c62ef4-8da7-4c5d-be0f-9e74e89d876e.png)

## Tạo mới dataframe

Có một vài cách để tạo ra dataframe trong thư viện pandas python. Bạn có thể dùng cách mà bạn cho là dễ sử dụng, đôi khi cũng phải tùy vào từng trường hợp mà nên chọn cách nào nữa.

### Tạo mới dataframe từ python dictionary

```
peoples = {'name': ['Nguyễn Văn Hiếu', 'Hiếu Nguyễn Văn'], 'age': [28, 28], 'website': ['https://nguyenvanhieu.vn', None]}
df = pd.DataFrame(peoples)
print(df)
```
Bạn sẽ có 1 dataframe như sau:

```
 
              name  age                   website
0  Nguyễn Văn Hiếu   28  https://nguyenvanhieu.vn
1  Hiếu Nguyễn Văn   28                      None
```
### Tạo mới dataframe từ các python list
```
txts = ['chỗ này ăn cũng khá ngon', 'ngon, nhất định sẽ quay lại', 'thái độ phục vụ quá tệ']
labels = [1, 1, 0]
df = pd.DataFrame()
df['txt'] = txts
df['label'] = labels
print(df)
```
Và dataframe mà bạn sẽ thu được là:
```
 
                           txt  label
0     chỗ này ăn cũng khá ngon      1
1  ngon, nhất định sẽ quay lại      1
2       thái độ phục vụ quá tệ      0
 ```

**Lưu ý:** các list này phải có cùng kích thước.

## Một số thao tác khác trên dataframe

### Sắp xếp dataframe

Với thư viện pandas python, bạn có thể sắp xếp dataframe tăng dần, hay giảm dần theo 1 hoặc nhiều cột chỉ định.

```
# Sắp xếp df tăng dần theo cột nào đó
df = pd.DataFrame({'name': ['Nam', 'Hiếu', 'Mai', 'Hoa'], 'age': [18,18,17,19]})
print('Before sort\n', df)
df = df.sort_values('age', ascending=True)
print('After sort\n', df)
```
Kết quả thu được như sau:
```
Before sort
    name  age
0   Nam   18
1  Hiếu   18
2   Mai   17
3   Hoa   19
After sort
    name  age
2   Mai   17
0   Nam   18
1  Hiếu   18
3   Hoa   19
```
Bạn có thể sắp xếp theo nhiều cột có độ ưu tiên giảm dần, bằng cách truyền vào list tên cột. Ví dụ:

`df.sort_values(['age', 'name'], ascending=True)`

### Nối 2 dataframe

Bạn có thể nối 2 dataframe thành 1 dataframe mới bằng cách sử dụng hàm `append` của thư viện pandas.

```
# Gộp 2 dataframe
df1 = pd.DataFrame({'name': ['Hiếu'], 'age': [18], 'gender': ['male']})
df2 = pd.DataFrame({'name': ['Nam', 'Mai', 'Hoa'], 'age': [15,17,19]})
df = df1.append(df2, sort=True)
print(df)
```
Kết quả:

```
   age gender  name
0   18   male  Hiếu
0   15    NaN   Nam
1   17    NaN   Mai
2   19    NaN   Hoa
```
### Xáo trộn các bản ghi trong dataframe

Trong xử lý dữ liệu, bạn chắc chắn sẽ cần tới việc xáo trộn dữ liệu. Rất may, thư viện pandas có thể giúp chúng ta làm việc đó.

```
# Xáo trộn các hàng trong df - shuffle dataframe rows
df = pd.DataFrame({'name': ['Hiếu', 'Nam', 'Mai', 'Hoa'], 'age': [18,15,17,19]})
print('Before shuffle\n', df)
df = df.sample(frac=1).reset_index(drop=True)
print('After shuffle\n', df)
```
Kết quả(Có thể khác nhau nhé – xáo trộn mà)
```
Before shuffle
    name  age
0  Hiếu   18
1   Nam   15
2   Mai   17
3   Hoa   19
After shuffle
    name  age
0   Mai   17
1   Nam   15
2  Hiếu   18
3   Hoa   19
```
Giải thích thêm:
* frac: Chỉ định số bản ghi sẽ trả về ở mỗi lần random. Nếu bằng 1, tức là random ngẫu nhiên tất cả các bản ghi.
* .reset_index(): Sắp xếp lại cột chỉ số của dataframe.
* drop:với giá trị True, nó sẽ ngăn không cho hàm reset_index tạo cột mới từ cột chỉ số của dataframe ban đầu.

## Lưu dataframe về file csv
Thư viện pandas python cho phép bạn lưu lại dataframe chỉ với một dòng code. Quá đơn giản phải không nào?

```
df.to_csv('comments.csv')
```
Bạn có thể mở file để xem kết quả lưu:

![](https://images.viblo.asia/8cdcae3f-d903-49ce-b1c0-dba744aed427.png)

Các tham số của hàm `to_csv` khá tương tự với hàm `read_csv`. Bạn đọc có thể xem thêm thông tin đầy đủ của hàm này [tại đây](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.to_csv.html).

Tới đây mình xin kết thúc bài hướng dẫn về thư viện pandas python. Qua bài viết này, tôi tin chắc bạn đã có được những kiến thức cần thiết và có thể làm chủ thư viện pandas trong python. Bạn cũng có thể xem một ví dụ thực tế sử dụng thư viện này tại bài viết [code thuật toán linear regression này](https://nguyenvanhieu.vn/thuat-toan-linear-regression/).

## Tài liệu tham khảo

1. [Pandas cookbook – https://github.com/jvns/pandas-cookbook](https://github.com/jvns/pandas-cookbook)
2. [Official document – https://pandas.pydata.org/index.html](https://pandas.pydata.org/index.html)

Bài viết gốc được đăng tại [Blog cá nhân của tôi](https://nguyenvanhieu.vn/thu-vien-pandas-python/).