Hôm nay mình sẽ giới thiêu cho các bạn các config một ứng dụng web sử dụng kiến trúc database replication.

Trước khi bắt đầu thì đảm bảo rằng máy tính của bạn đã cài những chương trình sau:
- Docker
- Ruby on Rails v6.0
- MySQL Workbench

# References
Nếu bạn không biết kiến trúc database replication là gì thì có thể tham khảo bài viết sau để hiểu thêm
https://kipalog.com/posts/Gioi-thieu-MySQL-Replication

Ngoài ra, bài viết này mình còn tham khảo thêm ở các link sau:
https://github.com/wagnerjfr/mysql-master-slaves-replication-docker
https://tomkadwill.com/multiple-databases-in-rails

# 1. Overview
Mình sẽ build một ví dụ về ứng dụng web bằng framework Rails, có database sử dụng kiến trúc Replication, gồm 1 master và 2 slave. Công việc mà chúng ta cần phải làm sẽ gồm 2 công việc chính:
+ Thiết lập kiến trúc Replication ở tầng Database
+ Xây dựng Web app có thể đọc và ghi dữ liệu với kiến trúc database đã xây dựng.

# 2. Xây dựng kiến trúc Master Slave với MySQL
Trên thực tế, khi xây dựng kiến trúc Master Slave, thì mỗi instance sẽ nằm ở mỗi host khác nhau, tuy nhiên lúc thực hiện demo này mình chỉ có thể sử dụng 1 máy tính mà thôi, cho nên mình sẽ sử dụng docker để có thể tạo ra các intance Mysql server để xây dựng.

## 2.1 Cài đặt Mysql Server docker container
Khởi tạo một docker network
```
$ docker network create replicanet
```

Để xem các docker network đang có, sử dụng câu lệnh
```
$ docker network ls
```

Sử dụng các dòng lệnh dưới đây để khởi tạo 3 MySQL container.
```
$ docker run -d --name=master --net=replicanet --hostname=master -p 3308:3306 \
  -v $PWD/d0:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mypass \
  mysql/mysql-server:5.7 \
  --server-id=1 \
  --log-bin='mysql-bin-1.log'

$ docker run -d --name=slave1 --net=replicanet --hostname=slave1 -p 3309:3306 \
  -v $PWD/d1:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mypass \
  mysql/mysql-server:5.7 \
  --server-id=2

$ docker run -d --name=slave2 --net=replicanet --hostname=slave2 -p 3310:3306 \
  -v $PWD/d2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mypass \
  mysql/mysql-server:5.7 \
  --server-id=3
```

Có thể kiếm tra các container đã start hay chưa bằng câu lệnh

```
$ docker ps -a
```
Chờ đến khi các container đạt trạng thái healthy thì mới tiếp tục.

```
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                       PORTS                               NAMES
33790572c785        mysql/mysql-server:5.7   "/entrypoint.sh --..."   22 minutes ago      Up 22 minutes (healthy)      33060/tcp, 0.0.0.0:3310->3306/tcp   slave2
0918892aaad3        mysql/mysql-server:5.7   "/entrypoint.sh --..."   22 minutes ago      Up 22 minutes (healthy)      33060/tcp, 0.0.0.0:3309->3306/tcp   slave1
3ece985d3470        mysql/mysql-server:5.7   "/entrypoint.sh --..."   22 minutes ago      Up 22 minutes (healthy)      33060/tcp, 0.0.0.0:3308->3306/tcp   master
```

## 2.2 Configuring Master và Slave
### 2.2.1 Cài đặt Master Node 
*[Optional] Nếu như bạn muốn sử dụng cơ chế  semisynchronous replication, thì hãy chạy câu lệnh bên dưới*

```
docker exec -it master mysql -uroot -pmypass \
  -e "INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';" \
  -e "SET GLOBAL rpl_semi_sync_master_enabled = 1;" \
  -e "SET GLOBAL rpl_semi_sync_master_wait_for_slave_count = 2;" \
  -e "SHOW VARIABLES LIKE 'rpl_semi_sync%';"
```
Việc cài đặt plugin semisynchronous nhầm mục đích giảm thiểu việc lag dữ liệu trong quá trình đồng bộ data giữa master và slave.

