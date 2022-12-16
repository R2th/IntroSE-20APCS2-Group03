# Kết nối Excel VBA tới Access Database
Việc sử dụng Excel Macros (VBA) bạn có thể kết nối đến bất kỳ DB nào như SQL, Oracle, Access DB. Vậy trong bài này chúng ta sẽ học làm thế nào để kết nối đến Access DB.
Đối với  Access 2007/2010 Database thì Provider là: Provider=Microsoft.ACE.OLEDB.12.0
Trước tiên, bạn phải Add reference cho ADO DB Connection như sau :
1. Mở VB Editor(Alt+F11).
2. Tools –> References...
3. Chọn "Microsoft ActiveX Data Objects 2.0 Library". Bạn có thể chọn phiên bản 2.0 hoặc bất kỳ phiên bản nào cao hơn.
4. Click OK
## Kết nối với Access 2007/2010 Database
```
Option Explicit
 
Public Const dbName = "student.accdb"
 
Sub ADODB_Connect()
    Dim dbPath As String
    Dim conn As New ADODB.Connection
    Dim rs As New ADODB.Recordset
    Dim strConn As String
    Dim query As String
     
    On Error GoTo ErrorProcess
     
    ' create dpPath from current folder and dbName
    dbPath = Application.ActiveWorkbook.Path & "\" & dbName
    ' information to connect to 2007/2010 AccessDB
    strConn = "Provider=Microsoft.ACE.OLEDB.12.0;" & _
        "Data Source=" & dbPath & ";" & _
        "User Id=admin;Password="       
    ' open connection
    conn.Open (strConn)    
    ' define query
    query = "SELECT * FROM student"  
    ' execute the query
    rs.Open query, conn, adOpenKeyset
    ' show number of records
    MsgBox rs.RecordCount    
    ' show data from AccessDB
    Do Until rs.EOF
        MsgBox rs.Fields.Item("name") & ", " & rs.Fields.Item("age")
        rs.MoveNext
    Loop
     
    GoTo EndSub
ErrorProcess:
    MsgBox Err.Number & ": " & Err.Description
EndSub:
    Set rs = Nothing
    Set conn = Nothing
End Sub
```
# SỬ DỤNG SQL ĐỂ LỌC HAY TRUY CẬP DỮ LIỆU TRONG BẢNG TÍNH
Sau khi xác định được bảng dữ liệu của chúng ta như thế nào, chúng ta có thể sử dụng SQL để truy cập dữ liệu này với những câu lệnh SQLsau:
## TRUY CẬP DỮ LIỆU TỪ BẢNG TÍNH EXCEL BẰNG SQL
* Truy cập toàn bộ dữ liệu trong bảng tính
`SELECT * FROM [A1:G20000]`
Dấu * ở trong câu lệnh này nghĩa là chúng ta muốn dữ liệu của tất cả các cột. Nếu các bạn sử dụng file Excel trong video để thực hiện những câu lệnh SQL này, bạn cần thêm mi_sql vào đằng trước câu lệnh: mi_sql SELECT * FROM [A1:G20000]
* Truy cập dữ liệu của một số cột nhất định: chúng ta ghi tên cột ra sau từ khoá SELECT và viết các cột ngăn cách nhau bằng dấu phẩy ,
```
SELECT OrderDate, Region, Rep, Item FROM [A1:G20000]
```
## LỌC DỮ LIỆU BẢNG TÍNH EXCEL BẰNG SQL
* Lọc dữ liệu từ bảng tính Excel với 1 điều kiện: Lọc dữ liệu của những đơn hàng từ Hanoi
```
SELECT * FROM [A1:G20000]
	WHERE Region='Hanoi'
```
Câu lệnh SQL trên có nghĩa là: từ vùng dữ liệu A1:G20000, lọc ra những dòng mà cột Region có giá trị là Hanoi
* Lọc dữ liệu từ bảng tính Excel với nhiều điều kiện: Lọc dữ liệu của những đơn hàng từ Hanoi hoặc Danang
```
SELECT * FROM [A1:G20000]
	WHERE Region='Hanoi'
	OR Region='Danang'
```
Ngoài cách dùng từ khoá OR, chúng ta cũng có thể dùng từ khoá IN và câu lệnh SQL sẽ như sau:
```
SELECT * FROM [A1:G20000]
	WHERE Region
	IN ('Hanoi','Danang')
```
* Lọc dữ liệu của những đơn hàng bán sản phẩm có đơn giá (Unit Cost) nhỏ hơn hoặc bằng $ 8.99
```
SELECT * FROM [A1:G20000]
	WHERE [Unit Cost] <= 8.99
```
**Lưu ý:** Chúng ta có thể thấy được trong ví dụ này, tên cột của bảng tính này là “Unit Cost” có dấu cách ở trong. Tốt nhất để tránh xảy ra lỗi khi truy vấn dữ liệu thì chúng ta không nên viết tên cột có dấu cách hoặc kí tự đặc biệt (có nghĩa là không viết tên cột bằng tiếng Việt có dấu). {. :notice}
* Lọc dữ liệu của những đơn hàng bán sản phẩm có đơn giá (Unit Cost) nhỏ hơn hoặc bằng $8.99 sắp xếp từ mặt hàng có đơn giá đắt nhất đến mặt hàng có đơn giá rẻ nhất
```
SELECT * FROM [A1:G20000]
	WHERE [Unit Cost] <= 8.99
	ORDER BY [Unit Cost] DESC
```
Ở trong ví dụ này, chúng ta có thể thay [Unit Cost] trong ORDER BY [Unit Cost] DESC bằng một cột khác. Nếu kiểu dữ liệu của một cột là dạng chuỗi thì cột đó sẽ được sắp xếp từ Z đến A, nếu kiểu dữ liệu của một cột là dạng số thì cột đó sẽ được sắp xếp nhỏ dần.

Còn rất nhiều SQL khác hy vọng sau bài chia sẻ này, các bạn có thể tìm hiểu thêm .