# I. Giới thiệu

Nhóm phát triển “PostgreSQL Global Development” đã chính thức giới thiệu bản PostgreSQL 12 vào ngày 03/10/2019. Bản phát hành thứ 12 của PostgreSQL  bao gồm những cải tiến đáng kể về Table Partitioning, cải thiện truy vấn trùng lặp, Logical Replication…

![](https://images.viblo.asia/bb9b96d6-a9d4-4ee2-9073-8e195a5a892b.png)

Bài viết này sẽ hướng dẫn bạn cách cài đặt PostgreSQL và công cụ quản lý pgAdmin trên HDH Windows và Linux (Ubuntu).

# II. Cài đặt PostgreSQL

## 1. Cài đặt PostgreSQL trên Windows

Thông tin tương thích của PostgreSQL với các phiên bản Windows

![](https://images.viblo.asia/24389154-c1bd-428b-bf05-5c0317057dc2.png)

Download file cài đặt của PostgreSQL về, và thực hiện theo hướng dẫn ở [đây ](https://www.postgresql.org/download/windows/)

## 2. Cài đặt PostgreSQL trên Linux (Ubuntu)

PostgreSQL 12 hiện đã hỗ trợ các bản phân phối Linux như sau:

 BSD
     FreeBSD FreeBSD
    OpenBSD
Linux
    Họ Red Hat Linux (bao gồm các biến thể CentOS / Fedora / Scientific / Oracle)
    Debian GNU / Linux và các dẫn xuất
    Ubuntu Linux và các dẫn xuất
    SuSE và OpenSuSE
    Linux khác
Solaris

**Để cài đặt PostgreSQL trên Ubuntu các bạn thực hiện các bước sau:**

### Bước 1: Thiết lập PostgreSQL Apt Repository

Chú ý: Từ Ubuntu 18.04 trở lên các bạn không cần phải thực hiện bước này, vì mặc định trong Repository của Ubuntu 18.04 đã có package PostgreSQL 10, còn PostgreSQL 11/12 vẫn phải thực hiện các bước bên dưới để thêm vào Repository

Tạo file /etc/apt/sources.list.d/pgdg.list với nội dung như sau:

```php
deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main
```

Hoặc chạy command bên dưới, chú ý version của Ubuntu

```php
# Ubuntu 14.04: 
sudo add-apt-repository 'deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main'
# Ubuntu 16.04: 
sudo add-apt-repository 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main'
#Ubuntu 17.04: 
sudo add-apt-repository 'deb http://apt.postgresql.org/pub/repos/apt/ zesty-pgdg main'
#Ubuntu 18.04: 
sudo add-apt-repository 'deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main'
```

Hoặc chạy command sau:

```php
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/` lsb_release -cs`-pgdg main ">> /etc/apt/sources.list.d/pgdg.list'
```

### Bước 2: Import repository key

```php
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
  sudo apt-key add -
```

![](https://images.viblo.asia/8f60d313-a18e-41f8-9a2e-81e9ef6f604e.png)

### Bước 3: Cập nhật lại danh sách Packages của Ubuntu và cài đặt PostgreSQL 10/11 hoặc 12 bằng command bên dưới.

```php
sudo apt-get cập nhật
# Cài đặt PostgreSQL Phiên bản 10
sudo apt-get install postgresql-10
# Cài đặt PostgreSQL Phiên bản 11
sudo apt-get install postgresql-11
# Cài đặt PostgreSQL Phiên bản 12
sudo apt-get install postgresql-12
```

![](https://images.viblo.asia/8fb06596-6959-48b5-b9d0-88c10f126e81.png)

Chọn [Y] và chờ quá trình cài đặt kết thúc.

### Bước 4: Xác nhận PostgreSQL đã được cài đặt thành công, sử dụng command sau đây:

```php
sudo service postgresql status
```

![](https://images.viblo.asia/ec92d51f-3f6a-456f-9b3f-5c8bb205e38f.png)

# III. Cài đặt pgAdmin 4 trên Linux (Ubuntu)

Sau khi cài đặt PostgreSQL, chúng ta cần 1 công cụ client để quản lý PostgreSQL Database, có rất nhiều công cụ client, trong đó phổ biến nhất, được sử dụng nhiều nhất và có nhiều tính năng nhất phải kể đến đó là công cụ pgAdmin 4

PgAdmin là một công cụ quản lý PostgreSQL Database cung cấp nhiều tính năng như kết nối tới PostgreSQL, thư thi SQL Query, backup và khôi phục Database.

## Cách 1: Cài đặt thông qua python

pgAdmin là phần mềm Client cho PostgreSQL, phiên bản mới nhất hiện tại là pgAdmin 4, các bạn có thể download phiên bản mới nhất tại [đây](https://www.pgadmin.org/download/)

### Bước 1: Để cài đặt trên ubuntu các bạn thực hiện lần lượt command sau:

```php
sudo apt-get install virtualenv python3-pip libpq-dev python3-dev
cd
virtualenv -p python3 pgadmin4
cd pgadmin4/
source bin/activate
pip3 install https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v2.1/pip/pgadmin4-2.1-py2.py3-none-any.whl
```

### Bước 2: Thay đổi config

Tạo file: lib/python3.5/site-packages/pgadmin4/config_local.py có nội dung như sau:

```php
import os
DATA_DIR = os.path.realpath(os.path.expanduser(u'~/.pgadmin/'))
LOG_FILE = os.path.join(DATA_DIR, 'pgadmin4.log')
SQLITE_PATH = os.path.join(DATA_DIR, 'pgadmin4.db')
SESSION_DB_PATH = os.path.join(DATA_DIR, 'sessions')
STORAGE_DIR = os.path.join(DATA_DIR, 'storage')
SERVER_MODE = False
```

### Bước 3: Để khởi động pgAdmin 4 chạy command sau:

```php
python3 lib/python3.5/site-packages/pgadmin4/pgAdmin4.py
```

Truy cập địa chỉ: http://127.0.0.1:5050 để truy cập vào trang quản lý

![](https://images.viblo.asia/1612ee8b-8307-4932-98e5-eeb84c249ceb.png)

## Cách 2: Cài đặt thông qua file deb (từ reposition)

### Bước 1: Import repository key

```php
sudo apt-get install curl ca-certificates
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

### Bước 2: Thêm repositiory

```php
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

### Bước 3: Cài đặt pgadmin 4

```php
sudo apt-get update
sudo apt-get install pgadmin4
```

### Bước 4: Khởi động pgadmin 4 thì chạy command dưới đây

```php
sudo pgadmin4
```

Vì mặc định, pgadmin 4 sẽ mở web browser bằng 1 random cổng, để cố định cổng của pgadmin 4 thì chúng ta thực hiện như sau:

Trên Ubuntu/Windows System Tray kích chuột  chọn “Configure…”

![](https://images.viblo.asia/c0722cb5-948a-47d2-acf7-b10cf4a98b6d.png)

Sau đó tích chọn “Fix Port Number?” và điền cổng bạn muốn cố định ở ô “Port Number” bên phải

![](https://images.viblo.asia/039378cf-56d9-4666-8203-00f117a4096c.png)

# IV. Kết luận

Như vậy mình đã hướng dẫn xong phần cài  PostgreSQL và pgAdmin 4 trên ubuntu chúc mọi người cài đặt thành công.

link tham khảo: https://vinasupport.com/