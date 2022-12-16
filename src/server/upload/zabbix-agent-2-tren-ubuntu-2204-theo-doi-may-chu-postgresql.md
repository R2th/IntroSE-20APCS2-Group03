Bài trước mình có hướng dẩn các bạn cài đặt [zabbix server](https://viblo.asia/p/giam-sat-may-chu-va-thong-bao-khi-may-chu-gap-su-co-chua-bao-gio-kho-voi-zabbix-BQyJK3abJMe)

Ở bài này mình sẽ hướng dẩn  các bạn cài đặt Zabbix Agent 2 trên  Ubuntu 22.04 để theo dỗi máy chủ PostgreSQL

Bước 1: Cài  Zabbix Agent 2 

* Cài đặt kho lưu trữ Zabbix
```
# wget https://repo.zabbix.com/zabbix/6.2/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.2-4%2Bubuntu22.04_all.deb
# dpkg -i zabbix-release_6.2-4+ubuntu22.04_all.deb
# apt update
```

* Cài đặt Zabbix Agent2

```
 apt install zabbix-agent2 zabbix-agent2-plugin-*
 ```

* Bắt đầu quy trình Zabbix Agent2

```perl
# systemctl restart zabbix-agent2
# systemctl enable zabbix-agent2
```

Bước 2: Cấu hình Zabbix Agent 2  trỏ vào Zabbix Server 

Như ở bài cài đặt zabbix server ở địa chỉ 10.19.2.1 

Mình dùng lệnh để mở tiệp cấu hình zabbix

```perl
nano /etc/zabbix/zabbix_agent2.conf 
```

trong tiệp tìm và đổi lại những chổ cấu hình 

```python
ListenIP=0.0.0.0
Server=10.19.2.1
Hostname=Zabbix PostgreSQL
```

lưu lại và khởi động lại dịch vụ

```perl
 systemctl restart zabbix-agent2
```

Bước 2: đăng nhập vào zabbix và add vào hosts : http://10.19.2.1/zabbix/zabbix.php?action=host.view

Chọn theo như hình 

![image.png](https://images.viblo.asia/3d973b40-9232-4ba5-bd28-36ab5bb27a34.png)

Bước 3: Cấu hình template **PostgreSQL by Zabbix agent 2** 
1. Tạo người dùng PostgreSQL để theo dõi (password ở đây mình đặt là **Password@123**):
```
CREATE USER zbx_monitor WITH PASSWORD 'Password@123' INHERIT;
GRANT EXECUTE ON FUNCTION pg_catalog.pg_ls_dir(text) TO zbx_monitor;
GRANT EXECUTE ON FUNCTION pg_catalog.pg_stat_file(text) TO zbx_monitor;
GRANT EXECUTE ON FUNCTION pg_catalog.pg_ls_waldir() TO zbx_monitor;
```
2. Chỉnh sửa pg_hba.conf để cho phép kết nối từ Zabbix:
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
  host       all        zbx_monitor     localhost               md5
```
Để biết thêm thông tin, vui lòng đọc tài liệu PostgreSQL https://www.postgresql.org/docs/civerse/auth-pg-hba-conf.html

3. Đặt trong macro **{$PG.URI}** tên nguồn dữ liệu hệ thống của phiên bản PostgreSQL, chẳng hạn như **<protocol(host:port)>**
4. Đặt tên người dùng và mật khẩu trong macro máy chủ **({$PG.USER}** và **{$PG.PASSWORD}**) nếu bạn muốn ghi đè các tham số từ tệp cấu hình tác nhân Zabbix

![image.png](https://images.viblo.asia/003c2e76-a17a-4a8c-ab41-3c544e8a3417.png)

Link tham khảo : https://www.zabbix.com/integrations/postgresql#postgresql_agent2