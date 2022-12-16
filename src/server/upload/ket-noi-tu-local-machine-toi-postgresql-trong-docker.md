Ở bài viết này, mình sẽ trình bày về một cách chạy PostgreSQL trong Docker và kết nối nó để sử dụng từ bên ngoài Docker.

Mục tiêu: "Kiểm soát" db ở bên trong container từ bên ngoài container, cụ thể là local machine. Ví dụ thực hiện các thao tác như: thêm, sửa, xóa bảng db một cách bình thường như ở bên trong. 

**1.Khởi động container trên server hoặc local machine**

Lệnh sau có thể khởi động PostgreSQL Docker container trên host hoặc local machine của bạn.

```
$ docker run -d -p 5432:5432 --name my-postgres -e 
POSTGRES_PASSWORD=mysecretpassword postgres
```

Lệnh này sẽ khởi động một cơ sở dữ liệu PostgreSQL và map ports bằng cách sử dụng: 
"-p <host_port>: <container_port>".
Cổng 5432 trên Container sẽ được map trên cổng 5432 của host hoặc server.

Truy cập Container trên host hoặc server của bạn. Tạo một cơ sở dữ liệu bên trong container chứa PostgreSQL.

```
$ docker exec -it my-postgres bash
```

Bây giờ đang trong container, có thể truy cập Postgres và tạo cơ sở dữ liệu.

```
root@cb9222b1f718:/# psql -U postgres
psql (10.3 (Debian 10.3-1.pgdg90+1))
Type "help" for help.

postgres=# CREATE DATABASE mytestdb;
CREATE DATABASE
postgres=#\q
```

Vậy là đã hoàn thành tạo CSDL. Bây giờ thoát khỏi container này và di chuyển qua local machine. Cần cài đặt một số công cụ cho PostgreSQL Client
```
* PSQL (CLI)
* PgAdmin
…
```

**2.Kiểm tra db vừa tạo có trên local machine hay không**

Vì PostgreSQL container của mình chạy trên local machine, việc đó giải thích tại sao mình lại connect với localhost. Nếu nó chạy trên 1 server xác định nào đó, thì hãy sử dụng server IP của bạn (Ví dụ với docker-machine trên Windows, có lẽ bạn cần dùng 192.168.99.100)

Sử dụng câu lệnh: 
```
$ psql -h localhost -p 5432 -U postgres -W
```

Thu được kết quả như sau:
```
psql (9.5.5, server 10.3 (Debian 10.3-1.pgdg90+1))
WARNING: psql major version 9.5, server major version 10.
Some psql features might not work.
Type "help" for help.
postgres=# \l
                                 List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    |  
-----------+----------+----------+------------+------------+
 mytestdb  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
           |          |          |            |            |
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
           |          |          |            |            | 
(4 rows)
```
Như vậy, có thể thấy db vừa tạo là "mytestdb" đã được thêm vào.

Nguồn tham khảo: https://medium.com/@lvthillo/connect-from-local-machine-to-postgresql-docker-container-f785f00461a7