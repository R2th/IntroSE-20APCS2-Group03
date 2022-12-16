Hướng dẫn chi tiết cài đặt Apache Superset trên máy ảo ubuntu EC2 (AWS).
![Phase1-Catwing-reports-1-1024x585.jpg](https://images.viblo.asia/0696ede7-9ef6-4d71-802b-4bb0df8b1480.jpg)


# Superset

Apache SuperSet là một công cụ trực quan hóa dữ liệu Nguồn mở có thể được sử dụng để biểu diễn dữ liệu bằng đồ họa. Superset ban đầu được tạo ra bởi AirBnB và sau đó được phát hành cho cộng đồng Apache. Apache Superset được phát triển bằng ngôn ngữ Python và sử dụng Flask Framework cho tất cả các tương tác web. Superset hỗ trợ phần lớn RDMBS thông qua SQL Alchemy.

# EC2 
- Mở bảng điều khiển, chọn EC2
- Launch instance
- Ubuntu free-tier eligable – t2.micro
- Lựa chọn bộ nhớ (tôi chọn 10GB)
- Security group – set all traffic trong inbound rude
- Gán khóa cho instance (để ssh)
- Khởi động nó 

# Cài đặt
VÌ ubuntu 22.04 đặt python 3.10 là mặc định, tuy nhiên Superset chưa hỗ trợ phiên bản python 3.10, cho nên chúng ta sẽ tạo môi trường ảo chạy bằng python 3.9:

```
sudo apt-get update
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt install python3.9
# Nhấn "y" để cho phép quá trình tiếp tục 
python3.9 --version
```

Cài đặt môi trường ảo trên nền python 3.9:
```basic
sudo apt-get install python3.9-pip
sudo apt install python3.9-venv
python3.9 -m venv name_env
source name_env/bin/activate
```
Cài đặt các thư viện trong file requirements.txt
``` basic
pip3 install -r requirements.txt
```
Nội dung file requirements.txt
```
aiohttp==3.8.3
aiosignal==1.3.1
alembic==1.8.1
amqp==5.1.1
apache-superset==2.0.0
apispec==3.3.2
async-generator==1.10
async-timeout==4.0.2
attrs==22.1.0
Babel==2.11.0
backoff==2.2.1
billiard==3.6.4.0
bleach==3.3.1
Brotli==1.0.9
cachelib==0.4.1
celery==5.2.7
certifi==2022.9.24
cffi==1.15.1
charset-normalizer==2.1.1
click==8.1.3
click-didyoumean==0.3.0
click-plugins==1.1.1
click-repl==0.2.0
colorama==0.4.6
convertdate==2.4.0
cron-descriptor==1.2.32
croniter==1.3.8
cryptography==38.0.3
deprecation==2.1.0
dnspython==2.2.1
email-validator==1.3.0
exceptiongroup==1.0.4
Flask==2.0.3
Flask-AppBuilder==4.1.6
Flask-Babel==2.0.0
Flask-Caching==1.11.1
Flask-Compress==1.13
Flask-JWT-Extended==4.4.4
Flask-Login==0.6.2
Flask-Migrate==4.0.0
Flask-SQLAlchemy==2.5.1
flask-talisman==1.0.0
Flask-WTF==1.0.1
frozenlist==1.3.3
func-timeout==4.3.5
geographiclib==2.0
geopy==2.3.0
graphlib-backport==1.0.3
gunicorn==20.1.0
h11==0.14.0
hashids==1.3.1
holidays==0.10.3
humanize==4.4.0
idna==3.4
importlib-metadata==5.0.0
isodate==0.6.1
itsdangerous==2.1.2
Jinja2==3.1.2
jsonschema==4.17.1
kombu==5.2.4
korean-lunar-calendar==0.3.1
Mako==1.2.4
Markdown==3.4.1
MarkupSafe==2.1.1
marshmallow==3.19.0
marshmallow-enum==1.5.1
marshmallow-sqlalchemy==0.26.1
msgpack==1.0.4
multidict==6.0.2
numpy==1.22.1
outcome==1.2.0
packaging==21.3
pandas==1.3.5
parsedatetime==2.6
pgsanity==0.2.9
Pillow==9.3.0
polyline==1.4.0
prison==0.2.1
prompt-toolkit==3.0.33
pyarrow==5.0.0
pycparser==2.21
PyJWT==2.6.0
PyMeeus==0.5.11
pyparsing==3.0.9
pyrsistent==0.19.2
PySocks==1.7.1
python-dateutil==2.8.2
python-dotenv==0.21.0
python-geohash==0.8.5
pytz==2022.6
PyYAML==6.0
redis==4.3.5
selenium==4.6.0
simplejson==3.18.0
six==1.16.0
slackclient==2.5.0
sniffio==1.3.0
sortedcontainers==2.4.0
SQLAlchemy==1.3.24
SQLAlchemy-Utils==0.37.9
sqlparse==0.3.0
tabulate==0.8.9
trio==0.22.0
trio-websocket==0.9.2
typing-extensions==3.10.0.2
urllib3==1.26.13
vine==5.0.0
wcwidth==0.2.5
webencodings==0.5.1
Werkzeug==2.0.3
wsproto==1.2.0
WTForms==2.3.3
WTForms-Ext==0.5
WTForms-JSON==0.3.5
yarl==1.8.1
zipp==3.10.0
```

# Chạy chương trình
Tạo tài khoản Admin (các bạn sẽ được nhắc đặt tên người dùng, họ, tên, email đặt mật khẩu)
```
export FLASK_APP=superset
flask fab create-admin
```

Khởi tạo cơ sở dữ liệu:
``` 
superset db upgrade 
```

Tải một số dữ liệu mẫu
```
superset load_examples
```

Tạo vai trò và quyền mặc định
```
superset init
```

Khởi động máy chủ web trên cổng 8080 với Public IPv4 DNS của máy ảo EC2
```
superset run -h your_Public_IPv4_DNS -p 5000
# hoặc
superset run -h 0.0.0.0
# vô bằng Public IPv4 DNS EC2 của bạn với port mặc định là 5000

```
Đăng nhập và sử dụng thôi!!!



# Kham khảo:

[Beginners Guide how to Install Superset (Opensource BI platform) on EC2 AWS instance](https://shopup.me/blog/beginners-guide-set-superset-opensource-bi-platform-ec2-aws-instance/)