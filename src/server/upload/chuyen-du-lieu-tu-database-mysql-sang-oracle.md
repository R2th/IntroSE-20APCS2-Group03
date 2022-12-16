Hôm nay mình có một bài toán cần chuyển dữ liệu của một bảng trên database Mysql sang Oracle, dữ liệu khoảng **66M** rows.
Có rất nhiều cách để làm, mình sử dụng tính năng **Oracle SQL * Loader**

**Bước 1:** Export dữ liệu table trên database Mysql sang file txt
```
# mysql -u root -p
mysql> select id, phone, uid from vnphone INTO OUTFILE '/tmp/vn.txt'
```

Bạn nào sử dụng lệnh trên export dữ liệu báo lỗi: 
```
ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
```
Thì tắt tính năng  secure-file-priv đi nhé, sau đó restart lại database Mysql
```
vim /etc/my.cf
[mysqld] 
secure-file-priv = ""

systemctl restart mysqld
```

Yên tâm mình export theo cách này rất nhanh: **Query OK, 66514149 rows affected (1 min 57.51 sec)**

**Bước 2:** Import dữ liệu vào database Oracle

2.1 Tạo bảng dữ liệu trên database Oracle
```
create table create table vn_20220910 (id number(15), msisdn varchar2(15), "uid" varchar2(30));
```

2.2 Tạo control file cho Oracle SQL * Loader giải thích file cần tải lên, ở đâu, các biến trong nội dung file cách nhau bởi dấu gì và import vào bảng nào
```
vim /home/oracle/example1.ctl
load data infile '/home/oracle/vn.txt' into table user_tool.vn_20220910 fields terminated by "," ( id, msisdn, "uid" )
```

2.3 Thực thi lệnh sqlldr để tải các bản ghi mới này lên bảng trống
```
sqlldr user_tool/ control='/home/oracle/example1.ctl' log='/home/oracle/example1.log'
```

Thời gian load 66M rows vào database mất 5 phút, con số ấn tượng
```
Total logical records skipped:          0
Total logical records read:      66514149
Total logical records rejected:         0
Total logical records discarded:        0

Run began on Sat Sep 10 23:29:15 2022
Run ended on Sat Sep 10 23:34:23 2022
```

**Lưu ý:** Nếu bạn chưa tạo bảng, khi chạy sẽ nhận được thông báo lỗi sau
```
SQL*Loader-941: Error during describe of table vn_20220910
ORA-04043: object vn_20220910 does not exist
```

Còn nhiều tính năng SQL * Loader của Oracle mình sẽ cố gắng update thêm vào thời gian tới.