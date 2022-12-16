*Như lần trước, chúng ta đã tạo được 3 bảng sản phẩm, loại hàng và hãng sản xuất ( đây là 3 bảng cơ bản để tạo chức năng quản lí hàng hóa đơn giản trong cửa hàng
Sau đây, chúng ta cùng thực hiện 1 số thao tác trong quản lí hàng hóa của cửa hàng:*
## 1. Lấy thông tin về sản phẩm trong cửa hàng
a. Lấy thông tin với số lượng 1 000 sản phẩm trong cửa hàng ( lấy toàn bộ sản phẩm bỏ TOP (1000) )
```
SELECT TOP (1000) [ID]
      ,[TenSanPham]
      ,[Gia]
      ,[ID_Loaihang]
      ,[ID_Hangsx]
  FROM [Cua_hang].[dbo].[sanpham2]
```
![](https://images.viblo.asia/2a539b20-287c-469c-8c9f-38f62e734d16.png)


b. Tìm kiếm thông tin sản phẩm trong cửa hàng
- Tìm kiếm sản phẩm theo tên

```
SELECT [ID]
      ,[TenSanPham]
      ,[Gia]
      ,[ID_Loaihang]
      ,[ID_Hangsx]
  FROM [Cua_hang].[dbo].[sanpham2] WHERE [TenSanPham] LIKE '%phòng%'
```
![](https://images.viblo.asia/d92725cd-ecc8-4cfb-b860-1e3f25b0e885.png)
- Tìm kiếm sản phẩm theo loại hàng:
Thực hiện tìm kiếm sản phẩm có loại hàng là “Bông ráy tai”
```
SELECT [Cua_hang].[dbo].[sanpham2].[ID]
     ,[TenSanPham]
      ,[Gia]
      ,[Cua_hang].[dbo].[Loai_hang].[TenLoaiHang]
      
  FROM [Cua_hang].[dbo].[sanpham2],[Cua_hang].[dbo].[Loai_hang] WHERE [ID_Loaihang] = [Cua_hang].[dbo].[Loai_hang].[ID] AND [ID_Loaihang] = (SELECT [ID]
      
  FROM [Cua_hang].[dbo].[Loai_hang] WHERE [TenLoaiHang] = ‘Xà phòng’)
```
![](https://images.viblo.asia/0dd320c4-da9f-43d0-9ced-7706ad44b3c1.png)

- Tìm kiếm sản phẩm theo hãng sản xuất
Thực hiện tìm kiếm sản phẩm có hãng sản xuất là là “Thebol”

```
SELECT [Cua_hang].[dbo].[sanpham2].[ID]
      ,[TenSanPham]
      ,[Gia]
      ,[Cua_hang].[dbo].[Hang_san_xuat].[TenHangSanXuat]
      
  FROM [Cua_hang].[dbo].[sanpham2],[Cua_hang].[dbo].[Hang_san_xuat] WHERE [ID_Hangsx] = [Cua_hang].[dbo].[Hang_san_xuat].[ID] AND [ID_Hangsx] = (SELECT [ID]
      
  FROM [Cua_hang].[dbo].[Hang_san_xuat] WHERE [TenHangSanXuat] = 'Thebol')

```

![](https://images.viblo.asia/940248ac-2672-4cc8-9cb1-405bdc04ccfd.png)

c. Thống kê số lượng các sản phẩm trong cửa hàng

Thống kê số lượng sản phẩm có tên hãng sản xuất là ‘Thebol’

```
SELECT COUNT([Cua_hang].[dbo].[sanpham2].[ID]) as Số lượng sản phẩm hãng Thebol '
      
      
  FROM [Cua_hang].[dbo].[sanpham2],[Cua_hang].[dbo].[Hang_san_xuat] WHERE [ID_Hangsx] = [Cua_hang].[dbo].[Hang_san_xuat].[ID] AND [ID_Hangsx] = (SELECT [ID]
      
  FROM [Cua_hang].[dbo].[Hang_san_xuat] WHERE [TenHangSanXuat] = 'Thebol')
```

![](https://images.viblo.asia/c9bcd788-7373-48de-bfb8-d12303365e97.png)

## 2. Lấy thông tin về hãng sản xuất các sản phẩm trong cửa hàng

a. Lấy thông tin toàn bộ hãng sản xuất trong cửa hàng
```
SELECT [ID]
      ,[TenHangSanXuat]
  FROM [Cua_hang].[dbo].[Hang_san_xuat]
```
![](https://images.viblo.asia/4e6a6641-0b8b-45e5-9702-5303132e8128.png)

b. Tìm kiếm thông tin hãng sản xuất trong cửa hàng
Tìm hãng sản xuất có tên hãng chứa từ ‘eb'

```
SELECT [ID]
      ,[TenHangSanXuat]
  FROM [Cua_hang].[dbo].[Hang_san_xuat] WHERE [Cua_hang].[dbo].[Hang_san_xuat].[TenHangSanXuat] LIKE '%eb%'

```
![](https://images.viblo.asia/7efd3e45-3ec0-4e43-b58b-5423a9c11224.png)

c. Thống kê số lượng các hãng sản xuất cửa hàng:

Thống kê số lượng sản phẩm trong cửa hàng của từng hãng sản xuất

```
SELECT [ID]
      ,[TenHangSanXuat]
	  ,(SELECT COUNT ([Cua_hang].[dbo].[sanpham2].[ID])
      
  FROM [Cua_hang].[dbo].[sanpham2] WHERE [Cua_hang].[dbo].[sanpham2].ID_Hangsx = [Cua_hang].[dbo].[Hang_san_xuat].[ID] ) as 'SỐ Lượng sản phẩm'
  FROM [Cua_hang].[dbo].[Hang_san_xuat]
```
![](https://images.viblo.asia/a3aaf95a-177f-45f8-b336-be0f79b7cafd.png)

## 3. Lấy thông tin về loại hàng các sản phẩm trong cửa hàng

a.Lấy thông tin toàn bộ loại hàng trong cửa hàng

```
SELECT [ID]
      ,[TenLoaiHang]
  FROM [Cua_hang].[dbo].[Loai_hang]

```

![](https://images.viblo.asia/9aa83d3d-0fec-4e18-a0a4-9c87beff057d.png)

b. Tìm kiếm thông tin loại hàng trong cửa hàng

Tìm loại hàng có tên chứa từ ‘Xà’
```
SELECT [ID]
     ,[TenLoaiHang]
  FROM [Cua_hang].[dbo].[Loai_hang] WHERE [TenLoaiHang] LIKE '%Xà%'

```

![](https://images.viblo.asia/44354d27-2702-4499-9494-9cb2b1922243.png)


c. Thống kê số lượng các loại hàng  trong cửa hàng

Thống kê số lượng sản phẩm trong cửa hàng của từng loại hàng

```
SELECT [ID]
      ,[TenLoaiHang]
	  ,(SELECT COUNT ([Cua_hang].[dbo].[sanpham2].[ID])
      
  FROM [Cua_hang].[dbo].[sanpham2] WHERE [Cua_hang].[dbo].[sanpham2].ID_Loaihang = [Cua_hang].[dbo].[Loai_hang].[ID] ) as 'SỐ Lượng sản phẩm'
  FROM [Cua_hang].[dbo].[Loai_hang]

```
![](https://images.viblo.asia/48a7d0d6-d497-44d4-b400-ae1d2ba82e27.png)