Tiếp tục phần 2 của series **Pandas DataFrame** nào. Let's go!!!
# Truy cập và sử dụng Data trong DataFrame
Ở phần trước, các bạn đã biết được cách lấy dữ liệu một row hoặc column trong Pandas DataFame rồi phải không nào.
```
>>> df['name']
6    Hoc
7    Tuan
8    Nam
9    Huy
10    Luan
Name: name, dtype: object

>>> df.loc[2]
name             Nam
city         Da Nang
age               33
py-score          81
Name: 2, dtype: object
```
Trong ví dụ đầu tiên, bạn truy cập vào tên column như cách bạn truy cập một phần tử từ dictionary, bằng cách sử dụng label của nó làm khóa. Nếu  column label là một mã định danh Python hợp lệ, thì bạn cũng có thể sử dụng ký hiệu dấu chấm để truy cập column. Trong ví dụ thứ hai, bạn sử dụng .loc[] để lấy row theo nhãn của nó.

### Lấy dữ liệu với Accessors
Ngoài trình truy cập .loc[], bạn có thể sử dụng để lấy các rows hoặc columns theo nhãn của chúng với .iloc[], truy xuất một row hoặc column theo chỉ mục số nguyên của nó. Trong hầu hết các trường hợp, bạn có thể sử dụng một trong hai cách sau:
```
>>> df.loc[6]
name         Hoc
city         HCM
age          41
py-score     88
Name: 6, dtype: object

>>> df.iloc[0]
name         Hoc
city         HCM
age          41
py-score     88
Name: 6, dtype: object
```
df.loc [6] trả về row có label 6. Tương tự, df.iloc[0] trả về row có index dựa trên index 0, là row đầu tiên. Như bạn có thể thấy, cả hai câu lệnh đều trả về cùng một row với một đối tượng Series.

Pandas có tổng cộng bốn accessors:

1. **.loc[]** chấp nhận label của các row và column và trả về Chuỗi hoặc DataFrame. Bạn có thể sử dụng nó để lấy toàn bộ row hoặc column, cũng như các phần của chúng.
2. **.iloc[]** chấp nhận các index dựa trên 0 của các row và column và trả về Chuỗi hoặc Dữ liệu. Bạn có thể sử dụng nó để lấy toàn bộ row hoặc column hoặc các phần của chúng.
3. **.at[]** chấp nhận label của các row và column và trả về một giá trị dữ liệu duy nhất.
4. **.iat[]** chấp nhận các index dựa trên 0 của các row và column và trả về một giá trị dữ liệu duy nhất.

Trong số này, .loc[] và .iloc[] đặc biệt mạnh mẽ. Chúng hỗ trợ cắt và lập chỉ mục kiểu NumPy. Bạn có thể sử dụng chúng để truy cập một cột:
```
>>> df.loc[:, 'city']
          city
6     HCM 
7     Ha Noi 
8     Da Nang  
9     Long An 
10    HCM  
Name: city, dtype: object

>>> df.iloc[:, 1]
6     HCM 
7     Ha Noi 
8     Da Nang  
9     Long An 
10    HCM  
Name: city, dtype: object
```

df.loc[:, 'city'] trả về column city. Cấu trúc lát cắt ( : ) ở vị trí row label có nghĩa là tất cả các row phải được bao gồm. df.iloc[:, 1] trả về cùng một column  vì chỉ mục 1 dựa trên 0 tham chiếu đến cột thứ hai, city.

Cũng giống như bạn có thể làm với NumPy, bạn có thể cung cấp các lát cùng với danh sách hoặc mảng thay vì chỉ mục để có nhiều row hoặc  column.
```
>>> df.loc[7:10, ['name', 'city']]
      name     city    
7     Tuan     Ha Noi  
8     Nam      Da Nang 
9     Huy      Long An 
10    Luan     HCM    

>>> df.iloc[1:5, [0, 1]]
      name      city
7     Tuan     Ha Noi  
8     Nam      Da Nang 
9     Huy      Long An 
10    Luan     HCM  
```

> Lưu ý: Không sử tuples trị thay vì list hoặc mảng số nguyên để lấy các row hoặc column thông thường. Tuples được dành riêng để đại diện cho nhiều dimensions trong NumPy và Pandas, cũng như lập chỉ mục phân cấp hoặc đa cấp trong Pandas.

Trong ví dụ này, bạn sử dụng:
* **Slices** để lấy các row label từ 7 đến 10, tương đương với các index từ 1 đến 4
*  **Lists** để lấy tên cột và thành phố, tương đương với các index 0 và 1

