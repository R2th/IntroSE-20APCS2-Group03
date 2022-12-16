Trong bài viết này mình sẽ hướng dẫn các bạn làm việc với Excel bằng Visual Basic trong Visual Studio.

Đầu tiên, các bạn hãy tạo một project chọn References -> *Manage NuGet Packages -> Browse -> Microsoft.Office.Interop.Excel*, sau đó ấn *Install* package này:

![](https://images.viblo.asia/6dbee6b4-019d-4d46-8544-3f01c8166d8a.PNG)

## Khởi tạo Object Excel
Đầu tiên ta khai báo một biến Excel và khởi tạo nó:

```csharp
Private _Excel As Object
_Excel = CreateObject("Excel.Application")
_Excel.DisplayAlerts = False
```

Chúng ta sẽ set DisplayAlert = False để Excel không hiển thị các alert khi macro đang chạy.
Sau khi khởi tạo đối tượng này, mở Task Manager lên ta sẽ thấy có một process Excel đang chạy:

![](https://images.viblo.asia/3cf3d2b1-d6ef-479b-996a-69c437b1788b.PNG)

Vậy là ứng dụng Excel đã khởi động và sẵn sàng làm việc với các tập tin Excel. Tiếp theo mình sẽ nói về các phương thức cơ bản để thêm, sửa, xóa các sheet cũng như các file Excel :v 

## Workbook

Trong Excel Interop, mỗi workbook cũng giống như một file Excel. Thuộc tính:

```csharp
_Excel.Workbooks
```

sẽ trả về cho chúng ta một collection các đối tượng workbook hiện tại đang được mở trong Excel Application.

Để tạo một Workbook mới, chúng ta sử dụng method:

```csharp
Dim path = "D:\Test\Output\"
If Not IO.Directory.Exists(path) Then
    IO.Directory.CreateDirectory(path)
End If
_Excel.Workbooks.Add()
_Excel.ActiveWorkbook.SaveAs("D:\Test\Output\output.xlsx")
```

Ở đoạn trên chúng ta đã tạo một workbook và lưu nó ở thư mục D:\Test\Output với tên là output.xlsx. Mở thư mục ra chúng ta có thể thấy đã có file output:

![](https://images.viblo.asia/b2675e5e-103b-4c01-bbf9-dc990e188741.PNG)

Để mở một file Excel đã có sẵn để làm việc, chúng ta sử dụng method:

```csharp
_Excel.Workbooks.Open(String, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object)
```

Rất nhiều tham số phải không :v Theo tài liệu thì hàm Open sẽ có các tham số như sau:

```csharp
Public Function Open (Filename As String, Optional UpdateLinks As Object, Optional ReadOnly As Object, Optional Format As Object, Optional Password As Object, Optional WriteResPassword As Object, Optional IgnoreReadOnlyRecommended As Object, Optional Origin As Object, Optional Delimiter As Object, Optional Editable As Object, Optional Notify As Object, Optional Converter As Object, Optional AddToMru As Object, Optional Local As Object, Optional CorruptLoad As Object) As Workbook
```

Vì giới hạn bài viết nên mình sẽ chỉ giải thích một số tham số nhất định, các tham số còn lại các bạn có thể tham khảo ở [đây](https://docs.microsoft.com/en-us/dotnet/api/microsoft.office.interop.excel.workbooks.open?view=excel-pia):

- **Filename**: 
Kiểu String, là thuộc tham số bắt buộc. Đây là nơi file name được mở truyền vào.
- **ReadOnly**:
Kiểu Object, là tham số không bắt buộc. Chế độ mở file. True nếu mở workbook ở read-only mode.
- **Password**:
Kiểu Object, là tham số không bắt buộc. Là một String chứa password để mở một protected workbook. Nếu bỏ qua tham số này khi mở một workbook có password, user sẽ được nhắc nhập mật khẩu.

Đã mở thì phải có đóng, để đóng một workbook ta sử dụng:

```csharp
_Excel.WorkBooks(OpenFileName).Close(SaveChanges:=True)
```

Chúng ta để SaveChanges:=True để lưu lại mọi thay đổi khi đóng file.

Ta có thể mở nhiều Workbook cùng một lúc, cũng giống như Windows, workbook chúng ta đang làm việc là ActiveWorkbook. Để chọn ActiveWorkbook, ta sử dụng:

```csharp
_Excel.ActiveWorkbook
```

Để set một workbook là ActiveWorkbook, ta sử dụng:

```csharp
_Excel.Workbooks(WorkbookName).Activate()
```

## Worksheets

Để đếm số lượng worksheet trong workbook, ta sử dụng:

```csharp
_Excel.ActiveWorkbook.WorkSheets.Count
```

Để chọn Worksheet, ta có thể dùng:

```csharp
xls.ActiveWorkbook.Sheets(1).Select()
```

hoặc 

```csharp
xls.ActiveWorkbook.WorkSheets(sheetname).Select()
```

Để add thêm sheet cho workbook, ta dùng phương thức:

```csharp
_Excel.ActiveWorkbook.Sheets.Add()
```

Để add sheet vào vị trí cuối cùng của các sheet và đặt tên là SheetRenamed, ta sử dụng:

```csharp
_Excel.ActiveWorkbook.Sheets.Add(After:=_Excel.ActiveWorkbook.Sheets(_Excel.ActiveWorkbook.Sheets.Count)).Name = "SheetRenamed"
```

Chúng ta đã thêm được một sheet mới với tên là "SheetRenamed":

![](https://images.viblo.asia/30ed23b2-2f7a-436a-bf86-f2878c6f0f59.PNG)

Để select sheet, ta dùng method:

```csharp
_Excel.ActiveWorkbook.WorkSheets(SheetName).Select()
```

Để xóa một sheet trong workbook, ta sử dụng:

```csharp
_Excel.ActiveWorkbook.Sheets(SheetName).Delete()
```

Ngoài ra còn rất nhiều thứ khi làm việc với sheet như rows, columns, cells mà mình sẽ giới thiệu ở một bài viết khác. Cảm ơn mọi người đã đọc bài của mình :D