Nếu cài thành công thì sẽ có output như sau
```
mysql: [Warning] Using a password on the command line interface can be insecure.
+-------------------------------------------+------------+
| Variable_name                             | Value      |
+-------------------------------------------+------------+
| rpl_semi_sync_master_enabled              | ON         |
| rpl_semi_sync_master_timeout              | 10000      |
| rpl_semi_sync_master_trace_level          | 32         |
| rpl_semi_sync_master_wait_for_slave_count | 2          |
| rpl_semi_sync_master_wait_no_slave        | ON         |
| rpl_semi_sync_master_wait_point           | AFTER_SYNC |
+-------------------------------------------+------------+
```

Khởi tạo ở master node một user replicate để các slave có thể access vào và lấy dữ liệu.

```
docker exec -it master mysql -uroot -pmypass \
  -e "CREATE USER 'repl'@'%' IDENTIFIED BY 'slavepass';" \
  -e "GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';" \
  -e "SHOW MASTER STATUS;"
```

Output:
```
mysql: [Warning] Using a password on the command line interface can be insecure.
+--------------------+----------+--------------+------------------+-------------------+
| File               | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+--------------------+----------+--------------+------------------+-------------------+
| mysql-bin-1.000003 |      595 |              |                  |                   |
+--------------------+----------+--------------+------------------+-------------------+
```
### 2.2.2 Cài đặt Slaves Node
Tương tự, để có thể sử dụng được cơ chế semisynchronous thì ở các node slave cần cài đặt plugin

```
for N in 1 2
  do docker exec -it slave$N mysql -uroot -pmypass \
    -e "INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';" \
    -e "SET GLOBAL rpl_semi_sync_slave_enabled = 1;" \
    -e "SHOW VARIABLES LIKE 'rpl_semi_sync%';"
done
```

Output

```
mysql: [Warning] Using a password on the command line interface can be insecure.
+---------------------------------+-------+
| Variable_name                   | Value |
+---------------------------------+-------+
| rpl_semi_sync_slave_enabled     | ON    |
| rpl_semi_sync_slave_trace_level | 32    |
+---------------------------------+-------+
mysql: [Warning] Using a password on the command line interface can be insecure.
+---------------------------------+-------+
| Variable_name                   | Value |
+---------------------------------+-------+
| rpl_semi_sync_slave_enabled     | ON    |
| rpl_semi_sync_slave_trace_level | 32    |
```
Thay đổi tên của log file ở Master Node mà chúng ta đã print ra trước khi chạy câu lệnh setting ở slave node

Giá trị cần thay đổi theo hệ thống trên máy của bản:
```
MASTER_LOG_FILE='mysql-bin-1.000003'
```

Chạy lệnh bên dưới để setting Slave Node
```
for N in 1 2
  do docker exec -it slave$N mysql -uroot -pmypass \
    -e "CHANGE MASTER TO MASTER_HOST='master', MASTER_USER='repl', \
      MASTER_PASSWORD='slavepass', MASTER_LOG_FILE='mysql-bin-1.000003';"

  docker exec -it slave$N mysql -uroot -pmypass -e "START SLAVE;"
done
```

Kiểm tra trạng thái slave replication trên **slave1** và **slave2**:
```
$ docker exec -it slave1 mysql -uroot -pmypass -e "SHOW SLAVE STATUS\G"

$ docker exec -it slave2 mysql -uroot -pmypass -e "SHOW SLAVE STATUS\G"
```
Nếu output tương tự như bên dưới thì thành công.

```
*************************** 1. row ***************************
               Slave_IO_State: Checking master version
                  Master_Host: master
                  Master_User: repl
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin-1.000003
          Read_Master_Log_Pos: 595
               Relay_Log_File: slave1-relay-bin.000001
                Relay_Log_Pos: 4
        Relay_Master_Log_File: mysql-bin-1.000003
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
                             ...
```

