VBA hỗ trợ nhiều sự kiện cho Worksheet như có thể bắt được thao tác khi sửa/ xóa dữ liệu, khi Click chuột, chuyển Sheet, xóa Sheet… Và dựa vào các sự kiện này khi thực thi, bạn có thể lồng vào các đoạn lệnh VBA để tùy biến thêm các tác vụ cho riêng mình.
## Các sự kiện khi thao tác với WorkSheets trong VBA
Trong VBA, bạn có thể xem và tạo nhanh các sự kiện bằng cách chọn Worksheet và chọn mở trong danh sách các sự kiện.
![](https://images.viblo.asia/b3094945-6d60-4b82-bb6c-c3f90a1839ca.png)
Lưu ý rằng :
* Nếu muốn bắt sự kiện trên Sheet1 thì trong VBA bạn phải tạo sự kiện đó trong Sheet1.
* Các sự kiện giữa các Sheet sẽ không ảnh hưởng đến nhau.
### 1)Worksheet_SelectionChange
Sự kiện thực thi khi thay đổi chọn Cells hoặc Range. Ví dụ khi đang ở Cells A1, bạn chuyển qua Cells A2 thì sự kiện sẽ được thực thi.
Sự kiện hoạt động cả khi di chuyển bằng chuột hoặc bằng phím điều hướng.
Chú thích:
Target: biến khai báo theo kiểu Range.
Khi kéo chọn 1 Range, Target sẽ lấy vị trí Cell đầu tiên.
Ví dụ: Xác định vị trí của Cells thuộc hàng A khi Click chuột
```
Private Sub Worksheet_SelectionChange(ByVal Target As Range)
If Not Intersect(Target, Range("A:A")) Is Nothing Then
MsgBox "Hang " & Target.Column & " Cot " & Target.Row
End If
End Sub
```
### 2) Worksheet_Activate
Sự kiện này sẽ thực thi khi bạn di chuyển giữa các Sheets của một Workbook. Ví dụ: khi đang ở Sheet1 bạn di chuyển qua Sheet2 thì sự kiện được khai báo ở Sheet2 sẽ thực thi.
```
Private Sub Worksheet_Activate()
End Sub
```
### 3) Worksheet_Deactivate
Khác với sự kiện ở Worksheet_Activate thì sự kiện được khai báo ở Sheet1 sẽ thực thi.
```
Private Sub Worksheet_Deactivate()
End Sub
```
### 4) Worksheet_BeforeDoubleClick
Nếu để ý, thì khi Click chuột vào 1 Cells thì sẽ phải Double Click vào Cells đó mới có thể chỉnh sửa. Vậy sự kiện này sẽ thực thi trước khi con trỏ chuột trong Cells.
Sự kiện sẽ không thực thi khi 1 Click vào Cells và dùng bàn phím để nhập liệu.
```
Private Sub Worksheet_BeforeDoubleClick(ByVal Target As Range, Cancel As Boolean)
End Sub
```
Ghi chú:
Target: biến khai báo theo kiểu Range.
Cancel: biến kiểu Boolean sẽ có giá trị là TRUE/ FALSE. Giá trị là FALSE khi sự kiện thực thi.
Ví dụ: Ghi thời gian hiện tại khi Double Click vào Cells thuộc hàng A
```
Private Sub Worksheet_BeforedoubleClick(ByVal Target As Range, Cancel As Boolean)
If Not Intersect(Target, Range("A:A")) Is Nothing Then
If Target.Value = "" Then
Target.Value = Now()
End If
End If
End Sub
```
### 5) Worksheet_BeforeRightClick
Sự kiện thực thi khi bạn Click chuột phải vào bảng tính.
Sẽ thực thi trước khi Menu Context của Excel được hiển thị.
```
Private Sub Worksheet_BeforeRightClick(ByVal Target As Range, Cancel As Boolean)
End Sub
```
Ghi chú:
Target: biến khai báo theo kiểu Range.
Cancel: biến Boolean sẽ có giá trị là TRUE/ FALSE. Giá trị là FALSE khi sự kiện thực thi.
### 6) Worksheet_Calculate
Sự kiện thực thi khi các phép toán trên Sheet được thực hiện hoặc làm mới. Ví dụ: khi bạn thực hiện 1 phép tính cộng thì sự kiện này sẽ thực thi.
Chỉ thực thi khi có phép toán được thực hiện trên bảng tính.
```
Private Sub Worksheet_Calculate()
End Sub
```
### 7) Worksheet_Change
Khi kết thúc chỉnh sửa trong bảng tính thì sự kiện này sẽ được thực thi.
Bao gồm cả thay đổi khi nhập văn bản và thay đổi từ kết quả của các hàm.
```
Private Sub Worksheet_Change(ByVal Target As Range)
End Sub
```