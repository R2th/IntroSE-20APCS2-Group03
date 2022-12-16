Khi vận hành một hệ thống MySQL replication, thì khi một server slave bị lỗi có nghĩa là dữ liệu giữa Slave và Master đã có sự sai lệch, và lúc đó Slave sẽ không còn tác dụng trong hệ thống nữa. Nhiệm vụ của người vận hành hệ thống là cần fix để đưa slave quay trở lại hoạt động bình thường.

Có nhiều cách để fix slave tùy vào từng trường hợp cụ thể, một trong những yêu cầu cần thiết để có thể giải quyết nhanh chóng khi hệ thống M-S bị lỗi đó là bạn phải hiểu dữ liệu của bạn, phải biết là table đó làm gì, dữ liệu lưu trong đó có tác dụng gì, phục vụ cho chức năng nào, yêu cầu độ chính xác của dữ liệu đó ra sao thì mới có hướng giải quyết cụ thể.

**Cơ bản sẽ có 2 phương pháp chính:**

Stop slave và rebuild lại slave mới -> đây là cách dễ nhất mà không cần hiểu data, nhưng đi kèm đó là tốn rất nhiều thời gian nếu dữ liệu khá lớn.
Phân tích binlog và fix trên quá trình sync dữ liệu -> cách này giúp recovery slave một cách cực kỳ nhanh chóng với các hệ thống có dữ liệu lớn, nhưng đòi hỏi cần phải hiểu về dữ liệu của chính mình.

**1. Rebuild new slave with mysqldump**

Rebuild lại một slave cũng tương tự như cách chúng ta setup một hệ thống MySQL replication từ đầu, chỉ khác một điểm đó là hệ thống hiện tại đang online và bất cứ hành đồng nào tác động đến Master server đều ảnh hưởng trực tiếp tới người dùng. Với phương pháp này ta cần dùng mysqldump để dump dữ liệu ra sql file và đồng bộ dữ liệu, mình tóm gọn nó trong vào bước như sau:

**Trên server Master :**

```
mysql> FLUSH TABLES WITH READ LOCK;
mysql> SHOW MASTER STATUS;
mysqldump -uroot -p cuongnp2_db > cuongnp2_db_29102019.sql
rsync -avz -P -e'ssh' cuongnp2_db_29102019.sql root@172.17.0.2:/root/
```

**Trên server Slave :**

```
mysql -uroot -p cuongnp2_db_29102019 < /root/cuongnp2_db_29102019.sql
mysql> CHANGE MASTER TO MASTER_HOST='172.17.0.1',MASTER_USER='slave_user', MASTER_PASSWORD='p@ssword', MASTER_LOG_FILE='m01-bin.000001', MASTER_LOG_POS=827;
mysql> START SLAVE
mysql> SHOW SLAVE STATUS\G
```

Điểm lưu ý duy nhất như mình nói ở trên là việc lock table ở master sẽ ảnh hưởng trực tiếp tới người dùng nên phương pháp này chỉ nên sử dụng trong thời gian bảo trì hệ thống và nếu dữ liệu càng lớn, thời gian dump càng lâu thì hệ thống càng phải bảo trì lâu.

**2. Rebuild new slave with xtrabackup**

xtrabackup là một công cụ viết bằng C của Percona, thường được dùng để hotbackup MySQL, ưu/nhược điểm của nó so với mysqldump là:
+ Không cần bảo trì hệ thống, không lock db và không ảnh hưởng tới người dùng.
+ Quá trình backup nhanh hơn rất nhiều so với mysqldump.
+ Nhược điểm là thư mục backup có kích thước chính bằng data-raw, trong khi dump sql thì rất nhẹ.

Với các hệ thống có CSDL lớn thì dùng xtrabackup là giải pháp hoàn hảo cho việc backup cũng như rebuild 1 slave server vừa không ảnh hưởng tới hệ thống đang chạy, vừa nhanh hơn so với phương pháp truyền thống. Cụ thể gồm 2 bước như sau:

+ Backup và restore dữ liệu với xtrabackup.
+ Point slave tới binlog và position của binlog trên master và sync dữ liệu.

Để backup và restore dữ liệu với xtrabackup ta có 3 bước cơ bản như sau:

Backup toàn bộ data của mysql master với lệnh:

```
xtrabackup --backup --target-dir=/backup/data
```

=> ở đây mình đã cấu hình user/pass của root user trong file ~/.my.cnf nên không cần phải pass thông tin này khi chạy xtrabackup, và có thể chạy với tùy chọn --compact để giảm kích thước khi backup.

Sync data qua slave và chạy prepare data:

