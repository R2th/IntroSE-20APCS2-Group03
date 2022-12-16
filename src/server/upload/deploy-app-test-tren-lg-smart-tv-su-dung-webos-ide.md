Hiện giờ smart TV đang trở nên dần thông dụng với đời sống hàng ngày của mọi người, do đó nhu cầu lập trình, tạo các ứng dụng trên smart TV cũng ngày càng tăng cao. Trong khi việc hiển thị UI giữa phần mềm giả lập TV và trên TV thực có rất nhiều điểm sai khác. Do đó hôm nay mình sẽ hứong dẫn các bạn cách deploy app lên trên smart TV để test hay kiểm thử phần mềm. Ở đây mình sẽ hướng dẫn các bạn thao tác với smart TV của LG sử dụng hệ điều hành WebOS.

* Lưu ý, trên máy bạn phải cài đặt sẵn phần mềm WebOS TV IDE (xem hướng dẫn download và cài đặt tại [đây](http://webostv.developer.lge.com/sdk/installation/) )

# 1. Tạo tài khoản LG developer:
- Truy cập trang web: http://developer.lge.com .
- Chọn Sign In ở góc trên bên phải trang.
- Trong page quản lý account vừa xuất hiện, chọn "create account" 

![](https://images.viblo.asia/c50d4f0e-cdef-4b94-a35c-e84042082d5c.png)
- Làm theo các bước yêu cầu để tạo account LG developer


# 2. Cài đặt app Developer Mode cho TV:
- Kết nối TV với internet.
- Đăng nhập TV với tài khoản vừa tạo ( **cài đặt**  -> **tất cả cài đặt** -> **cài đặt chung** -> **quản lý tài khoản**).
- Nhấn phím **home** ![](https://images.viblo.asia/bfaaeb78-0883-474c-a632-41c6147fd866.png)  trên remote, chọn **LG Content store**.
- Tìm ứng dụng **"Developer Mode"**.
- Chọn và cài đặt ứng dụng trên.


# 3. Bật Developer Mode:
- Chạy ứng dụng **Developer Mode** trên smart TV.
- Điền tài khoản LG developer của bạn vào.

![](https://images.viblo.asia/83977e0a-e08a-4628-af69-814d3cc7beec.png)

- Bật **"Dev Mode Status"** vào chế độ **ON** (sau khi kích hoạt chế độ này, TV sẽ tự động khởi động lại).

![](https://images.viblo.asia/cbf5001b-be8c-458b-ace5-765fbc992bbe.png)


# 4. Kết nối TV với PC sử dụng WebOS Ide:
- Để kết nối thành công thì TV và PC phải sử dụng chung một mạng wired (mạng dây).
- Khởi động WebOS TV Ide.
- Chọn **New Connection** từ menu **Target Configuration** 

![](https://images.viblo.asia/e5cd3962-efb1-4323-93e2-fa93ec96e35d.png)

- Chọn **Device Type** là **LG Smart TV**, sau đó nhập thông tin IP của TV vào:

![](https://images.viblo.asia/f7699e51-1212-4c53-94c6-93d522eb4bf1.png)

- Đổi trạng thái của **Key Server**  trên **Developer Mode**  app thành **ON**.

![](https://images.viblo.asia/5b51aa67-5ce5-4c15-9d42-e14532f82c78.png)

- Chuột phải vào Connection vừa tạo, chọn **Generate Key**:

![](https://images.viblo.asia/59250d0d-74d6-475f-a006-65324d303240.png)

- Điền mã **Passphrase** vào rồi chọn **Finish** (mã **Passphrase** lấy trên **Developer Mode** app, lưu ý là mã này có phân biệt ký tự hoa thường).

![](https://images.viblo.asia/052337a3-c0d3-4527-b0fc-878c3bd64785.png)

- Chuột phải vào **Connection** vừa tạo ở bước trên, chọn **connect**. Sau khi kết nối thành công, **Connection** sẽ hiển thị như sau:

![](https://images.viblo.asia/a29fba6b-e020-43b9-98fd-f8f391ed48d1.png)


# 5. Deploy app lên TV:
- Vào thư mục dự án bằng terminal, gõ lệnh **enact pack** khi đó thư mục **dist** sẽ được tạo ra, ta sẽ dùng thư mục này để import app vào **WebOS Ide** (Nếu là Veep thì sử dụng lệnh **build project**).

![](https://images.viblo.asia/c825b3a2-c089-4255-95b8-58d5087bbc83.png)

- Mở **WebOS Ide** nhấn chuột phải vào phần menu **Project Explorer** chọn **Import**, chọn **Import webOS Project**, nhấn next để tiếp tục.

![](https://images.viblo.asia/5bd01a46-1c31-48f3-a2d6-b05c308986e2.png)

- Chọn đường dẫn tới thư mục **dist** vừa được tạo ở trên, chọn **Project Type** là **webOS**

![](https://images.viblo.asia/3e214381-1d41-402b-a784-5e255e1076e7.png)

- Sau khi import thành công, app sẽ được hiển thị ở menu **Project Explorer**, chuột phải vào app chọn **Run as...** -> **1 webOS Application**, chọn **Target** là **Connection**  mà bạn đang kết nối với TV, **Packaging Type** là **non-minify**. Chọn run để chạy app trên TV.

 ![](https://images.viblo.asia/fc2d5015-f09d-40c0-86df-cc222e8f8570.png)
 
- Sau khi khởi chạy app trên TV thành công, menu **Target Configuration** có dạng như sau, bạn có thể nhấn chuột phải vào app để lựa chọn **Run**, **Debug** hoặc **Uninstall** app.

![](https://images.viblo.asia/2f0c28db-0e3e-4b54-9c8f-8ca2ab1c4fa0.png)


Vậy là app của bạn đã sẵn sàng để chạy trên smart TV, mục **Debug** sẽ tạo cho bạn 1 màn hình "inspect" trên máy tính kết nối với TV để bạn chỉnh sửa css, xem console,... hệt như khi bạn inspect 1 trang web giúp bạn dễ dàng hơn trong việc fix bug hay kiểm tra follow của app.