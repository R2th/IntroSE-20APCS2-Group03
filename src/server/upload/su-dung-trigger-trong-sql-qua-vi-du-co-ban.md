## Trigger là gì ?
Hiểu đơn giản thì Trigger là một stored procedure không có tham số. Trigger thực thi một cách tự động khi một trong ba câu lệnh Insert, Update, Delete làm thay đổi dữ liệu trên bảng có chứa trigger. :D
## Cú pháp của Trigger
```sql
CREATE TRIGGER tên_trigger ON tên_bảng
FOR {DELETE, INSERT, UPDATE}
AS 
  câu_lệnh_sql
```
## Trigger dùng làm gì ?
- Trigger thường được sử dụng để kiểm tra ràng buộc (check constraints) trên nhiều quan hệ (nhiều bảng/table) hoặc trên nhiều dòng (nhiều record) của bảng.
- Ngoài ra việc sử dụng Trigger để chương trình có những hàm chạy ngầm nhằm phục vụ nhưng trường hợp hữu hạn và thường không sử dụng cho mục đích kinh doanh hoặc giao dịch. [Đọc thêm tại đây](https://www.ibm.com/support/knowledgecenter/en/SSGU8G_12.1.0/com.ibm.sqlt.doc/ids_sqt_523.htm)
## Bài toán đặt ra.
- Bạn có 2 bảng kho hàng và đặt hàng liên kết với nhau bởi mã hàng.

![](https://images.viblo.asia/0bfa534f-4e0a-41c1-93ea-eefed9e48688.jpg)
- Khi người dùng đặt hàng hãy tự động cập nhật số lượng tồn trong bảng kho hàng.
### Giải pháp
- Khi người dùng đặt hàng ta chỉ có 3 loại thao tác chính với CSDL là : **Insert, Delete, Update**
- Vậy chỉ cần tạo **3 trigger** tương ứng là ok :D
- Người dùng **đặt hàng**: **Số lượng còn trong kho = Số lượng còn - Số lượt đặt**
- Người dùng **hủy** không đặt hàng nữa:  **Số lượng còn trong kho = Số lượng còn + Số lượt đặt**
- Người dùng **cập nhật** Số lượng đặt => **Số lượng còn tăng giảm tùy ý**
### Vấn đề 
- Ở 2 trường hợp **insert** và **delete** ta thực hiện bình thường. Nhưng trong trường hợp **update** Số lượng hàng tồn sẽ sảy ra trong 3 trường hợp sau.
1. Số lượng đặt ban đầu = 5 sau đó tăng lên 10 => số lượng trong kho sẽ giảm 10 tương ứng
2. Số lượng đặt lúc này = 10 sau đó giảm xuống 3 => số lượng trong kho sẽ tăng 7 tương ứng

- Tận dụng việc trong sql câu lệnh **update = Insert new row To Delete old row** cõ nghĩa là khi thực hiện update CSDL trong sql sẽ chạy việc insert dữ liệu mới trước sau đó sẽ xóa đi bảng cũ.
### Giải quyết vấn đề
- Tận dụng việc sử dụng Trigger luôn tồn tại 2 bảng **inserted** và **deleted** ta sẽ rút ra 1 công thức cập nhật trung trong mọi trường hợp
```scala
SLTonKhoCu = SLTonKhoCu - inserted.SLDatHang + deleted.SLDatHang
```
## Thực hiện qua ví dụ nhỏ
1. Ban đầu thêm dữ liệu và select nó ra :D

![](https://images.viblo.asia/1b6a380e-ed71-4c91-9211-0f303d251e8f.jpg)

2. Đặt hàng 5 sản phẩm với mã là 1

![](https://images.viblo.asia/5a74b671-67c2-4907-b545-ec8d21146159.jpg)

3. Cập nhật lên 10

![](https://images.viblo.asia/2f0016c4-cf66-4157-9519-fc7e8c6bf256.jpg)

4. Cập nhật về 3

![](https://images.viblo.asia/c9f6f792-3c76-411e-b31e-def08fdb0de2.jpg)

5. Cập nhật một số thông tin khác mà không liên quan đến số lượng

![](https://images.viblo.asia/39354844-7fdd-483b-8afb-fd76d2ff183f.jpg)

6. Xóa đơn đặt hàng

![](https://images.viblo.asia/d084beb6-3619-4b4d-ab40-4bb761bed742.jpg)
## Source code bài toàn :D
1. Trigger thêm

![](https://images.viblo.asia/180efac6-8957-48a8-bc32-b2b468e20b79.jpg)

2. Trigger Xóa

![](https://images.viblo.asia/b47c2e3d-6a33-4d3c-84c5-bd514cffda6f.jpg)

3. Trigger Sửa

![](https://images.viblo.asia/4fd20b47-fd9c-4106-b395-d62a1dfef081.jpg)

-----
``` sql
/* cập nhật hàng trong kho sau khi đặt hàng hoặc cập nhật */
CREATE TRIGGER trg_DatHang ON tbl_DatHang AFTER INSERT AS 
BEGIN
	UPDATE tbl_KhoHang
	SET SoLuongTon = SoLuongTon - (
		SELECT SoLuongDat
		FROM inserted
		WHERE MaHang = tbl_KhoHang.MaHang
	)
	FROM tbl_KhoHang
	JOIN inserted ON tbl_KhoHang.MaHang = inserted.MaHang
END
GO
/* cập nhật hàng trong kho sau khi cập nhật đặt hàng */
CREATE TRIGGER trg_CapNhatDatHang on tbl_DatHang after update AS
BEGIN
   UPDATE tbl_KhoHang SET SoLuongTon = SoLuongTon -
	   (SELECT SoLuongDat FROM inserted WHERE MaHang = tbl_KhoHang.MaHang) +
	   (SELECT SoLuongDat FROM deleted WHERE MaHang = tbl_KhoHang.MaHang)
   FROM tbl_KhoHang 
   JOIN deleted ON tbl_KhoHang.MaHang = deleted.MaHang
end
GO
/* cập nhật hàng trong kho sau khi hủy đặt hàng */
create TRIGGER trg_HuyDatHang ON tbl_DatHang FOR DELETE AS 
BEGIN
	UPDATE tbl_KhoHang
	SET SoLuongTon = SoLuongTon + (SELECT SoLuongDat FROM deleted WHERE MaHang = tbl_KhoHang.MaHang)
	FROM tbl_KhoHang 
	JOIN deleted ON tbl_KhoHang.MaHang = deleted.MaHang
END
```
## Kết luận
Việc mà bạn sử dụng Trigger là không bắt buộc và chúng ta thường tưởng rằng vì thế mà chả ai dùng nó là hoàn toàn sai :D. Nhưng Trigger theo như mình tìm hiểu qua thì vẫn có rất nhiều nơi sẽ sử dụng nó vào mục đích riêng của họ.

Cảm ơn vì các bạn đã đọc.