```
xtrabackup --prepare --rebuild-indexes --target-dir=/backup/data/
InnoDB: Starting shutdown...
InnoDB: Shutdown completed; log sequence number 22528643996
180329 14:48:04 completed OK!
```

=> trong quá trình backup, có thể có những uncommited transaction không hoàn thành hoặc các transaction trong log cần phải được relay -> quá trình này nhằm đảm bảo tính nhất quán của dữ liệu. Cũng có thể sử dụng thêm tùy chọn --rebuild-threads=16 để tạo nhiều worker-theard để rebuild-index tại cùng một thời điểm.

Restore dữ liệu và start mysql

```
service mysql stop
rm -rf /var/lib/mysql/
xtrabackup --copy-back --target-dir=/backup/data/
chown -R mysql: /var/lib/mysql
```

Đây là quá trình chép ngược data backup vào datadir, cần lưu ý là datadir phải rỗng hoàn toàn trước khi copy-back.

Sau 3 bước trên là quá trình backup và restore dữ liệu đã hoàn thành, việc còn lại là đồng bộ hóa dữ liệu với master để thực hiện quá trình sync.

Sau khi copy-back xong, trong thư mục /var/lib/mysql sẽ có 1 file xtrabackup_binlog_info, file này chứa thông tin về binlog và position cần dùng để sync.

```
cat /var/lib/mysql/xtrabackup_binlog_info
mysql-bin.000209 713297953
```

Và cấu hình sync từ master như cách bình thường trong mysqldump là được

```
CHANGE MASTER TO MASTER_HOST='172.17.0.1',MASTER_USER='slave_user', MASTER_PASSWORD='p@ssword', MASTER_LOG_FILE='mysql-bin.000209', MASTER_LOG_POS= 713297953;
START SLAVE
SHOW SLAVE STATUS\G
```

Lưu ý là xtrabackup được viết bằng C, innobackupex là một Perl script được symlink tới xtrabackup, hiện tại Percona khuyến khích chúng ta chuyển qua xtrabackup vì innobackupex không còn được phát triển nữa, tuy nhiên trong một số trường hợp ta sẽ vẫn cần tới nó.

**2.1 Một số tips với xtrabackup**

Nếu chịu đào xới documentt của xtrabackup bạn có thể tìm thấy khá nhiều thứ hữu ích trong nhiều tình huống khác nhau. Thực tế mình cũng đã gặp những tình huống đó và mới thấy sự powerful của xtrabackup.

**Backup và stream qua network**

Một tình huống đó là ổ cứng của server master có kích thước là 1TB, dữ liệu trong MySQL là >500GB, nghĩa là để backup ra ổ hiện tại là không đủ chỗ chứa, việc gắn thêm ổ cứng sẽ rất mất thời gian với hệ thống bare-metal. Đơn giản ta có thể stream trực tiếp bản backup qua server slave như sau.

**New slave**

```
nc -l 9999 | cat - > /data/backups/backup.tar
```

sẽ mở một port 9999 và output ra một file archive.

**Master**

```
innobackupex --stream=tar ./ | nc 172.17.0.2 9999
```

backup và gửi trực tiếp qua slave.

Như ta thấy, sau khi backup xong ta sẽ có một file archive trên slave, và việc còn lại chỉ là unarchive và restore data. NHƯNG ta cũng có thể giải nén luôn trong quá trình stream.

**New Slave**

```
nc -l 9999 | tar -ivxf -
```

**Master**

```
innobackupex --stream=tar ./ | nc 172.17.0.2 9999
```

**Tạo newslave mới từ slave cũ**

Giả sử ta có một server Master, một server slave, nhưng vì lý do nào đó mà server slave cần bảo trì, ta sẽ cần build slave mới thay thế. Nhưng ta lại không muốn đụng tới server Master, ta có thể dễ dàng tạo slave mới từ server slave sắp bảo trì với xtrabackup như sau:

**Old slave**

```
xtrabackup --backup --slave-info --target-dir=/backup/data
```

**Hoặc stream**

```
innobackupex --slave-info --stream=tar ./ | nc 172.17.0.2 9999
```

Điểm khác biệt duy nhất là binlog và position thay vì được lưu trên xtrabackup_binlog_info thì sẽ được lưu trong xtrabackup_slave_info, ta chỉ cần thực hiện prepare-data, restore và point slave mới tới master với thông tin trong file xtrabackup_slave_info.

**2.2 Một số thông tin thực tế**

+ Data 500GB, dùng xtrabackup stream qua network tốn 93 phút, unachive file tar 420GB tốn 39 phút, --prepare tốn cỡ 60ph.
+ Data 500GB, dùng xtrabackup stream và unarchive trực tiếp cho tới khi build xong slave tốn ~2h.
+ Data 500GB, dùng mysqldump data ra đĩa, tốn 183 phút, file sql nặng 182GB chưa nén.

