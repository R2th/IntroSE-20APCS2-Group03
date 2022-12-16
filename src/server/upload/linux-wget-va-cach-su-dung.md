## Wget là gì.
- wget là 1 công cụ trong linux. Bạn có thể sử dụng nó để lấy file từ các máy chủ web khác nhau. Nó hỗ trợ các giao thức như FTP, SFTP, HTTP và HTTPS.
- Thường thì wget sẽ được tích hợp sẵn trong ubuntu luôn. Trong trường hợp chưa có thì bạn chạy câu lệnh sau để cài đặt `sudo apt-get install wget`
Sử dụng wget nó có tiến trình download và tốc độ download, thời gian còn lại rất tiện dụng
![](https://images.viblo.asia/82fd03db-5627-4e34-9b3e-867334fafa39.png)


## Cách dùng
### Tải 1 file
Một trong những lệnh cơ bản nhất của wget là download xuống 1 file và luư trữ trong thư mục hiện tại
```
wget https://wordpress.org/latest.zip
```
### Tải về nhiều file cùng lúc
Hoàn toàn có thể sử dụng wget để tải về nhiều tập tin cùng lúc. Bằng cách tạo 1 file text có chứa các url cần tải xuống trong đó
```
nano download_list.txt
```
Nhập các link cần tài vào vd:
```
https://wordpress.org/latest.zip

https://downloads.joomla.org/cms/joomla3/3-8-5/Joomla_3-8-5-Stable-Full_Package.zip

https://ftp.drupal.org/files/projects/drupal-8.4.5.zip
```
Cách sử dụng sẽ hơi khác 1 chút với download 1 file. Ta cần thêm tham số -i vào wget
```
wget -i download_list.txt
```
### Tải 1 file về và lưu với 1 tên khác
Để có thể lưu 1 file tải về với tên khác trong wget ta dùng tham số -O
```
wget -O example.zip https://wordpress.org/latest.zip
```
### Tải về và lưu vào 1 thư mục khác được chỉ đinh
Để có thể lưu được ở thư mục khác với thư mục làm viêc hiện tại thì chúng ta sử dụng tham số -P
```
wget -P /location/download/ https://wordpress.org/latest.zip
```
### Giới hạn tốc độ tải
Để giới hạn tốc độ tải xuống chúng ta sử dụng tham số `–limit-rate` . Điều này rất có lợi khi bạn tải file có dung lượng lớn và `-limit-rate` sẽ ngăn không cho sử dụng toàn bộ băng thông của bạn
```
wget –limit-rate=500k https://wordpress.org/latest.zip
```
Câu lệnh trên sẽ giới hạn tốc độ tải là 500KB
### Đặt số lần rettry lại khi tải file thất bại
Khi có sự cố về internet thì việc download sẽ thất bại. Để cho nó tự động thực hiện tải lại khi bị lỗi thì chúng ta sử dụng tham số `-tries`
```
wget -tries=100 https://wordpress.org/latest.zip
```
Lệnh trên sẽ thực hiện tải lại 100 lần khi việc download bị xảy ra lỗi
### Tải file trong nền
Đối với 1 số tập tin cực lớn, bạn muốn chạy ẩn nó dưới nền. Chung ta hoàn toàn có thể làm được với tham số `-b` 
```
wget -b http://example.com/testing.zip
```
Sau khi chạy câu lệnh này thì 1 file `wget-log` sẽ được tạo ra trong thư mục làm việc hiện tại của bạn. Sử dụng để kiểm tra tiến trình và trạng thái của lệnh download trên. Muốn xem log trong quá trình chạy thì sử dụng lệnh `tail -f wget-log`, log sẽ được hiển thị theo thời gian thực
### Tải với giao thức FTP
Bạn chỉ cần xác định username và mật khẩu đúng là được
```
wget –ftp-user=USERNAME –ftp-password=YOUR_PASSWORD ftp://example.com/something.zip
```
### Tiếp tục tải khi bị gián đoạn
Trong quá trình tải có thể bị gián đoạn do sự cố internet hoặc mất điện. Thay vì bắt đầu lại từ đầu thì chúng ta sử dụng tham số `-c` để việc tải được tiếp tục
```
wget -c https://example/file-sieu-to-khong-lo.zip
```
### Tải toàn bộ nội dung website
Với wget chúng ta hoàn toàn có thể tải toàn bộ mã nguồn của website về để xem offline
```
wget –mirror –convert-links –page-requisites –no-parent -P documents/websites/ https://example.com
```
- `–mirror`: Nó làm cho việc tải xuống của bạn thực hiện đệ quy.
- `–convert-links`: Tất cả các liên kết sẽ được chuyển đổi để thích hợp cho việc sử dụng ngoại tuyến 
- `–page-requisites`: bao gồm tất cả các tệp cần thiết như CSS, JS và hình ảnh.
- `–no-parent`: Nó đảm bảo rằng các thư mục trên hệ thống phân cấp không được truy xuất
- `-P documents/websites/`: Nơi lưu trữ source code sau khi tải xuống

### Xác định vị trí các liên kết bị hỏng
Với wget chúng ta còn có thể dùng để xác định các url bị lỗi 404 trên 1 website

```
wget -o wget-log -r -l 5 –spider http://example.com
```
- `-o`: Tập hợp output thành một tập tin để sử dụng sau.
- `-l`: Chỉ định mức đệ quy.
- `-r`: Làm cho việc tải về theo cách đệ quy.
- `–spider`: Đặt wget vào chế độ spider.

Sau khi chạy xong thì kiểm tra `wget-log` để xem danh sách các liên kết bị hỏng bằng lệnh sau
```
grep -B 2 ‘404’ wget-log | grep “http” | cut -d ” ” -f 4 | sort -u
```
### Tải các tệp được đánh số
Nếu bạn có file hoặc hình ảnh được đánh số theo 1 danh sách, bạn hoàn toàn có thể tải xuống tất cả chúng với 1 câu lệnh
```
wget http://example.com/images/{1..50}.jpg
```
## Kết
Trên đây mình đã giới thiệu cho các bạn về wget và những cách sử dụng khác nhau của wget, để các bạn có thể tận dụng được wget tốt nhất có thể. 
Cảm ơn mọi người đã theo dõi. Ở bài viết sau mình sẽ giới thiệu đến các bạn, 1 tính năng hay hoặc 1 thủ thuật hay trên hệ điều hành linux