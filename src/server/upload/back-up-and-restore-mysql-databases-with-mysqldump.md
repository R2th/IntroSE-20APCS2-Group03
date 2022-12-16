Trong bài chia sẻ này tôi sẽ giải thích về backup và restore mysql từ command line sử dụng mysqldump.
Bạn có thể sử dụng tiện ích mysqldump để chuyển database MySQL của bạn sang một MySQL server khác.
Nếu bạn không backup database của mình, nếu con server mà chết đó là thảm họa. Để giúp bạn tiết kiệm rất nhiều thời gian, tôi khuyên bạn nên sao lưu cơ sở dữ liệu MySQL của mình.
## Mysqldump Command Syntax
mysqldump có dạng như sau:
```
mysqldump [options] > file.sql
```
* options các bạn có thể xem tại [đây](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html#mysqldump-option-summary)
* file.sql  tên file chúng ta sẽ backup 
Để sử dụng mysqldump thì MySQL server phải đang chạy.
## Backup a Single MySQL Database
Trường hợp sử dụng phổ biến nhất của công cụ mysqldump là sao lưu một cơ sở dữ liệu.
Chúng ta sẽ backup database "ex_database" với user root và lưu trữ với tên file ex_database.sql. Bạn sử dụng command sau:
```
mysqldump -u root -p ex_database > ex_database.sql
```
Sau khi nhập password và xác thực thành công thì quá trình backup bắt đầu thực thi, thời gian nhanh hay chậm còn tùy thuộc vào kích thước database của bạn.
## Backup Multiple MySQL Databases
Sao lưu nhiều cơ sở dữ liệu MySQL bằng một lệnh bạn cần sử dụng tùy chọn --database theo sau là danh sách database bạn muốn sao lưu. Mỗi database phải được cách nhau bằng dấu space.
```
mysqldump -u root -p --databases database_name_a database_name_b > databases_a_b.sql
```
Câu lệnh trên sẽ chứa cả hai databases trong file databases_a_b.sql.
## Backup All MySQL Databases
Tùy chọn --all-databases  sẽ back up tất cả các databases.
```
mysqldump -u root -p --all-databases > all_databases.sql
```
Câu lệnh trên sẽ chứa cả tất cả databases troing file all_databases.sql.
## Backup all MySQL databases to separate files
mysqldump không hỗ trợ backup tất cả databases thành từng file, nhưng chúng ta có thể làm được điều đó khi sử dụng [bash for loop.](https://linuxize.com/post/bash-for-loop/)
```
for DB in $(mysql -e 'show databases' -s --skip-column-names); do
    mysqldump $DB > "$DB.sql";
done
```
Lệnh trên sẽ tạo các file riêng cho mỗi cơ sở dữ liệu bằng cách sử dụng tên cơ sở dữ liệu làm tên tệp nhé.
## Create a Compressed MySQL Database Backup
Nếu database kích thước quá lớn thì ý tường tốt nhất lên nén lại. Sử dụng option gzip để nén.
```
mysqldump database_name | gzip > database_name.sql.gz
```
## Create a Backup with Timestamp
Sử dụng timestamp để tránh lặp tên file backup.
```
mysqldump  database_name > database_name-$(date +%Y%m%d).sql
```
## Restoring a MySQL dump

Bạn có thể khôi phục dump MySQL bằng mysql. Cú pháp chung của lệnh như sau:
```
mysqld  database_name < file.sql
```
Bạn sẽ cần tạo một cơ sở dữ liệu để import. Nếu database đã tồn tại, trước tiên bạn cần xóa nó, sau khi tạo database bạn có thể bắt đầu restore database. 
```
mysql -u root -p -e "create database database_name";
mysql -u root -p database_name < database_name.sql
```
## Restore a Single MySQL Database from a Full MySQL Dump
Nếu bạn đã sao lưu tất cả các cơ sở dữ liệu của mình bằng tùy chọn -all-database và bạn muốn restore database từ một tệp sao lưu có chứa nhiều cơ sở dữ liệu, hãy sử dụng tùy chọn --one-database như dưới đây:
```
mysql --one-database database_name < all_databases.sql
```
## Export and Import a MySQL Database in One Command
Thay vì dump một cơ sở dữ liệu và sau đó import bản sao lưu vào cơ sở dữ liệu MySQL khác, bạn có thể sử dụng như sau:
```
mysqldump -u root -p database_name | mysql -h remote_host -u root -p remote_database_name
```
Trước khi sử dụng command trên bạn cần chắc chắn rằng database tồn tại trên remote server.

## Automate Backups with Cron
Tự động hóa quá trình sao lưu cơ sở dữ liệu cũng đơn giản như tạo một  [công việc định kỳ (cron jobs)](https://linuxize.com/post/scheduling-cron-jobs-with-crontab/), thứ sẽ chạy lệnh mysqldump tại thời điểm được chỉ định.

1. Tạo file .my.cnf trong thư mục user home
```
sudo nano ~/.my.cnf
```
cho đoạn text sau vào fiel my.cnf:
```
[client]
user = dbuser
password = dbpasswd
```
2. Hạn chế quyền của tệp để chỉ người dùng của bạn có quyền truy cập vào nó:

```
chmod 600 ~/.my.cnf
```
3. tạo thư mục backup:
```
mkdir ~/db_backups
```
4. Mở crontab file:
```
crontab -e
```
Thêm công việc định kỳ sau sẽ tạo bản sao lưu tên cơ sở dữ liệu mydb mỗi ngày vào lúc 3 giờ sáng:
```
0 3 * * * /usr/bin/mysqldump -u dbuser mydb > /home/username/db_backups/mydb-$(date +%Y%m%d).sql
```
Hướng dẫn này chỉ bao gồm những điều cơ bản, nhưng nó nên là một khởi đầu tốt cho bất kỳ ai muốn tìm hiểu cách tạo và khôi phục cơ sở dữ liệu MySQL từ dòng lệnh bằng tiện ích mysqldump.

See you!!!

Bạn có thể tham khảo tại đây nhé : https://linuxize.com/post/how-to-back-up-and-restore-mysql-databases-with-mysqldump/#backup-all-mysql-databases-to-separate-files