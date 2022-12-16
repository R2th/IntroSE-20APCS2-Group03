Trong Case Study Học WordPress bài số 4 về hướng dẫn cài đặt localhost trên máy tính với Xampp và AppServ. Tuy nhiên trong quá trình cài đặt có thể sẽ xuất hiện một số lỗi phổ biến như : Bạn không thể Start được Apache để phân giải file php và khi đó localhost sẽ báo Not found nghĩ là không tìm thấy trang web của bạn. Bài viết này mình sẽ liệt kê ra 2 cách giúp bạn khắc phục lỗi không bất được Apache trên máy tính.
## Cách 1: Sửa lại file HTTPD-SSL để Start Apache
Khi các bạn cài đặt XAMPP lên máy để tạo máy chủ web apache sẽ sử dụng mặc định cổng 80 để truyền dữ liệu, tuy nhiên các phần mềm khác được cài đặt trên máy đã chiếm cổng 80 để sử dụng khiến bạn không thể khởi động được Apache
![](https://images.viblo.asia/d7d29331-1194-4388-a1c1-36832168fc98.png)
Để sửa lại file HTTPD-SSL bạn làm như sau:

**Bước 1**: Tìm đến thư mục cài đặt XAMPP > Tìm đến file HTTPD-SSL theo đường dẫn thường mặc định như sau:

**C:\program fileXAMPPapacheconforiginalextra**

**Bước 2 :** Bạn click chuột phải vào File HTTPD-SSL và chọn mở bằng notepab > Click vào Edit trên thanh công cụ của Notepad >Chọn **Replace** một cửa sổ mới xuất hiện

Dòng  **Find what**  bạn nhập vào 443

Dòng  **Replace  with** bạn nhập vào 4499

=> Chọn **Replace All** để thay thế tất cả > Sau đó lưu nó lại và **start Apache** rồi ra trình duyệt gõ localhost để kiểm tra xem apache đã được hoạt động bình thường chưa.  

![](https://images.viblo.asia/7532e07b-46a8-4977-8614-1f8ceac3c0fa.png)

## Cách 2: Đổi Post cho Apache
Với cách 2 này chúng ta cần đổi post cho Apache sang một cổng khác

**Bước 1**: Bạn bật phần mềm XAMPP lên > Click vào ô config nằm trên dòng Apache > Click vào Apache (httpd.conf) để mở file.
![](https://images.viblo.asia/7edd1ef5-e3d9-4ccc-989a-ae1f527ddb32.png)
**Bước 2**: Chọn mở bằng notepab > Click vào Edit trên thanh công cụ của Notepad >Chọn Replace một cửa sổ mới xuất hiện


Dòng **Find what** bạn nhập vào 80

Dòng **Replace with** bạn nhập vào 81

 => Sau đó chọn **Replace All** > Save lại
 
**** Bước 3***: Ra trình duyệt để kiểm tra
 
Các bạn vào xampp > Click vào **start Apache** rồi gõ lên trình duyệt localhost:81

Bài viết trên mình giới thiệu tới các bạn hai cách khắc phục lỗi không start được Apache trong XAMPP đơn giản.