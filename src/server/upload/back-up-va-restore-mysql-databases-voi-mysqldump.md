Bài viết này sẽ phân tích cho bạn làm thế nào để backup và restore cơ sở dữ liệu với Mysql hay MariaDB từ dòng lệnh mysqldump

Tệp backup được tạo ra bởi mysqldump về cơ bản là 1 tập lệnh mysql có thể được sử dụng để tạo lại bản gốc của cơ sở dữ liệu được backup. Mysqldump cũng có thể tạo ra các tệp ở định dạng CSV và XML.

Bạn cũng có thể sử dụng mysqldump để chuyển cơ sở dữ liệu Mysql của bạn sang một máy chủ Mysql khác.

Nếu bạn không backup cơ sở dữ liệu của mình, lỗi phần mềm hoặc lỗi ổ cứng có thể là thảm họa khiến hỏng toàn bộ cơ sở dữ liệu và không thể khôi phục chúng được. Để giúp bạn tiết kiệm nhiều thời gian, tôi khuyên bạn nên thường xuyên sao lưu cơ sở dữ liệu của mình.

## **I. Cú pháp mysqldump**

Trước khi đi vào cách sử dụng mysqldump, hãy bắt đầu bằng cách xem lại cú pháp cơ bản

Các biểu thức của mysqldump có dạng như sau

```shell
mysqldump [options] > file.sql
```

* options - option của mysqldump
* file.sql - tệp cơ sở dữ liệu được sao lưu

Để sử dụng được myqldump, phải truy cập được máy chủ mysql.

## **II. Backup cơ sở dữ liệu đơn giản**

Trường hợp sử dụng phổ biến nhất của mysqldump là để sao lưu 1 cơ sở dữ liệu

Ví dụ: để tạo ra 1 bản backup của cơ sử dữ liệu có tên là database_name bằng cách sử dụng quyền user là root và lưu nó tệp có tên là database_name.sql bạn cần chạy lệnh sau:

```shell
mysqldump -u root -p database_name > database_name.sql
```

Bạn sẽ phải nhập mật khẩu cho user có quyền root tại thông báo. Sau khi xác thực mật khẩu thành công, quá trình backup dữ liệu sẽ bắt đầu. Tùy thuộc vào kích thước cơ sở dữ liệu, quá trình này sẽ mất 1 khoảng thời gian và bạn phải đợi cho nó chạy xong.

Nếu bạn đang đăng nhập với 1 user khác, cũng có quyền sao lưu mà không cần mật khẩu, bạn có thể bỏ qua option -u và -p:

```markdown
mysqldump database_name > database_name.sql
```

## **III. Backup nhiều databases**

Để backup nhiều cơ sở dữ liệu bằng 1 lệnh, bạn cần sử dụng option --daatabase và theo sau đó là các cơ sở dữ liệu bạn muốn sao lưu. Tên của mỗi cơ sở dữ liệu phân cách nhau bởi dấu cách.

```shell
mysqldump -u root -p --databases database_name_a database_name_b > databases_a_b.sql
```

Lệnh trên sẽ tạo ra một tệp sao lưu cả cơ sở dữ liệu a và b

## **IV. Backup tất cả các cơ sở dữ liệu trong server**

Sử dụng option --all-databases để backup toàn bộ cơ sở dữ liệu của bạn

```shell
mysqldump -u root -p --all-databases > all_databases.sql
```

Giống với ví dụ trước, lệnh trên sẽ tạo ra một bản sao lưu duy nhất chứa tất cả các cơ sở dữ liệu có trong server của bạn

## **V. Backup tất cả cơ sở dữ liệu vào nhiều file.**

mysqldump không cung cấp tùy chọn sao lưu tất cả cơ sở dữ liệu vào nhiều file nhưng bạn có thể dễ dàng thực hiện nó bằng cách sử dụng vòng lặp FOR ở trong bash:

```perl
for DB in $(mysql -e 'show databases' -s --skip-column-names); do
    mysqldump $DB > "$DB.sql";
done
```

Lệnh trên sẽ tạo ra các tệp dump khác nhau cho mỗi cơ sở dữ liệu.

## **VI. Tạo 1 bản nén sao lưu cơ sở dữ liệu**

