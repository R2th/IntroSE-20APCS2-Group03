Thường thì trước khi chuẩn bị bàn giao cho khách hàng, họ sẽ luôn yêu cầu đội ngũ phần mềm gửi script để tạo data sẵn vào DB (nó là một phần trong quá trình tạo môi trường trước khi khách hàng bắt tay vào test hoặc sử dụng phần mềm). Và việc tạo script luôn đi song hành trong quá trình phát triển từ đầu, để đỡ phải loạn về sau, khi mà có số lượng dày đặc bảng được khởi tạo ra. Có rất nhiều cách để tạo script, các công cụ SQL Editor hiện nay đều có hỗ trợ chức năng tạo script nhanh từ DB, từ table cho tới data. Tuy nhiên, hôm nay mình muốn giới thiệu thêm cho các bạn một cách khác nữa, chỉ sử dụng Excel và VBA.

#### Kiến thức nền: 

-	Tin học văn phòng, cụ thể ở đây là Excel
-	Các cú pháp cơ bản trong [VBA](https://www.tutorialspoint.com/vba/index.htm) (chủ yếu xem từ **Excel Macros tới Text Files** là ok rồi). Với những bạn nào đã có nền tảng về coding (chỉ với Pascal thôi cũng được), thì mất tầm 3h tu luyện là có thể áp dụng được rồi.

#### Bước 1: Mở VBA Editor

-	Hiện thanh công cụ Developer. Click **File/Options.** Trong **Customize the Ribbon**, check **Developer**. Click **OK.**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/v4eu0f5c33_image.png)

- Trong thanh Developer, click **Visual Basic**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/sb8ae4292w_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/wuxk8fgskl_image.png)

Double click vào **Sheet1** để mở màn hình editor bên cạnh.

#### Bước 2: Tạo một Sheet Excel

-	Tạo một sheet tên ACCOUNT với nội dung như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/c094r6h3fp_image.png)

-	Tạo nút chức năng

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/vlo1ubbcp7_tao_button.gif)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/87bcprqbc7_tao_button.gif)

#### Bước 3: Viết hàm tạo script trong Module

-	Tạo folder để chứa file script được tạo. Ở đây mình tạo một folder có đường dẫn là **E:/SCRIPT**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/wcg1bhpopc_image.png)

-	Tạo Module để chứa hàm xử lý tạo script

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/a6xgti9qd0_tao_module.gif)

- Khởi tạo hàm xử lý như sau:

```VBA
Function fn_genScriptSQL(TABLE_NAME)
    
   '''' variables clarify'''
   Dim FILE_PATH As String
   Dim CELL_DATA As String
   Dim LAST_COL As Long
   Dim LAST_ROW As Long
  
   Dim fso As FileSystemObject
   Set fso = New FileSystemObject
   Dim stream As TextStream
   
   ''''variables initialize'''
   FILE_PATH = "E:\SCRIPT\TBL_" & TABLE_NAME & ".sql"
   LAST_COL = ActiveSheet.UsedRange.Columns.Count
   LAST_ROW = ActiveSheet.UsedRange.Rows.Count
   
   ''''write file''''
   Set stream = fso.OpenTextFile(FILE_PATH, ForWriting, True)
  
   CELL_DATA = ""
   
   stream.WriteLine "CREATE SEQUENCE [dbo].[SEQ_" & TABLE_NAME & "] START WITH 1 INCREMENT BY 1;"
   stream.WriteLine "CREATE TABLE [dbo].[" & TABLE_NAME & "] ("
   stream.WriteLine "  [ID] DECIMAL(20,0) DEFAULT (NEXT VALUE FOR [SEQ_" & TABLE_NAME & "]) NOT NULL,"
  
   For i = 1 To LAST_ROW
      Dim ARR(4)
      For j = 1 To LAST_COL
         CELL_DATA = Trim(ActiveCell(i, j).Value)
         
         If CELL_DATA = "N" Then
            CELL_DATA = "NOT NULL"
         End If
         
         If j = 5 And CELL_DATA <> "" Then
            CELL_DATA = "(" & CELL_DATA & ")"
         End If
         
         ARR(j - 1) = CELL_DATA
      Next j
      
      If ARR(0) <> "" Then
        stream.WriteLine "  [" & ARR(1) & "] " & ARR(2) & " " & ARR(3) & " " & ARR(4) & ";"
      End If
   Next i
   
   stream.WriteLine "CONSTRAINT [PK_" & TABLE_NAME & "] PRIMARY KEY CLUSTERED ([ID] ASC) );"
    
   stream.Close
   MsgBox ("Job Done")
    
End Function

```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/tkgtt4micz_image.png)

Nếu các bạn muốn thêm script cho Oracle, NoSQL, Mongo... thì cứ tạo các hàm tương ứng trong Module này. Ở đây mình đang minh họa cho cú pháp của MSSQL.

-	Để chạy được đối tượng **fso** trong đoạn code trên, click **Tools/References.** Check **Microsoft Script Runtime**. Chọn OK.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/5j7ju4q1z7_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/wwdlq6og5d_image.png)

#### Bước 4: Viết sub bắt sự kiện

-	Quay lại sheet Account trong VBA Editor ở bước 1, các bạn thêm đoạn script như sau:

```VBA
Private Sub genScriptSQL_Click()
    Dim TABLE_NAME As String
    TABLE_NAME = ActiveSheet.Name
    
    fn_genScriptSQL TABLE_NAME
    
End Sub
```

Lưu ý: Chữ "**genScriptSQL**" phải trùng với **property Name của nút chức năng** ta đã tạo ở bước 2.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/37141aew7j_image.png)

#### Bước 5: Chạy script

Đặt con trỏ chuột tại ô **A2**, click chuột ở nút “**Generate Script SQL**”. Sau khi báo “**Job Done**”, vào lại folder “**E:\SCRIPT**” sẽ thấy file **TBL_ACCOUNT.sql** đã được tạo ra.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/hgtfrph5ay_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/abndvy8ztw_image.png)

Mở file bằng Notepad++, ta sẽ thấy nội dung file đúng như ý định.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/a97y6llinw_image.png)

Chỉ cần chạy file sql này ở bất cứ SQL Editor nào để tạo bảng ACCOUNT.

Lưu ý **Design Mode** phải được tắt (không có highlight lên)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ctmjklirtk_image.png)

**Mở rộng**

Trong quá trình phát triển, cứ vô tư thêm bớt cột trong table này và nhấn nút tạo script, file sẽ được viết đè lại.
Ngoài ra mình có thể tạo một sheet mới vẫn sử dụng chung một hàm xử lý, bằng thủ thuật Move or Copy Của Excel, đổi lại tên Sheet và điều chỉnh cột trong bảng. Ở đây mình có tạo thêm 2 sheet GRADE và STUDENT, vẫn cho kết quả tương tự (cho ra 3 file sql khác nhau trong cùng một folder).

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/om5cm7x4r2_image.png)

Với cách này có thể giúp mình theo dõi một cách tổng quan các cột cũng như data type của chúng trong từng bảng, giúp mình đỡ mất thời gian trong việc viết script tạo bảng.

Tất nhiên, các bạn cũng hoàn toàn có thể dùng cách này để viết script cho việc:
- Nhập/ chỉnh sửa dữ liệu. 
- Tạo/ xóa bảng. 
- Tạo/xóa Sequence/ Primary key
- Tạo/ xóa Function
- ...

Tùy vào công việc các bạn đang gặp có bị lặp đi lặp lại một cách nhàm chán hay không.

> Bài viết có sử dụng một số hình ảnh từ [www.tutorialspoint.com](www.tutorialspoint.com)