Nào, chúng ta cùng đến với phần 2 của series **Pandas DataFrame**
# Truy xuất Labels và Data
Bạn đã biết cách khởi tạo 1 DataFrame của mình, và giờ bạn có thể truy xuất thông tin từ đó. Với Pandas, bạn có thể thực hiện các thao tác sau:
* Lấy và sửa đổi row và column của labels  dưới dạng chuỗi
* Thể hiện dữ liệu dưới dạng mảng NumPy
* Kiểm tra và điều chỉnh các loại dữ liệu 
* Phân tích kích thước của các đối tượng DataFrame

### Pandas DataFrame Labels dưới dạng chuỗi
Bạn có thể lấy labels row của DataFrame với .index và labels column với .columns
```python
>>> df.index
Int64Index([1, 2, 3, 4, 5, 6, 7], dtype='int64')

>>> df.columns
Index(['name', 'city', 'age', 'py-score'], dtype='object')
```
Bây giờ bạn có row và column của labels là các loại chuỗi đặc biệt. Như bạn có thể làm với bất kỳ chuỗi Python nào khác, bạn có thể lấy được một mục duy nhất:
```
>>> df.columns[1]
'city'
```
Ngoài việc trích xuất một mục cụ thể, bạn có thể áp dụng các thao tác trình tự khác, bao gồm việc lặp qua các row và column của labels. Tuy nhiên, điều này hiếm khi cần thiết vì Pandas cung cấp các cách khác để lặp qua DataFrames mà bạn sẽ thấy trong phần sau.

Bạn cũng có thể sử dụng phương pháp này để sửa đổi các labels: 
```python
>>> df.index = np.arange(6, 10)

>>> df.index
Int64Index([6, 7, 8, 9, 10], dtype='int64')

>>> df
      name     city     age  py-score
6     Hoc      HCM      41      88.0
7     Tuan     Ha Noi   28      79.0
8     Nam      Da Nang  33      81.0
9     Huy      Long An  34      80.0
10    Luan     HCM      38      68.0
```
Trong ví dụ này, bạn sử dụng **numpy.arange()** để tạo một chuỗi row labels mới chứa các số nguyên từ 6 đến 10.

Hãy nhớ rằng nếu bạn cố gắng sửa đổi một mục cụ thể của .index hoặc .columns, thì bạn sẽ nhận được TypeError.

### Dữ liệu dưới dạng Mảng NumPy
Đôi khi bạn có thể muốn trích xuất dữ liệu từ Pandas DataFrame mà không có label của nó. Để nhận mảng NumPy với dữ liệu chưa được gắn label, bạn có thể sử dụng **.to_numpy()** hoặc **.values**: 
```python
>>> df.to_numpy()
array([['Hoc', 'HCM', 41, 88.0],
       ['Tuan', 'Ha Noi', 28, 79.0],
       ['Nam', 'Da Nang', 33, 81.0],
       ['Huy', 'Long An', 34, 80.0],
       ['Luan', 'HCM', 38, 68.0], dtype=object)
```
Cả hai .to_numpy() và .values đều hoạt động tương tự và cả hai đều trả về một mảng NumPy với dữ liệu từ Pandas DataFrame.

Pandas documentation đề xuất bạn sử dụng .to_numpy() vì tính linh hoạt được cung cấp bởi hai tham số tùy chọn:
1. **dtype**: Sử dụng tham số này để chỉ định kiểu dữ liệu của mảng kết quả. Nó được đặt thành Không theo mặc định. 
2. **copy**: Đặt tham số này thành False nếu bạn muốn sử dụng dữ liệu gốc từ DataFrame. Đặt nó thành True nếu bạn muốn tạo bản sao dữ liệu.

Tuy nhiên, .values đã tồn tại lâu hơn nhiều so với .to_numpy(), được giới thiệu trong phiên bản Pandas 0.24.0. Điều đó có nghĩa là bạn có thể sẽ thấy .values thường xuyên hơn, đặc biệt là trong code cũ hơn.

