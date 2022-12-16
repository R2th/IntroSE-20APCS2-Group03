Bài viết này sẻ hướng dẫn về **CRUD (thêm, lưu, xóa, sửa, tìm kiếm) database SQL SERVER,** sử dụng thư viện Dapper ORM trong lập trình C#.

Ở bài viết trước, mình đã có giới thiệu qua thư viện **Dapper ORM** là gì rồi, bạn có thể tham khảo lại nhé.

Trong bài hướng dẫn này, mình sẽ làm việc với bảng table sinhvien.

# Tutorial dapper ORM C#

Đầu tiên: Các bạn tạo bảng table sinhvien với câu lệnh T-SQL bên dưới:
![image.png](https://images.viblo.asia/efd15ff0-30ba-4f15-9d53-e903391294cc.png)
Đầu tiên: Các bạn tạo bảng table sinhvien với câu lệnh T-SQL bên dưới:
```
CREATE TABLE [dbo].[sinhvien](
	[masv] [INT] IDENTITY(1,1) NOT NULL,
	[tensv] [NVARCHAR](80) NULL,
	[ngaysinh] [DATE] NULL,
	[diachi] [NVARCHAR](150) NULL,
 CONSTRAINT [PK_sinhvien] PRIMARY KEY CLUSTERED 
(
	[masv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
```
- Các bạn tiếp tục tạo các Procedure trong sql để thêm, lưu, xóa, cập nhật và tìm kiếm.
**
1. Tạo procedure lưu hoặc câp nhật dữ liệu với tên [SinhVienSaveOrEdit]**

```
CREATE PROC [dbo].[SinhVienSaveOrEdit] @masv VARCHAR(50), @tensv NVARCHAR(80), @ngaysinh DATE, @diachi NVARCHAR(150)
AS BEGIN
    IF @masv=0 BEGIN
        INSERT INTO dbo.sinhvien(tensv, ngaysinh, diachi)
        VALUES(@tensv, @ngaysinh, @diachi);
    END;
    ELSE BEGIN
        UPDATE dbo.sinhvien
        SET tensv=@tensv, ngaysinh=@ngaysinh, diachi=@diachi
        WHERE masv=@masv;
    END;
END;
```
**2. Tiếp tục tạo procedure để load toàn bộ dữ liệu hoặc tìm kiếm theo tên sinh viên  [GetSinhVienOrSearch]**

```
CREATE PROC [dbo].[GetSinhVienOrSearch] 
@query AS NVARCHAR(150)
AS
BEGIN
	SELECT masv, tensv, ngaysinh, diachi FROM sinhvien
	WHERE @query = '' OR tensv LIKE '%' + @query + '%'    
END
```
**3. Và viết một procedure để xóa dữ liệu theo tên nhân viên [DeleteSinhVienByID]**
```
CREATE PROC [dbo].[DeleteSinhVienByID] 
@masv AS int
AS
BEGIN
	DELETE FROM dbo.sinhvien WHERE masv = @masv
END
```

- Dưới đây là giao diện demo ứng dụng, các bạn có thể thiết kế form như hình bên dưới:

![image.png](https://images.viblo.asia/b25d2c3f-1864-4365-81e3-5801b9c051f9.png)
Hướng dẫn code trên Winform C#.

**1. Import thư viện sqlserer vào dapper vào project**

```
using System.Data.SqlClient;
using Dapper;
```
**2. Tạo kết nối dữ liệu đến database sqlserver**

```
SqlConnection con = new SqlConnection("Server=.;Database=sinhvien;User Id=sa;Password = minh123;");
int masv = 0; // masv = 0 Luu, !=0 thì cập nhật
```
**3. Tạo một class với tên SinhVien**

```
class Sinhvien
{
    public int masv { get; set; }
    public string tensv { get; set; }
    public DateTime ngaysinh { get; set; }
    public string diachi { get; set; }
}
```
**4. Viết sự kiện cho nút thêm (khi nhấn nút thêm thì chúng ta sẽ xóa text để cho người dùng nhập dữ liệu vào)**

```
public void ClearText()
{
    masv = 0;
    txtTensv.Text = txtDiachi.Text = "";
    txtTensv.Focus();
    btnLuu.Text = "Lưu";
}

private void btnThem_Click(object sender, EventArgs e)
{
    ClearText();
}
```
**5. Viết sự kiện cho nút lưu, và cập nhật thông tin sinh viên**

```
private void btnLuu_Click(object sender, EventArgs e)
{
    try
    {
        if (con.State == ConnectionState.Closed)
            con.Open();
        DynamicParameters param = new DynamicParameters();

        DateTime ngaysinh = Convert.ToDateTime(txtNgaysinh.Text);

        param.Add("@masv", masv);
        param.Add("@tensv", txtTensv.Text);
        param.Add("@ngaysinh", ngaysinh.ToString("yyyyMMdd"));
        param.Add("@diachi", txtDiachi.Text);

        con.Execute("SinhVienSaveOrEdit", param, commandType: CommandType.StoredProcedure);

        if (masv == 0)
            MessageBox.Show("Lưu thành công!");
        else
            MessageBox.Show("Cập nhật thành công!");

        GetSinhVienToGridView();
        ClearText();
    }
    catch (SqlException ex)
    {
        MessageBox.Show(ex.Message);
    }
    finally
    {
        con.Close();
    }

}
```
**6. Viết sự kiện Xóa sinh viên**

```
private void btnXoa_Click(object sender, EventArgs e)
{
    DynamicParameters param = new DynamicParameters();
    param.Add("@masv", txtMasv.Text);

    int roweffected = con.Execute("DeleteSinhVienByID", param, commandType: CommandType.StoredProcedure);
    if (roweffected > 0)
    {
        GetSinhVienToGridView();
    }
}
```
**7. Viết hàm load thông tin sinh viên vào GridView**

```
 public void GetSinhVienToGridView()
{
    DynamicParameters param = new DynamicParameters();
    param.Add("@query", txtSearch.Text.Trim());

    List list = con.Query("GetSinhVienOrSearch", param, commandType: CommandType.StoredProcedure).ToList();

    gridview_data.DataSource = list;
}
```
**8. Viết hàm để bindding data khi cell click vào datagridview thì hiển thị thông tin sinh viên đó lên textbox**

```
private void gridview_data_CellClick(object sender, DataGridViewCellEventArgs e)
{
    try
    {
        if (gridview_data.CurrentRow.Index != -1)
        {
            masv = Convert.ToInt32(gridview_data.CurrentRow.Cells[0].Value.ToString());
            txtMasv.Text = masv.ToString();
            txtTensv.Text = gridview_data.CurrentRow.Cells[1].Value.ToString();
            txtNgaysinh.Text = gridview_data.CurrentRow.Cells[2].Value.ToString();
            txtDiachi.Text = gridview_data.CurrentRow.Cells[3].Value.ToString();
            btnLuu.Text = "Sửa";
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show(ex.Message);
    }
}
```
**9. Viết sự kiện nút textchange khi gõ dữ liệu vào ô tìm kiếm**

```
private void txtSearch_TextChanged(object sender, EventArgs e)
{
    GetSinhVienToGridView();
}
```
**10. Viết sự kiện load dữ liệu sinh viên vào datagridview khi mở khởi động form**

```
private void Form1_Load(object sender, EventArgs e)
{
    GetSinhVienToGridView();
}
```
Vậy là xong, bây giờ các bạn có thể chạy ứng dụng để xem kết quả.

**Các bạn có thể đọc thêm nhiều bài viết về C#, VB.NET, SQLSERVER tại website của mình: https://laptrinhvb.net**

HAPPY CODING!

Các bạn có thể download full source code [ở đây](https://laptrinhvb.net/bai-viet/devexpress/---Csharp----Huong-dan-them,-luu,-xoa,-sua,-tim-kiem-sqlserver-su-dung-thu-vien-Dapper-ORM/837b1c597ea92a02.html)