Cả hai câu lệnh đều trả về một Pandas DataFrame với giao điểm của bốn row và hai column mong muốn.

Điều này dẫn đến sự khác biệt rất quan trọng giữa .loc[] và .iloc[]. Như bạn có thể thấy từ ví dụ trước, khi bạn chuyển row label 7:10 với .loc[], bạn nhận được các row label từ 7 đến 10. Tuy nhiên, khi bạn chuyển row index 1:4 với .iloc[], bạn chỉ lấy các row có index từ 1 đến 4.

Lý do bạn chỉ nhận được các index từ 1 đến 4 là với .iloc[], stop index của một slice là độc quyền, có nghĩa là nó bị loại trừ khỏi các giá trị trả về. Điều này phù hợp với chuỗi Python và mảng NumPy. Tuy nhiên, với .loc[], cả index bắt đầu và stop index đều inclusive, có nghĩa là chúng được bao gồm với các giá trị trả về.

Bạn có thể bỏ qua các row và column với .iloc[] giống như cách bạn có thể làm với các slicing tuples, lists và mảng NumPy:
```
>>> df.iloc[1:4:2, 0]
7     Tuan 
9     Huy  
Name: name, dtype: object
```

Trong ví dụ này, bạn chỉ định các row index mong muốn với slice 1: 4: 2. Điều này có nghĩa là bạn bắt đầu với row có index 1 (row thứ hai), dừng lại trước row có index 6 (row thứ năm) và bỏ qua mọi row thứ hai.

Thay vì sử dụng slicing construct, bạn cũng có thể sử dụng class slice() tích hợp sẵn trong Python(), cũng như numpy.s_[] hoặc pd.IndexSlice[]:
```
>>> df.iloc[slice(1, 4, 2), 0]
7     Tuan 
9     Huy  
Name: name, dtype: object

>>> df.iloc[np.s_[1:4:2], 0]
7     Tuan 
9     Huy  
Name: name, dtype: object

>>> df.iloc[pd.IndexSlice[1:4:2], 0]
7     Tuan 
9     Huy  
Name: name, dtype: object
```

Bạn có thể thấy một trong những cách tiếp cận này thuận tiện hơn những cách khác tùy thuộc vào tình huống của bạn.

Có thể sử dụng .loc[] và .iloc[] để nhận các giá trị dữ liệu cụ thể. Tuy nhiên, khi bạn chỉ cần một giá trị duy nhất, Pandas khuyên bạn nên sử dụng các trình truy cập chuyên biệt .at[] và .iat[]:
```
>>> df.at[8, 'name']
'Nam'

>>> df.iat[2, 0]
'Nam'
```

Ở đây, bạn đã sử dụng .at[] để lấy tên của một ứng cử viên bằng cách sử dụng các row  và column label tương ứng của nó. Bạn cũng đã sử dụng .iat[] để truy xuất cùng một tên bằng cách sử dụng các row và column index của nó.

### Thiết lập dữ liệu với Accessors
Bạn có thể sử dụng accessors để sửa đổi các phần của Pandas DataFrame bằng cách chuyển một chuỗi Python, mảng NumPy hoặc một giá trị:

```
>>> df.loc[:, 'py-score']
6    88.0
7    79.0
8    81.0
9    80.0
10    68.0
Name: py-score, dtype: float64

>>> df.loc[:8, 'py-score'] = [40, 50, 60]
>>> df.loc[9:, 'py-score'] = 0

>>> df['py-score']
6    40.0
7    50.0
8    60.0
9     0.0
10    0.0
Name: py-score, dtype: float64
```

Câu lệnh df.loc[:8, 'py-score'] = [40, 50, 60] sửa đổi ba mục đầu tiên (row 6 đến 8) trong cột py-score bằng cách sử dụng các giá trị từ danh sách được cung cấp của bạn. Sử dụng df.loc[9:, 'py-score'] = 0 đặt các giá trị còn lại trong column này thành 0.

Ví dụ sau cho thấy rằng bạn có thể sử dụng các negative index với .iloc[] để truy cập hoặc sửa đổi dữ liệu:
```
>>> df.iloc[:, -1] = np.array([88.0, 79.0, 81.0, 80.0, 68.0])

>>> df['py-score']
6    88.0
7    79.0
8    81.0
9    80.0
10    68.0
Name: py-score, dtype: float64
```

Trong ví dụ này, bạn đã truy cập và sửa đổi column cuối cùng ('py-score'), tương ứng với số nguyên column index  -1. Hành vi này phù hợp với chuỗi Python và mảng NumPy.

***Mình xin kết thúc Phần 3 ở đây nhé, hẹn gặp lại các bạn ở phần 4. ;)***