### Data Types
Loại giá trị dữ liệu, còn được gọi là kiểu dữ liệu hoặc kiểu dữ liệu, rất quan trọng vì chúng xác định dung lượng bộ nhớ mà DataFrame của bạn sử dụng, cũng như tốc độ tính toán và mức độ chính xác của nó.
Pandas phụ thuộc rất nhiều vào kiểu dữ liệu NumPy. Tuy nhiên, Pandas 1.0 đã giới thiệu một số loại bổ sung:\
* **BooleanDtype** và **BooleanArray** hỗ trợ các giá trị Boolean bị thiếu và **logic ba giá trị Kleene**. 
* **StringDtype** và **StringArray** đại diện cho một loại chuỗi chuyên dụng.

Bạn có thể lấy các kiểu dữ liệu cho từng cột của Pandas DataFrame bằng **.dtypes**:
```python
>>> df.dtypes
name         object
city         object
age           int64
py-score    float64
dtype: object
```

Như bạn có thể thấy, .dtypes trả về một đối tượng Dòng với tên cột làm nhãn và kiểu dữ liệu tương ứng dưới dạng giá trị.

Nếu bạn muốn sửa đổi kiểu dữ liệu của một hoặc nhiều colum, thì bạn có thể sử dụng **.astype()**:
```python
>>> df_ = df.astype(dtype={'age': np.int32, 'py-score': np.float32})
>>> df_.dtypes
name         object
city         object
age           int32
py-score    float32
dtype: object
```

Tham số bắt buộc quan trọng nhất và duy nhất của .astype() là dtype. Nó mong đợi một kiểu dữ liệu hoặc dictionary. Nếu bạn chuyển dictionary, thì các khóa là tên column và giá trị là kiểu dữ liệu tương ứng mong muốn của bạn.

Như bạn có thể thấy, các kiểu dữ liệu ở cột age và py-score trong DataFrame df đều là int64, đại diện cho số nguyên 64 bit (hoặc 8 byte). Tuy nhiên, df_ cũng cung cấp kiểu dữ liệu số nguyên 32 bit (4 byte) nhỏ hơn được gọi là int32.

### Pandas DataFrame Size
Các thuộc tính .ndim, .size và .shape trả về số thứ nguyên, số lượng giá trị dữ liệu trên mỗi thứ nguyên và tổng số giá trị dữ liệu, tương ứng:
```python
>>> df_.ndim
2

>>> df_.shape
(5, 4)

>>> df_.size
28
```

Các DataFrame instances có hai dimensions (rows and columns), do đó .ndim trả về 2. Mặt khác,  A Series object chỉ có một dimension, vì vậy trong trường hợp đó, .ndim sẽ trả về 1.

thuộc tính .shape trả về một bộ giá trị với số row (trong trường hợp này là 5) và số column (4). Cuối cùng, .size trả về một số nguyên bằng số giá trị trong DataFrame (28).

Bạn thậm chí có thể kiểm tra dung lượng bộ nhớ được sử dụng bởi mỗi cột bằng .memory_usage()
```python
>>> df_.memory_usage()
Index       56
name        56
city        56
age         28
py-score    28
dtype: int64
```
Như bạn có thể thấy, .memory_usage() trả về một Series với tên column làm label và mức sử dụng bộ nhớ tính bằng byte làm giá trị dữ liệu. Nếu bạn muốn loại trừ việc sử dụng bộ nhớ của cột chứa các row label, thì hãy chuyển đối số tùy chọn index = False.

Trong ví dụ trên, hai cột cuối cùng, age và py-score , sử dụng 28 byte bộ nhớ mỗi cột. Đó là bởi vì các cột này có bảy giá trị, mỗi giá trị là một số nguyên chiếm 32 bit hoặc 4 byte. Bảy số nguyên nhân với 4 byte, mỗi số tương đương với tổng số 28 byte sử dụng bộ nhớ.

***Đến đây, bạn đã biết cách sử dụng và truy xuất dữ liệu theo row và column của DataFrame như thế nào rồi phải không? Phần 2 đến đây xin được kết thúc, hẹn gặp lại các bạn ở phần 3 nhé. ;)***