**3. Phân tích binlog và fix trên quá trình sync dữ liệu**

Nếu tìm kiếm trên Internet ta sẽ thấy có một số blog hướng dẫn fix replication data giữa M-S như sau:

```
mysql> STOP SLAVE; SET GLOBAL SQL_SLAVE_SKIP_COUNTER=1; START SLAVE;
```

Tuy nhiên đây là một ý tưởng khá là tệ và tốt nhất là nên tránh sử dụng phương pháp này. Với câu lệnh trên, Slave sẽ bỏ qua lỗi đó và next tới transaction tiếp theo để apply binlog => mất tính nhất quán của dữ liệu.

Ví dụ:

+ Ứng dụng quản lý tồn kho, các query read được đẩy vào Slave.
+ Một sản phẩm tồn kho còn 1, user sau khi mua số lượng 1, số tồn kho được trừ về 0 trên master.
+ Binlog sinh ra, sync qua slave và được apply vào slave nhưng bị lỗi.
+ Thực hiện skip qua transaction đó -> số tồn kho của sản phẩm đó vẫn là 1 trên slave -> và nếu không có thêm bất cứ tác động gì tới record đó thì slave vẫn hoạt động và sync data bình thường.

=> Khi có một user khác vào xem sản phẩm, phát sinh query đọc lên số lượng tồn kho từ slave và thông báo sản phẩm còn số lượng là 1. User thực hiện bỏ vào giỏ hàng (write data -> gọi vào slave) => Không thể bỏ vào giỏ hàng do trên master lại kiểm tra là số lượng là 0.

Thực tế việc sử dụng như trên chỉ khi thực sự hiểu rằng data của chúng ta sẽ bị tác động như thế nào, ví dụ có nhiều ứng dụng lưu log request hoặc push_notification_log vào mysql thì ta hoàn toàn có thể SKIP nếu biết chắc chắn apply log vào các bảng dữ liệu trên.

Trong thực tế, trước đây mình gặp một vài tình huống khá kỳ cục, nhưng bằng cách là decode binlog mà mình đã giải quyết khá nhiều trường hợp mà không cần rebuild lại slave, tiết kiệm rất nhiều thời gian và công sức. Thường các trường hợp đó là:

+ Kiểu dữ liệu của column, charet của bảng giữa slave và master không đồng nhất.
+ Dữ liệu một record trên slave khác master, hoặc index đã tồn tại trên slave.
=> những lỗi này thực ra chủ yếu do con người tạo ra, nhưng việc fix nhanh chóng vẫn là điều cần thiết.

Ví dụ 1:

```
Relay_Log_Pos: 619131881
Relay_Master_Log_File: mysql-bin.000569
Slave_IO_Running: Yes
Slave_SQL_Running: No
Last_Errno: 1061
Last_Error: Error 'Duplicate key name 'users_id_photo_idx'' ON query. DEFAULT DATABASE: 'facebook'. Query: 'CREATE INDEX users_id_photo_idx ON users(id, photo_id) USING BTREE'
```

như ở trên báo lỗi ở file binlog là **mysql-bin.000569**, vị trí 619131881, ta sẽ cần decode binlog.

```
mysqlbinlog --base64-output=DECODE-ROWS --verbose mysql-bin.000569 > mysql-bin.000569.decode.sql
grep --color=always -A 30 619131881 decode.sql
```

bản chất là không hiểu bằng cách nào đó, **users_id_photo_idx** đã tồn tại trên slave, và khi ta đánh index trên master, index này đc sync qua slave và apply thì báo lỗi đã tồn tại.

Cách fix đơn giản là xóa index **users_id_photo_idx** trên slave và slave lại replication là có thể fix.

Ví dụ 2:

```
Last_SQL_Errno: 1062
Last_SQL_Error: Error 'Duplicate entry '5' for key 'PRIMARY'' on query. Default database: 'facebook'. \
Query: 'INSERT INTO t VALUES (5,2)'
```

Trên bảng t của slave đã tồn tại một record có id bằng 5, dẫn tới khi sync lệnh INSERT qua slave thì bị duplicate, đơn giản chỉ cần xóa record match đó đi DELETE FROM t WHERE id = 5 AND pid = 2 và start lại slave.

Tóm lại với cách này, việc fix slave là vô cùng nhanh chóng, chỉ tốn khoảng vài giây, vài phút và slave có thể quay trở lại hoạt động và bạn cũng không phải mất thời gian build lại slave và chờ sync kịp dữ

Tham khảo : https://techzones.me