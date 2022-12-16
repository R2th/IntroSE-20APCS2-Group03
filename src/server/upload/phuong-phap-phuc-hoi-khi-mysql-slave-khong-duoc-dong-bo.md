Bài viết này mình sẽ trình bày về phương pháp phục hồi khi MySQL slave gặp vấn đề dẫn tới không thể đồng bộ 

Về tài liệu liên quan đến setting mysql replication, xem [ở đây](https://l-w-i.net/t/mysql/replication_001.txt)


### Kiểm tra tình trạng
Đầu tiên kiểm tra tình trạng slave
Như ví dụ dưới đây cả hai đều không ra Running thì replication đang bị thất bại
```
mysql> show slave status\G
:
Slave_IO_Running: Yes
Slave_SQL_Running: No
:
```

### Phục hồi
Phương pháp phục hồi đầu tiên là stop slave và export DB của master và import lại 
Slave
```
mysql> stop slave;
mysql> show slave status\G
:
Slave_IO_Running: No
Slave_SQL_Running: No
:
```

Master
kiểm tra slave xong thì export DB data ra file
```
mysql> show master status\G
:
File: mysql-bin.000007
Position: 626148
:

mysql> flush tables with read lock;
mysql> exit
Bye

# mysqldump -u root -p --all-databases --lock-all-tables --events > /var/tmp/db.dump
```

Copy file này và import vào slave sau đó start slave
```
# mysql -u root -p < /var/tmp/db.dump

# mysql -u root -p

mysql> change master to
master_host='xxx.xxx.xxx.xxx', <-------- マスタのIPアドレス
master_user='xxxxx', <------------------ レプリケーション用に作成したアカウント
master_password='********', <----------- 上記アカウントのパスワード
master_log_file='mysql-bin.xxxxxx', <--- マスタ側show master statusのFile
master_log_pos=xxxxx; <----------------- マスタ側show master statusのPosition

mysql> slave start;

mysql> show slave status\G
:
Master_Log_File: mysql-bin.000007
:
Read_Master_Log_Pos: 626148
:
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
:
```

Kiểm tra tên file và log position giống với master và cả hai đều Running:Yes thì có nghĩa là slave đang hoạt động bình thường


Tham khảo: https://l-w-i.net/t/mysql/replication_100.txt