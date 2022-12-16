### phần mềm yêu cầu : 

wget và vim
nếu bạn chưa có 2 pm này thì hãy cài  qua yum như sau:

`yum install vim`

`yum install wget`

**Bước 1**
chúng ta cần import key của neotechnology trước đã:

gõ vào terminal  những lệnh sau :

`cd /tmp`

`wget http://debian.neo4j.org/neotechnology.gpg.key`

`rpm --import neotechnology.gpg.key*`

`vi /etc/yum.repos.d/neo4j.repo`

### rồi pase dòng dưới  này vào terminal:

```
[neo4j]
name=Neo4j Yum Repo
baseurl=http://yum.neo4j.org/stable
enabled=1
gpgcheck=1
```

### save lại rồi gõ


`yum install neo4j`

**bước 2**
sau khi cài đặt neo4j xong chúng ta sẽ sửa file neo4j.conf :

`vi /etc/neo4j/neo4j.conf`

bỏ comment 2 dòng này rồi lưu lại :

dbms.connectors.default_listen_address=0.0.0.0
dbms.connector.http.listen_address=:7474

sau đó enable neo4j :

`systemctl enable neo4j`

`systemctl restart neo4j`

rồi gõ IP của bạn cùng với port 7474 vào trình duyệt
 ra trang này là thành công.
![](https://images.viblo.asia/2a5498e5-db8d-4f5d-9f94-bb76fb97f1ef.png)