## API Gateway là gì? Tại sao hệ thống microservices lại cần API Gateway?
Thực trạng một Microservices:
![](https://images.viblo.asia/788d97b1-e2ab-408d-be59-380ed9696863.png)
### API Gateway?
Khi có Gateway API
![](https://images.viblo.asia/8dd6f03b-8aac-481b-9a67-91ee1cfa7bcf.png)
### Lợi ích của việc sử dụng API Gateway
* Che dấu được cấu trúc của hệ thống microservices với bên ngoài
* Phần code phía frontend sẽ gọn gàng hơn
* Dễ dàng theo dõi và quản lý traffic.
* Requests caching và cân bằng tải.
* Thêm một lớp bảo mật nữa cho hệ thống.
* Thay thế authentication services
### Bất lợi khi sử dụng API Gateway
* Tăng thời gian response
* Có thể gây nghẽn cổ chai
* Tốn thêm tiền
## Kong Gateway
### Kong là gì?
Kong Gateway cũng giống như các API Gateway khác, nó nhẹ, được dùng cho microservices, có độ trễ thấp, hiệu suất cao và scalability.
![](https://images.viblo.asia/413da0e4-84ae-4c78-b6d7-34977e49a672.png)
![](https://images.viblo.asia/727a0d16-5219-4bc9-b5bf-50bcac64b3ee.png)
### Ưu điểm của Kong
#### Khả năng mở rộng dễ dàng
Kong server là stateless, chúng ta có thể thêm hoặc xóa bao nhiêu nodes tùy ý, miễn là chúng trỏ vào 1 datastores. Kong Datastore có thể chọn 1 trong 2 loại DB
* Postgres: khi muốn xây dựng một hệ thống Api Gateway tập chung, đơn giản, hiệu năng tốt. Mặc định thì Kong sẽ sử dụng Postgres làm datastore.
* Cassandra: Dùng cassandra khi muốn xây dựng một hệ thống api gateway phân tán, tính khả dụng cao, chịu tải tốt, dễ dàng scale. Cassandra sẽ chạy tốt nhất trên các server có cấu hình mạnh.
#### Hiệu năng khủng
Trong các bài test performance thì Kong là một trong những API Gateway có hiệu năng cao nhất, nó có thể xử lý được một lượng rất lớn requests / s
#### Nhiều plugins
Kong hỗ trợ rất nhiều plugins tùy vào chức năng như authen, logging, traffic control, analytics & monitoring...giúp quản lý cũng như theo dõi các microservices được hiệu quả và dễ dàng hơn thay vì chỉ đảm nhận mỗi việc routing requests.
#### Miễn phí
Kong có bản miễn phí, nhưng không có GUI.
### Kiến trúc
![](https://images.viblo.asia/0276f9c9-d9bb-4b0e-acf3-e03133c77f86.png)
| Object | Describe |
| -------- | -------- |
| Service     | Là ID dùng để tham chiếu đến các API và microservice mà nó quản lý     |
| Routes     | Điều hướng cách request gửi tới Services khi nó tới API gateway. 1 Service có thể có nhiều Routes     |
| Consumers     | Đại diện cho end users của API. Nó control ai được access vào API. Nó chó thể ghi log lại     |
| Admin API     | RESTful API     |
| Plugins     | Các Plugins tích hợp vào Kong     |
| Rate Limiting plugin     | Limit số lượng HTTP requests tới trong 1 khoảng thời gian     |
| Proxy Caching plugin     | Proxy Cache - cái tên nói lên công dụng     |
| Key Auth plugin     | Có thể thêm key vào Service hoặc Route     |
| Load Balancing     | Có 2 method là DNS-based or vòng tròn (ring-balancer)     |
### Hiểu được Traffic flow
![](https://images.viblo.asia/b7894fd3-1f77-4f1e-acb7-7a2ffbef4b27.png)
Mặc định Kong listen port 8000 (HTTP) hoặc 8443 (HTTPS) (có thể config).
Nó nhận request API từ client và Routes chúng đến API destination. Trong lúc đó, các policy được áp dụng.
### Yêu cầu phần cứng
| Size | Cấu hình phần cứng | Số config | Độ trễ | Thông lượng | Dùng cho |
| -------- | -------- | -------- | -------- | -------- | -------- |
| Small     | CPU 1-2core, RAM 2-4GB     | < 100     | < 100ms     | < 500 RPS     | Môi trường Development     |
| Medium     | CPU 2-4core, RAM 4-8GB     | < 1000     | < 20ms     | < 2500 RPS     | Production clusters     |
| Large     | CPU 8-16core, RAM 16-32GB     | < 10000     | < 10ms     | < 10000 RPS     | Mission-critical clusters     |
### Cài đặt
Lưu ý: Kong không work với Postgres 12
```
# ---------- INSTALL POSTGRESS 9.6 --------------#
yum -y install epel-release wget vim net-tools htop
# Install the repository RPM:
yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# Install PostgreSQL:
yum install -y postgresql96-server

# Optionally initialize the database and enable automatic start:
/usr/pgsql-9.6/bin/postgresql96-setup initdb
systemctl enable postgresql-9.6
systemctl start postgresql-9.6

sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'Lequockhoi123@';"
sudo -u postgres psql -c "CREATE USER kong;"
sudo -u postgres psql -c "CREATE DATABASE kong OWNER kong;"
sudo -u postgres psql -c "ALTER USER kong WITH PASSWORD 'Lequockhoi123@';"
rm -rf /var/lib/pgsql/9.6/data/pg_hba.conf
cat <<EOT >>  /var/lib/pgsql/9.6/data/pg_hba.conf
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     ident
# IPv4 local connections:
host    all             all             127.0.0.1/32            password
# IPv6 local connections:
host    all             all             ::1/128                 password
EOT
systemctl restart postgresql-9.6

# ---------- INSTALL KONG --------------#
# Kong Repo
rm -f /etc/yum.repos.d/bintray-kong-kong-community-edition-rpm.repo
cat <<EOT >> /etc/yum.repos.d/bintray-kong-kong-community-edition-rpm.repo
#bintray--kong-kong-community-edition-rpm - packages by  from Bintray
[bintray--kong-kong-community-edition-rpm]
name=bintray--kong-kong-community-edition-rpm
baseurl=https://kong.bintray.com/kong-community-edition-rpm/centos/7
gpgcheck=0
repo_gpgcheck=0
enabled=1
EOT

# Install Kong From Repo
yum -y update
yum -y install kong-community-edition

cat <<EOT >> /etc/kong/kong.conf
proxy_listen = 0.0.0.0:8003, 0.0.0.0:8443 ssl
admin_listen = 0.0.0.0:8004, 0.0.0.0:8444 ssl

database = postgres
pg_host = 127.0.0.1
pg_port = 5432
pg_user = kong
pg_password = Lequockhoi123@
pg_database = kong
EOT

kong migrations bootstrap /etc/kong/kong.conf
ulimit -n 4096
cat <<EOT >> /etc/systemd/system/kongd.service
[Unit]
Description= kong service
After=syslog.target network.target


[Service]
User=root
Group=root
Type=forking
ExecStart=/usr/local/bin/kong start -c /etc/kong/kong.conf --vv
ExecReload=/usr/local/bin/kong reload
ExecStop=/usr/local/bin/kong stop

[Install]
WantedBy=multi-user.target
EOT
systemctl daemon-reload
systemctl enable kongd
systemctl start kongd
```
### My config
/etc/hosts
```
127.0.0.1 kongapi kongadmin
```
```
proxy_listen = 0.0.0.0:8003, 0.0.0.0:8443 ssl
admin_listen = 0.0.0.0:8004, 0.0.0.0:8444 ssl
```
### Expose your Services with Kong Gateway
Khi cấu hình quyền truy cập vào API, bạn cần phải chỉ định một Services . Trong Kong Gateway, Service là một thực thể đại diện cho external upstream API.
Thuộc tính chính của 1 Service là URL
Trước khi making request, bạn có thể add Route cho nó. Route là cách thức các yêu cầu được gửi đến Service khi chúng đến với Kong 
![](https://images.viblo.asia/b7894fd3-1f77-4f1e-acb7-7a2ffbef4b27.png)
#### Add a Service
##### Service name: get_simple_html
##### Service API
```
"curl -i -X POST http://kongadmin:8004/services \
 --data name=get_simple_html \
 --data url='https://httpbin.org/html'"
```
##### Return: 201
##### End point
```
http://kongadmin:8004/services/get_simple_html
```
##### Route: /html
##### Route API
```
curl -i -X POST http://kongadmin:8004/services/get_simple_html/routes \
  --data 'paths[]=/html' \
  --data 'name=simple_html'
```
##### Verify
```
curl -i -X GET http://kongapi:8003/html -H "accept: text/html"
```
##### Route: /simple_html
##### Route API
```
curl -i -X POST http://kongadmin:8004/services/get_simple_html/routes \
  --data 'paths[]=/simple_html' \
  --data 'name=simple_html_2'
```
##### Verify
```
curl -i -X GET http://kongapi:8003/simple_html -H "accept: text/html"
```
#### Add a Service
##### Service name: post_sample
##### Service API
```
curl -i -X POST http://kongadmin:8004/services \
 --data name=post_sample \
 --data url='https://httpbin.org/post'
```
##### Return: 200
##### End point
```
http://kongadmin:8004/services/post_sample
```
##### Route: /post_sample
##### Route API
```
"curl -i -X POST http://kongadmin:8004/services/post_sample/routes \
  --data 'paths[]=/post_sample' \
  --data 'name=post_sample'"
```
##### Verify
```
curl -i -X POST http://kongapi:8003/post_sample -H "accept: application/json"
```
### Rate limiting
#### Limit 5 time per minute on Route get_simple_html
###### API
```
"curl -i -X POST http://kongadmin:8004/routes/simple_html_2/plugins \
--data ""name=rate-limiting"" \
--data ""config.minute=5"" \
--data ""config.policy=local"""
```
##### Verify
Request lần thứ 6 sẽ lỗi
```
curl -i -X GET http://kongapi:8003/simple_html -H "accept: text/html"
```
Request lần thứ 6 vẫn được vì không rate limit router này.
```
curl -i -X GET http://kongapi:8003/html -H "accept: text/html"
```
#### Limit 5 times per minute on Service post_example
###### API
```
"curl -i -X POST http://kongadmin:8004/services/post_sample/plugins \
--data ""name=rate-limiting"" \
--data ""config.minute=5"" \
--data ""config.policy=local"""
```
##### Verify
```
curl -i -X POST http://kongapi:8003/post_sample -H "accept: application/json"
```
### Authentication
#### Setup Key Authentication on Service post_sample
##### API
```
"curl -i -X POST \
   --url http://kongadmin:8004/services/post_sample/plugins/ \
   --data 'name=key-auth'"
```
##### Verify
Lúc này không có key thì không valid được
```
curl -i -X POST http://kongapi:8003/post_sample -H "accept: application/json"
```
##### Return: HTTP/1.1 401 Unauthorized
##### Create a consumer
```
"curl -i -X POST \
   --url http://kongadmin:8004/consumers/ \
   --data ""username=khoiplus&custom_id=khoiplus_id"""
```
##### Get Plugin ID
```
curl -X GET http://kongadmin:8004/services/post_sample/plugins/
```
Tìm Plugin ID: a03a5575-557d-4ef4-ac5d-035e0f5f3352
##### Get consumer ID
```
"curl -i -X GET \
   --url http://kongadmin:8004/consumers/ \
   --data ""username=khoiplus"""
```
Tìm consumer ID: khoiplus_id
##### Create a key
```
curl -X POST \
http://kongadmin:8004/consumers/khoiplus/key-auth -d 'key=SerectKey'
```
key là key
value là SerectKey 
##### Config
```
"curl -i -X PATCH \
   --url http://kongadmin:8004/plugins/a03a5575-557d-4ef4-ac5d-035e0f5f3352 \
   --data ""config.key_names=key"""
```
##### Using the Key
```
curl -i -X POST http://kongapi:8003/post_sample -H "key:SerectKey"
```
### Load balancing
![](https://images.viblo.asia/cbe285dd-7aa2-4d50-911c-d609e197fe48.png)
#### BlueGreenDeployment
![](https://images.viblo.asia/ffcbfce3-68a3-4c37-b564-2c3ef44798ac.png)
#### CanaryRelease
![](https://images.viblo.asia/842878d4-6a6f-4272-ac08-47e256d60eae.png)
#### Demo Load balancer on example_service
##### Service API
```
"curl -i -X POST http://kongadmin:8004/services \
 --data name=example_service \
 --data host='example_service_lb'"
```
##### Return: 201
##### End point
```
http://kongadmin:8004/services/example_service
```
##### Route: /example_service
##### Route API
```
"curl -i -X POST http://kongadmin:8004/services/example_service/routes \
  --data 'paths[]=/example_service' \
  --data 'name=example_service'"
```
##### Add a new upstream
```
"curl -X POST http://kongadmin:8004/upstreams \
 --data name=example_service_lb"
```
##### Change host on service
```
"curl -X PATCH http://kongadmin:8004/services/example_service \
 --data host='example_service_lb'"
```
##### Add target 1 to host
```
"curl -X POST http://kongadmin:8004/upstreams/example_service_lb/targets \
 --data target='mockbin.org:80'"
```
##### Add target 2 to host
```
"curl -X POST http://kongadmin:8004/upstreams/example_service_lb/targets \
 --data target='httpbin.org:80'"
```
##### Test
```
curl -i http://kongapi:8003/example_service
```
### IP Restriction
https://docs.konghq.com/hub/kong-inc/ip-restriction/
#### API
```
"curl -X POST http://kongadmin:8004/services/get_simple_html/plugins \
    --data ""name=ip-restriction""  \
    --data ""config.allow=54.13.21.1"" \
    --data ""config.allow=143.1.0.0/24"""
```
### Proxy caching
Kong Gateway mang lại hiệu suất cao thông qua bộ nhớ đệm. 
Caching lưu cache trong Redis
#### Thiết lập Proxy Caching globally
```
curl -X POST http://kongadmin:8004/plugins/ \
    --data "name=proxy-cache"  \
    --data "config.cache_ttl=300" \
    --data "config.strategy=memory"
```
#### Thiết lập Proxy Caching cho Service
```
curl -i -X POST http://kongadmin:8004/example_service/plugins \
--data name=proxy-cache \
--data config.content_type="application/json" \
--data config.cache_ttl=300 \
--data config.strategy=memory
```
#### Thiết lập Proxy Caching cho Route
```
curl -X POST http://kongadmin:8004/routes/ mocking/plugins \
    --data "name=proxy-cache"  \
    --data "config.cache_ttl=300" \
    --data "config.strategy=memory"
```
#### Thiết lập Proxy Caching cho Consumer
```
curl -X POST http://kongadmin:8004/consumers/<consumer>/plugins \
    --data "name=proxy-cache"  \
    --data "config.cache_ttl=300" \
    --data "config.strategy=memory"
```
#### Xác thực Proxy Cache
```
curl -i -X GET http://kongadmin:8004/mock/request
```
##### Return không có cache
```
HTTP/1.1 200 OK
 ...
 X-Cache-Key: d2ca5751210dbb6fefda397ac6d103b1
 X-Cache-Status: Miss
 X-Content-Type-Options: nosniff
 ...
 X-Kong-Proxy-Latency: 25
 X-Kong-Upstream-Latency: 37
```
##### Return khi có cache
```
HTTP/1.1 200 OK
 ...
 X-Cache-Key: d2ca5751210dbb6fefda397ac6d103b1
 X-Cache-Status: Hit
 ...
 X-Kong-Proxy-Latency: 0
 X-Kong-Upstream-Latency: 1
```
#### Xoá bộ nhớ cache
```
curl -i -X DELETE http://kongadmin:8004/proxy-cache
```
### Hydrid mode
![](https://images.viblo.asia/7c5e75b7-03b6-4d45-8786-7494d8a539fc.png)

https://docs.konghq.com/2.1.x/hybrid-mode/

Bạn cần một bộ cân bằng tải trước cụm Kong để phân phối traffic. Kong Cluster chỉ là những node Kong dùng chung với nhau 1 cấu hình.
Trong Hydrid Mode, Cache không hoạt động. 
Ở normal, Kong yêu cầu CSDL Postgres, để lưu trữ cấu hình của nó như Routes Services và Plugin.
Chế độ Hydrid được gọi là DB-less mode. Control Plane (CP) / Data Plane Separation (DP)
![](https://images.viblo.asia/4cfc7f25-915e-4a6f-843e-4c2df46ff619.png)
#### Control Plane (CP)
Nơi config được quản lý và Admin API
#### Data Plane Separation (DP)
Phục vụ traffic và proxy
Mỗi DP node kết nối với 1 trong CP nodes
Thay vì vào CSDL load config thì bây giờ DB giữ kết nối với CP để nhận cấu hình mới nhất.
#### Lợi ích
* Giảm mạnh lưu lượng truy cập trên CSDL, vì chỉ có CP mới cần kết nối CSDL
* Tăng cường bảo mật, trong trường hợp DP bị xâm nhập, attacker cũng không làm ảnh hưởng các node khác.
* Dễ dàng quản lý, admin tương tác với Admin API trên CP node và giám sát trạng thái toàn cụm Kong.
### Plugin
https://docs.konghq.com/hub
### Log in Kong
```
/usr/local/kong/logs/
```