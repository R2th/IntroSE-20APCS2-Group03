Python là một ngôn ngữ được sử dụng vô cùng rộng rãi trong phân tích dữ liệu. Nhờ vào hệ sinh thái đa dạng các packages chuyên dụng cho dữ liệu, Python giúp ta tăng tốc và đơn giản hóa việc xử lý data, giúp tiết kiệm thời gian. Trong số đó, Pandas là một thư viện rất mạnh mẽ và phổ biến phục vụ cho cả nghiên cứu lẫn phát triển các ứng dụng về khoa học dữ liệu.

Dataframe là cấu trúc dữ liệu được sử dụng trong Pandas. Pandas cung cấp rất nhiều chức năng xử lý và làm việc trên cấu trúc dữ liệu này.

Khi làm việc với Dataframe thì việc duyệt (iterate) dữ liệu là thao tác không thể thiếu. Tuy nhiên đôi khi quá trình này lại khá tốn thời gian, nhất là đối với những bộ dữ liệu lớn. Trong bài viết này mình sẽ giới thiệu các phương pháp để duyệt qua các hàng trong một Dataframe cũng như so sánh tốc độ của các phương pháp này.

Để tiện so sánh thì mình sẽ load một dataset gồm gần 1.2 triệu hàng, nhân lên 10 lần để có 12 triệu hàng. Khi iterate bằng mỗi phương pháp, mình sẽ thực hiện cùng một thao tác là cộng thêm một đơn vị vào mỗi giá trị trong cột 'affiliate_id' của Dataframe này và so sánh thời gian xem sao nhé.
(Thông tin về dataset các bạn có thể xem thêm trong bài [này](https://viblo.asia/p/eda-du-lieu-cuoc-thi-bookingchallenge-va-baseline-model-1Je5E7OYZnL))

![](https://images.viblo.asia/6bd45fe8-3ec7-4ad7-91e3-a369105f019f.png)


# 1. Naive method: Iteration by Index

Dataframe là một object của Pandas gồm các hàng và cột được đánh chỉ số (indexed). Do vậy ta có thể duyệt qua các hàng bằng chỉ số.

```
start_time = time.time()
for idx in range(0,df.shape[0],1):
  df.at[idx, 'affiliate_id'] = df['affiliate_id'].iloc[idx] + 1
current_time = time.time()
elapsed_time = current_time - start_time
elapsed_time
```
**Output: 377.8559923171997**

Như vậy ta mất khoảng 378s ~  6 phút để iterate qua một Dataframe có 12 triệu hàng và thực hiện phép cộng trên từng giá trị.

# 2. Pandas Built-In Function: iterrows(), itertuples()

Pandas DataFrame.iterrows() được sử dụng để duyệt qua các hàng trong Dataframe. Với mỗi bước lặp nó trả về một tuple `(index, series)` trong đó `series` là thông tin cột và giá trị tại hàng - cột đó theo kiểu dữ liệu pandas.core.series.Series.
![](https://images.viblo.asia/d7bdbece-3c9c-4783-8e16-660644d7da0b.png)

Thử iterate qua các hàng trong Dataframe và đo lại thời gian:
```
start_time = time.time()
for idx in range(0,df.shape[0],1):
  df.at[idx, 'affiliate_id'] = df['affiliate_id'].iloc[idx] + 1
current_time = time.time()
elapsed_time = current_time - start_time
elapsed_time
```
**Output: 1148.1945836544037**

Vậy là hàm iterrows() này mất 1148s để duyệt một lần qua 12 triệu bản ghi, lâu hơn gần 3 lần so với phương pháp duyệt bằng index thông thường!

Bên cạnh vấn đề về performance, iterrows() không được khuyến khích sử dụng do nó không bảo toàn kiểu của dữ liệu (do trả về series). Thay vào đó chúng ta có thể sử dụng function itertuples() vì nó giữ được type của data, do mỗi hàng sẽ được return dưới dạng namedtuple.



Itertuples() còn có hiệu suất thời gian tốt hơn:
```
start_time = time.time()
for row in df.itertuples():
  row = row._replace(affiliate_id = row.affiliate_id + 1)
current_time = time.time()
elapsed_time = current_time - start_time
elapsed_time
```
**Output: 39.02977204322815** (nhanh hơn duyệt bằng index đến gần 10 lần)

# 3. Back-to-basics: to_dict() function

Một lựa chọn khác là ta có thể convert Dataframe về định dạng dữ liệu quen thuộc là dictionary:
```
df_dict = df.to_dict('records')
```
Quá trình convert tương đối mất thời gian và ngốn RAM nhưng sau đó ta cũng có thể iterate với tốc độ rất nhanh:

```
df_dict = df.to_dict('records')
start_time = time.time()
user_list = []
for row in df_dict:
  row['affiliate_id'] += 1
current_time = time.time()
elapsed_time = current_time - start_time
elapsed_time
```
**Output: 1.9254302978515625**

# 4. apply() function
apply() là một hàm built-in của Pandas cho phép ta pass một function và áp dụng nó lên tất cả các giá trị trong một series.

```
start_time = time.time()
df['affiliate_id'] = df['affiliate_id'].apply(lambda x: x + 1)
current_time = time.time()
elapsed_time = current_time - start_time
elapsed_time
```
**Output: 4.4058239459991455**

Cũng rất nhanh phải không nào?

# 5. Vectorization
Khi lập trình bằng Python, một vấn đề có thể có nhiều cách giải quyết, tuy nhiên trong đó sẽ có một/ một vài cách giúp code vừa sạch đẹp vừa tận dụng được tối đa sức mạnh của Python (cái mà chúng ta hay gọi là "pythonic way "). Tương tự như vậy, khi xử lý data trong Pandas thì cách tối ưu nhất chính là vectorization.

Vectorization tức là thay vì dùng vòng lặp trên từng hàng từng hàng một, chúng ta tiến hành một phương thức mà được thực hiện trên tất cả các giá trị cùng một lúc. Pandas cung cấp rất nhiều  built-in vectorized function cho mọi thứ từ các biểu thức toán học đến xử lý string, vv. Các hàm này được tối ưu hóa để hoạt động trên kiểu dữ liệu series và Dataframe của Pandas. Chính vì vậy sử dụng các hàm này luôn đem lại hiệu suất cao hơn và tối ưu hơn so với vòng lặp thông thường.

```
start_time = time.time()
df['affiliate_id'] = df['affiliate_id'].add(1)
current_time = time.time()
elapsed_time = current_time - start_time
elapsed_time
```
**Output: 0.08091163635253906** (bất ngờ chưa!)

# Kết luận
Trong bài viết này, mình đã giới thiệu tới các bạn các phương pháp thường dùng để duyệt dữ liệu hàng trong Pandas Dataframe. Có thể tóm tắt lại thứ tự các phương pháp xét theo mức độ tối ưu về thời gian như sau:
1. Vectorization (tối ưu nhất)
2. to_dict() (nhanh, tuy nhiên mất thời gian và bộ nhớ để convert dataframe)
3. apply()
4. itertuples()
5. iterrows()

Cảm ơn các bạn đã đọc !
# Reference
- https://towardsdatascience.com/efficient-pandas-apply-vs-vectorized-operations-91ca17669e84
- https://data-flair.training/blogs/iteration-in-pandas/
- https://www.geeksforgeeks.org/iterating-over-rows-and-columns-in-pandas-dataframe/