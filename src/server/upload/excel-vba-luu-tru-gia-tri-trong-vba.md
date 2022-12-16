Như ở bài trước tôi đã giới thiệu đến các bạn một dạng lưu trữ giá trị trong VBA đó là [Mảng](https://viblo.asia/p/excel-vba-mang-trong-vba-Eb85oB72l2G) một trong những phương pháp được thường được sử dụng nhất trong VBA. Phần này tôi xin phép giới thiệu với các 2 dạng lữu trữ giá trị có thể sử dụng trong VBA đó là **Collection** và **Dictionary**.

# Collection
Collection trong VBA là một cấu trúc dữ liệu đơn giản có sẵn trong VBA để lưu trữ các đối tượng. Các collections trong VBA linh hoạt hơn so với Array trong VBA vì chúng không giới hạn ở kích cỡ của chúng vào bất kỳ thời điểm nào và không yêu cầu phải dò lại kích thước bằng tay.  Collection rất hữu dụng khi ta không muốn sử dụng các cấu trúc dữ liệu phức tạp.

### Khái báo
```
' Khai báo Collection
Dim colBook As Collection
' Khởi tạo colDemo
Set colBook = New Collection
```

### Các phương thức trong Collection
**Ví dụ 1:** Bài toán như sau: Có 2 sheet dữ liệu: 
- Sheet5 là dữ liệu thống kê lượt download của các user ở site Admin 
![](https://images.viblo.asia/7941ddf0-daa5-4a39-adc3-80a264f87d32.png)
- Và Sheet6 là dữ liệu được tính toán và export trên server dựa từ DB. 
![](https://images.viblo.asia/e381f19d-ccce-4e6b-a6ad-b2ef5c150957.png)

=>  Cần phải kiểm tra răng: số lần download được tính toán ở DB ở sheet6 có map với số lần download được hiển thị ở site admin ở sheet5 hay không?

Ứng dụng phương thức ADD và COUNT trong **Collection** để giải quyết bài toàn:
```
Sub TestCollection()
    Dim i As Integer
    Dim j As Integer
    Dim colBook As Collection
    Set colBook = New Collection
    j = 3
    Do While j <= 6
        For i = 3 To 15
            If (Sheets("Sheet5").Range("C" & i).Value = Range("B" & j).Value) Then
                colBook.Add Range("C" & i).Value
            End If
        Next i
        
        If (colBook.Count = Range("A" & j).Value) Then
            Range("C" & j).Value = "Pass"
        Else
            Range("C" & j).Value = "Fail"
        End If
        Set colBook = New Collection
        j = j + 1
    Loop
End Sub
```

Và được kết quả như sau: 
![](https://images.viblo.asia/19865f48-c9f3-4144-a55b-618096fc9192.png)

Ở ví dụ,  sử dụng  phương thức **ADD** ```colBook.Add Range("C" & i).Value``` để add value ở cột C vào Collection

Và để đếm được số lần download thì ta có thể dùng phương thức **COUNT** để đếm số item trong Collection ```colBook.Count```.

Ngoài ra trong Collection còn một số phương thức khác như: 
- **Item:** Gọi tới Item của collection theo chỉ số của Item hoặc theo Key ứng với Item đó. Được sử dụng theo cú pháp:
```
colBook.Item (Index)
```

- **Remove:** Xóa một Item trong collection theo chỉ số của Item hoặc Key ứng với Item đó. Được sử dụng theo cú pháp:
```
colBook.Remove(Index)
```

### Ưu điểm và nhược điểm của Collection
- **Ưu điểm:**
Dễ sử dụng, không cần phải khai báo kích thước trước khi sử dụng.

- **Nhược điểm:**
Collection chỉ đọc. Có nghĩa là bạn có thể thêm hoặc xóa một phần tử nhưng bạn không thể thay đổi giá trị của phần tử đó. Nếu bạn muốn thay đổi các giá trị trong một nhóm các giá trị thì bạn cần phải sử dụng một mảng.

# Dictionary
Dictionary trong VBA lưu trữ dữ liệu dưới dạng cặp key và value, các key không được trùng nhau. Dictionary được sinh ra để lấp đầy 2 khuyết điểm chính của Collection, với Dictionary chúng ta có thể:
- Kiểm tra Key đã tồn tại chưa.
- Có thể thay đổi giá trị của phần tử.

### Khai báo
- Kiểu khai báo sớm:
```
Dim Dic As Scripting.Dictionary
Set Dic = New Scripting.Dictionary
```

- Kiểu khai báo muộn: 
```
Dim Dic As Object
Set Dic = CreateObject("Scripting.Dictionary")
```

### Các phương thức trong Dictionary
**Ví dụ 2:**  Test case: Xác thực rằng thông tin transaction ở file export CSV lấy từ site Admin map với file export CSV ở server(được thống kê từ DB) trong tháng. 

- file export CSV site Admin (sheet5)
![](https://images.viblo.asia/d86e8049-6891-4523-80a0-a4f69a9e911f.png)

- file export CSV ở server (sheet6)
![](https://images.viblo.asia/516365c6-c399-42b0-a3c6-9f3c71a24e22.png)

Ứng dụng phương thức ADD, COUNT,  EXITS, ITEM, KEYS  trong **Dictionary** để giải quyết bài toán: 
```
Sub TestDictionary()
    Dim i As Integer
    Dim dicBook As New Scripting.Dictionary
    For i = 3 To 14
        dicBook.Add Sheets("Sheet5").Range("C" & i).Value, Sheets("Sheet5").Range("A" & i).Value
    Next i
    
    For i = 3 To 14
        If (dicBook.Exists(Range("A" & i).Value) = True) Then
            With Range("C" & i)
                .Value = "Pass"
                .Interior.ColorIndex = 35
            End With
        Else
            With Range("C" & i)
                .Value = "Fail"
                .Interior.ColorIndex = 40
            End With
            Range("D" & i).Value = dicBook.Item(Sheets("Sheet5").Range("C" & i).Value) & "-" & dicBook.Keys(i - 3)
        End If
    Next i
    With Range("E3")
                .Value = dicBook.Count
                .Interior.ColorIndex = 8
            End With
    Set dicBook = Nothing
End Sub
```

Như vậy để so sánh dữ liệu giữa 2 sheet, ta sẽ khởi tạo 1 Dictionary để chứa các transaction_id ở sheet 5 ```Dim dicBook As New Scripting.Dictionary```, 

Sau đó dùng các phương thức để so sánh dữ liệu ở 2 file:
1. Phương thức **ADD** để thêm giá trị vào ```dicBook``` 
```
dicBook.Add Sheets("Sheet5").Range("C" & i).Value, Sheets("Sheet5").Range("A" & i).Value
```
Vì Dictionary lưu dữ liệu ở dạng cặp *KEY* và *VALUE*, nên khi add dữ liệu vào Dictionary ta cũng phải add dữ liệu ở dạng cặp, và ở ví dụ thì
- Key: là dữ liệu ở Cột C ở sheet 5
- Value: là dữ liệu ở Cột A ở sheet 5

2. Phương thức *EXISTS* để kiểm tra transaction_id trong ```dicBook```  có map với transaction_id ở sheet 6 hay không?!
```
dicBook.Exists(Range("A" & i).Value)
```

3. Phương thức *ITEM* để lấy ra value trong ```dicBook``` (tức là dữ liệu ở cột A_sheet5) khi tranction_id giữa 2 file không map với nhau
```
dicBook.Item(Sheets("Sheet5").Range("C" & i).Value)
```
Phương thức *ITEM* được sử dụng để lấy ra value trong Dic theo Key chỉ định

- Ngoài cách trên bạn có thể sử dụng phương thức *ITEMS*  để lấy value trong Dic ở vị trí thứ i:
```
dicBook.Items(i)
```

Phương thức *ITEMS*  sẽ trả về một mảng một chiều gồm toàn bộ Items có trong Dic khi bạn sử dụng cú pháp:
```
dicBook.Items()
```

4. Phương thức *KEYS* để lấy ra key trong ```dicBook``` (tức là dữ liệu ở cột C_sheet5) khi tranction_id giữa 2 file không map với nhau
```
dicBook.Keys(i - 3)
```
Vì vòng lặp for đang chạy giá trị từ 3 cho nên để lấy được key trong Dic ta phải pải lấy giá trị của i - 3.

5. Phương thức *COUNT* để count số transaction trong tháng 
```
dicBook.Count
```

Và kết quả là:
![](https://images.viblo.asia/52ffc10e-e4a6-437e-a3be-b3a4f9291a61.png)


Reference: 
http://viettuts.vn/excel-vba/collection-trong-vba
http://viettuts.vn/excel-vba/dictionary-trong-vba