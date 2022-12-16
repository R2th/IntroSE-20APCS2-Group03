# Đặt vấn đề
* Khi vận hành hệ thống máy chủ nhiều khi có những lỗi rất khoai cứ lâu lâu dịch vụ nó lại tự động dừng lại (auto stop service). Lỗi này có thể do VPS/Server thiếu RAM không được tối ưu tài nguyên hoặc có thể do lỗi code web, đòi hỏi sysadmin cần có thời gian để xử lý.
* Dịch vụ thì luôn đòi hỏi online 24/24 mà phải shutdown chờ sửa lỗi thì phá sản mất. Do đó, trong trường hợp này chúng ta sẽ phải tạo shell script auto start service mỗi khi nó stop để giải quyết tình huống.
* Nói chung lỗi này xảy ra với rất nhiều loại services phổ biến nhất vẫn là MySQL và httpd (webserver) với các thông báo lỗi:
```
Error establishing a database connection
 Database connection error (2): Could not connect to MySQL
 Database error
 
thuysys.tech refused to connect.
 Search Google for thuysys tech
 ERR_CONNECTION_REFUSED
```
* Mình sẽ đặt tình huống giả định service mysql tự động stop không rõ nguyên nhân, chúng ta phải làm sao để tự động start mysql.
* Trước hết phải phân tích tình huống và liệt kê ra các việc cần làm rồi chuyển hóa thành dòng lệnh trong file script.
* Làm sao kiểm tra khi nào dịch vụ stop, dùng câu lệnh nào để check được status của dịch vụ.
** Câu lệnh start dịch vụ khi lỗi.
** Cách viết script check status và start service khi lỗi xảy ra.
** Làm thế nào chạy script tự động.
### CÁCH KIỂM TRA STATUS SERVICE
* Có nhiều lệnh để kiểm tra trạng thái của dịch vụ xem có đang chạy hay không, bạn có thể dùng netstat hoặc ps nhưng phải kết hợp với các options để xuất được ra kết quả như ý.
* Với mysql khi chạy trên máy chủ sẽ có 2 dấu hiệu để nhận diện nó, ví dụ mysql chạy với port 3306, có process name là mysql hay mysqld. Như vậy chúng ta chỉ cần chạy netstat và ps để xem có các dấu hiệu nhận biết đó không là được, nếu có thì service đang start còn không thì service đang stop.
* Đây là 2 câu lệnh bạn cần:
```
ps -ef | awk '{ print $8 }' | grep mysqld | wc -l
netstat -tulpn | awk '{ print $7 }' | grep mysqld | wc -l
```
* Các bạn mới làm việc với linux có thể sẽ dị ứng với chuỗi lệnh bên trên, cảm thấy rất khó hiểu.
* Mình hướng dẫn các bạn một cách đơn giản để hiểu ý nghĩa của chuỗi lệnh, bạn sử dụng SSH gõ từng đoạn lệnh nhỏ xem kết quả xuất ra màn hình như nào rồi thêm các đoạn khác vào. Như ví dụ trên mình sẽ nhập lệnh:
```
ps -ef: nó sẽ xuất ra màn hình tất cả các process đang chạy cùng thông tin của process đó.
| awk '{ print $8 }' : lấy ra cột thứ 8 trong kết quả lênh ps -ef
| grep mysqld: lấy ra những dòng có chữ mysqld
| wc -l: đếm số dòng có chữ mysqld
```
* Như vậy sau khi chạy một trong hai lệnh trên chúng ta xẽ nhận được một số duy nhất 1 đồng nghĩa với mysql đang start nếu là 0 thì mysql stop.
### LỆNH START SERVICE
* Linux cũng có nhiều cách để start dịch vụ, trên CentOS 5/6/7 Ubuntu 10/12/14/15/16 chúng ta có những câu lệnh sau:
```
/etc/init.d/mysql start
service mysql start
systemctl mysql start
```
* Với máy chủ Apache2 hay nginx nếu bị lỗi bạn cũng dùng một trong 3 lệnh trên để thực hiện start/stop/restart service được nhé.
### VIẾT SHELL SCRIPT
* Đã có đủ các thông tin cần thiết phần này chúng ta sẽ bắt tay vào viết script đầu tiên, với logic:
* Nếu kiểm tra service trả về kết quả lớn hơn 0 thì hiển thị dòng thông báo Running Service, ngược lại sẽ thực hiện lệnh start service.
* Ngắn gọn vậy thôi, bạn dùng trình soạn vi/vim hoặc nano tạo file auto_start_mysql.sh
`vi /var/www/script/auto_start_mysql.sh`
* Với nội dung sau:
```
#!/bin/bash
 service=mysqld
if (( $(ps -ef | awk '{ print $8 }' | grep mysqld | wc -l) > 0 ))
 then
 echo "$service chay ngon lanh"
 else
 /etc/init.d/$service start
 fi
```
* Trong script này chỉ có duy nhất một lệnh điều kiện if…else đơn giản, muôn hiểu cách viết lệnh, dấu chấm, dấu phảy, space, ngoặc đơn, ngoặc kép bạn phải tự mình đọc tài liệu cơ bản shell script trên google, mình không chi tiết hết được.
* mỗi OS sẽ có tên khác nhau lúc là mysql lúc lại mysqld bạn thay thế cho phù hợp với hệ thống của mình.
### TỰ ĐỘNG CHẠY SHELL SCRIPT VỚI CRONTAB
* Giờ đến bước tự động hóa công việc, bạn cần phân quyền thực thi script cho người dùng.
`chmod +x /var/www/script/auto_start_mysql.sh`
* Tham khảo: cách chmod trên linux.
* Chạy lệnh crontab -e tạo crontab với nội dung bên dưới.
```
*/5 * * * * sh /var/www/script/auto_start_mysql.sh
```
* Tùy mức độ quan trọng của service và tần suất xảy ra lỗi, bạn đặt thời gian chạy crontab phù hợp như bên trên mình để cứ 5 phút chạy script một lần.
Done.
### Nguồn: https://www.thuysys.com/tools/huong-dan-tao-shell-script-tu-dong-start-dich-vu.html