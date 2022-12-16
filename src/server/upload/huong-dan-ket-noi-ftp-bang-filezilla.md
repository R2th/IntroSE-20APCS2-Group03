# Hướng dẫn sử dụng FileZilla
1. Giao thức chuyển nhượng tập tin FTP là gì ?
2. Tải và cài đặt FileZilla
3. Kết nối FTP bằng FileZilla
4. Thao tác với FileZilla
## 1. Giao thức chuyển nhượng tập tin FTP là gì ?
- Nó được sử dụng để truyền tập tin thông qua giao thức TCP hoặc internet, để sử dụng được FTP thì cần có hai máy, một máy client và một máy server.FTP giúp chúng ta quản lý toàn bộ các tập tin và thư mục trên host dễ dàng hơn
- Hiện nay khi mua các gói host như godaddy, PAVietNam,... đều hỗ trợ Cpanel hỗ trợ kết nối FTP qua port 21. thông qua FTP người dùng có thể load/upload các tập tin âm thanh, hình ảnh, video,.. tới host
- Ngoài FTP chúng ta có thể sử dụng win scp, plugin SMTP trong sublime text,...
## 2. Tải và cài đặt FileZilla
- Chúng ta có thể vào [đây](https://filezilla-project.org/download.php) để tải và cài đặt
![](https://images.viblo.asia/fff96b40-c8e5-4285-9026-ac1927801dfb.png)
- FileZilla cũng hỗ trợ kết nối tới một số nhà dịch vụ lưu trữ tập tin phổ biến hiện nay như Amazon S3, Google Drive, Box, Dropbox,...
## 3. Kết nối FTP bằng FileZilla
- Giao diện filezilla sau khi cài đặt:
![](https://images.viblo.asia/632fa147-208c-46c1-a854-738dafab6a80.png)
### Để kết nối chúng ta phải thực hiện các bước sau:
***Bước 1:***   ***nhập thông tin truy cập mục 1,2,3,4 trong ảnh***

1. Địa chỉ IP hoặc host của website cần truy cập
2. User name được phép truy cập vào host
3. Password đăng nhập vào host
4. Port kết nối FTP, mặc định là 21

***Bước 2:*** ***kết nối bằng cách ấn nút Quickconnect***
- Sau khi kết nối thành công:
![](https://images.viblo.asia/3259bccc-e459-4d22-a835-ccb7fd882920.png)


1. Dữ liệu trên máy tính của chúng ta
2. Dữ liệu trên host
    * Thư mục chứa Wordpress source code sau khi upload lên host nằm ở mục public_html
## 4. Thao tác với FileZilla
* Upload file lên host:
- Chọn file cần update dưới local và thư mục chứa trên host để tải tập tin:
![](https://images.viblo.asia/9e7838e6-4640-413e-b8d5-0379349a3c5d.png)
- Kết quả:
![](https://images.viblo.asia/ee9a7472-e656-492b-87d3-7af5804b878c.png)
- ***Ngoài ra còn các chức năng khác như download tập tin từ host về local, update thư mục, tập tin âm thanh, hình ảnh, video,... tương tự như thao tác trên***
## 5. Kết 

Đây là toàn bộ cách kết nối và sử dụng filezilla, nó khá phổ biến hiện nay giúp việc tải source lên host dễ dàng hơn. Ngoài FileZilla ra còn các mã nguồn mở khác các bạn có thể tham khảo thêm...