### 2.2.3 Testing kết quả cài đặt
Bây giờ mình sẽ kiểm tra xem kết quả cài đặt có thành công hay không bằng cách tạo một database mới ở Master Node, nếu đúng thì sẽ đồng bộ database đó sang Slave Node.
Thực hiện chạy câu lệnh bên dưới ở Master Node
```
$ docker exec -it master mysql -uroot -pmypass -e "CREATE DATABASE TEST; SHOW DATABASES;"
```

Output:
```
mysql: [Warning] Using a password on the command line interface can be insecure.
+--------------------+
| Database           |
+--------------------+
| information_schema |
| TEST               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

Kiểm tra ở slave node đã được đồng bộ sang hay chưa
```
for N in 1 2
  do docker exec -it slave$N mysql -uroot -pmypass \
  -e "SHOW VARIABLES WHERE Variable_name = 'hostname';" \
  -e "SHOW DATABASES;"
done
```
 Nếu output ra ở 2 slave node đều tồn tại Database TEST thì xem như chúng ta đã cài đặt thành công.

 ```
mysql: [Warning] Using a password on the command line interface can be insecure.
+---------------+--------+
| Variable_name | Value  |
+---------------+--------+
| hostname      | slave1 |
+---------------+--------+
+--------------------+
| Database           |
+--------------------+
| information_schema |
| TEST               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
mysql: [Warning] Using a password on the command line interface can be insecure.
+---------------+--------+
| Variable_name | Value  |
+---------------+--------+
| hostname      | slave2 |
+---------------+--------+
+--------------------+
| Database           |
+--------------------+
| information_schema |
| TEST               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
 ```

## 2.3 Lưu ý nhỏ
Khi cài đặt các instance mysql server với docker, thì đê có thể access mysql từ môi trường bên ngoài vào trong docker container thì bạn cần tạo một account mysql vào cấp quyền cho nó như sau (sử dụng để access với mysql workbench hoặc một ứng dụng rails truy xuất vào như demo mà mình thực hiện bên dưới):

B1: Vào bash của docker container
```
docker exec -it <mysql container name> /bin/bash 
```

B2: Mở terminal của mysql server
```
mysql -u root -p
```
B3: Thực hiện các dòng lệnh sau:
```
create user 'user'@'%' identified by 'pass';
grant all privileges on *.* to 'user'@'%' with grant option;
flush privileges;
```
Kí hiệu (%) nghĩa là allow tất cả ip có thể truy cập vào. Nếu bạn muốn hạn chế thì có thể thay đổi dấu % bằng ip mà bạn mong muốn truy cập đến database.

# 3. Xây dựng webapp với Rails framework
## 3.1 Sử dụng multiple database trong Rails 6
Có 1 điểm thú vị là từ Rails 6 trở đi, thì framework này đã hỗ trợ multiple database, cho nên chúng ta có thể dễ dàng cài đặt ứng dụng của mình sử dụng kiến trúc replication.

Đầu tiên mình khởi tạo web app với rails 6 như sau:

```
$ rails new rails_replication_without_gem -d mysql
```
Sau đó dùng lệnh scaffold để generate nhanh một flow CRUD cơ bản

```
$ rails g scaffold User name:string address:string
```

Bây giờ đến phần quan trọng nhất là tiến hành config database, sử dụng kiến trúc replication. 
```
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  socket: /var/run/mysqld/mysqld.sock

development:
  master:
    <<: *default
    database: master
    username: user
    password: pass
    host: 127.0.0.1
    port: 3308
  slave1:
    <<: *default
    database: slave1
    host: 127.0.0.1
    port: 3309
    username: user
    password: pass
    replica: true
  slave2:
    <<: *default
    database: slave2
    host: 127.0.0.1
    port: 3309
    username: user
    password: pass
    replica: true
