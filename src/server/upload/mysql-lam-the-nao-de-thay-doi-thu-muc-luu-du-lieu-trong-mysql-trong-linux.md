Khi làm việc với Mysql bản thân tôi gặp một vấn đề là mong muốn thay đổi vị trí lưu data(Data đựoc định nghĩa ở đây là: Database).

## Nguyên nhân:

Tại sao bạn muốn thay đổi vị trí lưu trữ dữ liệu mặc định của mysql

1. Bạn muốn xác định một thư mục cá nhân hoặc một folder khác trong ổ cứng làm nhiệm vụ chưa data thay vì mặc định là folder(`/var/lib/mysql`)
2. Khi một database của bạn bị hỏng, dẫn tới không thể khởi động đựoc services mysql.
3. Bạn sử dụng docker.
4. Bạn muốn backup một database trước khi xóa tất cả mọi thứ liên quan tới mysql.

## Thực hiện
`Notes: Hành động của mình dựa trên conifg mysql 5.6 và server linux 14.04 vì vậy với các version khác có thể có sai khác` 
1. Tắt services mysql
```shell
/etc/init.d/mysql stop
```

2. Backup folder `/var/lib/mysql` sang một vị trí an toàn
```shell
mv /var/lib/mysql /backup_folder/
```
3. Tạo folder backup
```
mkdir /new_folder_mysql/
```
4. phần quyền cho folder mới giống với folder cũ

```shell
chown --reference=/backup_folder /new_folder_mysql
chmod --reference=/backup_folder /new_folder_mysql
```
5. Copy file mặc định của mysql

```
cp -rp /backup_folder/auto.cnf /new_folder_mysql
cp -rp /backup_folder/debian-5.6.flag /new_folder_mysql
cp -rp /backup_folder/master.info /new_folder_mysql
cp -rp /backup_folder/mysql /new_folder_mysql
cp -rp /backup_folder/ibdata1 /new_folder_mysql
cp -rp /backup_folder/mysql_upgrade_info /new_folder_mysql
cp -rp /backup_folder/performance_schema /new_folder_mysql
```

6. Thay đổi `datadir` của mysql

Trong file: `/etc/mysql/my.cnf`
thay đổi 
```
datadir     = /var/lib/mysql
```
=>
```
datadir     = /new_folder_mysql
```

7. Khởi động mysql

```shell
/etc/init.d/mysql start
```

## Rủi ro
Khi thực hiện các bước trên, bạn có thể gặp các vấn đề như 

1.  Không khởi động đựơc mysql. Tuy nhiên hãy bình tính xem log của service mysql trong folder (`/var/log/mysql/error.log` hoặc `/var/log/syslog`).
2. Lo sợ mất data hoặc không truy cập lại đựoc data cũ. (Bạn đã có một folder `/backup_folder` vì vậy hãy tự tin thực hiện công việc mà không cần sợ việc này).

## Kết Luận

Chúc bạn may mắn khi config mysql, tuy nhiên với mỗi version có thể khác nhau, vì vậy hãy config trước dưới local và tạo môi trường giống với production để config chúng.