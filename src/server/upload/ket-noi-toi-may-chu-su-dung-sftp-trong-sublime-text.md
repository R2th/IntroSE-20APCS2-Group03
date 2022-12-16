1. Cài đặt package SFTP
2. Cấu hình và sử dụng sftp để kết nối tới máy chủ
3. Kết

# 1.  Cài đặt package SFTP
- Để kết nối tới máy chủ thì chúng ta thực hiện cài đặt package SFTP trong sublime text hỗ trợ
- *Mở sublime text và chọn Preferences/ Package Control: Install package*
![](https://images.viblo.asia/2cfca8c6-657e-4635-b35b-97792c17af0a.png)
- *Tìm "sftp" chọn để cài đặt*
![](https://images.viblo.asia/3dcc4b44-d302-4e5f-bb20-238544f5e1e1.png)
# 2. Cấu hình và sử dụng SFTP để kết nối tới máy chủ  
Trong folder của bạn click chuột phải chọn SFTP/FTP -> Map to remote... để tiến hành cấu hình
![](https://images.viblo.asia/8954e65e-5459-417f-aefb-13ba5a23b984.png)
### Giải thích một số dòng quan trọng trong file config
![](https://images.viblo.asia/89c48ebb-af42-45d6-bd27-8bb70bdcf1c9.png)
```
"type": "ftp",
```
Kết nối có 2 giá trị là sftp hoặc ftp
```
"save_before_upload": true,
```
Có lưu file trước khi upload không, mặc định là true
```
"upload_on_save": false,
```
Có upload file khi save không, mặc định là false
```
"sync_down_on_open": false,
```
Đồng bộ khi mở file, file sẽ tự đồng bộ từ máy chủ nếu bạn double click để mở file hoặc khi ctrl + s
```
"host": "31.170.160.87",
```
Địa chỉ IP của máy chủ
```
"user": "username",
```
Tên truy cập vào máy chủ
```
"password": "password",
```
Mật khẩu để truy cập vào máy chủ
```
"port": "22",
```
Cổng port của ftp/sftp
```
"remote_path": "/public_html/",
```
Thư mục chứa source trên máy chủ
### Sử dụng SFTP
Sau khi nhập đẩy đủ thông tin cấu hình tại file sftp-config.json bạn đã có thể truy cập vào máy chủ để tiến hành download hoặc upload file
Sau khi download file xong có thể tiến hánh code bình thường
![](https://images.viblo.asia/f57a7519-0567-4f36-ad6f-516262bbd692.png)
# 3. Kết
Đây là tất cả thông tin về SFTP Package trong sublime text, bên trên chỉ là một phần chức năng nhỏ của package này còn rất nhiều các  chức năng khác chúng ta có thể tìm hiểu thêm. Chúc các bạn thành công !