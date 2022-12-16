Ở bài viết trước mình đã giới thiệu sơ lược về thư viện Pandas và cấu trúc dữ liệu cơ bản của nó, các bạn có thể tham khảo [tại đây](https://viblo.asia/p/gioi-thieu-ve-pandas-mot-thu-vien-pho-bien-cua-python-cho-viec-phan-tich-du-lieu-aWj53Nnel6m). Trong bài viết này mình sẽ giới thiệu sơ lược về các đọc dữ liệu từ CSV, JSON và SQL database.
## Đọc dữ liệu từ CSV
Với các tệp CSV, bạn đọc dữ liệu một cách rất đơn giản bằng cách sử dụng hàm `read_csv()` và được trả về 1 dataframe. Bắt đầu với một bộ dữ liệu demo đơn giản, được gọi là *purchases*, và mình sẽ tạo ra một file là *purchases.csv* và dưới đây là dữ liệu thô của nó
```
name,apples,oranges
June,3,0
Robert,2,3
Lily,0,7
David,1,2
```
```
#Khai báo thư viện pandas và khai báo nó là pd
import pandas as pd
df = pd.read_csv('purchases.csv')
print df
```
Output:
```
    name	apples	oranges
0	June	3	    0
1	Robert	2	    3
2	Lily	0	    7
3	David	1	    2
```
CSV không có index giống như DataFrames, vì vậy tất cả những gì chúng ta cần làm chỉ là chỉ định index_col khi đọc:
```
#Khai báo thư viện pandas và khai báo nó là pd
import pandas as pd
df = pd.read_csv('purchases.csv', index_col=0)
print df
```
Output:
```
name	apples	oranges
June	3	    0
Robert	2	    3
Lily	0	    7
David	1	    2
```
Ở đây chúng ta đặt index là cột không. Hàm `read_csv()` có một vài tham số như:
* encoding: chỉ định encoding của file đọc vào. Mặc định là utf-8.
* sep: thay đổi dấu ngăn cách giữa các cột. Mặc định là dấu phẩy (‘,’)
* header: chỉ định file đọc vào có header(tiêu đề của các cột) hay không. Mặc định là infer.
* index_col: chỉ định chỉ số cột nào là cột chỉ số(số thứ tự). Mặc định là None.
* n_rows: chỉ định số bản ghi sẽ đọc vào. Mặc định là None – đọc toàn bộ.

Bạn có thể tham khảo đầy đủ các tham số [tại đây](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)
## Đọc dữ liệu từ JSON
Nếu bạn có một tệp JSON - về cơ bản là một `dict` Python được lưu trữ -oandas có thể đọc nó dễ dàng như sau:
```
#Khai báo thư viện pandas và khai báo nó là pd
import pandas as pd
df = pd.read_json('purchases.json')
print df
```
Output:
```
name	apples	oranges
June	3	    0
Robert	2	    3
Lily	0	    7
David	1	    2
```
Lưu ý lần này index đi kèm với chúng ta một cách chính xác vì sử dụng các index cho phép JSON hoạt động thông qua nesting.

Pandas sẽ cố gắng tìm ra cách tạo DataFrame bằng cách phân tích cấu trúc JSON của bạn và đôi khi điều đó không đúng. Thông thường, bạn sẽ cần đặt đối số `orient` tùy thuộc vào cấu trúc, vậy nên hãy tham khảo đầy đủ các tham số của `read_json()` [tại đây](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_json.html)
## Đọc dữ liệu từ SQL database
Nếu bạn làm việc với dữ liệu từ cơ sở dữ liệu SQL, trước tiên bạn cần thiết lập kết nối bằng thư viện Python thích hợp, sau đó chuyển truy vấn đến pandas. Ở đây chúng tôi sẽ sử dụng SQLite để chứng minh.

Đầu tiên, chúng ta cần cài đặt pysqlite3, chạy `pip install pysqlite3`nếu sử dụng tool pip

`sqlite3` được sử dụng để tạo kết nối tới cơ sở dữ liệu mà sau đó chúng ta có thể sử dụng để tạo DataFrame thông qua truy vấn `SELECT`.

Vì vậy, trước tiên chúng ta sẽ tạo kết nối đến tệp cơ sở dữ liệu SQLite:
```
import sqlite3
con = sqlite3.connect("database.db")
```
Lưu ý: Nếu bạn có dữ liệu trong PostgreSQL, MySQL hoặc một SQL server khác, bạn sẽ cần lấy đúng thư viện Python để tạo kết nối. Ví dụ `psycopg2` là một thư viện thường được sử dụng để tạo kết nối tới PostgreSQL bạn có thể tham khảo [tại đây](http://initd.org/psycopg/download/). Hơn nữa, bạn sẽ tạo kết nối đến URI cơ sở dữ liệu thay vì tệp như chúng tôi đã làm ở đây với SQLite.

Trong cơ sở dữ liệu SQLite này, chúng tôi có một bảng gọi là *purchases* và chỉ mục của chúng tôi nằm trong một cột có tên là "name"

Bằng cách truyền truy vấn `SELECT` và connect `con`, chúng ta có thể đọc từ bảng *purchases*
```
df = pd.read_sql_query("SELECT * FROM purchases", con)
print df
```
Output:
```
    name	apples	oranges
0	June	3	    0
1	Robert	2	    3
2	Lily	0	    7
3	David	1	    2
```
Giống như với CSV, chúng ta có thể pass `index_col = 'index'`, nhưng chúng ta cũng có thể thiết lập một index sau
```
df = df.set_index('index')
print df
```
Output:
```
        apples	oranges
name	
June	3	    0
Robert	2	    3
Lily	0	    7
David	1	    2
```
Thực tế, chúng ta có thể sử dụng `set_index()` trên bất kỳ DataFrame nào bằng bất kỳ cột nào vào bất kỳ lúc nào. Indexing Series và DataFrames là một nhiệm vụ rất phổ biến, và những cách khác nhau để làm điều đó là đáng nhớ.
## Tài liệu tham khảo
[Python Pandas Tutorial: A Complete Introduction for Beginners](https://www.learndatasci.com/tutorials/python-pandas-tutorial-complete-introduction-for-beginners/)