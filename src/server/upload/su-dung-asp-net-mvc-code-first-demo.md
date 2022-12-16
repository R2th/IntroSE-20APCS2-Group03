# 1. Giới thiệu
## *Entity Framework Code First là gì??*
- Nói đơn giản, "Code First" giúp bạn xây dựng cấu trúc dữ liệu từ các lớp model (hay business/domain class).
- Entity Framework Code-First sẽ giúp bạn thực hiện tất cả các công đoạn khác, từ tạo cơ sở dữ liệu, tạo bảng, truy vấn dữ liệu, v.v.. Nếu có sự thay đổi về cấu trúc class, Entity Framework Code-First cũng có thể giúp bạn chuyển đổi cấu trúc cơ sở dữ liệu tương ứng một cách nhanh chóng và tiện lợi, đặc biệt là không làm mất dữ liệu cũ.
# 2. Demo xây dựng ứng dụng quản lý sách bằng Code First.
## 2.1. Chuẩn bị
- Visual Studio 2012 -> 2019
- SQL Server
- Entity Framework  -> Mở cửa sổ Package Manager Console ->  `install-package entityframework`
- Ở đây mình sẽ tạo riêng cơ sở dữ liệu ra riêng để dễ quan sát nhé.
## 2.2. Tiến hành
### Bước 1: Tạo cơ sở dữ liệu
- Mình sẽ tạo database có tên là **BookManager** với 2 bảng link với nhau nhằm để lấy dữ liệu 2 bảng luôn.

![](https://images.viblo.asia/f854b31a-cf2c-4a4d-a1a9-942f96e8ce17.PNG)
> - Bảng **Category** sẽ chứa thông tin của loại sách.
> - Bảng **Book** sẽ chứa thông tin của sách *(tên sách, hình ảnh, ngày tạo, blabla ......*)
> - Khoá ngoại sẽ là **CategoryID** link đến bảng **Category** nhằm để lấy tên loại sách.

- ![](https://images.viblo.asia/2d380892-5655-40a2-a2d6-1be77c21273c.PNG)
- ![](https://images.viblo.asia/450c3987-8751-49cb-880e-888efc4acf51.PNG)

*Dữ liệu của 2 bảng sẽ là như trên*
### Bước 2: Tạo project
- Mình sẽ tạo 1 project asp.net MVC có tên là **BookManager** nhé.

![](https://images.viblo.asia/d232311b-a168-446b-b929-041db3b716c0.PNG)
### Bước 3: Tạo Model
- Chuột phải vào Model -> Add -> New item -> qua phần data chọn vào **ADO.NET** nhé.

![](https://images.viblo.asia/738c800e-47e6-472e-a683-555e3d38e445.PNG)

- Chọn vào Code First

![](https://images.viblo.asia/4c7c7cda-1689-4488-8fd0-2275afde1c15.PNG)

- Điền Server Name vào và chọn tên database

![](https://images.viblo.asia/b16aa40c-4ac0-4545-a07f-1557239a7ab5.PNG)

- Tích chọn tất cả các bảng thêm vào -> Finish

![](https://images.viblo.asia/99c92a7b-feca-4b06-a59d-8acb156f3edb.PNG)

### Bước 4: Tạo Controller
- Chuột phải vào folder Controller -> Add -> controller -> MVC 5 Controller With views, using Entity Framework.

![](https://images.viblo.asia/1d484181-8d86-494d-8700-6a5da8daf284.PNG)

- Chọn Model Class là Model mà bạn muốn tạo tương ứng với bảng ở cơ sở dữ liệu, mình sẽ tạo bảng loại sách.

![](https://images.viblo.asia/2bfdbcb2-9f59-4c0b-ab57-5de99cadb0ed.PNG)

- Làm tương tự với Model sách

![](https://images.viblo.asia/0abf2dbe-99b3-46f7-b794-046e39ae268a.PNG)

- Sau khi tạo xong controller thì các bạn sẽ nhìn ở Views sẽ có các file .cshtml tương ứng với thêm, sửa, xoá và hiển thị.

![](https://images.viblo.asia/eea226b9-3d88-4304-b06b-8e3a73ccd291.PNG)

### Bước 5: Tuỳ chỉnh
- Các bạn có thể chỉnh sửa giao diện và tên hiển thị trong các file **.cshtml**, cấu trúc vẫn tương tự như file **.html**

![](https://images.viblo.asia/b0f4f455-3388-4cdc-a3e0-90749e9cd7fa.PNG)

![](https://images.viblo.asia/319fa041-1c10-4803-bbee-019c62abb379.png)

- Địa chỉ các trang sẽ có cấu trúc như sau: **localhost:{Port}/{Controller}/{Action}**
- Các bạn có thể custom chuyển trang ở phần **_Layout.cshtml**

# 3. Tổng Kết
- Vậy là mình đã demo xong quá trình tạo 1 project asp.net sử dụng code first. Bài viết sẽ có nhiều sơ sót, các bạn có thể đóng góp ý kiến thêm để các bài viết sau tốt hơn ạ. Chúc các bạn thành công!!!
# 4. Tham Khảo
- Nguồn Entity Framework: https://www.entityframeworktutorial.net/code-first/what-is-code-first.aspx
- Nguồn Microsoft: https://docs.microsoft.com/en-us/ef/ef6/modeling/code-first/workflows/new-database