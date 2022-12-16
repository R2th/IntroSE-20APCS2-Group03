Tiếp nối chủ đề ở các [phần trước](https://viblo.asia/p/excel-vba-cac-menh-de-dieu-khien-Eb85oB98l2G), bài này tôi xin phép được giới thiệu với các bạn về cách làm việc vs Mảng trong VBA.

Mảng là một tập hợp của nhiều biến liên quan (related variables) được gọi qua một tên. Ví dụ: Samples. Bạn có thể xác định một thành phần trong mảng thông qua một chỉ mục. Ví dụ: Samples(1): tức là lấy giá trị của phần tử có thứ tự là 1 trong mảng Samples.

# Khai báo Mảng
### Khai báo Mảng
```
' Method 1: khai báo mảng không kích thước
Dim arr1()
 
' Method 2: khai báo mảng có kích thước
Dim arr2(5)
 
' Method 3: Sử dụng phương thức Array
Dim arr3
arr3 = Array("Apple","Orange","Grapes")
 
' Method 4: chỉ định rõ kiểu giá trị của mảng
Dim arr4() As String
```

Khai báo Dim (viết tắt của chữ Dimention) được dùng để khai báo kích thước của một mảng. Thông thường phần tử của mảng sẽ được bắt đầu bằng chỉ mục 0. 
Vì vậy  khi khai báo: 
```
Dim Samples(10)
```
thì có nghĩa mảng Samples của bạn có 11 phần tử.

Trong trường hợp khác bạn cũng có thể thực hiện được điều này bằng việc khai báo tường minh như sau:
```
Dim Samples(1 to 10)
```
thì có nghĩa mảng Samples của bạn có 10 phần tử và phần tử của mảng sẽ được bắt đầu bằng chỉ mục 0

Sử dụng tên của biến mảng để tham chiếu đến một mảng. Mảng có thể có nhiều chiều, nhưng thông thường là mảng hai chiều.

Ví dụ khai báo mảng hai chiều như sau:
```
Dim Samples(500,2)
```

### Khai báo kiểu biến của Mảng
Khai báo kiểu biến cho các phần tử rất quan trọng tại sao? Vì với một mảng có nhiều phần tử, nếu bạn khai báo không rỏ ràng thì tài nguyên bộ nhớ sẽ bị chiếm dụng.

``` Dim TenBien(Lower To Upper) As Type ```  ‘Lower: cận dưới; Upper: cận trên

Khi khai báo nhiều biến bạn có thể dùng một khai báo Dim, nhưng phải cách nhau bằng As Type cho mỗi biến. Vì vậy bạn phải khai báo như sau:
```
Dim Samples(0) As Integer, Samples(1) As Integer
```

### Các tính chất của mảng trong VBA
* Chỉ số mảng không được âm.
* Chỉ số mảng bắt đầu từ 0 (ZERO).
* Các mảng VBA có thể lưu trữ bất kỳ loại biến nào trong một mảng. Do đó, một mảng có thể lưu trữ một số nguyên, chuỗi hoặc các ký tự trong một biến mảng.
# Mảng động (Dynamic Array)
Nếu bạn không biết kích thước của mảng khi khai báo, bạn phải dùng mảng động. Mảng động cho phép bạn khai báo mảng và khai báo kích thước mảng sau. Bạn sẽ khai báo mảng bình thường nhưng không cần khai báo kích thước như sau:

``` Dim Mang1(), Mang2() ```

Sau đó để khai báo lại bạn dùng từ  ``` ReDim ```

Giả sử sau khi bạn khai báo mảng động như trên, sau đó bạn biết được mảng bạn sử dụng cần bao nhiêu phần tử bạn sẽ dùng ReDim để khai báo lại như sau:
```
SoPhanTu= Range(“A1:A100”)
ReDim Mang1(SoPhanTu), Mang2(SoPhanTu)
```

Trong một thủ tục bạn có thể dùng nhiều lần ReDim. 

Ví dụ:
![](https://images.viblo.asia/a53a09f9-7866-42d4-91b8-44017ee2ad1f.png)
Trong ví dụ trên, lần đầu tiên bạn khai báo mảng không có kịch thước ```Dim testArray() ```

Sau đó khi xác định được số giá trị cần thực hiện thì bạn dùng ReDim để khai báo lại kích thước của mảng ```ReDim testArray(SoPhanTu) ```  tức là bây giờ kích thước mảng của bạn sẽ là ```SoPhanTu = Range("A1:A25").Count=25``` (Range("A1:A25").Count = 25). 

Sau khi thực hiện việc gán giá trị cho mảng thì ta có thể xác định chính xác lại được kích thước dựa vào biến j, nên để tránh lãng phí bộ nhớ ta lại tiếp tục khái bảo lại kịch thước của mảng 
```ReDim Preserve testArray(SoPhanTu) ```

Chú ý cho rằng các phần từ  1 đến 25 đã bị xóa giá trị khi bạn dùng khai báo ReDim.  Vậy nếu muốn không xóa giá trị của các phần tử trước đây chúng ta phải dùng từ khóa ```Preserve``` để khai báo.

# Mảng đa chiều
Mảng trong VBA không chỉ giới hạn trong một chiều, mà chúng có thể có tối đa 60 chiều. Các mảng hai chiều là những mảng được sử dụng phổ biến nhất. Bạn có thể khai báo mảng 2 chiều như sau
```
ReDim testArray(SoHang, SoCot)
```
Mảng 2 chiều nó như một dạng ma trận có hàng và có cột, do đó khi chúng ta khai báo mảng 2 chiều chúng ta phải khai báo kích thước của số hàng và số cột. 

Và việc gán giá trị cho mảng cũng theo hàng và cột. Tôi có ví dụ sau:
![](https://images.viblo.asia/c76215f4-4f63-4863-895e-981c01e9d1d9.png)
Như vậy mảng của tôi có kích thước số hàng là ```SoHang = Range("A1:A25").Count =25``` và kích thước của số cột sẽ là ``` SoCot = Range("E5:F5").Count=2```. 

Và để ghi dữ liệu vào cho mảng 2 chiều, tôi đã sử dụng 2 vòng lặp for để lần lượt ghi dữ liệu vào hàng và cột
```
For i = 1 To SoHang
        If (Range("B" & i) = Range("E5").Value) Then
            testArray(j, h) = Range("A" & i).Value
            j = j + 1
        End If
 Next i
```
```
For i = 1 To SoHang
        If (Range("B" & i) = Range("F5").Value) Then
            testArray(j, h) = Range("A" & i).Value
            j = j + 1
        End If
Next i
```

# Các phương thức xử lý trong mảng
### Phương thức Split
Phương thức Split trả về một mảng có chứa một số giá trị cụ thể được phân chia dựa trên dấu phân cách.

Cú pháp
```
Split(expression[,delimiter[,count[,compare]]]) 
```
Trong đó: 
* *Expression*: Một tham số bắt buộc. Biểu thức chuỗi có thể chứa chuỗi với các dấu phân cách.
    * *Delimiter*: Một tham số tùy chọn. Tham số được sử dụng để chuyển đổi thành các mảng dựa trên dấu phân cách. 
        * *Count*: Một tham số tùy chọn. Số lượng các chuỗi con được trả về, và nếu được chỉ định là -1, thì tất cả các chuỗi con được trả về.
        * *Compare*: Một tham số tùy chọn. Tham số này xác định phương thức so sánh nào sẽ được sử dụng. 
        0 = vbBinaryCompare: Thực hiện phép so sánh nhị phân.
        1 = vbTextCompare – Thực hiện so sánh văn bản.

***Ví dụ:***
![](https://images.viblo.asia/29e83170-b8b9-44f2-9ddd-fabc423fce2c.png)

```
arrayTest(i) = Split(Range("A" & i).Value, " ")
```
Như vậy có nghĩa là các phần tử của mảng sẽ là chuỗi giá trị đầu tiên được tách bằng dấu ```" "``` ở ô A1 -> A5. Và các giá trị mà chúng ta nhận được sau khi dùng phương thức ```Split``` được hiển thị ở B3->B6 như hình trên.

### Phương thức Join
Phương thức Join trả về một chuỗi có chứa một số lượng quy định của chuỗi con trong một mảng. Đây là một chức năng đối lập với phương thức Split.
Cú pháp
```
Join(ArrayName[,delimiter]) 
```
Trong đó: 
* *ArrayName*: Một tham số bắt buộc. Một mảng có chứa các chuỗi con được nối.
* *Delimiter*: Một tham số tùy chọn. Tham số được sử dụng để chuyển đổi thành các mảng dựa trên dấu phân cách


***Ví dụ:***
![](https://images.viblo.asia/f2a2c36b-152d-4639-8e16-9b5161b908d6.png)
Ta sử dụng ```Display = Join(arrayTest, " ")``` để get các giá trị trong mảng ```arrayTest``` thành một chuỗi giá trị và hiển thị ở một box message như hình trên.


Reference: 
http://viettuts.vn/excel-vba/mang-trong-vba

https://www.guru99.com/vba-arrays.html