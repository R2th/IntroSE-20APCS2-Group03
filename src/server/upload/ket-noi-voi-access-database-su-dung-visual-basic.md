Khi làm việc với CSDL Access, chúng ta cần kết nối với CSDL để có thể tự do thao tác thêm, sửa, xóa trong CSDL. Ở bài viết này mình sẽ hướng dẫn các bạn tạo kết nối với CSDL Access sử dụng Visual Basic. Bắt đầu thôi!

## Tạo CSDL Access

Đầu tiên ta tạo một CSDL Access mẫu như sau:

![](https://images.viblo.asia/035e40d2-fb07-4d46-9b44-c8d951a5c1b8.PNG)

Thêm vào một vài dữ liệu mẫu:

![](https://images.viblo.asia/a7a631e7-d3a5-41f7-a204-e9dfa22b6bc5.PNG)

Vậy là xong phần chuẩn bị dữ liệu.

## Tạo ứng dụng Visual Basic

Mở Visual Studio, chọn **File**  -> **New** -> **Project** và chọn phần **Visual Basic** -> **Windows Classic Desktop** -> **Windows Form App (.NET Framework)**. Ở đây mình đặt tên project là EmployeeManagement, sau đó nhấn **OK** để tạo project mới.

![](https://images.viblo.asia/7aecad10-7605-4777-b250-3104815b997b.PNG)

Đến đây, tại màn hình Design, double click vào Form1 sẽ đưa bạn đến phần code control của Form đó. Sau khi đưa bạn đến phần code controll, do double click vào form chúng ta đã được Visual Studio tự động generate ra hàm sẽ handle việc load của form. Tại đây chúng ta sẽ thêm code để kết nối đến AccessDB.

```csharp
Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim connectionStatus As Boolean = OpenConnection("EmployeeDB.accdb", "")
        If connectionStatus Then
            MessageBox.Show("Connected")
        End If

    End Sub

    Private Function OpenConnection(ByVal FileName As String, ByVal Password As String) As Boolean
        Dim constr As String
        constr = "Provider=Microsoft.ACE.OLEDB.12.0; Data Source=" & FileName &
                "; Persist Security Info=True; Jet OLEDB:Database Password=" & Password

        Try
            _Connection = New OleDbConnection
            _Connection.ConnectionString = constr
            _Connection.Open()

            Return True

        Catch ex As Exception
            MessageBox.Show("Failed to connect to AccessDB")
            Return False
        End Try
    End Function
```

Tại đây trong hàm connection, điền đường dẫn tới file Database của Access. Ở đây file DB của mình là EmployeeDB.accdb và không có password.
Sau khi kết nối thành công với AccessDB, chúng ta thực hiện câu lệnh truy vấn tới DB để get ra list toàn bộ thông tin của Employee.

```csharp
Private Function GetData() As DataTable
        Dim return_value As New DataTable
        Dim query = "SELECT * FROM Employees"
        Dim ada As New OleDbDataAdapter(query, CType(_Connection, OleDbConnection))
        ada.Fill(return_value)
        Return return_value
    End Function
```

Hàm GetData() sẽ trả về một DataTable.
Chúng ta sẽ thêm một DataGridView, đặt tên là EmployeeTable vào Form, sau đó chọn datasource là DataTable có được từ hàm GetData để show lên kết quả:

![](https://images.viblo.asia/b5a8a597-f14f-4296-80b9-60bd7b3eea99.PNG)

```csharp
EmployeeTable.DataSource = data
```

Kết quả:

![](https://images.viblo.asia/4f1aed6c-b49d-48f1-aa6c-d43ab8ce603d.PNG)

Toàn bộ source code:

```csharp
Imports System.Data.OleDb

Public Class Form1

    Private _Connection As IDbConnection

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim connectionStatus As Boolean = OpenConnection("EmployeeDB.accdb", "")
        If connectionStatus Then
            Dim data = GetData()
            EmployeeTable.DataSource = data
        End If

    End Sub

    Private Function OpenConnection(ByVal FileName As String, ByVal Password As String) As Boolean
        Dim constr As String
        constr = "Provider=Microsoft.ACE.OLEDB.12.0; Data Source=" & FileName &
                "; Persist Security Info=True; Jet OLEDB:Database Password=" & Password

        Try
            _Connection = New OleDbConnection
            _Connection.ConnectionString = constr
            _Connection.Open()

            Return True

        Catch ex As Exception
            MessageBox.Show("Failed to connect to AccessDB")
            Return False
        End Try
    End Function

    Private Function GetData() As DataTable
        Dim return_value As New DataTable
        Dim query = "SELECT * FROM Employees"
        Dim ada As New OleDbDataAdapter(query, CType(_Connection, OleDbConnection))
        ada.Fill(return_value)
        Return return_value
    End Function
End Class
```

Cảm ơn các bạn đã đọc bài của mình :D