Nếu kích thức cơ sở dữ liệu lớn, việc nén lại sẽ là 1 ý tưởng tốt để tạo ra file dump. Để làm được điều đó, bạn chỉ cần chuyển đầu ra sang tệp gzip:

```markdown
mysqldump database_name | gzip > database_name.sql.gz
```

## **VII. Tạo ra bản backup với timestamp**

Nếu bạn muốn giữ nhiều bản backup trong cùng 1 folder, bạn có thể thêm ngày hiện tại để phân biệt ngày sao lưu giữa các tệp:

```html
mysqldump  database_name > database_name-$(date +%Y%m%d).sql
```

Lệnh trên sẽ tạo ra 1 file có format như tệp sau: database_name-20180617.sql

## **VIII. Restore lại database đã backup**

Bạn có thể restore lại cơ sở dữ liệu bằng cách sử dụng mysql. Cú pháp như sau:

```html
mysqld  database_name < file.sql
```

Trong hầu hết các trường hợp, bạn sẽ cần phải tạo cơ sở dữ liệu đã tồn tại, thì việc trước tiên bạn cần xóa chúng.

Trong ví dụ sau, lệnh đầu tiên sẽ tạo ra một cơ sở dữ liệu có tên là database_name và sau đó sẽ import file backup database_name.sql vào nó:

```shell
mysql -u root -p -e "create database database_name";
mysql -u root -p database_name < database_name.sql
```

## **IX. Restore lại 1 cơ sở dữ liệu từ 1 file sao lưu tất cả cơ sở dữ liệu.**

Nếu bạn đã sao lưu tất cả cơ sở dữ liệu của mình bằng option --all-databases và bạn muốn restore lại một cơ sở dữ liệu duy nhất từ file backup, bạn có thể sử dụng option --one-database như dưới đây:

```sql
mysql --one-database database_name < all_databases.sql
```

## **X. Export hoặc Import một cơ sở dữ liệu bằng 1 dòng lệnh**

Thay vì tạo ra 1 file dump và them đó import file đó vào một cơ sở dữ liệu khác, bạn có thể sử dụng cách sau cho nhanh:

```shell
mysqldump -u root -p database_name | mysql -h remote_host -u root -p remote_database_nam
```

Lệnh trên sẽ dẫn đầu ra tới máy mysql client ở remote host và sẽ import nó vào cơ sở dữ liệu có tên là remote_database_name. Trước khi chạy câu lệnh, bạn cần chắc chắn rằng cơ sở dữ liệu đã tồn tại ở server remote.

## **XI. Tự động backup với cron job**

Tự động hóa sao lưu cơ sở dữ liệu cũng đơn giản như là một công việc định kì, lệnh mysqldump sẽ được chạy ở thời gian bạn chỉ định.

Để thiết lập sao lưu cơ sở dữ liệu tự động bằng cronjob, hãy làm theo các bước dưới đây:

1. Tạo ra file .my.cnf ở đường dẫn home:

    ```
    sudo nano ~/.my.cnf
    ```

    Copy và paste đoạn code sau vào đó:

    ```
    [client]
    user = dbuser
    password = dbpasswd
    ```

    Đừng quên thay thế dbuser và dbpasswd bằng tên user và mật khẩu của mysql server 

2. Hạn chế quyền của tệp thông tin để chỉ người dùng bạn muốn có quyền truy cập

    ```
    chmod 600 ~/.my.cnf
    ```

 3. Tạo ra thư mục để lưu file backup

    ```
    mkdir ~/db_backups
    ```

 4. Mở file crontab

    ```
    crontab -e
    ```

    Add lệnh như ví dụ sau để cronjob thực hiện backup cơ sở dữ liệu vào 3h sáng mỗi ngày

    ```
    0 3 * * * /usr/bin/mysqldump -u dbuser mydb > /home/username/db_backups/mydb-$(date +%Y%m%d).sql
    ```

    đừng quên thay thế username với tên username thật.

    Bạn cũng có thể tạo ra 1 file cronjob để xóa các bản backup quá 30 ngày

    ```
    find /path/to/backups -type f -name "*.sql" -mtime +30 -delete
    ```

Dĩ nhiên, bạn cần sửa đường dẫn và tên tệp.