```

OK, tương tự như việc config multiple database với Rails 6 thì việc config cho database replication cũng tương tự, chỉ khác là chúng ta sẽ thêm vào option
```
replica: true
```
để xác định node nào là node slave.

Sau đó tiến hành create và migrate database
```
rails db:create && rails db:migrate
```

Có 1 chỗ mà bạn nên chú ý, khi mình tiến hành create database thì log chỉ trả về một database master được tạo, nhờ vào option **replica: true** mà mình đã config. Trong trường hợp không config hoặc là set bằng false, thì sẽ có 3 database được khởi tạo đó là master, slave1 và slave2. 

Sau đó trong model, chúng ta sẽ sử dụng hàm connects_to để chỉ định database nào dùng để write và databas nào dùng để đọc. Theo như kiến trúc master-slave thì dữ liệu sẽ được ghi vào master và đọc ở slave.
```
class User << ApplicationRecord
  connects_to database: { writing: :master, reading: :slave }
end
```

OK, bây giờ có 1 vấn đề đặt ra là, ở phần overview ban đầu, thì kiến trúc database của mình bao gồm 1 master và 2 slave cơ mà. Tại sao ở trong này mình lại config có 1 node slave mà thôi ?
Đây là một hạn chế khi sử dụng multiple database của Rails khi áp dụng với kiến trúc Replication. Chúng ta chỉ có thể setting 1 Node Master và 1 Node Slave mà thôi. Trong trường hợp sử dụng với 2 Slave trở lên thì mình sẽ tiếp tục hướng dẫn ở section tiếp theo.

Thêm vào đó, có một vấn đề mà Rails 6 đã support chúng ta đó là giải quyết việc lag dữ liệu bằng việc tự động switching read/write database.
Như chúng ta đã biết mỗi request ghi/chỉnh sửa dữ liệu sẽ đươc gửi đến node master, và request đọc dữ liệu sẽ gửi đến node slave. Tuy nhiên trong trường hợp có request gửi đến yêu cầu đọc dữ liệu trong vòng chưa tới 2s sau 1 request write, thì request read đó sẽ được gửi tới node master thay vì slave để đảm bảo có thể đọc được dữ liệu mới nhất thay vì dữ liệu cũ chưa được cập nhật ở slave. Mặc định sẽ là 2s, tuy nhiên chúng ta có thể setting ở file **application.rb** 

Để enable thì chúng ta config như sau ở file **application.rb**
```
config.active_record.database_selector = { delay: 2.seconds }
config.active_record.database_resolver = ActiveRecord::Middleware::DatabaseSelector::Resolver
config.active_record.database_resolver_context = ActiveRecord::Middleware::DatabaseSelector::Resolver::Session
```

## 3.2 Sử dụng gem Makara
Như mình đã đề cập ở trên, thì khi sử dụng multiple với Rails 6, thì nó có 1 nhược điểm là không thể nào sử dụng 2 slave trở lên cho toàn bộ model. Tuy nhiên một số gem lại có thể làm được điều này đó là: [Octopus](https://github.com/thiagopradi/octopus) và [Makara](https://github.com/taskrabbit/makara).

Theo như thông báo thì gem Octopus đang ở mode maitain do Rails 6 ra mắt đã có support multiple database. Cho nên mình sẽ sử dụng gem Makara để làm example. Mặc dù publish muộn hơn gem Octopus, nhưng Makara được người dùng đánh giá tốt hơn hẳn so với Octopus.

Còn việc cài đặt gem thì cực kì đơn giản, bạn chỉ cần vào trang document của gem thì hoàn toàn có thể làm đươc.

Ngoài việc cho phép người dùng có thể setup master slave dễ dàng, thì gem Makara còn cho phép chúng ta thêm nhiều tùy biến khác như là điều chỉnh trọng số nhận request của các slave, khả năng thông báo lỗi cũng rất rõ ràng.

# Kết luận
Trên đây là phần hướng dẫn của mình về cách cài đặt một kiến trúc database replication, thêm vào đó là cách cấu hình để để sử dụng với một web app Rails cơ bản.
Và các bạn cần lưu ý là tùy vào ứng dụng của bạn và ưu nhược điểm của mỗi loại kiến trúc database để lựa chọn kiến trúc cho phù hợp với ứng dụng của mình.
Hy vọng bài viết mang lại cho bạn nhiều kiến thức bổ ích. Thân